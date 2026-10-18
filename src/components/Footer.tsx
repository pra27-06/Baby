// src/components/Footer.tsx
"use client";

import React from "react";
import { ArrowUp, Heart, ExternalLink, ShieldCheck, Code2 } from "lucide-react";
import { sound } from "@/lib/sound";

export function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t-2 border-[#a34063]/20 dark:border-[#ff7597]/20 bg-[#fff8f1] dark:bg-[#0c0a15] py-12 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top Tier: Early-Web Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono select-none">
          <span className="p-1 px-3 rounded bg-white dark:bg-[#1a1728] border-2 border-[#5c4033] dark:border-[#ffd166] text-[#5c4033] dark:text-[#ffd166] font-bold shadow-sm">
            ★ HAX.BABY #001 ★
          </span>
          <span className="p-1 px-3 rounded bg-[#a34063] text-white border-2 border-[#5c4033] font-bold shadow-sm">
            TRACK 1: THE SKULL BABY
          </span>
          <span className="p-1 px-3 rounded bg-white dark:bg-[#1a1728] border-2 border-[#5c4033] dark:border-[#ffd166] text-[#5c4033] dark:text-[#ffd166] font-bold shadow-sm">
            100% CLEAN CONSOLE & SOUND MUTE
          </span>
          <span className="p-1 px-3 rounded bg-[#fec84d] text-[#5c4033] border-2 border-[#5c4033] font-bold shadow-sm">
            BEST VIEWED WITH CURIOSITY
          </span>
        </div>

        {/* Middle Tier: Attribution & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-[#a34063]/10 dark:border-[#ff7597]/15 py-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="font-editorial text-xl font-bold text-[#5c4033] dark:text-[#fff8f1]">
              Pip’s Midnight Nursery
            </span>
            <p className="text-xs text-[#8a6a58] dark:text-[#bda7b5] max-w-md">
              Built for <strong>“Baby’s First Website”</strong> 48-Hour Online Hackathon
              (17–19 October 2026) organized by{" "}
              <a
                href="https://hax.baby"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#a34063]"
              >
                haX.baby
              </a>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#5c4033] dark:text-[#f3ebf0]">
            <a
              href="https://hax.baby/baby-problem"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#a34063] dark:hover:text-[#ff7597] underline transition-colors"
            >
              <ExternalLink size={14} /> Official Brief
            </a>
            <a
              href="https://github.com/pra27-06/Baby"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#a34063] dark:hover:text-[#ff7597] underline transition-colors"
            >
              <Code2 size={14} /> GitHub Repository
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={13} /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Tier: Asset Pack Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8a6a58] dark:text-[#bda7b5] gap-2">
          <span>
            Artwork & Canon Character Sheet © 2026 haX.baby. Official creator pack studio renders utilized with pride.
          </span>
          <span className="flex items-center gap-1">
            Crafted with <Heart size={12} className="text-[#a34063] dark:text-[#ff7597] fill-current" /> by Prachi.
          </span>
        </div>
      </div>
    </footer>
  );
}
