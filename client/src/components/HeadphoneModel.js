import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import { Canvas } from 'react-three-fiber';
import { Html, useGLTFLoader } from 'drei';
import turntable from '../assets/turntable.gltf';

const HeadphoneModelContainer = styled.div`

`;

const HTMLContentContainer = styled.div`
  width: 600px;
  height: 600px;

  .title {
    color: white;
  }
`;

const Model = () => {
  const gltf = useGLTFLoader('../assets/turntable.gltf', true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const HTMLContent = () => {
  return(
    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh position={[0, 30, 0]}>
          <Model />
        </mesh>
        <Html fullscreen>
          <HTMLContentContainer>
            <h1 className='title'>Hello</h1>
          </HTMLContentContainer>
        </Html>
      </group>
    </Section>
  );
};

export default function HeadphoneModel() {
  return(
    <HeadphoneModelContainer>
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>
      </Canvas>
    </HeadphoneModelContainer>
  );
};