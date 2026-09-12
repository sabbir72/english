import React, { useState } from 'react';
import {
  Bookmark,
  Volume2,
  BookOpen,
  MessageSquareQuote,
  GraduationCap,
  Trash2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { VocabularyItem, SentenceItem, GrammarLesson, NavigationTab } from '../types';
import { speakText } from '../utils/speech';

interface SavedContentSectionProps {
  vocabulary: VocabularyItem[];
  sentences: SentenceItem[];
  grammarLessons: GrammarLesson[];
  onToggleFavoriteVocab: (id: string) => void;
  onToggleSaveSentence: (id: string) => void;
  onToggleSaveGrammar: (id: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const SavedContentSection: React.FC<SavedContentSectionProps> = ({
  vocabulary,
  sentences,
  grammarLessons,
  onToggleFavoriteVocab,
  onToggleSaveSentence,
  onToggleSaveGrammar,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'words' | 'sentences' | 'grammar'>('all');

  const savedWords = vocabulary.filter((v) => v.isFavorite);
  const savedSentences = sentences.filter((s) => s.isSaved);
  const savedGrammar = grammarLessons.filter((g) => g.isSaved);

  const totalSaved = savedWords.length + savedSentences.length + savedGrammar.length;

  return (
    <div id="saved-content-section" className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Personal Collection
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="h-6 w-6 text-amber-500 fill-amber-500" />
              <span>My Saved / সংরক্ষিত পাঠ</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              আপনার বুকমার্ক করা শব্দ, বাক্য ও ব্যাকরণ নিয়ম একনজরে রিভিশন দিন।
            </p>
          </div>

          <span className="rounded-2xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            {totalSaved} items saved
          </span>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Items', count: totalSaved },
            { id: 'words', label: 'Words', count: savedWords.length, icon: <BookOpen className="h-3.5 w-3.5" /> },
            { id: 'sentences', label: 'Sentences', count: savedSentences.length, icon: <MessageSquareQuote className="h-3.5 w-3.5" /> },
            { id: 'grammar', label: 'Grammar', count: savedGrammar.length, icon: <GraduationCap className="h-3.5 w-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeFilter === tab.id
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {totalSaved === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <Bookmark className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            এখনও কোনো পাঠ সংরক্ষণ করা হয়নি
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            শেখার সময় যেকোনো শব্দ, বাক্য বা ব্যাকরণ কার্ডের বুকমার্ক আইকনে ক্লিক করে সহজেই এখানে সেভ করে রাখুন।
          </p>
          <button
            onClick={() => onNavigate('learn')}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
          >
            <span>Start Learning</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Saved Words List */}
      {(activeFilter === 'all' || activeFilter === 'words') && savedWords.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span>Saved Words ({savedWords.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedWords.map((w) => (
              <div
                key={w.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {w.partOfSpeech}
                    </span>
                    <button
                      onClick={() => onToggleFavoriteVocab(w.id)}
                      className="text-slate-400 hover:text-rose-500"
                      title="Remove from saved"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      {w.word}
                    </h4>
                    <button
                      onClick={() => speakText(w.word)}
                      className="text-slate-400 hover:text-emerald-600"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {w.banglaMeaning}
                  </p>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 italic">
                    &ldquo;{w.example}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Sentences List */}
      {(activeFilter === 'all' || activeFilter === 'sentences') && savedSentences.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquareQuote className="h-4 w-4 text-blue-600" />
            <span>Saved Sentences ({savedSentences.length})</span>
          </h3>

          <div className="space-y-3">
            {savedSentences.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {s.englishSentence}
                    </p>
                    <button
                      onClick={() => speakText(s.englishSentence)}
                      className="text-slate-400 hover:text-blue-600"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-sans">
                    {s.banglaTranslation}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500">
                    Structure: {s.structureFormula}
                  </p>
                </div>

                <button
                  onClick={() => onToggleSaveSentence(s.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                  title="Remove from saved"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Grammar Lessons List */}
      {(activeFilter === 'all' || activeFilter === 'grammar') && savedGrammar.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <span>Saved Grammar Topics ({savedGrammar.length})</span>
          </h3>

          <div className="space-y-3">
            {savedGrammar.map((g) => (
              <div
                key={g.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {g.title} ({g.titleBangla})
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                    {g.descriptionBangla}
                  </p>
                  <div className="mt-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-mono font-bold text-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                    {g.ruleFormula}
                  </div>
                </div>

                <button
                  onClick={() => onToggleSaveGrammar(g.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                  title="Remove from saved"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
