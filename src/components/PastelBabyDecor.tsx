// src/components/PastelBabyDecor.tsx
"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

interface Bubble {
  id: number;
  x: number;
  size: number;
  speed: number;
  popped: boolean;
}

interface InteractiveDoodle {
  id: string;
  emoji: string;
  name: string;
  tooltip: string;
  top: string;
  left?: string;
  right?: string;
  bgColor: string;
  borderColor: string;
}

const DOODLES: InteractiveDoodle[] = [
  {
    id: "doodle-moon",
    emoji: "🌙",
    name: "Sleepy Moon",
    tooltip: "Tap to make the moon yawn!",
    top: "15%",
    left: "2%",
    bgColor: "bg-[#fef9c3]/80",
    borderColor: "border-[#fde047]",
  },
  {
    id: "doodle-star",
    emoji: "⭐",
    name: "Twinkle Star",
    tooltip: "Tap for star sprinkles!",
    top: "28%",
    right: "2%",
    bgColor: "bg-[#fff7ed]/80",
    borderColor: "border-[#fed7aa]",
  },
  {
    id: "doodle-cloud",
    emoji: "☁️",
    name: "Fluffy Cloud",
    tooltip: "Tap to fluff the cloud!",
    top: "45%",
    left: "1.5%",
    bgColor: "bg-[#f0f9ff]/80",
    borderColor: "border-[#bae6fd]",
  },
  {
    id: "doodle-teddy",
    emoji: "🧸",
    name: "Cuddly Teddy",
    tooltip: "Tap for a teddy hug!",
    top: "58%",
    right: "2%",
    bgColor: "bg-[#fdf2f8]/80",
    borderColor: "border-[#fbcfe8]",
  },
  {
    id: "doodle-balloon",
    emoji: "🎈",
    name: "Heart Balloon",
    tooltip: "Tap to float high!",
    top: "72%",
    left: "2%",
    bgColor: "bg-[#ffe4e6]/80",
    borderColor: "border-[#fda4af]",
  },
  {
    id: "doodle-rainbow",
    emoji: "🌈",
    name: "Baby Rainbow",
    tooltip: "Tap for rainbow magic!",
    top: "85%",
    right: "2%",
    bgColor: "bg-[#f5f3ff]/80",
    borderColor: "border-[#ddd6fe]",
  },
];

