// ==========================================
// ARABIC LANGUAGE DATASET (العربية - আরবি ভাষা শিক্ষা)
// ==========================================

export interface ArabicAlphabetChar {
  char: string;
  nameAr: string;
  nameBn: string;
  transliteration: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  banglaSound: string;
  exampleWord: {
    ar: string;
    trans: string;
    meaningBn: string;
  };
}

export interface ArabicVocabItem {
  id: string;
  arabic: string;
  transliteration: string;
  banglaMeaning: string;
  category: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'greeting' | 'phrase' | 'particle';
  level: 'Beginner' | 'Spoken' | 'Quranic';
  exampleAr: string;
  exampleTrans: string;
  exampleBn: string;
  noteBn?: string;
}

export interface ArabicStarterStep {
  step: number;
  titleBn: string;
  descBn: string;
  quickPhrase: {
    ar: string;
    trans: string;
    bangla: string;
    meaning: string;
  };
}

export interface ArabicGrammarLesson {
  id: string;
  ruleTitleAr: string;
  ruleTitleBn: string;
  formulaBn: string;
  explanationBn: string;
  examples: {
    ar: string;
    trans: string;
    meaningBn: string;
    breakdownBn?: string;
  }[];
  quiz: {
    questionBn: string;
    optionsBn: string[];
    correctIndex: number;
    explanationBn: string;
  };
}

export interface ArabicDialogue {
  id: string;
  titleBn: string;
  scenarioBn: string;
  culturalNoteBn: string;
  dialogue: {
    speaker: string;
    arabic: string;
    transliteration: string;
    bangla: string;
  }[];
}

export interface ArabicNumberItem {
  num: number;
  arabicNum: string;
  arabicWord: string;
  trans: string;
  banglaSound: string;
  meaningBn: string;
}

export interface QuranicWordItem {
  id: string;
  arabic: string;
  transliteration: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  rootWord: string;
  rootMeaningBn: string;
  quranFrequency: number;
  exampleAyahAr: string;
  exampleAyahPronunciationBn: string;
  surahReference: string;
  exampleAyahBn: string;
}

export interface QuranVerseWord {
  arabic: string;
  transliteration: string;
  banglaPronunciation: string;
  banglaMeaning: string;
  grammarTypeBn: string;
}

export interface QuranVerseStudy {
  id: string;
  surahNameBn: string;
  ayahNumber: number;
  fullVerseAr: string;
  fullVersePronunciationBn: string;
  fullVerseBn: string;
  words: QuranVerseWord[];
  tafsirSummaryBn: string;
}

export interface ArabicShadowingItem {
  id: string;
  arabic: string;
  transliteration: string;
  banglaSound: string;
  banglaMeaning: string;
  category: string;
  slowAudioKey: string;
}

export interface ArabicExpatSituation {
  id: string;
  titleBn: string;
  situationContextBn: string;
  locationTag: string;
  phrases: {
    speaker: string;
    ar: string;
    trans: string;
    banglaPronunciation: string;
    bangla: string;
    tipsBn?: string;
  }[];
}

// ---------------- 1-MINUTE ARABIC STARTER ROADMAP ----------------
export const ARABIC_STARTER_ROADMAP: ArabicStarterStep[] = [
  {
    step: 1,
    titleBn: 'সবচেয়ে বরকতময় শুভেচ্ছা: সালাম',
    descBn: 'আরবিতে কুশলাদি বিনিময়ের মূল বাক্য হলো "আসসালামু আলাইকুম" (আপনার ওপর শান্তি বর্ষিত হোক) এবং এর উত্তর "ওয়ালাইকুম আসসালাম"।',
    quickPhrase: {
      ar: 'السَّلَامُ عَلَيْكُمْ',
      trans: 'As-salamu alaykum',
      bangla: 'আসসালামু আলাইকুম',
      meaning: 'আপনার ওপর শান্তি বর্ষিত হোক',
    },
  },
  {
    step: 2,
    titleBn: 'সহজে নিজের নাম বলা: ইসমি [নাম]',
    descBn: 'আরবিতে নিজের নাম বলতে শুধু "ইসমি" (إِسْمِي - আমার নাম) বলে নিজের নাম বললেই হয়! যেমন: ইসমি রহিম (আমার নাম রহিম)।',
    quickPhrase: {
      ar: 'إِسْمِي رَحِيم',
      trans: 'Ismi Rahim',
      bangla: 'ইসমি রহিম',
      meaning: 'আমার নাম রহিম (My name is Rahim)',
    },
  },
  {
    step: 3,
    titleBn: 'ধন্যবাদ জানানো: শুকরান',
    descBn: 'যেকোনো উপকারের জন্য ধন্যবাদ জানাতে বলুন "শুকরান" (شُكْرًا)। এর উত্তরে বলা হয় "আফওয়ান" (عَفْوًا - স্বাগতম)।',
    quickPhrase: {
      ar: 'شُكْرًا جَزِيلًا',
      trans: 'Shukran jazilan',
      bangla: 'শুকরান জাযিলান',
      meaning: 'আপনাকে অনেক ধন্যবাদ (Thank you very much)',
    },
  },
  {
    step: 4,
    titleBn: 'অনুরোধ ও চাওয়া: মিন ফাদলিক',
    descBn: 'দোকানে বা কারও কাছে কিছু চাইলে শব্দের সাথে "মিন ফাদলিক" (দয়া করে / Please) যোগ করতে হয়। যেমন: "মা’আ মিন ফাদলিক" (দয়া করে পানি দিন)।',
    quickPhrase: {
      ar: 'مِنْ فَضْلِكَ',
      trans: 'Min fadlik',
      bangla: 'মিন ফাদলিক',
      meaning: 'দয়া করে / অনুগ্রহ করে (Please)',
    },
  },
];

