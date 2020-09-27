import React, { useEffect, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { StateContext } from '../../App';
import SpotifyWebApi from 'spotify-web-api-node';
import Header from './Header';

// Components
import PlaylistItemContainer from './PlaylistItemContainer';
const Main = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [accessToken, setAccessToken] = useContext(StateContext).AccessToken;
  const [userTracks, setTracks] = useState({ loading: false, songs: [] });

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
    const songsWithAudioFeatures = songList.map((song) => song.id);
    return songsWithAudioFeatures;
  };
  const allSongs = [];



  useEffect(() => {
    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
      clientId: '0308728f27674395b181e8b7680b9e04',
      clientSecret: '952434dcc1c14fbfbe00af6ac6d5edd7',
      redirectUri: 'http://localhost:3000/',
    });

    spotifyApi.setAccessToken(
      'BQAXdEVH1sKvRg_UB-UaNZQd2vRnJ0LBtCEEqBZdU5l6PZvgBPHNsNkTfIPdFoF3vTDhj7DxkplPyxsXsVZPdBwBtra5hkgtcWzlOux_JxHZ5RdtcsfY2k3jrQWK-ifSiGscQKS_mD0aPOcnCHFTeN773TNPaUWGTODVxLu9p-E3RzSfC9gntu80IUwTfd7_HSO1w4D8FAAcTh_nO8s_Wq4Tzlwlfrp_uy7WMeQMraFb4A5nXQ',
    );
    let totalSongs = 0;
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
              );
          }
          console.log('test');
        },
        function (err) {
          console.log('Something went wrong!', err);
        },
      )
      .then(() => {
        setTracks(prev => ({...prev, songs: allSongs}));

        setTimeout(()=>{
          setTracks(prev => ({loading:true, songs: allSongs}));

        }, 2000)
      });
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
      <Header />
      <h1>This is the Main Page.</h1>
      <button onClick={getTrack}>Get a track!</button>
      <button onClick={logout}>Logout</button>
      {userTracks.loading && <PlaylistItemContainer songs={userTracks.songs} />}
    </div>
  );
};

export default Main;
