// src/components/StorySection.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Moon, Heart } from "lucide-react";
import { sound } from "@/lib/sound";

interface StoryScene {
  step: string;
  title: string;
  copy: string;
  image: string;
  quote: string;
}

const SCENES: StoryScene[] = [
  {
    step: "01 / The Cradle in the Clouds",
    title: "A Starfall Under a Sleepy Moon",
    copy: "Long before Pip arrived at Midnight Nursery, an emerald comet dropped a bundle onto a soft marshmallow cloud. Inside was a tiny skull baby with glowing warm amber eyes, softly snoring under an oversized nightcap stitched with stars. Pip didn't cry—Pip just giggled at the constellations.",
    image: "/assets/pip-reference-sketch.jpg",
    quote: "“Even the night sky needs a baby to tuck it in.”",
  },
  {
    step: "02 / The Nursery Interview",
    title: "The Giggle That Banished Nightmares",
    copy: "When Headmaster Owl interviewed Pip for the Dream Engineer guild, a wandering Nightmare Shadow crept into the chamber. Instead of shuddering, baby Pip crawled over, tugged the shadow’s spiky ears, and broke into a jolly baby belly laugh. The monster dissolved into lavender stardust.",
    image: "/assets/pip_portrait.png",
    quote: "“Nightmares cannot survive in a room filled with true giggles.”",
  },
  {
    step: "03 / The Engineer's Calling",
    title: "Building the Dreams We Live Inside",
    copy: "Now, every evening when twilight turns berry-purple, Pip winds up the music box, lights the porcelain moon lantern, and floats over sleepy chimneys. Every gentle creature who closes their eyes is gifted a dream handcrafted with kindness, warmth, and cozy starlight.",
    image: "/assets/pip_avatar_cloud.png",
    quote: "“Goodnight, little world. Sleep safe and warm.”",
  },
];

export function StorySection() {
  const [activeScene, setActiveScene] = useState(0);

  const handleNext = () => {
    sound.playClick();
    sound.playChime(440.0, 0.4);
    setActiveScene((prev) => (prev + 1) % SCENES.length);
  };

  const handlePrev = () => {
    sound.playClick();
    sound.playChime(329.63, 0.4);
    setActiveScene((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  };

  const scene = SCENES[activeScene];

  return (
    <section id="story" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="retro-window p-6 sm:p-10 bg-gradient-to-br from-white/90 to-[#fff8f1]/90 dark:from-[#161324] dark:to-[#100d1c]">
        {/* Section Header */}
        <div className="border-b border-[#a34063]/15 dark:border-[#ff7597]/20 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#ffd166] flex items-center gap-1.5">
              <BookOpen size={14} /> Origin Chronicles · Interactive Story
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c4033] dark:text-[#fff8f1] mt-1">
              The Legend of Pip
            </h2>
            <p className="text-sm text-[#8a6a58] dark:text-[#bda7b5] mt-1">
              Told in three bedtime vignettes. Click the page arrows to turn the story.
            </p>
          </div>

          {/* Page Indicators */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#a34063] dark:text-[#ffd166]">
              Scene {activeScene + 1} of {SCENES.length}
            </span>
            <div className="flex gap-1.5">
              {SCENES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setActiveScene(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    activeScene === idx
                      ? "bg-[#a34063] dark:bg-[#ffd166] w-6"
                      : "bg-[#a34063]/25 dark:bg-[#ff7597]/30 hover:bg-[#a34063]/50"
                  }`}
                  aria-label={`Go to scene ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Story Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Vignette Illustration Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#5c4033]/20 dark:border-[#ffd166]/30 shadow-lg bg-[#fff8f1] dark:bg-[#1f1b33]">
              <Image
                src={scene.image}
                alt={scene.title}
                fill
                className="object-contain p-4"
                sizes="300px"
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {scene.step}
              </div>
            </div>
          </div>

          {/* Right: Narrative Vignette Content (<150 words per scene) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-xs font-mono font-bold text-[#a34063] dark:text-[#ffd166] uppercase tracking-wider">
              {scene.step}
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#5c4033] dark:text-[#fff8f1]">
              {scene.title}
            </h3>

            <p className="text-base text-[#5c4033]/90 dark:text-[#e0d6dc] leading-relaxed">
              {scene.copy}
            </p>

            <blockquote className="p-3.5 rounded-xl border-l-4 border-[#a34063] dark:border-[#ffd166] bg-[#ffdce5]/40 dark:bg-[#3d2331]/40 text-xs italic text-[#5c4033] dark:text-[#ffccd8] font-editorial">
              {scene.quote}
            </blockquote>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#a34063]/30 dark:border-[#ff7597]/30 text-xs font-bold text-[#5c4033] dark:text-[#fff8f1] hover:bg-[#a34063]/10 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous scene"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                aria-label="Next scene"
              >
                <span>Next Chapter</span> <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
