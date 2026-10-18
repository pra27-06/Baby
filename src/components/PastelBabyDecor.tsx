// src/components/PastelBabyDecor.tsx
"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";

interface Bubble {
  id: number;
  x: number;
  size: number;
  speed: number;
  popped: boolean;
}

export function PastelBabyDecor() {
  const [duckSqueaked, setDuckSqueaked] = useState(false);
  const [rattleShook, setRattleShook] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Spawn floating dream bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: 8 + i * 13 + (Math.random() * 6 - 3),
      size: 26 + Math.floor(Math.random() * 20),
      speed: 12 + Math.random() * 8,
      popped: false,
    }));
    setBubbles(initialBubbles);
  }, []);

  const handlePopBubble = (id: number) => {
    sound.playBubblePop();
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Re-spawn after 2 seconds
    setTimeout(() => {
      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 2400);
  };

  const handleSqueakDuck = () => {
    sound.playBabyGiggle();
    setDuckSqueaked(true);
    setTimeout(() => setDuckSqueaked(false), 600);
  };

  const handleShakeRattle = () => {
    sound.playRattleShake();
    sound.playBabyGiggle();
    setRattleShook(true);
    setTimeout(() => setRattleShook(false), 600);
  };

  return (
    <>
      {/* 1. Floating Pastel Dream Bubbles (Interactive Popping!) */}
      <div
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
        aria-hidden="true"
      >
        {bubbles.map((b) => {
          if (b.popped) return null;
          return (
            <div
              key={b.id}
              onMouseEnter={() => handlePopBubble(b.id)}
              onClick={() => handlePopBubble(b.id)}
              className="absolute pointer-events-auto cursor-pointer transition-transform hover:scale-125"
              style={{
                left: `${b.x}%`,
                bottom: "-40px",
                width: `${b.size}px`,
                height: `${b.size}px`,
                animation: `floatUpward ${b.speed}s linear infinite`,
              }}
              title="Pop the dream bubble!"
            >
              <div
                className="w-full h-full rounded-full border-2 border-white/60 bg-gradient-to-tr from-[#fbcfe8]/40 via-[#bae6fd]/30 to-[#fef08a]/40 shadow-[inset_0_0_8px_rgba(255,255,255,0.7),0_4px_12px_rgba(244,114,182,0.2)] backdrop-blur-[1px] flex items-center justify-center text-xs"
              >
                <span className="opacity-40">✨</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Interactive Squeaky Toys Nursery Widget (Bottom-Left Corner) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-white/90 dark:bg-[#1f1b33]/90 backdrop-blur-md p-2 px-3 rounded-full border-2 border-[#f472b6] dark:border-[#ff7597] shadow-[0_6px_20px_rgba(244,114,182,0.25)] select-none">
        <span className="text-[11px] font-bold text-[#de6b8a] dark:text-[#ffccd8] hidden sm:inline">
          Nursery Toys:
        </span>

        {/* Squeaky Ducky */}
        <button
          onClick={handleSqueakDuck}
          className={`text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] transition-transform cursor-pointer ${
            duckSqueaked ? "scale-135 rotate-12" : "hover:scale-115"
          }`}
          title="Click to squeak the baby ducky!"
          aria-label="Squeak rubber ducky"
        >
          🦆
        </button>

        {/* Baby Rattle */}
        <button
          onClick={handleShakeRattle}
          className={`text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] transition-transform cursor-pointer ${
            rattleShook ? "scale-135 -rotate-12 animate-wiggle" : "hover:scale-115"
          }`}
          title="Click to shake the baby rattle!"
          aria-label="Shake baby rattle"
        >
          🪇
        </button>

        {/* Warm Milk Bottle */}
        <button
          onClick={() => {
            sound.playBabyGiggle();
          }}
          className="text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] hover:scale-115 transition-transform cursor-pointer"
          title="Pip's warm cinnamon milk bottle!"
          aria-label="Baby milk bottle"
        >
          🍼
        </button>
      </div>

      <style jsx global>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
