import React from "react";
import styled from "styled-components";
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

const presetsData = [
  {
    key: '1',
    name: 'Cool preset',
    description: 'This is my cool preset.',
    acousticness: 0.514,
    danceability: 0.735,
    energy: 0.578,
    instrumentalness: 0.0902,
    loudness: -11.840,
    speechiness: 0.0461,
    valence: 0.624,
    tempo: 98.002,
    times_applied: 1
  }, 
  {
    key: '2',
    name: 'My awesome preset',
    description: 'Awesome soundz.',
    acousticness: 0.675,
    danceability: 0.421,
    energy: 0.318,
    instrumentalness: 0.046,
    loudness: -23.040,
    speechiness: 0.024,
    valence: 0.384,
    tempo: 85.000,
    times_applied: 1
  }, 
  {
    key: '3',
    name: 'Preset for my music',
    description: 'How does this sound?',
    acousticness: 1.0,
    danceability: 1.0,
    energy: 1.0,
    instrumentalness: 1.0,
    loudness: -50.00,
    speechiness: 1.0,
    valence: 1.0,
    tempo: 100.0,
    times_applied: 1
  }, 
  {
    key: '4',
    name: 'PrEsEt!!!',
    description: 'Wut does it do?',
    acousticness: 0.023,
    danceability: 0.45,
    energy: 0.745,
    instrumentalness: 1.0,
    loudness: 10.00,
    speechiness: 1.0,
    valence: 0.80,
    tempo: 95.0,
    times_applied: 25
  },
  {
    key: '5',
    name: 'my preset',
    description: 'good tunes',
    acousticness: 0.023,
    danceability: 0.45,
    energy: 0.745,
    instrumentalness: 1.0,
    loudness: 10.00,
    speechiness: 1.0,
    valence: 0.80,
    tempo: 95.0,
    times_applied: 10
  },
  {
    key: '6',
    name: 'great filter',
    description: 'sick',
    acousticness: 0.023,
    danceability: 0.45,
    energy: 0.745,
    instrumentalness: 1.0,
    loudness: 10.00,
    speechiness: 1.0,
    valence: 0.80,
    tempo: 95.0,
    times_applied: 33
  } 
];

export default function Presets() {

  const sortedPresets = presetsData.sort((a, b) => b.times_applied - a.times_applied); 

  const presets = sortedPresets.map((preset) => <SwiperSlide><Preset {...preset} /></SwiperSlide>);

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
          spaceBetween={50}
          slidesPerView={3}
          slidesPerGroup={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {presets}
        </Swiper>
        <div className='swiper-button-next swiper-button-white' />
        <div className='swiper-pagination swiper-pagination-white'/>
      </div>
    </PresetsContainer>
  );
};
