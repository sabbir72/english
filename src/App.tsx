import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/navigation/Navbar';
import { MobileBottomNav } from './components/navigation/MobileBottomNav';
import { LearnDrawerModal } from './components/navigation/LearnDrawerModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { HomeDashboard } from './components/HomeDashboard';
import { LearnMainSection } from './components/LearnMainSection';
import { PracticeSection } from './components/PracticeSection';
import { AITutorMainSection } from './components/AITutorMainSection';
import { ProgressSection } from './components/ProgressSection';
import { SavedContentSection } from './components/SavedContentSection';
import { ProfileSection } from './components/ProfileSection';
import { AdminPanelSection } from './components/AdminPanelSection';
import { ReadingSection } from './components/ReadingSection';
import { SpokenBookSection } from './components/book/SpokenBookSection';
import { DailyHabitSection } from './components/DailyHabitSection';
import { Sidebar } from './components/Sidebar';

import {
  NavigationTab,
  LearnSubTab,
  UserProfile,
  UserProgress,
  UserLevel,
  VocabularyItem,
  SentenceItem,
  SentenceStructureItem,
  GrammarLesson,
  PracticeQuestion,
} from './types';

import {
  getStoredProfile,
  saveStoredProfile,
  getStoredProgress,
  saveStoredProgress,
  getStoredVocabulary,
  saveStoredVocabulary,
  getStoredSentences,
  saveStoredSentences,
  getStoredStructures,
  saveStoredStructures,
  getStoredGrammar,
  saveStoredGrammar,
  getStoredPractice,
  saveStoredPractice,
} from './utils/storage';

import {
  INITIAL_VOCABULARY,
  INITIAL_SENTENCES,
  INITIAL_SENTENCE_STRUCTURES,
  INITIAL_GRAMMAR_LESSONS,
  INITIAL_PRACTICE_QUESTIONS,
  INITIAL_USER_PROFILE,
  INITIAL_USER_PROGRESS,
} from './data/mockData';

