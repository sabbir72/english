import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Square,
  CheckCircle2,
  Circle,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  HelpCircle,
  Layers,
  ArrowRight,
  Award,
  RotateCcw,
  Printer,
  Grid,
  ListFilter,
  Check,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { SmartBookPage, SmartBookVocabWord } from '../../types';
import {
  SMART_BOOK_100_PAGES,
  SMART_BOOK_CHAPTERS,
  TOTAL_SMART_BOOK_PAGES,
  TOTAL_SMART_VOCAB_COUNT,
} from '../../data/smartBook';
import { speakText, stopSpeaking } from '../../utils/speech';

export interface SmartStoryBook100SectionProps {
  onSaveWord?: (word: string, meaning: string) => void;
  onAwardXP?: (amount: number, reason?: string) => void;
  initialPageNumber?: number;
}

export const SmartStoryBook100Section: React.FC<SmartStoryBook100SectionProps> = ({
  onSaveWord,
  onAwardXP,
  initialPageNumber = 1,
}) => {
  // Current Page State (1-100)
  const [currentPageNum, setCurrentPageNum] = useState<number>(() => {
    const saved = localStorage.getItem('smart_book_current_page');
    return saved ? Math.min(100, Math.max(1, parseInt(saved, 10))) : initialPageNumber;
  });

  // Completed Pages Tracker
  const [completedPages, setCompletedPages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('smart_book_completed_pages');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Bookmarked Pages
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('smart_book_bookmarked_pages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Saved Words Record
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  // View Mode: 'story' (Full Interactive Mode), 'table' (Vocabulary Study Table), 'quiz' (Page Practice)
  const [viewMode, setViewMode] = useState<'story' | 'table' | 'quiz'>('story');

  // Chapter filter & Search
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<number>(0); // 0 = all
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageGridOpen, setPageGridOpen] = useState<boolean>(false);

  // Audio / Speech State
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);
  const [isReadingStory, setIsReadingStory] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  // Quiz state for current page
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Quick jump input
  const [jumpPageInput, setJumpPageInput] = useState<string>('');

  // Active word highlight popup
  const [activeWordPopup, setActiveWordPopup] = useState<SmartBookVocabWord | null>(null);

  // Sync to storage
  useEffect(() => {
    localStorage.setItem('smart_book_current_page', currentPageNum.toString());
  }, [currentPageNum]);

  useEffect(() => {
    localStorage.setItem('smart_book_completed_pages', JSON.stringify(completedPages));
  }, [completedPages]);

  useEffect(() => {
    localStorage.setItem('smart_book_bookmarked_pages', JSON.stringify(bookmarkedPages));
  }, [bookmarkedPages]);

  // Current Page Data
  const currentPage: SmartBookPage = useMemo(() => {
    const found = SMART_BOOK_100_PAGES.find((p) => p.pageNumber === currentPageNum);
    return found || SMART_BOOK_100_PAGES[0];
  }, [currentPageNum]);

  // Reset quiz state when page changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setActiveWordPopup(null);
    stopSpeaking();
    setIsReadingStory(false);
    setSpeakingWordId(null);
  }, [currentPageNum]);

  // Handle Page Turn
  const handleNextPage = () => {
    if (currentPageNum < TOTAL_SMART_BOOK_PAGES) {
      setCurrentPageNum((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageNum]);

  // Toggle Completed
  const togglePageCompleted = (pageNum: number) => {
    setCompletedPages((prev) => {
      if (prev.includes(pageNum)) {
        return prev.filter((p) => p !== pageNum);
      } else {
        if (onAwardXP) onAwardXP(25, `Completed Page ${pageNum}`);
        return [...prev, pageNum];
      }
    });
  };

  // Toggle Bookmark
  const toggleBookmark = (pageNum: number) => {
    setBookmarkedPages((prev) =>
      prev.includes(pageNum) ? prev.filter((p) => p !== pageNum) : [...prev, pageNum]
    );
  };

  // Speak single word
  const handlePlayWord = (wordItem: SmartBookVocabWord) => {
    stopSpeaking();
    setSpeakingWordId(wordItem.id);
    speakText(wordItem.word, 'en-US', speechRate);
    setTimeout(() => {
      setSpeakingWordId(null);
    }, 1600);
  };

  // Speak Example Sentence
  const handlePlaySentence = (sentence: string) => {
    stopSpeaking();
    speakText(sentence, 'en-US', speechRate);
  };

  // Read full story
  const handleToggleStorySpeech = () => {
    if (isReadingStory) {
      stopSpeaking();
      setIsReadingStory(false);
    } else {
      setIsReadingStory(true);
      // Clean story of asterisks
      const plainText = currentPage.storyBengali.replace(/\*\*/g, '');
      speakText(plainText, 'bn-BD', speechRate);
    }
  };

  // Render Story with Clickable Words
  const renderStoryHtml = (story: string) => {
    // Splits by **Word**
    const parts = story.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanWord = part.slice(2, -2).trim();
        // find if matched in page vocabulary
        const vocabMatch = currentPage.vocabulary.find(
          (v) => v.word.toLowerCase() === cleanWord.toLowerCase()
        );
        return (
          <button
            key={index}
            onClick={() => {
              if (vocabMatch) {
                setActiveWordPopup(vocabMatch);
                handlePlayWord(vocabMatch);
              }
            }}
            className="inline-flex items-baseline px-1.5 py-0.5 mx-0.5 rounded-md font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-900 dark:text-indigo-300 dark:bg-indigo-950/70 dark:hover:bg-indigo-900/80 transition-colors border border-indigo-200/60 dark:border-indigo-800/60 cursor-pointer shadow-2xs group"
            title={vocabMatch ? `${vocabMatch.word} (${vocabMatch.banglaPronunciation}) - ক্লিক করুন` : cleanWord}
          >
            <span>{cleanWord}</span>
            <Volume2 className="h-3 w-3 ml-1 text-indigo-500 opacity-60 group-hover:opacity-100 inline" />
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Filtered pages for grid
  const filteredPages = useMemo(() => {
    return SMART_BOOK_100_PAGES.filter((p) => {
      if (selectedChapterFilter !== 0 && p.chapterNumber !== selectedChapterFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch =
          p.title.toLowerCase().includes(query) || p.titleBn.toLowerCase().includes(query);
        const vocabMatch = p.vocabulary.some(
          (v) =>
            v.word.toLowerCase().includes(query) ||
            v.banglaMeaning.toLowerCase().includes(query) ||
            v.banglaPronunciation.toLowerCase().includes(query)
        );
        return titleMatch || vocabMatch;
      }
      return true;
    });
  }, [selectedChapterFilter, searchQuery]);

  // Overall Completion Percent
  const completionPercent = Math.round((completedPages.length / TOTAL_SMART_BOOK_PAGES) * 100);

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* 1. Header Banner & Progress Indicator */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/40 p-5 sm:p-7 shadow-[0_2px_12px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:from-[#1E293B] dark:via-slate-900/90 dark:to-indigo-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                <BookOpen className="h-3.5 w-3.5" />
                <span>100-Page Smart Story Immersion</span>
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-bangla">
                গল্পে গল্পে ১০০ পৃষ্ঠা ইংরেজি
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Page {currentPage.pageNumber}: {currentPage.titleBn}
            </h1>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {currentPage.title} • {currentPage.chapterTitleBn} ({currentPage.theme})
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs text-center min-w-[100px]">
              <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 font-bangla">
                সম্পন্ন
              </span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                {completedPages.length} / {TOTAL_SMART_BOOK_PAGES}
              </span>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setPageGridOpen(true)}
              className="flex items-center gap-2 px-3.5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-bold text-sm text-slate-800 dark:text-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <Grid className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bangla">১০০ পৃষ্ঠার সূচি</span>
            </button>
          </div>
        </div>

        {/* Navigation & Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* Previous / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPageNum <= 1}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>পূর্বের পৃষ্ঠা</span>
            </button>

            <span className="px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-black border border-indigo-200/70 dark:border-indigo-800/60">
              Page {currentPageNum} of 100
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPageNum >= TOTAL_SMART_BOOK_PAGES}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <span>পরবর্তী পৃষ্ঠা</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* View Modes Tabs */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold">
            <button
              onClick={() => setViewMode('story')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'story'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              📖 গল্প ও শব্দভাণ্ডার
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              📊 শব্দ বিশ্লেষণ ছক
            </button>
            <button
              onClick={() => setViewMode('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'quiz'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ⚡ দ্রুত কুইজ
            </button>
          </div>

          {/* Action buttons (Complete, Bookmark, Audio) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => togglePageCompleted(currentPageNum)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                completedPages.includes(currentPageNum)
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{completedPages.includes(currentPageNum) ? 'সম্পন্ন হয়েছে ✓' : 'সম্পন্ন চিহ্নিত করুন'}</span>
            </button>

            <button
              onClick={() => toggleBookmark(currentPageNum)}
              className={`p-2 rounded-xl text-xs border transition-colors cursor-pointer shadow-2xs ${
                bookmarkedPages.includes(currentPageNum)
                  ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-amber-500'
              }`}
              title="বুকমার্ক করুন"
            >
              {bookmarkedPages.includes(currentPageNum) ? (
                <BookmarkCheck className="h-4 w-4 fill-amber-500 text-amber-500" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content Based on View Mode */}
      {viewMode === 'story' && (
        <div className="space-y-6">
          {/* The Story Container (Styled like the printed book page in photo) */}
          <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-[0_2px_8px_rgba(15,23,42,0.04)] dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-slate-800/70">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  গল্পের প্রেক্ষাপট ও বাক্য ব্যবহার
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleStorySpeech}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                    isReadingStory
                      ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
                      : 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300'
                  }`}
                >
                  {isReadingStory ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-rose-600" />
                      <span>বন্ধ করুন</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-indigo-600" />
                      <span>গল্প শুনুন (Audio)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Story Paragraph with Clickable Highlights */}
            <div className="mt-6 text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-800 dark:text-slate-200 font-serif">
              {renderStoryHtml(currentPage.storyBengali)}
            </div>

            {/* Practical Tip */}
            {currentPage.practicalTipBn && (
              <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/50 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                    স্পোকেন ইংলিশ স্মার্ট টিপ
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200/90 font-bangla mt-0.5">
                    {currentPage.practicalTipBn}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Active Word Card Popover if Clicked */}
          {activeWordPopup && (
            <div className="rounded-3xl border-2 border-indigo-500/80 bg-white dark:bg-[#1E293B] p-6 shadow-xl animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-indigo-700 dark:text-indigo-400">
                      {activeWordPopup.word}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                      {activeWordPopup.partOfSpeech}
                    </span>
                    <button
                      onClick={() => handlePlayWord(activeWordPopup)}
                      className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 cursor-pointer"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">
                    {activeWordPopup.ipa} •{' '}
                    <span className="font-bangla font-semibold text-slate-700 dark:text-slate-300">
                      {activeWordPopup.banglaPronunciation}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => setActiveWordPopup(null)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 cursor-pointer"
                >
                  ✕ বন্ধ করুন
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    বাংলা অর্থ
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white font-bangla">
                    {activeWordPopup.banglaMeaning}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                      Synonyms (সমার্থক):
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {activeWordPopup.synonyms.join(', ')}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-bold text-slate-500 dark:text-slate-400 block mb-1">
                      Antonyms (বিপরীত):
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {activeWordPopup.antonyms.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">
                      ব্যবহারিক উদাহরণ বাক্য:
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      &quot;{activeWordPopup.exampleSentence}&quot;
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-bangla mt-0.5">
                      {activeWordPopup.exampleSentenceBn}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePlaySentence(activeWordPopup.exampleSentence)}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shrink-0 shadow-2xs hover:bg-indigo-50 cursor-pointer"
                    title="বাক্য শুনুন"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dedicated Vocabulary Cards List for This Page */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>শব্দভাণ্ডার বিশ্লেষণ</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {currentPage.vocabulary.length} টি স্মার্ট শব্দ
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPage.vocabulary.map((vocab) => {
                const isSaved = savedWords[vocab.id];
                return (
                  <div
                    key={vocab.id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white">
                            {vocab.word}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {vocab.partOfSpeech}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {vocab.ipa} •{' '}
                          <span className="font-bangla font-semibold text-slate-700 dark:text-slate-300">
                            {vocab.banglaPronunciation}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handlePlayWord(vocab)}
                          className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 transition-colors cursor-pointer"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSavedWords((prev) => ({ ...prev, [vocab.id]: !prev[vocab.id] }));
                            if (onSaveWord) onSaveWord(vocab.word, vocab.banglaMeaning);
                          }}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                          }`}
                          title="সংরক্ষণ করুন"
                        >
                          <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white font-bangla border-l-2 border-indigo-500 pl-2.5">
                      {vocab.banglaMeaning}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs space-y-1.5">
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        <strong className="text-slate-500 dark:text-slate-400">Synonyms:</strong>{' '}
                        {vocab.synonyms.join(', ')}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        <strong className="text-slate-500 dark:text-slate-400">Antonyms:</strong>{' '}
                        {vocab.antonyms.join(', ')}
                      </p>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          &quot;{vocab.exampleSentence}&quot;
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 font-bangla mt-0.5">
                          {vocab.exampleSentenceBn}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlaySentence(vocab.exampleSentence)}
                        className="text-indigo-600 dark:text-indigo-400 p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md cursor-pointer shrink-0"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View Mode 2: Vocabulary Table (Tabular Cheat Sheet like printed book) */}
      {viewMode === 'table' && (
        <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-[#1E293B] p-6 shadow-sm overflow-hidden dark:border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                শব্দ বিশ্লেষণ ছক (Study Sheet)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                মুদ্রিত বইয়ের মতো সুবিন্যস্ত টেবিল ফরম্যাট
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-black">
                  <th className="py-3 px-3">Word & Sound</th>
                  <th className="py-3 px-3">POS</th>
                  <th className="py-3 px-3">বাংলা অর্থ ও ভাবার্থ</th>
                  <th className="py-3 px-3">সমার্থক (Synonyms)</th>
                  <th className="py-3 px-3">বিপরীত (Antonyms)</th>
                  <th className="py-3 px-3">বাস্তব বাক্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentPage.vocabulary.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-indigo-700 dark:text-indigo-400">
                          {v.word}
                        </span>
                        <button
                          onClick={() => handlePlayWord(v)}
                          className="text-slate-400 hover:text-indigo-600 cursor-pointer p-0.5"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-slate-400 block font-mono">{v.ipa}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 block font-bangla">
                        ({v.banglaPronunciation})
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap font-semibold text-slate-600 dark:text-slate-300">
                      {v.partOfSpeech}
                    </td>
                    <td className="py-3.5 px-3 font-bangla font-bold text-slate-900 dark:text-white">
                      {v.banglaMeaning}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                      {v.synonyms.join(', ')}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300">
                      {v.antonyms.join(', ')}
                    </td>
                    <td className="py-3.5 px-3 text-xs">
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        {v.exampleSentence}
                      </p>
                      <p className="text-slate-500 font-bangla mt-0.5">
                        {v.exampleSentenceBn}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Mode 3: Page Practice Quiz */}
      {viewMode === 'quiz' && (
        <div className="rounded-3xl border border-slate-200/90 bg-white dark:bg-[#1E293B] p-6 sm:p-8 shadow-sm space-y-6 dark:border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                পৃষ্ঠা {currentPage.pageNumber} তাৎক্ষণিক অনুশীলন
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {currentPage.quiz.question}
              </h3>
              {currentPage.quiz.questionBn && (
                <p className="text-sm font-bangla text-slate-600 dark:text-slate-400 mt-1">
                  {currentPage.quiz.questionBn}
                </p>
              )}
            </div>
            <Award className="h-8 w-8 text-indigo-500" />
          </div>

          <div className="space-y-3">
            {currentPage.quiz.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentPage.quiz.correctIndex;
              let style =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  style =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-bold';
                }
              } else if (isSelected) {
                style =
                  'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold';
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${style}`}
                >
                  <span className="text-sm font-medium">{opt}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!isAnswerSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={() => {
                setIsAnswerSubmitted(true);
                if (selectedOption === currentPage.quiz.correctIndex) {
                  if (onAwardXP) onAwardXP(20, 'Correct Smart Book quiz answer');
                }
              }}
              className="w-full py-3.5 rounded-2xl font-black text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              উত্তর যাচাই করুন
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-3">
              <p className="text-xs sm:text-sm font-bangla font-semibold text-slate-800 dark:text-slate-200">
                💡 <span className="font-black text-indigo-700 dark:text-indigo-400">ব্যাখ্যা:</span>{' '}
                {currentPage.quiz.explanationBn}
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setIsAnswerSubmitted(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  পুনরায় দিন
                </button>
                <button
                  onClick={handleNextPage}
                  className="px-3.5 py-1.5 text-xs font-black rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                >
                  পরবর্তী পৃষ্ঠায় যান →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Interactive 100-Page Index / Navigator Drawer Modal */}
      {pageGridOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Grid className="h-5 w-5 text-indigo-600" />
                  <span>১০০ পৃষ্ঠার সম্পূর্ণ সূচিপত্র</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  যেকোনো পৃষ্ঠায় এক ক্লিকে যেতে ট্যাপ করুন
                </p>
              </div>
              <button
                onClick={() => setPageGridOpen(false)}
                className="text-sm font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              >
                ✕ বন্ধ করুন
              </button>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="গল্পের নাম বা শব্দ দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bangla"
                />
              </div>

              {/* Jump to Page Number Input */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 font-bangla">পৃষ্ঠা জাম্প:</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="1-100"
                  value={jumpPageInput}
                  onChange={(e) => setJumpPageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const num = parseInt(jumpPageInput, 10);
                      if (num >= 1 && num <= 100) {
                        setCurrentPageNum(num);
                        setPageGridOpen(false);
                      }
                    }
                  }}
                  className="w-16 px-2 py-1.5 text-xs text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                />
                <button
                  onClick={() => {
                    const num = parseInt(jumpPageInput, 10);
                    if (num >= 1 && num <= 100) {
                      setCurrentPageNum(num);
                      setPageGridOpen(false);
                    }
                  }}
                  className="px-2.5 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-xl cursor-pointer"
                >
                  যান
                </button>
              </div>
            </div>

            {/* Chapters Pill Filter */}
            <div className="px-4 py-2.5 overflow-x-auto border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs whitespace-nowrap">
              <button
                onClick={() => setSelectedChapterFilter(0)}
                className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                  selectedChapterFilter === 0
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                সব অধ্যায় (১-১০০)
              </button>
              {SMART_BOOK_CHAPTERS.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapterFilter(ch.number)}
                  className={`px-3 py-1 rounded-lg font-bold cursor-pointer transition-colors ${
                    selectedChapterFilter === ch.number
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  অধ্যায় {ch.number}: {ch.titleBn}
                </button>
              ))}
            </div>

            {/* 100 Pages Grid Container */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredPages.map((page) => {
                const isCurrent = page.pageNumber === currentPageNum;
                const isDone = completedPages.includes(page.pageNumber);
                const isBookmarked = bookmarkedPages.includes(page.pageNumber);

                return (
                  <button
                    key={page.pageNumber}
                    onClick={() => {
                      setCurrentPageNum(page.pageNumber);
                      setPageGridOpen(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between min-h-[92px] ${
                      isCurrent
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/70 shadow-sm'
                        : isDone
                        ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-500'
                        : 'border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-indigo-400 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          isCurrent
                            ? 'bg-indigo-600 text-white'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        P.{page.pageNumber}
                      </span>

                      <div className="flex items-center gap-1">
                        {isBookmarked && (
                          <Bookmark className="h-3 w-3 fill-amber-500 text-amber-500" />
                        )}
                        {isDone && <Check className="h-3.5 w-3.5 text-emerald-600 font-black" />}
                      </div>
                    </div>

                    <div className="mt-2 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate font-bangla">
                        {page.titleBn}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {page.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
