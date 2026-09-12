import React, { useState } from 'react';
import {
  Languages,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { TranslationDrillItem } from '../../types';
import { speakText } from '../../utils/speech';

interface TranslationPracticeSectionProps {
  drills: TranslationDrillItem[];
  onAwardXP?: (amount: number) => void;
}

export const TranslationPracticeSection: React.FC<TranslationPracticeSectionProps> = ({
  drills,
  onAwardXP,
}) => {
  const [mode, setMode] = useState<'bn-to-en' | 'en-to-bn'>('bn-to-en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [resultStatus, setResultStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const currentDrill = drills[currentIndex] || drills[0];

  const handleCheckTranslation = () => {
    if (!userInput.trim() || !currentDrill) return;

    const normalizedUser = userInput.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const correctNormalized = currentDrill.acceptedEnglish.map((s) =>
      s.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    );

    const isMatch = correctNormalized.includes(normalizedUser);

    if (isMatch) {
      setResultStatus('correct');
      setFeedbackMessage('✓ চমৎকার! আপনার ইংরেজি অনুবাদ সঠিক হয়েছে।');
      if (onAwardXP) onAwardXP(15);
    } else {
      setResultStatus('incorrect');
      setFeedbackMessage(
        `আরও নিখুঁত রূপ: "${currentDrill.english}" (অন্যান্য গ্রহণযোগ্য: ${currentDrill.acceptedEnglish.slice(1).join(', ') || 'নেই'})`
      );
    }
  };

  const handleNext = () => {
    setUserInput('');
    setShowHint(false);
    setResultStatus('idle');
    setFeedbackMessage('');
    setCurrentIndex((prev) => (prev + 1) % drills.length);
  };

  return (
    <div id="translation-practice-section" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Rule #13 & #14
              </span>
              <span className="text-xs text-slate-500">স্বাভাবিক অনুবাদের বাস্তব চর্চা</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Bengali ⇄ English Translation Practice
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              আক্ষরিক অনুবাদের ভুল এড়িয়ে সাবলীল ও স্বাভাবিক বাক্য গঠন শিখুন। একাধিক গ্রহণযোগ্য ইংরেজি বাক্য গ্রহণ করা হয়।
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => {
                setMode('bn-to-en');
                setResultStatus('idle');
                setUserInput('');
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                mode === 'bn-to-en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              বাংলা → ইংরেজি অনুবাদ
            </button>
            <button
              onClick={() => {
                setMode('en-to-bn');
                setResultStatus('idle');
                setUserInput('');
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                mode === 'en-to-bn'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              English Structural Insights
            </button>
          </div>
        </div>
      </div>

      {/* Main Practice Card */}
      {currentDrill && mode === 'bn-to-en' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sentence {currentIndex + 1} of {drills.length}
            </div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Reward: +15 XP
            </div>
          </div>

          {/* Bengali Prompt */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              বাংলা বাক্য:
            </div>
            <div className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-relaxed">
              "{currentDrill.bangla}"
            </div>
          </div>

          {/* Word Hints Toggle */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{showHint ? 'শব্দ সংকেত লুকান (Hide Hints)' : 'সহায়ক শব্দ সংকেত দেখুন (Show Word Hints)'}</span>
            </button>

            {showHint && (
              <div className="mt-2.5 flex flex-wrap gap-2 rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                {currentDrill.hints.map((h, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs dark:bg-slate-900 dark:text-slate-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="space-y-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCheckTranslation();
              }}
              disabled={resultStatus === 'correct'}
              placeholder="Write the English sentence here..."
              className="w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-base font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white shadow-2xs"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCheckTranslation}
                disabled={!userInput.trim() || resultStatus === 'correct'}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs disabled:opacity-50"
              >
                Check Translation (যাচাই করুন)
              </button>

              {resultStatus !== 'idle' && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 shadow-xs dark:bg-white dark:text-slate-900"
                >
                  <span>Next Sentence</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Feedback Area */}
          {resultStatus !== 'idle' && (
            <div
              className={`rounded-2xl p-4 text-xs font-bold ${
                resultStatus === 'correct'
                  ? 'bg-emerald-50 text-emerald-950 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200'
                  : 'bg-rose-50 text-rose-950 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{feedbackMessage}</span>
                <button
                  onClick={() => speakText(currentDrill.english)}
                  className="rounded-lg p-1 text-slate-600 hover:text-emerald-700 dark:text-slate-300"
                  title="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 text-[11px] font-normal opacity-90">
                💡 {currentDrill.structuralExplanation}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reverse Mode: English Structural Insights */}
      {currentDrill && mode === 'en-to-bn' && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div>
            <span className="rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              English In-Depth Analysis
            </span>
            <div className="mt-3 text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <span>{currentDrill.english}</span>
              <button
                onClick={() => speakText(currentDrill.english)}
                className="text-slate-400 hover:text-blue-600"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-1 text-base font-bold text-emerald-700 dark:text-emerald-400">
              বাংলা ভাবার্থ: {currentDrill.bangla}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              কাঠামোগত বিশ্লেষণ (Structural Breakdown):
            </h4>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {currentDrill.structuralExplanation}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 shadow-xs dark:bg-white dark:text-slate-900"
            >
              <span>Next Example</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
