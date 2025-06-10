/** The core Shader Mounting class. Pass it a canvas element and a fragment shader to get started. */
export { ShaderMount } from './shader-mount';
export { grainCloudsFragmentShader, type GrainCloudsUniforms } from './shaders/grain-clouds';
/** A shader that renders a mesh gradient with a rotating noise pattern and several layers of fractal noise */
export { meshGradientFragmentShader, type MeshGradientUniforms } from './shaders/mesh-gradient';
/** Fractional Brownian motion (fBm) noise over the polar coordinates, masked with ring shape */
export { smokeRingFragmentShader, type SmokeRingUniforms } from './shaders/smoke-ring';
/** A shader rendering a fractal-like structure made of several layers of since-arches */
export { neuroNoiseFragmentShader, type NeuroNoiseUniforms } from './shaders/neuro-noise';
/** A shader rendering an animated dots pattern based on Voronoi diagram */
export { dotsOrbitFragmentShader, type DotsOrbitUniforms } from './shaders/dots-orbit';
/** A shader rendering a static dots pattern */
export { dotsGridFragmentShader, DotsGridShapes, type DotsGridShape, type DotsGridUniforms } from './shaders/dots-grid';
/** A shader that calculates a combination of 2 simplex noises with result rendered as a stepped gradient */
export { steppedSimplexNoiseFragmentShader, type SteppedSimplexNoiseUniforms } from './shaders/stepped-simplex-noise';
/** A number of circlular shapes blened in a gooey way */
export { metaballsFragmentShader, type MetaballsUniforms } from './shaders/metaballs';
/** 2d noise with max number of parameters to be exposed to users */
export { perlinNoiseFragmentShader, type PerlinNoiseUniforms } from './shaders/perlin-noise';
/** Voronoi diagram: classic + rounded edges */
export { voronoiFragmentShader, type VoronoiUniforms } from './shaders/voronoi';
/** Waves pattern */
export { wavesFragmentShader, type WavesUniforms } from './shaders/waves';
/** Warp: distortion + swirl + underlying shapes */
export { warpFragmentShader, PatternShapes, type PatternShape, type WarpUniforms } from './shaders/warp';
export { getShaderColorFromString } from './get-shader-color-from-string';
