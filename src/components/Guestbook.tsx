// src/components/Guestbook.tsx
"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareHeart, Send, Sparkles, Star } from "lucide-react";
import { sound } from "@/lib/sound";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  sticker: string;
  timestamp: string;
}

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: "init-1",
    name: "Sai Ram Dash (haX.baby Founder)",
    message: "Good things start small! Pip is crafting absolute magic at the Midnight Nursery. Keep building!",
    sticker: "🌟",
    timestamp: "17 Oct 2026",
  },
  {
    id: "init-2",
    name: "Willow the Attic Ghost",
    message: "Pip's lavender cloud dream helped me sleep 9 hours straight without rattling a single chain. 10/10!",
    sticker: "☁️",
    timestamp: "18 Oct 2026",
  },
  {
    id: "init-3",
    name: "Barnaby the Bear",
    message: "The honeycomb dream was delicious! I woke up with honey on my whiskers.",
    sticker: "🍯",
    timestamp: "18 Oct 2026",
  },
];

const STICKERS = ["🌟", "☁️", "🏮", "🧸", "🎀", "🍯", "★"];

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(INITIAL_ENTRIES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("🌟");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pip_guestbook_entries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
        }
      } catch (err) {
        console.error("Error reading guestbook:", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    sound.playClick();
    sound.playChime(523.25, 0.9);

    const newEntry: GuestbookEntry = {
      id: "entry-" + Date.now(),
      name: name.trim(),
      message: message.trim(),
      sticker: selectedSticker,
      timestamp: "Today",
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("pip_guestbook_entries", JSON.stringify(updated));

    setName("");
    setMessage("");
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="guestbook" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="retro-window p-6 sm:p-10">
        <div className="border-b border-[#a34063]/15 dark:border-[#ff7597]/20 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#ffd166] flex items-center gap-1.5">
              <MessageSquareHeart size={14} /> Side Quest (+2 pts) · Visitor Wall
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c4033] dark:text-[#fff8f1] mt-1">
              Midnight Nursery Guestbook
            </h2>
            <p className="text-sm text-[#8a6a58] dark:text-[#bda7b5] mt-1 max-w-xl">
              Leave a cozy bedtime message or dream wish for Pip and fellow hackathon visitors!
            </p>
          </div>

          <div className="text-xs font-mono font-bold bg-[#ffdce5] dark:bg-[#3d2331] text-[#a34063] dark:text-[#ffccd8] px-3 py-1 rounded-full border border-[#a34063]/20">
            {entries.length} Bedtime Wishes Recorded
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          {/* Left: Input Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 flex flex-col gap-4 p-5 rounded-2xl bg-[#fff8f1] dark:bg-[#1f1b33] border-2 border-[#a34063]/20"
          >
            <h3 className="font-editorial text-lg font-bold text-[#5c4033] dark:text-[#fff8f1]">
              Sign Pip's Wall
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#5c4033] dark:text-[#e0d6dc] mb-1">
                Your Name / Builder Handle:
              </label>
              <input
                type="text"
                required
                maxLength={40}
                placeholder="e.g. Dreamer Willow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#a34063]/30 dark:border-[#ff7597]/30 bg-white dark:bg-[#12101e] text-[#5c4033] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a34063]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5c4033] dark:text-[#e0d6dc] mb-1">
                Your Bedtime Wish or Note:
              </label>
              <textarea
                required
                rows={3}
                maxLength={200}
                placeholder="e.g. May tonight bring peaceful sleep and zero bugs in production!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-[#a34063]/30 dark:border-[#ff7597]/30 bg-white dark:bg-[#12101e] text-[#5c4033] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#a34063] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5c4033] dark:text-[#e0d6dc] mb-1">
                Pick a Nursery Sticker:
              </label>
              <div className="flex gap-2">
                {STICKERS.map((stk) => (
                  <button
                    key={stk}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedSticker(stk);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all cursor-pointer ${
                      selectedSticker === stk
                        ? "bg-[#a34063] border-[#a34063] scale-110 shadow"
                        : "bg-white dark:bg-[#12101e] border-gray-300 dark:border-gray-700 hover:scale-105"
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Send size={14} /> Leave Bedtime Wish
            </button>

            {isSuccess && (
              <p className="text-xs font-bold text-[#1e7e43] text-center animate-bounce">
                ✨ Your bedtime wish was taped to Pip's nursery wall!
              </p>
            )}
          </form>

          {/* Right: Community Entries Grid */}
          <div className="lg:col-span-7 flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-white/80 dark:bg-[#161324] border border-[#a34063]/15 dark:border-[#ff7597]/15 shadow-sm hover:border-[#a34063]/40 transition-all flex gap-3.5 items-start"
              >
                <span className="text-2xl p-2 rounded-xl bg-[#fff8f1] dark:bg-[#1f1b33] border border-[#a34063]/10 shrink-0">
                  {entry.sticker}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-[#5c4033] dark:text-[#fff8f1]">
                      {entry.name}
                    </strong>
                    <span className="text-[10px] font-mono text-[#8a6a58] dark:text-[#bda7b5]">
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#5c4033]/90 dark:text-[#e0d6dc] mt-1 leading-relaxed">
                    “{entry.message}”
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
