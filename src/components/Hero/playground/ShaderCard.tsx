import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Shared passthrough vertex shader.
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

interface MeshProps {
  fragSource: string;
}

function ShaderMesh({ fragSource }: MeshProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  // Mouse normalized to canvas-local coordinates.
  const mouse = useRef<[number, number]>([0.5, 0.5]);
  const target = useRef<[number, number]>([0.5, 0.5]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      // Find the canvas under the cursor; fall back to global if not.
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const canvas = el?.closest("canvas");
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      target.current = [
        Math.max(0, Math.min(1, x)),
        Math.max(0, Math.min(1, y)),
      ];
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    const lerp = 1 - Math.pow(0.001, delta);
    mouse.current[0] += (target.current[0] - mouse.current[0]) * lerp;
    mouse.current[1] += (target.current[1] - mouse.current[1]) * lerp;
    m.uniforms.uMouse.value.set(mouse.current[0], mouse.current[1]);
    m.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={fragSource}
      />
    </mesh>
  );
}

export default function ShaderCard({ fragSource }: { fragSource: string }) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
        depth: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
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
      <ShaderMesh fragSource={fragSource} />
    </Canvas>
  );
}
