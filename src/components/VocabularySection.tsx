import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Volume2,
  Heart,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Calendar,
  FastForward,
  Award,
  Layers,
  Dumbbell,
  Check,
  Flame,
  ChevronRight,
  RefreshCw,
  Eye,
  Star,
  Info,
} from 'lucide-react';
import { VocabularyItem, PartOfSpeech } from '../types';
import { speakText } from '../utils/speech';
import { Oxford3000Explorer } from './Oxford3000Explorer';
import {
  DailyVocabState,
  DailyBatchesResult,
  getStoredDailyVocabState,
  saveStoredDailyVocabState,
  calculateDailyBatches,
  formatDateBangla,
} from '../utils/vocabDailyManager';

interface VocabularySectionProps {
  vocabulary: VocabularyItem[];
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onPracticeWord: (word: VocabularyItem) => void;
  onAwardXP?: (amount: number) => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  vocabulary,
  onToggleFavorite,
  onToggleLearned,
  onPracticeWord,
  onAwardXP,
}) => {
  // Daily Engine State
  const [dailyState, setDailyState] = useState<DailyVocabState>(() => getStoredDailyVocabState());

  // Active tab: default to 'daily' for instant engagement with suggestions, supports 'oxford3000' for the full 3000 regular word list
  const [activeTab, setActiveTab] = useState<'daily' | 'oxford3000' | 'all' | 'review' | 'learned' | 'favorites' | 'quiz'>('daily');

  // Local storage sets for Oxford 3000 items
  const [oxfordFavIds, setOxfordFavIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('boli_oxford_favs_v1');
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    return new Set();
  });

  const [oxfordLearnedIds, setOxfordLearnedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('boli_oxford_learned_v1');
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    return new Set();
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [posFilter, setPosFilter] = useState<string>('all');

  // Interaction feedback
  const [previewTomorrow, setPreviewTomorrow] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Persist daily state changes
  const updateDailyState = (updater: (prev: DailyVocabState) => DailyVocabState) => {
    setDailyState((prev) => {
      const next = updater(prev);
      saveStoredDailyVocabState(next);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Calculate daily batches based on current state & vocabulary
  const batches: DailyBatchesResult = useMemo(() => {
    return calculateDailyBatches(vocabulary, dailyState);
  }, [vocabulary, dailyState]);

  // Categories list extracted dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    vocabulary.forEach((v) => {
      if (v.category) set.add(v.category);
    });
    return ['all', ...Array.from(set)];
  }, [vocabulary]);

  // Action: Mark single word as read today
  const handleMarkReadToday = (word: VocabularyItem) => {
    const isAlreadyReadToday = batches.readTodayList.some((w) => w.id === word.id);

    updateDailyState((prev) => {
      const currentRecords = { ...prev.records };
      if (isAlreadyReadToday) {
        // Unmark
        delete currentRecords[word.id];
        return { ...prev, records: currentRecords };
      } else {
        // Mark as read today
        currentRecords[word.id] = {
          wordId: word.id,
          lastReadDate: batches.effectiveDate,
          readCount: (currentRecords[word.id]?.readCount || 0) + 1,
          status: 'read_today',
          firstReadDate: currentRecords[word.id]?.firstReadDate || batches.effectiveDate,
        };
        return { ...prev, records: currentRecords };
      }
    });

    if (!isAlreadyReadToday) {
      if (!word.isLearned) {
        onToggleLearned(word.id);
      }
      onAwardXP?.(10);
      showToast(`🎉 "${word.word}" আজকের পড়া সম্পন্ন হয়েছে (+১০ XP)`);
    } else {
      showToast(`"${word.word}" পড়া তালিকা থেকে বাতিল করা হয়েছে`);
    }
  };

  // Action: Mark single word as Mastered
  const handleMarkMastered = (word: VocabularyItem) => {
    updateDailyState((prev) => {
      const currentRecords = { ...prev.records };
      const current = currentRecords[word.id];
      currentRecords[word.id] = {
        wordId: word.id,
        lastReadDate: batches.effectiveDate,
        readCount: (current?.readCount || 0) + 1,
        status: current?.status === 'mastered' ? 'read_today' : 'mastered',
        firstReadDate: current?.firstReadDate || batches.effectiveDate,
      };
      return { ...prev, records: currentRecords };
    });

    if (!word.isLearned) {
      onToggleLearned(word.id);
    }
    onAwardXP?.(15);
    showToast(`🏆 "${word.word}" আয়ত্ত করা তালিকায় যোগ করা হয়েছে (+১৫ XP)`);
  };

  // Action: Mark all words in today's batch as read
  const handleMarkAllTodayBatchAsRead = () => {
    const unreadInToday = batches.todayBatch.filter(
      (w) => !batches.readTodayList.some((r) => r.id === w.id)
    );

    if (unreadInToday.length === 0) {
      showToast('আজকের সব শব্দ আগেই পড়া হয়ে গেছে!');
      return;
    }

    updateDailyState((prev) => {
      const currentRecords = { ...prev.records };
      unreadInToday.forEach((w) => {
        currentRecords[w.id] = {
          wordId: w.id,
          lastReadDate: batches.effectiveDate,
          readCount: (currentRecords[w.id]?.readCount || 0) + 1,
          status: 'read_today',
          firstReadDate: currentRecords[w.id]?.firstReadDate || batches.effectiveDate,
        };
      });
      return { ...prev, records: currentRecords };
    });

    unreadInToday.forEach((w) => {
      if (!w.isLearned) onToggleLearned(w.id);
    });

    onAwardXP?.(unreadInToday.length * 10);
    showToast(`🌟 আজকের ${unreadInToday.length}টি নতুন শব্দ সফলভাবে পড়া শেষ হয়েছে! (+${unreadInToday.length * 10} XP)`);
  };

  // Action: Advance to next day (+1 day simulation)
  const handleAdvanceNextDay = () => {
    updateDailyState((prev) => ({
      ...prev,
      simulatedDateOffset: prev.simulatedDateOffset + 1,
    }));
    showToast('🚀 পরবর্তী দিনে স্থানান্তরিত করা হয়েছে! আজকের জন্য সম্পূর্ণ নতুন শব্দ সাজেস্ট করা হয়েছে।');
  };

  // Action: Reset date offset to actual today
  const handleResetToRealToday = () => {
    updateDailyState((prev) => ({
      ...prev,
      simulatedDateOffset: 0,
    }));
    showToast('📅 আসল আজকের তারিখে ফিরে আসা হয়েছে।');
  };

  // Action: Change daily goal count
  const handleChangeGoal = (newGoal: number) => {
    updateDailyState((prev) => ({
      ...prev,
      dailyWordGoal: newGoal,
    }));
    showToast(`🎯 দৈনিক টার্গেট সেট করা হয়েছে: ${newGoal}টি শব্দ`);
  };

  // Filtered vocabulary for "All Words" tab
  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((item) => {
      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      // Level filter
      if (levelFilter !== 'all' && item.difficulty !== levelFilter) return false;

      // POS filter
      if (posFilter !== 'all' && item.partOfSpeech !== posFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesMeaning = item.banglaMeaning.toLowerCase().includes(q);
        const matchesPron = item.pronunciation?.toLowerCase().includes(q);
        const matchesSynonym = item.synonyms?.some((s) => s.toLowerCase().includes(q));
        if (!matchesWord && !matchesMeaning && !matchesPron && !matchesSynonym) return false;
      }

      return true;
    });
  }, [vocabulary, categoryFilter, levelFilter, posFilter, searchQuery]);

  // Quiz items generated from vocabulary
  const quizItems = useMemo(() => {
    return vocabulary.slice(0, 15).map((vocab) => {
      const otherMeanings = vocabulary
        .filter((v) => v.id !== vocab.id)
        .map((v) => v.banglaMeaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [vocab.banglaMeaning, ...otherMeanings].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(vocab.banglaMeaning);
      return {
        word: vocab.word,
        ipa: vocab.ipa,
        pronunciation: vocab.pronunciation,
        pos: vocab.partOfSpeech,
        options,
        correctIndex,
        example: vocab.example,
        exampleBangla: vocab.exampleBangla,
      };
    });
  }, [vocabulary]);

  const handleSelectQuizOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizItems[quizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1);
      onAwardXP?.(10);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (quizIndex + 1 < quizItems.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizIndex(0);
      setQuizScore(0);
    }
  };

  // Render a Single Vocabulary Card
  const renderWordCard = (item: VocabularyItem, isDailyBatchCard: boolean = false) => {
    const record = dailyState.records[item.id];
    const isReadToday = record?.lastReadDate === batches.effectiveDate;
    const isMastered = record?.status === 'mastered';
    const isReadPreviously = record?.lastReadDate && record.lastReadDate < batches.effectiveDate;

    return (
      <div
        key={item.id}
        id={`vocab-card-${item.id}`}
        className={`group flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 dark:bg-slate-900 ${
          isReadToday
            ? 'border-emerald-300 ring-1 ring-emerald-200/60 dark:border-emerald-800 dark:ring-emerald-950/40'
            : isMastered
            ? 'border-amber-300 ring-1 ring-amber-200/60 dark:border-amber-800 dark:ring-amber-950/40'
            : 'border-slate-200 hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:hover:border-emerald-600'
        }`}
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Status Badge */}
              {isReadToday ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                  <Check className="h-3 w-3" />
                  আজকের পড়া শেষ
                </span>
              ) : isMastered ? (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                  <Star className="h-3 w-3 fill-amber-500" />
                  আয়ত্ত করা
                </span>
              ) : isReadPreviously ? (
                <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                  <RefreshCw className="h-3 w-3" />
                  রিভিশন বাকি
                </span>
              ) : isDailyBatchCard ? (
                <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300">
                  <Sparkles className="h-3 w-3" />
                  আজকের নতুন
                </span>
              ) : null}

              {/* Difficulty */}
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  item.difficulty === 'Beginner'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : item.difficulty === 'Intermediate'
                    ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'
                    : 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300'
                }`}
              >
                {item.difficulty}
              </span>

              {/* Part of Speech */}
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {item.partOfSpeech}
              </span>
            </div>

            {/* Favorite button */}
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`rounded-lg p-1.5 transition-colors ${
                item.isFavorite
                  ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Word Heading & Pronunciation */}
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {item.word}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => speakText(item.word, 1.0)}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                  title="Normal pronunciation (1.0x)"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => speakText(item.word, 0.65)}
                  className="rounded-lg px-2 py-0.5 text-[11px] font-bold text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800"
                  title="Slow pronunciation (0.65x)"
                >
                  Slow
                </button>
              </div>
            </div>

            {/* Pronunciation with clear Bangla phonetic badge */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                {item.ipa}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 font-bangla">
                <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-normal">বাংলা উচ্চারণ:</span>
                {item.pronunciation}
              </span>
            </div>

            {/* Bengali Meaning */}
            <div className="mt-2.5 rounded-xl bg-emerald-50/80 p-2.5 text-xs dark:bg-emerald-950/40">
              <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                বাংলা অর্থ:{' '}
              </span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                {item.banglaMeaning}
              </span>
            </div>

            {/* Example Sentence with Audio */}
            <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  &ldquo;{item.example}&rdquo;
                </p>
                <button
                  onClick={() => speakText(item.example)}
                  className="flex-shrink-0 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  title="Listen example"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {item.exampleBangla}
              </p>
            </div>

            {/* Synonyms */}
            {item.synonyms && item.synonyms.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1 text-[11px]">
                <span className="text-slate-400 font-medium">Synonyms:</span>
                {item.synonyms.map((s, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => handleMarkReadToday(item)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                isReadToday
                  ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900/60'
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{isReadToday ? 'পড়া সম্পন্ন' : 'আজ পড়া হয়েছে'}</span>
            </button>

            <button
              onClick={() => handleMarkMastered(item)}
              className={`rounded-xl p-2 transition-colors ${
                isMastered
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800'
              }`}
              title={isMastered ? 'Mastered (Click to unmaster)' : 'Mark as fully Mastered'}
            >
              <Award className="h-4 w-4" />
            </button>

            <button
              onClick={() => onPracticeWord(item)}
              className="flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              title="Practice making sentences with this word"
            >
              <span>অনুশীলন</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="vocabulary-section" className="space-y-6">
      {/* Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in dark:bg-slate-100 dark:text-slate-900">
          <Sparkles className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header & Sub-Navigation */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Smart Vocabulary
            </span>
            <span className="text-xs text-slate-400">
              মোট {vocabulary.length}টি বাস্তবমুখী ইংরেজি শব্দ
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            ভোকাবুলারি শব্দভাণ্ডার ও দৈনিক স্মার্ট সাজেশন
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            প্রতিদিন নির্ধারিত শব্দ পড়ুন—পড়া শেষ হলে পরবর্তী দিন সম্পূর্ণ নতুন একগুচ্ছ শব্দ স্বয়ংক্রিয়ভাবে সাজেস্ট হবে।
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'daily'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Flame className="h-3.5 w-3.5 text-amber-300" />
            আজকের সাজেশন ({batches.readTodayCount}/{batches.dailyGoal})
          </button>

          <button
            onClick={() => setActiveTab('oxford3000')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              activeTab === 'oxford3000'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 dark:text-emerald-300 dark:bg-emerald-950/70'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
            ৩০০০ শব্দ (Oxford 3000)
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            সব শব্দভাণ্ডার ({vocabulary.length})
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'review'
                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            রিভিশন ({batches.reviewBatch.length})
          </button>

          <button
            onClick={() => setActiveTab('learned')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'learned'
                ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            পড়া শেষ ({vocabulary.filter((v) => v.isLearned).length})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'favorites'
                ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-900 dark:text-rose-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            পছন্দ ({vocabulary.filter((v) => v.isFavorite).length})
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-purple-600 shadow-sm dark:bg-slate-900 dark:text-purple-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            কুইজ
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: DAILY SUGGESTIONS & SMART ROTATION QUEUE
         ========================================================================= */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          {/* Daily Banner & Interactive Controls */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-500/10 via-emerald-50 to-white p-6 shadow-sm dark:border-emerald-900/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    তারিখ: {formatDateBangla(batches.effectiveDate, !batches.isSimulated)}
                  </span>
                  {batches.isSimulated && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      সিমুলেশন মোড: +{dailyState.simulatedDateOffset} দিন এগিয়ে
                    </span>
                  )}
                  {batches.isTodayGoalComplete && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      আজকের টার্গেট সম্পন্ন! 🎉
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-white">
                  আজকের জন্য নির্বাচিত {batches.todayBatch.length}টি গুরুত্বপূর্ণ শব্দ
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  💡 <strong>স্মার্ট রোটেশন নিয়ম:</strong> আজকের শব্দগুলো পড়া শেষ হলে, আগামীকাল সিস্টেম স্বয়ংক্রিয়ভাবে পরবর্তী নতুন {batches.dailyGoal}টি শব্দ সামনে আনবে। পড়া শব্দগুলো কখনো হারিয়ে যাবে না, সেগুলো রিভিশন তালিকায় সংরক্ষিত থাকবে।
                </p>
              </div>

              {/* Action Buttons: Next Day Simulator & Goal Selector */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl bg-white p-1.5 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <span className="text-[11px] font-semibold text-slate-500 px-1.5">টার্গেট:</span>
                  {[3, 5, 8, 10].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleChangeGoal(goal)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                        dailyState.dailyWordGoal === goal
                          ? 'bg-emerald-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAdvanceNextDay}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  title="Test what happens tomorrow! Words read today will rotate to review, and fresh words appear."
                >
                  <FastForward className="h-3.5 w-3.5 text-emerald-400" />
                  <span>পরবর্তী দিন টেস্ট করুন (+১ দিন)</span>
                </button>

                {batches.isSimulated && (
                  <button
                    onClick={handleResetToRealToday}
                    className="flex items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    title="Reset back to actual today"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>আজকে ফিরুন</span>
                  </button>
                )}
              </div>
            </div>

            {/* Daily Progress Bar */}
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm border border-emerald-100 dark:bg-slate-800/80 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  আজকের লক্ষ্য অগ্রগতি: {batches.readTodayCount} / {batches.dailyGoal} শব্দ পড়া হয়েছে
                </span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {batches.progressPercent}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${batches.progressPercent}%` }}
                />
              </div>

              {/* Quick helper controls */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span>📖 মোট শব্দভাণ্ডার: <strong>{batches.totalWords}</strong>টি</span>
                  <span>⏳ এখনও পড়া বাকি: <strong>{batches.unreadCount}</strong>টি</span>
                  <span>🔄 রিভিশন তালিকায়: <strong>{batches.reviewBatch.length}</strong>টি</span>
                </div>

                <button
                  onClick={handleMarkAllTodayBatchAsRead}
                  className="font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  এক ক্লিকে আজকের সব শব্দ পড়া মার্ক করুন
                </button>
              </div>
            </div>

            {/* Oxford 3000 Callout Card */}
            <div className="mt-4 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs border border-emerald-800/40">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">৩০০০ মোস্ট ইম্পর্ট্যান্ট রেগুলার শব্দ তালিকা (Oxford 3000)</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    ইংরেজি ভাষার সবচেয়ে প্রয়োজনীয় ৩০০০ শব্দ A1, A2, B1, B2 লেভেলে বাংলা অর্থ, উচ্চারণ ও বাস্তব উদাহরণসহ ব্রাউজ করুন।
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('oxford3000')}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>সম্পূর্ণ ৩০০০ শব্দ ব্রাউজ করুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Today's Words Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>আজকের প্রস্তাবিত শব্দাবলি ({batches.todayBatch.length}টি)</span>
              </h4>
              <span className="text-xs text-slate-500">
                শব্দটির উচ্চারণ ও উদাহরণ শুনুন এবং মুখস্থ হলে &quot;আজ পড়া হয়েছে&quot; ক্লিক করুন
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {batches.todayBatch.map((item) => renderWordCard(item, true))}
            </div>
          </div>

          {/* Tomorrow's Preview Drawer / Collapsible */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-950/60 dark:bg-indigo-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-bold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  <Eye className="h-3 w-3" />
                  আগামীকালের আগাম সাজেশন
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  আগামীকাল এই নতুন শব্দগুলো আপনার সামনে আসবে
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  আজকের পড়া সম্পন্ন হলে আগামীকাল স্বয়ংক্রিয়ভাবে পরবর্তী {batches.nextDayPreviewBatch.length}টি নতুন শব্দ লোড হবে।
                </p>
              </div>

              <button
                onClick={() => setPreviewTomorrow(!previewTomorrow)}
                className="flex items-center gap-1 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-sm border border-indigo-200 hover:bg-indigo-50 dark:bg-slate-800 dark:border-indigo-900 dark:text-indigo-300"
              >
                <span>{previewTomorrow ? 'লুকিয়ে রাখুন' : 'আগামীকালের শব্দগুলো দেখুন'}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${previewTomorrow ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {previewTomorrow && (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-3 border-t border-indigo-100 dark:border-indigo-900">
                {batches.nextDayPreviewBatch.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-indigo-100 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-base">
                        {item.word}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{item.ipa}</span>
                      <span className="rounded bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 font-bangla">
                        উচ্চারণ: {item.pronunciation}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-emerald-700 font-medium dark:text-emerald-400">
                      {item.banglaMeaning}
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 italic">
                      &ldquo;{item.example}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB: 3000 MOST IMPORTANT REGULAR WORDS (OXFORD 3000)
         ========================================================================= */}
      {activeTab === 'oxford3000' && (
        <Oxford3000Explorer
          onPracticeWord={onPracticeWord}
          onAwardXP={onAwardXP}
          onToggleFavorite={(word) => {
            setOxfordFavIds((prev) => {
              const next = new Set(prev);
              if (next.has(word.id)) {
                next.delete(word.id);
                showToast(`"${word.word}" প্রিয় তালিকা থেকে সরানো হয়েছে`);
              } else {
                next.add(word.id);
                showToast(`❤️ "${word.word}" প্রিয় তালিকায় যোগ করা হয়েছে`);
              }
              try {
                localStorage.setItem('boli_oxford_favs_v1', JSON.stringify(Array.from(next)));
              } catch {}
              return next;
            });
            onToggleFavorite(word.id);
          }}
          onToggleLearned={(word) => {
            setOxfordLearnedIds((prev) => {
              const next = new Set(prev);
              if (next.has(word.id)) {
                next.delete(word.id);
                showToast(`"${word.word}" পড়া তালিকা থেকে সরানো হয়েছে`);
              } else {
                next.add(word.id);
                showToast(`🎉 "${word.word}" পড়া সম্পন্ন হয়েছে! (+৫ XP)`);
              }
              try {
                localStorage.setItem('boli_oxford_learned_v1', JSON.stringify(Array.from(next)));
              } catch {}
              return next;
            });
            onToggleLearned(word.id);
          }}
          userFavorites={new Set([...vocabulary.filter((v) => v.isFavorite).map((v) => v.id), ...oxfordFavIds])}
          userLearned={new Set([...vocabulary.filter((v) => v.isLearned).map((v) => v.id), ...oxfordLearnedIds])}
        />
      )}

      {/* =========================================================================
          TAB 2: ALL VOCABULARY WORDS (72+ curated words with deep filters)
         ========================================================================= */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="শব্দ খুঁজুন (যেমন: Achieve, Improve, ইত্যাদি বা বাংলা অর্থ)..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            {/* Category and filter pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500">বিষয় / টপিক:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {cat === 'all' ? 'সকল টপিক' : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-2">
                {/* Level Dropdown */}
                <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <span className="text-slate-400">লেভেল:</span>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="bg-transparent font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="dark:bg-slate-900">সকল লেভেল</option>
                    <option value="Beginner" className="dark:bg-slate-900">Beginner (প্রাথমিক)</option>
                    <option value="Intermediate" className="dark:bg-slate-900">Intermediate (মধ্যম)</option>
                    <option value="Advanced" className="dark:bg-slate-900">Advanced (উন্নত)</option>
                  </select>
                </div>

                {/* Part of Speech Dropdown */}
                <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <span className="text-slate-400">পদ (POS):</span>
                  <select
                    value={posFilter}
                    onChange={(e) => setPosFilter(e.target.value)}
                    className="bg-transparent font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="dark:bg-slate-900">সকল পদ</option>
                    <option value="noun" className="dark:bg-slate-900">Noun (বিশেষ্য)</option>
                    <option value="verb" className="dark:bg-slate-900">Verb (ক্রিয়া)</option>
                    <option value="adjective" className="dark:bg-slate-900">Adjective (বিশেষণ)</option>
                    <option value="adverb" className="dark:bg-slate-900">Adverb (ক্রিয়া বিশেষণ)</option>
                  </select>
                </div>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                ফিল্টার অনুযায়ী শব্দ: {filteredVocabulary.length}টি
              </span>
            </div>
          </div>

          {/* Grid of All Filtered Vocabulary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVocabulary.map((item) => renderWordCard(item))}
          </div>

          {filteredVocabulary.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
              <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
              <h3 className="mt-3 font-bold text-base text-slate-700 dark:text-slate-300">
                কোনো শব্দ পাওয়া যায়নি
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা অন্য কোনো শব্দ খুঁজুন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: REVIEW DUE (Previous days words that need revision)
         ========================================================================= */}
      {activeTab === 'review' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900/50 dark:bg-blue-950/20">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                পূর্বের দিনগুলোর রিভিশন তালিকা ({batches.reviewBatch.length}টি)
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              স্পেসড রিপিটিশন (Spaced Repetition) নিয়ম: আগে পড়া শব্দগুলো মাঝে মাঝে চোখ বুলিয়ে নিলে সেগুলো দীর্ঘস্থায়ী স্মৃতিতে পরিণত হয়।
            </p>
          </div>

          {batches.reviewBatch.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {batches.reviewBatch.map((item) => renderWordCard(item))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <h4 className="mt-3 font-bold text-sm text-slate-800 dark:text-slate-200">
                কোনো রিভিশন বাকি নেই!
              </h4>
              <p className="mt-1 text-xs text-slate-500">
                আজকের শব্দগুলো পড়া শেষ করুন, পরবর্তী দিন সেগুলো রিভিশন তালিকায় যুক্ত হবে।
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 4: LEARNED WORDS
         ========================================================================= */}
      {activeTab === 'learned' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              পড়া সম্পন্ন করা শব্দাবলি ({vocabulary.filter((v) => v.isLearned).length}টি)
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vocabulary
              .filter((v) => v.isLearned)
              .map((item) => renderWordCard(item))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: FAVORITES
         ========================================================================= */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              পছন্দের শব্দ তালিকা ({vocabulary.filter((v) => v.isFavorite).length}টি)
            </h3>
          </div>
          {vocabulary.filter((v) => v.isFavorite).length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vocabulary
                .filter((v) => v.isFavorite)
                .map((item) => renderWordCard(item))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
              <Heart className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs text-slate-500">
                যেকোনো শব্দের ওপর হার্ট (Heart) আইকনে ক্লিক করে প্রিয় তালিকায় সংরক্ষণ করতে পারেন।
              </p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 6: VOCABULARY QUIZ
         ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Dumbbell className="h-4 w-4" />
              Vocabulary Quiz • Question {quizIndex + 1} of {quizItems.length}
            </span>
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              Score: {quizScore}
            </span>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                {quizItems[quizIndex].word}
              </h3>
              <button
                onClick={() => speakText(quizItems[quizIndex].word)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-purple-600 dark:hover:bg-slate-800"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{quizItems[quizIndex].ipa}</span>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 font-bangla bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-200/60 dark:border-purple-800/40">
                উচ্চারণ: {quizItems[quizIndex].pronunciation}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              নিচের কোনটি এই শব্দের সঠিক বাংলা অর্থ?
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            {quizItems[quizIndex].options.map((option, idx) => {
              const isCorrect = idx === quizItems[quizIndex].correctIndex;
              const isSelected = selectedOption === idx;

              let btnStyle =
                'border-slate-200 bg-slate-50 text-slate-800 hover:border-purple-300 hover:bg-purple-50/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/70 dark:text-emerald-200';
                } else if (isSelected) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 text-rose-900 font-bold dark:bg-rose-950/70 dark:text-rose-200';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuizOption(idx)}
                  disabled={isAnswered}
                  className={`w-full rounded-xl border p-3.5 text-left text-xs transition-all ${btnStyle}`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Example Sentence:
              </div>
              <p className="mt-1 text-xs font-medium text-slate-900 dark:text-white">
                &ldquo;{quizItems[quizIndex].example}&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {quizItems[quizIndex].exampleBangla}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {isAnswered ? (
              <button
                onClick={handleNextQuiz}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500"
              >
                <span>{quizIndex + 1 === quizItems.length ? 'Restart Quiz' : 'পরবর্তী প্রশ্ন'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <p className="text-xs text-slate-400">সঠিক অপশনটি বাছাই করুন</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
