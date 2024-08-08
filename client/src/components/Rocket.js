import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame,  useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Rocket = forwardRef((props, ref) => {
  const rocketRef = useRef();
  const { scene } = useLoader(GLTFLoader, '/rocket.gltf');

  useImperativeHandle(ref, () => ({
    launchRocket,
  }));

  useEffect(() => {
    scene.scale.set(0.5, 0.5, 0.5);
    rocketRef.current.add(scene);
  }, [scene]);

  useFrame(() => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.01;
    }
  });

  const launchRocket = () => {
    const rocket = rocketRef.current;
    if (rocket) {
      const launch = () => {
        rocket.position.y += 0.1;
        if (rocket.position.y < 50) {
          requestAnimationFrame(launch);
        }
      };
      launch();
    }
  };

  return (
    <group ref={rocketRef} {...props} />
  );
});

const RocketScene = forwardRef((props, ref) => {
  const rocketRef = useRef();

  useImperativeHandle(ref, () => ({
    launchRocket: () => {
      if (rocketRef.current) {
        rocketRef.current.launchRocket();
      }
    },
  }));

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Rocket ref={rocketRef} position={[0, -3, 0]} />
      <SkyBox />
    </Canvas>
  );
});

const SkyBox = () => {
  const { scene } = useThree();
  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      '/skybox/px.jpg', '/skybox/nx.jpg',
      '/skybox/py.jpg', '/skybox/ny.jpg',
      '/skybox/pz.jpg', '/skybox/nz.jpg',
    ]);
    scene.background = texture;
  }, [scene]);
  return null;
};

export default RocketScene;
