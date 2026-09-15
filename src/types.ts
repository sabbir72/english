export type UserLevel = 'Beginner' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type PartOfSpeech =
  | 'noun'
  | 'pronoun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'interjection';

export interface OxfordWordItem {
  id: string;
  rank: number;
  word: string;
  pos: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun';
  cefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  ipa: string;
  banglaPronunciation?: string; // readable Bengali pronunciation e.g. "অ্যাবাউট", "অ্যাকশন"
  bangla: string;
  example: string;
  definition?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  banglaMeaning: string;
  pronunciation: string; // readable Bengali phonetics
  ipa: string;
  partOfSpeech: PartOfSpeech;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  example: string;
  exampleBangla: string;
  synonyms: string[];
  antonyms: string[];
  relatedWords: string[];
  isFavorite?: boolean;
  isLearned?: boolean;
  category?: string;
}

export interface SentenceItem {
  id: string;
  english: string;
  bangla: string;
  sentenceType: 'Affirmative' | 'Negative' | 'Interrogative' | 'Imperative' | 'Exclamatory';
  tense?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  structure: string;
  grammarExplanation?: string;
  grammarExplanationBangla: string;
  importantVocab: { word: string; bangla: string }[];
  similarExamples?: { english: string; bangla: string }[];
  isSaved?: boolean;
  isPracticed?: boolean;
}

export interface SentenceStructureItem {
  id: string;
  title: string;
  formula: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  explanationBangla: string;
  examples: {
    english: string;
    bangla: string;
    breakdown: string;
  }[];
  commonMistakes: {
    incorrect: string;
    correct: string;
    reasonBangla: string;
  }[];
  practiceExercises: {
    questionBangla: string;
    options: string[];
    correctIndex: number;
    hint: string;
  }[];
}

export interface GrammarLesson {
  id: string;
  title: string;
  titleBangla: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summaryBangla: string;
  rule: string;
  formula?: string;
  banglaExplanation: string;
  examples: {
    english: string;
    bangla: string;
    note?: string;
  }[];
  commonMistakes: {
    incorrect: string;
    correct: string;
    explanationBangla?: string;
    reasonBangla?: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationBangla: string;
    hintBangla?: string;
  }[];
  isCompleted?: boolean;
}

export type PracticeType =
  | 'mcq'
  | 'rearrange'
  | 'fill-blank'
  | 'translation'
  | 'correction'
  | 'sentence-rearrange'
  | 'fill-blanks'
  | 'error-detection'
  | 'grammar-quiz'
  | 'vocab-quiz';

export interface PracticeQuestion {
  id: string;
  type: PracticeType;
  category: 'vocabulary' | 'sentence' | 'grammar';
  question: string;
  questionBangla?: string;
  options?: string[];
  correctAnswer: string | number;
  correctIndex?: number;
  jumbledWords?: string[];
  rearrangeWords?: string[];
  explanationBangla: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type ConversationTopic =
  | 'Daily Life'
  | 'Job Interview'
  | 'Travel'
  | 'Restaurant'
  | 'Shopping'
  | 'Doctor'
  | 'Office'
  | 'Free Conversation';

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  banglaTranslation?: string;
  correction?: {
    original: string;
    corrected: string;
    explanationBangla: string;
  } | null;
  betterAlternative?: string;
  tipBangla?: string;
  timestamp: number;
}

