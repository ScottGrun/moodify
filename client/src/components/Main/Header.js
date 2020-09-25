import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  background-color: #191F35;
  /* font-family: Inter;
  color: white; */
`;

export default function(Header) {

  return(
    <HeaderContainer>
      Jeffrey Cao
    </HeaderContainer>
  );
};