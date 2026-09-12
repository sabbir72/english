import {
  SentencePatternItem,
  WordFamilyItem,
  SituationalVocabContext,
  SentenceTransformationSet,
  CommonMistakeCard,
  TranslationExerciseItem,
  EnglishUnderstandingItem,
} from '../types';

// ============================================================================
// 1. SENTENCE PATTERNS (One Structure -> Hundreds of Sentences)
// ============================================================================

export const CORE_SENTENCE_PATTERNS: SentencePatternItem[] = [
  {
    id: 'pat-want-to',
    pattern: 'Subject + want to + Verb (base) + Object',
    formula: 'Subject + want to + Verb + Object',
    meaningBangla: 'আমি/আমরা কোনো কিছু করতে চাই',
    seedIdeaBangla: 'আমি প্রতিদিন ইংরেজি শিখতে চাই।',
    seedEnglish: 'I want to learn English every day.',
    difficulty: 'Beginner',
    category: 'Daily Desires & Intentions',
    breakdown: [
      { part: 'I', bengali: 'আমি', role: 'Subject', isAnchor: true },
      { part: 'want to', bengali: 'চাই (ইচ্ছা)', role: 'Core Pattern Anchor', isAnchor: true },
      { part: 'learn', bengali: 'শিখতে', role: 'Action Verb (Base form)' },
      { part: 'English', bengali: 'ইংরেজি', role: 'Object' },
      { part: 'every day', bengali: 'প্রতিদিন', role: 'Time Expression' },
    ],
    staysSame: ['Subject (I, You, We, They)', 'want to (বা He/She-এর ক্ষেত্রে wants to)'],
    changes: [
      'Verb: learn, practice, improve, speak, understand, watch, read',
      'Object: English, pronunciation, grammar, books, movies, speaking',
    ],
    examples: [
      { english: 'I want to learn English.', bangla: 'আমি ইংরেজি শিখতে চাই।', context: 'Goal' },
      { english: 'I want to practice speaking.', bangla: 'আমি কথা বলা অনুশীলন করতে চাই।', context: 'Action' },
      { english: 'I want to improve my pronunciation.', bangla: 'আমি আমার উচ্চারণ উন্নত করতে চাই।', context: 'Skill' },
      { english: 'I want to understand native speakers.', bangla: 'আমি বিদেশিদের কথা বুঝতে চাই।', context: 'Listening' },
      { english: 'I want to speak without hesitation.', bangla: 'আমি দ্বিধা ছাড়া কথা বলতে চাই।', context: 'Fluency' },
      { english: 'I want to read English books.', bangla: 'আমি ইংরেজি বই পড়তে চাই।', context: 'Reading' },
      { english: 'I want to build my confidence.', bangla: 'আমি আমার আত্মবিশ্বাস বাড়াতে চাই।', context: 'Mindset' },
      { english: 'We want to travel abroad.', bangla: 'আমরা বিদেশে ভ্রমণ করতে চাই।', context: 'Travel' },
    ],
    variations: [
      {
        type: 'Basic',
        english: 'I want to learn English.',
        bangla: 'আমি ইংরেজি শিখতে চাই।',
        explanation: 'সহজ এবং সবচেয়ে সাধারণ রূপ। সবার সাথে ব্যবহারযোগ্য।',
      },
      {
        type: 'Alternative',
        english: 'I would like to learn English.',
        bangla: 'আমি ইংরেজি শিখতে আগ্রহী / চাই।',
        explanation: 'আরও বেশি ভদ্র ও মার্জিত (Polite & Professional)। অফিস বা ইন্টারভিউতে উপযোগী।',
      },
      {
        type: 'Natural',
        english: 'I want to improve my English.',
        bangla: 'আমি আমার ইংরেজিটা আরও ভালো করতে চাই।',
        explanation: 'স্বাভাবিক দৈনিক কথোপকথনে নেটিভ স্পিকাররা এভাবেই বলেন।',
      },
      {
        type: 'Conversational',
        english: 'I am trying to improve my English.',
        bangla: 'আমি আমার ইংরেজি উন্নত করার চেষ্টা করে যাচ্ছি।',
        explanation: 'চলমান প্রচেষ্টা প্রকাশ করে, যা বন্ধুত্বপূর্ণ শোনায়।',
      },
      {
        type: 'Formal',
        english: 'I intend to acquire proficiency in spoken English.',
        bangla: 'আমি স্পোকেন ইংরেজিতে দক্ষতা অর্জন করার প্রত্যয় রাখি।',
        explanation: 'অফিসিয়াল লেটার বা ফর্মাল প্রেজেন্টেশনে ব্যবহার্য।',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I want to learning English.',
        correct: 'I want to learn English.',
        explanationBangla: '"want to"-এর পর সর্বদা Verb-এর মূল বা Base রূপ বসে, "-ing" হবে না।',
      },
      {
        incorrect: 'He want to practice.',
        correct: 'He wants to practice.',
        explanationBangla: 'He/She হলো 3rd Person Singular, তাই want-এর সাথে "s" যুক্ত হয়ে "wants" হবে।',
      },
    ],
    challengeVocab: [
      { word: 'learn', bangla: 'শেখা', sampleSentence: 'I want to learn English.' },
      { word: 'practice', bangla: 'অনুশীলন করা', sampleSentence: 'I want to practice speaking.' },
      { word: 'improve', bangla: 'উন্নত করা', sampleSentence: 'I want to improve my vocabulary.' },
      { word: 'understand', bangla: 'বোঝা', sampleSentence: 'I want to understand grammar.' },
      { word: 'speak', bangla: 'কথা বলা', sampleSentence: 'I want to speak fluently.' },
    ],
  },
  {
    id: 'pat-need-to',
    pattern: 'Subject + need to + Verb (base) + Object',
    formula: 'Subject + need to + Verb + Object',
    meaningBangla: 'আমার/কারো কোনো কিছু করা প্রয়োজন বা দরকার',
    seedIdeaBangla: 'আমার প্রতিদিন ইংরেজি চর্চা করা প্রয়োজন।',
    seedEnglish: 'I need to practice English every day.',
    difficulty: 'Beginner',
    category: 'Necessity & Daily Priorities',
    breakdown: [
      { part: 'I', bengali: 'আমার', role: 'Subject', isAnchor: true },
      { part: 'need to', bengali: 'প্রয়োজন / দরকার', role: 'Core Pattern Anchor', isAnchor: true },
      { part: 'practice', bengali: 'চর্চা করা', role: 'Action Verb (Base form)' },
      { part: 'English', bengali: 'ইংরেজি', role: 'Object' },
      { part: 'every day', bengali: 'প্রতিদিন', role: 'Time Expression' },
    ],
    staysSame: ['Subject (I, You, We, They)', 'need to (বা He/She-এর ক্ষেত্রে needs to)'],
    changes: [
      'Verb: practice, finish, submit, call, prepare, revise, discuss',
      'Object: task, report, presentation, speaking, lesson, project',
    ],
    examples: [
      { english: 'I need to practice every day.', bangla: 'আমার প্রতিদিন চর্চা করা দরকার।', context: 'Habit' },
      { english: 'I need to improve my speaking speed.', bangla: 'আমার কথা বলার গতি বাড়ানো দরকার।', context: 'Fluency' },
      { english: 'I need to ask a quick question.', bangla: 'আমার একটি ছোট প্রশ্ন করা দরকার।', context: 'Clarification' },
      { english: 'I need to prepare for the job interview.', bangla: 'আমার চাকরির ইন্টারভিউয়ের প্রস্তুতি নেওয়া দরকার।', context: 'Career' },
      { english: 'We need to submit the project today.', bangla: 'আমাদের আজকে প্রজেক্টটি জমা দিতে হবে।', context: 'Work' },
      { english: 'She needs to practice pronunciation.', bangla: 'তার উচ্চারণ চর্চা করা প্রয়োজন।', context: 'Skill' },
    ],
    variations: [
      {
        type: 'Basic',
        english: 'I need to practice English.',
        bangla: 'আমার ইংরেজি অনুশীলন করা প্রয়োজন।',
        explanation: 'সহজ ও সরাসরি প্রয়োজনীয়তা নির্দেশ করে।',
      },
      {
        type: 'Alternative',
        english: 'It is important for me to practice English.',
        bangla: 'ইংরেজি অনুশীলন করা আমার জন্য অত্যন্ত গুরুত্বপূর্ণ।',
        explanation: 'গুরুত্ব বুঝিয়ে বলার জন্য দারুণ বিকল্প।',
      },
      {
        type: 'Natural',
        english: 'I have to practice English daily.',
        bangla: 'আমাকে প্রতিদিন ইংরেজি চর্চা করতেই হয়।',
        explanation: 'বাধ্যবাধকতা ও দৃঢ় সংকল্প প্রকাশে খুবই স্বাভাবিক।',
      },
      {
        type: 'Conversational',
        english: "I've gotta practice my speaking.",
        bangla: 'আমার কথা বলা চর্চা করা লাগবেই।',
        explanation: 'ঘনিষ্ঠ ও ইনফরমাল বন্ধুদের সাথে কথা বলার সময় নেটিভরা "gotta" ব্যবহার করেন।',
      },
      {
        type: 'Formal',
        english: 'Consistent practice is essential for my language development.',
        bangla: 'আমার ভাষাগত উন্নতির জন্য নিয়মিত অনুশীলন অপরিহার্য।',
        explanation: 'একাডেমিক বা করপোরেট পরিবেশের উপযোগী।',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I am need to practice.',
        correct: 'I need to practice.',
        explanationBangla: 'Need নিজেই একটি Verb, এর আগে "am" বসবে না।',
      },
      {
        incorrect: 'I need to practicing.',
        correct: 'I need to practice.',
        explanationBangla: 'to-এর পর সর্বদা Verb-এর base form বসে।',
      },
    ],
    challengeVocab: [
      { word: 'practice', bangla: 'চর্চা করা', sampleSentence: 'I need to practice daily.' },
      { word: 'improve', bangla: 'উন্নতি করা', sampleSentence: 'I need to improve my skills.' },
      { word: 'call', bangla: 'কল করা', sampleSentence: 'I need to call my manager.' },
      { word: 'finish', bangla: 'শেষ করা', sampleSentence: 'I need to finish this report.' },
      { word: 'focus', bangla: 'মনোযোগ দেওয়া', sampleSentence: 'I need to focus on pronunciation.' },
    ],
  },
  {
    id: 'pat-trying-to',
    pattern: 'Subject + am/is/are + trying to + Verb (base) + Object',
    formula: 'Subject + be verb + trying to + Verb + Object',
    meaningBangla: 'আমি/আমরা কোনো কিছু করার চেষ্টা করছি (চলমান প্রচেষ্টা)',
    seedIdeaBangla: 'আমি অনর্গল ইংরেজি বলতে চেষ্টা করছি।',
    seedEnglish: 'I am trying to speak English fluently.',
    difficulty: 'Beginner',
    category: 'Ongoing Efforts & Learning Journey',
    breakdown: [
      { part: 'I', bengali: 'আমি', role: 'Subject', isAnchor: true },
      { part: 'am trying to', bengali: 'চেষ্টা করছি', role: 'Continuous Pattern Anchor', isAnchor: true },
      { part: 'speak', bengali: 'বলতে', role: 'Action Verb (Base)' },
      { part: 'English', bengali: 'ইংরেজি', role: 'Object' },
      { part: 'fluently', bengali: 'অনর্গলভাবে', role: 'Adverb of Manner' },
    ],
    staysSame: ['Subject + be-verb (I am, He is, They are)', 'trying to'],
    changes: [
      'Verb: speak, build, remember, understand, correct, develop',
      'Object / Adverb: fluently, new sentences, vocabulary, grammar rules, habits',
    ],
    examples: [
      { english: 'I am trying to speak English fluently.', bangla: 'আমি অনর্গল ইংরেজি বলার চেষ্টা করছি।', context: 'Fluency' },
      { english: 'I am trying to learn 5 new words today.', bangla: 'আমি আজ ৫টি নতুন শব্দ শেখার চেষ্টা করছি।', context: 'Vocab' },
      { english: 'He is trying to overcome his hesitation.', bangla: 'সে তার দ্বিধাবোধ কাটিয়ে ওঠার চেষ্টা করছে।', context: 'Confidence' },
      { english: 'We are trying to build complex sentences.', bangla: 'আমরা জটিল বাক্য তৈরির চেষ্টা করছি।', context: 'Structure' },
      { english: 'I am trying to improve my active listening.', bangla: 'আমি মনোযোগ দিয়ে শোনার দক্ষতা বাড়ানোর চেষ্টা করছি।', context: 'Listening' },
    ],
    variations: [
      {
        type: 'Basic',
        english: 'I am trying to speak English.',
        bangla: 'আমি ইংরেজি বলার চেষ্টা করছি।',
        explanation: 'সহজ ও পরিচ্ছন্ন চলমান রূপ।',
      },
      {
        type: 'Natural',
        english: 'I am working on my spoken English.',
        bangla: 'আমি আমার স্পোকেন ইংরেজি আরও শাণিত করার কাজ করছি।',
        explanation: 'নেটিভ স্পিকাররা নিজের উন্নতি বোঝাতে প্রায়ই "working on" বলেন।',
      },
      {
        type: 'Conversational',
        english: 'Just trying to get better at speaking day by day.',
        bangla: 'প্রতিদিন একটু একটু করে ভালো বলার চেষ্টা করছি আর কি।',
        explanation: 'খুবই ঘরোয়া ও বিনয়ী ভাব প্রকাশ পায়।',
      },
      {
        type: 'Formal',
        english: 'I am actively striving to enhance my linguistic competence.',
        bangla: 'আমি সক্রিয়ভাবে আমার ভাষাগত দক্ষতা বৃদ্ধির প্রচেষ্টা চালাচ্ছি।',
        explanation: 'ফর্মাল ও মার্জিত লিখিত ভাষা।',
      },
      {
        type: 'Alternative',
        english: 'I am putting effort into learning English.',
        bangla: 'আমি ইংরেজি শেখার পেছনে পরিশ্রম দিচ্ছি।',
        explanation: 'পরিশ্রম ও ডেডিকেশন বোঝাতে ব্যবহৃত হয়।',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I trying to speak English.',
        correct: 'I am trying to speak English.',
        explanationBangla: 'Continuous বাক্যে "am" বাদ দেওয়া যাবে না।',
      },
      {
        incorrect: 'I am trying to speaking.',
        correct: 'I am trying to speak.',
        explanationBangla: '"trying to"-এর পর Verb-এর base form (speak) বসবে।',
      },
    ],
    challengeVocab: [
      { word: 'speak', bangla: 'কথা বলা', sampleSentence: 'I am trying to speak without fear.' },
      { word: 'understand', bangla: 'বোঝা', sampleSentence: 'I am trying to understand fast English.' },
      { word: 'memorize', bangla: 'মুখস্থ করা', sampleSentence: 'I am trying to memorize sentence patterns.' },
      { word: 'build', bangla: 'তৈরি করা', sampleSentence: 'I am trying to build my vocabulary.' },
      { word: 'correct', bangla: 'শুদ্ধ করা', sampleSentence: 'I am trying to correct my mistakes.' },
    ],
  },
  {
    id: 'pat-habit-time',
    pattern: 'Subject + Verb + Object + Time Expression',
    formula: 'Subject + V1 + Object + Time',
    meaningBangla: 'আমি/আমরা নিয়মিত সময়ে কোনো কাজ করি (অভ্যাস বা রুটিন)',
    seedIdeaBangla: 'আমি প্রতিদিন ইংরেজি শিখি।',
    seedEnglish: 'I learn English every day.',
    difficulty: 'Beginner',
    category: 'Daily Habits & Routine',
    breakdown: [
      { part: 'I', bengali: 'আমি', role: 'Subject', isAnchor: true },
      { part: 'learn', bengali: 'শিখি', role: 'Action Verb (Base form)' },
      { part: 'English', bengali: 'ইংরেজি', role: 'Object' },
      { part: 'every day', bengali: 'প্রতিদিন', role: 'Time Expression' },
    ],
    staysSame: ['Subject (I, You, We, They)'],
    changes: [
      'Verb: learn, read, watch, play, practice, drink, write',
      'Object: English, books, movies, football, speaking, coffee, journals',
      'Time: every day, every morning, in the evening, on weekends, at night',
    ],
    examples: [
      { english: 'I learn English every day.', bangla: 'আমি প্রতিদিন ইংরেজি শিখি।', context: 'Study' },
      { english: 'I read books every night.', bangla: 'আমি প্রতিদিন রাতে বই পড়ি।', context: 'Reading' },
      { english: 'I watch English movies on weekends.', bangla: 'আমি ছুটির দিনে ইংরেজি সিনেমা দেখি।', context: 'Entertainment' },
      { english: 'I play football in the afternoon.', bangla: 'আমি বিকেলে ফুটবল খেলি।', context: 'Sports' },
      { english: 'I practice speaking with AI daily.', bangla: 'আমি প্রতিদিন এআই-এর সাথে কথা বলা চর্চা করি।', context: 'AI Practice' },
      { english: 'She drinks tea every morning.', bangla: 'সে প্রতিদিন সকালে চা পান করে।', context: 'Routine' },
    ],
    variations: [
      {
        type: 'Basic',
        english: 'I learn English every day.',
        bangla: 'আমি প্রতিদিন ইংরেজি শিখি।',
        explanation: 'সহজ দৈনন্দিন অভ্যাসের প্রকাশ।',
      },
      {
        type: 'Natural',
        english: 'I make time for English every single day.',
        bangla: 'আমি প্রতিদিন নিশ্চিতভাবে ইংরেজির জন্য সময় বের করি।',
        explanation: 'দৃঢ় সংকল্প ও অগ্রাধিকার বোঝায়।',
      },
      {
        type: 'Conversational',
        english: 'I do a bit of English practice every day.',
        bangla: 'আমি প্রতিদিন একটু একটু ইংরেজি প্র্যাকটিস করি।',
        explanation: 'সহজ ও অনানুষ্ঠানিক ভাষা।',
      },
      {
        type: 'Alternative',
        english: 'English learning is part of my daily routine.',
        bangla: 'ইংরেজি শেখা আমার দৈনিক রুটিনের অংশ।',
        explanation: 'অভ্যাসটি প্রতিষ্ঠিত তা সুন্দরভাবে প্রকাশ করে।',
      },
      {
        type: 'Formal',
        english: 'I dedicate daily hours to language acquisition.',
        bangla: 'আমি ভাষা অর্জনের জন্য দৈনিক সময় উৎসর্গ করি।',
        explanation: 'একাডেমিক পোর্টফোলিও বা সিভির জন্য উপযোগী।',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I am learn English every day.',
        correct: 'I learn English every day.',
        explanationBangla: 'সাধারণ দৈনন্দিন অভ্যাসের ক্ষেত্রে "am" বসে না, সরাসরি মূল Verb বসে।',
      },
      {
        incorrect: 'He read books every day.',
        correct: 'He reads books every day.',
        explanationBangla: 'Subject (He) 3rd person singular হওয়ায় verb-এ "s" যুক্ত হবে।',
      },
    ],
    challengeVocab: [
      { word: 'learn', bangla: 'শেখা', sampleSentence: 'I learn new words every morning.' },
      { word: 'read', bangla: 'পড়া', sampleSentence: 'I read articles every evening.' },
      { word: 'watch', bangla: 'দেখা', sampleSentence: 'I watch podcasts on YouTube.' },
      { word: 'write', bangla: 'লেখা', sampleSentence: 'I write my thoughts daily.' },
      { word: 'listen', bangla: 'শোনা', sampleSentence: 'I listen to English news.' },
    ],
  },
  {
    id: 'pat-would-like',
    pattern: 'Subject + would like to + Verb (base) + Object',
    formula: 'Subject + would like to + Verb + Object',
    meaningBangla: 'আমি বিনীতভাবে কোনো কিছু করতে চাই / আগ্রহী',
    seedIdeaBangla: 'আমি বিনীতভাবে কিছু বলতে চাই।',
    seedEnglish: 'I would like to say something.',
    difficulty: 'Intermediate',
    category: 'Polite Requests & Workplace Communication',
    breakdown: [
      { part: 'I', bengali: 'আমি', role: 'Subject', isAnchor: true },
      { part: 'would like to', bengali: 'করতে আগ্রহী / চাই (বিনীত)', role: 'Polite Anchor', isAnchor: true },
      { part: 'introduce', bengali: 'পরিচয় করিয়ে দিতে', role: 'Action Verb' },
      { part: 'myself', bengali: 'নিজেকে', role: 'Object' },
    ],
    staysSame: ['Subject + would like to'],
    changes: ['Verb (introduce, ask, clarify, thank, schedule, order, discuss)'],
    examples: [
      { english: 'I would like to introduce myself.', bangla: 'আমি আমার পরিচয় দিতে চাই।', context: 'Meeting' },
      { english: 'I would like to ask a question.', bangla: 'আমি একটি প্রশ্ন করতে চাই।', context: 'Class/Meeting' },
      { english: 'I would like to thank you for your help.', bangla: 'আপনার সাহায্যের জন্য আমি ধন্যবাদ জানাতে চাই।', context: 'Gratitude' },
      { english: 'I would like to schedule a quick meeting.', bangla: 'আমি একটি ছোট মিটিং নির্ধারণ করতে চাই।', context: 'Work' },
      { english: 'I would like to order a cup of coffee.', bangla: 'আমি এক কাপ কফি অর্ডার করতে চাই।', context: 'Cafe' },
    ],
    variations: [
      {
        type: 'Basic',
        english: 'I want to ask something.',
        bangla: 'আমি কিছু জানতে চাই।',
        explanation: 'সাধারণ রূপ। বন্ধুদের সাথে স্বাভাবিক।',
      },
      {
        type: 'Natural',
        english: 'I would like to ask a question, please.',
        bangla: 'আমি কি একটি প্রশ্ন করতে পারি?',
        explanation: 'অফিস ও ভদ্র সমাজে এটিই আদর্শ প্রকাশভঙ্গি।',
      },
      {
        type: 'Conversational',
        english: "Mind if I ask something real quick?",
        bangla: 'আমি চট করে একটা প্রশ্ন করতে পারি কি?',
        explanation: 'সহজ সহকর্মী বা পরিচিতদের সাথে খুব প্রচলিত।',
      },
      {
        type: 'Formal',
        english: 'I wish to request a point of clarification.',
        bangla: 'আমি বিষয়টি আরও স্পষ্ট করার অনুরোধ করতে চাই।',
        explanation: 'অফিসিয়াল কনফারেন্সে প্রচলিত।',
      },
      {
        type: 'Alternative',
        english: 'Could I please ask a question?',
        bangla: 'আমি কি একটি প্রশ্ন করার অনুমতি পেতে পারি?',
        explanation: 'Could ব্যবহার করে অতিরিক্ত বিনয় প্রকাশ।',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'I would like to asking a question.',
        correct: 'I would like to ask a question.',
        explanationBangla: 'would like to এর পর Verb-এর base form (ask) বসে।',
      },
      {
        incorrect: 'I will like to introduce myself.',
        correct: 'I would like to introduce myself.',
        explanationBangla: 'ভদ্র ইচ্ছায় "will like to" নয়, "would like to" ব্যবহৃত হয়।',
      },
    ],
    challengeVocab: [
      { word: 'introduce', bangla: 'পরিচয় দেওয়া', sampleSentence: 'I would like to introduce my colleague.' },
      { word: 'thank', bangla: 'ধন্যবাদ জানানো', sampleSentence: 'I would like to thank everyone.' },
      { word: 'order', bangla: 'অর্ডার করা', sampleSentence: 'I would like to order breakfast.' },
      { word: 'share', bangla: 'শেয়ার করা', sampleSentence: 'I would like to share my screen.' },
      { word: 'clarify', bangla: 'স্পষ্ট করা', sampleSentence: 'I would like to clarify the deadline.' },
    ],
  },
  {
    id: 'pat-time-to',
    pattern: 'It is time to + Verb (base) + Object',
    formula: 'It is time to + Verb + Object',
    meaningBangla: 'এখন কোনো কাজ করার মোক্ষম সময় হয়েছে',
    seedIdeaBangla: 'এখন ইংরেজি অনুশীলন শুরু করার সময়।',
    seedEnglish: 'It is time to start practicing English.',
    difficulty: 'Beginner',
    category: 'Action Triggers & Motivation',
    breakdown: [
      { part: 'It is time to', bengali: 'এখন সময় হয়েছে', role: 'Formula Anchor', isAnchor: true },
      { part: 'start', bengali: 'শুরু করার', role: 'Action Verb' },
      { part: 'practicing English', bengali: 'ইংরেজি চর্চা', role: 'Gerund & Object' },
    ],
    staysSame: ['It is time to'],
    changes: ['Verb (start, learn, change, speak, take, review, leave)'],
    examples: [
      { english: 'It is time to learn something new.', bangla: 'এখন নতুন কিছু শেখার সময়।', context: 'Growth' },
      { english: 'It is time to improve our skills.', bangla: 'এখন আমাদের দক্ষতা বাড়ানোর সময়।', context: 'Career' },
      { english: 'It is time to speak without hesitation.', bangla: 'এখন দ্বিধা ছেড়ে কথা বলার সময়।', context: 'Speaking' },
      { english: 'It is time to take action.', bangla: 'এখন পদক্ষেপ নেওয়ার সময়।', context: 'Motivation' },
      { english: 'It is time to review today’s vocabulary.', bangla: 'এখন আজকের শব্দগুলো রিভিশন দেওয়ার সময়।', context: 'Study' },
    ],
    variations: [
      {
        type: 'Basic',
        english: 'It is time to study now.',
        bangla: 'এখন পড়ার সময় হয়েছে।',
        explanation: 'সহজ বার্তা।',
      },
      {
        type: 'Natural',
        english: "Time to get down to business.",
        bangla: 'এবার সিরিয়াসভাবে কাজে নামার সময় এসেছে।',
        explanation: 'কৌতুকপূর্ণ কিন্তু দৃঢ় সংকল্প।',
      },
      {
        type: 'Formal',
        english: 'The moment has arrived to initiate the project.',
        bangla: 'প্রকল্পটি চালু করার উপযুক্ত মুহূর্ত উপনীত হয়েছে।',
        explanation: 'উচ্চমার্গীয় আনুষ্ঠানিক বার্তা।',
      },
      {
        type: 'Conversational',
        english: 'Alright, time to practice!',
        bangla: 'চলো, এবার অনুশীলনে ঝাঁপিয়ে পড়া যাক!',
        explanation: 'উদ্যম সৃষ্টিকারী বন্ধুত্বপূর্ণ সুর।',
      },
      {
        type: 'Alternative',
        english: 'High time we improved our English.',
        bangla: 'আমাদের ইংরেজি উন্নত করার উপযুক্ত সময় পেরিয়ে যাচ্ছে (এখনই করা উচিত)।',
        explanation: '"It is high time"-এর পর Past form বসে।',
      },
    ],
    commonMistakes: [
      {
        incorrect: 'It is time to learning.',
        correct: 'It is time to learn.',
        explanationBangla: 'to-এর পর base verb বসবে।',
      },
    ],
    challengeVocab: [
      { word: 'learn', bangla: 'শেখা', sampleSentence: 'It is time to learn grammar.' },
      { word: 'practice', bangla: 'চর্চা করা', sampleSentence: 'It is time to practice English.' },
      { word: 'speak', bangla: 'কথা বলা', sampleSentence: 'It is time to speak out.' },
      { word: 'rest', bangla: 'বিশ্রাম নেওয়া', sampleSentence: 'It is time to take a break.' },
    ],
  },
  {
    id: 'pat-dont-forget',
    pattern: "Don't forget to + Verb (base) + Object",
    formula: "Don't forget to + Verb + Object",
    meaningBangla: 'কোনো কাজ করতে ভুলে যাবেন না (জরুরি স্মারক)',
    seedIdeaBangla: 'আজকে ইংরেজি চর্চা করতে ভুলে যাবেন না।',
    seedEnglish: "Don't forget to practice English today.",
    difficulty: 'Beginner',
    category: 'Reminders & Advice',
    breakdown: [
      { part: "Don't forget to", bengali: 'ভুলে যাবেন না', role: 'Imperative Anchor', isAnchor: true },
      { part: 'practice', bengali: 'অনুশীলন করতে', role: 'Action Verb' },
      { part: 'English', bengali: 'ইংরেজি', role: 'Object' },
      { part: 'today', bengali: 'আজকে', role: 'Time' },
    ],
    staysSame: ["Don't forget to"],
    changes: ['Verb (practice, review, save, speak, attend, bring, submit)'],
    examples: [
      { english: "Don't forget to practice today.", bangla: 'আজ অনুশীলন করতে ভুলবেন না।', context: 'Habit' },
      { english: "Don't forget to review new words.", bangla: 'নতুন শব্দগুলো দেখতে ভুলবেন না।', context: 'Vocab' },
      { english: "Don't forget to speak aloud.", bangla: 'জোরে উচ্চারণ করে বলতে ভুলবেন না।', context: 'Pronunciation' },
      { english: "Don't forget to lock the door.", bangla: 'দরজায় তালা দিতে ভুলবেন না।', context: 'Daily' },
      { english: "Don't forget to send the attachment.", bangla: 'ফাইলটি এটাচ করে পাঠাতে ভুলবেন না।', context: 'Email' },
    ],
    variations: [
      {
        type: 'Basic',
        english: "Don't forget to practice.",
        bangla: 'অনুশীলন করতে ভুলবেন না।',
        explanation: 'সহজ আদেশ বা অনুরোধ।',
      },
      {
        type: 'Natural',
        english: 'Make sure you practice today.',
        bangla: 'আজ যেন অবশ্যই প্র্যাকটিস করা হয়।',
        explanation: '"Make sure" ব্যবহার অত্যন্ত আধুনিক ও সাবলীল।',
      },
      {
        type: 'Conversational',
        english: 'Remember to practice, okay?',
        bangla: 'প্র্যাকটিস করার কথা মনে রেখো কিন্তু, কেমন?',
        explanation: 'বন্ধুত্বপূর্ণ ও স্নেহশীল স্মারক।',
      },
      {
        type: 'Formal',
        english: 'Please ensure timely submission of the assignment.',
        bangla: 'অনুগ্রহ করে নির্ধারিত সময়ে অ্যাসাইনমেন্ট জমা নিশ্চিত করুন।',
        explanation: 'অফিসিয়াল নোটিশ বা ইমেলের ভাষা।',
      },
      {
        type: 'Alternative',
        english: 'Keep in mind that daily practice is vital.',
        bangla: 'মনে রাখবেন, দৈনিক চর্চাই মূল চাবিকাঠি।',
        explanation: 'নীতিবাক্য বা সারকথা হিসেবে ব্যবহৃত।',
      },
    ],
    commonMistakes: [
      {
        incorrect: "Don't forget to practicing.",
        correct: "Don't forget to practice.",
        explanationBangla: 'to-এর পর সর্বদা Verb-এর base form বসে।',
      },
    ],
    challengeVocab: [
      { word: 'practice', bangla: 'অনুশীলন করা', sampleSentence: "Don't forget to practice speaking." },
      { word: 'review', bangla: 'রিভিশন দেওয়া', sampleSentence: "Don't forget to review the notes." },
      { word: 'call', bangla: 'কল করা', sampleSentence: "Don't forget to call your mom." },
      { word: 'send', bangla: 'পাঠানো', sampleSentence: "Don't forget to send the email." },
    ],
  },
];

