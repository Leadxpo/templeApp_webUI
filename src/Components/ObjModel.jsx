import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'

export default function LModel() {
  const obj = useLoader(OBJLoader, '/models/L.obj')
  const group = useRef()

  // Auto-center and scale the object after it's loaded
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(obj)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    // Move the object so it's centered
    obj.position.sub(center)

    // Optional: uniformly scale the object if too big/small
    const maxAxis = Math.max(size.x, size.y, size.z)
    const scaleFactor = 2 / maxAxis // Adjust based on size
    obj.scale.setScalar(scaleFactor)
  }, [obj])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003
    }
  })

  return (
    <group ref={group}>
      <primitive object={obj} />
    </group>
  )
}