import React from "react";
import PresetsContainer from "../components/Main/PresetsContainer";

export default {
  title: "Presets Container",
  component: PresetsContainer,
};

const Template = (args) => <PresetsContainer {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  presets:[
    {
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
  ]
};