// ============================================================================
// 2. WORD FAMILIES & WORD NETWORKS (Root -> Verb, Noun, Adj, Adv, Network)
// ============================================================================

export const CORE_WORD_FAMILIES: WordFamilyItem[] = [
  {
    id: 'fam-improve',
    rootWord: 'Improve',
    banglaMeaning: 'উন্নতি করা / উন্নত করা',
    ipa: '/ɪmˈpruːv/',
    pronunciationBangla: 'ইম্প্রুভ',
    verb: {
      word: 'improve',
      bangla: 'উন্নতি করা (ক্রিয়া)',
      example: 'I want to improve my English speaking skills.',
      exampleBangla: 'আমি আমার ইংরেজি বলার দক্ষতা উন্নত করতে চাই।',
    },
    noun: {
      word: 'improvement',
      bangla: 'উন্নতি / অগ্রগতি (বিশেষ্য)',
      example: 'I can see a noticeable improvement in your fluency.',
      exampleBangla: 'আমি তোমার সাবলীলতায় লক্ষণীয় উন্নতি দেখতে পাচ্ছি।',
    },
    adjective: {
      word: 'improved',
      bangla: 'উন্নত / পরিবর্তিত (বিশেষণ)',
      example: 'His improved pronunciation gives him immense confidence.',
      exampleBangla: 'তার উন্নত উচ্চারণ তাকে অগাধ আত্মবিশ্বাস এনে দিয়েছে।',
    },
    relatedWords: [
      { word: 'enhance', bangla: 'বৃদ্ধি করা / উৎকর্ষ বাড়ানো', relation: 'synonym' },
      { word: 'develop', bangla: 'বিকাশ লাভ করা', relation: 'synonym' },
      { word: 'progress', bangla: 'অগ্রগতি হওয়া', relation: 'synonym' },
      { word: 'worsen', bangla: 'অবনতি হওয়া / খারাপ হওয়া', relation: 'antonym' },
      { word: 'fluency', bangla: 'সাবলীলতা', relation: 'collocation' },
    ],
    sentencesByLevel: {
      beginner: {
        english: 'Daily practice helps you improve.',
        bangla: 'দৈনিক অনুশীলন আপনাকে উন্নতি করতে সাহায্য করে।',
      },
      intermediate: {
        english: 'Consistent conversation practice will noticeably improve your pronunciation.',
        bangla: 'নিয়মিত কথোপকথন চর্চা আপনার উচ্চারণ লক্ষণীয়ভাবে উন্নত করবে।',
      },
      advanced: {
        english: 'The institute adopted interactive methodologies to systematically improve student fluency.',
        bangla: 'শিক্ষার্থীদের সাবলীলতা পদ্ধতিগতভাবে উন্নত করতে প্রতিষ্ঠানটি ইন্টারঅ্যাক্টিভ পদ্ধতি গ্রহণ করেছে।',
      },
    },
    discoveryChain: [
      'Improve (উন্নতি করা)',
      'Improvement (উন্নতি)',
      'Improved (উন্নত)',
      'Improve your English (তোমার ইংরেজি উন্নত করো)',
      'Improve your speaking (তোমার কথা বলা উন্নত করো)',
      'Make an improvement (একটি উন্নতি সাধন করা)',
      'Continuous improvement (ক্রমাগত উৎকর্ষ)',
    ],
    networkNodes: [
      { id: 'n-root', label: 'IMPROVE', type: 'root', bangla: 'মূল শব্দ (উন্নতি করা)' },
      { id: 'n-noun', label: 'Improvement', type: 'noun', bangla: 'উন্নতি / অগ্রগতি (Noun)' },
      { id: 'n-adj', label: 'Improved', type: 'adjective', bangla: 'উন্নত অবস্থা (Adjective)' },
      { id: 'n-syn1', label: 'Enhance', type: 'synonym', bangla: 'মান বাড়ানো (Synonym)' },
      { id: 'n-syn2', label: 'Develop', type: 'synonym', bangla: 'বিকাশ ঘটানো (Synonym)' },
      { id: 'n-syn3', label: 'Progress', type: 'synonym', bangla: 'এগিয়ে যাওয়া (Synonym)' },
      { id: 'n-coll1', label: 'Fluency', type: 'collocation', bangla: 'সাবলীলতা (কোলকেশন)' },
      { id: 'n-coll2', label: 'Skills', type: 'collocation', bangla: 'দক্ষতা (কোলকেশন)' },
    ],
  },
  {
    id: 'fam-learn',
    rootWord: 'Learn',
    banglaMeaning: 'শেখা / জ্ঞান লাভ করা',
    ipa: '/lɜːn/',
    pronunciationBangla: 'লার্ন',
    verb: {
      word: 'learn',
      bangla: 'শেখা (ক্রিয়া)',
      example: 'I learn new English words every morning.',
      exampleBangla: 'আমি প্রতিদিন সকালে নতুন ইংরেজি শব্দ শিখি।',
    },
    noun: {
      word: 'learner',
      bangla: 'শিক্ষার্থী / যে শেখে (বিশেষ্য)',
      example: 'She is an enthusiastic and curious language learner.',
      exampleBangla: 'সে একজন উৎসাহী এবং কৌতুহলী ভাষা শিক্ষার্থী।',
    },
    adjective: {
      word: 'learned',
      bangla: 'পণ্ডিত / বিদ্বান (বিশেষণ)',
      example: 'He gave a learned lecture on sentence structures.',
      exampleBangla: 'তিনি বাক্য কাঠামোর ওপর এক পাণ্ডিত্যপূর্ণ বক্তব্য দিয়েছেন।',
    },
    relatedWords: [
      { word: 'study', bangla: 'অধ্যয়ন করা', relation: 'synonym' },
      { word: 'acquire', bangla: 'অর্জন করা', relation: 'synonym' },
      { word: 'understand', bangla: 'উপলব্ধি করা', relation: 'synonym' },
      { word: 'forget', bangla: 'ভুলে যাওয়া', relation: 'antonym' },
      { word: 'knowledge', bangla: 'জ্ঞান', relation: 'connected' },
    ],
    sentencesByLevel: {
      beginner: {
        english: 'I learn English every day.',
        bangla: 'আমি প্রতিদিন ইংরেজি শিখি।',
      },
      intermediate: {
        english: 'Active learners acquire vocabulary through real sentence usage.',
        bangla: 'সক্রিয় শিক্ষার্থীরা বাস্তব বাক্যে প্রয়োগের মাধ্যমে শব্দভাণ্ডার অর্জন করে।',
      },
      advanced: {
        english: 'Lifelong learning enables professionals to thrive amid dynamic global industries.',
        bangla: 'আজীবন শিক্ষার মানসিকতা পেশাজীবীদের পরিবর্তনশীল বিশ্ব শিল্পে সফল হতে সহায়তা করে।',
      },
    },
    discoveryChain: [
      'Learn (শেখা)',
      'Learner (শিক্ষার্থী)',
      'Learning (শেখার প্রক্রিয়া)',
      'Learned (পণ্ডিত/অর্জিত)',
      'Learn by doing (করে করে শেখা)',
      'Learn from mistakes (ভুল থেকে শিক্ষা নেওয়া)',
      'Lifelong learner (আজীবন শিক্ষার্থী)',
    ],
    networkNodes: [
      { id: 'nl-root', label: 'LEARN', type: 'root', bangla: 'শেখা (মূল Verb)' },
      { id: 'nl-noun', label: 'Learner', type: 'noun', bangla: 'শিক্ষার্থী (Noun)' },
      { id: 'nl-gerund', label: 'Learning', type: 'noun', bangla: 'শেখার প্রক্রিয়া' },
      { id: 'nl-adj', label: 'Learned', type: 'adjective', bangla: 'বিদ্বান (Adjective)' },
      { id: 'nl-syn1', label: 'Study', type: 'synonym', bangla: 'পড়াশোনা করা' },
      { id: 'nl-syn2', label: 'Acquire', type: 'synonym', bangla: 'অর্জন করা' },
      { id: 'nl-syn3', label: 'Master', type: 'synonym', bangla: 'আয়ত্তে আনা' },
      { id: 'nl-coll', label: 'Knowledge', type: 'collocation', bangla: 'জ্ঞান' },
    ],
  },
  {
    id: 'fam-practice',
    rootWord: 'Practice',
    banglaMeaning: 'অনুশীলন / চর্চা করা',
    ipa: '/ˈpræk.tɪs/',
    pronunciationBangla: 'প্র্যাকটিস',
    verb: {
      word: 'practice',
      bangla: 'অনুশীলন করা (ক্রিয়া)',
      example: 'I practice speaking English with AI every evening.',
      exampleBangla: 'আমি প্রতিদিন সন্ধ্যায় এআই-এর সাথে ইংরেজি কথা বলা অনুশীলন করি।',
    },
    noun: {
      word: 'practice',
      bangla: 'অনুশীলন / রেওয়াজ (বিশেষ্য)',
      example: 'Daily practice builds natural speaking habits.',
      exampleBangla: 'দৈনিক অনুশীলন স্বাভাবিক কথা বলার অভ্যাস গড়ে তোলে।',
    },
    adjective: {
      word: 'practical',
      bangla: 'বাস্তবসম্মত / প্রায়োগিক (বিশেষণ)',
      example: 'Focus on practical sentences you can use immediately.',
      exampleBangla: 'যে বাক্যগুলো এখনই ব্যবহার করতে পারবেন এমন বাস্তবসম্মত বাক্যে জোর দিন।',
    },
    adverb: {
      word: 'practically',
      bangla: 'কার্যত / প্রায় পুরোপুরি (ক্রিয়াবিশেষণ)',
      example: 'She practically speaks without any hesitation now.',
      exampleBangla: 'সে এখন কার্যত কোনো রকম দ্বিধা ছাড়াই কথা বলে।',
    },
    relatedWords: [
      { word: 'rehearse', bangla: 'মহড়া দেওয়া', relation: 'synonym' },
      { word: 'train', bangla: 'প্রশিক্ষণ নেওয়া', relation: 'synonym' },
      { word: 'exercise', bangla: 'চর্চা করা', relation: 'synonym' },
      { word: 'neglect', bangla: 'উপেক্ষা করা / অবহেলা করা', relation: 'antonym' },
      { word: 'daily habit', bangla: 'দৈনিক অভ্যাস', relation: 'collocation' },
    ],
    sentencesByLevel: {
      beginner: {
        english: 'Practice speaking English every day.',
        bangla: 'প্রতিদিন ইংরেজি কথা বলা চর্চা করুন।',
      },
      intermediate: {
        english: 'Practical language exercises make grammar rules intuitive and easy.',
        bangla: 'বাস্তবসম্মত ভাষা অনুশীলন ব্যাকরণের নিয়মগুলোকে সহজ ও স্বাভাবিক করে তোলে।',
      },
      advanced: {
        english: 'Deliberate practice with immediate feedback is the cornerstone of speaking mastery.',
        bangla: 'তাৎক্ষণিক ফিডব্যাকসহ সুনির্দিষ্ট অনুশীলনই সাবলীলতার চূড়ান্ত ভিত্তি।',
      },
    },
    discoveryChain: [
      'Practice (চর্চা করা)',
      'Practicing (চর্চারত)',
      'Practical (বাস্তবমুখী)',
      'Practically (কার্যত)',
      'Practice makes perfect (অনুশীলনে সাফল্য আসে)',
      'Daily practice routine (দৈনিক অনুশীলনের রুটিন)',
    ],
    networkNodes: [
      { id: 'np-root', label: 'PRACTICE', type: 'root', bangla: 'চর্চা করা (Root)' },
      { id: 'np-noun', label: 'Practice', type: 'noun', bangla: 'অনুশীলন (Noun)' },
      { id: 'np-adj', label: 'Practical', type: 'adjective', bangla: 'বাস্তবসম্মত (Adj)' },
      { id: 'np-adv', label: 'Practically', type: 'adverb', bangla: 'কার্যত (Adverb)' },
      { id: 'np-syn1', label: 'Rehearse', type: 'synonym', bangla: 'মহড়া দেওয়া' },
      { id: 'np-syn2', label: 'Train', type: 'synonym', bangla: 'প্রশিক্ষণ' },
      { id: 'np-coll1', label: 'Consistency', type: 'collocation', bangla: 'ধারাবাহিকতা' },
    ],
  },
  {
    id: 'fam-confident',
    rootWord: 'Confident',
    banglaMeaning: 'আত্মবিশ্বাসী / নিঃসংশয়',
    ipa: '/ˈkɒn.fɪ.dənt/',
    pronunciationBangla: 'কনফিডেন্ট',
    adjective: {
      word: 'confident',
      bangla: 'আত্মবিশ্বাসী (বিশেষণ)',
      example: 'I feel confident speaking in client meetings.',
      exampleBangla: 'ক্লায়েন্ট মিটিংয়ে কথা বলতে আমি আত্মবিশ্বাসী বোধ করি।',
    },
    noun: {
      word: 'confidence',
      bangla: 'আত্মবিশ্বাস / ভরসা (বিশেষ্য)',
      example: 'Daily practice boosts your speaking confidence.',
      exampleBangla: 'প্রতিদিনের অনুশীলন আপনার কথা বলার আত্মবিশ্বাস বাড়ায়।',
    },
    adverb: {
      word: 'confidently',
      bangla: 'আত্মবিশ্বাসের সাথে (ক্রিয়াবিশেষণ)',
      example: 'She answered every question confidently.',
      exampleBangla: 'সে প্রতিটি প্রশ্নের উত্তর আত্মবিশ্বাসের সাথে দিয়েছিল।',
    },
    relatedWords: [
      { word: 'self-assured', bangla: 'নিজের প্রতি আস্থাবান', relation: 'synonym' },
      { word: 'bold', bangla: 'সাহসী / নির্ভীক', relation: 'synonym' },
      { word: 'hesitant', bangla: 'দ্বিধাগ্রস্ত', relation: 'antonym' },
      { word: 'doubtful', bangla: 'সংশয়ী', relation: 'antonym' },
      { word: 'boost', bangla: 'বৃদ্ধি করা', relation: 'collocation' },
    ],
    sentencesByLevel: {
      beginner: {
        english: 'Be confident when you speak.',
        bangla: 'কথা বলার সময় আত্মবিশ্বাসী হোন।',
      },
      intermediate: {
        english: 'Building sentences from patterns builds real confidence.',
        bangla: 'প্যাটার্ন থেকে বাক্য তৈরি করা আসল আত্মবিশ্বাস গড়ে তোলে।',
      },
      advanced: {
        english: 'She presented the quarterly strategy confidently before the international board.',
        bangla: 'তিনি আন্তর্জাতিক বোর্ডের সামনে ত্রৈমাসিক কৌশল আত্মবিশ্বাসের সাথে উপস্থাপন করেছিলেন।',
      },
    },
    discoveryChain: [
      'Confident (আত্মবিশ্বাসী)',
      'Confidence (আত্মবিশ্বাস)',
      'Confidently (আত্মবিশ্বাসের সাথে)',
      'Build confidence (আত্মবিশ্বাস গড়ে তোলা)',
      'Boost speaking confidence (কথা বলার আত্মবিশ্বাস বাড়ানো)',
    ],
    networkNodes: [
      { id: 'nc-root', label: 'CONFIDENT', type: 'root', bangla: 'আত্মবিশ্বাসী (Adjective)' },
      { id: 'nc-noun', label: 'Confidence', type: 'noun', bangla: 'আত্মবিশ্বাস (Noun)' },
      { id: 'nc-adv', label: 'Confidently', type: 'adverb', bangla: 'আত্মবিশ্বাসের সাথে (Adverb)' },
      { id: 'nc-syn1', label: 'Self-assured', type: 'synonym', bangla: 'আস্থাবান' },
      { id: 'nc-syn2', label: 'Bold', type: 'synonym', bangla: 'সাহসী' },
      { id: 'nc-coll', label: 'Boost', type: 'collocation', bangla: 'বৃদ্ধি করা' },
    ],
  },
];

