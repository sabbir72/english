import React, { useState } from 'react';
import {
  Shuffle,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Zap,
} from 'lucide-react';
import { SentenceTransformationSet } from '../../types';
import { speakText } from '../../utils/speech';

interface SentenceTransformationSectionProps {
  transformations: SentenceTransformationSet[];
  onAwardXP?: (amount: number) => void;
}

export const SentenceTransformationSection: React.FC<SentenceTransformationSectionProps> = ({
  transformations,
  onAwardXP,
}) => {
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const currentSet = transformations[selectedSetIndex] || transformations[0];

  // Mini Quiz Mode
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const transformationForms = [
    { key: 'positive', label: '1. Positive (হ্যাঁ-বোধক)', data: currentSet.transformations.positive, color: 'emerald' },
    { key: 'negative', label: '2. Negative (না-বোধক)', data: currentSet.transformations.negative, color: 'rose' },
    { key: 'question', label: '3. Question (প্রশ্নবোধক)', data: currentSet.transformations.question, color: 'blue' },
    { key: 'past', label: '4. Past Tense (অতীত কাল)', data: currentSet.transformations.past, color: 'amber' },
    { key: 'future', label: '5. Future Tense (ভবিষ্যৎ কাল)', data: currentSet.transformations.future, color: 'purple' },
    { key: 'continuous', label: '6. Continuous (চলমান বর্তমান)', data: currentSet.transformations.continuous, color: 'teal' },
    { key: 'perfect', label: '7. Present Perfect (পুরাঘটিত)', data: currentSet.transformations.perfect, color: 'indigo' },
  ];

  return (
    <div id="sentence-transformation-section" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Rule #5 Methodology
              </span>
              <span className="text-xs text-slate-500">একটি ভাবনা → ৭টি রূপান্তর</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Sentence Transformation (৭ রূপে বাক্য রূপান্তর)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              একটি মূল বাক্য থেকে কীভাবে প্রশ্ন, না-বোধক, অতীত, ভবিষ্যৎ এবং চলমান রূপ গঠন করতে হয় তা লক্ষ্য করুন। ব্যাকরণ মুখস্থ করার চেয়ে রূপান্তর বোঝা শতগুণ বেশি কার্যকর।
            </p>
          </div>

          {/* Seed Sentences Selector */}
          <div className="flex flex-wrap items-center gap-2">
            {transformations.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedSetIndex(idx);
                  setQuizSubmitted(false);
                  setQuizAnswer(null);
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedSetIndex === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {t.baseSentence}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The 7 Transformation Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {transformationForms.map((form) => (
          <div
            key={form.key}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-indigo-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              {/* Form title */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {form.label}
                </span>
                <button
                  onClick={() => speakText(form.data.english)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-800"
                  title="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              {/* Transformed Sentence */}
              <div className="mt-3 text-base font-black text-slate-900 dark:text-white leading-snug">
                {form.data.english}
              </div>

              {/* Bengali Meaning */}
              <div className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {form.data.bangla}
              </div>

              {/* Formula */}
              <div className="mt-3 rounded-lg bg-slate-50 p-2 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {form.data.formula}
              </div>

              {/* Bengali Explanation of Rule */}
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {form.data.ruleBangla}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Quick Drill */}
      <div className="rounded-3xl border border-indigo-200 bg-indigo-50/40 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-black text-indigo-950 dark:text-indigo-200">
              মিনি রূপান্তর কুইজ (Test Your Skill):
            </h3>
          </div>
          <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
            +10 XP
          </span>
        </div>

        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
          "{currentSet.baseSentence}" বাক্যটির Negative (না-বোধক) রূপ কোনটি?
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            currentSet.transformations.negative.english,
            currentSet.baseSentence.replace('.', ' not.'),
            currentSet.transformations.past.english,
          ]
            .sort()
            .map((opt, i) => {
              const isCorrect = opt === currentSet.transformations.negative.english;
              let btnStyle =
                'border-slate-200 bg-white text-slate-800 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-100 text-emerald-900 font-bold dark:bg-emerald-950 dark:text-emerald-200';
                } else if (quizAnswer === i) {
                  btnStyle =
                    'border-rose-500 bg-rose-100 text-rose-900 font-bold dark:bg-rose-950 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    setQuizAnswer(i);
                    setQuizSubmitted(true);
                    if (isCorrect && onAwardXP) onAwardXP(10);
                  }}
                  disabled={quizSubmitted}
                  className={`rounded-xl border p-3 text-left text-xs font-medium transition-all ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
        </div>

        {quizSubmitted && (
          <div className="mt-3 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
            <span>
              {quizAnswer !== null &&
              [
                currentSet.transformations.negative.english,
                currentSet.baseSentence.replace('.', ' not.'),
                currentSet.transformations.past.english,
              ].sort()[quizAnswer] === currentSet.transformations.negative.english
                ? '✓ সঠিক উত্তর দিয়েছেন! do not যুক্ত হয়ে Negative রূপ তৈরি হয়েছে।'
                : `সঠিক উত্তর হলো: ${currentSet.transformations.negative.english}`}
            </span>
            <button
              onClick={() => {
                setQuizSubmitted(false);
                setQuizAnswer(null);
              }}
              className="text-[11px] underline text-indigo-600 dark:text-indigo-400"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
