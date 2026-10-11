import {
  VocabularyItem,
  SentenceItem,
  SentenceStructureItem,
  GrammarLesson,
  PracticeQuestion,
  UserProgress,
  UserProfile,
} from '../types';
import { COMPREHENSIVE_VOCABULARY_LIST } from './vocabularyData';
import { COMPREHENSIVE_GRAMMAR_LESSONS } from './grammarData';
import {
  PROFESSIONAL_SENTENCES,
  PROFESSIONAL_STRUCTURES,
} from './professionalSentencesData';

export const INITIAL_VOCABULARY: VocabularyItem[] = COMPREHENSIVE_VOCABULARY_LIST;

export const INITIAL_SENTENCES: SentenceItem[] = PROFESSIONAL_SENTENCES;

export const INITIAL_SENTENCE_STRUCTURES: SentenceStructureItem[] = PROFESSIONAL_STRUCTURES;

export const INITIAL_GRAMMAR_LESSONS: GrammarLesson[] = COMPREHENSIVE_GRAMMAR_LESSONS;

export const LEGACY_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'gram-1',
    title: 'Parts of Speech: Noun, Pronoun & Verb',
    titleBangla: 'পার্টস অব স্পিচ (পদ প্রকরণ)',
    category: 'Parts of Speech',
    difficulty: 'Beginner',
    summaryBangla: 'ইংরেজি ব্যাকরণের ভিত্তি হলো Parts of Speech। বাক্যে প্রতিটি শব্দের ভূমিকা বুঝতে এটি অপরিহার্য।',
    rule: 'A sentence is composed of words that perform different grammatical functions: Naming (Noun), Replacing (Pronoun), Action/State (Verb).',
    formula: 'Sentence = Noun/Pronoun (Subject) + Verb (Action) + Noun (Object)',
    banglaExplanation: `১. Noun (বিশেষ্য): কোনো ব্যক্তি, বস্তু, স্থান বা ধারণার নাম (যেমন: Rahim, Dhaka, Book, Honesty)।
২. Pronoun (সর্বনাম): Noun-এর পুনরাবৃত্তি এড়াতে তার পরিবর্তে ব্যবহৃত শব্দ (যেমন: He, She, They, It)।
৩. Verb (ক্রিয়া): কোনো কাজ করা বা হওয়া বোঝায় (যেমন: learn, write, speak, is, are)।
উদাহরণস্বরূপ: "Rahim reads a book" বাক্যে Rahim ও book হলো Noun এবং reads হলো Verb।`,
    examples: [
      { english: 'Sabbir is an engineer.', bangla: 'সাব্বির একজন প্রকৌশলী।', note: 'Sabbir (Noun), is (Verb), engineer (Noun)' },
      { english: 'He works diligently.', bangla: 'সে নিষ্ঠার সাথে কাজ করে।', note: 'He (Pronoun), works (Verb)' },
    ],
    commonMistakes: [
      {
        incorrect: 'Rahim he goes to school.',
        correct: 'Rahim goes to school. / He goes to school.',
        reasonBangla: 'একই সাথে Noun ও অপ্রয়োজনীয় Pronoun ব্যবহার করবেন না।',
      },
    ],
    quiz: [
      {
        question: 'Identify the verb in: "The clever boy solved the problem."',
        options: ['clever', 'boy', 'solved', 'problem'],
        correctIndex: 2,
        explanationBangla: '"solved" শব্দটি অতীতকালের একটি কাজ নির্দেশ করছে, তাই এটি Verb।',
      },
    ],
  },
  {
    id: 'gram-2',
    title: 'Present, Past & Future Tenses Explained',
    titleBangla: 'টেন্সের সহজ সমাধান (কাল)',
    category: 'Tenses',
    difficulty: 'Beginner',
    summaryBangla: 'টেন্স হলো ক্রিয়া সম্পন্ন হওয়ার সময়। ইংরেজিতে সঠিক ভাব প্রকাশের জন্য টেন্স আয়ত্ত করা সবচেয়ে জরুরি।',
    rule: 'Tenses indicate the time of an action. Main categories are Present (Now), Past (Before), and Future (Later).',
    formula: 'Present: S+V1 | Past: S+V2 | Future: S+will+V1',
    banglaExplanation: `বাঙালি শিক্ষার্থীদের জন্য সহজ টেন্স চেনার উপায়:
১. Present Indefinite: নিয়মিত অভ্যাস বা সত্য (I study English - আমি ইংরেজি পড়ি)।
২. Past Indefinite: অতীতে শেষ হওয়া কাজ (I studied English yesterday - আমি গতকাল ইংরেজি পড়েছিলাম)।
৩. Future Indefinite: ভবিষ্যতে যা ঘটবে (I will study English tomorrow - আমি আগামীকাল ইংরেজি পড়ব)।
মনে রাখবেন: অতীতকালে Verb-এর ২য় রূপ (V2) বসে এবং ভবিষ্যতে "will"-এর পর Verb-এর বেস ফর্ম বসে।`,
    examples: [
      { english: 'I write code every day.', bangla: 'আমি প্রতিদিন কোড লিখি। (Present)' },
      { english: 'I wrote an email yesterday.', bangla: 'আমি গতকাল একটি ইমেল লিখেছিলাম। (Past)' },
      { english: 'I will call you tomorrow.', bangla: 'আমি আপনাকে আগামীকাল ফোন করব। (Future)' },
    ],
    commonMistakes: [
      {
        incorrect: 'I did not went there.',
        correct: 'I did not go there.',
        reasonBangla: 'Did-এর পর মূল Verb-এর বেস ফর্ম (go) বসে, Past form (went) নয়। এটি একটি মারাত্মক ভুল!',
      },
      {
        incorrect: 'I will going tomorrow.',
        correct: 'I will go tomorrow.',
        reasonBangla: 'Will-এর পর সরাসরি V1 (go) বসে।',
      },
    ],
    quiz: [
      {
        question: 'Which sentence is grammatically correct?',
        options: [
          'She did not saw him.',
          'She did not see him.',
          'She does not saw him.',
          'She will saw him.',
        ],
        correctIndex: 1,
        hintBangla: 'did not-এর পর verb-এর base form বসে।',
        explanationBangla: '"did not"-এর পর verb-এর base form "see" হবে।',
      },
    ],
  },
  {
    id: 'gram-3',
    title: 'Subject-Verb Agreement Rules',
    titleBangla: 'সাবজেক্ট ও ভার্ব মিলকরণ (Subject-Verb Agreement)',
    category: 'Syntax & Grammar Rules',
    difficulty: 'Intermediate',
    summaryBangla: 'Subject একবচন হলে Verb একবচন হবে, Subject বহুবচন হলে Verb বহুবচন হবে।',
    rule: 'A singular subject takes a singular verb, whereas a plural subject takes a plural verb.',
    formula: 'Singular Subject + Singular Verb (V+s/es/is/was) | Plural Subject + Plural Verb (V_base/are/were)',
    banglaExplanation: `বাঙালি শিক্ষার্থীরা প্রায়ই ভুল করে যখন বাক্যে দুটি Subject থাকে বা prepositional phrase থাকে:
১. "The quality of these mangoes is good" (are নয়, কারণ মূল subject হলো 'quality' যা একবচন)।
২. Everyone, Everybody, Each, Someone - এদের পরে সর্বদা Singular verb বসে (Everyone is ready)।
৩. Either...or / Neither...nor থাকলে দ্বিতীয় Subject অনুযায়ী verb বসে (Neither he nor his friends were present)।`,
    examples: [
      { english: 'Every student has a notebook.', bangla: 'প্রত্যেক শিক্ষার্থীর একটি খাতা আছে।', note: 'Every student = Singular' },
      { english: 'The list of items is on the table.', bangla: 'জিনিসপত্রের তালিকাটি টেবিলের ওপর আছে।', note: 'Subject is "list", not "items"' },
    ],
    commonMistakes: [
      {
        incorrect: 'Everyone are learning English.',
        correct: 'Everyone is learning English.',
        reasonBangla: '"Everyone" ব্যাকরণগতভাবে Singular, তাই "is" বসবে।',
      },
      {
        incorrect: 'One of my friend is coming.',
        correct: 'One of my friends is coming.',
        reasonBangla: '"One of"-এর পর noun বহুবচন (friends) হয় কিন্তু verb একবচন (is) হয়।',
      },
    ],
    quiz: [
      {
        question: 'Neither the manager nor the employees _____ arrived yet.',
        options: ['has', 'have', 'is', 'was'],
        correctIndex: 1,
        explanationBangla: 'Neither...nor-এ শেষ Subject "employees" বহুবচন, তাই plural verb "have" বসবে।',
      },
    ],
  },
  {
    id: 'gram-4',
    title: 'Prepositions of Time and Place: In, On, At',
    titleBangla: 'প্রিপজিশনের সঠিক ব্যবহার (In, On, At)',
    category: 'Prepositions',
    difficulty: 'Beginner',
    summaryBangla: 'সময় ও স্থানের ক্ষেত্রে In, On, At-এর পরিষ্কার নিয়ম শিখুন।',
    rule: 'At for specific precise time/point, On for days and dates, In for months, years, centuries and enclosed large spaces.',
    formula: 'Time: at 5 PM | on Monday | in 2026 / in May\nPlace: at the door | on the table | in Dhaka',
    banglaExplanation: `সহজ ফর্মুলা:
• At (সবচেয়ে নির্দিষ্ট/ক্ষুদ্র): at 9:00 AM, at night, at the bus stop.
• On (দিন ও তারিখ / সারফেস): on Friday, on 26th March, on the wall.
• In (বৃহৎ সময় ও স্থান): in 1971, in summer, in Bangladesh, in the car.`,
    examples: [
      { english: 'The meeting starts at 10 AM on Monday.', bangla: 'সোমবার সকাল ১০টায় মিটিংটি শুরু হবে।' },
      { english: 'I was born in 1995.', bangla: 'আমি ১৯৯৫ সালে জন্মগ্রহণ করেছিলাম।' },
    ],
    commonMistakes: [
      {
        incorrect: 'I will meet you in Friday.',
        correct: 'I will meet you on Friday.',
        reasonBangla: 'দিনের নামের পূর্বে সর্বদা "on" বসে।',
      },
      {
        incorrect: 'He arrived on night.',
        correct: 'He arrived at night.',
        reasonBangla: '"night"-এর পূর্বে "at" বসে (at night)।',
      },
    ],
    quiz: [
      {
        question: 'Our flight departs _____ 6:30 PM _____ Sunday.',
        options: ['in, at', 'at, on', 'on, at', 'at, in'],
        correctIndex: 1,
        explanationBangla: 'নির্দিষ্ট সময়ের আগে "at" এবং দিনের আগে "on" বসে।',
      },
    ],
  },
  {
    id: 'gram-5',
    title: 'Conditionals (Zero, First, Second & Third)',
    titleBangla: 'কন্ডিশনাল সেন্টেন্স (শর্তযুক্ত বাক্য)',
    category: 'Advanced Sentence Types',
    difficulty: 'Intermediate',
    summaryBangla: 'শর্তযুক্ত বাক্য কীভাবে গঠন করতে হয় তার পূর্ণাঙ্গ গাইড।',
    rule: 'Conditionals express that one thing depends on another thing happening.',
    formula: '1st: If + Present Simple, will + base verb\n2nd: If + Past Simple, would + base verb\n3rd: If + Past Perfect, would have + V3',
    banglaExplanation: `১. First Conditional (বাস্তব সম্ভাবনা): If you work hard, you will succeed (যদি তুমি কঠোর পরিশ্রম করো, তুমি সফল হবে)।
২. Second Conditional (কাল্পনিক বর্তমান): If I had a million dollars, I would travel the world (যদি আমার এক মিলিয়ন ডলার থাকত, আমি বিশ্ব ভ্রমণ করতাম)।
৩. Third Conditional (অতীতের অপূর্ণ আফসোস): If you had told me earlier, I would have helped you (যদি তুমি আমাকে আগে জানাতে, আমি তোমাকে সাহায্য করতে পারতাম)।`,
    examples: [
      { english: 'If you heat ice, it melts.', bangla: 'বরফে তাপ দিলে তা গলে যায়। (Zero Conditional)' },
      { english: 'If it stops raining, we will go out.', bangla: 'যদি বৃষ্টি থামে, আমরা বাইরে যাব। (First Conditional)' },
    ],
    commonMistakes: [
      {
        incorrect: 'If you will come, I will go.',
        correct: 'If you come, I will go.',
        reasonBangla: 'If-clause এর অংশে কখনো "will" বসে না। সেখানে Present Simple ব্যবহার করতে হয়।',
      },
    ],
    quiz: [
      {
        question: 'If she _____ harder, she would have passed the exam.',
        options: ['studied', 'had studied', 'has studied', 'studies'],
        correctIndex: 1,
        explanationBangla: 'পরবর্তী অংশে "would have passed" রয়েছে, তাই If-clause-এ Past Perfect (had studied) হবে।',
      },
    ],
  },
];

