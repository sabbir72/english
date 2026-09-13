import React, { useState } from 'react';
import {
  X,
  Volume2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { VocabularyItem } from '../types';
import { speakText } from '../utils/speech';

interface LearnWordModalProps {
  word: VocabularyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteLesson: (wordId: string) => void;
}

export const LearnWordModal: React.FC<LearnWordModalProps> = ({
  word,
  isOpen,
  onClose,
  onCompleteLesson,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  if (!isOpen || !word) return null;

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      onCompleteLesson(word.id);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    setIsCompleted(false);
  };

  const handleQuizChoice = (idx: number) => {
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);
  };

  // Mini quiz option generator
  const quizOptions = [
    { text: `She worked hard to ${word.word.toLowerCase()} her skills.`, isCorrect: true },
    { text: `They ${word.word.toLowerCase()}ing very fast yesterday.`, isCorrect: false },
    { text: `He is a very ${word.word.toLowerCase()} person.`, isCorrect: false },
  ];

  return (
    <div
      id="learn-word-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {currentStep}/{totalSteps}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Mini Lesson • শব্দপাঠ
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress bar */}
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                idx + 1 <= currentStep
                  ? 'bg-emerald-600'
                  : 'bg-slate-100 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="my-6 min-h-[220px]">
          {/* STEP 1: The Word */}
          {currentStep === 1 && (
            <div className="space-y-4 text-center animate-fadeIn">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                Part of Speech: {word.partOfSpeech}
              </span>

              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {word.word}
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg">
                  {word.ipa}
                </span>
                <span className="rounded-lg bg-emerald-100 dark:bg-emerald-950/80 px-3 py-0.5 text-sm font-bold text-emerald-800 dark:text-emerald-300 font-bangla border border-emerald-200 dark:border-emerald-800">
                  উচ্চারণ: {word.pronunciation}
                </span>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => speakText(word.word)}
                  className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all dark:bg-emerald-950/80 dark:text-emerald-300"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>Listen Pronunciation / উচ্চারণ শুনুন</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Meaning */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Step 2: Bengali Meaning / অর্থ
              </span>
              <div className="rounded-2xl bg-emerald-50/60 p-5 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                <div className="text-2xl font-black text-emerald-900 dark:text-emerald-200">
                  {word.banglaMeaning}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-sans">
                  কোনো কিছু আগের চেয়ে আরও ভালো করা বা হওয়া। দৈনন্দিন কথোপকথনে এটি বহুল ব্যবহৃত একটি গুরুত্বপূর্ণ শব্দ।
                </p>
              </div>

              {word.synonyms && word.synonyms.length > 0 && (
                <div className="pt-1">
                  <span className="text-xs text-slate-400 font-medium">সমার্থক শব্দ (Synonyms): </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {word.synonyms.join(', ')}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Real Example */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Step 3: Real-life Example / বাস্তব উদাহরণ
              </span>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/60">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    &ldquo;{word.example}&rdquo;
                  </p>
                  <button
                    onClick={() => speakText(word.example)}
                    className="ml-2 rounded-xl p-2 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-slate-700"
                    title="Listen to example"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  &ldquo;{word.exampleBangla}&rdquo;
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Sentence Structure */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Step 4: Sentence Structure / বাক্য গঠনের সূত্র
              </span>
              <div className="rounded-2xl bg-amber-50/60 p-5 border border-amber-200/80 dark:bg-amber-950/30 dark:border-amber-900/60">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Formula
                </div>
                <div className="mt-1 font-mono text-sm font-black text-slate-900 dark:text-white">
                  Subject + want to + Base Verb ({word.word}) + Object
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  ইংরেজিতে কোনো কাজ করার ইচ্ছা প্রকাশে &ldquo;want to&rdquo;-এর পর সর্বদা মূল Verb (Base Form) ব্যবহৃত হয়।
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Quick Practice */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                Step 5: Quick Practice / অনুশীলন
              </span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                সঠিক বাক্যটি নির্বাচন করুন:
              </p>

              <div className="space-y-2">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedQuizAnswer === idx;
                  let optStyle = 'border-slate-200 hover:border-slate-300 dark:border-slate-700';
                  if (quizSubmitted && isSelected) {
                    optStyle = opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200'
                      : 'border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200';
                  } else if (quizSubmitted && opt.isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizChoice(idx)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs font-semibold transition-all ${optStyle}`}
                    >
                      <span>{opt.text}</span>
                      {quizSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span>চমৎকার! আপনি সফলভাবে শব্দটি আয়ত্ত করেছেন (+10 XP)</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Restart</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition-transform hover:scale-[1.02]"
          >
            <span>{currentStep === totalSteps ? 'Complete Mini Lesson (+10 XP)' : 'Next Step'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
