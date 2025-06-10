/***** Paper Shaders: https://github.com/paper-design/shaders *****/
var g = class {
  canvas;
  gl;
  program = null;
  uniformLocations = {};
  fragmentShader;
  rafId = null;
  lastFrameTime = 0;
  totalAnimationTime = 0;
  speed = 1;
  providedUniforms;
  hasBeenDisposed = false;
  resolutionChanged = true;
  resizeObserver = null;

  constructor(o, r, t = {}, a, i = 1, s = 0) {
    this.canvas = o;
    this.fragmentShader = r;
    this.providedUniforms = t;
    this.totalAnimationTime = s;

    let n = o.getContext("webgl2", a);
    if (!n) {
      throw new Error("WebGL not supported");
    }
    this.gl = n;
    this.initWebGL();
    this.setupResizeObserver();
    this.setSpeed(i);
    this.canvas.setAttribute("data-paper-shaders", "true");
  }

  initWebGL = () => {
    let o = S(this.gl, y, this.fragmentShader);
    if (o) {
      this.program = o;
      this.setupPositionAttribute();
      this.setupUniforms();
    }
  };

  setupPositionAttribute = () => {
    let o = this.gl.getAttribLocation(this.program, "a_position");
    let r = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, r);
    let t = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(t), this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(o);
    this.gl.vertexAttribPointer(o, 2, this.gl.FLOAT, false, 0, 0);
  };

  setupUniforms = () => {
    this.uniformLocations = {
      u_time: this.gl.getUniformLocation(this.program, "u_time"),
      u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"),
      u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      ...Object.fromEntries(
        Object.keys(this.providedUniforms).map((o) => [
          o,
          this.gl.getUniformLocation(this.program, o),
        ])
      ),
    };
  };

  setupResizeObserver = () => {
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.canvas);
    this.handleResize();
  };

  handleResize = () => {
    let o = window.devicePixelRatio;
    let r = this.canvas.clientWidth * o;
    let t = this.canvas.clientHeight * o;

    if (this.canvas.width !== r || this.canvas.height !== t) {
      this.canvas.width = r;
      this.canvas.height = t;
      this.resolutionChanged = true;
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.render(performance.now());
    }
  };

  render = (o) => {
    if (this.hasBeenDisposed) {
      return;
    }

    let r = o - this.lastFrameTime;
    this.lastFrameTime = o;

    if (this.speed !== 0) {
      this.totalAnimationTime += r * this.speed;
    }

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    this.gl.uniform1f(this.uniformLocations.u_time, this.totalAnimationTime * 0.001);

    if (this.resolutionChanged) {
      this.gl.uniform2f(
        this.uniformLocations.u_resolution,
        this.gl.canvas.width,
        this.gl.canvas.height
      );
      this.gl.uniform1f(this.uniformLocations.u_pixelRatio, window.devicePixelRatio);
      this.resolutionChanged = false;
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    if (this.speed !== 0) {
      this.requestRender();
    } else {
      this.rafId = null;
    }
  };

  requestRender = () => {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(this.render);
  };

  updateProvidedUniforms = () => {
    this.gl.useProgram(this.program);
    Object.entries(this.providedUniforms).forEach(([o, r]) => {
      let t = this.uniformLocations[o];
      if (t) {
        if (Array.isArray(r)) {
          switch (r.length) {
            case 2:
              this.gl.uniform2fv(t, r);
              break;
            case 3:
              this.gl.uniform3fv(t, r);
              break;
            case 4:
              this.gl.uniform4fv(t, r);
              break;
            default:
              if (r.length === 9) {
                this.gl.uniformMatrix3fv(t, false, r);
              } else if (r.length === 16) {
                this.gl.uniformMatrix4fv(t, false, r);
              } else {
                console.warn(`Unsupported uniform array length: ${r.length}`);
              }
          }
        } else if (typeof r === "number") {
          this.gl.uniform1f(t, r);
        } else if (typeof r === "boolean") {
          this.gl.uniform1i(t, r ? 1 : 0);
        } else {
          console.warn(`Unsupported uniform type for ${o}: ${typeof r}`);
        }
      }
    });
  };

  setSeed = (o) => {
    let r = 8.333333333333334;
    this.totalAnimationTime = o * r;
    this.lastFrameTime = performance.now();
    this.render(performance.now());
  };

  setSpeed = (o = 1) => {
    this.speed = o;
    if (this.rafId === null && o !== 0) {
      this.lastFrameTime = performance.now();
      this.rafId = requestAnimationFrame(this.render);
    }
    if (this.rafId !== null && o === 0) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  };

  setUniforms = (o) => {
    this.providedUniforms = { ...this.providedUniforms, ...o };
    this.updateProvidedUniforms();
    this.render(performance.now());
  };

  dispose = () => {
    this.hasBeenDisposed = true;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      this.gl.getError();
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    this.uniformLocations = {};
  };
};