export const INITIAL_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'quiz-1',
    type: 'mcq',
    category: 'vocabulary',
    question: 'What is the closest Bengali meaning of "Consistent"?',
    questionBangla: '"Consistent" শব্দটির সঠিক বাংলা অর্থ কোনটি?',
    options: ['ধারাবাহিক / অটল', 'দ্বিধাগ্রস্ত', 'অসম্ভব', 'উত্তেজিত'],
    correctAnswer: 0,
    explanationBangla: '"Consistent" মানে কোনো কাজের ধারাবাহিকতা বা নিয়মিত বজায় রাখা।',
    difficulty: 'Beginner',
  },
  {
    id: 'quiz-2',
    type: 'fill-blank',
    category: 'grammar',
    question: 'She _____ to office by bus every morning.',
    options: ['go', 'goes', 'going', 'is go'],
    correctAnswer: 1,
    explanationBangla: 'Subject "She" হলো 3rd person singular, তাই Present Simple-এ verb-এর সাথে "es" যুক্ত হয়ে "goes" হবে।',
    difficulty: 'Beginner',
  },
  {
    id: 'quiz-3',
    type: 'rearrange',
    category: 'sentence',
    question: 'Rearrange the words to form a correct English sentence:',
    questionBangla: 'সঠিক বাক্য তৈরি করতে শব্দগুলো সাজান:',
    jumbledWords: ['learning', 'English', 'I', 'am', 'daily'],
    correctAnswer: 'I am learning English daily',
    explanationBangla: 'Subject (I) + Auxiliary (am) + Verb-ing (learning) + Object (English) + Adverb (daily)।',
    difficulty: 'Beginner',
  },
  {
    id: 'quiz-4',
    type: 'translation',
    category: 'sentence',
    question: 'Translate to English: "দেরিতে আসার জন্য আমি ক্ষমা চাইছি।"',
    options: [
      'I apologize for coming late.',
      'I apologize for late come.',
      'I am apologize to coming late.',
      'I apologies to come late.',
    ],
    correctAnswer: 0,
    explanationBangla: 'Apologize for + Gerund (verb-ing): "I apologize for coming late."',
    difficulty: 'Intermediate',
  },
  {
    id: 'quiz-5',
    type: 'correction',
    category: 'grammar',
    question: 'Find the mistake and select the corrected sentence: "One of my teacher are very helpful."',
    options: [
      'One of my teachers is very helpful.',
      'One of my teacher is very helpful.',
      'One of my teachers are very helpful.',
      'One of my teachers were very helpful.',
    ],
    correctAnswer: 0,
    explanationBangla: '"One of"-এর পর noun বহুবচন (teachers) কিন্তু verb একবচন (is) হয়।',
    difficulty: 'Intermediate',
  },
  {
    id: 'quiz-6',
    type: 'mcq',
    category: 'vocabulary',
    question: 'Choose the antonym (বিপরীত শব্দ) of "Improve":',
    options: ['Enhance', 'Worsen', 'Develop', 'Strengthen'],
    correctAnswer: 1,
    explanationBangla: 'Improve মানে উন্নতি করা; আর Worsen মানে খারাপ বা অবনতি হওয়া।',
    difficulty: 'Beginner',
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Bangla Learner',
  email: 'learner@example.com',
  level: 'Beginner',
  nativeLanguage: 'Bengali (বাংলা)',
  targetGoal: 'Become fluent in spoken & workplace English',
  dailyGoalMinutes: 15,
  dailyWordGoal: 5,
  preferredAccent: 'US',
  showBanglaExplanation: true,
  soundEnabled: true,
  speechSpeed: 1.0,
  joinedDate: 'September 2026',
};

export const INITIAL_USER_PROGRESS: UserProgress = {
  totalWordsLearned: 12,
  totalSentencesPracticed: 18,
  grammarTopicsCompleted: 4,
  quizzesCompleted: 8,
  quizAverageScore: 88,
  speakingMinutes: 15,
  currentStreak: 4,
  xp: 140,
  lastActiveDate: new Date().toISOString().split('T')[0],
  historyDates: ['2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11'],
  dailyGoal: {
    wordsTarget: 5,
    wordsDone: 3,
    sentencesTarget: 3,
    sentencesDone: 2,
    grammarTarget: 1,
    grammarDone: 1,
    practiceTarget: 5,
    practiceDone: 4,
    aiMinutesTarget: 5,
    aiMinutesDone: 3,
  },
  weeklyActivity: [
    { day: 'Mon', score: 85, words: 6 },
    { day: 'Tue', score: 90, words: 5 },
    { day: 'Wed', score: 75, words: 4 },
    { day: 'Thu', score: 95, words: 7 },
    { day: 'Fri', score: 80, words: 5 },
    { day: 'Sat', score: 100, words: 8 },
    { day: 'Sun', score: 90, words: 6 },
  ],
};