export function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [activeLearnSubTab, setActiveLearnSubTab] = useState<LearnSubTab>('vocabulary');
  const [learnDrawerOpen, setLearnDrawerOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme - persists to localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('boli_dark_mode') === 'true';
  });

  // Data state
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile);
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(getStoredVocabulary);
  const [sentences, setSentences] = useState<SentenceItem[]>(getStoredSentences);
  const [structures, setStructures] = useState<SentenceStructureItem[]>(getStoredStructures);
  const [grammar, setGrammar] = useState<GrammarLesson[]>(getStoredGrammar);
  const [practice, setPractice] = useState<PracticeQuestion[]>(getStoredPractice);

  // Sync theme to HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('boli_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('boli_dark_mode', 'false');
    }
  }, [isDarkMode]);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync state to storage
  useEffect(() => {
    saveStoredProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveStoredVocabulary(vocabulary);
  }, [vocabulary]);

  useEffect(() => {
    saveStoredSentences(sentences);
  }, [sentences]);

  useEffect(() => {
    saveStoredStructures(structures);
  }, [structures]);

  useEffect(() => {
    saveStoredGrammar(grammar);
  }, [grammar]);

  useEffect(() => {
    saveStoredPractice(practice);
  }, [practice]);

  // Award XP helper with confetti
  const handleAwardXP = (amount: number, _reason?: string) => {
    setProgress((prev) => ({
      ...prev,
      xp: (prev.xp || 140) + amount,
    }));
    try {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.8 },
      });
    } catch {}
  };

  // Toggle Vocab Favorite
  const handleToggleFavoriteVocab = (id: string) => {
    setVocabulary((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v))
    );
  };

  // Toggle Vocab Learned
  const handleToggleLearnedVocab = (id: string) => {
    setVocabulary((prev) => {
      const updated = prev.map((v) =>
        v.id === id ? { ...v, isLearned: !v.isLearned } : v
      );
      const learnedCount = updated.filter((v) => v.isLearned).length;

      setProgress((prog) => ({
        ...prog,
        totalWordsLearned: Math.max(prog.totalWordsLearned, learnedCount),
        dailyGoal: {
          ...prog.dailyGoal,
          wordsDone: Math.min(prog.dailyGoal.wordsTarget, prog.dailyGoal.wordsDone + 1),
        },
      }));

      return updated;
    });
  };

  // Toggle Save Sentence
  const handleToggleSaveSentence = (id: string) => {
    setSentences((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isSaved: !s.isSaved } : s))
    );
  };

  // Practice Sentence
  const handlePracticeSentence = (sentence: SentenceItem) => {
    setSentences((prev) =>
      prev.map((s) => (s.id === sentence.id ? { ...s, isPracticed: true } : s))
    );
    setProgress((prev) => ({
      ...prev,
      totalSentencesPracticed: prev.totalSentencesPracticed + 1,
      dailyGoal: {
        ...prev.dailyGoal,
        sentencesDone: Math.min(
          prev.dailyGoal.sentencesTarget,
          prev.dailyGoal.sentencesDone + 1
        ),
      },
    }));
    handleAwardXP(10);
  };

  // Toggle Complete Grammar Lesson
  const handleToggleCompleteLesson = (id: string) => {
    setGrammar((prev) => {
      const updated = prev.map((g) =>
        g.id === id ? { ...g, isCompleted: !g.isCompleted } : g
      );
      const completedCount = updated.filter((g) => g.isCompleted).length;

      setProgress((prog) => ({
        ...prog,
        grammarTopicsCompleted: completedCount,
        dailyGoal: {
          ...prog.dailyGoal,
          grammarDone: Math.min(
            prog.dailyGoal.grammarTarget,
            prog.dailyGoal.grammarDone + 1
          ),
        },
      }));

      return updated;
    });
    handleAwardXP(15);
  };

  // Toggle Save Grammar Lesson
  const handleToggleSaveGrammar = (id: string) => {
    setGrammar((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isSaved: !g.isSaved } : g))
    );
  };

  // Practice Question Complete
  const handleCompletePractice = (score: number) => {
    setProgress((prev) => {
      const totalQuizzes = prev.quizzesCompleted + 1;
      const newAvg = Math.round(
        (prev.quizAverageScore * prev.quizzesCompleted + (score / 5) * 100) /
          totalQuizzes
      );
      return {
        ...prev,
        quizzesCompleted: totalQuizzes,
        quizAverageScore: newAvg,
        dailyGoal: {
          ...prev.dailyGoal,
          practiceDone: Math.min(
            prev.dailyGoal.practiceTarget,
            prev.dailyGoal.practiceDone + 1
          ),
        },
      };
    });
    handleAwardXP(20);
  };

  // Increment Speaking Minutes
  const handleIncrementSpeakingMinutes = (minutes: number) => {
    setProgress((prev) => ({
      ...prev,
      speakingMinutes: prev.speakingMinutes + minutes,
      dailyGoal: {
        ...prev.dailyGoal,
        aiMinutesDone: Math.min(
          prev.dailyGoal.aiMinutesTarget,
          prev.dailyGoal.aiMinutesDone + minutes
        ),
      },
    }));
    handleAwardXP(minutes * 5);
  };

  // Add Vocab Word (Admin)
  const handleAddVocab = (item: VocabularyItem) => {
    setVocabulary((prev) => [item, ...prev]);
  };

  // Delete Vocab Word (Admin)
  const onDeleteVocab = (id: string) => {
    setVocabulary((prev) => prev.filter((v) => v.id !== id));
  };

  // Add Sentence (Admin)
  const handleAddSentence = (item: SentenceItem) => {
    setSentences((prev) => [item, ...prev]);
  };

  // Delete Sentence (Admin)
  const onDeleteSentence = (id: string) => {
    setSentences((prev) => prev.filter((s) => s.id !== id));
  };

  // Reset All to Defaults
  const handleResetAllData = () => {
    setVocabulary(INITIAL_VOCABULARY);
    setSentences(INITIAL_SENTENCES);
    setStructures(INITIAL_SENTENCE_STRUCTURES);
    setGrammar(INITIAL_GRAMMAR_LESSONS);
    setPractice(INITIAL_PRACTICE_QUESTIONS);
    setProgress(INITIAL_USER_PROGRESS);
    setProfile(INITIAL_USER_PROFILE);
  };

  // Centralized Navigation Handler
  const handleNavigate = (t: NavigationTab) => {
    if (t === 'reading') {
      setActiveTab('reading');
    } else if (t === 'habit' || t === 'settings') {
      setActiveTab('habit');
    } else if (t === 'word-bank') {
      setActiveTab('saved');
    } else if (t === 'conversation') {
      setActiveTab('ai-tutor');
    } else {
      const learnTabsMap: Record<string, LearnSubTab> = {
        patterns: 'patterns',
        builder: 'builder',
        'sentence-builder': 'builder',
        transformation: 'transformation',
        'word-family': 'word-family',
        'context-vocab': 'context-vocab',
        translation: 'translation',
        mistakes: 'mistakes',
        vocabulary: 'vocabulary',
        sentences: 'sentences',
        'sentence-structure': 'structures',
        structures: 'structures',
        grammar: 'grammar',
        pronunciation: 'pronunciation',
      };

      if (learnTabsMap[t]) {
        setActiveLearnSubTab(learnTabsMap[t]);
        setActiveTab('learn');
      } else {
        setActiveTab(t);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Learn Sub-tab & switch active view to learn
  const handleSelectLearnSubTab = (subTab: LearnSubTab) => {
    setActiveLearnSubTab(subTab);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLearnModule = [
    'learn',
    'vocabulary',
    'sentences',
    'sentence-structure',
    'grammar',
    'pronunciation',
    'patterns',
    'builder',
    'transformation',
    'word-family',
    'context-vocab',
    'translation',
    'mistakes',
  ].includes(activeTab);

  const isAITutorModule = [
    'ai-tutor',
    'ai-conversation',
    'ai-tools',
  ].includes(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-[#f8fafc] to-slate-100/80 font-sans text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white relative">
      {/* Soft, Eye-Friendly Ambient Background on Page Sides */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30 dark:opacity-15" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      {/* 1. Desktop & Mobile Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onSelectLearnSubTab={handleSelectLearnSubTab}
        onOpenSearch={() => setGlobalSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        streak={progress.currentStreak || 3}
        profile={profile}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      {/* 2. Main Workspace Layout: Desktop Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleNavigate}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        <main
          id="main-app-content"
          className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-12"
        >
          {activeTab === 'home' && (
            <HomeDashboard
              progress={progress}
              profile={profile}
              onNavigate={handleNavigate}
              onSelectLearnSubTab={handleSelectLearnSubTab}
              onAwardXP={handleAwardXP}
            />
          )}

          {activeTab === 'book' && (
            <SpokenBookSection
              onAwardXP={handleAwardXP}
              onSaveSentence={(english, bangla) => {
                setSentences((prev) => {
                  const exists = prev.some((s) => s.english.toLowerCase() === english.toLowerCase());
                  if (exists) {
                    return prev.map((s) =>
                      s.english.toLowerCase() === english.toLowerCase() ? { ...s, isSaved: true } : s
                    );
                  }
                  return [
                    {
                      id: `sent-book-${Date.now()}`,
                      english,
                      bangla,
                      sentenceType: 'Affirmative',
                      difficulty: 'Beginner',
                      structure: 'Daily Routine Sentence',
                      grammarExplanationBangla: 'স্পোকেন ইংলিশ বই থেকে সংরক্ষিত বাক্য',
                      importantVocab: [],
                      isSaved: true,
                      isPracticed: true,
                    },
                    ...prev,
                  ];
                });
                handleAwardXP(10, 'Saved Spoken Book sentence');
              }}
            />
          )}

          {activeTab === 'reading' && (
            <ReadingSection
              onAwardXP={handleAwardXP}
              onSaveWord={(word, meaning) => {
                const existing = vocabulary.find((v) => v.word.toLowerCase() === word.toLowerCase());
                if (existing) {
                  if (!existing.isFavorite) handleToggleFavoriteVocab(existing.id);
                } else {
                  handleAddVocab({
                    id: `word-${Date.now()}`,
                    word,
                    banglaMeaning: meaning,
                    pronunciation: '',
                    ipa: '',
                    partOfSpeech: 'noun',
                    category: 'Reading',
                    example: `I encountered "${word}" while reading English.`,
                    exampleBangla: `ইংরেজি পড়ার সময় আমি "${word}" শব্দটি পেয়েছি।`,
                    difficulty: 'Beginner',
                    synonyms: [],
                    antonyms: [],
                    relatedWords: [],
                    isFavorite: true,
                    isLearned: false,
                  });
                }
              }}
            />
          )}

          {activeTab === 'habit' && (
            <DailyHabitSection
              progress={progress}
              profile={profile}
              onUpdateProfile={(updated) => setProfile((p) => ({ ...p, ...updated }))}
              onAwardXP={handleAwardXP}
            />
          )}

          {isLearnModule && (
            <LearnMainSection
              key={activeLearnSubTab}
              initialSubTab={activeLearnSubTab}
              vocabulary={vocabulary}
              sentences={sentences}
              sentenceStructures={structures}
              grammarLessons={grammar}
              onToggleFavoriteVocab={handleToggleFavoriteVocab}
              onToggleLearnedVocab={handleToggleLearnedVocab}
              onPracticeVocabWord={() => {}}
              onToggleSaveSentence={handleToggleSaveSentence}
              onPracticeSentence={handlePracticeSentence}
              onAIGenerateSimilar={() => setActiveTab('ai-tutor')}
              onToggleCompleteGrammar={handleToggleCompleteLesson}
              onAskAIGrammar={() => setActiveTab('ai-tutor')}
              onAskAIStructure={() => setActiveTab('ai-tutor')}
              onIncrementSpeakingMinutes={handleIncrementSpeakingMinutes}
              onNavigate={handleNavigate}
              onAwardXP={handleAwardXP}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeSection
              questions={practice}
              onCompletePractice={handleCompletePractice}
              onAwardXP={handleAwardXP}
            />
          )}

          {isAITutorModule && (
            <AITutorMainSection
              userLevel={profile.level}
              onIncrementSpeakingMinutes={handleIncrementSpeakingMinutes}
              onAwardXP={handleAwardXP}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressSection
              progress={progress}
              profile={profile}
              onResetProgress={() => {
                if (confirm('Reset your daily streak and progress counters?')) {
                  setProgress(INITIAL_USER_PROGRESS);
                }
              }}
            />
          )}

          {activeTab === 'saved' && (
            <SavedContentSection
              vocabulary={vocabulary}
              sentences={sentences}
              grammarLessons={grammar}
              onToggleFavoriteVocab={handleToggleFavoriteVocab}
              onToggleSaveSentence={handleToggleSaveSentence}
              onToggleSaveGrammar={handleToggleSaveGrammar}
              onNavigate={(t) => setActiveTab(t)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileSection
              profile={profile}
              vocabulary={vocabulary}
              sentences={sentences}
              onUpdateProfile={(updated) => setProfile((p) => ({ ...p, ...updated }))}
              onSelectWord={() => handleSelectLearnSubTab('vocabulary')}
              onSelectSentence={() => handleSelectLearnSubTab('sentences')}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPanelSection
              vocabulary={vocabulary}
              sentences={sentences}
              structures={structures}
              grammar={grammar}
              practice={practice}
              onAddVocab={handleAddVocab}
              onDeleteVocab={onDeleteVocab}
              onAddSentence={handleAddSentence}
              onDeleteSentence={onDeleteSentence}
              onResetAllData={handleResetAllData}
            />
          )}
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation (Ergonomic 5-item touch bar for mobile) */}
      <MobileBottomNav
        activeTab={activeTab}
        onNavigate={(t) => {
          setActiveTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLearnDrawer={() => setLearnDrawerOpen(true)}
      />

      {/* 4. Mobile Learn Sub-Menu Sheet Modal */}
      <LearnDrawerModal
        isOpen={learnDrawerOpen}
        onClose={() => setLearnDrawerOpen(false)}
        onSelectSubTab={handleSelectLearnSubTab}
        activeSubTab={activeLearnSubTab}
      />

      {/* 5. Global Search Modal (Ctrl+K / ⌘K) */}
      <GlobalSearchModal
        isOpen={globalSearchOpen}
        onClose={() => setGlobalSearchOpen(false)}
        vocabulary={vocabulary}
        sentences={sentences}
        structures={structures}
        grammar={grammar}
        onNavigate={(t) => {
          setActiveTab(t);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
