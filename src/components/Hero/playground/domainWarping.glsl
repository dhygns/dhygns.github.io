// =============================================================================
// Domain Warping Fluid — Inigo Quilez classic, 3 levels of warping.
// Bound to a smaller canvas; cheap.
// =============================================================================

precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= aspect;

  vec2 m = (uMouse - 0.5) * 2.0;
  m.x *= aspect;

  float t = uTime * 0.08;

  // 3-level domain warping
  vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + t),
                fbm(p + vec2(5.2, 1.3) + t));
  vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.4 * t),
                fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.3 * t));
  float f = fbm(p + 4.0 * r + (m * 0.4));

  vec3 base       = vec3(0.039, 0.039, 0.043);
  vec3 brand      = vec3(1.000, 0.420, 0.208);
  vec3 brandSoft  = vec3(1.000, 0.640, 0.480);

  vec3 col = base;
  col = mix(col, brandSoft, smoothstep(0.2, 0.7, f));
  col = mix(col, brand, smoothstep(0.55, 0.95, f) * 0.85);

  gl_FragColor = vec4(col, 1.0);
}