var y = `#version 300 es
precision highp float;

layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;
function x(e,o,r){let t=e.createShader(o);return t?(e.shaderSource(t,r),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(t)),e.deleteShader(t),null)):null}function S(e,o,r){let t=x(e,e.VERTEX_SHADER,o),a=x(e,e.FRAGMENT_SHADER,r);if(!t||!a)return null;let i=e.createProgram();return i?(e.attachShader(i,t),e.attachShader(i,a),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?(e.detachShader(i,t),e.detachShader(i,a),e.deleteShader(t),e.deleteShader(a),i):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(i)),e.deleteProgram(i),e.deleteShader(t),e.deleteShader(a),null)):null}var z=`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_time;

uniform float u_scale;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform float u_grainAmount;

out vec4 fragColor;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float rand(vec2 n) {
  return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}
float fbm(vec2 n) {
  float total = 0.0, amplitude = .2;
  for (int i = 0; i < 6; i++) {
    total += noise(n) * amplitude;
    n += n;
    amplitude *= 0.6;
  }
  return total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv -= .5;
  float scale = .5 * u_scale + 1e-4;
  uv *= (.0004 * (1. - step(1. - scale, 1.) / scale));
  uv *= u_resolution;
  uv /= u_pixelRatio;
  uv += .5;

  // Create blobby texture
  float n = snoise(uv + u_time);
  n += 0.5 * snoise(uv * 2.0 - u_time * 0.5);
  n += 0.25 * snoise(uv * 4.0 + u_time * 0.25);
  n = n * 0.5 + 0.5;

  // Color interpolation
  vec3 color = mix(u_color1.rgb, u_color2.rgb, n);
  float opacity = mix(u_color1.a, u_color2.a, n);

  // Add grain
  float grain = fbm(uv * 1000.);
  color.rgb += (grain - 0.5) * u_grainAmount;

  fragColor = vec4(color * opacity, opacity);
}
`;var C=`#version 300 es
precision highp float;

uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_time;

uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform vec4 u_color4;

out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx+p3.yz)*p3.zy);
}

float noise( in vec2 p ) {
    vec2 i = floor( p );
    vec2 f = fract( p );
    vec2 u = f*f*(3.0-2.0*f);

    float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                        dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                   mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                        dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
    return 0.5 + 0.5*n;
}


void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float ratio = u_resolution.x / u_resolution.y;
    
    uv /= u_pixelRatio;
    
    vec2 tuv = uv;
    tuv -= .5;

    // rotate with Noise
    float degree = noise(vec2(u_time, tuv.x * tuv.y));

    tuv.y *= 1./ratio;
    tuv *= Rot(radians((degree-.5)*720.+180.));
    tuv.y *= ratio;


    // Wave warp with sin
    float frequency = 5.;
    float amplitude = 30.;
    float speed = u_time * 2.;
    tuv.x += sin(tuv.y*frequency+speed)/amplitude;
    tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);


    float proportion_1 = S(-.3, .2, (tuv*Rot(radians(-5.))).x);
    vec3 layer1_color = mix(u_color1.rgb * u_color1.a, u_color2.rgb * u_color2.a, proportion_1);
    float layer1_opacity = mix(u_color1.a, u_color2.a, proportion_1);
    vec3 layer2_color = mix(u_color3.rgb * u_color3.a, u_color4.rgb * u_color4.a, proportion_1);
    float layer2_opacity = mix(u_color3.a, u_color4.a, proportion_1);

    float proportion_2 = S(.5, -.3, tuv.y);
    vec3 color = mix(layer1_color, layer2_color, proportion_2);
    float opacity = mix(layer1_opacity, layer2_opacity, proportion_2);
    
    fragColor = vec4(color, opacity);
}
`;var w=`#version 300 es
precision highp float;

uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_time;

uniform float u_scale;

uniform vec4 u_colorBack;
uniform vec4 u_colorInner;
uniform vec4 u_colorOuter;
uniform float u_noiseScale;
uniform float u_thickness;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(in vec2 n) {
  float total = 0.0, amplitude = .4;
  for (int i = 0; i < 12; i++) {
    total += noise(n) * amplitude;
    n += n;
    amplitude *= 0.6;
  }
  return total;
}

