import React, { useState } from 'react';
import {
  History,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Plus,
  Trash2,
  Check,
  Volume2,
  Flame,
  Target,
  ArrowUpRight,
  TrendingUp,
  Bookmark,
  Layers,
  HelpCircle,
  RotateCcw,
  ListTodo,
  Tag,
  Languages,
  ChevronRight,
  Edit3,
  ArrowLeftRight,
  CheckCheck,
  Lightbulb,
  Search,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  BacktrackItem,
  NextStudyQueueItem,
  DailyStudyLog,
  NavigationTab,
} from '../types';
import {
  getStoredStudyLogs,
  saveStoredStudyLogs,
  getStoredNextQueue,
  saveStoredNextQueue,
  getStoredNextDayTarget,
  saveStoredNextDayTarget,
  getTodayDateStr,
  getYesterdayDateStr,
  getTomorrowDateStr,
  NextDayTarget,
  findStudiedItemRecord,
} from '../utils/backtrackStorage';
import { PROFESSIONAL_SENTENCES } from '../data/professionalSentencesData';
import { COMPREHENSIVE_VOCABULARY_LIST } from '../data/vocabularyData';
import { speakText, speakArabicText, speakJapaneseText } from '../utils/speech';

interface StudyBacktrackSectionProps {
  onNavigate: (tab: NavigationTab | string) => void;
  onAwardXP?: (amount: number) => void;
}

