import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;



const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.color || '#4A90E2'};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(47, 43, 36);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgb(102, 102, 102);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
`;

const StatSubtext = styled.div`
  color: rgb(136, 136, 136);
  font-size: 0.85rem;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  color: rgb(47, 43, 36);
  margin-bottom: 1rem;
`;

const WorkoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 1rem;
`;

const WorkoutCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid ${props => props.color || '#4A90E2'};
`;

const WorkoutType = styled.div`
  font-weight: bold;
  color: rgb(47, 43, 36);
  margin-bottom: 5px;
`;

const WorkoutCount = styled.div`
  color: rgb(102, 102, 102);
  font-size: 0.9rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px;
  color: rgb(102, 102, 102);
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
`;

const InstructionBox = styled.div`
  background: #e3f2fd;
  color: #1565c0;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #2196f3;
`;

function HealthDashboard() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHealthData = async () => {
      try {
        const response = await fetch('/health_data_processed.json');
        
        if (!response.ok) {
          throw new Error('Health data not found');
        }
        
        const data = await response.json();
        setHealthData(data);
        console.log('Loaded health data:', data.summary_stats);
      } catch (error) {
        console.error('Error loading health data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadHealthData();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return Math.round(num).toLocaleString();
    }
  };

  const getWorkoutColors = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#6C5CE7', '#A8E6CF'];
    return colors;
  };

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingMessage>
          Loading your health dashboard...
        </LoadingMessage>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorMessage>
          <h3>Health data not found</h3>
          <p>Please process your Apple Health data first.</p>
        </ErrorMessage>
        <InstructionBox>
          <h4>🔧 How to set up your health data:</h4>
          <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <li>Export your Apple Health data and place export.xml in the health_data folder</li>
            <li>Run: <code>chmod +x scripts/process_health.sh</code></li>
            <li>Run: <code>./scripts/process_health.sh</code></li>
            <li>Refresh this page to see your dashboard</li>
          </ol>
        </InstructionBox>
      </DashboardContainer>
    );
  }

  const stats = healthData.summary_stats;
  const recentData = healthData.daily_summary.slice(-30); // Last 30 days

  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard color="#FF6B6B">
          <StatValue>{formatNumber(stats.avg_daily_steps_7d)}</StatValue>
          <StatLabel>Avg Daily Steps (7d)</StatLabel>
          <StatSubtext>30-day avg: {formatNumber(stats.avg_daily_steps_30d)}</StatSubtext>
        </StatCard>

        <StatCard color="#4ECDC4">
          <StatValue>{stats.total_workouts}</StatValue>
          <StatLabel>Total Workouts</StatLabel>
          <StatSubtext>{stats.recent_workouts_30d} in last 30 days</StatSubtext>
        </StatCard>

        <StatCard color="#45B7D1">
          <StatValue>{formatNumber(stats.total_distance_miles)}</StatValue>
          <StatLabel>Total Distance (Miles)</StatLabel>
          <StatSubtext>Avg: {stats.avg_daily_distance_30d.toFixed(1)} mi/day (30d)</StatSubtext>
        </StatCard>

        <StatCard color="#96CEB4">
          <StatValue>{stats.total_days}</StatValue>
          <StatLabel>Days of Data</StatLabel>
          <StatSubtext>Since your first health record</StatSubtext>
        </StatCard>

        <StatCard color="#FECA57">
          <StatValue>{recentData.reduce((sum, d) => sum + d.steps, 0).toLocaleString()}</StatValue>
          <StatLabel>Steps (Last 30 Days)</StatLabel>
          <StatSubtext>Recent activity summary</StatSubtext>
        </StatCard>

        <StatCard color="#FF9FF3">
          <StatValue>{Math.round(recentData.reduce((sum, d) => sum + d.calories_active, 0))}</StatValue>
          <StatLabel>Active Calories (30d)</StatLabel>
          <StatSubtext>From workouts and activities</StatSubtext>
        </StatCard>
      </StatsGrid>

      {stats.workout_type_breakdown && Object.keys(stats.workout_type_breakdown).length > 0 && (
        <ChartContainer>
          <ChartTitle>Workout Types</ChartTitle>
          <WorkoutGrid>
            {Object.entries(stats.workout_type_breakdown)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 8)
              .map(([type, count], index) => (
                <WorkoutCard key={type} color={getWorkoutColors()[index]}>
                  <WorkoutType>{type.replace('HKWorkoutActivityType', '').replace(/([A-Z])/g, ' $1').trim()}</WorkoutType>
                  <WorkoutCount>{count} workouts</WorkoutCount>
                </WorkoutCard>
              ))}
          </WorkoutGrid>
        </ChartContainer>
      )}

      <ChartContainer>
        <ChartTitle>Recent Activity (Last 30 Days)</ChartTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Total Steps:</strong><br />
            {recentData.reduce((sum, d) => sum + d.steps, 0).toLocaleString()}
          </div>
          <div>
            <strong>Total Distance:</strong><br />
            {recentData.reduce((sum, d) => sum + d.distance, 0).toFixed(1)} miles
          </div>
          <div>
            <strong>Active Days:</strong><br />
            {recentData.filter(d => d.steps > 1000).length} days
          </div>
          <div>
            <strong>Workouts:</strong><br />
            {recentData.reduce((sum, d) => sum + d.workouts.length, 0)} sessions
          </div>
        </div>
      </ChartContainer>
    </DashboardContainer>
  );
}

export default HealthDashboard;