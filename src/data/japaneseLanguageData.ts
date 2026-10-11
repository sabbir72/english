export interface KanaCharacter {
  char: string;
  romaji: string;
  bangla: string;
  exampleWord?: {
    jp: string;
    romaji: string;
    bangla: string;
    meaning: string;
  };
}

export interface JapaneseVocabItem {
  id: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  banglaMeaning: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'greeting' | 'phrase' | 'counter';
  category: string;
  level: 'N5' | 'N4' | 'Beginner';
  exampleEn: string;
  exampleJp: string;
  exampleRomaji: string;
  exampleBn: string;
  audioText?: string;
  mnemonicsBn?: string;
}

export interface JapaneseGrammarLesson {
  id: string;
  pattern: string;
  romajiPattern: string;
  titleBangla: string;
  level: 'N5' | 'Beginner';
  explanationBangla: string;
  formationFormula: string;
  keyRule: string;
  examples: {
    japanese: string;
    romaji: string;
    bangla: string;
    literalNotes?: string;
  }[];
  practiceExercise: {
    questionBangla: string;
    options: string[];
    correctIndex: number;
    explanationBangla: string;
  };
}

export interface JapaneseConversationDialogue {
  id: string;
  title: string;
  titleBangla: string;
  scenarioBangla: string;
  dialogue: {
    speaker: string;
    speakerBangla: string;
    japanese: string;
    romaji: string;
    bangla: string;
  }[];
  culturalTipBangla: string;
}

export interface JapaneseDailyExpression {
  id: string;
  japanese: string;
  hiragana: string;
  romaji: string;
  banglaMeaning: string;
  situationBangla: string;
  politeness: 'Polite (丁寧)' | 'Casual (タメ口)' | 'Honorific (敬語)';
  audioText: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  strokeCount: number;
  grade: 'N5' | 'N4';
  onyomi: string[];
  kunyomi: string[];
  meaningBn: string;
  meaningEn: string;
  radical: string;
  radicalMeaningBn: string;
  compounds: {
    kanji: string;
    furigana: string;
    romaji: string;
    meaningBn: string;
  }[];
}

export interface JapaneseAnimeExpression {
  id: string;
  japanese: string;
  romaji: string;
  bangla: string;
  meaningBn: string;
  animeContextBn: string;
  formality: 'Casual (বন্ধুত্বপূর্ণ)' | 'Slang (অনানুষ্ঠানিক)' | 'Passionate (আবেগপ্রবণ)';
  audioText: string;
}

export interface JapaneseSpeedQuizQuestion {
  id: string;
  questionJp: string;
  missingPart: string;
  romaji: string;
  banglaMeaning: string;
  options: string[];
  correctAnswer: string;
  explanationBn: string;
}

// ---------------- HIRAGANA 46 CHARACTERS ----------------
export const HIRAGANA_DATA: { row: string; rowNameBn: string; chars: KanaCharacter[] }[] = [
  {
    row: 'a-row',
    rowNameBn: 'আ-বর্গ (A-line)',
    chars: [
      { char: 'あ', romaji: 'a', bangla: 'আ', exampleWord: { jp: 'あさ (asa)', romaji: 'asa', bangla: 'আসা', meaning: 'সকাল (Morning)' } },
      { char: 'い', romaji: 'i', bangla: 'ই', exampleWord: { jp: 'いぬ (inu)', romaji: 'inu', bangla: 'ইনু', meaning: 'কুকুর (Dog)' } },
      { char: 'う', romaji: 'u', bangla: 'উ', exampleWord: { jp: 'うみ (umi)', romaji: 'umi', bangla: 'উমি', meaning: 'সমুদ্র (Sea)' } },
      { char: 'え', romaji: 'e', bangla: 'এ', exampleWord: { jp: 'えき (eki)', romaji: 'eki', bangla: 'একি', meaning: 'স্টেশন (Station)' } },
      { char: 'お', romaji: 'o', bangla: 'ও', exampleWord: { jp: 'おちゃ (ocha)', romaji: 'ocha', bangla: 'ওচা', meaning: 'গ্রিন টি / চা' } },
    ],
  },
  {
    row: 'ka-row',
    rowNameBn: 'কা-বর্গ (Ka-line)',
    chars: [
      { char: 'か', romaji: 'ka', bangla: 'কা', exampleWord: { jp: 'かさ (kasa)', romaji: 'kasa', bangla: 'কাসা', meaning: 'ছাতা (Umbrella)' } },
      { char: 'き', romaji: 'ki', bangla: 'কি', exampleWord: { jp: 'き (ki)', romaji: 'ki', bangla: 'কি', meaning: 'গাছ (Tree)' } },
      { char: 'く', romaji: 'ku', bangla: 'কু', exampleWord: { jp: 'くるま (kuruma)', romaji: 'kuruma', bangla: 'কুরুমা', meaning: 'গাড়ি (Car)' } },
      { char: 'け', romaji: 'ke', bangla: 'কে', exampleWord: { jp: 'けいさつ (keisatsu)', romaji: 'keisatsu', bangla: 'কেইসাতসু', meaning: 'পুলিশ (Police)' } },
      { char: 'こ', romaji: 'ko', bangla: 'কো', exampleWord: { jp: 'こども (kodomo)', romaji: 'kodomo', bangla: 'কোদোমো', meaning: 'শিশু (Child)' } },
    ],
  },
  {
    row: 'sa-row',
    rowNameBn: 'সা-বর্গ (Sa-line)',
    chars: [
      { char: 'さ', romaji: 'sa', bangla: 'সা', exampleWord: { jp: 'さくら (sakura)', romaji: 'sakura', bangla: 'সাকুরা', meaning: 'চেরি ব্লসম' } },
      { char: 'し', romaji: 'shi', bangla: 'শি', exampleWord: { jp: 'しろ (shiro)', romaji: 'shiro', bangla: 'শিরো', meaning: 'সাদা (White)' } },
      { char: 'す', romaji: 'su', bangla: 'সু', exampleWord: { jp: 'すし (sushi)', romaji: 'sushi', bangla: 'সুশি', meaning: 'সুশি (খাবার)' } },
      { char: 'せ', romaji: 'se', bangla: 'সে', exampleWord: { jp: 'せんせい (sensei)', romaji: 'sensei', bangla: 'সেনসেই', meaning: 'শিক্ষক / স্যার' } },
      { char: 'そ', romaji: 'so', bangla: 'সো', exampleWord: { jp: 'そら (sora)', romaji: 'sora', bangla: 'সোরা', meaning: 'আকাশ (Sky)' } },
    ],
  },
  {
    row: 'ta-row',
    rowNameBn: 'তা-বর্গ (Ta-line)',
    chars: [
      { char: 'た', romaji: 'ta', bangla: 'তা', exampleWord: { jp: 'たまご (tamago)', romaji: 'tamago', bangla: 'তামাগো', meaning: 'ডিম (Egg)' } },
      { char: 'ち', romaji: 'chi', bangla: 'চি', exampleWord: { jp: 'ちず (chizu)', romaji: 'chizu', bangla: 'চিজু', meaning: 'মানচিত্র (Map)' } },
      { char: 'つ', romaji: 'tsu', bangla: 'ৎসু', exampleWord: { jp: 'つき (tsuki)', romaji: 'tsuki', bangla: 'ৎসুকি', meaning: 'চাঁদ (Moon)' } },
      { char: 'て', romaji: 'te', bangla: 'তে', exampleWord: { jp: 'て (te)', romaji: 'te', bangla: 'তে', meaning: 'হাত (Hand)' } },
      { char: 'と', romaji: 'to', bangla: 'তো', exampleWord: { jp: 'ともだち (tomodachi)', romaji: 'tomodachi', bangla: 'তোমোদাচি', meaning: 'বন্ধু (Friend)' } },
    ],
  },
  {
    row: 'na-row',
    rowNameBn: 'না-বর্গ (Na-line)',
    chars: [
      { char: 'な', romaji: 'na', bangla: 'না', exampleWord: { jp: 'なつ (natsu)', romaji: 'natsu', bangla: 'নাতসু', meaning: 'গ্রীষ্মকাল (Summer)' } },
      { char: 'に', romaji: 'ni', bangla: 'নি', exampleWord: { jp: 'にほん (nihon)', romaji: 'nihon', bangla: 'নিহন', meaning: 'জাপান (Japan)' } },
      { char: 'ぬ', romaji: 'nu', bangla: 'নু', exampleWord: { jp: 'いぬ (inu)', romaji: 'inu', bangla: 'ইনু', meaning: 'কুকুর (Dog)' } },
      { char: 'ね', romaji: 'ne', bangla: 'নে', exampleWord: { jp: 'ねこ (neko)', romaji: 'neko', bangla: 'নেকো', meaning: 'বিড়াল (Cat)' } },
      { char: 'の', romaji: 'no', bangla: 'নো', exampleWord: { jp: 'のりもの (norimono)', romaji: 'norimono', bangla: 'নোরিমোনো', meaning: 'যানবাহন (Vehicle)' } },
    ],
  },
  {
    row: 'ha-row',
    rowNameBn: 'হা-বর্গ (Ha-line)',
    chars: [
      { char: 'は', romaji: 'ha', bangla: 'হা (বা ওয়া)', exampleWord: { jp: 'はな (hana)', romaji: 'hana', bangla: 'হানা', meaning: 'ফুল / নাক (Flower/Nose)' } },
      { char: 'ひ', romaji: 'hi', bangla: 'হি', exampleWord: { jp: 'ひと (hito)', romaji: 'hito', bangla: 'হিতো', meaning: 'মানুষ / ব্যক্তি (Person)' } },
      { char: 'ふ', romaji: 'fu', bangla: 'ফু / হু', exampleWord: { jp: 'ふね (fune)', romaji: 'fune', bangla: 'ফুনে', meaning: 'জাহাজ / নৌকা (Boat)' } },
      { char: 'へ', romaji: 'he', bangla: 'হে (বা এ)', exampleWord: { jp: 'へや (heya)', romaji: 'heya', bangla: 'হেয়া', meaning: 'রুম / ঘর (Room)' } },
      { char: 'ほ', romaji: 'ho', bangla: 'হো', exampleWord: { jp: 'ほん (hon)', romaji: 'hon', bangla: 'হন', meaning: 'বই (Book)' } },
    ],
  },
  {
    row: 'ma-row',
    rowNameBn: 'মা-বর্গ (Ma-line)',
    chars: [
      { char: 'ま', romaji: 'ma', bangla: 'মা', exampleWord: { jp: 'まち (machi)', romaji: 'machi', bangla: 'মাচি', meaning: 'শহর (Town)' } },
      { char: 'み', romaji: 'mi', bangla: 'মি', exampleWord: { jp: 'みず (mizu)', romaji: 'mizu', bangla: 'মিজু', meaning: 'পানি (Water)' } },
      { char: 'む', romaji: 'mu', bangla: 'মু', exampleWord: { jp: 'むし (mushi)', romaji: 'mushi', bangla: 'মুশি', meaning: 'পোকামাকড় (Insect)' } },
      { char: 'め', romaji: 'me', bangla: 'মে', exampleWord: { jp: 'め (me)', romaji: 'me', bangla: 'মে', meaning: 'চোখ (Eye)' } },
      { char: 'も', romaji: 'mo', bangla: 'মো', exampleWord: { jp: 'もり (mori)', romaji: 'mori', bangla: 'মোরি', meaning: 'বন / জঙ্গল (Forest)' } },
    ],
  },
  {
    row: 'ya-row',
    rowNameBn: 'ইয়া-বর্গ (Ya-line)',
    chars: [
      { char: 'や', romaji: 'ya', bangla: 'ইয়া', exampleWord: { jp: 'やま (yama)', romaji: 'yama', bangla: 'য়ামা', meaning: 'পাহাড় (Mountain)' } },
      { char: 'ゆ', romaji: 'yu', bangla: 'ইউ', exampleWord: { jp: 'ゆき (yuki)', romaji: 'yuki', bangla: 'ইউকি', meaning: 'বরফ (Snow)' } },
      { char: 'よ', romaji: 'yo', bangla: 'ইয়ো', exampleWord: { jp: 'よる (yoru)', romaji: 'yoru', bangla: 'ইয়োরু', meaning: 'রাত (Night)' } },
    ],
  },
  {
    row: 'ra-row',
    rowNameBn: 'রা-বর্গ (Ra-line)',
    chars: [
      { char: 'ら', romaji: 'ra', bangla: 'রা (কোমল)', exampleWord: { jp: 'らいねん (rainen)', romaji: 'rainen', bangla: 'রাইনেন', meaning: 'আগামী বছর' } },
      { char: 'り', romaji: 'ri', bangla: 'রি', exampleWord: { jp: 'りんご (ringo)', romaji: 'ringo', bangla: 'রিঙ্গো', meaning: 'আপেল (Apple)' } },
      { char: 'る', romaji: 'ru', bangla: 'রু', exampleWord: { jp: 'るす (rusu)', romaji: 'rusu', bangla: 'রুসু', meaning: 'অনুপস্থিতি (Absence)' } },
      { char: 'れ', romaji: 're', bangla: 'রে', exampleWord: { jp: 'れきし (rekishi)', romaji: 'rekishi', bangla: 'রেকিশি', meaning: 'ইতিহাস (History)' } },
      { char: 'ろ', romaji: 'ro', bangla: 'রো', exampleWord: { jp: 'ろうそく (rousoku)', romaji: 'rousoku', bangla: 'রৌসোকু', meaning: 'মোমবাতি (Candle)' } },
    ],
  },
  {
    row: 'wa-n-row',
    rowNameBn: 'ওয়া এবং ং (Wa & N)',
    chars: [
      { char: 'わ', romaji: 'wa', bangla: 'ওয়া', exampleWord: { jp: 'わたし (watashi)', romaji: 'watashi', bangla: 'ওয়াতাসি', meaning: 'আমি (I/Me)' } },
      { char: 'を', romaji: 'wo (o)', bangla: 'ও (অবজেক্ট মার্কার)', exampleWord: { jp: 'みずを のむ', romaji: 'mizu o nomu', bangla: 'মিজু ও নোমু', meaning: 'পানি পান করা' } },
      { char: 'ん', romaji: 'n', bangla: 'ন্ / ং (অনুস্বার)', exampleWord: { jp: 'ほん (hon)', romaji: 'hon', bangla: 'হন', meaning: 'বই (Book)' } },
    ],
  },
];

