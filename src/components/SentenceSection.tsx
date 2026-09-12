import React, { useState } from 'react';
import {
  Volume2,
  Bookmark,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  MessageSquareQuote,
  Copy,
  Check,
} from 'lucide-react';
import { SentenceItem, NavigationTab } from '../types';
import { speakText } from '../utils/speech';

interface SentenceSectionProps {
  sentences: SentenceItem[];
  onToggleSaveSentence: (id: string) => void;
  onNavigate: (tab: NavigationTab) => void;
  onPracticeSentence: (sentence: SentenceItem) => void;
  onAIGenerateSimilar: (seed: string) => void;
}

export const SentenceSection: React.FC<SentenceSectionProps> = ({
  sentences,
  onToggleSaveSentence,
  onNavigate,
  onPracticeSentence,
  onAIGenerateSimilar,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredSentences = sentences.filter((s) => {
    if (filterDifficulty !== 'all' && s.difficulty !== filterDifficulty) return false;
    if (filterType !== 'all' && s.sentenceType !== filterType) return false;
    return true;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="sentence-section" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sentence Learning Module / বাক্য ও প্রয়োগ
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            গঠনপ্রণালী, ব্যাকরণগত ব্যাখ্যা এবং সদৃশ উদাহরণসহ ইংরেজি বাক্য শিখুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Difficulty filter */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Sentence Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">All Sentence Types</option>
            <option value="Affirmative">Affirmative (হ্যাঁ-বোধক)</option>
            <option value="Negative">Negative (না-বোধক)</option>
            <option value="Interrogative">Interrogative (প্রশ্নবোধক)</option>
          </select>
        </div>
      </div>

      {/* Sentence Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredSentences.map((item) => (
          <div
            key={item.id}
            id={`sentence-card-${item.id}`}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500"
          >
            <div className="space-y-4">
              {/* Header tags */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                    {item.tense || item.sentenceType}
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {item.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(item.english, item.id)}
                    className="rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Copy sentence"
                  >
                    {copiedId === item.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => onToggleSaveSentence(item.id)}
                    className={`rounded p-1 transition-colors ${
                      item.isSaved
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-400 hover:text-amber-500'
                    }`}
                    title={item.isSaved ? 'Saved' : 'Save for review'}
                  >
                    <Bookmark className={`h-4 w-4 ${item.isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Main Sentence & Bangla Meaning */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    &ldquo;{item.english}&rdquo;
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => speakText(item.english, 1.0)}
                      className="rounded-lg bg-blue-50 p-2 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900"
                      title="Listen (Normal speed)"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => speakText(item.english, 0.65)}
                      className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      title="Listen (Slow speed)"
                    >
                      Slow
                    </button>
                  </div>
                </div>

                <div className="mt-2 rounded-xl bg-blue-50/50 p-2.5 text-sm font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-200">
                  {item.bangla}
                </div>
              </div>

              {/* Structure Formula */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs dark:border-slate-800/80 dark:bg-slate-800/40">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <Layers className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Sentence Structure (গঠন কাঠামো):</span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-blue-700 dark:text-blue-300">
                  {item.structure}
                </div>
                <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.grammarExplanationBangla}
                </p>
              </div>

              {/* Important Vocab */}
              {item.importantVocab && item.importantVocab.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] font-semibold text-slate-400">Important Words:</span>
                  {item.importantVocab.map((v, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      <span className="font-semibold text-slate-900 dark:text-white">{v.word}</span>
                      <span className="text-slate-500">({v.bangla})</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Similar Examples */}
              {item.similarExamples && item.similarExamples.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Similar Sentences (একই নিয়মের অন্যান্য বাক্য):
                  </span>
                  {item.similarExamples.map((sim, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-xs dark:bg-slate-800/60"
                    >
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {sim.english}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {sim.bangla}
                        </div>
                      </div>
                      <button
                        onClick={() => speakText(sim.english)}
                        className="ml-2 rounded p-1 text-slate-400 hover:text-blue-600"
                        title="Listen"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <button
                onClick={() => onAIGenerateSimilar(item.english)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <Sparkles className="h-3 w-3 text-emerald-500" />
                <span>AI Similar Generator</span>
              </button>

              <button
                onClick={() => onPracticeSentence(item)}
                className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-500"
              >
                <span>Practice Rearrange</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
