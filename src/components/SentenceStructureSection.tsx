import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { SentenceStructureItem, NavigationTab } from '../types';
import { speakText } from '../utils/speech';

interface SentenceStructureSectionProps {
  structures: SentenceStructureItem[];
  onNavigate: (tab: NavigationTab) => void;
  onAskAIStructure: (structureName: string) => void;
}

export const SentenceStructureSection: React.FC<SentenceStructureSectionProps> = ({
  structures,
  onNavigate,
  onAskAIStructure,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [exerciseAnswers, setExerciseAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({});

  const filteredStructures = structures.filter((s) => {
    if (selectedDifficulty !== 'all' && s.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleSelectOption = (structureId: string, optionIdx: number) => {
    setExerciseAnswers((prev) => ({ ...prev, [structureId]: optionIdx }));
    setShowResults((prev) => ({ ...prev, [structureId]: true }));
  };

  return (
    <div id="sentence-structure-section" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sentence Structure Formula / বাক্যের গঠন ও সূত্র
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ইংরেজি বাক্য গঠনের গাণিতিক সূত্র, বাংলা ব্যাখ্যা এবং প্রচলিত ভুলের সমাধান।
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedDifficulty(lvl)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedDifficulty === lvl
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {lvl === 'all' ? 'All Structures' : lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredStructures.map((item) => (
          <div
            key={item.id}
            id={`structure-card-${item.id}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                      item.difficulty === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                        : item.difficulty === 'Intermediate'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300'
                    }`}
                  >
                    {item.difficulty}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1.5 text-xs font-mono font-bold text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200">
                Formula: {item.formula}
              </div>
            </div>

            {/* Bengali Explanation */}
            <div className="mt-4 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-700 leading-relaxed dark:bg-slate-800/60 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white">বাংলা ব্যাখ্যা: </span>
              {item.explanationBangla}
            </div>

            {/* Examples & Breakdowns */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Examples & Component Breakdown:
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {item.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/80"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">
                          {ex.english}
                        </div>
                        <div className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                          {ex.bangla}
                        </div>
                      </div>
                      <button
                        onClick={() => speakText(ex.english)}
                        className="rounded p-1 text-slate-400 hover:text-emerald-600"
                        title="Listen"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 rounded bg-slate-50 p-2 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {ex.breakdown}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            {item.commonMistakes && item.commonMistakes.length > 0 && (
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  বাঙালি শিক্ষার্থীদের সাধারণ ভুল (Common Mistakes):
                </h4>
                <div className="space-y-2">
                  {item.commonMistakes.map((mistake, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-xs dark:border-rose-950/40 dark:bg-rose-950/20"
                    >
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-rose-600 font-medium line-through dark:text-rose-400">
                          ✗ {mistake.incorrect}
                        </span>
                        <span className="text-emerald-700 font-bold dark:text-emerald-300">
                          ✓ {mistake.correct}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {mistake.reasonBangla}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Exercise */}
            {item.practiceExercises && item.practiceExercises.length > 0 && (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                    মিনি অনুশীলন (Quick Practice):
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.practiceExercises[0].hint}
                  </span>
                </div>

                <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {item.practiceExercises[0].questionBangla}
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {item.practiceExercises[0].options.map((option, idx) => {
                    const isSelected = exerciseAnswers[item.id] === idx;
                    const isAnswered = showResults[item.id];
                    const isCorrect = idx === item.practiceExercises[0].correctIndex;

                    let btnClass =
                      'border-slate-200 bg-white text-slate-800 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnClass =
                          'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/70 dark:text-emerald-200';
                      } else if (isSelected) {
                        btnClass =
                          'border-rose-500 bg-rose-50 text-rose-900 font-bold dark:bg-rose-950/70 dark:text-rose-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(item.id, idx)}
                        disabled={isAnswered}
                        className={`rounded-lg border p-2.5 text-left text-xs transition-all ${btnClass}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {showResults[item.id] && (
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>
                      {exerciseAnswers[item.id] === item.practiceExercises[0].correctIndex
                        ? '✓ চমৎকার! সঠিক উত্তর দিয়েছেন।'
                        : `সঠিক উত্তর হলো: ${
                            item.practiceExercises[0].options[
                              item.practiceExercises[0].correctIndex
                            ]
                          }`}
                    </span>
                    <button
                      onClick={() => {
                        setShowResults((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      className="text-[11px] underline text-slate-500"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* AI Generator Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onAskAIStructure(item.formula)}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Ask ChatGPT to generate 5 more sentences with this formula</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
