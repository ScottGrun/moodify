import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import playlistsFull from './assets/playlistsFull.png';
import radarChart from './assets/radarChart.png';

const PlaylistContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  width: calc(100% - 40px);
  height: 80vh;
  color: white;
  margin-bottom: 100px;

  .content-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text-container {
      width: 48%;
      max-width: 442px;

      img {
        margin-bottom: 30px;
        width: 100%;
      }

      h1 {
        font-size: 36px;
        letter-spacing: 2.4px;
        margin-bottom: 10px;
      }
      p {
        font-size: 36px;
        letter-spacing: 1px;
      }
    }

    .playlists {
      width: 48%;
      transform: translateY(50px);
      display: flex;
      justify-content: flex-end;

      img {
        width: 100%;
      }
    }
  }
`;

export default () => {

  return (
    <PlaylistContainer>
      <div className='content-container'>
        <div className='text-container'>
          <img src={playlistsFull} />
          <p>to create the perfect playlist for any mood.</p>
        </div>
        <div className='playlists'>
          <img src={radarChart} />
        </div>
      </div>
    </PlaylistContainer>
  )
};