import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Heart,
  CheckCircle2,
  Filter,
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Play,
  HelpCircle,
  Dumbbell,
} from 'lucide-react';
import { VocabularyItem, PartOfSpeech } from '../types';
import { speakText } from '../utils/speech';

interface VocabularySectionProps {
  vocabulary: VocabularyItem[];
  onToggleFavorite: (id: string) => void;
  onToggleLearned: (id: string) => void;
  onPracticeWord: (word: VocabularyItem) => void;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  vocabulary,
  onToggleFavorite,
  onToggleLearned,
  onPracticeWord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [posFilter, setPosFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'learned' | 'quiz'>('all');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const filteredVocabulary = useMemo(() => {
    return vocabulary.filter((item) => {
      // Tab filter
      if (activeTab === 'favorites' && !item.isFavorite) return false;
      if (activeTab === 'learned' && !item.isLearned) return false;

      // Level filter
      if (levelFilter !== 'all' && item.difficulty !== levelFilter) return false;

      // POS filter
      if (posFilter !== 'all' && item.partOfSpeech !== posFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesMeaning = item.banglaMeaning.toLowerCase().includes(q);
        const matchesSynonym = item.synonyms.some((s) => s.toLowerCase().includes(q));
        if (!matchesWord && !matchesMeaning && !matchesSynonym) return false;
      }

      return true;
    });
  }, [vocabulary, activeTab, levelFilter, posFilter, searchQuery]);

  // Quiz items generated from vocabulary
  const quizItems = useMemo(() => {
    return vocabulary.slice(0, 10).map((vocab, index) => {
      // Generate 3 wrong options from other words
      const otherMeanings = vocabulary
        .filter((v) => v.id !== vocab.id)
        .map((v) => v.banglaMeaning)
        .slice(0, 3);
      const options = [vocab.banglaMeaning, ...otherMeanings].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(vocab.banglaMeaning);
      return {
        word: vocab.word,
        ipa: vocab.ipa,
        pos: vocab.partOfSpeech,
        options,
        correctIndex,
        example: vocab.example,
        exampleBangla: vocab.exampleBangla,
      };
    });
  }, [vocabulary]);

  const handleSelectQuizOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quizItems[quizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (quizIndex + 1 < quizItems.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizIndex(0);
      setQuizScore(0);
    }
  };

  return (
    <div id="vocabulary-section" className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Vocabulary System / শব্দভাণ্ডার
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            বাংলা অর্থ, উচ্চারণ, পার্টস অব স্পিচ, প্রতিশব্দ ও বাক্য সহযোগে শিখুন।
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            All Words ({vocabulary.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'favorites'
                ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-900 dark:text-rose-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Heart className="h-3 w-3 fill-current" />
            Favorites ({vocabulary.filter((v) => v.isFavorite).length})
          </button>
          <button
            onClick={() => setActiveTab('learned')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'learned'
                ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="h-3 w-3" />
            Learned ({vocabulary.filter((v) => v.isLearned).length})
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-purple-600 shadow-sm dark:bg-slate-900 dark:text-purple-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Dumbbell className="h-3 w-3" />
            Vocab Quiz
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        /* Inline Vocabulary Quiz Mode */
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Vocabulary Quiz • Question {quizIndex + 1} of {quizItems.length}
            </span>
            <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              Score: {quizScore}
            </span>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                {quizItems[quizIndex].word}
              </h3>
              <button
                onClick={() => speakText(quizItems[quizIndex].word)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-purple-600 dark:hover:bg-slate-800"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500 font-mono">{quizItems[quizIndex].ipa}</p>
            <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
              নিচের কোনটি এই শব্দের সঠিক বাংলা অর্থ?
            </p>
          </div>

          <div className="mt-6 space-y-2.5">
            {quizItems[quizIndex].options.map((option, idx) => {
              const isCorrect = idx === quizItems[quizIndex].correctIndex;
              const isSelected = selectedOption === idx;

              let btnStyle =
                'border-slate-200 bg-slate-50 text-slate-800 hover:border-purple-300 hover:bg-purple-50/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle =
                    'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/70 dark:text-emerald-200';
                } else if (isSelected) {
                  btnStyle =
                    'border-rose-500 bg-rose-50 text-rose-900 font-bold dark:bg-rose-950/70 dark:text-rose-200';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuizOption(idx)}
                  disabled={isAnswered}
                  className={`w-full rounded-xl border p-3.5 text-left text-xs transition-all ${btnStyle}`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Example Sentence:
              </div>
              <p className="mt-1 text-xs font-medium text-slate-900 dark:text-white">
                &ldquo;{quizItems[quizIndex].example}&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {quizItems[quizIndex].exampleBangla}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {isAnswered ? (
              <button
                onClick={handleNextQuiz}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white hover:bg-purple-500"
              >
                <span>{quizIndex + 1 === quizItems.length ? 'Restart Quiz' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <p className="text-xs text-slate-400">Select an option to check your answer</p>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Filters Bar */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vocabulary by English or Bangla meaning..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800/60 dark:text-white"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-2">
              {/* Level Filter */}
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <span className="text-slate-400">Level:</span>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="dark:bg-slate-900">All Levels</option>
                  <option value="Beginner" className="dark:bg-slate-900">Beginner</option>
                  <option value="Intermediate" className="dark:bg-slate-900">Intermediate</option>
                  <option value="Advanced" className="dark:bg-slate-900">Advanced</option>
                </select>
              </div>

              {/* Part of Speech Filter */}
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <span className="text-slate-400">POS:</span>
                <select
                  value={posFilter}
                  onChange={(e) => setPosFilter(e.target.value)}
                  className="bg-transparent font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="dark:bg-slate-900">All Types</option>
                  <option value="noun" className="dark:bg-slate-900">Noun</option>
                  <option value="verb" className="dark:bg-slate-900">Verb</option>
                  <option value="adjective" className="dark:bg-slate-900">Adjective</option>
                  <option value="adverb" className="dark:bg-slate-900">Adverb</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vocabulary Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVocabulary.map((item) => (
              <div
                key={item.id}
                id={`vocab-card-${item.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400/80 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-600/80"
              >
                <div>
                  {/* Top Bar: Difficulty, POS, Favorite & Learned */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          item.difficulty === 'Beginner'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                            : item.difficulty === 'Intermediate'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300'
                        }`}
                      >
                        {item.difficulty}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.partOfSpeech}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className={`rounded-lg p-1.5 transition-colors ${
                          item.isFavorite
                            ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                            : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                        title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => onToggleLearned(item.id)}
                        className={`rounded-lg p-1.5 transition-colors ${
                          item.isLearned
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                        title={item.isLearned ? 'Mark as unlearned' : 'Mark as learned'}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Word, Pronunciation & Meaning */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {item.word}
                      </h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakText(item.word, 1.0)}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
                          title="Normal pronunciation (1.0x)"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => speakText(item.word, 0.65)}
                          className="rounded-lg px-1.5 py-0.5 text-[10px] font-bold text-slate-400 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-800"
                          title="Slow pronunciation (0.65x)"
                        >
                          Slow
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono">{item.ipa}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {item.pronunciation}
                      </span>
                    </div>

                    <div className="mt-2 rounded-lg bg-emerald-50/70 p-2 text-xs dark:bg-emerald-950/30">
                      <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                        অর্থ:{' '}
                      </span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-300">
                        {item.banglaMeaning}
                      </span>
                    </div>

                    {/* Example Sentence */}
                    <div className="mt-3 space-y-1 rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-800/50">
                      <div className="flex items-start justify-between">
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          &ldquo;{item.example}&rdquo;
                        </p>
                        <button
                          onClick={() => speakText(item.example)}
                          className="ml-1 text-slate-400 hover:text-emerald-600"
                          title="Listen example"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.exampleBangla}
                      </p>
                    </div>

                    {/* Synonyms & Antonyms */}
                    {item.synonyms.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1 text-[11px]">
                        <span className="text-slate-400">Synonyms:</span>
                        {item.synonyms.map((s, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-slate-100 px-1.5 py-0.2 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.category || 'Vocabulary'}
                  </span>
                  <button
                    onClick={() => onPracticeWord(item)}
                    className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-600"
                  >
                    <span>Practice Word</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVocabulary.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <BookOpen className="mx-auto h-8 w-8 text-slate-400" />
              <h3 className="mt-2 font-bold text-sm text-slate-700 dark:text-slate-300">
                কোনো শব্দ পাওয়া যায়নি
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা অন্য কোনো শব্দ খুঁজুন।
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
