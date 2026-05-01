// =============================================================================
// Lightfield Caustics — Hero shader
// Visual metaphor: light refracted through water / a lightfield display.
// Tied to Live Window (Epitone, iF Award 2024) project identity.
// 4 iterations to stay <1ms on integrated GPUs.
// =============================================================================

precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;        // 0..1, smoothed in JS
uniform float uTime;        // seconds since mount
uniform float uIntensity;   // 0..1 — scroll-driven fade

varying vec2 vUv;

// Caustic field — adapted classic 5-iter shadertoy formula, reduced to 4.
// IMPORTANT: the inner `1.0 / length(...)` term can blow up to very large
// values when the divisor approaches zero, so we clamp the final result to
// [0, 1] before returning. Without this the field burns out to white at
// caustic peaks.
float caustic(vec2 p, float t) {
  vec2 i = p;
  float c = 1.0;
  float inten = 0.006;

  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - 3.0 / float(n + 1));
    i = p + vec2(
      cos(tt - i.x) + sin(tt + i.y),
      sin(tt - i.y) + cos(tt + i.x)
    );
    // max() guards against /0 when sin/cos go to zero.
    c += 1.0 / max(length(vec2(
      p.x / (sin(i.x + tt) / inten),
      p.y / (cos(i.y + tt) / inten)
    )), 1e-4);
  }

  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return clamp(pow(abs(c), 8.0), 0.0, 1.0);
}

void main() {
  // Centered, aspect-corrected coords in [-aspect..aspect, -1..1]
  vec2 p = (vUv - 0.5) * 2.0;
  float aspect = uResolution.x / uResolution.y;
  p.x *= aspect;

  // Mouse warp: pull caustic field gently toward cursor.
  vec2 m = (uMouse - 0.5) * 2.0;
  m.x *= aspect;
  float md = length(p - m);
  vec2 warp = normalize(p - m + 1e-4) * smoothstep(1.4, 0.0, md) * 0.18;
  p -= warp;

  // Slow time, slight zoom for hero-tier feel.
  float t = uTime * 0.18;
  float c = caustic(p * 1.15, t);

  // Vignette so the hero text stays readable.
  float vign = smoothstep(1.7, 0.35, length(p));

  // Palette — bg/0 base (near-black), brand/500 hot, brand/300 soft tip.
  vec3 base       = vec3(0.039, 0.039, 0.043);
  vec3 brand      = vec3(1.000, 0.420, 0.208);
  vec3 brandSoft  = vec3(1.000, 0.640, 0.480);

  // Drive the blend with a single 0..1 factor so the output is *always*
  // bounded inside the palette — no white burn-out possible.
  float k = clamp(c * vign * uIntensity, 0.0, 1.0);

  // Two-stage palette: base → brand for low energy, brand → brandSoft for
  // the highlight peaks. Highlight is rare (k^2.5) so most of the screen
  // stays near-black.
  vec3 col = mix(base, brand, k);
  col = mix(col, brandSoft, pow(k, 2.5) * 0.6);

  // Bayer-ish dither to kill banding on near-black gradients.
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
