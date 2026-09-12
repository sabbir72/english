import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Volume2,
  Mic,
  MicOff,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Languages,
  Zap,
} from 'lucide-react';
import { AIMessage, UserLevel } from '../types';
import {
  speakText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
} from '../utils/speech';

interface AITutorMainSectionProps {
  userLevel: UserLevel;
  onIncrementSpeakingMinutes: (minutes: number) => void;
  onAwardXP?: (amount: number) => void;
}

export type AIMode = 'Free Conversation' | 'English Teacher' | 'Interview Practice';

export const AITutorMainSection: React.FC<AITutorMainSectionProps> = ({
  userLevel,
  onIncrementSpeakingMinutes,
  onAwardXP,
}) => {
  const [activeMode, setActiveMode] = useState<AIMode>('English Teacher');
  
  // Ask AI state
  const [askQuery, setAskQuery] = useState('');
  const [askLoading, setAskLoading] = useState(false);
  const [askResult, setAskResult] = useState<{
    answer: string;
    banglaExplanation: string;
    examples?: string[];
    grammarRule?: string;
  } | null>(null);

  // Conversation state
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "Hello! I am your friendly AI English Teacher. Let's practice English together! You can talk with me, and I'll help you speak naturally and confidently. How are you doing today?",
      banglaTranslation:
        'হ্যালো! আমি আপনার বন্ধুসুলভ এআই ইংলিশ টিচার। চলুন একসাথে ইংরেজি চর্চা করি! যেকোনো বিষয়ে ইংরেজিতে বলুন, আমি আপনাকে সহজে শিখিয়ে দেব। আজ আপনার কেমন কাটছে?',
      timestamp: Date.now(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState<{ stop: () => void } | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  // Mode descriptions & initial greeting change
  const handleModeChange = (mode: AIMode) => {
    setActiveMode(mode);
    let initialGreeting = '';
    let initialGreetingBn = '';

    if (mode === 'Free Conversation') {
      initialGreeting = "Hi there! Let's just have a fun, relaxed chat in English. Tell me about your day, your hobbies, or anything you like!";
      initialGreetingBn = "হাই! চলুন কোনো চাপ ছাড়া সহজে ইংরেজিতে আড্ডা দিই। আপনার দিনটি কেমন কাটছে বলুন!";
    } else if (mode === 'English Teacher') {
      initialGreeting = "Hello! As your English Teacher, I will respond in friendly English, explain meaning in Bengali, and gently correct any grammar mistakes you make!";
      initialGreetingBn = "হ্যালো! আপনার শিক্ষক হিসেবে আমি সহজ ইংরেজিতে উত্তর দেব, বাংলায় অর্থ বোঝাব এবং আপনার ব্যাকরণগত ভুলগুলো সংশোধন করে দেব।";
    } else {
      initialGreeting = "Welcome to your English Job Interview Practice! I am your hiring interviewer. To begin: 'Could you please introduce yourself and tell me about your background?'";
      initialGreetingBn = "জব ইন্টারভিউ প্র্যাকটিসে স্বাগতম! আমি আপনার ইন্টারভিউয়ার। শুরুতে সংক্ষেপে আপনার পরিচয় ও কাজের অভিজ্ঞতা বলুন।";
    }

    setMessages([
      {
        id: `mode-init-${Date.now()}`,
        role: 'assistant',
        content: initialGreeting,
        banglaTranslation: initialGreetingBn,
        timestamp: Date.now(),
      },
    ]);
  };

  // Quick Ask Suggestions from prompt
  const askSuggestions = [
    'What does improve mean?',
    "Give me examples of 'would'",
    'Correct my sentence: I am go to school yesterday',
    'Explain present perfect in Bangla',
    'How can I improve my speaking?',
  ];

  // Handle Ask AI Submit
  const handleAskSubmit = async (queryText?: string) => {
    const q = (queryText || askQuery).trim();
    if (!q) return;
    setAskLoading(true);
    setAskQuery(q);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, userLevel }),
      });

      if (res.ok) {
        const data = await res.json();
        setAskResult({
          answer: data.answer || data.explanation || 'Here is what you need to know:',
          banglaExplanation: data.banglaExplanation || data.answerBangla || 'সহজ বাংলায় বুঝুন:',
          examples: data.examples || [],
          grammarRule: data.rule || data.grammarTopic,
        });
        if (onAwardXP) onAwardXP(5);
      } else {
        throw new Error('API Error');
      }
    } catch {
      // Fallback structured answer
      setAskResult({
        answer: `In English, "${q}" can be understood clearly by looking at its context, structure, and daily usage.`,
        banglaExplanation: `"${q}" সম্পর্কে সহজ বাংলায়: এটি নিয়মিত কথোপকথনে ব্যবহৃত হয়। নিয়ম মেনে প্রয়োগ করলে আপনার ইংরেজি অনেক সমৃদ্ধ হবে।`,
        examples: [
          'Example 1: I practice English every day to improve.',
          'Example 2: Consistency is key to learning any language.',
        ],
        grammarRule: 'Subject + Verb + Object',
      });
    } finally {
      setAskLoading(false);
    }
  };

  // Handle Voice Input Toggle
  const handleToggleVoice = () => {
    if (isRecording) {
      speechRecognizer?.stop();
      setIsRecording(false);
      return;
    }

    setSpeechError(null);
    const controller = startSpeechRecognition(
      (result) => {
        setInputMessage(result.transcript);
        if (result.isFinal) {
          setIsRecording(false);
        }
      },
      (err) => {
        setSpeechError(err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (controller) {
      setSpeechRecognizer(controller);
      setIsRecording(true);
    }
  };

  // Send message to AI Conversation
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userText = inputMessage.trim();
    if (!userText || chatLoading) return;

    const newMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    setInputMessage('');
    setChatLoading(true);
    onIncrementSpeakingMinutes(1);

    try {
      const res = await fetch('/api/ai/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          topic: activeMode,
          mode: activeMode === 'English Teacher' ? 'teacher' : 'normal',
          userLevel,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AIMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply || "That's very interesting! Keep going.",
          banglaTranslation: data.banglaTranslation || data.replyBangla,
          correction:
            data.correction && data.correction.hasMistake
              ? {
                  original: data.correction.original || userText,
                  corrected: data.correction.corrected || userText,
                  explanationBangla:
                    data.correction.banglaExplanation || 'নিয়ম অনুযায়ী বাক্যটি এভাবে বলা অধিক নির্ভুল।',
                }
              : null,
          betterAlternative: data.betterAlternative,
          tipBangla: data.tipBangla,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (onAwardXP) onAwardXP(15);
      } else {
        throw new Error('Chat failed');
      }
    } catch {
      // Graceful offline/demo response
      setTimeout(() => {
        const aiMsg: AIMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `You said: "${userText}". That is good progress! How often do you practice speaking English each week?`,
          banglaTranslation: `আপনি বললেন: "${userText}"। এটি চমৎকার অগ্রগতি! আপনি সপ্তাহে কতবার ইংরেজি বলার চর্চা করেন?`,
          correction:
            activeMode === 'English Teacher'
              ? {
                  original: userText,
                  corrected: userText,
                  explanationBangla:
                    'আপনার বাক্যটি সুন্দর হয়েছে। দৈনন্দিন জীবনে নিয়মিত এই ধরনের বাক্য নিজে নিজে বলার চেষ্টা করুন।',
                }
              : null,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (onAwardXP) onAwardXP(10);
      }, 700);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div id="ai-tutor-main-section" className="mx-auto max-w-4xl space-y-6">
      {/* 1. TOP SECTION: ASK AI ANYTHING */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 pb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Ask AI Anything / এআই টিউটরকে প্রশ্ন করুন
            </h2>
            <p className="text-xs text-slate-500">
              ইংরেজি অর্থ, গ্রামার নিয়ম, বা বাক্য সংশোধনে যেকোনো প্রশ্ন লিখুন
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskSubmit();
          }}
          className="mt-3 flex gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="Ask anything about English... (যেমন: What does improve mean?)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={askLoading || !askQuery.trim()}
            className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50 transition-all"
          >
            {askLoading ? (
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Thinking...</span>
              </span>
            ) : (
              <>
                <span>Ask AI</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Preset Suggestion Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400">উদাহরণ:</span>
          {askSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleAskSubmit(sug)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-emerald-700 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Ask Result Card */}
        {askResult && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200/60 dark:border-emerald-900/60">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                <Lightbulb className="h-4 w-4 text-emerald-600" />
                AI Tutor Answer:
              </span>
              <button
                onClick={() => speakText(askResult.answer)}
                className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-emerald-700 shadow-2xs dark:bg-slate-800 dark:text-emerald-300"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>Listen</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-semibold text-slate-900 dark:text-white leading-relaxed">
                {askResult.answer}
              </p>
              <div className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/80 text-emerald-900 dark:text-emerald-300 font-sans">
                {askResult.banglaExplanation}
              </div>

              {askResult.examples && askResult.examples.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    বাস্তব উদাহরণ (Examples):
                  </span>
                  {askResult.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-white/60 p-2 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200"
                    >
                      <span>• {ex}</span>
                      <button
                        onClick={() => speakText(ex)}
                        className="text-slate-400 hover:text-emerald-600"
                      >
                        <Volume2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 2. BOTTOM SECTION: AI CONVERSATION PARTNER (3 MODES) */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col h-[640px]">
        {/* Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 p-4 dark:border-slate-800 gap-3 bg-slate-50/60 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                AI Conversation Partner
              </h2>
            </div>
            <p className="text-[11px] text-slate-500">
              কথা বলুন, ভুল সংশোধন পান এবং সঠিক বাক্য শিখুন (+15 XP)
            </p>
          </div>

          {/* 3 Modes from Prompt: Free Conversation, English Teacher, Interview Practice */}
          <div className="flex rounded-2xl bg-white p-1 shadow-2xs border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
            {(['Free Conversation', 'English Teacher', 'Interview Practice'] as AIMode[]).map(
              (m) => {
                const isActive = activeMode === m;
                return (
                  <button
                    key={m}
                    onClick={() => handleModeChange(m)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-2xs">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-xl space-y-2 rounded-3xl p-4 sm:p-5 ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'border border-slate-200 bg-slate-50/80 text-slate-900 dark:border-slate-800 dark:bg-slate-800/80 dark:text-white rounded-bl-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {msg.content}
                    </p>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.content)}
                        className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-emerald-600 dark:hover:bg-slate-700"
                        title="Listen pronunciation"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Bengali Explanation */}
                  {!isUser && msg.banglaTranslation && (
                    <div className="rounded-2xl bg-emerald-50/80 p-2.5 text-xs text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 font-sans border border-emerald-100 dark:border-emerald-900/50">
                      <span className="font-bold">বাংলা অর্থ: </span>
                      {msg.banglaTranslation}
                    </div>
                  )}

                  {/* Grammar Correction Box if mistake exists */}
                  {!isUser && msg.correction && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-3 text-xs text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>Grammar Correction / বাক্য সংশোধন:</span>
                      </div>
                      <div className="text-[11px] line-through text-slate-500">
                        ❌ {msg.correction.original}
                      </div>
                      <div className="font-bold text-emerald-700 dark:text-emerald-300">
                        ✅ {msg.correction.corrected}
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 font-sans pt-0.5">
                        {msg.correction.explanationBangla}
                      </p>
                    </div>
                  )}

                  {/* Better Alternative Sentence */}
                  {!isUser && msg.betterAlternative && (
                    <div className="rounded-2xl bg-amber-50/80 p-2.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                      <span className="font-bold">Better Alternative: </span>
                      &ldquo;{msg.betterAlternative}&rdquo;
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {chatLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
              <span>AI Teacher is typing and reviewing your sentence...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Recognition */}
        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          {speechError && (
            <div className="mb-2 text-[11px] font-bold text-rose-500">
              {speechError}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`rounded-2xl p-3 text-xs font-bold transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                  : 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
              title={isRecording ? 'Listening... click to stop' : 'Speak into microphone'}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message in English or click microphone to speak..."
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || chatLoading}
              className="flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50 transition-all"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
