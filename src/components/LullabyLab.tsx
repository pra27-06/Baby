// src/components/LullabyLab.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Music, Play, Square, RotateCcw, Volume2, Sparkles, Heart } from "lucide-react";
import { sound, LULLABY_NOTES } from "@/lib/sound";

export function LullabyLab() {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [crankRotations, setCrankRotations] = useState(0);
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [currentLyric, setCurrentLyric] = useState("");

  // Subscribe to real-time lullaby note and lyric events
  useEffect(() => {
    const unsubscribe = sound.subscribeLullaby((playing, lyric) => {
      setIsPlayingLullaby(playing);
      setCurrentLyric(lyric);
      if (playing) {
        setCrankRotations((prev) => prev + 45);
      }
    });
    return unsubscribe;
  }, []);

  // Keyboard shortcut listener for keys 1-8
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const match = LULLABY_NOTES.find((n) => n.key === e.key);
      if (match) {
        triggerNote(match.note, match.freq);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerNote = (note: string, freq: number) => {
    setActiveNote(note);
    sound.playChime(freq, 1.0);
    setTimeout(() => {
      setActiveNote((prev) => (prev === note ? null : prev));
    }, 450);
  };

  const handleWindCrank = () => {
    sound.playClick();
    setCrankRotations((prev) => prev + 120);
    sound.playChime(392.0, 0.4);
  };

  const toggleFullLullaby = () => {
    if (isPlayingLullaby) {
      sound.stopLullaby();
    } else {
      sound.playFullLullaby();
    }
  };

  return (
    <section
      id="lullaby-lab"
      className="py-16 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      <div className="retro-window p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#a34063]/15 dark:border-[#ff7597]/20 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#ffd166] flex items-center gap-1.5">
              <Music size={14} /> Showcase Project 01 · Canon Invention
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c4033] dark:text-[#fff8f1] mt-1">
              The Lullaby Lab & Music Box
            </h2>
            <p className="text-sm text-[#8a6a58] dark:text-[#bda7b5] mt-1 max-w-xl">
              Pip composed a classical soothing music box playing Brahms’ Lullaby tuned to
              gentle harmonic frequencies to tuck in restless babies and creatures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWindCrank}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ffdce5] dark:bg-[#3d2331] text-[#a34063] dark:text-[#ffccd8] text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#a34063]/20"
              title="Wind the golden key"
              aria-label="Wind music box crank"
            >
              <RotateCcw
                size={14}
                style={{
                  transform: `rotate(${crankRotations}deg)`,
                  transition: "transform 0.4s ease-out",
                }}
              />
              <span>Wind Crank</span>
            </button>

            {/* Main Play Lullaby / Poem Button */}
            <button
              onClick={toggleFullLullaby}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isPlayingLullaby
                  ? "bg-[#1e7e43] text-white animate-pulse"
                  : "bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15]"
              }`}
              aria-label={isPlayingLullaby ? "Stop lullaby music" : "Play full lullaby melody"}
            >
              {isPlayingLullaby ? (
                <>
                  <Square size={14} />
                  <span>Pause Lullaby</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Play Bedtime Lullaby ♪</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Bedtime Poem / Lyric Banner */}
        {isPlayingLullaby && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#ffdce5] via-[#fff8f1] to-[#ffdce5] dark:from-[#3d2331] dark:via-[#1f1b33] dark:to-[#3d2331] border-2 border-[#a34063] dark:border-[#ff7597] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-spin">🎶</span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a34063] dark:text-[#ffd166]">
                  Now Playing: Brahms’ Bedtime Poem
                </span>
                <p className="font-editorial text-lg sm:text-xl font-bold text-[#5c4033] dark:text-white">
                  “{currentLyric || "Lullaby, and goodnight..."}”
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-[#a34063] text-white px-3 py-1 rounded-full">
              Music Box Active ★
            </span>
          </div>
        )}

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Transparent Music Box Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <div className="absolute inset-0 bg-[#ffdce5]/60 dark:bg-[#a34063]/20 rounded-full blur-xl" />
              <div
                className={`relative w-full h-full ${
                  isPlayingLullaby ? "animate-jiggle-baby" : "animate-soft-float"
                }`}
              >
                {/* Transparent PNG with white background removed! */}
                <Image
                  src="/assets/pip_lullaby_box.png"
                  alt="Pastel wooden music box with golden winding key and floating star chimes"
                  fill
                  className="object-contain drop-shadow-[0_12px_24px_rgba(92,64,51,0.2)]"
                  sizes="320px"
                />
              </div>
            </div>
            <p className="text-xs text-[#8a6a58] dark:text-[#bda7b5] text-center mt-2">
              Carved with celestial brass gears and dream chime bells.
            </p>
          </div>

          {/* Right: Interactive Xylophone Bar */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#8a6a58] dark:text-[#bda7b5]">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#fec84d]" /> Tap chimes or press keys 1–8
              </span>
              <span className="font-mono text-[11px] bg-[#ffdce5] dark:bg-[#3d2331] text-[#a34063] dark:text-[#ffccd8] px-2 py-0.5 rounded-full">
                Harmonic Scale: C4 - C5
              </span>
            </div>

            {/* Chime Bars Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {LULLABY_NOTES.map((item) => {
                const isSelected = activeNote === item.note;
                return (
                  <button
                    key={item.note}
                    onClick={() => triggerNote(item.note, item.freq)}
                    className={`flex flex-col items-center justify-between p-3 py-4 rounded-xl border-2 transition-all cursor-pointer group ${
                      isSelected
                        ? "bg-[#a34063] text-white border-[#a34063] scale-105 shadow-lg shadow-[#a34063]/30 -translate-y-2"
                        : "bg-white/80 dark:bg-[#1a1728] border-[#a34063]/20 dark:border-[#ff7597]/20 text-[#5c4033] dark:text-[#fff8f1] hover:border-[#a34063] hover:-translate-y-1"
                    }`}
                    aria-label={`Play chime ${item.note}`}
                  >
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider opacity-60">
                      Key {item.key}
                    </span>
                    <span className="text-base font-bold my-2 group-hover:scale-110 transition-transform">
                      {item.note}
                    </span>
                    <span className="text-[10px] font-medium opacity-80 whitespace-nowrap">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Note Frequency Indicator */}
            <div className="p-4 rounded-xl bg-[#fff8f1] dark:bg-[#12101e] border border-[#a34063]/15 dark:border-[#ff7597]/20 text-xs flex items-center justify-between">
              <span className="text-[#5c4033] dark:text-[#e0d6dc]">
                {activeNote ? (
                  <>
                    Vibrating at <strong className="text-[#a34063] dark:text-[#ffd166]">{activeNote}</strong> frequency. Pure music box chime.
                  </>
                ) : isPlayingLullaby ? (
                  <>
                    Playing classical music box melody: <em>“{currentLyric}”</em>
                  </>
                ) : (
                  "Click 'Play Bedtime Lullaby' above or touch any key to chime!"
                )}
              </span>
              <Volume2 size={16} className="text-[#a34063] dark:text-[#ffd166] shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
