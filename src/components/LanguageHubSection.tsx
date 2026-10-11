import React, { useState } from 'react';
import {
  Globe2,
  Sparkles,
  BookOpen,
  Headphones,
  Award,
  ArrowRight,
  Flame,
  CheckCircle2,
  Zap,
  Layers,
  BookMarked,
  SpellCheck,
  Volume2,
  Lightbulb,
} from 'lucide-react';
import { JapaneseSection } from './JapaneseSection';
import { ArabicSection } from './ArabicSection';
import { NavigationTab, AppLanguage } from '../types';
import { speakText, speakArabicText, speakJapaneseText } from '../utils/speech';

interface LanguageHubSectionProps {
  initialLanguage?: AppLanguage;
  onAwardXP?: (amount: number, reason: string) => void;
  onNavigateHome?: () => void;
  onNavigateTab?: (tab: NavigationTab) => void;
}

interface PolyglotPhrase {
  id: string;
  situationBn: string;
  category: string;
  english: {
    text: string;
    ipa: string;
    bangla: string;
  };
  arabic: {
    text: string;
    trans: string;
    bangla: string;
  };
  japanese: {
    text: string;
    romaji: string;
    bangla: string;
  };
}

const POLYGLOT_COMPARISONS: PolyglotPhrase[] = [
  {
    id: 'poly-1',
    situationBn: 'সকালের শুভেচ্ছা (Morning Greeting)',
    category: 'Greetings',
    english: { text: 'Good morning, how are you?', ipa: '/ɡʊd ˈmɔːnɪŋ/', bangla: 'গুড মর্নিং, হাউ আর ইউ?' },
    arabic: { text: 'صَبَاحُ الخَيْرِ، كَيْفَ حَالُك؟', trans: 'Sabah al-khayr, kayfa haluk?', bangla: 'সাবাহ আল-খাইর, কায়ফা হালুক?' },
    japanese: { text: 'おはようございます、お元気ですか？', romaji: 'Ohayou gozaimasu, ogenki desu ka?', bangla: 'ওহায়ৌ গোজাইমাসু, ওগেনকি দেসু কা?' },
  },
  {
    id: 'poly-2',
    situationBn: 'কৃতজ্ঞতা ও ধন্যবাদ (Thank You)',
    category: 'Politeness',
    english: { text: 'Thank you very much!', ipa: '/θæŋk juː ˈvɛri mʌtʃ/', bangla: 'থ্যাংক ইউ ভেরি মাচ!' },
    arabic: { text: 'شُكْرًا جَزِيلًا لَك!', trans: 'Shukran jazeelan lak!', bangla: 'শুকরান জাযীলা লাক!' },
    japanese: { text: 'どうも ありがとうございます！', romaji: 'Doumo arigatou gozaimasu!', bangla: 'দৌমো আরিগোতৌ গোজাইমাসু!' },
  },
  {
    id: 'poly-3',
    situationBn: 'পানি চাওয়া (Asking for Water)',
    category: 'Daily Needs',
    english: { text: 'Please give me some water.', ipa: '/pliːz ɡɪv miː sʌm ˈwɔːtər/', bangla: 'প্লিজ গিভ মি সাম ওয়াটার।' },
    arabic: { text: 'أَعْطِنِي مَاءً مِنْ فَضْلِك.', trans: 'A\'tini ma\'an min fadlik.', bangla: 'আ\'তিনি মা\'আন মিন ফাদলিক।' },
    japanese: { text: 'お水 を ください。', romaji: 'Omizu o kudasai.', bangla: 'ওমিজু ও কুদাসাই।' },
  },
  {
    id: 'poly-4',
    situationBn: 'দাম জানতে চাওয়া (Asking Price)',
    category: 'Shopping',
    english: { text: 'How much does this cost?', ipa: '/haʊ mʌtʃ dʌz ðɪs kɒst/', bangla: 'হাউ মাচ ডাজ দিস কস্ট?' },
    arabic: { text: 'بِكَمْ هَذَا الشَّيْء؟', trans: 'Bikam hadha ash-shay\'?', bangla: 'বিকাম হাযাশ শায়?' },
    japanese: { text: 'これ は いくら ですか？', romaji: 'Kore wa ikura desu ka?', bangla: 'কোরে ওয়া ইকুরা দেসু কা?' },
  },
  {
    id: 'poly-5',
    situationBn: 'বিদায় ও আবার দেখা হবে (Farewell)',
    category: 'Farewell',
    english: { text: 'See you again, take care!', ipa: '/siː juː əˈɡɛn teɪk keər/', bangla: 'সি ইউ এগেইন, টেক কেয়ার!' },
    arabic: { text: 'إِلَى اللِّقَاءِ، مَعَ السَّلَامَة!', trans: 'Ilal-liqa\', ma\'a as-salamah!', bangla: 'ইলাল-লিক্বা, মা\'আস সালামাহ!' },
    japanese: { text: 'また会いましょう、お気をつけて！', romaji: 'Mata aimashou, okiwotsukete!', bangla: 'মাতা আইমাশৌ, ওকিওৎসুকেতে!' },
  },
];

