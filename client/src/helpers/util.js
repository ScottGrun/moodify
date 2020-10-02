export const setSliderMarks = (playlistMinMax, setMarks) => {
  setMarks({
    tempo: [
      {
        value: playlistMinMax.tempo[0],
      },
      {
        value: playlistMinMax.tempo[1],
      },
    ],
    danceability: [
      {
        value: playlistMinMax.danceability[0],
      },
      {
        value: playlistMinMax.danceability[1],
      },
    ],
    energy: [
      {
        value: playlistMinMax.energy[0],
      },
      {
        value: playlistMinMax.energy[1],
      },
    ],
    instrumentalness: [
      {
        value: playlistMinMax.instrumentalness[0],
      },
      {
        value: playlistMinMax.instrumentalness[1],
      },
    ],
    valence: [
      {
        value: playlistMinMax.valence[0],
      },
      {
        value: playlistMinMax.valence[1],
      },
    ],
    loudness: [
      {
        value: playlistMinMax.loudness[0],
      },
      {
        value: playlistMinMax.loudness[1],
      },
    ],
  });
}