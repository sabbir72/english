import React, { useState, useEffect } from 'react';
import {
  Flame,
  Calendar,
  Clock,
  Target,
  Bell,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  HeartHandshake,
  TrendingUp,
  Settings2,
  Save,
  Check,
} from 'lucide-react';
import { UserProgress, UserProfile } from '../types';

interface DailyHabitSectionProps {
  progress: UserProgress;
  profile: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onAwardXP?: (xp: number) => void;
}

export interface HabitSettings {
  dailyTargetWords: number;
  dailyTargetSentences: number;
  practiceDurationMinutes: number;
  preferredTime: string;
  notificationsEnabled: boolean;
  weeklyGoalDays: number;
}

export const DailyHabitSection: React.FC<DailyHabitSectionProps> = ({
  progress,
  profile,
  onUpdateProfile,
  onAwardXP,
}) => {
  const [habitSettings, setHabitSettings] = useState<HabitSettings>(() => {
    const saved = localStorage.getItem('boli_habit_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      dailyTargetWords: profile.dailyWordGoal || 10,
      dailyTargetSentences: 5,
      practiceDurationMinutes: profile.dailyGoalMinutes || 15,
      preferredTime: '08:00 AM',
      notificationsEnabled: true,
      weeklyGoalDays: 5,
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const saveHabitSettings = (newSettings: HabitSettings) => {
    setHabitSettings(newSettings);
    localStorage.setItem('boli_habit_settings', JSON.stringify(newSettings));
    onUpdateProfile?.({
      dailyWordGoal: newSettings.dailyTargetWords,
      dailyGoalMinutes: newSettings.practiceDurationMinutes,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Mock weekly activity for display
  const weeklyDays = [
    { day: 'Mon', fullDay: 'সোমবার', completed: true, mins: 15, words: 12 },
    { day: 'Tue', fullDay: 'মঙ্গলবার', completed: true, mins: 20, words: 15 },
    { day: 'Wed', fullDay: 'বুধবার', completed: true, mins: 15, words: 10 },
    { day: 'Thu', fullDay: 'বৃহস্পতিবার', completed: false, mins: 0, words: 0 },
    { day: 'Fri', fullDay: 'শুক্রবার', completed: true, mins: 25, words: 18 },
    { day: 'Sat', fullDay: 'শনিবার', completed: true, mins: 15, words: 8 },
    { day: 'Sun', fullDay: 'রবিবার', completed: false, mins: 0, words: 0, isToday: true },
  ];

  const completedDaysCount = weeklyDays.filter((d) => d.completed).length;
  const hasMissedDays = weeklyDays.some((d) => !d.completed && !d.isToday);

  return (
    <div id="daily-habit-system-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/50 p-6 sm:p-8 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 px-3 py-1 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span>Personal Habit & Fluency System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              দৈনিক শেখার অভ্যাস ও সাপ্তাহিক লক্ষ্য
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
              প্রতিদিন অল্প সময় নিয়ে ধারাবাহিক চর্চা আপনাকে অনর্গল ইংরেজি বলতে সহায়তা করবে। আপনার উপযুক্ত সময় ও লক্ষ্য নির্ধারণ করুন।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500">
              <Flame className="h-6 w-6 fill-amber-500" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">বর্তমান স্ট্রিক</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                {progress.currentStreak || 3} দিন একনাগাড়ে!
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Weekly Activity Calendar & Positive Feedback */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weekly Activity Card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  সাপ্তাহিক প্র্যাকটিস ক্যালেন্ডার
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
                {completedDaysCount} / {habitSettings.weeklyGoalDays} দিন সম্পন্ন
              </span>
            </div>

            {/* 7-Day Visual Row */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3 py-6">
              {weeklyDays.map((day, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl border text-center transition-all ${
                      day.completed
                        ? 'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800/80'
                        : day.isToday
                        ? 'bg-indigo-50/70 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-800/40 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {day.day}
                    </span>

                    <div className="my-2 flex h-8 w-8 items-center justify-center rounded-full">
                      {day.completed ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200/80 text-slate-500 dark:bg-slate-700 dark:text-slate-400 font-bold text-xs">
                          —
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      {day.completed ? `${day.mins}m` : day.isToday ? 'আজ' : 'বিরতি'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Kind & Motivational Message for Missed Days (Crucial UX mandate) */}
            {hasMissedDays ? (
              <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/60 p-4 sm:p-5 dark:border-indigo-900/60 dark:bg-indigo-950/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 shrink-0">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                      মাঝে বিরতি হয়েছে? কোনো সমস্যা নেই!
                    </h4>
                    <p className="text-xs text-indigo-900/80 dark:text-indigo-300/80 font-bangla mt-1 leading-relaxed">
                      নতুন ভাষা শেখার পথ একবারে নিখুঁত হওয়া জরুরি নয়। ব্যস্ততার কারণে একদিন মিস হতেই পারে। আজ মাত্র ৫ মিনিট একটু সময় দিন, আপনার গতি আবার ফিরে আসবে! 🌟
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-4 sm:p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                      চমৎকার ধারাবাহিকতা!
                    </h4>
                    <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 font-bangla mt-1 leading-relaxed">
                      আপনি দারুণভাবে নিজের লক্ষ্য পূরণ করছেন। প্রতিদিনের এই ছোট ছোট পদক্ষেপই আপনাকে অনর্গল ইংরেজি বলতে দক্ষ করে তুলছে! 🚀
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Motivational Tip Box */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              <TrendingUp className="h-4 w-4" />
              <span>সফল শিক্ষার্থীদের কার্যকর ৩টি নিয়ম</span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">১. একই সময়ে পড়ুন</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-1">
                  প্রতিদিন সকালে চা খাওয়ার সময় বা রাতে ঘুমানোর আগে নির্দিষ্ট ১০ মিনিট রাখুন।
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">২. শব্দ দিয়ে বাক্য গড়ুন</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-1">
                  শুধু শব্দের অর্থ না মুখস্থ করে সাথে সাথে একটি বাস্তব বাক্য বানিয়ে ফেলুন।
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">৩. জোরে উচ্চারণ করুন</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-1">
                  অডিও বাটনে ক্লিক করে স্পিকারের উচ্চারণের সাথে নিজের কণ্ঠে জোরে বলুন।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Habit Customizer Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  অভ্যাস কনফিগারেশন
                </h3>
              </div>
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="h-3.5 w-3.5" /> সংরক্ষিত
                </span>
              )}
            </div>

            <div className="space-y-5 mt-5">
              {/* 1. Daily Target Words */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  প্রতিদিনের নতুন শব্দ লক্ষ্য: <span className="text-indigo-600">{habitSettings.dailyTargetWords} টি শব্দ</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => saveHabitSettings({ ...habitSettings, dailyTargetWords: num })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        habitSettings.dailyTargetWords === num
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Practice Duration */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  প্রতিদিনের অনুশীলনের সময়কাল: <span className="text-indigo-600">{habitSettings.practiceDurationMinutes} মিনিট</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 30].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => saveHabitSettings({ ...habitSettings, practiceDurationMinutes: dur })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        habitSettings.practiceDurationMinutes === dur
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {dur}m
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Preferred Practice Time */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  পছন্দের অনুশীলনের সময় (Preferred Time)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'সকাল ৮:০০ AM', val: '08:00 AM' },
                    { label: 'দুপুর ২:০০ PM', val: '02:00 PM' },
                    { label: 'সন্ধ্যা ৭:০০ PM', val: '07:00 PM' },
                    { label: 'রাত ১০:০০ PM', val: '10:00 PM' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => saveHabitSettings({ ...habitSettings, preferredTime: item.val })}
                      className={`py-2 px-3 text-left rounded-xl text-xs font-semibold border transition-all flex items-center justify-between ${
                        habitSettings.preferredTime === item.val
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-600 ring-1 ring-indigo-500'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      <Clock className="h-3 w-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Weekly Goal Days */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  সাপ্তাহিক লক্ষ্য (সপ্তাহে কয়দিন পড়বেন?): <span className="text-indigo-600">{habitSettings.weeklyGoalDays} দিন</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[4, 5, 6, 7].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => saveHabitSettings({ ...habitSettings, weeklyGoalDays: days })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        habitSettings.weeklyGoalDays === days
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {days} দিন
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Reminder Notification Toggle */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      দৈনিক রিমাইন্ডার নোটিফিকেশন
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      অনুশীলনের সময় মনে করিয়ে দেবে
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    saveHabitSettings({
                      ...habitSettings,
                      notificationsEnabled: !habitSettings.notificationsEnabled,
                    })
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    habitSettings.notificationsEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      habitSettings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
