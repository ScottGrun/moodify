import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import downArrow from '../../assets/down-arrow.svg';

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .profile {
    display: flex;
    width: 160px;
    height: 40px;
    position: relative;

    .image-container {
      height: 100%;
      width: 40px;
      background-color: #12172C;
      border-radius: 50%;
      position: absolute;
      left: -20px;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }

    .profile-name {
      color: white;
      width: 100%;
      height: 100%;
      background-color: #12172C;
      position: absolute;
      display: flex;
      align-items: center;
      padding-left: 25px;
    }

    .profile-dropdown {
      height: 100%;
      width: 40px;
      background-color: #12172C;
      border-radius: 50%;
      position: absolute;
      right: -20px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
      }
    }
  }
`;

export default function Header() {

  return(
    <HeaderContainer>
      <img src={logo} />
      <Header />
    </HeaderContainer>
  );
};