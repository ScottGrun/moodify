//Get average audio features for playlist
export default function getAverages(songs) {
  let playlistAudioFeaturesAverages = {
    energy: 0,
    danceability: 0,
    valence: 0,
    instrumentalness: 0,
    loudness: 0,
  };

  songs.forEach((song) => {
    playlistAudioFeaturesAverages.energy += song.audio.energy;
    playlistAudioFeaturesAverages.danceability += song.audio.danceability;
    playlistAudioFeaturesAverages.valence += song.audio.valence;
    playlistAudioFeaturesAverages.instrumentalness += song.audio.instrumentalness;
    playlistAudioFeaturesAverages.loudness += song.audio.loudness + 60;
  });

  for (const key in playlistAudioFeaturesAverages) {
    if (key === 'loudness') {

      playlistAudioFeaturesAverages[key] = playlistAudioFeaturesAverages[key] / songs.length;
    } else {
      playlistAudioFeaturesAverages[key] = Math.round(
        (playlistAudioFeaturesAverages[key] / songs.length) * 100,
      );
    }
  }
  return Object.values(playlistAudioFeaturesAverages);
};