import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Preset from './Preset';
// import Swiper React components
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
// import additional styles
import '../../styles/swiper.css';
// install Navigation and Pagination modules
SwiperCore.use([Navigation, Pagination]);

const PresetsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  h2 {
    margin-bottom: 20px;
  }

  .presets {
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
`;

const breakpoints = {
  1800: {slidesPerView: 4, slidesPerGroup: 4, spaceBetween: -200},
  1700: {slidesPerView: 4, slidesPerGroup: 3, spaceBetween: -100},
  1600: {slidesPerView: 4, slidesPerGroup: 4, spaceBetween: -60},
  1500: {slidesPerView: 4, slidesPerGroup: 4, spaceBetween: -60},
  1400: {slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 60},
  1300: {slidesPerView: 6, slidesPerGroup: 6, spaceBetween: -40},
  1200: {slidesPerView: 2.5, slidesPerGroup: 2.5, spaceBetween: -75},
  1100: {slidesPerView: 2.25, slidesPerGroup: 2.25, spaceBetween: -100},
  1000: {slidesPerView: 2.25, slidesPerGroup: 2.25, spaceBetween: -100},
  900: {slidesPerView: 2.25, slidesPerGroup: 2.25, spaceBetween: -100},
  800: {slidesPerView: 2.25, slidesPerGroup: 2.25, spaceBetween: -100},
  700: {slidesPerView: 2.25, slidesPerGroup: 2.25, spaceBetween: -120},
  600: {slidesPerView: 2, slidesPerGroup: 2, spaceBetween: -100},
  500: {slidesPerView: 1.25, slidesPerGroup: 1.25, spaceBetween: -120},
  400: {slidesPerView: 1, slidesPerGroup: 1, spaceBetween: -100}
}

export default function Presets() {
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
        <SwiperSlide key={preset.id}>
          <Preset { ...preset } liked={userLikesLookup[preset.id]}/>
        </SwiperSlide>
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
    <PresetsContainer>
      <h2><button onClick={() => setActivePresets('popular')}>Popular Presets</button> | <button onClick={() => setActivePresets('yourpresets')}>Your Presets</button> | <button onClick={() => setActivePresets('yourlikedpresets')}>Your Liked Presets</button></h2>
      <div className='presets'>
        <div className='swiper-button-prev swiper-button-white' />
        <Swiper
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          }}
          // spaceBetween={50}
          // slidesPerView={3}
          // slidesPerGroup={3}
          breakpoints={breakpoints}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {state.swiperSlides}
        </Swiper>
        <div className='swiper-button-next swiper-button-white' />
        <div className='swiper-pagination swiper-pagination-white'/>
      </div>
    </PresetsContainer>
  );
};
