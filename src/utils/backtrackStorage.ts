import { BacktrackItem, NextStudyQueueItem, DailyStudyLog } from '../types';

const STORAGE_KEYS = {
  BACKTRACK_LOGS: 'boli_backtrack_logs_v1',
  NEXT_QUEUE: 'boli_next_queue_v1',
  NEXT_TARGETS: 'boli_next_targets_v1',
};

// Helper to format date strings YYYY-MM-DD
export function getTodayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getYesterdayDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getDayBeforeDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 2);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getTomorrowDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export interface NextDayTarget {
  wordsCount: number;
  sentencesCount: number;
  studyMinutes: number;
  focusTopic: string;
}

export const DEFAULT_NEXT_DAY_TARGET: NextDayTarget = {
  wordsCount: 10,
  sentencesCount: 5,
  studyMinutes: 20,
  focusTopic: 'Business Meetings & Client Emails',
};

// Seed initial backtrack logs for rich immediate experience
export const INITIAL_STUDY_LOGS: DailyStudyLog[] = [
  {
    date: getTodayDateStr(),
    formattedDateBn: 'আজকের পড়ার রেকর্ড (Today)',
    minutesSpent: 18,
    xpEarned: 45,
    items: [
      {
        id: 'today-1',
        type: 'word',
        title: 'Consistent',
        subtitle: '/kənˈsɪstənt/ • ধারাবাহিক / অবিচল (Spoken Word)',
        language: 'english',
        studiedAt: getTodayDateStr(),
        timeString: '১০:১৫ AM',
        category: 'Vocabulary',
        mastered: true,
        notes: 'প্রতিদিনের অভ্যাসের ক্ষেত্রে বহুল ব্যবহৃত শব্দ',
      },
      {
        id: 'today-2',
        type: 'sentence',
        title: 'Could you please walk us through the primary deliverables outlined in the Q3 roadmap?',
        subtitle: 'আপনি কি তৃতীয় প্রান্তিকের মূল ডেলিভারেবলগুলো আমাদের বুঝিয়ে বলবেন?',
        language: 'english',
        studiedAt: getTodayDateStr(),
        timeString: '১০:২৫ AM',
        category: 'Meetings & Strategy',
        mastered: true,
        notes: 'করপোরেট মিটিংয়ে প্রেজেন্টেশন চাওয়ার মার্জিত ভাষা',
      },
      {
        id: 'today-3',
        type: 'word',
        title: 'Streamline',
        subtitle: '/ˈstriːm.laɪn/ • সহজতর ও গতিশীল করা (Business Verb)',
        language: 'english',
        studiedAt: getTodayDateStr(),
        timeString: '১১:০০ AM',
        category: 'Vocabulary',
        mastered: false,
        notes: 'Internal workflow streamline করার ক্ষেত্রে প্রযোজ্য',
      },
      {
        id: 'today-4',
        type: 'grammar',
        title: 'Simple Present in Workplace Operations',
        subtitle: 'Subject + Verb(s/es) + Workplace Deliverable (SOP ও নিয়মিত দায়িত্ব)',
        language: 'english',
        studiedAt: getTodayDateStr(),
        timeString: '১১:১০ AM',
        category: 'Sentence Structure',
        mastered: true,
        notes: 'Our team delivers scalable solutions',
      },
    ],
  },
  {
    date: getYesterdayDateStr(),
    formattedDateBn: 'গতকালকের পড়ার রেকর্ড (Yesterday)',
    minutesSpent: 25,
    xpEarned: 60,
    items: [
      {
        id: 'yest-1',
        type: 'word',
        title: 'Impeccable',
        subtitle: '/ɪmˈpek.ə.bəl/ • নিখুঁত, ত্রুটিহীন, অনবদ্য',
        language: 'english',
        studiedAt: getYesterdayDateStr(),
        timeString: '০৯:৪৫ AM',
        category: 'Smart Book (Page 1)',
        mastered: true,
        notes: 'Pronunciation and vocabulary are impeccable',
      },
      {
        id: 'yest-2',
        type: 'word',
        title: 'Enigmatic',
        subtitle: '/ˌen.ɪɡˈmæt̬.ɪk/ • রহস্যময়, দুর্বোধ্য বা গভীর',
        language: 'english',
        studiedAt: getYesterdayDateStr(),
        timeString: '১০:০৫ AM',
        category: 'Smart Book (Page 1)',
        mastered: true,
      },
      {
        id: 'yest-3',
        type: 'sentence',
        title: 'Our engineering team has successfully resolved the critical bottleneck ahead of schedule.',
        subtitle: 'আমাদের প্রকৌশল দল নির্ধারিত সময়ের পূর্বেই জটিল কারিগরি সমস্যা সমাধান করেছে।',
        language: 'english',
        studiedAt: getYesterdayDateStr(),
        timeString: '০৩:১৫ PM',
        category: 'Project & Workflow',
        mastered: true,
      },
      {
        id: 'yest-4',
        type: 'word',
        title: 'شُكْرًا جَزِيلًا (Shukran Jazeelan)',
        subtitle: 'আপনাকে অনেক ধন্যবাদ (Thank you very much)',
        language: 'arabic',
        studiedAt: getYesterdayDateStr(),
        timeString: '০৮:২০ PM',
        category: 'Arabic Daily Dialogue',
        mastered: true,
      },
      {
        id: 'yest-5',
        type: 'sentence',
        title: 'おはようございます (Ohayou Gozaimasu)',
        subtitle: 'শুভ সকাল (Good Morning - Formal)',
        language: 'japanese',
        studiedAt: getYesterdayDateStr(),
        timeString: '০৮:৩৫ PM',
        category: 'Japanese Daily Greeting',
        mastered: true,
      },
    ],
  },
  {
    date: getDayBeforeDateStr(),
    formattedDateBn: 'গত পরশুর পড়ার রেকর্ড (2 Days Ago)',
    minutesSpent: 20,
    xpEarned: 50,
    items: [
      {
        id: 'prev-1',
        type: 'word',
        title: 'Sublime',
        subtitle: '/səˈblaɪm/ • পরম ও মহিমান্বিত বিস্ময়',
        language: 'english',
        studiedAt: getDayBeforeDateStr(),
        timeString: '১০:০০ AM',
        category: 'Smart Book (Page 1)',
        mastered: true,
      },
      {
        id: 'prev-2',
        type: 'sentence',
        title: 'Please find the attached revised proposal reflecting your feedback.',
        subtitle: 'আপনার ফিডব্যাকের আলোকে সংশোধিত প্রস্তাবনাটি সংযুক্তিতে পাবেন।',
        language: 'english',
        studiedAt: getDayBeforeDateStr(),
        timeString: '০২:৪০ PM',
        category: 'Email & Client Relations',
        mastered: true,
      },
      {
        id: 'prev-3',
        type: 'word',
        title: 'Deliverables',
        subtitle: 'প্রজেক্টের মূল অর্জন বা হস্তান্তরযোগ্য কাজ',
        language: 'english',
        studiedAt: getDayBeforeDateStr(),
        timeString: '০৩:০০ PM',
        category: 'Workplace Vocabulary',
        mastered: true,
      },
    ],
  },
];

