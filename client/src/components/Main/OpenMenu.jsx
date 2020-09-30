import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../../App';

const OpenMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all .5s ease-in-out;

  .menu-btn__burger {
    width: 20px;
    height: 2px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(255, 101, 47, .2);
    transition: all .5s ease-in-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background: white;
      border-radius: 2px;
      box-shadow: 0 2px 5px rgba(255, 101, 47, .2);
      transition: all .5s ease-in-out;
    }

    &::before {
      transform: translateY(-6px);
      ${({ open }) => open && `
        transform: rotate(45deg) translate(35px, -35px);
      `}
    }

    &::after {
      transform: translateY(6px);
      ${({ open }) => open && `
        transform: rotate(-45deg) translate(35px, 35px);
      `}
    }
  }

  .open {
    transform: translateX(-50px);
    background: transparent;
    box-shadow: none;
  }
`;


export default function OpenMenu() {
  const [ openNav, setOpenNav ] = useContext(StateContext).OpenNav;

  return (
    <OpenMenuContainer open={openNav}>
      <div className={`menu-btn__burger ${openNav ? 'open' : ''}`}></div>
    </OpenMenuContainer>
  );
};