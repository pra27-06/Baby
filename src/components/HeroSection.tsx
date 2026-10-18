// src/components/HeroSection.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Moon, Compass, Star, Award, ChevronDown, Hand } from "lucide-react";
import { sound } from "@/lib/sound";

interface FloatingGiggle {
  id: number;
  text: string;
  x: number;
  y: number;
}

export function HeroSection() {
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
  const [counter, setCounter] = useState(1429);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isJigglingHard, setIsJigglingHard] = useState(false);
  const [giggles, setGiggles] = useState<FloatingGiggle[]>([]);

  const avatarRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, origX: 0, origY: 0 });

  // Dynamic eye tracking
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      if (!avatarRef.current || isDragging) return;
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
  }, [isDragging]);

  // Periodic dreamy odometer increment
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  // Draggable baby mechanics
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: dragOffset.x,
      origY: dragOffset.y,
    };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        origX: dragOffset.x,
        origY: dragOffset.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setDragOffset({
        x: dragStartRef.current.origX + dx,
        y: dragStartRef.current.origY + dy,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setDragOffset({
        x: dragStartRef.current.origX + dx,
        y: dragStartRef.current.origY + dy,
      });
    };

    const handleDragEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setTimeout(() => {
          setDragOffset({ x: 0, y: 0 });
        }, 120);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging]);

  // Cute baby giggling on click!
  const handlePipClick = (e: React.MouseEvent) => {
    sound.playBabyGiggle();
    setIsJigglingHard(true);
    setTimeout(() => setIsJigglingHard(false), 900);

    const giggleTexts = [
      "Hee hee! (≧◡≦)",
      "He-he-ha! ✨",
      "Tickles! 💖",
      "Aww! Giggles! ☁️",
      "Giggle giggle! ★",
      "Coo-coo! 🌸",
    ];
    const newGiggle: FloatingGiggle = {
      id: Date.now() + Math.random(),
      text: giggleTexts[Math.floor(Math.random() * giggleTexts.length)],
      x: (Math.random() * 80) - 40,
      y: (Math.random() * -40) - 20,
    };

    setGiggles((prev) => [...prev.slice(-4), newGiggle]);
    setTimeout(() => {
      setGiggles((prev) => prev.filter((g) => g.id !== newGiggle.id));
    }, 1500);

    const newCount = easterEggClicks + 1;
    setEasterEggClicks(newCount);

    if (newCount >= 3) {
      setEasterEggUnlocked(true);
      confetti({
        particleCount: 65,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ["#f472b6", "#fbcfe8", "#fef08a", "#bae6fd", "#ffd166"],
      });
    }
  };

  return (
    <section
      id="about"
      className="relative pt-12 pb-20 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Decorative Star Constellations in Background */}
      <div className="absolute top-8 left-10 text-[#f472b6]/35 dark:text-[#ffd166]/30 text-2xl select-none animate-star-pulse">
        ★
      </div>
      <div
        className="absolute top-24 right-12 text-[#fec84d]/40 dark:text-[#ffd166]/30 text-xl select-none animate-star-pulse"
        style={{ animationDelay: "1.2s" }}
      >
        ✦
      </div>
      <div
        className="absolute bottom-10 left-1/4 text-[#f472b6]/30 dark:text-[#ff7597]/25 text-3xl select-none animate-star-pulse"
        style={{ animationDelay: "2.1s" }}
      >
        ☾
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Character Bio & Credentials */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-center lg:text-left">
          {/* Identity Eyebrow Badges with Pastel Pillows */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ffe4ec] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] border border-[#f472b6]/30 shadow-sm">
              <Sparkles size={12} /> Canon Track 1 · haX.baby
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fef9c3] dark:bg-[#342e1a] text-[#854d0e] dark:text-[#ffd166] border border-[#fef08a]/50 shadow-sm">
              <Moon size={12} /> Midnight Nursery Staff
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e0f2fe] dark:bg-[#1a3324] text-[#0369a1] dark:text-[#7ce6a4] border border-[#bae6fd]/50 shadow-sm">
              <Heart size={12} /> 100% Gentle & Cute
            </span>
          </div>

          {/* Main Title & Editorial Headline */}
          <div>
            <h1 className="font-editorial text-4xl sm:text-6xl font-bold tracking-tight text-[#5c3828] dark:text-[#fff8f1] leading-[1.08]">
              Hello, I’m <span className="text-[#de547a] dark:text-[#ff7597]">Pip</span>!
            </h1>
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#de547a] dark:text-[#ffd166] mt-2 font-medium">
              “I build the dreams you fall asleep inside.”
            </p>
          </div>

          {/* Core Introduction */}
          <p className="text-base sm:text-lg text-[#5c3828]/90 dark:text-[#e0d6dc] leading-relaxed max-w-xl mx-auto lg:mx-0">
            I am a sleepy skull baby with glowing amber eye sockets, a tiny crooked grin,
            and a starry nightcap. As the <strong>Junior Dream Engineer</strong> at Midnight
            Nursery, I craft celestial lullabies, glowing bedside nightlights, and cozy
            bedtime stories to tuck in every little creature across the neighborhood.
          </p>

          {/* Character Quirks & Traits Grid with Pastel Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-[#161324]/80 border-2 border-[#f472b6]/25 dark:border-[#ff7597]/20 shadow-sm">
              <span className="block text-[#de547a] dark:text-[#ffd166] font-bold uppercase tracking-wider text-[10px]">
                Species
              </span>
              <strong className="text-sm text-[#5c3828] dark:text-white">Skull Baby</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/85 dark:bg-[#161324]/80 border-2 border-[#f472b6]/25 dark:border-[#ff7597]/20 shadow-sm">
              <span className="block text-[#de547a] dark:text-[#ffd166] font-bold uppercase tracking-wider text-[10px]">
                Specialty
              </span>
              <strong className="text-sm text-[#5c3828] dark:text-white">Dream Synthesis</strong>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white/85 dark:bg-[#161324]/80 border-2 border-[#f472b6]/25 dark:border-[#ff7597]/20 shadow-sm">
              <span className="block text-[#de547a] dark:text-[#ffd166] font-bold uppercase tracking-wider text-[10px]">
                Secret Weapon
              </span>
              <strong className="text-sm text-[#5c3828] dark:text-white">Giggles at Ghosts</strong>
            </div>
          </div>

          {/* Vintage Odometer Hit Counter */}
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
            <span className="text-xs font-bold text-[#8c6552] dark:text-[#bda7b5] uppercase tracking-wider">
              Dreams Delivered:
            </span>
            <div
              className="inline-flex bg-[#1a1726] text-[#ffd166] font-mono text-sm font-bold tracking-widest px-3 py-1 rounded border-2 border-[#5c3828] shadow-inner select-none"
              title="Vintage mechanical dream delivery counter"
            >
              {String(counter).padStart(6, "0")}
            </div>
          </div>

          {/* Call to action buttons with sweet baby giggles */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
            <a
              href="#lullaby-lab"
              onClick={() => sound.playBabyGiggle()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#f472b6] to-[#de547a] text-white text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Compass size={16} /> Explore Inventions
            </a>
            <a
              href="#story"
              onClick={() => sound.playBabyGiggle()}
              className="px-6 py-3 rounded-full bg-white dark:bg-[#1f1b33] text-[#5c3828] dark:text-[#ffccd8] border-2 border-[#f472b6]/40 hover:border-[#de547a] text-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Star size={16} /> Read Bedtime Story
            </a>
          </div>
        </div>

        {/* Right Column: Movable, Jiggly Cloud Baby with Soft Pastel Atmosphere */}
        <div className="lg:col-span-5 flex flex-col items-center select-none">
          {/* Cloud Stage Container */}
          <div
            ref={avatarRef}
            className="relative w-80 h-96 sm:w-96 sm:h-[420px] flex items-center justify-center select-none"
          >
            {/* Ambient Multi-layer Cloud Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe4ec]/60 via-[#fef08a]/30 to-[#bae6fd]/50 dark:from-[#a34063]/25 dark:to-[#3d2331]/25 rounded-full blur-3xl pointer-events-none" />

            {/* Drifting Soft Cloud Puff 1 (Left) */}
            <div
              className="absolute -bottom-4 -left-6 w-36 h-20 bg-white/85 dark:bg-[#231e36]/80 rounded-full blur-md animate-cloud-drift-1 pointer-events-none border border-[#fbcfe8]/40 dark:border-white/10"
              style={{ boxShadow: "0 8px 24px rgba(244, 114, 182, 0.25)" }}
            />

            {/* Drifting Soft Cloud Puff 2 (Right) */}
            <div
              className="absolute -bottom-2 -right-6 w-44 h-24 bg-white/75 dark:bg-[#231e36]/70 rounded-full blur-md animate-cloud-drift-2 pointer-events-none border border-[#fef08a]/40 dark:border-white/10"
              style={{ boxShadow: "0 8px 24px rgba(254, 200, 77, 0.25)" }}
            />

            {/* Drifting Soft Cloud Puff 3 (Center Base) */}
            <div
              className="absolute bottom-2 w-64 h-24 bg-white/95 dark:bg-[#1c182d]/90 rounded-full blur-sm pointer-events-none"
            />

            {/* Movable & Jiggly Baby Wrapper */}
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onClick={handlePipClick}
              className={`relative w-72 h-88 sm:w-80 sm:h-96 cursor-grab active:cursor-grabbing transition-transform ${
                isDragging ? "transition-none scale-105" : "transition-transform duration-300"
              } ${isJigglingHard ? "scale-110 rotate-6" : "animate-jiggle-baby"}`}
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
              }}
              title="Click to hear Pip giggle! Drag me around the cloud!"
              role="button"
              tabIndex={0}
              aria-label="Interactive movable baby Pip. Click to make Pip laugh, or drag around."
            >
              <Image
                src="/assets/pip_avatar_cloud.png"
                alt="Pip the Skull Baby on a sleepy cloud"
                fill
                priority
                className="object-contain pointer-events-none drop-shadow-[0_18px_32px_rgba(244,114,182,0.25)] dark:drop-shadow-[0_18px_32px_rgba(255,117,151,0.25)]"
                sizes="(max-width: 768px) 300px, 360px"
              />

              {/* Floating Baby Giggle Speech Bubbles */}
              {giggles.map((g) => (
                <div
                  key={g.id}
                  className="absolute left-1/2 top-10 pointer-events-none bg-gradient-to-r from-[#f472b6] to-[#de547a] dark:from-[#ffd166] dark:to-[#fec84d] text-white dark:text-[#0c0a15] text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/60 animate-bounce"
                  style={{
                    transform: `translate(${g.x}px, ${g.y}px)`,
                  }}
                >
                  {g.text}
                </div>
              ))}
            </div>

            {/* Easter Egg Floating Banner */}
            {easterEggUnlocked && (
              <div className="absolute -bottom-8 bg-white dark:bg-[#1f1b33] border-2 border-[#f472b6] dark:border-[#ffd166] text-[#5c3828] dark:text-[#ffd166] px-4 py-2 rounded-2xl shadow-xl text-center z-20 animate-bounce">
                <span className="text-xs font-bold flex items-center justify-center gap-1">
                  <Award size={14} className="text-[#fec84d]" /> Pip Giggled with Joy!
                </span>
                <p className="text-[11px] text-[#8c6552] dark:text-[#bda7b5]">
                  You discovered Pip’s sweet baby giggle and stardust blessing! ✨
                </p>
              </div>
            )}
          </div>

          {/* Interactive Guidance Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#ffe4ec] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8] px-3 py-1 rounded-full border border-[#f472b6]/25 shadow-sm">
              <Hand size={12} /> Drag me around!
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#fef9c3] dark:bg-[#342e1a] text-[#854d0e] dark:text-[#ffd166] px-3 py-1 rounded-full border border-[#fef08a]/50 shadow-sm">
              <Sparkles size={12} /> Click me to hear cute baby giggles!
            </span>
          </div>
        </div>
      </div>

      {/* Down Scroll Prompt */}
      <div className="flex justify-center pt-8">
        <a
          href="#lullaby-lab"
          onClick={() => sound.playBabyGiggle()}
          className="flex flex-col items-center gap-1 text-xs font-bold text-[#de547a] dark:text-[#ffd166] hover:scale-105 transition-transform"
        >
          <span>Step inside Pip’s workshop</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
