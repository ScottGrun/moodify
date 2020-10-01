import { filterTracks } from './filter';

//Get average audio features for playlist
export function getAverages(songs) {
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

export function getTotalDuration(filteredTracks) {
  function time_convert(minutes) {
    let hours = Math.floor(minutes / 60);  
    minutes = Math.round(minutes % 60);

    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    return hours + ":" + minutes;         
  }

  if (!filteredTracks) return;

  const totalMs = filteredTracks.reduce((total, track) => {
    return total + track.audio.duration_ms;
  },0);

  const totalSeconds = totalMs / 1000;
  const totalMinutes = totalSeconds / 60;
  return time_convert(totalMinutes);
};