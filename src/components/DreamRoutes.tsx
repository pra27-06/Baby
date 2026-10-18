// src/components/DreamRoutes.tsx
"use client";

import React, { useState } from "react";
import { MapPin, Navigation, CheckCircle2, Sparkles, Send } from "lucide-react";
import { sound } from "@/lib/sound";

interface DeliveryStop {
  id: number;
  name: string;
  recipient: string;
  dreamType: string;
  x: number; // percentage on map
  y: number;
  status: "delivered" | "en-route" | "waiting";
}

const STOPS: DeliveryStop[] = [
  {
    id: 1,
    name: "Chimney 01: Bramble Attic",
    recipient: "Willow the Little Ghost",
    dreamType: "Warm Wool Socks & Friendly Whispers",
    x: 18,
    y: 62,
    status: "delivered",
  },
  {
    id: 2,
    name: "Chimney 02: Cobblestone Bakery",
    recipient: "Barnaby the Bear Cub",
    dreamType: "Golden Honeycomb Mountain & Berry Trees",
    x: 40,
    y: 38,
    status: "delivered",
  },
  {
    id: 3,
    name: "Chimney 03: Clocktower Spire",
    recipient: "Professor Owl",
    dreamType: "Starlight Constellation Library Riddle",
    x: 62,
    y: 24,
    status: "en-route",
  },
  {
    id: 4,
    name: "Chimney 04: Mossy Willow Hollow",
    recipient: "Milo the Sleepy Hedgehog",
    dreamType: "Feather Pillow Softness & Warm Cinnamon Milk",
    x: 82,
    y: 55,
    status: "waiting",
  },
];

