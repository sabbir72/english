import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  Search,
  Filter,
  Plus,
  Mic,
  MicOff,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Trash2,
  X,
  Target,
  Flame,
  Layers,
  HelpCircle,
  Wand2,
} from 'lucide-react';
import {
  speakText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
} from '../utils/speech';
import {
  ReadingStory,
  ALL_READING_STORIES,
  READING_TOPIC_CATEGORIES,
  DYNAMIC_STORY_TEMPLATES,
} from '../data/readingStoriesData';
import { OXFORD_PREVIEW_LIST } from '../data/oxford3000Meta';
import { COMPREHENSIVE_VOCABULARY_LIST } from '../data/vocabularyData';

export type { ReadingStory };

// Fast dictionary lookup map built once from Oxford 3000 and Comprehensive Vocab
interface DictEntry {
  word: string;
  meaning: string;
  ipa?: string;
  pron?: string;
  pos?: string;
}

const DICTIONARY_MAP: Record<string, DictEntry> = {};

// Populate dictionary map
(() => {
  for (const item of COMPREHENSIVE_VOCABULARY_LIST) {
    const key = item.word.toLowerCase().trim();
    if (!DICTIONARY_MAP[key]) {
      DICTIONARY_MAP[key] = {
        word: item.word,
        meaning: item.banglaMeaning,
        ipa: item.ipa,
        pron: item.pronunciation,
        pos: item.partOfSpeech,
      };
    }
  }
  for (const item of OXFORD_PREVIEW_LIST) {
    const key = item.word.toLowerCase().trim();
    if (!DICTIONARY_MAP[key]) {
      DICTIONARY_MAP[key] = {
        word: item.word,
        meaning: item.bangla,
        ipa: item.ipa,
        pron: item.banglaPronunciation,
        pos: item.pos,
      };
    }
  }
})();

interface ReadingSectionProps {
  onAwardXP?: (amount: number, reason?: string) => void;
  onSaveWord?: (word: string, meaning: string) => void;
}

