import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import HealthDashboard from './components/HealthDashboard';
import StravaGrid from './components/StravaGrid';
import StravaCallback from './components/StravaCallback';
import Resume from './components/Resume';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: ${props => props.$isHome ? 
    'linear-gradient(135deg, #e9ecef 0%, rgba(175, 211, 243, 0.9) 100%)' : 
    '#e9ecef'};
  font-family: Arial, sans-serif;
  position: relative;
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  padding-top: 80px; // Reduced since navbar blends down
  min-height: calc(100vh - 80px);
  
  @media (min-width: 768px) {
    padding-top: 100px; // Space for desktop navbar
    min-height: calc(100vh - 100px);
  }
`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PageContainer $isHome={true}>
            <Navbar />
            <ContentContainer>
              <Home />
            </ContentContainer>
          </PageContainer>
        } />
        <Route path="/a" element={
          <PageContainer $isHome={false}>
            <Navbar />
            <ContentContainer>
              <StravaGrid />
            </ContentContainer>
          </PageContainer>
        } />
        <Route path="/b" element={
          <PageContainer $isHome={false}>
            <Navbar />
            <ContentContainer>
              <HealthDashboard />
            </ContentContainer>
          </PageContainer>
        } />
        <Route path="/c" element={
          <PageContainer $isHome={false}>
            <Navbar />
            <ContentContainer>
              <Resume />
            </ContentContainer>
          </PageContainer>
        } />
        <Route path="/callback" element={
          <PageContainer $isHome={false}>
            <Navbar />
            <ContentContainer>
              <StravaCallback />
            </ContentContainer>
          </PageContainer>
        } />
        {/* Catch all unknown routes and redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;