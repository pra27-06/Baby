// src/components/DreamStorybook.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen, Square, Play, Sparkles, Languages, Heart, Crown, Pause, Music, UserCheck } from "lucide-react";
import { sound } from "@/lib/sound";
import { bedtimeNarrator, PrincessVoiceOption } from "@/lib/narrator";

interface BedtimeEntry {
  id: string;
  type: "story" | "poem";
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

const BEDTIME_ENTRIES: BedtimeEntry[] = [
  // 1. Stories
  {
    id: "story-cloud",
    type: "story",
    enTitle: "The Cloud That Lost Its Pillow",
    hiTitle: "तकिया खोने वाला नन्हा बादल",
    enSub: "A heartwarming bedtime journey across the moonlit sky.",
    hiSub: "चांदनी रात में आसमान की एक प्यारी सी लोरी भरी कहानी।",
    image: "/assets/pip_avatar_cloud.png",
    enText:
      "High above the sleeping town... a little pink cloud named Puffy lost his soft bedtime feather pillow. He drifted over the rooftops, weeping gentle dewdrops... Little Pip saw him from the Midnight Nursery window, held out the warm porcelain lantern, and fluffed up a bundle of sweet marshmallow stardust. 'Here, little cloud,' whispered Pip with a tiny giggle. 'Sleep on this cozy stardust pillow tonight.' Puffy nestled into the warmth, closed his little eyes, and drifted into the sweetest slumber under the stars.",
    hiText:
      "सोते हुए शहर के ठीक ऊपर... पफी नाम का एक छोटा गुलाबी बादल, अपना रुई जैसा तकिया खो बैठा था। वह छतों के ऊपर से बहते हुए, हल्की-हल्की ओस की बूंदें बरसा रहा था... नन्हे पिप ने आधी रात की नर्सरी की खिड़की से उसे देखा, अपना प्यारा चमकता लालटेन आगे बढ़ाया, और मीठी-मीठी तारों की धूल से एक नया तकिया बना दिया। पिप ने प्यार से हंसते हुए कहा, 'इस प्यारे तकिये पर सो जाओ, नन्हे बादल।' पफी ने आराम से आँखें मूंद लीं... और तारों की गोद में मीठी नींद सो गया।",
    enMoral: "Kindness always lights the way to safe and peaceful dreams.",
    hiMoral: "प्यार और अपनापन हमेशा हमें मीठे सपनों की ओर ले जाता है।",
  },
  {
    id: "story-ghost",
    type: "story",
    enTitle: "Pip & The Ghost Afraid of the Dark",
    hiTitle: "पिप और नन्हा भूत जिसे अंधेरे से डर लगता था",
    enSub: "How a tiny baby laugh can banish the biggest shadows.",
    hiSub: "कैसे एक प्यारी सी मुस्कान हर डर को भगा देती है।",
    image: "/assets/pip_portrait.png",
    enText:
      "In the cozy attic of the clocktower, lived Willow... a tiny baby ghost who shivered whenever twilight faded into night. 'The dark is too big and quiet,' Willow whined softly. Pip crawled up the attic stairs, carrying the little music box and a pair of pink star-patterned nightcaps. Instead of being frightened, Pip tickled Willow's tummy and giggled until the whole attic echoed with joy. 'See?' said Pip. 'The dark isn't empty—it's just a cozy blanket waiting for stars and giggles!' Willow smiled, put on the nightcap, and was never afraid of the night again.",
    hiText:
      "घंटाघर की अटारी में विलो नाम का एक नन्हा भूत रहता था, जिसे रात के अंधेरे से बहुत डर लगता था... 'यह रात बहुत शांत और बड़ी है,' विलो धीरे से रोने लगा। तभी पिप अपना प्यारा म्यूजिक बॉक्स और दो गुलाबी तारों वाली टोपियाँ लेकर अटारी में आया। पिप बिल्कुल नहीं डरा... उसने विलो के पेट में गुदगुदी की और खिलखिला कर हँस पड़ा! पिप ने कहा, 'अंधेरा डरावना नहीं है, यह तो केवल एक रजाई है जिसपर तारे चमकते हैं!' विलो मुस्कुराया, प्यारी टोपी पहनी, और खुशी-खुशी सो गया।",
    enMoral: "A true friend's giggle can turn any shadow into a playmate.",
    hiMoral: "सच्चे दोस्त की हँसी बड़े से बड़े डर को खेल में बदल देती है।",
  },
  {
    id: "story-star",
    type: "story",
    enTitle: "The Singing Star in the Honey Jar",
    hiTitle: "शहद के जार में गाता हुआ नन्हा तारा",
    enSub: "A magical lullaby adventure in Barnaby's cozy kitchen.",
    hiSub: "बारनाबी भालू की रसोई में एक जादुई तारे की कहानी।",
    image: "/assets/pip_dream_lantern.png",
    enText:
      "One midnight, baby bear Barnaby left his honey jar open on the windowsill... A sleepy falling star plunged straight inside! The star didn't mind—it began humming a soft, sweet pentatonic chime that sounded like golden honey bells. Pip followed the sweet music, tipped the jar gently, and helped the sticky little star fly back to its cloud hammock. Before flying away, the star left a glowing sparkle on Barnaby's nose, promising to sing him to sleep every night.",
    hiText:
      "एक आधी रात को, भालू के बच्चे बारनाबी ने खिड़की पर शहद का जार खुला छोड़ दिया... आसमान से एक नन्हा सा तारा सीधे उस जार में गिर गया! तारे को बुरा नहीं लगा, वह शहद के अंदर से ही मीठी-मीठी सुरीली लोरी गुनगुनाने लगा... पिप ने उस मीठी धुन का पीछा किया, जार को सीधा किया, और तारे को वापस उसके बादल के झूले पर भेज दिया। जाने से पहले, तारे ने बारनाबी की नाक पर एक जादुई चमक छोड़ दी, ताकि उसे रोज रात को मीठे सपने आएँ।",
    enMoral: "Sweet things happen when we share our light with others.",
    hiMoral: "जब हम दूसरों की मदद करते हैं, तो जीवन में मिठास भर जाती है।",
  },
  // 2. Bedtime Poems / Rhyming Lullabies
  {
    id: "poem-moon",
    type: "poem",
    enTitle: "Little Star, Goodnight (Bedtime Rhyme)",
    hiTitle: "चंदा मामा और नन्हे तारे (प्यारी लोरी)",
    enSub: "A soothing bedtime poem to whisper as baby drifts off to sleep.",
    hiSub: "नन्हे बच्चों को सुलाने के लिए सबसे प्यारी, मीठी लोरी।",
    image: "/assets/pip_avatar_cloud.png",
    enText:
      "Twinkle, twinkle, little star... shining gently from afar. Close your sleepy eyes so bright... dream on clouds of sugar white. Softly, softly, night winds blow... Pip is watching from below. Stars are kissing you goodnight... sleep until the morning light.",
    hiText:
      "चंदा मामा दूर के, पुए पकाएं बूर के... नन्हे तारे टिम-टिम करते, मीठे सपनों की दुनिया रचते। सो जाओ मेरे प्यारे लाल, सपनों में झूले फूलों का थाल... हवा कहे धीरे-धीरे, सो जाओ रात के पहरे... मीठी नींद सो जाओ।",
    enMoral: "The stars watch over every child with gentle love all night.",
    hiMoral: "आसमान के तारे रात भर हर बच्चे पर अपना प्यार बरसाते हैं।",
  },
  {
    id: "poem-cradle",
    type: "poem",
    enTitle: "Cradle of Dreams (Nursery Lullaby)",
    hiTitle: "नन्ही नींद परी (सुरीली लोरी)",
    enSub: "A soft, melodious nursery verse for rocking the cradle.",
    hiSub: "झूले में झूलते नन्हे मुन्ने के लिए एक जादुई परी की लोरी।",
    image: "/assets/pip_lullaby_box.png",
    enText:
      "Hush now, darling, do not weep... little angels sing in sleep. Pillows soft as morning mist... cheeks by gentle starlight kissed. Rest your tiny weary head... cozy in your feather bed. Golden dreams are on their way... wake up to a happy day.",
    hiText:
      "आई रे आई, नींद परी आई... नन्हे मुन्ने के लिए, मीठे सपने लाई। पंखों पर सजाकर तारों की कतार, लोरी सुनाती है बारंबार... चुपचाप सो जाओ मेरे दुलारे, रात भर जागेंगे आसमान के तारे... शुभ रात्रि, मीठे सपने।",
    enMoral: "Sleep brings strength, joy, and bright smiles for tomorrow.",
    hiMoral: "अच्छी नींद बच्चों के चेहरे पर कल सुबह प्यारी मुस्कान लाती है।",
  },
];

export function DreamStorybook() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "story" | "poem">("all");
  const [selectedEntry, setSelectedEntry] = useState<BedtimeEntry>(BEDTIME_ENTRIES[0]);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<PrincessVoiceOption[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");

  // Populate voices safely and listen for updates
  useEffect(() => {
    const updateVoices = () => {
      const voices = bedtimeNarrator.getAllFemaleVoices(lang);
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoiceName) {
        setSelectedVoiceName(voices[0].voice.name);
      }
    };

    updateVoices();
    const unsub = bedtimeNarrator.subscribeVoices(updateVoices);

    return () => {
      unsub();
      bedtimeNarrator.stop();
    };
  }, [lang]);

