// src/components/DreamStorybook.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BookOpen, Volume2, Square, Play, Sparkles, Languages, Heart, Crown, Pause } from "lucide-react";
import { sound } from "@/lib/sound";

interface BedtimeStory {
  id: string;
  enTitle: string;
  hiTitle: string;
  enSub: string;
  hiSub: string;
  image: string;
  enText: string;
  hiText: string;
  enMoral: string;
  hiMoral: string;
}

const BEDTIME_STORIES: BedtimeStory[] = [
  {
    id: "story-cloud",
    enTitle: "The Cloud That Lost Its Pillow",
    hiTitle: "तकिया खोने वाला नन्हा बादल",
    enSub: "A heartwarming bedtime journey across the moonlit sky.",
    hiSub: "चांदनी रात में आसमान की एक प्यारी सी लोरी भरी कहानी।",
    image: "/assets/pip_avatar_cloud.png",
    enText:
      "High above the sleeping town, a little pink cloud named Puffy lost his soft bedtime feather pillow. He drifted over the rooftops weeping gentle dewdrops. Little Pip saw him from the Midnight Nursery window, held out the warm porcelain lantern, and fluffed up a bundle of sweet marshmallow stardust. 'Here, little cloud,' whispered Pip with a tiny giggle. 'Sleep on this cozy stardust pillow tonight.' Puffy nestled into the warmth, closed his eyes, and drifted into the sweetest slumber under the stars.",
    hiText:
      "सोते हुए शहर के ठीक ऊपर, पफी नाम का एक छोटा गुलाबी बादल अपना रुई जैसा तकिया खो बैठा था। वह छतों के ऊपर से बहते हुए हल्की-हल्की ओस की बूंदें बरसा रहा था। नन्हे पिप ने आधी रात की नर्सरी की खिड़की से उसे देखा, अपना प्यारा चमकता लालटेन आगे बढ़ाया, और मीठी मीठी तारों की धूल से एक नया तकिया बना दिया। पिप ने प्यार से हंसते हुए कहा, 'इस प्यारे तकिये पर सो जाओ, नन्हे बादल।' पफी ने आराम से आँखें मूंद लीं और तारों की गोद में मीठी नींद सो गया।",
    enMoral: "Kindness always lights the way to safe and peaceful dreams.",
    hiMoral: "प्यार और अपनापन हमेशा हमें मीठे सपनों की ओर ले जाता है।",
  },
  {
    id: "story-ghost",
    enTitle: "Pip & The Ghost Afraid of the Dark",
    hiTitle: "पिप और नन्हा भूत जिसे अंधेरे से डर लगता था",
    enSub: "How a tiny baby laugh can banish the biggest shadows.",
    hiSub: "कैसे एक प्यारी सी मुस्कान हर डर को भगा देती है।",
    image: "/assets/pip_portrait.png",
    enText:
      "In the cozy attic of the clocktower lived Willow, a tiny baby ghost who shivered whenever twilight faded into night. 'The dark is too big and quiet,' Willow whined. Pip crawled up the attic stairs, carrying the little music box and a pair of pink star-patterned nightcaps. Instead of being frightened, Pip tickled Willow's tummy and giggled until the whole attic echoed with joy. 'See?' said Pip. 'The dark isn't empty—it's just a cozy blanket waiting for stars and giggles!' Willow smiled, put on the nightcap, and was never afraid of the night again.",
    hiText:
      "घंटाघर की अटारी में विलो नाम का एक नन्हा भूत रहता था, जिसे रात के अंधेरे से बहुत डर लगता था। 'यह रात बहुत शांत और बड़ी है,' विलो रोने लगा। तभी पिप अपना प्यारा म्यूजिक बॉक्स और दो गुलाबी तारों वाली टोपियाँ लेकर अटारी में आया। पिप डरा नहीं, उसने विलो के पेट में गुदगुदी की और खिलखिला कर हँस पड़ा। पिप ने कहा, 'अंधेरा डरावना नहीं है, यह तो केवल एक रजाई है जिसपर तारे चमकते हैं!' विलो मुस्कुराया, टोपी पहनी, और खुशी-खुशी सो गया।",
    enMoral: "A true friend's giggle can turn any shadow into a playmate.",
    hiMoral: "सच्चे दोस्त की हँसी बड़े से बड़े डर को खेल में बदल देती है।",
  },
  {
    id: "story-star",
    enTitle: "The Singing Star in the Honey Jar",
    hiTitle: "शहद के जार में गाता हुआ नन्हा तारा",
    enSub: "A magical lullaby adventure in Barnaby's cozy kitchen.",
    hiSub: "बारनाबी भालू की रसोई में एक जादुई तारे की कहानी।",
    image: "/assets/pip_dream_lantern.png",
    enText:
      "One midnight, baby bear Barnaby left his honey jar open on the windowsill. A sleepy falling star plunged straight inside! The star didn't mind—it began humming a soft, sweet pentatonic chime that sounded like golden honey bells. Pip followed the sweet music, tipped the jar gently, and helped the sticky little star fly back to its cloud hammock. Before flying away, the star left a glowing sparkle on Barnaby's nose, promising to sing him to sleep every night.",
    hiText:
      "एक आधी रात को, भालू के बच्चे बारनाबी ने खिड़की पर शहद का जार खुला छोड़ दिया। आसमान से एक छोटा सा तारा सीधे उस जार में गिर गया! तारे को बुरा नहीं लगा, वह शहद के अंदर से ही मीठी-मीठी लोरी गुनगुनाने लगा। पिप ने उस मीठी धुन का पीछा किया, जार को सीधा किया, और तारे को वापस उसके बादल के झूले पर भेज दिया। जाने से पहले, तारे ने बारनाबी की नाक पर एक जादुई चमक छोड़ दी, ताकि उसे रोज रात को मीठे सपने आएँ।",
    enMoral: "Sweet things happen when we share our light with others.",
    hiMoral: "जब हम दूसरों की मदद करते हैं, तो जीवन में मिठास भर जाती है।",
  },
];