// ---------------- KATAKANA (Foreign words & loanwords) ----------------
export const KATAKANA_DATA: { row: string; rowNameBn: string; chars: KanaCharacter[] }[] = [
  {
    row: 'a-row',
    rowNameBn: 'আ-বর্গ (Katakana A-line)',
    chars: [
      { char: 'ア', romaji: 'a', bangla: 'আ', exampleWord: { jp: 'アイス (aisu)', romaji: 'aisu', bangla: 'আইসু', meaning: 'আইসক্রিম (Ice cream)' } },
      { char: 'イ', romaji: 'i', bangla: 'ই', exampleWord: { jp: 'イギリス (igirisu)', romaji: 'igirisu', bangla: 'ইগিরিসু', meaning: 'যুক্তরাজ্য / ইংল্যান্ড' } },
      { char: 'ウ', romaji: 'u', bangla: 'উ', exampleWord: { jp: 'ウエブ (webu)', romaji: 'webu', bangla: 'ওয়েবু', meaning: 'ওয়েব (Web)' } },
      { char: 'エ', romaji: 'e', bangla: 'এ', exampleWord: { jp: 'エアコン (eakon)', romaji: 'eakon', bangla: 'এয়াকন', meaning: 'এয়ার কন্ডিশনার' } },
      { char: 'オ', romaji: 'o', bangla: 'ও', exampleWord: { jp: 'オレンジ (orenji)', romaji: 'orenji', bangla: 'ওরেন্জি', meaning: 'কমলা (Orange)' } },
    ],
  },
  {
    row: 'ka-row',
    rowNameBn: 'কা-বর্গ (Katakana Ka-line)',
    chars: [
      { char: 'カ', romaji: 'ka', bangla: 'কা', exampleWord: { jp: 'カメラ (kamera)', romaji: 'kamera', bangla: 'ক্যামেরা', meaning: 'ক্যামেরা (Camera)' } },
      { char: 'キ', romaji: 'ki', bangla: 'কি', exampleWord: { jp: 'キッチン (kicchin)', romaji: 'kicchin', bangla: 'কিচ্চিন', meaning: 'রান্নাঘর (Kitchen)' } },
      { char: 'ク', romaji: 'ku', bangla: 'কু', exampleWord: { jp: 'クラス (kurasu)', romaji: 'kurasu', bangla: 'কুরাসু', meaning: 'ক্লাস (Class)' } },
      { char: 'ケ', romaji: 'ke', bangla: 'কে', exampleWord: { jp: 'ケーキ (keeki)', romaji: 'keeki', bangla: 'কেকি', meaning: 'কেক (Cake)' } },
      { char: 'コ', romaji: 'ko', bangla: 'কো', exampleWord: { jp: 'コーヒー (koohii)', romaji: 'koohii', bangla: 'কোহি', meaning: 'কফি (Coffee)' } },
    ],
  },
  {
    row: 'sa-row',
    rowNameBn: 'সা-বর্গ (Katakana Sa-line)',
    chars: [
      { char: 'サ', romaji: 'sa', bangla: 'সা', exampleWord: { jp: 'サラダ (sarada)', romaji: 'sarada', bangla: 'সারাদা', meaning: 'সালাদ (Salad)' } },
      { char: 'シ', romaji: 'shi', bangla: 'শি', exampleWord: { jp: 'シャツ (shatsu)', romaji: 'shatsu', bangla: 'শাতসু', meaning: 'শার্ট (Shirt)' } },
      { char: 'ス', romaji: 'su', bangla: 'সু', exampleWord: { jp: 'スーパー (suupaa)', romaji: 'suupaa', bangla: 'সুপা', meaning: 'সুপারমার্কেট' } },
      { char: 'セ', romaji: 'se', bangla: 'সে', exampleWord: { jp: 'セーター (seetaa)', romaji: 'seetaa', bangla: 'সেতা', meaning: 'সোয়েটার (Sweater)' } },
      { char: 'ソ', romaji: 'so', bangla: 'সো', exampleWord: { jp: 'ソファー (sofaa)', romaji: 'sofaa', bangla: 'সোফা', meaning: 'সোফা (Sofa)' } },
    ],
  },
  {
    row: 'ta-row',
    rowNameBn: 'তা-বর্গ (Katakana Ta-line)',
    chars: [
      { char: 'タ', romaji: 'ta', bangla: 'তা', exampleWord: { jp: 'タクシー (takushii)', romaji: 'takushii', bangla: 'তাকুশি', meaning: 'ট্যাক্সি (Taxi)' } },
      { char: 'チ', romaji: 'chi', bangla: 'চি', exampleWord: { jp: 'チーズ (chiizu)', romaji: 'chiizu', bangla: 'চিজু', meaning: 'পনির / চিজ (Cheese)' } },
      { char: 'ツ', romaji: 'tsu', bangla: 'ৎসু', exampleWord: { jp: 'ツアー (tsuaa)', romaji: 'tsuaa', bangla: 'ৎসোয়া', meaning: 'ভ্রমণ / ট্যুর (Tour)' } },
      { char: 'テ', romaji: 'te', bangla: 'তে', exampleWord: { jp: 'テレビ (terebi)', romaji: 'terebi', bangla: 'তেরেবি', meaning: 'টেলিভিশন (TV)' } },
      { char: 'ト', romaji: 'to', bangla: 'তো', exampleWord: { jp: 'トマト (tomato)', romaji: 'tomato', bangla: 'তোমাতো', meaning: 'টমেটো (Tomato)' } },
    ],
  },
  {
    row: 'na-row',
    rowNameBn: 'না-বর্গ (Katakana Na-line)',
    chars: [
      { char: 'ナ', romaji: 'na', bangla: 'না', exampleWord: { jp: 'ナイフ (naifu)', romaji: 'naifu', bangla: 'নাইফু', meaning: 'ছুরি (Knife)' } },
      { char: 'ニ', romaji: 'ni', bangla: 'নি', exampleWord: { jp: 'ニュース (nyuusu)', romaji: 'nyuusu', bangla: 'নিউসু', meaning: 'খবর / নিউজ' } },
      { char: 'ヌ', romaji: 'nu', bangla: 'নু', exampleWord: { jp: 'ヌードル (nuudoru)', romaji: 'nuudoru', bangla: 'নুডোরু', meaning: 'নুডলস (Noodles)' } },
      { char: 'ネ', romaji: 'ne', bangla: 'নে', exampleWord: { jp: 'ネクタイ (nekutai)', romaji: 'nekutai', bangla: 'নেকুতাই', meaning: 'নেকটাই (Tie)' } },
      { char: 'ノ', romaji: 'no', bangla: 'নো', exampleWord: { jp: 'ノート (nooto)', romaji: 'nooto', bangla: 'নোতো', meaning: 'নোটবুক (Notebook)' } },
    ],
  },
  {
    row: 'ha-row',
    rowNameBn: 'হা-বর্গ (Katakana Ha-line)',
    chars: [
      { char: 'ハ', romaji: 'ha', bangla: 'হা', exampleWord: { jp: 'ハンバーガー (hanbaagaa)', romaji: 'hanbaagaa', bangla: 'হানবাগা', meaning: 'বার্গার' } },
      { char: 'ヒ', romaji: 'hi', bangla: 'হি', exampleWord: { jp: 'ヒーター (hiitaa)', romaji: 'hiitaa', bangla: 'হিতা', meaning: 'হিটার (Heater)' } },
      { char: 'フ', romaji: 'fu', bangla: 'ফু', exampleWord: { jp: 'フォーク (fooku)', romaji: 'fooku', bangla: 'ফোকু', meaning: 'কাঁটাচামচ (Fork)' } },
      { char: 'ヘ', romaji: 'he', bangla: 'হে', exampleWord: { jp: 'ヘリコプター (herikoputaa)', romaji: 'herikoputaa', bangla: 'হেরিকোপুতা', meaning: 'হেলিকপ্টার' } },
      { char: 'ホ', romaji: 'ho', bangla: 'হো', exampleWord: { jp: 'ホテル (hoteru)', romaji: 'hoteru', bangla: 'হোতেরু', meaning: 'হোটেল (Hotel)' } },
    ],
  },
  {
    row: 'ma-row',
    rowNameBn: 'মা-বর্গ (Katakana Ma-line)',
    chars: [
      { char: 'マ', romaji: 'ma', bangla: 'মা', exampleWord: { jp: 'マスク (masuku)', romaji: 'masuku', bangla: 'মাসুকু', meaning: 'মাস্ক (Mask)' } },
      { char: 'ミ', romaji: 'mi', bangla: 'মি', exampleWord: { jp: 'ミルク (miruku)', romaji: 'miruku', bangla: 'মিরুকু', meaning: 'দুধ (Milk)' } },
      { char: 'ム', romaji: 'mu', bangla: 'মু', exampleWord: { jp: 'ムービー (muubii)', romaji: 'muubii', bangla: 'মুবি', meaning: 'সিনেমা (Movie)' } },
      { char: 'メ', romaji: 'me', bangla: 'মে', exampleWord: { jp: 'メニュー (menyuu)', romaji: 'menyuu', bangla: 'মেন্যু', meaning: 'মেন্যু (Menu)' } },
      { char: 'モ', romaji: 'mo', bangla: 'মো', exampleWord: { jp: 'モデル (moderu)', romaji: 'moderu', bangla: 'মোদেরু', meaning: 'মডেল (Model)' } },
    ],
  },
  {
    row: 'ya-row',
    rowNameBn: 'ইয়া-বর্গ (Katakana Ya-line)',
    chars: [
      { char: 'ヤ', romaji: 'ya', bangla: 'ইয়া', exampleWord: { jp: 'ヤング (yangu)', romaji: 'yangu', bangla: 'য়াঙ্গু', meaning: 'তরুণ (Young)' } },
      { char: 'ユ', romaji: 'yu', bangla: 'ইউ', exampleWord: { jp: 'ユーザー (yuuzaa)', romaji: 'yuuzaa', bangla: 'ইউজা', meaning: 'ব্যবহারকারী (User)' } },
      { char: 'ヨ', romaji: 'yo', bangla: 'ইয়ো', exampleWord: { jp: 'ヨーグルト (yooguruto)', romaji: 'yooguruto', bangla: 'ইয়োগুরুতো', meaning: 'দই (Yogurt)' } },
    ],
  },
  {
    row: 'ra-row',
    rowNameBn: 'রা-বর্গ (Katakana Ra-line)',
    chars: [
      { char: 'ラ', romaji: 'ra', bangla: 'রা', exampleWord: { jp: 'ラジオ (rajio)', romaji: 'rajio', bangla: 'রাজিও', meaning: 'রেডিও (Radio)' } },
      { char: 'リ', romaji: 'ri', bangla: 'রি', exampleWord: { jp: 'リーダー (riidaa)', romaji: 'riidaa', bangla: 'রিদা', meaning: 'নেতা (Leader)' } },
      { char: 'ル', romaji: 'ru', bangla: 'রু', exampleWord: { jp: 'ルール (ruuru)', romaji: 'ruuru', bangla: 'রুরু', meaning: 'নিয়ম (Rule)' } },
      { char: 'レ', romaji: 're', bangla: 'রে', exampleWord: { jp: 'レストラン (resutoran)', romaji: 'resutoran', bangla: 'রেসুতোরান', meaning: 'রেস্তোরাঁ' } },
      { char: 'ロ', romaji: 'ro', bangla: 'রো', exampleWord: { jp: 'ロボット (robotto)', romaji: 'robotto', bangla: 'রোবোত্তো', meaning: 'রোবট (Robot)' } },
    ],
  },
  {
    row: 'wa-n-row',
    rowNameBn: 'ওয়া এবং ং (Katakana Wa & N)',
    chars: [
      { char: 'ワ', romaji: 'wa', bangla: 'ওয়া', exampleWord: { jp: 'ワイン (wain)', romaji: 'wain', bangla: 'ওয়াইন', meaning: 'ওয়াইন (Wine)' } },
      { char: 'ヲ', romaji: 'wo', bangla: 'ও', exampleWord: { jp: 'ヲ', romaji: 'wo', bangla: 'ও', meaning: 'খুব কম ব্যবহৃত' } },
      { char: 'ン', romaji: 'n', bangla: 'ন্ / ং', exampleWord: { jp: 'パン (pan)', romaji: 'pan', bangla: 'পান', meaning: 'পাউরুটি (Bread)' } },
    ],
  },
];

