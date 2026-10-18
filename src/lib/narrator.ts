// src/lib/narrator.ts
"use client";

export interface PrincessVoiceOption {
  voice: SpeechSynthesisVoice;
  displayName: string;
  isNatural: boolean;
}

const MALE_NAME_KEYWORDS = [
  "david",
  "mark",
  "george",
  "richard",
  "guy",
  "stefan",
  "ravi",
  "heera",
  "hemant",
  "james",
  "paul",
  "john",
  "male",
  "daniel",
  "oliver",
  "ryan",
];

export function isMaleVoice(name: string): boolean {
  const lower = name.toLowerCase();
  // Check if it's explicitly marked female first
  if (lower.includes("female")) return false;
  return MALE_NAME_KEYWORDS.some((kw) => lower.includes(kw));
}

class BedtimeNarrator {
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const all = window.speechSynthesis.getVoices();
    if (all && all.length > 0) {
      this.voices = all;
      this.isLoaded = true;
      this.listeners.forEach((fn) => fn());
    }
  }

  public subscribeVoices(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public getAllFemaleVoices(lang: "en" | "hi"): PrincessVoiceOption[] {
    if (!this.isLoaded) {
      this.initVoices();
    }

    const filtered = this.voices.filter((v) => {
      // 1. Strictly exclude male voices
      if (isMaleVoice(v.name)) return false;

      // 2. Check language match
      if (lang === "hi") {
        return v.lang.toLowerCase().startsWith("hi");
      } else {
        return v.lang.toLowerCase().startsWith("en");
      }
    });

    // If Hindi has no voices matching 'hi', check for multilingual Indian voices
    if (lang === "hi" && filtered.length === 0) {
      const fallbackIndian = this.voices.filter((v) => {
        if (isMaleVoice(v.name)) return false;
        const l = v.name.toLowerCase();
        return l.includes("swara") || l.includes("neerja") || l.includes("kalpana") || l.includes("india");
      });
      if (fallbackIndian.length > 0) {
        return fallbackIndian.map((v) => ({
          voice: v,
          displayName: `🌸 ${v.name.replace(/Microsoft |Online |Desktop |English |\(United States\)|\(India\)/g, "").trim()}`,
          isNatural: v.name.includes("Natural") || v.name.includes("Online"),
        }));
      }
    }

    return filtered.map((v) => {
      const isNatural = v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Google");
      let prettyName = v.name
        .replace(/Microsoft |Online |Desktop |Google |\(United States\)|\(India\)|\(UK\)/g, "")
        .trim();
      if (!prettyName) prettyName = v.name;

      return {
        voice: v,
        displayName: `🌸 Princess ${prettyName} ${isNatural ? "✨ (Natural)" : ""}`.trim(),
        isNatural,
      };
    });
  }

  public getBestVoice(lang: "en" | "hi", preferredVoiceName?: string): SpeechSynthesisVoice | null {
    if (!this.isLoaded) {
      this.initVoices();
    }

    const available = this.getAllFemaleVoices(lang);

    if (preferredVoiceName) {
      const found = available.find((opt) => opt.voice.name === preferredVoiceName);
      if (found) return found.voice;
    }

    if (lang === "hi") {
      // 1. Edge Natural Hindi: Swara or Neerja
      const naturalHi = available.find(
        (opt) => opt.voice.name.includes("Swara") || opt.voice.name.includes("Neerja")
      );
      if (naturalHi) return naturalHi.voice;

      // 2. Google Hindi (Chrome)
      const googleHi = available.find((opt) => opt.voice.name.includes("Google") || opt.voice.lang.includes("hi"));
      if (googleHi) return googleHi.voice;

      // 3. Kalpana Desktop
      const kalpana = available.find((opt) => opt.voice.name.includes("Kalpana"));
      if (kalpana) return kalpana.voice;

      // 4. Any female Hindi
      if (available.length > 0) return available[0].voice;

      // Fallback: Best English female voice
      return this.getBestVoice("en");
    } else {
      // English
      // 1. Edge Natural voices (Jenny, Aria, Ava, Emma, Sonia)
      const edgeNatural = available.find(
        (opt) =>
          opt.isNatural &&
          (opt.voice.name.includes("Jenny") ||
            opt.voice.name.includes("Aria") ||
            opt.voice.name.includes("Ava") ||
            opt.voice.name.includes("Emma") ||
            opt.voice.name.includes("Sonia"))
      );
      if (edgeNatural) return edgeNatural.voice;

      // 2. Google UK English Female / Google US
      const googleFemale = available.find(
        (opt) => opt.voice.name.includes("UK English Female") || opt.voice.name.includes("Female")
      );
      if (googleFemale) return googleFemale.voice;

      // 3. Apple/Safari (Samantha, Victoria, Karen)
      const appleFemale = available.find((opt) =>
        ["Samantha", "Victoria", "Karen", "Moira", "Tessa"].some((n) => opt.voice.name.includes(n))
      );
      if (appleFemale) return appleFemale.voice;

      // 4. Microsoft Zira Desktop (Default female on Windows)
      const zira = available.find((opt) => opt.voice.name.includes("Zira"));
      if (zira) return zira.voice;

      // 5. Any other available female voice
      if (available.length > 0) return available[0].voice;

      return null;
    }
  }

  public speak({
    text,
    lang,
    preferredVoiceName,
    onStart,
    onEnd,
    onError,
  }: {
    text: string;
    lang: "en" | "hi";
    preferredVoiceName?: string;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: unknown) => void;
  }) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onError) onError(new Error("Speech synthesis not supported"));
      return;
    }

    this.stop();

    // Clean and soften the text for natural prosody
    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const voice = this.getBestVoice(lang, preferredVoiceName);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.lang = lang === "hi" ? "hi-IN" : "en-US";

    // Princess storytelling settings:
    // Rate: 0.84 (gentle, relaxing bedtime cadence, not rushed)
    // Pitch: 1.07 for English (sweet and warm, NOT 1.32 which sounds robotic), 1.04 for Hindi (melodious and maternal)
    utterance.rate = lang === "hi" ? 0.82 : 0.84;
    utterance.pitch = lang === "hi" ? 1.04 : 1.07;
    utterance.volume = 0.95;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public pause() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
    }
  }
}

export const bedtimeNarrator = new BedtimeNarrator();
