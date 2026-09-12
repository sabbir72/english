import React, { useState } from 'react';
import {
  HeroBanner,
  TodaysLearningSection,
  QuickActionsGrid,
  DailyGoalCard,
  StreakCard,
  ContinueLearningCard,
  MethodologySpotlightCard,
} from './dashboard';
import { DailyFluencyRoutineModal } from './methodology/DailyFluencyRoutineModal';
import {
  UserProgress,
  UserProfile,
  NavigationTab,
  LearnSubTab,
} from '../types';

export interface HomeDashboardProps {
  progress: UserProgress;
  profile: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onSelectLearnSubTab?: (subTab: LearnSubTab) => void;
  onAwardXP?: (amount: number) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  progress,
  profile,
  onNavigate,
  onSelectLearnSubTab,
  onAwardXP,
}) => {
  const [dailyRoutineOpen, setDailyRoutineOpen] = useState(false);

  const handleStartLearning = () => {
    if (onSelectLearnSubTab) onSelectLearnSubTab('patterns');
    onNavigate('learn');
  };

  const handleTalkWithAI = () => {
    onNavigate('ai-tutor');
  };

  const handleResumeLesson = () => {
    if (onSelectLearnSubTab) onSelectLearnSubTab('grammar');
    onNavigate('grammar');
  };

  return (
    <div id="home-dashboard-view" className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* 1. Hero Banner */}
      <HeroBanner
        onStartLearning={handleStartLearning}
        onTalkWithAI={handleTalkWithAI}
      />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Primary Column: Today's Learning & Quick Actions */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          {/* Core Methodology Spotlight: One Structure -> Many Sentences */}
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

          {/* 2. Today's Learning */}
          <TodaysLearningSection
            onPractice={() => onNavigate('practice')}
            onNavigateToLearn={() => {
              if (onSelectLearnSubTab) onSelectLearnSubTab('vocabulary');
              onNavigate('learn');
            }}
            onAwardXP={onAwardXP}
          />

          {/* 3. Quick Actions */}
          <QuickActionsGrid
            onSelectAction={(tab) => {
              if (tab === 'vocabulary' && onSelectLearnSubTab) onSelectLearnSubTab('vocabulary');
              if (tab === 'sentences' && onSelectLearnSubTab) onSelectLearnSubTab('sentences');
              if (tab === 'grammar' && onSelectLearnSubTab) onSelectLearnSubTab('grammar');
              onNavigate(tab);
            }}
          />
        </div>

        {/* Right / Secondary Column: Daily Goal, Streak & Continue Learning */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* 4. Daily Goal */}
          <DailyGoalCard
            progress={progress}
            onNavigateToTab={(tab) => onNavigate(tab as NavigationTab)}
          />

          {/* 5. Learning Streak */}
          <StreakCard streakCount={progress.currentStreak || 3} />

          {/* 6. Continue Learning */}
          <ContinueLearningCard
            topicTitle="Present Simple"
            description="Learn how to talk about habits and daily routines."
            descriptionBn="দৈনন্দিন অভ্যাস ও সাধারণ সত্য প্রকাশ করতে প্রেজেন্ট সিম্পল ব্যবহার করুন।"
            progressPercent={60}
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
