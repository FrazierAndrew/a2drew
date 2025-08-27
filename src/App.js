import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import HealthDashboard from './components/HealthDashboard';
import StravaGrid from './components/StravaGrid';
import StravaCallback from './components/StravaCallback';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  font-family: Arial, sans-serif;
`;

const ContentContainer = styled.div`
  padding-top: 80px; // Space for navbar
  min-height: calc(100vh - 80px); // Adjust for navbar height
`;

function App() {
  return (
    <Router>
      <PageContainer>
        <Navbar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a" element={<StravaGrid />} />
            <Route path="/b" element={<HealthDashboard />} />
            <Route path="/c" element={<div>Page C</div>} />
            <Route path="/callback" element={<StravaCallback />} />
            {/* Catch all unknown routes and redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContentContainer>
      </PageContainer>
    </Router>
  );
}

export default App;