// ---------------- JAPANESE VOCABULARY (JLPT N5 Core & High-Utility) ----------------
export const JAPANESE_VOCAB_LIST: JapaneseVocabItem[] = [
  // Greetings & Courtesies
  {
    id: 'jp-v-1',
    kanji: 'こんにちは',
    hiragana: 'こんにちは',
    romaji: 'Konnichiwa',
    banglaMeaning: 'শুভ অপরাহ্ন / হ্যালো / কেমন আছেন',
    partOfSpeech: 'greeting',
    category: 'Greetings',
    level: 'N5',
    exampleEn: 'Hello, Mr. Tanaka.',
    exampleJp: '田中さん、こんにちは。',
    exampleRomaji: 'Tanaka-san, konnichiwa.',
    exampleBn: 'তানাকা সাহেব, আসসালামু আলাইকুম / কেমন আছেন।',
    mnemonicsBn: 'সকাল ১০টা থেকে বিকেল ৫টা পর্যন্ত সাধারণ শুভেচ্ছা জানাতে বলা হয়।',
  },
  {
    id: 'jp-v-2',
    kanji: 'おはようございます',
    hiragana: 'おはようございます',
    romaji: 'Ohayou gozaimasu',
    banglaMeaning: 'শুভ সকাল (নম্র)',
    partOfSpeech: 'greeting',
    category: 'Greetings',
    level: 'N5',
    exampleEn: 'Good morning, teacher.',
    exampleJp: '先生、おはようございます。',
    exampleRomaji: 'Sensei, ohayou gozaimasu.',
    exampleBn: 'স্যার, শুভ সকাল।',
    mnemonicsBn: 'বন্ধুদের ক্ষেত্রে শুধুই "Ohayou" বলা যায়, তবে বড়দের ক্ষেত্রে "Gozaimasu" যুক্ত করতে হয়।',
  },
  {
    id: 'jp-v-3',
    kanji: 'こんばんは',
    hiragana: 'こんばんは',
    romaji: 'Konbanwa',
    banglaMeaning: 'শুভ সন্ধ্যা',
    partOfSpeech: 'greeting',
    category: 'Greetings',
    level: 'N5',
    exampleEn: 'Good evening everyone.',
    exampleJp: 'みなさん、こんばんは。',
    exampleRomaji: 'Minasan, konbanwa.',
    exampleBn: 'সবাইকে শুভ সন্ধ্যা।',
  },
  {
    id: 'jp-v-4',
    kanji: 'ありがとうございます',
    hiragana: 'ありがとうございます',
    romaji: 'Arigatou gozaimasu',
    banglaMeaning: 'আপনাকে অনেক ধন্যবাদ (নম্র)',
    partOfSpeech: 'greeting',
    category: 'Greetings',
    level: 'N5',
    exampleEn: 'Thank you very much.',
    exampleJp: 'どうもありがとうございます。',
    exampleRomaji: 'Doumo arigatou gozaimasu.',
    exampleBn: 'আপনাকে অসংখ্য ধন্যবাদ।',
    mnemonicsBn: 'অতীত কাজের কৃতজ্ঞতা প্রকাশ করতে "Arigatou gozaimashita" বলা হয়।',
  },
  {
    id: 'jp-v-5',
    kanji: 'すみません',
    hiragana: 'すみません',
    romaji: 'Sumimasen',
    banglaMeaning: 'মাফ করবেন / এক্সকিউজ মি / দুঃখিত',
    partOfSpeech: 'phrase',
    category: 'Greetings',
    level: 'N5',
    exampleEn: 'Excuse me, where is the station?',
    exampleJp: 'すみません、駅はどこですか？',
    exampleRomaji: 'Sumimasen, eki wa doko desu ka?',
    exampleBn: 'মাফ করবেন, স্টেশন কোথায়?',
    mnemonicsBn: 'জাপানে রেস্তোরাঁয় ওয়েটার ডাকতে এবং ধাক্কা লাগলে ক্ষমা চাইতে দুক্ষেত্রেই বহুল ব্যবহৃত।',
  },
  {
    id: 'jp-v-6',
    kanji: 'はじめまして',
    hiragana: 'はじめまして',
    romaji: 'Hajimemashite',
    banglaMeaning: 'প্রথম সাক্ষাতে আনন্দিত (Nice to meet you)',
    partOfSpeech: 'greeting',
    category: 'Introductions',
    level: 'N5',
    exampleEn: 'Nice to meet you. I am Rahim.',
    exampleJp: 'はじめまして。ラヒムです。',
    exampleRomaji: 'Hajimemashite. Rahimu desu.',
    exampleBn: 'প্রথম দেখা হওয়ায় আনন্দিত। আমি রাহিম।',
    mnemonicsBn: 'নিজের পরিচয় শুরু করার প্রথম ডায়লগ।',
  },
  {
    id: 'jp-v-7',
    kanji: '私',
    hiragana: 'わたし',
    romaji: 'Watashi',
    banglaMeaning: 'আমি (I / Me)',
    partOfSpeech: 'noun',
    category: 'Pronouns',
    level: 'N5',
    exampleEn: 'I am a student.',
    exampleJp: '私は学生です。',
    exampleRomaji: 'Watashi wa gakusei desu.',
    exampleBn: 'আমি একজন ছাত্র।',
  },
  {
    id: 'jp-v-8',
    kanji: 'あなた',
    hiragana: 'あなた',
    romaji: 'Anata',
    banglaMeaning: 'আপনি / তুমি (You)',
    partOfSpeech: 'noun',
    category: 'Pronouns',
    level: 'N5',
    exampleEn: 'Are you a doctor?',
    exampleJp: 'あなたは医者ですか？',
    exampleRomaji: 'Anata wa isha desu ka?',
    exampleBn: 'আপনি কি ডাক্তার?',
    mnemonicsBn: 'জাপানিরা সরাসরি "আনাতা" না বলে ব্যক্তির নামের সাথে "-সান" (যেমন রহিম-সান) বলা পছন্দ করে।',
  },
  {
    id: 'jp-v-9',
    kanji: '学生',
    hiragana: 'がくせい',
    romaji: 'Gakusei',
    banglaMeaning: 'শিক্ষার্থী / ছাত্র-ছাত্রী',
    partOfSpeech: 'noun',
    category: 'School & Work',
    level: 'N5',
    exampleEn: 'Tanaka is a university student.',
    exampleJp: '田中さんは大学生です。',
    exampleRomaji: 'Tanaka-san wa daigakusei desu.',
    exampleBn: 'তানাকা সাহেব বিশ্ববিদ্যালয়ের ছাত্র।',
  },
  {
    id: 'jp-v-10',
    kanji: '先生',
    hiragana: 'せんせい',
    romaji: 'Sensei',
    banglaMeaning: 'শিক্ষক / উস্তাদ / ডাক্তার',
    partOfSpeech: 'noun',
    category: 'School & Work',
    level: 'N5',
    exampleEn: 'Mr. Yamada is a Japanese teacher.',
    exampleJp: '山田先生は日本語の先生です。',
    exampleRomaji: 'Yamada sensei wa nihongo no sensei desu.',
    exampleBn: 'ইয়ামাদা স্যার জাপানি ভাষার শিক্ষক।',
  },
  {
    id: 'jp-v-11',
    kanji: '日本語',
    hiragana: 'にほんご',
    romaji: 'Nihongo',
    banglaMeaning: 'জাপানি ভাষা',
    partOfSpeech: 'noun',
    category: 'Language',
    level: 'N5',
    exampleEn: 'I am studying Japanese.',
    exampleJp: '日本語を勉強しています。',
    exampleRomaji: 'Nihongo o benkyou shite imasu.',
    exampleBn: 'আমি জাপানি ভাষা পড়াশোনা করছি।',
  },
  {
    id: 'jp-v-12',
    kanji: '食べる',
    hiragana: 'たべる (たべます)',
    romaji: 'Taberu (Tabemasu)',
    banglaMeaning: 'খাওয়া (To eat)',
    partOfSpeech: 'verb',
    category: 'Daily Actions',
    level: 'N5',
    exampleEn: 'I eat bread in the morning.',
    exampleJp: '朝、パンを食べます。',
    exampleRomaji: 'Asa, pan o tabemasu.',
    exampleBn: 'সকালে পাউরুটি খাই।',
  },
  {
    id: 'jp-v-13',
    kanji: '飲む',
    hiragana: 'のむ (のみます)',
    romaji: 'Nomu (Nomimasu)',
    banglaMeaning: 'পান করা (To drink)',
    partOfSpeech: 'verb',
    category: 'Daily Actions',
    level: 'N5',
    exampleEn: 'I drink water.',
    exampleJp: '水を飲みます。',
    exampleRomaji: 'Mizu o nomimasu.',
    exampleBn: 'আমি পানি পান করি।',
  },
  {
    id: 'jp-v-14',
    kanji: '行く',
    hiragana: 'いく (いきます)',
    romaji: 'Iku (Ikimasu)',
    banglaMeaning: 'যাওয়া (To go)',
    partOfSpeech: 'verb',
    category: 'Daily Actions',
    level: 'N5',
    exampleEn: 'I go to Tokyo.',
    exampleJp: '東京へ行きます。',
    exampleRomaji: 'Toukyou e ikimasu.',
    exampleBn: 'আমি টোকিও যাব।',
  },
  {
    id: 'jp-v-15',
    kanji: '来る',
    hiragana: 'くる (きます)',
    romaji: 'Kuru (Kimasu)',
    banglaMeaning: 'আসা (To come)',
    partOfSpeech: 'verb',
    category: 'Daily Actions',
    level: 'N5',
    exampleEn: 'A friend will come to my house.',
    exampleJp: '友達が家に来ます。',
    exampleRomaji: 'Tomodachi ga uchi ni kimasu.',
    exampleBn: 'বন্ধু আমার বাড়িতে আসবে।',
  },
  {
    id: 'jp-v-16',
    kanji: '見る',
    hiragana: 'みる (みます)',
    romaji: 'Miru (Mimasu)',
    banglaMeaning: 'দেখা (To see / To watch)',
    partOfSpeech: 'verb',
    category: 'Daily Actions',
    level: 'N5',
    exampleEn: 'I watch anime.',
    exampleJp: 'アニメを見ます。',
    exampleRomaji: 'Anime o mimasu.',
    exampleBn: 'আমি অ্যানিমে দেখি।',
  },
  {
    id: 'jp-v-17',
    kanji: '本',
    hiragana: 'ほん',
    romaji: 'Hon',
    banglaMeaning: 'বই (Book)',
    partOfSpeech: 'noun',
    category: 'Objects',
    level: 'N5',
    exampleEn: 'This is my book.',
    exampleJp: 'これは私の本です。',
    exampleRomaji: 'Kore wa watashi no hon desu.',
    exampleBn: 'এটি আমার বই।',
  },
  {
    id: 'jp-v-18',
    kanji: '車',
    hiragana: 'くるま',
    romaji: 'Kuruma',
    banglaMeaning: 'গাড়ি / মোটরযান (Car)',
    partOfSpeech: 'noun',
    category: 'Objects',
    level: 'N5',
    exampleEn: 'This car is fast.',
    exampleJp: 'この車は速いです。',
    exampleRomaji: 'Kono kuruma wa hayai desu.',
    exampleBn: 'এই গাড়িটি দ্রুতগামী।',
  },
  {
    id: 'jp-v-19',
    kanji: '水',
    hiragana: 'みず',
    romaji: 'Mizu',
    banglaMeaning: 'পানি (Water)',
    partOfSpeech: 'noun',
    category: 'Food & Drink',
    level: 'N5',
    exampleEn: 'Please give me some water.',
    exampleJp: 'お水をください。',
    exampleRomaji: 'Omizu o kudasai.',
    exampleBn: 'অনুগ্রহ করে একটু পানি দিন।',
  },
  {
    id: 'jp-v-20',
    kanji: 'おいしい',
    hiragana: 'おいしい',
    romaji: 'Oishii',
    banglaMeaning: 'সুস্বাদু / মজার (Delicious)',
    partOfSpeech: 'adjective',
    category: 'Food & Drink',
    level: 'N5',
    exampleEn: 'This ramen is delicious!',
    exampleJp: 'このラーメンはとてもおいしいです！',
    exampleRomaji: 'Kono raamen wa totemo oishii desu!',
    exampleBn: 'এই রামেনটা অনেক সুস্বাদু!',
  },
  {
    id: 'jp-v-21',
    kanji: '大きい',
    hiragana: 'おおきい',
    romaji: 'Ookii',
    banglaMeaning: 'বড় (Big / Large)',
    partOfSpeech: 'adjective',
    category: 'Adjectives',
    level: 'N5',
    exampleEn: 'A big house.',
    exampleJp: '大きい家です。',
    exampleRomaji: 'Ookii ie desu.',
    exampleBn: 'বড় একটি বাড়ি।',
  },
  {
    id: 'jp-v-22',
    kanji: '小さい',
    hiragana: 'ちいさい',
    romaji: 'Chiisai',
    banglaMeaning: 'ছোট (Small / Tiny)',
    partOfSpeech: 'adjective',
    category: 'Adjectives',
    level: 'N5',
    exampleEn: 'A cute little cat.',
    exampleJp: '小さいかわいい猫です。',
    exampleRomaji: 'Chiisai kawaii neko desu.',
    exampleBn: 'ছোট্ট একটি মিষ্টি বিড়াল।',
  },
  {
    id: 'jp-v-23',
    kanji: 'いくら',
    hiragana: 'いくら',
    romaji: 'Ikura',
    banglaMeaning: 'কত দাম? (How much?)',
    partOfSpeech: 'phrase',
    category: 'Shopping',
    level: 'N5',
    exampleEn: 'How much is this?',
    exampleJp: 'これはいくらですか？',
    exampleRomaji: 'Kore wa ikura desu ka?',
    exampleBn: 'এটার দাম কত?',
  },
  {
    id: 'jp-v-24',
    kanji: '円',
    hiragana: 'えん',
    romaji: 'En (Yen)',
    banglaMeaning: 'ইয়েন (জাপানের মুদ্রা)',
    partOfSpeech: 'counter',
    category: 'Shopping',
    level: 'N5',
    exampleEn: 'It is 500 yen.',
    exampleJp: '五百円（500えん）です。',
    exampleRomaji: 'Gohyaku en desu.',
    exampleBn: '৫০০ ইয়েন।',
  },
  {
    id: 'jp-v-25',
    kanji: '大丈夫',
    hiragana: 'だいじょうぶ',
    romaji: 'Daijoubu',
    banglaMeaning: 'ঠিক আছে / কোনো সমস্যা নেই (All right / OK)',
    partOfSpeech: 'phrase',
    category: 'Daily Expressions',
    level: 'N5',
    exampleEn: 'Are you okay? - Yes, I am fine.',
    exampleJp: '大丈夫ですか？ー はい、大丈夫です。',
    exampleRomaji: 'Daijoubu desu ka? - Hai, daijoubu desu.',
    exampleBn: 'আপনি কি ঠিক আছেন? - হ্যাঁ, আমি ঠিক আছি।',
  },
];

