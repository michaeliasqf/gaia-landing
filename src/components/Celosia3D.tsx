"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { TextureType } from "@/lib/textureGenerators";

interface Celosia3DProps {
  ancho: number;
  alto: number;
  textureType: TextureType;
}

function pseudoRandom(a: number, b: number): number {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

const FW = 0.04;
const FD = 0.05;

function WoodFrame({ ancho, alto, color = "#5c4a32" }: { ancho: number; alto: number; color?: string }) {
  return (
    <group>
      <mesh position={[0, alto, 0]} castShadow>
        <boxGeometry args={[ancho, FW, FD]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[ancho, FW, FD]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[-ancho / 2, alto / 2, 0]} castShadow>
        <boxGeometry args={[FW, alto, FD]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[ancho / 2, alto / 2, 0]} castShadow>
        <boxGeometry args={[FW, alto, FD]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

function MaderaCelosia({ ancho, alto }: { ancho: number; alto: number }) {
  const bw = 0.07;
  const bd = 0.06;

  const hCount = Math.max(2, Math.round(alto / 0.20));
  const vCount = Math.max(2, Math.round(ancho / 0.15));

  return (
    <group>
      {Array.from({ length: hCount }).map((_, i) => (
        <mesh key={`h${i}`} position={[0, (i / (hCount - 1)) * alto, -bd / 2]} castShadow receiveShadow>
          <boxGeometry args={[ancho, bw, bd]} />
          <meshStandardMaterial color="#8b7355" roughness={0.9} />
        </mesh>
      ))}
      {Array.from({ length: vCount }).map((_, i) => (
        <mesh key={`v${i}`} position={[-ancho / 2 + (i / (vCount - 1)) * ancho, alto / 2, bd / 2]} castShadow receiveShadow>
          <boxGeometry args={[bw, alto, bd]} />
          <meshStandardMaterial color="#7a6348" roughness={0.9} />
        </mesh>
      ))}
      <WoodFrame ancho={ancho} alto={alto} color="#5c4a32" />
    </group>
  );
}

function HormigonCelosia({ ancho, alto }: { ancho: number; alto: number }) {
  const triW = 0.40;
  const triH = 0.28;
  const radius = 0.028;

  const cols = Math.max(1, Math.round(ancho / (triW + 0.02)));
  const rows = Math.max(1, Math.round(alto / (triH + 0.02)));
  const spacingX = ancho / cols;
  const spacingY = alto / rows;

  const mergedGeo = useMemo(() => {
    const allGeos: THREE.BufferGeometry[] = [];
    const halfW = triW / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = -ancho / 2 + c * spacingX + spacingX / 2;
        const cy = r * spacingY;

        const p1 = new THREE.Vector3(cx - halfW, cy, 0);
        const p2 = new THREE.Vector3(cx + halfW, cy, 0);
        const p3 = new THREE.Vector3(cx, cy + triH, 0);

        const curves = [
          new THREE.LineCurve3(p1, p2),
          new THREE.LineCurve3(p2, p3),
          new THREE.LineCurve3(p3, p1),
        ];

        for (const curve of curves) {
          allGeos.push(new THREE.TubeGeometry(curve, 4, radius, 5, false));
        }
      }
    }

    return mergeGeometries(allGeos);
  }, [ancho, alto, cols, rows, spacingX, spacingY]);

  return (
    <group>
      <WoodFrame ancho={ancho} alto={alto} color="#5a5a5a" />
      <mesh geometry={mergedGeo} castShadow>
        <meshStandardMaterial color="#6a6a6a" roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  );
}

function OndasCelosia({ ancho, alto }: { ancho: number; alto: number }) {
  const bw = 0.04;
  const bd = 0.04;

  const cols = Math.max(2, Math.round(ancho / 0.12));
  const amp = Math.min(0.06, ancho * 0.01);
  const radius = 0.03;
  const segments = 48;

  const waveGeos = useMemo(() => {
    return Array.from({ length: cols }).map((_, i) => {
      const xBase = -ancho / 2 + (i / (cols - 1)) * ancho;
      const points: THREE.Vector3[] = [];
      const freq = 10 + (i % 4) * 0.5;
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const y = t * alto;
        const x = xBase + Math.sin(t * Math.PI * freq) * amp;
        points.push(new THREE.Vector3(x, y, 0));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      return new THREE.TubeGeometry(curve, segments, radius, 6, false);
    });
  }, [cols, amp, alto, ancho]);

  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[ancho, bw, bd]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, alto, 0]} castShadow>
        <boxGeometry args={[ancho, bw, bd]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[-ancho / 2, alto / 2, 0]} castShadow>
        <boxGeometry args={[bw, alto, bd]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[ancho / 2, alto / 2, 0]} castShadow>
        <boxGeometry args={[bw, alto, bd]} />
        <meshStandardMaterial color="#222" roughness={0.4} metalness={0.3} />
      </mesh>
      {waveGeos.map((geo, i) => (
        <mesh key={i} geometry={geo} castShadow>
          <meshStandardMaterial color="#9a9a9a" roughness={0.35} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CeramicaCelosia({ ancho, alto }: { ancho: number; alto: number }) {
  const tileGeo = useMemo(() => {
    return new THREE.BoxGeometry(0.22, 0.22, 0.025);
  }, []);

  const gap = 0.012;
  const step = 0.232;
  const cols = Math.max(1, Math.round(ancho / step));
  const rows = Math.max(1, Math.round(alto / step));
  const spacingX = ancho / cols;
  const spacingY = alto / rows;

  const palette = ["#d4c5a9", "#c9b99a", "#e0d0b5", "#ccba98", "#d8c8a8"];

  return (
    <group>
      <WoodFrame ancho={ancho} alto={alto} color="#a0845c" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const colorIdx = Math.floor(pseudoRandom(r * 7 + c * 13, r * 31 + c * 5) * palette.length) % palette.length;
          return (
            <mesh
              key={`${r}-${c}`}
              geometry={tileGeo}
              position={[-ancho / 2 + c * spacingX + spacingX / 2, r * spacingY + spacingY / 2, 0]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial color={palette[colorIdx]} roughness={0.85} />
            </mesh>
          );
        })
      )}
    </group>
  );
}

function PVCCelosia({ ancho, alto }: { ancho: number; alto: number }) {
  const moduleSize = 0.28;
  const armWidth = moduleSize * 0.4;
  const depth = 0.025;

  const cols = Math.max(1, Math.floor(ancho / moduleSize));
  const rows = Math.max(1, Math.floor(alto / moduleSize));
  const offX = -ancho / 2 + (ancho - cols * moduleSize) / 2 + moduleSize / 2;
  const offY = (alto - rows * moduleSize) / 2 + moduleSize / 2;

  const mergedGeo = useMemo(() => {
    const s = moduleSize;
    const w = armWidth;
    const hs = s / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-hs, -hs);
    shape.lineTo(hs, -hs);
    shape.lineTo(hs, -hs + w);
    shape.lineTo(-hs + w, -hs + w);
    shape.lineTo(-hs + w, hs);
    shape.lineTo(-hs, hs);
    shape.closePath();

    const baseGeo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
    });
    baseGeo.translate(0, 0, -depth / 2);

    const allGeos: THREE.BufferGeometry[] = [];
    const quat = new THREE.Quaternion();
    const center = new THREE.Vector3(0, 0, 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offX + c * s;
        const y = offY + r * s;
        const angle = (r + c) % 2 === 0 ? Math.PI / 4 : -Math.PI / 4;
        quat.setFromAxisAngle(center, angle);

        const geo = baseGeo.clone();
        geo.applyMatrix4(
          new THREE.Matrix4().compose(
            new THREE.Vector3(x, y, 0),
            quat,
            new THREE.Vector3(1, 1, 1)
          )
        );
        allGeos.push(geo);
      }
    }

    return mergeGeometries(allGeos);
  }, [ancho, alto, cols, rows, offX, offY]);

  return (
    <group>
      <WoodFrame ancho={ancho} alto={alto} color="#d4d0c8" />
      <mesh geometry={mergedGeo} castShadow>
        <meshStandardMaterial color="#f0ebe5" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

export default function Celosia3D({ ancho, alto, textureType }: Celosia3DProps) {
  switch (textureType) {
    case "ondas":
      return <OndasCelosia ancho={ancho} alto={alto} />;
    case "ceramica":
      return <CeramicaCelosia ancho={ancho} alto={alto} />;
    case "pvc":
      return <PVCCelosia ancho={ancho} alto={alto} />;
    case "madera":
      return <MaderaCelosia ancho={ancho} alto={alto} />;
    case "hormigon":
      return <HormigonCelosia ancho={ancho} alto={alto} />;
  }
}
