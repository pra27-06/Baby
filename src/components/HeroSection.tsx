// src/components/HeroSection.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Moon, Compass, Star, Award, ChevronDown } from "lucide-react";
import { sound } from "@/lib/sound";

export function HeroSection() {
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
  const [counter, setCounter] = useState(1429);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  // Dynamic eye tracking
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.hypot(dx, dy) * 0.03, 5);

      setPupilPos({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  // Periodic dreamy odometer increment
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  const handleNightcapClick = (e: React.MouseEvent) => {
    const newCount = easterEggClicks + 1;
    setEasterEggClicks(newCount);
    sound.playClick();

    if (newCount >= 3) {
      setEasterEggUnlocked(true);
      sound.playSleepyYawn();

      confetti({
        particleCount: 65,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#a34063", "#fec84d", "#ffccd8", "#fff8f1", "#ffd166"],
      });
    }
  };

  return (
    <section
      id="about"
      className="relative pt-12 pb-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Decorative Star Constellations in Background */}
      <div className="absolute top-8 left-10 text-[#a34063]/30 dark:text-[#ffd166]/30 text-2xl select-none animate-star-pulse">
        ★
      </div>
      <div className="absolute top-24 right-12 text-[#fec84d]/40 dark:text-[#ffd166]/30 text-xl select-none animate-star-pulse" style={{ animationDelay: "1.2s" }}>
        ✦
      </div>
      <div className="absolute bottom-10 left-1/4 text-[#a34063]/25 dark:text-[#ff7597]/25 text-3xl select-none animate-star-pulse" style={{ animationDelay: "2.1s" }}>
        ☾
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Character Bio & Credentials */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left">
          {/* Identity Eyebrow Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ffdce5] dark:bg-[#3d2331] text-[#a34063] dark:text-[#ffccd8] border border-[#a34063]/20">
              <Sparkles size={12} /> Canon Track 1 · haX.baby
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fef5d6] dark:bg-[#342e1a] text-[#8a6000] dark:text-[#ffd166] border border-[#fec84d]/30">
              <Moon size={12} /> Midnight Nursery Staff
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e8f7ee] dark:bg-[#1a3324] text-[#1e7e43] dark:text-[#7ce6a4] border border-[#1e7e43]/20">
              <Heart size={12} /> 100% Gentle & Cute
            </span>
          </div>

          {/* Main Title & Editorial Headline */}
          <div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#5c4033] dark:text-[#fff8f1] leading-[1.08]">
              Hello, I’m <span className="text-[#a34063] dark:text-[#ff7597]">Pip</span>!
            </h1>
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#a34063] dark:text-[#ffd166] mt-2 font-medium">
              “I build the dreams you fall asleep inside.”
            </p>
          </div>

          {/* Core Introduction (Plain words, <150 words per guidelines) */}
          <p className="text-base sm:text-lg text-[#5c4033]/90 dark:text-[#e0d6dc] leading-relaxed max-w-xl mx-auto lg:mx-0">
            I am a sleepy skull baby with glowing amber eye sockets, a tiny crooked grin,
            and a starry nightcap. As the <strong>Junior Dream Engineer</strong> at Midnight
            Nursery, I craft celestial lullabies, glowing bedside nightlights, and cozy
            bedtime stories to tuck in every little creature across the neighborhood.
          </p>

          {/* Character Quirks & Traits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#161324]/80 border border-[#a34063]/15 dark:border-[#ff7597]/20 shadow-sm">
              <span className="block text-[#a34063] dark:text-[#ffd166] font-bold uppercase tracking-wider text-[10px]">
                Species
              </span>
              <strong className="text-sm text-[#5c4033] dark:text-white">Skull Baby</strong>
            </div>
            <div className="p-3 rounded-xl bg-white/70 dark:bg-[#161324]/80 border border-[#a34063]/15 dark:border-[#ff7597]/20 shadow-sm">
              <span className="block text-[#a34063] dark:text-[#ffd166] font-bold uppercase tracking-wider text-[10px]">
                Specialty
              </span>
              <strong className="text-sm text-[#5c4033] dark:text-white">Dream Synthesis</strong>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/70 dark:bg-[#161324]/80 border border-[#a34063]/15 dark:border-[#ff7597]/20 shadow-sm">
              <span className="block text-[#a34063] dark:text-[#ffd166] font-bold uppercase tracking-wider text-[10px]">
                Secret Weapon
              </span>
              <strong className="text-sm text-[#5c4033] dark:text-white">Giggles at Ghosts</strong>
            </div>
          </div>

          {/* Vintage Odometer Hit Counter (+1 pt Side Quest) */}
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
            <span className="text-xs font-bold text-[#8a6a58] dark:text-[#bda7b5] uppercase tracking-wider">
              Dreams Delivered:
            </span>
            <div
              className="inline-flex bg-[#1a1726] text-[#ffd166] font-mono text-sm font-bold tracking-widest px-3 py-1 rounded border-2 border-[#5c4033] shadow-inner select-none"
              title="Vintage mechanical dream delivery counter (+1 pt side quest)"
            >
              {String(counter).padStart(6, "0")}
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
            <a
              href="#lullaby-lab"
              onClick={() => sound.playClick()}
              className="px-5 py-2.5 rounded-full bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Compass size={16} /> Explore Inventions
            </a>
            <a
              href="#story"
              onClick={() => sound.playClick()}
              className="px-5 py-2.5 rounded-full bg-white dark:bg-[#1f1b33] text-[#5c4033] dark:text-[#ffccd8] border-2 border-[#a34063]/30 hover:border-[#a34063] text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Star size={16} /> Read Bedtime Story
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Character Cloud Avatar & Easter Egg */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={avatarRef}
            className="relative w-72 sm:w-84 aspect-square flex items-center justify-center select-none group"
          >
            {/* Ambient cloud glow */}
            <div className="absolute inset-0 bg-[#ffdce5]/70 dark:bg-[#a34063]/30 rounded-full blur-2xl animate-pulse" />

            {/* Official Pip Avatar on Cloud */}
            <div className="relative w-full h-full animate-soft-float">
              <Image
                src="/assets/pip_avatar_cloud.png"
                alt="Pip the Skull Baby waving on a sleepy cloud with cozy nightcap"
                fill
                priority
                className="object-contain drop-shadow-[0_16px_28px_rgba(92,64,51,0.18)]"
                sizes="(max-width: 768px) 280px, 360px"
              />

              {/* Secret Clickable Nightcap Area (Easter Egg Trigger) */}
              <button
                onClick={handleNightcapClick}
                className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-20 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                title="Psst... Tap Pip's starry nightcap 3 times!"
                aria-label="Secret nightcap tap area"
              >
                <span className="text-[10px] font-bold bg-[#fff8f1] text-[#a34063] px-2 py-0.5 rounded-full shadow border border-[#a34063]">
                  Tap me!
                </span>
              </button>
            </div>

            {/* Easter Egg Floating Banner */}
            {easterEggUnlocked && (
              <div className="absolute -bottom-6 bg-[#fff8f1] dark:bg-[#1f1b33] border-2 border-[#a34063] dark:border-[#ffd166] text-[#5c4033] dark:text-[#ffd166] px-4 py-2 rounded-2xl shadow-xl text-center z-20 animate-bounce">
                <span className="text-xs font-bold flex items-center justify-center gap-1">
                  <Award size={14} className="text-[#fec84d]" /> Easter Egg Unlocked!
                </span>
                <p className="text-[11px] text-[#8a6a58] dark:text-[#bda7b5]">
                  Pip giggled and sprinkled cozy stardust into your browser! ✨
                </p>
              </div>
            )}
          </div>

          {/* Hint note underneath avatar */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-[#8a6a58] dark:text-[#bda7b5]">
            <Sparkles size={13} className="text-[#a34063] dark:text-[#ffd166]" />
            <span>Move your cursor to watch Pip’s cozy gaze wander!</span>
          </div>
        </div>
      </div>

      {/* Down Scroll Prompt */}
      <div className="flex justify-center pt-10">
        <a
          href="#lullaby-lab"
          onClick={() => sound.playClick()}
          className="flex flex-col items-center gap-1 text-xs font-bold text-[#a34063] dark:text-[#ffd166] hover:scale-105 transition-transform"
        >
          <span>Step inside Pip’s workshop</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
