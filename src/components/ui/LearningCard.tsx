import React, { useState } from 'react';
import { Sparkles, Bookmark, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { AudioButton } from './AudioButton';

export interface LearningCardProps {
  typeLabel?: string;
  word: string;
  pronunciation?: string;
  bengaliMeaning: string;
  exampleEnglish: string;
  exampleBengali?: string;
  isSaved?: boolean;
  isLearned?: boolean;
  onToggleSave?: () => void;
  onLearnClick?: () => void;
  onPracticeClick?: () => void;
  className?: string;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  typeLabel = 'WORD',
  word,
  pronunciation = '/ɪmˈpruːv/',
  bengaliMeaning,
  exampleEnglish,
  exampleBengali,
  isSaved = false,
  isLearned = false,
  onToggleSave,
  onLearnClick,
  onPracticeClick,
  className = '',
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <Card
      variant="gradient"
      hoverEffect
      padding="lg"
      className={`relative overflow-hidden ${className}`}
    >
      {/* Decorative subtle background icon */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 select-none opacity-5 text-emerald-950 dark:text-emerald-300">
        <Sparkles className="h-40 w-40" />
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-5">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="sm" dot>
              {typeLabel}
            </Badge>
            {pronunciation && (
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                {pronunciation}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave();
                }}
                className={`rounded-xl p-2 transition-colors ${
                  isSaved
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save for later review'}
                aria-label={isSaved ? 'Remove from saved' : 'Save for later review'}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Word and Meaning */}
        <div className="space-y-1.5">
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {word}
            </h3>
            {isLearned && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Learned
              </span>
            )}
          </div>
          <p className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 font-sans">
            {bengaliMeaning}
          </p>
        </div>

        {/* Example Sentence Box */}
        <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-3.5 sm:p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900/90 space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              "{exampleEnglish}"
            </p>
            <AudioButton text={exampleEnglish} size="sm" variant="ghost" />
          </div>
          {exampleBengali && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              {exampleBengali}
            </p>
          )}
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
          {/* 1. Listen Action */}
          <AudioButton
            text={word}
            size="md"
            variant="subtle"
            label="Listen"
            className="flex-1 sm:flex-initial"
          />

          {/* 2. Learn Action */}
          <Button
            variant="outline"
            size="md"
            leftIcon={<BookOpen className="h-4 w-4 text-emerald-600" />}
            onClick={() => {
              if (onLearnClick) onLearnClick();
              else setShowExplanation((prev) => !prev);
            }}
            className="flex-1 sm:flex-initial"
          >
            Learn
          </Button>

          {/* 3. Practice Action */}
          {onPracticeClick && (
            <Button
              variant="primary"
              size="md"
              leftIcon={<Sparkles className="h-4 w-4 text-white" />}
              onClick={onPracticeClick}
              className="flex-1 sm:flex-initial"
            >
              Practice
            </Button>
          )}
        </div>

        {/* Inline expandable breakdown when onLearnClick is not provided */}
        {showExplanation && (
          <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/30 space-y-2 animate-in fade-in">
            <div className="font-bold text-emerald-900 dark:text-emerald-300">
              Grammar & Forms:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300">
              <div>• Base: <span className="font-mono font-semibold">improve</span></div>
              <div>• Past: <span className="font-mono font-semibold">improved</span></div>
              <div>• Continuous: <span className="font-mono font-semibold">improving</span></div>
            </div>
            <div className="text-slate-600 dark:text-slate-400 font-sans pt-1">
              💡 ব্যবহারিক টিপস: কোনো দক্ষতা বা পরিস্থিতি ভালো করার ক্ষেত্রে 'improve' ব্যবহৃত হয়। যেমন: improve skills, improve health.
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
