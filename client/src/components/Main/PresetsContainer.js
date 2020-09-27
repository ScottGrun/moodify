import React from "react";
import styled from "styled-components";
import Preset from './Preset';

const PresetsContainer = styled.div`
  display: flex;
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
    times_applied: 1
  } 
];

export default function Presets() {

  const presets = presetsData.map((preset) => <Preset {...preset} />);

  return(
    <PresetsContainer>
      <h2>Popular Presets</h2>
      <div className='presets'>
        {presets}
      </div>
    </PresetsContainer>
  );
};
