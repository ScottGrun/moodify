import React from 'react';
import PlaylistItemContainer from '../components/Main/PlaylistItemContainer';

export default {
  title: 'Playlist Container',
  component: PlaylistItemContainer,
};

const Template = (args) => <PlaylistItemContainer {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  songs: [
    {
      name: 'Numb',
      id: '6TjhwEmv4spicMLFm29xun',
      artist: 'Aaron Richards',
      img: 'https://i.scdn.co/image/ab67616d00004851339b87e4d2d1110fd6789f3b',
    },
    {
      name: 'when u come around (feat. Zak Downtown) [Remix]',
      id: '6alh6VtmUyB8H8KIDLcnb0',
      artist: 'Jay-C',
      img: 'https://i.scdn.co/image/ab67616d00004851d8eda92c972fdc9da8c87df7',
    },
    {
      name: 'Bright Lights',
      id: '4JmXQoDT2d94qnPqAaYLJC',
      artist: 'Lil Hank',
      img: 'https://i.scdn.co/image/ab67616d00004851cf7eeabc7cce499ef463c536',
    },
    {
      name: 'count on',
      id: '1A4tabNlyLKLOHQW2XpjaU',
      artist: 'Shallou',
      img: 'https://i.scdn.co/image/ab67616d0000485100ef15fcfd9a20e97a1d11d8',
    },
    {
      name: 'Somewhere I Belong',
      id: '3agtg0x11wPvLIWkYR39nZ',
      artist: 'Linkin Park',
      img: 'https://i.scdn.co/image/ab67616d00004851b4ad7ebaf4575f120eb3f193',
    },
    {
      name: 'Ghostkeeper',
      id: '13EMVBU1hcy5yJdX1Xhf9a',
      artist: 'Klangkarussell',
      img: 'https://i.scdn.co/image/ab67616d000048516ad09c8c0b0a8f2e468e826a',
    },
    {
      name: 'Kin',
      id: '3RID7FNOsH3XqUcEsgpq5v',
      artist: 'Tourist',
      img: 'https://i.scdn.co/image/ab67616d0000485142f18e4767b714e8b16fc193',
    },
    {
      name: 'Feel It Still - Flatbush Zombies Remix',
      id: '4cSIwCwHBx80sXjBeb9Uw1',
      artist: 'Portugal. The Man',
      img: 'https://i.scdn.co/image/ab67616d0000485153b138bec3f8e43e466f6dcb',
    },
  ],
};
