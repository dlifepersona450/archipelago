export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// This is a local optical effect; viscosity shapes input response, not Navier–Stokes physics.
export const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uImage;
  uniform vec2 uCenter;
  uniform float uAspect;
  uniform float uRefraction;
  uniform float uDistortion;
  uniform float uChromatic;

  void main() {
    vec2 delta = vUv - uCenter;
    vec2 metric = delta * vec2(uAspect, 1.0);
    float distanceToLens = length(metric);
    float radius = 0.25;
    float mask = 1.0 - smoothstep(radius - 0.035, radius, distanceToLens);
    float dome = sqrt(max(0.0, 1.0 - pow(distanceToLens / radius, 2.0)));
    vec2 offset = delta * ((1.0 - 1.0 / uRefraction) * dome + sin(distanceToLens * 38.0) * uDistortion) * mask;
    vec2 sampleUv = clamp(vUv - offset, 0.002, 0.998);
    vec2 separation = delta * uChromatic * mask;
    float red = texture2D(uImage, clamp(sampleUv + separation, 0.002, 0.998)).r;
    float green = texture2D(uImage, sampleUv).g;
    float blue = texture2D(uImage, clamp(sampleUv - separation, 0.002, 0.998)).b;
    float rim = (1.0 - smoothstep(0.0, 0.008, abs(distanceToLens - radius))) * 0.24;
    gl_FragColor = vec4(mix(vec3(red, green, blue), vec3(1.0, 0.97, 0.86), rim), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;
