// src/components/SoundBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Music, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export function SoundBar() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const unsubscribe = sound.subscribeMute((muted) => setIsMuted(muted));
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    sound.toggleMute();
  };

  const handlePlayLullaby = () => {
    sound.playLullabyCascade();
  };

  return (
    <div
      role="region"
      aria-label="Audio controls"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#fff8f1]/95 dark:bg-[#161324]/95 backdrop-blur-md p-1.5 px-3 rounded-full border-2 border-[#a34063] dark:border-[#ff7597] shadow-[0_4px_16px_rgba(163,64,99,0.2)] transition-all"
    >
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 py-1 px-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer text-[#a34063] dark:text-[#ffccd8] hover:bg-[#a34063]/15"
        title={isMuted ? "Click to enable dream sound effects" : "Mute all audio"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <>
            <VolumeX size={16} className="text-[#a34063] dark:text-[#ff7597]" />
            <span className="hidden sm:inline">Sound Muted</span>
          </>
        ) : (
          <>
            <Volume2 size={16} className="text-[#a34063] dark:text-[#ff7597] animate-pulse" />
            <span className="hidden sm:inline">Lullaby Sound On</span>
          </>
        )}
      </button>

      {!isMuted && (
        <button
          onClick={handlePlayLullaby}
          className="flex items-center gap-1 py-1 px-2.5 bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          title="Play 4-note soothing chime sequence"
          aria-label="Play sample chime"
        >
          <Music size={13} />
          <span>Play Chime</span>
        </button>
      )}
    </div>
  );
}
