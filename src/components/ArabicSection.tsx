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
  Zap,
  Lightbulb,
  Check,
  Headphones,
  Gauge,
  Bookmark,
  Heart,
  Mic,
  MicOff,
  ArrowRight,
  RotateCcw,
  BookMarked,
  Play,
} from 'lucide-react';
import {
  ARABIC_STARTER_ROADMAP,
  ARABIC_ALPHABET_DATA,
  ARABIC_VOCABULARY_LIST,
  ARABIC_GRAMMAR_LESSONS,
  ARABIC_CONVERSATIONS,
  ARABIC_NUMBERS_DATA,
  ARABIC_QURANIC_WORDS,
  ARABIC_QURAN_VERSES,
  ARABIC_SHADOWING_SENTENCES,
  ARABIC_EXPAT_SITUATIONS,
  ArabicAlphabetChar,
} from '../data/arabicLanguageData';
import {
  speakArabicText,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
} from '../utils/speech';

interface ArabicSectionProps {
  onAwardXP?: (amount: number, reason: string) => void;
  onNavigateHome?: () => void;
}

export type ArabicSubTab =
  | 'starter'
  | 'shadowing'
  | 'quranic'
  | 'situational'
  | 'alphabet'
  | 'vocab'
  | 'grammar'
  | 'dialogue'
  | 'numbers';

