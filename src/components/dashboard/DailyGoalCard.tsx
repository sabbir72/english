import React from 'react';
import { CheckCircle2, Circle, Trophy, Zap } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { UserProgress } from '../../types';

export interface DailyGoalCardProps {
  progress: UserProgress;
  onNavigateToTab?: (tab: string) => void;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ progress, onNavigateToTab }) => {
  const goalItems = [
    {
      id: 'vocabulary',
      label: 'Vocabulary',
      labelBn: 'শব্দভাণ্ডার',
      completed: (progress.dailyGoal?.wordsDone ?? 3) >= 3,
      countStr: `${progress.dailyGoal?.wordsDone ?? 3}/5`,
    },
    {
      id: 'sentences',
      label: 'Sentence',
      labelBn: 'দৈনন্দিন বাক্য',
      completed: (progress.dailyGoal?.sentencesDone ?? 2) >= 2,
      countStr: `${progress.dailyGoal?.sentencesDone ?? 2}/3`,
    },
    {
      id: 'grammar',
      label: 'Grammar',
      labelBn: 'সহজ ব্যাকরণ',
      completed: (progress.dailyGoal?.grammarDone ?? 1) >= 1,
      countStr: `${progress.dailyGoal?.grammarDone ?? 1}/1`,
    },
    {
      id: 'practice',
      label: 'Practice',
      labelBn: 'কুইজ চর্চা',
      completed: (progress.dailyGoal?.practiceDone ?? 0) >= 1,
      countStr: `${progress.dailyGoal?.practiceDone ?? 0}/1`,
    },
    {
      id: 'ai-tutor',
      label: 'AI Conversation',
      labelBn: 'এআই স্পিকিং',
      completed: (progress.dailyGoal?.aiMinutesDone ?? 0) >= 5,
      countStr: `${progress.dailyGoal?.aiMinutesDone ?? 0}/5 min`,
    },
  ];

  const completedCount = goalItems.filter((i) => i.completed).length;
  const totalCount = goalItems.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <Card hoverEffect padding="md" className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Daily Target
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Today's Goal
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            আজকের লক্ষ্য ও অগ্রগতি
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <Trophy className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{completedCount} / {totalCount} completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={progressPercent}
        color="emerald"
        size="md"
        showPercentage
      />

      {/* Checklist items */}
      <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        {goalItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateToTab && onNavigateToTab(item.id)}
            className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600 shrink-0" />
              )}
              <span
                className={`text-xs font-semibold ${
                  item.completed
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.label}
              </span>
              <span className="text-[10px] text-slate-400 font-sans">
                ({item.labelBn})
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-bold ${
                  item.completed
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-400 font-normal'
                }`}
              >
                {item.completed ? '✓' : '○'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {item.countStr}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