const ENGLISH_DAILY_IDIOMS = [
  {
    idiom: 'Piece of cake',
    pronunciationBn: 'পিস অব কেক',
    meaningBn: 'খুবই সহজ বা দুধভাত কোনো কাজ (Very easy)',
    example: 'Learning English with this app is a piece of cake!',
    exampleBn: 'এই অ্যাপে ইংরেজি শেখা একদম সহজ দুধভাত ব্যাপার!',
  },
  {
    idiom: 'Break a leg',
    pronunciationBn: 'ব্রেক আ লেগ',
    meaningBn: 'শুভকামনা বা শুভলক্ষণ (Good luck)',
    example: 'You have a presentation today? Break a leg!',
    exampleBn: 'আজ তোমার প্রেজেন্টেশন আছে? অনেক শুভকামনা রইল!',
  },
  {
    idiom: 'Call it a day',
    pronunciationBn: 'কল ইট আ ডে',
    meaningBn: 'আজকের মতো কাজ সমাপ্ত করা (Stop working)',
    example: 'We have studied 5 chapters, let’s call it a day.',
    exampleBn: 'আমরা ৫টি চ্যাপ্টার পড়েছি, আজকের মতো ইতি টানি।',
  },
  {
    idiom: 'Hit the books',
    pronunciationBn: 'হিট দ্য বুকস',
    meaningBn: 'মনোযোগ দিয়ে পড়া শুরু করা (To study hard)',
    example: 'Exam is near, I must hit the books tonight.',
    exampleBn: 'পরীক্ষা সন্নিকটে, আজ রাতে মন দিয়ে পড়তে হবে।',
  },
];