  // When language changes, update voice list
  const handleToggleLanguage = (newLang: "en" | "hi") => {
    sound.playBabyGiggle();
    bedtimeNarrator.stop();
    setIsNarrating(false);
    setIsPaused(false);
    setLang(newLang);
    setSelectedVoiceName(""); // will auto-pick best voice for new language
  };

  const handleSelectEntry = (entry: BedtimeEntry) => {
    sound.playBabyGiggle();
    bedtimeNarrator.stop();
    setIsNarrating(false);
    setIsPaused(false);
    setSelectedEntry(entry);
  };

  const startPrincessNarration = () => {
    sound.playBabyGiggle();
    sound.playChime(523.25, 0.4);

    const textToRead = lang === "hi" ? selectedEntry.hiText : selectedEntry.enText;

    bedtimeNarrator.speak({
      text: textToRead,
      lang,
      preferredVoiceName: selectedVoiceName,
      onStart: () => {
        setIsNarrating(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsNarrating(false);
        setIsPaused(false);
        sound.playChime(392.0, 0.8);
      },
      onError: () => {
        setIsNarrating(false);
        setIsPaused(false);
      },
    });
  };

  const handlePauseResume = () => {
    sound.playBabyGiggle();
    if (isPaused) {
      bedtimeNarrator.resume();
      setIsPaused(false);
    } else {
      bedtimeNarrator.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    sound.playBabyGiggle();
    bedtimeNarrator.stop();
    setIsNarrating(false);
    setIsPaused(false);
  };

  const filteredEntries = BEDTIME_ENTRIES.filter((e) => {
    if (categoryFilter === "story") return e.type === "story";
    if (categoryFilter === "poem") return e.type === "poem";
    return true;
  });

  const activeVoiceObj = bedtimeNarrator.getBestVoice(lang, selectedVoiceName);
  const activeVoiceLabel = activeVoiceObj
    ? activeVoiceObj.name
        .replace(/Microsoft |Online |Desktop |Google |\(United States\)|\(India\)|\(UK\)/g, "")
        .trim()
    : lang === "hi"
    ? "Princess Swara (हिन्दी)"
    : "Princess Jenny";

  return (
    <section id="dream-stories" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto select-none">
      <div className="retro-window p-6 sm:p-10 bg-gradient-to-br from-[#fffbf7] via-white to-[#fff0f5] dark:from-[#161324] dark:to-[#0c0a15] border-2 border-[#f472b6]/30 dark:border-[#ff7597]/25 shadow-xl">
        {/* Header Strip & Bilingual Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f472b6]/20 dark:border-[#ff7597]/20 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#de547a] dark:text-[#ffd166] flex items-center gap-1.5">
              <BookOpen size={14} /> Bedtime Stories & Nursery Poems · English & हिन्दी
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#5c3828] dark:text-[#fff8f1] mt-1">
              Pip’s Dream Storybook & Poems
            </h2>
            <p className="text-sm text-[#8c6552] dark:text-[#bda7b5] mt-1 max-w-xl">
              Listen to enchanting bedtime stories and rhymes read in a gentle, warm Princess voice. Perfect for tucking little babies to sleep!
            </p>
          </div>

          {/* Bilingual Switcher */}
          <div className="flex items-center gap-2 bg-[#fff0f4] dark:bg-[#231e36] p-1.5 rounded-2xl border border-[#f472b6]/30 shadow-sm">
            <span className="text-xs font-bold text-[#de547a] dark:text-[#ffd166] px-2 flex items-center gap-1">
              <Languages size={13} /> Language:
            </span>
            <button
              onClick={() => handleToggleLanguage("en")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#de547a] text-white shadow-md scale-105"
                  : "text-[#5c3828] dark:text-[#ffccd8] hover:bg-white/50"
              }`}
            >
              🇬🇧 English (Princess)
            </button>
            <button
              onClick={() => handleToggleLanguage("hi")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                lang === "hi"
                  ? "bg-[#de547a] text-white shadow-md scale-105"
                  : "text-[#5c3828] dark:text-[#ffccd8] hover:bg-white/50"
              }`}
            >
              🇮🇳 हिन्दी (राजकुमारी)
            </button>
          </div>
        </div>

        {/* Category Tabs: All / Stories / Poems */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-2">
          <div className="flex items-center gap-2 bg-[#fff4f8] dark:bg-[#1f1b33] p-1 rounded-xl border border-[#f472b6]/20">
            <button
              onClick={() => {
                sound.playBabyGiggle();
                setCategoryFilter("all");
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === "all"
                  ? "bg-[#de547a] text-white shadow-sm"
                  : "text-[#8c6552] dark:text-[#bda7b5] hover:text-[#de547a]"
              }`}
            >
              ✨ All ({BEDTIME_ENTRIES.length})
            </button>
            <button
              onClick={() => {
                sound.playBabyGiggle();
                setCategoryFilter("story");
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                categoryFilter === "story"
                  ? "bg-[#de547a] text-white shadow-sm"
                  : "text-[#8c6552] dark:text-[#bda7b5] hover:text-[#de547a]"
              }`}
            >
              <BookOpen size={12} /> Bedtime Stories (3)
            </button>
            <button
              onClick={() => {
                sound.playBabyGiggle();
                setCategoryFilter("poem");
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                categoryFilter === "poem"
                  ? "bg-[#de547a] text-white shadow-sm"
                  : "text-[#8c6552] dark:text-[#bda7b5] hover:text-[#de547a]"
              }`}
            >
              <Music size={12} /> Lullaby Poems (2)
            </button>
          </div>

          {/* Princess Voice Indicator & Selection */}
          <div className="flex items-center gap-2 text-xs bg-[#fff0f4] dark:bg-[#231e36] px-3 py-1.5 rounded-xl border border-[#f472b6]/30">
            <Crown size={14} className="text-[#de547a] dark:text-[#ffd166] animate-pulse" />
            <span className="font-bold text-[#5c3828] dark:text-[#fff8f1]">
              Voice: <span className="text-[#de547a] dark:text-[#ffd166]">🌸 {activeVoiceLabel}</span>
            </span>

            {/* Voice Dropdown if multiple female voices available */}
            {availableVoices.length > 1 && (
              <select
                value={selectedVoiceName}
                onChange={(e) => {
                  sound.playBabyGiggle();
                  bedtimeNarrator.stop();
                  setIsNarrating(false);
                  setIsPaused(false);
                  setSelectedVoiceName(e.target.value);
                }}
                className="ml-1 text-[11px] bg-white dark:bg-[#161324] text-[#de547a] dark:text-[#ffd166] font-semibold rounded-lg px-2 py-0.5 border border-[#f472b6]/40 cursor-pointer focus:outline-none"
                title="Choose your preferred princess bedtime voice"
              >
                {availableVoices.map((opt) => (
                  <option key={opt.voice.name} value={opt.voice.name}>
                    {opt.displayName}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Entry Selector Cards */}
        <div className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredEntries.map((entry) => {
              const isSelected = selectedEntry.id === entry.id;
              return (
                <button
                  key={entry.id}
                  onClick={() => handleSelectEntry(entry)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#fff0f4] dark:bg-[#231e36] border-[#de547a] dark:border-[#ffd166] shadow-md scale-[1.02]"
                      : "bg-white/70 dark:bg-[#1a1728]/70 border-[#f472b6]/20 dark:border-[#ff7597]/20 hover:border-[#de547a]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xl">
                        {entry.type === "story" ? "📖" : "🎵"}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fce7f3] dark:bg-[#3d2331] text-[#de547a] dark:text-[#ffccd8]">
                        {entry.type === "story" ? "Bedtime Story" : "Poem & Rhyme"}
                      </span>
                    </div>
                    <strong className="text-sm font-bold text-[#5c3828] dark:text-[#fff8f1] block">
                      {lang === "hi" ? entry.hiTitle : entry.enTitle}
                    </strong>
                    <span className="text-[11px] text-[#8c6552] dark:text-[#bda7b5] mt-1 block line-clamp-2">
                      {lang === "hi" ? entry.hiSub : entry.enSub}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-[#de547a] dark:text-[#ffd166] mt-3 block">
                      ★ Active Tale
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Story Reading Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          {/* Left: Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden border-4 border-[#f472b6]/30 dark:border-[#ffd166]/30 shadow-lg bg-[#fff0f4] dark:bg-[#1f1b33]">
              <Image
                src={selectedEntry.image}
                alt={selectedEntry.enTitle}
                fill
                className="object-contain p-4"
                sizes="320px"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-[#12101e]/90 text-[#de547a] dark:text-[#ffd166] text-[11px] font-bold px-3 py-1 rounded-full shadow border border-[#f472b6]/20 whitespace-nowrap">
                {lang === "hi"
                  ? selectedEntry.type === "story"
                    ? "✨ मीठे सपनों की कहानी"
                    : "🎵 प्यारी सुरीली लोरी"
                  : selectedEntry.type === "story"
                  ? "✨ Cozy Bedtime Tale"
                  : "🎵 Melodious Nursery Poem"}
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
                    {lang === "hi"
                      ? "राजकुमारी की ममतामयी आवाज़ में सुनें"
                      : "Princess Bedtime Storyteller (Warm & Expressive)"}
                  </strong>
                  <span className="text-[10px] text-[#8c6552] dark:text-[#bda7b5]">
                    {isNarrating
                      ? isPaused
                        ? "Narration Paused"
                        : lang === "hi"
                        ? "राजकुमारी प्यार से कहानी सुना रही हैं... 💖"
                        : "Reading gently with warmth and emotion... 💖"
                      : lang === "hi"
                      ? "सुनने के लिए 'कहानी सुनो' बटन दबाएँ"
                      : "Tap play to hear this read in a sweet, soft voice!"}
                  </span>
                </div>
              </div>

              {/* Voice Action Controls */}
              <div className="flex items-center gap-2">
                {!isNarrating ? (
                  <button
                    onClick={startPrincessNarration}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f472b6] to-[#de547a] text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    aria-label="Read in soft Princess voice"
                  >
                    <Play size={14} />
                    <span>
                      {lang === "hi"
                        ? selectedEntry.type === "story"
                          ? "कहानी सुनो ♪"
                          : "लोरी सुनो ♪"
                        : selectedEntry.type === "story"
                        ? "Listen to Story ♪"
                        : "Listen to Poem ♪"}
                    </span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePauseResume}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#12101e] text-[#de547a] dark:text-[#ffd166] text-xs font-bold border border-[#f472b6] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Pause size={13} />
                      <span>{isPaused ? "Resume" : "Pause"}</span>
                    </button>
                    <button
                      onClick={handleStop}
                      className="px-3 py-1.5 rounded-xl bg-[#de547a] text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Square size={13} />
                      <span>Stop</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Story/Poem Title */}
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#5c3828] dark:text-[#fff8f1]">
              {lang === "hi" ? selectedEntry.hiTitle : selectedEntry.enTitle}
            </h3>

            {/* Story/Poem Body Text */}
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1f1b33]/60 border border-[#f472b6]/20">
              <p
                className={`text-base text-[#5c3828]/90 dark:text-[#e0d6dc] leading-relaxed ${
                  selectedEntry.type === "poem" ? "italic whitespace-pre-line" : ""
                }`}
              >
                {lang === "hi" ? selectedEntry.hiText : selectedEntry.enText}
              </p>
            </div>

            {/* Moral of the Tale */}
            <div className="p-3 rounded-xl bg-[#e8f7ee] dark:bg-[#1a3324] border border-[#1e7e43]/30 text-xs text-[#1e7e43] dark:text-[#7ce6a4] font-medium flex items-center gap-2">
              <Heart size={14} className="fill-current shrink-0" />
              <span>
                <strong>
                  {lang === "hi"
                    ? selectedEntry.type === "story"
                      ? "कहानी की सीख: "
                      : "प्यारा संदेश: "
                    : selectedEntry.type === "story"
                    ? "Moral: "
                    : "Sweet Message: "}
                </strong>
                {lang === "hi" ? selectedEntry.hiMoral : selectedEntry.enMoral}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
