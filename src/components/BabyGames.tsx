// src/components/BabyGames.tsx
"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Gamepad2, Sparkles, Trophy, RotateCcw, Heart, Star, Award } from "lucide-react";
import { sound } from "@/lib/sound";

// Game 1: Shape Matcher Puzzle Items
const PUZZLE_SHAPES = [
  { id: "star", name: "Starlight Star", icon: "⭐", color: "#fef08a", outline: "border-[#fef08a]" },
  { id: "moon", name: "Crescent Moon", icon: "🌙", color: "#fed7aa", outline: "border-[#fed7aa]" },
  { id: "cloud", name: "Sleepy Cloud", icon: "☁️", color: "#bae6fd", outline: "border-[#bae6fd]" },
  { id: "heart", name: "Warm Heart", icon: "💖", color: "#fbcfe8", outline: "border-[#fbcfe8]" },
];

// Game 3: Peek-a-boo Friends
const PEEKABOO_DOORS = [
  { id: 1, friend: "Pip the Skull Baby", icon: "👶", message: "Peek-a-boo! Pip found you! ✨" },
  { id: 2, friend: "Fluffy Star Bunny", icon: "🐰", message: "Boing boing! Sleepy bunny cuddles! 🌸" },
  { id: 3, friend: "Attic Baby Ghost", icon: "👻", message: "Sweet giggle! Friendly ghost says hi! 💖" },
  { id: 4, friend: "Professor Owlet", icon: "🦉", message: "Hoot hoot! Ready for bedtime stories! 🌙" },
];