export const LanguageHubSection: React.FC<LanguageHubSectionProps> = ({
  initialLanguage = 'japanese',
  onAwardXP,
  onNavigateHome,
  onNavigateTab,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>(initialLanguage);
  const [showPolyglotMatrix, setShowPolyglotMatrix] = useState(false);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Language Switcher Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-rose-500 to-amber-500 text-white shadow-md shadow-indigo-500/20">
            <Globe2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>আন্তর্জাতিক ভাষা একাডেমি (Language Hub)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                ৩টি ভাষা
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ইংরেজি, আরবি ও জাপানি ভাষা সহজে বাংলায় শিখুন
            </p>
          </div>
        </div>

        {/* 3-Language Switcher Buttons & Polyglot Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPolyglotMatrix((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              showPolyglotMatrix
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>৩ ভাষার লাইভ তুলনা</span>
          </button>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            {/* English Button */}
            <button
              onClick={() => setSelectedLanguage('english')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedLanguage === 'english'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>English (ইংরেজি)</span>
            </button>

            {/* Arabic Button */}
            <button
              onClick={() => setSelectedLanguage('arabic')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedLanguage === 'arabic'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🇸🇦</span>
              <span>العربية (আরবি)</span>
            </button>

            {/* Japanese Button */}
            <button
              onClick={() => setSelectedLanguage('japanese')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedLanguage === 'japanese'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>🇯🇵</span>
              <span>日本語 (জাপানি)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Polyglot 3-Language Comparison Matrix Modal/Card */}
      {showPolyglotMatrix && (
        <div className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
                <Globe2 className="h-3.5 w-3.5" />
                <span>পলিগ্লট তুলনামূলক স্টুডিও (Polyglot Live Comparison)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                একই কথা ৩ ভাষায় কীভাবে বলবেন? (English • العربية • 日本語)
              </h2>
              <p className="text-xs text-indigo-200/80 mt-1">
                প্রতিটি ভাষার উচ্চারণ বাটনে ক্লিক করে নেটিভ সাউন্ডের ফারাক ও সৌন্দর্য উপভোগ করুন।
              </p>
            </div>
            <button
              onClick={() => setShowPolyglotMatrix(false)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-indigo-200 transition-all cursor-pointer self-start sm:self-center"
            >
              লুকিয়ে রাখুন ✕
            </button>
          </div>

          <div className="space-y-4">
            {POLYGLOT_COMPARISONS.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    {p.situationBn}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white/10 text-indigo-200">
                    {p.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* English Box */}
                  <div className="p-3.5 rounded-xl bg-indigo-900/30 border border-indigo-500/30 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-300">🇬🇧 English</span>
                        <button
                          onClick={() => {
                            speakText(p.english.text);
                            onAwardXP?.(3, 'Polyglot English Voice');
                          }}
                          className="p-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600 text-white cursor-pointer"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-bold text-white mt-1">
                        {p.english.text}
                      </div>
                    </div>
                    <div className="text-[11px] text-indigo-200/70 pt-1 border-t border-indigo-500/20">
                      উচ্চারণ: {p.english.bangla}
                    </div>
                  </div>

                  {/* Arabic Box */}
                  <div className="p-3.5 rounded-xl bg-emerald-900/30 border border-emerald-500/30 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-300">🇸🇦 العربية (আরবি)</span>
                        <button
                          onClick={() => {
                            speakArabicText(p.arabic.text);
                            onAwardXP?.(3, 'Polyglot Arabic Voice');
                          }}
                          className="p-1 rounded-lg bg-emerald-600/40 hover:bg-emerald-600 text-white cursor-pointer"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-base font-bold font-serif text-white mt-1 text-right" dir="rtl">
                        {p.arabic.text}
                      </div>
                    </div>
                    <div className="text-[11px] text-emerald-200/70 pt-1 border-t border-emerald-500/20">
                      উচ্চারণ: {p.arabic.bangla}
                    </div>
                  </div>

                  {/* Japanese Box */}
                  <div className="p-3.5 rounded-xl bg-rose-900/30 border border-rose-500/30 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-rose-300">🇯🇵 日本語 (জাপানি)</span>
                        <button
                          onClick={() => {
                            speakJapaneseText(p.japanese.text);
                            onAwardXP?.(3, 'Polyglot Japanese Voice');
                          }}
                          className="p-1 rounded-lg bg-rose-600/40 hover:bg-rose-600 text-white cursor-pointer"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-sm font-bold font-serif text-white mt-1">
                        {p.japanese.text}
                      </div>
                    </div>
                    <div className="text-[11px] text-rose-200/70 pt-1 border-t border-rose-500/20">
                      উচ্চারণ: {p.japanese.bangla}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Selected Language Section */}
      {selectedLanguage === 'english' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* English Hub Welcome Banner */}
          <div className="rounded-3xl bg-linear-to-br from-indigo-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-bold text-indigo-300 border border-indigo-400/30 backdrop-blur-md">
                <span>🇬🇧</span>
                <span>English Spoken & Fluency Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                ইংরেজি স্পোকেন একাডেমি
              </h2>
              <p className="text-sm text-indigo-100/90 leading-relaxed font-bangla">
                একটি বাক্য তৈরির কাঠামো থেকে শত শত বাক্য তৈরির বিপ্লবী মেথডলজি, ৩০০০ অক্সফোর্ড শব্দ, ১০০ পৃষ্ঠার স্মার্ট স্টোরি বুক ও ৪৬ রিডিং চ্যাপ্টার।
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => onNavigateHome?.()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <span>ইংলিশ ড্যাশবোর্ডে যান</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigateTab?.('smart-book')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-indigo-300" />
                  <span>১০০ পাতার স্মার্ট বই</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick English Shortcuts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => onNavigateTab?.('learn')}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all cursor-pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 mb-3">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">বাক্য কাঠামো ও প্যাটার্ন</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">১টি গঠন দিয়ে শত শত বাক্য তৈরির মেথড</p>
            </div>

            <div
              onClick={() => onNavigateTab?.('reading')}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all cursor-pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mb-3">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">রিডিং ও শ্যাডোয়িং</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">৪৮+ গল্প, সাবটাইটেল ও অডিও পাঠ</p>
            </div>

            <div
              onClick={() => onNavigateTab?.('vocabulary')}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all cursor-pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 mb-3">
                <SpellCheck className="h-5 w-5" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">অক্সফোর্ড ৩,০০০ শব্দ</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">উচ্চারণ ও বাস্তব উদাহরণসহ শব্দভাণ্ডার</p>
            </div>

            <div
              onClick={() => onNavigateTab?.('practice')}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all cursor-pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 mb-3">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-base">কুইজ ও চ্যালেঞ্জ</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">ইন্টারঅ্যাক্টিভ MCQ ও এক্সপি অর্জন</p>
            </div>
          </div>

          {/* New Feature: English Native Idioms & Phrasal Verbs Power Lab */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>নেটিভ স্পিকারদের ইডিয়মস ল্যাব (Native Idioms & Phrases)</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  দৈনন্দিন কথায় ব্যবহৃত জনপ্রিয় ইংরেজি ইডিয়মস
                </h3>
              </div>
              <span className="text-xs font-bold text-indigo-600">
                {ENGLISH_DAILY_IDIOMS.length}টি ইডিয়ম
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ENGLISH_DAILY_IDIOMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750 flex flex-col justify-between space-y-3 hover:border-indigo-400 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-black text-indigo-700 dark:text-indigo-300">
                        &ldquo;{item.idiom}&rdquo;
                      </div>
                      <button
                        onClick={() => {
                          speakText(item.example);
                          onAwardXP?.(5, 'Practiced English idiom');
                        }}
                        className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-indigo-600 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                      বাংলা অর্থ: {item.meaningBn}
                    </div>
                    <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                      বাংলা উচ্চারণ: {item.pronunciationBn}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs space-y-0.5">
                    <div className="text-slate-900 dark:text-white font-medium">
                      উদাহরণ: {item.example}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-bangla">
                      {item.exampleBn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedLanguage === 'arabic' && (
        <ArabicSection onAwardXP={onAwardXP} onNavigateHome={onNavigateHome} />
      )}

      {selectedLanguage === 'japanese' && (
        <JapaneseSection onAwardXP={onAwardXP} onNavigateHome={onNavigateHome} />
      )}
    </div>
  );
};
export default LanguageHubSection;
