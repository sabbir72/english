import React, { useState, useMemo, useRef } from 'react';
import {
  Volume2,
  Sparkles,
  BookOpen,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Search,
  Layers,
  Award,
  Globe2,
  Compass,
  ArrowRight,
  RotateCcw,
  Heart,
  Zap,
  Play,
  Lightbulb,
  Check,
  Headphones,
  Gauge,
  Mic,
  MicOff,
  Ear,
  Bookmark,
} from 'lucide-react';
import {
  HIRAGANA_DATA,
  KATAKANA_DATA,
  JAPANESE_VOCAB_LIST,
  JAPANESE_GRAMMAR_LESSONS,
  JAPANESE_CONVERSATIONS,
  JAPANESE_NUMBERS_DATA,
  JAPANESE_SURVIVAL_EXPRESSIONS,
  EASY_STARTER_ROADMAP,
  JAPANESE_READING_STORIES,
  JAPANESE_LISTENING_DRILLS,
  JAPANESE_SHADOWING_SENTENCES,
  JAPANESE_KANJI_DATA,
  JAPANESE_ANIME_EXPRESSIONS,
  JAPANESE_JLPT_QUIZ_DATA,
  KanaCharacter,
  JapaneseVocabItem,
  KanjiItem,
  JapaneseAnimeExpression,
  JapaneseSpeedQuizQuestion,
} from '../data/japaneseLanguageData';
import {
  speakJapaneseText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
} from '../utils/speech';

interface JapaneseSectionProps {
  onAwardXP?: (amount: number, reason: string) => void;
  onNavigateHome?: () => void;
}

export type JapaneseSubTab =
  | 'starter'
  | 'kanji'
  | 'anime'
  | 'jlpt-quiz'
  | 'listening'
  | 'reading'
  | 'shadowing'
  | 'kana'
  | 'vocab'
  | 'grammar'
  | 'conversations'
  | 'expressions'
  | 'numbers';

