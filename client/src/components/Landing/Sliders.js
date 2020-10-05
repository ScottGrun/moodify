import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import sliders from './assets/sliders.png';

const SlidersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  width: calc(100% - 40px);
  height: 60vh;
  color: white;

  .content-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text-container {
      width: 48%;
      max-width: 442px;

      p {
        font-size: 36px;
        letter-spacing: 1px;
      }
    }

    .sliders {
      width: 48%;

      img {
        width: 100%;
      }
    }
  }
`;

export default () => {

  return (
    <SlidersContainer>
      <div className='content-container'>
        <div className='sliders'>
          <img src={sliders} />
        </div>
        <div className='text-container'>
          <p>using precise custom filtering based on Spotify's audio feature data...</p>
        </div>
      </div>
    </SlidersContainer>
  )
};