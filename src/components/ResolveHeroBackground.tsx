"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { useEffect, useRef } from "react";

export default function ResolveHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    const particles = Array.from({ length: 45 }, (_, index) => ({
      x: (index * 37) % 100,
      y: (index * 61) % 100,
      radius: 0.6 + (index % 3) * 0.35,
      drift: 0.08 + (index % 4) * 0.03,
    }));

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle, index) => {
        const y = (particle.y + time * particle.drift * 0.01 + index) % 105 - 5;
        const alpha = 0.2 + ((index * 17) % 5) * 0.08;
        context.beginPath();
        context.arc(
          (particle.x / 100) * window.innerWidth,
          (y / 100) * window.innerHeight,
          particle.radius,
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(190, 205, 255, ${alpha})`;
        context.fill();
      });
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="resolve-background" aria-hidden="true">
      <GrainGradient
        colors={[
          "hsl(224, 95%, 58%)",
          "hsl(262, 90%, 56%)",
          "hsl(205, 100%, 52%)",
          "hsl(275, 88%, 54%)",
        ]}
        colorBack="hsl(232, 45%, 4%)"
        intensity={0.82}
        softness={0.72}
        speed={0.85}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <div className="resolve-overlay" />
      <div className="hero-grid" />
      <canvas className="particles-canvas" ref={canvasRef} />
    </div>
  );
}
