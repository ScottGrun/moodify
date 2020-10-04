import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Profile from './Profile';
import { StateContext } from '../../App';

import logo from '../../assets/logo.svg';

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;

  @media(max-width: 1280px) {
    .profile-container {
      display: none;
    }
  }
`;

export default function Header(props) {
  const [ openNav, setOpenNav ] = props.openNav;

  return(
    <HeaderContainer>
        <img src={logo} />
        <div className='profile-container'>
          <Profile />
        </div>
    </HeaderContainer>
  );
};