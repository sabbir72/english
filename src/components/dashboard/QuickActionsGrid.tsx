import React from 'react';
import {
  BookOpen,
  PenTool,
  Puzzle,
  Headphones,
  BookMarked,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { NavigationTab } from '../../types';

export interface QuickActionsGridProps {
  onSelectAction: (tab: NavigationTab) => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onSelectAction,
}) => {
  const cards = [
    {
      id: 'book' as NavigationTab,
      title: 'Spoken English Book',
      titleBn: 'স্পোকেন সেরা বই',
      description: 'বইয়ের হুবহু পাতায় দৈনন্দিন রুটিন, বাংলা উচ্চারণ ও অর্থসহ অডিও স্পিকিং ড্রিল।',
      badge: 'বই ফরম্যাট',
      emoji: '📖',
      icon: <BookMarked className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      iconBg: 'bg-amber-50 dark:bg-amber-950/50',
      badgeColor: 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300',
    },
    {
      id: 'vocabulary' as NavigationTab,
      title: 'Vocabulary',
      titleBn: 'শব্দভাণ্ডার',
      description: 'Master daily English words with Bangla pronunciation & IPA.',
      badge: '128+ Words',
      emoji: '📖',
      icon: <BookOpen className="h-5 w-5 text-[#4F46E5] dark:text-[#818CF8]" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/50',
      badgeColor: 'text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300',
    },
    {
      id: 'grammar' as NavigationTab,
      title: 'Grammar',
      titleBn: 'সহজ ব্যাকরণ',
      description: 'Clear rules, tense patterns & common spoken mistake fixes.',
      badge: '12 Lessons',
      emoji: '✍️',
      icon: <PenTool className="h-5 w-5 text-[#0EA5E9] dark:text-sky-400" />,
      iconBg: 'bg-sky-50 dark:bg-sky-950/50',
      badgeColor: 'text-[#0EA5E9] bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300',
    },
    {
      id: 'builder' as NavigationTab,
      title: 'Sentence Builder',
      titleBn: 'বাক্য নির্মাতা',
      description: 'Interactive Subject + Verb + Object + Place + Time blocks.',
      badge: '5-Slot Blocks',
      emoji: '🧩',
      icon: <Puzzle className="h-5 w-5 text-[#10B981] dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
      badgeColor: 'text-[#10B981] bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'pronunciation' as NavigationTab,
      title: 'Pronunciation',
      titleBn: 'সঠিক উচ্চারণ',
      description: 'Bangla phonetics, silent letters and audio speech comparison.',
      badge: 'Audio & IPA',
      emoji: '🎧',
      icon: <Headphones className="h-5 w-5 text-[#F59E0B] dark:text-amber-400" />,
      iconBg: 'bg-amber-50 dark:bg-amber-950/50',
      badgeColor: 'text-[#F59E0B] bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300',
    },
    {
      id: 'reading' as NavigationTab,
      title: 'Reading',
      titleBn: 'রিডিং বুক',
      description: 'Digital textbook stories with instant click-to-translate & audio.',
      badge: 'Stories & Quizzes',
      emoji: '📚',
      icon: <BookMarked className="h-5 w-5 text-[#0EA5E9] dark:text-sky-400" />,
      iconBg: 'bg-sky-50 dark:bg-sky-950/50',
      badgeColor: 'text-[#0EA5E9] bg-sky-50 dark:bg-sky-950/60 dark:text-sky-300',
    },
    {
      id: 'ai-tutor' as NavigationTab,
      title: 'ChatGPT Conversation',
      titleBn: 'চ্যাটজিপিটি স্পিকিং',
      description: 'Practice real-life English dialogues with ChatGPT, instant grammar corrections & Bangla guidance.',
      badge: 'ChatGPT Partner',
      emoji: '🤖',
      icon: <MessageSquare className="h-5 w-5 text-[#4F46E5] dark:text-[#818CF8]" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/50',
      badgeColor: 'text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300',
    },
  ];

  return (
    <section id="learning-cards-section" className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
            Learning Modules
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400 font-sans">
            দক্ষতা অনুযায়ী প্রয়োজনীয় মডিউলে সরাসরি অনুশীলন শুরু করুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelectAction(card.id)}
            className="group cursor-pointer"
          >
            <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600/40">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} transition-transform group-hover:scale-105`}>
                      {card.icon}
                    </div>
                    <span className="text-base select-none">{card.emoji}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md font-sans ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-base font-black text-[#0F172A] dark:text-white group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8] transition-colors">
                      {card.title}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-bangla">
                      {card.titleBn}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed mt-1">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#4F46E5] dark:text-[#818CF8]">
                <span className="font-bangla font-semibold">অনুশীলন শুরু করুন</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
