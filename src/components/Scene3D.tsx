"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { TextureType } from "@/lib/textureGenerators";
import { getTextureGenerator } from "@/lib/textureGenerators";

interface LatticeWallProps {
  ancho: number;
  alto: number;
  textureType: TextureType;
}

function LatticeWall({ ancho, alto, textureType }: LatticeWallProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const gen = getTextureGenerator(textureType);
    const canvas = gen();
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(Math.ceil(ancho * 2), Math.ceil(alto * 2));
    return tex;
  }, [textureType, ancho, alto]);

  return (
    <mesh ref={meshRef} position={[0, alto / 2, 0]}>
      <planeGeometry args={[ancho, alto]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

function RoomWalls() {
  return (
    <group>
      <mesh position={[0, 2.5, -2.5]}>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#f0f0f0" side={THREE.BackSide} />
      </mesh>
      <mesh position={[-3, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#e8e8e8" side={THREE.BackSide} />
      </mesh>
      <mesh position={[3, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#e8e8e8" side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[10, 10, "#000000", "#666666"]}
      position={[0, -0.01, 0]}
    />
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
    </>
  );
}

interface Scene3DProps {
  ancho: number;
  alto: number;
  textureType: TextureType;
}

export default function Scene3D({ ancho, alto, textureType }: Scene3DProps) {
  return (
    <Canvas
      camera={{ position: [4, 2.5, 4], fov: 45, near: 0.1, far: 50 }}
      className="w-full h-full"
    >
      <SceneLighting />
      <RoomWalls />
      <LatticeWall ancho={ancho} alto={alto} textureType={textureType} />
      <GridFloor />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={0.1}
        target={[0, alto / 2, 0]}
      />
    </Canvas>
  );
}
