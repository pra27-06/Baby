// src/components/Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sun, Moon, Sparkles, Wand2, Heart } from "lucide-react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onToggleChaos: () => void;
  isChaosMode: boolean;
}

export function Navbar({ onToggleChaos, isChaosMode }: NavbarProps) {
  // Default to false (Light Pastel Nursery by default!)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pip_theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    sound.playBabyGiggle();
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

  const handleNavClick = () => {
    sound.playBabyGiggle();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fffaf4]/95 dark:bg-[#0c0a15]/95 border-b border-[#f472b6]/20 dark:border-[#ff7597]/20 transition-colors shadow-sm">
      {/* Early-Web Top Banner Marquee in Cute Pastel Ribbon */}
      <div className="bg-gradient-to-r from-[#f472b6] via-[#f43f5e] to-[#ec4899] dark:from-[#ff7597] dark:to-[#be185d] text-white dark:text-[#0c0a15] text-[11px] font-bold py-1 px-4 overflow-hidden select-none shadow-sm">
        <div className="animate-marquee gap-8 items-center flex">
          <span>🌸 WELCOME TO PIP’S PASTEL NURSERY 🌸</span>
          <span>🍼 100% GENTLE SWEET DREAMS GUARANTEED 🍼</span>
          <span>★ 3 BABY MINI-GAMES: SHAPE PUZZLE, STAR CATCHER & PEEK-A-BOO ★</span>
          <span>💖 PRINCESS BEDTIME STORIES IN ENGLISH & हिन्दी 💖</span>
          <span>✨ GENTLE WATERDROP CURSOR · SWEET BABY GIGGLES ✨</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#"
          onClick={handleNavClick}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#f472b6] dark:border-[#ffd166] group-hover:scale-110 transition-transform bg-[#ffe4ec] dark:bg-[#231e36]">
            <Image
              src="/assets/pip_avatar_cloud.png"
              alt="Pip tiny avatar"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg font-bold tracking-tight text-[#5c3828] dark:text-[#fff8f1] leading-none flex items-center gap-1">
              Pip<span className="text-[#de547a] dark:text-[#ff7597]">.dream</span>
              <Heart size={12} className="text-[#f472b6] fill-current animate-pulse" />
            </span>
            <span className="text-[10px] text-[#de547a] dark:text-[#ffd166] tracking-wider uppercase font-bold">
              Junior Dream Engineer
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-xs lg:text-sm font-semibold text-[#5c3828] dark:text-[#f3ebf0]">
          <a
            href="#about"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95"
          >
            About Pip
          </a>
          <a
            href="#lullaby-lab"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95"
          >
            Lullaby Lab
          </a>
          <a
            href="#baby-games"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95 text-[#de547a] dark:text-[#ffd166] font-bold"
          >
            🎮 Games
          </a>
          <a
            href="#dream-stories"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95 text-[#de547a] dark:text-[#ffd166] font-bold"
          >
            📖 Stories (हिन्दी)
          </a>
          <a
            href="#nightlights"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95"
          >
            Nightlights
          </a>
          <a
            href="#dream-routes"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95"
          >
            Delivery Map
          </a>
          <a
            href="#guestbook"
            onClick={handleNavClick}
            className="hover:text-[#de547a] dark:hover:text-[#ff7597] transition-colors hover:scale-105 active:scale-95"
          >
            Guestbook
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Chaos Mode Toggle */}
          <button
            onClick={() => {
              sound.playBabyGiggle();
              onToggleChaos();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
              isChaosMode
                ? "bg-[#de547a] text-white border-[#de547a] shadow-md animate-bounce"
                : "bg-[#fff0f5] dark:bg-[#1f1b33] text-[#de547a] dark:text-[#ffccd8] border-[#f472b6]/40 hover:border-[#de547a]"
            }`}
            title="Toggle Playroom Chaos Mode (+5 Side Quest Points)"
            aria-label="Toggle Chaos Mode"
          >
            <Wand2 size={13} className={isChaosMode ? "animate-spin" : ""} />
            <span className="hidden sm:inline">
              {isChaosMode ? "Chaos Toys!" : "Chaos Mode"}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fff0f5] dark:bg-[#1f1b33] border border-[#f472b6]/40 dark:border-[#ffd166]/40 text-[#5c3828] dark:text-[#ffd166] hover:border-[#de547a] transition-all cursor-pointer shadow-sm"
            title="Toggle between Pastel Daylight Nursery and Midnight Bedtime mode"
            aria-label={isDark ? "Switch to pastel daylight" : "Switch to midnight bedtime"}
          >
            {isDark ? (
              <>
                <Moon size={14} className="text-[#ffd166]" />
                <span className="hidden sm:inline">Midnight</span>
              </>
            ) : (
              <>
                <Sun size={14} className="text-[#de547a]" />
                <span className="hidden sm:inline">Pastel Sun</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
