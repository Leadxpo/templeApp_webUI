import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshStandardMaterial } from 'three';

const ObjModel = ({ path, color = '#8A2BE2' }) => {
  const obj = useLoader(OBJLoader, path);
  const ref = useRef();

  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({ color });
      }
    });
  }, [obj, color]);

  // Rotate the model continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref} scale={[0.01, 0.01, 0.01]} position={[0, -1, 0]}>
      <primitive object={obj} />
    </group>
  );
};

export default ObjModel;
