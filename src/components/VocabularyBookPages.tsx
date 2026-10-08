import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Heart,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Filter,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Play,
  Square,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookMarked,
  Layers,
  Award,
  Bookmark,
} from 'lucide-react';
import { VocabularyItem } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

export type BookPaperTheme = 'book' | 'white' | 'sepia' | 'dark';

export interface VocabularyBookPagesProps {
  vocabulary: VocabularyItem[];
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onPracticeWord?: (word: VocabularyItem) => void;
  onAwardXP?: (amount: number, reason?: string) => void;
  initialCategory?: string;
}

export const VocabularyBookPages: React.FC<VocabularyBookPagesProps> = ({
  vocabulary,
  onToggleFavorite,
  onToggleLearned,
  onPracticeWord,
  onAwardXP,
  initialCategory = 'all',
}) => {
  // Page state
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const saved = localStorage.getItem('boli_vocab_book_page');
    return saved ? parseInt(saved, 10) || 1 : 1;
  });
  const [wordsPerPage, setWordsPerPage] = useState<number>(8);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [paperTheme, setPaperTheme] = useState<BookPaperTheme>('book');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [hideMeaning, setHideMeaning] = useState<boolean>(false);
  const [hidePronunciation, setHidePronunciation] = useState<boolean>(false);
  const [pageJumpInput, setPageJumpInput] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto reading state
  const [isAutoReading, setIsAutoReading] = useState<boolean>(false);
  const [activeReadingWordId, setActiveReadingWordId] = useState<string | null>(null);
  const autoReadingRef = useRef<boolean>(false);
  autoReadingRef.current = isAutoReading;

  // Mastered pages tracking in localStorage
  const [masteredPages, setMasteredPages] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('boli_vocab_mastered_pages');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    vocabulary.forEach((v) => {
      if (v.category) cats.add(v.category);
    });
    return ['all', ...Array.from(cats)];
  }, [vocabulary]);

  const CATEGORY_NAMES_BN: Record<string, string> = {
    all: 'সকল বিষয় ও অধ্যায়',
    'Daily Life & Routine': 'দৈনন্দিন জীবন ও অভ্যাস',
    'Communication & Speech': 'কথোপকথন ও সাবলীলতা',
    'Mindset & Feelings': 'মনস্তত্ত্ব ও অনুভূতি',
    'Workplace & Career': 'অফিস ও কর্মক্ষেত্র',
    'Travel & Hospitality': 'ভ্রমণ ও যাতায়াত',
    'Food & Dining': 'খাদ্য ও রেস্তোরাঁ',
    'Health & Fitness': 'স্বাস্থ্য ও ফিটনেস',
    'Education & Learning': 'শিক্ষা ও অ্যাকাডেমিক',
    'Technology & Digital Life': 'প্রযুক্তি ও ডিজিটাল জীবন',
    'Shopping & Money': 'অর্থ ও কেনাকাটা',
    'Emergency & Problem Solving': 'জরুরি অবস্থা ও সমাধান',
    'Reading & Literature': 'সাহিত্য ও গল্প',
  };

  // Filtered vocabulary list
  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(q);
        const matchMeaning = item.banglaMeaning.toLowerCase().includes(q);
        const matchPron = item.pronunciation?.toLowerCase().includes(q);
        const matchSynonym = item.synonyms?.some((s) => s.toLowerCase().includes(q));
        if (!matchWord && !matchMeaning && !matchPron && !matchSynonym) return false;
      }
      return true;
    });
  }, [vocabulary, selectedCategory, searchQuery]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredVocabulary.length / wordsPerPage));

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Persist current page to localStorage
  useEffect(() => {
    localStorage.setItem('boli_vocab_book_page', currentPage.toString());
  }, [currentPage]);

  // Current page items
  const startIndex = (currentPage - 1) * wordsPerPage;
  const pageWords = useMemo(() => {
    return filteredVocabulary.slice(startIndex, startIndex + wordsPerPage);
  }, [filteredVocabulary, startIndex, wordsPerPage]);

  // Split into 2 columns on desktop like a real textbook
  const midPoint = Math.ceil(pageWords.length / 2);
  const leftColumnWords = pageWords.slice(0, midPoint);
  const rightColumnWords = pageWords.slice(midPoint);

  // Keyboard navigation for turning book pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  // Page turns
  const handleNextPage = () => {
    stopAutoReading();
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    stopAutoReading();
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageJumpInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      stopAutoReading();
      setCurrentPage(pageNum);
      setPageJumpInput('');
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Stop auto reading
  const stopAutoReading = () => {
    stopSpeaking();
    setIsAutoReading(false);
    setActiveReadingWordId(null);
  };

  // Toggle auto read full page
  const handleToggleAutoRead = () => {
    if (isAutoReading) {
      stopAutoReading();
      return;
    }

    if (pageWords.length === 0) return;

    setIsAutoReading(true);
    let index = 0;

    const playNextWord = () => {
      if (!autoReadingRef.current || index >= pageWords.length) {
        stopAutoReading();
        if (onAwardXP && index >= pageWords.length) {
          onAwardXP(15, `Completed listening to Vocabulary Page ${currentPage}`);
        }
        return;
      }

      const item = pageWords[index];
      setActiveReadingWordId(item.id);

      // Speak English word then short pause
      speakText(item.word, speechSpeed, () => {
        if (!autoReadingRef.current) return;
        index++;
        setTimeout(() => {
          if (autoReadingRef.current) {
            playNextWord();
          }
        }, 900);
      });
    };

    playNextWord();
  };

  // Copy word
  const handleCopyWord = (item: VocabularyItem) => {
    const text = `${item.word} [${item.pronunciation || ''}] - ${item.banglaMeaning}\nExample: ${item.example}\n(${item.exampleBangla})`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Toggle page mastered
  const handleToggleMasterPage = () => {
    const isMastered = !!masteredPages[currentPage];
    const nextState = { ...masteredPages, [currentPage]: !isMastered };
    setMasteredPages(nextState);
    try {
      localStorage.setItem('boli_vocab_mastered_pages', JSON.stringify(nextState));
    } catch {}

    if (!isMastered && onAwardXP) {
      onAwardXP(20, `Mastered Vocabulary Page ${currentPage}`);
    }
  };

  // Paper Theme styling classes
  const getThemeClass = () => {
    switch (paperTheme) {
      case 'book':
        return 'bg-[#F9F7F1] text-stone-900 border-amber-900/15 shadow-xl';
      case 'sepia':
        return 'bg-[#F4EEDC] text-[#3E2B1D] border-[#8C6D4F]/25 shadow-xl';
      case 'dark':
        return 'bg-[#0F172A] text-slate-100 border-slate-800 shadow-2xl';
      case 'white':
      default:
        return 'bg-white text-slate-900 border-slate-200 shadow-xl';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-base sm:text-lg';
      case 'xlarge':
        return 'text-lg sm:text-xl';
      case 'normal':
      default:
        return 'text-sm sm:text-base';
    }
  };

  // Render a Single Vocabulary Book Entry
  const renderWordEntry = (item: VocabularyItem, indexOnPage: number) => {
    const isPlaying = activeReadingWordId === item.id;
    const globalWordNumber = startIndex + indexOnPage + 1;

    return (
      <div
        key={item.id}
        id={`vocab-book-word-${item.id}`}
        className={`group relative rounded-2xl p-4 sm:p-4.5 border transition-all duration-200 ${
          isPlaying
            ? 'bg-amber-100/90 border-amber-400 ring-2 ring-amber-400/50 shadow-md dark:bg-amber-950/60 dark:border-amber-700'
            : item.isLearned
            ? 'border-emerald-200/90 bg-emerald-50/40 hover:bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/20'
            : paperTheme === 'dark'
            ? 'border-slate-800 bg-slate-900/70 hover:bg-slate-850 hover:border-slate-700'
            : 'border-slate-200/70 bg-white/80 hover:bg-white hover:border-indigo-300 hover:shadow-xs'
        }`}
      >
        <div className="flex items-start justify-between gap-2.5">
          {/* Word Heading & Phonetics */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Word serial number */}
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-lg bg-indigo-100 text-indigo-800 font-mono text-xs font-black dark:bg-indigo-950 dark:text-indigo-300">
                #{globalWordNumber}
              </span>

              {/* English Word */}
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.word}
              </h4>

              {/* Part of Speech */}
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-mono">
                {item.partOfSpeech}
              </span>

              {/* Difficulty */}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                  item.difficulty === 'Beginner'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                    : item.difficulty === 'Intermediate'
                    ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                }`}
              >
                {item.difficulty}
              </span>

              {/* Audio Listen Buttons */}
              <div className="flex items-center gap-1 ml-auto sm:ml-0">
                <button
                  type="button"
                  onClick={() => speakText(item.word, speechSpeed)}
                  className="rounded-lg p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  title="উচ্চারণ শুনুন (1.0x)"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => speakText(item.word, 0.65)}
                  className="rounded-md px-1.5 py-0.5 text-[10px] font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="ধীরে ধীরে শুনুন (Slow 0.65x)"
                >
                  Slow
                </button>
              </div>
            </div>

            {/* Pronunciation & IPA Badge (Can be toggled) */}
            {!hidePronunciation && (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                {item.pronunciation && (
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 font-bangla">
                    <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-normal">উচ্চারণ:</span>
                    <span>{item.pronunciation}</span>
                  </span>
                )}
                {item.ipa && (
                  <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {item.ipa}
                  </span>
                )}
              </div>
            )}

            {/* Bengali Meaning (Can be toggled in practice mode) */}
            <div className="mt-2.5">
              {hideMeaning ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-dashed border-amber-300 dark:border-amber-800 text-xs font-bold text-amber-800 dark:text-amber-300 cursor-pointer">
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>[বাংলা অর্থ লুকানো — মনে করার চেষ্টা করুন]</span>
                </div>
              ) : (
                <div className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 font-bangla leading-snug">
                  {item.banglaMeaning}
                </div>
              )}
            </div>

            {/* Example sentence with translation */}
            {item.example && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                    💡 &ldquo;{item.example}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => speakText(item.example, speechSpeed)}
                    className="p-1 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                    title="উদাহরণ শুনুন"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                {item.exampleBangla && !hideMeaning && (
                  <p className="text-slate-600 dark:text-slate-400 font-bangla text-[11px] leading-relaxed">
                    অর্থ: {item.exampleBangla}
                  </p>
                )}
              </div>
            )}

            {/* Synonyms pills */}
            {item.synonyms && item.synonyms.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="font-semibold text-slate-400 font-bangla">সমার্থক:</span>
                {item.synonyms.slice(0, 4).map((syn, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => speakText(syn, speechSpeed)}
                    className="rounded-md bg-white dark:bg-slate-800 px-2 py-0.5 font-medium text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {syn}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons: Favorite, Learned, Copy */}
          <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
            {/* Favorite */}
            <button
              type="button"
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                item.isFavorite
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/60'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={item.isFavorite ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দে যোগ করুন'}
            >
              <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Mark Learned */}
            <button
              type="button"
              onClick={() => onToggleLearned(item.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                item.isLearned
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60'
                  : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={item.isLearned ? 'পড়া সম্পন্ন' : 'পড়া হয়েছে হিসেবে মার্ক করুন'}
            >
              <CheckCircle2 className={`h-4 w-4 ${item.isLearned ? 'fill-current' : ''}`} />
            </button>

            {/* Copy */}
            <button
              type="button"
              onClick={() => handleCopyWord(item)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="শব্দ ও অর্থ কপি করুন"
            >
              {copiedId === item.id ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="vocabulary-book-pages-container" className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* 1. Top Book Header Banner */}
      <div className="rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/90 via-white to-sky-50/50 p-6 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 py-1 text-xs font-bold text-white shadow-xs">
              <BookOpen className="h-3.5 w-3.5" />
              <span>ডিজিটাল ভোকাবুলারি বই • Vocabulary Reader Pages</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              বইয়ের পাতার মতো শব্দভাণ্ডার (Page-by-Page Book)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans max-w-2xl">
              প্রতিটি পৃষ্ঠায় স্পষ্ট উচ্চারণ, বাংলা অর্থ, ব্যাকরণশ্রেণি, বাস্তব উদাহরণ ও সমার্থক শব্দসহ সাজানো ডিজিটাল ভোকাবুলারি বই। পাতার পর পাতা উল্টে সহজেই আয়ত্ত করুন।
            </p>
          </div>

          {/* Book Progress Badge */}
          <div className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Book Navigation
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                পৃষ্ঠা {currentPage} / {totalPages}
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-bangla">
                মোট {filteredVocabulary.length}টি শব্দ
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-indigo-500" />
            অধ্যায় / বিষয়:
          </span>
          {categories.map((cat) => {
            const count = cat === 'all'
              ? vocabulary.length
              : vocabulary.filter((v) => v.category === cat).length;
            const isActive = selectedCategory === cat;
            const labelBn = CATEGORY_NAMES_BN[cat] || (cat === 'all' ? 'সকল অধ্যায়' : cat);

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                  stopAutoReading();
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                <span>{labelBn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Book Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800">
        {/* Left Controls: Page Jump & Words per page */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Page Jump */}
          <form onSubmit={handlePageJump} className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">পৃষ্ঠা:</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={pageJumpInput}
              onChange={(e) => setPageJumpInput(e.target.value)}
              placeholder={`${currentPage}`}
              className="w-14 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-center font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              title="১ থেকে সর্বোচ্চ পৃষ্ঠার নম্বর লিখুন"
            />
            <button
              type="submit"
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              title="ওই পৃষ্ঠায় যান"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Words Per Page Selector */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 hidden md:inline">প্রতি পাতায়:</span>
            <select
              value={wordsPerPage}
              onChange={(e) => {
                setWordsPerPage(Number(e.target.value));
                setCurrentPage(1);
                stopAutoReading();
              }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer focus:outline-indigo-500"
            >
              <option value={6}>৬টি শব্দ</option>
              <option value={8}>৮টি শব্দ</option>
              <option value={10}>১০টি শব্দ</option>
              <option value={12}>১২টি শব্দ</option>
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="বইয়ের শব্দ খুঁজুন..."
              className="w-32 sm:w-44 rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-indigo-500"
            />
          </div>
        </div>

        {/* Right Controls: Auto-read page, Practice Toggle, Theme */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Auto Read Page Audio Button */}
          <button
            type="button"
            onClick={handleToggleAutoRead}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isAutoReading
                ? 'bg-rose-600 text-white shadow-md animate-pulse'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
            title="সম্পূর্ণ পাতা একনাগাড়ে অডিও শুনুন"
          >
            {isAutoReading ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>পড়া থামান</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>পুরো পাতা শুনুন</span>
              </>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() => setSpeechSpeed((prev) => (prev === 1.0 ? 0.8 : prev === 0.8 ? 1.2 : 1.0))}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
            title="স্পিড পরিবর্তন করুন"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-500" />
            <span>{speechSpeed}x</span>
          </button>

          {/* Toggle Pronunciation */}
          <button
            type="button"
            onClick={() => setHidePronunciation((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
              hidePronunciation
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
            title="উচ্চারণ লুকান বা দেখান"
          >
            {hidePronunciation ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">উচ্চারণ</span>
          </button>

          {/* Toggle Meaning (Self-Test Mode) */}
          <button
            type="button"
            onClick={() => setHideMeaning((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
              hideMeaning
                ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
            title="অর্থ টেস্ট / কুইজ মোড"
          >
            {hideMeaning ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">অর্থ টেস্ট</span>
          </button>

          {/* Paper Theme Switcher */}
          <div className="flex items-center rounded-xl border border-slate-200 p-0.5 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setPaperTheme('book')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                paperTheme === 'book' ? 'bg-amber-100 text-amber-900 shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
              title="বইয়ের পাতা (Vintage Book Paper)"
            >
              বই
            </button>
            <button
              type="button"
              onClick={() => setPaperTheme('white')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                paperTheme === 'white' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
              title="সাদা পাতা"
            >
              সাদা
            </button>
            <button
              type="button"
              onClick={() => setPaperTheme('sepia')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                paperTheme === 'sepia' ? 'bg-[#EADFCA] text-stone-900 shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
              title="সেপিয়া"
            >
              সেপিয়া
            </button>
            <button
              type="button"
              onClick={() => setPaperTheme('dark')}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                paperTheme === 'dark' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
              }`}
              title="নাইট মোড"
            >
              ডার্ক
            </button>
          </div>
        </div>
      </div>

      {/* 3. The Digital Vocabulary Book Sheet */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 md:p-10 transition-all ${getThemeClass()}`}
      >
        {/* Subtle Decorative Book Binding Crease in Center on Desktop */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -ml-px w-0.5 hidden lg:block bg-gradient-to-b from-transparent via-amber-900/10 dark:via-slate-800 to-transparent" />

        {/* Vintage Top Page Header Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-amber-900/15 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold uppercase tracking-wider font-sans">
              VOCABULARY LEARNING BOOK • শব্দভাণ্ডার
            </span>
            <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 font-bangla">
              {CATEGORY_NAMES_BN[selectedCategory] || selectedCategory}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0 font-mono text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              — পৃষ্ঠা {currentPage} / {totalPages} —
            </span>
            {masteredPages[currentPage] && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-bangla">
                <CheckCircle2 className="h-3.5 w-3.5" />
                পাতা সম্পন্ন
              </span>
            )}
          </div>
        </div>

        {/* Word Entries inside Book Sheet */}
        {pageWords.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            কোনো শব্দ পাওয়া যায়নি। সার্চ ফিল্টার রিসেট করুন।
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            {/* Left Page Column */}
            <div className="space-y-4">
              {leftColumnWords.map((word, idx) => renderWordEntry(word, idx))}
            </div>

            {/* Right Page Column */}
            <div className="space-y-4">
              {rightColumnWords.map((word, idx) => renderWordEntry(word, midPoint + idx))}
            </div>
          </div>
        )}

        {/* Book Sheet Footer Line with Page Completion Button */}
        <div className="mt-8 pt-6 border-t border-amber-900/15 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>শব্দ {startIndex + 1} থেকে {Math.min(startIndex + wordsPerPage, filteredVocabulary.length)}</span>
            <span>•</span>
            <span>মোট {filteredVocabulary.length}টি শব্দের মধ্যে</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleMasterPage}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                masteredPages[currentPage]
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{masteredPages[currentPage] ? 'পাতা আয়ত্ত হয়েছে ✓' : 'এই পাতা মুখস্থ মার্ক করুন (+20 XP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bottom Page Turning Controls (Prev Page / Next Page) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800">
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentPage <= 1
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>পূর্ববর্তী পাতা</span>
        </button>

        {/* Quick Page Indicator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full px-2 py-1">
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            let pageNum = i + 1;
            if (totalPages > 7) {
              if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }
            }

            const isCurrent = pageNum === currentPage;
            const isMastered = masteredPages[pageNum];

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => {
                  stopAutoReading();
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isMastered
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentPage >= totalPages
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
          }`}
        >
          <span>পরবর্তী পাতা</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
