import React, { useState, useMemo } from 'react';
import { Search, X, Volume2, ArrowRight, BookOpen, Layers, GraduationCap, MessageSquareQuote } from 'lucide-react';
import { VocabularyItem, SentenceItem, SentenceStructureItem, GrammarLesson, NavigationTab } from '../types';
import { speakText } from '../utils/speech';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabulary: VocabularyItem[];
  sentences: SentenceItem[];
  structures: SentenceStructureItem[];
  grammar: GrammarLesson[];
  onNavigate: (tab: NavigationTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  vocabulary,
  sentences,
  structures,
  grammar,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        vocab: vocabulary.slice(0, 4),
        sentences: sentences.slice(0, 2),
        structures: structures.slice(0, 2),
        grammar: grammar.slice(0, 2),
      };
    }

    const q = query.toLowerCase().trim();

    return {
      vocab: vocabulary.filter(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.banglaMeaning.toLowerCase().includes(q) ||
          v.synonyms.some((s) => s.toLowerCase().includes(q))
      ),
      sentences: sentences.filter(
        (s) =>
          s.english.toLowerCase().includes(q) ||
          s.bangla.toLowerCase().includes(q) ||
          s.structure.toLowerCase().includes(q)
      ),
      structures: structures.filter(
        (st) =>
          st.title.toLowerCase().includes(q) ||
          st.formula.toLowerCase().includes(q) ||
          st.explanationBangla.toLowerCase().includes(q)
      ),
      grammar: grammar.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.titleBangla.toLowerCase().includes(q) ||
          g.summaryBangla.toLowerCase().includes(q)
      ),
    };
  }, [query, vocabulary, sentences, structures, grammar]);

  if (!isOpen) return null;

  const totalFound =
    results.vocab.length +
    results.sentences.length +
    results.structures.length +
    results.grammar.length;

  return (
    <div
      id="global-search-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
    >
      <div
        id="global-search-dialog"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            id="global-search-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search words (e.g. improve, take), grammar, sentences, structures..."
            className="ml-3 flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:border-slate-700 dark:bg-slate-800">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {totalFound === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm">কোনো ফলাফল পাওয়া যায়নি (No results found for &ldquo;{query}&rdquo;)</p>
              <p className="mt-1 text-xs">Try searching for &quot;improve&quot;, &quot;tense&quot;, &quot;eating&quot;, or &quot;can&quot;.</p>
            </div>
          ) : (
            <>
              {/* Vocabulary Results */}
              {results.vocab.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
                      Vocabulary / শব্দভাণ্ডার ({results.vocab.length})
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('vocabulary');
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {results.vocab.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 transition-all hover:border-emerald-200 hover:bg-emerald-50/40 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-emerald-800/50"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {item.word}
                            </span>
                            <span className="text-[10px] rounded bg-slate-200/70 px-1 py-0.2 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                              {item.partOfSpeech}
                            </span>
                          </div>
                          <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                            {item.banglaMeaning}
                          </p>
                        </div>
                        <button
                          onClick={() => speakText(item.word)}
                          className="ml-2 rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-emerald-600 dark:hover:bg-slate-700 dark:hover:text-emerald-400"
                          title="Listen pronunciation"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sentences Results */}
              {results.sentences.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <MessageSquareQuote className="h-3.5 w-3.5 text-blue-500" />
                      Sentences / বাক্য ({results.sentences.length})
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('sentences');
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {results.sentences.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-800/40"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-xs text-slate-900 dark:text-white">
                            {item.english}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {item.bangla}
                          </p>
                        </div>
                        <button
                          onClick={() => speakText(item.english)}
                          className="ml-2 rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                          title="Listen sentence"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Structure Results */}
              {results.structures.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-amber-500" />
                      Sentence Structure ({results.structures.length})
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('sentence-structure');
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-amber-600 hover:underline dark:text-amber-400"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {results.structures.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onNavigate('sentence-structure');
                          onClose();
                        }}
                        className="cursor-pointer rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 transition-colors hover:border-amber-200 dark:border-slate-800 dark:bg-slate-800/40"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">
                            {item.formula}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                          {item.explanationBangla}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grammar Results */}
              {results.grammar.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-purple-500" />
                      Grammar Topics ({results.grammar.length})
                    </span>
                    <button
                      onClick={() => {
                        onNavigate('grammar');
                        onClose();
                      }}
                      className="text-[11px] font-semibold text-purple-600 hover:underline dark:text-purple-400"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {results.grammar.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onNavigate('grammar');
                          onClose();
                        }}
                        className="cursor-pointer rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 transition-colors hover:border-purple-200 dark:border-slate-800 dark:bg-slate-800/40"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {item.title}
                          </span>
                          <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
                            {item.titleBangla}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                          {item.summaryBangla}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
