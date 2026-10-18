// src/lib/sound.ts
"use client";

// Pentatonic scale frequencies in Hz (C4, D4, E4, G4, A4, C5, D5, E5)
export const LULLABY_NOTES = [
  { note: "C4", name: "Star 1", freq: 261.63, key: "1" },
  { note: "D4", name: "Star 2", freq: 293.66, key: "2" },
  { note: "E4", name: "Star 3", freq: 329.63, key: "3" },
  { note: "G4", name: "Star 4", freq: 392.00, key: "4" },
  { note: "A4", name: "Star 5", freq: 440.00, key: "5" },
  { note: "C5", name: "Star 6", freq: 523.25, key: "6" },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("pip_sound_muted");
      this.isMuted = savedMute !== null ? savedMute === "true" : false;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    this.listeners.forEach((fn) => fn(this.isMuted));
    if (!this.isMuted) {
      this.playChime(523.25, 0.4); // pleasant activation chime
    }
    return this.isMuted;
  }

  public subscribeMute(callback: (muted: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Play a soft bell/music box chime
  public playChime(freq: number = 392.0, duration: number = 0.8) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm sine wave with subtle harmonic
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  // Play a wooden toy rattle / bubble click
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Play a dreamy 4-note lullaby cascade
  public playLullabyCascade() {
    if (this.isMuted) return;
    const notes = [261.63, 329.63, 392.00, 523.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.2);
      }, idx * 180);
    });
  }

  // Play an Easter egg sleepy yawn / celebration chime
  public playSleepyYawn() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.7);

    // Follow up with star chimes
    setTimeout(() => {
      this.playChime(523.25, 1.0);
    }, 450);
  }
}

export const sound = new SoundEngine();
