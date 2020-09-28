import React, { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTFLoader } from 'drei';
import turntable from '../../assets/turntable.glb';

const TurntableModelContainer = styled.div`
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const HTMLContentContainer = styled.div`
  display: flex;
  position: absolute;

  .title {
    color: white;
  }
`;

const Model = ({ modelPath }) => {
  const gltf = useGLTFLoader(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={.3} />;
      <directionalLight position={[10, 10, 5]} intensity={.9} />;
      <directionalLight position={[0, 10, 0]} intensity={.5} />;
      <spotLight position={[1000, 0, 0]} intensity={1} />
    </>
  );
};

const HTMLContent = ({ children, modelPath, positionY }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return(
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, 30, 10]}>
          <Model modelPath={modelPath}/>
        </mesh>
        <Html fullscreen>
          {children}
        </Html>
      </group>
    </Section>
  );
};

export default function TurntableModel() {

  return(
    <TurntableModelContainer>
      <Canvas colorManagement camera={{ position: [0, 30, 115], fov: 80.5 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent 
            modelPath={turntable} 
            positionY={555} >
            <HTMLContentContainer />
          </HTMLContent>
        </Suspense>
      </Canvas>
    </TurntableModelContainer>
  );
};