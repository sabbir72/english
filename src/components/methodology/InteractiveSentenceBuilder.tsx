import React, { useState, useMemo } from 'react';
import {
  Wand2,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  BookmarkPlus,
  Zap,
  Plus,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { speakText } from '../../utils/speech';

interface SlotOption {
  value: string;
  bangla: string;
  thirdPersonValue?: string;
}

interface TemplateSlot {
  role: string;
  roleBangla: string;
  color: string;
  options: SlotOption[];
}

interface SentenceTemplate {
  id: string;
  name: string;
  nameBangla: string;
  description: string;
  slots: TemplateSlot[];
  computeSentence: (selected: SlotOption[]) => {
    english: string;
    bangla: string;
  };
}

const TEMPLATES: SentenceTemplate[] = [
  {
    id: 'subject-verb-object-place-time',
    name: 'Block Builder: Subject + Verb + Object + Place + Time',
    nameBangla: 'প্রধান ব্লক: কর্তা + ক্রিয়া + কর্ম + স্থান + সময়',
    description: '[Subject] + [Verb] + [Object] + [Place] + [Time]',
    slots: [
      {
        role: 'Subject',
        roleBangla: 'কর্তা (কে?)',
        color: 'indigo',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'You', bangla: 'তুমি / আপনি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'They', bangla: 'তারা' },
          { value: 'He', bangla: 'সে (ছেলে)', thirdPersonValue: 'He' },
          { value: 'She', bangla: 'সে (মেয়ে)', thirdPersonValue: 'She' },
          { value: 'Rahim', bangla: 'রহিম', thirdPersonValue: 'Rahim' },
        ],
      },
      {
        role: 'Verb',
        roleBangla: 'ক্রিয়া (কি করে?)',
        color: 'sky',
        options: [
          { value: 'eat', bangla: 'খাই', thirdPersonValue: 'eats' },
          { value: 'practice', bangla: 'চর্চা করি', thirdPersonValue: 'practices' },
          { value: 'learn', bangla: 'শিখি', thirdPersonValue: 'learns' },
          { value: 'read', bangla: 'পড়ি', thirdPersonValue: 'reads' },
          { value: 'drink', bangla: 'পান করি', thirdPersonValue: 'drinks' },
          { value: 'cook', bangla: 'রান্না করি', thirdPersonValue: 'cooks' },
          { value: 'watch', bangla: 'দেখি', thirdPersonValue: 'watches' },
        ],
      },
      {
        role: 'Object',
        roleBangla: 'কর্ম (কি জিনিস?)',
        color: 'emerald',
        options: [
          { value: 'rice', bangla: 'ভাত' },
          { value: 'English', bangla: 'ইংরেজি' },
          { value: 'books', bangla: 'বই' },
          { value: 'tea', bangla: 'চা' },
          { value: 'delicious food', bangla: 'সুস্বাদু খাবার' },
          { value: 'news stories', bangla: 'খবরের গল্প' },
          { value: 'grammar rules', bangla: 'ব্যাকরণের নিয়ম' },
        ],
      },
      {
        role: 'Place',
        roleBangla: 'স্থান (কোথায়?)',
        color: 'amber',
        options: [
          { value: 'at home', bangla: 'বাড়িতে' },
          { value: 'online', bangla: 'অনলাইনে' },
          { value: 'in the library', bangla: 'লাইব্রেরিতে' },
          { value: 'in my room', bangla: 'আমার ঘরে' },
          { value: 'at the cafe', bangla: 'ক্যাফেতে' },
          { value: 'at university', bangla: 'বিশ্ববিদ্যালয়ে' },
        ],
      },
      {
        role: 'Time',
        roleBangla: 'সময় (কখন?)',
        color: 'purple',
        options: [
          { value: 'in the morning', bangla: 'সকালে' },
          { value: 'every day', bangla: 'প্রতিদিন' },
          { value: 'in the evening', bangla: 'সন্ধ্যায়' },
          { value: 'at night', bangla: 'রাতে' },
          { value: 'on weekends', bangla: 'ছুটির দিনে' },
          { value: 'after work', bangla: 'কাজের পরে' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sSub, sVerb, sObj, sPlace, sTime] = selected;
      const is3rd = ['He', 'She', 'Rahim'].includes(sSub.value);
      const engVerb = is3rd ? sVerb.thirdPersonValue || sVerb.value : sVerb.value;

      let bVerb = sVerb.bangla;
      if (is3rd) {
        if (bVerb === 'খাই') bVerb = 'খায়';
        else if (bVerb === 'চর্চা করি') bVerb = 'চর্চা করে';
        else if (bVerb === 'শিখি') bVerb = 'শেখে';
        else if (bVerb === 'পড়ি') bVerb = 'পড়ে';
        else if (bVerb === 'পান করি') bVerb = 'পান করে';
        else if (bVerb === 'রান্না করি') bVerb = 'রান্না করে';
        else if (bVerb === 'দেখি') bVerb = 'দেখে';
      } else if (sSub.value === 'You') {
        if (bVerb === 'খাই') bVerb = 'খাও';
        else if (bVerb === 'চর্চা করি') bVerb = 'চর্চা করো';
        else if (bVerb === 'শিখি') bVerb = 'শেখ';
        else if (bVerb === 'পড়ি') bVerb = 'পড়';
        else if (bVerb === 'পান করি') bVerb = 'পান করো';
        else if (bVerb === 'রান্না করি') bVerb = 'রান্না করো';
        else if (bVerb === 'দেখি') bVerb = 'দেখো';
      }

      const english = `${sSub.value} ${engVerb} ${sObj.value} ${sPlace.value} ${sTime.value}.`;
      const bangla = `${sSub.bangla} ${sTime.bangla} ${sPlace.bangla} ${sObj.bangla} ${bVerb}।`;

      return { english, bangla };
    },
  },
  {
    id: 'desires-plans',
    name: 'Desires & Plans (want to / need to / plan to)',
    nameBangla: 'ইচ্ছা ও পরিকল্পনা (করতে চাই / প্রয়োজন / পরিকল্পনা)',
    description: '[Subject] + [Need/Want] + [Action] + [Target]',
    slots: [
      {
        role: 'Subject',
        roleBangla: 'কর্তা',
        color: 'indigo',
        options: [
          { value: 'I', bangla: 'আমি' },
          { value: 'You', bangla: 'তুমি' },
          { value: 'We', bangla: 'আমরা' },
          { value: 'They', bangla: 'তারা' },
          { value: 'He', bangla: 'সে (ছেলে)', thirdPersonValue: 'He' },
        ],
      },
      {
        role: 'Anchor',
        roleBangla: 'ইচ্ছা/প্রয়োজন',
        color: 'sky',
        options: [
          { value: 'want to', bangla: 'করতে চাই', thirdPersonValue: 'wants to' },
          { value: 'need to', bangla: 'করা দরকার', thirdPersonValue: 'needs to' },
          { value: 'plan to', bangla: 'করার পরিকল্পনা করছি', thirdPersonValue: 'plans to' },
          { value: 'would like to', bangla: 'করতে আগ্রহী', thirdPersonValue: 'would like to' },
          { value: 'love to', bangla: 'করতে ভালোবাসি', thirdPersonValue: 'loves to' },
        ],
      },
      {
        role: 'Action',
        roleBangla: 'কোন কাজ?',
        color: 'emerald',
        options: [
          { value: 'speak', bangla: 'কথা বলতে' },
          { value: 'learn', bangla: 'শিখতে' },
          { value: 'improve', bangla: 'উন্নত করতে' },
          { value: 'practice', bangla: 'অনুশীলন করতে' },
        ],
      },
      {
        role: 'Target',
        roleBangla: 'কি লক্ষ্য?',
        color: 'purple',
        options: [
          { value: 'English fluently', bangla: 'অনর্গল ইংরেজি' },
          { value: 'my pronunciation', bangla: 'আমার উচ্চারণ' },
          { value: 'new words every day', bangla: 'প্রতিদিন নতুন শব্দ' },
          { value: 'without fear', bangla: 'ভয় ছাড়া' },
        ],
      },
    ],
    computeSentence: (selected) => {
      const [sSub, sAnchor, sAct, sTgt] = selected;
      const is3rd = sSub.value === 'He';
      const verbPart = is3rd ? sAnchor.thirdPersonValue || sAnchor.value : sAnchor.value;
      const english = `${sSub.value} ${verbPart} ${sAct.value} ${sTgt.value}.`;
      const bangla = `${sSub.bangla} ${sTgt.bangla} ${sAct.bangla} ${sAnchor.bangla}।`;
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
  const [templateIdx, setTemplateIdx] = useState(0);
  const currentTemplate = TEMPLATES[templateIdx];

  // Store selected index for each slot of the current template
  const [slotIndices, setSlotIndices] = useState<number[]>([0, 0, 0, 0, 0]);
  const [activeSlotModal, setActiveSlotModal] = useState<number | null>(null);

  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [builtCount, setBuiltCount] = useState(1);

  // Compute active slots
  const selectedOptions = useMemo(() => {
    return currentTemplate.slots.map((slot, i) => {
      const selectedIndex = slotIndices[i] ?? 0;
      return slot.options[selectedIndex] || slot.options[0];
    });
  }, [currentTemplate, slotIndices]);

  const currentSentence = useMemo(() => {
    return currentTemplate.computeSentence(selectedOptions);
  }, [currentTemplate, selectedOptions]);

  const handleSelectSlotOption = (slotIdx: number, optionIdx: number) => {
    const updated = [...slotIndices];
    updated[slotIdx] = optionIdx;
    setSlotIndices(updated);
    setBuiltCount((c) => {
      const next = c + 1;
      if (next === 10 && onAwardXP) onAwardXP(20);
      return next;
    });
  };

  const handleClear = () => {
    setSlotIndices(currentTemplate.slots.map(() => 0));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSentence.english);
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

  const handleRandomize = () => {
    const random = currentTemplate.slots.map((slot) =>
      Math.floor(Math.random() * slot.options.length)
    );
    setSlotIndices(random);
    setBuiltCount((c) => c + 1);
  };

  const colorBadgeClasses: Record<string, string> = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900 dark:bg-indigo-950/70 dark:border-indigo-800 dark:text-indigo-200',
    sky: 'bg-sky-50 border-sky-200 text-sky-900 dark:bg-sky-950/70 dark:border-sky-800 dark:text-sky-200',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/70 dark:border-emerald-800 dark:text-emerald-200',
    amber: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/70 dark:border-amber-800 dark:text-amber-200',
    purple: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/70 dark:border-purple-800 dark:text-purple-200',
  };

  return (
    <div id="interactive-sentence-builder" className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-sky-50/50 p-6 sm:p-7 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-bold text-white shadow-xs">
                <Wand2 className="h-3.5 w-3.5" />
                Visual Sentence Builder
              </span>
              <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 font-bangla">
                ব্লক দিয়ে ইংরেজি বাক্য তৈরি করুন
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              [Subject] + [Verb] + [Object] + [Place] + [Time]
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl font-sans">
              যেকোনো ব্লকে ক্লিক করে শব্দ পরিবর্তন করুন। মুহূর্তের মধ্যে ইংরেজি বাক্য এবং সঠিক বাংলা অনুবাদ তৈরি হবে।
            </p>
          </div>

          {/* Gamified Challenge Badge */}
          <div className="flex items-center gap-3 rounded-2xl border border-indigo-200 bg-white/95 p-3.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/90 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs font-black">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Sentence Challenge
              </div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                {builtCount} টি বাক্য তৈরি
              </div>
              <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold font-bangla">
                {builtCount >= 10 ? '🎉 লক্ষ্য অর্জিত! (+20 XP)' : '১০টি বাক্য তৈরি করে XP পান'}
              </div>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-slate-200/70 dark:border-slate-800">
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={tmpl.id}
              onClick={() => {
                setTemplateIdx(idx);
                setSlotIndices(tmpl.slots.map(() => 0));
              }}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                templateIdx === idx
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
              }`}
            >
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Interactive Block Chain */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interactive Block Chain (ক্লিক করে শব্দ পরিবর্তন করুন)
            </span>
          </div>
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Randomize</span>
          </button>
        </div>

        {/* The 5 Clickable Blocks Chain */}
        <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
          {currentTemplate.slots.map((slot, sIdx) => {
            const currentOption = selectedOptions[sIdx];
            const is3rd = ['He', 'She', 'Rahim'].includes(selectedOptions[0]?.value);
            const displayVal = (sIdx === 1 && is3rd && currentOption.thirdPersonValue)
              ? currentOption.thirdPersonValue
              : currentOption.value;

            return (
              <React.Fragment key={sIdx}>
                <div
                  onClick={() => setActiveSlotModal(activeSlotModal === sIdx ? null : sIdx)}
                  className={`cursor-pointer rounded-2xl border-2 p-3 sm:p-3.5 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    colorBadgeClasses[slot.color] || colorBadgeClasses.indigo
                  } ${activeSlotModal === sIdx ? 'ring-2 ring-indigo-500 shadow-md' : 'shadow-xs'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                      {slot.role}
                    </span>
                    <span className="text-[10px] font-bangla opacity-70 font-semibold">
                      {slot.roleBangla}
                    </span>
                  </div>
                  <div className="mt-1 text-base sm:text-lg font-black tracking-tight">
                    {displayVal}
                  </div>
                  <div className="text-xs opacity-80 font-bangla font-semibold">
                    {currentOption.bangla}
                  </div>
                </div>

                {sIdx < currentTemplate.slots.length - 1 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 font-black text-sm shrink-0">
                    +
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Live Sentence Preview Output Box */}
        <div className="mt-7 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-6 dark:border-indigo-950/60 dark:bg-slate-800/40">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Sentence Preview & Instant Translation</span>
          </div>

          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug font-sans">
            &ldquo;{currentSentence.english}&rdquo;
          </div>

          <div className="mt-2 text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-300 font-bangla flex items-start gap-2">
            <span className="shrink-0 text-xs px-2 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-sans font-bold">
              বাংলা
            </span>
            <span>&ldquo;{currentSentence.bangla}&rdquo;</span>
          </div>

          {/* Action Buttons: Pronunciation, Copy, Clear, Save to Word Bank */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-indigo-100/80 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => speakText(currentSentence.english, 'US')}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition-all active:scale-95"
              >
                <Volume2 className="h-4 w-4" />
                <span>উচ্চারণ শুনুন (Audio)</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'কপি হয়েছে!' : 'Copy'}</span>
              </button>

              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-2xs"
                title="রিসেট করুন"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                <span>Clear</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3.5 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50 dark:border-indigo-900 dark:bg-slate-800 dark:text-indigo-300 transition-colors shadow-2xs"
              >
                {savedSuccess ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <BookmarkPlus className="h-3.5 w-3.5 text-amber-500" />
                )}
                <span>{savedSuccess ? 'সংরক্ষিত!' : 'Add to Word Bank'}</span>
              </button>
            </div>

            {onSendToAITutor && (
              <button
                onClick={() => onSendToAITutor(currentSentence.english)}
                className="flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2.5 text-xs font-bold text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                <span>Practice with AI Tutor</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Clickable Slot Options */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {currentTemplate.slots.map((slot, sIdx) => {
          const currentSelectedIdx = slotIndices[sIdx] ?? 0;
          return (
            <div
              key={sIdx}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {slot.role}
                </span>
                <h3 className="text-xs font-black text-slate-900 dark:text-white">
                  {slot.roleBangla}
                </h3>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                {slot.options.map((opt, oIdx) => {
                  const isSelected = currentSelectedIdx === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectSlotOption(sIdx, oIdx)}
                      className={`w-full rounded-xl p-2 text-left text-xs transition-all ${
                        isSelected
                          ? 'border-2 border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-2xs dark:bg-indigo-950/60 dark:text-indigo-200'
                          : 'border border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-sans font-bold capitalize">{opt.value}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla">
                        {opt.bangla}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
