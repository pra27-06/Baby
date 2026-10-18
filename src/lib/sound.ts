// src/lib/sound.ts
"use client";

export interface LullabySong {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  notes: [number, number, number, string][]; // [freq, duration, rest, lyric]
}

// Pastel music box notes (C4 through C5)
export const LULLABY_NOTES = [
  { note: "C4", name: "Star 1", freq: 261.63, key: "1", color: "#ffccd8" },
  { note: "D4", name: "Star 2", freq: 293.66, key: "2", color: "#fed7aa" },
  { note: "E4", name: "Star 3", freq: 329.63, key: "3", color: "#fef08a" },
  { note: "F4", name: "Star 4", freq: 349.23, key: "4", color: "#bbf7d0" },
  { note: "G4", name: "Star 5", freq: 392.00, key: "5", color: "#bae6fd" },
  { note: "A4", name: "Star 6", freq: 440.00, key: "6", color: "#ddd6fe" },
  { note: "B4", name: "Star 7", freq: 493.88, key: "7", color: "#f5d0fe" },
  { note: "C5", name: "Star 8", freq: 523.25, key: "8", color: "#fbcfe8" },
];

// 1. Twinkle Twinkle Little Star
const TWINKLE_TWINKLE: [number, number, number, string][] = [
  [261.63, 0.45, 0.05, "Twinkle,"],
  [261.63, 0.45, 0.05, "twinkle,"],
  [392.00, 0.45, 0.05, "little"],
  [392.00, 0.45, 0.05, "star,"],
  [440.00, 0.45, 0.05, "how"],
  [440.00, 0.45, 0.05, "I"],
  [392.00, 0.90, 0.20, "wonder"],
  [349.23, 0.45, 0.05, "what"],
  [349.23, 0.45, 0.05, "you"],
  [329.63, 0.45, 0.05, "are!"],
  [329.63, 0.45, 0.05, "Up"],
  [293.66, 0.45, 0.05, "above"],
  [293.66, 0.45, 0.05, "the"],
  [261.63, 0.90, 0.25, "world so high,"],
  [392.00, 0.45, 0.05, "like"],
  [392.00, 0.45, 0.05, "a"],
  [349.23, 0.45, 0.05, "diamond"],
  [349.23, 0.45, 0.05, "in"],
  [329.63, 0.45, 0.05, "the"],
  [293.66, 0.90, 0.20, "sky."],
  [261.63, 0.45, 0.05, "Twinkle,"],
  [261.63, 0.45, 0.05, "twinkle,"],
  [392.00, 0.45, 0.05, "little"],
  [392.00, 0.45, 0.05, "star,"],
  [440.00, 0.45, 0.05, "how"],
  [440.00, 0.45, 0.05, "I"],
  [392.00, 0.90, 0.20, "wonder"],
  [349.23, 0.45, 0.05, "what"],
  [349.23, 0.45, 0.05, "you"],
  [329.63, 0.45, 0.05, "are."],
  [261.63, 1.20, 0.40, "★ Shine bright! ★"],
];

// 2. Brahms' Lullaby (Cradle Song)
const BRAHMS_SONG: [number, number, number, string][] = [
  [329.63, 0.50, 0.05, "Lullaby,"],
  [329.63, 0.50, 0.05, "and"],
  [392.00, 0.90, 0.15, "goodnight,"],
  [329.63, 0.50, 0.05, "in"],
  [329.63, 0.50, 0.05, "the"],
  [392.00, 0.90, 0.15, "skies"],
  [329.63, 0.40, 0.05, "stars"],
  [392.00, 0.40, 0.05, "are"],
  [523.25, 0.80, 0.10, "bright."],
  [493.88, 0.40, 0.05, "May"],
  [440.00, 0.40, 0.05, "sweet"],
  [440.00, 0.40, 0.05, "dreams"],
  [392.00, 0.80, 0.20, "delight,"],
  [293.66, 0.40, 0.05, "sleep"],
  [329.63, 0.40, 0.05, "in"],
  [349.23, 0.80, 0.15, "peace"],
  [293.66, 0.40, 0.05, "through"],
  [349.23, 0.40, 0.05, "the"],
  [493.88, 0.60, 0.10, "deep"],
  [440.00, 0.40, 0.05, "starlit"],
  [392.00, 0.50, 0.05, "night."],
  [523.25, 1.20, 0.30, "★ Sweet dreams! ★"],
];