export function DreamRoutes() {
  const [selectedStop, setSelectedStop] = useState<DeliveryStop>(STOPS[1]);
  const [deliveredStops, setDeliveredStops] = useState<number[]>([1, 2]);

  const handleStopClick = (stop: DeliveryStop) => {
    sound.playClick();
    setSelectedStop(stop);

    if (!deliveredStops.includes(stop.id)) {
      sound.playChime(523.25, 0.8);
      setDeliveredStops((prev) => [...prev, stop.id]);
    } else {
      sound.playChime(392.0, 0.4);
    }
  };

  return (
    <section id="dream-routes" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="retro-window p-6 sm:p-10">
        <div className="border-b border-[#a34063]/15 dark:border-[#ff7597]/20 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a34063] dark:text-[#ffd166] flex items-center gap-1.5">
              <Navigation size={14} /> Showcase Project 03 · Rooftop Radar
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c4033] dark:text-[#fff8f1] mt-1">
              Dream Delivery Routes
            </h2>
            <p className="text-sm text-[#8a6a58] dark:text-[#bda7b5] mt-1 max-w-xl">
              Every night at 17:17 IST, Pip packs the lantern, steps onto a sleepy cloud,
              and follows this rooftop radar map to tuck in every little creature.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#ffdce5] dark:bg-[#3d2331] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#a34063] dark:text-[#ffccd8] border border-[#a34063]/20">
            <span className="w-2 h-2 rounded-full bg-[#1e7e43] animate-ping" />
            <span>Flight Radar Active</span>
          </div>
        </div>

        {/* Map Canvas and Dispatch Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Illustrated SVG Rooftop Flight Map */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-3xl bg-[#120f21] border-2 border-[#5c4033]/40 dark:border-[#a34063]/40 p-4 overflow-hidden shadow-inner select-none">
              {/* Moon & Stars in Map */}
              <div className="absolute top-4 right-6 text-2xl text-[#ffd166]">☾</div>
              <div className="absolute top-6 left-12 text-[#fec84d] text-xs">✦</div>
              <div className="absolute top-16 left-1/3 text-[#fec84d] text-xs">★</div>

              {/* Whimsical SVG Rooftop Skyline */}
              <svg
                viewBox="0 0 500 280"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Flight Route Path */}
                <path
                  d="M 90 170 Q 200 100 310 70 T 410 150"
                  fill="none"
                  stroke="#ff7597"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  className="opacity-70 animate-pulse"
                />

                {/* Distant Hills */}
                <path
                  d="M 0 280 L 0 210 Q 150 180 300 220 T 500 200 L 500 280 Z"
                  fill="#1a162b"
                />

                {/* Rooftops Silhouettes */}
                {/* House 1 */}
                <polygon points="60,280 60,190 90,160 120,190 120,280" fill="#292342" />
                <rect x="75" y="150" width="12" height="24" fill="#3a325c" />

                {/* House 2 */}
                <polygon points="170,280 170,140 200,105 230,140 230,280" fill="#231e38" />
                <rect x="210" y="95" width="14" height="26" fill="#3a325c" />

                {/* Clocktower */}
                <rect x="290" y="80" width="40" height="200" fill="#2b2447" />
                <polygon points="280,80 310,35 340,80" fill="#a34063" />

                {/* House 4 */}
                <polygon points="380,280 380,175 410,145 440,175 440,280" fill="#241e3a" />
                <rect x="420" y="135" width="12" height="26" fill="#3a325c" />
              </svg>

              {/* Clickable Destination Waypoints */}
              {STOPS.map((stop) => {
                const isDelivered = deliveredStops.includes(stop.id);
                const isSelected = selectedStop.id === stop.id;

                return (
                  <button
                    key={stop.id}
                    onClick={() => handleStopClick(stop)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                    aria-label={`Dispatch stop for ${stop.recipient}`}
                  >
                    <div
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform ${
                        isSelected
                          ? "scale-125 ring-4 ring-[#ffd166] z-20"
                          : "hover:scale-110 z-10"
                      } ${
                        isDelivered
                          ? "bg-[#1e7e43] text-white shadow-[0_0_12px_#1e7e43]"
                          : "bg-[#a34063] text-white animate-bounce shadow-[0_0_12px_#a34063]"
                      }`}
                    >
                      {isDelivered ? "✓" : stop.id}
                    </div>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {stop.recipient}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#8a6a58] dark:text-[#bda7b5] mt-2 text-center">
              Click any rooftop chimney waypoint to deliver tonight’s soothing dream!
            </p>
          </div>

          {/* Right: Selected Stop Dispatch Details */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-[#fff8f1] dark:bg-[#1f1b33] border-2 border-[#a34063]/20 dark:border-[#ff7597]/25 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#a34063] dark:text-[#ffd166]">
                  WAYPOINT #{selectedStop.id}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    deliveredStops.includes(selectedStop.id)
                      ? "bg-[#e8f7ee] text-[#1e7e43] border border-[#1e7e43]/30"
                      : "bg-[#fff2d6] text-[#8a6000] border border-[#8a6000]/30"
                  }`}
                >
                  {deliveredStops.includes(selectedStop.id) ? "Delivered ★" : "In Queue"}
                </span>
              </div>

              <h3 className="font-editorial text-xl font-bold text-[#5c4033] dark:text-[#fff8f1] mt-2">
                {selectedStop.recipient}
              </h3>
              <p className="text-xs text-[#8a6a58] dark:text-[#bda7b5] mt-0.5">
                Location: {selectedStop.name}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-white/80 dark:bg-[#12101e] border border-[#a34063]/10">
                <span className="block text-[10px] font-bold uppercase text-[#a34063] dark:text-[#ffd166] tracking-wider">
                  Dream Manifest
                </span>
                <p className="text-xs text-[#5c4033] dark:text-[#e0d6dc] mt-1 font-medium">
                  “{selectedStop.dreamType}”
                </p>
              </div>

              <button
                onClick={() => handleStopClick(selectedStop)}
                className="w-full mt-4 py-2 px-4 rounded-xl bg-[#a34063] dark:bg-[#ff7597] text-white dark:text-[#0c0a15] text-xs font-bold hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} />
                <span>
                  {deliveredStops.includes(selectedStop.id)
                    ? "Tucked In & Sleeping Soundly"
                    : "Deliver This Dream"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
