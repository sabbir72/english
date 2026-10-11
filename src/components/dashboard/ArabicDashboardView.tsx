import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  BookOpen,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Flame,
  Award,
  Globe2,
  Layers,
  Compass,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import {
  ARABIC_ALPHABET_DATA,
  ARABIC_VOCABULARY_LIST,
  ARABIC_STARTER_ROADMAP,
  ARABIC_CONVERSATIONS,
  ARABIC_GRAMMAR_LESSONS,
  ARABIC_NUMBERS_DATA,
  ArabicAlphabetChar,
} from '../../data/arabicLanguageData';
import { speakArabicText, stopSpeaking } from '../../utils/speech';
import { NavigationTab, UserProgress, UserProfile } from '../../types';

interface ArabicDashboardViewProps {
  progress: UserProgress;
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onAwardXP?: (amount: number, reason: string) => void;
}

export const ArabicDashboardView: React.FC<ArabicDashboardViewProps> = ({
  progress,
  profile,
  onNavigate,
  onAwardXP,
}) => {
  const [selectedChar, setSelectedChar] = useState<ArabicAlphabetChar>(ARABIC_ALPHABET_DATA[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  // Quick Quiz State for Arabic
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScoreAwarded, setQuizScoreAwarded] = useState(false);

  const dailyWord = {
    ar: 'شُكْرًا جَزِيلًا',
    trans: 'Shukran Jazeelan',
    bangla: 'শুকরান জাযিলান',
    meaning: 'আপনাকে অনেক ধন্যবাদ (Thank you very much)',
    exampleAr: 'شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكَ.',
    exampleBn: 'আপনার সাহায্যের জন্য অনেক ধন্যবাদ।',
  };

  const dailySentence = {
    ar: 'كَيْفَ حَالُكَ الْيَوْمَ؟',
    trans: 'Kaifa haaluka al-yawm?',
    bangla: 'কাইফা হালুকা আল-ইয়াওম?',
    meaning: 'আজ আপনি কেমন আছেন? (How are you today?)',
    replyAr: 'أَنَا بِخَيْرٍ، وَالْحَمْدُ لِلَّهِ.',
    replyBn: 'আলহামদুলিল্লাহ, আমি ভালো আছি।',
  };

  const quickQuiz = {
    questionAr: 'مَا مَعْنَى "كِتَابٌ"؟',
    questionBn: '"كِتَابٌ" (Kitaab) শব্দের সঠিক বাংলা অর্থ কোনটি?',
    options: ['কলম (Pen)', 'বই (Book)', 'বিদ্যালয় (School)', 'পানি (Water)'],
    correctIndex: 1,
    explanationBn: 'كِتَابٌ (কিতাব) অর্থ বই। কলম হলো قَلَمٌ (ক্বালাম), পানি হলো مَاءٌ (মা\')।',
  };

  const handlePlayAudio = (text: string, charKey?: string) => {
    stopSpeaking();
    if (charKey) setPlayingChar(charKey);
    setIsPlayingAudio(true);
    speakArabicText(text, 0.85, () => {
      setIsPlayingAudio(false);
      if (charKey) setPlayingChar(null);
    });
  };

  const handleSelectQuiz = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(index);
    setQuizSubmitted(true);
    if (index === quickQuiz.correctIndex && !quizScoreAwarded) {
      setQuizScoreAwarded(true);
      onAwardXP?.(15, 'সঠিক আরবি কুইজ উত্তর');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Arabic Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-6 top-6 text-7xl font-serif text-emerald-400/10 select-none pointer-events-none font-arabic">
          العربية
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
              <span className="text-base">🇸🇦</span>
              <span>আরবি ভাষা ড্যাশবোর্ড • اللغة العربية</span>
              <span className="rounded-md bg-emerald-500 px-1.5 py-0.2 text-[10px] font-black text-white">
                সক্রিয়
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center flex-wrap gap-2">
              <span>مَرْحَبًا بِكَ!</span>
              <span className="text-emerald-300 text-xl sm:text-2xl font-bold">
                (স্বাগতম) আরবি ভাষা একাডেমি
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-bangla">
              কোরআনের ভাষা ও মধ্যপ্রাচ্যের অন্যতম প্রভাবশালী ভাষা আরবি শিখুন শূন্য থেকে। বিশুদ্ধ হরফ উচ্চারণ, নিত্যপ্রয়োজনীয় শব্দভাণ্ডার এবং বাস্তব কথোপকথন।
            </p>

            {/* Quick Arabic Greeting Audios */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-emerald-200/80 font-bold">অভিবাদন শুনুন:</span>
              {[
                { ar: 'السَّلَامُ عَلَيْكُمْ', label: 'আসসালামু আলাইকুম' },
                { ar: 'مَرْحَبًا', label: 'মারহাবা (স্বাগতম)' },
                { ar: 'صَبَاحُ الْخَيْرِ', label: 'সাবাহুল খাইর' },
                { ar: 'شُكْرًا', label: 'শুকরান (ধন্যবাদ)' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlayAudio(item.ar)}
                  className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-emerald-600/60 px-3 py-1.5 text-xs text-white border border-white/10 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Volume2 className="h-3.5 w-3.5 text-emerald-300" />
                  <span className="font-arabic font-bold">{item.ar}</span>
                  <span className="text-[10px] text-emerald-200 hidden sm:inline">({item.label})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('arabic')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-400 transition-all cursor-pointer active:scale-95"
            >
              <Globe2 className="h-4 w-4" />
              <span>সম্পূর্ণ আরবি স্টুডিও খুলুন</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('arabic')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer backdrop-blur-md"
            >
              <BookOpen className="h-4 w-4 text-emerald-300" />
              <span>২৮টি বর্ণমালার চার্ট দেখুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Arabic 4 In-Depth Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-emerald-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 font-black text-lg">
              ح
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                ২৮টি হরফ
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                হরকত ও উচ্চারণ অডিওসহ
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-teal-100 bg-white p-4 shadow-xs dark:border-teal-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                {ARABIC_VOCABULARY_LIST.length}+ আরবি শব্দ
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                শ্রেণীবদ্ধ শব্দভাণ্ডার
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-xs dark:border-sky-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                {ARABIC_CONVERSATIONS.length}+ বাস্তব ডায়লগ
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                দৈনন্দিন কথপোকথন
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-xs dark:border-amber-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                সহজ ব্যাকরণ
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                নিয়ম ও বাক্যরীতি
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Arabic Alphabet Soundboard / Sampler */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                ح
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                আরবি বর্ণমালা সাউন্ডবোর্ড (Interactive Alphabet Audio)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              যেকোনো হরফে ক্লিক করে শুদ্ধ আরবি উচ্চারণ শুনুন ও বিস্তারিত রূপ দেখুন
            </p>
          </div>

          <button
            onClick={() => onNavigate('arabic')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <span>সবগুলো ২৮টি হরফ দেখুন</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Alphabet Buttons Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {ARABIC_ALPHABET_DATA.slice(0, 14).map((charItem) => {
            const isSelected = selectedChar.char === charItem.char;
            const isPlaying = playingChar === charItem.char;

            return (
              <button
                key={charItem.char}
                onClick={() => {
                  setSelectedChar(charItem);
                  handlePlayAudio(charItem.char, charItem.char);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 scale-105'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
              >
                <span className="text-2xl font-black font-arabic leading-none mb-1">
                  {charItem.char}
                </span>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {charItem.nameBn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Letter In-Depth Detail Card */}
        {selectedChar && (
          <div className="mt-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 shadow-sm text-3xl font-black font-arabic text-emerald-700 dark:text-emerald-400">
                {selectedChar.char}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {selectedChar.nameAr} ({selectedChar.nameBn})
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                    ধ্বনি: {selectedChar.banglaSound}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  উদাহরণ শব্দ:{' '}
                  <span className="font-arabic font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                    {selectedChar.exampleWord.ar}
                  </span>{' '}
                  ({selectedChar.exampleWord.trans}) = <span className="font-bold">{selectedChar.exampleWord.meaningBn}</span>
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>আলাদা: <b className="font-arabic">{selectedChar.isolated}</b></span>
                  <span>শুরুতে: <b className="font-arabic">{selectedChar.initial}</b></span>
                  <span>মাঝে: <b className="font-arabic">{selectedChar.medial}</b></span>
                  <span>শেষে: <b className="font-arabic">{selectedChar.final}</b></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(selectedChar.char)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer shrink-0"
            >
              <Volume2 className="h-4 w-4" />
              <span>উচ্চারণ শুনুন</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Today's Arabic Spotlight (Daily Word, Sentence & 1-Click Quiz) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Daily Word & Daily Dialogue */}
        <div className="lg:col-span-7 space-y-4">
          {/* Word of the Day */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  আজকের নির্বাচিত আরবি শব্দ (Word of the Day)
                </span>
              </div>
              <button
                onClick={() => handlePlayAudio(dailyWord.ar)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-200 transition-all cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>অডিও</span>
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-3xl font-black font-arabic text-emerald-700 dark:text-emerald-400 block">
                  {dailyWord.ar}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                  উচ্চারণ: {dailyWord.bangla} ({dailyWord.trans})
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5">
                  অর্থ: <b className="text-slate-900 dark:text-white">{dailyWord.meaning}</b>
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  বাক্যে প্রয়োগ:
                </span>
                <span className="font-arabic text-sm block font-bold text-slate-900 dark:text-white">
                  {dailyWord.exampleAr}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  {dailyWord.exampleBn}
                </span>
              </div>
            </div>
          </div>

          {/* Sentence of the Day */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-teal-500" />
                <span className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  আজকের দরকারি আরবি কথোপকথন (Daily Sentence)
                </span>
              </div>
              <button
                onClick={() => handlePlayAudio(dailySentence.ar)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 text-xs font-bold hover:bg-teal-200 transition-all cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>শুনুন</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                    প্রশ্ন বা বাক্য:
                  </span>
                  <button
                    onClick={() => handlePlayAudio(dailySentence.ar)}
                    className="text-teal-600 hover:text-teal-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="text-xl font-black font-arabic text-slate-900 dark:text-white mt-1">
                  {dailySentence.ar}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  <b>{dailySentence.bangla}</b> • {dailySentence.meaning}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    উত্তর বা পাল্টা কথা:
                  </span>
                  <button
                    onClick={() => handlePlayAudio(dailySentence.replyAr)}
                    className="text-emerald-600 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="text-lg font-black font-arabic text-emerald-800 dark:text-emerald-300 mt-1">
                  {dailySentence.replyAr}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {dailySentence.replyBn}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Interactive Quiz & Starter Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Arabic Quiz Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  ১-মিনিট আরবি কুইজ (Instant Quiz)
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                +15 XP
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm font-bold text-slate-900 dark:text-white font-bangla">
                {quickQuiz.questionBn}
              </p>

              <div className="mt-3 space-y-2">
                {quickQuiz.options.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  const isCorrect = idx === quickQuiz.correctIndex;

                  let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-emerald-400 text-slate-800 dark:text-slate-200';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuiz(idx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-3 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      )}
                      {quizSubmitted && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="mt-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold block mb-0.5 text-slate-900 dark:text-white">
                    ব্যাখ্যা:
                  </span>
                  {quickQuiz.explanationBn}
                </div>
              )}
            </div>
          </div>

          {/* 1-Minute Arabic Starter Guide Card */}
          <div className="rounded-3xl border border-emerald-200/80 bg-linear-to-br from-emerald-50/70 to-teal-50/70 dark:border-emerald-800/40 dark:from-emerald-950/30 dark:to-teal-950/30 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                নতুনদের জন্য ৩-ধাপের শুরু
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              আরবি শেখার সবচেয়ে সহজ রোডম্যাপ:
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                  ১
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  ২৮টি হরফের সঠিক মাখরাজ ও উচ্চারণ শুনুন
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white font-bold text-[10px]">
                  ২
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  দৈনন্দিন ৫০টি দরকারি শব্দভাণ্ডার আয়ত্ত করুন
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                  ৩
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  সহজ অভিবাদন ও নিত্যদিনের কথোপকথন চর্চা করুন
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('arabic')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <span>বিস্তারিত গাইড দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Core Arabic Module Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              আরবি লার্নিং মডিউলসমূহ (Core Modules)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              যে অংশে প্রবেশ করতে চান সরাসরি ক্লিক করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Module 1: Alphabet */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-2xl font-black font-arabic">
                أ
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                ২৮ হরফ
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              আরবি বর্ণমালা স্টুডিও
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              আলাদা, শুরুতে, মাঝে ও শেষে প্রতিটি অক্ষরের রূপভেদ এবং খাঁটি কণ্ঠের উচ্চারণ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>অনুশীলন করুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 2: Vocabulary */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                ৭০+ শব্দ
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              নিত্যপ্রয়োজনীয় শব্দভাণ্ডার
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              খাবার, পরিবার, গৃহস্থালী, পেশা ও ভ্রমণ বিষয়ক প্রয়োজনীয় সব শব্দ ও অর্থ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>শব্দভাণ্ডার দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 3: Conversations */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                বাস্তব সংলাপ
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              দৈনন্দিন আরবি কথপোকথন
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              অভিবাদন, বিমানবন্দরে কথা বলা, হোটেলে রুম বুকিং ও বাজারে কেনাকাটার ডায়লগ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
              <span>সংলাপ চর্চা করুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 4: Grammar */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
                <Layers className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                সহজ ব্যাকরণ
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              হরকত ও ব্যাকরণ নিয়ম
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              যবর, যের, পেশ (الحركات), সর্বনাম (الضمائر) ও জুমলাহ ইসমিয়াহ সহজে বাংলায় বুঝুন।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>নিয়মাবলি পড়ুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 5: Numbers */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-xl font-black font-arabic">
                ١ ٢ ٣
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                গণনা
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              আরবি গণনা ও সংখ্যা
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              ১ থেকে ১০০ পর্যন্ত আরবি সংখ্যা ও আরকাম (الأرقام) অডিও ও বাংলা উচ্চারণসহ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>গণনা শিখুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 6: Quranic Explorer */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                কোরআনিক আরবি
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              কোরআনিক শব্দার্থ ও সুরা স্টুডিও
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              সুরা আল-ফাতিহা শব্দে শব্দে বিশ্লেষণ, ব্যাকরণ প্রকার এবং বহুল ব্যবহৃত কোরআনিক মূলধাতু (রুট)।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>কোরআন শব্দার্থ পড়ুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 7: Shadowing & Expat */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                <Sparkles className="h-6 w-6 text-teal-500" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                শ্যাডোয়িং ও প্রবাস
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              স্পোকেন শ্যাডোয়িং ও প্রবাস গাইড
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              মাইকে মুখে উচ্চারণ পরীক্ষা এবং সৌদি আরব/দুবাই বিমানবন্দর, ট্যাক্সি ও ডাক্তারের বাস্তব সংলাপ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>শ্যাডোয়িং শুরু করুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 8: Full Hub */}
          <div
            onClick={() => onNavigate('arabic')}
            className="group rounded-3xl border border-emerald-300 dark:border-emerald-800 bg-linear-to-br from-emerald-600 to-teal-700 p-5 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Globe2 className="h-8 w-8 text-emerald-200" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                  সম্পূর্ণ স্টুডিও
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                সম্পূর্ণ আরবি একাডেমি
              </h3>
              <p className="text-xs text-emerald-100 mt-1">
                সবগুলো মডিউল, ফিল্টার, সেভ করা শব্দ ও কুইজ একসাথে অনুশীলন করতে প্রবেশ করুন।
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-black text-white group-hover:translate-x-1 transition-transform">
              <span>স্টুডিও ওপেন করুন</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
