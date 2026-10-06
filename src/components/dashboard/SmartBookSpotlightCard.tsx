import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Volume2,
  CheckCircle2,
  Bookmark,
  Award,
  ChevronRight,
} from 'lucide-react';
import { SMART_BOOK_100_PAGES, TOTAL_SMART_BOOK_PAGES } from '../../data/smartBook';
import { speakText, stopSpeaking } from '../../utils/speech';

export interface SmartBookSpotlightCardProps {
  onOpenBook: () => void;
}

export const SmartBookSpotlightCard: React.FC<SmartBookSpotlightCardProps> = ({
  onOpenBook,
}) => {
  const currentPageNum = parseInt(
    localStorage.getItem('smart_book_current_page') || '1',
    10
  );

  const completedPages: number[] = (() => {
    try {
      const saved = localStorage.getItem('smart_book_completed_pages');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  })();

  const currentPage =
    SMART_BOOK_100_PAGES.find((p) => p.pageNumber === currentPageNum) ||
    SMART_BOOK_100_PAGES[0];

  const [isPlayingWord, setIsPlayingWord] = useState<string | null>(null);

  const handlePlayWord = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    stopSpeaking();
    setIsPlayingWord(word);
    speakText(word, 'en-US', 1.0);
    setTimeout(() => setIsPlayingWord(null), 1400);
  };

  const progressPercent = Math.round(
    (completedPages.length / TOTAL_SMART_BOOK_PAGES) * 100
  );

  return (
    <div
      onClick={onOpenBook}
      className="group relative overflow-hidden rounded-3xl border border-indigo-200/90 bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/50 p-6 sm:p-7 shadow-[0_4px_20px_rgba(79,70,229,0.06)] hover:shadow-lg dark:border-indigo-900/60 dark:from-[#1E293B] dark:via-slate-900/90 dark:to-indigo-950/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/15 transition-all" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
              <BookOpen className="h-3.5 w-3.5" />
              <span>১০০ পৃষ্ঠার স্মার্ট বই</span>
            </span>
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200/70 dark:border-indigo-800/60 font-bangla">
              অধ্যায় {currentPage.chapterNumber}: {currentPage.chapterTitleBn}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {completedPages.length} of 100 Pages Mastered ({progressPercent}%)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Page {currentPage.pageNumber}: {currentPage.titleBn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-serif line-clamp-2 max-w-2xl leading-relaxed">
            {currentPage.storyBengali.replace(/\*\*/g, '')}
          </p>

          {/* Featured Smart Words from This Page */}
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-bangla">
              স্মার্ট শব্দ:
            </span>
            {currentPage.vocabulary.slice(0, 4).map((vocab) => (
              <button
                key={vocab.id}
                onClick={(e) => handlePlayWord(e, vocab.word)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-2xs transition-colors cursor-pointer"
                title={`${vocab.banglaMeaning} - উচ্চারণ শুনুন`}
              >
                <span>{vocab.word}</span>
                <Volume2 className="h-3 w-3 text-indigo-500 opacity-60" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bangla font-normal">
                  ({vocab.banglaPronunciation})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Action CTA */}
        <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block font-bangla">
              আপনার অগ্রগতি
            </span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              পৃষ্ঠা {currentPage.pageNumber} / ১০০
            </span>
          </div>

          <button
            onClick={onOpenBook}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-indigo-500/25 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="font-bangla">পড়া চালিয়ে যান</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
