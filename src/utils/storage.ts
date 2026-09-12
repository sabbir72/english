import {
  VocabularyItem,
  SentenceItem,
  SentenceStructureItem,
  GrammarLesson,
  PracticeQuestion,
  UserProgress,
  UserProfile,
  UserLevel,
} from '../types';
import {
  INITIAL_VOCABULARY,
  INITIAL_SENTENCES,
  INITIAL_SENTENCE_STRUCTURES,
  INITIAL_GRAMMAR_LESSONS,
  INITIAL_PRACTICE_QUESTIONS,
  INITIAL_USER_PROFILE,
  INITIAL_USER_PROGRESS,
} from '../data/mockData';

const KEYS = {
  VOCAB: 'boli_vocab_v1',
  SENTENCES: 'boli_sentences_v1',
  STRUCTURES: 'boli_structures_v1',
  GRAMMAR: 'boli_grammar_v1',
  PRACTICE: 'boli_practice_v1',
  PROFILE: 'boli_profile_v1',
  PROGRESS: 'boli_progress_v1',
  THEME: 'boli_theme_v1',
};

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_USER_PROFILE;
}

export function saveStoredProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch {}
}

export function getStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(KEYS.PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Check if day changed to handle daily streak
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastActiveDate !== today) {
        // Reset daily goal counts for new day
        parsed.dailyGoal.wordsDone = 0;
        parsed.dailyGoal.sentencesDone = 0;
        parsed.dailyGoal.grammarDone = 0;
        parsed.dailyGoal.practiceDone = 0;
        parsed.dailyGoal.aiMinutesDone = 0;
        parsed.lastActiveDate = today;
      }
      return parsed;
    }
  } catch {}
  return INITIAL_USER_PROGRESS;
}

export function saveStoredProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  } catch {}
}

export function getStoredVocabulary(): VocabularyItem[] {
  try {
    const raw = localStorage.getItem(KEYS.VOCAB);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_VOCABULARY;
}

export function saveStoredVocabulary(items: VocabularyItem[]): void {
  try {
    localStorage.setItem(KEYS.VOCAB, JSON.stringify(items));
  } catch {}
}

export function getStoredSentences(): SentenceItem[] {
  try {
    const raw = localStorage.getItem(KEYS.SENTENCES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_SENTENCES;
}

export function saveStoredSentences(items: SentenceItem[]): void {
  try {
    localStorage.setItem(KEYS.SENTENCES, JSON.stringify(items));
  } catch {}
}

export function getStoredStructures(): SentenceStructureItem[] {
  try {
    const raw = localStorage.getItem(KEYS.STRUCTURES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_SENTENCE_STRUCTURES;
}

export function saveStoredStructures(items: SentenceStructureItem[]): void {
  try {
    localStorage.setItem(KEYS.STRUCTURES, JSON.stringify(items));
  } catch {}
}

export function getStoredGrammar(): GrammarLesson[] {
  try {
    const raw = localStorage.getItem(KEYS.GRAMMAR);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_GRAMMAR_LESSONS;
}

export function saveStoredGrammar(items: GrammarLesson[]): void {
  try {
    localStorage.setItem(KEYS.GRAMMAR, JSON.stringify(items));
  } catch {}
}

export function getStoredPractice(): PracticeQuestion[] {
  try {
    const raw = localStorage.getItem(KEYS.PRACTICE);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_PRACTICE_QUESTIONS;
}

export function saveStoredPractice(items: PracticeQuestion[]): void {
  try {
    localStorage.setItem(KEYS.PRACTICE, JSON.stringify(items));
  } catch {}
}