// ============================================================================
// 3. SENTENCE TRANSFORMATIONS (7 Forms from One Idea)
// ============================================================================

export const SENTENCE_TRANSFORMATIONS: SentenceTransformationSet[] = [
  {
    id: 'trans-learn',
    baseSentence: 'I learn English.',
    baseBangla: 'আমি ইংরেজি শিখি।',
    transformations: {
      positive: {
        english: 'I learn English.',
        bangla: 'আমি ইংরেজি শিখি। (হ্যাঁ-বোধক)',
        formula: 'Subject + Verb (V1) + Object',
        ruleBangla: 'সাধারণ বর্তমানকালের মূল রূপ। সরাসরি Subject-এর পর মূল Verb বসে।',
      },
      negative: {
        english: 'I do not learn English.',
        bangla: 'আমি ইংরেজি শিখি না। (না-বোধক)',
        formula: 'Subject + do not / does not + Verb (base) + Object',
        ruleBangla: 'Present Simple-এ না-বোধক করতে do not (বা He/She-এর ক্ষেত্রে does not) যুক্ত হয়।',
      },
      question: {
        english: 'Do I learn English?',
        bangla: 'আমি কি ইংরেজি শিখি? (প্রশ্নবোধক)',
        formula: 'Do / Does + Subject + Verb (base) + Object?',
        ruleBangla: 'প্রশ্ন করার জন্য বাক্যের শুরুতে Do বা Does নিয়ে আসতে হয়।',
      },
      past: {
        english: 'I learned English.',
        bangla: 'আমি ইংরেজি শিখেছিলাম। (অতীত কাল)',
        formula: 'Subject + Past Form (V2) + Object',
        ruleBangla: 'অতীতের সাধারণ ঘটনার জন্য Verb-এর Past রূপ (learned) বসে।',
      },
      future: {
        english: 'I will learn English.',
        bangla: 'আমি ইংরেজি শিখব। (ভবিষ্যৎ কাল)',
        formula: 'Subject + will + Verb (base) + Object',
        ruleBangla: 'ভবিষ্যতের ইচ্ছায় Subject-এর পর "will" এবং মূল Verb বসে।',
      },
      continuous: {
        english: 'I am learning English.',
        bangla: 'আমি ইংরেজি শিখছি। (চলমান বর্তমান)',
        formula: 'Subject + am/is/are + Verb-ing + Object',
        ruleBangla: 'বর্তমান চোখের সামনে বা এই মুহূর্তে কাজ চলছে বোঝাতে am/is/are + verb-ing হয়।',
      },
      perfect: {
        english: 'I have learned English.',
        bangla: 'আমি ইংরেজি শিখেছি। (পুরাঘটিত বর্তমান)',
        formula: 'Subject + have/has + Past Participle (V3) + Object',
        ruleBangla: 'কাজটি সম্পন্ন হয়েছে কিন্তু ফলাফল বা অভিজ্ঞতা বিদ্যমান বোঝাতে have/has + V3 বসে।',
      },
    },
  },
  {
    id: 'trans-read',
    baseSentence: 'She reads books.',
    baseBangla: 'সে বই পড়ে।',
    transformations: {
      positive: {
        english: 'She reads books.',
        bangla: 'সে বই পড়ে।',
        formula: 'Subject + Verb-s + Object',
        ruleBangla: 'She হলো 3rd person singular, তাই read-এর সাথে "s" যুক্ত হয়েছে।',
      },
      negative: {
        english: 'She does not read books.',
        bangla: 'সে বই পড়ে না।',
        formula: 'Subject + does not + Verb (base) + Object',
        ruleBangla: 'Negative-এ "does not" আসার কারণে read-এর সাথে আর "s" বসে না।',
      },
      question: {
        english: 'Does she read books?',
        bangla: 'সে কি বই পড়ে?',
        formula: 'Does + Subject + Verb (base) + Object?',
        ruleBangla: 'প্রশ্নবোধক বাক্যের শুরুতে "Does" আসে।',
      },
      past: {
        english: 'She read books.',
        bangla: 'সে বই পড়েছিল।',
        formula: 'Subject + V2 (read - উচ্চারিত হয় রেড) + Object',
        ruleBangla: 'read-এর Past রূপের বানান একই (read) কিন্তু উচ্চারণ হয় "রেড"।',
      },
      future: {
        english: 'She will read books.',
        bangla: 'সে বই পড়বে।',
        formula: 'Subject + will + Verb + Object',
        ruleBangla: 'ভবিষ্যতে "will read" বসে।',
      },
      continuous: {
        english: 'She is reading books.',
        bangla: 'সে বই পড়ছে।',
        formula: 'Subject + is + Verb-ing + Object',
        ruleBangla: 'She-এর পর "is" এবং মূল verb-এ "-ing" যুক্ত হয়েছে।',
      },
      perfect: {
        english: 'She has read books.',
        bangla: 'সে বই পড়েছে।',
        formula: 'Subject + has + V3 + Object',
        ruleBangla: 'She-এর সাথে "has" এবং V3 রূপ বসে।',
      },
    },
  },
  {
    id: 'trans-practice',
    baseSentence: 'We practice speaking.',
    baseBangla: 'আমরা কথা বলা অনুশীলন করি।',
    transformations: {
      positive: {
        english: 'We practice speaking.',
        bangla: 'আমরা কথা বলা অনুশীলন করি।',
        formula: 'Subject + Verb + Object',
        ruleBangla: 'We বহুবচন হওয়ায় Verb-এর স্বাভাবিক রূপ বসেছে।',
      },
      negative: {
        english: 'We do not practice speaking.',
        bangla: 'আমরা কথা বলা অনুশীলন করি না।',
        formula: 'Subject + do not + Verb + Object',
        ruleBangla: 'We-এর সাথে "do not" বসে।',
      },
      question: {
        english: 'Do we practice speaking?',
        bangla: 'আমরা কি কথা বলা অনুশীলন করি?',
        formula: 'Do + Subject + Verb + Object?',
        ruleBangla: 'শুরুতে "Do" এসেছে।',
      },
      past: {
        english: 'We practiced speaking.',
        bangla: 'আমরা কথা বলা অনুশীলন করেছিলাম।',
        formula: 'Subject + V2 (practiced) + Object',
        ruleBangla: 'অতীতকালের জন্য "-ed" যুক্ত হয়ে practiced হয়েছে।',
      },
      future: {
        english: 'We will practice speaking.',
        bangla: 'আমরা কথা বলা অনুশীলন করব।',
        formula: 'Subject + will + Verb + Object',
        ruleBangla: 'ভবিষ্যতের জন্য will + practice।',
      },
      continuous: {
        english: 'We are practicing speaking.',
        bangla: 'আমরা কথা বলা অনুশীলন করছি।',
        formula: 'Subject + are + Verb-ing + Object',
        ruleBangla: 'We-এর সাথে be-verb হিসেবে "are" বসেছে।',
      },
      perfect: {
        english: 'We have practiced speaking.',
        bangla: 'আমরা কথা বলা অনুশীলন করেছি।',
        formula: 'Subject + have + V3 + Object',
        ruleBangla: 'We-এর সাথে have + practiced বসেছে।',
      },
    },
  },
];

