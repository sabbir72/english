import React from 'react';
import {
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  MessageSquareQuote,
  Layers,
  GraduationCap,
  BotMessageSquare,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { NavigationTab, UserProgress, UserLevel } from '../types';

interface LearningPathSectionProps {
  progress: UserProgress;
  userLevel: UserLevel;
  onNavigate: (tab: NavigationTab) => void;
}

export const LearningPathSection: React.FC<LearningPathSectionProps> = ({
  progress,
  userLevel,
  onNavigate,
}) => {
  const steps = [
    {
      step: 1,
      title: 'Foundation: Phonetics & Alphabet Sounds',
      titleBangla: 'ভিত্তি: বর্ণমালা ও সঠিক ধ্বনিবিদ্যা',
      description: 'বাঙালিদের ইংরেজি উচ্চারণের মূল সমস্যা দূরীকরণ এবং সঠিক উচ্চারণ।',
      targetTab: 'pronunciation' as NavigationTab,
      completed: true,
      badge: 'Step 1 • Completed',
    },
    {
      step: 2,
      title: 'Core 1000 Daily Vocabulary Words',
      titleBangla: 'প্রয়োজনীয় ১০০০ দৈনন্দিন শব্দভাণ্ডার',
      description: 'প্রতিদিনের প্রয়োজনীয় কাজ, পেশা, অনুভূতি ও পরিবারের সাথে সম্পর্কিত শব্দ।',
      targetTab: 'vocabulary' as NavigationTab,
      completed: progress.totalWordsLearned >= 5,
      badge: `Learned: ${progress.totalWordsLearned} words`,
    },
    {
      step: 3,
      title: 'Basic Sentence Structures (S + V + O)',
      titleBangla: 'সহজ বাক্য গঠন ও বেসিক সূত্রসমূহ',
      description: 'কর্তা + সাহায্যকারী ক্রিয়া + মূল ক্রিয়া + কর্মের নিয়ম শেখা।',
      targetTab: 'sentence-structure' as NavigationTab,
      completed: progress.totalSentencesPracticed >= 3,
      badge: `Practiced: ${progress.totalSentencesPracticed} sentences`,
    },
    {
      step: 4,
      title: 'Tenses & Time Mastery',
      titleBangla: 'কাল ও সময়ের প্রকাশ (টেন্স মাস্টার)',
      description: 'বর্তমান, অতীত এবং ভবিষ্যতের কথায় ভুল না করার বাস্তব নিয়ম।',
      targetTab: 'grammar' as NavigationTab,
      completed: progress.grammarTopicsCompleted >= 1,
      badge: `Completed: ${progress.grammarTopicsCompleted} topics`,
    },
    {
      step: 5,
      title: 'Common Expressions & Prepositions',
      titleBangla: 'দৈনন্দিন অভিব্যক্তি ও প্রিপজিশন',
      description: 'অফিস, শপিং, ভ্রমণ ও রেস্তোরাঁর বাস্তব বাক্য চর্চা।',
      targetTab: 'sentences' as NavigationTab,
      completed: false,
      badge: 'In Progress',
    },
    {
      step: 6,
      title: 'Fluent Conversation with AI Tutor',
      titleBangla: 'এআই স্পিকিং পার্টনারের সাথে সরাসরি চর্চা',
      description: 'ভুল সংশোধনসহ স্বতঃস্ফূর্ত ইংরেজি কথপোকথন।',
      targetTab: 'ai-conversation' as NavigationTab,
      completed: false,
      badge: 'Final Goal',
    },
  ];

  return (
    <div id="learning-path-section" className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>Step-by-Step Learning Path / শেখার রোডম্যাপ</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            শূন্য থেকে সাবলীল স্পিকিং পর্যন্ত সুশৃঙ্খল ধাপে ধাপে এগিয়ে যান।
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          <Trophy className="h-4 w-4 text-emerald-600" />
          <span>Current Level: {userLevel}</span>
        </div>
      </div>

      <div className="relative border-l-2 border-emerald-200 ml-4 pl-6 space-y-8 dark:border-emerald-900/60">
        {steps.map((item, idx) => (
          <div key={item.step} className="relative group">
            {/* Step dot icon */}
            <div
              className={`absolute -left-[35px] top-0 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-sm transition-transform group-hover:scale-110 ${
                item.completed
                  ? 'bg-emerald-600 text-white'
                  : 'border-2 border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {item.completed ? <CheckCircle2 className="h-4 w-4" /> : item.step}
            </div>

            {/* Step Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {item.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">Step 0{item.step}</span>
              </div>

              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                {item.titleBangla}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {item.description}
              </p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => onNavigate(item.targetTab)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-600"
                >
                  <span>Start Step {item.step}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
