import { SmartBookPage } from '../../types';

export const PAGES_1_TO_20: SmartBookPage[] = [
  {
    pageNumber: 1,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Riddle of the Pyramids",
    titleBn: "প্রাচীন পিরামিডের রহস্যময় অধ্যায়",
    theme: "ইতিহাস ও রহস্য",
    storyBengali: `মরুভূমির দিগন্ত জুড়ে মাথা উঁচু করে দাঁড়িয়ে আছে এক **Imposing** (মহিমান্বিত ও বিশাল) পিরামিড। হাজার বছর ধরে টিকে থাকা এর প্রতিটি পাথরের গাঁথুনি ছিল এককথায় **Impeccable** (নিখুঁত ও ত্রুটিহীন)। ভেতরে প্রবেশের সময় অভিযাত্রীরা এক **Hulking** (দানবাকৃতির ও সুবৃহৎ) পাথরের দরজার মুখোমুখি হন। প্রাচীন সেই করিডোরের দেওয়ালে আঁকা ছিল শত শত **Enigmatic** (রহস্যময় ও দুর্বোধ্য) সংকেত। দলের প্রবীণ গবেষক প্রাচীন মন্ত্রটি শান্ত গলায় **Enunciate** (সুস্পষ্টভাবে উচ্চারণ) করলেন। প্রতিটি পাথুরে খণ্ডে খোদাই করা ছিল অদ্ভুত সব **Hieroglyphics** (মিশরীয় চিত্রলিপি)। এই **Monolithic** (বিশাল একক পাথরের তৈরি) স্তম্ভগুলোর মুখোমুখি দাঁড়িয়ে প্রত্যেকে এক **Sublime** (পরম ও মহিমান্বিত) বিস্ময়ে অভিভূত হয়ে পড়ল।`,
    vocabulary: [
      {
        id: "p1-w1",
        word: "Imposing",
        ipa: "/ɪmˈpoʊ.zɪŋ/",
        banglaPronunciation: "ইম্পোজিং",
        partOfSpeech: "Adjective",
        banglaMeaning: "বিশাল ও গম্ভীর, সমীহ জাগায় এমন",
        synonyms: ["Majestic", "Grand", "Impressive", "Stately"],
        antonyms: ["Modest", "Unimpressive", "Humble"],
        exampleSentence: "The ancient monument is an imposing structure on the desert horizon.",
        exampleSentenceBn: "মরুভূমির দিগন্তে প্রাচীন স্মৃতিস্তম্ভটি একটি বিশাল ও গম্ভীর স্থাপনা।"
      },
      {
        id: "p1-w2",
        word: "Impeccable",
        ipa: "/ɪmˈpek.ə.bəl/",
        banglaPronunciation: "ইমপেকাবল",
        partOfSpeech: "Adjective",
        banglaMeaning: "নিখুঁত, ত্রুটিহীন, অনবদ্য",
        synonyms: ["Flawless", "Faultless", "Pristine", "Exemplary"],
        antonyms: ["Flawed", "Defective", "Imperfect"],
        exampleSentence: "Her English pronunciation and vocabulary are impeccable.",
        exampleSentenceBn: "তার ইংরেজি উচ্চারণ ও শব্দভাণ্ডার একেবারেই নিখুঁত।"
      },
      {
        id: "p1-w3",
        word: "Hulking",
        ipa: "/ˈhʌl.kɪŋ/",
        banglaPronunciation: "হালকিং",
        partOfSpeech: "Adjective",
        banglaMeaning: "দানবাকৃতির, সুবৃহৎ ও ভারী",
        synonyms: ["Colossal", "Gigantic", "Massive", "Mammoth"],
        antonyms: ["Tiny", "Delicate", "Miniature"],
        exampleSentence: "A hulking stone boulder blocked the secret passage.",
        exampleSentenceBn: "একটি দানবাকৃতির পাথরের খণ্ড গোপন পথটি বন্ধ করে রেখেছিল।"
      },
      {
        id: "p1-w4",
        word: "Enigmatic",
        ipa: "/ˌen.ɪɡˈmæt̬.ɪk/",
        banglaPronunciation: "এনিগম্যাটিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "রহস্যময়, বিভ্রান্তিকর, সহজে বোঝা যায় না এমন",
        synonyms: ["Mysterious", "Inscrutable", "Cryptic", "Perplexing"],
        antonyms: ["Clear", "Obvious", "Transparent"],
        exampleSentence: "She gave an enigmatic smile and declined to explain the riddle.",
        exampleSentenceBn: "সে একটি রহস্যময় হাসি দিয়ে ধাঁধার ব্যাখ্যা দিতে অস্বীকৃতি জানাল।"
      },
      {
        id: "p1-w5",
        word: "Enunciate",
        ipa: "/ɪˈnʌn.si.eɪt/",
        banglaPronunciation: "এনানসিয়েট",
        partOfSpeech: "Verb",
        banglaMeaning: "স্পষ্টভাবে প্রতিটি ধ্বনি উচ্চারণ করা",
        synonyms: ["Articulate", "Pronounce", "State clearly"],
        antonyms: ["Mumble", "Slur", "Mutter"],
        exampleSentence: "Please enunciate each syllable so the audience understands you.",
        exampleSentenceBn: "অনুগ্রহ করে প্রতিটি সিলেবল স্পষ্ট উচ্চারণ করুন যাতে শ্রোতারা বুঝতে পারেন।"
      },
      {
        id: "p1-w6",
        word: "Hieroglyphics",
        ipa: "/ˌhaɪə.rəˈɡlɪf.ɪks/",
        banglaPronunciation: "হায়ারোগ্লিফিক্স",
        partOfSpeech: "Noun",
        banglaMeaning: "প্রাচীন মিশরীয় চিত্রলিপি",
        synonyms: ["Pictographs", "Ancient script", "Symbols"],
        antonyms: ["Plain text", "Alphabet"],
        exampleSentence: "The tomb walls were completely covered in sacred hieroglyphics.",
        exampleSentenceBn: "সমাধির দেওয়ালগুলো পবিত্র মিশরীয় চিত্রলিপিতে সম্পূর্ণরূপে ঢাকা ছিল।"
      },
      {
        id: "p1-w7",
        word: "Monolithic",
        ipa: "/ˌmɑː.nəˈlɪθ.ɪk/",
        banglaPronunciation: "মনোলিথিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "একক বিশাল পাথরের তৈরি, অতিকায়",
        synonyms: ["Colossal", "Monumental", "Massive stone"],
        antonyms: ["Fragmented", "Segmented", "Small"],
        exampleSentence: "The monolithic pillars have endured weather and earthquakes for millenia.",
        exampleSentenceBn: "একক পাথরের তৈরি স্তম্ভগুলো সহস্রাব্দ ধরে ঝড় ও ভূমিকম্প সহ্য করেছে।"
      },
      {
        id: "p1-w8",
        word: "Sublime",
        ipa: "/səˈblaɪm/",
        banglaPronunciation: "সাবলাইম",
        partOfSpeech: "Adjective",
        banglaMeaning: "পরম ও মহিমান্বিত, আত্মিক শ্রদ্ধা জাগায় এমন",
        synonyms: ["Exalted", "Transcendent", "Awe-inspiring", "Glorious"],
        antonyms: ["Ordinary", "Mundane", "Inferior"],
        exampleSentence: "Standing beneath the towering pyramids stirred a sublime wonder.",
        exampleSentenceBn: "উঁচু পিরামিডের নিচে দাঁড়িয়ে এক পরম মহিমান্বিত বিস্ময় অনুভূত হয়েছিল।"
      }
    ],
    quiz: {
      question: "Which word best describes someone who speaks clearly without mumbling?",
      questionBn: "কোন শব্দটি এমন ব্যক্তিকে বোঝায় যিনি অস্পষ্টতা ছাড়া স্পষ্ট উচ্চারণ করেন?",
      options: ["Hulking", "Enunciate", "Hieroglyphics", "Monolithic"],
      correctIndex: 1,
      explanationBn: "'Enunciate' মানে কোনো শব্দ স্পষ্টভাবে ও পরিষ্কারভাবে উচ্চারণ করা।"
    },
    practicalTipBn: "কোনো বড় বা গুরুগম্ভীর বিষয় বর্ণনা করতে 'Imposing' এবং 'Sublime' শব্দ দুটি ব্যবহার করলে আপনার স্পোকেন ইংরেজি অত্যন্ত চমৎকার শোনায়।"
  },
  {
    pageNumber: 2,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Sunken Relics of Atlantis",
    titleBn: "আটলান্টিসের নিমজ্জিত নগরী",
    theme: "ইতিহাস ও রহস্য",
    storyBengali: `সমুদ্রের গভীর নীল জলে শত শত বছর ধরে **Submerged** (নিমজ্জিত) ছিল এক বিস্ময়কর নগরী। বহু পূর্বে এক আকস্মিক **Cataclysm** (প্রলয়ঙ্করী বিপর্যয়) এই সমৃদ্ধ ভূখণ্ডকে ভাসিয়ে নিয়ে যায়। ডুবুরিরা সম্প্রতি সমুদ্রের তলে এক অক্ষত প্রাচীন **Artifact** (ঐতিহাসিক নিদর্শন) আবিষ্কার করেছেন। আলো ফেলার সাথে সাথে সোনার স্তম্ভগুলো **Resplendent** (উজ্জ্বল ও ঝলমলে) আভায় জ্বলজ্বল করে উঠল। শত শতাব্দীর নোনা পানির নিচেও দেওয়ালের নকশাগুলো ছিল সম্পূর্ণ **Pristine** (অনাহত ও অক্ষত)। গবেষকরা দেওয়ালে খোদাই করা গোপন বার্তা **Decipher** (পাঠোদ্ধার) করার চেষ্টা করছেন, যা তাদের এক রহস্যময় জলতলের **Labyrinth** (গোলকধাঁধা)-এর দিকে নিয়ে যায়।`,
    vocabulary: [
      {
        id: "p2-w1",
        word: "Submerged",
        ipa: "/səbˈmɜːrdʒd/",
        banglaPronunciation: "সাবমার্জড",
        partOfSpeech: "Adjective",
        banglaMeaning: "জলে নিমজ্জিত বা ডুবন্ত",
        synonyms: ["Underwater", "Inundated", "Sunken"],
        antonyms: ["Surfaced", "Emergent", "Dry"],
        exampleSentence: "The ancient temple was submerged beneath the reservoir.",
        exampleSentenceBn: "প্রাচীন মন্দিরটি জলাধারের নিচে নিমজ্জিত ছিল।"
      },
      {
        id: "p2-w2",
        word: "Cataclysm",
        ipa: "/ˈkæt̬.ə.klɪz.əm/",
        banglaPronunciation: "ক্যাটাক্লিজম",
        partOfSpeech: "Noun",
        banglaMeaning: "প্রলয়ঙ্করী বিপর্যয়, প্রাকৃতিক মহাধ্বংস",
        synonyms: ["Disaster", "Catastrophe", "Upheaval", "Devastation"],
        antonyms: ["Blessing", "Peace", "Stability"],
        exampleSentence: "The volcanic cataclysm wiped out the island civilization in hours.",
        exampleSentenceBn: "আগ্নেয়গিরির মহাবিপর্যয় কয়েক ঘণ্টার মধ্যে দ্বীপের সভ্যতাকে নিশ্চিহ্ন করে দেয়।"
      },
      {
        id: "p2-w3",
        word: "Artifact",
        ipa: "/ˈɑːr.t̬ə.fækt/",
        banglaPronunciation: "আর্টিফ্যাক্ট",
        partOfSpeech: "Noun",
        banglaMeaning: "ঐতিহাসিক নিদর্শন বা হস্তনির্মিত বস্তু",
        synonyms: ["Relic", "Antiquity", "Craft", "Heirloom"],
        antonyms: ["Natural object"],
        exampleSentence: "The museum houses a rare bronze artifact from the Indus Valley.",
        exampleSentenceBn: "জাদুঘরটিতে সিন্ধু সভ্যতার একটি বিরল ব্রোঞ্জের নিদর্শন সংরক্ষিত আছে।"
      },
      {
        id: "p2-w4",
        word: "Resplendent",
        ipa: "/rɪˈsplen.dənt/",
        banglaPronunciation: "রেসপ্লেনডেন্ট",
        partOfSpeech: "Adjective",
        banglaMeaning: "উজ্জ্বল ও ঝলমলে, নয়নাভিরাম",
        synonyms: ["Dazzling", "Brilliant", "Radiant", "Splendid"],
        antonyms: ["Dull", "Dim", "Lackluster"],
        exampleSentence: "The queen entered wearing a resplendent emerald gown.",
        exampleSentenceBn: "রানি একটি নয়নাভিরাম পান্নাখচিত গাউন পরে প্রবেশ করলেন।"
      },
      {
        id: "p2-w5",
        word: "Pristine",
        ipa: "/ˈprɪs.tiːn/",
        banglaPronunciation: "প্রিস্টিন",
        partOfSpeech: "Adjective",
        banglaMeaning: "সম্পূর্ণ অক্ষত, আদিম ও সতেজ",
        synonyms: ["Untouched", "Immaculate", "Unblemished", "Pure"],
        antonyms: ["Corrupted", "Damaged", "Spoiled"],
        exampleSentence: "The mountain spring water is crystal clear and pristine.",
        exampleSentenceBn: "পাহাড়ি ঝরনার পানি স্ফটিকের মতো পরিষ্কার এবং অনাহত।"
      },
      {
        id: "p2-w6",
        word: "Decipher",
        ipa: "/dɪˈsaɪ.fɚ/",
        banglaPronunciation: "ডিসাইফার",
        partOfSpeech: "Verb",
        banglaMeaning: "পাঠোদ্ধার করা, জটিল সংকেতের অর্থ বের করা",
        synonyms: ["Decode", "Interpret", "Solve", "Unravel"],
        antonyms: ["Encode", "Encrypt", "Confuse"],
        exampleSentence: "Historians took centuries to decipher the Rosetta Stone.",
        exampleSentenceBn: "ঐতিহাসিকদের রোসেটা পাথরের পাঠোদ্ধার করতে কয়েক শতাব্দী লেগেছিল।"
      },
      {
        id: "p2-w7",
        word: "Labyrinth",
        ipa: "/ˈlæb.ə.rɪnθ/",
        banglaPronunciation: "ল্যাবাইরিংথ",
        partOfSpeech: "Noun",
        banglaMeaning: "জটিল গোলকধাঁধা, জটিল পথসমূহ",
        synonyms: ["Maze", "Tangle", "Complex network", "Web"],
        antonyms: ["Straight path", "Simple route"],
        exampleSentence: "Lost in the labyrinth of narrow streets, the traveler looked for a map.",
        exampleSentenceBn: "সংকীর্ণ গলির গোলকধাঁধায় হারিয়ে গিয়ে পর্যটক মানচিত্র খুঁজছিলেন।"
      }
    ],
    quiz: {
      question: "What does 'Pristine' mean when describing an untouched forest or relic?",
      questionBn: "'Pristine' শব্দটি কোনো অনাহত বন বা প্রত্নবস্তু বোঝাতে কী অর্থ প্রকাশ করে?",
      options: ["Polluted and dirty", "Pure, untouched and in perfect condition", "Submerged underwater", "Ancient broken pieces"],
      correctIndex: 1,
      explanationBn: "'Pristine' মানে সম্পূর্ণ অবিকৃত, অক্ষত ও নিখুঁত আদিম অবস্থায় থাকা।"
    },
    practicalTipBn: "'Pristine condition' ফ্রেজটি কেনাবেচা ও কথোপকথনে প্রায়ই কোনো জিনিসের চমৎকার অবস্থা বোঝাতে বলা হয়।"
  },
  {
    pageNumber: 3,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "Expedition into the Amazon Rainforest",
    titleBn: "আমাজনের গহীন অরণ্য অভিযান",
    theme: "প্রকৃতি ও রোমাঞ্চ",
    storyBengali: `আমাজন নদীর অববাহিকায় শুরু হয় এক অত্যন্ত **Treacherous** (বিপজ্জনক ও বিশ্বাসঘাতী) অভিযান। বনের উপরভাগে বিশাল বৃক্ষের ঘন **Canopy** (বৃক্ষছত্র বা পাতার আচ্ছাদন) সূর্যের আলোকে নিচে পৌঁছাতে দেয় না। স্যাঁতসেঁতে মাটিতে পদে পদে লুকিয়ে আছে অত্যন্ত **Venomous** (বিষাক্ত) সাপ আর অদ্ভুত কীটপতঙ্গ। অভিযাত্রীরা যে অঞ্চলে প্রবেশ করলেন তা মানচিত্রে এখনও **Uncharted** (অনাবিস্কৃত ও মানচিত্রহীন)। তবে প্রতিকূল পরিবেশেও স্থানীয় আদিবাসীরা বিস্ময়করভাবে **Resilient** (সহনশীল ও অদম্য)। এই গহীন অরণ্যের সমৃদ্ধ **Biodiversity** (জীববৈচিত্র্য) দেখে জীববিজ্ঞানীরা স্তম্ভিত হয়ে গেলেন।`,
    vocabulary: [
      {
        id: "p3-w1",
        word: "Treacherous",
        ipa: "/ˈtretʃ.ɚ.əs/",
        banglaPronunciation: "ট্রেচারাস",
        partOfSpeech: "Adjective",
        banglaMeaning: "বিপজ্জনক, অনির্ভরযোগ্য, প্রতারণাপূর্ণ",
        synonyms: ["Perilous", "Hazardous", "Deceptive", "Risky"],
        antonyms: ["Safe", "Reliable", "Dependable"],
        exampleSentence: "The muddy mountain pass was slippery and treacherous in the rain.",
        exampleSentenceBn: "বৃষ্টিতে কর্দমাক্ত পাহাড়ি পথটি অত্যন্ত পিচ্ছিল ও বিপজ্জনক ছিল।"
      },
      {
        id: "p3-w2",
        word: "Canopy",
        ipa: "/ˈkæn.ə.pi/",
        banglaPronunciation: "ক্যানোপি",
        partOfSpeech: "Noun",
        banglaMeaning: "গাছের শীর্ষ পাতার আচ্ছাদন, চাঁদোয়া",
        synonyms: ["Overhang", "Awning", "Foliage roof", "Cover"],
        antonyms: ["Ground", "Floor"],
        exampleSentence: "Monkeys leaped gracefully through the forest canopy high above.",
        exampleSentenceBn: "বানরগুলো উঁচুতে বনের পাতার ছাতার মধ্য দিয়ে সুন্দরভাবে লাফালাফি করছিল।"
      },
      {
        id: "p3-w3",
        word: "Venomous",
        ipa: "/ˈven.ə.məs/",
        banglaPronunciation: "ভেনোমাস",
        partOfSpeech: "Adjective",
        banglaMeaning: "বিষাক্ত, মারাত্মক বিষযুক্ত",
        synonyms: ["Poisonous", "Toxic", "Noxious", "Lethal"],
        antonyms: ["Non-toxic", "Harmless", "Safe"],
        exampleSentence: "A venomous pit viper was coiled quietly under the rotting trunk.",
        exampleSentenceBn: "পচা গুঁড়ির নিচে একটি বিষাক্ত পিট ভাইপার সাপ শান্তভাবে কুণ্ডলী পাকিয়ে ছিল।"
      },
      {
        id: "p3-w4",
        word: "Uncharted",
        ipa: "/ʌnˈtʃɑːr.t̬ɪd/",
        banglaPronunciation: "আনচার্টেড",
        partOfSpeech: "Adjective",
        banglaMeaning: "মানচিত্রবিহীন, অজ্ঞাত বা অনাবিস্কৃত",
        synonyms: ["Unmapped", "Unexplored", "Undiscovered", "Foreign"],
        antonyms: ["Charted", "Familiar", "Mapped"],
        exampleSentence: "The intrepid explorer set sail toward uncharted waters.",
        exampleSentenceBn: "অকুতোভয় অভিযাত্রী মানচিত্রহীন সাগরের উদ্দেশ্যে জাহাজ ভাসালেন।"
      },
      {
        id: "p3-w5",
        word: "Resilient",
        ipa: "/rɪˈzɪl.jənt/",
        banglaPronunciation: "রেজিলিয়েন্ট",
        partOfSpeech: "Adjective",
        banglaMeaning: "সহনশীল, বিপদে ভেঙে না পড়ে দ্রুত ঘুরে দাঁড়ায় এমন",
        synonyms: ["Tough", "Hardy", "Adaptable", "Unyielding"],
        antonyms: ["Fragile", "Weak", "Vulnerable"],
        exampleSentence: "Human spirits are remarkably resilient against overwhelming hardship.",
        exampleSentenceBn: "চরম প্রতিকূলতার মুখেও মানুষের মনোবল অসাধারণ সহনশীল।"
      },
      {
        id: "p3-w6",
        word: "Biodiversity",
        ipa: "/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/",
        banglaPronunciation: "বায়োডাইভার্সিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "জীববৈচিত্র্য, উদ্ভিদ ও প্রাণীর বিভিন্নতা",
        synonyms: ["Ecosystem variety", "Biological richness"],
        antonyms: ["Monoculture", "Homogeneity"],
        exampleSentence: "Protecting biodiversity in rainforests is essential for climate health.",
        exampleSentenceBn: "জলবায়ুর সুস্বাস্থ্যের জন্য রেইনফরেস্টের জীববৈচিত্র্য রক্ষা অপরিহার্য।"
      }
    ],
    quiz: {
      question: "Which word means 'able to quickly recover from difficulties or trauma'?",
      questionBn: "কোন শব্দটির অর্থ 'কষ্ট বা বাধা কাটিয়ে দ্রুত ঘুরে দাঁড়াতে সক্ষম'?",
      options: ["Treacherous", "Resilient", "Venomous", "Canopy"],
      correctIndex: 1,
      explanationBn: "'Resilient' অর্থ সহনশীল বা প্রতিকূলতা জয় করে ঘুরে দাঁড়ানোর ক্ষমতাসম্পন্ন।"
    },
    practicalTipBn: "ইন্টারভিউতে যখন নিজের কোনো ঘুরে দাঁড়ানোর গল্প বলবেন, তখন 'I am resilient' শব্দটি ব্যবহার করবেন।"
  },
  {
    pageNumber: 4,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Hermit of the Himalayas",
    titleBn: "হিমালয়ের নির্জন সাধক",
    theme: "দর্শন ও প্রকৃতি",
    storyBengali: `হিমালয়ের বরফাবৃত চূড়ায় এক সন্ন্যাসী বছরের পর বছর **Solitude** (নির্জন একাকিত্ব)-এ দিন কাটাচ্ছেন। তাঁর এই **Ascetic** (কঠোর সংযমী ও ভোগহীন) জীবনযাত্রা সাধারণ মানুষের কল্পনার বাইরে। হিমশীতল বাতাসের সেই **Perilous** (বিপদসংকুল) খাদগুলোর মাঝেও তাঁর চোখে মুখে খেলা করে গভীর এক **Serenity** (পরম প্রশান্তি)। বহুদিনের গভীর ধ্যানের পর তিনি লাভ করেছেন এক গভীর **Epiphany** (আত্মিক উপলব্ধি বা সত্যের উন্মেষ)। সমুদ্রপৃষ্ঠ থেকে বহু উঁচুর এই **Altitude** (উচ্চতা)-এ বসে তিনি জাগতিক মোহকে **Transcend** (অতিক্রম করা)-র আনন্দ উপভোগ করেন।`,
    vocabulary: [
      {
        id: "p4-w1",
        word: "Solitude",
        ipa: "/ˈsɑː.lə.tuːd/",
        banglaPronunciation: "সলিটিউড",
        partOfSpeech: "Noun",
        banglaMeaning: "নির্জনতা, শান্ত একাকিত্ব (যা কষ্টের নয়)",
        synonyms: ["Seclusion", "Privacy", "Isolation", "Peaceful stillness"],
        antonyms: ["Crowd", "Company", "Chaos"],
        exampleSentence: "Writers often seek peaceful solitude to finish their novels.",
        exampleSentenceBn: "লেখকরা প্রায়শই উপন্যাস শেষ করার জন্য শান্ত নির্জনতা খোঁজেন।"
      },
      {
        id: "p4-w2",
        word: "Ascetic",
        ipa: "/əˈset̬.ɪk/",
        banglaPronunciation: "অ্যাসেটিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "কঠোর সংযমী, ভোগবিলাস বর্জিত",
        synonyms: ["Austere", "Abstinent", "Self-denying", "Monastic"],
        antonyms: ["Hedonistic", "Luxurious", "Indulgent"],
        exampleSentence: "He chose an ascetic lifestyle, possessing only a single robe and a bowl.",
        exampleSentenceBn: "তিনি মাত্র একটি পোশাক ও বাটি সম্বল করে এক সন্ন্যাসসুলভ জীবন বেছে নিয়েছিলেন।"
      },
      {
        id: "p4-w3",
        word: "Perilous",
        ipa: "/ˈper.əl.əs/",
        banglaPronunciation: "পেরিলাস",
        partOfSpeech: "Adjective",
        banglaMeaning: "বিপদসংকুল, অত্যন্ত ঝুঁকিপূর্ণ",
        synonyms: ["Dangerous", "Hazardous", "Risky", "Precarious"],
        antonyms: ["Safe", "Secure", "Harmless"],
        exampleSentence: "Climbing Everest without supplemental oxygen is a perilous quest.",
        exampleSentenceBn: "অতিরিক্ত অক্সিজেন ছাড়া এভারেস্টে ওঠা অত্যন্ত বিপদসংকুল এক অভিযান।"
      },
      {
        id: "p4-w4",
        word: "Serenity",
        ipa: "/səˈren.ə.t̬i/",
        banglaPronunciation: "সেরেনিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "পরম প্রশান্তি, মানসিক স্থিরতা",
        synonyms: ["Tranquility", "Calmness", "Peace of mind", "Placidity"],
        antonyms: ["Agitation", "Turbulence", "Anxiety"],
        exampleSentence: "The golden sunrise over the lake filled his heart with serenity.",
        exampleSentenceBn: "হ্রদের উপর সোনালি সূর্যোদয় তার হৃদয়কে প্রশান্তিতে ভরিয়ে দিল।"
      },
      {
        id: "p4-w5",
        word: "Epiphany",
        ipa: "/ɪˈpɪf.ə.ni/",
        banglaPronunciation: "এপিফ্যানি",
        partOfSpeech: "Noun",
        banglaMeaning: "আকস্মিক বোধোদয়, সত্যের উজ্জ্বল উন্মেষ",
        synonyms: ["Realization", "Flash of insight", "Revelation", "Illumination"],
        antonyms: ["Confusion", "Blindness"],
        exampleSentence: "Sitting beneath the tree, he had an epiphany about the meaning of happiness.",
        exampleSentenceBn: "গাছের নিচে বসে তিনি সুখের অর্থ নিয়ে এক আকস্মিক আত্মিক উপলব্ধি পেলেন।"
      },
      {
        id: "p4-w6",
        word: "Transcend",
        ipa: "/trænˈsend/",
        banglaPronunciation: "ট্রান্সেন্ড",
        partOfSpeech: "Verb",
        banglaMeaning: "অতিক্রম করা, সীমানা ছাড়িয়ে উর্ধ্বে যাওয়া",
        synonyms: ["Surpass", "Exceed", "Outdo", "Rise above"],
        antonyms: ["Fall behind", "Succumb"],
        exampleSentence: "Great works of literature transcend language barriers and time.",
        exampleSentenceBn: "মহান সাহিত্যকর্ম ভাষার সীমানা ও সময়কে অতিক্রম করে যায়।"
      }
    ],
    quiz: {
      question: "What is an 'Epiphany'?",
      questionBn: "'Epiphany' শব্দের অর্থ কী?",
      options: ["A dangerous snowstorm", "A sudden, profound realization or insight", "A lonely mountain", "A golden sunrise"],
      correctIndex: 1,
      explanationBn: "'Epiphany' মানে হঠাত কোনো গভীর সত্য বা অন্তর্দৃষ্টি উপলব্ধি করা।"
    },
    practicalTipBn: "'Solitude' এবং 'Loneliness'-এর মধ্যে পার্থক্য: Loneliness হলো কষ্টদায়ক একাকিত্ব, আর Solitude হলো উপভোগ্য ও শান্ত নির্জনতা।"
  },
  {
    pageNumber: 5,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "Astronomy of the Maya",
    titleBn: "মায়া সভ্যতার জ্যোতির্বিজ্ঞান",
    theme: "বিজ্ঞান ও ইতিহাস",
    storyBengali: `প্রাচীন মায়া পুরোহিতরা রাতের আকাশে নক্ষত্রের গতিবিধি পর্যবেক্ষণ করে মুগ্ধ হতেন। তাঁদের কাছে আকাশের প্রতিটি **Celestial** (মহাজাগতিক বা আকাশীয়) বস্তু ছিল দৈব সংকেত। বসন্তের **Equinox** (বিষুব বা দিনরাত্রি সমান হওয়ার ক্ষণ)-এ পিরামিডের ছায়া এক সর্পিল রূপ ধারণ করত। তাঁদের পঞ্জিকায় থাকা প্রাচীন **Prophecy** (ভবিষ্যদ্বাণী) সমকালীন মানুষদের কৌতূহলী করে রেখেছিল। পাথরের স্তম্ভে খোদাই করা গাণিতিক হিসাব ছিল অত্যন্ত **Ingenious** (অসাধারণ বুদ্ধিদীপ্ত ও উদ্ভাবনী)। পাহাড়ের শীর্ষে নির্মিত বিশাল **Observatory** (মানমন্দির)-এর স্থাপত্য নক্ষত্রমণ্ডলীর সাথে সরাসরি **Align** (এক রেখায় বিন্যস্ত) করা হয়েছিল।`,
    vocabulary: [
      {
        id: "p5-w1",
        word: "Celestial",
        ipa: "/səˈles.tʃəl/",
        banglaPronunciation: "সেলেশ্চিয়াল",
        partOfSpeech: "Adjective",
        banglaMeaning: "মহাজাগতিক, স্বর্গীয় বা আকাশসম্বন্ধীয়",
        synonyms: ["Astronomical", "Cosmic", "Heavenly", "Planetary"],
        antonyms: ["Terrestrial", "Earthly"],
        exampleSentence: "Telescopes reveal magnificent celestial bodies scattered across galaxies.",
        exampleSentenceBn: "টেলিস্কোপ গ্যালাক্সি জুড়ে ছড়িয়ে থাকা মহিমান্বিত মহাজাগতিক বস্তুগুলোকে উন্মোচন করে।"
      },
      {
        id: "p5-w2",
        word: "Equinox",
        ipa: "/ˈiː.kwə.nɑːks/",
        banglaPronunciation: "ইকুইনক্স",
        partOfSpeech: "Noun",
        banglaMeaning: "বিষুব (বছরের যে দিনে দিন ও রাত্রি সমান হয়)",
        synonyms: ["Equal day and night", "Astronomical balance"],
        antonyms: ["Solstice"],
        exampleSentence: "During the vernal equinox, day and night are of roughly equal length.",
        exampleSentenceBn: "বাসন্তী বিষুবকালে দিন ও রাত প্রায় সমান দৈর্ঘ্যের হয়।"
      },
      {
        id: "p5-w3",
        word: "Prophecy",
        ipa: "/ˈprɑː.fə.si/",
        banglaPronunciation: "প্রফেসি",
        partOfSpeech: "Noun",
        banglaMeaning: "ভবিষ্যদ্বাণী",
        synonyms: ["Prediction", "Foretelling", "Divination", "Forecast"],
        antonyms: ["History", "Fact"],
        exampleSentence: "The oracle spoke a cryptic prophecy about the kingdom's future.",
        exampleSentenceBn: "দৈববাণীটি রাজ্যের ভবিষ্যৎ নিয়ে একটি রহস্যময় ভবিষ্যদ্বাণী করেছিল।"
      },
      {
        id: "p5-w4",
        word: "Ingenious",
        ipa: "/ɪnˈdʒiː.ni.əs/",
        banglaPronunciation: "ইনজিনিয়ার্স",
        partOfSpeech: "Adjective",
        banglaMeaning: "অসাধারণ বুদ্ধিদীপ্ত, অত্যন্ত উদ্ভাবনী ও চতুর",
        synonyms: ["Clever", "Inventive", "Resourceful", "Brilliant"],
        antonyms: ["Clumsy", "Unimaginative", "Foolish"],
        exampleSentence: "The engineer devised an ingenious system to harness rain energy.",
        exampleSentenceBn: "প্রকৌশলী বৃষ্টির শক্তি কাজে লাগানোর এক বুদ্ধিদীপ্ত ব্যবস্থা আবিষ্কার করেছিলেন।"
      },
      {
        id: "p5-w5",
        word: "Observatory",
        ipa: "/əbˈzɝː.və.tɔːr.i/",
        banglaPronunciation: "অবজারভেটরি",
        partOfSpeech: "Noun",
        banglaMeaning: "মানমন্দির, মহাকাশ পর্যবেক্ষণ কেন্দ্র",
        synonyms: ["Watchtower", "Astronomy station", "Lookout"],
        antonyms: ["Basement"],
        exampleSentence: "Astronomers gathered at the mountain observatory to view the eclipse.",
        exampleSentenceBn: "সূর্যগ্রহণ দেখতে জ্যোতির্বিজ্ঞানীরা পাহাড়ের মানমন্দিরে সমবেত হয়েছিলেন।"
      },
      {
        id: "p5-w6",
        word: "Align",
        ipa: "/əˈlaɪn/",
        banglaPronunciation: "অ্যালাইন",
        partOfSpeech: "Verb",
        banglaMeaning: "এক রেখায় বা সুশৃঙ্খলভাবে মেলানো",
        synonyms: ["Coordinate", "Synchronize", "Level", "Straighten"],
        antonyms: ["Misalign", "Scatter", "Disorder"],
        exampleSentence: "Make sure your actions align with your core values.",
        exampleSentenceBn: "নিশ্চিত করুন যেন আপনার কাজগুলো আপনার মূল আদর্শের সাথে সঙ্গতিপূর্ণ থাকে।"
      }
    ],
    quiz: {
      question: "Which adjective means 'clever, original, and inventive'?",
      questionBn: "কোন বিশেষণের অর্থ 'অসাধারণ বুদ্ধিদীপ্ত ও নতুন কিছু উদ্ভাবনে সক্ষম'?",
      options: ["Celestial", "Ingenious", "Equinox", "Observatory"],
      correctIndex: 1,
      explanationBn: "'Ingenious' মানে অত্যন্ত কৌশলী ও বুদ্ধিদীপ্ত উদ্ভাবন।"
    },
    practicalTipBn: "'Align with' একটি বহুল ব্যবহৃত বিজনেস ফ্রেজ, যেমন: 'Our goals align with your company's mission.'"
  },
  // Adding Pages 6-20 with full rich context
  {
    pageNumber: 6,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "Caravans on the Silk Road",
    titleBn: "সিল্ক রোডের কাফেলা",
    theme: "বাণিজ্য ও সংস্কৃতি",
    storyBengali: `মরুভূমির বালুঝড়ের ভেতর দিয়ে হেঁটে চলেছে উটের কাফেলা। দূরদূরান্তের **Merchant** (বণিক ও ব্যবসায়ী)-রা বহন করছেন মহামূল্যবান সিল্ক ও পাথর। চীনা মাটির পাত্রগুলো ছিল অত্যন্ত **Fragile** (ভঙ্গুর ও নাজুক), তাই সতর্কভাবে বাঁধা হয়েছিল। মুদ্রার বদলে তারা জিনিসপত্র **Barter** (বিনিময় প্রথা)-এর মাধ্যমে লেনদেন করতেন। কাফেলার সরাইখানায় মিলত সুস্বাদু বিদেশি **Spices** (মসলাপাতি) ও গরম চা। তৃষ্ণার্ত মরুযাত্রীদের জন্য দূর দিগন্তের সবুজ **Oasis** (মরূদ্যান) ছিল যেন স্বর্গীয় উপহার। সেখানে স্থানীয়রা তাদের নিখাদ **Hospitality** (আতিথেয়তা ও আপ্যায়ন) দিয়ে বরণ করে নিত।`,
    vocabulary: [
      {
        id: "p6-w1",
        word: "Merchant",
        ipa: "/ˈmɝː.tʃənt/",
        banglaPronunciation: "মার্চেন্ট",
        partOfSpeech: "Noun",
        banglaMeaning: "বণিক, পাইকারি ব্যবসায়ী",
        synonyms: ["Trader", "Dealer", "Vendor"],
        antonyms: ["Consumer", "Buyer"],
        exampleSentence: "The merchant traveled thousands of miles across deserts to sell silk.",
        exampleSentenceBn: "বণিক রেশম বিক্রির জন্য মরুভূমির মধ্য দিয়ে হাজার মাইল ভ্রমণ করেছিলেন।"
      },
      {
        id: "p6-w2",
        word: "Fragile",
        ipa: "/ˈfrædʒ.aɪl/",
        banglaPronunciation: "ফ্র্যাজাইল",
        partOfSpeech: "Adjective",
        banglaMeaning: "ভঙ্গুর, সহজে ভেঙে যায় এমন বা নাজুক",
        synonyms: ["Delicate", "Brittle", "Flimsy"],
        antonyms: ["Sturdy", "Durable", "Robust"],
        exampleSentence: "Handle the antique porcelain vase with care; it is extremely fragile.",
        exampleSentenceBn: "প্রাচীন চীনামাটির ফুলদানিটি সাবধানে নাড়াচাড়া করুন; এটি অত্যন্ত ভঙ্গুর।"
      },
      {
        id: "p6-w3",
        word: "Barter",
        ipa: "/ˈbɑːr.t̬ɚ/",
        banglaPronunciation: "বার্টার",
        partOfSpeech: "Verb",
        banglaMeaning: "টাকা ছাড়া পণ্যের বদলে পণ্য বিনিময় করা",
        synonyms: ["Exchange", "Swap", "Trade"],
        antonyms: ["Buy with currency"],
        exampleSentence: "In ancient markets, farmers would barter wheat for wool cloth.",
        exampleSentenceBn: "প্রাচীন বাজারে কৃষকরা উলের কাপড়ের জন্য গম বিনিময় করতেন।"
      },
      {
        id: "p6-w4",
        word: "Oasis",
        ipa: "/oʊˈeɪ.sɪs/",
        banglaPronunciation: "ওয়েসিস",
        partOfSpeech: "Noun",
        banglaMeaning: "মরূদ্যান, মরুভূমির মধ্যে সুপেয় পানি ও গাছের স্থান",
        synonyms: ["Sanctuary", "Watering hole", "Haven"],
        antonyms: ["Arid wasteland"],
        exampleSentence: "The weary nomads cheered when they spotted the lush palm trees of the oasis.",
        exampleSentenceBn: "ক্লান্ত যাযাবররা মরূদ্যানের সতেজ খেজুর গাছ দেখতে পেয়ে উল্লাস প্রকাশ করল।"
      },
      {
        id: "p6-w5",
        word: "Hospitality",
        ipa: "/ˌhɑː.spɪˈtæl.ə.t̬i/",
        banglaPronunciation: "হসপিটালিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "আতিথেয়তা, অতিথিপরায়ণতা",
        synonyms: ["Welcoming spirit", "Warmth", "Friendliness"],
        antonyms: ["Hostility", "Coldness"],
        exampleSentence: "Bengali families are internationally admired for their warm hospitality.",
        exampleSentenceBn: "বাঙালি পরিবারগুলো তাদের উষ্ণ আতিথেয়তার জন্য বিশ্বজুড়ে প্রশংসিত।"
      }
    ],
    quiz: {
      question: "What does 'Barter' mean in trade?",
      questionBn: "বাণিজ্যে 'Barter' শব্দের অর্থ কী?",
      options: ["To buy with gold coins", "To exchange goods without money", "To pay online", "To borrow money"],
      correctIndex: 1,
      explanationBn: "'Barter' মানে টাকা-পয়সা ছাড়া পণ্যের বিনিময়ে পণ্য নেওয়া বা দেওয়া।"
    },
    practicalTipBn: "ভ্রমণে গেলে 'Thank you for your wonderful hospitality' বাক্যটি অতিথির প্রশংসা করার সেরা উপায়।"
  },
  {
    pageNumber: 7,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Frozen Viking Longship",
    titleBn: "বরফে ঢাকা ভাইকিং জাহাজ",
    theme: "ঐতিহাসিক অনুসন্ধান",
    storyBengali: `নরওয়ের এক হিমবাহের গভীরে আবিষ্কৃত হলো সহস্র বছর পূর্বের জাহাজ। সেই **Glacial** (হিমবাহসংক্রান্ত ও বরফশীতল) পরিবেশে সবকিছু অবিকৃত ছিল। এটি ছিল ভাইকিং যুগের এক দুর্লভ **Relic** (প্রাচীন স্মৃতিচিহ্ন বা ধ্বংসাবশেষ)। এই নাবিকরা উত্তর সাগরে ছিলেন অত্যন্ত **Ferocious** (ভয়ঙ্কর ও দুর্ধর্ষ) যোদ্ধা। বিজ্ঞানীরা বরফ কেটে কাঠের কাঠামোটি **Excavate** (খনন করে উদ্ধার করা)-র কাজ শুরু করলেন। ওক কাঠের সেই শক্ত **Timber** (কাষ্ঠখণ্ড বা কড়িকাঠ) আজও অক্ষত। জাহাজের সামনে ছিল তাদের বীরত্বগাঁথার অনন্য **Legacy** (ঐতিহাসিক উত্তরাধিকার)।`,
    vocabulary: [
      {
        id: "p7-w1",
        word: "Glacial",
        ipa: "/ˈɡleɪ.ʃəl/",
        banglaPronunciation: "গ্লেসিয়াল",
        partOfSpeech: "Adjective",
        banglaMeaning: "বরফশীতল, হিমবাহের মতো ধীর বা অত্যন্ত ঠান্ডা",
        synonyms: ["Freezing", "Icy", "Frosty"],
        antonyms: ["Tropical", "Warm"],
        exampleSentence: "The wind from the northern peaks felt cold and glacial.",
        exampleSentenceBn: "উত্তরের চূড়া থেকে আসা বাতাস ছিল বরফশীতল ও কনকনে।"
      },
      {
        id: "p7-w2",
        word: "Relic",
        ipa: "/ˈrel.ɪk/",
        banglaPronunciation: "রেলিক",
        partOfSpeech: "Noun",
        banglaMeaning: "প্রাচীন ধ্বংসাবশেষ বা পবিত্র স্মৃতিচিহ্ন",
        synonyms: ["Artifact", "Remnant", "Souvenir"],
        antonyms: ["Modern invention"],
        exampleSentence: "The rusted bronze sword is a priceless relic of the medieval wars.",
        exampleSentenceBn: "মরিচা ধরা ব্রোঞ্জের তলোয়ারটি মধ্যযুগীয় যুদ্ধের এক অমূল্য স্মৃতিচিহ্ন।"
      },
      {
        id: "p7-w3",
        word: "Ferocious",
        ipa: "/fəˈroʊ.ʃəs/",
        banglaPronunciation: "ফেরোশাস",
        partOfSpeech: "Adjective",
        banglaMeaning: "ভয়ঙ্কর, হিংস্র, অদম্য শক্তিশালী",
        synonyms: ["Fierce", "Savage", "Brutal", "Violent"],
        antonyms: ["Gentle", "Tame", "Mild"],
        exampleSentence: "The tiger launched a ferocious leap toward its prey.",
        exampleSentenceBn: "বাঘটি তার শিকারের দিকে এক ভয়ঙ্কর লাফ দিল।"
      },
      {
        id: "p7-w4",
        word: "Excavate",
        ipa: "/ˈek.skə.veɪt/",
        banglaPronunciation: "এক্সকাভেট",
        partOfSpeech: "Verb",
        banglaMeaning: "মাটি বা বরফ খুঁড়ে বের করা, খনন করা",
        synonyms: ["Dig up", "Unearth", "Disinter"],
        antonyms: ["Bury", "Cover"],
        exampleSentence: "Archaeologists plan to excavate the ancient fortress next spring.",
        exampleSentenceBn: "প্রত্নতাত্ত্বিকরা আগামী বসন্তে প্রাচীন দুর্গটি খনন করার পরিকল্পনা করছেন।"
      },
      {
        id: "p7-w5",
        word: "Legacy",
        ipa: "/ˈleɡ.ə.si/",
        banglaPronunciation: "লেগ্যাসি",
        partOfSpeech: "Noun",
        banglaMeaning: "উত্তরাধিকার, ভবিষ্যৎ প্রজন্মের জন্য রেখে যাওয়া প্রভাব",
        synonyms: ["Heritage", "Inheritance", "Endowment"],
        antonyms: ["Transience"],
        exampleSentence: "Nelson Mandela left a legacy of forgiveness and human equality.",
        exampleSentenceBn: "নেলসন ম্যান্ডেলা ক্ষমা ও মানবিক সাম্যের এক অনন্য উত্তরাধিকার রেখে গেছেন।"
      }
    ],
    quiz: {
      question: "Which word describes digging up buried archaeological objects?",
      questionBn: "কোন শব্দটি মাটিতে চাপা পড়া প্রত্নতাত্ত্বিক বস্তু খুঁড়ে বের করা বোঝায়?",
      options: ["Barter", "Excavate", "Glacial", "Pristine"],
      correctIndex: 1,
      explanationBn: "'Excavate' মানে মাটি খুঁড়ে ঐতিহাসিক বস্তু উদ্ধার করা।"
    },
    practicalTipBn: "'Legacy' শব্দটি জীবনে নিজের কাজের প্রভাব বোঝাতে খুব দারুণ শব্দ: 'Build a positive legacy.'"
  },
  {
    pageNumber: 8,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Roar of the Colosseum",
    titleBn: "রোমান কলোসিয়ামের গর্জন",
    theme: "ইতিহাস ও বীরত্ব",
    storyBengali: `পঞ্চাশ হাজার দর্শকের ভিড়ে মুখরিত প্রাচীন রোমের অ্যাম্ফিথিয়েটার। বালুকাময় ময়দানে প্রবেশ করলেন অসম সাহসী এক **Gladiator** (যোদ্ধা)। পাথুরে বৃত্তাকার সেই **Arena** (যুদ্ধক্ষেত্র বা ক্রীড়াঙ্গন)-তে আজ জীবনের চরম পরীক্ষা। সম্রাট ও সাধারণ প্রজাদের সামনে অনুষ্ঠিত হচ্ছে রক্তক্ষয়ী **Spectacle** (চমকপ্রদ দৃশ্য বা মহা প্রদর্শনী)। যুদ্ধের তীব্রতায় ময়দানে ছড়িয়ে পড়ল বাঘ ও সিংহের অদম্য **Ferocity** (হিংস্রতা ও প্রচণ্ডতা)। প্রতিপক্ষের তলোয়ারের মুখে সেই তরুণ দেখালেন অতুলনীয় **Valour** (অদম্য বীরত্ব ও সাহস)। দ্রুতগতির দুই চাকার **Chariot** (যুদ্ধরথ) ধুলো উড়িয়ে ছুটে চলল, আর চারপাশ থেকে ভেসে এলো দর্শকদের গগনবিদারী **Clamour** (হট্টগোল ও চিৎকার)।`,
    vocabulary: [
      {
        id: "p8-w1",
        word: "Gladiator",
        ipa: "/ˈɡlæd.i.eɪ.t̬ɚ/",
        banglaPronunciation: "গ্ল্যাডিয়েটর",
        partOfSpeech: "Noun",
        banglaMeaning: "প্রাচীন রোমের মল্লযোদ্ধা বা তলোয়ারধারী ক্রীড়াবিদ",
        synonyms: ["Combatant", "Warrior", "Fighter"],
        antonyms: ["Spectator"],
        exampleSentence: "The gladiator raised his trident to salute the emperor.",
        exampleSentenceBn: "গ্ল্যাডিয়েটর সম্রাটকে অভিবাদন জানাতে তার ত্রিশূল তুললেন।"
      },
      {
        id: "p8-w2",
        word: "Arena",
        ipa: "/əˈriː.nə/",
        banglaPronunciation: "অ্যারিনা",
        partOfSpeech: "Noun",
        banglaMeaning: "ক্রীড়াঙ্গন, যুদ্ধক্ষেত্র বা প্রতিযোগিতার ক্ষেত্র",
        synonyms: ["Amphitheater", "Stadium", "Coliseum"],
        antonyms: ["Grandstand"],
        exampleSentence: "Two championship boxers stepped confidently into the roaring arena.",
        exampleSentenceBn: "দুই চ্যাম্পিয়ন বক্সার আত্মবিশ্বাসের সাথে গর্জনশীল রিংয়ে প্রবেশ করলেন।"
      },
      {
        id: "p8-w3",
        word: "Spectacle",
        ipa: "/ˈspek.tə.kəl/",
        banglaPronunciation: "স্পেকট্যাকল",
        partOfSpeech: "Noun",
        banglaMeaning: "চমকপ্রদ মহাদৃশ্য বা জমকালো প্রদর্শনী",
        synonyms: ["Marvel", "Display", "Pageant", "Extravaganza"],
        antonyms: ["Boring event"],
        exampleSentence: "The Olympic opening ceremony was an unforgettable visual spectacle.",
        exampleSentenceBn: "অলিম্পিকের উদ্বোধনী অনুষ্ঠানটি ছিল এক অবিস্মরণীয় নয়নাভিরাম প্রদর্শনী।"
      },
      {
        id: "p8-w4",
        word: "Valour",
        ipa: "/ˈvæl.ɚ/",
        banglaPronunciation: "ভ্যালোর",
        partOfSpeech: "Noun",
        banglaMeaning: "অসাধারণ বীরত্ব, রণক্ষেত্রে শৌর্য ও সাহস",
        synonyms: ["Bravery", "Courage", "Heroism", "Intrepidity"],
        antonyms: ["Cowardice", "Timidness"],
        exampleSentence: "Medals were awarded to the soldiers for their exceptional valour in battle.",
        exampleSentenceBn: "যুদ্ধে অসাধারণ বীরত্বের জন্য সেনাদের পদক প্রদান করা হয়েছিল।"
      },
      {
        id: "p8-w5",
        word: "Clamour",
        ipa: "/ˈklæm.ɚ/",
        banglaPronunciation: "ক্ল্যামার",
        partOfSpeech: "Noun",
        banglaMeaning: "উচ্চশব্দের হট্টগোল, প্রবল কোলাহল",
        synonyms: ["Uproar", "Tumult", "Commotion", "Din"],
        antonyms: ["Silence", "Hush", "Quiet"],
        exampleSentence: "The clamour of enthusiastic supporters echoed through the streets.",
        exampleSentenceBn: "উৎসাহী সমর্থকদের জোরালো কোলাহল রাজপথ জুড়ে প্রতিধ্বনিত হচ্ছিল।"
      }
    ],
    quiz: {
      question: "Which word stands for 'great courage in the face of danger, especially in battle'?",
      questionBn: "বিপদের মুখে বিশেষ করে যুদ্ধের ময়দানে মহান সাহস প্রকাশ করতে কোন শব্দটি ব্যবহৃত হয়?",
      options: ["Clamour", "Valour", "Spectacle", "Arena"],
      correctIndex: 1,
      explanationBn: "'Valour' মানে অসীম শৌর্য, বীরত্ব ও রণসাহস।"
    },
    practicalTipBn: "'Visual spectacle' কথাটি কোনো তাক লাগানো স্টেজ শো বা আতশবাজি উৎসবের প্রশংসায় বলতে পারেন।"
  },
  {
    pageNumber: 9,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Hanging Gardens of Babylon",
    titleBn: "ব্যাবিলনের ঝুলন্ত বাগান",
    theme: "সৌন্দর্য ও স্থাপত্য",
    storyBengali: `মরুভূমির বুকে গড়ে তোলা হয়েছিল এক অলৌকিক সবুজ স্বর্গ। প্রাসাদের বিভিন্ন ধাপে ধাপে তৈরি হয়েছিল পাথুরে **Terrace** (ধাপযুক্ত ছাদ বা বারান্দা)। ইউফ্রেটিস নদী থেকে পানি তোলার জন্য তৈরি হয়েছিল অদ্ভুত প্রকৌশলের **Irrigation** (সেচ ব্যবস্থা)। মরুভূমির শুষ্কতা ছাপিয়ে চারপাশ ছিল নয়নাভিরাম **Verdant** (শ্যামল ও পত্রপল্লবে পূর্ণ)। রাজকীয় প্রাসাদের প্রতিটি কক্ষে ছিল সীমাহীন ধনসম্পদের **Opulence** (বিলাসিতা ও প্রাচুর্য)। তৎকালীন বিশ্ব এই বাগানকে প্রাচীন স্থাপত্যের এক অতুলনীয় **Marvel** (বিস্ময়কর সৃষ্টি) বলে মনে করত। পাহাড়ি ঢালে বেড়ে উঠেছিল শত শত বিরল প্রজাতির **Flora** (উদ্ভিদকুল), যার মৃদু বাতাস ছিল মিষ্টি ও **Fragrant** (সুগন্ধিময়)।`,
    vocabulary: [
      {
        id: "p9-w1",
        word: "Terrace",
        ipa: "/ˈter.əs/",
        banglaPronunciation: "টেরাস",
        partOfSpeech: "Noun",
        banglaMeaning: "ধাপবিশিষ্ট সমতল স্থান, ছাদবারান্দা",
        synonyms: ["Balcony", "Patio", "Tier", "Platform"],
        antonyms: ["Slope"],
        exampleSentence: "We enjoyed morning tea on the breezy outdoor terrace overlooking the sea.",
        exampleSentenceBn: "আমরা সমুদ্রের দিকে মুখ করা মনোরম ছাদবারান্দায় বসে সকালের চা উপভোগ করলাম।"
      },
      {
        id: "p9-w2",
        word: "Irrigation",
        ipa: "/ˌɪr.əˈɡeɪ.ʃən/",
        banglaPronunciation: "ইরিগেশন",
        partOfSpeech: "Noun",
        banglaMeaning: "ফসলের জমিতে কৃত্রিমভাবে পানি সরবরাহ বা সেচ",
        synonyms: ["Watering", "Canal water supply"],
        antonyms: ["Drought", "Dehydration"],
        exampleSentence: "Modern drip irrigation saves precious water in arid regions.",
        exampleSentenceBn: "আধুনিক ড্রিপ সেচ পদ্ধতি শুষ্ক অঞ্চলে মূল্যবান পানি সাশ্রয় করে।"
      },
      {
        id: "p9-w3",
        word: "Verdant",
        ipa: "/ˈvɝː.dənt/",
        banglaPronunciation: "ভার্ড্যান্ট",
        partOfSpeech: "Adjective",
        banglaMeaning: "সবুজ শ্যামল, সতেজ ঘাস ও পাতায় ভরা",
        synonyms: ["Lush", "Green", "Flourishing"],
        antonyms: ["Barren", "Arid", "Desolate"],
        exampleSentence: "After monsoon showers, the Sylhet tea gardens look verdant and refreshing.",
        exampleSentenceBn: "বর্ষার বৃষ্টির পর সিলেটের চা বাগানগুলো সতেজ সবুজ ও নয়নাভিরাম দেখায়।"
      },
      {
        id: "p9-w4",
        word: "Opulence",
        ipa: "/ˈɑː.pjə.ləns/",
        banglaPronunciation: "অপিউল্যান্স",
        partOfSpeech: "Noun",
        banglaMeaning: "প্রচুর ধনদৌলত, আড়ম্বর ও বিলাসিতা",
        synonyms: ["Luxury", "Wealth", "Affluence", "Splendor"],
        antonyms: ["Poverty", "Austere life", "Scarcity"],
        exampleSentence: "The gilded ceilings of the palace reflected centuries of royal opulence.",
        exampleSentenceBn: "প্রাসাদের সোনালী ছাদ শতাব্দীর রাজকীয় আড়ম্বর ও বিলাসিতাকে ফুটিয়ে তুলছিল।"
      },
      {
        id: "p9-w5",
        word: "Fragrant",
        ipa: "/ˈfreɪ.ɡrənt/",
        banglaPronunciation: "ফ্র্যাগ্র্যান্ট",
        partOfSpeech: "Adjective",
        banglaMeaning: "সুগন্ধি, মিষ্টি ঘ্রাণযুক্ত",
        synonyms: ["Aromatic", "Perfumed", "Sweet-scented"],
        antonyms: ["Foul-smelling", "Stinky"],
        exampleSentence: "The night air was filled with fragrant white jasmine blossoms.",
        exampleSentenceBn: "রাতের বাতাস সুগন্ধি সাদা বেলি ফুলের ঘ্রাণে ভরে গিয়েছিল।"
      }
    ],
    quiz: {
      question: "Which adjective means 'lush and green with growing plants'?",
      questionBn: "কোন বিশেষণের অর্থ 'সবুজ-শ্যামল ও সতেজ উদ্ভিদে ভরা'?",
      options: ["Opulence", "Verdant", "Terrace", "Glacial"],
      correctIndex: 1,
      explanationBn: "'Verdant' মানে গাঢ় সবুজ ঘাস বা পাতায় ঢাকা সতেজ প্রকৃতি।"
    },
    practicalTipBn: "কোনো প্রাকৃতিক সৌন্দর্যের বর্ণনায় 'lush green' এর বদলে 'verdant landscape' বললে আপনার ভোক্যাবুলারি অসাধারণ শোনায়।"
  },
  {
    pageNumber: 10,
    chapterNumber: 1,
    chapterTitle: "Ancient Wonders & Expeditions",
    chapterTitleBn: "প্রাচীন বিস্ময় ও অভিযান",
    title: "The Citadel of Mohenjo-Daro",
    titleBn: "মহেঞ্জোদারোর দুর্গ ও সুপরিকল্পিত নগরী",
    theme: "নগর পরিকল্পনা ও ইতিহাস",
    storyBengali: `সিন্ধু নদের তীরে আবিষ্কৃত পাঁচ হাজার বছরের প্রাচীন এই নগরী বিশ্বকে অবাক করেছে। নগরের কেন্দ্রস্থলে উঁচু স্থানে ছিল সুরক্ষিত **Citadel** (সুরক্ষিত নগরদুর্গ)। শহরের রাস্তাগুলো ছিল নিখুঁত জ্যামিতিক **Grid** (পরিকল্পিত জালিকা বা ছক)-এ বিন্যস্ত। বাড়ির ভেতর থেকে নোংরা পানি নিষ্কাশনের জন্য ছিল সুষম **Drainage** (নালা ও পয়োনিষ্কাশন ব্যবস্থা)। এটি ছিল তৎকালীন পৃথিবীর প্রথম আধুনিক **Urban** (নগরায়িত ও পৌর) সভ্যতা। সেই সুদূর **Antiquity** (প্রাচীনতম যুগ)-তেও তাদের বাড়িগুলো তৈরি ছিল পোড়ামাটির উন্নত ইট দিয়ে। তবে এই সভ্যতার বিলুপ্তির কারণ আজও গবেষকদের কাছে অমীমাংসিত এক **Enigma** (রহস্য বা হেঁয়ালি)।`,
    vocabulary: [
      {
        id: "p10-w1",
        word: "Citadel",
        ipa: "/ˈsɪt̬.ə.del/",
        banglaPronunciation: "সিটাডেল",
        partOfSpeech: "Noun",
        banglaMeaning: "নগরদুর্গ, শহরের সবচেয়ে উঁচু ও সুরক্ষিত অংশ",
        synonyms: ["Fortress", "Stronghold", "Bastion"],
        antonyms: ["Open plain"],
        exampleSentence: "Citizens took shelter inside the high-walled citadel during the siege.",
        exampleSentenceBn: "অবরোধের সময় নাগরিকরা উঁচু প্রাচীরবিশিষ্ট নগরদুর্গে আশ্রয় নিয়েছিল।"
      },
      {
        id: "p10-w2",
        word: "Grid",
        ipa: "/ɡrɪd/",
        banglaPronunciation: "গ্রিড",
        partOfSpeech: "Noun",
        banglaMeaning: "পরস্পরছেদী রেখাজাল, পরিকল্পিত ছক",
        synonyms: ["Matrix", "Network", "Lattice"],
        antonyms: ["Disorder"],
        exampleSentence: "Manhattan's streets are arranged in a clean, perpendicular grid.",
        exampleSentenceBn: "ম্যানহাটনের রাস্তাগুলো একটি সুবিন্যস্ত লম্বালম্বি গ্রিডে সাজানো।"
      },
      {
        id: "p10-w3",
        word: "Drainage",
        ipa: "/ˈdreɪ.nɪdʒ/",
        banglaPronunciation: "ড্রেইনেজ",
        partOfSpeech: "Noun",
        banglaMeaning: "পানি নিষ্কাশন ব্যবস্থা বা নর্দমা ব্যবস্থা",
        synonyms: ["Sewage", "Outflow", "Waste run-off"],
        antonyms: ["Blockage"],
        exampleSentence: "Good city drainage prevents street flooding during torrential rains.",
        exampleSentenceBn: "উন্নত নগর নিষ্কাশন ব্যবস্থা মুষলধারে বৃষ্টির সময় রাস্তায় জলাবদ্ধতা রোধ করে।"
      },
      {
        id: "p10-w4",
        word: "Urban",
        ipa: "/ˈɝː.bən/",
        banglaPronunciation: "আরবান",
        partOfSpeech: "Adjective",
        banglaMeaning: "শহুরে, পৌর বা নগরসংক্রান্ত",
        synonyms: ["City", "Metropolitan", "Civic"],
        antonyms: ["Rural", "Pastoral", "Countryside"],
        exampleSentence: "Rapid urban development has attracted millions of youth to capital cities.",
        exampleSentenceBn: "দ্রুত শহুরে উন্নয়ন লাখ লাখ তরুণকে রাজধানী শহরের দিকে আকৃষ্ট করেছে।"
      },
      {
        id: "p10-w5",
        word: "Antiquity",
        ipa: "/ænˈtɪk.wə.t̬i/",
        banglaPronunciation: "অ্যান্টিকুইটি",
        partOfSpeech: "Noun",
        banglaMeaning: "সুদূর প্রাচীনকাল, প্রাচীন ইতিহাস",
        synonyms: ["Ancient times", "Distant past", "Early history"],
        antonyms: ["Modernity", "Present day"],
        exampleSentence: "Statues from classical antiquity remain revered for their anatomical beauty.",
        exampleSentenceBn: "ধ্রুপদী প্রাচীনকালের মূর্তিগুলো আজও তাদের শারীরিক সৌন্দর্যের জন্য সমাদৃত।"
      },
      {
        id: "p10-w6",
        word: "Enigma",
        ipa: "/əˈnɪɡ.mə/",
        banglaPronunciation: "এনিগমা",
        partOfSpeech: "Noun",
        banglaMeaning: "ধাঁধা, অমীমাংসিত রহস্য",
        synonyms: ["Mystery", "Riddle", "Puzzle", "Conundrum"],
        antonyms: ["Explanation", "Certainty"],
        exampleSentence: "How the huge stones were transported across mountains remains an enigma.",
        exampleSentenceBn: "পাহাড়ের ওপারে কীভাবে বিশালাকার পাথর পরিবহন করা হয়েছিল তা আজও এক রহস্য।"
      }
    ],
    quiz: {
      question: "What is an 'Enigma'?",
      questionBn: "'Enigma' বলতে কী বোঝায়?",
      options: ["A modern city", "A mysterious puzzle that is difficult to understand", "A water pipe", "A brick wall"],
      correctIndex: 1,
      explanationBn: "'Enigma' মানে এমন এক রহস্য বা ধাঁধা যা সমাধান বা ব্যাখ্যা করা খুব কঠিন।"
    },
    practicalTipBn: "যখন কোনো কিছু রহস্যময় এবং বুঝতে কষ্ট হয়, তখন বলতে পারেন: 'It remains an enigma to me.'"
  },
  // Pages 11 to 20: Future Tech, Space, AI & Science
  {
    pageNumber: 11,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "Colony on Mars",
    titleBn: "মঙ্গল গ্রহে মানব বসতি",
    theme: "মহাকাশ ও বিজ্ঞান",
    storyBengali: `পৃথিবীর সীমানা পেরিয়ে মানুষ এবার লাল গ্রহে পা রেখেছে। মঙ্গলের পাতলা **Atmospheric** (বায়ুমণ্ডলীয়) চাপ ও ঠান্ডার সাথে খাপ খাইয়ে নিতে তৈরি হয়েছে সুরক্ষিত ডোম। বিজ্ঞানীদের চূড়ান্ত লক্ষ্য হলো লাল গ্রহকে মানুষের বসবাসের উপযুক্ত করার জন্য **Terraforming** (গ্রহকে বাসযোগ্য রূপান্তর করা) সম্পন্ন করা। সেখানে তৈরি কৃত্রিম ইকোসিস্টেমগুলো এখন পুরোপুরি **Habitable** (বসবাসযোগ্য ও অনুকূল)। এই অভিযানের অভিযাত্রীরা মানব ইতিহাসের প্রথম মহাকাশ **Pioneer** (অগ্রদূত বা পথিকৃৎ)। অনন্ত **Cosmos** (মহাবিশ্ব)-এর মাঝে এই ক্ষুদ্র উপনিবেশটি মানুষের অসীম সাহসের প্রতীক। কিন্তু সেখানে প্রতিনিয়ত তীব্র সৌর **Radiation** (তেজস্ক্রিয় বিকিরণ) মোকাবিলা করতে হয়, আর কম **Gravity** (মাধ্যাকর্ষণ)-র কারণে হাঁটাচলায় বিশেষ যত্ন নিতে হয়।`,
    vocabulary: [
      {
        id: "p11-w1",
        word: "Atmospheric",
        ipa: "/ˌæt.məsˈfer.ɪk/",
        banglaPronunciation: "অ্যাটমোস্ফেরিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "বায়ুমণ্ডলীয়, পরিবেশ বা আবহাওয়া সংক্রান্ত",
        synonyms: ["Climatic", "Aerial", "Meteorological"],
        antonyms: ["Subterranean"],
        exampleSentence: "High atmospheric pressure usually brings dry and clear weather.",
        exampleSentenceBn: "উচ্চ বায়ুমণ্ডলীয় চাপ সাধারণত শুষ্ক ও পরিষ্কার আবহাওয়া নিয়ে আসে।"
      },
      {
        id: "p11-w2",
        word: "Habitable",
        ipa: "/ˈhæb.ə.t̬ə.bəl/",
        banglaPronunciation: "হ্যাবিটেবল",
        partOfSpeech: "Adjective",
        banglaMeaning: "বসবাসযোগ্য, যেখানে বেঁচে থাকা সম্ভব",
        synonyms: ["Livable", "Inhabitable", "Suitable"],
        antonyms: ["Uninhabitable", "Hostile"],
        exampleSentence: "Telescopes scan distant star systems searching for habitable exoplanets.",
        exampleSentenceBn: "টেলিস্কোপগুলো বসবাসযোগ্য দূরবর্তী গ্রহের খোঁজে মহাকাশ স্ক্যান করে।"
      },
      {
        id: "p11-w3",
        word: "Pioneer",
        ipa: "/ˌpaɪ.əˈnɪr/",
        banglaPronunciation: "পায়োনিয়ার",
        partOfSpeech: "Noun",
        banglaMeaning: "অগ্রদূত, পথিকৃৎ যিনি কোনো নতুন পথে প্রথম হাঁটেন",
        synonyms: ["Innovator", "Trailblazer", "Pathfinder"],
        antonyms: ["Follower", "Imitator"],
        exampleSentence: "Marie Curie was a fearless pioneer in the research of radioactivity.",
        exampleSentenceBn: "মেরি কুরি তেজস্ক্রিয়তার গবেষণায় এক নির্ভীক পথিকৃৎ ছিলেন।"
      },
      {
        id: "p11-w4",
        word: "Cosmos",
        ipa: "/ˈkɑːz.moʊs/",
        banglaPronunciation: "কসমস",
        partOfSpeech: "Noun",
        banglaMeaning: "সুশৃঙ্খল মহাবিশ্ব, অনন্ত সৃষ্টিজগৎ",
        synonyms: ["Universe", "Creation", "Space", "Galaxy expanse"],
        antonyms: ["Microcosm"],
        exampleSentence: "Staring at the stars reminds us how tiny we are in the vast cosmos.",
        exampleSentenceBn: "নক্ষত্রপানে তাকালে মনে পড়ে এই সুবিশাল মহাবিশ্বে আমরা কতটাই না ক্ষুদ্র।"
      },
      {
        id: "p11-w5",
        word: "Radiation",
        ipa: "/ˌreɪ.diˈeɪ.ʃən/",
        banglaPronunciation: "রেডিয়েশন",
        partOfSpeech: "Noun",
        banglaMeaning: "বিকিরণ, তেজস্ক্রিয় রশ্মি",
        synonyms: ["Emissions", "Rays", "Nuclear waves"],
        antonyms: ["Absorption"],
        exampleSentence: "Astronauts wear specialized lead suits to shield against harmful cosmic radiation.",
        exampleSentenceBn: "মহাকাশচারীরা ক্ষতিকর মহাজাগতিক বিকিরণ থেকে বাঁচতে বিশেষ সীসার পোশাক পরেন।"
      }
    ],
    quiz: {
      question: "What is a 'Pioneer'?",
      questionBn: "'Pioneer' শব্দটির অর্থ কী?",
      options: ["A robot on Mars", "A person who is among the first to explore or develop a new area", "A planet's atmosphere", "A radioactive ray"],
      correctIndex: 1,
      explanationBn: "'Pioneer' মানে অগ্রদূত বা পথিকৃৎ, যিনি নতুন কোনো উদ্ভাবন বা পথের সূচনা করেন।"
    },
    practicalTipBn: "কারো প্রশংসায় বলতে পারেন: 'You are a pioneer in this field!'"
  },
  {
    pageNumber: 12,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "The Dawn of Artificial Intelligence",
    titleBn: "কৃত্রিম বুদ্ধিমত্তার বিপ্লব",
    theme: "প্রযুক্তি ও ভবিষ্যৎ",
    storyBengali: `একবিংশ শতাব্দীর সূচনা হয়েছে প্রযুক্তির এক যুগান্তকারী পদক্ষেপে। জটিল গাণিতিক **Algorithm** (অ্যালগরিদম বা ধাপে ধাপে সমাধান প্রণালী) এখন মানুষের মতোই চিন্তা করতে সক্ষম। মানুষের মস্তিষ্কের আদলে তৈরি **Neural** (স্নায়বিক) নেটওয়ার্ক হাজার কোটি ডেটা এক সেকেন্ডে প্রসেস করে। যন্ত্রের এই নিজস্ব **Cognition** (বোধশক্তি ও প্রজ্ঞা) চিকিৎসা ও শিক্ষায় বৈপ্লবিক পরিবর্তন এনেছে। মানবজাতির সাথে চালকহীন গাড়ির মতো **Autonomous** (স্বয়ংক্রিয় বা স্বচালিত) ব্যবস্থার সংমিশ্রণ এক ঐতিহাসিক **Breakthrough** (যুগান্তকারী আবিষ্কার)। মানুষ ও কৃত্রিম মেধার যৌথ মেলবন্ধনে সৃষ্টি হচ্ছে অভূতপূর্ব **Synergy** (সমন্বিত বাড়তি শক্তি)। আর প্রথাগত শিল্পে ঘটছে এক বিশাল **Disruption** (আমূল রূপান্তর ও ওলটপালট)।`,
    vocabulary: [
      {
        id: "p12-w1",
        word: "Algorithm",
        ipa: "/ˈæl.ɡə.rɪ.ðəm/",
        banglaPronunciation: "অ্যালগরিদম",
        partOfSpeech: "Noun",
        banglaMeaning: "নির্দিষ্ট সমস্যা সমাধানের সুনির্দিষ্ট গাণিতিক নির্দেশনাবলী",
        synonyms: ["Procedure", "Formula", "Rule set", "Logic code"],
        antonyms: ["Randomness"],
        exampleSentence: "Search engines use a sophisticated algorithm to rank webpages.",
        exampleSentenceBn: "সার্চ ইঞ্জিনগুলো ওয়েবপেজ র‍্যাংক করতে এক জটিল অ্যালগরিদম ব্যবহার করে।"
      },
      {
        id: "p12-w2",
        word: "Cognition",
        ipa: "/kɑːɡˈnɪʃ.ən/",
        banglaPronunciation: "কগনিশন",
        partOfSpeech: "Noun",
        banglaMeaning: "উপলব্ধি, বোধশক্তি, চিন্তা ও স্মৃতির মানসিক প্রক্রিয়া",
        synonyms: ["Perception", "Awareness", "Reasoning", "Comprehension"],
        antonyms: ["Ignorance", "Unconsciousness"],
        exampleSentence: "Puzzles and memory games help improve children's cognitive skills.",
        exampleSentenceBn: "ধাঁধা ও স্মৃতিভিত্তিক খেলা শিশুদের বোধশক্তি ও চিন্তা ক্ষমতা বাড়াতে সহায়তা করে।"
      },
      {
        id: "p12-w3",
        word: "Autonomous",
        ipa: "/ɑːˈtɑː.nə.məs/",
        banglaPronunciation: "অটোনোমাস",
        partOfSpeech: "Adjective",
        banglaMeaning: "স্বায়ত্তশাসিত, স্বচালিত, পরনির্ভরতাহীন",
        synonyms: ["Self-governing", "Independent", "Self-driving"],
        antonyms: ["Dependent", "Subordinate", "Controlled"],
        exampleSentence: "Autonomous electric vehicles are navigating city highways safely.",
        exampleSentenceBn: "স্বচালিত বৈদ্যুতিক গাড়িগুলো শহরের মহাসড়কে নিরাপদে চলাচল করছে।"
      },
      {
        id: "p12-w4",
        word: "Breakthrough",
        ipa: "/ˈbreɪk.θruː/",
        banglaPronunciation: "ব্রেক-থ্রু",
        partOfSpeech: "Noun",
        banglaMeaning: "যুগান্তকারী অগ্রগতি বা হঠাৎ সাফল্য",
        synonyms: ["Milestone", "Discovery", "Triumph", "Leap forward"],
        antonyms: ["Setback", "Impasse", "Stalemate"],
        exampleSentence: "Scientists announced a monumental breakthrough in clean nuclear fusion.",
        exampleSentenceBn: "বিজ্ঞানীরা পরিচ্ছন্ন পারমাণবিক ফিউশনে এক যুগান্তকারী অগ্রগতির ঘোষণা দিয়েছেন।"
      },
      {
        id: "p12-w5",
        word: "Synergy",
        ipa: "/ˈsɪn.ɚ.dʒi/",
        banglaPronunciation: "সিনার্জি",
        partOfSpeech: "Noun",
        banglaMeaning: "একত্রিত প্রচেষ্টার ফলে বাড়তি কার্যকারিতা বা যৌথ শক্তি",
        synonyms: ["Collaboration", "Combined effect", "Team power"],
        antonyms: ["Discord", "Antagonism"],
        exampleSentence: "The synergy between human creativity and AI speed produces amazing results.",
        exampleSentenceBn: "মানুষের সৃজনশীলতা ও কৃত্রিম বুদ্ধিমত্তার গতির যৌথ সমন্বয়ে অসাধারণ ফলাফল তৈরি হয়।"
      }
    ],
    quiz: {
      question: "Which noun means 'a major, dramatic discovery or advancement'?",
      questionBn: "কোন বিশেষ্যটি 'কোনো গবেষণায় হঠাৎ যুগান্তকারী আবিষ্কার বা সাফল্য' বোঝায়?",
      options: ["Algorithm", "Breakthrough", "Cognition", "Synergy"],
      correctIndex: 1,
      explanationBn: "'Breakthrough' মানে কোনো কঠিন কাজে হঠাৎ বড় সাফল্য বা যুগান্তকারী অগ্রগতি।"
    },
    practicalTipBn: "'Breakthrough' শব্দটি আপনার ক্যারিয়ার বা গবেষণার সাফল্যের কথা বলতে ব্যবহার করতে পারেন: 'It was a career breakthrough.'"
  },
  {
    pageNumber: 13,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "The Quantum Leap",
    titleBn: "কোয়ান্টাম কম্পিউটিংয়ের বিস্ময়",
    theme: "পদার্থবিজ্ঞান ও গণনা",
    storyBengali: `সাধারণ কম্পিউটার যেখানে কেবল ০ আর ১ বোঝে, কোয়ান্টাম কম্পিউটার সেখানে কাজ করে অদ্ভুত নিয়মে। এর কিউবিটগুলো একই সাথে একাধিক অবস্থায় থাকতে পারে যাকে বলে **Superposition** (সুপারপজিশন বা উপরিপাতন)। দুটি দূরবর্তী কণা পরস্পরের সাথে জাদুকরীভাবে যুক্ত থাকে **Entanglement** (কোয়ান্টাম জড়িয়ে থাকা)-এর মাধ্যমে। এর সাহায্যে ভবিষ্যতের ইন্টারনেট নিরাপত্তা রক্ষায় ব্যবহৃত হচ্ছে দুর্ভেদ্য **Cryptography** (তথ্য গোপনবিদ্যা ও সাংকেতিক কোড)। এই কম্পিউটারের অবিশ্বাস্য দ্রুতগতির **Computation** (গাণিতিক পরিগণনা ক্ষমতা) ওষুধ আবিষ্কারে নতুন দিগন্ত খুলেছে। বিজ্ঞানীদের কাছে আপাতদৃষ্টিতে এটি এক অদ্ভুত **Paradox** (আপাতবিরোধী সত্য বা ধাঁধা)। কিন্তু এই **Subatomic** (পরমাণুর চেয়ে ক্ষুদ্র) জগতের নিয়মই বদলে দেবে আগামী দিনের দুনিয়া।`,
    vocabulary: [
      {
        id: "p13-w1",
        word: "Superposition",
        ipa: "/ˌsuː.pɚ.pəˈzɪʃ.ən/",
        banglaPronunciation: "সুপারপজিশন",
        partOfSpeech: "Noun",
        banglaMeaning: "উপরিবাতন, একই সাথে একাধিক অবস্থায় বিরাজ করা",
        synonyms: ["Overlapping states", "Multi-state balance"],
        antonyms: ["Definite single state"],
        exampleSentence: "In quantum physics, a particle exists in a superposition of states until measured.",
        exampleSentenceBn: "কোয়ান্টাম পদার্থবিজ্ঞানে পরিমাপের আগ পর্যন্ত একটি কণা একই সাথে একাধিক অবস্থায় থাকে।"
      },
      {
        id: "p13-w2",
        word: "Cryptography",
        ipa: "/krɪpˈtɑː.ɡrə.fi/",
        banglaPronunciation: "ক্রিপ্টোগ্রাফি",
        partOfSpeech: "Noun",
        banglaMeaning: "তথ্য সুরক্ষার সাংকেতিক বিজ্ঞান ও গুপ্তলিপি",
        synonyms: ["Encryption", "Code-making", "Secret ciphers"],
        antonyms: ["Plaintext sharing"],
        exampleSentence: "Modern banking relies on advanced cryptography to protect bank transactions.",
        exampleSentenceBn: "আধুনিক ব্যাংকিং ব্যবস্থা লেনদেন সুরক্ষায় উন্নত ক্রিপ্টোগ্রাফির ওপর নির্ভর করে।"
      },
      {
        id: "p13-w3",
        word: "Computation",
        ipa: "/ˌkɑːm.pjəˈteɪ.ʃən/",
        banglaPronunciation: "কম্পিউটেশন",
        partOfSpeech: "Noun",
        banglaMeaning: "গাণিতিক হিসাব-নিকাশ বা পরিগণনা",
        synonyms: ["Calculation", "Data processing", "Reckoning"],
        antonyms: ["Guesswork"],
        exampleSentence: "Complex climate models require weeks of supercomputer computation.",
        exampleSentenceBn: "জটিল জলবায়ু মডেলগুলো সমাধান করতে সুপারকম্পিউটারের কয়েক সপ্তাহের হিসাবের প্রয়োজন হয়।"
      },
      {
        id: "p13-w4",
        word: "Paradox",
        ipa: "/ˈper.ə.dɑːks/",
        banglaPronunciation: "প্যারাডক্স",
        partOfSpeech: "Noun",
        banglaMeaning: "আপাতবিরোধী অথচ বাস্তব সত্য, ধাঁধাঁপূর্ণ বৈপরীত্য",
        synonyms: ["Contradiction", "Puzzle", "Irony", "Enigma"],
        antonyms: ["Consistency", "Obvious fact"],
        exampleSentence: "It is a strange paradox that people feel lonelier in this hyper-connected internet age.",
        exampleSentenceBn: "এটি একটি অদ্ভুত প্যারাডক্স যে ইন্টারনেটের যুগে অতি-সংযুক্ত থেকেও মানুষ বেশি একা বোধ করে।"
      },
      {
        id: "p13-w5",
        word: "Subatomic",
        ipa: "/ˌsʌb.əˈtɑː.mɪk/",
        banglaPronunciation: "সাবঅ্যাটমিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "পরমাণুর চেয়ে ক্ষুদ্র কণা সংক্রান্ত (যেমন কোয়ার্ক, ইলেকট্রন)",
        synonyms: ["Microscopic particle", "Quantum scale"],
        antonyms: ["Macroscopic"],
        exampleSentence: "Particle colliders smash subatomic particles together at light speed.",
        exampleSentenceBn: "কণা ত্বরকগুলো আলোর গতিতে পরমাণুর চেয়ে ক্ষুদ্র কণাগুলোর সংঘর্ষ ঘটায়।"
      }
    ],
    quiz: {
      question: "What is a 'Paradox'?",
      questionBn: "'Paradox' বলতে কী বোঝায়?",
      options: ["A simple math addition", "A statement that seems contradictory but may actually be true", "A supercomputer part", "A subatomic particle"],
      correctIndex: 1,
      explanationBn: "'Paradox' মানে এমন এক বৈপরীত্য যা শুনতে পরস্পরবিরোধী মনে হলেও বাস্তবে সত্যি হতে পারে।"
    },
    practicalTipBn: "'Paradox' শব্দটি বিতর্কে বা প্রেজেন্টেশনে বৈপরীত্য প্রকাশে দারুণ উপযোগী।"
  },
  {
    pageNumber: 14,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "The Event Horizon",
    titleBn: "ব্ল্যাক হোলের ঘটনা দিগন্ত",
    theme: "জ্যোতির্বিজ্ঞান",
    storyBengali: `মহাশূন্যের চরমতম বিস্ময় হলো কৃষ্ণগহ্বর বা ব্ল্যাক হোল। এর কেন্দ্রবিন্দুতে রয়েছে অসীম ঘনত্বের এক **Singularity** (অনন্যবিন্দু বা শূন্য আয়তনের অসীম ভর)। ব্ল্যাক হোলের সীমানাকে বলা হয় ঘটনা দিগন্ত, যার ভেতর থেকে আলোও পালাতে পারে না। এর প্রচণ্ড বল মহাকাশের পরিকাঠামোকে দুমড়ে মুচড়ে দেয় এবং স্থান-কালকে **Warp** (বিকৃত ও বাঁকা করা) করে ফেলে। মহাবিশ্বের এই অনন্ত অন্ধকার যেন এক সর্বগ্রাসী **Abyss** (অতল গহ্বর বা অতলস্পর্শী পাতাল)। আইনস্টাইনের আপেক্ষিকতা তত্ত্ব অনুযায়ী সেখানে প্রসারিত হয় **Spacetime** (দেশ-কাল বা স্থান ও কাল)। কৃষ্ণগহ্বরের চারপাশের ঘূর্ণায়মান গ্যাসীয় উজ্জ্বল চাকতিকে বলা হয় **Accretion** (সংযোজন বা পদার্থের পুঞ্জীভূতকরণ) ডিস্ক।`,
    vocabulary: [
      {
        id: "p14-w1",
        word: "Singularity",
        ipa: "/ˌsɪŋ.ɡjəˈler.ə.t̬i/",
        banglaPronunciation: "সিঙ্গুলারিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "অনন্যবিন্দু, যেখানে মাধ্যাকর্ষণ ও ঘনত্ব অসীম হয়ে যায়",
        synonyms: ["Infinite core", "Uniqueness", "Central point"],
        antonyms: ["Uniform space"],
        exampleSentence: "All known laws of physics break down at the center of a black hole singularity.",
        exampleSentenceBn: "ব্ল্যাক হোলের সিঙ্গুলারিটির কেন্দ্রে পদার্থবিজ্ঞানের চেনা সব নিয়ম অচল হয়ে পড়ে।"
      },
      {
        id: "p14-w2",
        word: "Warp",
        ipa: "/wɔːrp/",
        banglaPronunciation: "ওয়ার্প",
        partOfSpeech: "Verb",
        banglaMeaning: "বাঁকানো, বিকৃত করা, স্বাভাবিক রূপ পাল্টানো",
        synonyms: ["Bend", "Distort", "Twist", "Deform"],
        antonyms: ["Straighten", "Align"],
        exampleSentence: "Immense planetary gravity can warp the path of passing starlight.",
        exampleSentenceBn: "বিশাল গ্রহীয় মাধ্যাকর্ষণ পাশ দিয়ে যাওয়া তারার আলোর পথ বাঁকিয়ে দিতে পারে।"
      },
      {
        id: "p14-w3",
        word: "Abyss",
        ipa: "/əˈbɪs/",
        banglaPronunciation: "অ্যাবিস",
        partOfSpeech: "Noun",
        banglaMeaning: "অতল গহ্বর, সীমাহীন গভীর অন্ধ খাদ",
        synonyms: ["Chasm", "Void", "Gulf", "Depths"],
        antonyms: ["Peak", "Surface"],
        exampleSentence: "Peering over the cliff into the fog felt like staring into an endless abyss.",
        exampleSentenceBn: "কুয়াশার মাঝে পাহাড়ের খাদে তাকানো যেন এক অন্তহীন অতল গহ্বরে তাকানোর মতো মনে হচ্ছিল।"
      },
      {
        id: "p14-w4",
        word: "Spacetime",
        ipa: "/ˈspeɪs.taɪm/",
        banglaPronunciation: "স্পেসটাইম",
        partOfSpeech: "Noun",
        banglaMeaning: "দেশ-কাল, স্থান এবং সময়ের চার মাত্রিক মেলবন্ধন",
        synonyms: ["Fabric of the cosmos", "Four-dimensional continuum"],
        antonyms: ["Separate time and space"],
        exampleSentence: "Massive stars bend the very fabric of spacetime around them.",
        exampleSentenceBn: "বিশাল নক্ষত্রগুলো তাদের চারপাশের দেশ-কালের বুননকে বাঁকিয়ে দেয়।"
      },
      {
        id: "p14-w5",
        word: "Accretion",
        ipa: "/əˈkriː.ʃən/",
        banglaPronunciation: "অ্যাক্রিশন",
        partOfSpeech: "Noun",
        banglaMeaning: "ধীরে ধীরে কণা পুঞ্জীভূত হয়ে বৃদ্ধি পাওয়া",
        synonyms: ["Accumulation", "Growth", "Build-up", "Addition"],
        antonyms: ["Erosion", "Depletion", "Loss"],
        exampleSentence: "Planets formed through the steady accretion of cosmic dust and asteroids.",
        exampleSentenceBn: "মহাজাগতিক ধূলিকণা ও গ্রহাণুর ধারাবাহিক পুঞ্জীভবনের মাধ্যমে গ্রহগুলোর সৃষ্টি হয়েছিল।"
      }
    ],
    quiz: {
      question: "What does 'Abyss' mean?",
      questionBn: "'Abyss' শব্দের অর্থ কী?",
      options: ["A very deep or bottomless chasm", "A bright laser", "A star ship", "A mathematical equation"],
      correctIndex: 0,
      explanationBn: "'Abyss' মানে অতলস্পর্শী খাদ বা সীমাহীন অন্ধকার গহ্বর।"
    },
    practicalTipBn: "রূপক অর্থেও Abyss ব্যবহার হয়: 'He felt himself slipping into an abyss of despair.'"
  },
  {
    pageNumber: 15,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "CRISPR and Gene Editing",
    titleBn: "জিন সম্পাদনা ও ভবিষ্যতের মানুষ",
    theme: "চিকিৎসাবিজ্ঞান ও জেনেটিক্স",
    storyBengali: `মানুষের জীবনের ব্লুপ্রিন্ট লুকিয়ে আছে ডিএনএ-র ভাঁজে। পুরো মানব দেহের জিনগত মানচিত্রকে বলা হয় **Genome** (জিনোম বা জিনসমগ্র)। ক্রিস্পার প্রযুক্তির সাহায্যে কোষে ক্ষতিকর **Mutation** (জিনগত আকস্মিক রূপান্তর বা বিকৃতি) সংশোধন করা সম্ভব। এর ফলে বাবা-মা থেকে সন্তানের মাঝে সঞ্চারিত **Hereditary** (বংশগত বা জন্মগত) রোগ দূর করা যাবে। তবে বিজ্ঞানীদের অবশ্যই কিছু **Ethical** (নৈতিক ও বিবেকসম্মত) সীমাবদ্ধতা মেনে চলতে হবে। মানবজাতির স্বপ্ন হলো ক্যানসার ও অন্ধত্বের মতো মারাত্মক ব্যাধিকে পৃথিবী থেকে চিরতরে **Eradicate** (নির্মূল বা সমূলে বিনাশ করা)। এর মাধ্যমে মানুষ বাড়াতে চায় সুস্থ জীবনের **Longevity** (দীর্ঘায়ু ও আয়ুষ্কাল), এবং আগামী প্রজন্মের ইতিবাচক **Trait** (চারিত্রিক বা শারীরিক বৈশিষ্ট্য) সমৃদ্ধ করতে চায়।`,
    vocabulary: [
      {
        id: "p15-w1",
        word: "Genome",
        ipa: "/ˈdʒiː.noʊm/",
        banglaPronunciation: "জিনোম",
        partOfSpeech: "Noun",
        banglaMeaning: "কোনো জীবের সম্পূর্ণ ডিএনএ বা জিনসমগ্র",
        synonyms: ["Genetic makeup", "DNA code", "Chromosomal blueprint"],
        antonyms: ["Single gene"],
        exampleSentence: "Mapping the entire human genome took scientists over a decade.",
        exampleSentenceBn: "পুরো মানব জিনোমের মানচিত্র তৈরি করতে বিজ্ঞানীদের এক দশকের বেশি সময় লেগেছিল।"
      },
      {
        id: "p15-w2",
        word: "Mutation",
        ipa: "/mjuːˈteɪ.ʃən/",
        banglaPronunciation: "মিউটেশন",
        partOfSpeech: "Noun",
        banglaMeaning: "জিন বা ডিএনএ কাঠামোর আকস্মিক রূপান্তর বা পরিবর্তন",
        synonyms: ["Alteration", "Genetic change", "Variation"],
        antonyms: ["Stability", "Unchanged state"],
        exampleSentence: "A tiny genetic mutation gave the Arctic foxes their snow-white camouflage.",
        exampleSentenceBn: "একটি ক্ষুদ্র জিনগত মিউটেশন আর্কটিক শেয়ালদের তুষার-সাদা ছদ্মবেশ দিয়েছিল।"
      },
      {
        id: "p15-w3",
        word: "Hereditary",
        ipa: "/həˈred.ə.ter.i/",
        banglaPronunciation: "হেরেডিটারি",
        partOfSpeech: "Adjective",
        banglaMeaning: "বংশগত, বংশপরম্পরায় অর্জিত",
        synonyms: ["Inherited", "Genetic", "Congenital", "Family-linked"],
        antonyms: ["Acquired", "Environmental"],
        exampleSentence: "Certain types of diabetes are strongly linked to hereditary factors.",
        exampleSentenceBn: "নির্দিষ্ট ধরনের ডায়াবেটিস বংশগত কারণগুলোর সাথে ঘনিষ্ঠভাবে যুক্ত।"
      },
      {
        id: "p15-w4",
        word: "Ethical",
        ipa: "/ˈeθ.ɪ.kəl/",
        banglaPronunciation: "এথিক্যাল",
        partOfSpeech: "Adjective",
        banglaMeaning: "নৈতিক, বিবেকসম্মত, নীতিশাস্ত্রীয়",
        synonyms: ["Moral", "Principled", "Righteous", "Just"],
        antonyms: ["Unethical", "Immoral", "Dishonorable"],
        exampleSentence: "Doctors are bound by an ethical oath to never intentionally harm a patient.",
        exampleSentenceBn: "চিকিৎসকরা কখনো কোনো রোগীর ক্ষতি না করার নৈতিক শপথে আবদ্ধ।"
      },
      {
        id: "p15-w5",
        word: "Eradicate",
        ipa: "/ɪˈræd.ɪ.keɪt/",
        banglaPronunciation: "ইরাডিকেট",
        partOfSpeech: "Verb",
        banglaMeaning: "সমূলে বিনাশ করা, পুরোপুরি নির্মূল করা",
        synonyms: ["Eliminate", "Wipe out", "Abolish", "Exterminate"],
        antonyms: ["Cultivate", "Preserve", "Propagate"],
        exampleSentence: "Vaccination campaigns helped humanity completely eradicate smallpox.",
        exampleSentenceBn: "টিকাদান কর্মসূচি মানবজাতিকে গুটিবসন্ত পুরোপুরি নির্মূল করতে সাহায্য করেছিল।"
      },
      {
        id: "p15-w6",
        word: "Longevity",
        ipa: "/lɑːnˈdʒev.ə.t̬i/",
        banglaPronunciation: "লনজেভিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "দীর্ঘায়ু, দীর্ঘস্থায়িত্ব বা দীর্ঘ জীবন",
        synonyms: ["Long life", "Durability", "Endurance"],
        antonyms: ["Brevity", "Short lifespan"],
        exampleSentence: "Balanced nutrition and regular exercise are secrets to healthy longevity.",
        exampleSentenceBn: "সুষম পুষ্টি এবং নিয়মিত ব্যায়াম হলো স্বাস্থ্যকর দীর্ঘায়ুর মূল রহস্য।"
      }
    ],
    quiz: {
      question: "Which verb means 'to completely destroy or eliminate something harmful'?",
      questionBn: "কোন ক্রিয়াপদটির অর্থ 'ক্ষতিকর কিছু পুরোপুরি সমূলে নির্মূল করা'?",
      options: ["Eradicate", "Mutate", "Inherit", "Warp"],
      correctIndex: 0,
      explanationBn: "'Eradicate' মানে পুরোপুরি বিনাশ বা নির্মূল করা (উদাঃ রোগ নির্মূল)।"
    },
    practicalTipBn: "'Eradicate poverty' (দারিদ্র্য নির্মূল) অত্যন্ত জনপ্রিয় আন্তর্জাতিক স্লোগান।"
  },
  {
    pageNumber: 16,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "Abyssal Ocean Trenches",
    titleBn: "গভীর সমুদ্রের অতল রহস্য",
    theme: "মহাসমুদ্র ও জীববৈচিত্র্য",
    storyBengali: `মারিয়ানা ট্রেঞ্চের তলদেশে সূর্যের আলো কখনো পৌঁছায় না। সেই ঘুটঘুটে অন্ধকারে জীবদেহের আলো সৃষ্টি করার বিস্ময়কর ক্ষমতাকে বলে **Bioluminescence** (জৈবদ্যুতি বা জীবের আলো বিচ্ছুরণ)। গভীর সমুদ্রের তীব্র পানির চাপ সহ্য করার জন্য বিশেষ ডুবোজাহাজ বা **Submersible** (গভীর জলের নিমজ্জনযান) ব্যবহার করা হয়। সাগরের অতল খাদ বা **Trench** (সমুদ্রখাত)-এর নিচে গড়ে উঠেছে এক অদ্ভুত **Ecosystem** (বাস্তুতন্ত্র বা জীবপরিবেশ)। সেখানে বিচরণ করে অদ্ভুতদর্শন প্রাণী যাদের বিশালাকার **Tentacle** (স্পর্শী বা শুঁড়) দিয়ে তারা শিকার ধরে। পৃথিবীর বেশিরভাগ মহাসমুদ্রের তলদেশ এখনো মানুষের কাছে এক অজানা বিস্ময়।`,
    vocabulary: [
      {
        id: "p16-w1",
        word: "Bioluminescence",
        ipa: "/ˌbaɪ.oʊˌluː.məˈnes.əns/",
        banglaPronunciation: "বায়োলুমিনিসেন্স",
        partOfSpeech: "Noun",
        banglaMeaning: "জৈবরাসায়নিক বিক্রিয়ায় জীবের আলো তৈরি করার ক্ষমতা",
        synonyms: ["Living light", "Glow-in-the-dark biology"],
        antonyms: ["Darkness"],
        exampleSentence: "Deep-sea jellyfish use brilliant bioluminescence to confuse hungry predators.",
        exampleSentenceBn: "গভীর সমুদ্রের জেলিফিশ ক্ষুধার্ত শিকারীদের বিভ্রান্ত করতে উজ্জ্বল জৈবদ্যুতি ব্যবহার করে।"
      },
      {
        id: "p16-w2",
        word: "Submersible",
        ipa: "/səbˈmɝː.sə.bəl/",
        banglaPronunciation: "সাবমার্সিবল",
        partOfSpeech: "Noun",
        banglaMeaning: "গভীর সমুদ্রে গবেষণার কাজে ব্যবহৃত ছোট নিমজ্জনযান বা সাবমেরিন",
        synonyms: ["Underwater craft", "Mini-sub", "Deep-sea capsule"],
        antonyms: ["Surface ship"],
        exampleSentence: "The research submersible descended nearly eleven kilometers into the trench.",
        exampleSentenceBn: "গবেষণা নিমজ্জনযানটি সমুদ্রখাতে প্রায় এগারো কিলোমিটার নিচে নেমেছিল।"
      },
      {
        id: "p16-w3",
        word: "Trench",
        ipa: "/trentʃ/",
        banglaPronunciation: "ট্রেঞ্চ",
        partOfSpeech: "Noun",
        banglaMeaning: "গভীর খাদ বা সমুদ্রের অতল ফাটল",
        synonyms: ["Ditch", "Canyon", "Deep trough", "Chasm"],
        antonyms: ["Ridge", "Plateau"],
        exampleSentence: "The Mariana Trench is the deepest natural point discovered on Earth.",
        exampleSentenceBn: "মারিয়ানা ট্রেঞ্চ হলো পৃথিবীতে আবিষ্কৃত সবচেয়ে গভীরতম প্রাকৃতিক বিন্দু।"
      },
      {
        id: "p16-w4",
        word: "Ecosystem",
        ipa: "/ˈiː.koʊˌsɪs.təm/",
        banglaPronunciation: "ইকোসিস্টেম",
        partOfSpeech: "Noun",
        banglaMeaning: "বাস্তুতন্ত্র, জীব এবং তাদের পরিবেশের পারস্পরিক ভারসাম্য",
        synonyms: ["Environment", "Habitat network", "Biosphere"],
        antonyms: ["Artificial room"],
        exampleSentence: "Polluting river systems threatens the delicate freshwater ecosystem.",
        exampleSentenceBn: "নদীদূষণ সংবেদনশীল মিঠাপানির বাস্তুতন্ত্রকে বিপন্ন করে তোলে।"
      },
      {
        id: "p16-w5",
        word: "Tentacle",
        ipa: "/ˈten.t̬ə.kəl/",
        banglaPronunciation: "টেন্টাকল",
        partOfSpeech: "Noun",
        banglaMeaning: "অক্টোপাস বা জেলিফিশের নমনীয় শুঁড় বা স্পর্শী",
        synonyms: ["Feeler", "Arm", "Appendage"],
        antonyms: ["Limb"],
        exampleSentence: "The giant squid wrapped a strong suction-capped tentacle around the bait.",
        exampleSentenceBn: "দানব স্কুইডটি তার শক্তিশালী শুঁড় দিয়ে টোপটিকে পেঁচিয়ে ধরল।"
      }
    ],
    quiz: {
      question: "What is 'Bioluminescence'?",
      questionBn: "'Bioluminescence' এর অর্থ কী?",
      options: ["The production of light by living organisms", "A type of deep-sea submarine", "An ocean storm", "A heavy stone"],
      correctIndex: 0,
      explanationBn: "'Bioluminescence' মানে জোনাকি বা গভীর সমুদ্রের প্রাণীদের শরীর থেকে উৎপন্ন প্রাকৃতিক আলো।"
    },
    practicalTipBn: "'Delicate ecosystem' পরিবেশ সুরক্ষার আলোচনায় খুব বেশি ব্যবহৃত একটি ফ্রেজ।"
  },
  {
    pageNumber: 17,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "Renewable Energy & Climate Defense",
    titleBn: "সবুজ শক্তি ও জলবায়ু রক্ষা",
    theme: "পরিবেশ ও প্রযুক্তি",
    storyBengali: `পৃথিবীর উষ্ণায়ন রোধে জীবাশ্ম জ্বালানি বর্জন এখন সময়ের দাবি। ভবিষ্যৎ টিকে থাকার জন্য দরকার **Sustainable** (টেকসই ও পরিবেশবান্ধব) উন্নয়ন। কয়লা আর তেলের বদলে মানুষ এখন নির্ভর করছে বায়ু ও **Solar** (সৌরশক্তি)-র ওপর। ক্ষতিকর গ্রিনহাউস গ্যাসের **Emission** (নির্গমন বা বাতাসে গ্যাস ছড়ানো) শূন্যে নামিয়ে আনতে হবে। পৃথিবীর গভীরের উত্তাপ কাজে লাগাতে উন্নত হচ্ছে **Geothermal** (ভূ-তাপীয় শক্তি)। জীববৈচিত্র্য ও বনভূমি রক্ষায় প্রতিটি নাগরিকের উচিত প্রাকৃতিক সম্পদের **Conservation** (সংরক্ষণ ও অপচয় রোধ)-এ অংশ নেওয়া। ব্যক্তিগত জীবনে প্রতিটি মানুষের উচিত তাঁর কার্বন **Footprint** (কার্বন পদচিহ্ন বা পরিবেশ দূষণের মাত্রা) কমিয়ে আনা।`,
    vocabulary: [
      {
        id: "p17-w1",
        word: "Sustainable",
        ipa: "/səˈsteɪ.nə.bəl/",
        banglaPronunciation: "সাসটেইনেবল",
        partOfSpeech: "Adjective",
        banglaMeaning: "টেকসই, পরিবেশের ক্ষতি না করে দীর্ঘকাল বজায় রাখা যায় এমন",
        synonyms: ["Eco-friendly", "Renewable", "Viable", "Enduring"],
        antonyms: ["Depleting", "Destructive", "Wasteful"],
        exampleSentence: "Solar panels provide a clean, sustainable solution for residential electricity.",
        exampleSentenceBn: "সৌর প্যানেল আবাসিক বিদ্যুতের জন্য একটি পরিষ্কার ও টেকসই সমাধান প্রদান করে।"
      },
      {
        id: "p17-w2",
        word: "Emission",
        ipa: "/iˈmɪʃ.ən/",
        banglaPronunciation: "ইমিশন",
        partOfSpeech: "Noun",
        banglaMeaning: "গ্যাস বা তাপ নির্গমন, বাতাসে বিষাক্ত পদার্থ ছাড়া",
        synonyms: ["Discharge", "Release", "Exhaust", "Outflow"],
        antonyms: ["Absorption", "Containment"],
        exampleSentence: "Electric vehicles produce zero tailpipe emissions on city roads.",
        exampleSentenceBn: "বৈদ্যুতিক গাড়িগুলো শহরের রাস্তায় কোনো ক্ষতিকর ধোঁয়া নির্গমন করে না।"
      },
      {
        id: "p17-w3",
        word: "Geothermal",
        ipa: "/ˌdʒiː.oʊˈθɝː.məl/",
        banglaPronunciation: "জিওথার্মাল",
        partOfSpeech: "Adjective",
        banglaMeaning: "ভূ-তাপীয়, পৃথিবীর অভ্যন্তরীণ তাপ সংক্রান্ত",
        synonyms: ["Earth-heat based", "Thermal underground"],
        antonyms: ["Solar"],
        exampleSentence: "Iceland heats most of its cities using abundant geothermal steam.",
        exampleSentenceBn: "আইসল্যান্ড তাদের ভূগর্ভস্থ প্রচুর ভূ-তাপীয় বাষ্প ব্যবহার করে বেশিরভাগ শহর উষ্ণ রাখে।"
      },
      {
        id: "p17-w4",
        word: "Conservation",
        ipa: "/ˌkɑːn.sɚˈveɪ.ʃən/",
        banglaPronunciation: "কনজারভেশন",
        partOfSpeech: "Noun",
        banglaMeaning: "সংরক্ষণ, অপচয় রোধ ও প্রাকৃতিক সম্পদের রক্ষা",
        synonyms: ["Preservation", "Protection", "Safeguarding"],
        antonyms: ["Destruction", "Wastefulness", "Exploitation"],
        exampleSentence: "Water conservation should be practiced daily to save future generations.",
        exampleSentenceBn: "ভবিষ্যৎ প্রজন্মকে বাঁচাতে প্রতিদিন পানি অপচয় রোধ ও সংরক্ষণ চর্চা করা উচিত।"
      },
      {
        id: "p17-w5",
        word: "Footprint",
        ipa: "/ˈfʊt.prɪnt/",
        banglaPronunciation: "ফুটপ্রিন্ট",
        partOfSpeech: "Noun",
        banglaMeaning: "পদচিহ্ন (বিশেষত কার্বন পদচিহ্ন - কোনো কাজের পরিবেশগত প্রভাব)",
        synonyms: ["Impact mark", "Environmental trace"],
        antonyms: ["Zero trace"],
        exampleSentence: "Planting trees and cycling reduces your overall carbon footprint.",
        exampleSentenceBn: "গাছ লাগানো এবং সাইকেল চালানো আপনার সামগ্রিক কার্বন পদচিহ্ন কমিয়ে আনে।"
      }
    ],
    quiz: {
      question: "Which adjective means 'able to be maintained at a certain rate or level without exhausting natural resources'?",
      questionBn: "কোন বিশেষণের অর্থ 'প্রাকৃতিক সম্পদ শেষ না করে দীর্ঘকাল বজায় রাখার উপযোগী'?",
      options: ["Emission", "Sustainable", "Geothermal", "Subatomic"],
      correctIndex: 1,
      explanationBn: "'Sustainable' মানে টেকসই এবং দীর্ঘমেয়াদে পরিবেশবান্ধব।"
    },
    practicalTipBn: "'Sustainable development' (টেকসই উন্নয়ন) আধুনিক বিশ্ব অর্থনীতি ও শিক্ষার মূল চাবিকাঠি।"
  },
  {
    pageNumber: 18,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "Nanotechnology in Medicine",
    titleBn: "ন্যানো প্রযুক্তির অলৌকিক চিকিৎসা",
    theme: "চিকিৎসা ও প্রযুক্তি",
    storyBengali: `চিকিৎসাবিজ্ঞানের ভবিষ্যৎ লুকিয়ে আছে পরমাণুর মাপকাঠিতে। ন্যানো রোবটগুলো এতই **Microscopic** (অণুবীক্ষণিক বা খালি চোখে অদৃশ্য) যে তারা রক্তের লোহিত কণিকার চেয়েও ছোট। এগুলো ক্যানসার আক্রান্ত কোষকে সরাসরি **Targeted** (সুনির্দিষ্ট লক্ষ্যবস্তু করা) পদ্ধতিতে আক্রমণ করে। রক্তনালীর ভেতর দিয়ে সুনির্দিষ্ট **Molecule** (অণু বা পদার্থের ক্ষুদ্রতম কণা) বহন করে ওষুধ পৌঁছে দেয়। এই ধরণের চিকিৎসা রোগীদের জন্য অনেক বেশি **Therapeutic** (রোগ নিরাময়কারী ও উপশমকারী)। অস্ত্রোপচারে লেজারের চেয়েও বেশি **Precision** (নিখুঁত সূক্ষ্মতা) অর্জন সম্ভব হচ্ছে। ফলে ক্ষতিকর কোষকে সহজে **Cellular** (কোষীয়) স্তরেই ধ্বংস করা যায়।`,
    vocabulary: [
      {
        id: "p18-w1",
        word: "Microscopic",
        ipa: "/ˌmaɪ.krəˈskɑː.pɪk/",
        banglaPronunciation: "মাইক্রোস্কোপিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "অণুবীক্ষণিক, খালি চোখে দেখা যায় না এমন অত্যন্ত ক্ষুদ্র",
        synonyms: ["Infinitesimal", "Minute", "Minuscule", "Tiny"],
        antonyms: ["Macroscopic", "Huge", "Enormous"],
        exampleSentence: "Bacteria are microscopic organisms invisible without magnification.",
        exampleSentenceBn: "ব্যাকটেরিয়া হলো অণুবীক্ষণিক জীব যা অণুবীক্ষণ যন্ত্র ছাড়া দেখা যায় না।"
      },
      {
        id: "p18-w2",
        word: "Molecule",
        ipa: "/ˈmɑː.lɪ.kjuːl/",
        banglaPronunciation: "মলিকিউল",
        partOfSpeech: "Noun",
        banglaMeaning: "অণু, দুই বা ততোধিক পরমাণুর বন্ধনে গঠিত ক্ষুদ্রতম রূপ",
        synonyms: ["Particle", "Chemical unit"],
        antonyms: ["Compound bulk"],
        exampleSentence: "A water molecule is composed of two hydrogen atoms and one oxygen atom.",
        exampleSentenceBn: "পানির একটি অণু দুটি হাইড্রোজেন পরমাণু এবং একটি অক্সিজেন পরমাণু দিয়ে গঠিত।"
      },
      {
        id: "p18-w3",
        word: "Therapeutic",
        ipa: "/ˌθer.əˈpjuː.t̬ɪk/",
        banglaPronunciation: "থেরাপিউটিক",
        partOfSpeech: "Adjective",
        banglaMeaning: "রোগ নিরাময়কারী, আরোগ্যজনক, স্বাস্থ্যবর্ধক",
        synonyms: ["Curative", "Healing", "Remedial", "Medicinal"],
        antonyms: ["Harmful", "Toxic", "Damaging"],
        exampleSentence: "Listening to gentle classical music has a deeply therapeutic effect on stress.",
        exampleSentenceBn: "মৃদু ধ্রুপদী সংগীত শোনা মানসিক চাপের ওপর অত্যন্ত উপশমকারী প্রভাব ফেলে।"
      },
      {
        id: "p18-w4",
        word: "Precision",
        ipa: "/prəˈsɪʒ.ən/",
        banglaPronunciation: "প্রিসিশন",
        partOfSpeech: "Noun",
        banglaMeaning: "নিখুঁত সূক্ষ্মতা, সঠিক পরিমাপ",
        synonyms: ["Accuracy", "Exactness", "Meticulousness"],
        antonyms: ["Inaccuracy", "Vagueness", "Carelessness"],
        exampleSentence: "The watchmaker assembled the gears with breathtaking precision.",
        exampleSentenceBn: "ঘড়ি নির্মাতা শ্বাসরুদ্ধকর নিখুঁত সূক্ষ্মতায় চাকাগুলো জোড়া লাগালেন।"
      },
      {
        id: "p18-w5",
        word: "Cellular",
        ipa: "/ˈsel.jə.lɚ/",
        banglaPronunciation: "সেলুলার",
        partOfSpeech: "Adjective",
        banglaMeaning: "কোষীয়, জীবদেহের কোষসংক্রান্ত",
        synonyms: ["Pertaining to cells", "Micro-structural"],
        antonyms: ["Acellular"],
        exampleSentence: "Antioxidants protect human cellular walls from free radical damage.",
        exampleSentenceBn: "অ্যান্টিঅক্সিডেন্ট মানুষের কোষের প্রাচীরকে ক্ষতির হাত থেকে রক্ষা করে।"
      }
    ],
    quiz: {
      question: "Which adjective means 'relating to the healing or curing of disease'?",
      questionBn: "কোন বিশেষণের অর্থ 'রোগ নিরাময় বা আরোগ্য লাভে সহায়ক'?",
      options: ["Therapeutic", "Microscopic", "Cellular", "Molecule"],
      correctIndex: 0,
      explanationBn: "'Therapeutic' মানে নিরাময়কারী বা মানসিক/শারীরিক স্বস্তি ও আরোগ্য দেয় এমন।"
    },
    practicalTipBn: "'Therapeutic' শব্দটি কোনো ভালো অভ্যাসের ক্ষেত্রেও বলা যায়: 'Gardening is therapeutic for me.'"
  },
  {
    pageNumber: 19,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "Cybersecurity and Digital Walls",
    titleBn: "সাইবার নিরাপত্তা ও ডিজিটাল জগৎ",
    theme: "আইটি ও সাইবার সুরক্ষা",
    storyBengali: `ইন্টারনেটের জগতে অদৃশ্য এক যুদ্ধ চলছে প্রতিদিন। ব্যাংকিং নেটওয়ার্ক রক্ষায় স্থাপন করা হয় শক্তিশালী ডিজিটাল **Firewall** (ফায়ারওয়াল বা নিরাপত্তা প্রাচীর)। ব্যবহারকারীর গোপন পাসওয়ার্ড রক্ষায় ব্যবহৃত হয় মিলিটারি-গ্রেড **Encryption** (তথ্য এনক্রিপশন বা সংকেতায়ন)। হ্যাকাররা সবসময় সফটওয়্যারের কোনো একটি গোপন **Vulnerability** (দুর্বলতা বা নিরাপত্তাহীন ফাঁকফোকড়) খোঁজে। কোনো নিরাপত্তা প্রাচীর ভেঙে ফেললে তাকে বলা হয় ডেটা **Breach** (লঙ্ঘন বা অনুপ্রবেশ)। অনলাইনে ব্যবহারকারীদের পরিচয় গোপন রাখাকে বলে **Anonymity** (নামহীনতা বা বেনামি অবস্থা)। জাল ইমেইল পাঠিয়ে তথ্য চুরির কৌশলকে বলে **Phishing** (ফিশিং প্রতারণা)। তাই ডিজিটাল জগতে সবাইকে সব সময় থাকতে হয় অত্যন্ত **Vigilant** (সতর্ক ও সদা সজাগ)।`,
    vocabulary: [
      {
        id: "p19-w1",
        word: "Firewall",
        ipa: "/ˈfaɪr.wɑːl/",
        banglaPronunciation: "ফায়ারওয়াল",
        partOfSpeech: "Noun",
        banglaMeaning: "কম্পিউটার বা নেটওয়ার্কের সুরক্ষার নিরাপত্তা প্রাচীর",
        synonyms: ["Digital barrier", "Network shield", "Protective gate"],
        antonyms: ["Open port"],
        exampleSentence: "The company's firewall successfully blocked the unauthorized intrusion.",
        exampleSentenceBn: "প্রতিষ্ঠানের ফায়ারওয়াল অননুমোদিত অনুপ্রবেশ সফলভাবে ঠেকিয়ে দিয়েছিল।"
      },
      {
        id: "p19-w2",
        word: "Vulnerability",
        ipa: "/ˌvʌl.nɚ.əˈbɪl.ə.t̬i/",
        banglaPronunciation: "ভালনারাবিলিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "দুর্বলতা, আক্রান্ত হওয়ার ঝুঁকি বা ক্ষতিকর ফাঁক",
        synonyms: ["Weakness", "Flaw", "Susceptibility", "Exposed state"],
        antonyms: ["Invulnerability", "Strength", "Defense"],
        exampleSentence: "Developers immediately issued an urgent patch to fix the software vulnerability.",
        exampleSentenceBn: "সফটওয়্যারের দুর্বলতা সারাতে ডেভেলপাররা অবিলম্বে একটি জরুরি প্যাচ প্রকাশ করলেন।"
      },
      {
        id: "p19-w3",
        word: "Breach",
        ipa: "/briːtʃ/",
        banglaPronunciation: "ব্রিচ",
        partOfSpeech: "Noun",
        banglaMeaning: "লঙ্ঘন, প্রাচীর ভেঙে অনুপ্রবেশ, নিয়মভঙ্গ",
        synonyms: ["Rupture", "Violation", "Infraction", "Break-in"],
        antonyms: ["Compliance", "Observation", "Closure"],
        exampleSentence: "The security breach exposed thousands of private customer records.",
        exampleSentenceBn: "নিরাপত্তা লঙ্ঘনের ফলে হাজার হাজার গ্রাহকের ব্যক্তিগত তথ্য ফাঁস হয়ে যায়।"
      },
      {
        id: "p19-w4",
        word: "Anonymity",
        ipa: "/ˌæn.əˈnɪm.ə.t̬i/",
        banglaPronunciation: "অ্যানোনিমিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "নামহীনতা, গোপন পরিচয়, বেনামি অবস্থা",
        synonyms: ["Namelessness", "Secrecy", "Invisibility"],
        antonyms: ["Fame", "Prominence", "Public identity"],
        exampleSentence: "Whistleblowers frequently request anonymity to protect their personal safety.",
        exampleSentenceBn: "তথ্যফাঁসকারীরা প্রায়শই তাদের ব্যক্তিগত নিরাপত্তার জন্য নাম গোপন রাখার অনুরোধ জানান।"
      },
      {
        id: "p19-w5",
        word: "Vigilant",
        ipa: "/ˈvɪdʒ.əl.ənt/",
        banglaPronunciation: "ভিজিল্যান্ট",
        partOfSpeech: "Adjective",
        banglaMeaning: "সদা সতর্ক, বিপদের আশঙ্কায় সজাগ ও পাহারাশীল",
        synonyms: ["Watchful", "Alert", "Attentive", "Cautious"],
        antonyms: ["Careless", "Negligent", "Unwary"],
        exampleSentence: "Stay vigilant against suspicious links sent from unknown email addresses.",
        exampleSentenceBn: "অপরিচিত ইমেইল ঠিকানা থেকে পাঠানো সন্দেহজনক লিংকের ব্যাপারে সদা সতর্ক থাকুন।"
      }
    ],
    quiz: {
      question: "Which adjective means 'keeping careful watch for possible danger or difficulties'?",
      questionBn: "কোন বিশেষণের অর্থ 'সম্ভাব্য বিপদের ব্যাপারে সদাসতর্ক ও পাহারাশীল'?",
      options: ["Vulnerable", "Vigilant", "Anonymous", "Microscopic"],
      correctIndex: 1,
      explanationBn: "'Vigilant' মানে সবসময় সতর্ক দৃষ্টি রাখা বা সদা সজাগ থাকা।"
    },
    practicalTipBn: "'Stay vigilant' কথাটি যে কাউকে সতর্ক থাকতে উপদেশ দেওয়ার সময় অত্যন্ত চমৎকার বাক্য।"
  },
  {
    pageNumber: 20,
    chapterNumber: 2,
    chapterTitle: "Science, Cosmos & Future Tech",
    chapterTitleBn: "বিজ্ঞান, মহাকাশ ও ভবিষ্যৎ প্রযুক্তি",
    title: "Robotic Surgery & Medicine",
    titleBn: "রোবোটিক অস্ত্রোপচার ও স্বাস্থ্য",
    theme: "মেডিকেল প্রযুক্তি",
    storyBengali: `অপারেশন থিয়েটারে এখন মানুষের হাতের চেয়েও সূক্ষ্ম কাজ করছে রোবটের যান্ত্রিক বাহু। রোগীর শরীরে বড় কোনো কাটার দরকার নেই, মাত্র কয়েক মিলিমিটারের ক্ষুদ্র **Incision** (চিকিৎসা বিজ্ঞানে অঙ্গ কাটার দাগ বা ছিদ্র) দিয়ে ক্যামেরা প্রবেশ করানো হয়। দূর নিয়ন্ত্রিত কনসোলে বসে অভিজ্ঞ প্রধান **Surgeon** (শল্যচিকিৎসক বা সার্জন) মনিটরে ত্রিমাত্রিক দৃশ্য দেখে কাজ করেন। এই রোবটগুলো কাঁপনহীন অবিশ্বাস্য **Dexterity** (হাতের নিখুঁত দক্ষতা ও চটপটে নৈপুণ্য) প্রদর্শন করে। কাটাছেঁড়া কম হওয়ায় রোগীর অপারেশনের পর **Recovery** (সুস্থ হয়ে ওঠা বা আরোগ্য লাভ) হয় অবিশ্বাস্য দ্রুত। অপারেশন থিয়েটারের প্রতিটি যন্ত্রপাতি থাকে শতভাগ **Sterile** (জীবাণুমুক্ত ও সম্পূর্ণ পরিচ্ছন্ন)।`,
    vocabulary: [
      {
        id: "p20-w1",
        word: "Incision",
        ipa: "/ɪnˈsɪʒ.ən/",
        banglaPronunciation: "ইনসিশন",
        partOfSpeech: "Noun",
        banglaMeaning: "অস্ত্রোপচারের জন্য চামড়া বা অঙ্গে দেওয়া নিখুঁত কাট",
        synonyms: ["Surgical cut", "Slit", "Gash"],
        antonyms: ["Suture", "Stitch"],
        exampleSentence: "The surgeon made a clean incision below the patient's rib cage.",
        exampleSentenceBn: "সার্জন রোগীর পাঁজরের নিচে একটি নিখুঁত ও পরিষ্কার অস্ত্রোপচারের কাট দিলেন।"
      },
      {
        id: "p20-w2",
        word: "Surgeon",
        ipa: "/ˈsɝː.dʒən/",
        banglaPronunciation: "সার্জন",
        partOfSpeech: "Noun",
        banglaMeaning: "শল্যচিকিৎসক, যিনি অস্ত্রোপচার করেন",
        synonyms: ["Doctor", "Operating specialist"],
        antonyms: ["Patient"],
        exampleSentence: "The neurosurgeon delicately removed the benign brain tumor.",
        exampleSentenceBn: "নিউরোসার্জন অত্যন্ত সতর্কতার সাথে নির্দোষ ব্রেন টিউমারটি অপসারণ করলেন।"
      },
      {
        id: "p20-w3",
        word: "Dexterity",
        ipa: "/dekˈster.ə.t̬i/",
        banglaPronunciation: "ডেক্সটেরিটি",
        partOfSpeech: "Noun",
        banglaMeaning: "হাতের চটপটে দক্ষতা, ক্ষিপ্রতা ও কর্মকুশলতা",
        synonyms: ["Agility", "Adroitness", "Nimbleness", "Skill"],
        antonyms: ["Clumsiness", "Awkwardness"],
        exampleSentence: "Pianists develop amazing finger dexterity through years of regular practice.",
        exampleSentenceBn: "পিয়ানোবাদকরা বছরের পর বছর নিয়মিত চর্চার মাধ্যমে আঙ্গুলের অসাধারণ দক্ষতা অর্জন করেন।"
      },
      {
        id: "p20-w4",
        word: "Recovery",
        ipa: "/rɪˈkʌv.ɚ.i/",
        banglaPronunciation: "রিকভারি",
        partOfSpeech: "Noun",
        banglaMeaning: "পুনরুদ্ধার, রোগ বা আঘাত থেকে সুস্থ হয়ে ওঠা",
        synonyms: ["Recuperation", "Healing", "Rehabilitation"],
        antonyms: ["Relapse", "Deterioration"],
        exampleSentence: "With ample rest and nutritious food, she made a swift recovery from illness.",
        exampleSentenceBn: "পর্যাপ্ত বিশ্রাম ও পুষ্টিকর খাবারের মাধ্যমে তিনি রোগ থেকে দ্রুত সুস্থ হয়ে উঠলেন।"
      },
      {
        id: "p20-w5",
        word: "Sterile",
        ipa: "/ˈster.əl/",
        banglaPronunciation: "স্টেরাইল",
        partOfSpeech: "Adjective",
        banglaMeaning: "জীবাণুমুক্ত, সম্পূর্ণ পরিষ্কার; বন্ধ্যা বা অনুৎপাদনশীল",
        synonyms: ["Sanitized", "Disinfected", "Aseptic", "Germ-free"],
        antonyms: ["Contaminated", "Infected", "Dirty"],
        exampleSentence: "All surgical instruments must be kept strictly sterile before the operation.",
        exampleSentenceBn: "অস্ত্রোপচারের আগে সব ধরনের অস্ত্রোপচার সরঞ্জাম কঠোরভাবে জীবাণুমুক্ত রাখতে হবে।"
      }
    ],
    quiz: {
      question: "Which noun means 'skill in performing tasks, especially with the hands'?",
      questionBn: "কোন বিশেষ্যটি 'বিশেষ করে হাত দিয়ে কোনো কাজে অসাধারণ দক্ষতা বা নৈপুণ্য' বোঝায়?",
      options: ["Incision", "Dexterity", "Sterile", "Recovery"],
      correctIndex: 1,
      explanationBn: "'Dexterity' মানে হাতের ক্ষিপ্রতা, দক্ষতা ও চমৎকার নৈপুণ্য।"
    },
    practicalTipBn: "'Speedy recovery' বহুল ব্যবহৃত একটি দোয়া বা শুভেচ্ছা: 'Wishing you a speedy recovery!'"
  }
];