float get_ring_shape(vec2 uv, float innerRadius, float outerRadius) {
  float distance = length(uv);
  float line_width = outerRadius - innerRadius;
  float ringValue = smoothstep(innerRadius, innerRadius + .8 * line_width, distance);
  ringValue -= smoothstep(outerRadius, outerRadius + 1.2 * line_width, distance);
  return clamp(ringValue, 0., 1.);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float ratio = u_resolution.x / u_resolution.y;

  uv -= .5;
  uv /= u_pixelRatio;
  float scale = .5 * u_scale + 1e-4;
  uv *= (1. - step(1. - scale, 1.) / scale);
  uv *= 3.;
  uv.x *= ratio;

  float t = u_time;

  float atg = atan(uv.y, uv.x);
  float angle = (atg + PI) / TWO_PI;

  vec2 polar_uv = vec2(atg, .1 * t - (.5 * length(uv)) + 1. / pow(length(uv), .5));
  polar_uv *= u_noiseScale;

  float noise_left = fbm(polar_uv + .05 * t);
  polar_uv.x = mod(polar_uv.x, u_noiseScale * TWO_PI);
  float noise_right = fbm(polar_uv + .05 * t);
  float noise = mix(noise_right, noise_left, smoothstep(-.2, .2, uv.x));

  float center_shape = 1. - pow(smoothstep(2., .0, length(uv)), 50.);

  float radius = .4 - .25 * u_thickness;
  float thickness = u_thickness;
  thickness = pow(thickness, 2.);

  float ring_shape = get_ring_shape(uv * (.5 + .6 * noise), radius - .2 * thickness, radius + .5 * thickness);

  float ring_shape_outer = 1. - pow(ring_shape, 7.);
  ring_shape_outer *= ring_shape;

  float ring_shape_inner = ring_shape - ring_shape_outer;
  ring_shape_inner *= ring_shape;

  float background = u_colorBack.a;

  float opacity = ring_shape_outer * u_colorOuter.a;
  opacity += ring_shape_inner * u_colorInner.a;
  opacity += background * (1. - ring_shape_inner * u_colorInner.a - ring_shape_outer * u_colorOuter.a);

  vec3 color = u_colorBack.rgb * (1. - ring_shape) * background;
  color += u_colorOuter.rgb * ring_shape_outer * u_colorOuter.a;
  color += u_colorInner.rgb * ring_shape_inner * u_colorInner.a;

  color += u_colorBack.rgb * ring_shape_inner * (1. - u_colorInner.a) * background;
  color += u_colorBack.rgb * ring_shape_outer * (1. - u_colorOuter.a) * background;

  fragColor = vec4(color, opacity);
}
`;var R=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_brightness;

out vec4 fragColor;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t) {
  vec2 sine_acc = vec2(0.);
  vec2 res = vec2(0.);
  float scale = 8.;

  for (int j = 0; j < 15; j++) {
    uv = rotate(uv, 1.);
    sine_acc = rotate(sine_acc, 1.);
    vec2 layer = uv * scale + float(j) + sine_acc - t;
    sine_acc += sin(layer);
    res += (.5 + .5 * cos(layer)) / scale;
    scale *= (1.2);
  }
  return res.x + res.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv -= .5;
  float scale = .5 * u_scale + 1e-4;
  uv *= (.001 * (1. - step(1. - scale, 1.) / scale));
  uv *= u_resolution;
  uv /= u_pixelRatio;
  uv += .5;

  float t = u_time;

  float noise = neuro_shape(uv, t);

  noise = u_brightness * pow(noise, 3.);
  noise += pow(noise, 12.);
  noise = max(.0, noise - .5);

  vec3 color = mix(u_colorBack.rgb * u_colorBack.a, u_colorFront.rgb * u_colorFront.a, noise);
  float opacity = mix(u_colorBack.a, u_colorFront.a, noise);

  fragColor = vec4(color, opacity);
}
`;var k=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform vec4 u_color4;
uniform float u_dotSize;
uniform float u_dotSizeRange;
uniform float u_spreading;

out vec4 fragColor;

#define TWO_PI 6.28318530718

