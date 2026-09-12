import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  User,
  GraduationCap,
  AlertTriangle,
  RotateCcw,
  Languages,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { AIMessage, ConversationTopic, UserLevel } from '../types';
import {
  speakText,
  stopSpeaking,
  startSpeechRecognition,
  isSpeechRecognitionSupported,
} from '../utils/speech';

interface AIConversationSectionProps {
  userLevel: UserLevel;
  onIncrementSpeakingMinutes: (minutes: number) => void;
}

export const AIConversationSection: React.FC<AIConversationSectionProps> = ({
  userLevel,
  onIncrementSpeakingMinutes,
}) => {
  const [topic, setTopic] = useState<ConversationTopic>('Daily Life');
  const [mode, setMode] = useState<'teacher' | 'normal'>('teacher');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'initial-1',
      role: 'assistant',
      content:
        "Hello! I am your AI English speaking coach. Let's practice English together today! How was your morning?",
      banglaTranslation:
        'হ্যালো! আমি আপনার এআই ইংলিশ স্পিকিং কোচ। চলুন আজ একসাথে ইংরেজি অনুশীলন করি! আপনার সকালটা কেমন কাটল?',
      timestamp: Date.now(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechRecognizer, setSpeechRecognizer] = useState<{ stop: () => void } | null>(null);
  const [showBanglaMap, setShowBanglaMap] = useState<{ [id: string]: boolean }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const topics: { id: ConversationTopic; label: string; icon: string }[] = [
    { id: 'Daily Life', label: 'Daily Life', icon: '☀️' },
    { id: 'Job Interview', label: 'Job Interview', icon: '💼' },
    { id: 'Travel', label: 'Travel & Airport', icon: '✈️' },
    { id: 'Restaurant', label: 'Restaurant & Food', icon: '🍽️' },
    { id: 'Shopping', label: 'Shopping & Market', icon: '🛍️' },
    { id: 'Doctor', label: 'Doctor & Health', icon: '🏥' },
    { id: 'Office', label: 'Office & Business', icon: '🏢' },
    { id: 'Free Conversation', label: 'Free Talk', icon: '💬' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Toggle voice recognition
  const handleToggleMic = () => {
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

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);
    onIncrementSpeakingMinutes(1);

    try {
      const response = await fetch('/api/ai/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          userLevel,
          mode,
          conversationHistory: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiMsg: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        banglaTranslation: data.banglaTranslation,
        correction: data.correction,
        betterAlternative: data.betterAlternative,
        tipBangla: data.tipBangla,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      // Automatically pronounce AI reply
      speakText(data.reply);
    } catch (err: any) {
      // Fallback response
      const fallbackMsg: AIMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          "That is very interesting! Keep speaking in English and practicing every day.",
        banglaTranslation:
          'বিষয়টি দারুণ! প্রতিদিন এভাবে ইংরেজিতে কথা বলার অভ্যাস চালিয়ে যান।',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `initial-${Date.now()}`,
        role: 'assistant',
        content: `Great! Let's start a new practice session on "${topic}". Speak or type your message below!`,
        banglaTranslation: `চমৎকার! চলুন "${topic}" বিষয়ে নতুন স্পিকিং অনুশীলন শুরু করি। নিচে টাইপ করুন বা মাইক চেপে বলুন!`,
        timestamp: Date.now(),
      },
    ]);
  };

  const toggleBangla = (id: string) => {
    setShowBanglaMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="ai-conversation-section" className="mx-auto max-w-4xl space-y-4">
      {/* Settings bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setMode('teacher')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                mode === 'teacher'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Teacher Mode (শিক্ষক মোড)</span>
            </button>
            <button
              onClick={() => setMode('normal')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                mode === 'normal'
                  ? 'bg-slate-900 text-white shadow-xs dark:bg-slate-700'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>Casual Chat</span>
            </button>
          </div>

          {/* Level indicator */}
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Level: {userLevel}
          </span>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>New Session</span>
        </button>
      </div>

      {/* Topic selection chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="font-semibold text-slate-400 pl-1 shrink-0">Topic:</span>
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTopic(t.id);
              handleResetChat();
            }}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 font-medium transition-all ${
              topic === t.id
                ? 'bg-emerald-100 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div
        id="ai-chat-messages"
        className="min-h-[420px] max-h-[560px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-4 dark:border-slate-800 dark:bg-slate-950/40"
      >
        {messages.map((msg) => {
          const isAI = msg.role === 'assistant';
          const showBangla = showBanglaMap[msg.id];

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-2.5 shadow-xs ${
                  isAI
                    ? 'bg-white text-slate-800 border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200'
                    : 'bg-emerald-600 text-white rounded-br-sm'
                }`}
              >
                {/* Teacher Mode Correction Banner */}
                {isAI && msg.correction && (
                  <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-3 text-rose-950 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200">
                    <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>ভুল সংশোধন (Grammar Correction):</span>
                    </div>
                    <div className="mt-1 space-y-0.5">
                      <div className="line-through text-rose-600 dark:text-rose-400">
                        {msg.correction.original}
                      </div>
                      <div className="font-bold text-emerald-700 dark:text-emerald-300">
                        ✓ {msg.correction.corrected}
                      </div>
                      <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                        {msg.correction.explanationBangla}
                      </p>
                    </div>
                  </div>
                )}

                {/* Better alternative suggestion */}
                {isAI && msg.betterAlternative && (
                  <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-2.5 text-blue-950 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200">
                    <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400">
                      <Lightbulb className="h-3.5 w-3.5" />
                      <span>আরও সুন্দর ও স্বাভাবিক বিকল্প (Natural Expression):</span>
                    </div>
                    <div className="mt-1 font-semibold">{msg.betterAlternative}</div>
                  </div>
                )}

                {/* Message Body */}
                <p className="text-sm font-medium leading-relaxed">{msg.content}</p>

                {/* Bengali Translation Accordion */}
                {isAI && msg.banglaTranslation && (
                  <div>
                    {showBangla ? (
                      <div className="rounded-lg bg-emerald-50/60 p-2 text-xs font-semibold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                        {msg.banglaTranslation}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* AI Footer Buttons */}
                {isAI && (
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => speakText(msg.content)}
                      className="flex items-center gap-1 rounded p-1 text-slate-500 hover:text-emerald-600 dark:text-slate-400"
                      title="Listen"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span className="text-[10px]">Listen</span>
                    </button>
                    {msg.banglaTranslation && (
                      <button
                        onClick={() => toggleBangla(msg.id)}
                        className="flex items-center gap-1 rounded p-1 text-slate-500 hover:text-emerald-600 dark:text-slate-400"
                      >
                        <Languages className="h-3.5 w-3.5" />
                        <span className="text-[10px]">
                          {showBangla ? 'Hide Bangla' : 'Bangla Meaning'}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {!isAI && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white shadow-xs">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <Sparkles className="h-4 w-4 animate-spin" />
            <span>AI Teacher is listening and preparing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Speech error indicator */}
      {speechError && (
        <div className="text-xs text-rose-600 font-semibold px-2">
          {speechError}
        </div>
      )}

      {/* Input controls */}
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-md dark:border-slate-800 dark:bg-slate-900">
        <button
          id="btn-ai-chat-mic"
          onClick={handleToggleMic}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all ${
            isRecording
              ? 'bg-rose-500 ring-4 ring-rose-200 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600'
          }`}
          title={isRecording ? 'Stop Recording' : 'Speak into Microphone'}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        <input
          id="input-ai-chat"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Speak or type your English sentence here..."
          className="flex-1 bg-transparent px-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
        />

        <button
          id="btn-ai-chat-send"
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || isLoading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition-all hover:bg-emerald-500 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      <div className="text-center text-[11px] text-slate-400">
        Tip: Talk naturally without fear of making mistakes. The AI Teacher will gently point out improvements and explain in Bangla!
      </div>
    </div>
  );
};
