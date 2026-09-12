import React from 'react';
import {
  BookOpen,
  MessageSquareQuote,
  Layers,
  GraduationCap,
  Mic,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { NavigationTab, LearnSubTab } from '../../types';

export interface LearnDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSubTab: (subTab: LearnSubTab) => void;
  activeSubTab?: LearnSubTab;
}

export const LearnDrawerModal: React.FC<LearnDrawerModalProps> = ({
  isOpen,
  onClose,
  onSelectSubTab,
  activeSubTab,
}) => {
  const items = [
    {
      id: 'patterns' as LearnSubTab,
      title: 'Sentence Patterns',
      titleBn: 'প্যাটার্ন লাইব্রেরি',
      desc: 'Learn core structures to generate hundreds of natural sentences',
      icon: <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'builder' as LearnSubTab,
      title: 'Sentence Builder',
      titleBn: 'ইন্টারঅ্যাক্টিভ বাক্য নির্মাতা',
      desc: 'Tap slots to build sentences dynamically with Bengali meaning',
      icon: <Layers className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
      color: 'bg-teal-50 dark:bg-teal-950/60',
    },
    {
      id: 'transformation' as LearnSubTab,
      title: 'Transformation (7 Forms)',
      titleBn: '৭ রূপে রূপান্তর',
      desc: 'Master Positive, Negative, Question, Past, Future & Continuous',
      icon: <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      color: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      id: 'word-family' as LearnSubTab,
      title: 'Word Family & Network',
      titleBn: 'শব্দ পরিবার ও শব্দজাল',
      desc: 'Learn 1 root word, discover Verbs, Nouns, Adjectives & Collocations',
      icon: <Layers className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />,
      color: 'bg-cyan-50 dark:bg-cyan-950/60',
    },
    {
      id: 'context-vocab' as LearnSubTab,
      title: 'Situational Vocab',
      titleBn: 'বাস্তব কথোপকথন',
      desc: 'Workplace, Airport, Interview dialogues in context',
      icon: <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      color: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: 'translation' as LearnSubTab,
      title: 'Translation Drill',
      titleBn: 'বাংলা ⇄ ইংরেজি অনুবাদ',
      desc: 'Practice translating natural thoughts with multiple accepted answers',
      icon: <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      color: 'bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'mistakes' as LearnSubTab,
      title: 'Common Mistakes',
      titleBn: 'বাঙালিদের ভুল ও সমাধান',
      desc: 'Understand why literal Bengali thinking causes common errors',
      icon: <BookOpen className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
      color: 'bg-rose-50 dark:bg-rose-950/60',
    },
    {
      id: 'vocabulary' as LearnSubTab,
      title: 'Vocabulary Flashcards',
      titleBn: 'শব্দভাণ্ডার',
      desc: 'Learn everyday words with Bengali meanings & audio',
      icon: <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'sentences' as LearnSubTab,
      title: 'Sentences',
      titleBn: 'বাক্য ও প্রয়োগ',
      desc: 'Common daily phrases and practical sentence patterns',
      icon: <MessageSquareQuote className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      color: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: 'grammar' as LearnSubTab,
      title: 'Grammar',
      titleBn: 'সহজ ব্যাকরণ',
      desc: 'Tenses, parts of speech & syntax made beginner-friendly',
      icon: <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      color: 'bg-purple-50 dark:bg-purple-950/60',
    },
    {
      id: 'pronunciation' as LearnSubTab,
      title: 'Pronunciation',
      titleBn: 'সঠিক উচ্চারণ',
      desc: 'Microphone speech practice and accent perfection',
      icon: <Mic className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
      color: 'bg-rose-50 dark:bg-rose-950/60',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Learn English Modules"
      subtitle="কী শিখতে চান বেছে নিন"
      maxWidth="md"
    >
      <div className="space-y-2.5">
        {items.map((item) => {
          const isSelected = activeSubTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectSubTab(item.id);
                onClose();
              }}
              className={`flex w-full items-center justify-between rounded-2xl p-3.5 text-left transition-all duration-150 ${
                isSelected
                  ? 'border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'border border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </span>
                    <span className="text-xs text-slate-400 font-sans font-medium">
                      ({item.titleBn})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
            </button>
          );
        })}
      </div>
    </Modal>
  );
};
