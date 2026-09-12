import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  Zap,
  X,
  Play,
} from 'lucide-react';

interface DailyFluencyRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tabId: string) => void;
  onAwardXP?: (amount: number) => void;
}

export const DailyFluencyRoutineModal: React.FC<DailyFluencyRoutineModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
  onAwardXP,
}) => {
  const [selectedRoutine, setSelectedRoutine] = useState<'express' | 'deep'>('express');
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const expressSteps = [
    {
      id: 'exp-1',
      title: '1. Learn 1 Sentence Pattern (২ মিনিট)',
      bangla: 'আজকের নির্ধারিত কাঠামোর ভিত্তি ও রূপান্তর দেখুন',
      tabTarget: 'patterns',
      duration: '2m',
    },
    {
      id: 'exp-2',
      title: '2. Build 5 Sentences (৩ মিনিট)',
      bangla: 'Interactive Builder-এ নিজের ৫টি বাক্য তৈরি করুন',
      tabTarget: 'builder',
      duration: '3m',
    },
    {
      id: 'exp-3',
      title: '3. Practice 1 Word Family (২ মিনিট)',
      bangla: 'একটি মূল শব্দের Verb, Noun, Adjective রূপ আয়ত্ত করুন',
      tabTarget: 'word-family',
      duration: '2m',
    },
    {
      id: 'exp-4',
      title: '4. Quick AI Conversation (৩ মিনিট)',
      bangla: 'আজকের শেখা বাক্য দিয়ে এআই টিউটরের সাথে ৩ মিনিট কথা বলুন',
      tabTarget: 'ai-tutor',
      duration: '3m',
    },
  ];

  const deepSteps = [
    {
      id: 'deep-1',
      title: '1. Learn 2 Sentence Patterns (৫ মিনিট)',
      bangla: 'দুটি কাঠামোর বাংলা অর্থ ও বৈচিত্র্য বিশ্লেষণ',
      tabTarget: 'patterns',
      duration: '5m',
    },
    {
      id: 'deep-2',
      title: '2. Build 10 Sentences (৫ মিনিট)',
      bangla: 'স্লট পরিবর্তন করে ১০টি ভিন্ন বাক্য বানান',
      tabTarget: 'builder',
      duration: '5m',
    },
    {
      id: 'deep-3',
      title: '3. 7-Form Sentence Transformation (৫ মিনিট)',
      bangla: 'প্রশ্ন, না-বোধক, অতীত ও ভবিষ্যৎ রূপে রূপান্তর করুন',
      tabTarget: 'transformations',
      duration: '5m',
    },
    {
      id: 'deep-4',
      title: '4. Situational Vocabulary & Dialogue (৫ মিনিট)',
      bangla: 'অফিস বা দৈনন্দিন বাস্তব কথোপকথন অনুশীলন',
      tabTarget: 'situational',
      duration: '5m',
    },
    {
      id: 'deep-5',
      title: '5. Deep AI Speaking Practice (৫ মিনিট)',
      bangla: 'এআই-এর সাথে লাইভ স্পিকিং ও তাত্ক্ষণিক উচ্চারণ চেক',
      tabTarget: 'ai-tutor',
      duration: '5m',
    },
  ];

  const activeSteps = selectedRoutine === 'express' ? expressSteps : deepSteps;
  const completedCount = activeSteps.filter((s) => completedSteps[s.id]).length;
  const isAllComplete = completedCount === activeSteps.length;

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      if (!prev[stepId] && onAwardXP) onAwardXP(10);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <Clock className="h-4 w-4" />
          <span>Daily Fluency Habit System</span>
        </div>
        <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
          দৈনিক ইংরেজি ফ্লুয়েন্সি রুটিন (Methodology Loop)
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          প্রতিদিন অল্প সময়ে নিয়মমাফিক অনুশীলন ইংরেজিকে স্বাভাবিক করে তুলবে।
        </p>

        {/* Routine Selector Tabs */}
        <div className="mt-4 flex gap-2 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800">
          <button
            onClick={() => setSelectedRoutine('express')}
            className={`flex-1 rounded-xl py-2 text-xs font-black transition-all ${
              selectedRoutine === 'express'
                ? 'bg-white text-emerald-800 shadow-xs dark:bg-slate-900 dark:text-emerald-300'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            ⚡ ১০ মিনিটের এক্সপ্রেস রুটিন (10-Min)
          </button>
          <button
            onClick={() => setSelectedRoutine('deep')}
            className={`flex-1 rounded-xl py-2 text-xs font-black transition-all ${
              selectedRoutine === 'deep'
                ? 'bg-white text-indigo-800 shadow-xs dark:bg-slate-900 dark:text-indigo-300'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            🎯 ২৫ মিনিটের ডিপ প্র্যাকটিস (25-Min)
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>আজকের অগ্রগতি:</span>
            <span>
              {completedCount} / {activeSteps.length} সম্পন্ন
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(completedCount / activeSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps List */}
        <div className="mt-5 space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
          {activeSteps.map((step) => {
            const isDone = !!completedSteps[step.id];
            return (
              <div
                key={step.id}
                className={`flex items-center justify-between rounded-2xl border p-3.5 transition-all ${
                  isDone
                    ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleStep(step.id)} className="text-emerald-600">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 fill-emerald-600 text-white" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </button>
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        isDone
                          ? 'text-emerald-900 line-through dark:text-emerald-200'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {step.bangla}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigateToTab(step.tabTarget);
                    onClose();
                  }}
                  className="flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 shrink-0 ml-2"
                >
                  <span>Start</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {isAllComplete && (
          <div className="mt-4 rounded-2xl bg-emerald-500 p-3 text-center text-xs font-black text-white shadow-md">
            🎉 অভিনন্দন! আজকের সম্পূর্ণ ফ্লুয়েন্সি রুটিন সফলভাবে সম্পন্ন হয়েছে! (+50 Bonus XP)
          </div>
        )}
      </div>
    </div>
  );
};
