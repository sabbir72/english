import { GrammarLesson } from '../types';

export interface GrammarTopicSection {
  id: string;
  name: string;
  nameBn: string;
  descriptionBn: string;
  color: string;
}

export const GRAMMAR_TOPIC_SECTIONS: GrammarTopicSection[] = [
  { id: 'all', name: 'All Topics', nameBn: 'সকল ব্যাকরণ পাঠ', descriptionBn: 'সকল ব্যাকরণ ও নিয়ম একসাথে', color: 'indigo' },
  { id: 'Tenses', name: 'Tenses & Time Mastery', nameBn: 'টেন্স ও সময়ের ব্যবহার', descriptionBn: '১২টি টেন্সের বাস্তব প্রয়োগ ও ফর্মুলা', color: 'sky' },
  { id: 'Parts of Speech', name: 'Parts of Speech', nameBn: 'পদ ও শব্দশ্রেণি', descriptionBn: 'নাউন, প্রোনাউন, এডজেক্টিভ ও এডভার্ব', color: 'emerald' },
  { id: 'Modals', name: 'Modal Verbs & Politeness', nameBn: 'মোডাল ভার্ব ও শিষ্টাচার', descriptionBn: 'Can, Could, May, Must, Should, Would', color: 'amber' },
  { id: 'Prepositions', name: 'Prepositions & Collocations', nameBn: 'প্রিপজিশন ও সঠিক প্রয়োগ', descriptionBn: 'In, On, At, By, For, Since ও অ্যাপ্রোপ্রিয়েট প্রিপজিশন', color: 'purple' },
  { id: 'Questions', name: 'Question Formation', nameBn: 'প্রশ্ন তৈরির কৌশল', descriptionBn: 'Yes/No এবং Wh-questions গঠনের নিয়ম', color: 'teal' },
  { id: 'Connectors', name: 'Conjunctions & Clauses', nameBn: 'ক্লজ ও বাক্য সংযোগ', descriptionBn: 'Because, Although, Unless ও রিলেটিভ ক্লজ', color: 'rose' },
  { id: 'Conditionals', name: 'Conditionals & Wishes', nameBn: 'শর্তযুক্ত বাক্য ও কন্ডিশনাল', descriptionBn: 'Zero, 1st, 2nd, 3rd কন্ডিশনাল ও I wish', color: 'blue' },
  { id: 'Voice', name: 'Active & Passive Voice', nameBn: 'অ্যাক্টিভ ও প্যাসিভ ভয়েস', descriptionBn: 'বাস্তব জীবনে প্যাসিভ ব্যবহারের নিয়ম', color: 'indigo' },
  { id: 'Mistakes', name: 'Common Spoken Mistakes', nameBn: 'সচরাচর ভুল ও সমাধান', descriptionBn: 'বাঙালি শিক্ষার্থীদের প্রচলিত ২০টি ভুল ও সমাধান', color: 'orange' },
];

