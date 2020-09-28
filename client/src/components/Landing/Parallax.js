import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ParallaxContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #191F35;
  overflow: hidden;
  font-size: 40px;

  .first-item {
    height: 400px;
    position: relative;

    .container {
      justify-content: center;
      align-items: center;

      .text-container {
        color: white;
        position: absolute;
        right: -100px;
      }
    }
  }

  .second-item {
    height: 400px;
    position: relative;

    .container {
      justify-content: center;
      align-items: center;

      .text-container {
        color: white;
        position: absolute;
        right: 60vw;
        bottom: 500px;
      }
    }
  }
  
  .third-item {
    height: 400px;
    position: relative;

    .container {
      justify-content: center;
      align-items: center;

      .text-container {
        color: white;
        position: absolute;
        right: calc(-100px - 35vw);
      }
    }
  }

  .fourth-item {
    height: 700px;
    position: relative;

    .container {
      display: flex;
      justify-content: center;
      align-items: center;

      .text-container {
        color: white;
        position: absolute;
        left: -50vw;
        bottom: -200px;
      }
    }
  }
`;

export default function Parallax() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <ParallaxContainer>
      <div className='first-item'>
        <div className='container'>
          <div 
            className='text-container'
            style={{ transform: `translateX(${ offsetY * -0.7 }px)` }}
            >
            <h1>Step 1. Load all your songs in!</h1>
            <p>Click on on of your playlists to load all those songs into your Moodify tracks.</p>
          </div>
        </div>
      </div>
      <div className='second-item'>
        <div className='container'>
          <div 
            className='text-container'
            style={{ transform: `translate(${ offsetY * 0.7 }px, ${ offsetY * 0.4 }px)` }}
            >
            <h1>Step 1. Load all your songs in!</h1>
            <p>Click on on of your playlists to load all those songs into your Moodify tracks.</p>
          </div>
        </div>
      </div>
      <div className='third-item'>
        <div className='container'>
          <div 
            className='text-container'
            style={{ transform: `translateX(${ offsetY * -0.7 }px)` }}
            >
            <h1>Step 1. Load all your songs in!</h1>
            <p>Click on on of your playlists to load all those songs into your Moodify tracks.</p>
          </div>
        </div>
      </div>
      <div className='fourth-item'>
        <div className='container'>
          <div 
            className='text-container'
            style={{ transform: `translate(${ offsetY * 0.7 }px, ${ offsetY * -0.3 }px)` }}
            >
            <h1>Step 1. Load all your songs in!</h1>
            <p>Click on on of your playlists to load all those songs into your Moodify tracks.</p>
          </div>
        </div>
      </div>
    </ParallaxContainer>
  )
};