import React from 'react';
export interface ShaderMountProps {
    ref?: React.RefObject<HTMLCanvasElement>;
    fragmentShader: string;
    style?: React.CSSProperties;
    uniforms?: Record<string, number | number[]>;
    webGlContextAttributes?: WebGLContextAttributes;
    speed?: number;
    seed?: number;
}
/** Params that every shader can set as part of their controls */
export type GlobalParams = Pick<ShaderMountProps, 'speed' | 'seed'>;
export declare const ShaderMount: React.FC<ShaderMountProps>;
