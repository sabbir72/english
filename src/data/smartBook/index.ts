import { SmartBookPage } from '../../types';
import { PAGES_1_TO_20 } from './pages1to20';
import { PAGES_21_TO_40 } from './pages21to40';
import { PAGES_41_TO_60 } from './pages41to60';
import { PAGES_61_TO_80 } from './pages61to80';
import { PAGES_81_TO_100 } from './pages81to100';

export const SMART_BOOK_100_PAGES: SmartBookPage[] = [
  ...PAGES_1_TO_20,
  ...PAGES_21_TO_40,
  ...PAGES_41_TO_60,
  ...PAGES_61_TO_80,
  ...PAGES_81_TO_100,
];

export interface SmartBookChapterMeta {
  number: number;
  title: string;
  titleBn: string;
  pageRange: [number, number];
  color: string;
}

export const SMART_BOOK_CHAPTERS: SmartBookChapterMeta[] = [
  { number: 1, title: "Ancient Wonders & Expeditions", titleBn: "প্রাচীন বিস্ময় ও অভিযান", pageRange: [1, 10], color: "amber" },
  { number: 2, title: "Science, Cosmos & Future Tech", titleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি", pageRange: [11, 20], color: "cyan" },
  { number: 3, title: "Psychology, Mindset & Character", titleBn: "মনস্তত্ত্ব, আত্মউন্নয়ন ও মানবচরিত্র", pageRange: [21, 30], color: "indigo" },
  { number: 4, title: "Business, Leadership & Workplace", titleBn: "ব্যবসা, নেতৃত্ব ও পেশাগত জীবন", pageRange: [31, 40], color: "emerald" },
  { number: 5, title: "Daily Life, Travel & Social Etiquette", titleBn: "দৈনন্দিন জীবন, ভ্রমণ ও সামাজিক শিষ্টাচার", pageRange: [41, 50], color: "sky" },
  { number: 6, title: "Philosophy, Wisdom & Life Principles", titleBn: "দর্শন, প্রজ্ঞা ও জীবন দর্শন", pageRange: [51, 60], color: "purple" },
  { number: 7, title: "Literature, Fine Arts & Music", titleBn: "সাহিত্য, শিল্পকলা ও সংগীত", pageRange: [61, 70], color: "rose" },
  { number: 8, title: "Mystery, Detective Riddles & Suspense", titleBn: "রহস্য, গোয়েন্দা গল্প ও সাসপেন্স", pageRange: [71, 80], color: "slate" },
  { number: 9, title: "Nature, Wildlife & The Living Earth", titleBn: "প্রকৃতি, বন্যপ্রাণী ও মহাসমুদ্র", pageRange: [81, 90], color: "teal" },
  { number: 10, title: "Human History & World Turning Points", titleBn: "মানব ইতিহাস ও যুগান্তকারী ঘটনা", pageRange: [91, 100], color: "violet" },
];

export const TOTAL_SMART_BOOK_PAGES = 100;
export const TOTAL_SMART_VOCAB_COUNT = SMART_BOOK_100_PAGES.reduce(
  (acc, page) => acc + page.vocabulary.length,
  0
);
