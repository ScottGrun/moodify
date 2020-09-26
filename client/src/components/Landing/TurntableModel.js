import React, { Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTFLoader } from 'drei';
import turntable from '../../assets/turntable.glb';
import state from '../../state';

const TurntableModelContainer = styled.div`
  width: 100%;
  height: 100vh;
  
  .scrollArea {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }

  .container {
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
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
      <directionalLight position={[10, 10, 5]} intensity={1} />;
      <directionalLight position={[0, 10, 0]} intensity={1.5} />;
      <spotLight position={[1000, 0, 0]} intensity={1} />
    </>
  );
};

const HTMLContent = ({ domContent, children, modelPath, positionY }) => {

  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));


  return(
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, 30, 0]}>
          <Model modelPath={modelPath}/>
        </mesh>
        <Html portal={domContent} fullscreen>
          {children}
        </Html>
      </group>
    </Section>
  );
};

export default function TurntableModel() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);

  useEffect(() => void onScroll({ target: scrollArea.current }),[]);

  return(
    <TurntableModelContainer>
      <Canvas colorManagement camera={{ position: [0, 0, 115], fov: 85 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent 
            domContent={domContent} 
            modelPath={turntable} 
            positionY={560} >
            <HTMLContentContainer />
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} >
        <div style={{position: 'sticky', top: 0}} ref={domContent}></div>
        <div style={{height: `${state.sections * 100}vh`}}></div>
      </div>
    </TurntableModelContainer>
  );
};