import React, { useState } from 'react';
import {
  BookOpen,
  MessageSquareQuote,
  Layers,
  GraduationCap,
  Mic,
  Sparkles,
  Wand2,
  Shuffle,
  Network,
  Compass,
  Languages,
  AlertTriangle,
} from 'lucide-react';
import {
  VocabularyItem,
  SentenceItem,
  SentenceStructureItem,
  GrammarLesson,
  NavigationTab,
  LearnSubTab,
} from '../types';
import { VocabularySection } from './VocabularySection';
import { SentenceSection } from './SentenceSection';
import { SentenceStructureSection } from './SentenceStructureSection';
import { GrammarSection } from './GrammarSection';
import { PronunciationSection } from './PronunciationSection';
import { LearnWordModal } from './LearnWordModal';

// Core Methodology Components
import { SentencePatternLibrary } from './methodology/SentencePatternLibrary';
import { InteractiveSentenceBuilder } from './methodology/InteractiveSentenceBuilder';
import { SentenceTransformationSection } from './methodology/SentenceTransformationSection';
import { WordFamilyAndNetworkSection } from './methodology/WordFamilyAndNetworkSection';
import { SituationalVocabSection } from './methodology/SituationalVocabSection';
import { TranslationPracticeSection } from './methodology/TranslationPracticeSection';
import { CommonMistakeSection } from './methodology/CommonMistakeSection';

// Core Methodology Data
import {
  CORE_SENTENCE_PATTERNS,
  SENTENCE_TRANSFORMATIONS,
  CORE_WORD_FAMILIES,
  SITUATIONAL_VOCAB_TOPICS,
  TRANSLATION_DRILLS,
  COMMON_MISTAKES_DATA,
} from '../data/methodologyData';

interface LearnMainSectionProps {
  initialSubTab?: LearnSubTab;
  vocabulary: VocabularyItem[];
  sentences: SentenceItem[];
  sentenceStructures: SentenceStructureItem[];
  grammarLessons: GrammarLesson[];
  onToggleFavoriteVocab: (id: string) => void;
  onToggleLearnedVocab: (id: string) => void;
  onPracticeVocabWord: (word: VocabularyItem) => void;
  onToggleSaveSentence: (id: string) => void;
  onPracticeSentence: (sentence: SentenceItem) => void;
  onAIGenerateSimilar: (seed: string) => void;
  onToggleCompleteGrammar: (id: string) => void;
  onAskAIGrammar: (topicTitle: string) => void;
  onAskAIStructure: (structureName: string) => void;
  onIncrementSpeakingMinutes: (minutes: number) => void;
  onNavigate: (tab: NavigationTab) => void;
  onAwardXP?: (amount: number) => void;
}

