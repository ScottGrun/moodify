import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';
import SpotifyWebApi from 'spotify-web-api-node';

// Components
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import PlaylistItemContainer from '../PlaylistItemContainer';
const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [userTracks, setTracks] = useState([]);

  const parseSongs = (songList) => {
    const songs = songList.map((song) => ({
      name: song.track.name,
      id: song.track.id,
      artist: song.track.artists[0].name,
      img: song.track.album.images[2].url,
    }));
    return songs;
  };

  const parseAudioFeatures = (songList) => {
    const songsWithAudioFeatures = songList.map(song => song.id);
    return songsWithAudioFeatures;
  };

  useEffect(() => {
    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
      clientId: '0308728f27674395b181e8b7680b9e04',
      clientSecret: '952434dcc1c14fbfbe00af6ac6d5edd7',
      redirectUri: 'http://localhost:3000/',
    });

    spotifyApi.setAccessToken(
      'BQBpHOFctZv0VTgzqToym-0cYv1tAi1SjO88mbRthYcTqGNZn9hmtrB1V-00Kh39NSoTWmowrbL7Rd0WiqWuxH8CNOoq7hMtoX_ecaJLY7w42rG94wpY6n1Iw12RLtnyTGjmtZp56FhKn7mz9-U3gp5mwr8XOuv-HWAcp_RrUWbvbZAoq98BgpJ4REETgKXHijXKUo_VmHUct_ZHtBfl5IXlxA4b85bNpYAAaMMC1mT_ynDTyQ',
    );
    let totalSongs = 0;
    const allSongs = [];
    spotifyApi
      .getMySavedTracks({
        limit: 50,
        offset: 1,
      })
      .then(
        function (data) {
          console.log('Done!');
          totalSongs = data.body.total;
          allSongs.push(...parseSongs(data.body.items));
          for (let i = 1; i * 50 <= totalSongs; i++) {
            spotifyApi
              .getMySavedTracks({
                limit: 50,
                offset: i * 50,
              })
              .then(
                function (data) {
                  console.log('Done!');
                  allSongs.push(...parseSongs(data.body.items));
                },
                function (err) {
                  console.log('Something went wrong!', err);
                },
              ).then(()=>{
                setTracks(allSongs)

              })
          }
        },
        function (err) {
          console.log('Something went wrong!', err);
        },
      )
      console.log(allSongs);
  }, []);

  const getTrack = () => {
    axios
      .post(`http://localhost:9000/data/track`, {
        accessToken,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const logout = () => {
    removeCookie('accessToken');
    setAccessToken(null);
    window.location = 'http://localhost:3000';
  };

  return (
    <div>
      <h1>This is the Main Page.</h1>
      <button onClick={getTrack}>Get a track!</button>
      <button onClick={logout}>Logout</button>
      <PlaylistItemContainer songs={userTracks} />
    </div>
  );
};

export default Main;