// Seed initial upcoming next queue
export const INITIAL_NEXT_QUEUE: NextStudyQueueItem[] = [
  {
    id: 'next-1',
    type: 'word',
    title: 'Negotiation',
    subtitle: '/nəˌɡoʊ.ʃiˈeɪ.ʃən/ • সমঝোতা বা দরকষাকষি',
    targetDate: getTomorrowDateStr(),
    priority: 'high',
    category: 'Deals & Contracts',
    language: 'english',
    notes: 'ব্যবসায়িক ডিল ও পার্টনারশিপ মিটিংয়ে ব্যবহার করব',
    addedAt: getTodayDateStr(),
  },
  {
    id: 'next-2',
    type: 'sentence',
    title: 'While we understand your budgetary constraints, we cannot compromise on our benchmark quality standards.',
    subtitle: 'বাজেট সীমাবদ্ধতা বুঝলেও গুণগত মানের সাথে আপস করব না (কূটনৈতিক বাক্য)',
    targetDate: getTomorrowDateStr(),
    priority: 'high',
    category: 'Negotiation & Decisions',
    language: 'english',
    notes: 'ক্লায়েন্টের দাম কমানোর অন্যায্য চাপে সম্মান বজায় রেখে বলার নিয়ম',
    addedAt: getTodayDateStr(),
  },
  {
    id: 'next-3',
    type: 'word',
    title: 'Benchmark',
    subtitle: '/ˈbentʃ.mɑːrk/ • আদর্শ মানদণ্ড বা সর্বোচ্চ মান',
    targetDate: getTomorrowDateStr(),
    priority: 'normal',
    category: 'Vocabulary',
    language: 'english',
    notes: 'Quality benchmark বজায় রাখা',
    addedAt: getTodayDateStr(),
  },
  {
    id: 'next-4',
    type: 'sentence',
    title: 'An automated fail-safe rollback protocol has been triggered to maintain absolute data integrity.',
    subtitle: 'তথ্যের শতভাগ নিরাপত্তা বজায় রাখতে সেফটি রোলব্যাক কার্যকর করা হয়েছে।',
    targetDate: getTomorrowDateStr(),
    priority: 'normal',
    category: 'Tech & Quality',
    language: 'english',
    notes: 'DevOps ও সিস্টেম ম্যানেজমেন্টে প্রয়োজনীয় বাক্য',
    addedAt: getTodayDateStr(),
  },
  {
    id: 'next-5',
    type: 'reading',
    title: 'অধ্যায় ৫১: সকালের টিম স্ট্যান্ডআপ মিটিং',
    subtitle: 'স্পোকেন বই • প্রতিদিনের কাজের আপডেট দেওয়া ও সমস্যা তুলে ধরা',
    targetDate: getTomorrowDateStr(),
    priority: 'high',
    category: 'Spoken Book Chapter 51',
    language: 'english',
    notes: 'অফিস মিটিংয়ে অনর্গল বলার স্পিকিং প্র্যাকটিস',
    addedAt: getTodayDateStr(),
  },
];

