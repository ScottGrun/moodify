import React from 'react';
import styled from 'styled-components';
import Profile from './Profile';

import logo from '../../assets/logo.svg';
import menu from '../../assets/menu.svg';

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .profile {
    margin-right: 20px;
  }

  .menu {
    display: none;
    height: 36px;
  }

  @media(max-width: 768px) {
    .profile {
      display: none;
    }

    .menu {
      display: block;
    }
  }
`;

export default function(Header) {

  return(
    <HeaderContainer>
      <img src={logo} />
      <div className='profile'>
        <Profile />
      </div>
      <div className='menu'>
        <img src={menu} />
      </div>
    </HeaderContainer>
  );
};