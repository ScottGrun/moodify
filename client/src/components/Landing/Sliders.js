import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SlidersContainer = styled.div`
  width: 100%;
  overflow: hidden;
  color: white;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 40px;
  }
  
`;

export default function Parallax() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  },[]);

  return (
    <SlidersContainer>
      <h1>Filter music by specifying range of each attribute</h1>
    </SlidersContainer>
  )
};