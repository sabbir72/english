import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Volume2,
  Heart,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  Star,
  Copy,
  Check,
  Zap,
  Filter,
  List,
  Grid,
  Calendar,
  Award,
  HelpCircle,
} from 'lucide-react';
import { OxfordWordItem, VocabularyItem, PartOfSpeech } from '../types';
import { OXFORD_PREVIEW_LIST, OXFORD_STATS } from '../data/oxford3000Meta';
import { speakText } from '../utils/speech';
import { getBanglaPronunciation } from '../utils/banglaPronunciation';

interface Oxford3000ExplorerProps {
  onToggleFavorite?: (word: VocabularyItem) => void;
  onToggleLearned?: (word: VocabularyItem) => void;
  onPracticeWord?: (word: VocabularyItem) => void;
  onAwardXP?: (amount: number) => void;
  userFavorites?: Set<string>;
  userLearned?: Set<string>;
}

export const Oxford3000Explorer: React.FC<Oxford3000ExplorerProps> = ({
  onToggleFavorite,
  onToggleLearned,
  onPracticeWord,
  onAwardXP,
  userFavorites = new Set(),
  userLearned = new Set(),
}) => {
  // Word list state (starts with 100 preview words, then loads the full 3805 JSON in background)
  const [allWords, setAllWords] = useState<OxfordWordItem[]>(OXFORD_PREVIEW_LIST);
  const [isLoadingFull, setIsLoadingFull] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCefr, setSelectedCefr] = useState<'all' | 'A1' | 'A2' | 'B1' | 'B2'>('all');
  const [selectedTier, setSelectedTier] = useState<'all' | '500' | '1000' | '2000' | '3000'>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'flashcard'>('grid');

  // Flashcard mode state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);

  // Pagination
  const [displayCount, setDisplayCount] = useState(48);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [slowAudioId, setSlowAudioId] = useState<string | null>(null);

  // Daily Routine Target state
  const [dailyPace, setDailyPace] = useState<5 | 10 | 20>(10);
  const [showTodayBatchOnly, setShowTodayBatchOnly] = useState(false);

  // Load the full 3,805 words JSON file asynchronously
  useEffect(() => {
    let isMounted = true;
    fetch('/data/oxford3000.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load full dictionary');
        return res.json();
      })
      .then((data: OxfordWordItem[]) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setAllWords(data);
          setIsLoadingFull(false);
        }
      })
      .catch((err) => {
        console.warn('Could not load full oxford3000.json, using bundled preview list', err);
        if (isMounted) setIsLoadingFull(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter words
  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allWords.filter((item) => {
      // Search query
      if (q) {
        const matchWord = item.word.toLowerCase().includes(q);
        const matchBangla = item.bangla.toLowerCase().includes(q);
        const matchPron = item.banglaPronunciation?.toLowerCase().includes(q);
        const matchEx = item.example.toLowerCase().includes(q);
        if (!matchWord && !matchBangla && !matchPron && !matchEx) return false;
      }

      // CEFR level filter
      if (selectedCefr !== 'all' && item.cefr !== selectedCefr) {
        return false;
      }

      // Frequency Tier filter
      if (selectedTier !== 'all') {
        if (selectedTier === '500' && item.rank > 500) return false;
        if (selectedTier === '1000' && (item.rank <= 500 || item.rank > 1000)) return false;
        if (selectedTier === '2000' && (item.rank <= 1000 || item.rank > 2000)) return false;
        if (selectedTier === '3000' && (item.rank <= 2000 || item.rank > 3000)) return false;
      }

      // Part of speech filter
      if (selectedPos !== 'all' && item.pos !== selectedPos) {
        return false;
      }

      // Alphabet filter
      if (selectedLetter !== 'all') {
        if (!item.word.toLowerCase().startsWith(selectedLetter.toLowerCase())) {
          return false;
        }
      }

      // Daily batch filter
      if (showTodayBatchOnly) {
        // Today's batch by day of year
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const batchStart = ((dayOfYear * dailyPace) % allWords.length) + 1;
        const batchEnd = batchStart + dailyPace;

        if (item.rank < batchStart || item.rank >= batchEnd) {
          return false;
        }
      }

      return true;
    });
  }, [allWords, searchQuery, selectedCefr, selectedTier, selectedPos, selectedLetter, showTodayBatchOnly, dailyPace]);

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayCount(48);
    setFlashcardIndex(0);
    setShowMeaning(false);
  }, [searchQuery, selectedCefr, selectedTier, selectedPos, selectedLetter, showTodayBatchOnly]);

  const displayedList = useMemo(() => {
    return filteredWords.slice(0, displayCount);
  }, [filteredWords, displayCount]);

  // Helper to convert OxfordWordItem to VocabularyItem
  const toVocabItem = (ox: OxfordWordItem): VocabularyItem => {
    return {
      id: ox.id,
      word: ox.word,
      banglaMeaning: ox.bangla,
      pronunciation: ox.banglaPronunciation || getBanglaPronunciation(ox.word, ox.ipa),
      ipa: ox.ipa,
      partOfSpeech: ox.pos as PartOfSpeech,
      difficulty: ox.cefr === 'A1' || ox.cefr === 'A2' ? 'Beginner' : ox.cefr === 'B1' ? 'Intermediate' : 'Advanced',
      example: ox.example,
      exampleBangla: '',
      synonyms: [],
      antonyms: [],
      relatedWords: [],
      category: `Oxford 3000 (${ox.cefr})`,
      isFavorite: userFavorites.has(ox.id),
      isLearned: userLearned.has(ox.id),
    };
  };

  const handleSpeak = (text: string, slow = false, id?: string) => {
    if (slow && id) setSlowAudioId(id);
    speakText(text, slow ? 0.65 : 1.0);
    if (slow && id) {
      setTimeout(() => setSlowAudioId(null), 1500);
    }
  };

  const handleCopyList = () => {
    const text = filteredWords
      .slice(0, 100)
      .map((w, i) => `${w.rank}. ${w.word} (${w.pos}, ${w.cefr}) - ${w.bangla}\n   Ex: ${w.example}`)
      .join('\n\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    });
  };

  // Alphabet list
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const currentFlashcard = filteredWords[flashcardIndex];

  return (
    <div id="oxford-3000-explorer" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden border border-emerald-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Oxford 3000 Essential Vocabulary Hub
            </div>
            <div className="text-xs text-emerald-200 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-xl border border-white/10 font-medium">
              {isLoadingFull ? 'মৌলিক ডেটাসেট লোড হচ্ছে...' : `মোট ৩,৮০৫টি শব্দ উপলব্ধ`}
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              ৩০০০ মোস্ট ইম্পর্ট্যান্ট রেগুলার শব্দ তালিকা
            </h2>
            <p className="text-slate-200 text-sm md:text-base mt-2 leading-relaxed">
              দৈনন্দিন কথ্য ইংরেজি, সংবাদপত্র, সিনেমা এবং আন্তর্জাতিক যোগাযোগের{' '}
              <strong className="text-amber-300 font-bold">৮৫% থেকে ৯০%</strong> এই ৩০০০ মৌলিক শব্দের ওপর ভিত্তি করে
              তৈরি। CEFR লেভেল (A1-B2) অনুসারে সাজানো অর্থ ও উদাহরণসহ শিখুন।
            </p>
          </div>

          {/* CEFR Level Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => setSelectedCefr(selectedCefr === 'A1' ? 'all' : 'A1')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedCefr === 'A1'
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-xs scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
            >
              <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">A1 Foundation</div>
              <div className="text-lg font-black mt-0.5">{OXFORD_STATS.a1Count} শব্দ</div>
              <div className="text-[11px] opacity-80 mt-0.5">মৌলিক দৈনন্দিন শুরু</div>
            </button>

            <button
              onClick={() => setSelectedCefr(selectedCefr === 'A2' ? 'all' : 'A2')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedCefr === 'A2'
                  ? 'bg-teal-500 text-white border-teal-400 shadow-xs scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
            >
              <div className="text-xs text-teal-300 font-bold uppercase tracking-wider">A2 Elementary</div>
              <div className="text-lg font-black mt-0.5">{OXFORD_STATS.a2Count} শব্দ</div>
              <div className="text-[11px] opacity-80 mt-0.5">সাধারণ কথোপকথন</div>
            </button>

            <button
              onClick={() => setSelectedCefr(selectedCefr === 'B1' ? 'all' : 'B1')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedCefr === 'B1'
                  ? 'bg-amber-500 text-white border-amber-400 shadow-xs scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
            >
              <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">B1 Intermediate</div>
              <div className="text-lg font-black mt-0.5">{OXFORD_STATS.b1Count} শব্দ</div>
              <div className="text-[11px] opacity-80 mt-0.5">সাবলীল মত প্রকাশ</div>
            </button>

            <button
              onClick={() => setSelectedCefr(selectedCefr === 'B2' ? 'all' : 'B2')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedCefr === 'B2'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
            >
              <div className="text-xs text-emerald-200 font-bold uppercase tracking-wider">B2 Upper-Inter</div>
              <div className="text-lg font-black mt-0.5">{OXFORD_STATS.b2Count} শব্দ</div>
              <div className="text-[11px] opacity-80 mt-0.5">পেশাদার ও বাস্তব প্রয়োগ</div>
            </button>
          </div>
        </div>
      </div>

      {/* Routine Planner & Batch Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">দৈনিক ৩০০০ শব্দ সমাপ্তির পরিকল্পনা (Daily Goal Plan)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                প্রতিদিন নির্দিষ্ট লক্ষ্য নিয়ে পড়লে ৩০০০ শব্দ দ্রুত ও স্থায়ীভাবে মুখস্থ হয়।
              </p>
            </div>
          </div>

          {/* Goal Pace Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">প্রতিদিনের লক্ষ্য:</span>
            {([5, 10, 20] as const).map((num) => (
              <button
                key={num}
                onClick={() => setDailyPace(num)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  dailyPace === num
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {num}টি / দিন
              </button>
            ))}

            <button
              onClick={() => setShowTodayBatchOnly(!showTodayBatchOnly)}
              className={`ml-1 sm:ml-2 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                showTodayBatchOnly
                  ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-300'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {showTodayBatchOnly ? 'সব শব্দ প্রদর্শন করুন' : `আজকের ${dailyPace}টি শব্দ দেখুন`}
            </button>
          </div>
        </div>

        {/* Progress Timeline summary */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
          <div>
            💡 <span className="font-medium text-slate-800 dark:text-slate-200">পরামর্শ:</span> প্রতিদিন{' '}
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{dailyPace}টি</strong> করে নতুন শব্দ পড়লে পুরো ৩০০০ শব্দ শেষ
            হবে মাত্র <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{Math.round(3000 / dailyPace)} দিনে!</strong>
          </div>
          <div className="text-slate-400">
            ফিল্টারে মিলছে: <strong className="text-slate-700 dark:text-slate-300 font-bold">{filteredWords.length}টি শব্দ</strong>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search, Frequency Tiers, Alphabet Bar, View Mode */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        {/* Row 1: Search + View Modes + Copy List */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ইংরেজি শব্দ, বাংলা অর্থ বা উদাহরণ দিয়ে ৩০০০ শব্দে খুঁজুন (যেমন: able, সময়, happy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/60 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-2xl p-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-400">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-600 shadow-xs dark:bg-slate-900 dark:text-emerald-400'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="কার্ড ভিউ (Card View)"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">কার্ড</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-emerald-600 shadow-xs dark:bg-slate-900 dark:text-emerald-400'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="লিস্ট ভিউ (Table View)"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">তালিকা</span>
              </button>
              <button
                onClick={() => setViewMode('flashcard')}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'flashcard'
                    ? 'bg-white text-amber-600 shadow-xs dark:bg-slate-900 dark:text-amber-400'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="ফ্ল্যাশকার্ড কুইজ (Flashcard Quiz)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ফ্ল্যাশকার্ড</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyList}
              className="px-3 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
              title="বর্তমান ফিল্টারের শব্দ কপি করুন"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="hidden sm:inline">কপি তালিকা</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Frequency Tiers */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1 shrink-0 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> স্তর:
          </span>
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedTier === 'all'
                ? 'bg-slate-900 text-white font-bold shadow-xs dark:bg-slate-100 dark:text-slate-900'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            সব শব্দ (১ - ৩০০০+)
          </button>
          <button
            onClick={() => setSelectedTier('500')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedTier === '500'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60'
            }`}
          >
            টপ ৫০০ (সর্বোচ্চ ব্যবহৃত)
          </button>
          <button
            onClick={() => setSelectedTier('1000')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedTier === '1000'
                ? 'bg-teal-600 text-white font-bold shadow-xs'
                : 'bg-teal-50 text-teal-800 hover:bg-teal-100 dark:bg-teal-950/60 dark:text-teal-300 dark:hover:bg-teal-900/60'
            }`}
          >
            ৫০১ - ১০০০ (প্রতিদিনের শব্দ)
          </button>
          <button
            onClick={() => setSelectedTier('2000')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedTier === '2000'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900/60'
            }`}
          >
            ১০০১ - ২০০০ (বাস্তব জীবন)
          </button>
          <button
            onClick={() => setSelectedTier('3000')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all ${
              selectedTier === '3000'
                ? 'bg-slate-700 text-white font-bold shadow-xs dark:bg-slate-600'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            ২০০১ - ৩০০০ (অনর্গল ফ্লুয়েন্সি)
          </button>
        </div>

        {/* Row 3: Alphabet A-Z Quick Jump Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar border-t border-slate-100 dark:border-slate-800 pt-2.5">
          <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1 shrink-0">বর্ণমালা:</span>
          <button
            onClick={() => setSelectedLetter('all')}
            className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-all ${
              selectedLetter === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => setSelectedLetter(selectedLetter === char ? 'all' : char)}
              className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-all ${
                selectedLetter === char
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {char}
            </button>
          ))}
        </div>

        {/* Row 4: Secondary Filters (POS & Active Filter Count) */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100 dark:border-slate-800 pt-2.5 text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> পদ (POS):
            </span>
            <select
              value={selectedPos}
              onChange={(e) => setSelectedPos(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              <option value="all">সকল পদ (All Parts of Speech)</option>
              <option value="noun">Noun (বিশেষ্য)</option>
              <option value="verb">Verb (ক্রিয়া)</option>
              <option value="adjective">Adjective (বিশেষণ)</option>
              <option value="adverb">Adverb (ক্রিয়াবিশেষণ)</option>
              <option value="preposition">Preposition (পদান্বয়ী অব্যয়)</option>
              <option value="conjunction">Conjunction (সংযোজক অব্যয়)</option>
              <option value="pronoun">Pronoun (সর্বনাম)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {(selectedCefr !== 'all' ||
              selectedTier !== 'all' ||
              selectedLetter !== 'all' ||
              selectedPos !== 'all' ||
              searchQuery ||
              showTodayBatchOnly) && (
              <button
                onClick={() => {
                  setSelectedCefr('all');
                  setSelectedTier('all');
                  setSelectedLetter('all');
                  setSelectedPos('all');
                  setSearchQuery('');
                  setShowTodayBatchOnly(false);
                }}
                className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> ফিল্টার রিসেট করুন
              </button>
            )}
            <span className="text-slate-400">
              ফলাফল: <strong className="text-slate-800 dark:text-slate-200 font-bold">{filteredWords.length}</strong> টি শব্দ
            </span>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs max-w-2xl mx-auto text-center space-y-6">
          {currentFlashcard ? (
            <>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  কার্ড {flashcardIndex + 1} / {filteredWords.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold">{currentFlashcard.pos}</span>
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold">
                    {currentFlashcard.cefr}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">র‍্যাংক #{currentFlashcard.rank}</span>
                </div>
              </div>

              {/* Flashcard Body */}
              <div
                onClick={() => setShowMeaning(!showMeaning)}
                className="min-h-[220px] cursor-pointer rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800/80 dark:to-slate-800/40 border-2 border-dashed border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400 dark:hover:border-emerald-600 p-8 flex flex-col items-center justify-center transition-all"
              >
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentFlashcard.word}
                </div>

                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
                  {currentFlashcard.ipa && (
                    <span className="text-slate-500 dark:text-slate-400 font-mono text-xs bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1 rounded-lg">
                      {currentFlashcard.ipa}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-bangla shadow-xs">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-normal">উচ্চারণ:</span>
                    {currentFlashcard.banglaPronunciation || getBanglaPronunciation(currentFlashcard.word, currentFlashcard.ipa)}
                  </span>
                </div>

                <div className="mt-4">
                  {showMeaning ? (
                    <div className="space-y-2 animate-fadeIn">
                      <div className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-bangla">
                        {currentFlashcard.bangla}
                      </div>
                      <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 italic max-w-md mx-auto">
                        &ldquo;{currentFlashcard.example}&rdquo;
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" /> অর্থ দেখতে ট্যাপ করুন
                    </div>
                  )}
                </div>
              </div>

              {/* Flashcard Action Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleSpeak(currentFlashcard.word, false)}
                  className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5 text-xs font-bold transition-colors"
                >
                  <Volume2 className="w-4 h-4" /> স্বাভাবিক উচ্চারণ
                </button>
                <button
                  onClick={() => handleSpeak(currentFlashcard.word, true)}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors"
                >
                  ধীর গতিতে (0.65x)
                </button>
                {onPracticeWord && (
                  <button
                    onClick={() => onPracticeWord(toVocabItem(currentFlashcard))}
                    className="p-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <BookOpen className="w-4 h-4" /> বাক্য ও স্পিকিং অনুশীলন
                  </button>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={flashcardIndex === 0}
                  onClick={() => {
                    setFlashcardIndex((prev) => Math.max(0, prev - 1));
                    setShowMeaning(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← পূর্ববর্তী শব্দ
                </button>

                <button
                  onClick={() => setShowMeaning(!showMeaning)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  {showMeaning ? 'অর্থ লুকান' : 'অর্থ দেখুন'}
                </button>

                <button
                  disabled={flashcardIndex >= filteredWords.length - 1}
                  onClick={() => {
                    setFlashcardIndex((prev) => Math.min(filteredWords.length - 1, prev + 1));
                    setShowMeaning(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  পরবর্তী শব্দ →
                </button>
              </div>
            </>
          ) : (
            <div className="py-12 text-slate-400">এই ফিল্টারে কোনো শব্দ পাওয়া যায়নি।</div>
          )}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-16">#র‍্যাংক</th>
                  <th className="py-3 px-4">ইংরেজি শব্দ</th>
                  <th className="py-3 px-3 w-20">CEFR</th>
                  <th className="py-3 px-3 w-24">পদ</th>
                  <th className="py-3 px-4">বাংলা অর্থ</th>
                  <th className="py-3 px-4 hidden md:table-cell">ব্যবহারিক বাক্য</th>
                  <th className="py-3 px-4 text-right w-36">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {displayedList.map((item) => {
                  const isFav = userFavorites.has(item.id);
                  const isLearned = userLearned.has(item.id);

                  return (
                    <tr key={item.id} className="hover:bg-emerald-50/40 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="py-3 px-4 text-xs font-mono font-semibold text-slate-400 dark:text-slate-500">
                        #{item.rank}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{item.word}</span>
                          <button
                            onClick={() => handleSpeak(item.word, false)}
                            className="text-slate-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          {item.ipa && (
                            <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500 font-mono">
                              {item.ipa}
                            </span>
                          )}
                          <span className="inline-block text-[11px] font-bold text-emerald-700 dark:text-emerald-300 font-bangla bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200/50 dark:border-emerald-800/40">
                            উচ্চারণ: {item.banglaPronunciation || getBanglaPronunciation(item.word, item.ipa)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-lg text-[11px] font-black ${
                            item.cefr === 'A1'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                              : item.cefr === 'A2'
                              ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300'
                              : item.cefr === 'B1'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                              : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {item.cefr}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {item.pos}
                      </td>
                      <td className="py-3 px-4 text-slate-800 dark:text-slate-100 font-bangla font-semibold">
                        {item.bangla}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell italic max-w-xs truncate">
                        &ldquo;{item.example}&rdquo;
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSpeak(item.word, false)}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600"
                            title="উচ্চারণ"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          {onToggleFavorite && (
                            <button
                              onClick={() => onToggleFavorite(toVocabItem(item))}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isFav ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                              title={isFav ? 'প্রিয় তালিকা থেকে সরান' : 'প্রিয় তালিকায় যুক্ত করুন'}
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                            </button>
                          )}
                          {onPracticeWord && (
                            <button
                              onClick={() => onPracticeWord(toVocabItem(item))}
                              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600"
                              title="অনুশীলন করুন"
                            >
                              <BookOpen className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GRID VIEW (RICH CARDS) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedList.map((item) => {
            const isFav = userFavorites.has(item.id);
            const isLearned = userLearned.has(item.id);
            const isSlowActive = slowAudioId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between group"
              >
                {/* Card Header: Rank, CEFR, POS, Favorite */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                        #{item.rank}
                      </span>
                      <span
                        className={`text-[11px] font-black px-2 py-0.5 rounded-lg ${
                          item.cefr === 'A1'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/60'
                            : item.cefr === 'A2'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-200/60 dark:border-teal-900/60'
                            : item.cefr === 'B1'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60'
                            : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {item.cefr}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                        {item.pos}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {onToggleLearned && (
                        <button
                          onClick={() => {
                            onToggleLearned(toVocabItem(item));
                            if (!isLearned && onAwardXP) onAwardXP(5);
                          }}
                          className={`p-1.5 rounded-xl transition-colors ${
                            isLearned ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' : 'text-slate-300 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-300'
                          }`}
                          title={isLearned ? 'শেখা হয়েছে' : 'শেখা হয়েছে হিসেবে চিহ্নিত করুন'}
                        >
                          <CheckCircle2 className={`w-4 h-4 ${isLearned ? 'fill-emerald-100 dark:fill-emerald-950 text-emerald-600' : ''}`} />
                        </button>
                      )}
                      {onToggleFavorite && (
                        <button
                          onClick={() => onToggleFavorite(toVocabItem(item))}
                          className={`p-1.5 rounded-xl transition-colors ${
                            isFav ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' : 'text-slate-300 dark:text-slate-600 hover:text-rose-500'
                          }`}
                          title="প্রিয় শব্দ"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Word & IPA */}
                  <div className="mt-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.word}
                      </h4>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSpeak(item.word, false)}
                          className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                          title="স্বাভাবিক গতিতে শুনুন"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSpeak(item.word, true, item.id)}
                          className={`px-1.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                            isSlowActive
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                          title="ধীর গতিতে উচ্চারণ শুনুন (Slow 0.65x)"
                        >
                          0.6x
                        </button>
                      </div>
                    </div>

                    {/* Pronunciation & IPA */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                      {item.ipa && (
                        <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
                          {item.ipa}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 font-bangla">
                        <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-normal">উচ্চারণ:</span>
                        {item.banglaPronunciation || getBanglaPronunciation(item.word, item.ipa)}
                      </span>
                    </div>
                  </div>

                  {/* Bengali Meaning */}
                  <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-800">
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">বাংলা অর্থ:</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 font-bangla mt-0.5 leading-snug">
                      {item.bangla}
                    </div>
                  </div>

                  {/* Real Example Sentence */}
                  {item.example && (
                    <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">উদাহরণ: </span>
                      <span className="italic text-slate-700 dark:text-slate-300">&ldquo;{item.example}&rdquo;</span>
                    </div>
                  )}
                </div>

                {/* Card Footer: Practice in Speaking & Sentence Builder */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {item.rank <= 500
                      ? '⭐ অতি গুরুত্বপূর্ণ'
                      : item.rank <= 1500
                      ? '🔹 প্রয়োজনীয়'
                      : '🔸 অ্যাডভান্সড'}
                  </span>

                  {onPracticeWord && (
                    <button
                      onClick={() => onPracticeWord(toVocabItem(item))}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all text-xs font-bold flex items-center gap-1 group/btn"
                    >
                      অনুশীলন <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">কোনো শব্দ খুঁজে পাওয়া যায়নি</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            আপনার অনুসন্ধান &ldquo;{searchQuery}&rdquo; বা ফিল্টারের সাথে মিল রেখে কোনো শব্দ পাওয়া যায়নি। ফিল্টার রিসেট
            করে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCefr('all');
              setSelectedTier('all');
              setSelectedLetter('all');
              setSelectedPos('all');
              setShowTodayBatchOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
          >
            সকল ৩০০০ শব্দ দেখুন
          </button>
        </div>
      )}

      {/* Load More Pagination Bar */}
      {viewMode !== 'flashcard' && displayCount < filteredWords.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setDisplayCount((prev) => prev + 48)}
            className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold text-sm shadow-xs transition-all inline-flex items-center gap-2"
          >
            <span>আরও ৪৮টি শব্দ দেখুন (বাকি {filteredWords.length - displayCount}টি)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