export const ArabicSection: React.FC<ArabicSectionProps> = ({
  onAwardXP,
  onNavigateHome,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ArabicSubTab>('starter');
  const [selectedChar, setSelectedChar] = useState<ArabicAlphabetChar>(ARABIC_ALPHABET_DATA[0]);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85);

  // Search & Filter
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabCategory, setVocabCategory] = useState('All');
  const [savedVocabIds, setSavedVocabIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('saved_arabic_vocab') || '[]');
    } catch {
      return [];
    }
  });

  // Quiz State
  const [grammarQuizSelected, setGrammarQuizSelected] = useState<Record<string, number>>({});
  const [grammarQuizSubmitted, setGrammarQuizSubmitted] = useState<Record<string, boolean>>({});

  // Shadowing & Mic State
  const [activeShadowingIndex, setActiveShadowingIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTranscript, setRecordedTranscript] = useState('');
  const [micMatchFeedback, setMicMatchFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Quranic Verse State
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);

  // Expat Situations State
  const [selectedExpatIndex, setSelectedExpatIndex] = useState(0);

  const handlePlayVoice = (text: string, xpReward: boolean = false) => {
    speakArabicText(text, audioSpeed);
    if (xpReward && onAwardXP) {
      onAwardXP(3, 'Arabic pronunciation practice');
    }
  };

  const handleStartRecording = (targetArabic: string) => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    setRecordedTranscript('');
    setMicMatchFeedback(null);
    setIsRecording(true);

    const rec = startSpeechRecognition(
      (payload) => {
        setRecordedTranscript(payload.transcript);
        if (payload.isFinal) {
          setIsRecording(false);
          setMicMatchFeedback('মাশাআল্লাহ! আপনি চমৎকারভাবে আরবি বাক্যটি উচ্চারণ করেছেন!');
          if (onAwardXP) {
            onAwardXP(20, 'Arabic Shadowing Mic Practice');
          }
        }
      },
      (error) => {
        setIsRecording(false);
        setMicMatchFeedback(`মাইক্রোফোন বার্তা: ${error}`);
      },
      () => {
        setIsRecording(false);
      },
      'ar-SA'
    );

    recognitionRef.current = rec;
  };

  const toggleSaveVocab = (id: string) => {
    setSavedVocabIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('saved_arabic_vocab', JSON.stringify(next));
      return next;
    });
  };

  const vocabCategories = useMemo(() => {
    const cats = new Set(ARABIC_VOCABULARY_LIST.map((v) => v.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredVocab = useMemo(() => {
    return ARABIC_VOCABULARY_LIST.filter((v) => {
      const matchesCat = vocabCategory === 'All' || v.category === vocabCategory;
      const q = vocabSearch.toLowerCase().trim();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (v.arabic.includes(q) ||
          v.transliteration.toLowerCase().includes(q) ||
          v.banglaMeaning.toLowerCase().includes(q))
      );
    });
  }, [vocabSearch, vocabCategory]);

  return (
    <div className="space-y-6 pb-20 animate-fade-in" dir="ltr">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 via-teal-700 to-amber-600 p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/15">
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-4 translate-y-4 opacity-15 text-8xl font-black select-none pointer-events-none font-serif" dir="rtl">
          العربية
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-3 border border-white/20">
            <span className="text-base">🇸🇦</span>
            <span>আরবি ভাষা শিক্ষা কেন্দ্র (Arabic Language Studio - العربية)</span>
            <span className="rounded-full bg-amber-400 text-slate-900 px-2 py-0.2 text-[10px] font-black uppercase">
              নতুন সেকশন
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-xs">
            সহজ বাংলায় আরবি ভাষা (Al-Arabiyyah) শিখুন
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-50 font-normal leading-relaxed">
            ২৮টি হরফ বা বর্ণমালা, দৈনন্দিন স্পোকেন শব্দ, বাস্তব জীবনের কথোপকথন ও ব্যাকরণ — খাঁটি আরবি অডিও উচ্চারণসহ।
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveSubTab('starter')}
              className="flex items-center gap-2 rounded-xl bg-white text-emerald-800 px-4 py-2 text-xs sm:text-sm font-black shadow-md hover:bg-emerald-50 transition-all cursor-pointer active:scale-95"
            >
              <Zap className="h-4 w-4 fill-emerald-600 text-emerald-600" />
              <span>১ মিনিটে শুরু করুন</span>
            </button>

            <button
              onClick={() => setActiveSubTab('shadowing')}
              className="flex items-center gap-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs sm:text-sm font-bold border border-emerald-500/30 transition-all cursor-pointer"
            >
              <Mic className="h-4 w-4 text-emerald-200" />
              <span>🎙️ শ্যাডোয়িং ল্যাব</span>
            </button>

            <button
              onClick={() => setActiveSubTab('quranic')}
              className="flex items-center gap-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs sm:text-sm font-bold border border-emerald-500/30 transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-amber-300" />
              <span>📖 কোরআনিক শব্দার্থ</span>
            </button>

            {/* Audio Speed Selector */}
            <div className="flex items-center gap-1.5 rounded-xl bg-black/25 backdrop-blur-md px-3 py-1.5 text-xs font-medium border border-white/15">
              <Gauge className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-emerald-100">উচ্চারণ গতি:</span>
              <button
                onClick={() => setAudioSpeed(0.75)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  audioSpeed === 0.75 ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                ধীর (0.75x)
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
          { id: 'starter', label: '⭐ ১ মিনিটের শুরু', icon: Zap },
          { id: 'shadowing', label: '🎙️ অডিও শ্যাডোয়িং (Shadowing)', icon: Mic },
          { id: 'quranic', label: '📖 কোরআনিক শব্দার্থ (Quranic)', icon: BookOpen },
          { id: 'situational', label: '✈️ প্রবাস ও ভ্রমণ গাইড (Expat)', icon: Globe2 },
          { id: 'alphabet', label: '২৮ হরফ (Alphabet)', icon: Layers },
          { id: 'vocab', label: 'শব্দভাণ্ডার (Vocab)', icon: Compass },
          { id: 'grammar', label: 'সহজ ব্যাকরণ (Grammar)', icon: Sparkles },
          { id: 'dialogue', label: 'কথোপকথন (Dialogue)', icon: MessageSquare },
          { id: 'numbers', label: 'সংখ্যা ও রিয়াল (Numbers)', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as ArabicSubTab)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-850'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
              <div>{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* TAB 1: 1-MINUTE ARABIC STARTER */}
      {activeSubTab === 'starter' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 sm:p-5 rounded-3xl border border-emerald-200/70 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block text-sm sm:text-base font-bold text-emerald-950 dark:text-emerald-100 mb-0.5">
                আরবি ভাষায় কথা বলা কতটা সহজ?
              </strong>
              আরবি একটি ধ্বনিসমৃদ্ধ ও সুশৃঙ্খল ভাষা। মাত্র ৪টি প্রয়োজনীয় অভিবাদন ও বাক্য দিয়ে আপনি এখনই আরবদের সাথে বা প্রবাসে কথোপকথন শুরু করে দিতে পারেন:
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARABIC_STARTER_ROADMAP.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-xs font-black">
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
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-serif" dir="rtl">
                      {step.quickPhrase.ar}
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      উচ্চারণ: {step.quickPhrase.bangla} ({step.quickPhrase.trans})
                    </div>
                    <div className="text-xs font-medium text-slate-700 dark:text-slate-300 pt-1">
                      অর্থ: {step.quickPhrase.meaning}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handlePlayVoice(step.quickPhrase.ar, true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-3.5 py-2 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all border border-emerald-200/60 dark:border-emerald-900/40 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>উচ্চারণ শুনুন (+3 XP)</span>
                  </button>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> সহজ পদ্ধতি
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ARABIC SHADOWING & SPEAKING LAB */}
      {activeSubTab === 'shadowing' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 sm:p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold mb-1.5">
                <Mic className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
                <span>আরবি স্পোকেন ও শ্যাডোয়িং ল্যাব (Arabic Speech Lab)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                নেটিভ কণ্ঠে শুনুন এবং সাথে সাথে মুখে বলুন
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                শ্যাডোয়িং (Shadowing) হলো দ্রুত নির্ভুল উচ্চারণ ও জিহ্বার জড়তা দূর করার সর্বাধুনিক বৈজ্ঞানিক পদ্ধতি।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 shadow-xs">
                {activeShadowingIndex + 1} / {ARABIC_SHADOWING_SENTENCES.length} বাক্য
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Shadowing Sentence List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                অনুশীলনের বাক্যসমূহ ({ARABIC_SHADOWING_SENTENCES.length})
              </h3>
              {ARABIC_SHADOWING_SENTENCES.map((item, idx) => {
                const isSelected = activeShadowingIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveShadowingIndex(idx);
                      setRecordedTranscript('');
                      setMicMatchFeedback(null);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-white truncate font-serif" dir="rtl">
                        {item.arabic}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {item.banglaMeaning}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayVoice(item.arabic, true);
                      }}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-100 transition-all cursor-pointer shrink-0"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Active Interactive Shadowing Card */}
            <div className="lg:col-span-2 space-y-4">
              {(() => {
                const cur = ARABIC_SHADOWING_SENTENCES[activeShadowingIndex];
                return (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-500">
                          লাইভ উচ্চারণ ও শ্যাডোয়িং বক্স
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const next = (activeShadowingIndex + 1) % ARABIC_SHADOWING_SENTENCES.length;
                          setActiveShadowingIndex(next);
                          setRecordedTranscript('');
                          setMicMatchFeedback(null);
                        }}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                      >
                        পরবর্তী বাক্য <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Arabic Text Highlight Box */}
                    <div className="text-center p-6 sm:p-8 rounded-3xl bg-linear-to-b from-emerald-50/50 to-slate-50 dark:from-emerald-950/20 dark:to-slate-850 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
                      <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif leading-loose" dir="rtl">
                        {cur.arabic}
                      </div>
                      <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        উচ্চারণ: {cur.banglaSound}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        ইরাব ও লিপ্যন্তর: {cur.transliteration}
                      </div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                        অর্থ: {cur.banglaMeaning}
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => handlePlayVoice(cur.arabic, true)}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer active:scale-95"
                      >
                        <Volume2 className="h-5 w-5" />
                        <span>১. আরবি অডিও শুনুন</span>
                      </button>

                      <button
                        onClick={() => handleStartRecording(cur.arabic)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95 ${
                          isRecording
                            ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                            : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                        }`}
                      >
                        {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        <span>{isRecording ? 'রেকর্ডিং থামান' : '২. মুখে উচ্চারণ করুন (Mic)'}</span>
                      </button>
                    </div>

                    {/* Mic Feedback Box */}
                    {isRecording && (
                      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-center space-y-1 text-rose-800 dark:text-rose-200 animate-pulse">
                        <div className="text-xs font-bold">🎤 আপনার ভয়েস শোনা হচ্ছে... আরবিতে বাক্যটি বলুন!</div>
                        {recordedTranscript && (
                          <div className="text-sm font-black font-serif mt-1" dir="rtl">{recordedTranscript}</div>
                        )}
                      </div>
                    )}

                    {micMatchFeedback && !isRecording && (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          <span>{micMatchFeedback}</span>
                        </div>
                        {recordedTranscript && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            আপনার উচ্চারিত শব্দ: &ldquo;{recordedTranscript}&rdquo;
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
                      <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>শ্যাডোয়িং টিপ:</strong> প্রথমে অডিওটি ২-৩ বার শুনুন। এরপর অডিও চলার সাথে সাথেই আপনার জিহ্বা ও ঠোঁট নাড়িয়ে একই গতিতে উচ্চারণ করুন। এটি জিহ্বার জড়তা দূর করতে ম্যাজিকের মতো কাজ করে।
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB: QURANIC WORDS & SURAH EXPLORER */}
      {activeSubTab === 'quranic' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold mb-1.5">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
                <span>কোরআনিক শব্দার্থ ও ব্যাকরণ বিশ্লেষণ (Quranic Word Study)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                সুরা শব্দে শব্দে বিশ্লেষণ ও বহুল ব্যবহৃত কোরআনিক মূলধাতু
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                প্রতিটি শব্দের মূল ধাতু (রুট), অর্থ ও গ্রামার টাইপ বুঝে কোরআন পাঠকে অর্থবহ ও হৃদয়গ্রাহী করে তুলুন।
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200 shadow-xs">
              সুরা আল-ফাতিহা শব্দে শব্দে
            </div>
          </div>

          {/* 1. Surah Al-Fatiha Deep Dive */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>সুরা আল-ফাতিহা — আয়াতভিত্তিক শব্দ বিশ্লেষণ</span>
              </h3>
              <div className="flex items-center gap-2">
                {ARABIC_QURAN_VERSES.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVerseIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedVerseIndex === idx
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    আয়াত {v.ayahNumber}
                  </button>
                ))}
              </div>
            </div>

            {(() => {
              const verse = ARABIC_QURAN_VERSES[selectedVerseIndex];
              return (
                <div className="space-y-6">
                  {/* Full Ayah Banner */}
                  <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        {verse.surahNameBn} • আয়াত নং {verse.ayahNumber}
                      </span>
                      <button
                        onClick={() => handlePlayVoice(verse.fullVerseAr, true)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                      >
                        <Volume2 className="h-3.5 w-3.5 text-emerald-300" />
                        <span>পুরো আয়াত শুনুন</span>
                      </button>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black font-serif text-right leading-relaxed" dir="rtl">
                      {verse.fullVerseAr}
                    </div>
                    <div className="text-sm text-emerald-100/90 font-bangla border-t border-white/15 pt-2">
                      অনুবাদ: {verse.fullVerseBn}
                    </div>
                    <div className="text-xs text-emerald-200/80 font-medium">
                      সারসংক্ষেপ: {verse.tafsirSummaryBn}
                    </div>
                  </div>

                  {/* Word-by-Word Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      প্রতিটি শব্দের আলাদা বিশ্লেষণ ({verse.words.length}টি শব্দ)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3" dir="rtl">
                      {verse.words.map((w, wIdx) => (
                        <div
                          key={wIdx}
                          onClick={() => handlePlayVoice(w.arabic, true)}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-400 hover:shadow-md transition-all text-center flex flex-col justify-between cursor-pointer group"
                        >
                          <div>
                            <div className="text-2xl font-black font-serif text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                              {w.arabic}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5" dir="ltr">
                              {w.transliteration}
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700" dir="ltr">
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {w.banglaMeaning}
                            </div>
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                              {w.grammarTypeBn}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 2. High-Frequency Quranic Root Words */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>বহুল ব্যবহৃত কোরআনিক শব্দার্থ ও মূল ধাতু (Root Words)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ARABIC_QURANIC_WORDS.map((qw) => (
                <div
                  key={qw.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        কোরআনে {qw.quranFrequency} বার
                      </span>
                      <button
                        onClick={() => handlePlayVoice(qw.arabic, true)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-2xl font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                      {qw.arabic}
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {qw.banglaMeaning} ({qw.transliteration})
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      মূল ধাতু: <strong>{qw.rootWord}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {qw.rootMeaningBn}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="font-serif text-slate-800 dark:text-slate-200 text-sm font-bold" dir="rtl">
                      {qw.exampleAyahAr}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {qw.surahReference}: &ldquo;{qw.exampleAyahBn}&rdquo;
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: EXPAT & SURVIVAL SITUATIONS */}
      {activeSubTab === 'situational' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold mb-1.5">
                <Globe2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
                <span>প্রবাস ও আরব দেশে বাস্তব কথোপকথন (Expat Survival)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                সৌদি আরব ও মধ্যপ্রাচ্য প্রবাসীদের জন্য বাস্তব কথোপকথন
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                বিমানবন্দর, ট্যাক্সি, ডাক্তার, ফার্মেসি ও কর্মক্ষেত্রে প্রয়োজনীয় আরবি ডায়ালগসমূহ।
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {ARABIC_EXPAT_SITUATIONS.map((sit, idx) => (
                <button
                  key={sit.id}
                  onClick={() => setSelectedExpatIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedExpatIndex === idx
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {sit.locationTag}
                </button>
              ))}
            </div>
          </div>

          {(() => {
            const expat = ARABIC_EXPAT_SITUATIONS[selectedExpatIndex];
            return (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {expat.titleBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {expat.situationContextBn}
                  </p>
                </div>

                <div className="space-y-3">
                  {expat.phrases.map((ph, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-emerald-300 transition-all"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                            {ph.speaker}
                          </span>
                        </div>
                        <div className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                          {ph.ar}
                        </div>
                        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          উচ্চারণ: {ph.trans}
                        </div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          বাংলা অর্থ: {ph.bangla}
                        </div>
                        {ph.tipsBn && (
                          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium pt-1">
                            💡 {ph.tipsBn}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handlePlayVoice(ph.ar, true)}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 hover:bg-emerald-50 transition-all cursor-pointer shadow-xs shrink-0"
                      >
                        <Volume2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: ALPHABET (২৮ হরফ) */}
      {activeSubTab === 'alphabet' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white">
                আরবি ২৮টি হরফ (Arabic Alphabet)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                প্রতিটি বর্ণ ডান থেকে বামে লিখা হয়। বর্ণে ক্লিক করে চার রূপ ও উচ্চারণ শুনুন।
              </p>
            </div>
            <div className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              ২৮টি হরফ
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 28 Letters Grid */}
            <div className="lg:col-span-2 grid grid-cols-4 sm:grid-cols-7 gap-2.5">
              {ARABIC_ALPHABET_DATA.map((item) => {
                const isSelected = selectedChar.char === item.char;
                return (
                  <button
                    key={item.char}
                    onClick={() => {
                      setSelectedChar(item);
                      handlePlayVoice(item.char, true);
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-400/30 shadow-md'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="text-3xl font-black font-serif text-slate-900 dark:text-white">
                      {item.char}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      {item.nameBn}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.transliteration}</span>
                  </button>
                );
              })}
            </div>

            {/* Letter Detail Card */}
            <div className="space-y-4">
              <div className="sticky top-6 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-center">
                <div className="h-28 w-28 mx-auto rounded-3xl bg-linear-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-6xl font-black font-serif shadow-lg shadow-emerald-600/30">
                  {selectedChar.char}
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    হরফ: {selectedChar.nameBn} ({selectedChar.nameAr})
                  </h3>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    উচ্চারণ ধ্বনি: {selectedChar.banglaSound}
                  </div>
                </div>

                <button
                  onClick={() => handlePlayVoice(selectedChar.char, true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>হরফের উচ্চারণ শুনুন</span>
                </button>

                {/* 4 Forms table */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-slate-400 uppercase text-[10px]">
                    শব্দে হরফের ৪টি রূপ (Forms)
                  </div>
                  <div className="grid grid-cols-4 gap-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl text-center">
                    <div>
                      <div className="text-[10px] text-slate-400">শেষ রূপ</div>
                      <div className="text-lg font-serif font-black">{selectedChar.final}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">মধ্য রূপ</div>
                      <div className="text-lg font-serif font-black">{selectedChar.medial}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">শুরুর রূপ</div>
                      <div className="text-lg font-serif font-black">{selectedChar.initial}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">একাকী</div>
                      <div className="text-lg font-serif font-black">{selectedChar.isolated}</div>
                    </div>
                  </div>
                </div>

                {/* Example word */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                      {selectedChar.exampleWord.ar}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {selectedChar.exampleWord.trans} - {selectedChar.exampleWord.meaningBn}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayVoice(selectedChar.exampleWord.ar, true)}
                    className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-emerald-600 cursor-pointer"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VOCABULARY */}
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
                  placeholder="আরবি শব্দ, উচ্চারণ বা বাংলা অর্থ দিয়ে খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
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
                      ? 'bg-emerald-600 text-white shadow-xs'
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
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
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
                              ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50'
                              : 'text-slate-400 hover:text-emerald-600'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
                        </button>
                        <button
                          onClick={() => handlePlayVoice(vocab.arabic, true)}
                          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-3xl font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                        {vocab.arabic}
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        উচ্চারণ: {vocab.transliteration}
                      </div>
                      <div className="text-base font-bold text-slate-800 dark:text-slate-100 mt-2">
                        অর্থ: {vocab.banglaMeaning}
                      </div>
                    </div>

                    {/* Example sentence */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                      <div className="font-bold text-slate-900 dark:text-slate-200 font-serif text-sm" dir="rtl">
                        {vocab.exampleAr}
                      </div>
                      <div className="text-slate-500 italic">{vocab.exampleTrans}</div>
                      <div className="text-slate-600 dark:text-slate-300 font-medium">
                        বাংলা: {vocab.exampleBn}
                      </div>
                    </div>
                  </div>

                  {vocab.noteBn && (
                    <div className="mt-3 text-[11px] bg-amber-50/80 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
                      💡 <strong>নোট:</strong> {vocab.noteBn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: GRAMMAR LESSONS */}
      {activeSubTab === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              আরবি সহজ ব্যাকরণ নিয়ম (Arabic Grammar Essentials)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              সহজে বাক্য তৈরির কাঠামো ও অনুশীলন কুইজ।
            </p>
          </div>

          <div className="space-y-6">
            {ARABIC_GRAMMAR_LESSONS.map((lesson) => {
              const quizSelected = grammarQuizSelected[lesson.id];
              const isSubmitted = grammarQuizSubmitted[lesson.id];
              const isCorrect = quizSelected === lesson.quiz.correctIndex;

              return (
                <div
                  key={lesson.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <h3 className="text-xl font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                        {lesson.ruleTitleAr}
                      </h3>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {lesson.ruleTitleBn}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlayVoice(lesson.examples[0].ar, true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>উদাহরণ শুনুন</span>
                    </button>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      সহজ সূত্র (Formula)
                    </div>
                    <div className="text-sm font-black text-emerald-700 dark:text-emerald-400">
                      {lesson.formulaBn}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lesson.explanationBn}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lesson.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="text-xl font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                            {ex.ar}
                          </div>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            {ex.trans}
                          </div>
                          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            বাংলা: {ex.meaningBn}
                          </div>
                          {ex.breakdownBn && (
                            <div className="text-[11px] text-slate-400">{ex.breakdownBn}</div>
                          )}
                        </div>

                        <button
                          onClick={() => handlePlayVoice(ex.ar, true)}
                          className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Quiz */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <HelpCircle className="h-4 w-4" />
                        <span>অনুশীলন কুইজ</span>
                      </div>

                      <div className="text-sm font-bold text-slate-800 dark:text-white">
                        {lesson.quiz.questionBn}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {lesson.quiz.optionsBn.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setGrammarQuizSelected((prev) => ({ ...prev, [lesson.id]: oIdx }));
                            }}
                            className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                              quizSelected === oIdx
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          disabled={quizSelected === undefined}
                          onClick={() => {
                            setGrammarQuizSubmitted((prev) => ({ ...prev, [lesson.id]: true }));
                            if (quizSelected === lesson.quiz.correctIndex && onAwardXP) {
                              onAwardXP(15, 'Solved Arabic Grammar Quiz');
                            }
                          }}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold disabled:opacity-40 hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          উত্তর যাচাই করুন
                        </button>

                        {isSubmitted && (
                          <div className="text-xs font-bold">
                            {isCorrect ? (
                              <span className="text-emerald-600 flex items-center gap-1">
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: SPOKEN DIALOGUE */}
      {activeSubTab === 'dialogue' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              বাস্তব আরবি কথোপকথন (Real-life Spoken Arabic)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              আরব দেশসমূহে দৈনন্দিন জীবন ও প্রবাসীদের জন্য অতিপ্রয়োজনীয় কথোপকথন।
            </p>
          </div>

          <div className="space-y-6">
            {ARABIC_CONVERSATIONS.map((conv) => (
              <div
                key={conv.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {conv.titleBn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    প্রেক্ষাপট: {conv.scenarioBn}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                  💡 <strong>আরব শিষ্টাচার টিপ:</strong> {conv.culturalNoteBn}
                </div>

                <div className="space-y-3 pt-2">
                  {conv.dialogue.map((line, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                          {line.speaker}
                        </span>
                        <div className="text-xl font-black font-serif text-slate-900 dark:text-white" dir="rtl">
                          {line.arabic}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          উচ্চারণ: {line.transliteration}
                        </div>
                        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          বাংলা: {line.bangla}
                        </div>
                      </div>

                      <button
                        onClick={() => handlePlayVoice(line.arabic, true)}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-emerald-600 cursor-pointer"
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

      {/* TAB 6: NUMBERS */}
      {activeSubTab === 'numbers' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-black text-slate-800 dark:text-white">
              আরবি সংখ্যা ও গণনা (Arabic Numerals & Counting)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              আরব দেশে শপিং, কেনাকাটা ও দাম জানতে সংখ্যা অত্যন্ত গুরুত্বপূর্ণ।
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ARABIC_NUMBERS_DATA.map((n) => (
              <button
                key={n.num}
                onClick={() => handlePlayVoice(n.arabicWord, true)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-1 cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-400">{n.num}</div>
                <div className="text-3xl font-black font-serif text-slate-900 dark:text-white">
                  {n.arabicNum}
                </div>
                <div className="text-sm font-black font-serif text-emerald-700 dark:text-emerald-400">
                  {n.arabicWord}
                </div>
                <div className="text-xs text-slate-500">{n.banglaSound}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ArabicSection;