// ============================================================================
// 4. SITUATIONAL VOCABULARY IN CONTEXT (Office, Travel, Daily Routine, etc.)
// ============================================================================

export const SITUATIONAL_VOCAB_CONTEXTS: SituationalVocabContext[] = [
  {
    id: 'sit-office',
    situation: 'Office & Workplace Communication',
    situationBangla: 'অফিস ও কর্মক্ষেত্র',
    descriptionBangla: 'মিটিং, ইমেল, প্রজেক্ট আপডেট এবং সহকর্মীদের সাথে কথা বলার প্রয়োজনীয় শব্দ ও বাক্য।',
    iconName: 'Briefcase',
    words: [
      {
        word: 'Meeting',
        bangla: 'সভা / বৈঠক',
        partOfSpeech: 'noun',
        example: 'We have a quick team meeting at 10 AM.',
        exampleBangla: 'সকাল ১০টায় আমাদের একটি সংক্ষিপ্ত টিম মিটিং আছে।',
      },
      {
        word: 'Deadline',
        bangla: 'কাজের শেষ সময়সীমা',
        partOfSpeech: 'noun',
        example: 'Can we finish this report before the deadline?',
        exampleBangla: 'আমরা কি শেষ সময়সীমার আগেই এই রিপোর্টটি শেষ করতে পারি?',
      },
      {
        word: 'Schedule',
        bangla: 'সময়সূচী নির্ধারণ করা / রুটিন',
        partOfSpeech: 'noun / verb',
        example: 'Let me check my schedule for tomorrow morning.',
        exampleBangla: 'কাল সকালের জন্য আমার শিডিউলটি একবার দেখে নিই।',
      },
      {
        word: 'Update',
        bangla: 'হালনাগাদ তথ্য জানানো',
        partOfSpeech: 'verb / noun',
        example: 'I will update the manager by the end of today.',
        exampleBangla: 'আমি আজকের মধ্যেই ম্যানেজারকে আপডেট জানিয়ে দেব।',
      },
      {
        word: 'Presentation',
        bangla: 'উপস্থাপন / প্রেজেন্টেশন',
        partOfSpeech: 'noun',
        example: 'She delivered an outstanding presentation to the client.',
        exampleBangla: 'তিনি ক্লায়েন্টের সামনে একটি অসাধারণ প্রেজেন্টেশন দিয়েছেন।',
      },
      {
        word: 'Collaborate',
        bangla: 'একসাথে মিলে কাজ করা',
        partOfSpeech: 'verb',
        example: 'We need to collaborate closely with the design team.',
        exampleBangla: 'আমাদের ডিজাইন টিমের সাথে ঘনিষ্ঠভাবে সহযোগিতা করে কাজ করতে হবে।',
      },
    ],
  },
  {
    id: 'sit-travel',
    situation: 'Travel & Airport',
    situationBangla: 'ভ্রমণ ও বিমানবন্দর',
    descriptionBangla: 'বিমানবন্দর, টিকিট বুকিং, লাগেজ সংগ্রহ ও দিকনির্দেশনা চাওয়ার জরুরি ভাষা।',
    iconName: 'Plane',
    words: [
      {
        word: 'Boarding',
        bangla: 'বিমানে ওঠার প্রক্রিয়া',
        partOfSpeech: 'noun',
        example: 'Boarding begins in fifteen minutes at Gate 4.',
        exampleBangla: 'গেট ৪-এ পনেরো মিনিটের মধ্যে বিমানে ওঠা শুরু হবে।',
      },
      {
        word: 'Luggage',
        bangla: 'যাত্রীর মালামাল / লাগেজ',
        partOfSpeech: 'noun',
        example: 'Where can I collect my checked luggage?',
        exampleBangla: 'আমি আমার বুকিং করা লাগেজ কোথায় সংগ্রহ করব?',
      },
      {
        word: 'Delay',
        bangla: 'দেরি / বিলম্ব হওয়া',
        partOfSpeech: 'noun / verb',
        example: 'The flight was delayed due to bad weather.',
        exampleBangla: 'খারাপ আবহাওয়ার কারণে ফ্লাইটটি বিলম্বিত হয়েছিল।',
      },
      {
        word: 'Departure',
        bangla: 'প্রস্থান / রওনা হওয়া',
        partOfSpeech: 'noun',
        example: 'Please check the departure board for gate changes.',
        exampleBangla: 'গেট পরিবর্তনের জন্য অনুগ্রহ করে প্রস্থান বোর্ডটি দেখুন।',
      },
      {
        word: 'Passport',
        bangla: 'পাসপোর্ট / ছাড়পত্র',
        partOfSpeech: 'noun',
        example: 'Keep your passport and boarding pass ready.',
        exampleBangla: 'আপনার পাসপোর্ট এবং বোর্ডিং পাস প্রস্তুত রাখুন।',
      },
    ],
  },
  {
    id: 'sit-routine',
    situation: 'Daily Routine & Life',
    situationBangla: 'দৈনন্দিন রুটিন ও জীবন',
    descriptionBangla: 'সকালে ওঠা, খাওয়া-দাওয়া, যাতায়াত এবং পারিবারিক জীবনের স্বাভাবিক বাক্য।',
    iconName: 'Sun',
    words: [
      {
        word: 'Wake up',
        bangla: 'ঘুম থেকে ওঠা',
        partOfSpeech: 'phrasal verb',
        example: 'I wake up at 6:30 AM every morning.',
        exampleBangla: 'আমি প্রতিদিন সকাল সাড়ে ৬টায় ঘুম থেকে উঠি।',
      },
      {
        word: 'Commute',
        bangla: 'কর্মস্থলে যাতায়াত করা',
        partOfSpeech: 'verb / noun',
        example: 'My daily commute takes about forty minutes by metro.',
        exampleBangla: 'মেট্রোরেলে আমার দৈনিক যাতায়াতে প্রায় চল্লিশ মিনিট সময় লাগে।',
      },
      {
        word: 'Prepare',
        bangla: 'প্রস্তুত করা',
        partOfSpeech: 'verb',
        example: 'I prepare a healthy breakfast before leaving.',
        exampleBangla: 'বের হওয়ার আগে আমি একটি স্বাস্থ্যকর নাস্তা তৈরি করি।',
      },
      {
        word: 'Relax',
        bangla: 'বিশ্রাম নেওয়া / শান্ত হওয়া',
        partOfSpeech: 'verb',
        example: 'In the evening, I relax by reading English stories.',
        exampleBangla: 'সন্ধ্যায় আমি ইংরেজি গল্প পড়ে বিশ্রাম নিই।',
      },
    ],
  },
  {
    id: 'sit-interview',
    situation: 'Job Interview & Career',
    situationBangla: 'চাকরির ইন্টারভিউ ও ক্যারিয়ার',
    descriptionBangla: 'নিজের অভিজ্ঞতা, শক্তি, ভবিষ্যৎ লক্ষ্য এবং ইন্টারভিউতে প্রভাব বিস্তারকারী শব্দ।',
    iconName: 'Award',
    words: [
      {
        word: 'Experience',
        bangla: 'অভিজ্ঞতা',
        partOfSpeech: 'noun',
        example: 'I have three years of experience in project coordination.',
        exampleBangla: 'প্রজেক্ট সমন্বয়ে আমার তিন বছরের অভিজ্ঞতা আছে।',
      },
      {
        word: 'Strengths',
        bangla: 'ব্যক্তিগত শক্তি ও গুণাবলী',
        partOfSpeech: 'noun',
        example: 'My greatest strengths are problem-solving and teamwork.',
        exampleBangla: 'আমার সবচেয়ে বড় শক্তি হলো সমস্যা সমাধান এবং দলগতভাবে কাজ করা।',
      },
      {
        word: 'Opportunity',
        bangla: 'সুযোগ',
        partOfSpeech: 'noun',
        example: 'I am excited about the opportunity to contribute to your team.',
        exampleBangla: 'আপনার দলে অবদান রাখার এই সুযোগ পেয়ে আমি আনন্দিত।',
      },
      {
        word: 'Responsibility',
        bangla: 'দায়িত্ব',
        partOfSpeech: 'noun',
        example: 'I take full responsibility for my assigned deliverables.',
        exampleBangla: 'আমাকে অর্পিত কাজের পূর্ণ দায়িত্ব আমি নিজেই গ্রহণ করি।',
      },
    ],
  },
];

