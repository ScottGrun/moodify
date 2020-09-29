import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { StateContext } from '../../App';

import logo from '../../assets/logo.svg';

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 80px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #191F35;

  .profile {
    margin-right: 20px;
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
      <img src={logo} />
      <div className='profile'>
        <Profile />
      </div>
    </HeaderContainer>
  );
};