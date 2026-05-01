// =============================================================================
// Texture Synthesis Field — Ambient Mode (Samsung) metaphor.
// Multi-octave noise + reaction-diffusion-like blending pattern.
// References patent WO2019135475: texture synthesis from a sample.
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

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= aspect;

  vec2 m = (uMouse - 0.5) * 2.0;
  m.x *= aspect;
  float md = length(p - m);

  float t = uTime * 0.12;

  // 5 octave noise as a proxy for "synthesized texture sample"
  float v = 0.0;
  vec2 q = p * 1.6;
  v += 0.5 * noise(q + t);
  q *= 2.1;
  v += 0.25 * noise(q - t * 0.6);
  q *= 2.1;
  v += 0.125 * noise(q + t * 1.2);
  q *= 2.1;
  v += 0.0625 * noise(q - t * 0.3);

  // Cell tessellation feel — quantize to bands
  float bands = floor(v * 8.0) / 8.0;
  float mix01 = smoothstep(0.3, 0.9, mix(v, bands, 0.5));

  // Mouse "reveal" — increase contrast near cursor
  mix01 = pow(mix01, mix(1.0, 0.5, smoothstep(1.5, 0.0, md)));

  vec3 base       = vec3(0.039, 0.039, 0.043);
  vec3 mid        = vec3(0.18, 0.09, 0.06);
  vec3 brand      = vec3(1.000, 0.420, 0.208);

  vec3 col = base;
  col = mix(col, mid, mix01);
  col = mix(col, brand, smoothstep(0.7, 1.0, mix01));

  gl_FragColor = vec4(col, 1.0);
}
