import { VocabularyItem } from '../types';

export interface WordLearningRecord {
  wordId: string;
  lastReadDate: string; // YYYY-MM-DD
  readCount: number;
  status: 'unread' | 'read_today' | 'mastered' | 'review_needed';
  firstReadDate: string;
}

export interface DailyVocabState {
  simulatedDateOffset: number; // 0 = actual today, 1 = tomorrow (+1 day), etc.
  dailyWordGoal: number; // 3, 5, 8, or 10 words per day
  records: Record<string, WordLearningRecord>;
}

const STORAGE_KEY = 'boli_vocab_daily_engine_v2';

export function getEffectiveDateString(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export function formatDateBangla(dateStr: string, isToday: boolean = false): string {
  if (isToday) return 'আজ (Today)';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[0];
      const banglaMonths = [
        'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
        'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
      ];
      return `${day} ${banglaMonths[monthIdx] || ''}, ${year}`;
    }
  } catch {}
  return dateStr;
}

export function getStoredDailyVocabState(): DailyVocabState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.records === 'object') {
        return {
          simulatedDateOffset: parsed.simulatedDateOffset || 0,
          dailyWordGoal: parsed.dailyWordGoal || 5,
          records: parsed.records || {},
        };
      }
    }
  } catch {}

  return {
    simulatedDateOffset: 0,
    dailyWordGoal: 5,
    records: {},
  };
}

export function saveStoredDailyVocabState(state: DailyVocabState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export interface DailyBatchesResult {
  effectiveDate: string;
  isSimulated: boolean;
  todayBatch: VocabularyItem[]; // Words to read today
  readTodayList: VocabularyItem[]; // Words successfully read today
  nextDayPreviewBatch: VocabularyItem[]; // Words that will appear tomorrow
  reviewBatch: VocabularyItem[]; // Words read on previous days needing review
  masteredList: VocabularyItem[];
  unreadCount: number;
  totalWords: number;
  readTodayCount: number;
  dailyGoal: number;
  progressPercent: number;
  isTodayGoalComplete: boolean;
}

export function calculateDailyBatches(
  allVocab: VocabularyItem[],
  state: DailyVocabState
): DailyBatchesResult {
  const effectiveDate = getEffectiveDateString(state.simulatedDateOffset);
  const goal = state.dailyWordGoal || 5;

  // 1. Identify words read on effectiveDate
  const readTodayIds = new Set<string>();
  const masteredIds = new Set<string>();
  const previousReadIds = new Set<string>();

  Object.values(state.records).forEach((rec) => {
    if (rec.status === 'mastered') {
      masteredIds.add(rec.wordId);
    }
    if (rec.lastReadDate === effectiveDate) {
      readTodayIds.add(rec.wordId);
    } else if (rec.lastReadDate && rec.lastReadDate < effectiveDate) {
      previousReadIds.add(rec.wordId);
    }
  });

  const readTodayList = allVocab.filter((w) => readTodayIds.has(w.id));
  const masteredList = allVocab.filter((w) => masteredIds.has(w.id));

  // 2. Build today's batch:
  // First include words that were already marked read today.
  const todayBatch: VocabularyItem[] = [...readTodayList];

  // If fewer than goal, pick next unread words from allVocab (excluding already read today or mastered or previous days)
  const remainingNeeded = goal - todayBatch.length;
  if (remainingNeeded > 0) {
    const unreadAvailable = allVocab.filter(
      (w) => !readTodayIds.has(w.id) && !masteredIds.has(w.id) && !previousReadIds.has(w.id)
    );

    const freshPicks = unreadAvailable.slice(0, remainingNeeded);
    todayBatch.push(...freshPicks);

    // If still needed (e.g. user finished whole dictionary once), pick from previous read that aren't read today
    if (todayBatch.length < goal) {
      const additional = allVocab.filter(
        (w) =>
          !readTodayIds.has(w.id) &&
          !masteredIds.has(w.id) &&
          !todayBatch.some((t) => t.id === w.id)
      );
      todayBatch.push(...additional.slice(0, goal - todayBatch.length));
    }
  }

  // 3. Build Tomorrow's Preview Batch:
  // Tomorrow, all words in `todayBatch` will be in the past.
  // So tomorrow's batch will be the subsequent unread words!
  const todayBatchIds = new Set(todayBatch.map((w) => w.id));
  const candidateNextDay = allVocab.filter(
    (w) =>
      !todayBatchIds.has(w.id) &&
      !readTodayIds.has(w.id) &&
      !masteredIds.has(w.id) &&
      !previousReadIds.has(w.id)
  );

  let nextDayPreviewBatch = candidateNextDay.slice(0, goal);
  if (nextDayPreviewBatch.length < goal) {
    const backup = allVocab.filter(
      (w) => !todayBatchIds.has(w.id) && !nextDayPreviewBatch.some((n) => n.id === w.id)
    );
    nextDayPreviewBatch.push(...backup.slice(0, goal - nextDayPreviewBatch.length));
  }

  // 4. Review Batch: words read on previous days, not yet mastered
  const reviewBatch = allVocab.filter(
    (w) => previousReadIds.has(w.id) && !masteredIds.has(w.id) && !readTodayIds.has(w.id)
  );

  // Stats
  const readTodayCount = readTodayList.length;
  const progressPercent = Math.min(100, Math.round((readTodayCount / goal) * 100));
  const isTodayGoalComplete = readTodayCount >= goal;
  const unreadCount = allVocab.filter(
    (w) => !state.records[w.id] || !state.records[w.id].lastReadDate
  ).length;

  return {
    effectiveDate,
    isSimulated: state.simulatedDateOffset > 0,
    todayBatch,
    readTodayList,
    nextDayPreviewBatch,
    reviewBatch,
    masteredList,
    unreadCount,
    totalWords: allVocab.length,
    readTodayCount,
    dailyGoal: goal,
    progressPercent,
    isTodayGoalComplete,
  };
}