type ReadingMode = 'dual' | 'focus' | 'shadowing' | 'listen';
type StoryFilterTab = 'all' | 'bookmarked' | 'completed' | 'custom';

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  onAwardXP,
  onSaveWord,
}) => {
  // Custom user stories loaded from localStorage
  const [customStories, setCustomStories] = useState<ReadingStory[]>(() => {
    try {
      const saved = localStorage.getItem('user_custom_reading_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combine default stories and custom stories
  const allStories = useMemo(() => {
    return [...customStories, ...ALL_READING_STORIES];
  }, [customStories]);

  // Persistent bookmarks and completion status
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('reading_bookmarked_ids');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedStories, setCompletedStories] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('reading_completed_ids');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active Story & Navigation State
  const [selectedStoryId, setSelectedStoryId] = useState<string>(() => {
    return allStories[0]?.id || 'story-1';
  });

  // Display & Mode Preferences
  const [readingMode, setReadingMode] = useState<ReadingMode>('dual');
  const [showBangla, setShowBangla] = useState(true);
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0);
  const [speechAccent, setSpeechAccent] = useState<'US' | 'UK'>('US');

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingParagraphIndex, setPlayingParagraphIndex] = useState<number | null>(null);

  // Focus & Shadowing Mode Sentence Index
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Shadowing Speaking State
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [speechMatchScore, setSpeechMatchScore] = useState<number | null>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Ear training revealed paragraphs
  const [revealedParagraphs, setRevealedParagraphs] = useState<Record<number, boolean>>({});

  // Word Inspector Modal / Card
  const [selectedWord, setSelectedWord] = useState<DictEntry | null>(null);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  // Filter & Search Controls
  const [activeFilterTab, setActiveFilterTab] = useState<StoryFilterTab>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Dynamic Creator Modal State
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [creatorTab, setCreatorTab] = useState<'preset' | 'custom'>('preset');
  const [customTitle, setCustomTitle] = useState('');
  const [customTitleBn, setCustomTitleBn] = useState('');
  const [customCategory, setCustomCategory] = useState('Daily Life');
  const [customLevel, setCustomLevel] = useState<'Beginner' | 'Elementary' | 'Intermediate'>('Elementary');
  const [customTextEn, setCustomTextEn] = useState('');
  const [customTextBn, setCustomTextBn] = useState('');
  const [creatorSuccessToast, setCreatorSuccessToast] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('user_custom_reading_stories', JSON.stringify(customStories));
  }, [customStories]);

  useEffect(() => {
    localStorage.setItem('reading_bookmarked_ids', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem('reading_completed_ids', JSON.stringify(completedStories));
  }, [completedStories]);

  // Filtered stories calculation
  const filteredStories = useMemo(() => {
    return allStories.filter((story) => {
      // Tab filter
      if (activeFilterTab === 'bookmarked' && !bookmarkedIds[story.id]) return false;
      if (activeFilterTab === 'completed' && !completedStories[story.id]) return false;
      if (activeFilterTab === 'custom' && !story.id.startsWith('custom-')) return false;

      // Category filter
      if (selectedCategory !== 'all' && story.category !== selectedCategory) return false;

      // Level filter
      if (levelFilter !== 'all' && story.level !== levelFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle =
          story.title.toLowerCase().includes(q) ||
          story.titleBangla.toLowerCase().includes(q);
        const inContent = story.englishContent.some((p) => p.toLowerCase().includes(q));
        const inVocab = story.keyVocab.some(
          (v) => v.word.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q)
        );
        if (!inTitle && !inContent && !inVocab) return false;
      }

      return true;
    });
  }, [
    allStories,
    activeFilterTab,
    bookmarkedIds,
    completedStories,
    selectedCategory,
    levelFilter,
    searchQuery,
  ]);

  // Active Story
  const currentStory = useMemo(() => {
    return (
      allStories.find((s) => s.id === selectedStoryId) ||
      filteredStories[0] ||
      allStories[0]
    );
  }, [allStories, selectedStoryId, filteredStories]);

  // Flattened Sentences for Focus & Shadowing Modes
  const storySentences = useMemo(() => {
    if (!currentStory) return [];
    const list: { textEn: string; textBn: string; pIdx: number }[] = [];

    currentStory.englishContent.forEach((para, pIdx) => {
      // Split paragraph into sentences
      const rawSentences = para
        .split(/(?<=[.?!])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      // Pair roughly with bangla content
      const banglaPara = currentStory.banglaContent[pIdx] || '';
      const rawBanglaSentences = banglaPara
        .split(/(?<=[।?!])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      rawSentences.forEach((en, sIdx) => {
        list.push({
          textEn: en,
          textBn: rawBanglaSentences[sIdx] || banglaPara,
          pIdx,
        });
      });
    });

    return list;
  }, [currentStory]);

  // Clean sentence currently active in focus mode
  const currentSentence = storySentences[currentSentenceIndex] || storySentences[0];

  // Stop speaking and reset when story changes
  const handleSelectStory = (storyId: string) => {
    stopSpeaking();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    setIsPlayingAudio(false);
    setPlayingParagraphIndex(null);
    setSelectedStoryId(storyId);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setSelectedWord(null);
    setRevealedParagraphs({});
    setCurrentSentenceIndex(0);
    setSpeechTranscript('');
    setSpeechMatchScore(null);
  };

  // Toggle bookmark
  const handleToggleBookmark = (storyId: string) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  // Toggle completed story
  const handleToggleCompleted = (storyId: string) => {
    const isNowDone = !completedStories[storyId];
    setCompletedStories((prev) => ({
      ...prev,
      [storyId]: isNowDone,
    }));
    if (isNowDone && onAwardXP) {
      onAwardXP(25, 'পড়া সম্পন্ন করার বোনাস');
    }
  };

  // Play full story
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

  // Play single paragraph
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

  // Play single sentence (Focus / Shadowing mode)
  const handlePlayCurrentSentence = (speed?: number) => {
    if (!currentSentence) return;
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(currentSentence.textEn, speechAccent, speed || speechSpeed, () => {
      setIsPlayingAudio(false);
      if (autoAdvance && currentSentenceIndex < storySentences.length - 1) {
        setCurrentSentenceIndex((prev) => prev + 1);
        setSpeechTranscript('');
        setSpeechMatchScore(null);
      }
    });
  };

  // Interactive Word Click (Checks key vocab -> dictionary -> generic)
  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').trim().toLowerCase();
    if (!cleanWord) return;

    // Check key vocabulary in current story
    const keyMatch = currentStory.keyVocab.find((v) => v.word.toLowerCase() === cleanWord);
    if (keyMatch) {
      setSelectedWord({
        word: keyMatch.word,
        meaning: keyMatch.meaning,
        ipa: keyMatch.ipa,
        pron: keyMatch.banglaPronunciation,
        pos: keyMatch.pos,
      });
      speakText(keyMatch.word, speechAccent, 0.9);
      return;
    }

    // Check fast pre-built dictionary map
    const dictMatch = DICTIONARY_MAP[cleanWord];
    if (dictMatch) {
      setSelectedWord(dictMatch);
      speakText(dictMatch.word, speechAccent, 0.9);
      return;
    }

    // Fallback word entry
    setSelectedWord({
      word: cleanWord,
      meaning: 'ক্লিক করা শব্দের অর্থ দেখতে শব্দভাণ্ডার বা ডিকশনারি বুক দেখুন',
    });
    speakText(cleanWord, speechAccent, 0.9);
  };

  // Save word to personal dictionary
  const handleToggleSaveVocab = (word: string, meaning: string) => {
    const isNowSaved = !savedWords[word];
    setSavedWords((prev) => ({ ...prev, [word]: isNowSaved }));
    if (isNowSaved && onSaveWord) {
      onSaveWord(word, meaning);
    }
  };

  // Shadowing Voice Recording & Matching
  const handleStartRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    setSpeechTranscript('');
    setSpeechMatchScore(null);

    const rec = startSpeechRecognition(
      (result) => {
        setSpeechTranscript(result.transcript);
        if (result.isFinal && currentSentence) {
          // Calculate similarity score
          const score = calculateSentenceMatch(currentSentence.textEn, result.transcript);
          setSpeechMatchScore(score);
          if (score >= 70 && onAwardXP) {
            onAwardXP(15, 'শ্যাডোয়িং স্পিকিং নির্ভুলতার জন্য');
          }
        }
      },
      (error) => {
        console.warn('Speech recognition warning:', error);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (rec) {
      recognitionRef.current = rec;
      setIsRecording(true);
    }
  };

  // Word match calculation
  const calculateSentenceMatch = (target: string, spoken: string): number => {
    const cleanTarget = target
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
      .split(/\s+/)
      .filter(Boolean);
    const cleanSpoken = spoken
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
      .split(/\s+/)
      .filter(Boolean);

    if (cleanTarget.length === 0 || cleanSpoken.length === 0) return 0;

    let matches = 0;
    cleanTarget.forEach((word) => {
      if (cleanSpoken.includes(word)) {
        matches++;
      }
    });

    const score = Math.round((matches / cleanTarget.length) * 100);
    return Math.min(100, Math.max(0, score));
  };

  // Quiz submission
  const handleSelectQuizOption = (optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedOption(optIdx);
    setQuizSubmitted(true);
    if (optIdx === currentStory.comprehensionQuestion.correctIndex) {
      if (onAwardXP) onAwardXP(20, 'রিডিং কুইজে সঠিক উত্তরের জন্য');
      handleToggleCompleted(currentStory.id);
    }
  };

  // Create Story from Template
  const handleCreateFromTemplate = (template: typeof DYNAMIC_STORY_TEMPLATES[0]) => {
    const newStory: ReadingStory = {
      id: `custom-${Date.now()}`,
      title: template.title,
      titleBangla: template.titleBn,
      level: template.level,
      readTime: template.readTime,
      category: template.category,
      categoryBangla: template.categoryBn,
      englishContent: template.sampleContentEn,
      banglaContent: template.sampleContentBn,
      keyVocab: template.keyVocab,
      comprehensionQuestion: template.comprehensionQuestion,
    };

    setCustomStories((prev) => [newStory, ...prev]);
    setSelectedStoryId(newStory.id);
    setIsCreatorOpen(false);
    setCreatorSuccessToast(true);
    setTimeout(() => setCreatorSuccessToast(false), 3000);
    if (onAwardXP) onAwardXP(15, 'নতুন রিডিং পাঠ তৈরি করার জন্য');
  };

  // Create Story from User's Custom Text
  const handleCreateCustomTextStory = () => {
    if (!customTitle.trim() || !customTextEn.trim()) return;

    // Split paragraphs
    const parasEn = customTextEn
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const parasBn = customTextBn.trim()
      ? customTextBn
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean)
      : parasEn.map(() => 'বাংলা অনুবাদ শীঘ্রই প্রস্তুত হচ্ছে।');

    // Extract potential key vocabulary
    const words = customTextEn
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 5);
    const uniqueWords: string[] = Array.from(new Set<string>(words.map((w) => w.toLowerCase()))).slice(0, 5);

    const extractedVocab = uniqueWords.map((w: string) => {
      const match = DICTIONARY_MAP[w];
      return {
        word: w,
        ipa: match?.ipa || '/-/',
        banglaPronunciation: match?.pron || w,
        meaning: match?.meaning || 'কাস্টম পাঠের শব্দ',
        pos: match?.pos || 'noun',
      };
    });

    const newStory: ReadingStory = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      titleBangla: customTitleBn.trim() || customTitle.trim(),
      level: customLevel,
      readTime: `${Math.max(2, Math.ceil(customTextEn.split(' ').length / 80))} min`,
      category: customCategory,
      categoryBangla: customCategory,
      englishContent: parasEn,
      banglaContent: parasBn,
      keyVocab: extractedVocab,
      comprehensionQuestion: {
        question: `What is the main topic of "${customTitle.trim()}"?`,
        questionBangla: `"${customTitleBn.trim() || customTitle.trim()}" গল্পের মূল প্রতিপাদ্য কী?`,
        options: [
          customTitle.trim(),
          'Unrelated general discussion',
          'History of science',
          'A casual breakfast chat',
        ],
        correctIndex: 0,
        explanationBangla: 'আপনার তৈরি পাঠের মূল বিষয়ের সাথে এটি সরাসরি সামঞ্জস্যপূর্ণ।',
      },
    };

    setCustomStories((prev) => [newStory, ...prev]);
    setSelectedStoryId(newStory.id);
    setIsCreatorOpen(false);
    setCustomTitle('');
    setCustomTitleBn('');
    setCustomTextEn('');
    setCustomTextBn('');
    setCreatorSuccessToast(true);
    setTimeout(() => setCreatorSuccessToast(false), 3000);
    if (onAwardXP) onAwardXP(20, 'কাস্টম রিডিং পাঠ যুক্ত করার জন্য');
  };

  // Delete custom story
  const handleDeleteCustomStory = (storyId: string) => {
    if (confirm('আপনি কি এই কাস্টম পাঠটি মুছে ফেলতে চান?')) {
      setCustomStories((prev) => prev.filter((s) => s.id !== storyId));
      if (selectedStoryId === storyId) {
        setSelectedStoryId(ALL_READING_STORIES[0].id);
      }
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Notification */}
      {creatorSuccessToast && (
        <div className="fixed top-20 right-4 z-50 rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-xl flex items-center gap-2 animate-bounce text-xs font-bold">
          <CheckCircle2 className="h-4 w-4" />
          <span>নতুন পাঠ সফলভাবে তৈরি ও লাইব্রেরিতে যোগ করা হয়েছে!</span>
        </div>
      )}

      {/* Header Banner & Interactive Lab Controller */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/60 p-6 sm:p-8 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/90 dark:bg-indigo-950/90 px-3.5 py-1 text-xs font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
              <Headphones className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>
                Dynamic Reading & Listening Lab • {allStories.length} Topics (
                {customStories.length} Custom)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              লিসেনিং, রিডিং ও শ্যাডোয়িং ল্যাব (Interactive Fluency Studio)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans max-w-2xl">
              আইইএলটিএস, স্টার্টআপ, মহাকাশ, ফ্রিল্যান্সিং ও দৈনন্দিন জীবনের আধুনিক গল্প পড়ুন। যেকোনো শব্দে ক্লিক করলেই তাৎক্ষণিক ফোনেটিক্স ও বাংলা অর্থ জানুন।
            </p>
          </div>

          {/* Quick Action Control Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Create / Import Story Button */}
            <button
              onClick={() => setIsCreatorOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ নতুন পাঠ তৈরি / ইমপোর্ট</span>
            </button>

            {/* Master Audio Button */}
            <button
              onClick={handlePlayFullStory}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs border cursor-pointer ${
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

        {/* Dynamic Mode Switcher Strip */}
        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
              পড়ার মোড:
            </span>

            {[
              { id: 'dual', label: 'দ্বিভাষিক ভিউ (Dual)', icon: <Layers className="h-3.5 w-3.5" /> },
              { id: 'focus', label: 'বাক্য ফোকাস (Focus)', icon: <Target className="h-3.5 w-3.5" /> },
              { id: 'shadowing', label: 'শ্যাডোয়িং ও স্পিকিং (Mic)', icon: <Mic className="h-3.5 w-3.5" /> },
              { id: 'listen', label: 'লিসেনিং টেস্ট (Ear)', icon: <Ear className="h-3.5 w-3.5" /> },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setReadingMode(m.id as ReadingMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  readingMode === m.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Audio Speed & Accent Controls */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Speed selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-medium">গতি:</span>
              {[
                { label: '0.8x', val: 0.8 },
                { label: '1.0x', val: 1.0 },
                { label: '1.2x', val: 1.2 },
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setSpeechSpeed(s.val)}
                  className={`px-2 py-0.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    speechSpeed === s.val
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Accent selector */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-medium">উচ্চারণ:</span>
              <button
                onClick={() => setSpeechAccent('US')}
                className={`px-2 py-0.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  speechAccent === 'US'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                US
              </button>
              <button
                onClick={() => setSpeechAccent('UK')}
                className={`px-2 py-0.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  speechAccent === 'UK'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                UK
              </button>
            </div>

            {/* Translation toggle */}
            <button
              onClick={() => setShowBangla(!showBangla)}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer hover:text-indigo-600"
            >
              {showBangla ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              <span>{showBangla ? 'অনুবাদ চালু' : 'অনুবাদ লুকানো'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Filter Tabs (All / Bookmarked / Completed / Custom) */}
        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'সকল পাঠ', count: allStories.length },
              {
                id: 'bookmarked',
                label: '⭐ বুকমার্কড',
                count: Object.values(bookmarkedIds).filter(Boolean).length,
              },
              {
                id: 'completed',
                label: '✅ পঠিত',
                count: Object.values(completedStories).filter(Boolean).length,
              },
              { id: 'custom', label: '✍️ আমার কাস্টম পাঠ', count: customStories.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilterTab(tab.id as StoryFilterTab)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilterTab === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1 rounded-full bg-slate-200/60 dark:bg-slate-700/60">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            <span>
              সম্পন্ন: <strong className="text-emerald-600">{Object.keys(completedStories).length}</strong> / {allStories.length}
            </span>
          </div>
        </div>

        {/* Search & Topic Category Selector Pills */}
        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 space-y-3">
          {/* Search & Level Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="যেকোনো টপিক, শব্দ বা গল্পের নাম দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 px-2 font-medium">
                লেভেল:
              </span>
              {['all', 'Beginner', 'Elementary', 'Intermediate'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'all' ? 'সকল' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3 text-indigo-500" />
              টপিক:
            </span>
            {READING_TOPIC_CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? allStories.length
                  : allStories.filter((s) => s.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{cat.labelBn}</span>
                  <span
                    className={`text-[10px] px-1 rounded-full ${
                      isActive
                        ? 'bg-indigo-700 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Story Selector Carousel Pills */}
        <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 max-h-48 overflow-y-auto pr-1">
          {filteredStories.length === 0 ? (
            <div className="py-4 text-center w-full text-xs text-slate-400">
              কোনো পাঠ খুঁজে পাওয়া যায়নি। অনুসন্ধান রিসেট করতে বা নতুন পাঠ যুক্ত করতে উপরের বাটন ব্যবহার করুন।
            </div>
          ) : (
            filteredStories.map((story, idx) => {
              const isSelected = story.id === currentStory?.id;
              const isDone = completedStories[story.id];
              const isFav = bookmarkedIds[story.id];

              return (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(story.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-500/20'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                        isSelected
                          ? 'bg-indigo-700 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  )}

                  <span className="truncate max-w-[150px] sm:max-w-[200px] text-left">
                    {story.title}
                  </span>

                  {isFav && <span className="text-amber-400">★</span>}

                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                      isSelected
                        ? 'bg-indigo-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {story.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      {currentStory && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Story Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 sm:py-10 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 transition-colors">
              {/* Story Header */}
              <div className="mb-6 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {currentStory.category} • {currentStory.level}
                    </span>
                    {currentStory.id.startsWith('custom-') && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                        কাস্টম পাঠ
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{currentStory.readTime}</span>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => handleToggleBookmark(currentStory.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        bookmarkedIds[currentStory.id]
                          ? 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/60'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700'
                      }`}
                      title="বুকমার্ক করুন"
                    >
                      {bookmarkedIds[currentStory.id] ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>

                    {/* Completed Toggle */}
                    <button
                      onClick={() => handleToggleCompleted(currentStory.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        completedStories[currentStory.id]
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-950/60'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700'
                      }`}
                      title="পড়া সম্পন্ন চিহ্নিত করুন"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>

                    {/* Delete Custom Story Button if custom */}
                    {currentStory.id.startsWith('custom-') && (
                      <button
                        onClick={() => handleDeleteCustomStory(currentStory.id)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 dark:border-rose-900/50 cursor-pointer"
                        title="এই পাঠটি মুছে ফেলুন"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                  {currentStory.title}
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-400 font-bangla mt-1">
                  {currentStory.titleBangla}
                </p>
              </div>

              {/* MODE 1: Dual Paragraph View & Ear Training */}
              {(readingMode === 'dual' || readingMode === 'listen') && (
                <div className="space-y-6">
                  {readingMode === 'listen' && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
                      <Ear className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>
                        লিসেনিং মোড সক্রিয়: প্রতিটি প্যারাগ্রাফের স্পিকার বাটনে ক্লিক করে মনোযোগ দিয়ে শুনুন, তারপর টেক্সট মিলিয়ে নিন।
                      </span>
                    </div>
                  )}

                  {currentStory.englishContent.map((paragraph, pIdx) => {
                    const words = paragraph.split(' ');
                    const banglaTranslation = currentStory.banglaContent[pIdx];
                    const isThisPlaying = isPlayingAudio && playingParagraphIndex === pIdx;
                    const isHidden = readingMode === 'listen' && !revealedParagraphs[pIdx];

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
                            {readingMode === 'listen' && (
                              <button
                                onClick={() =>
                                  setRevealedParagraphs((prev) => ({
                                    ...prev,
                                    [pIdx]: !prev[pIdx],
                                  }))
                                }
                                className="text-[11px] px-2 py-1 rounded-md text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 hover:bg-amber-200 font-medium cursor-pointer"
                              >
                                {revealedParagraphs[pIdx] ? 'লুকান' : 'টেক্সট দেখুন'}
                              </button>
                            )}

                            <button
                              onClick={() => handlePlayParagraph(pIdx)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                isThisPlaying
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 dark:bg-slate-700 dark:text-indigo-300 dark:border-slate-600'
                              }`}
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

                        {/* Text body */}
                        {isHidden ? (
                          <div
                            onClick={() =>
                              setRevealedParagraphs((prev) => ({
                                ...prev,
                                [pIdx]: true,
                              }))
                            }
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
                              const isKey = currentStory.keyVocab.some(
                                (kv) => kv.word.toLowerCase() === clean
                              );

                              return (
                                <span
                                  key={wIdx}
                                  onClick={() => handleWordClick(w)}
                                  className={`inline-block mx-0.5 cursor-pointer transition-all duration-150 rounded-sm px-0.5 ${
                                    isKey
                                      ? 'border-b-2 border-indigo-500 font-semibold text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-950/80'
                                      : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                                  }`}
                                  title="ক্লিক করে অর্থ ও উচ্চারণ জানুন"
                                >
                                  {w}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Translation */}
                        {showBangla && !isHidden && (
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
              )}

              {/* MODE 2: Sentence Focus Reader */}
              {readingMode === 'focus' && currentSentence && (
                <div className="space-y-6">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      Sentence {currentSentenceIndex + 1} of {storySentences.length}
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoAdvance}
                        onChange={(e) => setAutoAdvance(e.target.checked)}
                        className="rounded text-indigo-600"
                      />
                      <span>অডিও শেষ হলে স্বয়ংক্রিয়ভাবে পরবর্তী বাক্যে যান</span>
                    </label>
                  </div>

                  {/* Main Sentence Card */}
                  <div className="p-8 rounded-3xl bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-200/70 dark:border-slate-700 space-y-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                      {currentSentence.textEn.split(' ').map((w, idx) => (
                        <span
                          key={idx}
                          onClick={() => handleWordClick(w)}
                          className="inline-block mx-1 cursor-pointer hover:text-indigo-600 hover:underline"
                        >
                          {w}
                        </span>
                      ))}
                    </div>

                    {showBangla && (
                      <div className="text-base text-emerald-700 dark:text-emerald-400 font-bangla pt-3 border-t border-indigo-100 dark:border-slate-700">
                        {currentSentence.textBn}
                      </div>
                    )}

                    {/* Sentence Audio Controls */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                      <button
                        onClick={() => handlePlayCurrentSentence(1.0)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-md transition-transform active:scale-95 cursor-pointer"
                      >
                        <Volume2 className="h-4 w-4" />
                        <span>স্বাভাবিক গতিতে শুনুন (1.0x)</span>
                      </button>

                      <button
                        onClick={() => handlePlayCurrentSentence(0.75)}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white text-indigo-700 border border-indigo-200 dark:bg-slate-800 dark:text-indigo-300 dark:border-slate-700 px-4 py-2.5 text-xs font-bold hover:bg-indigo-50 shadow-xs cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>ধীরে শুনুন (0.75x)</span>
                      </button>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() =>
                        setCurrentSentenceIndex((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentSentenceIndex === 0}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:border-slate-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>পূর্ববর্তী বাক্য</span>
                    </button>

                    <span className="text-xs text-slate-400">
                      {Math.round(((currentSentenceIndex + 1) / storySentences.length) * 100)}% সম্পন্ন
                    </span>

                    <button
                      onClick={() =>
                        setCurrentSentenceIndex((prev) =>
                          Math.min(storySentences.length - 1, prev + 1)
                        )
                      }
                      disabled={currentSentenceIndex === storySentences.length - 1}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white disabled:opacity-40 cursor-pointer hover:bg-indigo-700"
                    >
                      <span>পরবর্তী বাক্য</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 3: Shadowing & Speaking Lab */}
              {readingMode === 'shadowing' && currentSentence && (
                <div className="space-y-6">
                  {/* Shadowing Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200 font-bold">
                      <Mic className="h-4 w-4 text-amber-600" />
                      <span>
                        শ্যাডোয়িং স্পিকিং ল্যাব: অডিও শুনুন, তারপর মাইক্রোফোনে মুখে উচ্চারণ করে নির্ভুলতা যাচাই করুন (+15 XP)
                      </span>
                    </div>
                  </div>

                  {/* Target Sentence Card */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>টার্গেট বাক্য ({currentSentenceIndex + 1} / {storySentences.length})</span>
                      <button
                        onClick={() => handlePlayCurrentSentence(0.85)}
                        className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:underline cursor-pointer"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>আদর্শ উচ্চারণ শুনুন</span>
                      </button>
                    </div>

                    <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-relaxed">
                      "{currentSentence.textEn}"
                    </p>

                    {showBangla && (
                      <p className="text-sm text-emerald-700 dark:text-emerald-400 font-bangla">
                        বাংলা অর্থ: {currentSentence.textBn}
                      </p>
                    )}

                    {/* Microphone Recording Action Area */}
                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={handleStartRecording}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white shadow-lg transition-all cursor-pointer ${
                          isRecording
                            ? 'bg-rose-600 animate-pulse ring-4 ring-rose-500/20'
                            : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="h-4 w-4" />
                            <span>রেকর্ডিং চলছে... (থামাতে ক্লিক করুন)</span>
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4" />
                            <span>মাইক্রোফোন চালু করে বলুন (Start Speaking)</span>
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-slate-400">
                        {isSpeechRecognitionSupported()
                          ? 'কথা বলার সাথে সাথেই আপনার উচ্চারণ যাচাই করা হবে'
                          : 'এই ব্রাউজারে স্পিচ রিকগনিশন সক্রিয় নেই (Chrome/Edge ব্যবহার করুন)'}
                      </p>
                    </div>

                    {/* Real-time Spoken Feedback */}
                    {speechTranscript && (
                      <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2 text-left">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">
                          আপনার বলা কথা:
                        </span>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          "{speechTranscript}"
                        </p>

                        {speechMatchScore !== null && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <span className="text-xs font-bold">
                              উচ্চারণ নির্ভুলতা:{' '}
                              <strong
                                className={`${
                                  speechMatchScore >= 80
                                    ? 'text-emerald-600'
                                    : speechMatchScore >= 50
                                    ? 'text-amber-600'
                                    : 'text-rose-600'
                                }`}
                              >
                                {speechMatchScore}% Match
                              </strong>
                            </span>

                            {speechMatchScore >= 70 ? (
                              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>চমৎকার উচ্চারণ! (+15 XP)</span>
                              </span>
                            ) : (
                              <span className="text-xs text-amber-600">
                                আরেকবার শুনুন ও ধীরে বলুন
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Navigation in Shadowing mode */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setCurrentSentenceIndex((prev) => Math.max(0, prev - 1));
                        setSpeechTranscript('');
                        setSpeechMatchScore(null);
                      }}
                      disabled={currentSentenceIndex === 0}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 disabled:opacity-40 cursor-pointer dark:border-slate-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>আগের বাক্য</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentSentenceIndex((prev) =>
                          Math.min(storySentences.length - 1, prev + 1)
                        );
                        setSpeechTranscript('');
                        setSpeechMatchScore(null);
                      }}
                      disabled={currentSentenceIndex === storySentences.length - 1}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white disabled:opacity-40 cursor-pointer"
                    >
                      <span>পরবর্তী বাক্য</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Comprehension Quiz Check */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-950/60 dark:bg-slate-800/50">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
                    <Award className="h-4 w-4" />
                    <span>Listening & Reading Comprehension Quiz (+20 XP)</span>
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
                          className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${style}`}
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
                      💡 <strong>ব্যাখ্যা:</strong>{' '}
                      {currentStory.comprehensionQuestion.explanationBangla}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Universal Word Inspector & Key Story Vocabulary */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Word Inspector Card (Shows on word click) */}
            {selectedWord && (
              <div className="rounded-3xl border border-indigo-200 bg-indigo-50/70 p-5 shadow-xs dark:border-indigo-900/60 dark:bg-indigo-950/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>শব্দ বিশ্লেষণ (Word Inspector)</span>
                  </div>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white capitalize">
                        {selectedWord.word}
                      </h3>
                      {selectedWord.pos && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                          {selectedWord.pos}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => speakText(selectedWord.word, speechAccent, 0.9)}
                      className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs cursor-pointer"
                      title="উচ্চারণ শুনুন"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  {(selectedWord.ipa || selectedWord.pron) && (
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {selectedWord.ipa && <span className="font-mono">{selectedWord.ipa}</span>}
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:underline cursor-pointer"
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
                    গল্পের মূল শব্দসমূহ ({currentStory.keyVocab.length})
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">অডিওসহ</span>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 mt-1 max-h-[500px] overflow-y-auto pr-1">
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
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleSaveVocab(vocab.word, vocab.meaning)}
                            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer"
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
      )}

      {/* Dynamic Story Creator & Article Importer Modal */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
                <Wand2 className="h-5 w-5" />
                <span>নতুন পাঠ তৈরি ও কাস্টম রিডার (Story Creator Studio)</span>
              </div>
              <button
                onClick={() => setIsCreatorOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Creator Sub-Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setCreatorTab('preset')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  creatorTab === 'preset'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                ১-ক্লিক টেমপ্লেট জেনারেটর (Instant Presets)
              </button>
              <button
                onClick={() => setCreatorTab('custom')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  creatorTab === 'custom'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                নিজের টেক্সট পেস্ট / ইমপোর্ট (Paste English Text)
              </button>
            </div>

            {/* TAB 1: Template Generator */}
            {creatorTab === 'preset' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 font-sans">
                  নিচের যেকোনো জনপ্রিয় বিষয় নির্বাচন করুন। সাথে সাথেই তৈরি হয়ে যাবে অডিও, বাক্য ও কুইজসহ একটি পূর্ণাঙ্গ ইন্টারঅ্যাক্টিভ লেসন:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DYNAMIC_STORY_TEMPLATES.map((tmpl) => (
                    <div
                      key={tmpl.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all space-y-2 bg-slate-50/50 dark:bg-slate-800/40"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          {tmpl.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{tmpl.level}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {tmpl.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-bangla">{tmpl.titleBn}</p>
                      <button
                        onClick={() => handleCreateFromTemplate(tmpl)}
                        className="w-full mt-2 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
                      >
                        + এই পাঠটি লাইব্রেরিতে যোগ করুন
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Custom Text Importer */}
            {creatorTab === 'custom' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    গল্পের ইংরেজি শিরোনাম (English Title) *
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. My First Day in New York City"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বাংলা শিরোনাম (Bangla Title)
                  </label>
                  <input
                    type="text"
                    value={customTitleBn}
                    onChange={(e) => setCustomTitleBn(e.target.value)}
                    placeholder="যেমন: নিউ ইয়র্কে আমার প্রথম দিন"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-bangla"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      বিভাগ (Category)
                    </label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      {READING_TOPIC_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.labelBn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      লেভেল (Level)
                    </label>
                    <select
                      value={customLevel}
                      onChange={(e) =>
                        setCustomLevel(e.target.value as 'Beginner' | 'Elementary' | 'Intermediate')
                      }
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Elementary">Elementary</option>
                      <option value="Intermediate">Intermediate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ইংরেজি অনুচ্ছেদসমূহ (English Content) *
                  </label>
                  <textarea
                    rows={4}
                    value={customTextEn}
                    onChange={(e) => setCustomTextEn(e.target.value)}
                    placeholder="এখানে ইংরেজি টেক্সট পেস্ট করুন। প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার চাপুন..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বাংলা অনুবাদ (ঐচ্ছিক - Bangla Translation)
                  </label>
                  <textarea
                    rows={3}
                    value={customTextBn}
                    onChange={(e) => setCustomTextBn(e.target.value)}
                    placeholder="বাংলা অনুবাদ দিতে পারেন (ঐচ্ছিক)..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-bangla"
                  />
                </div>

                <button
                  onClick={handleCreateCustomTextStory}
                  disabled={!customTitle.trim() || !customTextEn.trim()}
                  className="w-full py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-40 transition-colors shadow-md cursor-pointer"
                >
                  ✓ পাঠ সংরক্ষণ ও ইন্টারঅ্যাক্টিভ লেসন শুরু করুন
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
