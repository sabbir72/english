import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Languages,
  Headphones,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Clock,
  Award,
} from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

export interface ReadingStory {
  id: string;
  title: string;
  titleBangla: string;
  level: 'Beginner' | 'Elementary' | 'Intermediate';
  readTime: string;
  category: string;
  englishContent: string[];
  banglaContent: string[];
  keyVocab: {
    word: string;
    ipa: string;
    banglaPronunciation: string;
    meaning: string;
    pos: string;
  }[];
  comprehensionQuestion: {
    question: string;
    questionBangla: string;
    options: string[];
    correctIndex: number;
    explanationBangla: string;
  };
}

const READING_STORIES: ReadingStory[] = [
  {
    id: 'story-1',
    title: 'The Power of Small Daily Habits',
    titleBangla: 'ছোট ছোট দৈনন্দিন অভ্যাসের শক্তি',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Self Improvement',
    englishContent: [
      'Learning English does not require five hours every single day. In fact, practicing for just fifteen minutes each morning can completely transform your speaking skills.',
      'When you learn three new words and build two sentences every day, you master almost one hundred words each month. Consistency always beats intensity.',
      'Start small, celebrate your daily streak, and speak out loud without fearing mistakes. Every mistake is proof that you are trying.',
    ],
    banglaContent: [
      'প্রতিদিন পাঁচ ঘণ্টা ইংরেজি শেখার প্রয়োজন নেই। আসলে, প্রতিদিন সকালে মাত্র পনেরো মিনিট অনুশীলন করলে আপনার কথা বলার দক্ষতা পুরোপুরি বদলে যেতে পারে।',
      'আপনি যখন প্রতিদিন তিনটি নতুন শব্দ শেখেন এবং দুটি বাক্য তৈরি করেন, তখন প্রতি মাসে প্রায় একশত শব্দে দক্ষতা অর্জন করতে পারেন। ধারাবাহিকতা সবসময় অতিরিক্ত চাপের চেয়ে বেশি কার্যকর।',
      'ছোট করে শুরু করুন, আপনার দৈনিক ধারাবাহিকতা বজায় রাখুন এবং ভুলের ভয় না পেয়ে জোরে কথা বলুন। প্রতিটি ভুল প্রমাণ করে যে আপনি চেষ্টা করছেন।',
    ],
    keyVocab: [
      { word: 'require', ipa: '/rɪˈkwaɪər/', banglaPronunciation: 'রিকোয়ার', meaning: 'প্রয়োজন হওয়া / দরকার হওয়া', pos: 'verb' },
      { word: 'transform', ipa: '/trænsˈfɔːrm/', banglaPronunciation: 'ট্রান্সফর্ম', meaning: 'আমূল পরিবর্তন করা / রূপান্তর করা', pos: 'verb' },
      { word: 'consistency', ipa: '/kənˈsɪstənsi/', banglaPronunciation: 'কনসিস্টেন্সি', meaning: 'ধারাবাহিকতা / নিয়মিত প্রয়াস', pos: 'noun' },
      { word: 'intensity', ipa: '/ɪnˈtɛnsəti/', banglaPronunciation: 'ইনটেনসিটি', meaning: 'তীব্রতা / কঠোর চাপ', pos: 'noun' },
      { word: 'proof', ipa: '/pruːf/', banglaPronunciation: 'প্রুফ', meaning: 'প্রমাণ', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'According to the passage, what is more important than intensity?',
      questionBangla: 'অনুচ্ছেদ অনুযায়ী, তীব্রতার চেয়ে কোনটি বেশি গুরুত্বপূর্ণ?',
      options: ['Grammar tests', 'Consistency (ধারাবাহিকতা)', 'Studying five hours', 'Memorizing dictionary'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে স্পষ্টভাবে বলা হয়েছে: "Consistency always beats intensity" (ধারাবাহিকতা সবসময় তীব্রতার চেয়ে কার্যকর)।',
    },
  },
  {
    id: 'story-2',
    title: 'A Warm Morning at a London Cafe',
    titleBangla: 'লন্ডনের ক্যাফেতে একটি উষ্ণ সকাল',
    level: 'Elementary',
    readTime: '4 min',
    category: 'Daily Life & Travel',
    englishContent: [
      'Rahim stepped into the cozy cafe near Covent Garden. The aroma of freshly brewed coffee and warm croissants filled the entire room.',
      '"Good morning! What can I get for you today?" the barista asked with a pleasant smile. Rahim felt a little nervous, but he remembered his sentence patterns.',
      '"Could I please have a hot latte with almond milk and a blueberry muffin?" Rahim replied confidently. The barista nodded cheerfully. Rahim smiled, realizing that real conversation is easier than he thought.',
    ],
    banglaContent: [
      'রহিম কভেন্ট গার্ডেনের কাছের একটি আরামদায়ক ক্যাফেতে প্রবেশ করলেন। সদ্য তৈরি কফি এবং গরম ক্রসেন্টের ঘ্রাণ পুরো ঘর জুড়ে ছড়িয়ে ছিল।',
      '"শুভ সকাল! আজ আপনার জন্য কি আনতে পারি?" হাসিমুখে জিজ্ঞেস করলেন বারিস্তা। রহিম একটু নার্ভাস অনুভব করছিলেন, কিন্তু তার বাক্যের প্যাটার্নগুলো মনে পড়ল।',
      '"আমাকে কি অনুগ্রহ করে আমন্ড মিল্কের একটি গরম লাতে এবং ব্লুবেরি মাফিন দেওয়া যাবে?" আত্মবিশ্বাসের সাথে উত্তর দিলেন রহিম। বারিস্তা আনন্দের সাথে সম্মতি জানিয়ে মাথা নাড়লেন। রহিম হাসলেন এবং উপলব্ধি করলেন যে বাস্তব কথোপকথন ভাবনার চেয়েও সহজ।',
    ],
    keyVocab: [
      { word: 'cozy', ipa: '/ˈkoʊzi/', banglaPronunciation: 'কোজি', meaning: 'আরামদায়ক ও উষ্ণ', pos: 'adjective' },
      { word: 'aroma', ipa: '/əˈroʊmə/', banglaPronunciation: 'অ্যারোমা', meaning: 'সুগন্ধ / মিষ্টি ঘ্রাণ', pos: 'noun' },
      { word: 'pleasant', ipa: '/ˈplɛznt/', banglaPronunciation: 'প্লেজেন্ট', meaning: 'মনোরম / মিষ্টি', pos: 'adjective' },
      { word: 'confidently', ipa: '/ˈkɒnfɪdəntli/', banglaPronunciation: 'কনফিডেন্টলি', meaning: 'আত্মবিশ্বাসের সাথে', pos: 'adverb' },
      { word: 'realize', ipa: '/ˈriːəlaɪz/', banglaPronunciation: 'রিয়ালাইজ', meaning: 'উপলব্ধি করা / বুঝতে পারা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'What did Rahim order at the cafe?',
      questionBangla: 'রহিম ক্যাফেতে কি অর্ডার করেছিলেন?',
      options: ['Green tea and a sandwich', 'Hot latte with almond milk & blueberry muffin', 'Black coffee only', 'Cold juice and cake'],
      correctIndex: 1,
      explanationBangla: 'রহিম বলেছিলেন: "Could I please have a hot latte with almond milk and a blueberry muffin?"',
    },
  },
  {
    id: 'story-3',
    title: 'How Job Interviews Look for Confidence',
    titleBangla: 'চাকরির ইন্টারভিউতে কীভাবে আত্মবিশ্বাস খোঁজা হয়',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Career & Professional',
    englishContent: [
      'Employers around the world value clear communication over complex vocabulary. When speaking in an interview, speak slowly, pause when thinking, and maintain good eye contact.',
      'Instead of worrying about grammar mistakes, focus on expressing your ideas logically. Use structured answers: state your point, explain why, provide an example, and summarize your conclusion.',
      'Confidence grows with preparation. Practice answering common questions out loud until your English sounds natural and sincere.',
    ],
    banglaContent: [
      'বিশ্বজুড়ে নিয়োগকর্তারা জটিল শব্দের চেয়ে স্পষ্ট যোগাযোগ দক্ষতাকে বেশি প্রাধান্য দেন। ইন্টারভিউতে কথা বলার সময় ধীরে কথা বলুন, ভাবার সময় বিরতি নিন এবং চোখের যোগাযোগ বজায় রাখুন।',
      'ব্যাকরণের ভুলের ব্যাপারে দুশ্চিন্তা করার চেয়ে আপনার চিন্তাগুলো যৌক্তিকভাবে প্রকাশে মন দিন। সুবিন্যস্ত উত্তর দিন: আপনার বক্তব্য বলুন, কারণ ব্যাখ্যা করুন, উদাহরণ দিন এবং উপসংহার টানুন।',
      'প্রস্তুতির মাধ্যমেই আত্মবিশ্বাস গড়ে ওঠে। আপনার ইংরেজি স্বাভাবিক ও আন্তরিক না শোনানো পর্যন্ত সাধারণ প্রশ্নগুলোর উত্তর জোরে জোরে অনুশীলন করুন।',
    ],
    keyVocab: [
      { word: 'employer', ipa: '/ɪmˈplɔɪər/', banglaPronunciation: 'এমপ্লয়ার', meaning: 'নিয়োগকর্তা / মালিক', pos: 'noun' },
      { word: 'logically', ipa: '/ˈlɒdʒɪkli/', banglaPronunciation: 'লজিক্যালি', meaning: 'যৌক্তিকভাবে', pos: 'adverb' },
      { word: 'sincere', ipa: '/sɪnˈsɪər/', banglaPronunciation: 'সিনসিয়ার', meaning: 'আন্তরিক / খাঁটি', pos: 'adjective' },
      { word: 'summarize', ipa: '/ˈsʌməraɪz/', banglaPronunciation: 'সামারাইজ', meaning: 'সংক্ষেপে তুলে ধরা', pos: 'verb' },
      { word: 'preparation', ipa: '/ˌprɛpəˈreɪʃən/', banglaPronunciation: 'প্রিপারেশন', meaning: 'প্রস্তুতি', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What do global employers value more than complex vocabulary?',
      questionBangla: 'জটিল শব্দের চেয়ে নিয়োগকর্তারা কোন বিষয়টিকে বেশি মূল্য দেন?',
      options: ['Fast speaking speed', 'Clear communication', 'Accent imitation', 'Long sentences'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে প্রথম লাইনেই বলা হয়েছে: "Employers around the world value clear communication over complex vocabulary."',
    },
  },
];

interface ReadingSectionProps {
  onAwardXP?: (xp: number) => void;
  onSaveWord?: (word: string, meaning: string) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  onAwardXP,
  onSaveWord,
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(READING_STORIES[0].id);
  const [showBangla, setShowBangla] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedStories, setCompletedStories] = useState<Record<string, boolean>>({});
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning?: string;
    ipa?: string;
    pron?: string;
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  const currentStory = READING_STORIES.find((s) => s.id === selectedStoryId) || READING_STORIES[0];

  const handleReadAloud = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    const fullText = currentStory.englishContent.join(' ');
    setIsPlayingAudio(true);
    speakText(fullText, 'US', 0.95);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 12000);
  };

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim().toLowerCase();
    if (!cleanWord) return;

    // Check if it matches key vocab
    const match = currentStory.keyVocab.find((v) => v.word.toLowerCase() === cleanWord);
    if (match) {
      setSelectedWord({
        word: match.word,
        meaning: match.meaning,
        ipa: match.ipa,
        pron: match.banglaPronunciation,
      });
      speakText(match.word, 'US', 0.9);
    } else {
      setSelectedWord({
        word: cleanWord,
        meaning: 'শব্দের অর্থ জানতে ডিকশনারি বা শব্দভাণ্ডার দেখুন',
      });
      speakText(cleanWord, 'US', 0.9);
    }
  };

  const handleSelectQuizOption = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOption(idx);
    setQuizSubmitted(true);
    if (idx === currentStory.comprehensionQuestion.correctIndex) {
      onAwardXP?.(15);
      setCompletedStories((prev) => ({ ...prev, [currentStory.id]: true }));
    }
  };

  const handleToggleSaveVocab = (word: string, meaning: string) => {
    setSavedWords((prev) => ({ ...prev, [word]: !prev[word] }));
    onSaveWord?.(word, meaning);
  };

  return (
    <div id="reading-practice-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/50 p-6 sm:p-8 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 px-3 py-1 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Distraction-Free Reading Room</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              সহজ ইংরেজি রিডিং ও বাংলা ভাবার্থ
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
              প্রতিটি বাক্যের পাশে বাংলা অনুবাদ দেখুন, যেকোনো অপরিচিত শব্দে ক্লিক করে তাৎক্ষণিক অর্থ ও উচ্চারণ শুনুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBangla(!showBangla)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-2xs border ${
                showBangla
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}
            >
              {showBangla ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span>{showBangla ? 'বাংলা অর্থ চালু' : 'বাংলা অর্থ লুকানো'}</span>
            </button>

            <button
              onClick={handleReadAloud}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-2xs border ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white border-amber-500 animate-pulse'
                  : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:bg-slate-800 dark:text-indigo-400 dark:border-indigo-900'
              }`}
            >
              <Headphones className="h-4 w-4" />
              <span>{isPlayingAudio ? 'থামান' : 'রিডিং শুনুন'}</span>
            </button>
          </div>
        </div>

        {/* Story Selector Pills */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-200/70 dark:border-slate-800/70">
          {READING_STORIES.map((story) => {
            const isSelected = story.id === currentStory.id;
            const isDone = completedStories[story.id];
            return (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStoryId(story.id);
                  setSelectedOption(null);
                  setQuizSubmitted(false);
                  setSelectedWord(null);
                  stopSpeaking();
                  setIsPlayingAudio(false);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white/80 text-slate-700 border-slate-200/80 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Clock className="h-3.5 w-3.5 opacity-60" />
                )}
                <span>{story.title}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-indigo-700/80 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {story.readTime}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Reading & Vocabulary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: The Digital Reading Book */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 sm:py-10 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 transition-colors">
            {/* Story Header */}
            <div className="mb-6 pb-5 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {currentStory.category} • Level: {currentStory.level}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  পড়ার সময়: {currentStory.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {currentStory.title}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 font-bangla mt-0.5">
                {currentStory.titleBangla}
              </p>
            </div>

            {/* Paragraphs with interactive words */}
            <div className="space-y-6">
              {currentStory.englishContent.map((paragraph, pIdx) => {
                const words = paragraph.split(' ');
                const banglaTranslation = currentStory.banglaContent[pIdx];

                return (
                  <div
                    key={pIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 transition-colors border border-slate-200/50 dark:border-slate-700/50 space-y-3"
                  >
                    {/* English text with clickable tokens */}
                    <div className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
                      {words.map((w, wIdx) => {
                        const clean = w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').toLowerCase();
                        const isKey = currentStory.keyVocab.some((kv) => kv.word.toLowerCase() === clean);

                        return (
                          <span
                            key={wIdx}
                            onClick={() => handleWordClick(w)}
                            className={`inline-block mx-1 cursor-pointer transition-all duration-150 rounded-sm px-0.5 ${
                              isKey
                                ? 'border-b-2 border-indigo-500 font-semibold text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-950/80'
                                : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                            title="ক্লিক করে অর্থ ও উচ্চারণ শুনুন"
                          >
                            {w}
                          </span>
                        );
                      })}
                    </div>

                    {/* Bangla meaning toggle */}
                    {showBangla && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-sm text-emerald-800 dark:text-emerald-300 font-bangla leading-relaxed flex items-start gap-2">
                        <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 font-sans font-bold">
                          বাংলা
                        </span>
                        <p>{banglaTranslation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Comprehension Check Question */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-950/60 dark:bg-slate-800/50">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                  <Award className="h-4 w-4" />
                  <span>Reading Comprehension Quiz (+15 XP)</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {currentStory.comprehensionQuestion.question}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla mt-0.5">
                  {currentStory.comprehensionQuestion.questionBangla}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {currentStory.comprehensionQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentStory.comprehensionQuestion.correctIndex;
                    let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/20';
                      } else if (isSelected) {
                        style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizOption(idx)}
                        disabled={quizSubmitted}
                        className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-100/60 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-300 font-bangla leading-relaxed border border-emerald-200 dark:border-emerald-800">
                    💡 {currentStory.comprehensionQuestion.explanationBangla}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clicked Word Popover & Key Vocabulary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Clicked Word Card */}
          {selectedWord && (
            <div className="rounded-3xl border border-indigo-200 bg-white p-5 shadow-sm dark:border-indigo-900 dark:bg-slate-900 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  নির্বাচিত শব্দ (Clicked Word)
                </span>
                <button
                  onClick={() => speakText(selectedWord.word, 'US')}
                  className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-400"
                  title="উচ্চারণ শুনুন"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-white capitalize mt-1">
                {selectedWord.word}
              </h3>

              {selectedWord.ipa && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {selectedWord.ipa}
                  </span>
                  {selectedWord.pron && (
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 font-bangla">
                      উচ্চারণ: {selectedWord.pron}
                    </span>
                  )}
                </div>
              )}

              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200 font-bangla">
                বাংলা অর্থ: {selectedWord.meaning}
              </p>

              <button
                onClick={() => {
                  if (selectedWord.meaning) {
                    handleToggleSaveVocab(selectedWord.word, selectedWord.meaning);
                  }
                }}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-50 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 dark:bg-slate-800 dark:text-indigo-300 transition-colors"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{savedWords[selectedWord.word] ? 'সংরক্ষিত (Saved)' : 'ওয়ার্ড ব্যাংকে যোগ করুন'}</span>
              </button>
            </div>
          )}

          {/* Key Vocabulary of the Article */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  গুরুত্বপূর্ণ শব্দভাণ্ডার ({currentStory.keyVocab.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">অডিওসহ</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-1">
              {currentStory.keyVocab.map((vocab, vIdx) => {
                const isSaved = savedWords[vocab.word];
                return (
                  <div key={vIdx} className="py-3 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                          {vocab.word}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {vocab.pos}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(vocab.word, 'US')}
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleSaveVocab(vocab.word, vocab.meaning)}
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-3.5 w-3.5 text-indigo-600" />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-mono text-slate-400 text-[11px]">{vocab.ipa}</span>
                      <span className="font-bangla font-semibold text-emerald-700 dark:text-emerald-300 text-[11px]">
                        উচ্চারণ: {vocab.banglaPronunciation}
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 font-bangla">
                      {vocab.meaning}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
