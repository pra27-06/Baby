// src/components/SparkleTrail.tsx
"use client";

import React, { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  char: string;
  size: number;
  color: string;
}

const STAR_CHARS = ["✦", "★", "·", "✧", "☾", "•"];
const STAR_COLORS = ["#a34063", "#fec84d", "#ffccd8", "#ffd166", "#e07a9b"];

export function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let count = 0;
    const handleMove = (e: MouseEvent) => {
      // Moderate spawn frequency to preserve smooth 60fps
      if (Math.random() > 0.45) return;

      const newSparkle: Sparkle = {
        id: count++,
        x: e.clientX,
        y: e.clientY,
        char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
        size: Math.floor(Math.random() * 8) + 12,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      };

      setSparkles((prev) => [...prev.slice(-16), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 750);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute select-none transition-all duration-700 ease-out animate-pulse"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            fontSize: `${s.size}px`,
            color: s.color,
            transform: "translate(-50%, -50%)",
            textShadow: `0 0 6px ${s.color}`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
