import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import Preset from './Preset';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const CarouselContainer = styled.div`
  .preset-container {
    width: 100px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rec-carousel-item{
    width: auto;
    min-width: auto;
  }

  .rec-slider{
    display: flex;
    align-items: center;
    height: 85px;
  }

  .rec.rec-arrow {
    background:none;
    padding: none;
    margin: none;
    width: auto;
    min-width: auto;
    box-shadow: none;
  }

  .rec-dot{
    background-color: #989AA4;
    border: none;
    outline: none;
    width: 6px;
    height: 6px;
  }

  .rec-dot_active{
    border: none;
    outline: none;
    box-shadow: none;
    background-color: white;
  }

  .rec.rec-arrow:disabled:hover {
    background:none;
    box-shadow: none;
  }

  .rec.rec-arrow:hover {
    background:none;
    box-shadow: none;
}

  width: 100%;
  overflow: hidden;
  * {
    outline: none !important;
  }

  .rec-arrow {
    color: white;
    background-color: #242e51;
    
    &:hover {
      background-color: #2ed689;
    }
    
    &:disabled:hover {
      background-color: #242e51;
    }

    &:disabled {
      cursor: default;
      color: #777777;
    }
  }

  .rec-dot {
    &:hover {
      box-shadow: 0 0 1px 3px rgba(46, 214, 137, 1) 
    }
  }

  .rec-dot_active {
    background-color: rgba(46, 214, 137, 1);
    box-shadow: none;
  }
`;

// width of container
const breakPoints = [
  {width: 250, itemsToShow: 2},
  {width: 300, itemsToShow: 3},
  {width: 350, itemsToShow: 4},
]

export const displayedPresetsLabels = {
  popular: 'Popular Presets',
  yourpresets: 'Your Presets',
  yourlikedpresets: 'Liked Presets'
};

export const displayedPresetsPaths = ["popular", "yourpresets", "yourlikedpresets"];

export default (props) => {
  const [chartValues, setChartValues] = props.chartValues;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [state, setState] = useState({swiperSlides: []});
  const [presets, setPresets] = useState([]);

  const buildSwiperSlidesFromPresets = (presets, userLikesLookup) => {
    const slides = presets.map(preset => {
      return (
        <div className='preset-container' key={uuidv4()}>
          <Preset 
            { ...preset } 
            key={preset.id}
            liked={userLikesLookup[preset.id]}
            chartValues={props.chartValues}
            playlistMinMax={props.playlistMinMax}
          />
        </div>
      );
    })
    return slides;
  };

  const buildLikesLookup = (userLikedPresets) => {
    let likedPresets = {};

    for (const currentPreset of userLikedPresets) {
      likedPresets[currentPreset.id] = true;
    }
    return likedPresets;
  };

  const setActivePresets = (path) => {
    Promise.all([
      axios
        .get(`http://localhost:9000/presets/${path}`, { withCredentials: true }),
      axios
        .get(`http://localhost:9000/presets/yourlikedpresets`, { withCredentials: true })
    ]).then((all) => {
      const userLikesLookup = buildLikesLookup(all[1].data);
      const swiperSlides = buildSwiperSlidesFromPresets(all[0].data, userLikesLookup);
      setState(prev => ({ ...prev, swiperSlides }));
    })
  };

  useEffect(() => {
    setActivePresets(props.displayedPresets);
  },[props.displayedPresets, props.refreshPresetsToggle]);

  return(
    state.swiperSlides && 
    <CarouselContainer>
      <Carousel
        breakPoints={breakPoints}
        enableSwipe={true}
        enableMouseSwipe={true}
        pagination={true}
        enableTilt={true}
        transitionMs={200}
      >
        {state.swiperSlides}
      </Carousel>
    </CarouselContainer>
  )
};
