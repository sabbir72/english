import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
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
    <div id="grammar-section" className="max-w-4xl mx-auto space-y-6">
      {/* Header & Categories */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#0F172A] dark:text-white">
            Grammar Lessons &amp; Rules
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 font-bangla mt-0.5">
            সহজ বাংলা ব্যাখ্যা, উদাহরণ ও প্র্যাকটিস সহ ইংরেজি ব্যাকরণ শেখার ডিজিটাল বই।
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100/90 p-1 dark:bg-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#4F46E5] shadow-xs dark:bg-[#1E293B] dark:text-[#818CF8]'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Lessons' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar Lessons List - Digital Textbook Styling */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => {
          const isExpanded = expandedLessonId === lesson.id;
          const userQuizAnswer = quizAnswers[lesson.id];
          const isQuizChecked = quizSubmitted[lesson.id];

          return (
            <div
              key={lesson.id}
              id={`grammar-card-${lesson.id}`}
              className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all dark:border-slate-800 dark:bg-[#1E293B]"
            >
              {/* Accordion Bar */}
              <div
                onClick={() => setExpandedLessonId(isExpanded ? '' : lesson.id)}
                className="flex cursor-pointer items-center justify-between p-5 select-none hover:bg-slate-50/50 dark:hover:bg-slate-800/40 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5] dark:bg-indigo-950/60 dark:text-indigo-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm sm:text-base text-[#0F172A] dark:text-white">
                        {lesson.title}
                      </span>
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-[#4F46E5] dark:bg-indigo-950/60 dark:text-indigo-300">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#0EA5E9] dark:text-sky-400 font-bangla mt-0.5">
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
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      lesson.isCompleted
                        ? 'bg-emerald-50 text-[#10B981] border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-900/60 dark:text-emerald-300'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {lesson.isCompleted ? '✓ সম্পন্ন' : 'Mark Complete'}
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded Lesson Content - Modern Digital Textbook View */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-6 sm:p-8 space-y-6 dark:border-slate-800/80 bg-[#FAFAFC] dark:bg-[#182234] rounded-b-2xl">
                  {/* Summary Box */}
                  <div className="rounded-xl border border-indigo-100/90 bg-indigo-50/50 p-4 text-xs sm:text-sm text-[#0F172A] dark:border-indigo-900/40 dark:bg-indigo-950/20 dark:text-indigo-200 leading-relaxed font-bangla">
                    <span className="font-bold text-[#4F46E5] dark:text-indigo-400 mr-2">📌 মূল সারসংক্ষেপ:</span>
                    {lesson.summaryBangla}
                  </div>

                  {/* Rule & Formula Cards */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Rule Box */}
                    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-[#1E293B]">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] dark:text-indigo-400 mb-1">
                        Grammar Rule
                      </div>
                      <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                        {lesson.rule}
                      </p>
                    </div>

                    {/* Formula Box */}
                    {lesson.formula && (
                      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs dark:border-slate-800 dark:bg-[#1E293B]">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0EA5E9] dark:text-sky-400 mb-1">
                          Structure Formula
                        </div>
                        <pre className="font-mono text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-slate-100 whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60">
                          {lesson.formula}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Detailed Bangla Explanation */}
                  <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-[#1E293B]">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10B981] dark:text-emerald-400 mb-2">
                      <BookOpen className="h-4 w-4" />
                      <span>সহজ বাংলায় বিস্তারিত ব্যাখ্যা</span>
                    </div>
                    <div className="whitespace-pre-line text-xs sm:text-sm leading-[1.7] text-[#475569] dark:text-slate-300 font-bangla">
                      {lesson.banglaExplanation}
                    </div>
                  </div>

                  {/* Examples Section */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Examples &amp; Bengali Meanings (উদাহরণ ও অনুবাদ):
                    </h4>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {lesson.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between rounded-xl border-l-4 border-l-[#4F46E5] border border-slate-200/90 bg-white p-3.5 shadow-2xs dark:border-slate-800 dark:bg-[#1E293B]"
                        >
                          <div className="space-y-1 min-w-0 pr-2">
                            <div className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                              {ex.english}
                            </div>
                            <div className="text-xs font-semibold text-[#10B981] dark:text-emerald-400 font-bangla">
                              {ex.bangla}
                            </div>
                            {ex.note && (
                              <div className="text-[11px] text-slate-400 dark:text-slate-500">
                                💡 {ex.note}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => speakText(ex.english, 'US')}
                            className="rounded-lg p-1.5 text-slate-400 hover:text-[#4F46E5] hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors shrink-0"
                            title="উচ্চারণ শুনুন"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                    <div className="rounded-xl border border-rose-200/80 bg-rose-50/30 p-4.5 text-xs dark:border-rose-950/40 dark:bg-rose-950/10">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300 mb-2">
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        <span>প্রচলিত ভুল ও সঠিক রূপ (Common Mistakes):</span>
                      </div>
                      <div className="space-y-2.5">
                        {lesson.commonMistakes.map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/80 dark:bg-[#1E293B]/80 border border-rose-100 dark:border-rose-900/30">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-rose-600 line-through dark:text-rose-400 font-medium">
                                ✗ {m.incorrect}
                              </span>
                              <span className="text-[#10B981] font-bold dark:text-emerald-300">
                                ✓ {m.correct}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#475569] dark:text-slate-400 font-bangla mt-1">
                              {m.explanationBangla}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lesson Quiz */}
                  {lesson.quiz && lesson.quiz.length > 0 && (
                    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-[#1E293B]">
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-xs font-bold text-[#4F46E5] dark:text-indigo-400 flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4" />
                          Lesson Quick Quiz:
                        </span>
                      </div>
                      <p className="font-bold text-xs sm:text-sm text-[#0F172A] dark:text-white">
                        {lesson.quiz[0].question}
                      </p>

                      <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                        {lesson.quiz[0].options.map((opt, optIdx) => {
                          const isCorrect = optIdx === lesson.quiz[0].correctIndex;
                          const isSelected = userQuizAnswer === optIdx;

                          let btnClass =
                            'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
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
                              className={`rounded-xl border p-3 text-left text-xs transition-all cursor-pointer ${btnClass}`}
                            >
                              <span className="font-bold mr-1.5 text-indigo-600 dark:text-indigo-400">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isQuizChecked && (
                        <div className="mt-3.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs text-[#475569] dark:text-slate-400 font-bangla">
                          <span className="font-bold text-[#10B981] dark:text-emerald-400">
                            {userQuizAnswer === lesson.quiz[0].correctIndex
                              ? '✓ চমৎকার! সঠিক উত্তর দিয়েছেন (+15 XP)'
                              : 'উত্তরটি সঠিক হয়নি। সঠিক উত্তরটি লক্ষ্য করুন:'}
                          </span>{' '}
                          {lesson.quiz[0].explanationBangla}
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Assistance Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bangla">
                      নিয়মটি বুঝতে কোনো সন্দেহ থাকলে AI শিক্ষকের সহায়তা নিন
                    </span>
                    <button
                      onClick={() => onAskAIGrammar(lesson.title)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#3730A3] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Ask AI Tutor in Bangla</span>
                      <ArrowRight className="h-3.5 w-3.5" />
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
