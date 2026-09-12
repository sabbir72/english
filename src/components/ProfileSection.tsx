import React, { useState } from 'react';
import {
  User,
  Settings,
  Heart,
  Bookmark,
  Volume2,
  CheckCircle2,
  Save,
  LogOut,
  Sparkles,
  Award,
  Globe,
} from 'lucide-react';
import { UserProfile, UserLevel, VocabularyItem, SentenceItem } from '../types';
import { speakText } from '../utils/speech';

interface ProfileSectionProps {
  profile: UserProfile;
  vocabulary: VocabularyItem[];
  sentences: SentenceItem[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSelectWord: (word: VocabularyItem) => void;
  onSelectSentence: (sentence: SentenceItem) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  vocabulary,
  sentences,
  onUpdateProfile,
  onSelectWord,
  onSelectSentence,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [level, setLevel] = useState<UserLevel>(profile.level);
  const [dailyWordGoal, setDailyWordGoal] = useState(profile.dailyWordGoal);
  const [accent, setAccent] = useState(profile.preferredAccent);
  const [speechSpeed, setSpeechSpeed] = useState(profile.speechSpeed);
  const [showBangla, setShowBangla] = useState(profile.showBanglaExplanation);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const favoriteWords = vocabulary.filter((v) => v.isFavorite);
  const savedSentences = sentences.filter((s) => s.isSaved);

  const handleSave = () => {
    onUpdateProfile({
      name,
      email,
      level,
      dailyWordGoal,
      preferredAccent: accent,
      speechSpeed,
      showBanglaExplanation: showBangla,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div id="profile-section" className="mx-auto max-w-4xl space-y-6">
      {/* Header Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-2xl font-black text-white shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="text-xs text-slate-500">{profile.email}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Level: {profile.level}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {profile.preferredAccent} Accent
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500"
          >
            <Save className="h-4 w-4" />
            <span>{savedSuccess ? 'Changes Saved!' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>

      {/* Preferences Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Account & Learning Profile */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="h-4 w-4 text-emerald-600" />
            <span>Learning Settings / শিক্ষার সেটিংস</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Your Target English Level (CEFR):
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as UserLevel)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Beginner">Beginner (শুরুর স্তর)</option>
              <option value="A1">A1 - Elementary</option>
              <option value="A2">A2 - Pre-Intermediate</option>
              <option value="B1">B1 - Intermediate</option>
              <option value="B2">B2 - Upper Intermediate</option>
              <option value="C1">C1 - Advanced Fluent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Daily Target: {dailyWordGoal} Words/Day
            </label>
            <input
              type="range"
              min="3"
              max="20"
              value={dailyWordGoal}
              onChange={(e) => setDailyWordGoal(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                Show Bengali Explanations
              </div>
              <div className="text-[11px] text-slate-500">বাংলা অর্থ ও ব্যাখ্যা সবসময় দৃশ্যমান রাখা</div>
            </div>
            <input
              type="checkbox"
              checked={showBangla}
              onChange={(e) => setShowBangla(e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600"
            />
          </div>
        </div>

        {/* Audio & Speech Settings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-blue-600" />
            <span>Audio & Voice Accent / অডিও ও উচ্চারণ</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Preferred Accent:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccent('US')}
                className={`rounded-xl border p-2.5 text-xs font-bold transition-all ${
                  accent === 'US'
                    ? 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                🇺🇸 American English
              </button>
              <button
                type="button"
                onClick={() => setAccent('UK')}
                className={`rounded-xl border p-2.5 text-xs font-bold transition-all ${
                  accent === 'UK'
                    ? 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                🇬🇧 British English
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Playback Speed: {speechSpeed}x
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setSpeechSpeed(spd)}
                  className={`rounded-xl border p-2 text-xs font-bold ${
                    speechSpeed === spd
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {spd === 0.75 ? 'Slow (0.75x)' : spd === 1.0 ? 'Normal (1.0x)' : 'Fast (1.25x)'}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Audio Test:{' '}
            </span>
            <button
              onClick={() => speakText('Hello, welcome to BoliEnglish speaking practice!', speechSpeed)}
              className="mt-1 text-emerald-600 hover:underline font-bold flex items-center gap-1"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>Listen to sample voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Saved Favorites Lists */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Favorite Words */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span>Favorite Words ({favoriteWords.length})</span>
            </h3>
          </div>

          <div className="mt-3 max-h-64 overflow-y-auto space-y-2">
            {favoriteWords.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                কোনো প্রিয় শব্দ সেভ করা নেই। ভোকাবুলারি সেকশন থেকে হার্ট আইকনে ক্লিক করুন।
              </p>
            ) : (
              favoriteWords.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-800/60"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white mr-2">
                      {item.word}
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-300">
                      {item.banglaMeaning}
                    </span>
                  </div>
                  <button
                    onClick={() => speakText(item.word)}
                    className="rounded p-1 text-slate-400 hover:text-emerald-600"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Saved Sentences */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span>Saved Sentences ({savedSentences.length})</span>
            </h3>
          </div>

          <div className="mt-3 max-h-64 overflow-y-auto space-y-2">
            {savedSentences.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                কোনো বাক্য বুকমার্ক করা নেই। বাক্য সেকশন থেকে বুকমার্ক আইকনে ক্লিক করুন।
              </p>
            ) : (
              savedSentences.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-800/60"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-900 dark:text-white truncate">
                      {item.english}
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 truncate">
                      {item.bangla}
                    </div>
                  </div>
                  <button
                    onClick={() => speakText(item.english)}
                    className="ml-2 rounded p-1 text-slate-400 hover:text-blue-600"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
