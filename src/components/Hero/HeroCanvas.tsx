import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { HeroShader } from "./HeroShader";

/**
 * HeroCanvas — entry point for the hero shader island.
 *
 * Responsibilities owned here (kept out of the GPU layer):
 *   - prefers-reduced-motion / coarse-pointer fallback to a static gradient
 *   - scroll-driven intensity fade (1 → 0 across the first 600px)
 *   - mounting <Canvas> with conservative GL settings for laptop GPUs
 */
export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(true);
  const [intensity, setIntensity] = useState(1);

  // Decide once on mount whether to render the shader at all.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    if (reduced || (coarse && narrow)) setEnabled(false);
  }, []);

  // Fade out as the user scrolls past the hero.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // 0..1 across 0..600px scroll
        setIntensity(Math.max(0, Math.min(1, 1 - y / 600)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 65%, #1a0e08 0%, #0a0608 35%, #0a0a0b 75%)",
        }}
      />
    );
  }

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1, near: 0.1, far: 10 }}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
        depth: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        // Match site bg so the canvas never flashes white before the first
        // shader frame paints.
        gl.setClearColor("#0a0a0b", 1);
      }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0b",
      }}
    >
      <HeroShader intensity={intensity} />
    </Canvas>
  );
}