// 3. Rock-a-bye Baby
const ROCKABYE_BABY: [number, number, number, string][] = [
  [329.63, 0.50, 0.05, "Rock-a-bye"],
  [392.00, 0.50, 0.05, "baby,"],
  [523.25, 0.80, 0.10, "on"],
  [493.88, 0.40, 0.05, "the"],
  [440.00, 0.50, 0.05, "tree"],
  [392.00, 0.80, 0.15, "top,"],
  [329.63, 0.45, 0.05, "when"],
  [349.23, 0.45, 0.05, "the"],
  [392.00, 0.60, 0.05, "wind"],
  [440.00, 0.60, 0.10, "blows,"],
  [349.23, 0.50, 0.05, "the"],
  [293.66, 0.50, 0.05, "cradle"],
  [392.00, 0.80, 0.15, "will rock."],
  [329.63, 0.50, 0.05, "When"],
  [392.00, 0.50, 0.05, "the"],
  [523.25, 0.80, 0.10, "bough"],
  [493.88, 0.40, 0.05, "breaks,"],
  [440.00, 0.60, 0.10, "the cradle"],
  [392.00, 0.50, 0.05, "will"],
  [523.25, 1.20, 0.35, "fall softly... ★"],
];

// 4. Hush Little Baby
const HUSH_LITTLE_BABY: [number, number, number, string][] = [
  [329.63, 0.45, 0.05, "Hush,"],
  [329.63, 0.45, 0.05, "little"],
  [392.00, 0.45, 0.05, "baby,"],
  [392.00, 0.45, 0.05, "don't"],
  [440.00, 0.45, 0.05, "say"],
  [392.00, 0.45, 0.05, "a"],
  [329.63, 0.80, 0.15, "word,"],
  [293.66, 0.45, 0.05, "Papa's"],
  [293.66, 0.45, 0.05, "gonna"],
  [349.23, 0.45, 0.05, "buy"],
  [349.23, 0.45, 0.05, "you"],
  [392.00, 0.45, 0.05, "a"],
  [349.23, 0.45, 0.05, "mocking"],
  [293.66, 0.80, 0.15, "bird."],
  [261.63, 1.10, 0.35, "★ Sleep tight! ★"],
];

