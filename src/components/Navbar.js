import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background-color: rgba(175, 211, 243, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 2rem;
  z-index: 1000;
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(47, 43, 36);
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: rgb(53, 57, 61);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
  position: relative;

  &:hover {
    color: rgb(47, 43, 36);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background-color: rgb(47, 43, 36);
    transform: scaleX(0);
    transition: transform 0.2s;
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

function Navbar() {
  const location = useLocation();

  return (
    <Nav>
      <Brand to="/">Andrew</Brand>
      <NavLinks>
        <NavLink to="/a" className={location.pathname === '/a' ? 'active' : ''}>
          strava
        </NavLink>
        <NavLink to="/b" className={location.pathname === '/b' ? 'active' : ''}>
          b
        </NavLink>
        <NavLink to="/c" className={location.pathname === '/c' ? 'active' : ''}>
          c
        </NavLink>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;