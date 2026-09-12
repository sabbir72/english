import React from 'react';
import {
  Home,
  BookOpen,
  Dumbbell,
  BotMessageSquare,
  User,
} from 'lucide-react';
import { NavigationTab } from '../../types';

export interface MobileBottomNavProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenLearnDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  onOpenLearnDrawer,
}) => {
  const isLearnActive = [
    'learn',
    'vocabulary',
    'sentences',
    'sentence-structure',
    'grammar',
    'pronunciation',
  ].includes(activeTab);

  const isAITutorActive = ['ai-tutor', 'ai-conversation', 'ai-tools'].includes(activeTab);

  return (
    <div
      id="mobile-bottom-nav"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-900/95 safe-area-pb"
    >
      <nav className="flex items-center justify-around px-2 py-1.5">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-colors ${
            activeTab === 'home'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* 2. Learn (Opens sub-modules drawer or navigates) */}
        <button
          type="button"
          onClick={() => {
            if (isLearnActive) {
              onOpenLearnDrawer();
            } else {
              onNavigate('learn');
            }
          }}
          className={`relative flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-colors ${
            isLearnActive
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Learn</span>
        </button>

        {/* 3. Practice */}
        <button
          type="button"
          onClick={() => onNavigate('practice')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-colors ${
            activeTab === 'practice'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <Dumbbell className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Practice</span>
        </button>

        {/* 4. AI Tutor */}
        <button
          type="button"
          onClick={() => onNavigate('ai-tutor')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-colors ${
            isAITutorActive
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <div className="relative">
            <BotMessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-2 h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[10px] mt-0.5">AI Tutor</span>
        </button>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium'
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
};
