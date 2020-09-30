import React, { useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { StateContext } from '../../App';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  overflow: hidden;
  border-radius: 5px;
  position: absolute;
  top: 0;
  right: 0%;
  width: 200px;
  height: 100px;

  @media(max-width: 1280px) {
   
      display: none;
    
  }
  

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
      border-radius: 3px;
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
    opacity: 0;
    height: 60px;
    background-color: #12172C;
    width: 100%;
    padding: 10px;
    transition: transform 0.2s ease-in-out;
    transform: translateY(-60px);
    ${({ open }) => open && `
      transform: translateY(0);
      opacity: 1;
      
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