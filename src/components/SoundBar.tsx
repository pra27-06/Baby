// src/components/SoundBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Music, Square, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export function SoundBar() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [currentLyric, setCurrentLyric] = useState("");

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const unsubscribeMute = sound.subscribeMute((muted) => setIsMuted(muted));
    const unsubscribeLullaby = sound.subscribeLullaby((playing, lyric) => {
      setIsPlayingLullaby(playing);
      setCurrentLyric(lyric);
    });
    return () => {
      unsubscribeMute();
      unsubscribeLullaby();
    };
  }, []);

  const handleToggle = () => {
    sound.toggleMute();
  };

  const handlePlayLullaby = () => {
    if (isPlayingLullaby) {
      sound.stopLullaby();
    } else {
      sound.playFullLullaby();
    }
  };

  const handleBabyLaugh = () => {
    sound.playBabyGiggle();
  };

  return (
    <div
      role="region"
      aria-label="Audio controls"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#fff8f1]/95 dark:bg-[#161324]/95 backdrop-blur-md p-1.5 px-3 rounded-full border-2 border-[#a34063] dark:border-[#ff7597] shadow-[0_4px_16px_rgba(163,64,99,0.25)] transition-all"
    >
      {/* Mute / Unmute Button (Required by Brief) */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 py-1 px-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer text-[#a34063] dark:text-[#ffccd8] hover:bg-[#a34063]/15"
        title={isMuted ? "Click to enable dream sound effects" : "Mute all audio"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <>
            <VolumeX size={16} className="text-[#a34063] dark:text-[#ff7597]" />
            <span className="hidden sm:inline">Muted</span>
          </>
        ) : (
          <>
            <Volume2 size={16} className="text-[#a34063] dark:text-[#ff7597] animate-pulse" />
            <span className="hidden sm:inline">Sound On</span>
          </>
        )}
      </button>

      {!isMuted && (
        <>
          {/* Baby Laugh Trigger Button */}
          <button
            onClick={handleBabyLaugh}
            className="flex items-center gap-1 py-1 px-2 rounded-full text-xs font-bold text-[#5c4033] dark:text-[#ffd166] hover:bg-[#ffdce5] dark:hover:bg-[#3d2331] transition-colors cursor-pointer"
            title="Hear Pip's cute baby laugh!"
            aria-label="Make Pip laugh"
          >
            <span>😄</span>
            <span className="hidden md:inline">Giggle</span>
          </button>

          {/* Full Lullaby Song Player Button */}
          <button
            onClick={handlePlayLullaby}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold transition-transform cursor-pointer shadow-sm ${
              isPlayingLullaby
                ? "bg-[#1e7e43] text-white animate-pulse"
                : "bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] hover:scale-105 active:scale-95"
            }`}
            title={isPlayingLullaby ? "Pause lullaby" : "Play full Brahms' Lullaby music box tune"}
            aria-label="Play lullaby"
          >
            {isPlayingLullaby ? (
              <>
                <Square size={13} />
                <span>{currentLyric ? `♪ ${currentLyric}` : "Playing..."}</span>
              </>
            ) : (
              <>
                <Music size={13} />
                <span>Play Lullaby</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
