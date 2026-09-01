"use client";

import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";

type HeroParticlesProps = {
  particleCount?: number;
  className?: string;
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uPointSize;
  varying float vAlpha;

  void main() {
    vec3 pos = position * uSpread;
    pos.z *= 8.0;
    vec4 moved = modelMatrix * vec4(pos, 1.0);
    moved.x += sin(uTime * random.z + 6.283 * random.w) * mix(0.08, 1.1, random.x);
    moved.y += sin(uTime * random.y + 6.283 * random.x) * mix(0.08, 1.1, random.w);
    moved.z += sin(uTime * random.w + 6.283 * random.y) * mix(0.08, 0.8, random.z);
    vec4 viewPosition = viewMatrix * moved;
    gl_PointSize = uPointSize * mix(0.65, 1.35, random.x) / max(0.35, length(viewPosition.xyz));
    gl_Position = projectionMatrix * viewPosition;
    vAlpha = mix(0.28, 0.9, random.y);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying float vAlpha;

  void main() {
    float distanceFromCenter = length(gl_PointCoord.xy - vec2(0.5));
    float alpha = smoothstep(0.5, 0.12, distanceFromCenter) * vAlpha;
    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`;

// Adapted to this portfolio from React Bits' OGL Particles component.
// Source: https://reactbits.dev/backgrounds/particles
export function HeroParticles({ particleCount = 300, className = "" }: HeroParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window.WebGLRenderingContext === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new Renderer({ alpha: true, depth: false, dpr: Math.min(window.devicePixelRatio, 1.5) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, 20);

    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 4);

    for (let index = 0; index < particleCount; index += 1) {
      let x = 0;
      let y = 0;
      let z = 0;
      let length = 0;

      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        length = x * x + y * y + z * z;
      } while (length > 1 || length === 0);

      const radius = Math.cbrt(Math.random());
      positions.set([x * radius, y * radius, z * radius], index * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], index * 4);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: 12 },
        uPointSize: { value: 110 * Math.min(window.devicePixelRatio, 1.5) },
      },
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / Math.max(height, 1) });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    if (!reduceMotion) container.addEventListener("pointermove", handlePointerMove);
    resize();

    let frame = 0;
    let previous = performance.now();
    let elapsed = 0;

    const render = (time: number) => {
      const delta = time - previous;
      previous = time;
      elapsed += delta * 0.055;
      program.uniforms.uTime.value = elapsed * 0.001;
      particles.position.x += (-pointer.x * 0.75 - particles.position.x) * 0.035;
      particles.position.y += (-pointer.y * 0.55 - particles.position.y) * 0.035;
      particles.rotation.y = Math.cos(elapsed * 0.00045) * 0.12;
      particles.rotation.z += 0.00035;
      renderer.render({ scene: particles, camera });
      frame = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      renderer.render({ scene: particles, camera });
    } else {
      frame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [particleCount]);

  return <div aria-hidden="true" className={`hero-particles ${className}`.trim()} ref={containerRef} />;
}
