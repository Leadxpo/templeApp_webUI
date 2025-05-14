import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

const ModelLoader = ({ modelPath }) => {
  const obj = useLoader(OBJLoader, modelPath);
  const group = useRef(null);

  useEffect(() => {
    if (!obj) return;
    
    const objClone = obj.clone();
    
    const box = new THREE.Box3().setFromObject(objClone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    objClone.position.sub(center);

    const maxAxis = Math.max(size.x, size.y, size.z);
    const scaleFactor = 2 / maxAxis;
    objClone.scale.setScalar(scaleFactor);
    
    if (group.current) {
      while (group.current.children.length > 0) {
        group.current.remove(group.current.children[0]);
      }
      group.current.add(objClone);
    }
  }, [obj]);

  return (
    <group ref={group}>
    </group>
  );
};

export default ModelLoader;