float random(in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
vec2 random2(vec2 p) {
  return vec2(random(p), random(200. * p));
}

vec3 get_voronoi_shape(vec2 _uv, float time) {
  vec2 i_uv = floor(_uv);
  vec2 f_uv = fract(_uv);

  float min_dist = 1.;
  vec2 cell_randomizer = vec2(0.);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 tile_offset = vec2(float(x), float(y));
      vec2 rand = random2(i_uv + tile_offset);
      vec2 cell_center = .5 + 1e-4 + .25 * clamp(u_spreading, 0., 1.) * sin(time + TWO_PI * rand);
      float dist = length(tile_offset + cell_center - f_uv);
      if (dist < min_dist) {
        min_dist = dist;
        cell_randomizer = rand;
      }
      min_dist = min(min_dist, dist);
    }
  }

  return vec3(min_dist, cell_randomizer);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv -= .5;
  float scale = .5 * u_scale + 1e-4;
  uv *= (.02 * (1. - step(1. - scale, 1.) / scale));
  uv *= u_resolution;
  uv /= u_pixelRatio;
  uv += .5;

  float t = u_time;

  vec3 voronoi = get_voronoi_shape(uv, t) + 1e-4;

  float radius = .25 * clamp(u_dotSize, 0., 1.) - .5 * clamp(u_dotSizeRange, 0., 1.) * voronoi[2];
  float dist = voronoi[0];
  float edge_width = fwidth(dist);
  float shape = smoothstep(radius + edge_width, radius - edge_width, dist);

  float color_randomizer = voronoi[1];

  float opacity =
    u_color1.a * step(0.0, color_randomizer) * step(color_randomizer, 0.25) +
    u_color2.a * step(0.25, color_randomizer) * step(color_randomizer, 0.5) +
    u_color3.a * step(0.5, color_randomizer) * step(color_randomizer, 0.75) +
    u_color4.a * step(0.75, color_randomizer) * step(color_randomizer, 1.0);

  opacity *= shape;

  vec3 color =
    u_color1.rgb * step(0.0, color_randomizer) * step(color_randomizer, 0.25) +
    u_color2.rgb * step(0.25, color_randomizer) * step(color_randomizer, 0.5) +
    u_color3.rgb * step(0.5, color_randomizer) * step(color_randomizer, 0.75) +
    u_color4.rgb * step(0.75, color_randomizer) * step(color_randomizer, 1.0);

  fragColor = vec4(color * opacity, opacity);
}
`;var F={Circle:0,Diamond:1,Square:2,Triangle:3},P=`#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform vec4 u_colorBack;
uniform vec4 u_colorFill;
uniform vec4 u_colorStroke;
uniform float u_dotSize;
uniform float u_gridSpacingX;
uniform float u_gridSpacingY;
uniform float u_strokeWidth;
uniform float u_sizeRange;
uniform float u_opacityRange;
uniform float u_shape;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float hash(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
float polygon(vec2 p, float N, float rot) {
    float a = atan(p.x, p.y) + rot;
    float r = TWO_PI / float(N);

    return cos(floor(.5 + a/r) * r - a) * length(p);
}

void main() {
    vec2 uv = gl_FragCoord.xy;
    uv.y = u_resolution.y - uv.y;

    uv /= u_pixelRatio;

    vec2 grid = fract(uv / vec2(u_gridSpacingX, u_gridSpacingY)) + 1e-4;
    vec2 grid_idx = floor(uv / vec2(u_gridSpacingX, u_gridSpacingY));
    float size_randomizer = .5 + .5 * snoise(2. * vec2(grid_idx.x * 100., grid_idx.y));
    float opacity_randomizer = .5 + .5 * snoise(2. * vec2(grid_idx.y, grid_idx.x));

    vec2 center = vec2(0.5) - 1e-3;
    vec2 p = (grid - center) * vec2(u_gridSpacingX, u_gridSpacingY);

    float base_size = u_dotSize * (1. - size_randomizer * clamp(u_sizeRange, 0., 1.));
    float stroke_width = u_strokeWidth;

    float dist;
    if (u_shape < 0.5) {
        // Circle
        dist = length(p);
    } else if (u_shape < 1.5) {
        // Diamond
        dist = polygon(1.5 * p, 4., .25 * PI);
    } else if (u_shape < 2.5) {
        // Square
        dist = polygon(1.5 * p, 4., 1e-3);
    } else {
        // Triangle
        p = p * 2. - 1.;
        p.y -= .75 * base_size;
        stroke_width *= 2.;
        dist = polygon(p, 3., 1e-3);
    }

    float edge_width = fwidth(dist);
    float shape_outer = smoothstep(base_size + edge_width, base_size - edge_width, dist);
    float shape_inner = smoothstep(base_size - u_strokeWidth + edge_width, base_size - u_strokeWidth - edge_width, dist);
    float stroke = clamp(shape_outer - shape_inner, 0., 1.);

    float dot_opacity = max(0., 1. - opacity_randomizer * clamp(u_opacityRange, 0., 1.));

    vec3 color = u_colorBack.rgb * u_colorBack.a;
    color = mix(color, u_colorFill.rgb, u_colorFill.a * dot_opacity * shape_inner);
    color = mix(color, u_colorStroke.rgb, u_colorStroke.a * dot_opacity * stroke);

    float opacity = u_colorBack.a;
    opacity += u_colorFill.a * shape_inner * dot_opacity;
    opacity += u_colorStroke.a * stroke * dot_opacity;

    fragColor = vec4(color, opacity);
}
`;var I=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;

uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform vec4 u_color4;
uniform vec4 u_color5;
uniform float u_steps_number;

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float get_noise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

vec4 getColor(int index) {
  if (index == 0) return u_color1;
  if (index == 1) return u_color2;
  if (index == 2) return u_color3;
  if (index == 3) return u_color4;
  if (index == 4) return u_color5;
  return u_color1;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv -= .5;
  float scale = .5 * u_scale + 1e-4;
  uv *= (.0008 * (1. - step(1. - scale, 1.) / scale));
  uv *= u_resolution;
  uv /= u_pixelRatio;
  uv += .5;

  float t = u_time;

  float noise = .5 + .5 * get_noise(uv, t);
  noise = floor(noise * u_steps_number) / u_steps_number;

  vec3 color = u_color1.rgb * u_color1.a;
  float opacity = u_color1.a;
  for (int i = 0; i < 5; i++) {
    vec4 next_c = getColor(i + 1);
    float proportion = smoothstep((float(i) + .5) / 5., (float(i) + 2.) / 5., noise);
    color = mix(color, next_c.rgb * next_c.a, proportion);
    opacity = mix(opacity, next_c.a, proportion);
  }
  fragColor = vec4(color, opacity);
}
`;var U=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_ballSize;
uniform float u_visibilityRange;

#define TWO_PI 6.28318530718

out vec4 fragColor;

// Simplex Noise 2D Implementation
// Author: Ian McEwan, Ashima Arts
// https://github.com/ashima/webgl-noise

vec3 permute(vec3 x) {
  return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
                      
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        
  vec3 m = max(0.5 - vec3(
    dot(x0, x0),
    dot(x12.xy, x12.xy),
    dot(x12.zw, x12.zw)
  ), 0.0);
  
  m = m*m ;
  m = m*m ;
  
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  
  vec3 g;
  g.x  = a0.x  * x0.x + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  
  return 130.0 * dot(m, g);
}

float get_ball_shape(vec2 uv, vec2 c, float p) {
  float s = 0.5 * length(uv - c);
  s = 1.0 - clamp(s, 0.0, 1.0);
  s = pow(s, p);
  return s;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float ratio = u_resolution.x / u_resolution.y;

  uv -= 0.5;
  uv /= u_pixelRatio;
  float scale = 0.5 * u_scale + 1e-4;
  uv *= (18.0 * (1.0 - step(1.0 - scale, 1.0) / scale));
  uv += 0.5;
  uv.x *= ratio;
  float shift = (ratio - 1.0) * 0.5;
  uv.x -= shift;

  float t = u_time;

  vec3 total_color = vec3(0.0);
  float total_shape = 0.0;

  const int max_balls_number = 15;
  for (int i = 0; i < max_balls_number; i++) {
    vec2 pos = vec2(0.5) + 1e-4;
    float idx_fract = float(i) / float(max_balls_number);
    float angle = TWO_PI * idx_fract;

    float speed = 1.0 - 0.2 * idx_fract;

    // Updated 2D noise positions
    vec2 noisePosX = vec2(angle * 0.1, t * speed);
    vec2 noisePosY = vec2(angle * 0.2, -t * speed);

    float noiseX = snoise(vec2(angle * 0.1, t * speed + angle * 5.0));
    float noiseY = snoise(vec2(angle * 0.2, -t * speed + angle * 5.0));

    float randX = fract(sin(float(i) * 1234.123) * 43758.5453123);
    float randY = fract(sin(float(i) * 5678.789) * 43758.5453123);
    vec2 randomOffset = 0.4 * (vec2(randX, randY) - 0.5);
    pos = vec2(0.5) + randomOffset;

    pos += 2.0 * (vec2(noiseX, noiseY) - 0.0);

    vec4 ball_color;
    if (i % 3 == 0) {
      ball_color = u_color1;
    } else if (i % 3 == 1) {
      ball_color = u_color2;
    } else {
      ball_color = u_color3;
    }

    float shape = get_ball_shape(uv, pos, 6.0 - 4.0 * u_ballSize) * ball_color.a;

    shape *= smoothstep(
      float(i - 1) / float(max_balls_number),
      idx_fract,
      u_visibilityRange
    );

    total_color += ball_color.rgb * shape;
    total_shape += shape;
  }

  total_color /= max(total_shape, 1e-4);

  float edge_width = fwidth(total_shape);
  float final_shape = smoothstep(0.4, 0.4 + edge_width, total_shape);

  vec3 color = total_color * final_shape;
  float opacity = final_shape;

  if (opacity < 0.01) {
    discard;
  }

  fragColor = vec4(color, opacity);
}
`;var W=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform float u_proportion;
uniform float u_contour;
uniform float u_octaveCount;
uniform float u_persistence;
uniform float u_lacunarity;

out vec4 fragColor;

#define TWO_PI 6.28318530718

uint hash(uint x, uint seed) {
  const uint m = 0x5bd1e995U;
  uint hash = seed;
    // process input
    uint k = x;
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // some final mixing
    hash ^= hash >> 13;
    hash *= m;
    hash ^= hash >> 15;
    return hash;
}

uint hash(uvec3 x, uint seed){
    const uint m = 0x5bd1e995U;
    uint hash = seed;
    // process first vector element
    uint k = x.x; 
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // process second vector element
    k = x.y; 
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // process third vector element
    k = x.z; 
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // some final mixing
    hash ^= hash >> 13;
    hash *= m;
    hash ^= hash >> 15;
    return hash;
}


vec3 gradientdy(uint hash) {
    switch (int(hash) & 15) { // look at the last four bits to pick a gradient dy
    case 0:
        return vec3(1, 1, 0);
    case 1:
        return vec3(-1, 1, 0);
    case 2:
        return vec3(1, -1, 0);
    case 3:
        return vec3(-1, -1, 0);
    case 4:
        return vec3(1, 0, 1);
    case 5:
        return vec3(-1, 0, 1);
    case 6:
        return vec3(1, 0, -1);
    case 7:
        return vec3(-1, 0, -1);
    case 8:
        return vec3(0, 1, 1);
    case 9:
        return vec3(0, -1, 1);
    case 10:
        return vec3(0, 1, -1);
    case 11:
        return vec3(0, -1, -1);
    case 12:
        return vec3(1, 1, 0);
    case 13:
        return vec3(-1, 1, 0);
    case 14:
        return vec3(0, -1, 1);
    case 15:
        return vec3(0, -1, -1);
    }
}

float interpolate(float value1, float value2, float value3, float value4, float value5, float value6, float value7, float value8, vec3 t) {
    return mix(
        mix(mix(value1, value2, t.x), mix(value3, value4, t.x), t.y),
        mix(mix(value5, value6, t.x), mix(value7, value8, t.x), t.y),
        t.z
    );
}

vec3 fade(vec3 t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float perlinNoise(vec3 position, uint seed) {
    position += 1e+4;
    vec3 floorPosition = floor(position);
    vec3 fractPosition = fract(position);
    uvec3 cellCoordinates = uvec3(floorPosition);
    float value1 = dot(gradientdy(hash(cellCoordinates, seed)), fractPosition);
    float value2 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 0, 0)), seed)), fractPosition - vec3(1, 0, 0));
    float value3 = dot(gradientdy(hash((cellCoordinates + uvec3(0, 1, 0)), seed)), fractPosition - vec3(0, 1, 0));
    float value4 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 1, 0)), seed)), fractPosition - vec3(1, 1, 0));
    float value5 = dot(gradientdy(hash((cellCoordinates + uvec3(0, 0, 1)), seed)), fractPosition - vec3(0, 0, 1));
    float value6 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 0, 1)), seed)), fractPosition - vec3(1, 0, 1));
    float value7 = dot(gradientdy(hash((cellCoordinates + uvec3(0, 1, 1)), seed)), fractPosition - vec3(0, 1, 1));
    float value8 = dot(gradientdy(hash((cellCoordinates + uvec3(1, 1, 1)), seed)), fractPosition - vec3(1, 1, 1));
    return interpolate(value1, value2, value3, value4, value5, value6, value7, value8, fade(fractPosition));
}

float p_noise(vec3 position, int octaveCount, float persistence, float lacunarity) {
    float value = 0.0;
    float amplitude = 1.0;
    float currentFrequency = 10.;
    uint currentSeed = uint(0);
    for (int i = 0; i < octaveCount; i++) {
        currentSeed = hash(currentSeed, 0x0U);
        value += perlinNoise(position * currentFrequency, currentSeed) * amplitude;
        amplitude *= persistence;
        currentFrequency *= lacunarity;
    }
    return value;
}

float get_max_amp(float persistence, float octaveCount) {
    persistence *= .999;
    return (1. - pow(persistence, octaveCount)) / (1. - persistence);
}

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = .2 * u_time;

    uv -= .5;
    uv *= (.004 * u_scale * u_resolution);
    uv /= u_pixelRatio;
    uv += .5;
        
    vec3 p = vec3(uv, t);
    
    float oct_count = max(0., floor(u_octaveCount));
    float persistence = clamp(u_persistence, 0., 1.);
    float noise = p_noise(p, int(oct_count), persistence, u_lacunarity);
    
    float max_amp = get_max_amp(persistence, oct_count);
    float noise_normalized = (noise + max_amp) / (2. * max_amp) + (u_proportion - .5);
    float sharpness = clamp(1. - u_contour, 0., 1.);
    float smooth_w = 0.5 * fwidth(noise_normalized);
    float sharp_noise = smoothstep(
        .5 - .5 * sharpness - smooth_w, 
        .5 + .5 * sharpness + smooth_w, 
        noise_normalized
    );

    vec3 color = mix(u_color1.rgb * u_color1.a, u_color2.rgb * u_color2.a, sharp_noise);
    float opacity = mix(u_color1.a, u_color2.a, sharp_noise);

    fragColor = vec4(color, opacity);
}
`;var A=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;

uniform vec4 u_colorCell1;
uniform vec4 u_colorCell2;
uniform vec4 u_colorCell3;
uniform vec4 u_colorEdges;
uniform vec4 u_colorMid;

uniform float u_colorGradient;
uniform float u_distance;
uniform float u_edgesSize;
uniform float u_edgesSharpness;
uniform float u_middleSize;
uniform float u_middleSharpness;

#define TWO_PI 6.28318530718

out vec4 fragColor;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 18.5453);
}

