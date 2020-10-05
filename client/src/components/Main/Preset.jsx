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
  transition: all 0.2s ease-in-out;

  &:hover {
   /* FIX HERE ON HOVER TO SCALE */
    /* filter: brightness(150%); */
    transform: scale(1.05);
  }
  
  .preset-image {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
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

const PresetItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  align-items: center;

  .p {
    align-self: center;
  }
`

export default function Preset(props) {
  const [playlistMinMax, setPlaylistMinMax] = props.playlistMinMax;
  const [state, setState] = useState({
    liked: props.liked
  });

  const handleClick = () => {
    setPlaylistMinMax({ data: props.audio_features, loaded: true });
  };

  const handleHeartClick = () => {
    const presetID = props.id;
    axios.post(`http://localhost:9000/presets/${presetID}/${state.liked ? "unlike" : "like"}`, null, { withCredentials: true })
    .then((res) => {
      console.log(res);
      setState(prev => ({ ...prev, liked: !state.liked }))
    });
  };

  return(
    <PresetItem>
     <PresetItemWrapper  className="preset-image" 
        style={{ backgroundImage: `url(${props.image_url})` }} 
        onClick={handleClick}
        alt="preset">
    <p>{props.name}</p>
   
    </PresetItemWrapper>
    <div className="heart">
      <img src={state.liked ? heartfilled : heartoutline } onClick={handleHeartClick} alt="heart"/> 
    </div>
    </PresetItem>
  );
};
