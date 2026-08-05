"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/** A radial-falloff texture — the basis of an edgeless glow. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      g.addColorStop(0, "rgba(120, 231, 216, 0.95)");
      g.addColorStop(0.25, "rgba(79, 203, 192, 0.42)");
      g.addColorStop(0.55, "rgba(45, 120, 125, 0.14)");
      g.addColorStop(1, "rgba(8, 22, 28, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);
}

/**
 * CoreMesh — the Core reads as light, not an object: overlapping additive
 * radial glows with a slow breath, plus an ambient particle field. No sphere
 * silhouette, so there is no visible boundary. Drifts with scroll and leans
 * toward the cursor.
 */
function CoreMesh() {
  const group = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.SpriteMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const glowTexture = useGlowTexture();

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

    // Heartbeat: a slow, subtle breath in scale and brightness.
    const breath = 1 + Math.sin(t * 1.5) * 0.03;
    g.scale.setScalar(breath);
    if (matRef.current) {
      matRef.current.opacity = 0.46 + Math.sin(t * 1.5) * 0.07;
    }

    // Lean gently toward the cursor.
    g.position.x += (pointer.current.x * 0.5 - g.position.x) * 0.03;

    // Scroll drift.
    g.position.y = scroll * -1.4;
  });

  return (
    <group ref={group}>
      {/* Soft additive glow — a radial falloff, so the Core reads as light
          with no sphere silhouette or hard boundary (PRD: "additive outer glow"). */}
      <sprite scale={[6.2, 6.2, 1]}>
        <spriteMaterial
          ref={matRef}
          map={glowTexture}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {/* Faint inner concentration, also edgeless. */}
      <sprite scale={[2.6, 2.6, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
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
