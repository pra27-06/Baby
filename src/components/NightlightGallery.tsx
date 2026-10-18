// src/components/NightlightGallery.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lightbulb, Sparkles, SunDim, SunMedium, Sun, Eye } from "lucide-react";
import { sound } from "@/lib/sound";

interface LanternItem {
  id: string;
  name: string;
  caption: string;
  lumens: string;
  bedtimeEffect: string;
  glowColor: string;
}

const LANTERNS: LanternItem[] = [
  {
    id: "moon-crescent",
    name: "Crescent Moon Porcelain",
    caption: "Carved from cloud-porcelain with a brass carrying ring.",
    lumens: "15 Warm Lumens",
    bedtimeEffect: "Wards off closet shadows and closet creaks.",
    glowColor: "#fec84d",
  },
  {
    id: "firefly-capsule",
    name: "Stardust Firefly Jar",
    caption: "Trapped stardust particles that blink in sync with slow breaths.",
    lumens: "28 Dream Lumens",
    bedtimeEffect: "Slows racing bedtime thoughts down to 40 bpm.",
    glowColor: "#ffccd8",
  },
  {
    id: "twilight-prism",
    name: "Midnight Aurora Bell",
    caption: "Casts rotating constellation patterns onto bedroom ceilings.",
    lumens: "45 Aurora Lumens",
    bedtimeEffect: "Guarantees dreams of floating above gentle oceans.",
    glowColor: "#7ce6a4",
  },
];

export function NightlightGallery() {
  const [selectedLantern, setSelectedLantern] = useState<LanternItem>(LANTERNS[0]);
  const [brightness, setBrightness] = useState<number>(70);

  const handleSelect = (item: LanternItem) => {
    sound.playClick();
    setSelectedLantern(item);
    sound.playChime(item.id === "moon-crescent" ? 329.63 : item.id === "firefly-capsule" ? 392.0 : 440.0, 0.5);
  };

  return (
    <section id="nightlights" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="retro-window p-6 sm:p-10">
        <div className="border-b border-[#a34063]/15 dark:border-[#ff7597]/20 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#ffd166] flex items-center gap-1.5">
              <Lightbulb size={14} /> Showcase Project 02 · Bedside Lanterns
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c4033] dark:text-[#fff8f1] mt-1">
              The Nightlight Collection
            </h2>
            <p className="text-sm text-[#8a6a58] dark:text-[#bda7b5] mt-1 max-w-xl">
              Every room needs a gentle beacon. Pip designs soothing nightlights that give
              little creatures just enough golden light to know they are completely safe.
            </p>
          </div>

          {/* Glow Dimmer Controller */}
          <div className="flex items-center gap-3 bg-[#fff8f1] dark:bg-[#1f1b33] p-2.5 px-4 rounded-2xl border border-[#a34063]/20">
            <SunDim size={16} className="text-[#a34063] dark:text-[#ffd166]" />
            <input
              type="range"
              min="20"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="accent-[#a34063] dark:accent-[#ffd166] cursor-pointer w-28"
              aria-label="Nightlight brightness dimmer"
            />
            <Sun size={16} className="text-[#a34063] dark:text-[#ffd166]" />
            <span className="text-xs font-mono font-bold text-[#5c4033] dark:text-white w-9">
              {brightness}%
            </span>
          </div>
        </div>

        {/* Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Dynamic Glow Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl p-6 flex items-center justify-center transition-all duration-500 overflow-hidden"
              style={{
                backgroundColor: "#110e1c",
                boxShadow: `0 0 ${brightness * 0.8}px ${selectedLantern.glowColor}${Math.floor(
                  (brightness / 100) * 180
                ).toString(16).padStart(2, "0")}`,
              }}
            >
              {/* Dynamic Aura Glow */}
              <div
                className="absolute inset-4 rounded-full blur-3xl transition-opacity duration-300"
                style={{
                  backgroundColor: selectedLantern.glowColor,
                  opacity: brightness / 100,
                }}
              />

              {/* Lantern Image */}
              <div className="relative w-full h-full animate-soft-float z-10">
                <Image
                  src="/assets/pip_dream_lantern.png"
                  alt="Glowing porcelain dream nightlight lantern"
                  fill
                  className="object-contain"
                  sizes="320px"
                />
              </div>

              {/* Luminescence Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-[#1f1b33]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-[#ffd166]">
                Radiance: {brightness}% · {selectedLantern.lumens}
              </div>
            </div>
          </div>

          {/* Right: Lantern Selection & Specifications */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-xs font-bold text-[#8a6a58] dark:text-[#bda7b5] uppercase tracking-wider">
              Select an illuminated design:
            </span>

            <div className="flex flex-col gap-3">
              {LANTERNS.map((item) => {
                const isSelected = selectedLantern.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "bg-[#fff8f1] dark:bg-[#231e36] border-[#a34063] dark:border-[#ffd166] shadow-md scale-[1.01]"
                        : "bg-white/60 dark:bg-[#161324]/60 border-[#a34063]/15 dark:border-[#ff7597]/15 hover:border-[#a34063]/50"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full mt-1 shrink-0 border border-black/20"
                      style={{ backgroundColor: item.glowColor }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-sm font-bold text-[#5c4033] dark:text-[#fff8f1]">
                          {item.name}
                        </strong>
                        <span className="text-[11px] font-mono text-[#a34063] dark:text-[#ffd166] font-semibold">
                          {item.lumens}
                        </span>
                      </div>
                      <p className="text-xs text-[#8a6a58] dark:text-[#bda7b5] mt-0.5">
                        {item.caption}
                      </p>
                      <div className="mt-2 text-[11px] text-[#5c4033] dark:text-[#e0d6dc] bg-[#ffdce5]/50 dark:bg-[#3d2331]/50 p-1.5 px-2.5 rounded-lg inline-block">
                        ✨ <em>Effect:</em> {item.bedtimeEffect}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