export const LULLABY_CATALOG: LullabySong[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    subtitle: "Classic bedside star melody with soothing high chimes",
    icon: "⭐",
    notes: TWINKLE_TWINKLE,
  },
  {
    id: "brahms",
    title: "Brahms’ Lullaby (Wiegenlied)",
    subtitle: "The world's most famous gentle music box cradle song",
    icon: "🌙",
    notes: BRAHMS_SONG,
  },
  {
    id: "rockabye",
    title: "Rock-a-bye Baby",
    subtitle: "Cozy treetop swaying rhythm for gentle rocking",
    icon: "☁️",
    notes: ROCKABYE_BABY,
  },
  {
    id: "hush",
    title: "Hush Little Baby",
    subtitle: "Warm bedtime lullaby with soft lullaby reassurance",
    icon: "🧸",
    notes: HUSH_LITTLE_BABY,
  },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();
  private lullabyTimeouts: NodeJS.Timeout[] = [];
  public isLullabyPlaying: boolean = false;
  public activeSongId: string = "twinkle";
  public isAmbientLooping: boolean = false;

  private lullabyListeners: Set<(playing: boolean, lyric: string, songId: string) => void> = new Set();
  private ambientListeners: Set<(looping: boolean) => void> = new Set();

  private lastTwinkleTime: number = 0;
  private giggleCycle: number = 0;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("pip_sound_muted");
      this.isMuted = savedMute !== null ? savedMute === "true" : false;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("pip_sound_muted", String(this.isMuted));
    }
    if (this.isMuted) {
      this.stopLullaby();
      this.stopAmbientLoop();
    }
    this.listeners.forEach((fn) => fn(this.isMuted));
    if (!this.isMuted) {
      this.playBabyGiggle();
    }
    return this.isMuted;
  }

  public subscribeMute(callback: (muted: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public subscribeLullaby(callback: (playing: boolean, lyric: string, songId: string) => void): () => void {
    this.lullabyListeners.add(callback);
    return () => this.lullabyListeners.delete(callback);
  }

  public subscribeAmbient(callback: (looping: boolean) => void): () => void {
    this.ambientListeners.add(callback);
    return () => this.ambientListeners.delete(callback);
  }

  private notifyLullaby(playing: boolean, lyric: string = "", songId: string = this.activeSongId) {
    this.isLullabyPlaying = playing;
    this.lullabyListeners.forEach((fn) => fn(playing, lyric, songId));
  }

  private notifyAmbient(looping: boolean) {
    this.isAmbientLooping = looping;
    this.ambientListeners.forEach((fn) => fn(looping));
  }

  // 1. Soft Magical Stardust Twinkle for Cursor Movements
  public playCursorTwinkle() {
    if (this.isMuted) return;
    const now = Date.now();
    if (now - this.lastTwinkleTime < 130) return;
    this.lastTwinkleTime = now;

    const ctx = this.getContext();
    if (!ctx) return;

    const twinkleFreqs = [1318.51, 1567.98, 1760.0, 2093.0, 2349.32, 2637.02];
    const freq = twinkleFreqs[Math.floor(Math.random() * twinkleFreqs.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.16);
  }

  // 2. Realistic Baby Giggles with 3 Happy Variations
  public playBabyGiggle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.giggleCycle = (this.giggleCycle + 1) % 3;

    const variations = [
      [
        { f: 620, dur: 0.07, delay: 0 },
        { f: 740, dur: 0.08, delay: 0.08 },
        { f: 880, dur: 0.10, delay: 0.17 },
        { f: 940, dur: 0.11, delay: 0.28 },
        { f: 1040, dur: 0.15, delay: 0.40 },
      ],
      [
        { f: 700, dur: 0.08, delay: 0 },
        { f: 860, dur: 0.09, delay: 0.09 },
        { f: 980, dur: 0.12, delay: 0.20 },
        { f: 820, dur: 0.08, delay: 0.33 },
        { f: 1120, dur: 0.16, delay: 0.42 },
      ],
      [
        { f: 560, dur: 0.07, delay: 0 },
        { f: 680, dur: 0.07, delay: 0.07 },
        { f: 820, dur: 0.08, delay: 0.15 },
        { f: 960, dur: 0.09, delay: 0.24 },
        { f: 1060, dur: 0.13, delay: 0.34 },
        { f: 1200, dur: 0.18, delay: 0.48 },
      ],
    ];

    const chosenBurst = variations[this.giggleCycle];

    chosenBurst.forEach((g) => {
      setTimeout(() => {
        if (this.isMuted) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(g.f * 1.45, now);
        filter.Q.setValueAtTime(3.8, now);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(g.f, now);
        osc.frequency.linearRampToValueAtTime(g.f * 1.12, now + g.dur * 0.4);
        osc.frequency.exponentialRampToValueAtTime(g.f * 0.92, now + g.dur);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + g.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + g.dur);
      }, g.delay * 1000);
    });
  }

  // 3. Bubble Pop
  public playBubblePop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
  }

  // 4. Rattle Shake
  public playRattleShake() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        if (this.isMuted) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(500 + Math.random() * 300, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
      }, i * 40);
    }
  }

  // 5. Classic Music Box Chime
  public playChime(freq: number = 392.0, duration: number = 0.8, volume: number = 0.2) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    oscHarmonic.type = "triangle";
    oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    oscHarmonic.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
    oscHarmonic.stop(ctx.currentTime + duration);
  }

  // Generic Button Click -> Triggers Cute Baby Laugh!
  public playClick() {
    this.playBabyGiggle();
  }

  // 6. Play ANY Lullaby from the Catalog by ID!
  public playLullaby(songId: string = "twinkle") {
    if (this.isMuted) return;
    this.stopLullaby();

    const song = LULLABY_CATALOG.find((s) => s.id === songId) || LULLABY_CATALOG[0];
    this.activeSongId = song.id;
    this.notifyLullaby(true, `♪ Starting ${song.title}...`, song.id);

    let accumulatedTime = 0;

    song.notes.forEach(([freq, duration, rest, lyric], index) => {
      const timeout = setTimeout(() => {
        if (this.isMuted) {
          this.stopLullaby();
          return;
        }
        // If ambient looping, play slightly softer
        const vol = this.isAmbientLooping ? 0.09 : 0.2;
        this.playChime(freq, duration + 0.35, vol);
        this.notifyLullaby(true, lyric, song.id);

        if (index === song.notes.length - 1) {
          const endTimeout = setTimeout(() => {
            if (this.isAmbientLooping && !this.isMuted) {
              // Loop to next lullaby in catalog!
              const currentIdx = LULLABY_CATALOG.findIndex((s) => s.id === song.id);
              const nextSong = LULLABY_CATALOG[(currentIdx + 1) % LULLABY_CATALOG.length];
              this.playLullaby(nextSong.id);
            } else {
              this.notifyLullaby(false, "", song.id);
            }
          }, (duration + rest) * 1000);
          this.lullabyTimeouts.push(endTimeout);
        }
      }, accumulatedTime * 1000);

      this.lullabyTimeouts.push(timeout);
      accumulatedTime += duration + rest;
    });
  }

  // Constant Ambient Background Lullaby Mode
  public startAmbientLoop(songId?: string) {
    if (this.isMuted) {
      this.toggleMute();
    }
    this.notifyAmbient(true);
    this.playLullaby(songId || this.activeSongId);
  }

  public stopAmbientLoop() {
    this.notifyAmbient(false);
    this.stopLullaby();
  }

  public toggleAmbientLoop() {
    if (this.isAmbientLooping) {
      this.stopAmbientLoop();
    } else {
      this.startAmbientLoop();
    }
  }

  public stopLullaby() {
    this.lullabyTimeouts.forEach((t) => clearTimeout(t));
    this.lullabyTimeouts = [];
    this.notifyLullaby(false, "", this.activeSongId);
  }

  public playSleepyYawn() {
    this.playBabyGiggle();
  }

  public playFullLullaby() {
    this.playLullaby("twinkle");
  }
}

export const sound = new SoundEngine();
