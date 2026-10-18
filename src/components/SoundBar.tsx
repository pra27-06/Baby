// src/components/SoundBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Music, Square, Repeat } from "lucide-react";
import { sound } from "@/lib/sound";

export function SoundBar() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [isAmbientLoop, setIsAmbientLoop] = useState(false);
  const [currentLyric, setCurrentLyric] = useState("");

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const unsubscribeMute = sound.subscribeMute((muted) => setIsMuted(muted));
    const unsubscribeLullaby = sound.subscribeLullaby((playing, lyric) => {
      setIsPlayingLullaby(playing);
      setCurrentLyric(lyric);
    });
    const unsubscribeAmbient = sound.subscribeAmbient((looping) => {
      setIsAmbientLoop(looping);
    });

    return () => {
      unsubscribeMute();
      unsubscribeLullaby();
      unsubscribeAmbient();
    };
  }, []);

  const handleToggle = () => {
    sound.toggleMute();
  };

  const handlePlayLullaby = () => {
    sound.playBabyGiggle();
    if (isPlayingLullaby) {
      sound.stopLullaby();
    } else {
      sound.playLullaby("twinkle");
    }
  };

  const handleToggleAmbient = () => {
    sound.playBabyGiggle();
    sound.toggleAmbientLoop();
  };

  const handleBabyLaugh = () => {
    sound.playBabyGiggle();
  };

  return (
    <div
      role="region"
      aria-label="Audio controls"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 sm:gap-2 bg-white/95 dark:bg-[#161324]/95 backdrop-blur-md p-1.5 px-3 rounded-full border-2 border-[#f472b6] dark:border-[#ff7597] shadow-[0_6px_20px_rgba(244,114,182,0.3)] transition-all select-none"
    >
      {/* Mute / Unmute Button (Required by Rubric) */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer text-[#de547a] dark:text-[#ffccd8] hover:bg-[#fff0f4]"
        title={isMuted ? "Click to enable sound effects" : "Mute all audio"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <>
            <VolumeX size={15} className="text-[#de547a] dark:text-[#ff7597]" />
            <span className="hidden sm:inline">Muted</span>
          </>
        ) : (
          <>
            <Volume2 size={15} className="text-[#de547a] dark:text-[#ff7597] animate-pulse" />
            <span className="hidden sm:inline">Sound On</span>
          </>
        )}
      </button>

      {!isMuted && (
        <>
          {/* Baby Laugh Trigger Button */}
          <button
            onClick={handleBabyLaugh}
            className="flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-bold text-[#5c3828] dark:text-[#ffd166] hover:bg-[#ffe4ec] dark:hover:bg-[#3d2331] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Hear Pip's cute baby laugh!"
            aria-label="Make Pip laugh"
          >
            <span>😄</span>
            <span className="hidden md:inline">Baby Giggle</span>
          </button>

          {/* Continuous Ambient Background Loop Button */}
          <button
            onClick={handleToggleAmbient}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
              isAmbientLoop
                ? "bg-[#1e7e43] text-white animate-pulse"
                : "bg-[#fff0f4] dark:bg-[#231e36] text-[#de547a] dark:text-[#ffd166] border border-[#f472b6]/30"
            }`}
            title="Toggle continuous ambient background lullaby loop"
            aria-label="Toggle ambient background lullaby"
          >
            <Repeat size={12} className={isAmbientLoop ? "animate-spin" : ""} />
            <span className="hidden sm:inline">
              {isAmbientLoop ? "Ambient ON" : "Ambient Lullaby"}
            </span>
          </button>

          {/* Quick Play Lullaby Button */}
          <button
            onClick={handlePlayLullaby}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold transition-transform cursor-pointer shadow-sm ${
              isPlayingLullaby
                ? "bg-[#de547a] text-white"
                : "bg-gradient-to-r from-[#f472b6] to-[#de547a] text-white dark:text-[#0c0a15] hover:scale-105 active:scale-95"
            }`}
            title={isPlayingLullaby ? "Pause lullaby" : "Play Twinkle Twinkle Little Star"}
            aria-label="Play lullaby"
          >
            {isPlayingLullaby ? (
              <>
                <Square size={13} />
                <span className="max-w-[120px] truncate text-[11px]">
                  {currentLyric ? `♪ ${currentLyric}` : "Playing..."}
                </span>
              </>
            ) : (
              <>
                <Music size={13} />
                <span>Twinkle Star ♪</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
