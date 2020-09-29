import React from 'react';
import PlaylistItem from '../components/Main/PlaylistItem';

export default {
  title: 'Playlist Item',
  component: PlaylistItem,
};

const Template = (args) => <PlaylistItem {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  img: 'https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee',
  artist: 'Carly Rae Jepsen',
  name: 'Cut To The Feeling',
  //previewUrl: "https://p.scdn.co/mp3-preview/ff9c292ae17e7e65d67828df5ad7467b31dbcd00?cid=60eafbfca0174c00afe35882d73ad389",
  audio: {
    danceability: 0.696,
    energy: 0.905,
    key: 2,
    loudness: -2.743,
    mode: 1,
    instrumentalness: 0.103,
    acousticness: 0.011,
    instrumentalness: 0.000905,
    liveness: 0.302,
    valence: 0.625,
    tempo: 98.002,
  },
};
