export type MetaballsUniforms = {
    u_scale: number;
    u_color1: [number, number, number, number];
    u_color2: [number, number, number, number];
    u_color3: [number, number, number, number];
    u_ballSize: number;
    u_visibilityRange: number;
};
/**
 * Metaballs (circular shapes with gooey effect applied)
 * The artwork by Ksenia Kondrashova
 *
 * Uniforms include:
 * u_scale - the scale applied to user space
 *    (with scale = 1 metaballs fit the screen height)
 * u_color1 - the mataballs gradient color #1
 * u_color2 - the mataballs gradient color #2
 * u_color3 - the mataballs gradient color #3
 * u_ballSize (0 .. 1) - the size coefficient applied to each ball
 * u_visibilityRange (0 .. 1) - to show 2 to 15 balls
 */
export declare const metaballsFragmentShader = "#version 300 es\nprecision highp float;\n\nuniform float u_time;\nuniform float u_pixelRatio;\nuniform vec2 u_resolution;\n\nuniform float u_scale;\nuniform vec4 u_color1;\nuniform vec4 u_color2;\nuniform vec4 u_color3;\nuniform float u_ballSize;\nuniform float u_visibilityRange;\n\n#define TWO_PI 6.28318530718\n\nout vec4 fragColor;\n\nfloat hash(float x) {\n  return fract(sin(x) * 43758.5453123);\n}\nfloat lerp(float a, float b, float t) {\n  return a + t * (b - a);\n}\nfloat noise(float x) {\n  float i = floor(x);\n  float f = fract(x);\n  float u = f * f * (3.0 - 2.0 * f); // Smoothstep function for interpolation\n  return lerp(hash(i), hash(i + 1.0), u);\n}\n\nfloat get_ball_shape(vec2 uv, vec2 c, float p) {\n  float s = .5 * length(uv - c);\n  s = 1. - clamp(s, 0., 1.);\n  s = pow(s, p);\n  return s;\n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n  float ratio = u_resolution.x / u_resolution.y;\n\n  uv -= .5;\n  uv /= u_pixelRatio;\n  float scale = .5 * u_scale + 1e-4;\n  uv *= (18. * (1. - step(1. - scale, 1.) / scale));\n  uv += .5;\n  uv.x *= ratio;\n\n  float t = u_time;\n\n  vec3 total_color = vec3(0.);\n  float total_shape = 0.;\n\n  const int max_balls_number = 15;\n  for (int i = 0; i < max_balls_number; i++) {\n    vec2 pos = vec2(.5) + 1e-4;\n    float idx_fract = float(i) / float(max_balls_number);\n    float angle = TWO_PI * idx_fract;\n\n    float speed = 1. - .2 * idx_fract;\n    float noiseX = noise(angle * 10. + float(i) + t * speed);\n    float noiseY = noise(angle * 20. + float(i) - t * speed);\n\n    pos += 7. * (vec2(noiseX, noiseY) - .5);\n\n    vec4 ball_color;\n    if (i % 3 == 0) {\n      ball_color = u_color1;\n    } else if (i % 3 == 1) {\n      ball_color = u_color2;\n    } else {\n      ball_color = u_color3;\n    }\n\n    float shape = get_ball_shape(uv, pos, 6. - 4. * u_ballSize) * ball_color.a;\n\n    shape *= smoothstep((float(i) - 1.) / float(max_balls_number), idx_fract, u_visibilityRange);\n\n    total_color += ball_color.rgb * shape;\n    total_shape += shape;\n  }\n\n  total_color /= max(total_shape, 1e-4);\n\n  float edge_width = fwidth(total_shape);\n  float final_shape = smoothstep(.4, .4 + edge_width, total_shape);\n\n  vec3 color = total_color * final_shape;\n  float opacity = final_shape;\n\n  if (opacity < .01) {\n    discard;\n  }\n\n  fragColor = vec4(color, opacity);\n}\n";