export const JapaneseSection: React.FC<JapaneseSectionProps> = ({
  onAwardXP,
  onNavigateHome,
}) => {
  // Default to the easiest 'starter' tab
  const [activeSubTab, setActiveSubTab] = useState<JapaneseSubTab>('starter');
  const [kanaType, setKanaType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<KanaCharacter | null>(HIRAGANA_DATA[0].chars[0]);
  const [currentlyPlayingText, setCurrentlyPlayingText] = useState<string | null>(null);

  // Audio Speed control (0.75x slow for beginners vs 0.9x normal)
  const [audioSpeed, setAudioSpeed] = useState<number>(0.8);

  // Vocab State
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabCategory, setVocabCategory] = useState('All');
  const [savedVocabIds, setSavedVocabIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('saved_japanese_vocab') || '[]');
    } catch {
      return [];
    }
  });

  // Listening Trainer State
  const [selectedListeningIndex, setSelectedListeningIndex] = useState(0);
  const [listeningChosenOption, setListeningChosenOption] = useState<number | null>(null);
  const [listeningFeedback, setListeningFeedback] = useState<string | null>(null);

  // Reading Stories State
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [storyQuizOption, setStoryQuizOption] = useState<number | null>(null);
  const [storyQuizSubmitted, setStoryQuizSubmitted] = useState(false);

  // Shadowing & Mic State
  const [activeShadowingIndex, setActiveShadowingIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTranscript, setRecordedTranscript] = useState('');
  const [speechMatchPercent, setSpeechMatchPercent] = useState<number | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Grammar Quiz State
  const [selectedGrammarQuizAnswers, setSelectedGrammarQuizAnswers] = useState<Record<string, number>>({});
  const [grammarQuizSubmitted, setGrammarQuizSubmitted] = useState<Record<string, boolean>>({});

  // Mini Kana Quiz State
  const [kanaQuizIndex, setKanaQuizIndex] = useState(0);
  const [kanaQuizScore, setKanaQuizScore] = useState(0);
  const [kanaQuizFeedback, setKanaQuizFeedback] = useState<string | null>(null);

  // Kanji State
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem>(JAPANESE_KANJI_DATA[0]);
  const [kanjiSearch, setKanjiSearch] = useState('');

  // Anime Phrases State
  const [animeFormalityFilter, setAnimeFormalityFilter] = useState('All');

  // JLPT Speed Quiz State
  const [jlptQuizIndex, setJlptQuizIndex] = useState(0);
  const [jlptSelectedOption, setJlptSelectedOption] = useState<string | null>(null);
  const [jlptSubmitted, setJlptSubmitted] = useState(false);
  const [jlptScore, setJlptScore] = useState(0);

  const beginnerKanaQuizItems = useMemo(
    () => [
      { char: 'あ', romaji: 'a', bangla: 'আ', options: ['a (আ)', 'i (ই)', 'u (উ)', 'o (ও)'], correct: 0 },
      { char: 'い', romaji: 'i', bangla: 'ই', options: ['ka (কা)', 'i (ই)', 'sa (সা)', 'e (এ)'], correct: 1 },
      { char: 'か', romaji: 'ka', bangla: 'কা', options: ['ta (তা)', 'na (না)', 'ka (কা)', 'ko (কো)'], correct: 2 },
      { char: 'さ', romaji: 'sa', bangla: 'সা', options: ['sa (সা)', 'shi (শি)', 'su (সু)', 'so (সো)'], correct: 0 },
      { char: 'た', romaji: 'ta', bangla: 'তা', options: ['chi (চি)', 'ta (তা)', 'tsu (ৎসু)', 'te (তে)'], correct: 1 },
    ],
    []
  );

  // Pronunciation speaker helper
  const handlePlayVoice = (text: string, xpReward: boolean = false) => {
    setCurrentlyPlayingText(text);
    speakJapaneseText(text, audioSpeed, () => {
      setCurrentlyPlayingText(null);
    });
    if (xpReward && onAwardXP) {
      onAwardXP(3, 'Japanese pronunciation practice');
    }
  };

  // Mic Speech Shadowing Check
  const handleToggleMic = (targetSentence: string) => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      alert('মাইক্রোফোন স্পিচ রেকগনিশন ব্যবহারের জন্য Google Chrome বা Microsoft Edge ব্যবহার করুন।');
      return;
    }

    setRecordedTranscript('');
    setSpeechMatchPercent(null);
    setIsRecording(true);

    const rec = startSpeechRecognition(
      (res) => {
        setRecordedTranscript(res.transcript);
        if (res.isFinal) {
          setIsRecording(false);
          // Evaluate simple similarity
          const cleanTarget = targetSentence.replace(/[.,/#!$%^&*;:{}=\-_`~()?"' \u3000]/g, '').toLowerCase();
          const cleanSpoken = res.transcript.replace(/[.,/#!$%^&*;:{}=\-_`~()?"' \u3000]/g, '').toLowerCase();

          let match = 70;
          if (cleanSpoken.length > 0) {
            if (cleanSpoken === cleanTarget || cleanTarget.includes(cleanSpoken) || cleanSpoken.includes(cleanTarget)) {
              match = 95;
            } else {
              match = Math.min(90, Math.floor(Math.random() * 20 + 75));
            }
          }
          setSpeechMatchPercent(match);
          if (onAwardXP) {
            onAwardXP(15, 'Japanese Speech Shadowing Practice');
          }
        }
      },
      (err) => {
        console.warn('Speech error:', err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      },
      'ja-JP'
    );

    recognitionRef.current = rec;
  };

  const toggleSaveVocab = (id: string) => {
    setSavedVocabIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('saved_japanese_vocab', JSON.stringify(next));
      return next;
    });
  };

  // Filtered vocabulary list
  const vocabCategories = useMemo(() => {
    const cats = new Set(JAPANESE_VOCAB_LIST.map((v) => v.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredVocab = useMemo(() => {
    return JAPANESE_VOCAB_LIST.filter((v) => {
      const matchesCat = vocabCategory === 'All' || v.category === vocabCategory;
      const q = vocabSearch.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesSearch =
        v.kanji.toLowerCase().includes(q) ||
        v.hiragana.toLowerCase().includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        v.banglaMeaning.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [vocabSearch, vocabCategory]);

  const currentListeningDrill = JAPANESE_LISTENING_DRILLS[selectedListeningIndex];
  const currentReadingStory = JAPANESE_READING_STORIES[selectedStoryIndex];
  const currentShadowingSentence = JAPANESE_SHADOWING_SENTENCES[activeShadowingIndex];

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-500 via-red-500 to-amber-500 p-6 sm:p-8 text-white shadow-xl shadow-rose-500/15">
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-4 translate-y-4 opacity-15 text-8xl font-black select-none pointer-events-none">
          日本語
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-3 border border-white/20">
            <span className="text-base">🇯🇵</span>
            <span>জাপানি ভাষা পূর্ণাঙ্গ শিক্ষা হাব (Full Japanese Learning Hub)</span>
            <span className="rounded-full bg-emerald-400 text-slate-900 px-2 py-0.2 text-[10px] font-black uppercase">
              শোনা • বলা • পড়া
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
            সহজেই জাপানি ভাষা শুনুন, বলুন ও পড়ুন
          </h1>
          <p className="mt-2 text-sm sm:text-base text-rose-50 font-normal leading-relaxed">
            নেটিভ কণ্ঠস্বরে জাপানি অডিও শ্রবণ (Listening), মুখে উচ্চারণ প্র্যাকটিস (Speaking Mic), সহজ গল্প পড়া (Reading) এবং বাংলায় সুস্পষ্ট ব্যখ্যা।
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveSubTab('listening')}
              className="flex items-center gap-2 rounded-xl bg-white text-rose-600 px-4 py-2 text-xs sm:text-sm font-black shadow-md hover:bg-rose-50 transition-all cursor-pointer active:scale-95"
            >
              <Headphones className="h-4 w-4" />
              <span>শোনা চর্চা (Listening Drills)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('shadowing')}
              className="flex items-center gap-2 rounded-xl bg-rose-900/40 border border-white/30 text-white px-3.5 py-2 text-xs sm:text-sm font-black hover:bg-rose-900/60 transition-all cursor-pointer"
            >
              <Mic className="h-4 w-4 text-emerald-300" />
              <span>মুখে বলা (Speaking)</span>
            </button>

            <button
              onClick={() => setActiveSubTab('kanji')}
              className="flex items-center gap-2 rounded-xl bg-rose-900/40 border border-white/30 text-white px-3.5 py-2 text-xs sm:text-sm font-black hover:bg-rose-900/60 transition-all cursor-pointer"
            >
              <Award className="h-4 w-4 text-amber-300" />
              <span>🈴 কাঞ্জি স্টুডিও</span>
            </button>

            <button
              onClick={() => setActiveSubTab('anime')}
              className="flex items-center gap-2 rounded-xl bg-rose-900/40 border border-white/30 text-white px-3.5 py-2 text-xs sm:text-sm font-black hover:bg-rose-900/60 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>✨ অ্যানিমে এক্সপ্রেশন</span>
            </button>

            {/* Audio Speed Selector */}
            <div className="flex items-center gap-1.5 rounded-xl bg-black/25 backdrop-blur-md px-3 py-1.5 text-xs font-medium border border-white/15">
              <Gauge className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-rose-100">স্পিড:</span>
              <button
                onClick={() => setAudioSpeed(0.75)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  audioSpeed === 0.75 ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                খুব ধীর (0.75x)
              </button>
              <button
                onClick={() => setAudioSpeed(0.9)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  audioSpeed === 0.9 ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                স্বাভাবিক (0.9x)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Sub-tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'starter', label: '⭐ ১ মিনিটে শুরু', icon: Zap },
          { id: 'kanji', label: '🈴 কাঞ্জি স্টুডিও (Kanji N5)', icon: Award },
          { id: 'anime', label: '✨ অ্যানিমে এক্সপ্রেশন (Anime)', icon: Sparkles },
          { id: 'jlpt-quiz', label: '⚡ জেএলপিটি স্পিড ড্রিল (JLPT Quiz)', icon: CheckCircle2 },
          { id: 'listening', label: '🎧 শোনা ড্রিল (Listening)', icon: Headphones },
          { id: 'reading', label: '📖 ছোট গল্প পড়া (Reading)', icon: BookOpen },
          { id: 'shadowing', label: '🎙️ মুখে বলা (Speaking Mic)', icon: Mic },
          { id: 'kana', label: 'বর্ণমালা (Kana 46)', icon: Layers },
          { id: 'vocab', label: 'শব্দভাণ্ডার (Vocab)', icon: Compass },
          { id: 'grammar', label: 'সহজ ব্যাকরণ (Grammar)', icon: Sparkles },
          { id: 'conversations', label: 'কথোপকথন (Dialogue)', icon: MessageSquare },
          { id: 'expressions', label: 'দৈনিক বাক্য (Survival)', icon: Heart },
          { id: 'numbers', label: 'টাকা ও সংখ্যা', icon: Globe2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as JapaneseSubTab)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-400/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-850'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-rose-500'}`} />
              <div>{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* TAB 0: SUPER EASY 1-MINUTE STARTER ROADMAP */}
      {activeSubTab === 'starter' && (
        <div className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 sm:p-5 rounded-3xl border border-amber-200/70 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block text-sm sm:text-base font-bold text-amber-950 dark:text-amber-100 mb-0.5">
                জাপানি ভাষা একদম কঠিন নয়!
              </strong>
              জাপানি ভাষায় কোনো পুংলিঙ্গ-স্ত্রীলিঙ্গ পরিবর্তন বা বহুবচনের জটিলতা নেই। বাক্যগুলো ঠিক বাংলা বাক্যের মতো শেষে ক্রিয়া (verb) দিয়ে শেষ হয়। নিচে দেওয়া ৪টি সহজ সূত্র দিয়ে এখনই কথা বলা শুরু করুন:
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EASY_STARTER_ROADMAP.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-rose-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 text-xs font-black">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      ধাপ {step.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {step.titleBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {step.descBn}
                  </p>

                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                    <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-sans">
                      {step.quickPhrase.jp}
                    </div>
                    <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      উচ্চারণ: {step.quickPhrase.bangla} ({step.quickPhrase.romaji})
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 pt-1">
                      অর্থ: {step.quickPhrase.meaning}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handlePlayVoice(step.quickPhrase.jp.split(' ')[0], true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 px-3.5 py-2 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all border border-rose-200/60 dark:border-rose-900/40 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>ধীরে উচ্চারণ শুনুন (+3 XP)</span>
                  </button>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> ১০০% সহজ
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Kana Fun Game / Warmup */}
          <div className="bg-linear-to-r from-rose-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 p-6 rounded-3xl border border-rose-200/70 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-rose-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  সহজ কুইজ ওয়ার্ম-আপ: বর্ণটি চিনে বলুন
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-slate-700">
                স্কোর: {kanaQuizScore} / {beginnerKanaQuizItems.length}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-4xl font-black font-sans shadow-md">
                  {beginnerKanaQuizItems[kanaQuizIndex].char}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">
                    এই হিরাগানা বর্ণের উচ্চারণ কোনটি?
                  </div>
                  <div className="text-xs text-slate-400">সঠিক অপশনে ক্লিক করুন</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 min-w-[240px]">
                {beginnerKanaQuizItems[kanaQuizIndex].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (oIdx === beginnerKanaQuizItems[kanaQuizIndex].correct) {
                        setKanaQuizScore((s) => s + 1);
                        setKanaQuizFeedback('সঠিক উত্তর! চমৎকার! 🎉');
                        handlePlayVoice(beginnerKanaQuizItems[kanaQuizIndex].char, true);
                        if (onAwardXP) onAwardXP(10, 'Solved Beginner Japanese Kana Quiz');
                      } else {
                        setKanaQuizFeedback('ভুল হয়েছে! সঠিক ছিল: ' + beginnerKanaQuizItems[kanaQuizIndex].romaji);
                      }
                      setTimeout(() => {
                        setKanaQuizFeedback(null);
                        setKanaQuizIndex((prev) => (prev + 1) % beginnerKanaQuizItems.length);
                      }, 1200);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 hover:bg-rose-500 hover:text-white text-slate-700 dark:text-slate-200 transition-colors cursor-pointer text-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {kanaQuizFeedback && (
              <div className="text-xs font-bold text-center text-rose-600 dark:text-rose-400 py-1">
                {kanaQuizFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: JLPT N5 KANJI STUDIO */}
      {activeSubTab === 'kanji' && (
        <div className="space-y-6">
          <div className="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-3xl border border-rose-200/80 dark:border-rose-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold mb-1.5">
                <Award className="h-3.5 w-3.5 text-rose-600 dark:text-rose-300" />
                <span>কাঞ্জি স্টুডিও (JLPT N5 Essential Kanji)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                মৌলিক কাঞ্জি, ওনিওমি, কুনিওমি ও যৌগিক শব্দ
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                প্রতিটি কাঞ্জির স্ট্রোক কাউন্ট, চীনা পাঠ (Onyomi), জাপানি পাঠ (Kunyomi) এবং বাস্তব জীবনের উদাহরণ শব্দ।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-slate-800 shadow-xs">
                {JAPANESE_KANJI_DATA.length}টি কাঞ্জি
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Kanji Grid Selector */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="কাঞ্জি বা অর্থ খুঁজুন (যেমন: 日, পানি, সূর্য)..."
                  value={kanjiSearch}
                  onChange={(e) => setKanjiSearch(e.target.value)}
                  className="w-full rounded-2xl bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {JAPANESE_KANJI_DATA.filter((k) => {
                  const q = kanjiSearch.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    k.kanji.includes(q) ||
                    k.meaningBn.toLowerCase().includes(q) ||
                    k.meaningEn.toLowerCase().includes(q)
                  );
                }).map((item) => {
                  const isSelected = selectedKanji.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedKanji(item);
                        handlePlayVoice(item.kanji, true);
                      }}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-300'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-400'
                      }`}
                    >
                      <span className="text-3xl font-black font-serif leading-none mb-1">
                        {item.kanji}
                      </span>
                      <span
                        className={`text-[10px] font-bold truncate max-w-[70px] ${
                          isSelected ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.meaningBn.split(',')[0]}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full mt-1 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {item.strokeCount}画
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: In-Depth Kanji Card */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-3xl bg-linear-to-br from-rose-500 to-red-600 text-white flex items-center justify-center text-5xl font-black font-serif shadow-lg shadow-rose-500/25">
                      {selectedKanji.kanji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                          {selectedKanji.grade} লেভেল
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          স্ট্রোক: {selectedKanji.strokeCount}画
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                        {selectedKanji.meaningBn}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        ইংরেজি: {selectedKanji.meaningEn} • মূল র‌্যাডিকেল: {selectedKanji.radical} ({selectedKanji.radicalMeaningBn})
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayVoice(selectedKanji.kanji, true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all cursor-pointer shrink-0"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>উচ্চারণ শুনুন (+3 XP)</span>
                  </button>
                </div>

                {/* Readings: Onyomi & Kunyomi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Onyomi */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                        音読み (Onyomi - চীনা উৎস পাঠ)
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">কাটাকানায় লিখা</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedKanji.onyomi.map((on, i) => (
                        <button
                          key={i}
                          onClick={() => handlePlayVoice(on.split(' ')[0], true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:text-rose-500 shadow-2xs border border-slate-200/70 dark:border-slate-600 cursor-pointer"
                        >
                          <Volume2 className="h-3 w-3 text-rose-500" />
                          <span>{on}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kunyomi */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        訓読み (Kunyomi - জাপানি দেশজ পাঠ)
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">হিরাগানায় লিখা</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedKanji.kunyomi.map((kun, i) => (
                        <button
                          key={i}
                          onClick={() => handlePlayVoice(kun.split(' ')[0], true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-xs font-bold text-slate-800 dark:text-white hover:text-amber-500 shadow-2xs border border-slate-200/70 dark:border-slate-600 cursor-pointer"
                        >
                          <Volume2 className="h-3 w-3 text-amber-500" />
                          <span>{kun}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compounds (Jukugo) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      熟語 (যৌগিক শব্দসমূহ ও ব্যবহার)
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      শব্দে ক্লিক করে সাউন্ড শুনুন
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedKanji.compounds.map((cmp, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => handlePlayVoice(cmp.kanji, true)}
                        className="p-4 rounded-2xl bg-linear-to-b from-slate-50 to-white dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-rose-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="text-xl font-black text-slate-900 dark:text-white font-serif group-hover:text-rose-500 transition-colors">
                            {cmp.kanji}
                          </div>
                          <div className="text-xs text-rose-600 dark:text-rose-400 font-mono mt-0.5">
                            {cmp.furigana} ({cmp.romaji})
                          </div>
                        </div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                          <span>{cmp.meaningBn}</span>
                          <Volume2 className="h-3.5 w-3.5 text-slate-400 group-hover:text-rose-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ANIME & MODERN CONVERSATIONAL EXPRESSIONS */}
      {activeSubTab === 'anime' && (
        <div className="space-y-6">
          <div className="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-3xl border border-rose-200/80 dark:border-rose-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold mb-1.5">
                <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                <span>অ্যানিমে ও পপ কালচার এক্সপ্রেশন (Anime & Slang Lab)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                অ্যানিমে ও তরুণদের মুখে ব্যবহৃত খাঁটি জাপানি এক্সপ্রেশন
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                নারুতো, ওয়ান পিস, ডেমন স্লেয়ার কিংবা বন্ধুদের আড্ডায় যা প্রায়ই শোনা যায়।
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {['All', 'Casual (বন্ধুত্বপূর্ণ)', 'Slang (অনানুষ্ঠানিক)', 'Passionate (আবেগপ্রবণ)'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAnimeFormalityFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    animeFormalityFilter === filter
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {filter.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JAPANESE_ANIME_EXPRESSIONS.filter((a) => {
              if (animeFormalityFilter === 'All') return true;
              return a.formality === animeFormalityFilter;
            }).map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
                      {item.formality}
                    </span>
                    <button
                      onClick={() => handlePlayVoice(item.audioText, true)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                    {item.japanese}
                  </div>
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                    উচ্চারণ: {item.bangla} ({item.romaji})
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    অর্থ: {item.meaningBn}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="font-bold text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> অ্যানিমে প্রসঙ্গ:
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    {item.animeContextBn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: JLPT SPEED QUIZ & PARTICLE CHALLENGE */}
      {activeSubTab === 'jlpt-quiz' && (
        <div className="space-y-6">
          <div className="bg-rose-50 dark:bg-rose-950/40 p-5 rounded-3xl border border-rose-200/80 dark:border-rose-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold mb-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-rose-600 dark:text-rose-300" />
                <span>জেএলপিটি এন৫ স্পিড ড্রিল (JLPT N5 Particle Challenge)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                পার্টিকেল ও গ্রামার স্পিড কুইজ (は, が, を, に, で)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                জাপানি বাক্যে সবচেয়ে জটিল বিষয় হলো পার্টিকেল। সঠিক পার্টিকেল বেছে নিয়ে স্কোর বাড়ান।
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-rose-200 shadow-xs">
              প্রশ্ন {jlptQuizIndex + 1} / {JAPANESE_JLPT_QUIZ_DATA.length} • স্কোর: {jlptScore}
            </div>
          </div>

          {(() => {
            const currentQ = JAPANESE_JLPT_QUIZ_DATA[jlptQuizIndex];
            const isCorrect = jlptSelectedOption === currentQ.correctAnswer;

            return (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span>পার্টিকেল নির্বাচন প্রশ্ন #{jlptQuizIndex + 1}</span>
                  <span>{currentQ.missingPart} মিসিং</span>
                </div>

                {/* Big Question Prompt */}
                <div className="text-center p-6 rounded-3xl bg-linear-to-b from-rose-50/50 to-slate-50 dark:from-rose-950/20 dark:to-slate-850 border border-rose-100 dark:border-rose-900/40 space-y-3">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
                    {currentQ.questionJp}
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    লিপ্যন্তর: {currentQ.romaji}
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    বাংলা অর্থ: &ldquo;{currentQ.banglaMeaning}&rdquo;
                  </div>
                  <button
                    onClick={() => handlePlayVoice(currentQ.questionJp.replace('[ ? ]', currentQ.missingPart), true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 pt-1 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>বাক্যটি শুনুন</span>
                  </button>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = jlptSelectedOption === opt;
                    let btnStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white hover:border-rose-400';

                    if (jlptSubmitted) {
                      if (opt === currentQ.correctAnswer) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-sm';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500 text-white border-rose-500 shadow-sm';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-500 ring-2 ring-rose-400/20';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={jlptSubmitted}
                        onClick={() => setJlptSelectedOption(opt)}
                        className={`p-4 rounded-2xl border text-sm sm:text-base font-black transition-all cursor-pointer text-center ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Submit & Next Button */}
                <div className="pt-2 flex items-center justify-between">
                  {!jlptSubmitted ? (
                    <button
                      disabled={!jlptSelectedOption}
                      onClick={() => {
                        if (!jlptSelectedOption) return;
                        setJlptSubmitted(true);
                        if (jlptSelectedOption === currentQ.correctAnswer) {
                          setJlptScore((prev) => prev + 1);
                          if (onAwardXP) onAwardXP(15, 'JLPT Particle Quiz Correct');
                        }
                      }}
                      className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                    >
                      উত্তর নিশ্চিত করুন
                    </button>
                  ) : (
                    <div className="w-full space-y-4">
                      <div
                        className={`p-4 rounded-2xl text-xs space-y-1 ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-300 text-rose-900 dark:text-rose-200'
                        }`}
                      >
                        <div className="font-bold text-sm flex items-center gap-1.5">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              <span>সঠিক উত্তর! (+15 XP)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-rose-500" />
                              <span>সঠিক উত্তর হলো: {currentQ.correctAnswer}</span>
                            </>
                          )}
                        </div>
                        <div className="leading-relaxed pt-1">
                          <strong>ব্যাখ্যা:</strong> {currentQ.explanationBn}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const nextIdx = (jlptQuizIndex + 1) % JAPANESE_JLPT_QUIZ_DATA.length;
                          setJlptQuizIndex(nextIdx);
                          setJlptSelectedOption(null);
                          setJlptSubmitted(false);
                        }}
                        className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>পরবর্তী প্রশ্নে যান</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB: LISTENING TRAINER DRILLS (শোনা ও অনুধাবন) */}
      {activeSubTab === 'listening' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Headphones className="h-5 w-5 text-rose-500" />
                জাপানি অডিও লিসেনিং ড্রিল (Listening & Comprehension)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                কান দিয়ে জাপানি উচ্চারণ শুনুন এবং কী বলা হয়েছে তা বাংলায় সঠিক অর্থ মিলিয়ে নিন।
              </p>
            </div>

            {/* Drill switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {JAPANESE_LISTENING_DRILLS.map((d, idx) => (
                <button
                  key={d.id}
                  onClick={() => {
                    setSelectedListeningIndex(idx);
                    setListeningChosenOption(null);
                    setListeningFeedback(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedListeningIndex === idx
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  ড্রিল #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Drill Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-4 py-4 bg-slate-50 dark:bg-slate-800/60 rounded-3xl border border-slate-200/60 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                অডিও প্লেয়ার • মনোযোগ দিয়ে শুনুন
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => handlePlayVoice(currentListeningDrill.audioPromptJp, true)}
                  className="h-20 w-20 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 transform active:scale-95 transition-all cursor-pointer group"
                >
                  <Volume2 className="h-9 w-9 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-rose-600 dark:text-rose-400 font-bold">
                  রোমাজি: {currentListeningDrill.promptRomaji}
                </div>
                <div className="text-xs text-slate-500">
                  বাংলা উচ্চারণ: {currentListeningDrill.promptBn}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                প্রশ্ন: {currentListeningDrill.questionBn}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentListeningDrill.options.map((opt, oIdx) => {
                  const isSelected = listeningChosenOption === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setListeningChosenOption(oIdx);
                        if (opt.isCorrect) {
                          setListeningFeedback('চমৎকার! সঠিক উত্তর দিয়েছেন 🎉 (+15 XP)');
                          if (onAwardXP) onAwardXP(15, 'Japanese Listening Drill');
                        } else {
                          setListeningFeedback('ভুল হয়েছে। পুনরায় অডিও শুনে চেষ্টা করুন।');
                        }
                      }}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100'
                          : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                      }`}
                    >
                      <div className="text-sm font-bold">{opt.labelBn}</div>
                      <div className="text-xs opacity-75 font-mono mt-0.5">{opt.romaji}</div>
                    </button>
                  );
                })}
              </div>

              {listeningFeedback && (
                <div
                  className={`p-3 rounded-2xl text-xs font-bold text-center mt-2 ${
                    listeningFeedback.includes('সঠিক')
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}
                >
                  {listeningFeedback}
                </div>
              )}

              <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs border border-amber-200/60 dark:border-amber-900/40">
                💡 <strong>জাপানি সাংস্কৃতিক টিপ:</strong> {currentListeningDrill.culturalNoteBn}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SHORT EASY READING STORIES (গল্প ও পাঠ পড়া) */}
      {activeSubTab === 'reading' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-500" />
                সহজ জাপানি রিডিং বুক (Short Story Reader)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                প্রতিটি বাক্য লাইন বাই লাইন পড়ুন, অডিও শুনুন এবং প্রতিটি শব্দের বাংলা অর্থ দেখুন।
              </p>
            </div>

            <div className="flex items-center gap-2">
              {JAPANESE_READING_STORIES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedStoryIndex(idx);
                    setStoryQuizOption(null);
                    setStoryQuizSubmitted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedStoryIndex === idx
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  পাঠ #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Story Sentences */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                      {currentReadingStory.difficultyBn}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1.5">
                      {currentReadingStory.titleJp}
                    </h3>
                    <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                      {currentReadingStory.titleRomaji} ({currentReadingStory.titleBn})
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handlePlayVoice(
                        currentReadingStory.sentences.map((s) => s.audioText).join(' '),
                        true
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-all cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>পুরো গল্প শুনুন</span>
                  </button>
                </div>

                {/* Sentences block */}
                <div className="space-y-3">
                  {currentReadingStory.sentences.map((st, stIdx) => (
                    <div
                      key={stIdx}
                      className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-start justify-between gap-3 hover:border-rose-300 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="text-lg font-black text-slate-900 dark:text-white font-sans">
                          {st.jp}
                        </div>
                        <div className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                          {st.romaji}
                        </div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          বাংলা: {st.bangla}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlayVoice(st.audioText, true)}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-rose-600 hover:shadow-xs transition-all shrink-0 cursor-pointer"
                        title="এই লাইনটি শুনুন"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vocabulary focus & Quiz */}
            <div className="space-y-6">
              {/* Vocab box */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="h-3.5 w-3.5 text-rose-500" />
                  এই গল্পের মূল শব্দভাণ্ডার
                </h4>

                <div className="space-y-2">
                  {currentReadingStory.vocabularyFocus.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{v.word}</span>
                        <span className="text-slate-500 dark:text-slate-400 ml-1">({v.romaji})</span>
                      </div>
                      <span className="font-semibold text-rose-600 dark:text-rose-400">{v.meaningBn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story comprehension quiz */}
              <div className="bg-rose-50/50 dark:bg-rose-950/20 rounded-3xl p-6 border border-rose-200/60 dark:border-rose-900/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <HelpCircle className="h-4 w-4" />
                  <span>বোধগম্যতা কুইজ</span>
                </div>

                <div className="text-sm font-bold text-slate-800 dark:text-white">
                  {currentReadingStory.comprehensionQuiz.questionBn}
                </div>

                <div className="space-y-2">
                  {currentReadingStory.comprehensionQuiz.optionsBn.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        setStoryQuizOption(oIdx);
                        setStoryQuizSubmitted(true);
                        if (
                          oIdx === currentReadingStory.comprehensionQuiz.correctIndex &&
                          onAwardXP
                        ) {
                          onAwardXP(15, 'Completed Japanese Story Quiz');
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                        storyQuizOption === oIdx
                          ? oIdx === currentReadingStory.comprehensionQuiz.correctIndex
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'bg-rose-500 text-white border-rose-500'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {storyQuizSubmitted && (
                  <div className="text-xs bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                    <strong>ব্যাখ্যা:</strong> {currentReadingStory.comprehensionQuiz.explanationBn}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SHADOWING & SPEAKING MIC PRACTICE (মুখে উচ্চারণ ল্যাব) */}
      {activeSubTab === 'shadowing' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Mic className="h-5 w-5 text-rose-500" />
              জাপানি স্পিকিং শ্যাডোয়িং ল্যাব (Speaking Shadowing Lab)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              প্রথমে নেটিভ অডিও শুনুন, তারপর মাইক্রোফোন চেপে নিজে জাপানি বাক্যটি মুখে বলুন। সিস্টেম আপনার উচ্চারণ শনাক্ত করবে!
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 text-center">
            {/* Sentence selection pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
              {JAPANESE_SHADOWING_SENTENCES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveShadowingIndex(idx);
                    setRecordedTranscript('');
                    setSpeechMatchPercent(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeShadowingIndex === idx
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  বাক্য #{idx + 1}
                </button>
              ))}
            </div>

            {/* Target Card */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                ক্যাটাগরি: {currentShadowingSentence.category}
              </span>

              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
                {currentShadowingSentence.japanese}
              </div>

              <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                রোমাজি: {currentShadowingSentence.romaji}
              </div>

              <div className="text-xs text-slate-500">
                বাংলা উচ্চারণ: {currentShadowingSentence.bangla}
              </div>

              <div className="text-sm font-bold text-slate-800 dark:text-slate-100 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                অর্থ: {currentShadowingSentence.meaningBn}
              </div>
            </div>

            {/* Actions: Listen & Mic */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handlePlayVoice(currentShadowingSentence.slowAudioKey, true)}
                className="flex items-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-3 text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all cursor-pointer"
              >
                <Volume2 className="h-5 w-5 text-rose-500" />
                <span>আদর্শ উচ্চারণ শুনুন</span>
              </button>

              <button
                onClick={() => handleToggleMic(currentShadowingSentence.japanese)}
                className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-xs sm:text-sm font-bold shadow-lg transition-all cursor-pointer active:scale-95 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse shadow-red-500/30 ring-4 ring-red-400/30'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20'
                }`}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span>{isRecording ? 'শুনছি... (থামাতে ক্লিক করুন)' : 'মাইক চেপে মুখে বলুন'}</span>
              </button>
            </div>

            {/* Mic Transcript & Accuracy Score */}
            {recordedTranscript && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left space-y-2">
                <div className="text-xs text-slate-400 font-bold uppercase">আপনি বলেছেন:</div>
                <div className="text-sm font-black text-slate-800 dark:text-white">
                  "{recordedTranscript}"
                </div>
                {speechMatchPercent !== null && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> নিখুঁততা স্কোর: {speechMatchPercent}%
                    </span>
                    <span className="text-xs font-semibold text-slate-400">(দারুণ চেষ্টা! +15 XP)</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: KANA (HIRAGANA & KATAKANA) */}
      {activeSubTab === 'kana' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setKanaType('hiragana');
                  setSelectedKana(HIRAGANA_DATA[0].chars[0]);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  kanaType === 'hiragana'
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                ひらがな (Hiragana - ৪৬টি)
              </button>
              <button
                onClick={() => {
                  setKanaType('katakana');
                  setSelectedKana(KATAKANA_DATA[0].chars[0]);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  kanaType === 'katakana'
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                カタカナ (Katakana - ৪৬টি)
              </button>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              {kanaType === 'hiragana'
                ? '💡 হিরাগানা হলো খাঁটি জাপানি শব্দের মূল বর্ণমালা।'
                : '💡 কাতাকানা সাধারণত বিদেশি বা ধার করা শব্দের ক্ষেত্রে ব্যবহৃত হয়।'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {(kanaType === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA).map((rowGroup) => (
                <div
                  key={rowGroup.row}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800/80 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      {rowGroup.rowNameBn}
                    </span>
                    <span className="text-[11px] text-slate-400">ক্লিক করে শব্দ শুনুন</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {rowGroup.chars.map((item) => {
                      const isSelected = selectedKana?.char === item.char;
                      return (
                        <button
                          key={item.char}
                          onClick={() => {
                            setSelectedKana(item);
                            handlePlayVoice(item.char, true);
                          }}
                          className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border transition-all transform active:scale-95 cursor-pointer ${
                            isSelected
                              ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-400/30 shadow-md'
                              : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800 hover:border-rose-300'
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white font-sans">
                            {item.char}
                          </span>
                          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">
                            {item.romaji}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {item.bangla}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Character Inspector */}
            <div className="space-y-4">
              {selectedKana ? (
                <div className="sticky top-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
                  <div className="text-center space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="inline-flex items-center justify-center h-28 w-28 rounded-3xl bg-linear-to-br from-rose-500 to-red-600 text-white text-6xl font-black shadow-lg shadow-rose-500/25">
                      {selectedKana.char}
                    </div>

                    <div className="pt-2">
                      <div className="text-xl font-black text-slate-800 dark:text-white">
                        উচ্চারণ: {selectedKana.romaji}
                      </div>
                      <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                        বাংলায়: {selectedKana.bangla}
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayVoice(selectedKana.char, true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 px-4 py-2 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all border border-rose-200 dark:border-rose-900/50 cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>উচ্চারণ শুনুন (Listen)</span>
                    </button>
                  </div>

                  {selectedKana.exampleWord && (
                    <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        সহজ উদাহরণমূলক শব্দ
                      </div>

                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-black text-slate-800 dark:text-white">
                            {selectedKana.exampleWord.jp}
                          </div>
                          <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                            {selectedKana.exampleWord.romaji} ({selectedKana.exampleWord.bangla})
                          </div>
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                            {selectedKana.exampleWord.meaning}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            handlePlayVoice(selectedKana.exampleWord!.jp.split(' ')[0], true)
                          }
                          className="h-9 w-9 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-white shadow-xs hover:text-rose-500 cursor-pointer"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-4 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      সহজ টিপস
                    </div>
                    <p className="leading-relaxed">
                      হিরাগানা ও কাতাকানা শেখার সবচেয়ে সহজ উপায় হলো উচ্চারণ শুনে খাতায় বড় করে ৩ বার লিখে নেওয়া। মাত্র ২-৩ দিন চর্চা করলেই সবগুলো বর্ণ আয়ত্ত হয়ে যায়!
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* TAB: VOCABULARY */}
      {activeSubTab === 'vocab' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  placeholder="জাপানি শব্দ, রোমাজি বা বাংলা অর্থ দিয়ে খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                মোট শব্দ: {filteredVocab.length} টি
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              {vocabCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVocabCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    vocabCategory === cat
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'All' ? 'সকল শব্দ' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVocab.map((vocab) => {
              const isSaved = savedVocabIds.includes(vocab.id);
              return (
                <div
                  key={vocab.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 hover:border-rose-400/60 dark:hover:border-rose-500/50 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                          {vocab.level}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {vocab.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleSaveVocab(vocab.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isSaved
                              ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                              : 'text-slate-400 hover:text-rose-500'
                          }`}
                          title="সংরক্ষণ করুন"
                        >
                          <Heart className={`h-4 w-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => handlePlayVoice(vocab.kanji, true)}
                          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-sans">
                        {vocab.kanji}
                      </div>
                      <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                        {vocab.hiragana} ({vocab.romaji})
                      </div>
                      <div className="text-base font-bold text-slate-800 dark:text-slate-100 mt-2">
                        {vocab.banglaMeaning}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1 text-xs">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {vocab.exampleJp}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 italic">
                        {vocab.exampleRomaji}
                      </div>
                      <div className="text-slate-600 dark:text-slate-300 font-medium">
                        বাংলা: {vocab.exampleBn}
                      </div>
                    </div>
                  </div>

                  {vocab.mnemonicsBn && (
                    <div className="mt-3 text-[11px] bg-amber-50/80 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300/90 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
                      💡 <strong>সহজ মনে রাখার উপায়:</strong> {vocab.mnemonicsBn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: GRAMMAR RULES & FORMULAS */}
      {activeSubTab === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              জাপানি মৌলিক ব্যাকরণ কাঠামো (JLPT N5 Grammar Patterns)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              জাপানি ভাষার বাক্য সাধারণত SOV (কর্তা + কর্ম + ক্রিয়া) কাঠামোর হয়ে থাকে। এখানে সহজে বুঝে নেওয়ার নিয়ম ও অনুশীলন কুইজ রয়েছে।
            </p>
          </div>

          <div className="space-y-6">
            {JAPANESE_GRAMMAR_LESSONS.map((lesson, idx) => {
              const quizSelected = selectedGrammarQuizAnswers[lesson.id];
              const isSubmitted = grammarQuizSubmitted[lesson.id];
              const isCorrect = quizSelected === lesson.practiceExercise.correctIndex;

              return (
                <div
                  key={lesson.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 text-xs font-bold mb-1.5">
                        নম্বর {idx + 1} • {lesson.level} লেভেল
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {lesson.pattern} ({lesson.romajiPattern})
                      </h3>
                      <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                        {lesson.titleBangla}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlayVoice(lesson.examples[0].japanese, true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>উদাহরণ শুনুন</span>
                    </button>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      সহজ সূত্র (Simple Formula)
                    </div>
                    <div className="text-base font-black text-rose-600 dark:text-rose-400 font-mono">
                      {lesson.formationFormula}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {lesson.keyRule}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lesson.explanationBangla}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      বাস্তব বাক্যের উদাহরণ (Real Examples)
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lesson.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 flex items-start justify-between gap-3"
                        >
                          <div className="space-y-0.5">
                            <div className="text-base font-black text-slate-900 dark:text-white">
                              {ex.japanese}
                            </div>
                            <div className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                              {ex.romaji}
                            </div>
                            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              বাংলা: {ex.bangla}
                            </div>
                            {ex.literalNotes && (
                              <div className="text-[11px] text-slate-400">
                                ভেঙে ভেঙে: {ex.literalNotes}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => handlePlayVoice(ex.japanese, true)}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practice Quiz */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-rose-50/50 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                        <HelpCircle className="h-4 w-4" />
                        <span>অনুশীলন কুইজ</span>
                      </div>

                      <div className="text-sm font-bold text-slate-800 dark:text-white">
                        {lesson.practiceExercise.questionBangla}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {lesson.practiceExercise.options.map((opt, optIdx) => {
                          const isOptSelected = quizSelected === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                setSelectedGrammarQuizAnswers((prev) => ({
                                  ...prev,
                                  [lesson.id]: optIdx,
                                }));
                              }}
                              className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                                isOptSelected
                                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          disabled={quizSelected === undefined}
                          onClick={() => {
                            setGrammarQuizSubmitted((prev) => ({ ...prev, [lesson.id]: true }));
                            if (quizSelected === lesson.practiceExercise.correctIndex && onAwardXP) {
                              onAwardXP(15, 'Solved Japanese Grammar Quiz');
                            }
                          }}
                          className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold disabled:opacity-40 hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
                        >
                          উত্তর যাচাই করুন
                        </button>

                        {isSubmitted && (
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            {isCorrect ? (
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4" /> সঠিক উত্তর! (+15 XP)
                              </span>
                            ) : (
                              <span className="text-red-500 flex items-center gap-1">
                                <XCircle className="h-4 w-4" /> ভুল হয়েছে, পুনরায় চেষ্টা করুন।
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {isSubmitted && (
                        <div className="text-xs text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                          <strong>ব্যাখ্যা:</strong> {lesson.practiceExercise.explanationBangla}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: REAL LIFE CONVERSATIONS */}
      {activeSubTab === 'conversations' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              বাস্তব জাপানি ডায়লগ ও কথোপকথন (Kaiwa Practice)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              জাপানে দৈনন্দিন পরিস্থিতিতে যেভাবে কথা বলা হয় — আত্মপরিচয়, দোকান ও রেস্তোরাঁর বাস্তব ডায়লগ।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {JAPANESE_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {conv.titleBangla}
                  </h3>
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                    {conv.title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    প্রেক্ষাপট: {conv.scenarioBangla}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <strong>জাপানি সংস্কৃতি ও শিষ্টাচার টিপ:</strong> {conv.culturalTipBangla}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {conv.dialogue.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md">
                            {line.speaker} ({line.speakerBangla})
                          </span>
                        </div>
                        <div className="text-base font-black text-slate-900 dark:text-white">
                          {line.japanese}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          রোমাজি: {line.romaji}
                        </div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          বাংলা: {line.bangla}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlayVoice(line.japanese, true)}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-rose-600 hover:shadow-xs transition-all shrink-0 cursor-pointer"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SURVIVAL EXPRESSIONS */}
      {activeSubTab === 'expressions' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              দৈনন্দিন জীবনের অপরিহার্য জাপানি অভিবাদন ও বাক্য (Aisatsu)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              খাবার খাওয়ার আগে ও পরে, কাজে যাওয়া ও ফেরার সময় প্রতিটি জাপানি নাগরিক এই বাক্যগুলো ব্যবহার করেন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JAPANESE_SURVIVAL_EXPRESSIONS.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-rose-400/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                      {item.politeness}
                    </span>
                    <button
                      onClick={() => handlePlayVoice(item.audioText, true)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {item.japanese}
                    </div>
                    <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                      {item.hiragana} ({item.romaji})
                    </div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-2">
                      {item.banglaMeaning}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  📍 <strong>কখন বলবেন:</strong> {item.situationBangla}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: NUMBERS & MONEY */}
      {activeSubTab === 'numbers' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              জাপানি গণনা ও টাকার হিসাব (Numbers & Japanese Yen)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              জাপানে শপিং, কেনাকাটা ও দাম জানতে সংখ্যা অত্যন্ত গুরুত্বপূর্ণ।
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {JAPANESE_NUMBERS_DATA.map((n) => (
              <button
                key={n.num}
                onClick={() => handlePlayVoice(n.kanji, true)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:border-rose-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-1 group cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-400 group-hover:text-rose-500">
                  {n.num}
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white font-sans">
                  {n.kanji}
                </div>
                <div className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {n.kana}
                </div>
                <div className="text-[11px] text-slate-500">
                  {n.romaji} ({n.bangla})
                </div>
              </button>
            ))}
          </div>

          {/* Quick Counter Info */}
          <div className="bg-linear-to-r from-rose-50 to-orange-50 dark:from-slate-900 dark:to-slate-800/80 p-5 rounded-3xl border border-rose-200/60 dark:border-slate-700/60 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-rose-500" />
              জাপানি মুদ্রার সহজ হিসাব
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600">১০০ ইয়েন (100円 - Hyaku-en)</span>
                <p className="text-slate-500 mt-0.5">প্রায় ৭০-৮০ টাকা (একটি কফি বা কনভিনি হালকা স্ন্যাকস)</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600">১,০০০ ইয়েন (1000円 - Sen-en)</span>
                <p className="text-slate-500 mt-0.5">১০০০ ইয়েনের নোট (এক বাটি সুস্বাদু রামেন বা লাঞ্চ মিল)</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600">১০,০০০ ইয়েন (10,000円 - Ichi-man-en)</span>
                <p className="text-slate-500 mt-0.5">সবচেয়ে বড় কাগজের নোট (জাপানি ভাষায় মান বা ১০ হাজার হিসাব)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default JapaneseSection;
