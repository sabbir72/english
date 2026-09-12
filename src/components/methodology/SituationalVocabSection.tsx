import React, { useState } from 'react';
import {
  Briefcase,
  Plane,
  Coffee,
  UserCheck,
  Volume2,
  Sparkles,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { SituationalVocabTopic } from '../../types';
import { speakText } from '../../utils/speech';

interface SituationalVocabSectionProps {
  topics: SituationalVocabTopic[];
  onStartScenarioChat?: (topicTitle: string, situationPrompt: string) => void;
}

export const SituationalVocabSection: React.FC<SituationalVocabSectionProps> = ({
  topics,
  onStartScenarioChat,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || '');
  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className="h-4 w-4" />;
      case 'Plane':
        return <Plane className="h-4 w-4" />;
      case 'UserCheck':
        return <UserCheck className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div id="situational-vocab-section" className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Rule #9 Methodology
              </span>
              <span className="text-xs text-slate-500">প্রাসঙ্গিক পরিস্থিতিতে শব্দ ও বাক্য শিক্ষা</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Situational Vocabulary (বাস্তব জীবনের পরিস্থিতিতে ভোকাবুলারি)
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              বিচ্ছিন্নভাবে শব্দ মুখস্থ না করে নির্দিষ্ট পরিস্থিতির বাস্তব কথোপকথন এবং প্রয়োজনীয় বাক্য শিখুন।
            </p>
          </div>

          {/* Topic Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopicId(t.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  selectedTopicId === t.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {getTopicIcon(t.icon)}
                <span>{t.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentTopic && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left 2 Cols: Real Dialogue & Key Sentences */}
          <div className="lg:col-span-2 space-y-5">
            {/* Real-life Dialogue Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {currentTopic.title}
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {currentTopic.banglaTitle} • {currentTopic.description}
                  </p>
                </div>

                {onStartScenarioChat && (
                  <button
                    onClick={() =>
                      onStartScenarioChat(
                        currentTopic.title,
                        `Let's do a roleplay practice for ${currentTopic.title} (${currentTopic.banglaTitle}). You speak first.`
                      )
                    }
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Practice with AI</span>
                  </button>
                )}
              </div>

              {/* Dialogue Transcript */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  বাস্তব কথোপকথন (Authentic Conversation):
                </div>

                {currentTopic.dialogue.map((line, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 rounded-2xl p-3.5 transition-all ${
                      line.speaker === 'A' || line.speaker.includes('1') || line.speaker.includes('Agent')
                        ? 'bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white dark:bg-slate-700">
                      {line.speaker.slice(0, 1)}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {line.speaker}
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {line.english}
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                        {line.bangla}
                      </div>
                    </div>
                    <button
                      onClick={() => speakText(line.english)}
                      className="text-slate-400 hover:text-blue-600 p-1"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: High-Value Vocabulary & Useful Phrases */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                জরুরি শব্দাবলি ({currentTopic.vocabulary.length}টি)
              </div>

              <div className="mt-3 space-y-2">
                {currentTopic.vocabulary.map((voc, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {voc.word}
                      </span>
                      <button
                        onClick={() => speakText(voc.word)}
                        className="text-slate-400 hover:text-blue-600 p-1"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {voc.bangla}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-300 italic">
                      "{voc.sampleSentence}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
