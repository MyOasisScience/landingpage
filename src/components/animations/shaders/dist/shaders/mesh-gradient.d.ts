export type MeshGradientUniforms = {
    u_color1: [number, number, number, number];
    u_color2: [number, number, number, number];
    u_color3: [number, number, number, number];
    u_color4: [number, number, number, number];
};
/**
 * Mesh Gradient, based on https://www.shadertoy.com/view/wdyczG
 * Renders a mesh gradient with a rotating noise pattern
 * and several layers of fractal noise
 *
 * Uniforms include:
 * u_color1: The first color of the mesh gradient
 * u_color2: The second color of the mesh gradient
 * u_color3: The third color of the mesh gradient
 * u_color4: The fourth color of the mesh gradient
 */
export declare const meshGradientFragmentShader = "#version 300 es\nprecision highp float;\n\nuniform float u_pixelRatio;\nuniform vec2 u_resolution;\nuniform float u_time;\n\nuniform vec4 u_color1;\nuniform vec4 u_color2;\nuniform vec4 u_color3;\nuniform vec4 u_color4;\n\nout vec4 fragColor;\n\n#define S(a,b,t) smoothstep(a,b,t)\n\nmat2 Rot(float a) {\n    float s = sin(a);\n    float c = cos(a);\n    return mat2(c, -s, s, c);\n}\n\nvec2 hash(vec2 p) {\n    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));\n    p3 += dot(p3, p3.yzx + 33.33);\n    return fract((p3.xx+p3.yz)*p3.zy);\n}\n\nfloat noise( in vec2 p ) {\n    vec2 i = floor( p );\n    vec2 f = fract( p );\n    vec2 u = f*f*(3.0-2.0*f);\n\n    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),\n                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),\n                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),\n                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);\n    return 0.5 + 0.5*n;\n}\n\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n    float ratio = u_resolution.x / u_resolution.y;\n    \n    uv /= u_pixelRatio;\n    \n    vec2 tuv = uv;\n    tuv -= .5;\n\n    // rotate with Noise\n    float degree = noise(vec2(u_time, tuv.x * tuv.y));\n\n    tuv.y *= 1./ratio;\n    tuv *= Rot(radians((degree-.5)*720.+180.));\n    tuv.y *= ratio;\n\n\n    // Wave warp with sin\n    float frequency = 5.;\n    float amplitude = 30.;\n    float speed = u_time * 2.;\n    tuv.x += sin(tuv.y*frequency+speed)/amplitude;\n    tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);\n\n\n    float proportion_1 = S(-.3, .2, (tuv*Rot(radians(-5.))).x);\n    vec3 layer1_color = mix(u_color1.rgb * u_color1.a, u_color2.rgb * u_color2.a, proportion_1);\n    float layer1_opacity = mix(u_color1.a, u_color2.a, proportion_1);\n    vec3 layer2_color = mix(u_color3.rgb * u_color3.a, u_color4.rgb * u_color4.a, proportion_1);\n    float layer2_opacity = mix(u_color3.a, u_color4.a, proportion_1);\n\n    float proportion_2 = S(.5, -.3, tuv.y);\n    vec3 color = mix(layer1_color, layer2_color, proportion_2);\n    float opacity = mix(layer1_opacity, layer2_opacity, proportion_2);\n    \n    fragColor = vec4(color, opacity);\n}\n";
