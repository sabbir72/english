import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Bookmark,
  BookmarkCheck,
  Search,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles,
  BookOpen,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Check,
  Copy,
  BookMarked,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { BookChapter, BookSentenceItem } from '../../types';
import { SPOKEN_BOOK_CHAPTERS } from '../../data/spokenBookData';
import { speakText, stopSpeaking } from '../../utils/speech';

export interface SpokenBookSectionProps {
  onSaveSentence?: (english: string, bangla: string) => void;
  onAwardXP?: (amount: number, reason: string) => void;
}

type PaperTheme = 'book' | 'white' | 'sepia' | 'dark';

export const SpokenBookSection: React.FC<SpokenBookSectionProps> = ({
  onSaveSentence,
  onAwardXP,
}) => {
  const [chapters] = useState<BookChapter[]>(SPOKEN_BOOK_CHAPTERS);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [paperTheme, setPaperTheme] = useState<PaperTheme>('book');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [hidePronunciation, setHidePronunciation] = useState<boolean>(false);
  const [hideMeaning, setHideMeaning] = useState<boolean>(false);
  const [activeReadingId, setActiveReadingId] = useState<number | null>(null);
  const [isAutoReading, setIsAutoReading] = useState<boolean>(false);
  const [savedSentences, setSavedSentences] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [pageJumpInput, setPageJumpInput] = useState<string>('');

  const autoReadingRef = useRef<boolean>(false);
  autoReadingRef.current = isAutoReading;

  const currentChapter = chapters[selectedChapterIndex] || chapters[0];

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    chapters.forEach((c) => {
      if (c.category) cats.add(c.category);
    });
    return Array.from(cats);
  }, [chapters]);

  // Group chapters by category for the select dropdown
  const chaptersByCategory = useMemo(() => {
    const map = new Map<string, { chap: BookChapter; globalIndex: number }[]>();
    chapters.forEach((chap, idx) => {
      const cat = chap.category || 'অন্যান্য';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push({ chap, globalIndex: idx });
    });
    return map;
  }, [chapters]);

  // Keyboard navigation for page turn (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if (e.key === 'ArrowRight' && selectedChapterIndex < chapters.length - 1) {
        setSelectedChapterIndex((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft' && selectedChapterIndex > 0) {
        setSelectedChapterIndex((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedChapterIndex, chapters.length]);

  // Stop auto reading when changing chapter or unmounting
  useEffect(() => {
    return () => {
      stopSpeaking();
      setIsAutoReading(false);
    };
  }, [selectedChapterIndex]);

  // Handle single sentence pronunciation
  const handlePlaySentence = (sentence: BookSentenceItem) => {
    stopSpeaking();
    setActiveReadingId(sentence.id);
    speakText(sentence.english, speechRate, () => {
      setActiveReadingId(null);
    });
  };

  // Handle Auto Read Page (Play all sentences sequentially)
  const handleToggleAutoRead = () => {
    if (isAutoReading) {
      stopSpeaking();
      setIsAutoReading(false);
      setActiveReadingId(null);
      return;
    }

    setIsAutoReading(true);
    let index = 0;
    const sentences = currentChapter.sentences;

    const playNext = () => {
      if (!autoReadingRef.current || index >= sentences.length) {
        setIsAutoReading(false);
        setActiveReadingId(null);
        if (onAwardXP && index >= sentences.length) {
          onAwardXP(20, `Completed reading Chapter ${currentChapter.number}`);
        }
        return;
      }

      const item = sentences[index];
      setActiveReadingId(item.id);

      speakText(item.english, speechRate, () => {
        if (!autoReadingRef.current) return;
        index++;
        setTimeout(() => {
          if (autoReadingRef.current) {
            playNext();
          }
        }, 600);
      });
    };

    playNext();
  };

  const handleCopySentence = (item: BookSentenceItem) => {
    navigator.clipboard.writeText(`${item.english}\n${item.banglaPronunciation}\n${item.banglaMeaning}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleBookmark = (item: BookSentenceItem) => {
    const key = `${currentChapter.id}-${item.id}`;
    const newStatus = !savedSentences[key];
    setSavedSentences((prev) => ({ ...prev, [key]: newStatus }));

    if (newStatus && onSaveSentence) {
      onSaveSentence(item.english, item.banglaMeaning);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageJumpInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= chapters.length) {
      setSelectedChapterIndex(pageNum - 1);
      setPageJumpInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter sentences if search query is provided
  const filteredSentences = searchQuery.trim()
    ? currentChapter.sentences.filter(
        (s) =>
          s.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.banglaMeaning.includes(searchQuery) ||
          s.banglaPronunciation.includes(searchQuery)
      )
    : currentChapter.sentences;

  // Split into two columns like the original book photo
  const midPoint = Math.ceil(filteredSentences.length / 2);
  const leftColumn = filteredSentences.slice(0, midPoint);
  const rightColumn = filteredSentences.slice(midPoint);

  // Theme styles
  const getThemeClass = () => {
    switch (paperTheme) {
      case 'book':
        return 'bg-[#F9F7F1] text-stone-900 border-amber-900/15 shadow-xl';
      case 'sepia':
        return 'bg-[#F4EEDC] text-[#3E2B1D] border-[#8C6D4F]/20 shadow-xl';
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

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const total = chapters.length;
    const current = selectedChapterIndex + 1;
    const items: (number | string)[] = [];

    if (total <= 9) {
      for (let i = 1; i <= total; i++) items.push(i);
    } else {
      items.push(1);
      if (current > 4) {
        items.push('...');
      }

      const start = Math.max(2, current - 2);
      const end = Math.min(total - 1, current + 2);

      for (let i = start; i <= end; i++) {
        if (!items.includes(i)) items.push(i);
      }

      if (current < total - 3) {
        items.push('...');
      }
      if (!items.includes(total)) items.push(total);
    }

    return items;
  }, [chapters.length, selectedChapterIndex]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans print:p-0">
      {/* Category Navigation Pills */}
      <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 print:hidden overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <div className="flex items-center gap-1 text-xs font-bold text-slate-500 mr-2">
            <Filter className="h-3.5 w-3.5 text-indigo-500" />
            <span>বিষয়শ্রেণী:</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            সব অধ্যায় ({chapters.length} পাতা)
          </button>
          {categories.map((cat) => {
            const count = chapters.filter((c) => c.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  // Auto navigate to the first chapter of this category
                  const firstIdx = chapters.findIndex((c) => c.category === cat);
                  if (firstIdx !== -1) {
                    setSelectedChapterIndex(firstIdx);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Interactive Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 print:hidden">
        {/* Chapter Selection Dropdown with optgroups */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <select
            id="book-chapter-selector"
            value={selectedChapterIndex}
            onChange={(e) => {
              setSelectedChapterIndex(Number(e.target.value));
              setSearchQuery('');
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 cursor-pointer focus:outline-indigo-500 max-w-[280px] sm:max-w-md"
          >
            {Array.from(chaptersByCategory.entries()).map(([cat, list]) => (
              <optgroup key={cat} label={`📂 ${cat}`}>
                {list.map(({ chap, globalIndex }) => (
                  <option key={chap.id} value={globalIndex}>
                    পাতা {chap.number}: {chap.title} ({chap.sentences.length} বাক্য)
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Reader Options & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Page Jump */}
          <form onSubmit={handlePageJump} className="flex items-center gap-1">
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">পৃষ্ঠা:</span>
            <input
              type="number"
              min={1}
              max={chapters.length}
              value={pageJumpInput}
              onChange={(e) => setPageJumpInput(e.target.value)}
              placeholder={`${currentChapter.number}`}
              className="w-14 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-center font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              title="১ থেকে ১০০ পৃষ্ঠার যেকোনো নম্বর লিখুন"
            />
            <button
              type="submit"
              className="px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
              title="যাও (Go to page)"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Search within chapter */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বাক্য খুঁজুন..."
              className="w-28 sm:w-36 rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-indigo-500"
            />
          </div>

          {/* Auto Read Page Button */}
          <button
            type="button"
            onClick={handleToggleAutoRead}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isAutoReading
                ? 'bg-rose-600 text-white shadow-md animate-pulse'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
            }`}
            title="একটানা সম্পূর্ণ পাতা অডিও শুনুন"
          >
            {isAutoReading ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>থামান</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>পাতা পড়ুন</span>
              </>
            )}
          </button>

          {/* Voice Speed Toggle */}
          <button
            type="button"
            onClick={() => setSpeechRate((prev) => (prev === 1.0 ? 0.8 : 1.0))}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
            title="উচ্চারণের গতি পরিবর্তন করুন"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-500" />
            <span>{speechRate}x</span>
          </button>

          {/* Hide/Show Pronunciation */}
          <button
            type="button"
            onClick={() => setHidePronunciation((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
              hidePronunciation
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
            title="বাংলা উচ্চারণ লুকান / দেখান"
          >
            {hidePronunciation ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">উচ্চারণ</span>
          </button>

          {/* Hide/Show Meaning (Practice Mode) */}
          <button
            type="button"
            onClick={() => setHideMeaning((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer ${
              hideMeaning
                ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
            title="অর্থ লুকান / কুইজ মোড"
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
              নাইট
            </button>
          </div>

          {/* Font Size Adjuster */}
          <button
            type="button"
            onClick={() => {
              setFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal'));
            }}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
            title="ফন্ট সাইজ পরিবর্তন করুন"
          >
            A {fontSize === 'normal' ? '1x' : fontSize === 'large' ? '1.2x' : '1.5x'}
          </button>

          {/* Print / PDF Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer"
            title="প্রিন্ট করুন বা PDF হিসেবে সেভ করুন"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. REALISTIC PRINTED BOOK PAGE CONTAINER (Matching User Screenshot) */}
      <article
        id="spoken-book-page"
        className={`relative mx-auto rounded-3xl border p-6 sm:p-10 md:p-12 transition-all duration-300 ${getThemeClass()} print:border-none print:shadow-none print:p-2`}
        style={{
          minHeight: '750px',
        }}
      >
        {/* Subtle physical book spine effect on left for realistic tactile feeling */}
        <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-3xl bg-gradient-to-r from-black/10 to-transparent pointer-events-none print:hidden" />

        {/* Page Top Header - Exactly as in the user's uploaded image */}
        <header className="text-center space-y-4 mb-6">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400 border-b border-stone-300/60 dark:border-slate-800 pb-2">
            <span>স্পোকেন ইংলিশ মাস্টার বুক</span>
            <span className="px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
              {currentChapter.category || 'দৈনন্দিন ইংরেজি'}
            </span>
            <span>পাতা {currentChapter.number} / {chapters.length}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-serif pt-1">
            স্পোকেন ইংলিশ এর সেরা বই!
          </h1>

          {/* Grey Chapter Banner Bar (Matching photo) */}
          <div className="inline-block w-full max-w-lg mx-auto py-2.5 px-6 rounded-md bg-stone-300/70 dark:bg-slate-800 text-stone-900 dark:text-stone-100 font-bold text-lg sm:text-xl text-center shadow-2xs">
            {currentChapter.bannerTitle}
          </div>

          {/* Introductory Advice Paragraph (Matching photo) */}
          <div className="max-w-2xl mx-auto text-left text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-slate-300 space-y-2 px-2">
            {currentChapter.introLines.map((line, idx) => (
              <p key={idx} className="font-bangla leading-normal">
                {line}
              </p>
            ))}
          </div>

          {/* Decorative Divider Line (Matching photo) */}
          <div className="flex items-center justify-center pt-2">
            <div className="h-[1.5px] w-32 bg-stone-300 dark:bg-slate-700 rounded-full" />
          </div>
        </header>

        {/* Search Results Notice */}
        {searchQuery.trim() && (
          <div className="mb-4 text-xs font-semibold text-stone-500 dark:text-slate-400 text-center">
            "{searchQuery}" এর জন্য {filteredSentences.length}টি বাক্য পাওয়া গেছে
          </div>
        )}

        {/* 3. TWO-COLUMN BOOK ENTRIES GRID (Matching User Screenshot Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 pt-2">
          {/* Left Column (Items 1 to Half) */}
          <div className="space-y-6">
            {leftColumn.map((item) => (
              <BookSentenceRow
                key={item.id}
                item={item}
                fontSizeClass={getFontSizeClass()}
                hidePronunciation={hidePronunciation}
                hideMeaning={hideMeaning}
                isActive={activeReadingId === item.id}
                isSaved={!!savedSentences[`${currentChapter.id}-${item.id}`]}
                isCopied={copiedId === item.id}
                onPlay={() => handlePlaySentence(item)}
                onBookmark={() => handleBookmark(item)}
                onCopy={() => handleCopySentence(item)}
              />
            ))}
          </div>

          {/* Right Column (Items Half+1 to End) */}
          <div className="space-y-6">
            {rightColumn.map((item) => (
              <BookSentenceRow
                key={item.id}
                item={item}
                fontSizeClass={getFontSizeClass()}
                hidePronunciation={hidePronunciation}
                hideMeaning={hideMeaning}
                isActive={activeReadingId === item.id}
                isSaved={!!savedSentences[`${currentChapter.id}-${item.id}`]}
                isCopied={copiedId === item.id}
                onPlay={() => handlePlaySentence(item)}
                onBookmark={() => handleBookmark(item)}
                onCopy={() => handleCopySentence(item)}
              />
            ))}
          </div>
        </div>

        {/* Book Footer / Page Number */}
        <footer className="mt-12 pt-6 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-serif italic">BoliEnglish 100-Page Daily Spoken Guide</span>
            <span className="hidden sm:inline">• অধ্যায় {currentChapter.number}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-700 dark:text-stone-300">পৃষ্ঠা {currentChapter.number} / {chapters.length}</span>
          </div>
        </footer>
      </article>

      {/* 4. Bottom Page Turners & Smart Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs dark:bg-slate-900 dark:border-slate-800 print:hidden">
        {/* Previous Button */}
        <button
          type="button"
          disabled={selectedChapterIndex === 0}
          onClick={() => {
            setSelectedChapterIndex((prev) => Math.max(0, prev - 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none cursor-pointer w-full sm:w-auto justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>আগের পাতা (Prev)</span>
        </button>

        {/* Numeric Pagination (Smart Ellipses for 100 Pages) */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {paginationItems.map((item, idx) => {
            if (typeof item === 'string') {
              return (
                <span key={`ellipsis-${idx}`} className="px-1 text-slate-400 text-xs font-bold select-none">
                  ...
                </span>
              );
            }
            const isCurrent = selectedChapterIndex + 1 === item;
            return (
              <button
                key={`page-${item}`}
                type="button"
                onClick={() => {
                  setSelectedChapterIndex(item - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`min-w-[32px] h-8 px-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-xs scale-105'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
                title={`পৃষ্ঠা ${item} এ যান`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={selectedChapterIndex === chapters.length - 1}
          onClick={() => {
            setSelectedChapterIndex((prev) => Math.min(chapters.length - 1, prev + 1));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-xs w-full sm:w-auto justify-center"
        >
          <span>পরের পাতা (Next)</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Helper Tips at bottom */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 py-2 print:hidden">
        💡 টিপস: কীবোর্ডের <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">←</kbd> ও <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">→</kbd> চাপলে সহজেই আগের ও পরের পাতায় যেতে পারবেন। যেকোনো বাক্যে ক্লিক করলে উচ্চারণ শুনতে পাবেন।
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Sub-Component: Single Sentence Item formatted exactly like Book
// -------------------------------------------------------------
interface BookSentenceRowProps {
  item: BookSentenceItem;
  fontSizeClass: string;
  hidePronunciation: boolean;
  hideMeaning: boolean;
  isActive: boolean;
  isSaved: boolean;
  isCopied: boolean;
  onPlay: () => void;
  onBookmark: () => void;
  onCopy: () => void;
}

const BookSentenceRow: React.FC<BookSentenceRowProps> = ({
  item,
  fontSizeClass,
  hidePronunciation,
  hideMeaning,
  isActive,
  isSaved,
  isCopied,
  onPlay,
  onBookmark,
  onCopy,
}) => {
  return (
    <div
      className={`group relative flex items-start gap-3.5 p-2 rounded-xl transition-all ${
        isActive
          ? 'bg-indigo-50/80 ring-2 ring-indigo-400 dark:bg-indigo-950/40 dark:ring-indigo-600'
          : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
      }`}
    >
      {/* 1. Number Badge - Matching screenshot [ 1 ] with light grey background */}
      <div className="flex-shrink-0 flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-stone-300/80 dark:bg-slate-700/80 text-stone-900 dark:text-stone-100 font-bold text-xs sm:text-sm shadow-2xs select-none mt-0.5">
        {item.id}
      </div>

      {/* 2. Text Content: English Sentence + Pronunciation + Bangla Meaning */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Line 1: English Sentence */}
        <div className="flex items-center justify-between gap-2">
          <div
            onClick={onPlay}
            className={`font-semibold tracking-tight text-slate-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${fontSizeClass}`}
          >
            {item.english}
          </div>

          {/* Quick Action Icons on Hover */}
          <div className="opacity-0 group-hover:opacity-100 sm:transition-opacity flex items-center gap-1 print:hidden">
            <button
              type="button"
              onClick={onPlay}
              className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Listen pronunciation"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onCopy}
              className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Copy text"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={onBookmark}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isSaved
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark sentence"
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 fill-current" /> : <Bookmark className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Line 2: Bengali Pronunciation (Matching Screenshot) */}
        {!hidePronunciation ? (
          <div className="text-xs sm:text-[13px] text-stone-500 dark:text-slate-400 font-bangla tracking-wide">
            {item.banglaPronunciation}
          </div>
        ) : (
          <div className="text-[11px] text-stone-400 dark:text-slate-600 italic">
            [উচ্চারণ লুকানো আছে]
          </div>
        )}

        {/* Line 3: Bengali Meaning (Bold font, Matching Screenshot) */}
        {!hideMeaning ? (
          <div className="text-xs sm:text-[14px] font-bold text-stone-900 dark:text-stone-100 font-bangla leading-snug">
            {item.banglaMeaning}
          </div>
        ) : (
          <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 italic">
            [অর্থ লুকানো - মনে মনে বলুন]
          </div>
        )}
      </div>
    </div>
  );
};
