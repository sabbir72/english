import React, { useState } from 'react';
import {
  Network,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Share2,
  Layers,
} from 'lucide-react';
import { WordFamilyItem } from '../../types';
import { speakText } from '../../utils/speech';

interface WordFamilyAndNetworkSectionProps {
  families: WordFamilyItem[];
}

export const WordFamilyAndNetworkSection: React.FC<WordFamilyAndNetworkSectionProps> = ({
  families,
}) => {
  const [selectedFamilyId, setSelectedFamilyId] = useState(families[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'family' | 'network' | 'sentences' | 'chain'>('family');
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<{ label: string; bangla: string; type: string } | null>(null);

  const currentFamily = families.find((f) => f.id === selectedFamilyId) || families[0];

  return (
    <div id="word-family-and-network-section" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-teal-100 px-3 py-0.5 text-xs font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                Rule #7, #8 & #10
              </span>
              <span className="text-xs text-slate-500">এক শব্দ শিখুন, আরও ৮টি আবিষ্কার করুন</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Word Family & Network (শব্দ পরিবার ও রিলেটেড ওয়ার্ডস)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              প্রতিটি শব্দের শিকড় (Root) থেকে Verb, Noun, Adjective এবং Adverb তৈরি হয়। মুখস্থ না করে শব্দগুলোর পারস্পরিক সম্পর্ক বুঝলে ভোকাবুলারি মনে রাখা অনেক সহজ হয়।
            </p>
          </div>

          {/* Root Word Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {families.map((fam) => (
              <button
                key={fam.id}
                onClick={() => {
                  setSelectedFamilyId(fam.id);
                  setSelectedNodeInfo(null);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedFamilyId === fam.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {fam.rootWord}
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentFamily && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          {/* Spotlight on Root Word */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 dark:border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {currentFamily.rootWord}
                </h3>
                <span className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-mono font-bold text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                  {currentFamily.ipa}
                </span>
                <span className="text-xs text-slate-500">
                  ({currentFamily.pronunciationBangla})
                </span>
                <button
                  onClick={() => speakText(currentFamily.rootWord)}
                  className="rounded-lg p-1 text-slate-400 hover:text-teal-600"
                  title="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1 text-base font-bold text-emerald-700 dark:text-emerald-400">
                বাংলা অর্থ: {currentFamily.banglaMeaning}
              </div>
            </div>

            {/* Sub-nav Tabs */}
            <div className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
              <button
                onClick={() => setActiveTab('family')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === 'family'
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Word Forms
              </button>
              <button
                onClick={() => setActiveTab('network')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === 'network'
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Visual Word Web
              </button>
              <button
                onClick={() => setActiveTab('sentences')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === 'sentences'
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Sentences by Level
              </button>
              <button
                onClick={() => setActiveTab('chain')}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === 'chain'
                    ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Discovery Chain
              </button>
            </div>
          </div>

          {/* TAB 1: Word Forms Grid (Verb, Noun, Adjective, Adverb) */}
          {activeTab === 'family' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                শব্দ পরিবার (Grammatical Forms & Real Sentences):
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                {currentFamily.verb && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-black uppercase text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        Verb (ক্রিয়া)
                      </span>
                      <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                        {currentFamily.verb.word}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {currentFamily.verb.bangla}
                    </p>
                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                      <div className="font-bold text-slate-900 dark:text-white">
                        "{currentFamily.verb.example}"
                      </div>
                      <div className="mt-0.5 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                        {currentFamily.verb.exampleBangla}
                      </div>
                    </div>
                  </div>
                )}

                {currentFamily.noun && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Noun (বিশেষ্য)
                      </span>
                      <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                        {currentFamily.noun.word}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {currentFamily.noun.bangla}
                    </p>
                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                      <div className="font-bold text-slate-900 dark:text-white">
                        "{currentFamily.noun.example}"
                      </div>
                      <div className="mt-0.5 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                        {currentFamily.noun.exampleBangla}
                      </div>
                    </div>
                  </div>
                )}

                {currentFamily.adjective && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Adjective (বিশেষণ)
                      </span>
                      <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                        {currentFamily.adjective.word}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {currentFamily.adjective.bangla}
                    </p>
                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                      <div className="font-bold text-slate-900 dark:text-white">
                        "{currentFamily.adjective.example}"
                      </div>
                      <div className="mt-0.5 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                        {currentFamily.adjective.exampleBangla}
                      </div>
                    </div>
                  </div>
                )}

                {currentFamily.adverb && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-black uppercase text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                        Adverb (ক্রিয়াবিশেষণ)
                      </span>
                      <span className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                        {currentFamily.adverb.word}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {currentFamily.adverb.bangla}
                    </p>
                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                      <div className="font-bold text-slate-900 dark:text-white">
                        "{currentFamily.adverb.example}"
                      </div>
                      <div className="mt-0.5 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold">
                        {currentFamily.adverb.exampleBangla}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Visual Word Web / Network (Section #10) */}
          {activeTab === 'network' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ইন্টারঅ্যাক্টিভ শব্দজাল (Click any bubble to view meaning):
                </span>
                {selectedNodeInfo && (
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-300">
                    {selectedNodeInfo.label} = {selectedNodeInfo.bangla} ({selectedNodeInfo.type})
                  </span>
                )}
              </div>

              {/* Interactive Visual Bubble Layout */}
              <div className="relative min-h-[260px] rounded-3xl border border-teal-200/60 bg-gradient-to-br from-teal-50/50 via-white to-slate-50 p-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 dark:border-slate-800 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
                {currentFamily.networkNodes.map((node) => {
                  const isRoot = node.type === 'root';
                  const isSelected = selectedNodeInfo?.label === node.label;

                  let nodeColor =
                    'border-slate-200 bg-white text-slate-800 hover:scale-105 hover:border-teal-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
                  if (isRoot) {
                    nodeColor =
                      'border-4 border-teal-500 bg-teal-600 text-white font-black shadow-md scale-110';
                  } else if (node.type === 'noun') {
                    nodeColor =
                      'border-2 border-emerald-400 bg-emerald-50 text-emerald-950 font-bold dark:bg-emerald-950/60 dark:text-emerald-200';
                  } else if (node.type === 'synonym') {
                    nodeColor =
                      'border-2 border-blue-400 bg-blue-50 text-blue-950 font-bold dark:bg-blue-950/60 dark:text-blue-200';
                  }

                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        setSelectedNodeInfo(node);
                        speakText(node.label);
                      }}
                      className={`rounded-2xl px-4 py-3 text-center transition-all shadow-xs ${nodeColor} ${
                        isSelected ? 'ring-4 ring-teal-400/50' : ''
                      }`}
                    >
                      <div className="text-sm font-sans font-bold">{node.label}</div>
                      <div className="text-[10px] opacity-85 mt-0.5">{node.bangla}</div>
                    </button>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-500 text-center">
                💡 প্রতিটি নোডে ট্যাপ করলে তার সঠিক উচ্চারণ শোনা যাবে এবং বাংলা অর্থ দেখা যাবে।
              </div>
            </div>
          )}

          {/* TAB 3: Sentences by Level (Section #8) */}
          {activeTab === 'sentences' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                একই শব্দের ব্যবহার ভিন্ন ভিন্ন লেভেলে (Beginner, Intermediate, Advanced):
              </div>

              <div className="space-y-3">
                {/* Beginner */}
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-950/50 dark:bg-emerald-950/20">
                  <div className="flex items-center justify-between pb-1">
                    <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                      Beginner Level
                    </span>
                    <button
                      onClick={() => speakText(currentFamily.sentencesByLevel.beginner.english)}
                      className="text-slate-400 hover:text-emerald-600"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {currentFamily.sentencesByLevel.beginner.english}
                  </div>
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {currentFamily.sentencesByLevel.beginner.bangla}
                  </div>
                </div>

                {/* Intermediate */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950/50 dark:bg-blue-950/20">
                  <div className="flex items-center justify-between pb-1">
                    <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                      Intermediate Level
                    </span>
                    <button
                      onClick={() => speakText(currentFamily.sentencesByLevel.intermediate.english)}
                      className="text-slate-400 hover:text-blue-600"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {currentFamily.sentencesByLevel.intermediate.english}
                  </div>
                  <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mt-0.5">
                    {currentFamily.sentencesByLevel.intermediate.bangla}
                  </div>
                </div>

                {/* Advanced */}
                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4 dark:border-purple-950/50 dark:bg-purple-950/20">
                  <div className="flex items-center justify-between pb-1">
                    <span className="rounded-md bg-purple-600 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                      Advanced Professional
                    </span>
                    <button
                      onClick={() => speakText(currentFamily.sentencesByLevel.advanced.english)}
                      className="text-slate-400 hover:text-purple-600"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {currentFamily.sentencesByLevel.advanced.english}
                  </div>
                  <div className="text-xs font-medium text-purple-700 dark:text-purple-400 mt-0.5">
                    {currentFamily.sentencesByLevel.advanced.bangla}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Learning Discovery Chain (Section #22) */}
          {activeTab === 'chain' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ধারাবাহিক শব্দ আবিষ্কারের চেইন (Vocabulary Expansion Chain):
              </div>

              <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-200 dark:before:bg-teal-900">
                {currentFamily.discoveryChain.map((chainItem, i) => (
                  <div key={i} className="relative flex items-center gap-3">
                    <span className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-black text-white">
                      {i + 1}
                    </span>
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs dark:border-slate-800 dark:bg-slate-900 flex-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {chainItem}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
