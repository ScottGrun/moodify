import React from 'react';
import styled, { keyframes } from 'styled-components';
import VinylIcon from '../../assets/icons/vinyl.svg';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const StyledImg = styled.img`
  margin: 0 auto;
  animation: ${spin} 8s infinite linear;
`;

const Loading = () => {
  return <StyledImg src={VinylIcon} />;
};

export default Loading;
