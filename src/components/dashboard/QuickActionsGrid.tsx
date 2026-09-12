import React from 'react';
import {
  BookOpen,
  MessageSquareQuote,
  GraduationCap,
  BotMessageSquare,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { NavigationTab } from '../../types';

export interface QuickActionsGridProps {
  onSelectAction: (tab: NavigationTab) => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onSelectAction,
}) => {
  const actions = [
    {
      id: 'vocabulary' as NavigationTab,
      title: 'Vocabulary',
      titleBn: 'শব্দভাণ্ডার',
      description: 'Learn new words with pronunciation & meanings',
      cta: 'Explore Words',
      icon: <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      badgeColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    },
    {
      id: 'sentences' as NavigationTab,
      title: 'Sentences',
      titleBn: 'দৈনন্দিন বাক্য',
      description: 'Practice useful sentences for daily conversations',
      cta: 'Practice Sentences',
      icon: <MessageSquareQuote className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
      iconBg: 'bg-blue-50 dark:bg-blue-950/50',
    },
    {
      id: 'grammar' as NavigationTab,
      title: 'Grammar',
      titleBn: 'সহজ ব্যাকরণ',
      description: 'Understand grammar easily with clear rules',
      cta: 'Read Lessons',
      icon: <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
      iconBg: 'bg-purple-50 dark:bg-purple-950/50',
    },
    {
      id: 'ai-tutor' as NavigationTab,
      title: 'AI Tutor',
      titleBn: 'এআই স্পিকিং পার্টনার',
      description: 'Practice English with AI anytime anywhere',
      cta: 'Start Conversation',
      icon: <BotMessageSquare className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      badgeColor: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
      iconBg: 'bg-amber-50 dark:bg-amber-950/50',
    },
  ];

  return (
    <section id="quick-actions-section" className="space-y-3">
      <div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
          Quick Actions
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
          আপনার পছন্দমতো মডিউলে সরাসরি প্রবেশ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            onClick={() => onSelectAction(action.id)}
            className="group cursor-pointer"
          >
            <Card
              hoverEffect
              padding="md"
              className="h-full flex flex-col justify-between border border-slate-200/80 hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700/80 transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Icon header */}
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.iconBg} transition-transform duration-200 group-hover:scale-105`}
                  >
                    {action.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-sans">
                    {action.titleBn}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                    {action.description}
                  </p>
                </div>
              </div>

              {/* CTA Link */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>{action.cta}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