// ============================================================================
// 5. COMMON MISTAKE CATALOG (Track & Fix Bengali Learners' Habits)
// ============================================================================

export const COMMON_MISTAKES_CATALOG: CommonMistakeCard[] = [
  {
    id: 'mistake-am-go',
    patternTitle: 'am/is/are + Base Verb Confusion',
    patternTitleBangla: '"am"-এর পর সরাসরি Verb ব্যবহার করা',
    incorrect: 'I am go to office.',
    correct: 'I am going to the office. (বা অভ্যাসে: I go to the office.)',
    grammarRule: 'am/is/are-এর পর Verb-এর সাথে অবশ্যই "-ing" হবে (যদি কাজ চলমান বোঝায়); আর নিয়মিত অভ্যাসে "am" বসবে না, সরাসরি মূল Verb বসবে।',
    explanationBangla: 'বাংলায় "আমি যাই" আর "আমি যাচ্ছি"-র মধ্যে পার্থক্য করার সময় অনেক বাঙালি শিক্ষার্থী "I am go" বলেন। মনে রাখুন: অভ্যাসে "I go", আর এখন চলমান থাকলে "I am going"।',
    drills: [
      {
        question: 'Which sentence correctly expresses a daily habit?',
        questionBangla: 'প্রতিদিনের অভ্যাস বোঝাতে কোন বাক্যটি সঠিক?',
        options: ['I am learn English daily.', 'I learn English daily.', 'I learning English daily.', 'I am learning daily English.'],
        correctIndex: 1,
        explanationBangla: 'অভ্যাসের ক্ষেত্রে "am" বসে না, সরাসরি "I learn" হবে।',
      },
      {
        question: 'Which sentence describes what you are doing right now?',
        questionBangla: 'এই মুহূর্তে কি করছেন বোঝাতে কোনটি সঠিক?',
        options: ['I am write an email.', 'I write email now.', 'I am writing an email.', 'I am written email.'],
        correctIndex: 2,
        explanationBangla: 'এখন চলমান বোঝাতে "am writing" হবে।',
      },
      {
        question: 'Correct the error in: "He is read a newspaper."',
        questionBangla: '"He is read a newspaper" বাক্যের সঠিক রূপ কোনটি?',
        options: ['He reads a newspaper. / He is reading a newspaper.', 'He are read newspaper.', 'He is reads a newspaper.', 'He read a newspaper.'],
        correctIndex: 0,
        explanationBangla: '"is reading" (এখন পড়ছে) অথবা "reads" (নিয়মিত পড়ে)।',
      },
    ],
  },
  {
    id: 'mistake-3rd-person-s',
    patternTitle: '3rd Person Singular "s/es" Omission',
    patternTitleBangla: 'He/She/It-এর পর Verb-এ "s/es" বাদ দেওয়া',
    incorrect: 'He speak English very well.',
    correct: 'He speaks English very well.',
    grammarRule: 'Present Simple টেন্সে Subject যদি 3rd Person Singular (He, She, It, বা কারো নাম) হয়, তবে Verb-এর সাথে অবশ্যই "s" বা "es" যুক্ত করতে হবে।',
    explanationBangla: 'বাংলা ভাষায় কর্তার একবচন-বহুবচনে ক্রিয়ার রূপ বড় পরিবর্তন হয় না, কিন্তু ইংরেজিতে He/She/Name আসলেই Verb-এ "s" দিতেই হবে।',
    drills: [
      {
        question: 'Select the correct sentence:',
        questionBangla: 'সঠিক বাক্যটি চিহ্নিত করুন:',
        options: ['She practice speaking every morning.', 'She practices speaking every morning.', 'She is practice every morning.', 'She practicing every morning.'],
        correctIndex: 1,
        explanationBangla: 'She 3rd person singular হওয়ায় "practices" হবে।',
      },
      {
        question: 'Identify the correct question form:',
        questionBangla: 'সঠিক প্রশ্নবোধক রূপটি নির্বাচন করুন:',
        options: ['Does he works here?', 'Does he work here?', 'Do he work here?', 'Does he working here?'],
        correctIndex: 1,
        explanationBangla: '"Does" এসে গেলে মূল Verb-এ আর "s" বসে না (Does he work)।',
      },
      {
        question: 'My brother _____ in a software company.',
        questionBangla: 'শূন্যস্থানে সঠিক শব্দ বসান:',
        options: ['work', 'works', 'is work', 'working'],
        correctIndex: 1,
        explanationBangla: 'My brother = 3rd person singular, তাই "works"।',
      },
    ],
  },
  {
    id: 'mistake-modal-extra-to',
    patternTitle: 'Modals + "to" or "s/es" Error',
    patternTitleBangla: 'Can/Could/Should-এর পর "to" বা "s" বসানো',
    incorrect: 'She can to speaks English.',
    correct: 'She can speak English.',
    grammarRule: 'Can, Could, Will, Would, Should, Must-এর মতো Modal Auxiliary-এর পর সর্বদা Verb-এর একদম মূল (Base) রূপ বসে। কোনো "to" বা "s/es" বসে না।',
    explanationBangla: 'Modal verb-এর শক্তি এত বেশি যে তার পরবর্তী verb-এ কোনো পরিবর্তন বা অতিরিক্ত preposition (to) গ্রহণ করে না।',
    drills: [
      {
        question: 'Which of the following is correct?',
        questionBangla: 'নিচের কোনটি ব্যাকরণগতভাবে সঠিক?',
        options: ['You should to practice daily.', 'You should practice daily.', 'You should practicing daily.', 'You should practices daily.'],
        correctIndex: 1,
        explanationBangla: 'should-এর পর সরাসরি "practice" বসবে।',
      },
      {
        question: 'Could you please _____ me with this task?',
        questionBangla: 'সঠিক রূপ দিয়ে শূন্যস্থান পূরণ করুন:',
        options: ['help', 'to help', 'helping', 'helped'],
        correctIndex: 0,
        explanationBangla: 'Could-এর পর Verb-এর base form "help" বসে।',
      },
    ],
  },
  {
    id: 'mistake-prepositions-time',
    patternTitle: 'Time Preposition Confusion (at, on, in)',
    patternTitleBangla: 'সময়ের পূর্বে Preposition ব্যবহারে বিভ্রান্তি',
    incorrect: 'I will meet you in Sunday on 8 PM.',
    correct: 'I will meet you on Sunday at 8 PM.',
    grammarRule: 'নির্দিষ্ট ঘণ্টার সময়ের আগে "at" (at 8 PM), বারের আগে "on" (on Sunday), এবং মাস/বছরের আগে "in" (in May, in 2026) বসে। রাতের ক্ষেত্রে "at night" বসে।',
    explanationBangla: 'মনে রাখার সহজ ট্রিক: ঘড়ির সুনির্দিষ্ট সময় = AT; ক্যালেন্ডারের দিন/বার = ON; মাস/বছর/ঋতু = IN।',
    drills: [
      {
        question: 'Our flight departs _____ 9:30 AM _____ Friday.',
        questionBangla: 'সঠিক Preposition জোড়া নির্বাচন করুন:',
        options: ['at, on', 'on, at', 'in, on', 'at, in'],
        correctIndex: 0,
        explanationBangla: 'ঘড়ির সময়ের পূর্বে "at" এবং বারের পূর্বে "on"।',
      },
      {
        question: 'I like to review my lessons _____ night.',
        questionBangla: 'রাতের পূর্বে কোন Preposition বসে?',
        options: ['in', 'on', 'at', 'by'],
        correctIndex: 2,
        explanationBangla: 'রাতের ক্ষেত্রে "at night" বসে (কিন্তু in the morning/evening)।',
      },
    ],
  },
];

