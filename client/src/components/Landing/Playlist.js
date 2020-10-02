import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import playlist1 from './assets/playlist1.png';
import playlist2 from './assets/playlist2.png';
import playlist3 from './assets/playlist3.png';
import playlist4 from './assets/playlist4.png';
import playlist5 from './assets/playlist5.png';
import playlist6 from './assets/playlist6.png';
import playlist7 from './assets/playlist7.png';
import playlist8 from './assets/playlist8.png';
import playlist9 from './assets/playlist9.png';

const PlaylistContainer = styled.div`
  width: 100%;
  overflow: hidden;
  color: white;
  height: 140vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  h1 {
    font-size: 40px;
  }

  .playlist-items {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;

    img {
      margin-bottom: 7px;
      border-radius: 4px;
    }
  }
`;

export default function Playlist() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <PlaylistContainer>
      <h1>Wait for your tracks to load...</h1>
      <div 
        className='playlist-items'
        style={{ transform: `translateY(${ offsetY * 0.5 }px)` }}
      >
        <img src={playlist1} />
        <img src={playlist2} />
        <img src={playlist3} />
        <img src={playlist4} />
        <img src={playlist5} />
        <img src={playlist6} />
        <img src={playlist7} />
        <img src={playlist8} />
        <img src={playlist9} />
      </div>
    </PlaylistContainer>
  )
};