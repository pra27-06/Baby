// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LullabyLab } from "@/components/LullabyLab";
import { NightlightGallery } from "@/components/NightlightGallery";
import { DreamRoutes } from "@/components/DreamRoutes";
import { StorySection } from "@/components/StorySection";
import { Guestbook } from "@/components/Guestbook";
import { Footer } from "@/components/Footer";
import { SoundBar } from "@/components/SoundBar";
import { SparkleTrail } from "@/components/SparkleTrail";
import { ChaosMode } from "@/components/ChaosMode";

export default function Home() {
  const [chaosActive, setChaosActive] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#fff8f1] dark:bg-[#0c0a15] text-[#5c4033] dark:text-[#f5edf2] transition-colors selection:bg-[#a34063] selection:text-white">
      {/* Interactive Cursor Stardust Trail (+2 pts Side Quest) */}
      <SparkleTrail />

      {/* Floating Audio Controls & Required Mute Toggle (+3 pts Side Quest) */}
      <SoundBar />

      {/* Responsive Chaos Mode Floating Toy Sandbox (+5 pts Side Quest) */}
      <ChaosMode active={chaosActive} />

      {/* Navigation Header with Theme & Chaos Controls */}
      <Navbar
        onToggleChaos={() => setChaosActive(!chaosActive)}
        isChaosMode={chaosActive}
      />

      {/* Character Identity & Hero Showcase (Core Req 1 & Tier 1 Eye Tracking) */}
      <HeroSection />

      {/* Showcase Project 01: The Lullaby Lab Music Box (Core Req 2 & Tier 2 Web Audio) */}
      <LullabyLab />

      {/* Showcase Project 02: Dream Nightlight Lanterns (Core Req 2 & Day/Night Radiance) */}
      <NightlightGallery />

      {/* Showcase Project 03: Rooftop Delivery Flight Map (Core Req 2 & Interactive Radar) */}
      <DreamRoutes />

      {/* Bedtime Storybook Chronicles (Core Req 3: <150 words per vignette) */}
      <StorySection />

      {/* Live Community Dream Guestbook (+2 pts Side Quest) */}
      <Guestbook />

      {/* Early-Web Footer, Badges & Attributions */}
      <Footer />
    </main>
  );
}
