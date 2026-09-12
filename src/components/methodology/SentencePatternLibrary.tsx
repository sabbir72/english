import React, { useState } from 'react';
import {
  Layers,
  Volume2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Copy,
  Check,
  Zap,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SentencePatternItem } from '../../types';
import { speakText } from '../../utils/speech';

interface SentencePatternLibraryProps {
  patterns: SentencePatternItem[];
  onOpenInBuilder?: (patternId: string) => void;
  onAskAIStructure?: (formula: string) => void;
  onAwardXP?: (amount: number) => void;
}

export const SentencePatternLibrary: React.FC<SentencePatternLibraryProps> = ({
  patterns,
  onOpenInBuilder,
  onAskAIStructure,
  onAwardXP,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activePatternId, setActivePatternId] = useState<string>(patterns[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'examples' | 'variations' | 'breakdown' | 'challenge'>('examples');

  // Interactive Sentence Generation Challenge state
  const [challengeInput, setChallengeInput] = useState('');
  const [completedSentences, setCompletedSentences] = useState<{ [patternId: string]: string[] }>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ [patternId: string]: { status: 'success' | 'error'; message: string } | null }>({});

  const filteredPatterns = patterns.filter((p) => {
    if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const currentPattern = patterns.find((p) => p.id === activePatternId) || patterns[0];

  const handleAddChallengeSentence = (sentenceText: string) => {
    if (!sentenceText.trim() || !currentPattern) return;
    const clean = sentenceText.trim();

    // Verify it contains elements of the formula
    const patternWords = currentPattern.staysSame.join(' ').toLowerCase();
    const isRelated =
      clean.toLowerCase().includes('want') ||
      clean.toLowerCase().includes('need') ||
      clean.toLowerCase().includes('try') ||
      clean.toLowerCase().includes('like') ||
      clean.toLowerCase().includes('learn') ||
      clean.toLowerCase().includes('time') ||
      clean.toLowerCase().includes('forget');

    if (!isRelated && clean.split(' ').length < 3) {
      setChallengeFeedback((prev) => ({
        ...prev,
        [currentPattern.id]: {
          status: 'error',
          message: 'অনুগ্রহ করে এই স্ট্রাকচার অনুযায়ী কমপক্ষে ৩টি শব্দের একটি পূর্ণাঙ্গ বাক্য তৈরি করুন।',
        },
      }));
      return;
    }

    const currentList = completedSentences[currentPattern.id] || [];
    if (currentList.includes(clean)) {
      setChallengeFeedback((prev) => ({
        ...prev,
        [currentPattern.id]: {
          status: 'error',
          message: 'এই বাক্যটি আপনি ইতিমধ্যে যোগ করেছেন। আরেকটি নতুন বাক্য চেষ্টা করুন!',
        },
      }));
      return;
    }

    const nextList = [...currentList, clean];
    setCompletedSentences((prev) => ({ ...prev, [currentPattern.id]: nextList }));
    setChallengeInput('');
    setChallengeFeedback((prev) => ({
      ...prev,
      [currentPattern.id]: {
        status: 'success',
        message: '✓ অসাধারণ! আপনার বাক্যটি সফলভাবে সংরক্ষিত হয়েছে (+10 XP)',
      },
    }));

    if (onAwardXP) {
      onAwardXP(10);
    }
  };

  return (
    <div id="sentence-pattern-library" className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Methodology Core
              </span>
              <span className="text-xs text-slate-500">বাংলা ধারণা থেকে শত শত ইংরেজি বাক্য</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Sentence Pattern Library (বাক্য তৈরির কাঠামোগত লাইব্রেরি)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              প্রতিটি স্ট্রাকচারের একটি অপরিবর্তনীয় ভিত্তি থাকে আর কিছু পরিবর্তনশীল শব্দ থাকে। এই কাঠামো আয়ত্ত করতে পারলে মুখস্থ ছাড়াই যে কোনো ভাব সহজে প্রকাশ করতে পারবেন।
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800 self-start md:self-auto">
            {['all', 'Beginner', 'Intermediate'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {diff === 'all' ? 'All Patterns' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern Pills Navigation */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filteredPatterns.map((pat) => {
            const isSelected = pat.id === activePatternId;
            return (
              <button
                key={pat.id}
                onClick={() => {
                  setActivePatternId(pat.id);
                  setActiveTab('examples');
                }}
                className={`shrink-0 rounded-2xl px-4 py-2.5 text-left transition-all ${
                  isSelected
                    ? 'border-2 border-emerald-500 bg-emerald-50/80 text-emerald-950 shadow-xs dark:bg-emerald-950/60 dark:text-emerald-200'
                    : 'border border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black font-sans">{pat.pattern}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                  {pat.meaningBangla}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Pattern Detail Hub */}
      {currentPattern && (
        <div className="space-y-6">
          {/* Card: Pattern Spotlight & Word-by-Word Alignment */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-5 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                    {currentPattern.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {currentPattern.category}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                  {currentPattern.pattern}
                </h3>
                <p className="mt-0.5 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  বাংলা ভাবার্থ: {currentPattern.meaningBangla}
                </p>
              </div>

              {onOpenInBuilder && (
                <button
                  onClick={() => onOpenInBuilder(currentPattern.id)}
                  className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-transform active:scale-95 shrink-0"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Open in Sentence Builder</span>
                </button>
              )}
            </div>

            {/* Bangla Idea -> English Word-by-Word Alignment (Section #2) */}
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  বাংলা থেকে ইংরেজি বাক্য ভাঙন (Word-by-Word Alignment)
                </span>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                  Formula: {currentPattern.formula}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                {currentPattern.breakdown.map((part, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-3 text-center transition-all ${
                      part.isAnchor
                        ? 'border-2 border-emerald-500 bg-white font-bold shadow-xs dark:bg-slate-900'
                        : 'border border-slate-200 bg-white/70 dark:border-slate-700 dark:bg-slate-850'
                    }`}
                  >
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {part.part}
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      = {part.bengali}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                      {part.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What Stays the Same vs What Changes (Section #3) */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                  <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  যা সবসময় অপরিবর্তিত থাকে (Anchor / Fixed Base)
                </div>
                <ul className="mt-2 space-y-1 text-xs text-blue-800 dark:text-blue-200 font-medium">
                  {currentPattern.staysSame.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="font-bold">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                  <span className="flex h-2 w-2 rounded-full bg-amber-600" />
                  যা পরিবর্তন করে নতুন বাক্য তৈরি হয় (Variable Slots)
                </div>
                <ul className="mt-2 space-y-1 text-xs text-amber-800 dark:text-amber-200 font-medium">
                  {currentPattern.changes.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="font-bold">✦</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sub-Section Navigation Tabs inside Pattern Card */}
            <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('examples')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === 'examples'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                1. Practical Examples ({currentPattern.examples.length})
              </button>

              <button
                onClick={() => setActiveTab('variations')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === 'variations'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                2. Sentence Variations ({currentPattern.variations.length})
              </button>

              <button
                onClick={() => setActiveTab('challenge')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === 'challenge'
                    ? 'bg-amber-500 text-white'
                    : 'text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/40'
                }`}
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>3. Build 5 Sentences Challenge</span>
              </button>
            </div>

            {/* TAB 1: Examples (One Structure -> Many Sentences) */}
            {activeTab === 'examples' && (
              <div className="mt-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  এই একটি সূত্র দিয়ে তৈরি বাস্তব জীবনের বাক্যসমূহ:
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {currentPattern.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="group flex items-start justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:border-emerald-300 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-900"
                    >
                      <div>
                        {ex.context && (
                          <span className="rounded-md bg-slate-200/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {ex.context}
                          </span>
                        )}
                        <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white leading-snug">
                          {ex.english}
                        </div>
                        <div className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {ex.bangla}
                        </div>
                      </div>

                      <button
                        onClick={() => speakText(ex.english)}
                        className="rounded-xl p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/60 transition-colors"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Sentence Variations (Basic vs Natural vs Conversational vs Formal) */}
            {activeTab === 'variations' && (
              <div className="mt-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  একই বাংলা ভাব প্রকাশে ৫টি ভিন্ন ধরনের ইংরেজি রূপ (Tone & Nuance):
                </div>

                <div className="grid gap-3">
                  {currentPattern.variations.map((v, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase ${
                              v.type === 'Natural'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : v.type === 'Conversational'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                : v.type === 'Formal'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {v.type} Style
                          </span>
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            {v.english}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {v.bangla}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {v.explanation}
                        </div>
                      </div>

                      <button
                        onClick={() => speakText(v.english)}
                        className="self-end sm:self-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
                        title="Listen"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Build 5 Sentences Challenge (Section #12) */}
            {activeTab === 'challenge' && (
              <div className="mt-5 space-y-4 rounded-2xl border border-amber-200 bg-amber-50/40 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white font-black text-xs">
                      5x
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                        Sentence Generation Challenge
                      </h4>
                      <p className="text-xs text-amber-800 dark:text-amber-300">
                        সূত্র: <span className="font-mono font-bold">{currentPattern.pattern}</span> ব্যবহার করে ৫টি বাক্য তৈরি করুন!
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    তৈরি সম্পন্ন: {(completedSentences[currentPattern.id] || []).length} / 5
                  </div>
                </div>

                {/* Vocabulary Bank Chips */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    সহায়ক শব্দভাণ্ডার (যেকোনো একটিতে ট্যাপ করে সরাসরি যোগ করতে পারেন):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentPattern.challengeVocab.map((voc, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddChallengeSentence(voc.sampleSentence)}
                        className="rounded-xl border border-amber-200 bg-white px-3 py-1.5 text-xs text-slate-800 hover:border-amber-400 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 transition-all text-left"
                      >
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          {voc.word}
                        </span>{' '}
                        <span className="text-[11px] text-slate-500">({voc.bangla})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom sentence input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={challengeInput}
                    onChange={(e) => setChallengeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddChallengeSentence(challengeInput);
                    }}
                    placeholder={`উদাহরণ: I want to read English newspapers daily...`}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                  <button
                    onClick={() => handleAddChallengeSentence(challengeInput)}
                    className="rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-600 shadow-xs"
                  >
                    Submit Sentence
                  </button>
                </div>

                {/* Feedback message */}
                {challengeFeedback[currentPattern.id] && (
                  <div
                    className={`rounded-xl p-3 text-xs font-semibold ${
                      challengeFeedback[currentPattern.id]?.status === 'success'
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                        : 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200'
                    }`}
                  >
                    {challengeFeedback[currentPattern.id]?.message}
                  </div>
                )}

                {/* User's completed sentences list */}
                {(completedSentences[currentPattern.id] || []).length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/60">
                    <div className="text-xs font-bold text-amber-950 dark:text-amber-200">
                      আপনার তৈরি বাক্যসমূহ:
                    </div>
                    {(completedSentences[currentPattern.id] || []).map((sent, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs font-bold text-slate-900 shadow-2xs dark:bg-slate-900 dark:text-white"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            {i + 1}
                          </span>
                          <span>{sent}</span>
                        </div>
                        <button
                          onClick={() => speakText(sent)}
                          className="text-slate-400 hover:text-emerald-600 p-1"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Common Mistakes Banner (Section #18) */}
            {currentPattern.commonMistakes.length > 0 && (
              <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50/40 p-4 dark:border-rose-950/40 dark:bg-rose-950/20">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider pb-2">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  বাঙালি শিক্ষার্থীদের সাধারণ ভুল (Common Mistakes with this pattern):
                </div>
                <div className="space-y-2">
                  {currentPattern.commonMistakes.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/80 p-3 text-xs dark:bg-slate-900/80 border border-rose-100/70 dark:border-rose-900/50"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-semibold text-rose-600 line-through dark:text-rose-400">
                          ✗ {m.incorrect}
                        </span>
                        <span className="font-black text-emerald-700 dark:text-emerald-400">
                          ✓ {m.correct}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {m.explanationBangla}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Generator Integration */}
            {onAskAIStructure && (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => onAskAIStructure(currentPattern.formula)}
                  className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Ask AI Tutor to generate 5 new conversational examples</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
