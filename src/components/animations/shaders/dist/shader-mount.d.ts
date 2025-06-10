export declare class ShaderMount {
    private canvas;
    private gl;
    private program;
    private uniformLocations;
    /** The fragment shader that we are using */
    private fragmentShader;
    /** Stores the RAF for the render loop */
    private rafId;
    /** Time of the last rendered frame */
    private lastFrameTime;
    /** Total time that we have played any animation, passed as a uniform to the shader for time-based VFX */
    private totalAnimationTime;
    /** The current speed that we progress through animation time (multiplies by delta time every update). Allows negatives to play in reverse. If set to 0, rAF will stop entirely so static shaders have no recurring performance costs */
    private speed;
    /** Uniforms that are provided by the user for the specific shader being mounted (not including uniforms that this Mount adds, like time and resolution) */
    private providedUniforms;
    /** Just a sanity check to make sure frames don't run after we're disposed */
    private hasBeenDisposed;
    /** If the resolution of the canvas has changed since the last render */
    private resolutionChanged;
    constructor(canvas: HTMLCanvasElement, fragmentShader: string, uniforms?: Record<string, number | number[]>, webGlContextAttributes?: WebGLContextAttributes, 
    /** The speed of the animation, or 0 to stop it. Supports negative values to play in reverse. */
    speed?: number, 
    /** Pass a seed to offset the starting u_time value and give deterministic results*/
    seed?: number);
    private initWebGL;
    private setupPositionAttribute;
    private setupUniforms;
    private resizeObserver;
    private setupResizeObserver;
    private handleResize;
    private render;
    private requestRender;
    private updateProvidedUniforms;
    /** Set a seed to get a deterministic result */
    setSeed: (newSeed: number) => void;
    /** Set an animation speed (or 0 to stop animation) */
    setSpeed: (newSpeed?: number) => void;
    /** Update the uniforms that are provided by the outside shader */
    setUniforms: (newUniforms: Record<string, number | number[]>) => void;
    /** Dispose of the shader mount, cleaning up all of the WebGL resources */
    dispose: () => void;
}
