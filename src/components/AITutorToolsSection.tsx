import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Layers,
  BookOpen,
  Send,
  Volume2,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { speakText } from '../utils/speech';

interface AITutorToolsSectionProps {
  initialTopicQuery?: string;
}

export const AITutorToolsSection: React.FC<AITutorToolsSectionProps> = ({
  initialTopicQuery,
}) => {
  const [activeTool, setActiveTool] = useState<'ask' | 'sentence-gen' | 'vocab-gen'>('ask');

  // Tool 1: Ask AI
  const [askQuestion, setAskQuestion] = useState(initialTopicQuery || '');
  const [askLoading, setAskLoading] = useState(false);
  const [askResponse, setAskResponse] = useState<any | null>(null);

  // Tool 2: Sentence Generator
  const [seedKeyword, setSeedKeyword] = useState('');
  const [seedTense, setSeedTense] = useState('Present Simple');
  const [genLoading, setGenLoading] = useState(false);
  const [generatedSentences, setGeneratedSentences] = useState<any[]>([]);

  // Tool 3: Vocab Builder
  const [vocabTopic, setVocabTopic] = useState('Job Interview');
  const [vocabLoading, setVocabLoading] = useState(false);
  const [generatedVocab, setGeneratedVocab] = useState<any[]>([]);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAskAI = async (q?: string) => {
    const questionText = q || askQuestion;
    if (!questionText.trim() || askLoading) return;

    setAskLoading(true);
    setAskResponse(null);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setAskResponse(data);
    } catch (err) {
      setAskResponse({
        explanationBangla:
          'ইংরেজি ব্যাকরণের এই বিষয়টি খুবই গুরুত্বপূর্ণ। সাধারণত ক্রিয়ার রূপ ও কাল অনুযায়ী বাক্য তৈরি হয়।',
        keyRule: 'Always use subject and matching verb agreement.',
        examples: [
          { english: 'He plays cricket.', bangla: 'সে ক্রিকেট খেলে।' },
          { english: 'They play cricket.', bangla: 'তারা ক্রিকেট খেলে।' },
        ],
        commonMistakeAvoid: 'Do not say: He play cricket.',
      });
    } finally {
      setAskLoading(false);
    }
  };

  const handleGenerateSentences = async () => {
    if (!seedKeyword.trim() || genLoading) return;
    setGenLoading(true);
    setGeneratedSentences([]);

    try {
      const res = await fetch('/api/ai/generate-sentences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywordOrTopic: seedKeyword,
          tenseOrStructure: seedTense,
          level: 'Beginner',
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setGeneratedSentences(data.sentences || []);
    } catch (err) {
      setGeneratedSentences([
        {
          english: `I need to ${seedKeyword} my English skills.`,
          bangla: `আমার ইংরেজি দক্ষতা আরও উন্নত করা প্রয়োজন।`,
          structure: 'Subject + need to + V1 + Object',
          grammarPointBangla: 'Need to দ্বারা প্রয়োজনীয়তা প্রকাশ পায়।',
        },
      ]);
    } finally {
      setGenLoading(false);
    }
  };

  const handleGenerateVocab = async () => {
    if (!vocabTopic.trim() || vocabLoading) return;
    setVocabLoading(true);
    setGeneratedVocab([]);

    try {
      const res = await fetch('/api/ai/vocabulary-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: vocabTopic,
          level: 'Intermediate',
          count: 5,
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setGeneratedVocab(data.vocabulary || []);
    } catch (err) {
      setGeneratedVocab([
        {
          word: 'Preparation',
          partOfSpeech: 'noun',
          ipa: '/ˌprep.əˈreɪ.ʃən/',
          pronunciation: 'প্রেপারেশন',
          banglaMeaning: 'প্রস্তুতি',
          example: 'Good preparation is the key to success.',
          exampleBangla: 'ভালো প্রস্তুতিই হলো সাফল্যের চাবিকাঠি।',
          synonyms: ['readiness', 'arrangement'],
          antonyms: ['neglect'],
        },
      ]);
    } finally {
      setVocabLoading(false);
    }
  };

  const sampleQuestions = [
    'Difference between "Affect" and "Effect"?',
    'Why is "He told to me" incorrect?',
    'Explain Present Perfect tense in easy Bangla',
    'Give 5 natural examples of "used to"',
    'Difference between "say" and "tell"?',
  ];

  return (
    <div id="ai-tutor-tools-section" className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span>AI Tutor Tools / এআই ব্যাকরণ ও শব্দ জেনারেটর</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          যেকোনো ব্যাকরণ প্রশ্ন করুন, বাক্য তৈরি করুন এবং বিষয়ভিত্তিক নতুন শব্দ শিখুন।
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
        <button
          onClick={() => setActiveTool('ask')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
            activeTool === 'ask'
              ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <HelpCircle className="h-4 w-4" />
          <span>Ask ChatGPT</span>
        </button>

        <button
          onClick={() => setActiveTool('sentence-gen')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
            activeTool === 'sentence-gen'
              ? 'bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>ChatGPT Sentence Generator</span>
        </button>

        <button
          onClick={() => setActiveTool('vocab-gen')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
            activeTool === 'vocab-gen'
              ? 'bg-white text-purple-700 shadow-sm dark:bg-slate-900 dark:text-purple-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>ChatGPT Vocab Builder</span>
        </button>
      </div>

      {/* Tool 1: Ask AI */}
      {activeTool === 'ask' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              বাংলা বা ইংরেজিতে আপনার যেকোনো প্রশ্ন লিখুন:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={askQuestion}
                onChange={(e) => setAskQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder="e.g. What is the difference between 'look', 'see', and 'watch'?"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                onClick={() => handleAskAI()}
                disabled={!askQuestion.trim() || askLoading}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-40"
              >
                {askLoading ? (
                  <Sparkles className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span>Ask ChatGPT</span>
              </button>
            </div>

            {/* Quick Sample Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400">Try asking:</span>
              {sampleQuestions.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAskQuestion(sq);
                    handleAskAI(sq);
                  }}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Display */}
          {askResponse && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100 dark:border-emerald-900/40">
                <span className="font-bold text-xs text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  এআই টিউটর উত্তর (Bangla Explanation)
                </span>
                <button
                  onClick={() => handleCopy(askResponse.explanationBangla)}
                  className="text-slate-400 hover:text-emerald-600"
                  title="Copy answer"
                >
                  {copiedText === askResponse.explanationBangla ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="rounded-xl bg-white p-4 text-xs leading-relaxed text-slate-800 dark:bg-slate-800/80 dark:text-slate-200 whitespace-pre-line">
                {askResponse.explanationBangla}
              </div>

              {askResponse.keyRule && (
                <div className="rounded-xl border border-emerald-200 bg-white p-3 text-xs dark:border-emerald-900/60 dark:bg-slate-800/80">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">
                    মূল নিয়ম (Key Rule):{' '}
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {askResponse.keyRule}
                  </span>
                </div>
              )}

              {askResponse.examples && askResponse.examples.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    উদাহরণ (Practical Examples):
                  </h4>
                  <div className="space-y-2">
                    {askResponse.examples.map((ex: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl bg-white p-3 text-xs dark:bg-slate-800/80"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {ex.english}
                          </div>
                          <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                            {ex.bangla}
                          </div>
                        </div>
                        <button
                          onClick={() => speakText(ex.english)}
                          className="rounded p-1 text-slate-400 hover:text-emerald-600"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {askResponse.commonMistakeAvoid && (
                <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-3 text-xs text-rose-900 dark:border-rose-950/60 dark:bg-rose-950/30 dark:text-rose-200">
                  <span className="font-bold">যে ভুলটি করবেন না: </span>
                  <span>{askResponse.commonMistakeAvoid}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tool 2: Sentence Generator */}
      {activeTool === 'sentence-gen' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Word or Topic (শব্দ বা বিষয়):
              </label>
              <input
                type="text"
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                placeholder="e.g. hesitate, practice, computer, coffee"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tense / Structure:
              </label>
              <select
                value={seedTense}
                onChange={(e) => setSeedTense(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Present Simple">Present Simple (সাধারণ বর্তমান)</option>
                <option value="Present Continuous">Present Continuous (চলমান বর্তমান)</option>
                <option value="Present Perfect">Present Perfect (ঘটে যাওয়া বর্তমান)</option>
                <option value="Past Simple">Past Simple (অতীত কাল)</option>
                <option value="Future Simple">Future Simple (ভবিষ্যত কাল)</option>
                <option value="Modal Verbs (Can/Could/Should)">Modals (Can / Should / Would)</option>
                <option value="Conditional (If Clause)">Conditionals (If...)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerateSentences}
              disabled={!seedKeyword.trim() || genLoading}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 disabled:opacity-40"
            >
              {genLoading ? (
                <Sparkles className="h-4 w-4 animate-spin" />
              ) : (
                <Layers className="h-4 w-4" />
              )}
              <span>Generate Sentences with ChatGPT</span>
            </button>
          </div>

          {generatedSentences.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Sentences ({generatedSentences.length}):
              </h4>
              <div className="space-y-3">
                {generatedSentences.map((s, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-xs dark:border-blue-900/40 dark:bg-blue-950/20"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          &ldquo;{s.english}&rdquo;
                        </div>
                        <div className="mt-1 font-semibold text-blue-800 dark:text-blue-300">
                          {s.bangla}
                        </div>
                      </div>
                      <button
                        onClick={() => speakText(s.english)}
                        className="rounded p-1 text-slate-400 hover:text-blue-600"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] rounded bg-white px-2 py-0.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        Formula: {s.structure}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {s.grammarPointBangla}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tool 3: Topic Vocab Builder */}
      {activeTool === 'vocab-gen' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Topic or Situation (যে বিষয়ের শব্দভাণ্ডার চান):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={vocabTopic}
                onChange={(e) => setVocabTopic(e.target.value)}
                placeholder="e.g. Airport, Restaurant, Software Engineering, Bank"
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 focus:border-purple-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                onClick={handleGenerateVocab}
                disabled={!vocabTopic.trim() || vocabLoading}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500 disabled:opacity-40"
              >
                {vocabLoading ? (
                  <Sparkles className="h-4 w-4 animate-spin" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                <span>Build Vocab</span>
              </button>
            </div>
          </div>

          {generatedVocab.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Vocabulary for &ldquo;{vocabTopic}&rdquo;:
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {generatedVocab.map((v, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-purple-100 bg-purple-50/40 p-4 text-xs dark:border-purple-900/40 dark:bg-purple-950/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {v.word}
                        </span>
                        <span className="text-[10px] rounded bg-white px-1.5 py-0.2 font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {v.partOfSpeech}
                        </span>
                      </div>
                      <button
                        onClick={() => speakText(v.word)}
                        className="rounded p-1 text-slate-400 hover:text-purple-600"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500 font-mono">
                      {v.ipa} • <span className="font-sans">{v.pronunciation}</span>
                    </div>

                    <div className="mt-2 text-xs font-bold text-purple-900 dark:text-purple-200">
                      অর্থ: {v.banglaMeaning}
                    </div>

                    <div className="mt-2 rounded-lg bg-white p-2 text-[11px] text-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
                      &ldquo;{v.example}&rdquo;
                      <div className="mt-0.5 text-slate-400">{v.exampleBangla}</div>
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