// ---------------- JAPANESE GRAMMAR RULES (N5 Fundamentals) ----------------
export const JAPANESE_GRAMMAR_LESSONS: JapaneseGrammarLesson[] = [
  {
    id: 'jp-g-1',
    pattern: 'A は B です',
    romajiPattern: 'A wa B desu',
    titleBangla: 'A হলো B (পরিচয় ও সাধারণ বাক্য)',
    level: 'N5',
    formationFormula: '[বিষয়/ব্যক্তি] + は (wa) + [পরিচয়/গুণ] + です (desu)',
    keyRule: 'এখানে "は" বর্ণটি উচ্চারণ হবে "ওয়া" (wa), যা বিষয়ের মার্কার। "です" (desu) বাংলা "হয়/আছি" এর মতো কাজ করে ও বাক্যকে ভদ্র করে।',
    explanationBangla: 'জাপানি ভাষার সবচেয়ে মৌলিক বাক্য গঠন। নিজের নাম, পেশা, জাতীয়তা ইত্যাদি প্রকাশ করতে এই প্যাটার্ন ব্যবহৃত হয়। যেমন: আমি ছাত্র, এটি বই, তিনি ডাক্তার।',
    examples: [
      {
        japanese: '私はラヒムです。',
        romaji: 'Watashi wa Rahimu desu.',
        bangla: 'আমি রাহিম।',
        literalNotes: 'Watashi (আমি) + wa (মার্কার) + Rahimu (নাম) + desu (হই)',
      },
      {
        japanese: '田中さんは先生です。',
        romaji: 'Tanaka-san wa sensei desu.',
        bangla: 'তানাকা সাহেব একজন শিক্ষক।',
        literalNotes: 'Tanaka-san (তানাকা সাহেব) + wa + sensei (শিক্ষক) + desu',
      },
      {
        japanese: 'これはペンです。',
        romaji: 'Kore wa pen desu.',
        bangla: 'এটি একটি কলম।',
        literalNotes: 'Kore (এটি) + wa + pen (কলম) + desu',
      },
    ],
    practiceExercise: {
      questionBangla: '"আমি একজন ছাত্র" - জাপানি ভাষায় কোনটি সঠিক?',
      options: [
        '私は学生です (Watashi wa gakusei desu)',
        '私を学生です (Watashi o gakusei desu)',
        '私が学生でした (Watashi ga gakusei deshita)',
        '学生は私です (Gakusei wa watashi desu)',
      ],
      correctIndex: 0,
      explanationBangla: 'বিষয় + は (wa) + পরিচয় + です (desu) নিয়ম অনুযায়ী "Watashi wa gakusei desu" সঠিক।',
    },
  },
  {
    id: 'jp-g-2',
    pattern: 'A は B ではありません / じゃありません',
    romajiPattern: 'A wa B dewa arimasen / ja arimasen',
    titleBangla: 'A হলো না B (নেতিবাচক বাক্য - Negative)',
    level: 'N5',
    formationFormula: '[বিষয়] + は (wa) + [পরিচয়] + ではありません (dewa arimasen)',
    keyRule: 'কথ্য ভাষায় "じゃありません" (ja arimasen) বেশি ব্যবহৃত হয়, লেখার ভাষায় "ではありません" (dewa arimasen) ব্যবহৃত হয়।',
    explanationBangla: 'কোনো কিছু অস্বীকার বা না-বোধক করতে "です" এর বদলে "ではありません" বসাতে হয়।',
    examples: [
      {
        japanese: '私は医者ではありません。',
        romaji: 'Watashi wa isha dewa arimasen.',
        bangla: 'আমি ডাক্তার নই।',
        literalNotes: 'Watashi (আমি) + wa + isha (ডাক্তার) + dewa arimasen (নই)',
      },
      {
        japanese: 'これは私の本じゃありません。',
        romaji: 'Kore wa watashi no hon ja arimasen.',
        bangla: 'এটি আমার বই নয়।',
        literalNotes: 'Kore (এটি) + wa + watashi no hon (আমার বই) + ja arimasen',
      },
    ],
    practiceExercise: {
      questionBangla: '"তানাকা সাহেব আমেরিকান নন" - এর সঠিক জাপানি রূপ কোনটি?',
      options: [
        '田中さんはアメリカ人です (Tanaka-san wa amerikajin desu)',
        '田中さんはアメリカ人じゃありません (Tanaka-san wa amerikajin ja arimasen)',
        '田中さんアメリカ人ですか (Tanaka-san amerikajin desu ka)',
        'アメリカ人は田中さんです (Amerikajin wa Tanaka-san desu)',
      ],
      correctIndex: 1,
      explanationBangla: 'না-বোধক বাক্যে ja arimasen বা dewa arimasen বসে।',
    },
  },
  {
    id: 'jp-g-3',
    pattern: 'A は B ですか (প্রশ্নবোধক বাক্য)',
    romajiPattern: 'A wa B desu ka?',
    titleBangla: 'A কি B? (প্রশ্ন করার সহজ নিয়ম)',
    level: 'N5',
    formationFormula: '[সাধারণ বাক্য] + か (ka)?',
    keyRule: 'জাপানি ভাষায় প্রশ্ন করতে বাক্যের শেষে শুধু "か" (ka) কণাটি যুক্ত করলেই হয়। আলাদা কোনো প্রশ্নবোধক চিহ্ন (question mark) দেওয়ারও দরকার পড়ে না।',
    explanationBangla: 'যেমন ইংরেজিতে "Is he a doctor?" বলতে verb আগে আসে, কিন্তু জাপানিতে বাক্যের শেষেই শুধু "ka" যোগ হয়।',
    examples: [
      {
        japanese: 'あなたは学生ですか？',
        romaji: 'Anata wa gakusei desu ka?',
        bangla: 'আপনি কি ছাত্র?',
        literalNotes: 'Anata wa gakusei desu (আপনি ছাত্র) + ka (প্রশ্ন)',
      },
      {
        japanese: 'はい、学生です。/ いいえ、学生ではありません。',
        romaji: 'Hai, gakusei desu. / Iie, gakusei dewa arimasen.',
        bangla: 'হ্যাঁ, ছাত্র। / না, ছাত্র নই।',
        literalNotes: 'Hai = হ্যাঁ, Iie = না',
      },
    ],
    practiceExercise: {
      questionBangla: '"এটি কি জাপানি বই?" জাপানিতে কীভাবে জিজ্ঞেস করবেন?',
      options: [
        'これは日本語の本ですか (Kore wa nihongo no hon desu ka)',
        'これは日本語の本です (Kore wa nihongo no hon desu)',
        '日本語の本はこれでした (Nihongo no hon wa kore deshita)',
        'これ日本語本 (Kore nihongo hon)',
      ],
      correctIndex: 0,
      explanationBangla: 'বাক্যের শেষে "ka" যুক্ত করে প্রশ্ন তৈরি করা হয়।',
    },
  },
  {
    id: 'jp-g-4',
    pattern: '[Object] を [Verb] ます (কর্ম ও ক্রিয়া)',
    romajiPattern: '[Object] o [Verb] masu',
    titleBangla: 'কর্ম ও কাজ (যেমন: ভাত খাই, পানি পান করি)',
    level: 'N5',
    formationFormula: '[অবজেক্ট] + を (উচ্চারণ: ও/o) + [ক্রিয়াপদ-masu form]',
    keyRule: 'জাপানি ভাষায় বাক্যের শেষে ক্রিয়া (Verb) বসে (SOV কাঠামো: কর্তা + কর্ম + ক্রিয়া)। যেমন: "আমি আপেল খাই" = আমি + আপেল を + খাই।',
    explanationBangla: 'যেকোনো কাজের অবজেক্ট বা কর্ম বোঝাতে "を" (o) পার্টিকেল ব্যবহৃত হয়।',
    examples: [
      {
        japanese: 'パンを食べます。',
        romaji: 'Pan o tabemasu.',
        bangla: 'পাউরুটি খাই।',
        literalNotes: 'Pan (পাউরুটি) + o (কর্ম নির্দেশক) + tabemasu (খাই)',
      },
      {
        japanese: '水を飲みます。',
        romaji: 'Mizu o nomimasu.',
        bangla: 'পানি পান করি।',
        literalNotes: 'Mizu (পানি) + o + nomimasu (পান করি)',
      },
      {
        japanese: '日本語を勉強します。',
        romaji: 'Nihongo o benkyou shimasu.',
        bangla: 'জাপানি ভাষা পড়াশোনা করি।',
        literalNotes: 'Nihongo (জাপানি ভাষা) + o + benkyou shimasu (পড়াশোনা করি)',
      },
    ],
    practiceExercise: {
      questionBangla: '"পানি পান করি" বাক্যটিতে কোন পার্টিকেল বসবে? "Mizu __ nomimasu"',
      options: ['を (o)', 'は (wa)', 'に (ni)', 'で (de)'],
      correctIndex: 0,
      explanationBangla: 'সরাসরি কর্ম বা অবজেক্টের পর を (o) পার্টিকেল বসে।',
    },
  },
  {
    id: 'jp-g-5',
    pattern: '[Place] へ / に 行きます (স্থানে যাওয়া)',
    romajiPattern: '[Place] e / ni ikimasu',
    titleBangla: 'কোথাও যাওয়া বা আসা নির্দেশক পার্টিকেল',
    level: 'N5',
    formationFormula: '[স্থান] + へ (উচ্চারণ: এ/e) বা に (ni) + 行きます (ikimasu) / 来ます (kimasu)',
    keyRule: '"へ" বর্ণটি সাধারণ ক্ষেত্রে "he" হলেও অভিমুখ বা গতি বোঝাতে "e" উচ্চারিত হয়।',
    explanationBangla: 'স্কুলে যাওয়া, জাপান যাওয়া, অফিসে যাওয়া বোঝাতে স্থানের পর "へ" বা "に" বসে।',
    examples: [
      {
        japanese: '学校へ行きます。',
        romaji: 'Gakkou e ikimasu.',
        bangla: 'স্কুলে যাই / যাব।',
        literalNotes: 'Gakkou (স্কুল) + e (অভিমুখে) + ikimasu (যাই)',
      },
      {
        japanese: '日本へ行きたいです。',
        romaji: 'Nihon e ikitai desu.',
        bangla: 'আমি জাপান যেতে চাই।',
        literalNotes: 'Nihon (জাপান) + e + ikitai desu (যেতে চাই)',
      },
    ],
    practiceExercise: {
      questionBangla: '"টোকিও যাব" - জাপানি ভাষায় কোনটি শুদ্ধ?',
      options: [
        '東京へ行きます (Toukyou e ikimasu)',
        '東京を行きます (Toukyou o ikimasu)',
        '東京は行きます (Toukyou wa ikimasu)',
        '東京です行きます (Toukyou desu ikimasu)',
      ],
      correctIndex: 0,
      explanationBangla: 'গন্তব্যের পর directional particle হিসেবে へ (e) বসে।',
    },
  },
];

