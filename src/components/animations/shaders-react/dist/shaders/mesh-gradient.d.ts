import { type GlobalParams, type ShaderMountProps } from '../shader-mount';
export type MeshGradientParams = {
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
} & GlobalParams;
export type MeshGradientProps = Omit<ShaderMountProps, 'fragmentShader'> & MeshGradientParams;
type MeshGradientPreset = {
    name: string;
    params: Required<MeshGradientParams>;
};
export declare const defaultPreset: MeshGradientPreset;
export declare const beachPreset: MeshGradientPreset;
export declare const fadedPreset: MeshGradientPreset;
export declare const meshGradientPresets: MeshGradientPreset[];
export declare const MeshGradient: (props: MeshGradientProps) => JSX.Element;
export {};
