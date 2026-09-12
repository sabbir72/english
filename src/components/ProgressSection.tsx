import React from 'react';
import {
  Flame,
  BookOpen,
  MessageSquareQuote,
  GraduationCap,
  Mic,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  RotateCcw,
  Trophy,
  Zap,
  Smile,
} from 'lucide-react';
import { UserProgress, UserProfile } from '../types';

interface ProgressSectionProps {
  progress: UserProgress;
  profile: UserProfile;
  onResetProgress: () => void;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  progress,
  profile,
  onResetProgress,
}) => {
  const xp = progress.xp || 140;

  const dailyItems = [
    {
      label: 'Vocabulary',
      labelBn: 'শব্দভাণ্ডার',
      done: progress.dailyGoal.wordsDone,
      target: progress.dailyGoal.wordsTarget,
      color: 'bg-emerald-500',
    },
    {
      label: 'Sentences',
      labelBn: 'বাক্য চর্চা',
      done: progress.dailyGoal.sentencesDone,
      target: progress.dailyGoal.sentencesTarget,
      color: 'bg-blue-500',
    },
    {
      label: 'Grammar',
      labelBn: 'ব্যাকরণ',
      done: progress.dailyGoal.grammarDone,
      target: progress.dailyGoal.grammarTarget,
      color: 'bg-purple-500',
    },
    {
      label: 'AI Practice',
      labelBn: 'এআই স্পিকিং',
      done: progress.dailyGoal.aiMinutesDone,
      target: progress.dailyGoal.aiMinutesTarget,
      suffix: 'min',
      color: 'bg-amber-500',
    },
  ];

  const achievements = [
    {
      title: '7-Day Streak',
      titleBangla: 'একটানা ৭ দিন চর্চা',
      icon: <Flame className="h-5 w-5 text-amber-500" />,
      earned: progress.currentStreak >= 7,
      desc: 'Keep the learning momentum going.',
    },
    {
      title: 'Vocab Novice (20+ Words)',
      titleBangla: 'শব্দ শিক্ষার্থী',
      icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      earned: progress.totalWordsLearned >= 20,
      desc: 'Learned at least 20 English words.',
    },
    {
      title: 'Sentence Builder (10+ Sentences)',
      titleBangla: 'বাক্য নির্মাতা',
      icon: <MessageSquareQuote className="h-5 w-5 text-blue-500" />,
      earned: progress.totalSentencesPracticed >= 10,
      desc: 'Mastered 10 key sentence structures.',
    },
    {
      title: 'Grammar Enthusiast',
      titleBangla: 'ব্যাকরণ বিশারদ',
      icon: <GraduationCap className="h-5 w-5 text-purple-500" />,
      earned: progress.grammarTopicsCompleted >= 2,
      desc: 'Completed 2 core grammar lessons.',
    },
    {
      title: 'Speaking Champion',
      titleBangla: 'স্পিকিং চ্যাম্পিয়ন',
      icon: <Mic className="h-5 w-5 text-rose-500" />,
      earned: progress.speakingMinutes >= 5,
      desc: 'Spoke 5+ minutes with AI tutor.',
    },
    {
      title: 'Quiz Master (80%+ Accuracy)',
      titleBangla: 'কুইজ মাস্টার',
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      earned: progress.quizAverageScore >= 80,
      desc: 'Maintained 80%+ quiz score.',
    },
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div id="progress-section" className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Learning Progress & Analytics / আপনার অগ্রগতি</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            প্রতিদিনের শেখার অগ্রগতি, একটানা স্ট্রিক, পয়েন্ট এবং অর্জিত ব্যাজসমূহ।
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Stats</span>
        </button>
      </div>

      {/* Motivation & XP Banner */}
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50/90 to-amber-100/40 p-6 shadow-xs dark:border-amber-900/60 dark:bg-gradient-to-r dark:from-amber-950/30 dark:to-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm shadow-amber-500/30">
            <Smile className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                You&apos;re doing great!
              </h3>
              <span className="flex items-center gap-1 rounded-full bg-amber-200/80 px-2 py-0.5 text-[11px] font-extrabold text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                <Flame className="h-3 w-3 fill-amber-600 text-amber-600" />
                {progress.currentStreak} days streak
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-0.5">
              Just 5 more minutes today to keep your streak burning bright!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto rounded-2xl border border-emerald-300/80 bg-white/90 px-4 py-2 text-xs font-bold text-emerald-800 dark:bg-slate-800 dark:text-emerald-300 shadow-2xs">
          <Zap className="h-4 w-4 fill-emerald-500 text-emerald-500" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Points</span>
            <span className="text-sm font-black">{xp} XP Earned</span>
          </div>
        </div>
      </div>

      {/* TODAY'S PROGRESS COMPONENT (from prompt) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Today&apos;s Progress / আজকের লক্ষ্যমাত্রা
            </h3>
            <p className="text-xs text-slate-500">প্রতিদিনের নির্ধারিত পাঠ পূরণ করুন</p>
          </div>
          <span className="rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            Active Goal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dailyItems.map((item, idx) => {
            const pct = Math.min(100, Math.round((item.done / item.target) * 100));
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item.label} <span className="text-slate-400 font-normal">({item.labelBn})</span>
                  </span>
                  <span className="font-black text-slate-900 dark:text-white font-mono">
                    {item.done} / {item.target} {item.suffix || ''}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Big Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Daily Streak</span>
            <Flame className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {progress.currentStreak}
          </div>
          <p className="mt-1 text-xs text-amber-600 font-semibold">Days active streak</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Words Learned</span>
            <BookOpen className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {progress.totalWordsLearned}
          </div>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">Total words</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Sentences</span>
            <MessageSquareQuote className="h-5 w-5 text-blue-600" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {progress.totalSentencesPracticed}
          </div>
          <p className="mt-1 text-xs text-blue-600 font-semibold">Practiced</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Speaking Time</span>
            <Mic className="h-5 w-5 text-rose-500" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {progress.speakingMinutes}m
          </div>
          <p className="mt-1 text-xs text-rose-600 font-semibold">With AI Partner</p>
        </div>
      </div>

      {/* Activity Heatmap / Weekly Activity */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Weekly Practice Activity / সাপ্তাহিক চর্চা
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {progress.historyDates.length} days logged
          </span>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day, idx) => {
            const isDone = idx < progress.currentStreak;
            return (
              <div
                key={day}
                className="flex flex-col items-center gap-2 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800/50"
              >
                <span className="text-xs font-bold text-slate-500">{day}</span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'border border-slate-200 text-slate-400 dark:border-slate-700'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-4 w-4" /> : '—'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges / Achievements */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Trophy className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Badges & Milestones / অর্জন ও স্বীকৃতি
          </h3>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 rounded-2xl border p-4 transition-all ${
                item.earned
                  ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                  : 'border-slate-100 bg-slate-50/60 opacity-60 dark:border-slate-800 dark:bg-slate-800/40'
              }`}
            >
              <div className="rounded-2xl bg-white p-2.5 shadow-2xs dark:bg-slate-800">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  {item.earned && (
                    <span className="rounded bg-emerald-600 px-1.5 py-0.2 text-[9px] font-bold text-white">
                      Earned
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                  {item.titleBangla}
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
