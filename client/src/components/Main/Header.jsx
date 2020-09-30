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
        <Profile />
    </HeaderContainer>
  );
};