import React from "react";
import styled from "styled-components";

// images 
import image1 from '../../assets/preset-image-library/preset-image1.svg';
import image2 from '../../assets/preset-image-library/preset-image2.svg';
import image3 from '../../assets/preset-image-library/preset-image3.svg';
import image4 from '../../assets/preset-image-library/preset-image4.svg';
import image5 from '../../assets/preset-image-library/preset-image5.svg';
import image6 from '../../assets/preset-image-library/preset-image6.svg';
import image7 from '../../assets/preset-image-library/preset-image7.svg';
import image8 from '../../assets/preset-image-library/preset-image8.svg';
import image9 from '../../assets/preset-image-library/preset-image9.svg';
import image10 from '../../assets/preset-image-library/preset-image10.svg';
import image11 from '../../assets/preset-image-library/preset-image11.svg';
import image12 from '../../assets/preset-image-library/preset-image12.svg';
import image13 from '../../assets/preset-image-library/preset-image13.svg';
import image14 from '../../assets/preset-image-library/preset-image14.svg';
import image15 from '../../assets/preset-image-library/preset-image15.svg';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15];

const randomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

const PresetItem = styled.div`
  height: 80px;
  width: 80px;

  .preset-image {
    /* height: 100%;
    width: 100%; */
    height: auto;
    width: auto;
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
      <img src={randomImage()} className="preset-image" alt="preset"/>
    </PresetItem>
  );
};
