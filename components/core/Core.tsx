"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Sparkles } from "@react-three/drei";
import { useEffect, useRef, type ComponentRef } from "react";
import * as THREE from "three";

/**
 * CoreMesh — the throbbing Jarvis sphere: a noise-distorted emissive orb
 * (breathing scale + emissive pulse), a soft back-side glow shell, and an
 * ambient particle field. Rotates toward the cursor and drifts with scroll.
 */
function CoreMesh() {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    // Skip work while the tab is backgrounded (battery).
    if (typeof document !== "undefined" && document.hidden) return;
    const t = state.clock.elapsedTime;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const scroll = max > 0 ? window.scrollY / max : 0;

    // Heartbeat: breathe + emissive pulse.
    const breath = 1 + Math.sin(t * 2.6) * 0.035;
    g.scale.setScalar(breath);
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.16 + Math.sin(t * 2.6) * 0.08;
    }

    // Cursor-follow rotation + a slow idle spin.
    g.rotation.y += (pointer.current.x * 0.5 - g.rotation.y) * 0.04 + 0.0016;
    g.rotation.x += (-pointer.current.y * 0.4 - g.rotation.x) * 0.04;

    // Scroll drift.
    g.position.y = scroll * -1.4;
  });

  return (
    <group ref={group}>
      <Sphere args={[1, 96, 96]}>
        <MeshDistortMaterial
          ref={matRef}
          color="#06201f"
          emissive="#4fcbc0"
          emissiveIntensity={0.16}
          roughness={0.45}
          metalness={0.3}
          distort={0.35}
          speed={1.6}
          transparent
          opacity={0.62}
        />
      </Sphere>
      <Sphere args={[1.28, 64, 64]}>
        <meshBasicMaterial
          color="#4fcbc0"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
      <Sparkles
        count={50}
        scale={5}
        size={2.2}
        speed={0.28}
        color="#4fcbc0"
        opacity={0.5}
      />
    </group>
  );
}

/** Core — the fixed full-viewport WebGL canvas holding the Jarvis sphere. */
export function Core() {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0 }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 3, 4]} intensity={0.8} color="#4fcbc0" />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#e879f9" />
      <CoreMesh />
    </Canvas>
  );
}