export interface UserProgress {
  totalWordsLearned: number;
  totalSentencesPracticed: number;
  grammarTopicsCompleted: number;
  quizzesCompleted: number;
  quizAverageScore: number;
  speakingMinutes: number;
  currentStreak: number;
  xp?: number;
  lastActiveDate: string;
  historyDates: string[];
  dailyGoal: {
    wordsTarget: number;
    wordsDone: number;
    sentencesTarget: number;
    sentencesDone: number;
    grammarTarget: number;
    grammarDone: number;
    practiceTarget: number;
    practiceDone: number;
    aiMinutesTarget: number;
    aiMinutesDone: number;
  };
  weeklyActivity: {
    day: string;
    score: number;
    words: number;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  level: UserLevel;
  nativeLanguage?: string;
  targetGoal?: string;
  dailyGoalMinutes?: number;
  dailyWordGoal: number;
  preferredAccent: 'US' | 'UK';
  showBanglaExplanation: boolean;
  soundEnabled: boolean;
  speechSpeed: number; // 0.75 to 1.25
  joinedDate: string;
}

export type MainNavTab = 'home' | 'learn' | 'practice' | 'ai-tutor' | 'progress';

export type LearnSubTab =
  | 'patterns'
  | 'builder'
  | 'transformation'
  | 'word-family'
  | 'context-vocab'
  | 'translation'
  | 'mistakes'
  | 'vocabulary'
  | 'sentences'
  | 'structures'
  | 'grammar'
  | 'pronunciation';

export type NavigationTab =
  | 'home'
  | 'learn'
  | 'patterns'
  | 'builder'
  | 'sentence-builder'
  | 'transformation'
  | 'word-family'
  | 'context-vocab'
  | 'translation'
  | 'mistakes'
  | 'vocabulary'
  | 'sentences'
  | 'sentence-structure'
  | 'grammar'
  | 'pronunciation'
  | 'reading'
  | 'book'
  | 'conversation'
  | 'practice'
  | 'ai-tutor'
  | 'ai-conversation'
  | 'ai-tools'
  | 'progress'
  | 'saved'
  | 'word-bank'
  | 'habit'
  | 'settings'
  | 'profile'
  | 'admin';

// ==========================================
// CORE METHODOLOGY TYPES (Bengali -> English)
// ==========================================

export interface SentencePatternPart {
  part: string;
  bengali: string;
  role: string;
  isAnchor?: boolean;
}

export interface SentenceVariationItem {
  type: 'Basic' | 'Alternative' | 'Natural' | 'Conversational' | 'Formal';
  english: string;
  bangla: string;
  explanation: string;
}

export interface SentencePatternItem {
  id: string;
  pattern: string;
  formula: string;
  meaningBangla: string;
  seedIdeaBangla: string;
  seedEnglish: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  breakdown: SentencePatternPart[];
  staysSame: string[];
  changes: string[];
  examples: {
    english: string;
    bangla: string;
    context?: string;
  }[];
  variations: SentenceVariationItem[];
  commonMistakes: {
    incorrect: string;
    correct: string;
    explanationBangla: string;
  }[];
  challengeVocab: {
    word: string;
    bangla: string;
    sampleSentence: string;
  }[];
}

export interface WordFormSentence {
  english: string;
  bangla: string;
}

export interface WordFamilyItem {
  id: string;
  rootWord: string;
  banglaMeaning: string;
  ipa: string;
  pronunciationBangla: string;
  verb?: { word: string; bangla: string; example: string; exampleBangla: string };
  noun?: { word: string; bangla: string; example: string; exampleBangla: string };
  adjective?: { word: string; bangla: string; example: string; exampleBangla: string };
  adverb?: { word: string; bangla: string; example: string; exampleBangla: string };
  relatedWords: { word: string; bangla: string; relation: 'synonym' | 'antonym' | 'collocation' | 'connected' }[];
  sentencesByLevel: {
    beginner: WordFormSentence;
    intermediate: WordFormSentence;
    advanced: WordFormSentence;
  };
  discoveryChain: string[];
  networkNodes: {
    id: string;
    label: string;
    type: 'root' | 'noun' | 'adjective' | 'verb' | 'adverb' | 'synonym' | 'collocation';
    bangla: string;
  }[];
}

export interface SituationalVocabContext {
  id: string;
  situation: string;
  situationBangla: string;
  descriptionBangla: string;
  iconName: string;
  words: {
    word: string;
    bangla: string;
    partOfSpeech: string;
    example: string;
    exampleBangla: string;
  }[];
}

export interface SentenceTransformationSet {
  id: string;
  baseSentence: string;
  baseBangla: string;
  transformations: {
    positive: { english: string; bangla: string; formula: string; ruleBangla: string };
    negative: { english: string; bangla: string; formula: string; ruleBangla: string };
    question: { english: string; bangla: string; formula: string; ruleBangla: string };
    past: { english: string; bangla: string; formula: string; ruleBangla: string };
    future: { english: string; bangla: string; formula: string; ruleBangla: string };
    continuous: { english: string; bangla: string; formula: string; ruleBangla: string };
    perfect: { english: string; bangla: string; formula: string; ruleBangla: string };
  };
}

export interface CommonMistakeCard {
  id: string;
  patternTitle: string;
  patternTitleBangla: string;
  incorrect: string;
  correct: string;
  explanationBangla: string;
  grammarRule: string;
  drills: {
    question: string;
    questionBangla: string;
    options: string[];
    correctIndex: number;
    explanationBangla: string;
  }[];
}

export interface TranslationExerciseItem {
  id: string;
  bangla: string;
  expectedEnglish: string;
  naturalAlternatives: string[];
  breakdown: { part: string; english: string }[];
  grammarTipBangla: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type TranslationDrillItem = TranslationExerciseItem;
export type SituationalVocabTopic = SituationalVocabContext;
export type CommonMistakeItem = CommonMistakeCard;


export interface EnglishUnderstandingItem {
  id: string;
  english: string;
  bangla: string;
  grammarFocus: string;
  breakdown: { chunk: string; banglaChunk: string; explanation: string }[];
}

export interface BookSentenceItem {
  id: number;
  english: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  category?: string;
  noteBangla?: string;
}

export interface BookChapter {
  id: string;
  number: number;
  title: string;
  bannerTitle: string;
  category?: string;
  introLines: string[];
  sentences: BookSentenceItem[];
}



