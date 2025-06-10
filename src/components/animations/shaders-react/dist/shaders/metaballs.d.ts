import { type GlobalParams, type ShaderMountProps } from '../shader-mount';
export type MetaballsParams = {
    scale?: number;
    color1?: string;
    color2?: string;
    color3?: string;
    ballSize?: number;
    visibilityRange?: number;
} & GlobalParams;
export type MetaballsProps = Omit<ShaderMountProps, 'fragmentShader'> & MetaballsParams;
type MetaballsPreset = {
    name: string;
    params: Required<MetaballsParams>;
};
export declare const defaultPreset: MetaballsPreset;
export declare const metaballsPresets: MetaballsPreset[];
export declare const Metaballs: (props: MetaballsProps) => JSX.Element;
export {};
