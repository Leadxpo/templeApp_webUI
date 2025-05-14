import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelLoader from './ModelLoader';

const ModelViewer = ({ modelPath }) => {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ModelLoader modelPath={modelPath} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;