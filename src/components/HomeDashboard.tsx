import React, { useState, useEffect } from 'react';
import {
  Flame,
  BookOpen,
  Clock,
  Target,
  Globe2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  TodaysLearningSection,
  QuickActionsGrid,
  DailyGoalCard,
  StreakCard,
  ContinueLearningCard,
  MethodologySpotlightCard,
  SmartBookSpotlightCard,
  ModernHeroDashboard,
  ModernStudyStrip,
  ArabicDashboardView,
  JapaneseDashboardView,
} from './dashboard';
import { DailyFluencyRoutineModal } from './methodology/DailyFluencyRoutineModal';
import {
  UserProgress,
  UserProfile,
  NavigationTab,
  LearnSubTab,
  LanguageMode,
  AppLanguage,
} from '../types';

export interface HomeDashboardProps {
  progress: UserProgress;
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onSelectLearnSubTab?: (subTab: LearnSubTab) => void;
  onAwardXP?: (amount: number, reason?: string) => void;
  languageMode?: LanguageMode;
  activeLanguage?: AppLanguage;
  onSelectLanguage?: (lang: AppLanguage) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  progress,
  profile,
  onNavigate,
  onSelectLearnSubTab,
  onAwardXP,
  languageMode = 'bn',
  activeLanguage,
  onSelectLanguage,
}) => {
  const [dailyRoutineOpen, setDailyRoutineOpen] = useState(false);

  // 3-Language state: 'english' | 'arabic' | 'japanese'
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>(() => {
    if (activeLanguage) return activeLanguage;
    const saved = localStorage.getItem('boli_selected_dashboard_lang');
    if (saved === 'arabic' || saved === 'japanese' || saved === 'english') {
      return saved;
    }
    return 'english';
  });

  useEffect(() => {
    if (activeLanguage && activeLanguage !== selectedLanguage) {
      setSelectedLanguage(activeLanguage);
    }
  }, [activeLanguage]);

  const handleLanguageChange = (lang: AppLanguage) => {
    setSelectedLanguage(lang);
    localStorage.setItem('boli_selected_dashboard_lang', lang);
    onSelectLanguage?.(lang);
  };

  const handleResumeLesson = () => {
    if (onSelectLearnSubTab) onSelectLearnSubTab('grammar');
    onNavigate('grammar');
  };

  // 4 Compact Statistics for English
  const streakCount = progress.currentStreak || 7;
  const wordsLearned = progress.vocabularyLearned || 128;
  const practiceMinutes = (progress.speakingMinutes || 0) + 42;
  const weeklyGoalPercent = 82;

  return (
    <div id="home-dashboard-view" className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 3-Language Master Selector Tab Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xs">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>আন্তর্জাতিক ভাষা নির্বাচন (Language Academy)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                  ৩টি ভাষা উপলব্ধ
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                নিচের যেকোনো ভাষা বেছে নিন; বাছাইকৃত ভাষার বিস্তারিত ড্যাশবোর্ড ও পাঠ নিচে প্রদর্শিত হবে
              </p>
            </div>
          </div>
        </div>

        {/* 3 Interactive Language Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Tab 1: English */}
          <button
            type="button"
            onClick={() => handleLanguageChange('english')}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              selectedLanguage === 'english'
                ? 'bg-linear-to-r from-indigo-600 to-blue-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 scale-[1.01]'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-700/80 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-800'
            }`}
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl shadow-xs ${
              selectedLanguage === 'english' ? 'bg-white/20' : 'bg-white dark:bg-slate-700'
            }`}>
              🇬🇧
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-black ${selectedLanguage === 'english' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  English
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                  selectedLanguage === 'english'
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                }`}>
                  মূল কোর্স
                </span>
              </div>
              <span className={`text-xs block mt-0.5 font-bangla ${
                selectedLanguage === 'english' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                ইংরেজি স্পোকেন ও মেথডলজি
              </span>
            </div>
          </button>

          {/* Tab 2: Arabic */}
          <button
            type="button"
            onClick={() => handleLanguageChange('arabic')}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              selectedLanguage === 'arabic'
                ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25 scale-[1.01]'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-700/80 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-slate-800'
            }`}
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl shadow-xs ${
              selectedLanguage === 'arabic' ? 'bg-white/20' : 'bg-white dark:bg-slate-700'
            }`}>
              🇸🇦
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-black ${selectedLanguage === 'arabic' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  العربية (Arabic)
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                  selectedLanguage === 'arabic'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  ২৮ হরফ
                </span>
              </div>
              <span className={`text-xs block mt-0.5 font-bangla ${
                selectedLanguage === 'arabic' ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                আরবি ভাষা শিক্ষা ও ডায়লগ
              </span>
            </div>
          </button>

          {/* Tab 3: Japanese */}
          <button
            type="button"
            onClick={() => handleLanguageChange('japanese')}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left cursor-pointer ${
              selectedLanguage === 'japanese'
                ? 'bg-linear-to-r from-rose-600 to-amber-600 text-white border-rose-600 shadow-lg shadow-rose-600/25 scale-[1.01]'
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-700/80 hover:border-rose-400 hover:bg-rose-50/50 dark:hover:bg-slate-800'
            }`}
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl shadow-xs ${
              selectedLanguage === 'japanese' ? 'bg-white/20' : 'bg-white dark:bg-slate-700'
            }`}>
              🇯🇵
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-black ${selectedLanguage === 'japanese' ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  日本語 (Japanese)
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                  selectedLanguage === 'japanese'
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  JLPT N5
                </span>
              </div>
              <span className={`text-xs block mt-0.5 font-bangla ${
                selectedLanguage === 'japanese' ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'
              }`}>
                জাপানি ভাষা ও শ্যাডোয়িং ল্যাব
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic View: Whichever language is chosen, show its in-depth details */}
      {selectedLanguage === 'arabic' && (
        <ArabicDashboardView
          progress={progress}
          profile={profile}
          onNavigate={onNavigate}
          onAwardXP={onAwardXP}
        />
      )}

      {selectedLanguage === 'japanese' && (
        <JapaneseDashboardView
          progress={progress}
          profile={profile}
          onNavigate={onNavigate}
          onAwardXP={onAwardXP}
        />
      )}

      {selectedLanguage === 'english' && (
        <>
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

          {/* 5. Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Learning Cards, Today's Learning, Methodology */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-7">
              {/* Learning Cards (Vocabulary, Grammar, Sentence Builder, Pronunciation, Reading, AI Conversation) */}
              <QuickActionsGrid
                languageMode={languageMode}
                onSelectAction={(tab) => {
                  if (tab === ('oxford-3000' as unknown as NavigationTab) && onSelectLearnSubTab) {
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
        </>
      )}

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
