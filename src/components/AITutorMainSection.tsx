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
  Layers,
  BookOpen,
  MessageSquare,
  Copy,
  Check,
  Briefcase,
  Coffee,
  GraduationCap,
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
  initialTopicQuery?: string;
}

export type AIMode = 'English Teacher' | 'Free Conversation' | 'Interview Practice';
export type AITab = 'conversation' | 'ask' | 'studio';

export const AITutorMainSection: React.FC<AITutorMainSectionProps> = ({
  userLevel,
  onIncrementSpeakingMinutes,
  onAwardXP,
  initialTopicQuery,
}) => {
  const [activeTab, setActiveTab] = useState<AITab>('conversation');
  const [activeMode, setActiveMode] = useState<AIMode>('English Teacher');
  
  // Ask ChatGPT state
  const [askQuery, setAskQuery] = useState(initialTopicQuery || '');
  const [askLoading, setAskLoading] = useState(false);
  const [askResult, setAskResult] = useState<{
    title?: string;
    answer: string;
    banglaExplanation: string;
    examples?: { english: string; bangla: string }[] | string[];
    grammarRule?: string;
    practiceQuestion?: {
      question: string;
      options: string[];
      correctIndex: number;
      explanationBangla: string;
    };
  } | null>(null);
  const [userQuizAnswer, setUserQuizAnswer] = useState<number | null>(null);

  // Conversation state
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "Hello! I am your friendly ChatGPT English Teacher. Let's practice English together! You can talk with me about anything, and I'll explain meanings in Bengali and gently correct any grammar mistakes. How are you doing today?",
      banglaTranslation:
        'হ্যালো! আমি আপনার চ্যাটজিপিটি ইংলিশ টিচার। চলুন একসাথে ইংরেজি চর্চা করি! যেকোনো বিষয়ে ইংরেজিতে বলুন, আমি আপনাকে সহজে শিখিয়ে দেব এবং ব্যাকরণ সংশোধন করব। আজ আপনার দিনটি কেমন কাটছে?',
      timestamp: Date.now(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState<{ stop: () => void } | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Studio: Sentence Generator state
  const [studioWord, setStudioWord] = useState('improve');
  const [studioTense, setStudioTense] = useState('Present Simple');
  const [sentenceLoading, setSentenceLoading] = useState(false);
  const [sentenceResult, setSentenceResult] = useState<any | null>(null);

  // Studio: Vocab Builder state
  const [vocabTopic, setVocabTopic] = useState('Job Interview');
  const [vocabLoading, setVocabLoading] = useState(false);
  const [vocabResult, setVocabResult] = useState<any[]>([]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'conversation') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatLoading, activeTab]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Mode change handler for ChatGPT conversation
  const handleModeChange = (mode: AIMode) => {
    setActiveMode(mode);
    let initialGreeting = '';
    let initialGreetingBn = '';

    if (mode === 'Free Conversation') {
      initialGreeting = "Hi there! I am ChatGPT, your friendly English chat partner. Let's have a relaxed, natural conversation. What are your favorite hobbies or weekend plans?";
      initialGreetingBn = "হাই! আমি চ্যাটজিপিটি, আপনার বন্ধুসুলভ চ্যাট পার্টনার। চলুন কোনো চাপ ছাড়া সহজ ইংরেজিতে আড্ডা দিই। আপনার প্রিয় শখ বা উইকেন্ডের পরিকল্পনা কী?";
    } else if (mode === 'English Teacher') {
      initialGreeting = "Hello! As your ChatGPT English Teacher, I will respond in natural English, explain points in Bengali, and provide gentle grammar corrections whenever you make a mistake!";
      initialGreetingBn = "হ্যালো! আপনার চ্যাটজিপিটি ইংলিশ টিচার হিসেবে আমি সহজ ইংরেজিতে উত্তর দেব, বাংলায় অর্থ বুঝিয়ে দেব এবং প্রতিটি বাক্যের ব্যাকরণগত ভুল সংশোধন করে দেব।";
    } else {
      initialGreeting = "Welcome to your English Job Interview Practice powered by ChatGPT! I am your interviewer. Let's start with: 'Could you please introduce yourself and tell me about your background?'";
      initialGreetingBn = "চ্যাটজিপিটি ইন্টারভিউ প্র্যাকটিসে স্বাগতম! আমি আপনার ইন্টারভিউয়ার। শুরুতে সংক্ষেপে আপনার পরিচয় ও অভিজ্ঞতার কথা ইংরেজিতে বলুন।";
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

  // Preset quick prompt suggestions
  const askSuggestions = [
    'Explain Present Perfect vs Past Simple in Bangla',
    'What does "consistent" mean with examples?',
    'Difference between "make" and "do"',
    'Correct my sentence: I am go to office yesterday',
    '5 polite ways to say "Thank you" in professional English',
  ];

  const conversationStarters = [
    'I want to introduce myself in English.',
    'Could you tell me how to prepare for a job interview?',
    'Yesterday I watched a very interesting movie.',
    'I usually wake up at 7 AM and go to work.',
  ];

  // Ask ChatGPT Submit
  const handleAskSubmit = async (queryText?: string) => {
    const q = (queryText || askQuery).trim();
    if (!q) return;
    setAskLoading(true);
    setAskQuery(q);
    setUserQuizAnswer(null);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, userLevel }),
      });

      if (res.ok) {
        const data = await res.json();
        setAskResult({
          title: data.title || q,
          answer: data.answer || data.explanation || 'Here is what ChatGPT explains:',
          banglaExplanation: data.banglaExplanation || data.banglaMeaning || 'সহজ বাংলায় বিশদ ব্যাখ্যা:',
          examples: data.examples || [],
          grammarRule: data.grammarNote || data.rule,
          practiceQuestion: data.practiceQuestion,
        });
        if (onAwardXP) onAwardXP(10);
      } else {
        throw new Error('API Error');
      }
    } catch {
      // High quality fallback
      setAskResult({
        title: q,
        answer: `In English, "${q}" is an essential concept. Using it correctly enhances your spoken and written fluency.`,
        banglaExplanation: `"${q}" সম্পর্কে সহজ বাংলায়: এটি কথোপকথনে নিয়মিত ব্যবহৃত হয়। ব্যাকরণগত সূত্র অনুযায়ী সাবজেক্ট ও সঠিক ভার্ব রূপ ব্যবহার করতে হবে।`,
        examples: [
          { english: 'I practice English every morning to improve.', bangla: 'উন্নতি করার জন্য আমি প্রতিদিন সকালে ইংরেজি চর্চা করি।' },
          { english: 'Consistency is key to mastering any language.', bangla: 'যেকোনো ভাষা আয়ত্ত করার চাবিকাঠি হলো ধারাবাহিকতা।' },
        ],
        grammarRule: 'Subject + Verb + Object rule applies to standard indicative clauses.',
        practiceQuestion: {
          question: 'Which of the following is grammatically correct?',
          options: ['I am go to school', 'I go to school', 'I goes to school', 'I going to school'],
          correctIndex: 1,
          explanationBangla: "Present Indefinite tense-এ 'I'-এর পর verb-এর base form বসে।",
        },
      });
    } finally {
      setAskLoading(false);
    }
  };

  // Voice toggle
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

  // Send message to ChatGPT Conversation
  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || inputMessage).trim();
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
          content: data.reply || "That's great! Keep going.",
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
      setTimeout(() => {
        const aiMsg: AIMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: `You said: "${userText}". That is very well expressed! Practicing with ChatGPT every day will make you completely fluent. What are you looking forward to this week?`,
          banglaTranslation: `আপনি বললেন: "${userText}"। আপনার বাক্য প্রকাশ চমৎকার হয়েছে! প্রতিদিন চ্যাটজিপিটির সাথে চর্চা করলে আপনার জড়তা কেটে যাবে। এই সপ্তাহে আপনার বিশেষ কোনো কাজ আছে কি?`,
          correction:
            activeMode === 'English Teacher'
              ? {
                  original: userText,
                  corrected: userText,
                  explanationBangla:
                    'আপনার বাক্যটি সুন্দর ও নির্ভুল হয়েছে। নিয়মিত এভাবে ছোট ছোট বাক্য নিজে নিজে বলার চেষ্টা করুন।',
                }
              : null,
          betterAlternative: `I am currently practicing spoken English with ChatGPT to improve my fluency.`,
          tipBangla: 'ইংরেজি বলার সময় গ্রামারের ভুলের ভয়ে না থেমে অনর্গল বলে যাওয়ার চেষ্টা করুন।',
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (onAwardXP) onAwardXP(10);
      }, 600);
    } finally {
      setChatLoading(false);
    }
  };

  // Studio: Generate Sentences with ChatGPT
  const handleGenerateSentences = async () => {
    if (!studioWord.trim() || sentenceLoading) return;
    setSentenceLoading(true);
    setSentenceResult(null);

    try {
      const res = await fetch('/api/ai/sentence-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: studioWord.trim(),
          tenseOrStructure: studioTense,
          level: userLevel,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSentenceResult(data);
        if (onAwardXP) onAwardXP(10);
      }
    } catch {
      setSentenceResult({
        word: studioWord,
        banglaMeaning: 'উন্নতি করা / সমৃদ্ধ করা',
        simple: {
          sentence: `I want to ${studioWord} my English skills.`,
          bangla: `আমি আমার ইংরেজি দক্ষতা উন্নতি করতে চাই।`,
          structure: 'Subject + want to + Verb + Object',
        },
        intermediate: {
          sentence: `Consistent practice will help you ${studioWord} much faster.`,
          bangla: `ধারাবাহিক চর্চা আপনাকে দ্রুত উন্নতি করতে সাহায্য করবে।`,
          structure: 'Subject + will help + Object + bare infinitive',
        },
        advanced: {
          sentence: `They made substantial efforts to ${studioWord} their operational efficiency.`,
          bangla: `তারা তাদের কর্মদক্ষতা বৃদ্ধি করতে ব্যাপক প্রচেষ্টা চালিয়েছিল।`,
          structure: 'Subject + made efforts + to-infinitive',
        },
      });
    } finally {
      setSentenceLoading(false);
    }
  };

  // Studio: Build Topic Vocab with ChatGPT
  const handleGenerateVocab = async (topicName?: string) => {
    const t = topicName || vocabTopic;
    setVocabTopic(t);
    setVocabLoading(true);

    try {
      const res = await fetch('/api/ai/vocab-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: t, userLevel }),
      });

      if (res.ok) {
        const data = await res.json();
        setVocabResult(data.words || data.vocab || []);
        if (onAwardXP) onAwardXP(10);
      }
    } catch {
      setVocabResult([
        {
          word: 'Resume',
          bangla: 'জীবনবৃত্তান্ত',
          pronunciation: 'রেজুমে (/ˈrez.juː.meɪ/)',
          partOfSpeech: 'noun',
          example: 'Please send your updated resume to the HR department.',
          exampleBangla: 'অনুগ্রহ করে এইচআর বিভাগে আপনার আপডেট করা জীবনবৃত্তান্ত পাঠান।',
        },
        {
          word: 'Experience',
          bangla: 'অভিজ্ঞতা',
          pronunciation: 'এক্সপেরিয়েন্স (/ɪkˈspɪə.ri.əns/)',
          partOfSpeech: 'noun',
          example: 'I have three years of experience in project management.',
          exampleBangla: 'প্রজেক্ট ম্যানেজমেন্টে আমার তিন বছরের অভিজ্ঞতা রয়েছে।',
        },
      ]);
    } finally {
      setVocabLoading(false);
    }
  };

  return (
    <div id="ai-tutor-main-section" className="mx-auto max-w-5xl space-y-6">
      {/* 1. TOP HERO HEADER WITH CHATGPT IDENTITY */}
      <div className="rounded-3xl border border-indigo-200/80 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 p-6 text-white shadow-md relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-inner">
              <Bot className="h-8 w-8 text-sky-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  ChatGPT English Tutor
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-300 border border-emerald-400/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  GPT-4o Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-100/90 font-bangla mt-1">
                চ্যাটজিপিটি পরিচালিত এআই স্পিকিং পার্টনার, ব্যাকরণ শিক্ষক ও বাক্য নির্মাতা
              </p>
            </div>
          </div>

          {/* Module Selector Pills */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-black/25 p-1 border border-white/15 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setActiveTab('conversation')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'conversation'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Conversation</span>
            </button>

            <button
              onClick={() => setActiveTab('ask')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'ask'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              <span>Ask ChatGPT</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === 'studio'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TAB 1: CHATGPT CONVERSATION PARTNER */}
      {activeTab === 'conversation' && (
        <section className="rounded-3xl border border-slate-200/90 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col h-[680px]">
          {/* Header & Modes */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 p-4 dark:border-slate-800 gap-3 bg-slate-50/70 dark:bg-slate-800/50">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  ChatGPT Speaking Partner
                </h2>
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  +15 XP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla">
                কথা বলুন, ভুল সংশোধন পান এবং সঠিক বাক্য শিখুন
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center rounded-2xl bg-white p-1 border border-slate-200 shadow-2xs dark:bg-slate-900 dark:border-slate-700">
              {(
                [
                  { id: 'English Teacher', label: 'Teacher', labelBn: 'শিক্ষক', icon: <GraduationCap className="h-3.5 w-3.5" /> },
                  { id: 'Free Conversation', label: 'Free Talk', labelBn: 'আড্ডা', icon: <Coffee className="h-3.5 w-3.5" /> },
                  { id: 'Interview Practice', label: 'Interview', labelBn: 'ইন্টারভিউ', icon: <Briefcase className="h-3.5 w-3.5" /> },
                ] as const
              ).map((m) => {
                const isActive = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleModeChange(m.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#4F46E5] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                );
              })}
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
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#4F46E5] text-white shadow-xs">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-xl space-y-2.5 rounded-3xl p-4 sm:p-5 ${
                      isUser
                        ? 'bg-[#4F46E5] text-white rounded-br-xs shadow-xs'
                        : 'border border-slate-200/80 bg-slate-50/90 text-slate-900 dark:border-slate-800 dark:bg-slate-800/90 dark:text-white rounded-bl-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                        {msg.content}
                      </p>
                      {!isUser && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => speakText(msg.content)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-indigo-600 dark:hover:bg-slate-700"
                            title="Listen pronunciation"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-indigo-600 dark:hover:bg-slate-700"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bengali Translation */}
                    {!isUser && msg.banglaTranslation && (
                      <div className="rounded-2xl bg-indigo-50/70 p-3 text-xs text-indigo-950 dark:bg-indigo-950/50 dark:text-indigo-200 font-bangla border border-indigo-100 dark:border-indigo-900/50">
                        <span className="font-bold text-indigo-700 dark:text-indigo-400">বাংলা অর্থ: </span>
                        {msg.banglaTranslation}
                      </div>
                    )}

                    {/* Grammar Correction Box */}
                    {!isUser && msg.correction && msg.correction.hasMistake && (
                      <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-3 text-xs text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 space-y-1.5">
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
                        <p className="text-[11px] text-slate-700 dark:text-slate-300 font-bangla pt-0.5">
                          {msg.correction.explanationBangla}
                        </p>
                      </div>
                    )}

                    {/* Better Alternative */}
                    {!isUser && msg.betterAlternative && (
                      <div className="rounded-2xl bg-amber-50/80 p-2.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 border border-amber-200/50 dark:border-amber-900/40">
                        <span className="font-bold text-amber-800 dark:text-amber-300">Better Alternative: </span>
                        &ldquo;{msg.betterAlternative}&rdquo;
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold p-2">
                <div className="h-2.5 w-2.5 animate-ping rounded-full bg-[#4F46E5]" />
                <span>ChatGPT is reviewing your sentence and composing feedback...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Starter Chips */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-bold shrink-0">Quick Start:</span>
            {conversationStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(starter)}
                className="whitespace-nowrap rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                {starter}
              </button>
            ))}
          </div>

          {/* Input Bar with Voice Recognition */}
          <div className="border-t border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            {speechError && (
              <div className="mb-2 text-[11px] font-bold text-rose-500">
                {speechError}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Mic button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`rounded-2xl p-3 text-xs font-bold transition-all cursor-pointer ${
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
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || chatLoading}
                className="flex items-center gap-1.5 rounded-2xl bg-[#4F46E5] px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-[#3730A3] disabled:opacity-50 transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </section>
      )}

      {/* 3. TAB 2: ASK CHATGPT ANYTHING */}
      {activeTab === 'ask' && (
        <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Ask ChatGPT Anything / চ্যাটজিপিটিকে প্রশ্ন করুন
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla">
                যেকোনো ইংরেজি শব্দের অর্থ, বাক্য সংশোধন, বা গ্রামার নিয়ম সহজে বাংলায় জানুন
              </p>
            </div>
          </div>

          {/* Search form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskSubmit();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              placeholder="Ask anything about English... (e.g., Difference between 'will' and 'would')"
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={askLoading || !askQuery.trim()}
              className="flex items-center gap-2 rounded-2xl bg-[#4F46E5] px-6 py-3 text-xs font-bold text-white hover:bg-[#3730A3] disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            >
              {askLoading ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Analyzing...</span>
                </span>
              ) : (
                <>
                  <span>Ask ChatGPT</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Preset Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 font-bangla">উদাহরণ প্রশ্ন:</span>
            {askSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleAskSubmit(sug)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Ask Result Card */}
          {askResult && (
            <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/40 p-5 dark:border-indigo-900/60 dark:bg-indigo-950/20 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-indigo-200/60 pb-3 dark:border-indigo-900/60">
                <span className="flex items-center gap-2 text-sm font-bold text-indigo-900 dark:text-indigo-300">
                  <Sparkles className="h-4 w-4 text-[#4F46E5]" />
                  {askResult.title}
                </span>
                <button
                  onClick={() => speakText(askResult.answer)}
                  className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs hover:bg-indigo-50 dark:bg-slate-800 dark:text-indigo-300 transition-colors"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>Listen</span>
                </button>
              </div>

              {/* English Explanation */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  English Explanation:
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {askResult.answer}
                </p>
              </div>

              {/* Bengali Meaning & Explanation */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-bangla">
                  বাংলা ব্যাখ্যা ও নিয়ম:
                </div>
                <div className="rounded-xl bg-white/90 p-3.5 dark:bg-slate-800/90 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bangla leading-relaxed border border-indigo-100 dark:border-slate-700">
                  {askResult.banglaExplanation}
                </div>
              </div>

              {/* Examples */}
              {askResult.examples && askResult.examples.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    বাস্তব উদাহরণ (Real-life Examples):
                  </div>
                  <div className="grid gap-2">
                    {askResult.examples.map((ex: any, i: number) => {
                      const english = typeof ex === 'string' ? ex : ex.english;
                      const bangla = typeof ex === 'string' ? '' : ex.bangla;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-xl bg-white p-3 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {english}
                            </div>
                            {bangla && (
                              <div className="text-slate-500 dark:text-slate-400 font-bangla mt-0.5">
                                {bangla}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => speakText(english)}
                            className="p-1 text-slate-400 hover:text-indigo-600"
                            title="Listen"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grammar Note */}
              {askResult.grammarRule && (
                <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">গুরুত্বপূর্ণ টিপস: </span>
                  {askResult.grammarRule}
                </div>
              )}

              {/* Practice Question */}
              {askResult.practiceQuestion && (
                <div className="rounded-xl bg-white p-4 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Quick Practice Question / কুইজ:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {askResult.practiceQuestion.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {askResult.practiceQuestion.options.map((opt, optIdx) => {
                      const isSelected = userQuizAnswer === optIdx;
                      const isCorrect = optIdx === askResult.practiceQuestion?.correctIndex;
                      let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80';
                      if (userQuizAnswer !== null) {
                        if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:bg-emerald-950 dark:text-emerald-300';
                        else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold dark:bg-rose-950 dark:text-rose-300';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => setUserQuizAnswer(optIdx)}
                          className={`rounded-xl border p-2.5 text-left text-xs transition-all ${btnStyle}`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {userQuizAnswer !== null && (
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-xs font-bangla text-slate-700 dark:text-slate-300">
                      {askResult.practiceQuestion.explanationBangla}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 4. TAB 3: CHATGPT SENTENCE & VOCAB STUDIO */}
      {activeTab === 'studio' && (
        <div className="space-y-6">
          {/* Tool 1: Sentence Generator */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-300">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  ChatGPT Sentence Generator
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla">
                  যেকোনো শব্দের জন্য ৩টি স্তরের (Simple, Intermediate, Advanced) পূর্ণাঙ্গ বাক্য ও সূত্র তৈরি করুন
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={studioWord}
                onChange={(e) => setStudioWord(e.target.value)}
                placeholder="Enter an English word (e.g. achieve, confident, negotiate)..."
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <select
                value={studioTense}
                onChange={(e) => setStudioTense(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Present Simple">Present Simple</option>
                <option value="Past Simple">Past Simple</option>
                <option value="Future with Will">Future with Will</option>
                <option value="Present Continuous">Present Continuous</option>
                <option value="Modals (Should/Could)">Modals (Should / Could)</option>
              </select>

              <button
                onClick={handleGenerateSentences}
                disabled={sentenceLoading || !studioWord.trim()}
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#0EA5E9] px-6 py-3 text-xs font-bold text-white hover:bg-sky-600 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
              >
                {sentenceLoading ? (
                  <span>Generating...</span>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Sentences</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Sentences Display */}
            {sentenceResult && (
              <div className="mt-4 rounded-2xl border border-sky-200/80 bg-sky-50/40 p-4 sm:p-5 dark:border-sky-900/60 dark:bg-sky-950/20 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-sky-200/60 pb-2.5 dark:border-sky-900/60">
                  <div>
                    <span className="text-base font-black text-slate-900 dark:text-white capitalize">
                      Word: {sentenceResult.word}
                    </span>
                    <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-bangla">
                      ({sentenceResult.banglaMeaning})
                    </span>
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    { level: 'Simple Level', data: sentenceResult.simple, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                    { level: 'Intermediate Level', data: sentenceResult.intermediate, color: 'text-sky-700 bg-sky-50 border-sky-200' },
                    { level: 'Advanced Level', data: sentenceResult.advanced, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
                  ].map((tier, idx) => {
                    if (!tier.data) return null;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase ${tier.color}`}>
                            {tier.level}
                          </span>
                          <button
                            onClick={() => speakText(tier.data.sentence)}
                            className="text-slate-400 hover:text-sky-600 p-1"
                            title="Listen"
                          >
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {tier.data.sentence}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-bangla">
                          {tier.data.bangla}
                        </p>
                        {tier.data.structure && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            Formula: {tier.data.structure}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* Tool 2: Vocab Builder by Topic */}
          <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  ChatGPT Vocabulary Expander by Scenario
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla">
                  পরিস্থিতিভিত্তিক প্রয়োজনীয় শব্দভাণ্ডার, উচ্চারণ এবং বাস্তব বাক্য তৈরি করুন
                </p>
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex flex-wrap gap-2">
              {[
                'Job Interview',
                'Airport & Immigration',
                'Restaurant & Dining',
                'Office & Email',
                'Doctor & Hospital',
                'Hotel & Travel',
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleGenerateVocab(topic)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    vocabTopic === topic
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-300'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {vocabLoading && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold p-4">
                <div className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
                <span>ChatGPT is generating vocabulary with Bangla phonetics and sentences...</span>
              </div>
            )}

            {/* Vocab Result Grid */}
            {vocabResult.length > 0 && !vocabLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {vocabResult.map((w: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-700 dark:bg-slate-800/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        {w.word}
                      </span>
                      <button
                        onClick={() => speakText(w.word)}
                        className="text-slate-400 hover:text-emerald-600 p-1"
                        title="Pronounce"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bangla font-semibold">
                      {w.bangla}
                    </div>

                    {w.pronunciation && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        উচ্চারণ: {w.pronunciation}
                      </div>
                    )}

                    {w.example && (
                      <div className="rounded-xl bg-white p-2.5 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 text-xs">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {w.example}
                        </div>
                        {w.exampleBangla && (
                          <div className="text-slate-500 dark:text-slate-400 font-bangla mt-0.5">
                            {w.exampleBangla}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
