import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { LearningCard } from '../ui/LearningCard';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AudioButton } from '../ui/AudioButton';
import { VocabularyItem } from '../../types';

export interface TodaysLearningSectionProps {
  onPractice: () => void;
  onNavigateToLearn: () => void;
  onAwardXP?: (amount: number) => void;
}

export const TodaysLearningSection: React.FC<TodaysLearningSectionProps> = ({
  onPractice,
  onNavigateToLearn,
  onAwardXP,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLearned, setIsLearned] = useState(false);
  const [learnModalOpen, setLearnModalOpen] = useState(false);
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);

  // Micro-quiz state for interactive practice
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const quizOptions = [
    { text: 'উন্নতি করা / উন্নত করা', isCorrect: true },
    { text: 'ভ্রমণ করা', isCorrect: false },
    { text: 'অপেক্ষা করা', isCorrect: false },
    { text: 'ভুলে যাওয়া', isCorrect: false },
  ];

  const handleCheckAnswer = (idx: number) => {
    setSelectedOption(idx);
    setIsAnswerChecked(true);
    if (quizOptions[idx].isCorrect && onAwardXP) {
      onAwardXP(10);
    }
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  return (
    <section id="todays-learning-section" className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Today's Learning
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            প্রতিদিন একটি নতুন শব্দ ও বাস্তব উদাহরণ
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToLearn}
          className="group flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
        >
          <span>সব শব্দ দেখুন</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Interactive Learning Card */}
      <LearningCard
        typeLabel="WORD"
        word="Improve"
        pronunciation="/ɪmˈpruːv/"
        bengaliMeaning="উন্নতি করা / উন্নত করা"
        exampleEnglish="I want to improve my English."
        exampleBengali="আমি আমার ইংরেজি উন্নত করতে চাই।"
        isSaved={isSaved}
        isLearned={isLearned}
        onToggleSave={() => setIsSaved(!isSaved)}
        onLearnClick={() => setLearnModalOpen(true)}
        onPracticeClick={() => setPracticeModalOpen(true)}
      />

      {/* Detailed Learn Modal */}
      <Modal
        isOpen={learnModalOpen}
        onClose={() => setLearnModalOpen(false)}
        title="Word Breakdown: Improve"
        subtitle="শব্দের বিশদ বিশ্লেষণ ও ব্যবহার"
        maxWidth="lg"
      >
        <div className="space-y-4">
          {/* Audio header */}
          <div className="flex items-center justify-between rounded-2xl bg-emerald-50/70 p-4 dark:bg-emerald-950/40">
            <div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">Improve</div>
              <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400">/ɪmˈpruːv/ (Verb)</div>
            </div>
            <AudioButton text="Improve" size="md" variant="primary" label="Listen" />
          </div>

          {/* Meaning & Synonyms */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bengali Meaning & Synonyms
            </h4>
            <p className="text-base font-bold text-slate-900 dark:text-white font-sans">
              উন্নতি করা, ভালো করা, মান বৃদ্ধি করা
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Enhance
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Develop
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Upgrade
              </span>
            </div>
          </div>

          {/* Verb Forms */}
          <div className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verb Conjugation Forms
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs font-medium">
              <div>
                <span className="text-slate-400 block text-[10px]">V1 (Present)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">improve</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">V2 (Past)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">improved</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">V3 (Past Participle)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">improved</span>
              </div>
            </div>
          </div>

          {/* Practical Real-Life Examples */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Real-Life Examples
            </h4>
            <div className="space-y-2">
              <div className="rounded-xl border border-slate-200/60 p-2.5 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>"Regular practice will improve your fluency."</span>
                  <AudioButton text="Regular practice will improve your fluency." size="sm" variant="ghost" />
                </div>
                <div className="text-slate-500 font-sans text-[11px] mt-0.5">
                  নিয়মিত চর্চা আপনার সাবলীলতা বাড়াবে।
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/60 p-2.5 dark:border-slate-800 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>"His health is improving every day."</span>
                  <AudioButton text="His health is improving every day." size="sm" variant="ghost" />
                </div>
                <div className="text-slate-500 font-sans text-[11px] mt-0.5">
                  তার স্বাস্থ্য দিন দিন ভালো হচ্ছে।
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
              onClick={() => {
                setIsLearned(true);
                setLearnModalOpen(false);
                if (onAwardXP) onAwardXP(10);
              }}
            >
              Mark as Learned (+10 XP)
            </Button>
          </div>
        </div>
      </Modal>

      {/* Interactive Micro-Quiz Practice Modal */}
      <Modal
        isOpen={practiceModalOpen}
        onClose={() => {
          setPracticeModalOpen(false);
          handleResetQuiz();
        }}
        title="Quick Practice: Improve"
        subtitle="সঠিক অর্থটি নির্বাচন করুন"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-800/60">
            <span className="text-xs font-bold uppercase text-slate-400">What does this word mean?</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">Improve</div>
          </div>

          <div className="space-y-2">
            {quizOptions.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-slate-300';

              if (isAnswerChecked) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswerChecked}
                  onClick={() => handleCheckAnswer(idx)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-xs sm:text-sm transition-colors text-left ${btnStyle}`}
                >
                  <span className="font-sans font-medium">{opt.text}</span>
                  {isAnswerChecked && opt.isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswerChecked && (
            <div className="space-y-3 pt-2">
              <div className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedOption !== null && quizOptions[selectedOption]?.isCorrect
                    ? '🎉 চমৎকার! সঠিক উত্তর দিয়েছেন।'
                    : '💡 ভুল হয়েছে। সঠিক অর্থ: উন্নতি করা / উন্নত করা।'}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={handleResetQuiz} leftIcon={<RotateCcw className="h-3.5 w-3.5" />}>
                  Try Again
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setPracticeModalOpen(false);
                    onPractice();
                  }}
                >
                  Full Practice Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};
