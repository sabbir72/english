import React from 'react';
import { Play, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';

export interface ContinueLearningCardProps {
  topicTitle?: string;
  description?: string;
  descriptionBn?: string;
  progressPercent?: number;
  onResume: () => void;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  topicTitle = 'Present Simple',
  description = 'Learn how to talk about habits and daily routines.',
  descriptionBn = 'দৈনন্দিন অভ্যাস ও সাধারণ সত্য প্রকাশ করতে প্রেজেন্ট সিম্পল ব্যবহার করুন।',
  progressPercent = 60,
  onResume,
}) => {
  return (
    <Card hoverEffect padding="md" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Continue Learning
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {topicTitle}
            </h3>
          </div>
        </div>

        <span className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-mono font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {progressPercent}% Done
        </span>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          "{description}"
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
          {descriptionBn}
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={progressPercent}
        color="blue"
        size="sm"
      />

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Approx. 4 mins left</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Play className="h-3 w-3 fill-current" />}
          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          onClick={onResume}
        >
          Continue
        </Button>
      </div>
    </Card>
  );
};