float smin(float angle, float b, float k) {
  float h = clamp(.5 + .5 * (b - angle) / k, 0., 1.);
  return mix(b, angle, h) - k * h * (1. - h);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, vec2 randomizer) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float mixer = clamp(u_colorGradient, 0., 1.);
    float r1 = smoothstep(.5 - .5 * mixer, .5 + .5 * mixer, randomizer[0]);
    float r2 = smoothstep(.6 - .6 * mixer, .6 + .4 * mixer, randomizer[1]);
    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);
    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    
    return vec4(c, o);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time;
  uv -= .5;
  uv *= (.01 * u_scale * u_resolution);
  uv /= u_pixelRatio;
  uv += .5;

  vec2 i_uv = floor(uv);
  vec2 f_uv = fract(uv);

  vec2 randomizer = vec2(0.);
  vec3 distance = vec3(1.);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 tile_offset = vec2(float(x), float(y));
      vec2 o = hash(i_uv + tile_offset);
      tile_offset += (.5 + clamp(u_distance, 0., .5) * sin(t + TWO_PI * o)) - f_uv;

      float dist = dot(tile_offset, tile_offset);
      float old_min_dist = distance.x;

      distance.z = max(distance.x, max(distance.y, min(distance.z, dist)));
      distance.y = max(distance.x, min(distance.y, dist));
      distance.x = min(distance.x, dist);

      if (old_min_dist > distance.x) {
        randomizer = o;
      }
    }
  }

  distance = sqrt(distance);

  distance = sqrt(distance);
  float cell_shape = min(smin(distance.z, distance.y, .1) - distance.x, 1.);

  float dot_shape = pow(distance.x, 2.) / (2. * clamp(u_middleSize, 0., 1.) + 1e-4);
  float dot_edge_width = fwidth(dot_shape);
  float dotSharp = clamp(u_middleSharpness, 0., 1.);
  dot_shape = 1. - smoothstep(.5 * dotSharp - dot_edge_width, 1. - .5 * dotSharp, dot_shape);

  float cell_edge_width = fwidth(distance.x);
  float w = .7 * (clamp(u_edgesSize, 0., 1.) - .1);
  float edgeSharp = clamp(u_edgesSharpness, 0., 1.);
  cell_shape = smoothstep(w - cell_edge_width, w + edgeSharp, cell_shape);

  dot_shape *= cell_shape;

  vec4 cell_mix = blend_colors(u_colorCell1, u_colorCell2, u_colorCell3, randomizer);
  
  vec4 edges = vec4(u_colorEdges.rgb * u_colorEdges.a, u_colorEdges.a);

  vec3 color = mix(edges.rgb, cell_mix.rgb, cell_shape);
  float opacity = mix(edges.a, cell_mix.a, cell_shape);

  color = mix(color, u_colorMid.rgb * u_colorMid.a, dot_shape);
  opacity = mix(opacity, u_colorMid.a, dot_shape);

  fragColor = vec4(color, opacity);
}
`;var O=`#version 300 es
precision highp float;

uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;

uniform vec4 u_color1;
uniform vec4 u_color2;
uniform float u_shape;
uniform float u_frequency;
uniform float u_amplitude;
uniform float u_spacing;
uniform float u_dutyCycle;
uniform float u_edgeBlur;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

out vec4 fragColor;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv -= .5;
  uv *= (.02 * max(0., u_scale) * u_resolution);
  uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio;
  uv += .5;

  float wave = .5 * cos(uv.x * u_frequency * TWO_PI);
  float zigzag = 2. * abs(fract(uv.x * u_frequency) - .5);
  float irregular = sin(uv.x * .25 * u_frequency * TWO_PI) * cos(uv.x * u_frequency * TWO_PI);
  float irregular2 = .75 * (sin(uv.x * u_frequency * TWO_PI) + .5 * cos(uv.x * .5 * u_frequency * TWO_PI));

  float offset = mix(zigzag, wave, smoothstep(0., 1., u_shape));
  offset = mix(offset, irregular, smoothstep(1., 2., u_shape));
  offset = mix(offset, irregular2, smoothstep(2., 3., u_shape));
  offset *= 2. * u_amplitude;
  
  float spacing = .02 + .98 * u_spacing;
  float shape = .5 + .5 * sin((uv.y + offset) * PI / spacing);
  
  float edge_width = .02 / (1. + abs(shape)) * (.001 + u_scale);
  edge_width += .5 * max(0., u_edgeBlur);
  float dc = clamp(u_dutyCycle, 0., 1.);
  float t = smoothstep(dc - edge_width, dc + edge_width, shape);

  vec3 color = mix(u_color1.rgb * u_color1.a, u_color2.rgb * u_color2.a, t);
  float opacity = mix(u_color1.a, u_color2.a, t);
  
  fragColor = vec4(color, opacity);
}
`;var T={Checks:0,Stripes:1,Edge:2},B=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;


out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;
            
    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv_original = uv;
    
    float t = .5 * u_time;
    
    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;
        
    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }
    
    float proportion = clamp(u_proportion, 0., 1.);
    
    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {      
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    } 

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.));
    
    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;function f(e, o = [0, 0, 0, 1]) {
  if (Array.isArray(e)) {
    if (e.length === 4) {
      return e;
    } else if (e.length === 3) {
      return [...e, 1];
    } else {
      return f(o);
    }
  }

  if (typeof e !== "string") {
    return f(o);
  }

  let r, t, a, i = 1;

  if (e.startsWith("#")) {
    [r, t, a, i] = L(e);
  } else if (e.startsWith("rgb")) {
    [r, t, a, i] = G(e);
  } else if (e.startsWith("hsl")) {
    [r, t, a, i] = D(E(e));
  } else {
    console.error("Unsupported color format", e);
    return f(o);
  }

  return [m(r, 0, 1), m(t, 0, 1), m(a, 0, 1), m(i, 0, 1)];
}

function L(e) {
  e = e.replace(/^#/, "");
  if (e.length === 3) {
    e = e.split("").map(i => i + i).join("");
  }
  if (e.length === 6) {
    e = e + "ff";
  }

  let o = parseInt(e.slice(0, 2), 16) / 255;
  let r = parseInt(e.slice(2, 4), 16) / 255;
  let t = parseInt(e.slice(4, 6), 16) / 255;
  let a = parseInt(e.slice(6, 8), 16) / 255;

  return [o, r, t, a];
}

function G(e) {
  let o = e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  
  if (o) {
    let alpha = o[4] === undefined ? 1 : parseFloat(o[4]);
    return [
      parseInt(o[1] ?? "0") / 255,
      parseInt(o[2] ?? "0") / 255,
      parseInt(o[3] ?? "0") / 255,
      alpha
    ];
  } else {
    return [0, 0, 0, 1];
  }
}

function E(e) {
  let o = e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  
  if (o) {
    let alpha = o[4] === undefined ? 1 : parseFloat(o[4]);
    return [
      parseInt(o[1] ?? "0"),
      parseInt(o[2] ?? "0"),
      parseInt(o[3] ?? "0"),
      alpha
    ];
  } else {
    return [0, 0, 0, 1];
  }
}

function D(e) {
  let [o, r, t, a] = e;
  let i = o / 360;
  let s = r / 100;
  let n = t / 100;
  let _, p, d;

  if (r === 0) {
    _ = p = d = n;
  } else {
    let v = (l, b, u) => {
      if (u < 0) {
        u += 1;
      }
      if (u > 1) {
        u -= 1;
      }
      if (u < 0.16666666666666666) {
        return l + (b - l) * 6 * u;
      } else if (u < 0.5) {
        return b;
      } else if (u < 0.6666666666666666) {
        return l + (b - l) * (0.6666666666666666 - u) * 6;
      } else {
        return l;
      }
    };

    let c = n < 0.5 ? n * (1 + s) : n + s - n * s;
    let h = 2 * n - c;

    _ = v(h, c, i + 1 / 3);
    p = v(h, c, i);
    d = v(h, c, i - 1 / 3);
  }

  return [_, p, d, a];
}

var m = (e, o, r) => Math.min(Math.max(e, o), r);

export {
  F as DotsGridShapes,
  T as PatternShapes,
  g as ShaderMount,
  P as dotsGridFragmentShader,
  k as dotsOrbitFragmentShader,
  f as getShaderColorFromString,
  z as grainCloudsFragmentShader,
  C as meshGradientFragmentShader,
  U as metaballsFragmentShader,
  R as neuroNoiseFragmentShader,
  W as perlinNoiseFragmentShader,
  w as smokeRingFragmentShader,
  I as steppedSimplexNoiseFragmentShader,
  A as voronoiFragmentShader,
  B as warpFragmentShader,
  O as wavesFragmentShader
};

//# sourceMappingURL=index.js.map
