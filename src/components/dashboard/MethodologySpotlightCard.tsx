import React from 'react';
import {
  Wand2,
  Volume2,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  Zap,
} from 'lucide-react';
import { speakText } from '../../utils/speech';

interface MethodologySpotlightCardProps {
  onOpenSentenceBuilder: () => void;
  onOpenPatternLibrary: () => void;
  onOpenDailyRoutine: () => void;
}

export const MethodologySpotlightCard: React.FC<MethodologySpotlightCardProps> = ({
  onOpenSentenceBuilder,
  onOpenPatternLibrary,
  onOpenDailyRoutine,
}) => {
  const seedSentence = 'I want to speak English fluently.';
  const seedBangla = 'আমি অনর্গল ইংরেজি বলতে চাই।';

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white p-5 sm:p-6 shadow-xs dark:border-emerald-800/60 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-emerald-200/50 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Wand2 className="h-4 w-4" />
          </span>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Core Methodology Spotlight
            </span>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              আজকের বাক্য তৈরির কাঠামো (Pattern of the Day)
            </h3>
          </div>
        </div>

        <button
          onClick={onOpenDailyRoutine}
          className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-amber-500/15 border border-amber-300/80 px-3 py-1.5 text-xs font-bold text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-300 hover:bg-amber-500/25 transition-colors"
        >
          <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>দৈনিক ১০ মিনিটের রুটিন শুরু করুন</span>
        </button>
      </div>

      {/* Main Pattern Formula Showcase */}
      <div className="mt-4">
        <div className="inline-block rounded-lg bg-emerald-100/70 px-2.5 py-1 text-xs font-mono font-bold text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200">
          Structure: Subject + want to / need to + Verb + Object
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              "{seedSentence}"
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 mt-0.5">
              বাংলা ভাবার্থ: {seedBangla}
            </div>
          </div>

          <button
            onClick={() => speakText(seedSentence)}
            className="rounded-xl bg-white p-2.5 text-slate-400 hover:text-emerald-600 shadow-2xs dark:bg-slate-800 transition-colors"
            title="Listen"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        {/* Word Breakdown Pills */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-lg bg-white px-2.5 py-1 text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-slate-200 border border-emerald-100 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400">I</strong> = আমি
          </span>
          <span className="rounded-lg bg-white px-2.5 py-1 text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-slate-200 border border-emerald-100 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400">want to</strong> = করতে চাই
          </span>
          <span className="rounded-lg bg-white px-2.5 py-1 text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-slate-200 border border-emerald-100 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400">speak</strong> = বলতে
          </span>
          <span className="rounded-lg bg-white px-2.5 py-1 text-slate-800 shadow-2xs dark:bg-slate-800 dark:text-slate-200 border border-emerald-100 dark:border-slate-700">
            <strong className="text-emerald-700 dark:text-emerald-400">English fluently</strong> = অনর্গল ইংরেজি
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-emerald-200/50 dark:border-slate-800">
        <span className="text-[11px] text-slate-500 font-medium">
          💡 এই একটি কাঠামো দিয়ে আরও ৫০+ বাক্য নিজে তৈরি করুন
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPatternLibrary}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            সব প্যাটার্ন ({5})
          </button>
          <button
            onClick={onOpenSentenceBuilder}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-transform active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Open in Sentence Builder</span>
          </button>
        </div>
      </div>
    </div>
  );
};
