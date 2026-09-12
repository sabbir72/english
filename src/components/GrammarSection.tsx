import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BookOpen,
  Volume2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { GrammarLesson, NavigationTab } from '../types';
import { speakText } from '../utils/speech';

interface GrammarSectionProps {
  grammarLessons: GrammarLesson[];
  onToggleCompleteLesson: (id: string) => void;
  onAskAIGrammar: (topicTitle: string) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  grammarLessons,
  onToggleCompleteLesson,
  onAskAIGrammar,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedLessonId, setExpandedLessonId] = useState<string>(grammarLessons[0]?.id || '');
  const [quizAnswers, setQuizAnswers] = useState<{ [lessonId: string]: number | null }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{ [lessonId: string]: boolean }>({});

  const categories = ['all', 'Parts of Speech', 'Tenses', 'Syntax & Grammar Rules', 'Prepositions', 'Advanced Sentence Types'];

  const filteredLessons = grammarLessons.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const handleSelectQuiz = (lessonId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lessonId]: optionIdx }));
    setQuizSubmitted((prev) => ({ ...prev, [lessonId]: true }));
  };

  return (
    <div id="grammar-section" className="space-y-6">
      {/* Header & Categories */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            English Grammar Lessons / ব্যাকরণ ও নিয়মাবলী
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            টেন্স, সাবজেক্ট-ভার্ব এগ্রিমেন্ট, পার্টস অব স্পিচ ও কন্ডিশনাল বাক্যের সহজ বাংলা গাইড।
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-purple-700 shadow-sm dark:bg-slate-900 dark:text-purple-300'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Lessons' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Lessons List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => {
          const isExpanded = expandedLessonId === lesson.id;
          const userQuizAnswer = quizAnswers[lesson.id];
          const isQuizChecked = quizSubmitted[lesson.id];

          return (
            <div
              key={lesson.id}
              id={`grammar-card-${lesson.id}`}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Accordion Bar */}
              <div
                onClick={() => setExpandedLessonId(isExpanded ? '' : lesson.id)}
                className="flex cursor-pointer items-center justify-between p-5 select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {lesson.title}
                      </span>
                      <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      {lesson.titleBangla}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompleteLesson(lesson.id);
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                      lesson.isCompleted
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lesson.isCompleted ? '✓ Completed' : 'Mark Complete'}
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Lesson Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-5 space-y-5 dark:border-slate-800">
                  {/* Summary */}
                  <div className="rounded-xl bg-purple-50/60 p-3.5 text-xs text-purple-950 dark:bg-purple-950/30 dark:text-purple-200 leading-relaxed font-medium">
                    {lesson.summaryBangla}
                  </div>

                  {/* Rule & Formula */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                      <div className="font-bold text-slate-900 dark:text-white">
                        Rule (ইংলিশ ব্যাকরণ নিয়ম):
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
                        {lesson.rule}
                      </p>
                    </div>

                    {lesson.formula && (
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs dark:border-slate-800 dark:bg-slate-800/40">
                        <div className="font-bold text-slate-900 dark:text-white">
                          Formula (গঠন কাঠামো):
                        </div>
                        <pre className="mt-1 font-mono text-[11px] text-purple-700 dark:text-purple-300 whitespace-pre-wrap">
                          {lesson.formula}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Bengali Detailed Explanation */}
                  <div className="rounded-xl border border-slate-200/80 bg-white p-4 text-xs dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="font-bold text-slate-900 dark:text-white mb-2">
                      সহজ বাংলায় বিস্তারিত ব্যাখ্যা:
                    </div>
                    <div className="whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300">
                      {lesson.banglaExplanation}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Examples & Bengali Meanings:
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {lesson.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/40"
                        >
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {ex.english}
                            </div>
                            <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                              {ex.bangla}
                            </div>
                            {ex.note && (
                              <div className="mt-0.5 text-[10px] text-slate-400">{ex.note}</div>
                            )}
                          </div>
                          <button
                            onClick={() => speakText(ex.english)}
                            className="rounded p-1 text-slate-400 hover:text-purple-600"
                            title="Listen"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                    <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4 text-xs dark:border-rose-950/40 dark:bg-rose-950/20">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
                        <AlertTriangle className="h-4 w-4" />
                        <span>প্রচলিত ভুল ও সঠিক নিয়ম (Common Mistakes):</span>
                      </div>
                      <div className="mt-2 space-y-2">
                        {lesson.commonMistakes.map((m, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex items-center gap-4">
                              <span className="text-rose-600 line-through dark:text-rose-400 font-medium">
                                ✗ {m.incorrect}
                              </span>
                              <span className="text-emerald-700 font-bold dark:text-emerald-300">
                                ✓ {m.correct}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400">
                              {m.explanationBangla}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lesson Quiz */}
                  {lesson.quiz && lesson.quiz.length > 0 && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4" />
                          Lesson Quiz:
                        </span>
                      </div>
                      <p className="font-semibold text-xs text-slate-900 dark:text-white">
                        {lesson.quiz[0].question}
                      </p>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {lesson.quiz[0].options.map((opt, optIdx) => {
                          const isCorrect = optIdx === lesson.quiz[0].correctIndex;
                          const isSelected = userQuizAnswer === optIdx;

                          let btnClass =
                            'border-slate-200 bg-white text-slate-800 hover:border-purple-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';
                          if (isQuizChecked) {
                            if (isCorrect) {
                              btnClass =
                                'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950/70 dark:text-emerald-200';
                            } else if (isSelected) {
                              btnClass =
                                'border-rose-500 bg-rose-50 text-rose-900 font-bold dark:bg-rose-950/70 dark:text-rose-200';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuiz(lesson.id, optIdx)}
                              disabled={isQuizChecked}
                              className={`rounded-lg border p-2.5 text-left text-xs transition-all ${btnClass}`}
                            >
                              <span className="font-semibold mr-1.5">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isQuizChecked && (
                        <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {userQuizAnswer === lesson.quiz[0].correctIndex
                              ? '✓ চমৎকার! সঠিক উত্তর দিয়েছেন।'
                              : 'উত্তরটি সঠিক হয়নি।'}
                          </span>{' '}
                          {lesson.quiz[0].explanationBangla}
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Practice Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => onAskAIGrammar(lesson.title)}
                      className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Ask AI Tutor to clarify this grammar topic in Bangla</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
