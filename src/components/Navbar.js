import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 1rem 1.5rem 1rem;
  background: linear-gradient(180deg, 
    rgba(175, 211, 243, 0.92) 0%, 
    rgba(170, 206, 238, 0.8) 50%,
    rgba(165, 201, 233, 0.7) 70%,
    rgba(160, 196, 228, 0.5) 85%,
    rgba(155, 191, 223, 0.3) 95%,
    rgba(150, 186, 218, 0.15) 100%);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  min-height: 120px;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 2.5rem 2rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 100px;
  }
`;

const Brand = styled(Link)`
  font-size: 1.6rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0;
  }
  
  &:hover {
    color: #34495e;
    transform: translateY(-1px);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;

  @media (min-width: 768px) {
    gap: 0.5rem;
    flex-wrap: nowrap;
    justify-content: flex-end;
  }
`;

const NavLink = styled(Link)`
  color: #34495e;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  background: ${props => props.className?.includes('active') ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)'};
  border: 1px solid ${props => props.className?.includes('active') ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)'};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
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