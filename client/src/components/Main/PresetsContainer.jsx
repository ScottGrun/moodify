import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';
import Preset from './Preset';
import axios from 'axios';

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;

`;

const breakPoints = [
  {width: 250, itemsToShow: 2},
  {width: 300, itemsToShow: 3},
]

export default () => {
  const [state, setState] = useState({
    swiperSlides: [],
  });

  const getUserLikedPresets = () => {
    return axios
      .get(`http://localhost:9000/presets/yourlikedpresets`, { withCredentials: true });
  };

  const buildSwiperSlidesFromPresets = (presets, userLikesLookup) => {
    const swiperSlides = presets.map((preset) => {
      return (
        <Preset { ...preset } liked={userLikesLookup[preset.id]}/>
      )
    })
    return swiperSlides;
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
      getUserLikedPresets(),
    ]).then((all) => {
      const userLikesLookup = buildLikesLookup(all[1].data);
      const swiperSlides = buildSwiperSlidesFromPresets(all[0].data, userLikesLookup);
      setState(prev => ({ ...prev, swiperSlides }));
    })
  };

  useEffect(() => {
    setActivePresets('popular');
  },[]);

  return(
    <CarouselContainer>
      <Carousel breakPoints={breakPoints}>
        {state.swiperSlides}
      </Carousel>
    </CarouselContainer>
  )
};