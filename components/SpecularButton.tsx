"use client";

import { useEffect, useRef, type MouseEventHandler, type ReactNode } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import "./SpecularButton.css";

type Props = {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const vertex = `#version 300 es
in vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `#version 300 es
precision highp float; uniform vec2 center; uniform vec2 halfSize; uniform float radius; uniform float angle; uniform vec3 lineColor; uniform vec3 baseColor; uniform float intensity; out vec4 color;
float sdf(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
void main(){vec2 p=gl_FragCoord.xy-center;float d=sdf(p,halfSize,radius);vec2 l=vec2(cos(angle),sin(angle));vec2 n=normalize(p/(halfSize*halfSize)+1e-6);float phi=acos(clamp(abs(dot(n,l)),0.,1.));float rim=1.-smoothstep(.05,.8,phi);float edge=exp(-pow(d/2.,2.));float base=(1.-smoothstep(0.,2.,abs(d)))*.42;float hi=edge*rim*intensity; color=vec4(baseColor*base+lineColor*hi,clamp(base+hi,0.,1.));}`;

export default function SpecularButton({
  children = "Get Started",
  onClick,
  className = "",
  type = "button",
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const effectRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const effect = effectRef.current;
    if (!button || !effect) return;

    let renderer: Renderer | null = null;

    try {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        dpr,
      });
    } catch {
      // WebGL unsupported or context creation failed; fallback gracefully to CSS button
      return;
    }

    if (!renderer) return;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        center: { value: [0, 0] },
        halfSize: { value: [1, 1] },
        radius: { value: 18 },
        angle: { value: 2.4 },
        lineColor: { value: [1, 1, 1] },
        baseColor: { value: [0.35, 0.35, 0.35] },
        intensity: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    effect.appendChild(gl.canvas);

    const resize = () => {
      if (!button || !renderer) return;
      const box = button.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setSize(box.width + 40, box.height + 40);
      program.uniforms.center.value = [
        (20 + box.width / 2) * dpr,
        (20 + box.height / 2) * dpr,
      ];
      program.uniforms.halfSize.value = [
        (box.width / 2) * dpr,
        (box.height / 2) * dpr,
      ];
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(button);
    resize();

    let pointerAngle = 2.4;
    let brightness = 0;
    let frame = 0;
    let last = performance.now();
    let visible = false;

    const move = (event: PointerEvent) => {
      if (!visible || !button) return;
      const box = button.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      pointerAngle = Math.atan2(-dy, dx);
      const distance = Math.hypot(
        Math.max(Math.abs(dx) - box.width / 2, 0),
        Math.max(Math.abs(dy) - box.height / 2, 0)
      );
      brightness = Math.max(0, 1 - distance / 250);
    };

    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (hasHover) {
      window.addEventListener("pointermove", move);
    }

    const render = (now: number) => {
      if (!visible || !renderer) {
        frame = 0;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      program.uniforms.angle.value = pointerAngle;
      program.uniforms.intensity.value +=
        (brightness - program.uniforms.intensity.value) *
        (1 - Math.exp(-dt * 8));
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) start();
        else stop();
      },
      { threshold: 0.01 }
    );

    visibilityObserver.observe(button);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (hasHover) window.removeEventListener("pointermove", move);
      if (gl && gl.canvas && gl.canvas.parentNode === effect) {
        effect.removeChild(gl.canvas);
      }
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`specular-button${className ? ` ${className}` : ""}`}
    >
      <span ref={effectRef} className="specular-button__fx" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  );
}

