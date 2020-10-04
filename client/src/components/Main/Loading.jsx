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

const Loader = styled.div`
  margin-left: 40%;
  margin-top: 25%;

  p {
    display: block;
    width: 100%;
    color: white;
    font-family: 'Inter';
    font-weight: 500;
    margin-top: 1rem;
  }
`;

const StyledImg = styled.img`
  animation: ${spin} 5s infinite linear;
`;

const Loading = () => {
  return (
    <Loader>
      <StyledImg src={VinylIcon} />
    </Loader>
  );
};

export default Loading;
