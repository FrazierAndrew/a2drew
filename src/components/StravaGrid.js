import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { stravaService } from '../services/stravaService';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ActivityCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityTitle = styled.h3`
  margin: 0 0 8px 0;
  color: rgb(47, 43, 36);
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActivityStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
  align-items: center;
`;

const Stat = styled.div`
  font-size: 0.9rem;
  color: rgb(53, 57, 61);
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MapPreview = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 4px;
  margin: 8px 0;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: rgb(53, 57, 61);
`;

const ConnectButton = styled.a`
  display: inline-block;
  background-color: #FC4C02;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  margin: 20px auto;
  text-align: center;

  &:hover {
    background-color: #E34402;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const ActivityLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: none;
  }
`;

const DateText = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

function StravaGrid() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('strava_access_token');
      if (token) {
        setIsAuthenticated(true);
        fetchActivities();
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await stravaService.getActivities();
      console.log('Strava Activities Data:', data);
      
      // Ensure we have map data for each activity
      const activitiesWithMaps = await Promise.all(
        data.map(async (activity) => {
          if (!activity.map) {
            // If no map data, try to fetch it directly
            try {
              const detailResponse = await fetch(
                `https://www.strava.com/api/v3/activities/${activity.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('strava_access_token')}`,
                  },
                }
              );
              const detail = await detailResponse.json();
              return { ...activity, map: detail.map };
            } catch (error) {
              console.error('Error fetching activity detail:', error);
              return activity;
            }
          }
          return activity;
        })
      );

      setActivities(activitiesWithMaps);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Strava activities:', error);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  const formatDistance = (meters) => {
    const miles = (meters / 1609.34).toFixed(2);
    return `${miles} mi`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatPace = (totalSeconds, meters) => {
    const minutesPerMile = (totalSeconds / 60) / (meters / 1609.34);
    const minutes = Math.floor(minutesPerMile);
    const remainingSeconds = Math.round((minutesPerMile - minutes) * 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}/mi`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
  };

  const getMapUrl = (activity) => {
    if (!activity.map?.summary_polyline) {
      console.log('No polyline for activity:', activity.name);
      return null;
    }
    // Try using Strava's own map tiles
    return `https://www.strava.com/routes/preview/${activity.id}.png`;
  };

  if (!isAuthenticated) {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=174379&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin + '/callback')}&scope=activity:read_all`;
    
    return (
      <CenterContainer>
        <ConnectButton href={authUrl}>
          Connect with Strava
        </ConnectButton>
      </CenterContainer>
    );
  }

  if (loading) {
    return <LoadingMessage>Loading activities...</LoadingMessage>;
  }

  return (
    <GridContainer>
      {activities.map((activity) => {
        console.log('Processing activity:', {
          id: activity.id,
          name: activity.name,
          hasMap: !!activity.map,
          hasPolyline: !!activity.map?.summary_polyline
        });
        
        return (
          <ActivityLink 
            href={`https://www.strava.com/activities/${activity.id}`}
            target="_blank"
            rel="noopener noreferrer"
            key={activity.id}
          >
            <ActivityCard>
              <ActivityTitle>{activity.name}</ActivityTitle>
              {activity.map?.summary_polyline && (
                <MapPreview 
                  style={{
                    backgroundImage: `url(${getMapUrl(activity)})`,
                    backgroundColor: '#f8f8f8',
                    backgroundSize: 'cover'
                  }}
                />
              )}
              <ActivityStats>
                <Stat>🏃‍♂️ {formatDistance(activity.distance)}</Stat>
                <Stat>⏱️ {formatDuration(activity.moving_time)}</Stat>
                <Stat>⚡ {formatPace(activity.moving_time, activity.distance)}</Stat>
                <DateText>{formatDate(activity.start_date)}</DateText>
              </ActivityStats>
            </ActivityCard>
          </ActivityLink>
        );
      })}
    </GridContainer>
  );
}

export default StravaGrid;