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
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSentences = sentences.filter((s) => {
    if (filterDifficulty !== 'all' && s.difficulty !== filterDifficulty) return false;
    if (filterType !== 'all' && s.sentenceType !== filterType) return false;
    if (filterCategory !== 'all' && s.category !== filterCategory) return false;
    return true;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'সকল ক্যাটাগরি (All)' },
    { id: 'Meetings & Strategy', label: '💼 মিটিং ও কৌশল (Meetings)' },
    { id: 'Email & Client Relations', label: '✉️ ইমেইল ও ক্লায়েন্ট (Email)' },
    { id: 'Project & Workflow', label: '⚡ প্রজেক্ট ও ডেলিভারি (Workflow)' },
    { id: 'Negotiation & Decisions', label: '🤝 নেগোশিয়েশন ও ডিল (Deals)' },
    { id: 'Teamwork & Diplomacy', label: '👥 টিমওয়ার্ক ও কূটনীতি (Teamwork)' },
    { id: 'Tech & Quality', label: '🛡️ টেক ও কমপ্লায়েন্স (Tech/QA)' },
  ];

  return (
    <div id="sentence-section" className="space-y-6">
      {/* Header banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-sky-50/60 p-5 sm:p-6 shadow-xs dark:border-indigo-950/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100/80 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 mb-1.5">
            <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span>Executive & Workplace English Curriculum</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Professional Sentence Lab / কর্মক্ষেত্রের পেশাদার বাক্য
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            আন্তর্জাতিক মানের বিজনেস মিটিং, ক্লায়েন্ট ইমেইল, টিম লিডারশিপ ও প্রজেক্ট ম্যানেজমেন্টের বাস্তবসম্মত ইংরেজি বাক্য ও গঠনরীতি।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs">
            মোট {filteredSentences.length}টি বাক্য উপলব্ধ
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        {/* Category filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Difficulties (সব পর্যায়)</option>
          <option value="Beginner">Beginner (প্রাথমিক)</option>
          <option value="Intermediate">Intermediate (মধ্যবর্তী)</option>
          <option value="Advanced">Advanced (উন্নত/এক্সিকিউটিভ)</option>
        </select>

        {/* Sentence Type filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Sentence Types</option>
          <option value="Affirmative">Affirmative (হ্যাঁ-বোধক)</option>
          <option value="Negative">Negative (না-বোধক)</option>
          <option value="Interrogative">Interrogative (প্রশ্নবোধক)</option>
          <option value="Imperative">Imperative (নির্দেশ বা অনুরোধ)</option>
        </select>

        {(filterCategory !== 'all' || filterDifficulty !== 'all' || filterType !== 'all') && (
          <button
            onClick={() => {
              setFilterCategory('all');
              setFilterDifficulty('all');
              setFilterType('all');
            }}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1"
          >
            ফিল্টার রিসেট
          </button>
        )}
      </div>

      {/* Sentence Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredSentences.map((item) => (
          <div
            key={item.id}
            id={`sentence-card-${item.id}`}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
          >
            <div className="space-y-4">
              {/* Header tags */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.category && (
                    <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                      {item.category}
                    </span>
                  )}
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
