import React from "react";
import PlaylistItemContainer from "../components/Main/PlaylistItemContainer";

export default {
  title: "Playlist Container",
  component: PlaylistItemContainer,
};

const Template = (args) => <PlaylistItemContainer {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  songs:[
    {  
      imageUrl: "https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee",
      artistName: "Carly Rae Jepsen",
      songName: "Cut To The Feeling",
      danceability: 0.696,
      energy: 0.905,
      key: 2,
      loudness: -2.743,
      mode: 1,
      bpm: 120,
      speechiness: 0.103,
      acousticness: 0.011,
      instrumentalness: 0.000905,
      liveness: 0.302,
      valence: 0.625,
      tempo: 98.002
    }, 
    {  
      imageUrl: "https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee",
      artistName: "Carly Rae Jepsen",
      songName: "Cut To The Feeling",
      danceability: 0.696,
      energy: 0.905,
      key: 2,
      loudness: -2.743,
      mode: 1,
      speechiness: 0.103,
      acousticness: 0.011,
      instrumentalness: 0.000905,
      liveness: 0.302,
      valence: 0.625,
      tempo: 98.002,
      bpm: 120,
    }, 
    {  
      imageUrl: "https://i.scdn.co/image/966ade7a8c43b72faa53822b74a899c675aaafee",
      artistName: "Carly Rae Jepsen",
      songName: "Cut To The Feeling",
      danceability: 0.696,
      energy: 0.905,
      key: 2,
      loudness: -2.743,
      mode: 1,
      speechiness: 0.103,
      acousticness: 0.011,
      instrumentalness: 0.000905,
      liveness: 0.302,
      valence: 0.625,
      tempo: 98.002,
      bpm: 120,
    }
  ]
};
