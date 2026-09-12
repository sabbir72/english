import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { CommonMistakeCard } from '../../types';
import { speakText } from '../../utils/speech';

interface CommonMistakeSectionProps {
  mistakes: CommonMistakeCard[];
  onAwardXP?: (amount: number) => void;
}

export const CommonMistakeSection: React.FC<CommonMistakeSectionProps> = ({
  mistakes,
  onAwardXP,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMistakeId, setSelectedMistakeId] = useState<string>(mistakes[0]?.id || '');
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const categories = ['all', 'Grammar', 'Preposition', 'Word Choice'];

  const filteredMistakes = mistakes.filter((m) => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  const currentMistake = mistakes.find((m) => m.id === selectedMistakeId) || mistakes[0];

  return (
    <div id="common-mistake-section" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-100 px-3 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Rule #18 Methodology
              </span>
              <span className="text-xs text-slate-500">বাঙালি শিক্ষার্থীদের সবচেয়ে পরিচিত ভুলগুলো</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Common Mistakes & Smart Corrections
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              বাংলা ভাবনার সরাসরি আক্ষরিক অনুবাদের কারণে যেসব মারাত্মক ভুল হয়, সেগুলোর পেছনের কারণ জেনে নির্ভুল ইংরেজি বলা শিখুন।
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                {cat === 'all' ? 'All Mistakes' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mistakes List Pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredMistakes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMistakeId(m.id);
                setQuizSubmitted(false);
                setQuizSelection(null);
              }}
              className={`shrink-0 rounded-2xl px-4 py-2.5 text-left transition-all ${
                selectedMistakeId === m.id
                  ? 'border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold dark:bg-rose-950/50 dark:text-rose-200'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <div className="text-xs line-through opacity-75">{m.incorrect}</div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {m.correct}
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentMistake && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          {/* Comparison Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Incorrect */}
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-5 dark:border-rose-900/60 dark:bg-rose-950/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                <XCircle className="h-4 w-4" />
                ভুল প্রয়োগ (Incorrect)
              </div>
              <div className="mt-2 text-lg sm:text-xl font-black text-rose-950 line-through dark:text-rose-200">
                "{currentMistake.incorrect}"
              </div>
            </div>

            {/* Correct */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4" />
                  সঠিক প্রয়োগ (Correct)
                </span>
                <button
                  onClick={() => speakText(currentMistake.correct)}
                  className="rounded-lg p-1 text-slate-400 hover:text-emerald-600"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 text-lg sm:text-xl font-black text-emerald-950 dark:text-emerald-200">
                "{currentMistake.correct}"
              </div>
            </div>
          </div>

          {/* Bengali In-Depth Explanation */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ভুলের পেছনের কারণ ও সঠিক নিয়ম (Why this mistake happens in Bengali mindset):
            </h4>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              {currentMistake.explanationBangla}
            </p>
          </div>

          {/* Practice Quiz */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50/30 p-5 dark:border-rose-950/50 dark:bg-rose-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300">
                কুইজ: নিচের কোনটি ব্যাকরণগতভাবে সঠিক?
              </h4>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                +10 XP
              </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {[currentMistake.incorrect, currentMistake.correct].map((opt, i) => {
                const isCorrect = opt === currentMistake.correct;
                let btnStyle =
                  'border-slate-200 bg-white text-slate-800 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

                if (quizSubmitted) {
                  if (isCorrect) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold dark:bg-emerald-950 dark:text-emerald-200';
                  } else if (quizSelection === i) {
                    btnStyle =
                      'border-rose-500 bg-rose-100 text-rose-900 font-bold dark:bg-rose-950 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={quizSubmitted}
                    onClick={() => {
                      setQuizSelection(i);
                      setQuizSubmitted(true);
                      if (isCorrect && onAwardXP) onAwardXP(10);
                    }}
                    className={`rounded-xl border p-3 text-left text-xs font-bold transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 pt-1">
                {quizSelection !== null &&
                [currentMistake.incorrect, currentMistake.correct][quizSelection] ===
                  currentMistake.correct
                  ? '✓ চমৎকার! আপনি সঠিক বাক্যটি নির্বাচন করতে পেরেছেন।'
                  : `ভুল হয়েছে। সঠিক উত্তর হলো: "${currentMistake.correct}"`}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
