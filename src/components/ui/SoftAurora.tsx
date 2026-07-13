import React, { useRef, useEffect } from 'react';

interface SoftAuroraProps {
  color1?: string;
  color2?: string;
  speed?: number;
  scale?: number;
  brightness?: number;
  noiseFrequency?: number;
  noiseAmplitude?: number;
  bandHeight?: number;
  bandSpread?: number;
  octaveDecay?: number;
  layerOffset?: number;
  colorSpeed?: number;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
  className?: string;
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [0, 0, 0];
};

export function SoftAurora({
  color1 = '#3B82F6',
  color2 = '#1D4ED8',
  speed = 0.18,
  scale = 1.3,
  brightness = 0.35,
  noiseFrequency = 2.0,
  noiseAmplitude = 0.35,
  bandHeight = 0.48,
  bandSpread = 0.65,
  octaveDecay = 0.35,
  layerOffset = 0.18,
  colorSpeed = 0.18,
  enableMouseInteraction = true,
  mouseInfluence = 0.05,
  className = '',
}: SoftAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use a ref to store current props to avoid shader re-compilation on prop changes
  const propsRef = useRef({
    color1, color2, speed, scale, brightness, noiseFrequency,
    noiseAmplitude, bandHeight, bandSpread, octaveDecay,
    layerOffset, colorSpeed, enableMouseInteraction, mouseInfluence
  });

  useEffect(() => {
    propsRef.current = {
      color1, color2, speed, scale, brightness, noiseFrequency,
      noiseAmplitude, bandHeight, bandSpread, octaveDecay,
      layerOffset, colorSpeed, enableMouseInteraction, mouseInfluence
    };
  }, [
    color1, color2, speed, scale, brightness, noiseFrequency,
    noiseAmplitude, bandHeight, bandSpread, octaveDecay,
    layerOffset, colorSpeed, enableMouseInteraction, mouseInfluence
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      
      varying vec2 vUv;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec2 u_mouse;
      
      uniform float u_speed;
      uniform float u_scale;
      uniform float u_brightness;
      uniform float u_noiseFrequency;
      uniform float u_noiseAmplitude;
      uniform float u_bandHeight;
      uniform float u_bandSpread;
      uniform float u_octaveDecay;
      uniform float u_layerOffset;
      uniform float u_colorSpeed;
      uniform float u_mouseInfluence;
      
      // Hash function for noise
      vec3 hash33(vec3 p) {
          p = fract(p * vec3(443.897, 441.423, 437.195));
          p += dot(p, p.yxz + 19.19);
          return fract((p.xxy + p.yxx) * p.zyx);
      }

      // Value noise
      float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          
          float n = p.x + p.y * 57.0 + 113.0 * p.z;
          return mix(
              mix(
                  mix(fract(sin(n + 0.0) * 43758.5453), fract(sin(n + 1.0) * 43758.5453), f.x),
                  mix(fract(sin(n + 57.0) * 43758.5453), fract(sin(n + 58.0) * 43758.5453), f.x),
                  f.y
              ),
              mix(
                  mix(fract(sin(n + 113.0) * 43758.5453), fract(sin(n + 114.0) * 43758.5453), f.x),
                  mix(fract(sin(n + 170.0) * 43758.5453), fract(sin(n + 171.0) * 43758.5453), f.x),
                  f.y
              ),
              f.z
          );
      }
      
      float fbm(vec3 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 4; i++) {
              value += amplitude * noise(p);
              p *= 2.0;
              amplitude *= u_octaveDecay;
          }
          return value;
      }
      
      void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;
          
          // Apply mouse influence
          vec2 mouseOffset = (u_mouse - 0.5) * u_mouseInfluence;
          st += mouseOffset;
          
          st *= u_scale;
          
          float t = u_time * u_speed;
          float ct = u_time * u_colorSpeed;
          
          float v = 0.0;
          
          // Generate aurora layers
          for(float i = 0.0; i < 3.0; i++) {
              float z = t + i * u_layerOffset;
              vec3 p = vec3(st * u_noiseFrequency, z);
              float n = fbm(p) * u_noiseAmplitude;
              
              // Aurora shape
              float band = smoothstep(u_bandHeight - u_bandSpread, u_bandHeight, st.y + n) * 
                           smoothstep(u_bandHeight + u_bandSpread, u_bandHeight, st.y + n);
              
              v += band * (1.0 - i * 0.2);
          }
          
          v *= u_brightness;
          
          // Color mixing
          float mixVal = fbm(vec3(st, ct));
          vec3 color = mix(u_color1, u_color2, mixVal);
          
          // Soft blending
          color *= v;
          
          gl_FragColor = vec4(color, v); // Output with alpha for soft blending
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      color1: gl.getUniformLocation(program, 'u_color1'),
      color2: gl.getUniformLocation(program, 'u_color2'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      scale: gl.getUniformLocation(program, 'u_scale'),
      brightness: gl.getUniformLocation(program, 'u_brightness'),
      noiseFrequency: gl.getUniformLocation(program, 'u_noiseFrequency'),
      noiseAmplitude: gl.getUniformLocation(program, 'u_noiseAmplitude'),
      bandHeight: gl.getUniformLocation(program, 'u_bandHeight'),
      bandSpread: gl.getUniformLocation(program, 'u_bandSpread'),
      octaveDecay: gl.getUniformLocation(program, 'u_octaveDecay'),
      layerOffset: gl.getUniformLocation(program, 'u_layerOffset'),
      colorSpeed: gl.getUniformLocation(program, 'u_colorSpeed'),
      mouseInfluence: gl.getUniformLocation(program, 'u_mouseInfluence'),
    };

    let animationFrameId: number;
    let startTime = performance.now();
    let mouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!propsRef.current.enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = (e.clientX - rect.left) / rect.width;
      targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y for WebGL
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      const actualWidth = displayWidth * dpr;
      const actualHeight = displayHeight * dpr;
      
      if (canvas.width !== actualWidth || canvas.height !== actualHeight) {
        canvas.width = actualWidth;
        canvas.height = actualHeight;
        gl.viewport(0, 0, actualWidth, actualHeight);
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const render = (time: number) => {
      resize();
      
      const p = propsRef.current;

      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      const c1 = hexToRgb(p.color1);
      const c2 = hexToRgb(p.color2);

      gl.useProgram(program);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, (time - startTime) * 0.001);
      gl.uniform3f(uniforms.color1, c1[0], c1[1], c1[2]);
      gl.uniform3f(uniforms.color2, c2[0], c2[1], c2[2]);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
      
      gl.uniform1f(uniforms.speed, p.speed);
      gl.uniform1f(uniforms.scale, p.scale);
      gl.uniform1f(uniforms.brightness, p.brightness);
      gl.uniform1f(uniforms.noiseFrequency, p.noiseFrequency);
      gl.uniform1f(uniforms.noiseAmplitude, p.noiseAmplitude);
      gl.uniform1f(uniforms.bandHeight, p.bandHeight);
      gl.uniform1f(uniforms.bandSpread, p.bandSpread);
      gl.uniform1f(uniforms.octaveDecay, p.octaveDecay);
      gl.uniform1f(uniforms.layerOffset, p.layerOffset);
      gl.uniform1f(uniforms.colorSpeed, p.colorSpeed);
      gl.uniform1f(uniforms.mouseInfluence, p.mouseInfluence);

      // We want to clear with a transparent background so it overlays
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Enable blending for transparent aurora
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Clean up WebGL resources
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []); // Empty dependency array ensures WebGL initializes only once!

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
