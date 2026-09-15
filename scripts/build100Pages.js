import fs from 'fs';
import path from 'path';
import { part1 } from './data_part1.js';
import { part2 } from './data_part2.js';
import { part3 } from './data_part3.js';
import { part4 } from './data_part4.js';

const allParts = [...part1, ...part2, ...part3, ...part4];

console.log(`Total chapters collected: ${allParts.length}`);

const chapters = allParts.map((item) => {
  const introLines = item.intro && item.intro.length > 0
    ? item.intro
    : [
        `দৈনন্দিন জীবনে "${item.title}" পরিস্থিতিতে যে ইংরেজি বাক্যগুলো সচরাচর প্রয়োজন হয়, সেগুলো এই অধ্যায়ে দেওয়া হয়েছে।`,
        'বাক্যগুলো অর্থ ও উচ্চারণসহ বারবার উচ্চস্বরে পড়ে অনুশীলন করুন।',
      ];

  const sentences = item.sentences.map((s, idx) => ({
    id: idx + 1,
    english: s[0],
    banglaPronunciation: s[1],
    banglaMeaning: s[2],
    category: item.category,
  }));

  return {
    id: `chapter-${item.number}`,
    number: item.number,
    title: item.title,
    bannerTitle: item.bannerTitle || item.title,
    category: item.category,
    introLines,
    sentences,
  };
});

const fileContent = `import { BookChapter } from '../types';

export const SPOKEN_BOOK_CHAPTERS: BookChapter[] = ${JSON.stringify(chapters, null, 2)};
`;

const targetPath = path.resolve('src/data/spokenBookData.ts');
fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully generated ${chapters.length} chapters in ${targetPath}`);
