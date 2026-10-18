// src/components/ChaosMode.tsx
"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";

interface FloatingSticker {
  id: number;
  emoji: string;
  label: string;
  top: number;
  left: number;
  rotation: number;
}

const INITIAL_STICKERS: FloatingSticker[] = [
  { id: 1, emoji: "🧸", label: "Nursery Bear", top: 22, left: 8, rotation: -12 },
  { id: 2, emoji: "⭐", label: "Starlight", top: 35, left: 85, rotation: 18 },
  { id: 3, emoji: "☁️", label: "Dream Puff", top: 65, left: 14, rotation: -6 },
  { id: 4, emoji: "🍼", label: "Warm Cinnamon Milk", top: 78, left: 78, rotation: 14 },
  { id: 5, emoji: "🏮", label: "Porcelain Lamp", top: 18, left: 70, rotation: -8 },
  { id: 6, emoji: "🎀", label: "Nightcap Ribbon", top: 52, left: 90, rotation: 22 },
  { id: 7, emoji: "✨", label: "Giggle Stardust", top: 82, left: 32, rotation: -15 },
];

export function ChaosMode({ active }: { active: boolean }) {
  const [stickers, setStickers] = useState<FloatingSticker[]>(INITIAL_STICKERS);

  if (!active) return null;

  const handleClick = (id: number) => {
    sound.playClick();
    sound.playChime(523.25, 0.4);
    setStickers((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              rotation: s.rotation + 45,
              top: Math.max(10, Math.min(85, s.top + (Math.random() * 20 - 10))),
              left: Math.max(5, Math.min(85, s.left + (Math.random() * 20 - 10))),
            }
          : s
      )
    );
  };

  return (
    <div
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top Banner Indicator */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#a34063] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl border-2 border-white animate-bounce pointer-events-auto">
        🎈 Responsive Chaos Mode Active! Tap the floating toys! (+5 Pts)
      </div>

      {stickers.map((s) => (
        <button
          key={s.id}
          onClick={() => handleClick(s.id)}
          className="absolute pointer-events-auto cursor-pointer p-3 rounded-2xl bg-white/90 dark:bg-[#1f1b33]/90 border-2 border-[#a34063] shadow-xl hover:scale-125 active:scale-95 transition-all text-center flex flex-col items-center group"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            transform: `rotate(${s.rotation}deg)`,
          }}
          title={`Click to bounce ${s.label}`}
        >
          <span className="text-3xl block group-hover:animate-spin">{s.emoji}</span>
          <span className="text-[10px] font-bold text-[#5c4033] dark:text-[#ffd166] mt-0.5 whitespace-nowrap">
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}
