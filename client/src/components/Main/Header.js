import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { StateContext } from '../../App';

import logo from '../../assets/logo.svg';

const HeaderContainer = styled.div`
  width: 100vw;
  background-color: #191F35;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;

  .header-content {
    width: 100%;
    max-width: 1440px;
    height: 80px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191F35;
    position: relative;

    .profile {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }

  @media(max-width: 1300px) {
    .profile {
      display: none;
    }
  }
`;

export default function(Header) {
  const [ openNav, setOpenNav ] = useContext(StateContext).OpenNav;

  return(
    <HeaderContainer>
      <div className='header-content'>
        <img src={logo} />
        <div className='profile'>
          <Profile />
        </div>
      </div>
    </HeaderContainer>
  );
};