// ============================================================================
// 6. TRANSLATION EXERCISES (Bengali -> English with Multiple Natural Accepted Answers)
// ============================================================================

export const TRANSLATION_PRACTICE_ITEMS: TranslationExerciseItem[] = [
  {
    id: 'trans-ex-1',
    bangla: 'আমি প্রতিদিন ইংরেজি অনুশীলন করি।',
    expectedEnglish: 'I practice English every day.',
    naturalAlternatives: [
      'I practice English every day.',
      'I practice English daily.',
      'I practice speaking English every day.',
      'Every day I practice English.',
    ],
    breakdown: [
      { part: 'আমি', english: 'I' },
      { part: 'প্রতিদিন', english: 'every day / daily' },
      { part: 'ইংরেজি', english: 'English' },
      { part: 'অনুশীলন করি', english: 'practice' },
    ],
    grammarTipBangla: 'সাধারণ অভ্যাসের বাক্য। Subject (I) + Verb (practice) + Object (English) + Time (every day)।',
    difficulty: 'Beginner',
  },
  {
    id: 'trans-ex-2',
    bangla: 'দেরি হওয়ার জন্য আমি ক্ষমা চাইছি।',
    expectedEnglish: 'I apologize for being late.',
    naturalAlternatives: [
      'I apologize for being late.',
      'I am sorry for being late.',
      'I apologize for coming late.',
      'Sorry for being late.',
      'I apologize for the delay.',
    ],
    breakdown: [
      { part: 'আমি ক্ষমা চাইছি', english: 'I apologize / I am sorry' },
      { part: 'দেরি হওয়ার জন্য', english: 'for being late / for the delay' },
    ],
    grammarTipBangla: 'Apologize for-এর পর Verb-ing (gerund) বসে: "for being late" বা noun "for the delay"।',
    difficulty: 'Intermediate',
  },
  {
    id: 'trans-ex-3',
    bangla: 'আমি আমার ইংরেজি বলার জড়তা কাটাতে চাই।',
    expectedEnglish: 'I want to overcome my hesitation in speaking English.',
    naturalAlternatives: [
      'I want to overcome my hesitation in speaking English.',
      'I want to overcome my shyness in speaking English.',
      'I want to speak English without hesitation.',
      'I would like to overcome my hesitation when speaking English.',
    ],
    breakdown: [
      { part: 'আমি চাই', english: 'I want to' },
      { part: 'কাটাতে / জয় করতে', english: 'overcome' },
      { part: 'জড়তা / দ্বিধা', english: 'hesitation / shyness' },
      { part: 'ইংরেজি বলায়', english: 'in speaking English / when speaking English' },
    ],
    grammarTipBangla: '"want to"-এর পর base verb "overcome" বসেছে। জড়তা বোঝাতে "hesitation" খুব কার্যকর শব্দ।',
    difficulty: 'Intermediate',
  },
  {
    id: 'trans-ex-4',
    bangla: 'আপনি কি অনুগ্রহ করে আরেকটু আস্তে কথা বলবেন?',
    expectedEnglish: 'Could you please speak a little slower?',
    naturalAlternatives: [
      'Could you please speak a little slower?',
      'Would you please speak a little slower?',
      'Can you please speak a bit slower?',
      'Could you speak more slowly, please?',
    ],
    breakdown: [
      { part: 'আপনি কি অনুগ্রহ করে', english: 'Could you please' },
      { part: 'কথা বলবেন', english: 'speak' },
      { part: 'আরেকটু আস্তে', english: 'a little slower / a bit slower' },
    ],
    grammarTipBangla: 'ভদ্রভাবে অনুরোধ করতে "Could you please..." ব্যবহার করা নেটিভ স্পিকারদের পছন্দের পদ্ধতি।',
    difficulty: 'Beginner',
  },
];

