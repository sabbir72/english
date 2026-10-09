import React, { useState } from 'react';
import {
  Flame,
  BookOpen,
  Clock,
  Target,
  Sparkles,
} from 'lucide-react';
import {
  HeroBanner,
  TodaysLearningSection,
  QuickActionsGrid,
  DailyGoalCard,
  StreakCard,
  ContinueLearningCard,
  MethodologySpotlightCard,
  SmartBookSpotlightCard,
  ModernHeroDashboard,
  ModernStudyStrip,
} from './dashboard';
import { DailyFluencyRoutineModal } from './methodology/DailyFluencyRoutineModal';
import {
  UserProgress,
  UserProfile,
  NavigationTab,
  LearnSubTab,
  LanguageMode,
} from '../types';

export interface HomeDashboardProps {
  progress: UserProgress;
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onSelectLearnSubTab?: (subTab: LearnSubTab) => void;
  onAwardXP?: (amount: number) => void;
  languageMode?: LanguageMode;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  progress,
  profile,
  onNavigate,
  onSelectLearnSubTab,
  onAwardXP,
  languageMode = 'bn',
}) => {
  const [dailyRoutineOpen, setDailyRoutineOpen] = useState(false);

  // Time-aware greeting
  const hour = new Date().getHours();
  let timeGreeting = 'Good Morning';
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good Afternoon';
  } else if (hour >= 17) {
    timeGreeting = 'Good Evening';
  }

  const handleStartLearning = () => {
    if (onSelectLearnSubTab) onSelectLearnSubTab('patterns');
    onNavigate('learn');
  };

  const handlePracticeNow = () => {
    onNavigate('practice');
  };

  const handleResumeLesson = () => {
    if (onSelectLearnSubTab) onSelectLearnSubTab('grammar');
    onNavigate('grammar');
  };

  // 4 Compact Statistics (User Request: 7 Day Streak, 128 Words Learned, 42 min Practice, 82% Weekly Goal)
  const streakCount = progress.currentStreak || 7;
  const wordsLearned = progress.vocabularyLearned || 128;
  const practiceMinutes = (progress.speakingMinutes || 0) + 42;
  const weeklyGoalPercent = 82;

  return (
    <div id="home-dashboard-view" className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. New Modern Hero Dashboard with Audio, Daily Word & Instant CTAs */}
      <ModernHeroDashboard
        profile={profile}
        progress={progress}
        onNavigate={onNavigate}
        onOpenRoutine={() => setDailyRoutineOpen(true)}
        languageMode={languageMode}
        streakCount={streakCount}
      />

      {/* 2. Quick Study Shortcut Strip */}
      <ModernStudyStrip
        onNavigate={onNavigate}
        onOpenRoutine={() => setDailyRoutineOpen(true)}
        languageMode={languageMode}
      />

      {/* 3. 4 Compact Learning Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Stat 1: 7 Day Streak */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white block truncate">
                {streakCount} Day Streak
              </span>
              <span className="text-xs text-[#475569] dark:text-slate-400 block font-bangla">
                একনাগাড়ে অনুশীলন
              </span>
            </div>
          </div>
        </div>

        {/* Stat 2: 128 Words Learned */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46E5] dark:text-indigo-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white block truncate">
                {wordsLearned} Words Learned
              </span>
              <span className="text-xs text-[#475569] dark:text-slate-400 block font-bangla">
                শব্দভাণ্ডার আয়ত্ত
              </span>
            </div>
          </div>
        </div>

        {/* Stat 3: 42 min Practice */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/60 text-[#0EA5E9] dark:text-sky-400">
              <Clock className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white block truncate">
                {practiceMinutes} min Practice
              </span>
              <span className="text-xs text-[#475569] dark:text-slate-400 block font-bangla">
                স্পিকিং ও রিডিং
              </span>
            </div>
          </div>
        </div>

        {/* Stat 4: 82% Weekly Goal */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#10B981] dark:text-emerald-400">
              <Target className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white block truncate">
                {weeklyGoalPercent}% Weekly Goal
              </span>
              <span className="text-xs text-[#475569] dark:text-slate-400 block font-bangla">
                সাপ্তাহিক লক্ষ্য অর্জিত
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 100-Page Smart Story Immersion Book Spotlight */}
      <SmartBookSpotlightCard onOpenBook={() => onNavigate('smart-book')} />

      {/* 4. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Learning Cards, Today's Learning, Methodology */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-7">
          {/* Learning Cards (Vocabulary, Grammar, Sentence Builder, Pronunciation, Reading, AI Conversation) */}
          <QuickActionsGrid
            languageMode={languageMode}
            onSelectAction={(tab) => {
              if (tab === 'oxford-3000' as unknown as NavigationTab && onSelectLearnSubTab) {
                onSelectLearnSubTab('vocabulary');
              }
              if (tab === 'vocabulary' && onSelectLearnSubTab) onSelectLearnSubTab('vocabulary');
              if (tab === 'sentences' && onSelectLearnSubTab) onSelectLearnSubTab('sentences');
              if (tab === 'grammar' && onSelectLearnSubTab) onSelectLearnSubTab('grammar');
              if (tab === 'builder' && onSelectLearnSubTab) onSelectLearnSubTab('builder');
              if (tab === 'pronunciation' && onSelectLearnSubTab) onSelectLearnSubTab('pronunciation');
              onNavigate(tab);
            }}
          />

          {/* Methodology Spotlight: One Structure -> Many Sentences */}
          <MethodologySpotlightCard
            onOpenSentenceBuilder={() => {
              if (onSelectLearnSubTab) onSelectLearnSubTab('builder');
              onNavigate('learn');
            }}
            onOpenPatternLibrary={() => {
              if (onSelectLearnSubTab) onSelectLearnSubTab('patterns');
              onNavigate('learn');
            }}
            onOpenDailyRoutine={() => setDailyRoutineOpen(true)}
          />

          {/* Today's Learning / Routine */}
          <TodaysLearningSection
            onPractice={() => onNavigate('practice')}
            onNavigateToLearn={() => {
              if (onSelectLearnSubTab) onSelectLearnSubTab('vocabulary');
              onNavigate('learn');
            }}
            onNavigateTo3000={() => {
              if (onSelectLearnSubTab) onSelectLearnSubTab('vocabulary');
              onNavigate('oxford-3000' as unknown as NavigationTab);
            }}
            onAwardXP={onAwardXP}
          />
        </div>

        {/* Right Column: Progress Visualization, Streak, Continue Learning */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Progress Overview (Circular Indicator + Daily 80% & Weekly 70% Bars) */}
          <DailyGoalCard
            progress={progress}
            onNavigateToTab={(tab) => onNavigate(tab as NavigationTab)}
          />

          {/* Streak Card */}
          <StreakCard streakCount={streakCount} />

          {/* Continue Learning Card */}
          <ContinueLearningCard
            topicTitle="Present Continuous in Real Life"
            description="Talking about things happening right now and temporary habits."
            descriptionBn="বর্তমানে যা ঘটছে বা সাময়িক কর্মকাণ্ড প্রকাশে প্রেজেন্ট কন্টিনিউয়াস ব্যবহার করুন।"
            progressPercent={65}
            onResume={handleResumeLesson}
          />
        </div>
      </div>

      {/* Daily Fluency Routine Tracker Modal */}
      <DailyFluencyRoutineModal
        isOpen={dailyRoutineOpen}
        onClose={() => setDailyRoutineOpen(false)}
        onNavigateToModule={(subTab) => {
          if (onSelectLearnSubTab) onSelectLearnSubTab(subTab);
          onNavigate('learn');
        }}
      />
    </div>
  );
};
