export interface ReadingStory {
  id: string;
  title: string;
  titleBangla: string;
  level: 'Beginner' | 'Elementary' | 'Intermediate';
  readTime: string;
  category: string;
  categoryBangla?: string;
  englishContent: string[];
  banglaContent: string[];
  keyVocab: {
    word: string;
    ipa: string;
    banglaPronunciation: string;
    meaning: string;
    pos: string;
  }[];
  comprehensionQuestion: {
    question: string;
    questionBangla: string;
    options: string[];
    correctIndex: number;
    explanationBangla: string;
  };
}

export const READING_TOPIC_CATEGORIES = [
  { id: 'all', label: 'All Stories', labelBn: 'সকল গল্প ও পাঠ' },
  { id: 'Daily Life', label: 'Daily Life & Habits', labelBn: 'দৈনন্দিন জীবন ও অভ্যাস' },
  { id: 'Workplace', label: 'Career & Workplace', labelBn: 'পেশাগত ও অফিস' },
  { id: 'Travel', label: 'Travel & Exploration', labelBn: 'ভ্রমণ ও পর্যটন' },
  { id: 'Dining', label: 'Food & Dining', labelBn: 'খাদ্য ও রেস্তোরাঁ' },
  { id: 'Mindset', label: 'Inspiration & Mindset', labelBn: 'অনুপ্রেরণা ও দর্শন' },
  { id: 'Science', label: 'Science & Technology', labelBn: 'বিজ্ঞান ও প্রযুক্তি' },
  { id: 'Nature', label: 'Nature & Wildlife', labelBn: 'প্রকৃতি ও পরিবেশ' },
  { id: 'Mystery', label: 'Mystery & Investigation', labelBn: 'রহস্য ও অনুসন্ধান' },
  { id: 'Health', label: 'Health & Wellness', labelBn: 'স্বাস্থ্য ও সুস্থতা' },
];

