import React, { useState, useMemo } from 'react';
import {
  Wand2,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookmarkPlus,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { speakText } from '../../utils/speech';

interface SlotOption {
  value: string;
  bangla: string;
  thirdPersonValue?: string;
  auxiliary?: string;
}

interface TemplateConfig {
  id: string;
  name: string;
  nameBangla: string;
  description: string;
  slots: {
    slot1: { title: string; titleBangla: string; options: SlotOption[] };
    slot2: { title: string; titleBangla: string; options: SlotOption[] };
    slot3: { title: string; titleBangla: string; options: SlotOption[] };
    slot4: { title: string; titleBangla: string; options: SlotOption[] };
  };
  computeSentence: (s1: SlotOption, s2: SlotOption, s3: SlotOption, s4: SlotOption) => {
    english: string;
    bangla: string;
  };
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: 'want-need-plan',
    name: 'Desires & Plans (want to / need to / plan to)',
    nameBangla: 'ইচ্ছা ও পরিকল্পনা (করতে চাই / প্রয়োজন / পরিকল্পনা)',
    description: 'Subject + Verb + to + Action + Object',
    slots: {
      slot1: {
        title: '1. Subject (কর্তা)',
        titleBangla: 'কে কাজ করবে?',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'You', bangla: 'তুমি / আপনি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'They', bangla: 'তারা' },
          { value: 'He', bangla: 'সে (ছেলে)', thirdPersonValue: 'He' },
          { value: 'She', bangla: 'সে (মেয়ে)', thirdPersonValue: 'She' },
        ],
      },
      slot2: {
        title: '2. Verb Anchor (ইচ্ছা/প্রয়োজন)',
        titleBangla: 'কি ধরনের অনুভূতি?',
        options: [
          { value: 'want to', bangla: 'করতে চাই', thirdPersonValue: 'wants to' },
          { value: 'need to', bangla: 'করা প্রয়োজন', thirdPersonValue: 'needs to' },
          { value: 'would like to', bangla: 'করতে আগ্রহী (বিনীত)', thirdPersonValue: 'would like to' },
          { value: 'plan to', bangla: 'করার পরিকল্পনা করছি', thirdPersonValue: 'plans to' },
          { value: 'love to', bangla: 'করতে ভালোবাসি', thirdPersonValue: 'loves to' },
          { value: 'hope to', bangla: 'করার আশা রাখি', thirdPersonValue: 'hopes to' },
        ],
      },
      slot3: {
        title: '3. Action Verb (ক্রিয়া)',
        titleBangla: 'কোন কাজ করতে চায়?',
        options: [
          { value: 'learn', bangla: 'শিখতে' },
          { value: 'practice', bangla: 'অনুশীলন করতে' },
          { value: 'improve', bangla: 'উন্নত করতে' },
          { value: 'understand', bangla: 'বুঝতে' },
          { value: 'speak', bangla: 'বলতে' },
          { value: 'read', bangla: 'পড়তে' },
        ],
      },
      slot4: {
        title: '4. Target / Object (কর্ম)',
        titleBangla: 'কি শিখবে বা করবে?',
        options: [
          { value: 'English fluently', bangla: 'অনর্গল ইংরেজি' },
          { value: 'spoken English', bangla: 'স্পোকেন ইংরেজি' },
          { value: 'English grammar rules', bangla: 'ইংরেজি ব্যাকরণের নিয়ম' },
          { value: 'my pronunciation', bangla: 'আমার উচ্চারণ' },
          { value: 'new vocabulary every day', bangla: 'প্রতিদিন নতুন শব্দ' },
          { value: 'without hesitation', bangla: 'কোনো দ্বিধা ছাড়া' },
        ],
      },
    },
    computeSentence: (s1, s2, s3, s4) => {
      const is3rd = s1.value === 'He' || s1.value === 'She';
      const verbPart = is3rd ? s2.thirdPersonValue || s2.value : s2.value;

      let banglaSubject = s1.bangla;
      if (s2.value === 'need to') {
        if (s1.value === 'I') banglaSubject = 'আমার';
        if (s1.value === 'You') banglaSubject = 'তোমার / আপনার';
        if (s1.value === 'We') banglaSubject = 'আমাদের';
        if (s1.value === 'They') banglaSubject = 'তাদের';
        if (s1.value === 'He') banglaSubject = 'তার';
        if (s1.value === 'She') banglaSubject = 'তার';
      }

      let adjustedTarget = s4.bangla;
      if (is3rd && s4.value.includes('my')) {
        adjustedTarget = s4.bangla.replace('আমার', 'তার');
      } else if (s1.value === 'We' && s4.value.includes('my')) {
        adjustedTarget = s4.bangla.replace('আমার', 'আমাদের');
      } else if (s1.value === 'You' && s4.value.includes('my')) {
        adjustedTarget = s4.bangla.replace('আমার', 'তোমার');
      }

      const englishTarget =
        is3rd && s4.value.includes('my')
          ? s4.value.replace('my', s1.value === 'He' ? 'his' : 'her')
          : s1.value === 'We' && s4.value.includes('my')
          ? s4.value.replace('my', 'our')
          : s1.value === 'You' && s4.value.includes('my')
          ? s4.value.replace('my', 'your')
          : s4.value;

      const english = `${s1.value} ${verbPart} ${s3.value} ${englishTarget}.`;
      const bangla = `${banglaSubject} ${adjustedTarget} ${s3.bangla} ${s2.bangla}।`;
      return { english, bangla };
    },
  },
  {
    id: 'trying-to-continuous',
    name: 'Efforts & Continuous Actions (am/is/are trying to)',
    nameBangla: 'চলমান প্রচেষ্টা (চেষ্টা করছি / কাজ করছি)',
    description: 'Subject + be-verb + trying to + Verb + Object',
    slots: {
      slot1: {
        title: '1. Subject (কর্তা)',
        titleBangla: 'কে চেষ্টা করছে?',
        options: [
          { value: 'I', bangla: 'আমি', auxiliary: 'am' },
          { value: 'You', bangla: 'তুমি / আপনি', auxiliary: 'are' },
          { value: 'We', bangla: 'আমরা', auxiliary: 'are' },
          { value: 'They', bangla: 'তারা', auxiliary: 'are' },
          { value: 'He', bangla: 'সে (ছেলে)', auxiliary: 'is' },
          { value: 'She', bangla: 'সে (মেয়ে)', auxiliary: 'is' },
        ],
      },
      slot2: {
        title: '2. Continuous Pattern (চেষ্টা)',
        titleBangla: 'প্রচেষ্টার ধরন',
        options: [
          { value: 'trying to', bangla: 'চেষ্টা করছি' },
          { value: 'working to', bangla: 'উন্নতির কাজ করছি' },
          { value: 'starting to', bangla: 'শুরু করছি' },
          { value: 'struggling to', bangla: 'কষ্ট হচ্ছে কিন্তু চেষ্টা করছি' },
        ],
      },
      slot3: {
        title: '3. Action (কাজ)',
        titleBangla: 'কোন বিষয়ে প্রচেষ্টা?',
        options: [
          { value: 'speak', bangla: 'কথা বলতে' },
          { value: 'build', bangla: 'তৈরি করতে' },
          { value: 'overcome', bangla: 'কাটিয়ে উঠতে' },
          { value: 'master', bangla: 'আয়ত্তে আনতে' },
          { value: 'remember', bangla: 'মনে রাখতে' },
        ],
      },
      slot4: {
        title: '4. Goal / Detail (লক্ষ্য)',
        titleBangla: 'নির্দিষ্ট ক্ষেত্র',
        options: [
          { value: 'English with confidence', bangla: 'আত্মবিশ্বাসের সাথে ইংরেজি' },
          { value: 'longer sentences', bangla: 'বড় বড় বাক্য' },
          { value: 'speaking hesitation', bangla: 'কথা বলার জড়তা' },
          { value: 'daily vocabulary', bangla: 'দৈনিক শব্দভাণ্ডার' },
          { value: 'common mistakes', bangla: 'সাধারণ ভুলগুলো' },
        ],
      },
    },
    computeSentence: (s1, s2, s3, s4) => {
      const aux = s1.auxiliary || 'am';
      const english = `${s1.value} ${aux} ${s2.value} ${s3.value} ${s4.value}.`;
      const bangla = `${s1.bangla} ${s4.bangla} ${s3.bangla} ${s2.bangla}।`;
      return { english, bangla };
    },
  },
  {
    id: 'habit-routine',
    name: 'Daily Habits & Routine (প্রতিদিনের অভ্যাস)',
    nameBangla: 'অভ্যাস ও সময় (আমি প্রতিদিন... করি)',
    description: 'Subject + Verb + Object + Time Expression',
    slots: {
      slot1: {
        title: '1. Subject (কর্তা)',
        titleBangla: 'কে করে?',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'They', bangla: 'তারা' },
          { value: 'You', bangla: 'তুমি' },
          { value: 'He', bangla: 'সে', thirdPersonValue: 'He' },
        ],
      },
      slot2: {
        title: '2. Habitual Verb (ক্রিয়া)',
        titleBangla: 'কি কাজ করে?',
        options: [
          { value: 'learn', bangla: 'শিখি', thirdPersonValue: 'learns' },
          { value: 'practice', bangla: 'চর্চা করি', thirdPersonValue: 'practices' },
          { value: 'read', bangla: 'পড়ি', thirdPersonValue: 'reads' },
          { value: 'watch', bangla: 'দেখি', thirdPersonValue: 'watches' },
          { value: 'listen to', bangla: 'শুনি', thirdPersonValue: 'listens to' },
        ],
      },
      slot3: {
        title: '3. What (বিষয়/বস্তু)',
        titleBangla: 'কি বিষয়?',
        options: [
          { value: 'English lessons', bangla: 'ইংরেজি পাঠ' },
          { value: 'English podcasts', bangla: 'ইংরেজি পডকাস্ট' },
          { value: 'short stories', bangla: 'ছোট গল্প' },
          { value: 'speaking with AI', bangla: 'এআই-এর সাথে কথা বলা' },
          { value: 'new words', bangla: 'নতুন শব্দ' },
        ],
      },
      slot4: {
        title: '4. Time Expression (সময়)',
        titleBangla: 'কখন করে?',
        options: [
          { value: 'every day', bangla: 'প্রতিদিন' },
          { value: 'every morning', bangla: 'প্রতিদিন সকালে' },
          { value: 'in the evening', bangla: 'সন্ধ্যায়' },
          { value: 'on weekends', bangla: 'ছুটির দিনে' },
          { value: 'before going to sleep', bangla: 'ঘুমাতে যাওয়ার আগে' },
        ],
      },
    },
    computeSentence: (s1, s2, s3, s4) => {
      const is3rd = s1.value === 'He';
      const verb = is3rd ? s2.thirdPersonValue || s2.value : s2.value;
      const banglaVerb = is3rd ? s2.bangla.replace('ি', 'ে') : s2.bangla;

      const english = `${s1.value} ${verb} ${s3.value} ${s4.value}.`;
      const bangla = `${s1.bangla} ${s4.bangla} ${s3.bangla} ${banglaVerb}।`;
      return { english, bangla };
    },
  },
];