export function PastelBabyDecor() {
  const [activeDoodleId, setActiveDoodleId] = useState<string | null>(null);
  const [duckSqueaked, setDuckSqueaked] = useState(false);
  const [rattleShook, setRattleShook] = useState(false);
  const [pacifierSucked, setPacifierSucked] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Spawn floating dream bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 6 + i * 12 + (Math.random() * 5 - 2.5),
      size: 24 + Math.floor(Math.random() * 22),
      speed: 14 + Math.random() * 8,
      popped: false,
    }));
    setBubbles(initialBubbles);
  }, []);

  const handlePopBubble = (id: number) => {
    sound.playBubblePop();
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Re-spawn after 2.5 seconds
    setTimeout(() => {
      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: false } : b))
      );
    }, 2500);
  };

  const handleTapDoodle = (doodle: InteractiveDoodle, e: React.MouseEvent) => {
    sound.playBabyCoo();
    setActiveDoodleId(doodle.id);
    setTimeout(() => setActiveDoodleId(null), 800);

    // Baby confetti sparkle
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 16,
        spread: 60,
        startVelocity: 18,
        origin: { x, y },
        colors: ["#ffccd8", "#bae6fd", "#fef08a", "#bbf7d0", "#ddd6fe"],
        shapes: ["circle", "star"],
        scalar: 0.8,
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSqueakDuck = () => {
    sound.playBabyCoo();
    setDuckSqueaked(true);
    setTimeout(() => setDuckSqueaked(false), 600);
  };

  const handleShakeRattle = () => {
    sound.playRattleShake();
    sound.playBabyCoo();
    setRattleShook(true);
    setTimeout(() => setRattleShook(false), 600);
  };

  const handleTapPacifier = () => {
    sound.playBabyCoo();
    setPacifierSucked(true);
    setTimeout(() => setPacifierSucked(false), 600);
  };

  return (
    <>
      {/* 1. Floating Pastel Dream Bubbles (Touch / Hover to Pop!) */}
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
              title="Pop the baby dream bubble!"
            >
              <div className="w-full h-full rounded-full border-2 border-white/70 bg-gradient-to-tr from-[#fbcfe8]/40 via-[#bae6fd]/30 to-[#fef08a]/40 shadow-[inset_0_0_8px_rgba(255,255,255,0.8),0_4px_12px_rgba(244,114,182,0.2)] backdrop-blur-[1px] flex items-center justify-center text-xs">
                <span className="opacity-40">✨</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Interactive Pastel Nursery Doodles on Screen Margins (Desktop & Tablet) */}
      <div className="hidden xl:block fixed inset-0 pointer-events-none z-20 overflow-hidden select-none" aria-hidden="true">
        {DOODLES.map((doodle) => {
          const isActive = activeDoodleId === doodle.id;
          return (
            <button
              key={doodle.id}
              onClick={(e) => handleTapDoodle(doodle, e)}
              className={`absolute pointer-events-auto cursor-pointer p-2.5 rounded-2xl border-2 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-125 group ${
                doodle.bgColor
              } ${doodle.borderColor} ${
                isActive ? "scale-140 rotate-12 animate-bounce" : "hover:-translate-y-1"
              }`}
              style={{
                top: doodle.top,
                left: doodle.left,
                right: doodle.right,
              }}
              title={`${doodle.name} · ${doodle.tooltip}`}
              aria-label={doodle.name}
            >
              <span className="text-2xl block transition-transform group-hover:rotate-12">
                {doodle.emoji}
              </span>
              <span className="sr-only">{doodle.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Squeaky Toys & Baby Care Widget (Bottom-Left Nursery Corner) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-1.5 sm:gap-2 bg-white/95 dark:bg-[#1f1b33]/95 backdrop-blur-md p-2 px-3 sm:px-4 rounded-full border-2 border-[#f472b6] dark:border-[#ff7597] shadow-[0_6px_22px_rgba(244,114,182,0.3)] select-none">
        <span className="text-[11px] font-bold text-[#de547a] dark:text-[#ffccd8] hidden md:inline">
          🧸 Nursery Toys:
        </span>

        {/* Squeaky Ducky */}
        <button
          onClick={handleSqueakDuck}
          className={`text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] transition-transform cursor-pointer ${
            duckSqueaked ? "scale-140 rotate-12" : "hover:scale-120"
          }`}
          title="Click to squeak the cute baby ducky!"
          aria-label="Squeak rubber ducky"
        >
          🦆
        </button>

        {/* Baby Rattle */}
        <button
          onClick={handleShakeRattle}
          className={`text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] transition-transform cursor-pointer ${
            rattleShook ? "scale-140 -rotate-12 animate-wiggle" : "hover:scale-120"
          }`}
          title="Click to shake the baby rattle!"
          aria-label="Shake baby rattle"
        >
          🪇
        </button>

        {/* Baby Pacifier / Binkie */}
        <button
          onClick={handleTapPacifier}
          className={`text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] transition-transform cursor-pointer ${
            pacifierSucked ? "scale-140 rotate-6 animate-pulse" : "hover:scale-120"
          }`}
          title="Pip's cozy bedtime pacifier!"
          aria-label="Baby pacifier"
        >
          👶
        </button>

        {/* Warm Milk Bottle */}
        <button
          onClick={() => {
            sound.playBabyCoo();
          }}
          className="text-2xl p-1.5 rounded-full hover:bg-[#fff0f4] dark:hover:bg-[#3d2331] hover:scale-120 transition-transform cursor-pointer"
          title="Pip's warm cinnamon stardust milk bottle!"
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