export function BabyGames() {
  const [activeTab, setActiveTab] = useState<"puzzle" | "catcher" | "peekaboo">("puzzle");

  // Game 1: Puzzle State
  const [placedShapes, setPlacedShapes] = useState<string[]>([]);
  const [puzzleWon, setPuzzleWon] = useState(false);

  // Game 2: Falling Star Catcher State
  const [caughtStars, setCaughtStars] = useState(0);
  const [fallingStars, setFallingStars] = useState<{ id: number; x: number; speed: number }[]>([]);

  // Game 3: Peek-a-boo State
  const [openedDoors, setOpenedDoors] = useState<number[]>([]);

  // Spawn falling stars for Game 2
  useEffect(() => {
    if (activeTab !== "catcher") return;
    const interval = setInterval(() => {
      setFallingStars((prev) => [
        ...prev.slice(-6),
        {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          speed: 4 + Math.random() * 4,
        },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Shape Match Handler (Game 1)
  const handlePlaceShape = (shapeId: string) => {
    if (placedShapes.includes(shapeId)) return;
    sound.playBabyGiggle();

    const updated = [...placedShapes, shapeId];
    setPlacedShapes(updated);

    if (updated.length === PUZZLE_SHAPES.length) {
      setPuzzleWon(true);
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ["#fbcfe8", "#fef08a", "#bae6fd", "#f472b6"],
      });
    }
  };

  const resetPuzzle = () => {
    sound.playBabyGiggle();
    setPlacedShapes([]);
    setPuzzleWon(false);
  };

  // Catch Star Handler (Game 2)
  const handleCatchStar = (id: number, e: React.MouseEvent) => {
    sound.playChime(523.25, 0.4);
    sound.playBabyGiggle();
    setCaughtStars((prev) => prev + 1);
    setFallingStars((prev) => prev.filter((s) => s.id !== id));

    if ((caughtStars + 1) % 5 === 0) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      });
    }
  };

  // Peek-a-boo Door Toggle (Game 3)
  const handleToggleDoor = (id: number) => {
    sound.playBabyGiggle();
    if (openedDoors.includes(id)) {
      setOpenedDoors((prev) => prev.filter((d) => d !== id));
    } else {
      setOpenedDoors((prev) => [...prev, id]);
    }
  };

  return (
    <section id="baby-games" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto select-none">
      <div className="retro-window p-6 sm:p-10 bg-white/95 dark:bg-[#161324]/95 backdrop-blur-md border-2 border-[#f472b6]/30 dark:border-[#ff7597]/25 shadow-xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f472b6]/20 dark:border-[#ff7597]/20 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#de547a] dark:text-[#ffd166] flex items-center gap-1.5">
              <Gamepad2 size={14} /> Tier 2 Toybox · Baby Playtime Games
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c3828] dark:text-[#fff8f1] mt-1">
              Pip’s Nursery Playroom
            </h2>
            <p className="text-sm text-[#8c6552] dark:text-[#bda7b5] mt-1 max-w-xl">
              Delightful, gentle mini-games created for babies and curious dreamers. Tap shapes, catch stars, and play peek-a-boo!
            </p>
          </div>

          {/* Game Tab Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                sound.playBabyGiggle();
                setActiveTab("puzzle");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "puzzle"
                  ? "bg-[#de547a] text-white shadow-md scale-105"
                  : "bg-[#fff0f4] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] hover:border-[#de547a]"
              }`}
            >
              🧩 Shape Puzzle
            </button>
            <button
              onClick={() => {
                sound.playBabyGiggle();
                setActiveTab("catcher");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "catcher"
                  ? "bg-[#de547a] text-white shadow-md scale-105"
                  : "bg-[#fff0f4] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] hover:border-[#de547a]"
              }`}
            >
              ⭐ Catch Stars
            </button>
            <button
              onClick={() => {
                sound.playBabyGiggle();
                setActiveTab("peekaboo");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "peekaboo"
                  ? "bg-[#de547a] text-white shadow-md scale-105"
                  : "bg-[#fff0f4] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] hover:border-[#de547a]"
              }`}
            >
              🙈 Peek-a-boo!
            </button>
          </div>
        </div>

        {/* GAME 1: SHAPE MATCH PUZZLE */}
        {activeTab === "puzzle" && (
          <div className="pt-8 flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="font-editorial text-2xl font-bold text-[#5c3828] dark:text-white">
                Match the Pastel Shapes into Pip’s Cloud Tray!
              </h3>
              <p className="text-xs text-[#8c6552] dark:text-[#bda7b5] mt-1">
                Tap each shape below to gently place it into its matching glowing socket.
              </p>
            </div>

            {/* Target Sockets Tray */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl p-6 rounded-3xl bg-[#fff0f5] dark:bg-[#1f1b33] border-2 border-dashed border-[#f472b6]/50 shadow-inner">
              {PUZZLE_SHAPES.map((shape) => {
                const isPlaced = placedShapes.includes(shape.id);
                return (
                  <div
                    key={shape.id}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-3 border-2 transition-all ${
                      isPlaced
                        ? "bg-white dark:bg-[#2a2444] border-[#de547a] dark:border-[#ffd166] shadow-md scale-105"
                        : "bg-white/40 dark:bg-white/5 border-dashed border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {isPlaced ? (
                      <>
                        <span className="text-4xl animate-bounce">{shape.icon}</span>
                        <span className="text-[11px] font-bold text-[#de547a] dark:text-[#ffd166] mt-1">
                          Matched! ★
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl opacity-20 filter grayscale">{shape.icon}</span>
                        <span className="text-[10px] text-gray-400 font-bold mt-1">
                          {shape.name.split(" ")[0]}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Available Shapes to Click */}
            {!puzzleWon ? (
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                {PUZZLE_SHAPES.map((shape) => {
                  const isPlaced = placedShapes.includes(shape.id);
                  if (isPlaced) return null;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => handlePlaceShape(shape.id)}
                      className="px-5 py-3 rounded-2xl bg-white dark:bg-[#231e36] border-2 border-[#f472b6]/40 hover:border-[#de547a] shadow-md hover:scale-115 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
                    >
                      <span className="text-3xl group-hover:scale-125 transition-transform">
                        {shape.icon}
                      </span>
                      <span className="text-xs font-bold text-[#5c3828] dark:text-white">
                        Place {shape.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#e8f7ee] dark:bg-[#1a3324] border-2 border-[#1e7e43] text-center animate-bounce">
                <span className="text-base font-bold text-[#1e7e43] dark:text-[#7ce6a4] flex items-center justify-center gap-1.5">
                  <Award size={18} /> Hooray! All Shapes Matched! 🎉
                </span>
                <p className="text-xs text-[#1e7e43]/90 dark:text-[#7ce6a4] mt-0.5">
                  Pip is giggling with joy! You completed the nursery puzzle!
                </p>
                <button
                  onClick={resetPuzzle}
                  className="mt-3 px-4 py-1.5 rounded-full bg-[#1e7e43] text-white text-xs font-bold hover:scale-105 active:scale-95 transition-transform inline-flex items-center gap-1.5"
                >
                  <RotateCcw size={13} /> Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 2: CATCH THE FALLING STARS */}
        {activeTab === "catcher" && (
          <div className="pt-8 flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-xl mb-4 text-xs font-bold text-[#8c6552] dark:text-[#bda7b5]">
              <span>Tap or click falling stars to catch them!</span>
              <span className="font-mono bg-[#ffe4ec] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] px-3 py-1 rounded-full border border-[#f472b6]/20">
                Stars Caught: {caughtStars} ⭐
              </span>
            </div>

            {/* Falling Stars Play Arena */}
            <div className="relative w-full max-w-xl h-80 rounded-3xl bg-gradient-to-b from-[#e0f2fe]/60 via-[#fff0f5]/60 to-[#fef9c3]/60 dark:from-[#161324] dark:to-[#0c0a15] border-2 border-[#f472b6]/30 overflow-hidden shadow-inner">
              {/* Falling Stars */}
              {fallingStars.map((star) => (
                <button
                  key={star.id}
                  onClick={(e) => handleCatchStar(star.id, e)}
                  className="absolute cursor-pointer p-2 hover:scale-135 transition-transform focus:outline-none"
                  style={{
                    left: `${star.x}%`,
                    animation: `starFall ${star.speed}s linear forwards`,
                  }}
                  title="Catch me!"
                >
                  <span className="text-3xl block drop-shadow-[0_0_8px_#fef08a]">⭐</span>
                </button>
              ))}

              {/* Basket at the bottom */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-[#231e36]/90 border-2 border-[#de547a] px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="text-2xl">🧺</span>
                <span className="text-xs font-bold text-[#de547a] dark:text-[#ffd166]">
                  Pip’s Star Basket
                </span>
              </div>
            </div>
          </div>
        )}

        {/* GAME 3: NURSERY PEEK-A-BOO */}
        {activeTab === "peekaboo" && (
          <div className="pt-8 flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="font-editorial text-2xl font-bold text-[#5c3828] dark:text-white">
                Who’s Hiding in the Clouds? Peek-a-boo!
              </h3>
              <p className="text-xs text-[#8c6552] dark:text-[#bda7b5] mt-1">
                Tap each cloud door to open it and meet Pip’s nursery playmates!
              </p>
            </div>

            {/* 4 Cloud Doors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
              {PEEKABOO_DOORS.map((door) => {
                const isOpen = openedDoors.includes(door.id);
                return (
                  <button
                    key={door.id}
                    onClick={() => handleToggleDoor(door.id)}
                    className={`aspect-[3/4] rounded-3xl border-2 transition-all cursor-pointer p-4 flex flex-col items-center justify-between text-center relative overflow-hidden group ${
                      isOpen
                        ? "bg-[#fff0f4] dark:bg-[#231e36] border-[#de547a] dark:border-[#ffd166] shadow-lg scale-105"
                        : "bg-white/85 dark:bg-[#1a1728]/85 border-[#f472b6]/30 dark:border-[#ff7597]/25 hover:border-[#de547a]"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-[#de547a] dark:text-[#ffd166] uppercase">
                      Cloud Door {door.id}
                    </span>

                    {isOpen ? (
                      <div className="my-auto flex flex-col items-center animate-bounce">
                        <span className="text-5xl">{door.icon}</span>
                        <strong className="text-xs font-bold text-[#5c3828] dark:text-white mt-2 block">
                          {door.friend}
                        </strong>
                        <span className="text-[10px] text-[#de547a] dark:text-[#ffccd8] mt-1 block">
                          {door.message}
                        </span>
                      </div>
                    ) : (
                      <div className="my-auto flex flex-col items-center group-hover:scale-110 transition-transform">
                        <span className="text-5xl">☁️</span>
                        <span className="text-xs font-bold text-[#8c6552] dark:text-[#bda7b5] mt-2 block">
                          Tap to open!
                        </span>
                      </div>
                    )}

                    <span className="text-[10px] font-bold text-[#de547a] dark:text-[#ffd166] underline">
                      {isOpen ? "Close Door" : "Knock Knock! 🚪"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes starFall {
          0% {
            top: -40px;
            transform: rotate(0deg);
          }
          100% {
            top: 270px;
            transform: rotate(180deg);
          }
        }
      `}</style>
    </section>
  );
}