export const COMPREHENSIVE_GRAMMAR_LESSONS: GrammarLesson[] = [
  // 1. Tenses
  {
    id: 'gram-t1',
    title: 'Present Simple (Habits, Truths & Routines)',
    titleBangla: 'প্রেজেন্ট সিম্পল (দৈনন্দিন অভ্যাস ও চিরন্তন সত্য)',
    category: 'Tenses',
    difficulty: 'Beginner',
    summaryBangla: 'প্রতিদিনের অভ্যাস, রুটিন এবং সাধারণ সত্য প্রকাশের প্রধান নিয়ম।',
    rule: 'Use base verb for I/you/we/they. Add -s or -es to verb for he/she/it.',
    formula: 'Subject + Verb (base / s/es) + Object',
    banglaExplanation: `বাঙালি শিক্ষার্থীরা সবচেয়ে বেশি ভুল করে Third Person Singular Number-এর বেলায় verb-এর সাথে s/es যুক্ত করতে ভুলে যাওয়া।
• I / You / We / They এর সাথে সরাসরি Verb-এর Base Form বসে (যেমন: I wake up early, They play cricket)।
• He / She / It / কোনো একক নাম (যেমন Rahim) হলে Verb-এর সাথে s বা es যুক্ত হয় (যেমন: He wakes up early, Rahim plays cricket)।
• চিরন্তন সত্য: The sun rises in the east (সূর্য পূর্ব দিকে ওঠে)।
• নেগেটিভ ও প্রশ্নে: Don't / Doesn't ব্যবহার করতে হয় এবং এর পর verb-এর সাথে s/es আর থাকে না (He does not know)।`,
    examples: [
      { english: 'She speaks English fluently.', bangla: 'সে সাবলীলভাবে ইংরেজি বলে।', note: 'Third person singular: speak + s' },
      { english: 'They do not watch television on weekdays.', bangla: 'তারা কর্মদিবসে টেলিভিশন দেখে না।', note: 'Negative with do not' },
      { english: 'Does he commute by train every morning?', bangla: 'সে কি প্রতিদিন সকালে ট্রেনে যাতায়াত করে?', note: 'Question with does' },
    ],
    commonMistakes: [
      {
        incorrect: 'He speak very good English.',
        correct: 'He speaks very good English.',
        reasonBangla: 'Subject "He" হলো 3rd person singular, তাই verb-এর সাথে "s" যুক্ত হবে।',
      },
      {
        incorrect: 'He does not speaks English.',
        correct: 'He does not speak English.',
        reasonBangla: 'Does/Doesn\'t বসলে মূল verb-এর সাথে "s" বা "es" বসে না।',
      },
      {
        incorrect: 'I am go to school every day.',
        correct: 'I go to school every day.',
        reasonBangla: 'নিয়মিত অভ্যাসের ক্ষেত্রে "am" বসে না। সরাসরি Verb-এর প্রেজেন্ট ফর্ম বসে।',
      },
    ],
    quiz: [
      {
        question: 'My brother _____ at a software company in Dhaka.',
        options: ['work', 'works', 'is work', 'working'],
        correctIndex: 1,
        explanationBangla: '"My brother" হলো Third Person Singular, তাই verb-এর সাথে "s" যুক্ত হয়ে "works" হবে।',
      },
    ],
  },
  {
    id: 'gram-t2',
    title: 'Present Continuous (Actions Happening Right Now)',
    titleBangla: 'প্রেজেন্ট কন্টিনিউয়াস (বর্তমানে যা চলছে)',
    category: 'Tenses',
    difficulty: 'Beginner',
    summaryBangla: 'এই মুহূর্তে চোখের সামনে যা ঘটছে বা সাময়িক কর্মকাণ্ড প্রকাশের নিয়ম।',
    rule: 'Subject + am/is/are + Verb-ing',
    formula: 'Subject + am / is / are + Verb-ing + Extension',
    banglaExplanation: `• I-এর পর am, He/She/It/Singular-এর পর is, এবং You/We/They/Plural-এর পর are বসে।
• মনে রাখবেন: কিছু Stative Verbs কখনো Continuous হয় না—যেমন: believe, know, understand, love, like, want। আপনি কখনো বলবেন না "I am understanding", বরং বলবেন "I understand"।`,
    examples: [
      { english: 'I am preparing dinner right now.', bangla: 'আমি এই মুহূর্তে রাতের খাবার তৈরি করছি।' },
      { english: 'Why are you looking at me like that?', bangla: 'তুমি আমার দিকে ওভাবে তাকিয়ে আছ কেন?' },
      { english: 'They are constructing a new bridge over the river.', bangla: 'তারা নদীর ওপর একটি নতুন সেতু নির্মাণ করছে।' },
    ],
    commonMistakes: [
      {
        incorrect: 'I am knowing the answer.',
        correct: 'I know the answer.',
        reasonBangla: '"Know" হলো অনুভূতির verb, এটি কন্টিনিউয়াস টেন্সে ব্যবহৃত হয় না।',
      },
      {
        incorrect: 'She reading a storybook.',
        correct: 'She is reading a storybook.',
        reasonBangla: 'Continuous টেন্সে auxiliary verb (is/am/are) কখনো বাদ দেওয়া যায় না।',
      },
    ],
    quiz: [
      {
        question: 'Listen! Someone _____ at the door.',
        options: ['knocks', 'is knocking', 'are knocking', 'knocked'],
        correctIndex: 1,
        explanationBangla: '"Listen!" দ্বারা বোঝাচ্ছে কাজ এই মুহূর্তে ঘটছে, এবং "Someone" একবচন হওয়ায় "is knocking" হবে।',
      },
    ],
  },
  {
    id: 'gram-t3',
    title: 'Present Perfect (Past Action with Present Impact)',
    titleBangla: 'প্রেজেন্ট পারফেক্ট (কাজ সম্পন্ন কিন্তু ফল বর্তমান)',
    category: 'Tenses',
    difficulty: 'Intermediate',
    summaryBangla: 'এইমাত্র কাজ শেষ হয়েছে বা জীবনের অভিজ্ঞতার কথা বলতে have/has + V3।',
    rule: 'Subject + have / has + Past Participle (V3)',
    formula: 'I/You/We/They + have + V3 | He/She/It + has + V3',
    banglaExplanation: `বাঙালি শিক্ষার্থীদের সবচেয়ে বড় দ্বিধা তৈরি হয় Past Simple বনাম Present Perfect-এর মধ্যে:
• যদি সময় নির্দিষ্ট করে বলা থাকে (যেমন: yesterday, in 2020, two hours ago), তবে Past Simple হবে: "I saw him yesterday"।
• যদি কোনো নির্দিষ্ট অতীত সময় উল্লেখ না থাকে এবং বর্তমানের সাথে সংযোগ থাকে (যেমন: already, just, yet, ever, never, recently), তবে Present Perfect হবে: "I have already seen that movie"।`,
    examples: [
      { english: 'I have lost my house keys; I cannot enter.', bangla: 'আমি চাবি হারিয়ে ফেলেছি; আমি ঢুকতে পারছি না (চাবি এখনও হারিয়ে আছে)।' },
      { english: 'She has already finished her assignment.', bangla: 'সে ইতোমধ্যেই তার অ্যাসাইনমেন্ট শেষ করেছে।' },
      { english: 'Have you ever visited Cox’s Bazar?', bangla: 'তুমি কি কখনো কক্সবাজার গিয়েছ?' },
    ],
    commonMistakes: [
      {
        incorrect: 'I have seen him yesterday.',
        correct: 'I saw him yesterday.',
        reasonBangla: '"Yesterday" নির্দিষ্ট অতীত সময়, তাই Past Simple (saw) ব্যবহার করতে হবে।',
      },
      {
        incorrect: 'She has went to market.',
        correct: 'She has gone to market.',
        reasonBangla: 'Have/has-এর পর সর্বদা Verb-এর Past Participle (V3) "gone" বসে।',
      },
    ],
    quiz: [
      {
        question: 'We _____ each other since childhood.',
        options: ['know', 'have known', 'are knowing', 'knew'],
        correctIndex: 1,
        explanationBangla: '"Since childhood" দিয়ে শৈশব থেকে বর্তমান পর্যন্ত বোঝানো হয়েছে, তাই Present Perfect "have known" হবে।',
      },
    ],
  },
  {
    id: 'gram-t4',
    title: 'Past Simple (Completed Past Events & Stories)',
    titleBangla: 'পাস্ট সিম্পল (অতীতের সমাপ্ত ঘটনা ও গল্প)',
    category: 'Tenses',
    difficulty: 'Beginner',
    summaryBangla: 'অতীতের নির্দিষ্ট সময়ে সম্পন্ন হওয়া যেকোনো ঘটনা বা গল্পের প্রধান টেন্স।',
    rule: 'Affirmative: Subject + V2 (Past form). Negative/Question: did + base verb.',
    formula: 'Positive: S + V2 | Negative: S + did not + V1 | Question: Did + S + V1?',
    banglaExplanation: `অতীতের কোনো গল্প বা ঘটে যাওয়া ঘটনা বলতে Past Simple আবশ্যক:
• Affirmative-এ Verb-এর Past Form (V2) বসে: "We visited Sylhet last month"।
• কিন্তু Negative এবং Question-এ "did" আসার কারণে মূল Verb-টি আবার Base Form (V1)-এ ফিরে যায়!
• যেমন: "I did not go" (কখনো "did not went" বলবেন না)।`,
    examples: [
      { english: 'They bought a new car last weekend.', bangla: 'তারা গত ছুটির দিনে একটি নতুন গাড়ি কিনেছিল।' },
      { english: 'I did not receive your email yesterday.', bangla: 'আমি গতকাল তোমার ইমেইল পাইনি।' },
      { english: 'Where did you go on vacation?', bangla: 'ছুটিতে তুমি কোথায় গিয়েছিলে?' },
    ],
    commonMistakes: [
      {
        incorrect: 'I didn\'t saw him yesterday.',
        correct: 'I didn\'t see him yesterday.',
        reasonBangla: 'Did not-এর পর verb-এর base form (V1) "see" বসে।',
      },
      {
        incorrect: 'Did you went to school?',
        correct: 'Did you go to school?',
        reasonBangla: 'Did দ্বারা প্রশ্ন শুরু হলে মূল verb-এর V1 (go) হয়।',
      },
    ],
    quiz: [
      {
        question: 'Why did you _____ your old laptop?',
        options: ['sold', 'sell', 'selling', 'have sold'],
        correctIndex: 1,
        explanationBangla: '"did"-এর পর সর্বদা verb-এর base form "sell" বসে।',
      },
    ],
  },
  {
    id: 'gram-t5',
    title: 'Future: Will vs Going To (Plans vs Instant Decisions)',
    titleBangla: 'ভবিষ্যৎ কাল: Will বনাম Going to এর পার্থক্য',
    category: 'Tenses',
    difficulty: 'Intermediate',
    summaryBangla: 'আগে থেকে ঠিক করা পরিকল্পনা বনাম তাৎক্ষণিক সিদ্ধান্তের ভবিষ্যৎ প্রকাশ।',
    rule: 'Be going to = Pre-decided plan / clear evidence. Will = Spontaneous decision / promise / prediction.',
    formula: 'Going to: S + am/is/are going to + V1 | Will: S + will + V1',
    banglaExplanation: `দৈনন্দিন স্পোকেন ইংলিশে এই পার্থক্যটি খুবই গুরুত্বপূর্ণ:
১. Be Going to (পরিকল্পনা): "I am going to visit my grandmother this Saturday" (আমি আগেই পরিকল্পনা করেছি)।
২. স্পষ্ট লক্ষণ দেখে ভবিষ্যৎ অনুমান: "Look at those dark clouds! It is going to rain" (আকাশের কালো মেঘ দেখে নিশ্চিত বৃষ্টি হতে চলেছে)।
৩. Will (মুহূর্তের সিদ্ধান্ত): দরজায় কেউ কড়া নাড়ল, আপনি বললেন—"I will open the door" (আমি এখনই দরজা খুলছি)। কোনো প্রতিশ্রুতি: "I will call you tonight"।`,
    examples: [
      { english: 'The phone is ringing. - I will answer it!', bangla: 'ফোন বাজছে। - আমি ধরছি! (তাৎক্ষণিক সিদ্ধান্ত)' },
      { english: 'She is going to study medicine next year.', bangla: 'সে আগামী বছর মেডিসিন পড়ার পরিকল্পনা করেছে। (পূর্ব-পরিকল্পিত)' },
    ],
    commonMistakes: [
      {
        incorrect: 'I am going to help you right now with that heavy box.',
        correct: 'I will help you right now with that heavy box.',
        reasonBangla: 'তৎক্ষণাৎ কোনো সাহায্য প্রস্তাব করতে "will" ব্যবহৃত হয়।',
      },
    ],
    quiz: [
      {
        question: 'Look at that boy on the tree branch! He _____ fall!',
        options: ['will', 'is going to', 'shall', 'would'],
        correctIndex: 1,
        explanationBangla: 'চোখের সামনে নিশ্চিত বিপদের প্রমাণ রয়েছে, তাই "is going to fall" সঠিক।',
      },
    ],
  },

  // 2. Parts of Speech
  {
    id: 'gram-pos1',
    title: 'Countable vs Uncountable Nouns (Many vs Much)',
    titleBangla: 'গণনাযোগ্য ও অগণনাযোগ্য বিশেষ্য (Many বনাম Much)',
    category: 'Parts of Speech',
    difficulty: 'Beginner',
    summaryBangla: 'যেগুলো গোনা যায় বনাম যেগুলো পরিমাণ করা যায়—সঠিক শব্দ নির্বাচন।',
    rule: 'Countable nouns take many/few/a few. Uncountable nouns take much/little/a little.',
    formula: 'Countable: books, chairs, apples | Uncountable: water, information, advice, furniture',
    banglaExplanation: `বাঙালি শিক্ষার্থীরা প্রায়ই ইংরেজি Uncountable Noun-গুলোকে বহুবচন বানিয়ে ফেলে:
• ইংরেজিতে Advice, Information, Furniture, Luggage, Homework, Knowledge ইত্যাদি সর্বদা Uncountable!
• এগুলোর সাথে কখনো 's' যুক্ত করবেন না (Informations বা Advices ভুল)।
• গোনার জন্য বলতে হয়: "a piece of advice", "two pieces of information", "an item of luggage"।`,
    examples: [
      { english: 'He gave me some valuable advice.', bangla: 'সে আমাকে কিছু মূল্যবান উপদেশ দিয়েছিল।' },
      { english: 'How many books did you purchase?', bangla: 'তুমি কতগুলো বই কিনেছিলে?' },
      { english: 'How much water do you drink daily?', bangla: 'তুমি প্রতিদিন কতটুকু পানি পান করো?' },
    ],
    commonMistakes: [
      {
        incorrect: 'She gave me many advices.',
        correct: 'She gave me some advice. / a lot of advice.',
        reasonBangla: '"Advice" একটি uncountable noun, এর বহুবচন advices হয় না।',
      },
      {
        incorrect: 'We bought all the furnitures.',
        correct: 'We bought all the furniture.',
        reasonBangla: '"Furniture" শব্দে কখনো \'s\' বসে না।',
      },
    ],
    quiz: [
      {
        question: 'Can you provide me with _____ information regarding the course?',
        options: ['an', 'many', 'some', 'a few'],
        correctIndex: 2,
        explanationBangla: '"Information" হলো uncountable noun, তাই এর সাথে "some" বসে।',
      },
    ],
  },
  {
    id: 'gram-pos2',
    title: 'Adjectives vs Adverbs (Quick vs Quickly, Good vs Well)',
    titleBangla: 'এডজেক্টিভ বনাম এডভার্ব (নামের বিশেষণ বনাম কাজের বিশেষণ)',
    category: 'Parts of Speech',
    difficulty: 'Intermediate',
    summaryBangla: 'কোনো ব্যক্তি বা বস্তুর গুণ বনাম কাজটি কীভাবে করা হলো তার পার্থক্য।',
    rule: 'Adjectives modify nouns (He is slow). Adverbs modify verbs, adjectives, or other adverbs (He drives slowly).',
    formula: 'Adjective + Noun | Verb + Adverb (usually ends in -ly)',
    banglaExplanation: `• Good হলো Adjective: "He is a good speaker" (সে একজন ভালো বক্তা)।
• Well হলো Adverb: "He speaks well" (সে ভালো কথা বলে)।
• বিশেষ ব্যতিক্রম: Fast, Hard, Late ইত্যাদি শব্দের Adverb রূপে আলাদা -ly যোগ হয় না! (He drives fast, He works hard)। "Hardly" মানে 'কদাচিৎ/প্রায় না বললেই চলে'।`,
    examples: [
      { english: 'She speaks English fluently and confidently.', bangla: 'সে অনর্গল ও আত্মবিশ্বাসের সাথে ইংরেজি বলে।' },
      { english: 'He works hard every day to support his family.', bangla: 'সে তার পরিবারকে চালাতে প্রতিদিন কঠোর পরিশ্রম করে।' },
    ],
    commonMistakes: [
      {
        incorrect: 'He plays football very good.',
        correct: 'He plays football very well.',
        reasonBangla: 'খেলার ধরন (Verb) বর্ণনা করতে adverb "well" বসবে, adjective "good" নয়।',
      },
      {
        incorrect: 'He drives fastly.',
        correct: 'He drives fast.',
        reasonBangla: '"Fast"-এর adverb রূপও "fast", "fastly" বলে কোনো শব্দ নেই।',
      },
    ],
    quiz: [
      {
        question: 'The chef prepared the dinner _____.',
        options: ['quick', 'quickly', 'more quick', 'quickful'],
        correctIndex: 1,
        explanationBangla: 'রান্না করার কাজকে বিশেষায়িত করতে adverb "quickly" বসবে।',
      },
    ],
  },

  // 3. Modal Verbs
  {
    id: 'gram-mod1',
    title: 'Can, Could & Would for Polite Requests',
    titleBangla: 'Can, Could ও Would দিয়ে মার্জিত অনুরোধের শিষ্টাচার',
    category: 'Modals',
    difficulty: 'Beginner',
    summaryBangla: 'কাউকে কোনো অনুরোধ করার সময় ভদ্র ও মার্জিত ভাষা ব্যবহারের কৌশল।',
    rule: 'Use "Could you...?" or "Would you mind...?" for courteous international conversations.',
    formula: 'Could you please + V1? | Would you mind + Verb-ing?',
    banglaExplanation: `বিদেশি বা পেশাগত পরিবেশে "Can you give me that" বলা অনেক সময় রূঢ় শোনায়।
• সবচেয়ে ভদ্র উপায় হলো: "Could you please pass the water?" (আমাকে কি পানিটা এগিয়ে দেওয়া যাবে?)
• "Would you mind" ব্যবহার করলে Verb-এর সাথে অবশ্যই "-ing" যুক্ত হবে: "Would you mind closing the window?" (জানালাটা বন্ধ করলে কিছু মনে করবেন কি?)।`,
    examples: [
      { english: 'Could you please repeat that sentence?', bangla: 'অনুগ্রহ করে বাক্যটি কি আরেকবার বলা যাবে?' },
      { english: 'Would you mind turning down the volume?', bangla: 'ভলিউমটা একটু কমালে কিছু মনে করবেন কি?' },
      { english: 'I would like to schedule an appointment.', bangla: 'আমি একটি সাক্ষাতের সময় নির্ধারণ করতে চাই।' },
    ],
    commonMistakes: [
      {
        incorrect: 'Would you mind to open the door?',
        correct: 'Would you mind opening the door?',
        reasonBangla: '"Would you mind"-এর পর verb-এর সাথে সর্বদা "-ing" যুক্ত হয়।',
      },
    ],
    quiz: [
      {
        question: 'Would you mind _____ me for a few minutes?',
        options: ['wait', 'waiting', 'to wait', 'waited'],
        correctIndex: 1,
        explanationBangla: '"Would you mind"-এর পর gerund (Verb-ing) বসে, তাই "waiting" সঠিক।',
      },
    ],
  },
  {
    id: 'gram-mod2',
    title: 'Must, Have To & Should (Obligation vs Advice)',
    titleBangla: 'Must, Have to ও Should (বাধ্যবাধকতা বনাম সদুপদেশ)',
    category: 'Modals',
    difficulty: 'Intermediate',
    summaryBangla: 'কোনো কাজ করতেই হবে (নিয়ম) বনাম করা ভালো (পরামর্শ)-এর সূক্ষ্ম তফাত।',
    rule: 'Must/Have to = Strict necessity or law. Should = Good recommendation or moral advice.',
    formula: 'Subject + must / have to / should + Base Verb (V1)',
    banglaExplanation: `• Should: কাউকে ভালো পরামর্শ দেওয়া ("You should drink more water" - তোমার বেশি পানি পান করা উচিত)। না করলেও জেল হবে না।
• Have to / Must: নিয়ম বা আইনের কারণে বাধ্য থাকা ("You must wear a helmet while riding a motorcycle" - বাইক চালানোর সময় হেলমেট পরতেই হবে)।`,
    examples: [
      { english: 'You must stop when the traffic light turns red.', bangla: 'ট্রাফিক লাইট লাল হলে আপনাকে অবশ্যই থামতে হবে।' },
      { english: 'You should get at least seven hours of sleep.', bangla: 'আপনার অন্তত সাত ঘণ্টা ঘুমানো উচিত।' },
    ],
    commonMistakes: [
      {
        incorrect: 'You must to submit the document.',
        correct: 'You must submit the document.',
        reasonBangla: 'Modal verb (must, can, should)-এর পর সরাসরি base verb বসে, "to" বসে না।',
      },
    ],
    quiz: [
      {
        question: 'Passengers _____ fasten their seatbelts during takeoff.',
        options: ['should', 'must', 'might', 'could'],
        correctIndex: 1,
        explanationBangla: 'বিমানের উড্ডয়নের সময় সিটবেল্ট পরা বাধ্যতামূলক নিয়ম, তাই "must" সঠিক।',
      },
    ],
  },

  // 4. Prepositions
  {
    id: 'gram-prep1',
    title: 'Prepositions of Time & Place: In, On, At',
    titleBangla: 'স্থান ও সময়ের প্রিপজিশন (In, On, At-এর পিরামিড ট্রিক)',
    category: 'Prepositions',
    difficulty: 'Beginner',
    summaryBangla: 'সময় ও স্থানের ক্ষেত্রে ইন, অন এবং অ্যাট ব্যবহারের চিরন্তন নিয়ম।',
    rule: 'In = Big (years, months, countries, cities). On = Medium (days, dates, streets). At = Exact (specific time, address, small spot).',
    formula: 'Time: In 2026, In July | On Monday, On May 15 | At 6:30 PM, At midnight',
    banglaExplanation: `পিরামিড নিয়মটি মনে রাখুন:
১. IN (বৃহৎ ও দীর্ঘ):
   • সময়: ইন সেপ্টেম্বর, ইন ২০২০, ইন সামার, ইন দ্য মর্নিং।
   • স্থান: ইন বাংলাদেশ, ইন ঢাকা, ইন দ্য পার্ক।
২. ON (মাঝারি ও নির্দিষ্ট দিন/পৃষ্ঠতল):
   • সময়: অন ফ্রাইডে, অন মাই বার্থডে, অন ১৫ই মার্চ।
   • স্থান: অন দ্য টেবিল, অন মিরপুর রোড।
৩. AT (সুনির্দিষ্ট বিন্দু ও ঘড়ির কাঁটা):
   • সময়: অ্যাট ৭:০০ পিএম, অ্যাট নুন, অ্যাট নাইট।
   • স্থান: অ্যাট দ্য বাস স্টপ, অ্যাট হোম, অ্যাট স্কুল।`,
    examples: [
      { english: 'Our flight departs at 9:15 AM on Sunday.', bangla: 'আমাদের ফ্লাইটটি রবিবার সকাল ৯:১৫ মিনিটে ছেড়ে যাবে।' },
      { english: 'She was born in October in Chattogram.', bangla: 'তিনি চট্টগ্রামে অক্টোবর মাসে জন্মগ্রহণ করেছিলেন।' },
      { english: 'I will meet you at the train station.', bangla: 'আমি তোমার সাথে ট্রেন স্টেশনে দেখা করব।' },
    ],
    commonMistakes: [
      {
        incorrect: 'He arrived on night.',
        correct: 'He arrived at night.',
        reasonBangla: '"Night"-এর পূর্বে "at" বসে (at night, at midnight)।',
      },
      {
        incorrect: 'The meeting is in Monday.',
        correct: 'The meeting is on Monday.',
        reasonBangla: 'সপ্তাহের যেকোনো বারের আগে সর্বদা "on" বসে (on Monday)।',
      },
    ],
    quiz: [
      {
        question: 'The webinar will begin _____ 7:00 PM _____ Friday evening.',
        options: ['on, at', 'at, on', 'in, on', 'at, in'],
        correctIndex: 1,
        explanationBangla: 'নির্দিষ্ট সময়ের পূর্বে "at" এবং দিনের পূর্বে "on" বসে।',
      },
    ],
  },
  {
    id: 'gram-prep2',
    title: 'Appropriate Prepositions: For, Since, During & Between',
    titleBangla: 'সময় ও ব্যাপ্তির প্রিপজিশন: For, Since, During ও Between',
    category: 'Prepositions',
    difficulty: 'Intermediate',
    summaryBangla: 'সময়ের পরিধি বনাম শুরুর বিন্দু এবং দুই বনাম অনেকের মধ্যে তুলনা।',
    rule: 'For + duration of time. Since + starting point of time. Between = two entities. Among = three or more.',
    formula: 'For 5 years (কতক্ষণ ধরে) vs Since 2020 (কখন থেকে)',
    banglaExplanation: `• For: সময়ের মোট পরিমাণ বোঝাতে (for two hours, for three days, for ten years)।
• Since: অতীতে কোনো নির্দিষ্ট সময় থেকে কাজ শুরু হয়েছে বোঝাতে (since morning, since yesterday, since 2018)।
• Between: কেবল দুইজন ব্যক্তি বা বস্তুর মধ্যে (between Rahim and Karim)।
• Among: তিন বা ততোধিক ব্যক্তি বা দলের মধ্যে (among all the students)।`,
    examples: [
      { english: 'I have been studying English for six months.', bangla: 'আমি ছয় মাস ধরে ইংরেজি চর্চা করছি।' },
      { english: 'It has been raining since morning.', bangla: 'সকাল থেকে বৃষ্টি হচ্ছে।' },
      { english: 'Share the mangoes among the children.', bangla: 'বাচ্চাদের মধ্যে আমগুলো ভাগ করে দাও।' },
    ],
    commonMistakes: [
      {
        incorrect: 'I am living here since five years.',
        correct: 'I have been living here for five years.',
        reasonBangla: 'সময়ের ব্যাপ্তি (৫ বছর) বোঝাতে "for" বসে এবং টেন্সটি Perfect Continuous হয়।',
      },
    ],
    quiz: [
      {
        question: 'The dispute was resolved _____ the two business partners.',
        options: ['among', 'between', 'within', 'during'],
        correctIndex: 1,
        explanationBangla: 'দুজনের মধ্যে বোঝাতে "between" ব্যবহৃত হয়।',
      },
    ],
  },

  // 5. Question Formation
  {
    id: 'gram-q1',
    title: 'How to Form Yes/No Questions with Auxiliaries',
    titleBangla: 'অক্সিলিয়ারি ভার্ব দিয়ে হ্যাঁ/না প্রশ্ন তৈরির সহজ নিয়ম',
    category: 'Questions',
    difficulty: 'Beginner',
    summaryBangla: 'Do/Does/Did এবং Be-verb দিয়ে সঠিক প্রশ্ন বাক্য গঠনের সূত্র।',
    rule: 'Move auxiliary verb to front: Auxiliary + Subject + Main Verb + Object?',
    formula: 'Do/Does/Did/Am/Is/Are + Subject + Verb + Extension?',
    banglaExplanation: `ইংরেজি বাক্যে সাধারণ বক্তব্যকে প্রশ্নে রূপান্তর করার সূত্র:
• যদি বাক্যে am/is/are/was/were থাকে, তবে শুধু সেটিকে শুরুতে নিয়ে আসুন: "He is happy" -> "Is he happy?"
• যদি কোনো সাধারণ Verb থাকে (play, like, know), তবে Do বা Does ধার নিতে হয়: "You like coffee" -> "Do you like coffee?", "He lives in Dhaka" -> "Does he live in Dhaka?"
• অতীতের ক্ষেত্রে Did ধার নিন: "They went home" -> "Did they go home?"`,
    examples: [
      { english: 'Do you practice English every day?', bangla: 'তুমি কি প্রতিদিন ইংরেজি চর্চা করো?' },
      { english: 'Does your sister work from home?', bangla: 'তোমার বোন কি বাসা থেকে কাজ করে?' },
      { english: 'Were you satisfied with the service?', bangla: 'আপনি কি সেবায় সন্তুষ্ট ছিলেন?' },
    ],
    commonMistakes: [
      {
        incorrect: 'You like coffee?',
        correct: 'Do you like coffee?',
        reasonBangla: 'ইংরেজিতে ব্যাকরণসম্মত প্রশ্নে "Do" অক্সিলিয়ারি অবশ্যই যোগ করতে হয়।',
      },
      {
        incorrect: 'Does he lives here?',
        correct: 'Does he live here?',
        reasonBangla: 'Does বসলে মূল verb-এ আর \'s\' যুক্ত থাকে না।',
      },
    ],
    quiz: [
      {
        question: '_____ she know about the meeting schedule?',
        options: ['Do', 'Does', 'Is', 'Has'],
        correctIndex: 1,
        explanationBangla: 'Subject "she" থাকায় 3rd person singular-এর জন্য "Does" দিয়ে প্রশ্ন শুরু হবে।',
      },
    ],
  },
  {
    id: 'gram-q2',
    title: 'Mastering Wh-Questions (Who, Where, When, Why, How)',
    titleBangla: 'Wh-প্রশ্ন তৈরি (কে, কোথায়, কখন, কেন, কীভাবে)',
    category: 'Questions',
    difficulty: 'Intermediate',
    summaryBangla: 'তথ্য জানতে প্রশ্ন তৈরি: Wh-word + Auxiliary + Subject + Main Verb।',
    rule: 'Wh-word + Auxiliary (do/does/is/can) + Subject + Base Verb + Extension?',
    formula: 'Wh-word + Aux + Subject + Main Verb?',
    banglaExplanation: `বাঙালি শিক্ষার্থীরা প্রায়ই অক্সিলিয়ারি ভার্ব বাদ দিয়ে ফেলে—যেমন "Where you go?" বলা ভুল।
সঠিক কাঠামো:
• Where do you live? (কোথায় বাস করেন?)
• Why are you laughing? (হাসছেন কেন?)
• How long have you been waiting? (কতক্ষণ ধরে অপেক্ষা করছেন?)
• ব্যতিক্রম: যখন "Who" নিজেই Subject হিসেবে কাজ করে, তখন Do/Does লাগে না—"Who broke the glass?" (গ্লাসটি কে ভেঙেছে?)।`,
    examples: [
      { english: 'Where did you buy this jacket?', bangla: 'তুমি এই জ্যাকেটটি কোথা থেকে কিনেছিলে?' },
      { english: 'How often do you exercise at the gym?', bangla: 'তুমি কত ঘন ঘন জিমে ব্যায়াম করো?' },
    ],
    commonMistakes: [
      {
        incorrect: 'Where you are going?',
        correct: 'Where are you going?',
        reasonBangla: 'প্রশ্নে auxiliary verb (are) subject (you)-এর আগে বসবে।',
      },
    ],
    quiz: [
      {
        question: 'What time _____ the train arrive in Sylhet?',
        options: ['do', 'does', 'is', 'did'],
        correctIndex: 1,
        explanationBangla: '"the train" একবচন হওয়ায় "does" বসবে।',
      },
    ],
  },

  // 6. Connectors & Clauses
  {
    id: 'gram-con1',
    title: 'Because, Although, Unless & While (Subordinating Conjunctions)',
    titleBangla: 'কারণ, যদিও, যদি না ও যখন (যুক্তবাক্য তৈরির কৌশল)',
    category: 'Connectors',
    difficulty: 'Intermediate',
    summaryBangla: 'দুইটি ধারণাকে যুক্ত করে চমৎকার বড় ও জটিল বাক্য তৈরি করা।',
    rule: 'Although expresses contrast. Unless means "if not". Because gives reasons.',
    formula: 'Although + Clause 1, Clause 2 | Unless + Positive verb, Clause 2',
    banglaExplanation: `• Although / Even though (যদিও): বিপরীত অর্থ প্রকাশ করে—"Although it was raining, we went out" (যদিও বৃষ্টি হচ্ছিল, তবুও আমরা বাইরে গিয়েছিলাম)।
• Unless (যদি না): "Unless you study, you will fail" (যদি তুমি না পড়ো, তুমি ফেল করবে)। মনে রাখবেন: Unless নিজেই নেতিবাচক, তাই এর সাথে আর 'not' বসানো যায় না।
• While (যখন / একই সময়ে): "While I was cooking, my phone rang"।`,
    examples: [
      { english: 'Although he was tired, he completed the project.', bangla: 'যদিও সে ক্লান্ত ছিল, সে প্রজেক্টটি শেষ করেছিল।' },
      { english: 'You cannot enter the hall unless you have a pass.', bangla: 'পাস না থাকলে আপনি হলে প্রবেশ করতে পারবেন না।' },
    ],
    commonMistakes: [
      {
        incorrect: 'Although he is rich, but he is humble.',
        correct: 'Although he is rich, he is humble.',
        reasonBangla: 'Although এবং But একই বাক্যে একসাথে বসে না।',
      },
      {
        incorrect: 'Unless you do not come, I will go alone.',
        correct: 'Unless you come, I will go alone.',
        reasonBangla: 'Unless-এর ভেতর \'not\' নিহিত থাকে, তাই আবার \'not\' ব্যবহার করা ভুল।',
      },
    ],
    quiz: [
      {
        question: 'We cannot start the presentation _____ everyone is present.',
        options: ['although', 'unless', 'because', 'so that'],
        correctIndex: 1,
        explanationBangla: '"যতক্ষণ না সবাই উপস্থিত হচ্ছে" বোঝাতে "unless" সঠিক।',
      },
    ],
  },

  // 7. Conditionals
  {
    id: 'gram-cond1',
    title: 'First & Second Conditionals (Real vs Imaginary Conditions)',
    titleBangla: 'কন্ডিশনাল ১ ও ২ (বাস্তব সম্ভাবনা বনাম কাল্পনিক শর্ত)',
    category: 'Conditionals',
    difficulty: 'Intermediate',
    summaryBangla: 'যদি এমন হয় তবে কী হবে—ভবিষ্যতের সম্ভাবনা বনাম বর্তমানের কল্পনা।',
    rule: '1st: If + Present Simple, will + base verb. 2nd: If + Past Simple, would + base verb.',
    formula: '1st: If you study, you will pass. 2nd: If I had money, I would travel.',
    banglaExplanation: `• First Conditional (বাস্তব সম্ভাবনা):
  "If you wake up early, you will catch the morning bus" (যদি সকালে ওঠো, বাসটি ধরতে পারবে)।
  ভুল সতর্কতা: If-এর অংশে কখনো 'will' বসে না!
• Second Conditional (কাল্পনিক বর্তমান):
  "If I were the prime minister, I would build more schools" (যদি আমি প্রধানমন্ত্রী হতাম... কিন্তু আমি তো নই)।
  দ্বিতীয় কন্ডিশনালে I/He/She সকলের সাথেই 'were' বসে!`,
    examples: [
      { english: 'If it rains tomorrow, we will stay at home.', bangla: 'যদি কাল বৃষ্টি হয়, আমরা বাড়িতেই থাকব।' },
      { english: 'If I knew his contact number, I would call him.', bangla: 'যদি আমি তার নম্বর জানতাম, আমি তাকে ফোন দিতাম।' },
    ],
    commonMistakes: [
      {
        incorrect: 'If you will come, I will be happy.',
        correct: 'If you come, I will be happy.',
        reasonBangla: 'If-অংশে কখনো Future Tense (will) বসে না; Present Simple হয়।',
      },
    ],
    quiz: [
      {
        question: 'If she _____ harder, she will definitely pass the exam.',
        options: ['studied', 'studies', 'will study', 'studying'],
        correctIndex: 1,
        explanationBangla: 'First Conditional-এর if-অংশে Present Simple "studies" বসবে।',
      },
    ],
  },

  // 8. Active & Passive Voice
  {
    id: 'gram-voice1',
    title: 'Active vs Passive Voice in Daily Life',
    titleBangla: 'অ্যাক্টিভ ও প্যাসিভ ভয়েস (কাজের গুরুত্ব বনাম কর্তার গুরুত্ব)',
    category: 'Voice',
    difficulty: 'Intermediate',
    summaryBangla: 'কে করেছে তার চেয়ে কী করা হয়েছে তা বেশি গুরুত্বপূর্ণ হলে প্যাসিভ ব্যবহার।',
    rule: 'Passive: Object becomes subject + appropriate be-verb + V3 (Past Participle).',
    formula: 'Subject + be-verb + V3 (+ by agent)',
    banglaExplanation: `দৈনন্দিন জীবনে কখন প্যাসিভ ব্যবহার করবেন?
১. যখন কর্তা অজানা বা অপ্রয়োজনীয়: "My bike was stolen" (আমার সাইকেল চুরি গেছে—চোর কে তা অজানা)।
২. প্রাতিষ্ঠানিক বা সংবাদে: "English is spoken worldwide" (বিশ্বজুড়ে ইংরেজি বলা হয়)।
৩. বিনম্র ভুলের বেলায়: "A mistake was made" (একটি ভুল হয়েছে—কাউকে সরাসরি দোষারোপ না করে)।`,
    examples: [
      { english: 'The report was submitted yesterday afternoon.', bangla: 'রিপোর্টটি গতকাল বিকেলে জমা দেওয়া হয়েছিল।' },
      { english: 'Tea is cultivated in the hills of Sylhet.', bangla: 'সিলেটের পাহাড়ে চা চাষ করা হয়।' },
    ],
    commonMistakes: [
      {
        incorrect: 'The car washed yesterday.',
        correct: 'The car was washed yesterday.',
        reasonBangla: 'গাড়ি নিজে নিজেকে ধুতে পারে না, তাই Passive-এ be-verb "was" এবং V3 "washed" বসবে।',
      },
    ],
    quiz: [
      {
        question: 'Millions of messages _____ on WhatsApp every second.',
        options: ['are sent', 'sent', 'is sent', 'are sending'],
        correctIndex: 0,
        explanationBangla: '"Messages" বহুবচন হওয়ায় Present Simple Passive-এ "are sent" হবে।',
      },
    ],
  },

  // 9. Common Spoken Mistakes
  {
    id: 'gram-mis1',
    title: 'Top 10 Spoken English Mistakes by Bengali Speakers',
    titleBangla: 'বাঙালি শিক্ষার্থীদের ১০টি মারাত্মক ভুল ও তার সহজ সমাধান',
    category: 'Mistakes',
    difficulty: 'Beginner',
    summaryBangla: 'বাংলা থেকে আক্ষরিক অনুবাদের কারণে ঘটে যাওয়া জনপ্রিয় ভুলগুলো ঠিক করুন।',
    rule: 'Avoid literal Bangla-to-English translation. Learn established English phrase collocations.',
    formula: 'Mistake -> Correct Form -> Logical Reason',
    banglaExplanation: `বাঙালি শিক্ষার্থীদের ১০টি সাধারণ ভুল:
১. "Myself Rahim" (ভুল) -> "I am Rahim" / "My name is Rahim" (সঠিক)। কখনো আত্মপরিচয়ে Reflexive pronoun ব্যবহার করবেন না।
২. "Discuss about the topic" (ভুল) -> "Discuss the topic" (সঠিক)। Discuss-এর পর 'about' বসে না।
৩. "Return back" (ভুল) -> "Return" (সঠিক)। Return মানেই ফিরে আসা, 'back' বাহুল্য।
৪. "One of my friend" (ভুল) -> "One of my friends" (সঠিক)। অনেকের মধ্য থেকে একজন, তাই friends বহুবচন হবে।
৫. "I didn't saw" (ভুল) -> "I didn't see" (সঠিক)।
৬. "She is more taller" (ভুল) -> "She is taller" (সঠিক)। ডাবল কম্পারেটিভ হয় না।
৭. "He entered into the room" (ভুল) -> "He entered the room" (সঠিক)।
৮. "I am agree with you" (ভুল) -> "I agree with you" (সঠিক)। Agree নিজেই একটি verb, am লাগবে না।
৯. "Listen me" (ভুল) -> "Listen to me" (সঠিক)। Listen-এর পর সর্বদা 'to' বসে।
১০. "Take medicine" (সঠিক) -> "Eat medicine" (ভুল)। ওষুধ খাওয়াকে ইংরেজিতে 'take' বলা হয়।`,
    examples: [
      { english: 'I completely agree with your proposal.', bangla: 'আমি আপনার প্রস্তাবের সাথে সম্পূর্ণ একমত।' },
      { english: 'One of my friends works at Google.', bangla: 'আমার বন্ধুদের একজন গুগলে কাজ করে।' },
    ],
    commonMistakes: [
      {
        incorrect: 'I am agree with you.',
        correct: 'I agree with you.',
        reasonBangla: '"Agree" নিজেই একটি verb, এর সাথে "am" বসে না।',
      },
      {
        incorrect: 'Let us discuss about this matter.',
        correct: 'Let us discuss this matter.',
        reasonBangla: '"Discuss" শব্দের ভেতরই \'about\' অন্তর্ভুক্ত থাকে।',
      },
    ],
    quiz: [
      {
        question: 'Which of the following sentences is grammatically correct?',
        options: [
          'One of my brother lives in London.',
          'One of my brothers lives in London.',
          'One of my brothers live in London.',
          'One of my brother live in London.',
        ],
        correctIndex: 1,
        explanationBangla: '"One of my"-এর পর Noun বহুবচন (brothers) হয় কিন্তু Verb একবচন (lives) হয়।',
      },
    ],
  },
];
