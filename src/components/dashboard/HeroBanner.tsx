import React from 'react';
import { Sparkles, BotMessageSquare, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { NavigationTab } from '../../types';

export interface HeroBannerProps {
  onStartLearning: () => void;
  onTalkWithAI: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartLearning,
  onTalkWithAI,
}) => {
  return (
    <div
      id="hero-banner"
      className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 p-6 sm:p-8 md:p-10 shadow-xs dark:border-emerald-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20"
    >
      {/* Decorative gradient glow in background */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative z-10 max-w-2xl space-y-4">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs dark:border-emerald-800/60 dark:bg-slate-800/80 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>দৈনিক ১০ মিনিট ইংরেজি চর্চা</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          Improve Your English Every Day
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          Learn useful words, practice real sentences, understand grammar and speak with AI.
        </p>

        {/* Buttons: Primary "Start Learning" & Secondary "Talk with AI" */}
        <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-4">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<BookOpen className="h-4 w-4" />}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            onClick={onStartLearning}
          >
            Start Learning
          </Button>

          <Button
            variant="outline"
            size="lg"
            leftIcon={<BotMessageSquare className="h-4 w-4 text-emerald-600" />}
            onClick={onTalkWithAI}
          >
            Talk with AI
          </Button>
        </div>

        {/* Micro highlights */}
        <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>বাংলা ব্যাখ্যাসহ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>সঠিক উচ্চারণ অডিও</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>ইন্টারঅ্যাক্টিভ স্পিকিং</span>
          </div>
        </div>
      </div>
    </div>
  );
};
