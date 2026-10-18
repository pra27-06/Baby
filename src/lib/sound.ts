// src/lib/sound.ts
"use client";

export interface LullabyLyric {
  time: number; // in seconds
  text: string;
}

// Pentatonic & diatonic notes for music box
export const LULLABY_NOTES = [
  { note: "C4", name: "Star 1", freq: 261.63, key: "1" },
  { note: "D4", name: "Star 2", freq: 293.66, key: "2" },
  { note: "E4", name: "Star 3", freq: 329.63, key: "3" },
  { note: "F4", name: "Star 4", freq: 349.23, key: "4" },
  { note: "G4", name: "Star 5", freq: 392.00, key: "5" },
  { note: "A4", name: "Star 6", freq: 440.00, key: "6" },
  { note: "B4", name: "Star 7", freq: 493.88, key: "7" },
  { note: "C5", name: "Star 8", freq: 523.25, key: "8" },
];

// Full classic Brahms' Lullaby sequence: [freq, durationInSeconds, restAfterInSeconds, lyricWord]
export const BRAHMS_LULLABY: [number, number, number, string][] = [
  [329.63, 0.5, 0.05, "Lullaby,"],       // E4
  [329.63, 0.5, 0.05, "and"],           // E4
  [392.00, 0.9, 0.15, "goodnight,"],     // G4
  [329.63, 0.5, 0.05, "in"],            // E4
  [329.63, 0.5, 0.05, "the"],           // E4
  [392.00, 0.9, 0.15, "skies"],         // G4
  [329.63, 0.4, 0.05, "stars"],         // E4
  [392.00, 0.4, 0.05, "are"],           // G4
  [523.25, 0.8, 0.10, "bright."],       // C5
  [493.88, 0.4, 0.05, "May"],           // B4
  [440.00, 0.4, 0.05, "sweet"],         // A4
  [440.00, 0.4, 0.05, "dreams"],        // A4
  [392.00, 0.8, 0.20, "delight,"],      // G4
  [293.66, 0.4, 0.05, "sleep"],         // D4
  [329.63, 0.4, 0.05, "in"],            // E4
  [349.23, 0.8, 0.15, "peace"],         // F4
  [293.66, 0.4, 0.05, "through"],       // D4
  [349.23, 0.4, 0.05, "the"],           // F4
  [493.88, 0.6, 0.10, "deep"],          // B4
  [440.00, 0.4, 0.05, "starlit"],       // A4
  [392.00, 0.5, 0.05, "night."],        // G4
  [523.25, 1.2, 0.30, "★"],             // C5 resolve
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();
  private lullabyTimeouts: NodeJS.Timeout[] = [];
  public isLullabyPlaying: boolean = false;
  private lullabyListeners: Set<(playing: boolean, lyric: string) => void> = new Set();

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
    }
    this.listeners.forEach((fn) => fn(this.isMuted));
    if (!this.isMuted) {
      this.playChime(523.25, 0.4);
    }
    return this.isMuted;
  }

  public subscribeMute(callback: (muted: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public subscribeLullaby(callback: (playing: boolean, lyric: string) => void): () => void {
    this.lullabyListeners.add(callback);
    return () => this.lullabyListeners.delete(callback);
  }

  private notifyLullaby(playing: boolean, lyric: string = "") {
    this.isLullabyPlaying = playing;
    this.lullabyListeners.forEach((fn) => fn(playing, lyric));
  }

  // Play a soft bell/music box chime with warm decay
  public playChime(freq: number = 392.0, duration: number = 0.8) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Subtle overtone for authentic music box shimmer
    oscHarmonic.type = "triangle";
    oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    oscHarmonic.start();
    osc.stop(ctx.currentTime + duration);
    oscHarmonic.stop(ctx.currentTime + duration);
  }

  // Play an adorable, realistic baby giggle / laughing sequence!
  public playBabyGiggle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // A baby giggle is a burst of 5-6 rapid cheerful high-pitched cheerful chuckles
    const giggleFrequencies = [
      { f: 580, dur: 0.08, delay: 0 },
      { f: 720, dur: 0.09, delay: 0.09 },
      { f: 880, dur: 0.11, delay: 0.19 },
      { f: 940, dur: 0.10, delay: 0.31 },
      { f: 820, dur: 0.09, delay: 0.42 },
      { f: 960, dur: 0.14, delay: 0.52 },
      { f: 1100, dur: 0.18, delay: 0.67 },
    ];

    giggleFrequencies.forEach((g) => {
      setTimeout(() => {
        if (this.isMuted) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Resonant formant filter simulating vocal tract
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(g.f * 1.5, now);
        filter.Q.setValueAtTime(4.0, now);

        // Triangle wave gives speech-like vocal texture
        osc.type = "triangle";
        osc.frequency.setValueAtTime(g.f, now);
        osc.frequency.linearRampToValueAtTime(g.f * 1.15, now + g.dur * 0.5);
        osc.frequency.exponentialRampToValueAtTime(g.f * 0.9, now + g.dur);

        // Bubbly vocal attack & release
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

  // Play a soft wooden rattle / bubble pop
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  // Play the full Brahms' Lullaby classical music box tune with lyric synchronizer!
  public playFullLullaby() {
    if (this.isMuted) return;
    this.stopLullaby();
    this.notifyLullaby(true, "♪ Starting lullaby...");

    let accumulatedTime = 0;

    BRAHMS_LULLABY.forEach(([freq, duration, rest, lyric], index) => {
      const timeout = setTimeout(() => {
        if (this.isMuted) {
          this.stopLullaby();
          return;
        }
        this.playChime(freq, duration + 0.3);
        this.notifyLullaby(true, lyric);

        if (index === BRAHMS_LULLABY.length - 1) {
          const endTimeout = setTimeout(() => {
            this.notifyLullaby(false, "");
          }, (duration + rest) * 1000);
          this.lullabyTimeouts.push(endTimeout);
        }
      }, accumulatedTime * 1000);

      this.lullabyTimeouts.push(timeout);
      accumulatedTime += duration + rest;
    });
  }

  // Stop the lullaby
  public stopLullaby() {
    this.lullabyTimeouts.forEach((t) => clearTimeout(t));
    this.lullabyTimeouts = [];
    this.notifyLullaby(false, "");
  }

  // Legacy fallback cascade
  public playLullabyCascade() {
    this.playFullLullaby();
  }
}

export const sound = new SoundEngine();