interface InteractiveSentenceBuilderProps {
  onSaveSentence?: (sentence: { english: string; bangla: string }) => void;
  onSendToAITutor?: (sentence: string) => void;
  onAwardXP?: (amount: number) => void;
}

export const InteractiveSentenceBuilder: React.FC<InteractiveSentenceBuilderProps> = ({
  onSaveSentence,
  onSendToAITutor,
  onAwardXP,
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const currentTemplate = TEMPLATES[selectedTemplateIndex];

  // Selected slot options indices
  const [slot1Idx, setSlot1Idx] = useState(0);
  const [slot2Idx, setSlot2Idx] = useState(0);
  const [slot3Idx, setSlot3Idx] = useState(0);
  const [slot4Idx, setSlot4Idx] = useState(0);

  // Stats & built sentences history
  const [builtCount, setBuiltCount] = useState(1);
  const [builtHistory, setBuiltHistory] = useState<
    Array<{ english: string; bangla: string; timestamp: number }>
  >([]);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute live sentence
  const currentSentence = useMemo(() => {
    const s1 = currentTemplate.slots.slot1.options[slot1Idx] || currentTemplate.slots.slot1.options[0];
    const s2 = currentTemplate.slots.slot2.options[slot2Idx] || currentTemplate.slots.slot2.options[0];
    const s3 = currentTemplate.slots.slot3.options[slot3Idx] || currentTemplate.slots.slot3.options[0];
    const s4 = currentTemplate.slots.slot4.options[slot4Idx] || currentTemplate.slots.slot4.options[0];

    return currentTemplate.computeSentence(s1, s2, s3, s4);
  }, [currentTemplate, slot1Idx, slot2Idx, slot3Idx, slot4Idx]);

  const handleSelectSlotOption = (slotNumber: 1 | 2 | 3 | 4, optionIndex: number) => {
    if (slotNumber === 1) setSlot1Idx(optionIndex);
    if (slotNumber === 2) setSlot2Idx(optionIndex);
    if (slotNumber === 3) setSlot3Idx(optionIndex);
    if (slotNumber === 4) setSlot4Idx(optionIndex);

    setBuiltCount((prev) => {
      const next = prev + 1;
      if (next % 5 === 0 && onAwardXP) {
        onAwardXP(15);
      }
      return next;
    });

    // Auto-record to history if unique
    setBuiltHistory((prev) => {
      if (prev.some((h) => h.english === currentSentence.english)) return prev;
      return [{ ...currentSentence, timestamp: Date.now() }, ...prev.slice(0, 9)];
    });
  };

  const handleRandomize = () => {
    const r1 = Math.floor(Math.random() * currentTemplate.slots.slot1.options.length);
    const r2 = Math.floor(Math.random() * currentTemplate.slots.slot2.options.length);
    const r3 = Math.floor(Math.random() * currentTemplate.slots.slot3.options.length);
    const r4 = Math.floor(Math.random() * currentTemplate.slots.slot4.options.length);
    setSlot1Idx(r1);
    setSlot2Idx(r2);
    setSlot3Idx(r3);
    setSlot4Idx(r4);
    setBuiltCount((p) => p + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${currentSentence.english} (${currentSentence.bangla})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSaveSentence) {
      onSaveSentence(currentSentence);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div id="interactive-sentence-builder" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-5 sm:p-6 dark:border-emerald-800/60 dark:bg-emerald-950/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                <Wand2 className="h-3.5 w-3.5" />
                Interactive Sentence Builder
              </span>
              <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                ইন্টারঅ্যাক্টিভ বাক্য নির্মাতা
              </span>
            </div>
            <h2 className="mt-2 text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              একটি কাঠামো থেকে শত শত বাক্য তৈরি করুন
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              নিচের শব্দগুলোর যেকোনো অংশে ট্যাপ করে পরিবর্তন করুন। দেখুন কীভাবে একটি কাঠামো ঠিক রেখে বিভিন্ন শব্দ বসিয়ে নতুন নতুন সাবলীল ইংরেজি বাক্য তৈরি করা যায়।
            </p>
          </div>

          {/* Gamified Challenge Badge */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white/90 p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm font-black">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Challenge Goal
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {builtCount} / 10 বাক্য তৈরি
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {builtCount >= 10 ? '🎉 লক্ষ্য অর্জিত! (+20 XP)' : '১০টি বাক্য তৈরি করে XP জিতুন'}
              </div>
            </div>
          </div>
        </div>

        {/* Template Switcher Tabs */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-emerald-200/60 dark:border-slate-800">
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={tmpl.id}
              onClick={() => {
                setSelectedTemplateIndex(idx);
                setSlot1Idx(0);
                setSlot2Idx(0);
                setSlot3Idx(0);
                setSlot4Idx(0);
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                selectedTemplateIndex === idx
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 scale-102'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <span className="block font-sans">{tmpl.name}</span>
              <span className="text-[10px] opacity-80 block">{tmpl.nameBangla}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Generated Sentence Display (The Stage) */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-white p-6 shadow-md dark:border-emerald-600/40 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Sentence Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              title="Randomize slots to discover a new sentence"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Random Sentence</span>
            </button>
          </div>
        </div>

        {/* Big English Output */}
        <div className="py-4">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
            {currentSentence.english}
          </div>

          {/* Bengali Meaning */}
          <div className="mt-2 text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <span>বাংলা অর্থ:</span>
            <span>{currentSentence.bangla}</span>
          </div>

          {/* Formula tag */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-mono font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <span>Structure:</span>
            <span>{currentTemplate.description}</span>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => speakText(currentSentence.english)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm transition-transform active:scale-95"
            >
              <Volume2 className="h-4 w-4" />
              <span>Listen Pronunciation</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {onSaveSentence && (
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {savedSuccess ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <BookmarkPlus className="h-3.5 w-3.5 text-amber-500" />
                )}
                <span>{savedSuccess ? 'Saved!' : 'Save Sentence'}</span>
              </button>
            )}
          </div>

          {onSendToAITutor && (
            <button
              onClick={() => onSendToAITutor(currentSentence.english)}
              className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2 text-xs font-bold text-teal-800 hover:bg-teal-100 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span>Practice with AI Tutor</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive 4-Slot Selector Columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Slot 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Slot 1
            </span>
            <h3 className="text-xs font-black text-slate-900 dark:text-white">
              {currentTemplate.slots.slot1.title}
            </h3>
            <p className="text-[11px] text-slate-500">{currentTemplate.slots.slot1.titleBangla}</p>
          </div>
          <div className="space-y-1.5">
            {currentTemplate.slots.slot1.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectSlotOption(1, i)}
                className={`w-full rounded-xl p-2.5 text-left text-xs transition-all ${
                  slot1Idx === i
                    ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs dark:bg-emerald-950/60 dark:text-emerald-200'
                    : 'border border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                }`}
              >
                <div className="font-sans font-bold">{opt.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{opt.bangla}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Slot 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Slot 2
            </span>
            <h3 className="text-xs font-black text-slate-900 dark:text-white">
              {currentTemplate.slots.slot2.title}
            </h3>
            <p className="text-[11px] text-slate-500">{currentTemplate.slots.slot2.titleBangla}</p>
          </div>
          <div className="space-y-1.5">
            {currentTemplate.slots.slot2.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectSlotOption(2, i)}
                className={`w-full rounded-xl p-2.5 text-left text-xs transition-all ${
                  slot2Idx === i
                    ? 'border-2 border-teal-500 bg-teal-50 text-teal-950 font-bold shadow-xs dark:bg-teal-950/60 dark:text-teal-200'
                    : 'border border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                }`}
              >
                <div className="font-sans font-bold">{opt.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{opt.bangla}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Slot 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Slot 3
            </span>
            <h3 className="text-xs font-black text-slate-900 dark:text-white">
              {currentTemplate.slots.slot3.title}
            </h3>
            <p className="text-[11px] text-slate-500">{currentTemplate.slots.slot3.titleBangla}</p>
          </div>
          <div className="space-y-1.5">
            {currentTemplate.slots.slot3.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectSlotOption(3, i)}
                className={`w-full rounded-xl p-2.5 text-left text-xs transition-all ${
                  slot3Idx === i
                    ? 'border-2 border-blue-500 bg-blue-50 text-blue-950 font-bold shadow-xs dark:bg-blue-950/60 dark:text-blue-200'
                    : 'border border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                }`}
              >
                <div className="font-sans font-bold">{opt.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{opt.bangla}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Slot 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Slot 4
            </span>
            <h3 className="text-xs font-black text-slate-900 dark:text-white">
              {currentTemplate.slots.slot4.title}
            </h3>
            <p className="text-[11px] text-slate-500">{currentTemplate.slots.slot4.titleBangla}</p>
          </div>
          <div className="space-y-1.5">
            {currentTemplate.slots.slot4.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectSlotOption(4, i)}
                className={`w-full rounded-xl p-2.5 text-left text-xs transition-all ${
                  slot4Idx === i
                    ? 'border-2 border-purple-500 bg-purple-50 text-purple-950 font-bold shadow-xs dark:bg-purple-950/60 dark:text-purple-200'
                    : 'border border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                }`}
              >
                <div className="font-sans font-bold">{opt.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{opt.bangla}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Built Sentences Reel */}
      {builtHistory.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-850">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <RotateCcw className="h-3.5 w-3.5 text-emerald-600" />
              আপনার তৈরি করা বাক্যসমূহ (Session History):
            </span>
            <span className="text-[11px] text-slate-500">
              মোট তৈরি: {builtHistory.length}টি
            </span>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {builtHistory.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.english}
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    {item.bangla}
                  </div>
                </div>
                <button
                  onClick={() => speakText(item.english)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-slate-800"
                  title="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
