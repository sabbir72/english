import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Save,
  BookOpen,
  MessageSquareQuote,
  Layers,
  GraduationCap,
  Dumbbell,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import {
  VocabularyItem,
  SentenceItem,
  SentenceStructureItem,
  GrammarLesson,
  PracticeQuestion,
} from '../types';

interface AdminPanelSectionProps {
  vocabulary: VocabularyItem[];
  sentences: SentenceItem[];
  structures: SentenceStructureItem[];
  grammar: GrammarLesson[];
  practice: PracticeQuestion[];
  onAddVocab: (item: VocabularyItem) => void;
  onDeleteVocab: (id: string) => void;
  onAddSentence: (item: SentenceItem) => void;
  onDeleteSentence: (id: string) => void;
  onResetAllData: () => void;
}

export const AdminPanelSection: React.FC<AdminPanelSectionProps> = ({
  vocabulary,
  sentences,
  structures,
  grammar,
  practice,
  onAddVocab,
  onDeleteVocab,
  onAddSentence,
  onDeleteSentence,
  onResetAllData,
}) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'sentences' | 'overview'>('vocab');

  // New Word Form State
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [newPos, setNewPos] = useState<'noun' | 'verb' | 'adjective' | 'adverb'>('verb');
  const [newIpa, setNewIpa] = useState('');
  const [newPronun, setNewPronun] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newExampleBangla, setNewExampleBangla] = useState('');
  const [newDiff, setNewDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  // New Sentence Form State
  const [newSentEng, setNewSentEng] = useState('');
  const [newSentBangla, setNewSentBangla] = useState('');
  const [newSentStruct, setNewSentStruct] = useState('Subject + Verb + Object');
  const [newSentGrammar, setNewSentGrammar] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateVocab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaning.trim()) return;

    const item: VocabularyItem = {
      id: `custom-v-${Date.now()}`,
      word: newWord.trim(),
      banglaMeaning: newMeaning.trim(),
      partOfSpeech: newPos,
      ipa: newIpa || `/${newWord.toLowerCase()}/`,
      pronunciation: newPronun || newWord,
      difficulty: newDiff,
      example: newExample || `This is a sample sentence with ${newWord}.`,
      exampleBangla: newExampleBangla || `এটি ${newMeaning} দিয়ে একটি উদাহরণ বাক্য।`,
      synonyms: [],
      antonyms: [],
      relatedWords: [],
      category: 'General',
      isLearned: false,
      isFavorite: false,
    };

    onAddVocab(item);
    setNewWord('');
    setNewMeaning('');
    setNewExample('');
    setNewExampleBangla('');
    notify('New vocabulary word added successfully!');
  };

  const handleCreateSentence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSentEng.trim() || !newSentBangla.trim()) return;

    const item: SentenceItem = {
      id: `custom-s-${Date.now()}`,
      english: newSentEng.trim(),
      bangla: newSentBangla.trim(),
      structure: newSentStruct,
      difficulty: 'Beginner',
      sentenceType: 'Affirmative',
      grammarExplanation: 'Simple basic sentence.',
      grammarExplanationBangla: newSentGrammar || 'সহজ গঠনের বাক্য।',
      importantVocab: [],
      similarExamples: [],
      isSaved: false,
      isPracticed: false,
    };

    onAddSentence(item);
    setNewSentEng('');
    setNewSentBangla('');
    setNewSentGrammar('');
    notify('New sentence added successfully!');
  };

  return (
    <div id="admin-panel-section" className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>Admin Content Management / অ্যাডমিন কনটেন্ট কন্ট্রোল</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            নতুন শব্দ, বাক্য, গঠনকাঠামো ও অনুশীলন প্রশ্ন যুক্ত ও পরিচালনা করুন।
          </p>
        </div>

        <button
          onClick={() => {
            if (confirm('Are you sure you want to reset all content to the default syllabus?')) {
              onResetAllData();
              notify('Content database reset to default demo data.');
            }
          }}
          className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Default Database</span>
        </button>
      </div>

      {notification && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500 p-3 text-xs font-bold text-white shadow-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        <button
          onClick={() => setActiveTab('vocab')}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
            activeTab === 'vocab'
              ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Manage Vocabulary ({vocabulary.length})
        </button>
        <button
          onClick={() => setActiveTab('sentences')}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
            activeTab === 'sentences'
              ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Manage Sentences ({sentences.length})
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-white text-purple-700 shadow-sm dark:bg-slate-900 dark:text-purple-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Database Overview
        </button>
      </div>

      {/* Tab 1: Vocabulary */}
      {activeTab === 'vocab' && (
        <div className="space-y-6">
          {/* Add Word Form */}
          <form
            onSubmit={handleCreateVocab}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-600" />
              <span>Add New Vocabulary Word</span>
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  English Word: *
                </label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. Persevere"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Bangla Meaning: *
                </label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="e.g. অধ্যবসায় করা"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Part of Speech:
                </label>
                <select
                  value={newPos}
                  onChange={(e) => setNewPos(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="verb">Verb</option>
                  <option value="noun">Noun</option>
                  <option value="adjective">Adjective</option>
                  <option value="adverb">Adverb</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Example Sentence:
                </label>
                <input
                  type="text"
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="e.g. If you persevere, you will master English."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Example Bengali Translation:
                </label>
                <input
                  type="text"
                  value={newExampleBangla}
                  onChange={(e) => setNewExampleBangla(e.target.value)}
                  placeholder="e.g. আপনি অধ্যবসায় করলে ইংরেজিতে দক্ষ হবেন।"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500"
              >
                <Plus className="h-4 w-4" />
                <span>Save Vocabulary</span>
              </button>
            </div>
          </form>

          {/* List of existing vocabulary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Existing Vocabulary ({vocabulary.length} items)
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {vocabulary.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-800/60"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white mr-2">
                      {item.word}
                    </span>
                    <span className="rounded bg-slate-200 px-1 py-0.2 text-[10px] text-slate-700 dark:bg-slate-700 dark:text-slate-300 mr-2">
                      {item.partOfSpeech}
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-300">
                      {item.banglaMeaning}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteVocab(item.id)}
                    className="rounded p-1 text-slate-400 hover:text-rose-500"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Sentences */}
      {activeTab === 'sentences' && (
        <div className="space-y-6">
          <form
            onSubmit={handleCreateSentence}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-blue-600" />
              <span>Add New English Sentence</span>
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  English Sentence: *
                </label>
                <input
                  type="text"
                  required
                  value={newSentEng}
                  onChange={(e) => setNewSentEng(e.target.value)}
                  placeholder="e.g. She always drinks water before breakfast."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Bangla Meaning: *
                </label>
                <input
                  type="text"
                  required
                  value={newSentBangla}
                  onChange={(e) => setNewSentBangla(e.target.value)}
                  placeholder="e.g. সে সর্বদা সকালের নাস্তার আগে পানি পান করে।"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Grammar Explanation (Bangla):
              </label>
              <input
                type="text"
                value={newSentGrammar}
                onChange={(e) => setNewSentGrammar(e.target.value)}
                placeholder="e.g. তৃতীয় পুরুষ একবচনে ভার্বের সাথে s/es যোগ হয়েছে।"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
                <span>Save Sentence</span>
              </button>
            </div>
          </form>

          {/* List existing sentences */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Existing Sentences ({sentences.length} items)
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {sentences.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs dark:bg-slate-800/60"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="font-bold text-slate-900 dark:text-white block truncate">
                      {item.english}
                    </span>
                    <span className="text-blue-700 dark:text-blue-300 block truncate">
                      {item.bangla}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteSentence(item.id)}
                    className="rounded p-1 text-slate-400 hover:text-rose-500"
                    title="Delete item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Overview */}
      {activeTab === 'overview' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-medium">Vocabulary Catalog</span>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {vocabulary.length} Words
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <MessageSquareQuote className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium">Sentence Bank</span>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {sentences.length} Sentences
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Layers className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-medium">Sentence Structures</span>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {structures.length} Formulas
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium">Grammar Syllabus</span>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {grammar.length} Modules
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Dumbbell className="h-4 w-4 text-rose-600" />
              <span className="text-xs font-medium">Practice Exercises</span>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
              {practice.length} Quizzes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
