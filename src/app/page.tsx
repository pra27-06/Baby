// src/app/page.tsx
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LullabyLab } from "@/components/LullabyLab";
import { BabyGames } from "@/components/BabyGames";
import { DreamStorybook } from "@/components/DreamStorybook";
import { NightlightGallery } from "@/components/NightlightGallery";
import { DreamRoutes } from "@/components/DreamRoutes";
import { StorySection } from "@/components/StorySection";
import { Guestbook } from "@/components/Guestbook";
import { Footer } from "@/components/Footer";
import { SoundBar } from "@/components/SoundBar";
import { SparkleTrail } from "@/components/SparkleTrail";
import { ChaosMode } from "@/components/ChaosMode";
import { PastelBabyDecor } from "@/components/PastelBabyDecor";

export default function Home() {
  const [chaosActive, setChaosActive] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#fffaf4] dark:bg-[#0c0a15] text-[#5c3828] dark:text-[#f5edf2] transition-colors selection:bg-[#de547a] selection:text-white">
      {/* Interactive Cursor Stardust Trail with Ultra-Soft Baby-Safe Waterdrop Sound */}
      <SparkleTrail />

      {/* Floating Pastel Dream Bubbles & Squeaky Nursery Toys */}
      <PastelBabyDecor />

      {/* Floating Audio Controls, Mute Toggle & Constant Ambient Lullaby Switch */}
      <SoundBar />

      {/* Responsive Chaos Mode Floating Toy Sandbox (+5 pts Side Quest) */}
      <ChaosMode active={chaosActive} />

      {/* Navigation Header with Pastel Theme & Chaos Controls */}
      <Navbar
        onToggleChaos={() => setChaosActive(!chaosActive)}
        isChaosMode={chaosActive}
      />

      {/* Character Identity & Hero Showcase (Movable Jiggly Cloud Baby with Baby Laughs!) */}
      <HeroSection />

      {/* Showcase Project 01: The Lullaby Lab (Twinkle Twinkle, Brahms, Rockabye & Ambient Loop) */}
      <LullabyLab />

      {/* Baby Games Playground: Shape Matcher, Star Catcher, and Peek-a-boo! */}
      <BabyGames />

      {/* Dream Storybook: English & Hindi Bedtime Stories with Princess Voice Narration */}
      <DreamStorybook />

      {/* Showcase Project 02: Dream Nightlight Lanterns (Day/Night Radiance Dimmer) */}
      <NightlightGallery />

      {/* Showcase Project 03: Rooftop Delivery Flight Map (Interactive Radar) */}
      <DreamRoutes />

      {/* Pip's Bedtime Origin Chronicles */}
      <StorySection />

      {/* Live Community Dream Guestbook (+2 pts Side Quest) */}
      <Guestbook />

      {/* Early-Web Footer, Badges & Attributions */}
      <Footer />
    </main>
  );
}