export const ALL_READING_STORIES: ReadingStory[] = [
  // 1. Daily Life
  {
    id: 'story-1',
    title: 'The Power of Small Daily Habits',
    titleBangla: 'ছোট ছোট দৈনন্দিন অভ্যাসের শক্তি',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Daily Life',
    categoryBangla: 'দৈনন্দিন জীবন ও অভ্যাস',
    englishContent: [
      'Learning English does not require five hours every single day. In fact, practicing for just fifteen minutes each morning can completely transform your speaking skills.',
      'When you learn three new words and build two sentences every day, you master almost one hundred words each month. Consistency always beats intensity.',
      'Start small, celebrate your daily streak, and speak out loud without fearing mistakes. Every mistake is proof that you are trying.',
    ],
    banglaContent: [
      'প্রতিদিন পাঁচ ঘণ্টা ইংরেজি শেখার প্রয়োজন নেই। আসলে, প্রতিদিন সকালে মাত্র পনেরো মিনিট অনুশীলন করলে আপনার কথা বলার দক্ষতা পুরোপুরি বদলে যেতে পারে।',
      'আপনি যখন প্রতিদিন তিনটি নতুন শব্দ শেখেন এবং দুটি বাক্য তৈরি করেন, তখন প্রতি মাসে প্রায় একশত শব্দে দক্ষতা অর্জন করতে পারেন। ধারাবাহিকতা সবসময় অতিরিক্ত চাপের চেয়ে বেশি কার্যকর।',
      'ছোট করে শুরু করুন, আপনার দৈনিক ধারাবাহিকতা বজায় রাখুন এবং ভুলের ভয় না পেয়ে জোরে কথা বলুন। প্রতিটি ভুল প্রমাণ করে যে আপনি চেষ্টা করছেন।',
    ],
    keyVocab: [
      { word: 'require', ipa: '/rɪˈkwaɪər/', banglaPronunciation: 'রিকোয়ার', meaning: 'প্রয়োজন হওয়া / দরকার হওয়া', pos: 'verb' },
      { word: 'transform', ipa: '/trænsˈfɔːrm/', banglaPronunciation: 'ট্রান্সফর্ম', meaning: 'আমূল পরিবর্তন করা / রূপান্তর করা', pos: 'verb' },
      { word: 'consistency', ipa: '/kənˈsɪstənsi/', banglaPronunciation: 'কনসিস্টেন্সি', meaning: 'ধারাবাহিকতা / নিয়মিত প্রয়াস', pos: 'noun' },
      { word: 'intensity', ipa: '/ɪnˈtɛnsəti/', banglaPronunciation: 'ইনটেনসিটি', meaning: 'তীব্রতা / কঠোর চাপ', pos: 'noun' },
      { word: 'proof', ipa: '/pruːf/', banglaPronunciation: 'প্রুফ', meaning: 'প্রমাণ', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'According to the passage, what is more important than intensity?',
      questionBangla: 'অনুচ্ছেদ অনুযায়ী, তীব্রতার চেয়ে কোনটি বেশি গুরুত্বপূর্ণ?',
      options: ['Grammar tests', 'Consistency (ধারাবাহিকতা)', 'Studying five hours', 'Memorizing dictionary'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে স্পষ্টভাবে বলা হয়েছে: "Consistency always beats intensity" (ধারাবাহিকতা সবসময় তীব্রতার চেয়ে কার্যকর)।',
    },
  },
  {
    id: 'story-2',
    title: 'A Warm Morning at a London Cafe',
    titleBangla: 'লন্ডনের ক্যাফেতে একটি উষ্ণ সকাল',
    level: 'Elementary',
    readTime: '4 min',
    category: 'Daily Life',
    categoryBangla: 'দৈনন্দিন জীবন ও অভ্যাস',
    englishContent: [
      'Rahim stepped into the cozy cafe near Covent Garden. The aroma of freshly brewed coffee and warm croissants filled the entire room.',
      '"Good morning! What can I get for you today?" the barista asked with a pleasant smile. Rahim felt a little nervous, but he remembered his sentence patterns.',
      '"Could I please have a hot latte with almond milk and a blueberry muffin?" Rahim replied confidently. The barista nodded cheerfully. Rahim smiled, realizing that real conversation is easier than he thought.',
    ],
    banglaContent: [
      'রহিম কভেন্ট গার্ডেনের কাছের একটি আরামদায়ক ক্যাফেতে প্রবেশ করলেন। সদ্য তৈরি কফি এবং গরম ক্রসেন্টের ঘ্রাণ পুরো ঘর জুড়ে ছড়িয়ে ছিল।',
      '"শুভ সকাল! আজ আপনার জন্য কি আনতে পারি?" হাসিমুখে জিজ্ঞেস করলেন বারিস্তা। রহিম একটু নার্ভাস অনুভব করছিলেন, কিন্তু তার বাক্যের প্যাটার্নগুলো মনে পড়ল।',
      '"আমাকে কি অনুগ্রহ করে আমন্ড মিল্কের একটি গরম লাতে এবং ব্লুবেরি মাফিন দেওয়া যাবে?" আত্মবিশ্বাসের সাথে উত্তর দিলেন রহিম। বারিস্তা আনন্দের সাথে সম্মতি জানিয়ে মাথা নাড়লেন। রহিম হাসলেন এবং উপলব্ধি করলেন যে বাস্তব কথোপকথন ভাবনার চেয়েও সহজ।',
    ],
    keyVocab: [
      { word: 'cozy', ipa: '/ˈkoʊzi/', banglaPronunciation: 'কোজি', meaning: 'আরামদায়ক ও উষ্ণ', pos: 'adjective' },
      { word: 'aroma', ipa: '/əˈroʊmə/', banglaPronunciation: 'অ্যারোমা', meaning: 'সুগন্ধ / মিষ্টি ঘ্রাণ', pos: 'noun' },
      { word: 'nervous', ipa: '/ˈnɜːrvəs/', banglaPronunciation: 'নার্ভাস', meaning: 'উদ্বিগ্ন / নার্ভাস', pos: 'adjective' },
      { word: 'confidently', ipa: '/ˈkɒnfɪdəntli/', banglaPronunciation: 'কনফিডেন্টলি', meaning: 'আত্মবিশ্বাসের সাথে', pos: 'adverb' },
      { word: 'realize', ipa: '/ˈriːəlaɪz/', banglaPronunciation: 'রিয়ালাইজ', meaning: 'উপলব্ধি করা / বুঝতে পারা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'What did Rahim order at the cafe?',
      questionBangla: 'রহিম ক্যাফেতে কী অর্ডার করেছিলেন?',
      options: ['Black coffee and toast', 'Hot latte with almond milk & muffin', 'Green tea and sandwich', 'Cold orange juice'],
      correctIndex: 1,
      explanationBangla: 'রহিম অর্ডার করেছিলেন: "a hot latte with almond milk and a blueberry muffin"।',
    },
  },
  {
    id: 'story-3',
    title: 'The Art of Mindful Morning Walks',
    titleBangla: 'সকালের সচেতন হাঁটাচলার আনন্দ ও সুফল',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Daily Life',
    categoryBangla: 'দৈনন্দিন জীবন ও অভ্যাস',
    englishContent: [
      'Every morning at six, Tanvir laces up his running shoes and heads to the neighborhood park. The brisk morning air clears his foggy mind.',
      'Instead of looking at his smartphone notifications, he listens to the cheerful chirping of birds and watches the golden sunlight filter through the green leaves.',
      'He mentally describes everything he sees in English: "The dew drops are glistening on the grass. The breeze is refreshing." This simple habit enriches his active vocabulary without any stress.',
    ],
    banglaContent: [
      'প্রতিদিন সকাল ছয়টায় তানভীর তার রানিং জুতো পরে পাড়ার পার্কের দিকে রওনা হন। সকালের ঠান্ডা মিষ্টি বাতাস তার অলস ক্লান্ত মনকে সতেজ করে তোলে।',
      'স্মার্টফোনের নোটিফিকেশনের দিকে না তাকিয়ে তিনি পাখির কলকাকলি শোনেন এবং গাছের সবুজ পাতার ফাঁক দিয়ে আসা সোনালী রোদ প্রত্যক্ষ করেন।',
      'মনে মনে তিনি যা কিছু দেখেন তা ইংরেজিতে বর্ণনা করেন: "The dew drops are glistening on the grass (ঘাসের ওপর শিশিরবিন্দু জ্বলজ্বল করছে)। The breeze is refreshing (বাতাসটি সতেজকারক)।" এই সহজ অভ্যাসটি কোনো ক্লান্তি ছাড়াই তার সক্রিয় শব্দভাণ্ডার সমৃদ্ধ করে।',
    ],
    keyVocab: [
      { word: 'brisk', ipa: '/brɪsk/', banglaPronunciation: 'ব্রিস্ক', meaning: 'সতেজ ও দ্রুতগামী বাতাস', pos: 'adjective' },
      { word: 'chirping', ipa: '/ˈtʃɜːrpɪŋ/', banglaPronunciation: 'চার্পিং', meaning: 'পাখির মিষ্টি কিচিরমিচির', pos: 'noun' },
      { word: 'glistening', ipa: '/ˈɡlɪs.ən.ɪŋ/', banglaPronunciation: 'গ্লিসেনিং', meaning: 'চকচক করছে এমন', pos: 'adjective' },
      { word: 'refreshing', ipa: '/rɪˈfreʃ.ɪŋ/', banglaPronunciation: 'রিফ্রেশিং', meaning: 'মন সতেজকারী', pos: 'adjective' },
      { word: 'enrich', ipa: '/ɪnˈrɪtʃ/', banglaPronunciation: 'এনরিচ', meaning: 'সমৃদ্ধ করা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'How does Tanvir practice English during his morning walks?',
      questionBangla: 'সকালের হাঁটার সময় তানভীর কীভাবে ইংরেজি চর্চা করেন?',
      options: ['He reads a paper dictionary', 'He mentally describes his surroundings in English', 'He writes grammar tests on a bench', 'He watches TV shows'],
      correctIndex: 1,
      explanationBangla: 'তানভীর মনে মনে যা দেখেন তা ইংরেজিতে বর্ণনা করেন (mentally describes everything he sees in English)।',
    },
  },

  // 2. Workplace & Career
  {
    id: 'story-4',
    title: 'Acing the First Job Interview',
    titleBangla: 'চাকরির প্রথম ইন্টারভিউতে সফল হওয়ার অভিজ্ঞতা',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Workplace',
    categoryBangla: 'পেশাগত ও অফিস',
    englishContent: [
      'Sumaiya arrived fifteen minutes ahead of schedule for her marketing interview. She wore a sharp navy blazer and carried her printed portfolio.',
      'The interviewer welcomed her warmly: "Tell us about a time when you managed a strict deadline." Sumaiya took a steady breath and structured her answer using the STAR method.',
      '"During my university tech fest, we lost a major sponsor three days before the event. I negotiated with two local software companies and secured alternative funding within twenty-four hours."',
      'The hiring manager smiled with satisfaction. Clear storytelling, strong verbs, and poise turn any nervous candidate into an impressive communicator.',
    ],
    banglaContent: [
      'সুমাইয়া তার মার্কেটিং ইন্টারভিউয়ের নির্ধারিত সময়ের পনেরো মিনিট আগেই উপস্থিত হলেন। তিনি একটি পরিপাটি নেভি ব্লু ব্লেজার পরেছিলেন এবং প্রিন্ট করা পোর্টফোলিও সাথে রেখেছিলেন।',
      'ইন্টারভিউয়ার তাকে উষ্ণ সম্ভাষণ জানিয়ে বললেন: "আমাদের এমন একটি অভিজ্ঞতার কথা বলুন যখন আপনি একটি কঠোর ডেডলাইন সামলেছিলেন।" সুমাইয়া শান্ত শ্বাস নিয়ে STAR পদ্ধতিতে তার উত্তর গুছিয়ে বললেন।',
      '"আমাদের বিশ্ববিদ্যালয়ের টেক ফেস্টিভ্যালে ইভেন্টের তিন দিন আগে একজন প্রধান স্পনসর বাতিল হয়ে যায়। আমি দুটি স্থানীয় সফটওয়্যার কোম্পানির সাথে সমঝোতা করি এবং চব্বিশ ঘণ্টার মধ্যে বিকল্প ফান্ড নিশ্চিত করি।"',
      'হায়ারিং ম্যানেজার সন্তুষ্টির সাথে হাসলেন। স্পষ্ট গল্প বলা, বলিষ্ঠ ক্রিয়াপদ ও ব্যক্তিত্ব যেকোনো নার্ভাস প্রার্থীকে চমৎকার যোগাযোগকারীতে পরিণত করে।',
    ],
    keyVocab: [
      { word: 'portfolio', ipa: '/pɔːrtˈfoʊ.li.oʊ/', banglaPronunciation: 'পোর্টফোলিও', meaning: 'কাজের নমুনা ও অর্জনের ফাইল', pos: 'noun' },
      { word: 'deadline', ipa: '/ˈded.laɪn/', banglaPronunciation: 'ডেডলাইন', meaning: 'কাজের সর্বশেষ সময়সীমা', pos: 'noun' },
      { word: 'negotiate', ipa: '/nəˈɡoʊ.ʃi.eɪt/', banglaPronunciation: 'নেগোশিয়েট', meaning: 'আলোচনা বা সমঝোতা করা', pos: 'verb' },
      { word: 'secured', ipa: '/səˈkjʊrd/', banglaPronunciation: 'সিকিউর্ড', meaning: 'নিশ্চিত বা সুরক্ষিত করেছিল', pos: 'verb' },
      { word: 'poise', ipa: '/pɔɪz/', banglaPronunciation: 'পয়েজ', meaning: 'ধীরস্থির আত্মমর্যাদাপূর্ণ আচরণ', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'How quickly did Sumaiya secure alternative funding for the tech fest?',
      questionBangla: 'সুমাইয়া টেক ফেস্টিভ্যালের জন্য কত সময়ের মধ্যে বিকল্প ফান্ড নিশ্চিত করেছিলেন?',
      options: ['Within one week', 'Within twenty-four hours', 'After the event ended', 'Over three months'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে বলা হয়েছে: "secured alternative funding within twenty-four hours" (২৪ ঘণ্টার মধ্যে)।',
    },
  },
  {
    id: 'story-5',
    title: 'Leading a Cross-Cultural Team Meeting',
    titleBangla: 'আন্তর্জাতিক সহকর্মীদের সাথে টিম মিটিং পরিচালনা',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Workplace',
    categoryBangla: 'পেশাগত ও অফিস',
    englishContent: [
      'As the remote product manager, Asif kicked off the weekly sync across four time zones: London, Dhaka, Singapore, and San Francisco.',
      '"Before we dive into the product roadmap, let us align on our core milestones for this sprint," Asif articulated clearly over Zoom.',
      'He ensured that everyone had an equal opportunity to voice their perspectives. When a junior developer expressed a concern, Asif acknowledged it constructively.',
      'Effective global leadership relies on psychological safety, clarity of purpose, and inclusive communication.',
    ],
    banglaContent: [
      'রিমোট প্রোডাক্ট ম্যানেজার হিসেবে আসিফ চারটি টাইম জোনের (লন্ডন, ঢাকা, সিঙ্গাপুর এবং সান ফ্রান্সিসকো) সহকর্মীদের নিয়ে সাপ্তাহিক মিটিং শুরু করলেন।',
      '"প্রোডাক্ট রোডম্যাপে প্রবেশ করার আগে আসুন এই স্প্রিন্টের মূল লক্ষ্যগুলোতে একমত হই," জুম কলে পরিষ্কার উচ্চারণে বললেন আসিফ।',
      'তিনি নিশ্চিত করলেন যেন প্রত্যেকেই তাদের মতামত জানানোর সমান সুযোগ পায়। যখন একজন জুনিয়র ডেভেলপার একটি উদ্বেগ প্রকাশ করলেন, আসিফ গঠনমূলকভাবে তা মূল্যায়ন করলেন।',
      'কার্যকর আন্তর্জাতিক নেতৃত্বের চাবিকাঠি হলো মানসিক নিরাপত্তা, কাজের স্পষ্ট উদ্দেশ্য এবং অন্তর্ভুক্তিমূলক যোগাযোগ।',
    ],
    keyVocab: [
      { word: 'align', ipa: '/əˈlaɪn/', banglaPronunciation: 'অ্যালাইন', meaning: 'একমত হওয়া / একই সারিতে আসা', pos: 'verb' },
      { word: 'milestone', ipa: '/ˈmaɪl.stoʊn/', banglaPronunciation: 'মাইলস্টোন', meaning: 'নির্দিষ্ট উল্লেখযোগ্য লক্ষ্য বা অর্জন', pos: 'noun' },
      { word: 'articulate', ipa: '/ɑːrˈtɪk.jə.lət/', banglaPronunciation: 'আর্টিকুলেট', meaning: 'সুস্পষ্টভাবে মনের ভাব প্রকাশ করা', pos: 'verb' },
      { word: 'constructively', ipa: '/kənˈstrʌk.tɪv.li/', banglaPronunciation: 'কনস্ট্রাক্টিভলি', meaning: 'গঠনমূলকভাবে', pos: 'adverb' },
      { word: 'inclusive', ipa: '/ɪnˈkluː.sɪv/', banglaPronunciation: 'ইনক্লুসিভ', meaning: 'সকলকে সাথে নিয়ে এমন', pos: 'adjective' },
    ],
    comprehensionQuestion: {
      question: 'What does effective global leadership rely on, according to the text?',
      questionBangla: 'অনুচ্ছেদ অনুযায়ী কার্যকর বৈশ্বিক নেতৃত্ব কিসের ওপর নির্ভর করে?',
      options: ['Strict punishment', 'Psychological safety & inclusive communication', 'Working twelve hours without rest', 'Ignoring junior staff'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "relies on psychological safety, clarity of purpose, and inclusive communication"।',
    },
  },
  {
    id: 'story-6',
    title: 'Writing Professional Emails that Get Fast Replies',
    titleBangla: 'দ্রুত উত্তর পাওয়ার মতো প্রফেশনাল ইমেইল লেখার কৌশল',
    level: 'Elementary',
    readTime: '3 min',
    category: 'Workplace',
    categoryBangla: 'পেশাগত ও অফিস',
    englishContent: [
      'Busy professionals receive over one hundred emails every day. If your email is lengthy and vague, recipients will postpone reading it.',
      'The secret to effective business writing is the "Bottom Line Up Front" approach. Put your core request in the opening sentence with a clear call-to-action.',
      'Use bullet points for key details, maintain a polite yet concise tone, and always specify the exact deadline if you need a decision.',
    ],
    banglaContent: [
      'ব্যস্ত পেশাজীবীরা প্রতিদিন একশরও বেশি ইমেইল পেয়ে থাকেন। আপনার ইমেইল যদি অহেতুক দীর্ঘ এবং অস্পষ্ট হয়, তবে প্রাপক তা পড়া স্থগিত রাখবেন।',
      'কার্যকর ব্যবসায়িক ইমেইল লেখার গোপন সূত্র হলো "বটম লাইন আপ ফ্রন্ট" পদ্ধতি। অর্থাৎ প্রথম বাক্যেই আপনার মূল অনুরোধ ও কাজের আহ্বান পরিষ্কার রাখুন।',
      'গুরুত্বপূর্ণ তথ্যের জন্য বুলেট পয়েন্ট ব্যবহার করুন, বিনম্র কিন্তু সংক্ষিপ্ত সুর বজায় রাখুন এবং কোনো সিদ্ধান্তের প্রয়োজন হলে নির্দিষ্ট ডেডলাইন উল্লেখ করুন।',
    ],
    keyVocab: [
      { word: 'recipient', ipa: '/rɪˈsɪp.i.ənt/', banglaPronunciation: 'রিসিপিয়েন্ট', meaning: 'প্রাপক / যিনি গ্রহণ করেন', pos: 'noun' },
      { word: 'postpone', ipa: '/poʊstˈpoʊn/', banglaPronunciation: 'পোস্টপোন', meaning: 'স্থগিত রাখা / পিছিয়ে দেওয়া', pos: 'verb' },
      { word: 'concise', ipa: '/kənˈsaɪs/', banglaPronunciation: 'কনসাইস', meaning: 'সংক্ষিপ্ত অথচ তথ্যবহুল', pos: 'adjective' },
      { word: 'specify', ipa: '/ˈspes.ə.faɪ/', banglaPronunciation: 'স্পেসিফাই', meaning: 'স্পষ্ট করে নির্দিষ্ট করা', pos: 'verb' },
      { word: 'approach', ipa: '/əˈproʊtʃ/', banglaPronunciation: 'অ্যাপ্রোচ', meaning: 'কৌশল বা দৃষ্টিভঙ্গি', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What is the "Bottom Line Up Front" approach in email writing?',
      questionBangla: 'ইমেইল লেখায় "বটম লাইন আপ ফ্রন্ট" পদ্ধতি বলতে কী বোঝায়?',
      options: ['Writing long paragraphs at the end', 'Putting the core request in the opening sentence', 'Sending emails at midnight', 'Using informal slang'],
      correctIndex: 1,
      explanationBangla: 'পদ্ধতিটি হলো: "Put your core request in the opening sentence with a clear call-to-action"।',
    },
  },

  // 3. Travel & Exploration
  {
    id: 'story-7',
    title: 'Navigating Heathrow Airport Smoothly',
    titleBangla: 'হিথ্রো আন্তর্জাতিক বিমানবন্দরে সাবলীল নেভিগেশন',
    level: 'Elementary',
    readTime: '4 min',
    category: 'Travel',
    categoryBangla: 'ভ্রমণ ও পর্যটন',
    englishContent: [
      'After landing at London Heathrow Terminal 2, Nabila followed the illuminated signs toward Passport Control. Thousands of international travelers were moving through the corridors.',
      'At the immigration booth, the border officer asked courteously: "What is the purpose of your visit to the United Kingdom?" Nabila handed over her passport with a smile.',
      '"I am attending an educational conference on climate science in Oxford for five days, followed by two days of sightseeing," she answered precisely.',
      '"Enjoy your stay in England!" the officer said, stamping her entry visa. Preparation turns travel anxiety into excitement.',
    ],
    banglaContent: [
      'লন্ডন হিথ্রো টার্মিনাল ২-এ অবতরণের পর নাবিলা আলোকিত নির্দেশিকা অনুসরণ করে পাসপোর্ট কন্ট্রোলের দিকে এগিয়ে গেলেন। হাজার হাজার আন্তর্জাতিক যাত্রী করিডোর দিয়ে যাচ্ছিলেন।',
      'ইমিগ্রেশন বুথে বর্ডার অফিসার বিনয়ের সাথে জানতে চাইলেন: "যুক্তরাজ্যে আপনার সফরের উদ্দেশ্য কী?" নাবিলা হাসিমুখে তার পাসপোর্ট এগিয়ে দিলেন।',
      '"আমি অক্সফোর্ডে জলবায়ু বিজ্ঞান বিষয়ক পাঁচ দিনের একটি শিক্ষামূলক কনফারেন্সে অংশ নিচ্ছি এবং এরপর দুই দিন দর্শনীয় স্থান ঘুরে দেখব," নিখুঁতভাবে উত্তর দিলেন তিনি।',
      '"ইংল্যান্ডে আপনার ভ্রমণ আনন্দদায়ক হোক!" ভিসা স্ট্যাম্প করে বললেন অফিসার। প্রস্তুতি ভ্রমণের ভয়কে রোমাঞ্চে বদলে দেয়।',
    ],
    keyVocab: [
      { word: 'illuminated', ipa: '/ɪˈluː.mə.neɪ.t̬ɪd/', banglaPronunciation: 'ইলুমিনেটেড', meaning: 'আলো দিয়ে আলোকিত করা', pos: 'adjective' },
      { word: 'courteously', ipa: '/ˈkɜːr.t̬i.əs.li/', banglaPronunciation: 'কার্টিয়াসলি', meaning: 'ভদ্রতা ও শিষ্টাচারের সাথে', pos: 'adverb' },
      { word: 'conference', ipa: '/ˈkɑːn.fɚ.əns/', banglaPronunciation: 'কনফারেন্স', meaning: 'সম্মেলন বা আলোচনা সভা', pos: 'noun' },
      { word: 'sightseeing', ipa: '/ˈsaɪtˌsiː.ɪŋ/', banglaPronunciation: 'সাইটসিয়িং', meaning: 'দর্শনীয় স্থান ঘুরে দেখা', pos: 'noun' },
      { word: 'anxiety', ipa: '/æŋˈzaɪ.ə.t̬i/', banglaPronunciation: 'অ্যাংজাইটি', meaning: 'উদ্বেগ বা মনের অস্থিরতা', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'Why was Nabila visiting the United Kingdom?',
      questionBangla: 'নাবিলা কেন যুক্তরাজ্য সফর করছিলেন?',
      options: ['To buy a new apartment', 'To attend a climate conference in Oxford', 'To search for a permanent job', 'To visit relatives in Manchester'],
      correctIndex: 1,
      explanationBangla: 'নাবিলা বলেছিলেন: "attending an educational conference on climate science in Oxford for five days..."।',
    },
  },
  {
    id: 'story-8',
    title: 'Checking into a Boutique Hotel in Istanbul',
    titleBangla: 'ইস্তাম্বুলের বুটিক হোটেলে চেক-ইন করার অভিজ্ঞতা',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Travel',
    categoryBangla: 'ভ্রমণ ও পর্যটন',
    englishContent: [
      'Farhan stepped into the historic hotel near the Sultanahmet district. The marble foyer was adorned with handcrafted Turkish lanterns and fragrant roses.',
      '"Welcome to Istanbul, sir! Do you have a reservation under your name?" the concierge inquired with a cordial greeting.',
      '"Yes, I booked a deluxe room with a Bosphorus sea view under the name Farhan Kabir," he replied, presenting his booking voucher.',
      '"Your room key is ready. Breakfast is served on the terrace overlooking the blue sea from seven to ten." Farhan thanked the staff and headed to the elevator.',
    ],
    banglaContent: [
      'সুলতানাহমেত এলাকার কাছে একটি ঐতিহ্যবাহী হোটেলে ফারহান প্রবেশ করলেন। মার্বেল পাথরের লবিটি হস্তশিল্পের তুর্কি লণ্ঠন এবং সুবাসিত গোলাপ দিয়ে সাজানো ছিল।',
      '"ইস্তাম্বুলে স্বাগতম, স্যার! আপনার নামে কি কোনো বুকিং আছে?" আন্তরিক অভ্যর্থনা জানিয়ে জিজ্ঞেস করলেন দারোয়ান/রিসেপশনিস্ট।',
      '"হ্যাঁ, আমি ফারহান কবির নামে বসফরাস সমুদ্রের ভিউসহ একটি ডিলাক্স রুম বুক করেছি," বুকিং ভাউচার দেখিয়ে উত্তর দিলেন তিনি।',
      '"আপনার রুমের চাবি প্রস্তুত। সকাল সাতটা থেকে দশটা পর্যন্ত নীল সমুদ্র দেখা যায় এমন ছাদে নাস্তা পরিবেশন করা হয়।" ফারহান কর্মীদের ধন্যবাদ জানিয়ে লিফটের দিকে এগিয়ে গেলেন।',
    ],
    keyVocab: [
      { word: 'adorned', ipa: '/əˈdɔːrnd/', banglaPronunciation: 'অ্যাডার্নড', meaning: 'সজ্জিত বা অলংকৃত', pos: 'adjective' },
      { word: 'concierge', ipa: '/kɑːn.siˈerʒ/', banglaPronunciation: 'কনসিয়ার্জ', meaning: 'হোটেল কর্মী যিনি অতিথিদের সহায়তা করেন', pos: 'noun' },
      { word: 'cordial', ipa: '/ˈkɔːr.dʒəl/', banglaPronunciation: 'কর্ডিয়াল', meaning: 'আন্তরিক ও উষ্ণ', pos: 'adjective' },
      { word: 'terrace', ipa: '/ˈter.əs/', banglaPronunciation: 'টেরেস', meaning: 'ছাদ বা খোলা বারান্দা', pos: 'noun' },
      { word: 'overlooking', ipa: '/ˌoʊ.vɚˈlʊk.ɪŋ/', banglaPronunciation: 'ওভারলুকিং', meaning: 'উপর থেকে সুন্দর দৃশ্য দেখা যায় এমন', pos: 'adjective' },
    ],
    comprehensionQuestion: {
      question: 'Where is breakfast served in the hotel?',
      questionBangla: 'হোটেলটিতে নাস্তা কোথায় পরিবেশন করা হয়?',
      options: ['In the basement kitchen', 'On the terrace overlooking the sea', 'Outside at the bus station', 'Only inside the elevator'],
      correctIndex: 1,
      explanationBangla: 'রিসেপশনিস্ট বলেছিলেন: "Breakfast is served on the terrace overlooking the blue sea..."।',
    },
  },
  {
    id: 'story-9',
    title: 'Lost in Tokyo: Asking Friendly Locals for Directions',
    titleBangla: 'টোকিওর রাস্তায় দিকভ্রান্ত: পথচারীদের সাহায্য নেওয়ার গল্প',
    level: 'Elementary',
    readTime: '3 min',
    category: 'Travel',
    categoryBangla: 'ভ্রমণ ও পর্যটন',
    englishContent: [
      'While exploring Shibuya, Zayan discovered that his smartphone battery had died. He needed to find the nearest subway entrance to reach his station.',
      'He approached a young Japanese commuter politely: "Excuse me, could you please point me toward Shibuya Station?"',
      'The woman bowed gently and replied in simple English: "Walk straight ahead for two blocks, then turn left at the bookstore. You will see the green subway sign."',
      'Zayan thanked her with heartfelt gratitude: "Arigato gozaimasu, thank you so much!" Clear courtesy transcends all language borders.',
    ],
    banglaContent: [
      'শিবুয়া ঘুরে দেখার সময় জায়ান আবিষ্কার করলেন তার স্মার্টফোনের চার্জ শেষ হয়ে গেছে। নিজের স্টেশনে পৌঁছানোর জন্য তার নিকটস্থ পাতাল রেলের প্রবেশপথ খুঁজে পাওয়া দরকার ছিল।',
      'তিনি একজন জাপানি পথচারীর কাছে বিনয়ের সাথে এগিয়ে গেলেন: "শুনুন, আমাকে কি অনুগ্রহ করে শিবুয়া স্টেশনের দিক দেখিয়ে দেওয়া যাবে?"',
      'মহিলাটি মার্জিতভাবে মাথা নিচু করে সহজ ইংরেজিতে বললেন: "সোজা দুই ব্লক হেঁটে যান, তারপর বইয়ের দোকানের কাছে বামে মোড় নিন। আপনি সবুজ রঙের সাবওয়ে চিহ্ন দেখতে পাবেন।"',
      'জায়ান আন্তরিক কৃতজ্ঞতা জানিয়ে বললেন: "আরিগাতো গুজাইমাসু, আপনাকে অসংখ্য ধন্যবাদ!" সুন্দর ভদ্রতা সব ভাষার সীমানা ছাড়িয়ে যায়।',
    ],
    keyVocab: [
      { word: 'commuter', ipa: '/kəˈmjuː.t̬ɚ/', banglaPronunciation: 'কমিউটার', meaning: 'দৈনিক যাতায়াতকারী যাত্রী', pos: 'noun' },
      { word: 'approached', ipa: '/əˈproʊtʃt/', banglaPronunciation: 'অ্যাপ্রোচড', meaning: 'কাছে এগিয়ে গেল', pos: 'verb' },
      { word: 'gratitude', ipa: '/ˈɡræt̬.ə.tuːd/', banglaPronunciation: 'গ্র্যাটিচিউড', meaning: 'কৃতজ্ঞতা বা ধন্যবাদবোধ', pos: 'noun' },
      { word: 'courtesy', ipa: '/ˈkɝː.t̬ə.si/', banglaPronunciation: 'কার্টাসি', meaning: 'ভদ্রতা ও শিষ্টাচার', pos: 'noun' },
      { word: 'transcend', ipa: '/trænˈsend/', banglaPronunciation: 'ট্রান্সেন্ড', meaning: 'সীমানা ছাড়িয়ে যাওয়া', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'Where was Zayan told to turn left?',
      questionBangla: 'জায়ানকে কোন স্থানের কাছে বামে মোড় নিতে বলা হয়েছিল?',
      options: ['At the coffee shop', 'At the bookstore (বইয়ের দোকান)', 'Near the police station', 'At the traffic signal'],
      correctIndex: 1,
      explanationBangla: 'মহিলাটি বলেছিলেন: "turn left at the bookstore" (বইয়ের দোকানের কাছে বামে মোড় নিন)।',
    },
  },

  // 4. Dining & Food
  {
    id: 'story-10',
    title: 'Ordering Dinner at an Authentic Restaurant',
    titleBangla: 'রেস্তোরাঁয় ডিনার অর্ডার ও খাবারের অভিজ্ঞতা',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Dining',
    categoryBangla: 'খাদ্য ও রেস্তোরাঁ',
    englishContent: [
      'Mitu and her brother decided to dine out at an Italian restaurant. The waiter guided them to a cozy table near the window overlooking the street lights.',
      '"Good evening! Are you ready to order, or would you prefer a few more minutes with the menu?" the waiter asked politely. Mitu smiled, "Could you please recommend your most popular pasta?"',
      '"Our creamy garlic fettuccine is exceptional," the waiter replied. "We will have one fettuccine, a green salad, and sparkling water, please," Mitu ordered with confidence. Polite ordering makes dining overseas effortless.',
    ],
    banglaContent: [
      'মিতু এবং তার ভাই একটি ইতালীয় রেস্তোরাঁয় ডিনার করার সিদ্ধান্ত নিলেন। ওয়েটার তাদের রাস্তার বাতির দিকে মুখ করা জানালার পাশের একটি আরামদায়ক টেবিলে নিয়ে গেলেন।',
      '"শুভ সন্ধ্যা! আপনারা কি অর্ডার দিতে প্রস্তুত, নাকি মেনু দেখার জন্য আরও কিছুক্ষণ সময় নেবেন?" ওয়েটার বিনয়ের সাথে জানতে চাইলেন। মিতু হাসলেন, "আপনি কি অনুগ্রহ করে আপনাদের সবচেয়ে জনপ্রিয় পাস্তার সুপারিশ করতে পারবেন?"',
      '"আমাদের ক্রিমি গার্লিক ফেটুচিনি অসাধারণ," ওয়েটার উত্তর দিলেন। "আমাদের একটি ফেটুচিনি, একটি গ্রিন সালাদ এবং স্পার্কলিং ওয়াটার দিন, প্লিজ," মিতু আত্মবিশ্বাসের সাথে অর্ডার করলেন। সুন্দরভাবে কথা বলে অর্ডার দিলে বিদেশে আহারের অভিজ্ঞতা চমৎকার হয়।',
    ],
    keyVocab: [
      { word: 'recommend', ipa: '/ˌrɛkəˈmɛnd/', banglaPronunciation: 'রেকামেন্ড', meaning: 'সুপারিশ বা প্রস্তাব করা', pos: 'verb' },
      { word: 'exceptional', ipa: '/ɪkˈsɛpʃənl/', banglaPronunciation: 'এক্সেপশনাল', meaning: 'অসাধারণ / ব্যতিক্রমী দারুণ', pos: 'adjective' },
      { word: 'prefer', ipa: '/prɪˈfɜːr/', banglaPronunciation: 'প্রিফার', meaning: 'বেশি পছন্দ করা বা প্রাধান্য দেওয়া', pos: 'verb' },
      { word: 'effortless', ipa: '/ˈɛfərtlɪs/', banglaPronunciation: 'এফোর্টলেস', meaning: 'সহজসাধ্য / অনায়াসলব্ধ', pos: 'adjective' },
      { word: 'sparkling', ipa: '/ˈspɑːr.klɪŋ/', banglaPronunciation: 'স্পার্কলিং', meaning: 'বুদ্বুদযুক্ত পানীয়', pos: 'adjective' },
    ],
    comprehensionQuestion: {
      question: 'What pasta dish did the waiter recommend to Mitu?',
      questionBangla: 'ওয়েটার মিতুকে কোন পাস্তা ডিশটির সুপারিশ করেছিলেন?',
      options: ['Spicy tomato spaghetti', 'Creamy garlic fettuccine', 'Fried rice platter', 'Cold vegetable noodles'],
      correctIndex: 1,
      explanationBangla: 'ওয়েটার উত্তর দিয়েছিলেন: "Our creamy garlic fettuccine is exceptional."',
    },
  },
  {
    id: 'story-11',
    title: 'The Secret Spice: A Culinary Journey in Old Dhaka',
    titleBangla: 'পুরান ঢাকার বিরিয়ানি ও ঐতিহ্যের স্বাদ অনুসন্ধান',
    level: 'Elementary',
    readTime: '4 min',
    category: 'Dining',
    categoryBangla: 'খাদ্য ও রেস্তোরাঁ',
    englishContent: [
      'Stepping into the narrow alleys of Nazira Bazar, the mouthwatering fragrance of slow-cooked Kacchi Biryani welcomes every visitor.',
      'The master chef stirs a massive copper pot over glowing coals. Tender pieces of mutton, fragrant chinigura rice, and saffron-infused potatoes meld into culinary perfection.',
      'Food writers from around the globe praise this centuries-old tradition. True taste is not just about ingredients; it is an inheritance of love, patience, and heritage.',
    ],
    banglaContent: [
      'নাজিরা বাজারের সরু গলিতে প্রবেশ করতেই ধিমে আঁচে রান্না করা কাচ্চি বিরিয়ানির জিভে জল আনা সুবাস প্রত্যেক দর্শনার্থীকে স্বাগত জানায়।',
      'প্রধান বাবুর্চি জ্বলন্ত কয়লার ওপর বসানো বিশালাকার তামার হাঁড়িতে বড় চামচ দিয়ে নাড়াচাড়া করছেন। খাসির নরম মাংস, সুবাসিত চিনিগুঁড়া চাল এবং জাফরানের আলু এক অনন্য স্বাদের মেলবন্ধন ঘটিয়েছে।',
      'বিশ্বের নানা প্রান্তের খাদ্য লেখকরা এই শতবর্ষী ঐতিহ্যের ভূয়সী প্রশংসা করেন। খাঁটি স্বাদ কেবল উপকরণের বিষয় নয়; এটি ভালোবাসা, ধৈর্য ও ঐতিহ্যের উত্তরাধিকার।',
    ],
    keyVocab: [
      { word: 'mouthwatering', ipa: '/ˈmaʊθˌwɑː.t̬ɚ.ɪŋ/', banglaPronunciation: 'মাউথওয়াটারিং', meaning: 'জিভে জল আনা লোভনীয়', pos: 'adjective' },
      { word: 'infused', ipa: '/ɪnˈfjuːzd/', banglaPronunciation: 'ইনফিউজড', meaning: 'সুবাস বা রঙে মিশ্রিত', pos: 'adjective' },
      { word: 'culinary', ipa: '/ˈkʌl.ə.ner.i/', banglaPronunciation: 'কালিনারি', meaning: 'রান্না ও রন্ধনশিল্প সম্পর্কিত', pos: 'adjective' },
      { word: 'inheritance', ipa: '/ɪnˈher.ə.t̬əns/', banglaPronunciation: 'ইনহেরিট্যান্স', meaning: 'উত্তরাধিকার সূত্রে পাওয়া ঐতিহ্য', pos: 'noun' },
      { word: 'heritage', ipa: '/ˈher.ə.t̬ɪdʒ/', banglaPronunciation: 'হেরিটেজ', meaning: 'ঐতিহাসিক ঐতিহ্য', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What kind of pot was used to cook the Kacchi Biryani?',
      questionBangla: 'কাচ্চি বিরিয়ানি রান্না করতে কোন ধরনের হাঁড়ি ব্যবহার করা হয়েছিল?',
      options: ['Plastic microwave container', 'Massive copper pot (বিশাল তামার হাঁড়ি)', 'Small glass bowl', 'Thin aluminum pan'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে বলা হয়েছে: "stirs a massive copper pot over glowing coals"।',
    },
  },

  // 5. Mindset & Inspiration
  {
    id: 'story-12',
    title: 'Overcoming the Fear of Speaking in Public',
    titleBangla: 'জনসমক্ষে কথা বলার ভয় জয় করার বাস্তব উপায়',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Mindset',
    categoryBangla: 'অনুপ্রেরণা ও দর্শন',
    englishContent: [
      'Glossophobia, the fear of public speaking, affects over seventy percent of adults across the globe. Sweaty palms and a racing heartbeat are completely natural biological reactions.',
      'The breakthrough happens when you shift your mental focus. Instead of worrying about what the audience thinks of you, focus entirely on the valuable message you are gifting them.',
      'Practice your presentation out loud five times. Breathe deeply from your diaphragm. With practice, nervous energy transforms into genuine passion and authority.',
    ],
    banglaContent: [
      'গ্লোসোফোবিয়া বা জনসমক্ষে কথা বলার ভীতি বিশ্বজুড়ে শতকরা সত্তর ভাগেরও বেশি প্রাপ্তবয়স্ক মানুষের মধ্যে দেখা যায়। হাতের তালু ঘেমে যাওয়া এবং দ্রুত হৃদস্পন্দন হওয়া অত্যন্ত স্বাভাবিক জৈবিক প্রতিক্রিয়া।',
      'সাফল্য তখনই আসে যখন আপনি নিজের মানসিক মনোযোগ ঘুরিয়ে দেন। দর্শকরা আপনাকে নিয়ে কী ভাবছে সেই দুশ্চিন্তা বাদ দিয়ে, তাদের জন্য আপনার বক্তব্যের মূল্যবান উপকারের দিকে দৃষ্টি নিবদ্ধ করুন।',
      'অন্তত পাঁচবার জোরে জোরে আপনার বক্তব্যটি রিহার্সাল করুন। পেট থেকে গভীর শ্বাস নিন। নিয়মিত অনুশীলনে ভয়ের শক্তি আন্তরিক অনুপ্রেরণা ও ব্যক্তিত্বে রূপান্তরিত হয়।',
    ],
    keyVocab: [
      { word: 'reaction', ipa: '/riˈæk.ʃən/', banglaPronunciation: 'রিঅ্যাকশন', meaning: 'প্রতিক্রিয়া', pos: 'noun' },
      { word: 'breakthrough', ipa: '/ˈbreɪkˌθruː/', banglaPronunciation: 'ব্রেকব্রু', meaning: 'যুগান্তকারী সাফল্য বা মোড় পরিবর্তন', pos: 'noun' },
      { word: 'diaphragm', ipa: '/ˈdaɪ.ə.fræm/', banglaPronunciation: 'ডায়াফ্রাম', meaning: 'বুকের নিচের মধ্যচ্ছদা মাংসপেশি', pos: 'noun' },
      { word: 'genuine', ipa: '/ˈdʒen.ju.ɪn/', banglaPronunciation: 'জেনুইন', meaning: 'খাঁটি ও আন্তরিক', pos: 'adjective' },
      { word: 'authority', ipa: '/əˈθɔːr.ə.t̬i/', banglaPronunciation: 'অথরিটি', meaning: 'দৃঢ় আত্মবিশ্বাস ও প্রভাব', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What mental shift helps overcome the fear of public speaking?',
      questionBangla: 'জনসমক্ষে কথা বলার ভয় কাটাতে কোন মানসিক দৃষ্টিভঙ্গি সাহায্য করে?',
      options: ['Memorizing thousands of slides', 'Focusing on the value of the message for the audience', 'Avoiding eye contact forever', 'Speaking as fast as possible'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "focus entirely on the valuable message you are gifting them"।',
    },
  },
  {
    id: 'story-13',
    title: 'The Compound Effect of Thirty Daily Words',
    titleBangla: 'প্রতিদিনের শব্দ শেখার চক্রবৃদ্ধি শক্তি ও আত্মবিশ্বাস',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Mindset',
    categoryBangla: 'অনুপ্রেরণা ও দর্শন',
    englishContent: [
      'Most language learners give up because they look at the mountain of the English dictionary and feel overwhelmed.',
      'A wise student understands the law of compounding. If you master just five smart words every single day, you will know over one thousand eight hundred words in a single year.',
      'That is more than enough to understand eighty percent of all daily news, workplace discussions, and podcast episodes. Do not count the days; make the days count.',
    ],
    banglaContent: [
      'অধিকাংশ ভাষা শিক্ষার্থী হাল ছেড়ে দেন কারণ তারা পুরো ইংরেজি অভিধানের পাহাড় দেখে নিজেকে অসহায় বোধ করেন।',
      'একজন প্রজ্ঞাবান শিক্ষার্থী চক্রবৃদ্ধির নিয়ম বোঝেন। আপনি যদি প্রতিদিন মাত্র পাঁচটি স্মার্ট শব্দ নিখুঁতভাবে আয়ত্ত করেন, তবে এক বছরে আপনার ঝুলিতে থাকবে ১,৮০০-র বেশি শব্দ।',
      'দৈনন্দিন খবরের কাগজ, অফিসের কথোপকথন এবং পডকাস্টের শতকরা আশি ভাগ বোঝার জন্য এটি যথেষ্টের চেয়েও বেশি। দিন গণনা করবেন না; প্রতিটি দিনকে অর্থপূর্ণ করে তুলুন।',
    ],
    keyVocab: [
      { word: 'overwhelmed', ipa: '/ˌoʊ.vɚˈwelmd/', banglaPronunciation: 'ওভারহোয়েলমড', meaning: 'চাপ বা চিন্তায় দিশেহারা', pos: 'adjective' },
      { word: 'compounding', ipa: '/kəmˈpaʊn.dɪŋ/', banglaPronunciation: 'কম্পাউন্ডিং', meaning: 'চক্রবৃদ্ধি হারে সঞ্চিত হওয়া', pos: 'noun' },
      { word: 'discussion', ipa: '/dɪˈskʌʃ.ən/', banglaPronunciation: 'ডিসকাশন', meaning: 'আলোচনা বা মতবিনিময়', pos: 'noun' },
      { word: 'enough', ipa: '/ɪˈnʌf/', banglaPronunciation: 'এনাফ', meaning: 'পর্যাপ্ত বা যথেষ্ট', pos: 'adjective' },
      { word: 'count', ipa: '/kaʊnt/', banglaPronunciation: 'কাউন্ট', meaning: 'গণনা করা বা মূল্য রাখা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'How many words can a learner master in a year by learning five words a day?',
      questionBangla: 'প্রতিদিন পাঁচটি শব্দ শিখলে এক বছরে কত শব্দ আয়ত্ত করা যায়?',
      options: ['About 300 words', 'Over 1,800 words (১৮০০-র বেশি)', 'Exactly 50 words', 'Over 100,000 words'],
      correctIndex: 1,
      explanationBangla: '৫ x ৩৬৫ = ১,৮২৫ শব্দ (Over one thousand eight hundred words in a single year)।',
    },
  },

  // 6. Science & Technology
  {
    id: 'story-14',
    title: 'How Artificial Intelligence is Changing Medicine',
    titleBangla: 'কৃত্রিম বুদ্ধিমত্তা কীভাবে চিকিৎসা বিজ্ঞানের রূপ বদলাচ্ছে',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Science',
    categoryBangla: 'বিজ্ঞান ও প্রযুক্তি',
    englishContent: [
      'In modern diagnostic clinics, AI algorithms are scanning thousands of X-rays and MRI images in mere seconds to detect microscopic anomalies.',
      'By analyzing patient records and genomic data, intelligent models assist oncologists in tailoring personalized cancer therapies with unprecedented precision.',
      'Technology does not replace doctors; it empowers them with analytical superpowers. Compassion and computing work hand-in-hand to save precious lives.',
    ],
    banglaContent: [
      'আধুনিক রোগনির্ণয় ক্লিনিকে এআই অ্যালগরিদম চোখের পলকে হাজার হাজার এক্স-রে এবং এমআরআই স্ক্যান বিশ্লেষণ করে সূক্ষ্ম অসঙ্গতি শনাক্ত করছে।',
      'রোগীর পূর্ব ইতিহাস এবং জিনোম তথ্য পর্যালোচনা করে বুদ্ধিমান মডেলগুলো ক্যান্সার বিশেষজ্ঞদের অভূতপূর্ব নিখুঁতভাবে ব্যক্তিগত থেরাপি নির্ধারণে সাহায্য করে।',
      'প্রযুক্তি চিকিৎসকদের বিকল্প নয়; বরং এটি তাদের বিশ্লেষণাত্মক সক্ষমতাকে বহুগুণ বাড়িয়ে দেয়। মূল্যবান প্রাণ রক্ষায় সহমর্মিতা ও কম্পিউটার বিজ্ঞান কাঁধে কাঁধ মিলিয়ে কাজ করছে।',
    ],
    keyVocab: [
      { word: 'diagnostic', ipa: '/ˌdaɪ.əɡˈnɑː.stɪk/', banglaPronunciation: 'ডায়াগনস্টিক', meaning: 'রোগ নির্ণয় সংক্রান্ত', pos: 'adjective' },
      { word: 'anomaly', ipa: '/əˈnɑː.mə.li/', banglaPronunciation: 'অ্যানোমালি', meaning: 'অস্বাভাবিক বা ব্যতিক্রমী কিছু', pos: 'noun' },
      { word: 'oncologist', ipa: '/ɑːnˈkɑː.lə.dʒɪst/', banglaPronunciation: 'অনকোলজিস্ট', meaning: 'ক্যান্সার বিশেষজ্ঞ চিকিৎসক', pos: 'noun' },
      { word: 'precision', ipa: '/prəˈsɪʒ.ən/', banglaPronunciation: 'প্রিসিশন', meaning: 'পরম নিখুঁততা', pos: 'noun' },
      { word: 'compassion', ipa: '/kəmˈpæʃ.ən/', banglaPronunciation: 'কমপ্যাশন', meaning: 'গভীর সহমর্মিতা ও মানবতাবোধ', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What is the role of AI in medicine according to the passage?',
      questionBangla: 'অনুচ্ছেদ অনুযায়ী চিকিৎসাক্ষেত্রে এআই-এর ভূমিকা কী?',
      options: ['It replaces all doctors completely', 'It empowers doctors with analytical precision', 'It closes down hospitals', 'It bans patient data'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "empowers them with analytical superpowers... work hand-in-hand to save lives"।',
    },
  },
  {
    id: 'story-15',
    title: 'The James Webb Telescope and Secrets of the Deep Cosmos',
    titleBangla: 'জেমস ওয়েব স্পেস টেলিস্কোপ ও মহাবিশ্বের আদি রহস্য',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Science',
    categoryBangla: 'বিজ্ঞান ও প্রযুক্তি',
    englishContent: [
      'Stationed one million miles away from Earth at Lagrange Point 2, the James Webb Space Telescope captures infrared light from the earliest infant galaxies.',
      'Its massive gold-coated beryllium mirrors unfold like an origami flower in the frozen vacuum of space. It peers back over thirteen billion years into cosmic history.',
      'Every sparkling dot in deep space images is not a star, but an entire galaxy containing hundreds of billions of suns. We are truly children of the stardust.',
    ],
    banglaContent: [
      'পৃথিবী থেকে দশ লাখ মাইল দূরে ল্যাগ্রাঞ্জ পয়েন্ট ২-এ অবস্থান নিয়ে জেমস ওয়েব স্পেস টেলিস্কোপ মহাবিশ্বের প্রথম যুগের শিশু ছায়াপথগুলোর ইনফ্রারেড আলো ধারণ করছে।',
      'মহাশূন্যের বরফশীতল শূন্যতায় এর বিশালাকার সোনার প্রলেপযুক্ত বেরিলিয়াম আয়নাগুলো ওরিগামি ফুলের মতো উন্মোচিত হয়েছিল। এটি তেরো বিলিয়ন বছর আগের মহাজাগতিক ইতিহাসের দিকে দৃষ্টিপাত করে।',
      'ডিপ স্পেস ছবির প্রতিটি জ্বলজ্বলে বিন্দু কোনো একক তারা নয়, বরং শত শত কোটি সূর্য ধারণকারী একটি সম্পূর্ণ ছায়াপথ। আমরা সকলেই প্রকৃতপক্ষে মহাজাগতিক ধূলিকণার সন্তান।',
    ],
    keyVocab: [
      { word: 'infrared', ipa: '/ˌɪn.frəˈred/', banglaPronunciation: 'ইনফ্রারেড', meaning: 'অবলোহিত আলোকরশ্মি', pos: 'adjective' },
      { word: 'beryllium', ipa: '/bəˈrɪl.i.əm/', banglaPronunciation: 'বেরিলিয়াম', meaning: 'হালকা কিন্তু অতিমজবুত ধাতু', pos: 'noun' },
      { word: 'vacuum', ipa: '/ˈvæk.juːm/', banglaPronunciation: 'ভ্যাকুয়াম', meaning: 'বাতাসহীন মহাশূন্য', pos: 'noun' },
      { word: 'cosmic', ipa: '/ˈkɑːz.mɪk/', banglaPronunciation: 'কসমিক', meaning: 'মহাজাগতিক বা বিশ্বব্রহ্মাণ্ড সংক্রান্ত', pos: 'adjective' },
      { word: 'stardust', ipa: '/ˈstɑːr.dʌst/', banglaPronunciation: 'স্টারডাস্ট', meaning: 'মহাজাগতিক নক্ষত্রধূলি', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'How far back into cosmic history can the James Webb telescope peer?',
      questionBangla: 'জেমস ওয়েব টেলিস্কোপ মহাজাগতিক ইতিহাসের কত দূর অতীতে তাকাতে পারে?',
      options: ['Only ten years', 'Over thirteen billion years (তেরো বিলিয়ন বছরের বেশি)', 'Fifty thousand days', 'Two centuries'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "peers back over thirteen billion years into cosmic history"।',
    },
  },

  // 7. Nature & Wildlife
  {
    id: 'story-16',
    title: 'Guardians of the Sundarbans Mangrove',
    titleBangla: 'সুন্দরবনের শ্বাসমূল অরণ্য ও জীববৈচিত্র্যের অতন্দ্র প্রহরী',
    level: 'Elementary',
    readTime: '4 min',
    category: 'Nature',
    categoryBangla: 'প্রকৃতি ও পরিবেশ',
    englishContent: [
      'Spanning across southern Bangladesh, the Sundarbans stands as the largest tidal halophytic mangrove forest on planet Earth.',
      'Pneumatophores, or breathing roots, rise like wooden spikes from the muddy banks to capture oxygen during high tide.',
      'This dense jungle provides a sanctuary for the majestic Royal Bengal Tiger, spotted deer, and saltwater crocodiles, while defending coastal villages from deadly cyclones.',
    ],
    banglaContent: [
      'দক্ষিণ বাংলাদেশ জুড়ে বিস্তৃত সুন্দরবন হলো পৃথিবীর বুকে বৃহত্তম জোয়ার-ভাটার লবণাক্ত শ্বাসমূল ম্যানগ্রোভ বন।',
      'নিউমাটোফোর বা শ্বাসমূলগুলো জোয়ারের সময় কাদামাটি ভেদ করে পেরেকের মতো খাড়া হয়ে দাঁড়িয়ে বাতাস থেকে অক্সিজেন গ্রহণ করে।',
      'এই নিবিড় অরণ্য মহিমান্বিত রয়েল বেঙ্গল টাইগার, চিত্রা হরিণ এবং লোনা জলের কুমিরদের অভয়ারণ্য প্রদান করে, পাশাপাশি প্রলয়ঙ্করী ঘূর্ণিঝড় থেকে উপকূলীয় জনপদকে বুক দিয়ে রক্ষা করে।',
    ],
    keyVocab: [
      { word: 'mangrove', ipa: '/ˈmæŋ.ɡroʊv/', banglaPronunciation: 'ম্যানগ্রোভ', meaning: 'উপকূলীয় লবণাক্ত জলের বন', pos: 'noun' },
      { word: 'pneumatophore', ipa: '/njuːˈmæt.ə.fɔːr/', banglaPronunciation: 'নিউমাটোফোর', meaning: 'শ্বাসমূল উদ্ভিদ অঙ্গ', pos: 'noun' },
      { word: 'sanctuary', ipa: '/ˈsæŋk.tʃu.er.i/', banglaPronunciation: 'স্যাঙ্কচুয়ারি', meaning: 'অভয়ারণ্য বা নিরাপদ আশ্রয়', pos: 'noun' },
      { word: 'majestic', ipa: '/məˈdʒes.tɪk/', banglaPronunciation: 'ম্যাজেস্টিক', meaning: 'মহিমান্বিত ও রাজকীয়', pos: 'adjective' },
      { word: 'coastal', ipa: '/ˈkoʊ.stəl/', banglaPronunciation: 'কোস্টাল', meaning: 'উপকূলবর্তী এলাকা', pos: 'adjective' },
    ],
    comprehensionQuestion: {
      question: 'What special roots rise from the mud to capture oxygen in the Sundarbans?',
      questionBangla: 'সুন্দরবনে অক্সিজেন গ্রহণের জন্য কাদা থেকে কোন বিশেষ মূল উপরে ওঠে?',
      options: ['Taproots', 'Pneumatophores (শ্বাসমূল)', 'Flower petals', 'Tree leaves'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে বলা হয়েছে: "Pneumatophores, or breathing roots, rise like wooden spikes..."।',
    },
  },
  {
    id: 'story-17',
    title: 'The Great Migration of the Serengeti',
    titleBangla: 'সেরেঙ্গেটির মহাবিস্ময়কর বন্যপ্রাণী পরিযান',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Nature',
    categoryBangla: 'প্রকৃতি ও পরিবেশ',
    englishContent: [
      'Each year, over one and a half million wildebeest, accompanied by zebras and gazelles, embark on an epic circular journey across Tanzania and Kenya.',
      'Driven by the primal instinct to follow the rain and fresh grasslands, they brave crocodile-infested rivers and stalking lion prides.',
      'The Great Migration reminds humanity of the eternal rhythms of our living Earth. Nature does not hurry, yet everything is accomplished.',
    ],
    banglaContent: [
      'প্রতি বছর পনেরো লাখেরও বেশি ওয়াইল্ডেবিস্ট, জেব্রা ও হরিণের দল তানজানিয়া ও কেনিয়ার বিস্তীর্ণ প্রান্তর জুড়ে এক মহাকাব্যিক বৃত্তাকার যাত্রায় পা বাড়ায়।',
      'বৃষ্টির গন্ধ এবং তাজা ঘাসের আদিম তাড়নায় তারা কুমিরে ভরা খরস্রোতা নদী এবং ওত পেতে থাকা সিংহবাহিনীর আক্রমণ উপেক্ষা করে ছুটে চলে।',
      'এই গ্রেট মাইগ্রেশন মানবজাতিকে জীবন্ত পৃথিবীর শাশ্বত নিয়মের কথা মনে করিয়ে দেয়। প্রকৃতি কখনোই তাড়াহুড়ো করে না, তবুও তার প্রতিটি কাজ নিখুঁতভাবে সম্পন্ন হয়।',
    ],
    keyVocab: [
      { word: 'wildebeest', ipa: '/ˈwɪl.də.biːst/', banglaPronunciation: 'ওয়াইল্ডেবিস্ট', meaning: 'আফ্রিকার হরিণসদৃশ তৃণভোজী প্রাণী', pos: 'noun' },
      { word: 'primal', ipa: '/ˈpraɪ.məl/', banglaPronunciation: 'প্রাইমাল', meaning: 'আদিম ও সহজাত প্রবৃত্তি', pos: 'adjective' },
      { word: 'instinct', ipa: '/ˈɪn.stɪŋkt/', banglaPronunciation: 'ইনস্টিংক্ট', meaning: 'সহজাত অনুভূতি বা তাড়না', pos: 'noun' },
      { word: 'infested', ipa: '/ɪnˈfes.tɪd/', banglaPronunciation: 'ইনফেস্টেড', meaning: 'বিপদজনক প্রাণীতে ভরা', pos: 'adjective' },
      { word: 'eternal', ipa: '/ɪˈtɝː.nəl/', banglaPronunciation: 'ইটারনাল', meaning: 'চিরন্তন বা শাশ্বত', pos: 'adjective' },
    ],
    comprehensionQuestion: {
      question: 'What drives the wildebeest to embark on their long migration?',
      questionBangla: 'ওয়াইল্ডেবিস্টদের দীর্ঘ পরিযানে বের হতে কোন বিষয়টি তাড়িত করে?',
      options: ['Hunting humans', 'Following rain and fresh grasslands (বৃষ্টি ও তাজা ঘাস)', 'Escaping cold winters in Europe', 'Searching for gold'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "Driven by the primal instinct to follow the rain and fresh grasslands..."।',
    },
  },

  // 8. Mystery & Investigation
  {
    id: 'story-18',
    title: 'The Enigma of the Lost Library of Alexandria',
    titleBangla: 'আলেকজান্দ্রিয়ার হারানো লাইব্রেরি ও জ্ঞানের রহস্য',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Mystery',
    categoryBangla: 'রহস্য ও অনুসন্ধান',
    englishContent: [
      'Founded in the third century BCE in Egypt, the Royal Library of Alexandria aimed to collect every manuscript written in the ancient civilized world.',
      'Scholars from Greece, Persia, and India gathered beneath its grand colonnades to debate astronomy, mathematics, and philosophy.',
      'Its tragic destruction remains shrouded in mystery and sorrow. How many forgotten scientific discoveries vanished forever into the ashes of time?',
    ],
    banglaContent: [
      'খ্রিস্টপূর্ব তৃতীয় শতাব্দীতে মিশরে প্রতিষ্ঠিত আলেকজান্দ্রিয়ার রাজকীয় লাইব্রেরির উদ্দেশ্য ছিল প্রাচীন সভ্য পৃথিবীর প্রতিটি লিখিত পাণ্ডুলিপি সংগ্রহ করা।',
      'গ্রিস, পারস্য এবং ভারতের পণ্ডিতরা এর বিশাল স্তম্ভের নিচে সমবেত হয়ে জ্যোতির্বিদ্যা, গণিত ও দর্শন নিয়ে যুক্তি-তর্ক করতেন।',
      'এর করুণ ধ্বংস আজও রহস্য ও বিষাদে ঘেরা। সময়ের ছাইয়ে কত শত বিস্মৃত বৈজ্ঞানিক আবিষ্কার চিরতরে হারিয়ে গেছে তা কে জানে?',
    ],
    keyVocab: [
      { word: 'manuscript', ipa: '/ˈmæn.jə.skrɪpt/', banglaPronunciation: 'ম্যানুস্ক্রিপ্ট', meaning: 'হাতে লেখা প্রাচীন পাণ্ডুলিপি', pos: 'noun' },
      { word: 'colonnade', ipa: '/ˌkɑː.ləˈneɪd/', banglaPronunciation: 'কলোনেড', meaning: 'সারিবদ্ধ স্তম্ভযুক্ত বারান্দা', pos: 'noun' },
      { word: 'shrouded', ipa: '/ˈʃraʊ.dɪd/', banglaPronunciation: 'শ্রাউডেড', meaning: 'রহস্যে ঢাকা বা আচ্ছাদিত', pos: 'adjective' },
      { word: 'vanished', ipa: '/ˈvæn.ɪʃt/', banglaPronunciation: 'ভ্যানিশড', meaning: 'অদৃশ্য হয়ে গেছে এমন', pos: 'verb' },
      { word: 'scholar', ipa: '/ˈskɑː.lɚ/', banglaPronunciation: 'স্কলার', meaning: 'পণ্ডিত বা গবেষক', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What was the ambitious goal of the Library of Alexandria?',
      questionBangla: 'আলেকজান্দ্রিয়া লাইব্রেরির উচ্চাভিলাষী লক্ষ্য কী ছিল?',
      options: ['To sell expensive weapons', 'To collect every manuscript written in the ancient world', 'To store gold coins', 'To build giant ships'],
      correctIndex: 1,
      explanationBangla: 'লক্ষ্য ছিল: "to collect every manuscript written in the ancient civilized world"।',
    },
  },
  {
    id: 'story-19',
    title: 'The Silent Whistle of the Night Train',
    titleBangla: 'রাতের ট্রেনের নীরব সংকেত ও একটি গোয়েন্দা রহস্য',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Mystery',
    categoryBangla: 'রহস্য ও অনুসন্ধান',
    englishContent: [
      'Inspector Ray adjusted his overcoat as rain splattered against the foggy windows of the midnight express departing from Edinburgh.',
      'A diamond necklace had vanished from compartment 7B while the train paused at an isolated junction. The door was locked from the inside.',
      'Examining the dusty sill, Ray noticed two faint scratches near the ventilation shaft. "A clever locked-room illusion," he whispered with a sharp grin, "but gravity never lies."',
    ],
    banglaContent: [
      'এডিনবরা থেকে ছেড়ে আসা মিডনাইট এক্সপ্রেসের কুয়াশাচ্ছন্ন জানালায় বৃষ্টির ফোঁটা আছড়ে পড়ার সময় ইন্সপেক্টর রায় তার ওভারকোটটি ঠিক করে নিলেন।',
      'একটি নির্জন জংশনে ট্রেনটি থামার সময় ৭বি নম্বর কামরা থেকে একটি মূল্যবান হীরার নেকলেস উধাও হয়ে গেছে। অথচ দরজাটি ভেতর থেকে ছিটকিনি লাগানো ছিল।',
      'ধুলোবালি পড়া জানালার সিল পরীক্ষা করে রায় ভেন্টিলেশন শ্যাফটের কাছে দুটি হালকা আঁচড়ের দাগ লক্ষ্য করলেন। "একটি চতুর লকড-রুম বিভ্রান্তি," ঠোঁটের কোণে সূক্ষ্ম হাসি ফুটিয়ে ফিসফিস করে বললেন তিনি, "কিন্তু মাধ্যাকর্ষণ কখনো মিথ্যা বলে না।"',
    ],
    keyVocab: [
      { word: 'splattered', ipa: '/ˈsplæt̬.ɚd/', banglaPronunciation: 'স্প্ল্যাটার্ড', meaning: 'ছিটকে পড়ল', pos: 'verb' },
      { word: 'isolated', ipa: '/ˈaɪ.sə.leɪ.t̬ɪd/', banglaPronunciation: 'আইসোলেটেড', meaning: 'জনমানবহীন নির্জন', pos: 'adjective' },
      { word: 'ventilation', ipa: '/ˌven.t̬əlˈeɪ.ʃən/', banglaPronunciation: 'ভেন্টিলেশন', meaning: 'বাতাস চলাচলের ঘুলঘুলি', pos: 'noun' },
      { word: 'illusion', ipa: '/ɪˈluː.ʒən/', banglaPronunciation: 'ইলুশন', meaning: 'দৃষ্টিভ্রম বা বিভ্রান্তিকর কৌশল', pos: 'noun' },
      { word: 'gravity', ipa: '/ˈɡræv.ə.t̬i/', banglaPronunciation: 'গ্র্যাভিটি', meaning: 'মাধ্যাকর্ষণ বল', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'Where did Inspector Ray find the crucial clue in the compartment?',
      questionBangla: 'ইন্সপেক্টর রায় কামরার কোথায় গুরুত্বপূর্ণ সূত্রটি খুঁজে পেয়েছিলেন?',
      options: ['Under the passenger carpet', 'Near the ventilation shaft on the dusty sill', 'Inside the tea cup', 'Behind the locomotive wheel'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে বলা হয়েছে: "noticed two faint scratches near the ventilation shaft"।',
    },
  },

  // 9. Health & Wellness
  {
    id: 'story-20',
    title: 'The Science of Deep Restorative Sleep',
    titleBangla: 'গভীর ও স্বাস্থ্যকর ঘুমের বিজ্ঞান ও সুফল',
    level: 'Elementary',
    readTime: '3 min',
    category: 'Health',
    categoryBangla: 'স্বাস্থ্য ও সুস্থতা',
    englishContent: [
      'Sleep is not merely a passive state of rest; it is an active biological maintenance window for your brain and immune system.',
      'During deep sleep, the brain flushes out metabolic toxins that accumulate during waking hours, and consolidates new English words into long-term memory.',
      'To improve sleep quality, dim overhead lights an hour before bed and avoid checking digital screens in the dark. Your body thrives on natural darkness.',
    ],
    banglaContent: [
      'ঘুম কেবল অলস বিশ্রামের কোনো অবস্থা নয়; এটি আপনার মস্তিষ্ক ও রোগ প্রতিরোধ ব্যবস্থার জন্য সক্রিয় জৈবিক মেরামতের সময়।',
      'গভীর ঘুমের সময় মস্তিষ্ক সারাদিনে জমে থাকা বিপাকীয় বিষাক্ত পদার্থগুলো ধুয়ে পরিষ্কার করে এবং নতুন শেখা ইংরেজি শব্দগুলো দীর্ঘমেয়াদী স্মৃতিতে স্থায়ী করে।',
      'ঘুমের মান উন্নত করতে শোওয়ার এক ঘণ্টা আগে ঘরের উজ্জ্বল আলো কমিয়ে দিন এবং অন্ধকারে ডিজিটাল স্ক্রিন দেখা পরিহার করুন। প্রাকৃতিক আঁধারে শরীর সুস্থ ও প্রাণবন্ত থাকে।',
    ],
    keyVocab: [
      { word: 'restorative', ipa: '/rɪˈstɔːr.ə.t̬ɪv/', banglaPronunciation: 'রিস্টোরেটিভ', meaning: 'শক্তি ও সতেজতা ফিরিয়ে দেয় এমন', pos: 'adjective' },
      { word: 'metabolic', ipa: '/ˌmet̬.əˈbɑː.lɪk/', banglaPronunciation: 'মেটাবলিক', meaning: 'দেহের বিপাক প্রক্রিয়া সংক্রান্ত', pos: 'adjective' },
      { word: 'accumulate', ipa: '/əˈkjuː.mjə.leɪt/', banglaPronunciation: 'অ্যাকিউমুলেট', meaning: 'ধীরে ধীরে জমা হওয়া', pos: 'verb' },
      { word: 'consolidate', ipa: '/kənˈsɑː.lə.deɪt/', banglaPronunciation: 'কনসলিডেট', meaning: 'দৃঢ় বা স্থায়ী করা', pos: 'verb' },
      { word: 'thrives', ipa: '/θraɪvz/', banglaPronunciation: 'থ্রাইভস', meaning: 'উন্নত ও প্রস্ফুটিত হয়', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'What does the brain do during deep sleep according to science?',
      questionBangla: 'বিজ্ঞান অনুযায়ী গভীর ঘুমের সময় মস্তিষ্ক কী কাজ করে?',
      options: ['It completely stops functioning', 'Flushes out metabolic toxins & consolidates memories', 'Calculates tax forms', 'Plays audio alarms'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "flushes out metabolic toxins... and consolidates new English words into long-term memory"।',
    },
  },
  {
    id: 'story-21',
    title: 'Hydration and Brain Energy: The 8-Glass Truth',
    titleBangla: 'পর্যাপ্ত পানি পানের সুফল ও মস্তিষ্কের কর্মক্ষমতা',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Health',
    categoryBangla: 'স্বাস্থ্য ও সুস্থতা',
    englishContent: [
      'Did you know that seventy-five percent of human brain tissue consists of pure water? Even mild dehydration can cause afternoon fatigue and mental sluggishness.',
      'When you drink a tall glass of clean water upon waking, you replenish fluids lost during overnight respiration and instantly kick-start your metabolism.',
      'Keep a reusable water bottle at your study desk. Staying hydrated sharpens your mental clarity and helps you focus while memorizing vocabulary.',
    ],
    banglaContent: [
      'আপনি কি জানেন মানুষের মস্তিষ্কের কলার শতকরা ৭৫ ভাগই খাঁটি পানি দিয়ে গঠিত? সামান্য পানিশূন্যতাও বিকালের ক্লান্তি এবং মানসিক আলসেমির কারণ হতে পারে।',
      'সকালে ঘুম থেকে উঠেই এক গ্লাস পরিষ্কার পানি পান করলে রাতে শ্বাস-প্রশ্বাসে হারিয়ে যাওয়া আর্দ্রতা পূরণ হয় এবং তাৎক্ষণিকভাবে মেটাবলিজম চালু হয়।',
      'পড়ার টেবিলে সবসময় একটি রিইউজেবল পানির বোতল রাখুন। পর্যাপ্ত পানি পান মনোযোগ তীক্ষ্ণ রাখে এবং নতুন শব্দ আয়ত্ত করতে সাহায্য করে।',
    ],
    keyVocab: [
      { word: 'tissue', ipa: '/ˈtɪʃ.uː/', banglaPronunciation: 'টিস্যু', meaning: 'দেহের সূক্ষ্ম কোষকলা', pos: 'noun' },
      { word: 'dehydration', ipa: '/ˌdiː.haɪˈdreɪ.ʃən/', banglaPronunciation: 'ডিহাইড্রেশন', meaning: 'শরীরে পানিশূন্যতা', pos: 'noun' },
      { word: 'fatigue', ipa: '/fəˈtiːɡ/', banglaPronunciation: 'ফাটিগ', meaning: 'ক্লান্তি ও অবসাদ', pos: 'noun' },
      { word: 'replenish', ipa: '/rɪˈplen.ɪʃ/', banglaPronunciation: 'রিপ্লেনিশ', meaning: 'পুনরায় পূর্ণ করা', pos: 'verb' },
      { word: 'clarity', ipa: '/ˈkler.ə.t̬i/', banglaPronunciation: 'ক্ল্যারিটি', meaning: 'স্বচ্ছতা ও প্রখরতা', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What percentage of human brain tissue consists of water?',
      questionBangla: 'মানুষের মস্তিষ্কের কলার কত শতাংশ পানি দিয়ে গঠিত?',
      options: ['Ten percent', 'Seventy-five percent (পঁচাত্তর শতাংশ)', 'Ninety-nine percent', 'Only five percent'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে বলা হয়েছে: "seventy-five percent of human brain tissue consists of pure water"।',
    },
  },
];