export const StudyBacktrackSection: React.FC<StudyBacktrackSectionProps> = ({
  onNavigate,
  onAwardXP,
}) => {
  // Main data states
  const [logs, setLogs] = useState<DailyStudyLog[]>(getStoredStudyLogs);
  const [nextQueue, setNextQueue] = useState<NextStudyQueueItem[]>(getStoredNextQueue);
  const [nextTarget, setNextTarget] = useState<NextDayTarget>(getStoredNextDayTarget);

  // Active sub-tab: 'today' | 'history' | 'queue' | 'matrix'
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'history' | 'queue' | 'matrix'>('matrix');

  // Word verifier search tool ("আমি কি অমুক শব্দটা আগে পড়েছি?")
  const [verifierQuery, setVerifierQuery] = useState('');
  const [verifierResult, setVerifierResult] = useState<{
    searched: boolean;
    found: boolean;
    title?: string;
    date?: string;
    formattedDateBn?: string;
  } | null>(null);

  // Selected date for history review
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<string>(getYesterdayDateStr());

  // Filter by language
  const [filterLang, setFilterLang] = useState<'all' | 'english' | 'arabic' | 'japanese'>('all');

  // Modals / forms
  const [addTodayOpen, setAddTodayOpen] = useState(false);
  const [addQueueOpen, setAddQueueOpen] = useState(false);
  const [targetEditOpen, setTargetEditOpen] = useState(false);

  // Form states for adding today's studied item
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newType, setNewType] = useState<'word' | 'sentence' | 'grammar' | 'reading' | 'custom'>('word');
  const [newLang, setNewLang] = useState<'english' | 'arabic' | 'japanese'>('english');
  const [newCategory, setNewCategory] = useState('Vocabulary');
  const [newNotes, setNewNotes] = useState('');

  // Form states for adding to next queue
  const [queueTitle, setQueueTitle] = useState('');
  const [queueSubtitle, setQueueSubtitle] = useState('');
  const [queueType, setQueueType] = useState<'word' | 'sentence' | 'grammar' | 'reading' | 'custom'>('word');
  const [queuePriority, setQueuePriority] = useState<'high' | 'normal' | 'low'>('high');
  const [queueNotes, setQueueNotes] = useState('');

  // Edit target state
  const [tempTarget, setTempTarget] = useState<NextDayTarget>(nextTarget);

  // Success toast indicator
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Pronounce audio based on language
  const handlePlayVoice = (text: string, lang?: 'english' | 'arabic' | 'japanese') => {
    if (lang === 'arabic') {
      speakArabicText(text);
    } else if (lang === 'japanese') {
      speakJapaneseText(text);
    } else {
      speakText(text, 1.0);
    }
  };

  // Find today's log or create fallback
  const todayDateStr = getTodayDateStr();
  const todayLog = logs.find((l) => l.date === todayDateStr) || {
    date: todayDateStr,
    formattedDateBn: 'আজকের পড়ার রেকর্ড (Today)',
    items: [],
    minutesSpent: 0,
    xpEarned: 0,
  };

  // Filtered today's items
  const filteredTodayItems = todayLog.items.filter((item) => {
    if (filterLang !== 'all' && item.language !== filterLang) return false;
    return true;
  });

  // History logs (excluding today)
  const historyLogs = logs.filter((l) => l.date !== todayDateStr);
  const activeHistoryLog = historyLogs.find((l) => l.date === selectedHistoryDate) || historyLogs[0];
  const filteredHistoryItems = (activeHistoryLog?.items || []).filter((item) => {
    if (filterLang !== 'all' && item.language !== filterLang) return false;
    return true;
  });

  // Filtered queue items
  const filteredQueueItems = nextQueue.filter((item) => {
    if (filterLang !== 'all' && item.language !== filterLang) return false;
    return true;
  });

  // Add item to Today's log
  const handleAddTodayItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const currentTime = new Date().toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newItem: BacktrackItem = {
      id: `today-${Date.now()}`,
      type: newType,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || undefined,
      language: newLang,
      studiedAt: todayDateStr,
      timeString: currentTime,
      category: newCategory.trim() || 'General',
      mastered: true,
      notes: newNotes.trim() || undefined,
    };

    const updatedLogs = logs.map((l) => {
      if (l.date === todayDateStr) {
        return {
          ...l,
          items: [newItem, ...l.items],
          minutesSpent: l.minutesSpent + 5,
          xpEarned: l.xpEarned + 10,
        };
      }
      return l;
    });

    // If today log didn't exist in array yet, add it
    if (!logs.some((l) => l.date === todayDateStr)) {
      updatedLogs.unshift({
        date: todayDateStr,
        formattedDateBn: 'আজকের পড়ার রেকর্ড (Today)',
        minutesSpent: 10,
        xpEarned: 15,
        items: [newItem],
      });
    }

    setLogs(updatedLogs);
    saveStoredStudyLogs(updatedLogs);
    onAwardXP?.(10);
    showToast(`"${newItem.title}" আজকের পড়ার রেকর্ডে যুক্ত হয়েছে (+10 XP)`);

    // Reset form
    setNewTitle('');
    setNewSubtitle('');
    setNewNotes('');
    setAddTodayOpen(false);
  };

  // Add item to Next Queue
  const handleAddQueueItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queueTitle.trim()) return;

    const newItem: NextStudyQueueItem = {
      id: `queue-${Date.now()}`,
      type: queueType,
      title: queueTitle.trim(),
      subtitle: queueSubtitle.trim() || undefined,
      targetDate: getTomorrowDateStr(),
      priority: queuePriority,
      category: 'Planned Target',
      language: newLang,
      notes: queueNotes.trim() || undefined,
      addedAt: todayDateStr,
    };

    const updatedQueue = [newItem, ...nextQueue];
    setNextQueue(updatedQueue);
    saveStoredNextQueue(updatedQueue);
    showToast(`"${newItem.title}" আগামীকালের পড়ার কিউতে সংরক্ষিত হয়েছে`);

    setQueueTitle('');
    setQueueSubtitle('');
    setQueueNotes('');
    setAddQueueOpen(false);
  };

  // Move an item from Next Queue into Today's Studied
  const handleMoveQueueToToday = (queueItem: NextStudyQueueItem) => {
    // 1. Remove from queue
    const updatedQueue = nextQueue.filter((q) => q.id !== queueItem.id);
    setNextQueue(updatedQueue);
    saveStoredNextQueue(updatedQueue);

    // 2. Add to today's log
    const currentTime = new Date().toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newItem: BacktrackItem = {
      id: `from-queue-${Date.now()}`,
      type: queueItem.type,
      title: queueItem.title,
      subtitle: queueItem.subtitle,
      language: queueItem.language || 'english',
      studiedAt: todayDateStr,
      timeString: currentTime,
      category: queueItem.category || 'From Queue',
      mastered: true,
      notes: queueItem.notes,
    };

    const updatedLogs = logs.map((l) => {
      if (l.date === todayDateStr) {
        return {
          ...l,
          items: [newItem, ...l.items],
          minutesSpent: l.minutesSpent + 5,
          xpEarned: l.xpEarned + 10,
        };
      }
      return l;
    });

    if (!logs.some((l) => l.date === todayDateStr)) {
      updatedLogs.unshift({
        date: todayDateStr,
        formattedDateBn: 'আজকের পড়ার রেকর্ড (Today)',
        minutesSpent: 10,
        xpEarned: 15,
        items: [newItem],
      });
    }

    setLogs(updatedLogs);
    saveStoredStudyLogs(updatedLogs);
    onAwardXP?.(10);
    showToast(`চমৎকার! "${queueItem.title}" পড়া সম্পন্ন হয়েছে এবং আজকের রেকর্ডে যোগ হয়েছে (+10 XP)`);
  };

  // Delete an item from queue
  const handleDeleteQueueItem = (id: string) => {
    const updated = nextQueue.filter((q) => q.id !== id);
    setNextQueue(updated);
    saveStoredNextQueue(updated);
    showToast('আইটেমটি কিউ থেকে মুছে ফেলা হয়েছে');
  };

  // Toggle mastered status for today
  const handleToggleMastered = (itemId: string) => {
    const updatedLogs = logs.map((l) => {
      if (l.date === todayDateStr) {
        return {
          ...l,
          items: l.items.map((it) => (it.id === itemId ? { ...it, mastered: !it.mastered } : it)),
        };
      }
      return l;
    });
    setLogs(updatedLogs);
    saveStoredStudyLogs(updatedLogs);
  };

  // Save updated next day target
  const handleSaveTarget = () => {
    setNextTarget(tempTarget);
    saveStoredNextDayTarget(tempTarget);
    setTargetEditOpen(false);
    showToast('আগামীকালের পড়ার লক্ষ্যমাত্রা সফলভাবে হালনাগাদ হয়েছে!');
  };

  // Check if a word or phrase has been studied in past records
  const handleVerifyWord = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!verifierQuery.trim()) return;

    const res = findStudiedItemRecord(verifierQuery);
    setVerifierResult({
      searched: true,
      found: res.found,
      title: verifierQuery.trim(),
      date: res.date,
      formattedDateBn: res.formattedDateBn,
    });
  };

  // Smart Auto-Queue Generator: Adds fresh unread vocabulary and professional sentences to tomorrow's queue
  const handleSmartAutoQueue = () => {
    const allStudiedTitles = new Set<string>();
    logs.forEach((log) => {
      log.items.forEach((it) => allStudiedTitles.add(it.title.trim().toLowerCase()));
    });
    nextQueue.forEach((q) => allStudiedTitles.add(q.title.trim().toLowerCase()));

    // 1. Pick 3 fresh words from vocabulary list
    const candidateWords = COMPREHENSIVE_VOCABULARY_LIST.filter(
      (v) => !allStudiedTitles.has(v.word.trim().toLowerCase())
    );
    const selectedWords = candidateWords.slice(0, 3);

    // 2. Pick 2 fresh professional sentences
    const candidateSentences = PROFESSIONAL_SENTENCES.filter(
      (s) => !allStudiedTitles.has(s.english.trim().toLowerCase())
    );
    const selectedSentences = candidateSentences.slice(0, 2);

    const newItems: NextStudyQueueItem[] = [];

    selectedWords.forEach((w, idx) => {
      newItems.push({
        id: `auto-word-${Date.now()}-${idx}`,
        type: 'word',
        title: w.word,
        subtitle: `${w.ipa ? w.ipa + ' • ' : ''}${w.banglaMeaning} (${w.category || 'High-Frequency'})`,
        targetDate: getTomorrowDateStr(),
        priority: idx === 0 ? 'high' : 'normal',
        category: w.category || 'Vocabulary',
        language: 'english',
        notes: w.example ? `Example: ${w.example}` : 'আগামীকাল নতুন শব্দ হিসেবে আয়ত্ত করা হবে',
        addedAt: todayDateStr,
      });
    });

    selectedSentences.forEach((s, idx) => {
      newItems.push({
        id: `auto-sent-${Date.now()}-${idx}`,
        type: 'sentence',
        title: s.english,
        subtitle: `${s.bangla} • ${s.category || 'Corporate'}`,
        targetDate: getTomorrowDateStr(),
        priority: 'high',
        category: s.category || 'Professional Sentences',
        language: 'english',
        notes: s.grammarExplanationBangla || 'কাজের ক্ষেত্রে সরাসরি ব্যবহারোপযোগী বাক্য',
        addedAt: todayDateStr,
      });
    });

    if (newItems.length === 0) {
      showToast('সব শব্দ ও বাক্য ইতোমধ্যে আপনার তালিকায় রয়েছে!');
      return;
    }

    const updatedQueue = [...newItems, ...nextQueue];
    setNextQueue(updatedQueue);
    saveStoredNextQueue(updatedQueue);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {}

    onAwardXP?.(15);
    showToast(`স্বয়ংক্রিয়ভাবে ${newItems.length}টি নতুন প্রফেশনাল শব্দ ও বাক্য আগামীকালের কিউতে যোগ করা হয়েছে! (+15 XP)`);
  };

  return (
    <div id="study-backtrack-section" className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xl dark:bg-emerald-600 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/60 p-6 sm:p-8 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-3 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              <History className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Smart Backtrack & Next-Day Study Queue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>পড়ার ব্যাকট্র্যাক ও পরবর্তী স্টাডি কিউ</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
              আজকে আপনি কতটুকু পড়েছেন তার নির্ভুল রেকর্ড রাখুন, গতকালের পড়া মিলিয়ে দেখুন এবং পরবর্তীতে কী পড়বেন তা আগে থেকেই গুছিয়ে রাখুন—যাতে কোনো পুনরাবৃত্তি না হয়।
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSmartAutoQueue}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
              title="নতুন ৩টি শব্দ ও ২টি বাক্য স্বয়ংক্রিয়ভাবে আগামীকালের কিউতে যোগ করুন"
            >
              <Sparkles className="h-4 w-4" />
              <span>স্মার্ট নতুন কিউ সাজান</span>
            </button>
            <button
              onClick={() => setAddTodayOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>আজ যা পড়েছি যোগ করুন</span>
            </button>
            <button
              onClick={() => setAddQueueOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs shadow-2xs transition-all cursor-pointer"
            >
              <ListTodo className="h-4 w-4 text-indigo-500" />
              <span>কালকের কিউতে যোগ করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Today Studied */}
        <div
          onClick={() => setActiveSubTab('today')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${
            activeSubTab === 'today'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
              : 'border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#1E293B]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">আজকের পড়া</span>
              <span className="text-lg font-black text-slate-900 dark:text-white block truncate">
                {todayLog.items.length}টি সম্পন্ন ({todayLog.minutesSpent}m)
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Yesterday Record */}
        <div
          onClick={() => {
            setActiveSubTab('history');
            setSelectedHistoryDate(getYesterdayDateStr());
          }}
          className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${
            activeSubTab === 'history' && selectedHistoryDate === getYesterdayDateStr()
              ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
              : 'border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#1E293B]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">গতকালকের পড়া</span>
              <span className="text-lg font-black text-slate-900 dark:text-white block truncate">
                {historyLogs[0]?.items.length || 0}টি শব্দ ও বাক্য
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Upcoming Queue */}
        <div
          onClick={() => setActiveSubTab('queue')}
          className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs ${
            activeSubTab === 'queue'
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
              : 'border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#1E293B]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <ListTodo className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">পরবর্তী স্টাডি কিউ</span>
              <span className="text-lg font-black text-slate-900 dark:text-white block truncate">
                {nextQueue.length}টি প্রস্তুত
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Tomorrow's Goal Target */}
        <div
          onClick={() => {
            setActiveSubTab('queue');
            setTargetEditOpen(true);
          }}
          className="cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-400 dark:border-slate-800 dark:bg-[#1E293B]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              <Target className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">কালকের লক্ষ্যমাত্রা</span>
              <span className="text-lg font-black text-slate-900 dark:text-white block truncate">
                {nextTarget.wordsCount} শব্দ • {nextTarget.studyMinutes}মিনিট
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Word & Sentence Verifier: Check if a word was studied yesterday or previously */}
      <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>শব্দ যাচাইকারী (Word & Topic Verifier)</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              কোনো শব্দ পূর্বে পড়েছেন কিনা জানতে এখানে লিখুন—যাতে পুনরাবৃত্তি না হয়ে প্রতিদিন সম্পূর্ণ নতুন শব্দ শিখতে পারেন।
            </p>
          </div>

          <form onSubmit={handleVerifyWord} className="flex items-center gap-2 max-w-md w-full sm:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                value={verifierQuery}
                onChange={(e) => {
                  setVerifierQuery(e.target.value);
                  if (verifierResult) setVerifierResult(null);
                }}
                placeholder="যেমন: Consistent, Impeccable..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              যাচাই করুন
            </button>
          </form>
        </div>

        {/* Verification Result Feedback */}
        {verifierResult && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
            {verifierResult.found ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="font-bold text-amber-900 dark:text-amber-200">
                    "{verifierResult.title}" শব্দটি আপনার ব্যাকট্র্যাক রেকর্ডে রয়েছে!
                  </span>
                  <span className="text-amber-700 dark:text-amber-300">
                    (পড়া হয়েছিল: {verifierResult.formattedDateBn || verifierResult.date})
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  পরামর্শ: আজকে নতুন শব্দ পড়ুন
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-emerald-900 dark:text-emerald-200">
                    "{verifierResult.title}" এখনো পড়া হয়নি—এটি সম্পূর্ণ নতুন শব্দ!
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newItem: NextStudyQueueItem = {
                      id: `queue-${Date.now()}`,
                      type: 'word',
                      title: verifierResult.title || verifierQuery,
                      subtitle: 'নতুন যাচাইকৃত শব্দ',
                      targetDate: getTomorrowDateStr(),
                      priority: 'high',
                      category: 'Verified Fresh Word',
                      language: 'english',
                      notes: 'যাচাই করে কালকের কিউতে যুক্ত করা হয়েছে',
                      addedAt: todayDateStr,
                    };
                    const updated = [newItem, ...nextQueue];
                    setNextQueue(updated);
                    saveStoredNextQueue(updated);
                    showToast(`"${newItem.title}" আগামীকালের কিউতে যোগ হয়েছে!`);
                    setVerifierResult(null);
                    setVerifierQuery('');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  + কালকের কিউতে যোগ করুন
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs & Language Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
        {/* 4 Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'matrix'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>কালকে vs আজ vs কালকের কিউ</span>
          </button>

          <button
            onClick={() => setActiveSubTab('today')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'today'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>আজকের ব্যাকট্র্যাক ({todayLog.items.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'history'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>অতীতের রেকর্ড ({historyLogs.reduce((acc, curr) => acc + curr.items.length, 0)})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('queue')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'queue'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ListTodo className="h-4 w-4" />
            <span>পরবর্তী স্টাডি কিউ ({nextQueue.length})</span>
          </button>
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[11px] font-bold text-slate-400 pl-1">ভাষা:</span>
          {[
            { id: 'all', label: 'সকল' },
            { id: 'english', label: '🇬🇧 ইংরেজি' },
            { id: 'arabic', label: '🇸🇦 আরবি' },
            { id: 'japanese', label: '🇯🇵 জাপানি' },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setFilterLang(l.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                filterLang === l.id
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: YESTERDAY VS TODAY VS TOMORROW COMPARISON MATRIX */}
      {/* ========================================================================= */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Informational Assurance Banner */}
          <div className="rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-50/90 via-indigo-50/50 to-white p-5 sm:p-6 dark:border-purple-900/60 dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-0.5 text-[11px] font-bold text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  <ArrowLeftRight className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>দৈনিক ব্যাকট্র্যাক ও তুলনামূলক স্টাডি বোর্ড</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  কালকে কী পড়েছেন vs আজকে কী পড়বেন vs পরবর্তীতে কী পড়তে চান
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                  এই ব্যাকট্র্যাক বোর্ড নিশ্চিত করে যে গতকাল যে শব্দগুলো পড়েছেন তা রেকর্ড হিসেবে সংরক্ষিত আছে, সুতরাং আজকে আপনি পুনরাবৃত্তি ছাড়াই সম্পূর্ণ নতুন শব্দ ও প্রফেশনাল বাক্য শিখবেন।
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleSmartAutoQueue}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>স্মার্ট নতুন কিউ সাজান</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3-Column Comparative Board */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            {/* COLUMN 1: YESTERDAY'S STUDIED RECORD */}
            <div className="rounded-2xl border border-amber-200/90 bg-amber-50/20 dark:border-amber-900/40 dark:bg-slate-900/80 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-amber-900/40">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      কালকে যা পড়েছেন
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      গতকালকের রেকর্ড ({historyLogs[0]?.items.length || 0}টি)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  আগে পড়া শব্দ
                </span>
              </div>

              {/* Items list */}
              <div className="space-y-2.5">
                {(historyLogs[0]?.items || []).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">
                        ✓ কালকে সম্পন্ন
                      </span>
                      <span className="text-slate-400 font-mono">{item.timeString || 'গতকাল'}</span>
                    </div>

                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </span>
                      <button
                        onClick={() => handlePlayVoice(item.title, item.language)}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600 shrink-0"
                        title="উচ্চারণ শুনুন"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {item.subtitle && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-lg">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                ))}

                {(historyLogs[0]?.items || []).length === 0 && (
                  <p className="text-xs text-slate-400 italic text-center py-4">
                    গতকালের কোনো রেকর্ড পাওয়া যায়নি
                  </p>
                )}
              </div>
            </div>

            {/* COLUMN 2: TODAY'S STUDIED RECORD */}
            <div className="rounded-2xl border border-indigo-200/90 bg-indigo-50/20 dark:border-indigo-900/40 dark:bg-slate-900/80 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-200/60 dark:border-indigo-900/40">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      আজকে যা পড়েছেন
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      আজকের নতুন পড়া ({todayLog.items.length}টি)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAddTodayOpen(true)}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  + যোগ করুন
                </button>
              </div>

              {/* Items list */}
              <div className="space-y-2.5">
                {todayLog.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded">
                        ★ আজকের নতুন পড়া
                      </span>
                      <span className="text-slate-400 font-mono">{item.timeString || 'আজ'}</span>
                    </div>

                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </span>
                      <button
                        onClick={() => handlePlayVoice(item.title, item.language)}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600 shrink-0"
                        title="উচ্চারণ শুনুন"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {item.subtitle && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-lg">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                ))}

                {todayLog.items.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-400 mb-2">আজকের তালিকায় কোনো শব্দ যুক্ত করা হয়নি</p>
                    <button
                      onClick={() => setAddTodayOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold"
                    >
                      + নতুন পড়া যুক্ত করুন
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* COLUMN 3: TOMORROW'S QUEUE */}
            <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-slate-900/80 p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <ListTodo className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      পরবর্তীতে যা পড়বেন
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      আগামীকালের কিউ ({nextQueue.length}টি)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAddQueueOpen(true)}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  + কিউতে যোগ
                </button>
              </div>

              {/* Items list */}
              <div className="space-y-2.5">
                {nextQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span
                        className={`font-bold px-1.5 py-0.2 rounded ${
                          item.priority === 'high'
                            ? 'text-rose-700 bg-rose-50 dark:bg-rose-950/60'
                            : 'text-slate-600 bg-slate-100 dark:bg-slate-700'
                        }`}
                      >
                        {item.priority === 'high' ? '🔥 High' : 'Normal'} • {item.type}
                      </span>
                      <button
                        onClick={() => handleDeleteQueueItem(item.id)}
                        className="text-slate-400 hover:text-rose-500"
                        title="কিউ থেকে মুছুন"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </span>
                      <button
                        onClick={() => handlePlayVoice(item.title, item.language)}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600 shrink-0"
                        title="উচ্চারণ শুনুন"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {item.subtitle && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-1.5 rounded-lg">
                        {item.subtitle}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                      <button
                        onClick={() => handleMoveQueueToToday(item)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:text-emerald-300 text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <Check className="h-3 w-3 stroke-[2.5]" />
                        <span>আজকে পড়া হয়েছে</span>
                      </button>
                    </div>
                  </div>
                ))}

                {nextQueue.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-xs text-slate-400 mb-2">আগামীকালের কিউ বর্তমানে খালি</p>
                    <button
                      onClick={handleSmartAutoQueue}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-xs font-bold"
                    >
                      ✨ স্মার্ট কিউ সাজান
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: TODAY'S STUDIED BACKTRACK */}
      {/* ========================================================================= */}
      {activeSubTab === 'today' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>আজ আপনি যা যা পড়েছেন ({todayLog.items.length}টি আইটেম)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold border border-indigo-200/60 dark:border-indigo-800/60">
                  {todayLog.minutesSpent} মিনিট চর্চা • +{todayLog.xpEarned} XP
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                আজকের দিনের সম্পূর্ণ ব্যাকট্র্যাক। কোনো নতুন শব্দ বা বাক্য শিখলে তা এখানে সংরক্ষিত রয়েছে।
              </p>
            </div>

            <button
              onClick={() => setAddTodayOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>আইটেম যুক্ত করুন</span>
            </button>
          </div>

          {filteredTodayItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <BookOpen className="mx-auto h-10 w-10 text-slate-400 mb-2" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                আজকের তালিকায় এখনও কিছু যুক্ত করা হয়নি
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                উপরে "+ আজ যা পড়েছি যোগ করুন" বোতাম চাপুন অথবা নিচের কিউ থেকে পড়ার জন্য নির্বাচিত আইটেমগুলো সম্পন্ন করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredTodayItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-2xs transition-all hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Header tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="rounded-md bg-indigo-100/80 px-2 py-0.5 text-[10px] font-black text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                          {item.type}
                        </span>
                        {item.category && (
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {item.category}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3" />
                          {item.timeString || 'আজ'}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleMastered(item.id)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          item.mastered
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={item.mastered ? 'পড়া সম্পন্ন হয়েছে' : 'অসম্পূর্ণ'}
                      >
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      </button>
                    </div>

                    {/* Title & Meaning */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => handlePlayVoice(item.title, item.language)}
                          className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:text-indigo-300 shrink-0 transition-colors"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>

                      {item.subtitle && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-slate-500 italic bg-amber-50/60 dark:bg-amber-950/20 p-2 rounded-xl border border-amber-200/40 dark:border-amber-800/40">
                        নোট: {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PAST STUDY HISTORY & BACKTRACK (YESTERDAY, ETC.) */}
      {/* ========================================================================= */}
      {activeSubTab === 'history' && (
        <div className="space-y-4">
          {/* Day selection tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 pl-1">
              তারিখ নির্বাচন:
            </span>
            {historyLogs.map((h) => (
              <button
                key={h.date}
                onClick={() => setSelectedHistoryDate(h.date)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedHistoryDate === h.date
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-slate-700'
                }`}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>{h.formattedDateBn}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/15 text-white">
                  {h.items.length}টি
                </span>
              </button>
            ))}
          </div>

          {/* Active Historical Day Card */}
          <div className="rounded-3xl border border-amber-200/80 bg-amber-50/40 dark:border-amber-900/50 dark:bg-amber-950/20 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
                  <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeHistoryLog?.formattedDateBn || 'অতীতের পড়ার রেকর্ড'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    তারিখ: {activeHistoryLog?.date} • মোট ব্যয়িত সময়: {activeHistoryLog?.minutesSpent} মিনিট • অর্জিত XP: +{activeHistoryLog?.xpEarned}
                  </p>
                </div>
              </div>

              <div className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/80 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                এই শব্দ ও বাক্যগুলো কালকে আয়ত্ত করা হয়েছিল
              </div>
            </div>
          </div>

          {/* List of items studied on that day */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredHistoryItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-amber-100/80 px-2 py-0.5 text-[10px] font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300 uppercase tracking-wider">
                      {item.type} • {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timeString}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => handlePlayVoice(item.title, item.language)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  {item.subtitle && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: NEXT STUDY QUEUE & TOMORROW'S PLAN */}
      {/* ========================================================================= */}
      {activeSubTab === 'queue' && (
        <div className="space-y-5">
          {/* Tomorrow's Target Banner with Edit Button */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/50 p-5 sm:p-6 dark:border-emerald-900/60 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <Target className="h-3 w-3 text-emerald-600" />
                  <span>আগামীকালের নির্ধারিত লক্ষ্য (Tomorrow's Study Target)</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  পরিকল্পনা: {nextTarget.wordsCount}টি নতুন শব্দ • {nextTarget.sentencesCount}টি বাক্য • {nextTarget.studyMinutes} মিনিট অনুশীলন
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  প্রধান ফোকাস টপিক: <span className="font-bold text-emerald-700 dark:text-emerald-300">{nextTarget.focusTopic}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setTempTarget(nextTarget);
                    setTargetEditOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 bg-white dark:bg-slate-800 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-2xs"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>লক্ষ্য পরিবর্তন করুন</span>
                </button>
                <button
                  onClick={() => setAddQueueOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>কিউতে নতুন যোগ করুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Queue List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>আগামীকাল পড়ার জন্য তালিকাভুক্ত আইটেমসমূহ ({filteredQueueItems.length}টি)</span>
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                পড়া সম্পন্ন হলে "আজকে পড়া হয়েছে" বোতামে ক্লিক করুন
              </span>
            </div>

            {filteredQueueItems.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <ListTodo className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  পরবর্তী পড়ার কিউ বর্তমানে খালি
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  উপরের "+ কিউতে নতুন যোগ করুন" চেপে কালকে যা পড়তে চান তা তালিকাভুক্ত করুন।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredQueueItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      {/* Priority tag & category */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              item.priority === 'high'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {item.priority === 'high' ? '🔥 High Priority' : 'Normal'}
                          </span>
                          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            {item.type}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteQueueItem(item.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
                          title="কিউ থেকে মুছুন"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Title & Meaning */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => handlePlayVoice(item.title, item.language)}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        {item.subtitle && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                            {item.subtitle}
                          </p>
                        )}
                        {item.notes && (
                          <p className="text-[11px] text-slate-500 italic mt-1.5">
                            পরিকল্পনা: {item.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Move to Studied CTA */}
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">নির্ধারিত: আগামীকাল</span>
                      <button
                        onClick={() => handleMoveQueueToToday(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:hover:bg-emerald-900 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer border border-emerald-200 dark:border-emerald-800"
                      >
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                        <span>আজকে পড়া হয়েছে</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD ITEM TO TODAY'S LOG */}
      {/* ========================================================================= */}
      {addTodayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  আজকের পড়ার রেকর্ডে যোগ করুন
                </h3>
                <p className="text-xs text-slate-500">
                  আজকে আপনি যে নতুন শব্দ বা বাক্য পড়েছেন তা লিখে রাখুন
                </p>
              </div>
              <button
                onClick={() => setAddTodayOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTodayItem} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  পড়া শব্দ বা বাক্য *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: Negotiate অথবা Could you walk us through..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  বাংলা অর্থ বা ব্যাখ্যা
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="যেমন: দরকষাকষি বা সমঝোতা করা"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ক্যাটাগরি বা ধরন
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="word">Word (শব্দ)</option>
                    <option value="sentence">Sentence (বাক্য)</option>
                    <option value="grammar">Grammar (ব্যাকরণ)</option>
                    <option value="reading">Reading/Shadowing (রিডিং)</option>
                    <option value="custom">Custom (অন্যান্য)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ভাষা
                  </label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="english">🇬🇧 English</option>
                    <option value="arabic">🇸🇦 Arabic</option>
                    <option value="japanese">🇯🇵 Japanese</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  ব্যক্তিগত নোট বা ব্যবহারের নিয়ম (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="যেমন: কালকে এই বাক্য দিয়ে টিম মিটিংয়ে কথা বলব"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddTodayOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  সংরক্ষণ করুন (+10 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD ITEM TO NEXT QUEUE */}
      {/* ========================================================================= */}
      {addQueueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  পরবর্তী পড়ার কিউতে যোগ করুন
                </h3>
                <p className="text-xs text-slate-500">
                  কালকে বা পরবর্তীতে আপনি কী পড়তে চান তা আগে থেকেই তালিকাভুক্ত করে রাখুন
                </p>
              </div>
              <button
                onClick={() => setAddQueueOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQueueItem} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  যা পড়তে চান *
                </label>
                <input
                  type="text"
                  required
                  value={queueTitle}
                  onChange={(e) => setQueueTitle(e.target.value)}
                  placeholder="যেমন: Benchmark, অথবা অধ্যায় ৫২ প্রেজেন্টেশন স্লাইড"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  বাংলা অর্থ বা শেখার উদ্দেশ্য
                </label>
                <input
                  type="text"
                  value={queueSubtitle}
                  onChange={(e) => setQueueSubtitle(e.target.value)}
                  placeholder="যেমন: আদর্শ মানদণ্ড বা সর্বোচ্চ মান"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    অগ্রাধিকার (Priority)
                  </label>
                  <select
                    value={queuePriority}
                    onChange={(e) => setQueuePriority(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="high">🔥 High Priority (জরুরি)</option>
                    <option value="normal">Normal Priority (সাধারণ)</option>
                    <option value="low">Low Priority (অবসর সময়ে)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    আইটেমের ধরন
                  </label>
                  <select
                    value={queueType}
                    onChange={(e) => setQueueType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="word">Word (নতুন শব্দ)</option>
                    <option value="sentence">Sentence (বাক্য)</option>
                    <option value="grammar">Grammar (ব্যাকরণ)</option>
                    <option value="reading">Reading (বই বা ডায়লগ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  কেন পড়তে চান বা বিশেষ নোট
                </label>
                <textarea
                  rows={2}
                  value={queueNotes}
                  onChange={(e) => setQueueNotes(e.target.value)}
                  placeholder="যেমন: কাল সকালে অফিস মিটিংয়ের আগে ১৫ মিনিট রিভিশন দেব"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddQueueOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  কিউতে যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: EDIT NEXT DAY TARGET */}
      {/* ========================================================================= */}
      {targetEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  আগামীকালের লক্ষ্য নির্ধারণ
                </h3>
                <p className="text-xs text-slate-500">
                  কালকে আপনি কতটুকু পড়তে চান তা আগেই ঠিক করে রাখুন
                </p>
              </div>
              <button
                onClick={() => setTargetEditOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  নতুন শব্দ লক্ষ্যমাত্রা
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={tempTarget.wordsCount}
                  onChange={(e) => setTempTarget({ ...tempTarget, wordsCount: Number(e.target.value) || 10 })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  বাক্য চর্চা লক্ষ্যমাত্রা
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={tempTarget.sentencesCount}
                  onChange={(e) => setTempTarget({ ...tempTarget, sentencesCount: Number(e.target.value) || 5 })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  অনুশীলন সময় (মিনিট)
                </label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={tempTarget.studyMinutes}
                  onChange={(e) => setTempTarget({ ...tempTarget, studyMinutes: Number(e.target.value) || 20 })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  প্রধান ফোকাস টপিক
                </label>
                <input
                  type="text"
                  value={tempTarget.focusTopic}
                  onChange={(e) => setTempTarget({ ...tempTarget, focusTopic: e.target.value })}
                  placeholder="যেমন: Business Meetings, Email Writing"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTargetEditOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={handleSaveTarget}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  লক্ষ্য সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
