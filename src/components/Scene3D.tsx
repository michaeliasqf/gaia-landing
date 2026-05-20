"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { TextureType } from "@/lib/textureGenerators";
import Celosia3D from "@/components/Celosia3D";

function InteriorScene() {
  return (
    <group>
      <color attach="background" args={["#f0ebe3"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#c4a882" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3, -5]} receiveShadow>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial color="#f5f0eb" side={THREE.BackSide} />
      </mesh>
      <mesh position={[-7, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#efe8e0" side={THREE.BackSide} />
      </mesh>
      <mesh position={[7, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#efe8e0" side={THREE.BackSide} />
      </mesh>
      <mesh position={[0, 6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#ffffff" side={THREE.BackSide} opacity={0.15} transparent />
      </mesh>
    </group>
  );
}

function ExteriorScene() {
  return (
    <group>
      <color attach="background" args={["#b8dff0"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#5a8f4a" roughness={0.95} />
      </mesh>
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-4, 6, -4]} intensity={0.25} />
      <hemisphereLight args={["#87CEEB", "#3a7d44", 0.4]} />
    </>
  );
}

interface Scene3DProps {
  ancho: number;
  alto: number;
  textureType: TextureType;
  categoria: "Interior" | "Exterior";
}

export default function Scene3D({ ancho, alto, textureType, categoria }: Scene3DProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 2.5, 4], fov: 45, near: 0.1, far: 50 }}
      className="w-full h-full"
    >
      <SceneLighting />
      {categoria === "Interior" ? <InteriorScene /> : <ExteriorScene />}
      <Celosia3D ancho={ancho} alto={alto} textureType={textureType} />
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