// ============================================================================
// 7. ENGLISH TO BANGLA STRUCTURAL UNDERSTANDING (Reverse Comprehension)
// ============================================================================

export const ENGLISH_UNDERSTANDING_ITEMS: EnglishUnderstandingItem[] = [
  {
    id: 'und-1',
    english: 'I have been learning English for two years.',
    bangla: 'আমি দুই বছর ধরে ইংরেজি শিখছি।',
    grammarFocus: 'Present Perfect Continuous (অতীতে শুরু হয়ে বর্তমানেও চলছে)',
    breakdown: [
      { chunk: 'I have been learning', banglaChunk: 'আমি শিখে আসছি / শিখছি', explanation: 'অতীতে শুরু হওয়া কাজ এখনও চলমান বোঝাতে have been + V-ing বসেছে।' },
      { chunk: 'English', banglaChunk: 'ইংরেজি', explanation: 'বাক্যের কর্ম (Object)।' },
      { chunk: 'for two years', banglaChunk: 'দুই বছর ধরে', explanation: 'নির্দিষ্ট সময়ের মোট ব্যাপ্তি বোঝাতে "for" ব্যবহৃত হয়েছে।' },
    ],
  },
  {
    id: 'und-2',
    english: 'By practicing daily, you can achieve natural fluency.',
    bangla: 'প্রতিদিন অনুশীলন করার মাধ্যমে, আপনি স্বাভাবিক সাবলীলতা অর্জন করতে পারবেন।',
    grammarFocus: 'Preposition + Gerund + Modal Ability',
    breakdown: [
      { chunk: 'By practicing daily', banglaChunk: 'প্রতিদিন অনুশীলন করার দ্বারা', explanation: 'Preposition "By"-এর পর Verb-ing বসে উপায় বা মাধ্যম নির্দেশ করছে।' },
      { chunk: 'you can achieve', banglaChunk: 'আপনি অর্জন করতে পারবেন', explanation: 'সামর্থ্য বোঝাতে modal "can" + base verb "achieve"।' },
      { chunk: 'natural fluency', banglaChunk: 'স্বাভাবিক সাবলীলতা', explanation: 'adjective (natural) + noun (fluency)।' },
    ],
  },
];

// Aliases for clear component consumption
export const SITUATIONAL_VOCAB_TOPICS = SITUATIONAL_VOCAB_CONTEXTS;
export const TRANSLATION_DRILLS = TRANSLATION_PRACTICE_ITEMS;
export const COMMON_MISTAKES_DATA = COMMON_MISTAKES_CATALOG;

