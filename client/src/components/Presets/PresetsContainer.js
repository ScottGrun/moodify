import React from "react";
import styled from "styled-components";
import Preset from './Preset';

const PresetsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80;
  width: 425px;

  @media(max-width: 768px) {
    height: 70px;
    width: 310px;
  }
`;

export default function Presets(props) {

  const presets = props.presets.map((preset) => <Preset {...preset} />);

  return(
    <PresetsContainer>
      {presets}
    </PresetsContainer>
  );
};
