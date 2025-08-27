import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  min-width: 280px;
  max-width: 90vw;

  @media (min-width: 768px) {
    min-width: 400px;
    padding: 2.5rem;
    max-width: none;
  }
`;

const Brand = styled(Link)`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  text-decoration: none;
  letter-spacing: -0.25px;
  transition: all 0.3s ease;
  margin-bottom: 1.25rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 2rem;
    letter-spacing: -1px;
  }
  
  &:hover {
    color: #34495e;
    transform: translateY(-2px);
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const NavLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  color: #2c3e50;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.8rem 0.6rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-align: center;
  letter-spacing: 0.025em;
  background: ${props => props.className?.includes('active') ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)'};
  border: 2px solid ${props => props.className?.includes('active') ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 1.25rem;
    border-radius: 15px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.6);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &.active {
    background: rgba(255, 255, 255, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  }
`;

function Navbar() {
  const location = useLocation();

  return (
    <Nav>
      <Brand to="/">Andrew Frazier</Brand>
      <NavLinks>
        <NavLink to="/resume" className={location.pathname === '/resume' ? 'active' : ''}>
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
        <NavLink to="/strava" className={location.pathname === '/strava' ? 'active' : ''}>
          Strava
        </NavLink>
        <NavLink 
          as="a" 
          href="https://github.com/FrazierAndrew" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;