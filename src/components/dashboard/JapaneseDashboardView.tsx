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
  Headphones,
  Mic,
  Zap,
} from 'lucide-react';
import {
  HIRAGANA_DATA,
  KATAKANA_DATA,
  JAPANESE_VOCAB_LIST,
  EASY_STARTER_ROADMAP,
  JAPANESE_CONVERSATIONS,
  JAPANESE_GRAMMAR_LESSONS,
  JAPANESE_NUMBERS_DATA,
  JAPANESE_READING_STORIES,
  JAPANESE_LISTENING_DRILLS,
  KanaCharacter,
} from '../../data/japaneseLanguageData';
import { speakJapaneseText, stopSpeaking } from '../../utils/speech';
import { NavigationTab, UserProgress, UserProfile } from '../../types';

interface JapaneseDashboardViewProps {
  progress: UserProgress;
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onAwardXP?: (amount: number, reason: string) => void;
}

export const JapaneseDashboardView: React.FC<JapaneseDashboardViewProps> = ({
  progress,
  profile,
  onNavigate,
  onAwardXP,
}) => {
  const [kanaType, setKanaType] = useState<'hiragana' | 'katakana'>('hiragana');
  const [selectedKana, setSelectedKana] = useState<KanaCharacter>(HIRAGANA_DATA[0].chars[0]);
  const [playingChar, setPlayingChar] = useState<string | null>(null);

  // Quick Quiz State for Japanese
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScoreAwarded, setQuizScoreAwarded] = useState(false);

  const dailyWord = {
    jp: 'ありがとうございます',
    romaji: 'Arigatou gozaimasu',
    bangla: 'আরিগাতো গোজাইমাস',
    meaning: 'আপনাকে অনেক ধন্যবাদ (Thank you very much)',
    exampleJp: '手伝ってくれてありがとうございます。',
    exampleRomaji: 'Tetsudatte kurete arigatou gozaimasu.',
    exampleBn: 'সাহায্য করার জন্য আপনাকে অনেক ধন্যবাদ।',
  };

  const dailySentence = {
    jp: 'お元気ですか？',
    romaji: 'Ogenki desu ka?',
    bangla: 'ওগেনকি দেস কা?',
    meaning: 'আপনি কেমন আছেন? (How are you?)',
    replyJp: 'はい、元気です。',
    replyRomaji: 'Hai, genki desu.',
    replyBn: 'হ্যাঁ, আমি ভালো আছি।',
  };

  const quickQuiz = {
    questionJp: '「みず (Mizu)」の意味は何ですか？',
    questionBn: '「みず (Mizu)」 শব্দের সঠিক বাংলা অর্থ কোনটি?',
    options: ['চা (Tea)', 'পানি (Water)', 'ভাত (Rice)', 'দুধ (Milk)'],
    correctIndex: 1,
    explanationBn: 'みず (Mizu / মিজু) অর্থ পানি। চা হলো おちゃ (Ocha), ভাত হলো ごはん (Gohan)।',
  };

  const handlePlayAudio = (text: string, charKey?: string) => {
    stopSpeaking();
    if (charKey) setPlayingChar(charKey);
    speakJapaneseText(text, 0.9, () => {
      if (charKey) setPlayingChar(null);
    });
  };

  const handleSelectQuiz = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswer(index);
    setQuizSubmitted(true);
    if (index === quickQuiz.correctIndex && !quizScoreAwarded) {
      setQuizScoreAwarded(true);
      onAwardXP?.(15, 'সঠিক জাপানি কুইজ উত্তর');
    }
  };

  const currentKanaGroup = kanaType === 'hiragana' ? HIRAGANA_DATA[0].chars : KATAKANA_DATA[0].chars;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Japanese Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-rose-800/40">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-6 top-6 text-7xl font-black text-rose-400/10 select-none pointer-events-none">
          日本語
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3.5 py-1 text-xs font-bold text-rose-300 border border-rose-400/30 backdrop-blur-md">
              <span className="text-base">🇯🇵</span>
              <span>জাপানি ভাষা ড্যাশবোর্ড • 日本語 (Nihongo)</span>
              <span className="rounded-md bg-rose-500 px-1.5 py-0.2 text-[10px] font-black text-white">
                সক্রিয়
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center flex-wrap gap-2">
              <span>こんにちは！</span>
              <span className="text-rose-300 text-xl sm:text-2xl font-bold">
                (Konnichiwa! স্বাগতম) জাপানি একাডেমি
              </span>
            </h1>

            <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed font-bangla">
              অ্যানিমে, উচ্চশিক্ষা ও জাপানে ক্যারিয়ার গড়তে শুরু করুন বর্ণমালা হিরাগানা ও কাতাকানা থেকে। রোমাজি, বাংলা উচ্চারণ, অডিও ড্রিল এবং শ্যাডোয়িং মাইক ল্যাব।
            </p>

            {/* Quick Japanese Greeting Audios */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-rose-200/80 font-bold">অভিবাদন শুনুন:</span>
              {[
                { jp: 'おはようございます', romaji: 'Ohayou', label: 'শুভ সকাল' },
                { jp: 'こんにちは', romaji: 'Konnichiwa', label: 'শুভ দুপুর / হ্যালো' },
                { jp: 'ありがとうございます', romaji: 'Arigatou', label: 'ধন্যবাদ' },
                { jp: 'すみません', romaji: 'Sumimasen', label: 'মাফ করবেন' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePlayAudio(item.jp)}
                  className="flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-rose-600/60 px-3 py-1.5 text-xs text-white border border-white/10 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Volume2 className="h-3.5 w-3.5 text-rose-300" />
                  <span className="font-bold">{item.jp}</span>
                  <span className="text-[10px] text-rose-200 hidden sm:inline">({item.label})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('japanese')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-rose-500 to-amber-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-rose-500/30 hover:from-rose-400 hover:to-amber-400 transition-all cursor-pointer active:scale-95"
            >
              <Globe2 className="h-4 w-4" />
              <span>সম্পূর্ণ জাপানি স্টুডিও খুলুন</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('japanese')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer backdrop-blur-md"
            >
              <Headphones className="h-4 w-4 text-rose-300" />
              <span>লিসেনিং ও শ্যাডোয়িং ল্যাব</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Japanese 4 In-Depth Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-xs dark:border-rose-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 font-black text-lg">
              あ
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                ৯২টি কাণা বর্ণ
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                হিরাগানা ও কাতাকানা
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-xs dark:border-indigo-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                {JAPANESE_VOCAB_LIST.length}+ JLPT N5 শব্দ
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                কাঞ্জি ও রোমাজিসহ
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-xs dark:border-emerald-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                অডিও লিসেনিং
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                শুনে পরীক্ষা দেওয়ার ড্রিল
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-xs dark:border-amber-950/60 dark:bg-slate-900 transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
              <Mic className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block truncate">
                শ্যাডোয়িং মাইক
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bangla">
                মুখে বলে উচ্চারণ টেস্ট
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Kana Soundboard / Sampler */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 font-bold text-xs">
                あ
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                জাপানি বর্ণমালা সাউন্ডবোর্ড (Interactive Kana Audio)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              যেকোনো অক্ষরে ক্লিক করে সঠিক জাপানি কণ্ঠের উচ্চারণ শুনুন
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setKanaType('hiragana')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  kanaType === 'hiragana'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                হিরাগানা (あ)
              </button>
              <button
                onClick={() => setKanaType('katakana')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  kanaType === 'katakana'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                কাতাকানা (ア)
              </button>
            </div>

            <button
              onClick={() => onNavigate('japanese')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer ml-2"
            >
              <span>সম্পূর্ণ চার্ট</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Kana Buttons Grid (First 2 Rows: a, i, u, e, o / ka, ki, ku, ke, ko) */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {currentKanaGroup.map((charItem) => {
            const isSelected = selectedKana.char === charItem.char;

            return (
              <button
                key={charItem.char}
                onClick={() => {
                  setSelectedKana(charItem);
                  handlePlayAudio(charItem.char, charItem.char);
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/30 scale-105'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                }`}
              >
                <span className="text-2xl font-black leading-none mb-1">
                  {charItem.char}
                </span>
                <span className={`text-[10px] font-bold ${isSelected ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {charItem.romaji} • {charItem.bangla}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Kana Detail Card */}
        {selectedKana && (
          <div className="mt-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 shadow-sm text-3xl font-black text-rose-600 dark:text-rose-400">
                {selectedKana.char}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    রোমাজি: <span className="text-rose-600 dark:text-rose-400">{selectedKana.romaji}</span>
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-bold">
                    বাংলা উচ্চারণ: {selectedKana.bangla}
                  </span>
                </div>
                {selectedKana.exampleWord && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    উদাহরণ শব্দ:{' '}
                    <span className="font-bold text-rose-700 dark:text-rose-400 text-sm">
                      {selectedKana.exampleWord.jp}
                    </span>{' '}
                    ({selectedKana.exampleWord.romaji} / {selectedKana.exampleWord.bangla}) ={' '}
                    <span className="font-bold">{selectedKana.exampleWord.meaning}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(selectedKana.char)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/30 transition-all cursor-pointer shrink-0"
            >
              <Volume2 className="h-4 w-4" />
              <span>উচ্চারণ শুনুন</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Today's Japanese Spotlight (Daily Word, Sentence & 1-Click Quiz) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Daily Word & Daily Dialogue */}
        <div className="lg:col-span-7 space-y-4">
          {/* Word of the Day */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  আজকের নির্বাচিত জাপানি শব্দ (Word of the Day)
                </span>
              </div>
              <button
                onClick={() => handlePlayAudio(dailyWord.jp)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-200 transition-all cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>অডিও</span>
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 block">
                  {dailyWord.jp}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                  উচ্চারণ: {dailyWord.bangla} ({dailyWord.romaji})
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5">
                  অর্থ: <b className="text-slate-900 dark:text-white">{dailyWord.meaning}</b>
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
                  বাক্যে প্রয়োগ:
                </span>
                <span className="text-sm block font-bold text-slate-900 dark:text-white">
                  {dailyWord.exampleJp}
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
                <MessageSquare className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  আজকের দরকারি জাপানি কথপোকথন (Daily Sentence)
                </span>
              </div>
              <button
                onClick={() => handlePlayAudio(dailySentence.jp)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-200 transition-all cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>শুনুন</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    প্রশ্ন বা বাক্য:
                  </span>
                  <button
                    onClick={() => handlePlayAudio(dailySentence.jp)}
                    className="text-amber-600 hover:text-amber-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {dailySentence.jp}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  <b>{dailySentence.bangla}</b> ({dailySentence.romaji}) • {dailySentence.meaning}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                    উত্তর বা পাল্টা কথা:
                  </span>
                  <button
                    onClick={() => handlePlayAudio(dailySentence.replyJp)}
                    className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="text-lg font-black text-rose-700 dark:text-rose-300 mt-1">
                  {dailySentence.replyJp}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  <b>{dailySentence.replyBn}</b> ({dailySentence.replyRomaji})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Interactive Quiz & Starter Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Japanese Quiz Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  ১-মিনিট জাপানি কুইজ (Instant Quiz)
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
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

                  let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-rose-400 text-slate-800 dark:text-slate-200';
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

          {/* 1-Minute Japanese Starter Guide Card */}
          <div className="rounded-3xl border border-rose-200/80 bg-linear-to-br from-rose-50/70 to-amber-50/70 dark:border-rose-800/40 dark:from-rose-950/30 dark:to-amber-950/30 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                জাপানি শেখার ১-মিনিট সহজ রোডম্যাপ
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              কখনো জাপানি না শিখলেও যেভাবে শুরু করবেন:
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-800/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white font-bold text-[10px]">
                  ১
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  হিরাগানা ৫টি স্বরবর্ণ (あ い う え お) মুখস্থ করুন
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-800/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-[10px]">
                  ২
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  SOV বাক্যরীতি (কর্তা + কর্ম + ক্রিয়া) ফর্মুলা শিখুন
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-800/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-[10px]">
                  ৩
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  শ্যাডোয়িং মাইকে শুনে সাথে সাথে মুখে বলার ড্রিল করুন
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('japanese')}
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <span>বিস্তারিত রোডম্যাপ দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Core Japanese Module Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              জাপানি লার্নিং মডিউলসমূহ (Core Modules)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              যে অংশে প্রবেশ করতে চান সরাসরি ক্লিক করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Module 1: Kana */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-rose-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 text-2xl font-black">
                あ
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                ৯২ বর্ণ
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              হিরাগানা ও কাতাকানা চার্ট
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              রোমাজি, বাংলা অর্থ ও উদাহরণ শব্দসহ সম্পূর্ণ কাণা বর্ণমালা স্টুডিও।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>অনুশীলন করুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 2: Vocabulary */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                JLPT N5
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              JLPT N5 শব্দভাণ্ডার
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              কাঞ্জি, ফুরিগানা ও মেমোরি নেমোনিক্সসহ পরীক্ষার ৬০+ নিত্যপ্রয়োজনীয় শব্দ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>শব্দভাণ্ডার দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 3: Listening Drills */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <Headphones className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                অডিও টেস্ট
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              অডিও লিসেনিং ট্রেইনার
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              জাপানি বাক্য শুনে সঠিক অর্থ ও পরিস্থিতি নির্বাচন করার চ্যালেঞ্জ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>ড্রিল শুরু করুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 4: Shadowing Lab */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400">
                <Mic className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                স্পিকিং মাইক
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              স্পিচ শ্যাডোয়িং মাইক ল্যাব
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              নেটিভ স্পিকারের কথা শুনে মাইক্রোফোনে মুখে উচ্চারণ মিলিয়ে নেওয়ার সিস্টেম।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>মাইকে কথা বলুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 5: Reading Stories */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                <Compass className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                গল্প পাঠ
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              সহজ জাপানি গল্প ও রিডিং
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              প্রতি বাক্যের বাংলা অনুবাদ, রোমাজি ও লাইন ধরে ধরে অডিও পাঠ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>গল্প পড়ুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 6: Kanji Studio */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-rose-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 text-2xl font-black font-serif">
                日
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                JLPT N5 কাঞ্জি
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              কাঞ্জি মাস্টারি স্টুডিও
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              ১২টি মৌলিক কাঞ্জির স্ট্রোক অর্ডার, ওনিওমি, কুনিওমি ও বাস্তব জীবনের যৌগিক শব্দ।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>কাঞ্জি শিখুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 7: Anime Expressions */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-yellow-400 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400">
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
                অ্যানিমে স্ল্যাং
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
              অ্যানিমে ও পপ কালচার এক্সপ্রেশন
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              সুগোই, ইয়াত্তা, দাইজৌবু, নারুহোদো সহ অ্যানিমে চরিত্রদের মুখের ট্রেন্ডিং এক্সপ্রেশন।
            </p>
            <div className="mt-3 flex items-center text-xs font-bold text-yellow-600 dark:text-yellow-400 group-hover:translate-x-1 transition-transform">
              <span>এক্সপ্রেশন দেখুন</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </div>
          </div>

          {/* Module 8: Full Hub */}
          <div
            onClick={() => onNavigate('japanese')}
            className="group rounded-3xl border border-rose-300 dark:border-rose-800 bg-linear-to-br from-rose-600 to-amber-600 p-5 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <Globe2 className="h-8 w-8 text-rose-200" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                  সম্পূর্ণ স্টুডিও
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                সম্পূর্ণ জাপানি একাডেমি
              </h3>
              <p className="text-xs text-rose-100 mt-1">
                সবগুলো মডিউল, গতি নিয়ন্ত্রণ (0.75x ধীর), ডায়লগ ও সংখ্যা একসাথে দেখতে প্রবেশ করুন।
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
