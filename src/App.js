import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import StravaGrid from './components/StravaGrid';
import StravaCallback from './components/StravaCallback';
import Resume from './components/Resume';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: ${props => props.$isHome ? 
    'transparent' : 
    '#B0C4DE'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  min-height: 100vh;
  position: relative;
  padding-top: ${props => props.$isHome ? '0' : '60px'};
  
  @media (min-width: 768px) {
    padding-top: ${props => props.$isHome ? '0' : '80px'};
  }
`;

const HomeButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.025em;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    padding: 15px 25px;
    font-size: 18px;
    font-weight: 600;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && (
        <HomeButton onClick={() => window.location.href = '/'}>
          ← Home
        </HomeButton>
      )}
      <Routes>
        <Route path="/" element={
          <PageContainer $isHome={true}>
            <Navbar />
            <ContentContainer $isHome={true}>
              <Home />
            </ContentContainer>
          </PageContainer>
        } />
        <Route path="/strava" element={
          <PageContainer $isHome={false}>
            <ContentContainer $isHome={false}>
              <StravaGrid />
            </ContentContainer>
          </PageContainer>
        } />

        <Route path="/resume" element={
          <PageContainer $isHome={false}>
            <ContentContainer $isHome={false}>
              <Resume />
            </ContentContainer>
          </PageContainer>
        } />
        <Route path="/callback" element={
          <PageContainer $isHome={false}>
            <ContentContainer $isHome={false}>
              <StravaCallback />
            </ContentContainer>
          </PageContainer>
        } />
        {/* Catch all unknown routes and redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;