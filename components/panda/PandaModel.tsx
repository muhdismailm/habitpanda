"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

interface PandaModelProps {
  mood: "Happy" | "Neutral" | "Sad";
  stage: string;
}

export function PandaModel({ mood, stage }: PandaModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  // Stage affects size
  const scale = stage === "Baby Panda" ? 0.7 : stage === "Adult Panda" ? 1 : 1.3;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (!groupRef.current || !headRef.current || !bodyRef.current) return;

    if (mood === "Happy") {
      // Happy: Bouncing
      groupRef.current.position.y = Math.abs(Math.sin(t * 6)) * 0.5 - 1;
      headRef.current.rotation.x = Math.sin(t * 3) * 0.1;
      bodyRef.current.scale.set(1, 1, 1);
    } else if (mood === "Sad") {
      // Sad: Head down
      groupRef.current.position.y = -1;
      headRef.current.rotation.x = Math.PI / 6;
      bodyRef.current.scale.set(1, 0.9, 1);
    } else {
      // Neutral: Idle breathing
      groupRef.current.position.y = -1;
      headRef.current.rotation.x = 0;
      const breath = 1 + Math.sin(t * 2) * 0.03;
      bodyRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -1, 0]}>
      {/* Body */}
      <group ref={bodyRef}>
        <Sphere args={[1, 32, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
        </Sphere>
        {/* Arms */}
        <Cylinder args={[0.25, 0.2, 1.2]} position={[-0.9, 1.2, 0.2]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
        <Cylinder args={[0.25, 0.2, 1.2]} position={[0.9, 1.2, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
        {/* Legs */}
        <Cylinder args={[0.3, 0.3, 0.8]} position={[-0.5, 0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
        <Cylinder args={[0.3, 0.3, 0.8]} position={[0.5, 0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Cylinder>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 2.2, 0]}>
        <Sphere args={[0.9, 32, 32]}>
          <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
        </Sphere>
        {/* Ears */}
        <Sphere args={[0.3, 32, 32]} position={[-0.65, 0.7, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.3, 32, 32]} position={[0.65, 0.7, 0]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        {/* Eye Patches */}
        <Sphere args={[0.2, 32, 32]} position={[-0.35, 0.1, 0.75]} scale={[1.2, 0.9, 0.2]} rotation={[0, 0, -0.2]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        <Sphere args={[0.2, 32, 32]} position={[0.35, 0.1, 0.75]} scale={[1.2, 0.9, 0.2]} rotation={[0, 0, 0.2]}>
          <meshStandardMaterial color="#1f2937" roughness={0.9} />
        </Sphere>
        {/* Eyes */}
        <Sphere args={[0.06, 16, 16]} position={[-0.35, 0.12, 0.8]}>
          <meshStandardMaterial color="white" />
        </Sphere>
        <Sphere args={[0.06, 16, 16]} position={[0.35, 0.12, 0.8]}>
          <meshStandardMaterial color="white" />
        </Sphere>
        {/* Nose */}
        <Sphere args={[0.08, 16, 16]} position={[0, -0.15, 0.88]} scale={[1.5, 0.8, 0.5]}>
          <meshStandardMaterial color="#1f2937" />
        </Sphere>
      </group>
    </group>
  );
}
