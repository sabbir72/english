import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Languages,
  Headphones,
  RotateCcw,
  Clock,
  Award,
  Ear,
  Play,
  Square,
  Sliders,
} from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';

export interface ReadingStory {
  id: string;
  title: string;
  titleBangla: string;
  level: 'Beginner' | 'Elementary' | 'Intermediate';
  readTime: string;
  category: string;
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

const READING_STORIES: ReadingStory[] = [
  {
    id: 'story-1',
    title: 'The Power of Small Daily Habits',
    titleBangla: 'ছোট ছোট দৈনন্দিন অভ্যাসের শক্তি',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Self Improvement',
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
    category: 'Daily Life & Travel',
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
      { word: 'pleasant', ipa: '/ˈplɛznt/', banglaPronunciation: 'প্লেজেন্ট', meaning: 'মনোরম / মিষ্টি', pos: 'adjective' },
      { word: 'confidently', ipa: '/ˈkɒnfɪdəntli/', banglaPronunciation: 'কনফিডেন্টলি', meaning: 'আত্মবিশ্বাসের সাথে', pos: 'adverb' },
      { word: 'realize', ipa: '/ˈriːəlaɪz/', banglaPronunciation: 'রিয়ালাইজ', meaning: 'উপলব্ধি করা / বুঝতে পারা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'What did Rahim order at the cafe?',
      questionBangla: 'রহিম ক্যাফেতে কি অর্ডার করেছিলেন?',
      options: ['Green tea and a sandwich', 'Hot latte with almond milk & blueberry muffin', 'Black coffee only', 'Cold juice and cake'],
      correctIndex: 1,
      explanationBangla: 'রহিম বলেছিলেন: "Could I please have a hot latte with almond milk and a blueberry muffin?"',
    },
  },
  {
    id: 'story-3',
    title: 'How Job Interviews Look for Confidence',
    titleBangla: 'চাকরির ইন্টারভিউতে কীভাবে আত্মবিশ্বাস খোঁজা হয়',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Career & Professional',
    englishContent: [
      'Employers around the world value clear communication over complex vocabulary. When speaking in an interview, speak slowly, pause when thinking, and maintain good eye contact.',
      'Instead of worrying about grammar mistakes, focus on expressing your ideas logically. Use structured answers: state your point, explain why, provide an example, and summarize your conclusion.',
      'Confidence grows with preparation. Practice answering common questions out loud until your English sounds natural and sincere.',
    ],
    banglaContent: [
      'বিশ্বজুড়ে নিয়োগকর্তারা জটিল শব্দের চেয়ে স্পষ্ট যোগাযোগ দক্ষতাকে বেশি প্রাধান্য দেন। ইন্টারভিউতে কথা বলার সময় ধীরে কথা বলুন, ভাবার সময় বিরতি নিন এবং চোখের যোগাযোগ বজায় রাখুন।',
      'ব্যাকরণের ভুলের ব্যাপারে দুশ্চিন্তা করার চেয়ে আপনার চিন্তাগুলো যৌক্তিকভাবে প্রকাশে মন দিন। সুবিন্যস্ত উত্তর দিন: আপনার বক্তব্য বলুন, কারণ ব্যাখ্যা করুন, উদাহরণ দিন এবং উপসংহার টানুন।',
      'প্রস্তুতির মাধ্যমেই আত্মবিশ্বাস গড়ে ওঠে। আপনার ইংরেজি স্বাভাবিক ও আন্তরিক না শোনানো পর্যন্ত সাধারণ প্রশ্নগুলোর উত্তর জোরে জোরে অনুশীলন করুন।',
    ],
    keyVocab: [
      { word: 'employer', ipa: '/ɪmˈplɔɪər/', banglaPronunciation: 'এমপ্লয়ার', meaning: 'নিয়োগকর্তা / মালিক', pos: 'noun' },
      { word: 'logically', ipa: '/ˈlɒdʒɪkli/', banglaPronunciation: 'লজিক্যালি', meaning: 'যৌক্তিকভাবে', pos: 'adverb' },
      { word: 'sincere', ipa: '/sɪnˈsɪər/', banglaPronunciation: 'সিনসিয়ার', meaning: 'আন্তরিক / খাঁটি', pos: 'adjective' },
      { word: 'summarize', ipa: '/ˈsʌməraɪz/', banglaPronunciation: 'সামারাইজ', meaning: 'সংক্ষেপে তুলে ধরা', pos: 'verb' },
      { word: 'preparation', ipa: '/ˌprɛpəˈreɪʃən/', banglaPronunciation: 'প্রিপারেশন', meaning: 'প্রস্তুতি', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'What do global employers value more than complex vocabulary?',
      questionBangla: 'জটিল শব্দের চেয়ে নিয়োগকর্তারা কোন বিষয়টিকে বেশি মূল্য দেন?',
      options: ['Fast speaking speed', 'Clear communication', 'Accent imitation', 'Long sentences'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে প্রথম লাইনেই বলা হয়েছে: "Employers around the world value clear communication over complex vocabulary."',
    },
  },
  {
    id: 'story-4',
    title: 'Navigating the International Airport',
    titleBangla: 'আন্তর্জাতিক বিমানবন্দরে বোর্ডিং ও নিরাপত্তা নিয়ম',
    level: 'Elementary',
    readTime: '4 min',
    category: 'Travel & Airport',
    englishContent: [
      'At Hazrat Shahjalal International Airport, thousands of travelers check in every day. The large digital monitors clearly display flight numbers, boarding gates, and any unexpected weather delays.',
      'After printing your boarding pass and dropping off heavy baggage at the counter, proceed directly to security screening. Always keep your passport and boarding pass easily accessible in your hand.',
      'When your flight gate number is announced over the loudspeaker, line up calmly. Showing polite respect to airline staff and following directions ensures a peaceful departure.',
    ],
    banglaContent: [
      'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরে প্রতিদিন হাজার হাজার যাত্রী চেক-ইন করেন। বড় ডিজিটাল স্ক্রিনগুলোতে ফ্লাইটের নম্বর, বোর্ডিং গেট এবং আবহাওয়া সংক্রান্ত বিলম্ব স্পষ্টভাবে দেখা যায়।',
      'কাউন্টারে বোর্ডিং পাস প্রিন্ট করা এবং ভারী লাগেজ জমা দেওয়ার পর সরাসরি নিরাপত্তা তল্লাশির দিকে এগিয়ে যান। আপনার পাসপোর্ট ও বোর্ডিং পাসটি সবসময় হাতের কাছে সহজে বের করার মতো রাখুন।',
      'লাউডস্পিকারে যখন আপনার ফ্লাইটের গেট নম্বর ঘোষণা করা হবে, তখন শান্তভাবে লাইনে দাঁড়ান। এয়ারলাইন্স কর্মীদের প্রতি বিনয়ী আচরণ এবং নির্দেশনা মেনে চলা একটি নির্বিঘ্ন ও সুন্দর যাত্রা নিশ্চিত করে।',
    ],
    keyVocab: [
      { word: 'departure', ipa: '/dɪˈpɑːtʃər/', banglaPronunciation: 'ডিপার্চার', meaning: 'প্রস্থান / রওনা হওয়ার সময়', pos: 'noun' },
      { word: 'baggage', ipa: '/ˈbæɡɪdʒ/', banglaPronunciation: 'ব্যাগিজ', meaning: 'ভ্রমণের মালামাল বা লাগেজ', pos: 'noun' },
      { word: 'accessible', ipa: '/əkˈsɛsəbl/', banglaPronunciation: 'অ্যাকসেসিবল', meaning: 'সহজলভ্য / সহজে নাগালে পাওয়া যায় এমন', pos: 'adjective' },
      { word: 'announcement', ipa: '/əˈnaʊnsmənt/', banglaPronunciation: 'অ্যানাউন্সমেন্ট', meaning: 'ঘোষণা / মাইকিং', pos: 'noun' },
      { word: 'passenger', ipa: '/ˈpæsɪndʒər/', banglaPronunciation: 'প্যাসেঞ্জার', meaning: 'যাত্রী', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'Where should passengers proceed after dropping off their baggage?',
      questionBangla: 'লাগেজ জমা দেওয়ার পর যাত্রীদের কোথায় যাওয়া উচিত?',
      options: ['Directly to the plane runway', 'To security screening', 'Outside the terminal building', 'To the duty-free shop only'],
      correctIndex: 1,
      explanationBangla: 'অনুচ্ছেদে বলা হয়েছে: "After printing your boarding pass and dropping off heavy baggage... proceed directly to security screening."',
    },
  },
  {
    id: 'story-5',
    title: 'A Remote Team Standup Meeting on Zoom',
    titleBangla: 'অনলাইন রিমোট টিম মিটিং ও কাজের অগ্রগতি',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Workplace & Tech',
    englishContent: [
      'Every weekday morning at ten, Sabrina logs into her remote team standup call. Colleagues from London, Dhaka, and Singapore join with warm greetings and morning coffee.',
      '"Good morning, everyone! Let us quickly review today agenda," the project lead announced. "Sabrina, could you please provide a brief update on the mobile application design?"',
      'Sabrina unmuted her microphone and shared her screen. "I have completed the user interface wireframes and resolved the layout bug. Today, I will focus on user testing." Clear and concise communication keeps global teams synchronized.',
    ],
    banglaContent: [
      'প্রতি কর্মদিবসের সকাল দশটায় সাবরিনা তার রিমোট টিম স্ট্যান্ডআপ কলে যুক্ত হন। লন্ডন, ঢাকা ও সিঙ্গাপুরের সহকর্মীরা উষ্ণ সম্ভাষণ ও সকালের কফি হাতে যুক্ত হন।',
      '"সবাইকে শুভ সকাল! চলুন দ্রুত আজকের আলোচ্যসূচি পর্যালোচনা করি," প্রজেক্ট লিড ঘোষণা করলেন। "সাবরিনা, আপনি কি মোবাইল অ্যাপ ডিজাইনের ওপর সংক্ষেপে একটি আপডেট দিতে পারবেন?"',
      'সাবরিনা তার মাইক্রোফোন আনমিউট করলেন এবং স্ক্রিন শেয়ার করলেন। "আমি ইউজার ইন্টারফেস ওয়্যারফ্রেম সম্পন্ন করেছি এবং লেআউটের ত্রুটিটি সমাধান করেছি। আজ আমি ইউজার টেস্টিংয়ে মনোযোগ দেব।" স্পষ্ট ও সংক্ষিপ্ত যোগাযোগ বৈশ্বিক দলগুলোকে সমলয়ে রাখে।',
    ],
    keyVocab: [
      { word: 'colleague', ipa: '/ˈkɒliːɡ/', banglaPronunciation: 'কলিগ', meaning: 'সহকর্মী / একসাথে কাজ করা ব্যক্তি', pos: 'noun' },
      { word: 'agenda', ipa: '/əˈdʒɛndə/', banglaPronunciation: 'এজেন্ডা', meaning: 'আলোচ্যসূচি / কাজের তালিকা', pos: 'noun' },
      { word: 'concise', ipa: '/kənˈsaɪs/', banglaPronunciation: 'কনসাইস', meaning: 'সংক্ষিপ্ত ও অর্থপূর্ণ', pos: 'adjective' },
      { word: 'synchronized', ipa: '/ˈsɪŋkrənaɪzd/', banglaPronunciation: 'সিনক্রোনাইজড', meaning: 'সমলয় করা / একযোগে সমন্বিত', pos: 'adjective' },
      { word: 'resolve', ipa: '/rɪˈzɒlv/', banglaPronunciation: 'রিজলভ', meaning: 'সমাধান করা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'What is Sabrina primary focus for today according to the meeting?',
      questionBangla: 'মিটিং অনুযায়ী আজ সাবরিনার মূল মনোযোগ কোন কাজে থাকবে?',
      options: ['Taking leave from work', 'User testing', 'Writing email reports', 'Buying new software'],
      correctIndex: 1,
      explanationBangla: 'সাবরিনা বলেছিলেন: "Today, I will focus on user testing."',
    },
  },
  {
    id: 'story-6',
    title: 'Visiting the Doctor and Explaining Symptoms',
    titleBangla: 'ডাক্তারের সাথে কথা বলা ও শারীরিক উপসর্গ বর্ণনা',
    level: 'Elementary',
    readTime: '3 min',
    category: 'Health & Clinic',
    englishContent: [
      'Tanvir felt unwell with a painful sore throat and mild fever. He scheduled an appointment at the neighborhood medical clinic to consult Dr. Smith.',
      '"Please sit down, Tanvir. What symptoms are you experiencing today?" Dr. Smith asked kindly. Tanvir replied, "I have had a dry cough for two days, and swallowing food feels very difficult."',
      'The doctor carefully examined his throat and checked his temperature. "You have a mild viral infection. Get plenty of rest, hydrate with warm water, and take this prescribed syrup three times daily."',
    ],
    banglaContent: [
      'তন্ময় তীব্র গলা ব্যথা এবং হালকা জ্বরে অসুস্থ বোধ করছিলেন। তিনি ডক্টর স্মিথের সাথে পরামর্শের জন্য আশেপাশের একটি মেডিকেল ক্লিনিকে অ্যাপয়েন্টমেন্ট নেন।',
      '"অনুগ্রহ করে বসুন, তন্ময়। আজ আপনার কী কী উপসর্গ দেখা দিচ্ছে?" ডক্টর স্মিথ আন্তরিকভাবে জিজ্ঞেস করলেন। তন্ময় উত্তর দিলেন, "আমার দুই দিন ধরে শুকনো কাশি এবং খাবার গিলতে বেশ কষ্ট হচ্ছে।"',
      'ডাক্তার সতর্কভাবে তার গলা পরীক্ষা করলেন এবং তাপমাত্রা পরিমাপ করলেন। "আপনার হালকা ভাইরাল সংক্রমণ হয়েছে। পর্যাপ্ত বিশ্রাম নিন, কুসুম গরম পানি পান করে আর্দ্র থাকুন এবং এই প্রেসক্রিপশনের সিরাপটি দিনে তিনবার সেবন করুন।"',
    ],
    keyVocab: [
      { word: 'symptom', ipa: '/ˈsɪmptəm/', banglaPronunciation: 'সিম্পটম', meaning: 'উপসর্গ বা শারীরিক লক্ষণ', pos: 'noun' },
      { word: 'prescribe', ipa: '/prɪˈskraɪb/', banglaPronunciation: 'প্রেসক্রাইব', meaning: 'ওষুধ বা চিকিৎসার ব্যবস্থাপত্র দেওয়া', pos: 'verb' },
      { word: 'infection', ipa: '/ɪnˈfɛkʃən/', banglaPronunciation: 'ইনফেকশন', meaning: 'সংক্রমণ', pos: 'noun' },
      { word: 'hydrate', ipa: '/ˈhaɪdreɪt/', banglaPronunciation: 'হাইড্রেট', meaning: 'পর্যাপ্ত পানি পান করে শরীর আর্দ্র রাখা', pos: 'verb' },
      { word: 'swallow', ipa: '/ˈswɒloʊ/', banglaPronunciation: 'সোয়ালো', meaning: 'গেলা / ঢোক গেলা', pos: 'verb' },
    ],
    comprehensionQuestion: {
      question: 'What home advice did Dr. Smith give Tanvir alongside medication?',
      questionBangla: 'ওষুধের পাশাপাশি ডক্টর স্মিথ তন্ময়কে কী পরামর্শ দিয়েছিলেন?',
      options: ['Go jogging immediately', 'Rest plenty and hydrate with warm water', 'Drink ice-cold soda', 'Work late night hours'],
      correctIndex: 1,
      explanationBangla: 'ডাক্তার বলেছিলেন: "Get plenty of rest, hydrate with warm water..."',
    },
  },
  {
    id: 'story-7',
    title: 'Checking In at a Downtown Hotel',
    titleBangla: 'শহরের হোটেলে চেক-ইন ও সুযোগ-সুবিধা জানা',
    level: 'Elementary',
    readTime: '3 min',
    category: 'Travel & Hospitality',
    englishContent: [
      'After a six-hour train ride, Farhan entered the grand lobby of the Central City Hotel. The reception area was polished, modern, and warmly lit.',
      '"Good afternoon, sir! Welcome to Central City. Do you have a reservation with us?" the front desk agent asked with a courteous smile. "Yes, under the name Farhan Ahmed for three nights."',
      'The agent handed him two electronic keycards. "Your room is 402 on the fourth floor. Complimentary breakfast is served from seven to ten, and high-speed Wi-Fi is available in all rooms."',
    ],
    banglaContent: [
      'ছয় ঘণ্টার ট্রেন যাত্রার পর ফারহান সেন্ট্রাল সিটি হোটেলের বিশাল লবিতে প্রবেশ করলেন। অভ্যর্থনা এলাকাটি ছিল চকচকে, আধুনিক এবং মনোরম আলোয় সাজানো।',
      '"শুভ অপরাহ্ন, স্যার! সেন্ট্রাল সিটিতে স্বাগতম। আমাদের এখানে কি আপনার বুকিং আছে?" মার্জিত হাসিমুখে জিজ্ঞেস করলেন ফ্রন্ট ডেস্ক কর্মী। "হ্যাঁ, তিন রাতের জন্য ফারহান আহমেদ নামে।"',
      'কর্মী তাকে দুটি ইলেকট্রনিক কি-কার্ড তুলে দিলেন। "আপনার রুম চারতলার ৪০২ নম্বর। সকাল সাতটা থেকে দশটা পর্যন্ত ফ্রি নাস্তা পরিবেশন করা হয় এবং প্রতিটি রুমে হাই-স্পিড ওয়াই-ফাই সুবিধা রয়েছে।"',
    ],
    keyVocab: [
      { word: 'reservation', ipa: '/ˌrɛzərˈveɪʃən/', banglaPronunciation: 'রিজার্ভেশন', meaning: 'অগ্রিম বুকিং বা আসন সংরক্ষণ', pos: 'noun' },
      { word: 'complimentary', ipa: '/ˌkɒmplɪˈmɛntri/', banglaPronunciation: 'কমপ্লিমেন্টারি', meaning: 'সৌজন্যমূলক / বিনামূল্যে প্রদত্ত', pos: 'adjective' },
      { word: 'courteous', ipa: '/ˈkɜːrtiəs/', banglaPronunciation: 'কার্টিয়াস', meaning: 'ভদ্র ও অমায়িক', pos: 'adjective' },
      { word: 'lobby', ipa: '/ˈlɒbi/', banglaPronunciation: 'লবি', meaning: 'হোটেল বা ভবনের প্রবেশ কক্ষ', pos: 'noun' },
      { word: 'reception', ipa: '/rɪˈsɛpʃən/', banglaPronunciation: 'রিসেপশন', meaning: 'অভ্যর্থনা ডেস্ক', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'Between what hours is complimentary breakfast served?',
      questionBangla: 'সৌজন্যমূলক নাস্তা কোন কোন সময়ের মধ্যে পরিবেশন করা হয়?',
      options: ['Five to seven in the morning', 'Seven to ten in the morning', 'Twelve to two in the afternoon', 'Eight to eleven at night'],
      correctIndex: 1,
      explanationBangla: 'ফ্রন্ট ডেস্ক এজেন্ট বলেছিলেন: "Complimentary breakfast is served from seven to ten..."',
    },
  },
  {
    id: 'story-8',
    title: 'Ordering Dinner at an Authentic Restaurant',
    titleBangla: 'রেস্তোরাঁয় ডিনার অর্ডার ও খাবারের অভিজ্ঞতা',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Dining & Food',
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
      { word: 'waiter', ipa: '/ˈweɪtər/', banglaPronunciation: 'ওয়েটার', meaning: 'খাবার পরিবেশক', pos: 'noun' },
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
    id: 'story-9',
    title: 'Grocery Shopping & Cashier Checkout',
    titleBangla: 'সুপারমার্কেটে কেনাকাটা ও ক্যাশিয়ারের সাথে কথোপকথন',
    level: 'Beginner',
    readTime: '3 min',
    category: 'Daily Life & Shopping',
    englishContent: [
      'Walking down the supermarket aisles, Kamal picked up fresh apples, low-fat milk, and whole-wheat bread. He checked the expiration dates carefully before placing each product into his shopping basket.',
      'At the checkout counter, the cashier greeted him with a friendly tone. "Did you find everything you needed today, sir?" Kamal smiled, "Yes, thank you! Everything was well organized."',
      '"Your total comes to eighteen dollars and fifty cents. Would you like your receipt in the bag?" Kamal tapped his contactless bank card and replied, "Yes, please. Have a wonderful evening!"',
    ],
    banglaContent: [
      'সুপারমার্কেটের আইল দিয়ে হেঁটে যাওয়ার সময় কামাল তাজা আপেল, লো-ফ্যাট দুধ এবং হোল-হুইট পাউরুটি বেছে নিলেন। শপিং বাস্কেটে রাখার আগে তিনি প্রতিটি পণ্যের মেয়াদ শেষ হওয়ার তারিখ সতর্কভাবে দেখে নিলেন।',
      'চেকআউট কাউন্টারে ক্যাশিয়ার বন্ধুসুলভ কণ্ঠে তাকে সম্ভাষণ জানালেন। "স্যার, আপনার যা প্রয়োজন ছিল তা কি আজ সব পেয়েছেন?" কামাল হাসলেন, "হ্যাঁ, ধন্যবাদ! সবকিছু খুব সুন্দর সাজানো ছিল।"',
      '"আপনার মোট বিল আঠারো ডলার পঞ্চাশ সেন্ট। আপনি কি রসিদ ব্যাগের ভেতর চান?" কামাল তার কন্ট্যাক্টলেস কার্ডটি মেশিনে ট্যাপ করলেন এবং বললেন, "হ্যাঁ, প্লিজ। আপনার সন্ধ্যাটি চমৎকার কাটুক!"',
    ],
    keyVocab: [
      { word: 'aisle', ipa: '/aɪl/', banglaPronunciation: 'আইল', meaning: 'সুপারমার্কেট বা বিমানের দুই সারির মাঝের পথ', pos: 'noun' },
      { word: 'expiration', ipa: '/ˌɛkspəˈreɪʃən/', banglaPronunciation: 'এক্সপিরেশন', meaning: 'মেয়াদ উত্তীর্ণ হওয়ার তারিখ', pos: 'noun' },
      { word: 'receipt', ipa: '/rɪˈsiːt/', banglaPronunciation: 'রিসিট', meaning: 'ক্রয়ের রসিদ বা ভাউচার', pos: 'noun' },
      { word: 'contactless', ipa: '/ˈkɒntæktlɪs/', banglaPronunciation: 'কন্ট্যাক্টলেস', meaning: 'স্পর্শহীন ডিজিটাল পেমেন্ট প্রযুক্তি', pos: 'adjective' },
      { word: 'cashier', ipa: '/kæˈʃɪər/', banglaPronunciation: 'ক্যাশিয়ার', meaning: 'বিল গ্রহণকারী কর্মী', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'How did Kamal pay for his groceries at the counter?',
      questionBangla: 'কামাল কাউন্টারে কীভাবে গ্রোসারি কেনাকাটার বিল পরিশোধ করেছিলেন?',
      options: ['Paper cash banknotes', 'Tapped his contactless card', 'Written personal cheque', 'Asked to pay next month'],
      correctIndex: 1,
      explanationBangla: 'প্যাসেজে বলা হয়েছে: "Kamal tapped his contactless bank card and replied..."',
    },
  },
  {
    id: 'story-10',
    title: 'Resolving a Customer Service Delivery Issue',
    titleBangla: 'অনলাইন অর্ডারের ডেলিভারি সমস্যা বিনয়ের সাথে সমাধান',
    level: 'Intermediate',
    readTime: '4 min',
    category: 'Problem Solving',
    englishContent: [
      'Nadia received a delivery parcel from an online bookstore, but when she opened the cardboard box, two ordered English grammar workbooks were missing. She dialed customer support immediately.',
      '"Hello, my name is David. How may I assist you today?" the agent answered politely. Nadia spoke calmly, "Hello David, my order number is 4892. I received my parcel today, but two workbooks were missing from the package."',
      'David reviewed her account right away. "I sincerely apologize for this oversight, Nadia. I have expedited the missing items with free priority shipping, and they will reach your doorstep tomorrow afternoon." Nadia appreciated the prompt and courteous resolution.',
    ],
    banglaContent: [
      'নাদিয়া একটি অনলাইন বুকস্টোর থেকে একটি ডেলিভারি পার্সেল পেয়েছিলেন, কিন্তু কার্ডবোর্ডের বাক্সটি খোলার পর দেখলেন অর্ডার করা দুটি ইংরেজি গ্রামার ওয়ার্কবুক প্যাকেটে নেই। তিনি সাথে সাথেই কাস্টমার কেয়ারে ফোন করলেন।',
      '"হ্যালো, আমি ডেভিড বলছি। আজ আপনাকে কীভাবে সাহায্য করতে পারি?" এজেন্ট বিনয়ের সাথে জানতে চাইলেন। নাদিয়া শান্ত সুরে বললেন, "হ্যালো ডেভিড, আমার অর্ডার নম্বর ৪৮৯২। আমি আজ আমার পার্সেল পেয়েছি, কিন্তু প্যাকেজ থেকে দুটি ওয়ার্কবুক বাদ পড়েছে।"',
      'ডেভিড তখনই তার অ্যাকাউন্টটি যাচাই করলেন। "এই ভুলের জন্য আমি আন্তরিকভাবে দুঃখিত, নাদিয়া। আমি বিনামূল্যে প্রায়োরিটি শিপিংয়ের মাধ্যমে বাদ পড়া বইগুলো পাঠিয়ে দিয়েছি, যা আগামীকাল বিকেলে আপনার ঠিকানায় পৌঁছে যাবে।" নাদিয়া এই দ্রুত ও আন্তরিক সমাধানের প্রশংসা করলেন।',
    ],
    keyVocab: [
      { word: 'assist', ipa: '/əˈsɪst/', banglaPronunciation: 'অ্যাসিস্ট', meaning: 'সহায়তা বা সাহায্য করা', pos: 'verb' },
      { word: 'expedite', ipa: '/ˈɛkspɪdaɪt/', banglaPronunciation: 'এক্সপিডাইট', meaning: 'দ্রুততর করা / ত্বরান্বিত করা', pos: 'verb' },
      { word: 'oversight', ipa: '/ˈoʊvərsaɪt/', banglaPronunciation: 'ওভারসাইট', meaning: 'অনিচ্ছাকৃত ভুল বা নজর এড়িয়ে যাওয়া', pos: 'noun' },
      { word: 'prompt', ipa: '/prɒmpt/', banglaPronunciation: 'প্রম্পট', meaning: 'তাৎক্ষণিক ও চটপটে', pos: 'adjective' },
      { word: 'resolution', ipa: '/ˌrɛzəˈluːʃən/', banglaPronunciation: 'রেজোলিউশন', meaning: 'সমস্যার সমাধান', pos: 'noun' },
    ],
    comprehensionQuestion: {
      question: 'How did the customer support agent resolve the issue?',
      questionBangla: 'কাস্টমার সাপোর্ট এজেন্ট কীভাবে সমস্যাটির সমাধান করলেন?',
      options: ['Cancelled the entire user account', 'Expedited the missing books with free priority shipping', 'Told her to wait two weeks', 'Refused to take the call'],
      correctIndex: 1,
      explanationBangla: 'এজেন্ট বলেছিলেন: "I have expedited the missing items with free priority shipping, and they will reach your doorstep tomorrow afternoon."',
    },
  },
];

interface ReadingSectionProps {
  onAwardXP?: (amount: number) => void;
  onSaveWord?: (word: string, meaning: string) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  onAwardXP,
  onSaveWord,
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(READING_STORIES[0].id);
  const [showBangla, setShowBangla] = useState(true);
  const [listenMode, setListenMode] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<Record<number, boolean>>({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingParagraphIndex, setPlayingParagraphIndex] = useState<number | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [speechAccent, setSpeechAccent] = useState<'US' | 'UK'>('US');
  const [completedStories, setCompletedStories] = useState<Record<string, boolean>>({});
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning?: string;
    ipa?: string;
    pron?: string;
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  const currentStory = READING_STORIES.find((s) => s.id === selectedStoryId) || READING_STORIES[0];

  // Stop any playing speech when switching story
  const handleSelectStory = (storyId: string) => {
    stopSpeaking();
    setIsPlayingAudio(false);
    setPlayingParagraphIndex(null);
    setSelectedStoryId(storyId);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setSelectedWord(null);
    setRevealedParagraphs({});
  };

  // Play full story audio
  const handlePlayFullStory = () => {
    if (isPlayingAudio && playingParagraphIndex === null) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }
    stopSpeaking();
    const fullText = currentStory.englishContent.join(' ');
    setIsPlayingAudio(true);
    setPlayingParagraphIndex(null);
    speakText(fullText, speechAccent, speechSpeed, () => {
      setIsPlayingAudio(false);
      setPlayingParagraphIndex(null);
    });
  };

  // Play single paragraph audio
  const handlePlayParagraph = (pIdx: number) => {
    if (isPlayingAudio && playingParagraphIndex === pIdx) {
      stopSpeaking();
      setIsPlayingAudio(false);
      setPlayingParagraphIndex(null);
      return;
    }
    stopSpeaking();
    const text = currentStory.englishContent[pIdx];
    setIsPlayingAudio(true);
    setPlayingParagraphIndex(pIdx);
    speakText(text, speechAccent, speechSpeed, () => {
      setIsPlayingAudio(false);
      setPlayingParagraphIndex(null);
    });
  };

  const handleToggleReveal = (pIdx: number) => {
    setRevealedParagraphs((prev) => ({ ...prev, [pIdx]: !prev[pIdx] }));
  };

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim().toLowerCase();
    if (!cleanWord) return;

    // Check if it matches key vocab
    const match = currentStory.keyVocab.find((v) => v.word.toLowerCase() === cleanWord);
    if (match) {
      setSelectedWord({
        word: match.word,
        meaning: match.meaning,
        ipa: match.ipa,
        pron: match.banglaPronunciation,
      });
      speakText(match.word, speechAccent, 0.9);
    } else {
      setSelectedWord({
        word: cleanWord,
        meaning: 'শব্দের অর্থ জানতে ডিকশনারি বা শব্দভাণ্ডার দেখুন',
      });
      speakText(cleanWord, speechAccent, 0.9);
    }
  };

  const handleSelectQuizOption = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOption(idx);
    setQuizSubmitted(true);
    if (idx === currentStory.comprehensionQuestion.correctIndex) {
      onAwardXP?.(15);
      setCompletedStories((prev) => ({ ...prev, [currentStory.id]: true }));
    }
  };

  const handleToggleSaveVocab = (word: string, meaning: string) => {
    setSavedWords((prev) => ({ ...prev, [word]: !prev[word] }));
    onSaveWord?.(word, meaning);
  };

  return (
    <div id="reading-practice-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/50 p-6 sm:p-8 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 px-3.5 py-1 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              <Headphones className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Listening & Reading Comprehension Lab • {READING_STORIES.length} Lessons</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              লিসেনিং ও রিডিং ল্যাব (Native Pronunciation & Meaning)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
              প্রতিটি বাক্য আলাদা করে শুনুন বা পুরো গল্প একবারে শুনুন। কোনো শব্দে ক্লিক করলে তাৎক্ষণিক ফোনেটিক উচ্চারণ ও বাংলা অর্থ প্রকাশ পাবে।
            </p>
          </div>

          {/* Quick Action Control Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Ear Training / Listen First Mode */}
            <button
              onClick={() => setListenMode(!listenMode)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                listenMode
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}
              title="টেক্সট ঢেকে শুধু শুনে বোঝার অভ্যাস করুন"
            >
              <Ear className="h-4 w-4 text-amber-500" />
              <span>{listenMode ? 'লিসেনিং মোড চালু' : 'লিসেনিং মোড (টেস্ট)'}</span>
            </button>

            {/* Bangla Translation Toggle */}
            <button
              onClick={() => setShowBangla(!showBangla)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                showBangla
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
              }`}
            >
              {showBangla ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span>{showBangla ? 'বাংলা অনুবাদ চালু' : 'বাংলা লুকানো'}</span>
            </button>

            {/* Master Audio Button */}
            <button
              onClick={handlePlayFullStory}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm border ${
                isPlayingAudio && playingParagraphIndex === null
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                  : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isPlayingAudio && playingParagraphIndex === null ? (
                <>
                  <Square className="h-3.5 w-3.5" />
                  <span>থামান</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>পুরো গল্প শুনুন</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio Settings Strip (Speed & Accent) */}
        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Speed selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">অডিও গতি:</span>
              {[
                { label: '0.8x (ধীর)', val: 0.8 },
                { label: '1.0x (স্বাভাবিক)', val: 1.0 },
                { label: '1.2x (দ্রুত)', val: 1.2 },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setSpeechSpeed(s.val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    speechSpeed === s.val
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Accent selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-medium">উচ্চারণ ভঙ্গি:</span>
              <button
                onClick={() => setSpeechAccent('US')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  speechAccent === 'US'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                US (আমেরিকান)
              </button>
              <button
                onClick={() => setSpeechAccent('UK')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  speechAccent === 'UK'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                UK (ব্রিটিশ)
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            সম্পন্ন গল্প: <span className="font-bold text-emerald-600">{Object.keys(completedStories).length}</span> / {READING_STORIES.length}
          </div>
        </div>

        {/* Story Selector Pills */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-200/70 dark:border-slate-800/70">
          {READING_STORIES.map((story, idx) => {
            const isSelected = story.id === currentStory.id;
            const isDone = completedStories[story.id];
            return (
              <button
                key={story.id}
                onClick={() => handleSelectStory(story.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white/80 text-slate-700 border-slate-200/80 hover:bg-slate-100 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                )}
                <span className="truncate max-w-[170px] sm:max-w-none">{story.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-indigo-700/80 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {story.level}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Reading & Vocabulary Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: The Digital Reading & Audio Book */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 sm:py-10 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 transition-colors">
            {/* Story Header */}
            <div className="mb-6 pb-5 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {currentStory.category} • Level: {currentStory.level}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  <span>পড়ার সময়: {currentStory.readTime}</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {currentStory.title}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 font-bangla mt-0.5">
                {currentStory.titleBangla}
              </p>
            </div>

            {/* Listening Mode Hint if active */}
            {listenMode && (
              <div className="mb-6 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
                <div className="flex items-center gap-2 font-medium">
                  <Ear className="h-4 w-4 text-amber-600" />
                  <span>লিসেনিং মোড সক্রিয়: প্রতিটি প্যারাগ্রাফের স্পিকার আইকনে ক্লিক করে শুনুন, তারপর টেক্সট মিলিয়ে নিন।</span>
                </div>
              </div>
            )}

            {/* Paragraphs with individual audio play controls */}
            <div className="space-y-6">
              {currentStory.englishContent.map((paragraph, pIdx) => {
                const words = paragraph.split(' ');
                const banglaTranslation = currentStory.banglaContent[pIdx];
                const isThisPlaying = isPlayingAudio && playingParagraphIndex === pIdx;
                const isHiddenByListenMode = listenMode && !revealedParagraphs[pIdx];

                return (
                  <div
                    key={pIdx}
                    className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                      isThisPlaying
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50/60 hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60'
                    } space-y-3`}
                  >
                    {/* Paragraph Control Header */}
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/50 dark:border-slate-700/40">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                          Paragraph {pIdx + 1}
                        </span>
                        {isThisPlaying && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
                            <Volume2 className="h-3 w-3" />
                            <span>প্লে হচ্ছে...</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {listenMode && (
                          <button
                            onClick={() => handleToggleReveal(pIdx)}
                            className="text-[11px] px-2 py-1 rounded-md text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 hover:bg-amber-200 font-medium"
                          >
                            {revealedParagraphs[pIdx] ? 'লুকান' : 'টেক্সট দেখুন'}
                          </button>
                        )}
                        <button
                          onClick={() => handlePlayParagraph(pIdx)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                            isThisPlaying
                              ? 'bg-rose-600 text-white'
                              : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 dark:bg-slate-700 dark:text-indigo-300 dark:border-slate-600'
                          }`}
                          title="এই বাক্যগুলো শুনুন"
                        >
                          {isThisPlaying ? (
                            <>
                              <Square className="h-3 w-3" />
                              <span>থামান</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3.5 w-3.5" />
                              <span>শুনুন</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* English text with clickable tokens or blurred in ear-training mode */}
                    {isHiddenByListenMode ? (
                      <div
                        onClick={() => handleToggleReveal(pIdx)}
                        className="py-4 text-center cursor-pointer rounded-xl bg-slate-200/60 dark:bg-slate-800/80 border border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-200"
                      >
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                          <Ear className="h-4 w-4 text-amber-500" />
                          <span>টেক্সট লুকানো আছে — প্রথমে অডিও শুনুন, তারপর ক্লিক করে টেক্সট প্রকাশ করুন</span>
                        </p>
                      </div>
                    ) : (
                      <div className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
                        {words.map((w, wIdx) => {
                          const clean = w.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').toLowerCase();
                          const isKey = currentStory.keyVocab.some((kv) => kv.word.toLowerCase() === clean);

                          return (
                            <span
                              key={wIdx}
                              onClick={() => handleWordClick(w)}
                              className={`inline-block mx-1 cursor-pointer transition-all duration-150 rounded-sm px-0.5 ${
                                isKey
                                  ? 'border-b-2 border-indigo-500 font-semibold text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-950/80'
                                  : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                              }`}
                              title="ক্লিক করে অর্থ ও উচ্চারণ শুনুন"
                            >
                              {w}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Bangla meaning toggle */}
                    {showBangla && !isHiddenByListenMode && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-sm text-emerald-800 dark:text-emerald-300 font-bangla leading-relaxed flex items-start gap-2">
                        <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 font-sans font-bold">
                          বাংলা
                        </span>
                        <p>{banglaTranslation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Comprehension Check Question */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-950/60 dark:bg-slate-800/50">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                  <Award className="h-4 w-4" />
                  <span>Listening & Reading Comprehension Quiz (+15 XP)</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {currentStory.comprehensionQuestion.question}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla mt-0.5">
                  {currentStory.comprehensionQuestion.questionBangla}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                  {currentStory.comprehensionQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentStory.comprehensionQuestion.correctIndex;
                    let style =
                      'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400';

                    if (quizSubmitted) {
                      if (isCorrect) {
                        style =
                          'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/20';
                      } else if (isSelected) {
                        style =
                          'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizOption(idx)}
                        disabled={quizSubmitted}
                        className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-3 text-xs p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bangla">
                    💡 <strong>ব্যাখ্যা:</strong> {currentStory.comprehensionQuestion.explanationBangla}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Word Inspector & Key Vocabulary List */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Word Inspector Card (Shows on click) */}
          {selectedWord && (
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50/50 p-5 shadow-xs dark:border-indigo-900/60 dark:bg-indigo-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>শব্দ বিশ্লেষণ (Word Inspector)</span>
                </div>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white capitalize">
                    {selectedWord.word}
                  </h3>
                  <button
                    onClick={() => speakText(selectedWord.word, speechAccent, 0.9)}
                    className="p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                    title="উচ্চারণ শুনুন"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>

                {selectedWord.ipa && (
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{selectedWord.ipa}</span>
                    {selectedWord.pron && (
                      <span className="font-bangla font-semibold text-emerald-700 dark:text-emerald-400">
                        উচ্চারণ: {selectedWord.pron}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-2 text-sm text-slate-700 dark:text-slate-300 font-bangla">
                  {selectedWord.meaning}
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                  <button
                    onClick={() =>
                      handleToggleSaveVocab(selectedWord.word, selectedWord.meaning || '')
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:underline"
                  >
                    {savedWords[selectedWord.word] ? (
                      <>
                        <BookmarkCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>সংরক্ষিত হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5" />
                        <span>শব্দভাণ্ডারে সেভ করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Key Story Vocabulary Deck */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  গল্পের গুরুত্বপূর্ণ শব্দসমূহ ({currentStory.keyVocab.length})
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">অডিওসহ</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-1">
              {currentStory.keyVocab.map((vocab, vIdx) => {
                const isSaved = savedWords[vocab.word];
                return (
                  <div key={vIdx} className="py-3 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                          {vocab.word}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {vocab.pos}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(vocab.word, speechAccent)}
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                          title="উচ্চারণ শুনুন"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleSaveVocab(vocab.word, vocab.meaning)}
                          className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800"
                          title="সংরক্ষণ করুন"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-3.5 w-3.5 text-indigo-600" />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-mono text-slate-400 text-[11px]">{vocab.ipa}</span>
                      <span className="font-bangla font-semibold text-emerald-700 dark:text-emerald-300 text-[11px]">
                        উচ্চারণ: {vocab.banglaPronunciation}
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 font-bangla">
                      {vocab.meaning}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

