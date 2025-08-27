import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  background: linear-gradient(90deg, rgba(175, 211, 243, 0.95) 0%, rgba(145, 180, 220, 0.95) 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Brand = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
  
  &:hover {
    color: #34495e;
    transform: translateY(-1px);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  color: #34495e;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.className?.includes('active') ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)'};
  border: 1px solid ${props => props.className?.includes('active') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)'};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  &.active {
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

function Navbar() {
  const location = useLocation();

  return (
    <Nav>
      <Brand to="/">Andrew</Brand>
      <NavLinks>
        <NavLink to="/a" className={location.pathname === '/a' ? 'active' : ''}>
          Strava Metrics
        </NavLink>
        <NavLink to="/b" className={location.pathname === '/b' ? 'active' : ''}>
          Health Metrics
        </NavLink>
        <NavLink to="/c" className={location.pathname === '/c' ? 'active' : ''}>
          Resume
        </NavLink>
        <NavLink 
          as="a" 
          href="https://www.linkedin.com/in/andrew-frazier-0219a716a/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          LinkedIn
        </NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;