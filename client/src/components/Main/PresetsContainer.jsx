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
    presets: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:9000/presets/popular`)
        .then((res) => {
          const presetsResponse = res.data;
          console.log(presetsResponse);
          const presets = presetsResponse.map((preset) => <SwiperSlide key={preset.id}><Preset {...preset} /></SwiperSlide>);
          setState(prev => ({ ...prev, presets }));
          console.log(presets);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
    

  return(
    <PresetsContainer>
      <h2>Popular Presets</h2>
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
          {state.presets}
        </Swiper>
        <div className='swiper-button-next swiper-button-white' />
        <div className='swiper-pagination swiper-pagination-white'/>
      </div>
    </PresetsContainer>
  );
};
