import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import Preset from './Preset';
import axios from 'axios';

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  /* rgba(103,58,183,1) */
  * {
    outline: none !important;
  }

  .rec-arrow {
    color: white;
    background-color: #341a68;

    &:hover {
      background-color: rgba(103,58,183,1);
    }

    &:disabled:hover {
      background-color: #341a68;
    }

    &:disabled {
      cursor: default;
      color: #777777;
    }
  }
`;

// width of container
const breakPoints = [
  {width: 250, itemsToShow: 2},
  {width: 300, itemsToShow: 3},
]

export default (props) => {
  const [chartValues, setChartValues] = props.chartValues;
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [state, setState] = useState({swiperSlides: []});

  const buildSwiperSlidesFromPresets = (presets, userLikesLookup) => {
    const slides = presets.map(preset => {
      return <Preset 
        { ...preset } 
        liked={userLikesLookup[preset.id]}
        chartValues={props.chartValues}
        playlistMinMax={props.playlistMinMax}
      />
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

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:9000/presets/popular`, { withCredentials: true }),
      axios.get(`http://localhost:9000/presets/yourlikedpresets`, { withCredentials: true })
    ]).then((all) => {
      const userLikesLookup = buildLikesLookup(all[1].data);
      const swiperSlides = buildSwiperSlidesFromPresets(all[0].data, userLikesLookup);
      setState(prev => ({ ...prev, swiperSlides }));
    })
  },[]);

  return(
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