// ---------------- JAPANESE REAL-LIFE CONVERSATIONS ----------------
export const JAPANESE_CONVERSATIONS: JapaneseConversationDialogue[] = [
  {
    id: 'conv-1',
    title: 'Self Introduction in Tokyo',
    titleBangla: 'জাপানে নিজের পরিচয় দেওয়া (Jikoshoukai)',
    scenarioBangla: 'টোকিওর একটি ল্যাঙ্গুয়েজ স্কুলে প্রথম দিনে শিক্ষক ও শিক্ষার্থীর কথোপকথন।',
    culturalTipBangla: 'জাপানিরা পরিচয়ের শুরুতে নম্র হয়ে মাথা কিছুটা ঝুঁকিয়ে (Bow) সম্মান প্রদর্শন করে এবং শেষ করে "Yoroshiku onegaishimasu" বলে।',
    dialogue: [
      {
        speaker: 'Teacher (先生)',
        speakerBangla: 'শিক্ষক',
        japanese: 'はじめまして。お名前は何ですか？',
        romaji: 'Hajimemashite. Onamae wa nan desu ka?',
        bangla: 'সাক্ষাতে খুশি হলাম। আপনার নাম কী?',
      },
      {
        speaker: 'Rahim (ラヒム)',
        speakerBangla: 'রাহিম',
        japanese: 'はじめまして。私はラヒムです。バングラデシュから来ました。',
        romaji: 'Hajimemashite. Watashi wa Rahimu desu. Banguradeshu kara kimashita.',
        bangla: 'সাক্ষাতে খুশি হলাম। আমি রাহিম। বাংলাদেশ থেকে এসেছি।',
      },
      {
        speaker: 'Teacher (先生)',
        speakerBangla: 'শিক্ষক',
        japanese: 'ラヒムさん、ようこそ！どうぞよろしくお願いします。',
        romaji: 'Rahimu-san, youkoso! Douzo yoroshiku onegaishimasu.',
        bangla: 'রাহিম সাহেব, স্বাগতম! আপনার সাথে ভালো সম্পর্ক প্রত্যাশা করি।',
      },
      {
        speaker: 'Rahim (ラヒム)',
        speakerBangla: 'রাহিম',
        japanese: 'こちらこそ、よろしくお願いします！',
        romaji: 'Kochira koso, yoroshiku onegaishimasu!',
        bangla: 'আমার দিক থেকেও একই প্রত্যাশা!',
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'At a Convenience Store (Konbini)',
    titleBangla: 'কনভিনিয়েন্স স্টোরে (Konbini) কেনাকাটা',
    scenarioBangla: '7-Eleven বা FamilyMart-এ সাধারণ কেনাকাটা ও ক্যাশিয়ারের সাথে কথোপকথন।',
    culturalTipBangla: 'জাপানের দোকানে প্লাস্টিক ব্যাগের জন্য আলাদা করে ৩ থেকে ৫ ইয়েন নেওয়া হয়, তাই ব্যাগ লাগবে কি না জিজ্ঞেস করা হয় (Fukuro wa irimasu ka?)।',
    dialogue: [
      {
        speaker: 'Clerk (店員)',
        speakerBangla: 'দোকানদার',
        japanese: 'いらっしゃいませ！お弁当あたためますか？',
        romaji: 'Irasshaimase! Obentou atatamemasu ka?',
        bangla: 'স্বাগতম! আপনার বেন্টো (খাবারের বক্স) কি গরম করে দেব?',
      },
      {
        speaker: 'Customer (客)',
        speakerBangla: 'ক্রেতা',
        japanese: 'はい、お願いします。',
        romaji: 'Hai, onegaishimasu.',
        bangla: 'হ্যাঁ, দয়া করে একটু গরম করে দিন।',
      },
      {
        speaker: 'Clerk (店員)',
        speakerBangla: 'দোকানদার',
        japanese: '袋（ふくろ）はご利用ですか？',
        romaji: 'Fukuro wa goriyou desu ka?',
        bangla: 'আপনার কি পলিথিন ব্যাগ লাগবে?',
      },
      {
        speaker: 'Customer (客)',
        speakerBangla: 'ক্রেতা',
        japanese: 'いいえ、大丈夫です。このままでいいです。',
        romaji: 'Iie, daijoubu desu. Kono mama de ii desu.',
        bangla: 'না, লাগবে না। এভাবেই চলবে।',
      },
      {
        speaker: 'Clerk (店員)',
        speakerBangla: 'দোকানদার',
        japanese: '全部で750円になります。',
        romaji: 'Zenbu de nanahyaku gojuu en ni narimasu.',
        bangla: 'মোট ৭৫০ ইয়েন হয়েছে।',
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Ordering Ramen at a Restaurant',
    titleBangla: 'রেস্তোরাঁয় রামেন অর্ডার করা',
    scenarioBangla: 'টোকিওর একটি ঐতিহ্যবাহী রামেন শপে খাবার চাওয়ার পদ্ধতি।',
    culturalTipBangla: 'জাপানে রেস্তোরাঁয় কোনো টিপ দেওয়ার প্রথা নেই! টিপ দিলে বরং কর্মচারীরা বিব্রত হতে পারে।',
    dialogue: [
      {
        speaker: 'Customer (客)',
        speakerBangla: 'গ্রাহক',
        japanese: 'すみません！注文をお願いします。',
        romaji: 'Sumimasen! Chuumon o onegaishimasu.',
        bangla: 'মাফ করবেন! অর্ডার দিতে চাই।',
      },
      {
        speaker: 'Waiter (店員)',
        speakerBangla: 'পরিবেশক',
        japanese: 'はい、何にいたしますか？',
        romaji: 'Hai, nani ni itashimasu ka?',
        bangla: 'হ্যাঁ, আপনি কী খাবেন?',
      },
      {
        speaker: 'Customer (客)',
        speakerBangla: 'গ্রাহক',
        japanese: 'しょうゆラーメンを一つと、お水をください。',
        romaji: 'Shouyu raamen o hitotsu to, omizu o kudasai.',
        bangla: 'একটি সয়া সস রামেন এবং একটু পানি দিন।',
      },
      {
        speaker: 'Waiter (店員)',
        speakerBangla: 'পরিবেশক',
        japanese: 'かしこまりました。少々お待ちください。',
        romaji: 'Kashikomarimashita. Shou-shou omachi kudasai.',
        bangla: 'নিশ্চয়ই বুঝেছি। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।',
      },
    ],
  },
];

// ---------------- JAPANESE NUMBERS (1 to 100 & Money) ----------------
export const JAPANESE_NUMBERS_DATA = [
  { num: 1, kanji: '一', kana: 'いち', romaji: 'ichi', bangla: 'ইচি' },
  { num: 2, kanji: '二', kana: 'に', romaji: 'ni', bangla: 'নি' },
  { num: 3, kanji: '三', kana: 'さん', romaji: 'san', bangla: 'সান' },
  { num: 4, kanji: '四', kana: 'よん / し', romaji: 'yon / shi', bangla: 'ইয়ন / শি' },
  { num: 5, kanji: '五', kana: 'ご', romaji: 'go', bangla: 'গো' },
  { num: 6, kanji: '六', kana: 'ろく', romaji: 'roku', bangla: 'রোকু' },
  { num: 7, kanji: '七', kana: 'なな / しち', romaji: 'nana / shichi', bangla: 'নানা / শিচি' },
  { num: 8, kanji: '八', kana: 'はち', romaji: 'hachi', bangla: 'হাচি' },
  { num: 9, kanji: '九', kana: 'きゅう / く', romaji: 'kyuu / ku', bangla: 'কিউ / কু' },
  { num: 10, kanji: '十', kana: 'じゅう', romaji: 'juu', bangla: 'জিউ' },
  { num: 100, kanji: '百', kana: 'ひゃく', romaji: 'hyaku', bangla: 'হিয়াকু (১০০)' },
  { num: 1000, kanji: '千', kana: 'せん', romaji: 'sen', bangla: 'সেন (১,০০০)' },
  { num: 10000, kanji: '万', kana: 'まん', romaji: 'man', bangla: 'মান (১০,০০০)' },
];

// ---------------- MUST-KNOW JAPANESE DAILY SURVIVAL EXPRESSIONS ----------------
export const JAPANESE_SURVIVAL_EXPRESSIONS: JapaneseDailyExpression[] = [
  {
    id: 'exp-1',
    japanese: 'いただきます',
    hiragana: 'いただきます',
    romaji: 'Itadakimasu',
    banglaMeaning: 'খাবার শুরুর আগে কৃতজ্ঞতা জ্ঞাপন ("ধন্যবাদ, গ্রহণ করছি")',
    situationBangla: 'খাবার খাওয়ার ঠিক পূর্ব মুহূর্তে হাত জোড় করে বলতে হয়।',
    politeness: 'Polite (丁寧)',
    audioText: 'いただきます',
  },
  {
    id: 'exp-2',
    japanese: 'ごちそうさまでした',
    hiragana: 'ごちそうさまでした',
    romaji: 'Gochisousama deshita',
    banglaMeaning: 'খাবার শেষ করার পর কৃতজ্ঞতা ("খাবারটি চমৎকার ছিল")',
    situationBangla: 'খাবার খাওয়া শেষ হলে শেফ বা পরিবারের সদস্যদের ধন্যবাদ জানাতে বলা হয়।',
    politeness: 'Polite (丁寧)',
    audioText: 'ごちそうさまでした',
  },
  {
    id: 'exp-3',
    japanese: 'お疲れ様でした',
    hiragana: 'おつかれさまでした',
    romaji: 'Otsukaresama deshita',
    banglaMeaning: 'কাজের পরিশ্রমের জন্য ধন্যবাদ / কাজ শেষ করার শুভেচ্ছা',
    situationBangla: 'অফিস বা কর্মক্ষেত্রে দিনশেষে সহকর্মীদের বিদায় জানাতে সবচেয়ে বেশি ব্যবহৃত শব্দ।',
    politeness: 'Polite (丁寧)',
    audioText: 'お疲れ様でした',
  },
  {
    id: 'exp-4',
    japanese: 'いってきます',
    hiragana: 'いってきます',
    romaji: 'Ittekimasu',
    banglaMeaning: 'আমি যাচ্ছি (এবং ফিরে আসব)',
    situationBangla: 'সকালে বাড়ি থেকে বের হওয়ার সময় পরিবারের সদস্যদের বলা হয়।',
    politeness: 'Casual (タメ口)',
    audioText: 'いってきます',
  },
  {
    id: 'exp-5',
    japanese: 'いってらっしゃい',
    hiragana: 'いってらっしゃい',
    romaji: 'Itterasshai',
    banglaMeaning: 'নিরাপদে যাও / সাবধানে যেও',
    situationBangla: 'কেউ বাড়ি থেকে বের হলে তাকে শুভেচ্ছা জানাতে বলা হয়।',
    politeness: 'Casual (タメ口)',
    audioText: 'いってらっしゃい',
  },
  {
    id: 'exp-6',
    japanese: 'ただいま',
    hiragana: 'ただいま',
    romaji: 'Tadaima',
    banglaMeaning: 'আমি ফিরে এসেছি (I am home)',
    situationBangla: 'বাইরে থেকে বাড়ি ফিরে দরজায় দাঁড়িয়ে বলা হয়।',
    politeness: 'Casual (タメ口)',
    audioText: 'ただいま',
  },
  {
    id: 'exp-7',
    japanese: 'おかえりなさい',
    hiragana: 'おかえりなさい',
    romaji: 'Okaerinasai',
    banglaMeaning: 'ঘরে স্বাগতম (Welcome home)',
    situationBangla: 'বাড়ির কেউ ফিরে আসলে তাকে স্বাগতম জানাতে বলা হয়।',
    politeness: 'Polite (丁寧)',
    audioText: 'おかえりなさい',
  },
  {
    id: 'exp-8',
    japanese: 'よろしくお願いします',
    hiragana: 'よろしくおねがいします',
    romaji: 'Yoroshiku onegaishimasu',
    banglaMeaning: 'অনুগ্রহপূর্বক আমার দিকে খেয়াল রাখবেন / সহযোগিতা করবেন',
    situationBangla: 'নতুন কারও সাথে পরিচিত হলে বা কাউকে কোনো কাজের অনুরোধ জানালে অন্যতম গুরুত্বপূর্ণ বাক্যাংশ।',
    politeness: 'Honorific (敬語)',
    audioText: 'よろしくお願いします',
  },
];

// ---------------- SUPER EASY BEGINNER 1-MINUTE ROADMAP ----------------
export interface EasyStarterStep {
  step: number;
  title: string;
  titleBn: string;
  descBn: string;
  actionText: string;
  audioKey: string;
  quickPhrase: {
    jp: string;
    romaji: string;
    bangla: string;
    meaning: string;
  };
}

export const EASY_STARTER_ROADMAP: EasyStarterStep[] = [
  {
    step: 1,
    title: 'Instant Greetings',
    titleBn: '১ মিনিটে শুভেচ্ছা বলা শিখুন',
    descBn: 'জাপানিরা যেকোনো ব্যক্তির সাথে প্রথম কথা বলতে "Konnichiwa" (হ্যালো) ও "Arigatou" (ধন্যবাদ) বলে শুরু করে।',
    actionText: 'শুভেচ্ছা উচ্চারণ করুন',
    audioKey: 'こんにちは',
    quickPhrase: {
      jp: 'こんにちは (Konnichiwa)',
      romaji: 'Konnichiwa',
      bangla: 'কোন্নিচিওয়া',
      meaning: 'হ্যালো / কেমন আছেন',
    },
  },
  {
    step: 2,
    title: 'Introduce Your Name',
    titleBn: 'নিজের নাম বলুন (খুব সহজ সূত্র)',
    descBn: 'শুধুমাত্র আপনার নাম + "desu" (দেসু) বললেই জাপানি ভাষায় পরিচয় হয়ে যায়! যেমন: "Rahim desu" (আমি রহিম)।',
    actionText: 'পরিচয়ের ডায়লগ শুনুন',
    audioKey: 'わたしはラヒムです',
    quickPhrase: {
      jp: '私はラヒムです (Watashi wa Rahimu desu)',
      romaji: 'Watashi wa [Name] desu',
      bangla: 'ওয়াতাসি ওয়া [নাম] দেসু',
      meaning: 'আমি [আপনার নাম]',
    },
  },
  {
    step: 3,
    title: 'Polite Magic Word',
    titleBn: 'জাপানের জাদুকরী ভদ্র শব্দ: Sumimasen',
    descBn: 'রেস্তোরাঁয় কাউকে ডাকতে, রাস্তায় কারও কাছে জানতে চাইলে বা মাফ চাইতে এই একটি শব্দই যথেষ্ট!',
    actionText: 'ম্যাজিক শব্দ শুনুন',
    audioKey: 'すみません',
    quickPhrase: {
      jp: 'すみません (Sumimasen)',
      romaji: 'Sumimasen',
      bangla: 'সুমিমাসেন',
      meaning: 'মাফ করবেন / এক্সকিউজ মি',
    },
  },
  {
    step: 4,
    title: 'Order Anything: Kudasai',
    titleBn: 'যেকোনো কিছু চাওয়ার নিয়ম: [জিনিস] ください',
    descBn: 'দোকান বা রেস্তোরাঁয় যেকোনো জিনিসের নামের পর "Kudasai" (কুদাসাই) বললেই তা দেওয়া হবে (যেমন: "Mizu kudasai" - পানি দিন)।',
    actionText: 'অর্ডার শব্দ শুনুন',
    audioKey: 'みずをください',
    quickPhrase: {
      jp: 'お水をください (Omizu o kudasai)',
      romaji: 'Omizu o kudasai',
      bangla: 'ওমিজু ও কুদাসাই',
      meaning: 'দয়া করে পানি দিন',
    },
  },
];

// ---------------- JAPANESE SHORT EASY READING STORIES (সহজ পাঠ ও পড়া) ----------------
export interface JapaneseReadingStory {
  id: string;
  titleJp: string;
  titleRomaji: string;
  titleBn: string;
  level: string;
  difficultyBn: string;
  sentences: {
    jp: string;
    romaji: string;
    bangla: string;
    audioText: string;
  }[];
  vocabularyFocus: {
    word: string;
    romaji: string;
    meaningBn: string;
  }[];
  comprehensionQuiz: {
    questionBn: string;
    optionsBn: string[];
    correctIndex: number;
    explanationBn: string;
  };
}

export const JAPANESE_READING_STORIES: JapaneseReadingStory[] = [
  {
    id: 'jp-story-1',
    titleJp: 'わたし の いちにち',
    titleRomaji: 'Watashi no Ichinichi',
    titleBn: 'আমার একটি দিন (My Daily Routine)',
    level: 'N5 Beginner',
    difficultyBn: 'খুব সহজ • ১ মিনিট পাঠ',
    sentences: [
      {
        jp: 'わたし は あさ 7じ に おきます。',
        romaji: 'Watashi wa asa shichi-ji ni okimasu.',
        bangla: 'আমি সকাল ৭টায় ঘুম থেকে উঠি।',
        audioText: 'わたしはあさしちじにおきます。',
      },
      {
        jp: 'あさごはん に パン と たまご を たべます。',
        romaji: 'Asagohan ni pan to tamago o tabemasu.',
        bangla: 'সকালের নাস্তায় পাউরুটি ও ডিম খাই।',
        audioText: 'あさごはんにパンとたまごをたべます。',
      },
      {
        jp: 'そして、みず を のみます。',
        romaji: 'Soshite, mizu o nomimasu.',
        bangla: 'তারপর, পানি পান করি।',
        audioText: 'そして、みずをのみます。',
      },
      {
        jp: '8じ に がっこう へ いきます。',
        romaji: 'Hachi-ji ni gakkou e ikimasu.',
        bangla: '৮টায় স্কুলে যাই।',
        audioText: 'はちじにがっこうへいきます。',
      },
      {
        jp: 'にほんご の べんきょう は とても たのしい です！',
        romaji: 'Nihongo no benkyou wa totemo tanoshii desu!',
        bangla: 'জাপানি ভাষার পড়াশোনা অনেক আনন্দের!',
        audioText: 'にほんごのべんきょうはとてもたのしいです！',
      },
    ],
    vocabularyFocus: [
      { word: 'あさ (Asa)', romaji: 'asa', meaningBn: 'সকাল' },
      { word: 'あさごはん (Asagohan)', romaji: 'asagohan', meaningBn: 'সকালের নাস্তা' },
      { word: 'がっこう (Gakkou)', romaji: 'gakkou', meaningBn: 'বিদ্যালয় / স্কুল' },
      { word: 'たのしい (Tanoshii)', romaji: 'tanoshii', meaningBn: 'আনন্দদায়ক' },
    ],
    comprehensionQuiz: {
      questionBn: 'লেখক সকালে কয়টায় ঘুম থেকে ওঠেন?',
      optionsBn: ['সকাল ৬টায়', 'সকাল ৭টায় (7-ji)', 'সকাল ৮টায়', 'সকাল ৯টায়'],
      correctIndex: 1,
      explanationBn: 'প্রথম লাইনে বলা হয়েছে: "Watashi wa asa 7-ji ni okimasu" (আমি সকাল ৭টায় উঠি)।',
    },
  },
  {
    id: 'jp-story-2',
    titleJp: 'とうきょう の レストラン',
    titleRomaji: 'Toukyou no Resutoran',
    titleBn: 'টোকিওর রেস্তোরাঁয় খাওয়া (Eating at Tokyo Restaurant)',
    level: 'N5 Beginner',
    difficultyBn: 'সহজ ও বাস্তবমুখী',
    sentences: [
      {
        jp: 'きょう は ともだち と レストラン へ いきました。',
        romaji: 'Kyou wa tomodachi to resutoran e ikimashita.',
        bangla: 'আজকে বন্ধুর সাথে রেস্তোরাঁয় গিয়েছিলাম।',
        audioText: 'きょうはともだちとレストランへいきました。',
      },
      {
        jp: 'みせ の ひと が「いらっしゃいませ！」と いいました。',
        romaji: 'Mise no hito ga "Irasshaimase!" to iimashita.',
        bangla: 'দোকানদার বললেন "স্বাগতম (Welcome)!"।',
        audioText: 'みせのひとがいらっしゃいませといいました。',
      },
      {
        jp: 'わたし は おいしい ラーメン を たべました。',
        romaji: 'Watashi wa oishii raamen o tabemashita.',
        bangla: 'আমি সুস্বাদু রামেন খেয়েছিলাম।',
        audioText: 'わたしはおいしいラーメンをたべました。',
      },
      {
        jp: '「ごちそうさまでした！」と いって、かえりました。',
        romaji: '"Gochisousama deshita!" to itte, kaerimashita.',
        bangla: '"খাবারটি চমৎকার ছিল" ধন্যবাদ জানিয়ে ফিরে এসেছি।',
        audioText: 'ごちそうさまでしたといって、かえりました。',
      },
    ],
    vocabularyFocus: [
      { word: 'きょう (Kyou)', romaji: 'kyou', meaningBn: 'আজকে (Today)' },
      { word: 'ともだち (Tomodachi)', romaji: 'tomodachi', meaningBn: 'বন্ধু (Friend)' },
      { word: 'おいしい (Oishii)', romaji: 'oishii', meaningBn: 'সুস্বাদু / মজার' },
    ],
    comprehensionQuiz: {
      questionBn: 'খাবার খাওয়া শেষ করে জাপানি ভাষায় কী ধন্যবাদ বলা হয়?',
      optionsBn: ['Arigatou', 'Gochisousama deshita', 'Konnichiwa', 'Sayounara'],
      correctIndex: 1,
      explanationBn: 'জাপানে খাবার শেষ করার পর কৃতজ্ঞতা প্রকাশে "Gochisousama deshita" বলা হয়।',
    },
  },
];

// ---------------- JAPANESE LISTENING & AUDIO TRAINER DRILLS (শ্রবণ ও অনুধাবন) ----------------
export interface JapaneseListeningDrill {
  id: string;
  audioPromptJp: string;
  promptRomaji: string;
  promptBn: string;
  questionBn: string;
  options: {
    labelBn: string;
    romaji: string;
    isCorrect: boolean;
  }[];
  culturalNoteBn: string;
}

export const JAPANESE_LISTENING_DRILLS: JapaneseListeningDrill[] = [
  {
    id: 'drill-1',
    audioPromptJp: 'おはようございます',
    promptRomaji: 'Ohayou gozaimasu',
    promptBn: 'ওহায়ো গোজাইমাসু',
    questionBn: 'অডিও শুনে বলুন, ব্যক্তিটি কখন কী অভিবাদন জানাচ্ছেন?',
    options: [
      { labelBn: 'শুভ সকাল (Good Morning)', romaji: 'Ohayou gozaimasu', isCorrect: true },
      { labelBn: 'শুভ রাত্রি (Good Night)', romaji: 'Oyasuminasai', isCorrect: false },
      { labelBn: 'বিদায় (Goodbye)', romaji: 'Sayounara', isCorrect: false },
      { labelBn: 'ধন্যবাদ (Thank you)', romaji: 'Arigatou', isCorrect: false },
    ],
    culturalNoteBn: 'সকালে পরিবারের সাথে শুধুই "Ohayou" বলা যায়, তবে শিক্ষক বা অফিসে "Gozaimasu" যুক্ত করে নম্রতা প্রকাশ করা জরুরি।',
  },
  {
    id: 'drill-2',
    audioPromptJp: 'これはいくらですか？',
    promptRomaji: 'Kore wa ikura desu ka?',
    promptBn: 'কোরে ওয়া ইকুরা দেসু কা?',
    questionBn: 'অডিওটি শুনে বলুন, বক্তা কী জিজ্ঞেস করছেন?',
    options: [
      { labelBn: 'এটার নাম কী?', romaji: 'Kore wa nan desu ka?', isCorrect: false },
      { labelBn: 'এটার দাম কত? (How much is this?)', romaji: 'Kore wa ikura desu ka?', isCorrect: true },
      { labelBn: 'এটি কোথায়?', romaji: 'Kore wa doko desu ka?', isCorrect: false },
      { labelBn: 'এটি কে?', romaji: 'Kore wa dare desu ka?', isCorrect: false },
    ],
    culturalNoteBn: 'জাপানের যেকোনো দোকানে দাম জানতে "Kore wa ikura desu ka?" সবচেয়ে বহুল ব্যবহৃত বাক্য।',
  },
  {
    id: 'drill-3',
    audioPromptJp: 'すみません、えきはどこですか？',
    promptRomaji: 'Sumimasen, eki wa doko desu ka?',
    promptBn: 'সুমিমাসেন, একি ওয়া দোকো দেসু কা?',
    questionBn: 'রাস্তায় একজন পথচারী আপনাকে এটি বললেন। তিনি কী জানতে চান?',
    options: [
      { labelBn: 'রেস্তোরাঁ কোথায়?', romaji: 'Resutoran wa doko desu ka?', isCorrect: false },
      { labelBn: 'মাফ করবেন, স্টেশনটি কোথায়?', romaji: 'Sumimasen, eki wa doko desu ka?', isCorrect: true },
      { labelBn: 'সময় কত হয়েছে?', romaji: 'Nan-ji desu ka?', isCorrect: false },
      { labelBn: 'টয়লেট কোথায়?', romaji: 'Toire wa doko desu ka?', isCorrect: false },
    ],
    culturalNoteBn: '"Eki" মানে স্টেশন এবং "Doko" মানে কোথায়।',
  },
  {
    id: 'drill-4',
    audioPromptJp: 'みずをください',
    promptRomaji: 'Mizu o kudasai',
    promptBn: 'মিজু ও কুদাসাই',
    questionBn: 'অডিও শুনে বলুন, ব্যক্তিটি রেস্তোরাঁয় কী চাইলেন?',
    options: [
      { labelBn: 'চা চেয়েছেন', romaji: 'Ocha o kudasai', isCorrect: false },
      { labelBn: 'পানি চেয়েছেন (Please give water)', romaji: 'Mizu o kudasai', isCorrect: true },
      { labelBn: 'বিল চেয়েছেন', romaji: 'Okaikei o kudasai', isCorrect: false },
      { labelBn: 'মেন্যু চেয়েছেন', romaji: 'Menyuu o kudasai', isCorrect: false },
    ],
    culturalNoteBn: '"Mizu" (পানি) + "o kudasai" (দিন)। খুব সহজ বাক্য!',
  },
];

// ---------------- JAPANESE SHADOWING & SPEAKING PRACTICE (কথা বলা ও উচ্চারণ অনুশীলন) ----------------
export interface JapaneseShadowingSentence {
  id: string;
  japanese: string;
  romaji: string;
  bangla: string;
  meaningBn: string;
  category: string;
  slowAudioKey: string;
}

export const JAPANESE_SHADOWING_SENTENCES: JapaneseShadowingSentence[] = [
  {
    id: 'sh-1',
    japanese: 'はじめまして。よろしくおねがいします。',
    romaji: 'Hajimemashite. Yoroshiku onegaishimasu.',
    bangla: 'হাজিমেমাশিতে। ইয়োরোশিকু ওনেগাইশিমাসু।',
    meaningBn: 'প্রথম সাক্ষাতে আনন্দিত। দয়া করে আমাকে খেয়াল রাখবেন।',
    category: 'Self Intro',
    slowAudioKey: 'はじめまして。よろしくおねがいします。',
  },
  {
    id: 'sh-2',
    japanese: 'わたし は にほんご を べんきょう しています。',
    romaji: 'Watashi wa nihongo o benkyou shite imasu.',
    bangla: 'ওয়াতাসি ওয়া নিহঙ্গো ও বেনকিয়ো শিতে ইমাসু।',
    meaningBn: 'আমি জাপানি ভাষা পড়াশোনা করছি।',
    category: 'Study',
    slowAudioKey: 'わたしはにほんごをべんきょうしています。',
  },
  {
    id: 'sh-3',
    japanese: 'これ を ひとつ ください。',
    romaji: 'Kore o hitotsu kudasai.',
    bangla: 'কোরে ও হিতোৎসু কুদাসাই।',
    meaningBn: 'দয়া করে এটি একটি দিন।',
    category: 'Shopping',
    slowAudioKey: 'これをひとつください。',
  },
  {
    id: 'sh-4',
    japanese: 'にほん の たべもの は とても おいしい です。',
    romaji: 'Nihon no tabemono wa totemo oishii desu.',
    bangla: 'নিহন নো তাবেমোনো ওয়া তোতেমো ওইশিই দেসু।',
    meaningBn: 'জাপানের খাবার অনেক সুস্বাদু।',
    category: 'Dining',
    slowAudioKey: 'にほんのたべものはとてもおいしいです。',
  },
];

// ---------------- JLPT N5 ESSENTIAL KANJI DATA (মৌলিক কাঞ্জি স্টুডিও) ----------------
export const JAPANESE_KANJI_DATA: KanjiItem[] = [
  {
    id: 'kanji-1',
    kanji: '日',
    strokeCount: 4,
    grade: 'N5',
    onyomi: ['NICHI (ニチ)', 'JITSU (ジツ)'],
    kunyomi: ['hi (ひ)', '-bi (び)', '-ka (か)'],
    meaningBn: 'সূর্য, দিন, রবিবার, জাপান',
    meaningEn: 'Sun, Day, Sunday, Japan',
    radical: '日 (Sun)',
    radicalMeaningBn: 'সূর্য বা দিন নির্দেশক মূল',
    compounds: [
      { kanji: '日本', furigana: 'にほん', romaji: 'Nihon', meaningBn: 'জাপান (সূর্যোদয়ের দেশ)' },
      { kanji: '日曜日', furigana: 'にちようび', romaji: 'Nichiyoubi', meaningBn: 'রবিবার' },
      { kanji: '今日', furigana: 'きょう', romaji: 'Kyou', meaningBn: 'আজ (Today)' },
    ],
  },
  {
    id: 'kanji-2',
    kanji: '月',
    strokeCount: 4,
    grade: 'N5',
    onyomi: ['GETSU (ゲツ)', 'GATSU (ガツ)'],
    kunyomi: ['tsuki (つき)'],
    meaningBn: 'চাঁদ, মাস, সোমবার',
    meaningEn: 'Moon, Month, Monday',
    radical: '月 (Moon)',
    radicalMeaningBn: 'চাঁদ বা মাসের প্রতীক',
    compounds: [
      { kanji: '月曜日', furigana: 'げつようび', romaji: 'Getsuyoubi', meaningBn: 'সোমবার' },
      { kanji: '一月', furigana: 'いちがつ', romaji: 'Ichigatsu', meaningBn: 'জানুয়ারি মাস' },
      { kanji: '今月', furigana: 'こんげつ', romaji: 'Kongetsu', meaningBn: 'এই মাস (This month)' },
    ],
  },
  {
    id: 'kanji-3',
    kanji: '火',
    strokeCount: 4,
    grade: 'N5',
    onyomi: ['KA (カ)'],
    kunyomi: ['hi (ひ)', 'bi (び)'],
    meaningBn: 'আগুন, মঙ্গলবার',
    meaningEn: 'Fire, Tuesday',
    radical: '火 (Fire)',
    radicalMeaningBn: 'শিখা বা উত্তাপ',
    compounds: [
      { kanji: '火曜日', furigana: 'かようび', romaji: 'Kayoubi', meaningBn: 'মঙ্গলবার' },
      { kanji: '火山', furigana: 'かざん', romaji: 'Kazan', meaningBn: 'আগ্নেয়গিরি (Volcano)' },
    ],
  },
  {
    id: 'kanji-4',
    kanji: '水',
    strokeCount: 4,
    grade: 'N5',
    onyomi: ['SUI (スイ)'],
    kunyomi: ['mizu (みず)'],
    meaningBn: 'পানি, বুধবার',
    meaningEn: 'Water, Wednesday',
    radical: '水 (Water)',
    radicalMeaningBn: 'জল বা তরল',
    compounds: [
      { kanji: '水曜日', furigana: 'すいようび', romaji: 'Suiyoubi', meaningBn: 'বুধবার' },
      { kanji: 'お水', furigana: 'おみず', romaji: 'Omizu', meaningBn: 'পানি (Water - বিনম্র রূপ)' },
    ],
  },
  {
    id: 'kanji-5',
    kanji: '木',
    strokeCount: 4,
    grade: 'N5',
    onyomi: ['MOKU (モク)', 'BOKU (ボク)'],
    kunyomi: ['ki (き)', 'ko (こ)'],
    meaningBn: 'গাছ, কাঠ, বৃহস্পতিবার',
    meaningEn: 'Tree, Wood, Thursday',
    radical: '木 (Tree)',
    radicalMeaningBn: 'বৃক্ষ বা কাঠ',
    compounds: [
      { kanji: '木曜日', furigana: 'もくようび', romaji: 'Mokuyoubi', meaningBn: 'বৃহস্পতিবার' },
      { kanji: '大木', furigana: 'たいぼく', romaji: 'Taiboku', meaningBn: 'বিশাল বৃক্ষ' },
    ],
  },
  {
    id: 'kanji-6',
    kanji: '金',
    strokeCount: 8,
    grade: 'N5',
    onyomi: ['KIN (キン)', 'KON (コン)'],
    kunyomi: ['kane (かね)', 'kana-'],
    meaningBn: 'স্বর্ণ, টাকা/পয়সা, শুক্রবার',
    meaningEn: 'Gold, Money, Friday',
    radical: '金 (Metal/Gold)',
    radicalMeaningBn: 'ধাতু বা মূল্যবান সম্পদ',
    compounds: [
      { kanji: '金曜日', furigana: 'きんようび', romaji: 'Kinyoubi', meaningBn: 'শুক্রবার' },
      { kanji: 'お金', furigana: 'おかね', romaji: 'Okane', meaningBn: 'টাকা / অর্থ (Money)' },
    ],
  },
  {
    id: 'kanji-7',
    kanji: '土',
    strokeCount: 3,
    grade: 'N5',
    onyomi: ['DO (ド)', 'TO (ト)'],
    kunyomi: ['tsuchi (つち)'],
    meaningBn: 'মাটি, পৃথিবী, শনিবার',
    meaningEn: 'Soil, Earth, Saturday',
    radical: '土 (Earth)',
    radicalMeaningBn: 'মাটি বা ভূতল',
    compounds: [
      { kanji: '土曜日', furigana: 'どようび', romaji: 'Doyoubi', meaningBn: 'শনিবার' },
      { kanji: '土地', furigana: 'とち', romaji: 'Tochi', meaningBn: 'জমি / ভূসম্পত্তি' },
    ],
  },
  {
    id: 'kanji-8',
    kanji: '人',
    strokeCount: 2,
    grade: 'N5',
    onyomi: ['JIN (ジン)', 'NIN (ニン)'],
    kunyomi: ['hito (ひと)'],
    meaningBn: 'মানুষ, ব্যক্তি, নাগরিকত্ব',
    meaningEn: 'Person, Human',
    radical: '人 (Person)',
    radicalMeaningBn: 'মানুষের প্রতীক',
    compounds: [
      { kanji: '日本人', furigana: 'にほんじん', romaji: 'Nihonjin', meaningBn: 'জাপানি নাগরিক' },
      { kanji: '三人', furigana: 'さんにん', romaji: 'Sannin', meaningBn: 'তিনজন ব্যক্তি' },
      { kanji: 'あの人', furigana: 'あのひと', romaji: 'Ano hito', meaningBn: 'ঐ ব্যক্তি' },
    ],
  },
  {
    id: 'kanji-9',
    kanji: '山',
    strokeCount: 3,
    grade: 'N5',
    onyomi: ['SAN (サン)', 'ZAN (ザン)'],
    kunyomi: ['yama (やま)'],
    meaningBn: 'পাহাড়, পর্বত',
    meaningEn: 'Mountain',
    radical: '山 (Mountain)',
    radicalMeaningBn: 'তিন চূড়াবিশিষ্ট পাহাড়ের চিত্র',
    compounds: [
      { kanji: '富士山', furigana: 'ふじさん', romaji: 'Fujisan', meaningBn: 'মাউন্ট ফুজি (জাপানের পবিত্র পর্বত)' },
      { kanji: '山道', furigana: 'やまみち', romaji: 'Yamamichi', meaningBn: 'পাহাড়ি পথ' },
    ],
  },
  {
    id: 'kanji-10',
    kanji: '川',
    strokeCount: 3,
    grade: 'N5',
    onyomi: ['SEN (セン)'],
    kunyomi: ['kawa (かわ)', '-gawa'],
    meaningBn: 'নদী, প্রবাহ',
    meaningEn: 'River',
    radical: '川 (River)',
    radicalMeaningBn: 'বয়ে যাওয়া নদীর তিন জলধারা',
    compounds: [
      { kanji: '小川', furigana: 'おがわ', romaji: 'Ogawa', meaningBn: 'ছোট নদী / জলধারা' },
      { kanji: 'ナイル川', furigana: 'ナイルがわ', romaji: 'Nairu-gawa', meaningBn: 'নীলনদ' },
    ],
  },
  {
    id: 'kanji-11',
    kanji: '学',
    strokeCount: 8,
    grade: 'N5',
    onyomi: ['GAKU (ガク)'],
    kunyomi: ['mana-bu (まな・ぶ)'],
    meaningBn: 'শেখা, অধ্যয়ন, বিজ্ঞান/বিদ্যা',
    meaningEn: 'Study, Learning, School',
    radical: '子 (Child under roof)',
    radicalMeaningBn: 'ছাদের নিচে শিশু শিখছে',
    compounds: [
      { kanji: '学生', furigana: 'がくせい', romaji: 'Gakusei', meaningBn: 'ছাত্র / শিক্ষার্থী (Student)' },
      { kanji: '大学', furigana: 'だいがく', romaji: 'Daigaku', meaningBn: 'বিশ্ববিদ্যালয় (University)' },
      { kanji: '学校', furigana: 'がっこう', romaji: 'Gakkou', meaningBn: 'বিদ্যালয় (School)' },
    ],
  },
  {
    id: 'kanji-12',
    kanji: '生',
    strokeCount: 5,
    grade: 'N5',
    onyomi: ['SEI (セイ)', 'SHOU (ショウ)'],
    kunyomi: ['i-kiru (い・きる)', 'u-mareru (う・まれる)', 'nama (なま)'],
    meaningBn: 'জীবন, জন্ম, কাঁচা/তাজা',
    meaningEn: 'Life, Birth, Genuine',
    radical: '生 (Birth/Life)',
    radicalMeaningBn: 'মাটি ফুঁড়ে ওঠা কচি চারাগাছ',
    compounds: [
      { kanji: '先生', furigana: 'せんせい', romaji: 'Sensei', meaningBn: 'শিক্ষক / গুরু' },
      { kanji: '生活', furigana: 'せいかつ', romaji: 'Seikatsu', meaningBn: 'দৈনন্দিন জীবনযাপন' },
    ],
  },
];

// ---------------- ANIME & MODERN CONVERSATIONAL EXPRESSIONS (অ্যানিমে ও পপ কালচার এক্সপ্রেশন) ----------------
export const JAPANESE_ANIME_EXPRESSIONS: JapaneseAnimeExpression[] = [
  {
    id: 'anime-1',
    japanese: 'すごい！ (Sugoi!)',
    romaji: 'Sugoi!',
    bangla: 'সুগোই!',
    meaningBn: 'অসাধারণ! চমকপ্রদ! দুর্দান্ত!',
    animeContextBn: 'অ্যানিমেতে যেকোনো বীরত্বপূর্ণ কাজ বা বিস্ময়কর সাফল্য দেখলে চরিত্ররা উচ্চস্বরে বলে ওঠে।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'すごい！',
  },
  {
    id: 'anime-2',
    japanese: 'やった！ (Yatta!)',
    romaji: 'Yatta!',
    bangla: 'ইয়াত্তা!',
    meaningBn: 'পেরেছি! জিতে গেছি! হুররে!',
    animeContextBn: 'কোনো লক্ষ্য অর্জন বা বিজয় উদযাপনের চরম মুহূর্তের আনন্দধ্বনি।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'やった！',
  },
  {
    id: 'anime-3',
    japanese: 'だいじょうぶ？ (Daijoubu?)',
    romaji: 'Daijoubu?',
    bangla: 'দাইজৌবু?',
    meaningBn: 'সব ঠিক আছে তো? কোনো সমস্যা নেই তো?',
    animeContextBn: 'কেউ পড়ে গেলে বা বিপদে পড়লে সহানুভূতিশীল বন্ধু হিসেবে খোঁজ নেওয়া। উত্তর: "だいじょうぶ です (Daijoubu desu - আমি ঠিক আছি)"।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'だいじょうぶ？',
  },
  {
    id: 'anime-4',
    japanese: 'なるほど！ (Naruhodo!)',
    romaji: 'Naruhodo!',
    bangla: 'নারুহোদো!',
    meaningBn: 'আচ্ছা! এবার বুঝতে পেরেছি! তাই তো বলি!',
    animeContextBn: 'কারও জটিল ব্যাখ্যা বা যুক্তি শোনার পর যখন হঠাৎ সবকিছু পরিষ্কার হয়ে যায়।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'なるほど！',
  },
  {
    id: 'anime-5',
    japanese: 'まさか… (Masaka...)',
    romaji: 'Masaka...',
    bangla: 'মাসাকা...',
    meaningBn: 'অসম্ভব... এমনটা হতে পারে না!',
    animeContextBn: 'যখন কোনো অবিশ্বাস্য বা অকল্পনীয় ঘটনা আকস্মিক ঘটে যায়।',
    formality: 'Passionate (আবেগপ্রবণ)',
    audioText: 'まさか…',
  },
  {
    id: 'anime-6',
    japanese: 'がんばって！ (Ganbatte!)',
    romaji: 'Ganbatte!',
    bangla: 'গানবাত্তে!',
    meaningBn: 'সর্বশক্তি দিয়ে চেষ্টা করো! শুভকামনা!',
    animeContextBn: 'পরীক্ষা, খেলাধুলা বা যেকোনো লড়াইয়ের আগে বন্ধু বা সতীর্থকে সাহস যোগাতে বলা হয়।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'がんばって！',
  },
  {
    id: 'anime-7',
    japanese: 'おつかれさま！ (Otsukaresama!)',
    romaji: 'Otsukaresama!',
    bangla: 'ওৎসুকারে সামা!',
    meaningBn: 'অনেক পরিশ্রম করলেন, ধন্যবাদ ও বিশ্রাম নিন!',
    animeContextBn: 'দিনশেষে কাজ বা পড়াশোনা শেষ করে বাড়ি ফেরার সময় একে অপরকে সম্মান প্রদর্শনের শ্রেষ্ঠ উক্তি।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'おつかれさま！',
  },
  {
    id: 'anime-8',
    japanese: 'かわいい！ (Kawaii!)',
    romaji: 'Kawaii!',
    bangla: 'কাওয়াই!',
    meaningBn: 'খুব মিষ্টি! কি সুন্দর কিউট!',
    animeContextBn: 'জাপানি পপ সংস্কৃতির অন্যতম বিশ্ববিখ্যাত শব্দ — বিড়ালছানা, পুতুল বা সুন্দর পোশাকের প্রশংসায়।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'かわいい！',
  },
  {
    id: 'anime-9',
    japanese: 'さすが！ (Sasuga!)',
    romaji: 'Sasuga!',
    bangla: 'সাসুগা!',
    meaningBn: 'তোমার পক্ষেই কেবল এটা সম্ভব! যেমনটা আশা করেছিলাম!',
    animeContextBn: 'কোনো প্রতিভাবান বন্ধু বা সিনিয়রের দক্ষ কাজের যোগ্য প্রশংসায়।',
    formality: 'Casual (বন্ধুত্বপূর্ণ)',
    audioText: 'さすが！',
  },
  {
    id: 'anime-10',
    japanese: 'まじで？ (Maji de?)',
    romaji: 'Maji de?',
    bangla: 'মাজি দে?',
    meaningBn: 'সত্যি বলছো? সিরিয়াসলি?',
    animeContextBn: 'টিনএজ ও তরুণদের দৈনন্দিন আড্ডায় অবিশ্বাস্য খবর শুনে অবাক হওয়া।',
    formality: 'Slang (অনানুষ্ঠানিক)',
    audioText: 'まじで？',
  },
];

// ---------------- JLPT N5 SPEED DRILL & PARTICLE QUIZZES (জেএলপিটি এন৫ পার্টিকেল ও স্পিড কুইজ) ----------------
export const JAPANESE_JLPT_QUIZ_DATA: JapaneseSpeedQuizQuestion[] = [
  {
    id: 'jq-1',
    questionJp: 'わたし [ ? ] がくせい です。',
    missingPart: 'は (wa)',
    romaji: 'Watashi [ ? ] gakusei desu.',
    banglaMeaning: 'আমি একজন ছাত্র।',
    options: ['は (wa)', 'が (ga)', 'を (o)', 'に (ni)'],
    correctAnswer: 'は (wa)',
    explanationBn: 'বাক্যের বিষয় (Topic) নির্দেশ করতে "は" (উচ্চারণ wa) ব্যবহৃত হয়।',
  },
  {
    id: 'jq-2',
    questionJp: 'みず [ ? ] のみます。',
    missingPart: 'を (o)',
    romaji: 'Mizu [ ? ] nomimasu.',
    banglaMeaning: 'আমি পানি পান করি।',
    options: ['を (o)', 'は (wa)', 'で (de)', 'へ (e)'],
    correctAnswer: 'を (o)',
    explanationBn: 'সরাসরি কর্ম (Direct Object) চিহ্নিত করতে "を" (উচ্চারণ o) বসে।',
  },
  {
    id: 'jq-3',
    questionJp: 'とうきょう [ ? ] いきます。',
    missingPart: 'へ (e)',
    romaji: 'Toukyou [ ? ] ikimasu.',
    banglaMeaning: 'আমি টোকিও যাচ্ছি।',
    options: ['へ (e)', 'を (o)', 'が (ga)', 'と (to)'],
    correctAnswer: 'へ (e)',
    explanationBn: 'গন্তব্য বা অভিমুখ (Direction) নির্দেশ করতে "へ" (উচ্চারণ e) বা "に" ব্যবহৃত হয়।',
  },
  {
    id: 'jq-4',
    questionJp: 'はし [ ? ] たべます。',
    missingPart: 'で (de)',
    romaji: 'Hashi [ ? ] tabemasu.',
    banglaMeaning: 'চপস্টিক দিয়ে খাবার খাচ্ছি।',
    options: ['で (de)', 'を (o)', 'に (ni)', 'は (wa)'],
    correctAnswer: 'で (de)',
    explanationBn: 'কোনো মাধ্যম বা উপকরণ (by means of) বোঝাতে "で" (de) পার্টিকেল বসে।',
  },
  {
    id: 'jq-5',
    questionJp: 'ぎんこう は どこ [ ? ] ですか。',
    missingPart: 'に (ni)',
    romaji: 'Ginkou wa doko [ ? ] desu ka.',
    banglaMeaning: 'ব্যাংকটি কোথায় অবস্থিত?',
    options: ['に (ni)', 'で (de)', 'を (o)', 'と (to)'],
    correctAnswer: 'に (ni)',
    explanationBn: 'স্থান বা অবস্থান (Location of existence) চিহ্নিত করতে "に" (ni) ব্যবহৃত হয়।',
  },
];
