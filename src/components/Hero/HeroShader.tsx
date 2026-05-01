import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import causticsFrag from "./caustics.glsl?raw";

// Vertex shader: passthrough. Position is pre-clip-space because we render
// a fullscreen 2x2 quad and bypass the camera matrices entirely.
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

interface Props {
  intensity: number;
}

export function HeroShader({ intensity }: Props) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  // Smoothed mouse — written by useFrame, target updated by listener.
  const mouse = useRef<[number, number]>([0.5, 0.5]);
  const mouseTarget = useRef<[number, number]>([0.5, 0.5]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIntensity: { value: intensity },
    }),
    [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      mouseTarget.current = [
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      ];
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;

    mat.uniforms.uTime.value += delta;

    // Critically-damped lerp toward mouse target (~0.08 per 60Hz frame).
    const lerp = 1 - Math.pow(0.001, delta);
    mouse.current[0] += (mouseTarget.current[0] - mouse.current[0]) * lerp;
    mouse.current[1] += (mouseTarget.current[1] - mouse.current[1]) * lerp;
    mat.uniforms.uMouse.value.set(mouse.current[0], mouse.current[1]);

    mat.uniforms.uResolution.value.set(size.width, size.height);
    mat.uniforms.uIntensity.value = intensity;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={causticsFrag}
      />
    </mesh>
  );
}
