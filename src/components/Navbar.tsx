// src/components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sun, Moon, Sparkles, Wand2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onToggleChaos: () => void;
  isChaosMode: boolean;
}

export function Navbar({ onToggleChaos, isChaosMode }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference or stored theme
    const saved = localStorage.getItem("pip_theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    sound.playClick();
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("pip_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("pip_theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fff8f1]/90 dark:bg-[#0c0a15]/90 border-b border-[#a34063]/15 dark:border-[#ff7597]/20 transition-colors">
      {/* Early-Web Top Banner Marquee */}
      <div className="bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] text-[11px] font-bold py-1 px-4 overflow-hidden select-none">
        <div className="animate-marquee gap-8 items-center flex">
          <span>★ WELCOME TO MIDNIGHT NURSERY ★</span>
          <span>CREATING SOOTHING DREAMS SINCE 17:17 IST</span>
          <span>★ 100% GIGGLES GUARANTEED ★</span>
          <span>OFFICIAL SUBMISSION FOR HAX.BABY FIRST WEBSITE HACKATHON</span>
          <span>★ NO NIGHTMARES PERMITTED ON THIS FREQUENCY ★</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#a34063] dark:border-[#ffd166] group-hover:scale-110 transition-transform">
            <Image
              src="/assets/pip_avatar_cloud.png"
              alt="Pip tiny avatar"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg font-bold tracking-tight text-[#5c4033] dark:text-[#fff8f1] leading-none">
              Pip<span className="text-[#a34063] dark:text-[#ff7597]">.dream</span>
            </span>
            <span className="text-[10px] text-[#a34063] dark:text-[#ffd166] tracking-wider uppercase font-semibold">
              Junior Dream Engineer
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#5c4033] dark:text-[#f3ebf0]">
          <a
            href="#about"
            onClick={() => sound.playClick()}
            className="hover:text-[#a34063] dark:hover:text-[#ff7597] transition-colors"
          >
            About Pip
          </a>
          <a
            href="#lullaby-lab"
            onClick={() => sound.playClick()}
            className="hover:text-[#a34063] dark:hover:text-[#ff7597] transition-colors"
          >
            Lullaby Lab
          </a>
          <a
            href="#nightlights"
            onClick={() => sound.playClick()}
            className="hover:text-[#a34063] dark:hover:text-[#ff7597] transition-colors"
          >
            Nightlights
          </a>
          <a
            href="#dream-routes"
            onClick={() => sound.playClick()}
            className="hover:text-[#a34063] dark:hover:text-[#ff7597] transition-colors"
          >
            Delivery Map
          </a>
          <a
            href="#story"
            onClick={() => sound.playClick()}
            className="hover:text-[#a34063] dark:hover:text-[#ff7597] transition-colors"
          >
            Bedtime Story
          </a>
          <a
            href="#guestbook"
            onClick={() => sound.playClick()}
            className="hover:text-[#a34063] dark:hover:text-[#ff7597] transition-colors"
          >
            Guestbook
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Chaos Mode Toggle (+5 pts Side Quest) */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleChaos();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              isChaosMode
                ? "bg-[#a34063] text-white border-[#a34063] shadow-md animate-bounce"
                : "bg-[#fff8f1] dark:bg-[#1f1b33] text-[#a34063] dark:text-[#ffccd8] border-[#a34063]/30 hover:border-[#a34063]"
            }`}
            title="Toggle Playroom Chaos Mode (+5 Side Quest Points)"
            aria-label="Toggle Chaos Mode"
          >
            <Wand2 size={13} className={isChaosMode ? "animate-spin" : ""} />
            <span className="hidden sm:inline">
              {isChaosMode ? "Chaos Active!" : "Chaos Mode"}
            </span>
          </button>

          {/* Daylight / Midnight Mood Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fff8f1] dark:bg-[#1f1b33] border border-[#a34063]/30 dark:border-[#ffd166]/40 text-[#5c4033] dark:text-[#ffd166] hover:border-[#a34063] transition-all cursor-pointer shadow-sm"
            title="Toggle Daylight Nursery and Starlight Midnight mode"
            aria-label={isDark ? "Switch to daylight nursery" : "Switch to midnight nursery"}
          >
            {isDark ? (
              <>
                <Moon size={14} className="text-[#ffd166]" />
                <span className="hidden sm:inline">Midnight</span>
              </>
            ) : (
              <>
                <Sun size={14} className="text-[#a34063]" />
                <span className="hidden sm:inline">Daylight</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