// ---------------- ARABIC ALPHABET (28 হরফ / বর্ণমালা) ----------------
export const ARABIC_ALPHABET_DATA: ArabicAlphabetChar[] = [
  { char: 'ا', nameAr: 'أَلِف', nameBn: 'আলিফ', transliteration: 'Alif', isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا', banglaSound: 'আ / আ-কার', exampleWord: { ar: 'أَب (Ab)', trans: 'Ab', meaningBn: 'বাবা (Father)' } },
  { char: 'ب', nameAr: 'بَاء', nameBn: 'বা', transliteration: 'Baa', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', banglaSound: 'ব', exampleWord: { ar: 'بَاب (Bab)', trans: 'Bab', meaningBn: 'দরজা (Door)' } },
  { char: 'ت', nameAr: 'تَاء', nameBn: 'তা', transliteration: 'Taa', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', banglaSound: 'ত', exampleWord: { ar: 'تُفَّاح (Tuffah)', trans: 'Tuffah', meaningBn: 'আপেল (Apple)' } },
  { char: 'ث', nameAr: 'ثَاء', nameBn: 'ছা', transliteration: 'Thaa', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', banglaSound: 'ছা (কোমল)', exampleWord: { ar: 'ثَوْب (Thawb)', trans: 'Thawb', meaningBn: 'পোশাক (Dress)' } },
  { char: 'ج', nameAr: 'جِيم', nameBn: 'জীম', transliteration: 'Jeem', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', banglaSound: 'জ', exampleWord: { ar: 'جَمَل (Jamal)', trans: 'Jamal', meaningBn: 'উট (Camel)' } },
  { char: 'ح', nameAr: 'حَاء', nameBn: 'হা (বড়)', transliteration: 'Haa', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', banglaSound: 'হ (কণ্ঠনালীর মধ্যভাগ)', exampleWord: { ar: 'حَلِيب (Halib)', trans: 'Halib', meaningBn: 'দুধ (Milk)' } },
  { char: 'خ', nameAr: 'خَاء', nameBn: 'খ', transliteration: 'Khaa', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', banglaSound: 'খ (ভারী)', exampleWord: { ar: 'خُبْز (Khubz)', trans: 'Khubz', meaningBn: 'রুটি (Bread)' } },
  { char: 'د', nameAr: 'دَال', nameBn: 'দাল', transliteration: 'Daal', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', banglaSound: 'দ', exampleWord: { ar: 'دَفْتَر (Daftar)', trans: 'Daftar', meaningBn: 'খাতা (Notebook)' } },
  { char: 'ذ', nameAr: 'ذَال', nameBn: 'যাল', transliteration: 'Dhaal', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ', banglaSound: 'য (জিহ্বার আগা)', exampleWord: { ar: 'ذَهَب (Dhahab)', trans: 'Dhahab', meaningBn: 'স্বর্ণ (Gold)' } },
  { char: 'ر', nameAr: 'رَاء', nameBn: 'রা', transliteration: 'Raa', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', banglaSound: 'র (কম্পনযুক্ত)', exampleWord: { ar: 'رَجُل (Rajul)', trans: 'Rajul', meaningBn: 'পুরুষ (Man)' } },
  { char: 'ز', nameAr: 'زَاي', nameBn: 'যা', transliteration: 'Zay', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز', banglaSound: 'য / Z (বাঁশির ধ্বনি)', exampleWord: { ar: 'زَيْتُون (Zaytun)', trans: 'Zaytun', meaningBn: 'জলপাই (Olive)' } },
  { char: 'س', nameAr: 'سِين', nameBn: 'সীন', transliteration: 'Seen', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', banglaSound: 'স', exampleWord: { ar: 'سَمَك (Samak)', trans: 'Samak', meaningBn: 'মাছ (Fish)' } },
  { char: 'ش', nameAr: 'شِين', nameBn: 'শীন', transliteration: 'Sheen', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', banglaSound: 'শ', exampleWord: { ar: 'شَمْس (Shams)', trans: 'Shams', meaningBn: 'সূর্য (Sun)' } },
  { char: 'ص', nameAr: 'صَاد', nameBn: 'ছোয়াদ', transliteration: 'Saad', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', banglaSound: 'ছ (ভারী ও মোটা)', exampleWord: { ar: 'صَبَاح (Sabah)', trans: 'Sabah', meaningBn: 'সকাল (Morning)' } },
  { char: 'ض', nameAr: 'ضَاد', nameBn: 'দোয়াদ', transliteration: 'Daad', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', banglaSound: 'দ/য্ব (আরবির অনন্য ধ্বনি)', exampleWord: { ar: 'ضَوْء (Daw)', trans: 'Daw', meaningBn: 'আলো (Light)' } },
  { char: 'ط', nameAr: 'طَاء', nameBn: 'তোয়া', transliteration: 'Taa (heavy)', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', banglaSound: 'ত (ভারী)', exampleWord: { ar: 'طَالِب (Talib)', trans: 'Talib', meaningBn: 'ছাত্র (Student)' } },
  { char: 'ظ', nameAr: 'ظَاء', nameBn: 'যোয়া', transliteration: 'Zaa (heavy)', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', banglaSound: 'য (ভারী)', exampleWord: { ar: 'ظِلّ (Zill)', trans: 'Zill', meaningBn: 'ছায়া (Shadow)' } },
  { char: 'ع', nameAr: 'عَيْن', nameBn: 'আইন', transliteration: 'Ayn', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', banglaSound: 'আ (গলার গভীর থেকে)', exampleWord: { ar: 'عَيْن (Ayn)', trans: 'Ayn', meaningBn: 'চোখ (Eye)' } },
  { char: 'غ', nameAr: 'غَيْن', nameBn: 'গাইন', transliteration: 'Ghayn', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', banglaSound: 'গ (গার্গল করার মতো)', exampleWord: { ar: 'غُرْفَة (Ghurfah)', trans: 'Ghurfah', meaningBn: 'রুম (Room)' } },
  { char: 'ف', nameAr: 'فَاء', nameBn: 'ফা', transliteration: 'Faa', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', banglaSound: 'ফ', exampleWord: { ar: 'فَاكِهَة (Fakihah)', trans: 'Fakihah', meaningBn: 'ফল (Fruit)' } },
  { char: 'ق', nameAr: 'قَاف', nameBn: 'ক্বাফ', transliteration: 'Qaaf', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', banglaSound: 'ক্ব (কণ্ঠনালীর গোড়া)', exampleWord: { ar: 'قَلَم (Qalam)', trans: 'Qalam', meaningBn: 'কলম (Pen)' } },
  { char: 'ك', nameAr: 'كَاف', nameBn: 'কাফ', transliteration: 'Kaaf', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', banglaSound: 'ক (সহজ ও পাতলা)', exampleWord: { ar: 'كِتَاب (Kitab)', trans: 'Kitab', meaningBn: 'বই (Book)' } },
  { char: 'ل', nameAr: 'لَام', nameBn: 'লাম', transliteration: 'Laam', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', banglaSound: 'ল', exampleWord: { ar: 'لَيْل (Layl)', trans: 'Layl', meaningBn: 'রাত (Night)' } },
  { char: 'م', nameAr: 'مِيم', nameBn: 'মীম', transliteration: 'Meem', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', banglaSound: 'ম', exampleWord: { ar: 'مَاء (Maa)', trans: 'Maa', meaningBn: 'পানি (Water)' } },
  { char: 'ن', nameAr: 'نُون', nameBn: 'নূন', transliteration: 'Noon', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', banglaSound: 'ন', exampleWord: { ar: 'نُور (Noor)', trans: 'Noor', meaningBn: 'আলো / জ্যোতি (Light)' } },
  { char: 'ه', nameAr: 'هَاء', nameBn: 'হা (ছোট)', transliteration: 'Haa', isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه', banglaSound: 'হ (সহজ)', exampleWord: { ar: 'هِلَال (Hilal)', trans: 'Hilal', meaningBn: 'নতুন চাঁদ (Crescent)' } },
  { char: 'و', nameAr: 'وَاو', nameBn: 'ওয়াও', transliteration: 'Waaw', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو', banglaSound: 'ওয়া / উ-কার', exampleWord: { ar: 'وَلَد (Walad)', trans: 'Walad', meaningBn: 'ছেলে (Boy)' } },
  { char: 'ي', nameAr: 'يَاء', nameBn: 'ইয়া', transliteration: 'Yaa', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', banglaSound: 'ইয়া / ই-কার', exampleWord: { ar: 'يَوْم (Yawm)', trans: 'Yawm', meaningBn: 'দিন (Day)' } },
];

// ---------------- ARABIC CORE VOCABULARY (মৌলিক ও স্পোকেন শব্দভাণ্ডার) ----------------
export const ARABIC_VOCABULARY_LIST: ArabicVocabItem[] = [
  {
    id: 'ar-v-1',
    arabic: 'مَرْحَبًا',
    transliteration: 'Marhaban',
    banglaMeaning: 'স্বাগতম / হ্যালো (Hello / Welcome)',
    category: 'Greetings',
    partOfSpeech: 'greeting',
    level: 'Beginner',
    exampleAr: 'مَرْحَبًا بِكُمْ جَمِيعًا',
    exampleTrans: 'Marhaban bikum jami\'an',
    exampleBn: 'আপনাদের সবাইকে স্বাগতম।',
    noteBn: 'অনানুষ্ঠানিক বা বন্ধুদের সাধারণ সম্ভাষণে বলা হয়।',
  },
  {
    id: 'ar-v-2',
    arabic: 'صَبَاحُ الخَيْرِ',
    transliteration: 'Sabah al-khayr',
    banglaMeaning: 'শুভ সকাল (Good Morning)',
    category: 'Greetings',
    partOfSpeech: 'greeting',
    level: 'Beginner',
    exampleAr: 'صَبَاحُ الخَيْرِ يَا أُمِّي',
    exampleTrans: 'Sabah al-khayr ya Ummi',
    exampleBn: 'শুভ সকাল মা।',
    noteBn: 'এর উত্তরে বলা হয় "صباح النور" (সাবাহুন নূর - আলোকময় সকাল)।',
  },
  {
    id: 'ar-v-3',
    arabic: 'مَسَاءُ الخَيْرِ',
    transliteration: 'Masa\' al-khayr',
    banglaMeaning: 'শুভ সন্ধ্যা / শুভ অপরাহ্ন',
    category: 'Greetings',
    partOfSpeech: 'greeting',
    level: 'Beginner',
    exampleAr: 'مَسَاءُ الخَيْرِ يَا صَدِيقِي',
    exampleTrans: 'Masa\' al-khayr ya sadiqi',
    exampleBn: 'শুভ সন্ধ্যা আমার বন্ধু।',
    noteBn: 'এর উত্তরে বলা হয় "مساء النور" (মাসাউন নূর)।',
  },
  {
    id: 'ar-v-4',
    arabic: 'كَيْفَ حَالُكَ؟',
    transliteration: 'Kayfa haluka? (to male) / haluki? (to female)',
    banglaMeaning: 'আপনি কেমন আছেন? (How are you?)',
    category: 'Greetings',
    partOfSpeech: 'phrase',
    level: 'Beginner',
    exampleAr: 'كَيْفَ حَالُكَ؟ أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّه',
    exampleTrans: 'Kayfa haluka? Ana bikhayr walhamdulillah',
    exampleBn: 'আপনি কেমন আছেন? - আলহামদুলিল্লাহ আমি ভালো আছি।',
  },
  {
    id: 'ar-v-5',
    arabic: 'أَنَا',
    transliteration: 'Ana',
    banglaMeaning: 'আমি (I / Me)',
    category: 'Pronouns',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'أَنَا طَالِبٌ فِي الجَامِعَةِ',
    exampleTrans: 'Ana talibun fil-jami\'ah',
    exampleBn: 'আমি বিশ্ববিদ্যালয়ের একজন ছাত্র।',
  },
  {
    id: 'ar-v-6',
    arabic: 'أَنْتَ / أَنْتِ',
    transliteration: 'Anta (m) / Anti (f)',
    banglaMeaning: 'আপনি / তুমি (You)',
    category: 'Pronouns',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'هَلْ أَنْتَ مُهَنْدِسٌ؟',
    exampleTrans: 'Hal anta muhandis?',
    exampleBn: 'আপনি কি ইঞ্জিনিয়ার?',
    noteBn: 'পুরুষের ক্ষেত্রে Anta এবং মহিলার ক্ষেত্রে Anti বসে।',
  },
  {
    id: 'ar-v-7',
    arabic: 'مَاء',
    transliteration: 'Maa\'',
    banglaMeaning: 'পানি (Water)',
    category: 'Food & Drink',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'أُرِيدُ مَاءً بَارِدًا مِنْ فَضْلِكَ',
    exampleTrans: 'Ureedu maa\'an baridan min fadlik',
    exampleBn: 'দয়া করে আমাকে ঠান্ডা পানি দিন।',
  },
  {
    id: 'ar-v-8',
    arabic: 'شَاي',
    transliteration: 'Shaay',
    banglaMeaning: 'চা (Tea)',
    category: 'Food & Drink',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'أَشْرَبُ الشَّايَ فِي الصَّبَاحِ',
    exampleTrans: 'Ashrabu ash-shaay fis-sabah',
    exampleBn: 'আমি সকালে চা পান করি।',
  },
  {
    id: 'ar-v-9',
    arabic: 'كِتَاب',
    transliteration: 'Kitab',
    banglaMeaning: 'বই (Book)',
    category: 'Objects',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'هَذَا كِتَابٌ مُفِيدٌ',
    exampleTrans: 'Hadha kitabun mufeed',
    exampleBn: 'এটি একটি উপকারী বই।',
  },
  {
    id: 'ar-v-10',
    arabic: 'بَيْت',
    transliteration: 'Bayt',
    banglaMeaning: 'ঘর / বাড়ি (House / Home)',
    category: 'Objects',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'بَيْتِي قَرِيبٌ مِنَ المَسْجِدِ',
    exampleTrans: 'Bayti qareebun minal-masjid',
    exampleBn: 'আমার বাড়ি মসজিদের কাছে।',
  },
  {
    id: 'ar-v-11',
    arabic: 'مَسْجِد',
    transliteration: 'Masjid',
    banglaMeaning: 'মসজিদ (Mosque)',
    category: 'Places',
    partOfSpeech: 'noun',
    level: 'Beginner',
    exampleAr: 'أَذْهَبُ إِلَى المَسْجِدِ',
    exampleTrans: 'Adhhabu ilal-masjid',
    exampleBn: 'আমি মসজিদে যাচ্ছি।',
  },
  {
    id: 'ar-v-12',
    arabic: 'كَمْ السِّعْرُ؟',
    transliteration: 'Kam as-si\'r? / Bikam hadha?',
    banglaMeaning: 'এটার দাম কত? (How much is this?)',
    category: 'Shopping',
    partOfSpeech: 'phrase',
    level: 'Spoken',
    exampleAr: 'بِكَمْ هَذَا القَمِيصُ؟',
    exampleTrans: 'Bikam hadha al-qamees?',
    exampleBn: 'এই শার্টটির দাম কত?',
  },
  {
    id: 'ar-v-13',
    arabic: 'نَعَمْ / لَا',
    transliteration: 'Na\'am / Laa',
    banglaMeaning: 'হ্যাঁ / না (Yes / No)',
    category: 'Essential',
    partOfSpeech: 'particle',
    level: 'Beginner',
    exampleAr: 'نَعَمْ، أَنَا أَتَكَلَّمُ العَرَبِيَّةَ',
    exampleTrans: 'Na\'am, ana atakallamu al-arabiyyah',
    exampleBn: 'হ্যাঁ, আমি আরবিতে কথা বলতে পারি।',
  },
  {
    id: 'ar-v-14',
    arabic: 'فُنْدُق',
    transliteration: 'Funduq',
    banglaMeaning: 'হোটেল (Hotel)',
    category: 'Travel',
    partOfSpeech: 'noun',
    level: 'Spoken',
    exampleAr: 'أَيْنَ الفُنْدُقُ القَرِيبُ؟',
    exampleTrans: 'Ayna al-funduq al-qareeb?',
    exampleBn: 'নিকটস্থ হোটেলটি কোথায়?',
  },
  {
    id: 'ar-v-15',
    arabic: 'مَطَار',
    transliteration: 'Mataar',
    banglaMeaning: 'বিমানবন্দর (Airport)',
    category: 'Travel',
    partOfSpeech: 'noun',
    level: 'Spoken',
    exampleAr: 'سَأَذْهَبُ إِلَى المَطَارِ الآنَ',
    exampleTrans: 'Sa-adhhabu ilal-mataar al-aan',
    exampleBn: 'আমি এখন বিমানবন্দরে যাব।',
  },
];

// ---------------- ARABIC GRAMMAR LESSONS (সহজ ব্যাকরণ) ----------------
export const ARABIC_GRAMMAR_LESSONS: ArabicGrammarLesson[] = [
  {
    id: 'ar-g-1',
    ruleTitleAr: 'أَسْمَاءُ الإِشَارَةِ (هَذَا وَ هَذِهِ)',
    ruleTitleBn: 'ইশারা বা নির্দেশক সর্বনাম (এটি / This)',
    formulaBn: 'পুরুষবাচক = هَذَا (Hadha) | স্ত্রীবাচক = هَذِهِ (Hadhihi)',
    explanationBn: 'কাছের কোনো ব্যক্তি বা বস্তুকে ইঙ্গিত করতে "هذا" (হাযা - পুংলিঙ্গ) এবং "هذه" (হাযিহী - স্ত্রীলিঙ্গ) বসে। আরবিতে কোনো শব্দ গোল-তা (ة) দিয়ে শেষ হলে তা সাধারণত স্ত্রীবাচক হয়।',
    examples: [
      {
        ar: 'هَذَا كِتَابٌ',
        trans: 'Hadha kitab',
        meaningBn: 'এটি একটি বই। (পুরুষবাচক)',
        breakdownBn: 'Hadha (এটি) + Kitab (বই)',
      },
      {
        ar: 'هَذِهِ سَيَّارَةٌ',
        trans: 'Hadhihi sayyarah',
        meaningBn: 'এটি একটি গাড়ি। (স্ত্রীবাচক)',
        breakdownBn: 'Hadhihi (এটি) + Sayyarah (গাড়ি - শেষে ة থাকায় স্ত্রীবাচক)',
      },
    ],
    quiz: {
      questionBn: '"এটি একটি কলম (Qalam)" - এর সঠিক আরবি রূপ কোনটি?',
      optionsBn: ['هَذَا قَلَمٌ (Hadha qalam)', 'هَذِهِ قَلَمٌ (Hadhihi qalam)', 'قَلَمٌ هَذَا (Qalam hadha)', 'أَنَا قَلَمٌ (Ana qalam)'],
      correctIndex: 0,
      explanationBn: '"Qalam" একটি পুরুষবাচক শব্দ, তাই নির্দেশক হিসেবে "هذا" (Hadha) বসবে।',
    },
  },
  {
    id: 'ar-g-2',
    ruleTitleAr: 'الجُمْلَةُ الاِسْمِيَّةُ (নমিনাল বা পরিচয়মূলক বাক্য)',
    ruleTitleBn: 'সহজ বাক্য গঠন (Subject + Predicate)',
    formulaBn: 'المبتدأ (বিষয়/কর্তা) + الخبر (খবর/পরিচয়)',
    explanationBn: 'ইংরেজির মতো "is/am/are" বা কোনো সাহায্যকারী ক্রিয়াপদ আরবির সাধারণ বাক্যে প্রয়োজন হয় না! সরাসরি কর্তা ও পরিচয় পাশাপাশি বসলেই অর্থ সম্পন্ন হয়।',
    examples: [
      {
        ar: 'أَنَا طَالِبٌ',
        trans: 'Ana talib',
        meaningBn: 'আমি একজন ছাত্র। (I am a student)',
        breakdownBn: 'Ana (আমি) + Talib (ছাত্র)',
      },
      {
        ar: 'البَيْتُ كَبِيرٌ',
        trans: 'Al-baytu kabeer',
        meaningBn: 'বাড়িটি বড়। (The house is big)',
        breakdownBn: 'Al-bayt (বাড়িটি) + Kabeer (বড়)',
      },
    ],
    quiz: {
      questionBn: '"আমি রহিম" - আরবিতে কীভাবে বলবেন?',
      optionsBn: ['أَنَا رَحِيم (Ana Rahim)', 'هَذَا رَحِيم (Hadha Rahim)', 'هُوَ رَحِيم (Huwa Rahim)', 'رَحِيم أَنَا (Rahim Ana)'],
      correctIndex: 0,
      explanationBn: '"Ana" মানে আমি + নাম "Rahim" বসিয়ে সরাসরি বাক্য গঠিত হয়।',
    },
  },
  {
    id: 'ar-g-3',
    ruleTitleAr: 'حُرُوفُ الجَرِّ (অব্যয় / Prepositions)',
    ruleTitleBn: 'অবস্থান নির্দেশক অব্যয় (ফি, ইলা, মিন, আলা)',
    formulaBn: 'فِي (মধ্যে) | إِلَى (দিকে/পর্যন্ত) | مِنْ (থেকে) | عَلَى (ওপরে)',
    explanationBn: 'যেকোনো স্থানে থাকা বা যাওয়ার ক্ষেত্রে এই হরফগুলো ব্যবহৃত হয়। যেমন: ঘরে = فِي البَيْتِ (Fil-bayt)।',
    examples: [
      {
        ar: 'المَاءُ فِي الكَأْسِ',
        trans: 'Al-maa\'u fil-ka\'s',
        meaningBn: 'পানি গ্লাসের মধ্যে আছে।',
      },
      {
        ar: 'أَذْهَبُ إِلَى المَدْرَسَةِ',
        trans: 'Adhhabu ilal-madrasah',
        meaningBn: 'আমি মাদরাসা/স্কুলে যাচ্ছি।',
      },
    ],
    quiz: {
      questionBn: '"মসজিদে যাচ্ছি" - কোন হরফটি বসবে? "Adhhabu __ al-masjid"',
      optionsBn: ['إِلَى (Ila - দিকে/তে)', 'مِنْ (Min - থেকে)', 'عَلَى (Ala - ওপরে)', 'عَنْ (An)'],
      correctIndex: 0,
      explanationBn: 'গন্তব্যের ক্ষেত্রে إِلَى (Ila) ব্যবহৃত হয়।',
    },
  },
];

// ---------------- ARABIC SPOKEN CONVERSATIONS (বাস্তব জীবনের ডায়লগ) ----------------
export const ARABIC_CONVERSATIONS: ArabicDialogue[] = [
  {
    id: 'ar-c-1',
    titleBn: 'ট্যাক্সি ড্রাইভার ও পথচারীর ডায়লগ (Taxi to Airport)',
    scenarioBn: 'সৌদি আরবের জেদ্দায় বিমানবন্দর যাওয়ার জন্য ট্যাক্সি খোঁজার কথোপকথন।',
    culturalNoteBn: 'আরব দেশগুলোতে ট্যাক্সিতে ওঠার আগে সালাম দেওয়া এবং দাম বা মিটার ঠিক করে নেওয়া সাধারণ শিষ্টাচার।',
    dialogue: [
      {
        speaker: 'Passenger (যাত্রী)',
        arabic: 'السَّلَامُ عَلَيْكُمْ، هَلْ أَنْتَ فَارِغٌ؟',
        transliteration: 'As-salamu alaykum, hal anta farigh?',
        bangla: 'আসসালামু আলাইকুম, আপনি কি খালি আছেন?',
      },
      {
        speaker: 'Driver (ড্রাইভার)',
        arabic: 'وَعَلَيْكُمُ السَّلَامُ، نَعَمْ. إِلَى أَيْنَ تُرِيدُ؟',
        transliteration: 'Wa alaykum as-salam, na\'am. Ila ayna tureed?',
        bangla: 'ওয়ালাইকুম আসসালাম, হ্যাঁ। আপনি কোথায় যেতে চান?',
      },
      {
        speaker: 'Passenger (যাত্রী)',
        arabic: 'إِلَى المَطَارِ مِنْ فَضْلِكَ. كَمِ الأُجْرَةُ؟',
        transliteration: 'Ilal-mataar min fadlik. Kamil-ujrah?',
        bangla: 'দয়া করে বিমানবন্দরে যাব। ভাড়া কত?',
      },
      {
        speaker: 'Driver (ড্রাইভার)',
        arabic: 'خَمْسُونَ رِيَالًا فَقَطْ. تَفَضَّلْ بِالدُّخُولِ.',
        transliteration: 'Khamsoona riyalan faqat. Tafaddal bid-dukhool.',
        bangla: 'মাত্র ৫০ রিয়াল। আসুন গাড়িতে উঠুন।',
      },
    ],
  },
  {
    id: 'ar-c-2',
    titleBn: 'মার্কেটে কেনাকাটা (Shopping at the Souq)',
    scenarioBn: 'দোকানদারের কাছ থেকে খেজুর ও আতর কেনার সাধারণ কথোপকথন।',
    culturalNoteBn: 'আরব সংস্কৃতিতে কেনাকাটার ক্ষেত্রে সৌজন্যমূলক দামাদামি করা স্বাভাবিক ও প্রশংসিত।',
    dialogue: [
      {
        speaker: 'Customer (ক্রেতা)',
        arabic: 'مَرْحَبًا، بِكَمْ كِيلُو هَذَا التَّمْرِ؟',
        transliteration: 'Marhaban, bikam keelo hadha at-tamr?',
        bangla: 'হ্যালো, এই খেজুর এক কেজি কত?',
      },
      {
        speaker: 'Shopkeeper (দোকানদার)',
        arabic: 'أَهْلًا وَسَهْلًا! الكِيلُو بِعِشْرِينَ رِيَالًا.',
        transliteration: 'Ahlan wa sahlan! Al-keelo bi-\'ishreena riyalan.',
        bangla: 'স্বাগতম! প্রতি কেজি ২০ রিয়াল।',
      },
      {
        speaker: 'Customer (ক্রেতা)',
        arabic: 'أُرِيدُ اثْنَيْنِ كِيلُو مِنْ فَضْلِكَ.',
        transliteration: 'Ureedu ithnayni keelo min fadlik.',
        bangla: 'দয়া করে আমাকে দুই কেজি দিন।',
      },
      {
        speaker: 'Shopkeeper (দোকানদার)',
        arabic: 'تَفَضَّلْ يَا سَيِّدِي. شُكْرًا لَكَ!',
        transliteration: 'Tafaddal ya sayyidi. Shukran lak!',
        bangla: 'এই নিন স্যার। আপনাকে ধন্যবাদ!',
      },
    ],
  },
];

// ---------------- ARABIC NUMBERS (১ থেকে ২০ ও ১০০) ----------------
export const ARABIC_NUMBERS_DATA: ArabicNumberItem[] = [
  { num: 1, arabicNum: '١', arabicWord: 'وَاحِد', trans: 'Wahid', banglaSound: 'ওয়াহিদ', meaningBn: '১ (One)' },
  { num: 2, arabicNum: '٢', arabicWord: 'اِثْنَان', trans: 'Ithnan', banglaSound: 'ইছনান', meaningBn: '২ (Two)' },
  { num: 3, arabicNum: '٣', arabicWord: 'ثَلَاثَة', trans: 'Thalathah', banglaSound: 'সালাসাহ', meaningBn: '৩ (Three)' },
  { num: 4, arabicNum: '٤', arabicWord: 'أَرْبَعَة', trans: 'Arba\'ah', banglaSound: 'আরবা\'আহ', meaningBn: '৪ (Four)' },
  { num: 5, arabicNum: '٥', arabicWord: 'خَمْسَة', trans: 'Khamsah', banglaSound: 'খামসাহ', meaningBn: '৫ (Five)' },
  { num: 6, arabicNum: '٦', arabicWord: 'سِتَّة', trans: 'Sittah', banglaSound: 'সিত্তাহ', meaningBn: '৬ (Six)' },
  { num: 7, arabicNum: '٧', arabicWord: 'سَبْعَة', trans: 'Sab\'ah', banglaSound: 'সাব\'আহ', meaningBn: '৭ (Seven)' },
  { num: 8, arabicNum: '٨', arabicWord: 'ثَمَانِيَة', trans: 'Thamaniyah', banglaSound: 'সামানিয়াহ', meaningBn: '৮ (Eight)' },
  { num: 9, arabicNum: '٩', arabicWord: 'تِسْعَة', trans: 'Tis\'ah', banglaSound: 'তিস\'আহ', meaningBn: '৯ (Nine)' },
  { num: 10, arabicNum: '١٠', arabicWord: 'عَشَرَة', trans: '\'Asharah', banglaSound: 'আশারাহ', meaningBn: '১০ (Ten)' },
  { num: 20, arabicNum: '٢٠', arabicWord: 'عِشْرُونَ', trans: '\'Ishroon', banglaSound: 'ইশরূন', meaningBn: '২০ (Twenty)' },
  { num: 100, arabicNum: '١٠٠', arabicWord: 'مِائَة', trans: 'Mi\'ah', banglaSound: 'মি\'আহ', meaningBn: '১০০ (Hundred)' },
];

// ---------------- QURANIC WORDS & ROOT EXPLORER (কোরআনিক শব্দার্থ ও মূল ধাতু) ----------------
export const ARABIC_QURANIC_WORDS: QuranicWordItem[] = [
  {
    id: 'qw-1',
    arabic: 'الرَّحْمَٰن',
    transliteration: 'Ar-Rahmaan',
    banglaPronunciation: 'আর-রাহমান',
    banglaMeaning: 'পরম করুণাময়, অসীম দয়ালু',
    rootWord: 'ر-ح-م (R-H-M)',
    rootMeaningBn: 'মমতা, অনুগ্রহ ও অবিরাম দয়া প্রদর্শন করা',
    quranFrequency: 57,
    exampleAyahAr: 'الرَّحْمَٰنِ الرَّحِيمِ',
    exampleAyahPronunciationBn: 'আর-রাহমানির রাহিম',
    surahReference: 'সুরা আল-ফাতিহা (১:৩)',
    exampleAyahBn: 'যিনি পরম দয়ালু ও অসীম করুণাময়।',
  },
  {
    id: 'qw-2',
    arabic: 'الْعَالَمِينَ',
    transliteration: 'Al-\'Aalameen',
    banglaPronunciation: 'আল-আলামীন',
    banglaMeaning: 'সমগ্র সৃষ্টিজগৎ, সকল বিশ্বজগৎ',
    rootWord: 'ع-ل-م (\'A-L-M)',
    rootMeaningBn: 'চিহ্ন, জানা বা পরিচিত হওয়া যা স্রষ্টার নিদর্শন বহন করে',
    quranFrequency: 73,
    exampleAyahAr: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    exampleAyahPronunciationBn: 'আল-হামদু লিল্লাহি রাব্বিল আলামীন',
    surahReference: 'সুরা আল-ফাতিহা (১:২)',
    exampleAyahBn: 'সকল প্রশংসা আল্লাহর জন্য, যিনি সকল সৃষ্টির রব।',
  },
  {
    id: 'qw-3',
    arabic: 'الصِّرَاط',
    transliteration: 'As-Siraat',
    banglaPronunciation: 'আস-সিরাত',
    banglaMeaning: 'পথ, সহজ সরল রাজপথ',
    rootWord: 'ص-ر-ط (S-R-T)',
    rootMeaningBn: 'প্রশস্ত ও সুস্পষ্ট রাজপথ',
    quranFrequency: 45,
    exampleAyahAr: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    exampleAyahPronunciationBn: 'ইহদিনাস সিরাতাল মুস্তাক্বীম',
    surahReference: 'সুরা আল-ফাতিহা (১:৬)',
    exampleAyahBn: 'আমাদের সরল সঠিক পথ প্রদর্শন করুন।',
  },
  {
    id: 'qw-4',
    arabic: 'الْقَوْل',
    transliteration: 'Al-Qawl',
    banglaPronunciation: 'আল-ক্বাওল',
    banglaMeaning: 'কথা, বাণী, উক্তি',
    rootWord: 'ق-و-ل (Q-W-L)',
    rootMeaningBn: 'কথা বলা, বক্তব্য ব্যক্ত করা',
    quranFrequency: 1722,
    exampleAyahAr: 'وَقُولُوا لِلنَّاسِ حُسْنًا',
    exampleAyahPronunciationBn: 'ওয়া কূলূ লিন-নাসি হুসনা',
    surahReference: 'সুরা আল-বাক্বারাহ (২:৮৩)',
    exampleAyahBn: 'আর মানুষের সাথে সুন্দর ও উত্তম ভাষায় কথা বলো।',
  },
  {
    id: 'qw-5',
    arabic: 'الْعِلْم',
    transliteration: 'Al-\'Ilm',
    banglaPronunciation: 'আল-ইলম',
    banglaMeaning: 'জ্ঞান, প্রজ্ঞা, জানা',
    rootWord: 'ع-ل-م (\'A-L-M)',
    rootMeaningBn: 'অজ্ঞতা দূর করে সত্যকে জানা',
    quranFrequency: 854,
    exampleAyahAr: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    exampleAyahPronunciationBn: 'ওয়া ক্বুল রাব্বি যিদনী ইলমা',
    surahReference: 'সুরা ত্বোয়া-হা (২০:১১৪)',
    exampleAyahBn: 'এবং বলুন: হে আমার পালনকর্তা, আমার জ্ঞান বৃদ্ধি করুন!',
  },
  {
    id: 'qw-6',
    arabic: 'الصَّبْر',
    transliteration: 'As-Sabr',
    banglaPronunciation: 'আস-সাবর',
    banglaMeaning: 'ধৈর্য, অবিচলতা, আত্মসংযম',
    rootWord: 'ص-ب-ر (S-B-R)',
    rootMeaningBn: 'কঠিন পরিস্থিতিতে নিজেকে নিয়ন্ত্রণ রাখা',
    quranFrequency: 103,
    exampleAyahAr: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    exampleAyahPronunciationBn: 'ইন্নাল্লাহা মা\'আস সাবিরীন',
    surahReference: 'সুরা আল-বাক্বারাহ (২:১৫৩)',
    exampleAyahBn: 'নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।',
  },
  {
    id: 'qw-7',
    arabic: 'الشُّكْر',
    transliteration: 'Ash-Shukr',
    banglaPronunciation: 'আশ-শুকর',
    banglaMeaning: 'কৃতজ্ঞতা প্রকাশ, শোকরগোজারি',
    rootWord: 'ش-ك-ر (Sh-K-R)',
    rootMeaningBn: 'প্রাপ্ত নিয়ামতের স্বীকৃতি দেওয়া ও ধন্যবাদ জানানো',
    quranFrequency: 75,
    exampleAyahAr: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    exampleAyahPronunciationBn: 'লাইং শাকারতুম লা-আযীদান্নাকুম',
    surahReference: 'সুরা ইব্রাহীম (১৪:৭)',
    exampleAyahBn: 'যদি তোমরা কৃতজ্ঞতা স্বীকার করো, তবে আমি অবশ্যই তোমাদের নিয়ামত বাড়িয়ে দেব।',
  },
  {
    id: 'qw-8',
    arabic: 'النُّور',
    transliteration: 'An-Noor',
    banglaPronunciation: 'আন-নূর',
    banglaMeaning: 'আলো, জ্যোতি, সত্যের আলোকবর্তিকা',
    rootWord: 'ن-و-ر (N-W-R)',
    rootMeaningBn: 'যা অন্ধকার দূর করে দৃশ্যমান করে',
    quranFrequency: 49,
    exampleAyahAr: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
    exampleAyahPronunciationBn: 'আল্লাহু নূরুস সামাওয়াতি ওয়াল আরদ',
    surahReference: 'সুরা আন-নূর (২৪:৩৫)',
    exampleAyahBn: 'আল্লাহ আসমানসমূহ ও জমিনের আলো।',
  },
];

// ---------------- SURAH WORD-BY-WORD DEEP DIVE (সুরা শব্দার্থ ও বিশ্লেষণ) ----------------
export const ARABIC_QURAN_VERSES: QuranVerseStudy[] = [
  {
    id: 'qv-fatiha-1',
    surahNameBn: 'সুরা আল-ফাতিহা',
    ayahNumber: 1,
    fullVerseAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    fullVersePronunciationBn: 'বিসমিল্লাহির রাহমানির রাহিম',
    fullVerseBn: 'পরম করুণাময় অসীম দয়ালু আল্লাহর নামে (শুরু করছি)।',
    tafsirSummaryBn: 'যেকোনো নেক কাজ শুরুর সর্বশ্রেষ্ঠ প্রারম্ভিক দোয়া ও আল্লাহর রহমতের স্মরণ।',
    words: [
      { arabic: 'بِـ', transliteration: 'Bi', banglaPronunciation: 'বি-', banglaMeaning: 'দিয়ে / সাথে / নামে', grammarTypeBn: 'হরফে জার (Preposition)' },
      { arabic: 'اسْمِ', transliteration: 'Ism', banglaPronunciation: 'ইসম', banglaMeaning: 'নাম', grammarTypeBn: 'ইসম (Noun)' },
      { arabic: 'اللَّهِ', transliteration: 'Allah', banglaPronunciation: 'আল্লাহ', banglaMeaning: 'আল্লাহ', grammarTypeBn: 'ইসমে জালালাত (Proper Noun)' },
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-Rahman', banglaPronunciation: 'আর-রাহমান', banglaMeaning: 'পরম করুণাময়', grammarTypeBn: 'সিফাত / গুণবাচক বিশেষ্য' },
      { arabic: 'الرَّحِيمِ', transliteration: 'Ar-Raheem', banglaPronunciation: 'আর-রাহিম', banglaMeaning: 'অসীম দয়ালু', grammarTypeBn: 'সিফাত / গুণবাচক বিশেষ্য' },
    ],
  },
  {
    id: 'qv-fatiha-2',
    surahNameBn: 'সুরা আল-ফাতিহা',
    ayahNumber: 2,
    fullVerseAr: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    fullVersePronunciationBn: 'আল-হামদু লিল্লাহি রাব্বিল আলামীন',
    fullVerseBn: 'সমস্ত প্রশংসা ও কৃতজ্ঞতা আল্লাহর জন্য, যিনি সমগ্র বিশ্বজগতের প্রতিপালক।',
    tafsirSummaryBn: 'হামদ অর্থ অন্তরের গভীর ভালোবাসাসহ কৃত প্রশংসাজ্ঞাপন যা কেবল আল্লাহরই প্রাপ্য।',
    words: [
      { arabic: 'الْحَمْدُ', transliteration: 'Al-Hamdu', banglaPronunciation: 'আল-হামদু', banglaMeaning: 'সকল প্রশংসা', grammarTypeBn: 'নির্দিষ্ট বিশেষ্য (Definite Noun)' },
      { arabic: 'لِـ', transliteration: 'Li', banglaPronunciation: 'লি-', banglaMeaning: 'জন্য / উদ্দেশ্যে', grammarTypeBn: 'হরফে জার (Preposition)' },
      { arabic: 'اللَّهِ', transliteration: 'Allah', banglaPronunciation: 'আল্লাহ', banglaMeaning: 'আল্লাহ', grammarTypeBn: 'ইসমে জালালাত' },
      { arabic: 'رَبِّ', transliteration: 'Rabbi', banglaPronunciation: 'রাব্বি', banglaMeaning: 'প্রতিপালক / মালিক / স্রষ্টা', grammarTypeBn: 'ইসম (মুদাফ)' },
      { arabic: 'الْعَالَمِينَ', transliteration: 'Al-\'Aalameen', banglaPronunciation: 'আল-আলামীন', banglaMeaning: 'সকল বিশ্বজগৎ / সৃষ্টিজগৎ', grammarTypeBn: 'বহুবচন বিশেষ্য' },
    ],
  },
  {
    id: 'qv-fatiha-5',
    surahNameBn: 'সুরা আল-ফাতিহা',
    ayahNumber: 5,
    fullVerseAr: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    fullVersePronunciationBn: 'ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাসতা\'ঈন',
    fullVerseBn: 'আমরা কেবল আপনারই ইবাদত করি এবং কেবলমাত্র আপনারই কাছে সাহায্য চাই।',
    tafsirSummaryBn: 'তাওহিদের চরম পরাকাষ্ঠা — ইবাদত ও সাহায্য কামনায় একমাত্র আল্লাহর উপর নির্ভরশীলতা।',
    words: [
      { arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', banglaPronunciation: 'ইয়্যাকা', banglaMeaning: 'কেবলমাত্র আপনাকে', grammarTypeBn: 'খাস জামির (Exclusive Pronoun)' },
      { arabic: 'نَعْبُدُ', transliteration: 'Na\'budu', banglaPronunciation: 'না\'বুদু', banglaMeaning: 'আমরা ইবাদত করি', grammarTypeBn: 'মুজারে ক্রিয়া (Present/Future Verb)' },
      { arabic: 'وَ', transliteration: 'Wa', banglaPronunciation: 'ওয়া', banglaMeaning: 'এবং', grammarTypeBn: 'সংযোগকারী অব্যয় (Conjunction)' },
      { arabic: 'إِيَّاكَ', transliteration: 'Iyyaka', banglaPronunciation: 'ইয়্যাকা', banglaMeaning: 'কেবলমাত্র আপনার কাছে', grammarTypeBn: 'খাস জামির' },
      { arabic: 'نَسْتَعِينُ', transliteration: 'Nasta\'een', banglaPronunciation: 'নাসতা\'ঈন', banglaMeaning: 'আমরা সাহায্য প্রার্থনা করি', grammarTypeBn: 'মুজারে ক্রিয়া' },
    ],
  },
];

// ---------------- ARABIC AUDIO SHADOWING DRILLS (আরবি অডিও ও শ্যাডোয়িং) ----------------
export const ARABIC_SHADOWING_SENTENCES: ArabicShadowingItem[] = [
  {
    id: 'ash-1',
    arabic: 'السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ اليَوْم؟',
    transliteration: 'As-salamu alaykum, kayfa haluka al-yawm?',
    banglaSound: 'আসসালামু আলাইকুম, কায়ফা হালুকা আল-য়াওম?',
    banglaMeaning: 'আপনার ওপর শান্তি বর্ষিত হোক, আজ আপনি কেমন আছেন?',
    category: 'Daily Greeting',
    slowAudioKey: 'السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ اليَوْم؟',
  },
  {
    id: 'ash-2',
    arabic: 'أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّهِ، شُكْرًا جَزِيلًا.',
    transliteration: 'Ana bi-khayrin wal-hamdu lillah, shukran jazeelan.',
    banglaSound: 'আনা বি-খাইরিন ওয়াল-হামদু লিল্লাহ, শুকরান জাযীলা।',
    banglaMeaning: 'আমি ভালো আছি এবং আল্লাহর প্রশংসা, আপনাকে অনেক ধন্যবাদ।',
    category: 'Polite Response',
    slowAudioKey: 'أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّهِ، شُكْرًا جَزِيلًا.',
  },
  {
    id: 'ash-3',
    arabic: 'أُرِيدُ أَنْ أَتَعَلَّمَ اللُّغَةَ العَرَبِيَّةَ بِسُهُولَةٍ.',
    transliteration: 'Ureedu an ata\'allama al-lughata al-\'arabiyyata bi-suhoolah.',
    banglaSound: 'উরীদু আন আতা\'আল্লামা আল-লুগাহ আল-\'আরাবিয়্যাতা বি-সুহূলাহ।',
    banglaMeaning: 'আমি খুব সহজে আরবি ভাষা শিখতে চাই।',
    category: 'Learning Goal',
    slowAudioKey: 'أُرِيدُ أَنْ أَتَعَلَّمَ اللُّغَةَ العَرَبِيَّةَ بِسُهُولَةٍ.',
  },
  {
    id: 'ash-4',
    arabic: 'مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنْ بَنْغَلَادِيش.',
    transliteration: 'Min ayna anta? Ana min Banghladeesh.',
    banglaSound: 'মিন আইনা আনতা? আনা মিন বাংলাদেশ।',
    banglaMeaning: 'আপনার দেশ কোথায়? আমি বাংলাদেশ থেকে এসেছি।',
    category: 'Origin / Identity',
    slowAudioKey: 'مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنْ بَنْغَلَادِيش.',
  },
  {
    id: 'ash-5',
    arabic: 'كَمْ سِعْرُ هَذَا الشَّيْءِ مِنْ فَضْلِك؟',
    transliteration: 'Kam si\'ru hadha ash-shay\'i min fadlik?',
    banglaSound: 'কাম সি\'রু হাযাশ শায়য়ী মিন ফাদলিক?',
    banglaMeaning: 'দয়া করে বলুন, এটার দাম কত?',
    category: 'Shopping',
    slowAudioKey: 'كَمْ سِعْرُ هَذَا الشَّيْءِ مِنْ فَضْلِك؟',
  },
  {
    id: 'ash-6',
    arabic: 'أَيْنَ أَقْرَبُ مَسْجِدٍ أَوْ مَحَطَّة؟',
    transliteration: 'Ayna aqrabu masjidin aw mahattah?',
    banglaSound: 'আইনা আকরাবু মাসজিদিন আও মাহাত্তাহ?',
    banglaMeaning: 'নিকটতম মসজিদ বা স্টেশনটি কোন দিকে?',
    category: 'Direction',
    slowAudioKey: 'أَيْنَ أَقْرَبُ مَسْجِدٍ أَوْ مَحَطَّة؟',
  },
];

// ---------------- GULF & EXPAT SURVIVAL SITUATIONS (প্রবাস ও আরব দেশে বাস্তব কথোপকথন) ----------------
export const ARABIC_EXPAT_SITUATIONS: ArabicExpatSituation[] = [
  {
    id: 'exp-1',
    titleBn: 'ইমিগ্রেশন ও বিমানবন্দর (Airport & Passport Control)',
    situationContextBn: 'সৌদি আরব বা দুবাই বিমানবন্দরে ল্যান্ড করার পর ইমিগ্রেশন অফিসারের সাথে কথোপকথন।',
    locationTag: 'المَطَار (Airport)',
    phrases: [
      {
        speaker: 'Officer (কর্মকর্তা)',
        ar: 'أَعْطِنِي جَوَازَ السَّفَرِ وَالتَّأْشِيرَةَ مِنْ فَضْلِك.',
        trans: 'A\'tini jawaz as-safar wat-ta\'sheerah min fadlik.',
        banglaPronunciation: 'আ\'তিনি জাওয়ায আস-সাফার ওয়াত-তা\'শিরাহ মিন ফাদলিক।',
        bangla: 'দয়া করে আপনার পাসপোর্ট এবং ভিসা দিন।',
        tipsBn: 'বিমানবন্দরে বিনয়ের সাথে সাথে সাথে পাসপোর্ট ও পেপারস বাড়িয়ে দিন।',
      },
      {
        speaker: 'Traveler (যাত্রী)',
        ar: 'تَفَضَّلْ يَا سَيِّدِي، هَذَا جَوَازِي وَتَأْشِيرَةُ العَمَل.',
        trans: 'Tafaddal ya sayyidi, hadha jawazi wa ta\'sheerat al-\'amal.',
        banglaPronunciation: 'তাফাদ্দাল ইয়া সায়্যিদী, হাযা জাওয়াযী ওয়া তা\'শিরাতুল \'আমাল।',
        bangla: 'এই নিন স্যার, এটি আমার পাসপোর্ট ও কাজের ভিসা।',
        tipsBn: '"Tafaddal" মানে আসুন বা গ্রহণ করুন।',
      },
      {
        speaker: 'Officer (কর্মকর্তা)',
        ar: 'أَهْلًا بِكَ فِي المَمْلَكَةِ، رِحْلَةً سَعِيدَة!',
        trans: 'Ahlan bika fil-mamlakah, rihlatun sa\'eedah!',
        banglaPronunciation: 'আহলান বিকা ফিল-মামলাকাহ, রিহলাতুন সা\'ঈদাহ!',
        bangla: 'আপনাকে স্বাগতম! আপনার যাত্রা শুভ হোক।',
      },
    ],
  },
  {
    id: 'exp-2',
    titleBn: 'ট্যাক্সি ও গন্তব্য নির্দেশনা (Taxi & Directions)',
    situationContextBn: 'ট্যাক্সি ড্রাইভারকে গন্তব্যের কথা বলা ও মিটার চালুর অনুরোধ করা।',
    locationTag: 'التَّاكْسِي (Taxi)',
    phrases: [
      {
        speaker: 'Passenger (যাত্রী)',
        ar: 'لَوْ سَمَحْتَ، أُرِيدُ الذَّهَابَ إِلَى هَذَا الفُنْدُق.',
        trans: 'Law samahta, ureed adh-dhahaba ila hadha al-funduq.',
        banglaPronunciation: 'লাও সামাহতা, উরীদুয যাহাবা ইলা হাযাল ফুন্দুক্ব।',
        bangla: 'দয়া করে শুনুন, আমি এই হোটেলে যেতে চাই।',
      },
      {
        speaker: 'Driver (ড্রাইভার)',
        ar: 'حَسَنًا، ارْكَبْ مِنْ فَضْلِك.',
        trans: 'Hasanan, irkab min fadlik.',
        banglaPronunciation: 'হাসানান, ইরকাব মিন ফাদলিক।',
        bangla: 'ঠিক আছে, দয়া করে গাড়িতে উঠুন।',
      },
      {
        speaker: 'Passenger (যাত্রী)',
        ar: 'هَلْ يُمْكِنُكَ تَشْغِيلُ العَدَّاد؟',
        trans: 'Hal yumkinuka tashgheel al-\'addad?',
        banglaPronunciation: 'হাল ইয়ুমকিনুকা তাশগীলুল \'আদ্দাদ?',
        bangla: 'আপনি কি ট্যাক্সির মিটার চালু করতে পারেন?',
        tipsBn: '"Addad" (عَدَّاد) মানে ট্যাক্সির মিটার। প্রবাসে অতিরিক্ত ভাড়া এড়াতে এটি জরুরি।',
      },
    ],
  },
  {
    id: 'exp-3',
    titleBn: 'ক্লিনিক ও ফার্মেসি (Doctor & Pharmacy)',
    situationContextBn: 'অসুস্থ বোধ করলে ডাক্তারের কাছে লক্ষণ বর্ণনা করা ও ওষুধ চাওয়া।',
    locationTag: 'المُسْتَشْفَى (Hospital)',
    phrases: [
      {
        speaker: 'Patient (রোগী)',
        ar: 'أَشْعُرُ بِصُدَاعٍ شَدِيدٍ وَحُمَّى مُنْذُ أَمْس.',
        trans: 'Ash\'uru bi-suda\'in shadeedin wa humma mundhu ams.',
        banglaPronunciation: 'আশ\'উরু বি-সুদা\'ইং শাদীদিন ওয়া হুম্মা মুনযু আমস।',
        bangla: 'গতকাল থেকে আমার প্রচণ্ড মাথাব্যথা ও জ্বর অনুভূত হচ্ছে।',
        tipsBn: '"Suda" (صُدَاع) = মাথাব্যথা, "Humma" (حُمَّى) = জ্বর।',
      },
      {
        speaker: 'Doctor (ডাক্তার)',
        ar: 'خُذْ هَذَا الدَّوَاءَ ثَلَاثَ مَرَّاتٍ يَوْمِيًّا بَعْدَ الأَكْل.',
        trans: 'Khudh hadha ad-dawaa thalatha marraatin yawmiyyan ba\'da al-akl.',
        banglaPronunciation: 'খুয হাযাদ দাওয়াআ সালাসা মাররাতিন য়াওমিয়্যান বা\'দাল আকল।',
        bangla: 'এই ওষুধটি খাওয়ার পর দিনে তিনবার সেবন করুন।',
      },
      {
        speaker: 'Patient (রোগী)',
        ar: 'شَفَاكَ اللَّهُ، شُكْرًا جَزِيلًا يَا دُكْتُور.',
        trans: 'Shafaak Allah, shukran jazeelan ya duktoor.',
        banglaPronunciation: 'শাফাক্বাল্লাহ, শুকরান জাযীলা ইয়া দুকতুর।',
        bangla: 'অনেক ধন্যবাদ ডাক্তার সাহেব।',
      },
    ],
  },
];
