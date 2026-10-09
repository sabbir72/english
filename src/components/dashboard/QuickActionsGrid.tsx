import React from 'react';
import {
  BookOpen,
  PenTool,
  Puzzle,
  Headphones,
  BookMarked,
  Dumbbell,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { NavigationTab, LanguageMode } from '../../types';

export interface QuickActionsGridProps {
  onSelectAction: (tab: NavigationTab) => void;
  languageMode?: LanguageMode;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onSelectAction,
  languageMode = 'bn',
}) => {
  const isBn = languageMode === 'bn';
  const [filterCategory, setFilterCategory] = React.useState<'all' | 'books' | 'vocab' | 'grammar' | 'practice'>('all');

  const cards = [
    {
      id: 'smart-book' as NavigationTab,
      category: 'books',
      title: '100-Page Smart Book',
      titleBn: '১০০ পাতার স্মার্ট বই',
      description: 'গল্পের ভেতর বোল্ড স্মার্ট শব্দ, উচ্চারণ ও সমার্থক-বিপরীত শব্দসহ ১০০ পৃষ্ঠা।',
      badge: '১০০ পৃষ্ঠা বই',
      emoji: '📖',
      icon: <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
      badgeColor: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/70 dark:text-indigo-300',
    },
    {
      id: 'book' as NavigationTab,
      category: 'books',
      title: 'Spoken English Book',
      titleBn: 'স্পোকেন বই (আগের বই)',
      description: 'বইয়ের পাতায় দৈনন্দিন রুটিন, বাংলা উচ্চারণ ও অর্থসহ ৫০ অধ্যায়ের স্পিকিং ড্রিল।',
      badge: '৫০ অধ্যায় বই',
      emoji: '🗣️',
      icon: <BookMarked className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      iconBg: 'bg-purple-50 dark:bg-purple-950/60',
      badgeColor: 'text-purple-700 bg-purple-50 dark:bg-purple-950/70 dark:text-purple-300',
    },
    {
      id: 'vocabulary' as NavigationTab,
      category: 'vocab',
      title: 'Vocabulary Book',
      titleBn: 'শব্দভাণ্ডার (বইয়ের পাতা)',
      description: 'বইয়ের পাতার মতো পেজ-বাই-পেজ উচ্চারণ, অর্থ ও উদাহরণসহ শব্দভাণ্ডার পড়ুন।',
      badge: 'বইয়ের পাতা ভিউ',
      emoji: '📚',
      icon: <BookOpen className="h-5 w-5 text-[#4F46E5] dark:text-[#818CF8]" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
      badgeColor: 'text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950/70 dark:text-indigo-300',
    },
    {
      id: 'oxford-3000' as unknown as NavigationTab,
      category: 'vocab',
      title: '3000 Essential Words',
      titleBn: '৩০০০ স্পেশাল শব্দ (Oxford 3000)',
      description: 'ইংরেজি যোগাযোগের ৯০% প্রয়োজনীয় ৩০০০ মৌলিক শব্দ, পৃষ্ঠা নম্বর ও সার্চসহ সাজানো।',
      badge: '৩০০০ শব্দ • পেজিনেশন',
      emoji: '🌟',
      icon: <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      badgeColor: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300',
    },
    {
      id: 'grammar' as NavigationTab,
      category: 'grammar',
      title: 'Grammar',
      titleBn: 'সহজ ব্যাকরণ',
      description: 'Clear rules, tense patterns & common spoken mistake fixes.',
      badge: '12 Lessons',
      emoji: '✍️',
      icon: <PenTool className="h-5 w-5 text-[#0EA5E9] dark:text-sky-400" />,
      iconBg: 'bg-sky-50 dark:bg-sky-950/60',
      badgeColor: 'text-[#0EA5E9] bg-sky-50 dark:bg-sky-950/70 dark:text-sky-300',
    },
    {
      id: 'builder' as NavigationTab,
      category: 'grammar',
      title: 'Sentence Builder',
      titleBn: 'বাক্য নির্মাতা',
      description: 'Interactive Subject + Verb + Object + Place + Time blocks.',
      badge: '5-Slot Blocks',
      emoji: '🧩',
      icon: <Puzzle className="h-5 w-5 text-[#10B981] dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      badgeColor: 'text-[#10B981] bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300',
    },
    {
      id: 'pronunciation' as NavigationTab,
      category: 'practice',
      title: 'Pronunciation',
      titleBn: 'সঠিক উচ্চারণ',
      description: 'Bangla phonetics, silent letters and audio speech comparison.',
      badge: 'Audio & IPA',
      emoji: '🎧',
      icon: <Headphones className="h-5 w-5 text-[#F59E0B] dark:text-amber-400" />,
      iconBg: 'bg-amber-50 dark:bg-amber-950/60',
      badgeColor: 'text-[#F59E0B] bg-amber-50 dark:bg-amber-950/70 dark:text-amber-300',
    },
    {
      id: 'reading' as NavigationTab,
      category: 'books',
      title: 'Reading',
      titleBn: 'রিডিং বুক',
      description: 'Digital textbook stories with instant click-to-translate & audio.',
      badge: 'Stories & Quizzes',
      emoji: '📖',
      icon: <BookMarked className="h-5 w-5 text-[#0EA5E9] dark:text-sky-400" />,
      iconBg: 'bg-sky-50 dark:bg-sky-950/60',
      badgeColor: 'text-[#0EA5E9] bg-sky-50 dark:bg-sky-950/70 dark:text-sky-300',
    },
    {
      id: 'practice' as NavigationTab,
      category: 'practice',
      title: 'Practice & Quizzes',
      titleBn: 'কুইজ ও অনুশীলন',
      description: 'Interactive MCQs, sentence rearrangements, error corrections & smart test drills.',
      badge: 'Interactive Tests',
      emoji: '🎯',
      icon: <Dumbbell className="h-5 w-5 text-[#4F46E5] dark:text-[#818CF8]" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60',
      badgeColor: 'text-[#4F46E5] bg-indigo-50 dark:bg-indigo-950/70 dark:text-indigo-300',
    },
  ];

  const visibleCards = filterCategory === 'all'
    ? cards
    : cards.filter((c) => c.category === filterCategory);

  const filterTabs = [
    { id: 'all', label: isBn ? 'সকল মডিউল' : 'All Modules', count: cards.length },
    { id: 'books', label: isBn ? '📖 বইসমূহ' : 'Books', count: cards.filter(c => c.category === 'books').length },
    { id: 'vocab', label: isBn ? '🌟 শব্দভাণ্ডার' : 'Vocabulary', count: cards.filter(c => c.category === 'vocab').length },
    { id: 'grammar', label: isBn ? '✍️ ব্যাকরণ ও বাক্য' : 'Grammar & Sentences', count: cards.filter(c => c.category === 'grammar').length },
    { id: 'practice', label: isBn ? '🎯 প্র্যাকটিস' : 'Practice', count: cards.filter(c => c.category === 'practice').length },
  ];

  return (
    <section id="learning-cards-section" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight">
            {isBn ? 'লার্নিং মডিউলসমূহ' : 'Learning Modules'}
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400 font-sans mt-0.5">
            {isBn ? 'দক্ষতা অনুযায়ী প্রয়োজনীয় মডিউলে সরাসরি অনুশীলন শুরু করুন' : 'Jump directly into interactive practice modules'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as typeof filterCategory)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCards.map((card) => {
          const mainTitle = isBn ? card.titleBn : card.title;
          const secondaryTitle = isBn ? card.title : card.titleBn;

          return (
            <div
              key={card.id}
              onClick={() => onSelectAction(card.id)}
              className="group cursor-pointer"
            >
              <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-[#1E293B] transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600/50">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} transition-transform group-hover:scale-110 duration-200`}>
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
                        {mainTitle}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {secondaryTitle}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed mt-1">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#4F46E5] dark:text-[#818CF8]">
                  <span className="font-semibold">{isBn ? 'অনুশীলন শুরু করুন' : 'Start Practice'}</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
