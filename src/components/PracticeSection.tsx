import React, { useState, useMemo } from 'react';
import {
  Dumbbell,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  Volume2,
  Award,
  Zap,
  Check,
  X,
  Trophy,
} from 'lucide-react';
import { PracticeQuestion, PracticeType } from '../types';
import { speakText } from '../utils/speech';

interface PracticeSectionProps {
  questions: PracticeQuestion[];
  onCompletePractice: (score: number) => void;
  onAwardXP?: (amount: number) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  questions,
  onCompletePractice,
  onAwardXP,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userTextAnswer, setUserTextAnswer] = useState('');
  const [rearrangeTiles, setRearrangeTiles] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionResults, setSessionResults] = useState<
    {
      question: PracticeQuestion;
      userAnswer: string;
      isCorrect: boolean;
    }[]
  >([]);

  // 8 Practice Types from prompt
  const practiceCategories = [
    { id: 'all', label: 'All Modes', labelBn: 'সকল' },
    { id: 'multiple-choice', label: 'Multiple Choice', labelBn: 'বহুনির্বাচনী' },
    { id: 'fill-blanks', label: 'Fill in Blanks', labelBn: 'শূন্যস্থান পূরণ' },
    { id: 'sentence-correction', label: 'Sentence Correction', labelBn: 'ভুল সংশোধন' },
    { id: 'word-meaning', label: 'Word Meaning', labelBn: 'শব্দার্থ' },
    { id: 'bn-to-en', label: 'Bengali → English', labelBn: 'বাংলা থেকে ইংরেজি' },
    { id: 'en-to-bn', label: 'English → Bengali', labelBn: 'ইংরেজি থেকে বাংলা' },
    { id: 'sentence-rearrange', label: 'Rearrange Sentence', labelBn: 'বাক্য সাজানো' },
    { id: 'structure-choice', label: 'Choose Structure', labelBn: 'গঠন বাছাই' },
  ];

  // Initialize a session of 5 questions
  const startNewSession = (category: string = selectedType) => {
    let pool = [...questions];

    if (category !== 'all') {
      if (category === 'sentence-rearrange') {
        pool = pool.filter((q) => q.type === 'sentence-rearrange');
      } else if (category === 'fill-blanks') {
        pool = pool.filter((q) => q.type === 'fill-blanks');
      } else if (category === 'sentence-correction') {
        pool = pool.filter((q) => q.type === 'error-detection');
      } else if (category === 'word-meaning') {
        pool = pool.filter((q) => q.type === 'vocab-quiz');
      } else if (category === 'bn-to-en' || category === 'en-to-bn') {
        pool = pool.filter((q) => q.type === 'translation');
      } else if (category === 'structure-choice') {
        pool = pool.filter((q) => q.type === 'grammar-quiz');
      }
    }

    if (pool.length === 0) pool = [...questions];

    // Pick 5 random questions for quick session
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    setSessionQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserTextAnswer('');
    setRearrangeTiles([]);
    setIsAnswered(false);
    setIsSessionFinished(false);
    setScore(0);
    setSessionResults([]);
  };

  // Initial load
  React.useEffect(() => {
    if (questions.length > 0 && sessionQuestions.length === 0) {
      startNewSession('all');
    }
  }, [questions]);

  const currentQ = sessionQuestions[currentIndex];

  const handleTileClick = (word: string) => {
    if (isAnswered) return;
    if (rearrangeTiles.includes(word)) {
      setRearrangeTiles((prev) => prev.filter((w) => w !== word));
    } else {
      setRearrangeTiles((prev) => [...prev, word]);
    }
  };

  const handleCheckAnswer = () => {
    if (isAnswered || !currentQ) return;

    let isCorrect = false;
    let submittedAnswer = '';

    if (currentQ.type === 'sentence-rearrange') {
      submittedAnswer = rearrangeTiles.join(' ');
      const constructed = submittedAnswer.toLowerCase().trim();
      const target = String(currentQ.correctAnswer).toLowerCase().trim();
      isCorrect = constructed === target;
    } else if (currentQ.options && currentQ.options.length > 0) {
      if (selectedOption === null) return;
      submittedAnswer = currentQ.options[selectedOption];
      isCorrect = selectedOption === currentQ.correctIndex;
    } else {
      submittedAnswer = userTextAnswer;
      isCorrect =
        userTextAnswer.trim().toLowerCase() ===
        String(currentQ.correctAnswer).trim().toLowerCase();
    }

    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    const resultRecord = {
      question: currentQ,
      userAnswer: submittedAnswer || '(Blank)',
      isCorrect,
    };

    setSessionResults((prev) => [...prev, resultRecord]);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < sessionQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setUserTextAnswer('');
      setRearrangeTiles([]);
      setIsAnswered(false);
    } else {
      // Session finished!
      setIsSessionFinished(true);
      onCompletePractice(score);
      if (onAwardXP) onAwardXP(20);
    }
  };

  // Result screen feedback message
  const getFeedbackMessage = () => {
    const total = sessionQuestions.length || 5;
    const ratio = score / total;
    if (ratio === 1) return { title: 'Excellent! Perfect Score!', subtitle: "অসাধারণ! আপনি সবগুলো প্রশ্নের সঠিক উত্তর দিয়েছেন।" };
    if (ratio >= 0.7) return { title: "Great! You're improving.", subtitle: "দারুণ! আপনার ইংরেজি দক্ষতা দিন দিন বাড়ছে।" };
    if (ratio >= 0.4) return { title: 'Good effort! Keep going.', subtitle: "ভালো প্রচেষ্টা! আর একটু মনোযোগ দিলে আরও ভালো করবেন।" };
    return { title: 'Practice makes permanent!', subtitle: "নিয়মিত চর্চা চালিয়ে যান, ভুল থেকেই আমরা সবচেয়ে বেশি শিখি।" };
  };

  return (
    <div id="practice-section" className="mx-auto max-w-2xl space-y-6">
      {/* Top Title & Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-amber-500" />
            <span>Practice Session / দ্রুত অনুশীলন</span>
          </h2>
          <p className="text-xs text-slate-500">
            প্রতিটি সেশনে ৫টি প্রশ্ন • দ্রুত, আকর্ষণীয় ও কার্যকর
          </p>
        </div>

        <button
          onClick={() => startNewSession(selectedType)}
          className="flex items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Session</span>
        </button>
      </div>

      {/* Mode Selector Tabs (8 types) */}
      {!isSessionFinished && (
        <div className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800">
          {practiceCategories.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedType(t.id);
                startNewSession(t.id);
              }}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold transition-all ${
                selectedType === t.id
                  ? 'bg-white text-slate-900 shadow-xs font-bold dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* RESULT SCREEN AFTER 5 QUESTIONS */}
      {isSessionFinished ? (
        <div
          id="practice-results-card"
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6 animate-fadeIn"
        >
          {/* Top Score Banner */}
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
              <Trophy className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>+20 Practice XP Earned!</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                Score: {score} / {sessionQuestions.length}
              </h3>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                {getFeedbackMessage().title}
              </p>
              <p className="text-xs text-slate-500 font-sans">
                {getFeedbackMessage().subtitle}
              </p>
            </div>
          </div>

          {/* List of Correct / Wrong Answers with Bengali Explanations */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 dark:border-slate-800">
              Review Your Answers / উত্তর পর্যালোচনা
            </h4>

            {sessionResults.map((res, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-4 text-xs space-y-2 ${
                  res.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/60 dark:bg-emerald-950/20'
                    : 'border-rose-200 bg-rose-50/50 dark:border-rose-900/60 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {idx + 1}. {res.question.question}
                  </div>
                  {res.isCorrect ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-600 shrink-0">
                      <Check className="h-4 w-4" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-rose-600 shrink-0">
                      <X className="h-4 w-4" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 text-slate-700 dark:text-slate-300">
                  <span>
                    আপনার উত্তর:{' '}
                    <strong className={res.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 line-through'}>
                      {res.userAnswer}
                    </strong>
                  </span>
                  {!res.isCorrect && (
                    <span>
                      • সঠিক উত্তর:{' '}
                      <strong className="text-emerald-700 dark:text-emerald-400">
                        {String(res.question.correctAnswer)}
                      </strong>
                    </span>
                  )}
                </div>

                {/* Explanation in Bengali */}
                <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-sans border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">ব্যাখ্যা: </span>
                  {res.question.explanationBangla}
                </div>
              </div>
            ))}
          </div>

          {/* Action: Practice Again */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              id="btn-practice-again"
              onClick={() => startNewSession(selectedType)}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-all hover:scale-[1.01]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Practice Again / পুনরায় অনুশীলন</span>
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION CARD */
        currentQ && (
          <div
            id="practice-card"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5"
          >
            {/* Question Progress header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="rounded-md bg-slate-100 px-2.5 py-1 font-bold text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300 uppercase tracking-wider">
                Question {currentIndex + 1} of {sessionQuestions.length}
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                Score: {score}
              </span>
            </div>

            {/* Question Body */}
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {currentQ.question}
              </h3>
              {currentQ.questionBangla && (
                <p className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 font-sans">
                  {currentQ.questionBangla}
                </p>
              )}
            </div>

            {/* Interactive Inputs */}
            {currentQ.type === 'sentence-rearrange' && currentQ.rearrangeWords ? (
              <div className="space-y-4">
                <div className="min-h-[52px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-3 flex flex-wrap gap-2 items-center dark:border-slate-700 dark:bg-slate-800/40">
                  {rearrangeTiles.length === 0 ? (
                    <span className="text-xs text-slate-400 italic font-sans">
                      নিচের শব্দগুলোতে ক্রমানুসারে ক্লিক করে বাক্য তৈরি করুন...
                    </span>
                  ) : (
                    rearrangeTiles.map((tile, i) => (
                      <button
                        key={i}
                        onClick={() => handleTileClick(tile)}
                        disabled={isAnswered}
                        className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500"
                      >
                        {tile}
                      </button>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentQ.rearrangeWords.map((word, i) => {
                    const isUsed = rearrangeTiles.includes(word);
                    return (
                      <button
                        key={i}
                        onClick={() => handleTileClick(word)}
                        disabled={isAnswered || isUsed}
                        className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                          isUsed
                            ? 'border-slate-200 bg-slate-100 text-slate-400 opacity-40 dark:border-slate-800 dark:bg-slate-800'
                            : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : currentQ.options ? (
              /* Multiple Choice */
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let btnStyle =
                    'border-slate-200 bg-slate-50 text-slate-800 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200';
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
                  } else if (isSelected) {
                    btnStyle =
                      'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold dark:border-emerald-500 dark:bg-emerald-950/50';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !isAnswered && setSelectedOption(idx)}
                      disabled={isAnswered}
                      className={`w-full rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${btnStyle}`}
                    >
                      <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Text Input */
              <div>
                <input
                  type="text"
                  value={userTextAnswer}
                  onChange={(e) => setUserTextAnswer(e.target.value)}
                  disabled={isAnswered}
                  placeholder="Type your answer here..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            )}

            {/* Explanation card after checking */}
            {isAnswered && (
              <div className="rounded-2xl bg-emerald-50/60 p-4 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    সঠিক উত্তর:
                  </span>
                  <span className="font-bold text-xs text-emerald-700 dark:text-emerald-400">
                    {String(currentQ.correctAnswer)}
                  </span>
                  <button
                    onClick={() => speakText(String(currentQ.correctAnswer))}
                    className="rounded p-1 text-slate-400 hover:text-emerald-600"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                  <span className="font-bold">ব্যাখ্যা: </span>
                  {currentQ.explanationBangla}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-2 pt-2">
              {!isAnswered ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={
                    currentQ.options
                      ? selectedOption === null
                      : currentQ.type === 'sentence-rearrange'
                      ? rearrangeTiles.length === 0
                      : !userTextAnswer.trim()
                  }
                  className="rounded-2xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors shadow-xs"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 rounded-2xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-xs"
                >
                  <span>
                    {currentIndex + 1 === sessionQuestions.length ? 'View Results' : 'Next Question'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
