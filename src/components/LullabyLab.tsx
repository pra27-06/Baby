// src/components/LullabyLab.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Music, Play, Square, RotateCcw, Volume2, Sparkles, Heart, Repeat } from "lucide-react";
import { sound, LULLABY_NOTES, LULLABY_CATALOG, LullabySong } from "@/lib/sound";

export function LullabyLab() {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [crankRotations, setCrankRotations] = useState(0);
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [currentLyric, setCurrentLyric] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("twinkle");
  const [isAmbientLoop, setIsAmbientLoop] = useState(false);

  useEffect(() => {
    const unsubLullaby = sound.subscribeLullaby((playing, lyric, songId) => {
      setIsPlayingLullaby(playing);
      setCurrentLyric(lyric);
      if (songId) setSelectedSongId(songId);
      if (playing) {
        setCrankRotations((prev) => prev + 45);
      }
    });

    const unsubAmbient = sound.subscribeAmbient((looping) => {
      setIsAmbientLoop(looping);
    });

    return () => {
      unsubLullaby();
      unsubAmbient();
    };
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
    sound.playBabyGiggle();
    setCrankRotations((prev) => prev + 120);
    sound.playChime(392.0, 0.4);
  };

  const handleSelectSong = (song: LullabySong) => {
    sound.playBabyGiggle();
    setSelectedSongId(song.id);
    if (isPlayingLullaby) {
      sound.playLullaby(song.id);
    }
  };

  const toggleSongPlayback = () => {
    sound.playBabyGiggle();
    if (isPlayingLullaby) {
      sound.stopLullaby();
    } else {
      sound.playLullaby(selectedSongId);
    }
  };

  const toggleAmbient = () => {
    sound.playBabyGiggle();
    sound.toggleAmbientLoop();
  };

  const currentSong = LULLABY_CATALOG.find((s) => s.id === selectedSongId) || LULLABY_CATALOG[0];

  return (
    <section id="lullaby-lab" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="retro-window p-6 sm:p-10 bg-white/90 dark:bg-[#161324]/90 backdrop-blur-sm border-2 border-[#f472b6]/30 dark:border-[#ff7597]/25 shadow-xl">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f472b6]/20 dark:border-[#ff7597]/20 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#de547a] dark:text-[#ffd166] flex items-center gap-1.5">
              <Music size={14} /> Showcase Project 01 · Celestial Music Box
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c3828] dark:text-[#fff8f1] mt-1">
              The Lullaby Lab & Bedtime Music Box
            </h2>
            <p className="text-sm text-[#8c6552] dark:text-[#bda7b5] mt-1 max-w-xl">
              Choose from baby-favorite classical lullabies (*Twinkle Twinkle*, *Brahms’ Lullaby*, *Rock-a-bye Baby*)
              or keep a continuous ambient music box softly chiming in the background.
            </p>
          </div>

          {/* Top Control Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Ambient Background Loop Button */}
            <button
              onClick={toggleAmbient}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isAmbientLoop
                  ? "bg-[#1e7e43] text-white border-[#1e7e43] shadow-md animate-pulse"
                  : "bg-[#fff0f4] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] border-[#f472b6]/30 hover:border-[#de547a]"
              }`}
              title="Toggle continuous ambient background lullaby"
              aria-label="Toggle continuous ambient lullaby"
            >
              <Repeat size={14} className={isAmbientLoop ? "animate-spin" : ""} />
              <span>{isAmbientLoop ? "Ambient Loop: ON 🎵" : "Ambient Loop: OFF"}</span>
            </button>

            {/* Winding Key */}
            <button
              onClick={handleWindCrank}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#fff0f4] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#f472b6]/20"
              title="Wind the golden music box key"
              aria-label="Wind music box crank"
            >
              <RotateCcw
                size={14}
                style={{
                  transform: `rotate(${crankRotations}deg)`,
                  transition: "transform 0.4s ease-out",
                }}
              />
              <span>Wind Key</span>
            </button>

            {/* Play/Stop Selected Song */}
            <button
              onClick={toggleSongPlayback}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isPlayingLullaby
                  ? "bg-[#de547a] text-white"
                  : "bg-gradient-to-r from-[#f472b6] to-[#de547a] text-white dark:text-[#0c0a15]"
              }`}
              aria-label={isPlayingLullaby ? "Pause lullaby" : "Play selected lullaby"}
            >
              {isPlayingLullaby ? (
                <>
                  <Square size={14} />
                  <span>Pause Melody</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Play {currentSong.title.split(" ")[0]} ♪</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lullaby Playlist Carousel / Selector */}
        <div className="pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8c6552] dark:text-[#bda7b5] block mb-3">
            ✨ Choose Your Baby Lullaby:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {LULLABY_CATALOG.map((song) => {
              const isSelected = selectedSongId === song.id;
              const isSongPlaying = isPlayingLullaby && isSelected;
              return (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? "bg-[#fff0f4] dark:bg-[#231e36] border-[#f472b6] dark:border-[#ffd166] shadow-md scale-[1.02]"
                      : "bg-white/70 dark:bg-[#1a1728]/70 border-[#f472b6]/20 dark:border-[#ff7597]/20 hover:border-[#f472b6]/60"
                  }`}
                >
                  <span className="text-2xl p-2 rounded-xl bg-white dark:bg-[#12101e] shadow-sm">
                    {song.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <strong className="text-xs font-bold text-[#5c3828] dark:text-[#fff8f1] block truncate">
                      {song.title}
                    </strong>
                    <span className="text-[10px] text-[#8c6552] dark:text-[#bda7b5] block truncate mt-0.5">
                      {isSongPlaying ? "♪ Playing right now..." : song.subtitle}
                    </span>
                  </div>
                  {isSongPlaying && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#de547a] dark:bg-[#ffd166] animate-ping shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time Synchronized Bedtime Poem & Lyric Ribbon */}
        {isPlayingLullaby && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#ffe4ec] via-[#fffbf7] to-[#ffe4ec] dark:from-[#3d2331] dark:via-[#1f1b33] dark:to-[#3d2331] border-2 border-[#f472b6] dark:border-[#ff7597] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-spin">🎶</span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#de547a] dark:text-[#ffd166]">
                  Now Singing: {currentSong.title}
                </span>
                <p className="font-editorial text-lg sm:text-xl font-bold text-[#5c3828] dark:text-white">
                  “{currentLyric || "♪ Gentle bedtime melody..."}”
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-[#de547a] text-white px-3 py-1 rounded-full">
              Music Box Active ★
            </span>
          </div>
        )}

        {/* Interactive Music Box Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Transparent Music Box Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              <div className="absolute inset-0 bg-[#ffdce5]/70 dark:bg-[#a34063]/20 rounded-full blur-2xl" />
              <div
                className={`relative w-full h-full ${
                  isPlayingLullaby ? "animate-jiggle-baby" : "animate-soft-float"
                }`}
              >
                <Image
                  src="/assets/pip_lullaby_box.png"
                  alt="Transparent music box with golden winding key and floating star chimes"
                  fill
                  className="object-contain drop-shadow-[0_12px_24px_rgba(244,114,182,0.25)]"
                  sizes="320px"
                />
              </div>
            </div>
            <p className="text-xs text-[#8c6552] dark:text-[#bda7b5] text-center mt-2">
              Hand-tuned celestial bells playing classical baby cradle songs.
            </p>
          </div>

          {/* Right: Pastel Xylophone Keys */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-bold text-[#8c6552] dark:text-[#bda7b5]">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#fec84d]" /> Play your own melody (keys 1–8)
              </span>
              <span className="font-mono text-[11px] bg-[#fff0f4] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] px-2 py-0.5 rounded-full border border-[#f472b6]/20">
                Scale: C4 - C5
              </span>
            </div>

            {/* Pastel Chime Keys */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {LULLABY_NOTES.map((item) => {
                const isSelected = activeNote === item.note;
                return (
                  <button
                    key={item.note}
                    onClick={() => triggerNote(item.note, item.freq)}
                    className={`flex flex-col items-center justify-between p-3 py-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                      isSelected
                        ? "bg-[#de547a] text-white border-[#de547a] scale-105 shadow-lg shadow-[#de547a]/30 -translate-y-2"
                        : "bg-white/80 dark:bg-[#1a1728] border-[#f472b6]/30 dark:border-[#ff7597]/20 text-[#5c3828] dark:text-[#fff8f1] hover:border-[#de547a] hover:-translate-y-1"
                    }`}
                    style={{
                      backgroundColor: !isSelected ? item.color + "33" : undefined,
                    }}
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
            <div className="p-4 rounded-2xl bg-[#fffaf4] dark:bg-[#12101e] border border-[#f472b6]/20 dark:border-[#ff7597]/20 text-xs flex items-center justify-between shadow-sm">
              <span className="text-[#5c3828] dark:text-[#e0d6dc]">
                {activeNote ? (
                  <>
                    Vibrating at <strong className="text-[#de547a] dark:text-[#ffd166]">{activeNote}</strong> frequency. Pure music box bell tone.
                  </>
                ) : isPlayingLullaby ? (
                  <>
                    Playing <strong>{currentSong.title}</strong>: <em>“{currentLyric}”</em>
                  </>
                ) : (
                  "Pick a lullaby above, turn on the Ambient Loop, or tap any pastel star key to chime!"
                )}
              </span>
              <Volume2 size={16} className="text-[#de547a] dark:text-[#ffd166] shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
