import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledUL = styled('ul')`
  list-style-type: none;
`;

const StyledLink = styled(NavLink)`
  float: left;
  text-decoration: none;
  padding: 10px;
  color: black;
`;

interface LinkProps {
  onClick?: () => MouseEvent;
}

const Sidebar = ({ onClick }: LinkProps) => {
  return (
    <nav>
      <div>
        <StyledUL>
          <li>
            <StyledLink to='/guests'>
              <h3>Guests</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/checkout'>
              <h3>Checkout</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/houses'>
              <h3>Houses</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/assistants'>
              <h3>Assistants</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/reports'>
              <h3>Reports</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/settings'>
              <h3>Settings</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/billing'>
              <h3>Billing</h3>
            </StyledLink>
          </li>
        </StyledUL>
      </div>
    </nav>
  );
};

export default Sidebar;