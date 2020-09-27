import React from "react";
import styled from "styled-components";

// image 
import presetImage from '../../assets/preset-image.svg';

const PresetItem = styled.div`
  height: 80px;
  width: 80px;

  .preset-image {
    height: 80px;
    width: 80px;
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

export default function Preset() {

  return(
    <PresetItem>
      <img src={presetImage} className="preset-image" alt="preset"/>
    </PresetItem>
  );
};
