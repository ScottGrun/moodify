import React, { useContext, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { StateContext } from '../../App';

// like heart icons
import heartoutline from '../../assets/icons/heartoutline.svg';
import heartfilled from '../../assets/icons/heartfilled.svg';

const PresetItem = styled.div`
  height: 80px;
  width: 80px;
  cursor: pointer;
  position: relative;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: brightness(150%);
  }
  
  .preset-image {
    height: auto;
    width: auto;
  }

  .heart {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: none;
    padding: 5px;
  }

  @media(max-width: 768px) {
    height: 70px;
    width: 70px;

    .preset-image {
      height: 70px;
      width: 70px;
    }
  }
`;

export default function Preset(props) {
  
  const [chartValues, setChartValues] = useContext(StateContext).ChartValues;
  const [playlistMinMax, setPlaylistMinMax] = useContext(StateContext).PlaylistMinMax;
  const [state, setState] = useState({
    liked: props.liked
  });

  const handleClick = () => {
    console.log(props.audio_features);
    setPlaylistMinMax({ data: props.audio_features, loaded: true });
  };

  const handleHeartClick = () => {
    const presetID = props.id;
    console.log(presetID);
    axios
      .post(`http://localhost:9000/presets/${presetID}/${state.liked ? "unlike" : "like"}`, null, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setState(prev => ({ ...prev, liked: !state.liked }))
      });
  };

  return(
    <PresetItem>
      <img src={props.image_url} 
      onClick={handleClick}
      className="preset-image" 
      alt="preset"/>
      <div className="heart">
        <img src={state.liked ? heartfilled : heartoutline} onClick={handleHeartClick} alt="heart"/> 
      </div>
    </PresetItem>
  );
};
