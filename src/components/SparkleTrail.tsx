// src/components/SparkleTrail.tsx
"use client";

import React, { useEffect, useState } from "react";
import { sound } from "@/lib/sound";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  char: string;
  size: number;
  color: string;
}

const STAR_CHARS = ["✦", "★", "·", "✧", "☾", "•", "✨", "🌸", "⭐"];
// Dreamy baby pastel stardust palette
const PASTEL_COLORS = [
  "#f472b6", // Pastel Pink
  "#fbcfe8", // Cotton Candy
  "#fef08a", // Buttercup Yellow
  "#fed7aa", // Peach Cream
  "#bae6fd", // Baby Sky Blue
  "#ddd6fe", // Sweet Lavender
  "#bbf7d0", // Soft Mint
];

export function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let count = 0;
    const handleMove = (e: MouseEvent) => {
      // Play soft magical stardust twinkle sound on movement!
      sound.playCursorTwinkle();

      // Moderate particle density for silky 60fps performance
      if (Math.random() > 0.45) return;

      const newSparkle: Sparkle = {
        id: count++,
        x: e.clientX,
        y: e.clientY,
        char: STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
        size: Math.floor(Math.random() * 10) + 12,
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      };

      setSparkles((prev) => [...prev.slice(-18), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 750);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
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
            textShadow: `0 0 8px ${s.color}`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
