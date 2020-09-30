import React, { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { StateContext } from '../../App';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 200px;
  border-radius: 4px;

  .profile-dropdown {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #12172C;
    width: 100%;
    height: 40px;
    padding: 5px;
    z-index: 100;
    
    &:hover {
      cursor: pointer;
    }

    .profile-pic {
      width: 30px;
      height: 30px;
      background-image: url('https://i.imgur.com/fH8okuG.jpg');
      background-size: cover;
      background-position: center;
      margin-right: 10px;
    }

    .profile-name {
      color: white;
      user-select: none;
    }

    ion-icon {
      position: absolute;
      right: 10px;
      color: white;
      font-size: 20px;
    }
  }

  .dropdown-container {
    height: 60px;
    background-color: #12172C;
    width: 100%;
    padding: 10px;
    transition: transform 0.2s ease-in-out;
    transform: translateY(-60px);
    ${({ open }) => open && `
      transform: translateY(0);
    `}


    ul {
      color: #ccc;

      li {
        list-style: none;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        user-select: none;

        ion-icon {
          font-size: 20px;
          color: white;
          margin-right: 10px;
        }

        &:hover {
          background-color: #191F35;
          cursor: pointer;
        }
      }
    }
  }

  @media(max-width: 768px) {
    background-color: #1C1D20;

    .header {
      display: flex;
    }
  }
`;

export default function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => {
    setOpen(prev => !open);
  };

  const logout = () => {
    removeCookie('accessToken');
    setAccessToken(null);
    window.location = 'http://localhost:3000';
  };

  return(
    <ProfileContainer open={open}>
      {/* <div className='profile' onClick={toggleDropdown}>
        <div className='image-container'>
          <img src={profilePic} />
        </div>
        <div className='profile-name'>Eric Romar</div>
        <div className='profile-dropdown'>
          <img src={downArrow} />
        </div>
      </div> */}
      <div className='profile-dropdown' onClick={toggleDropdown}>
        <img className='profile-pic' />
        <p className='profile-name'>Eirc Romar</p>
        <ion-icon className='dropdown-icon' name="chevron-down-outline"></ion-icon>
      </div>
      <div className='dropdown-container'>
        <ul>
          <li onClick={logout}>
            <ion-icon name="exit-outline"></ion-icon>
            Logout
          </li>
        </ul>
      </div>
    </ProfileContainer>
  );
};