export const LearnMainSection: React.FC<LearnMainSectionProps> = ({
  initialSubTab = 'patterns',
  vocabulary,
  sentences,
  sentenceStructures,
  grammarLessons,
  onToggleFavoriteVocab,
  onToggleLearnedVocab,
  onPracticeVocabWord,
  onToggleSaveSentence,
  onPracticeSentence,
  onAIGenerateSimilar,
  onToggleCompleteGrammar,
  onAskAIGrammar,
  onAskAIStructure,
  onIncrementSpeakingMinutes,
  onNavigate,
  onAwardXP,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<LearnSubTab>(initialSubTab);
  const [activeLearnWord, setActiveLearnWord] = useState<VocabularyItem | null>(null);

  const methodologyTabs: {
    id: LearnSubTab;
    label: string;
    labelBn: string;
    icon: React.ReactNode;
    isPrimary?: boolean;
  }[] = [
    {
      id: 'patterns',
      label: 'Pattern Library',
      labelBn: 'বাক্যের প্যাটার্ন',
      icon: <Layers className="h-4 w-4" />,
      isPrimary: true,
    },
    {
      id: 'builder',
      label: 'Sentence Builder',
      labelBn: 'বাক্য নির্মাতা',
      icon: <Wand2 className="h-4 w-4" />,
      isPrimary: true,
    },
    {
      id: 'transformation',
      label: 'Transformation',
      labelBn: '৭ রূপে রূপান্তর',
      icon: <Shuffle className="h-4 w-4" />,
      isPrimary: true,
    },
    {
      id: 'word-family',
      label: 'Word Family',
      labelBn: 'শব্দ পরিবার ও জাল',
      icon: <Network className="h-4 w-4" />,
      isPrimary: true,
    },
    {
      id: 'context-vocab',
      label: 'Situational Vocab',
      labelBn: 'বাস্তব কথোপকথন',
      icon: <Compass className="h-4 w-4" />,
    },
    {
      id: 'translation',
      label: 'Translation Drill',
      labelBn: 'বাংলা ⇄ ইংরেজি',
      icon: <Languages className="h-4 w-4" />,
    },
    {
      id: 'mistakes',
      label: 'Common Mistakes',
      labelBn: 'ভুল ও সমাধান',
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  ];

  const foundationTabs: {
    id: LearnSubTab;
    label: string;
    labelBn: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'vocabulary',
      label: 'Vocabulary',
      labelBn: 'শব্দভাণ্ডার',
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 'sentences',
      label: 'Sentences',
      labelBn: 'দৈনিক বাক্য',
      icon: <MessageSquareQuote className="h-4 w-4" />,
    },
    {
      id: 'structures',
      label: 'Grammar Formulas',
      labelBn: 'গঠন ও নিয়ম',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 'grammar',
      label: 'Grammar',
      labelBn: 'সহজ ব্যাকরণ',
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      id: 'pronunciation',
      label: 'Pronunciation',
      labelBn: 'সঠিক উচ্চারণ',
      icon: <Mic className="h-4 w-4" />,
    },
  ];

  return (
    <div id="learn-main-section" className="space-y-6">
      {/* Top Banner & Module Selector */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Methodology Driven Learning
              </span>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                বাংলা থেকে ইংরেজি
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              How to Build English (মুখস্থ নয়, বাক্য তৈরি শিখুন)
            </h1>
            <p className="text-xs text-slate-500 font-sans mt-0.5 max-w-2xl">
              একটি মূল কাঠামো আয়ত্ত করে শত শত বাক্য তৈরি করুন, শব্দের পরিবার জানুন এবং বাস্তব পরিস্থিতিতে অনুশীলন করে ফ্লুয়েন্ট হন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('builder')}
              className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-transform active:scale-95"
            >
              <Wand2 className="h-3.5 w-3.5" />
              <span>Sentence Builder</span>
            </button>
          </div>
        </div>

        {/* Section 1: Core Methodology Navigation */}
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            ✦ Core Methodology (বাক্য তৈরি ও ফ্লুয়েন্সি লুপ):
          </div>
          <div className="flex flex-wrap gap-2">
            {methodologyTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 scale-[1.02]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Reference & Foundations */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            📚 Foundations & Reference:
          </div>
          <div className="flex flex-wrap gap-2">
            {foundationTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-850 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render Active Sub-module */}
      <div>
        {/* Core Methodology Modules */}
        {activeSubTab === 'patterns' && (
          <SentencePatternLibrary
            patterns={CORE_SENTENCE_PATTERNS}
            onOpenInBuilder={() => setActiveSubTab('builder')}
            onAskAIStructure={onAskAIStructure}
            onAwardXP={onAwardXP}
          />
        )}

        {activeSubTab === 'builder' && (
          <InteractiveSentenceBuilder
            onSaveSentence={(sent) => {
              if (onToggleSaveSentence) {
                // save through sentence logic
              }
            }}
            onSendToAITutor={(sent) => {
              onNavigate('ai-tutor');
            }}
            onAwardXP={onAwardXP}
          />
        )}

        {activeSubTab === 'transformation' && (
          <SentenceTransformationSection
            transformations={SENTENCE_TRANSFORMATIONS}
            onAwardXP={onAwardXP}
          />
        )}

        {activeSubTab === 'word-family' && (
          <WordFamilyAndNetworkSection families={CORE_WORD_FAMILIES} />
        )}

        {activeSubTab === 'context-vocab' && (
          <SituationalVocabSection
            topics={SITUATIONAL_VOCAB_TOPICS}
            onStartScenarioChat={(title, prompt) => {
              onNavigate('ai-tutor');
            }}
          />
        )}

        {activeSubTab === 'translation' && (
          <TranslationPracticeSection
            drills={TRANSLATION_DRILLS}
            onAwardXP={onAwardXP}
          />
        )}

        {activeSubTab === 'mistakes' && (
          <CommonMistakeSection
            mistakes={COMMON_MISTAKES_DATA}
            onAwardXP={onAwardXP}
          />
        )}

        {/* Foundational Modules */}
        {activeSubTab === 'vocabulary' && (
          <VocabularySection
            vocabulary={vocabulary}
            onToggleFavorite={onToggleFavoriteVocab}
            onToggleLearned={onToggleLearnedVocab}
            onPracticeWord={(word) => {
              setActiveLearnWord(word);
              onPracticeVocabWord(word);
            }}
          />
        )}

        {activeSubTab === 'sentences' && (
          <SentenceSection
            sentences={sentences}
            onToggleSaveSentence={onToggleSaveSentence}
            onNavigate={onNavigate}
            onPracticeSentence={onPracticeSentence}
            onAIGenerateSimilar={onAIGenerateSimilar}
          />
        )}

        {activeSubTab === 'structures' && (
          <SentenceStructureSection
            structures={sentenceStructures}
            onNavigate={onNavigate}
            onAskAIStructure={onAskAIStructure}
          />
        )}

        {activeSubTab === 'grammar' && (
          <GrammarSection
            grammarLessons={grammarLessons}
            onToggleCompleteLesson={onToggleCompleteGrammar}
            onAskAIGrammar={onAskAIGrammar}
            onNavigate={onNavigate}
          />
        )}

        {activeSubTab === 'pronunciation' && (
          <PronunciationSection
            vocabulary={vocabulary}
            sentences={sentences}
            onIncrementSpeakingCount={() => onIncrementSpeakingMinutes(1)}
          />
        )}
      </div>

      {/* Mini Lesson Modal for Vocabulary */}
      <LearnWordModal
        word={activeLearnWord}
        isOpen={!!activeLearnWord}
        onClose={() => setActiveLearnWord(null)}
        onCompleteLesson={(id) => {
          onToggleLearnedVocab(id);
          if (onAwardXP) onAwardXP(10);
          setActiveLearnWord(null);
        }}
      />
    </div>
  );
};

