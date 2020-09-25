import React from 'react';
import styled from 'styled-components';
import profilePic from '../assets/profile-pic.svg';
import downArrow from '../assets/down-arrow.svg';

const ProfileContainer = styled.div`
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
        width: 30px;
        height: 30px;
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

export default function(Profile) {

  return(
    <ProfileContainer>
      <div className='profile'>
        <div className='image-container'>
          <img src={profilePic} />
        </div>
        <div className='profile-name'>Eric Romar</div>
        <div className='profile-dropdown'>
          <img src={downArrow} />
        </div>
      </div>
    </ProfileContainer>
  );
};