// Read from LocalStorage or fallback to seed
export function getStoredStudyLogs(): DailyStudyLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BACKTRACK_LOGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return INITIAL_STUDY_LOGS;
}

export function saveStoredStudyLogs(logs: DailyStudyLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BACKTRACK_LOGS, JSON.stringify(logs));
  } catch {}
}

export function getStoredNextQueue(): NextStudyQueueItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEXT_QUEUE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return INITIAL_NEXT_QUEUE;
}

export function saveStoredNextQueue(queue: NextStudyQueueItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NEXT_QUEUE, JSON.stringify(queue));
  } catch {}
}

export function getStoredNextDayTarget(): NextDayTarget {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEXT_TARGETS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return DEFAULT_NEXT_DAY_TARGET;
}

export function saveStoredNextDayTarget(target: NextDayTarget): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NEXT_TARGETS, JSON.stringify(target));
  } catch {}
}

/**
 * Automatically logs a newly studied word, sentence, or lesson into Today's Backtrack log.
 * Avoids duplicate entries on the same day.
 */
export function logStudiedItem(item: {
  type: 'word' | 'sentence' | 'grammar' | 'reading' | 'custom';
  title: string;
  subtitle?: string;
  language?: 'english' | 'arabic' | 'japanese';
  category?: string;
  notes?: string;
}): void {
  try {
    const logs = getStoredStudyLogs();
    const todayStr = getTodayDateStr();
    const currentTime = new Date().toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const cleanTitle = item.title.trim();
    if (!cleanTitle) return;

    const newItem: BacktrackItem = {
      id: `auto-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: item.type,
      title: cleanTitle,
      subtitle: item.subtitle?.trim(),
      language: item.language || 'english',
      studiedAt: todayStr,
      timeString: currentTime,
      category: item.category || 'General Practice',
      mastered: true,
      notes: item.notes?.trim(),
    };

    let todayFound = false;
    const updatedLogs = logs.map((l) => {
      if (l.date === todayStr) {
        todayFound = true;
        // Check if already in today's items to avoid duplicate
        const exists = l.items.some(
          (it) => it.title.trim().toLowerCase() === cleanTitle.toLowerCase()
        );
        if (exists) return l;
        return {
          ...l,
          items: [newItem, ...l.items],
          minutesSpent: l.minutesSpent + 2,
          xpEarned: l.xpEarned + 10,
        };
      }
      return l;
    });

    if (!todayFound) {
      updatedLogs.unshift({
        date: todayStr,
        formattedDateBn: 'আজকের পড়ার রেকর্ড (Today)',
        minutesSpent: 5,
        xpEarned: 10,
        items: [newItem],
      });
    }

    saveStoredStudyLogs(updatedLogs);
  } catch {}
}

/**
 * Checks whether a word or sentence has been studied in past logs or today.
 * Returns information on when it was studied so the user knows if they are studying fresh new content.
 */
export function findStudiedItemRecord(title: string): { found: boolean; date?: string; formattedDateBn?: string } {
  try {
    const logs = getStoredStudyLogs();
    const clean = title.trim().toLowerCase();
    for (const log of logs) {
      const match = log.items.find((it) => it.title.trim().toLowerCase() === clean);
      if (match) {
        return {
          found: true,
          date: log.date,
          formattedDateBn: log.formattedDateBn,
        };
      }
    }
  } catch {}
  return { found: false };
}