export function DreamStorybook() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [selectedStory, setSelectedStory] = useState<BedtimeStory>(BEDTIME_STORIES[0]);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop speech when component unmounts or story changes
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectStory = (story: BedtimeStory) => {
    sound.playBabyGiggle();
    stopNarration();
    setSelectedStory(story);
  };

  const toggleLanguage = (newLang: "en" | "hi") => {
    sound.playBabyGiggle();
    stopNarration();
    setLang(newLang);
  };

  // Princess / Sweet Lady Bedtime Voice Narrator
  const startPrincessNarration = () => {
    sound.playBabyGiggle();
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const storyText = lang === "hi" ? selectedStory.hiText : selectedStory.enText;
    const utterance = new SpeechSynthesisUtterance(storyText);
    utteranceRef.current = utterance;

    // Pick Princess / Gentle Female Voice
    const voices = window.speechSynthesis.getVoices();
    let princessVoice = null;

    if (lang === "hi") {
      princessVoice =
        voices.find((v) => v.lang.startsWith("hi") && (v.name.includes("Female") || v.name.includes("Swara") || v.name.includes("Kalpana"))) ||
        voices.find((v) => v.lang.startsWith("hi"));
      utterance.lang = "hi-IN";
    } else {
      // Find sweetest female voice (Google UK English Female, Jenny, Samantha, Zira, Victoria)
      princessVoice =
        voices.find((v) => v.name.includes("Google UK English Female") || v.name.includes("Jenny") || v.name.includes("Samantha") || v.name.includes("Victoria") || v.name.includes("Zira")) ||
        voices.find((v) => v.name.toLowerCase().includes("female")) ||
        voices.find((v) => v.lang.startsWith("en"));
      utterance.lang = "en-US";
    }

    if (princessVoice) {
      utterance.voice = princessVoice;
    }

    // Princess voice settings: high sweet pitch + slow, soothing bedtime pace
    utterance.pitch = lang === "hi" ? 1.15 : 1.32; // Sweet, gentle fairy princess cadence
    utterance.rate = 0.86; // Relaxed, cozy bedtime reading speed
    utterance.volume = 0.95;

    utterance.onstart = () => {
      setIsNarrating(true);
      setIsPaused(false);
      // Play a soft stardust chime to begin
      sound.playChime(523.25, 0.6);
    };

    utterance.onend = () => {
      setIsNarrating(false);
      setIsPaused(false);
      sound.playChime(392.0, 0.8);
    };

    utterance.onerror = () => {
      setIsNarrating(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseNarration = () => {
    sound.playBabyGiggle();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  const stopNarration = () => {
    sound.playBabyGiggle();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      setIsPaused(false);
    }
  };

  return (
    <section id="dream-stories" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto select-none">
      <div className="retro-window p-6 sm:p-10 bg-gradient-to-br from-[#fffbf7] via-white to-[#fff0f5] dark:from-[#161324] dark:to-[#0c0a15] border-2 border-[#f472b6]/30 dark:border-[#ff7597]/25 shadow-xl">
        {/* Header & Language Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f472b6]/20 dark:border-[#ff7597]/20 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#de547a] dark:text-[#ffd166] flex items-center gap-1.5">
              <BookOpen size={14} /> Bedtime Storybook · English & हिन्दी
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c3828] dark:text-[#fff8f1] mt-1">
              Pip’s Dream Storybook
            </h2>
            <p className="text-sm text-[#8c6552] dark:text-[#bda7b5] mt-1 max-w-xl">
              Listen to enchanting bedtime stories read in a gentle Princess voice. Perfect for parents tucking in little ones!
            </p>
          </div>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center gap-2 bg-[#fff0f4] dark:bg-[#231e36] p-1.5 rounded-2xl border border-[#f472b6]/30 shadow-sm">
            <span className="text-xs font-bold text-[#de547a] dark:text-[#ffd166] px-2 flex items-center gap-1">
              <Languages size={13} /> Language:
            </span>
            <button
              onClick={() => toggleLanguage("en")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#de547a] text-white shadow"
                  : "text-[#5c3828] dark:text-[#ffccd8] hover:bg-white/50"
              }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => toggleLanguage("hi")}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lang === "hi"
                  ? "bg-[#de547a] text-white shadow"
                  : "text-[#5c3828] dark:text-[#ffccd8] hover:bg-white/50"
              }`}
            >
              🇮🇳 हिन्दी
            </button>
          </div>
        </div>

        {/* Story Selector Cards */}
        <div className="pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8c6552] dark:text-[#bda7b5] block mb-3">
            📚 Select a Bedtime Tale:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BEDTIME_STORIES.map((story) => {
              const isSelected = selectedStory.id === story.id;
              return (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(story)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#fff0f4] dark:bg-[#231e36] border-[#de547a] dark:border-[#ffd166] shadow-md scale-[1.02]"
                      : "bg-white/70 dark:bg-[#1a1728]/70 border-[#f472b6]/20 dark:border-[#ff7597]/20 hover:border-[#de547a]/50"
                  }`}
                >
                  <div>
                    <span className="text-lg mb-1 block">📖</span>
                    <strong className="text-sm font-bold text-[#5c3828] dark:text-[#fff8f1] block">
                      {lang === "hi" ? story.hiTitle : story.enTitle}
                    </strong>
                    <span className="text-[11px] text-[#8c6552] dark:text-[#bda7b5] mt-1 block">
                      {lang === "hi" ? story.hiSub : story.enSub}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-[#de547a] dark:text-[#ffd166] mt-3 block">
                      ★ Active Story
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Story Reading Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Story Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-4 border-[#f472b6]/30 dark:border-[#ffd166]/30 shadow-lg bg-[#fff0f4] dark:bg-[#1f1b33]">
              <Image
                src={selectedStory.image}
                alt={selectedStory.enTitle}
                fill
                className="object-contain p-4"
                sizes="320px"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-[#12101e]/90 text-[#de547a] dark:text-[#ffd166] text-[11px] font-bold px-3 py-1 rounded-full shadow border border-[#f472b6]/20 whitespace-nowrap">
                {lang === "hi" ? "✨ मीठे सपनों की कहानी" : "✨ Bedtime Tale"}
              </div>
            </div>
          </div>

          {/* Right: Story Content & Princess Voice Controls */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Princess Narrator Bar */}
            <div className="p-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#ffe4ec] to-[#fef08a]/40 dark:from-[#3d2331] dark:to-[#231e36] border-2 border-[#f472b6] dark:border-[#ffd166] shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-[#de547a] dark:text-[#ffd166] animate-pulse" />
                <div>
                  <strong className="text-xs font-bold text-[#5c3828] dark:text-white block">
                    {lang === "hi" ? "राजकुमारी की प्यारी आवाज़" : "Princess Bedtime Narrator"}
                  </strong>
                  <span className="text-[10px] text-[#8c6552] dark:text-[#bda7b5]">
                    {isNarrating
                      ? isPaused
                        ? "Narration Paused"
                        : "Reading gently to you... 💖"
                      : "Tap play to hear this story read aloud!"}
                  </span>
                </div>
              </div>

              {/* Voice Action Controls */}
              <div className="flex items-center gap-2">
                {!isNarrating ? (
                  <button
                    onClick={startPrincessNarration}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#de547a] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    aria-label="Read story in Princess voice"
                  >
                    <Play size={14} />
                    <span>{lang === "hi" ? "कहानी सुनो ♪" : "Listen to Story ♪"}</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={pauseNarration}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#12101e] text-[#de547a] dark:text-[#ffd166] text-xs font-bold border border-[#f472b6] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Pause size={13} />
                      <span>{isPaused ? "Resume" : "Pause"}</span>
                    </button>
                    <button
                      onClick={stopNarration}
                      className="px-3 py-1.5 rounded-xl bg-[#de547a] text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Square size={13} />
                      <span>Stop</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Story Title & Text */}
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#5c3828] dark:text-[#fff8f1]">
              {lang === "hi" ? selectedStory.hiTitle : selectedStory.enTitle}
            </h3>

            <p className="text-base text-[#5c3828]/90 dark:text-[#e0d6dc] leading-relaxed p-4 rounded-2xl bg-white/70 dark:bg-[#1f1b33]/60 border border-[#f472b6]/20">
              {lang === "hi" ? selectedStory.hiText : selectedStory.enText}
            </p>

            {/* Moral of the Story */}
            <div className="p-3 rounded-xl bg-[#e8f7ee] dark:bg-[#1a3324] border border-[#1e7e43]/30 text-xs text-[#1e7e43] dark:text-[#7ce6a4] font-medium flex items-center gap-2">
              <Heart size={14} className="fill-current shrink-0" />
              <span>
                <strong>{lang === "hi" ? "कहानी की सीख: " : "Moral: "}</strong>
                {lang === "hi" ? selectedStory.hiMoral : selectedStory.enMoral}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
