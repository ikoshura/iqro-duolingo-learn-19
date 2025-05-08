
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserStats {
  xp: number;
  streak: number;
  level: number;
  completedLessons: string[];
  lessonAccuracy: Record<string, number>; // New field to track lesson accuracy
  currentLesson: string | null;
  dailyGoal: number;
  dailyProgress: number;
}

interface UserContextType {
  userStats: UserStats;
  updateUserStats: (stats: Partial<UserStats>) => void;
  completeLesson: (lessonId: string, earnedXp: number, accuracy?: number) => void;
}

const defaultUserStats: UserStats = {
  xp: 0,
  streak: 0,
  level: 1,
  completedLessons: [],
  lessonAccuracy: {}, // Track accuracy per lesson
  currentLesson: 'lesson-1',
  dailyGoal: 50,
  dailyProgress: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);

  const updateUserStats = (stats: Partial<UserStats>) => {
    setUserStats(prevStats => ({ ...prevStats, ...stats }));
  };

  const completeLesson = (lessonId: string, earnedXp: number, accuracy = 100) => {
    setUserStats(prevStats => {
      // Always update the accuracy
      const newLessonAccuracy = {
        ...prevStats.lessonAccuracy,
        [lessonId]: accuracy
      };
      
      // Don't add XP if lesson was already completed with 100% accuracy
      if (prevStats.completedLessons.includes(lessonId) && prevStats.lessonAccuracy[lessonId] === 100) {
        return {
          ...prevStats,
          lessonAccuracy: newLessonAccuracy
        };
      }

      // If already completed but with lower accuracy, only add partial XP
      let xpToAdd = earnedXp;
      if (prevStats.completedLessons.includes(lessonId)) {
        const previousAccuracy = prevStats.lessonAccuracy[lessonId] || 0;
        // Only give XP for the improvement
        if (accuracy > previousAccuracy) {
          xpToAdd = Math.floor((accuracy - previousAccuracy) / 100 * earnedXp);
        } else {
          xpToAdd = 0;
        }
      }

      const newXp = prevStats.xp + xpToAdd;
      const newDailyProgress = Math.min(prevStats.dailyGoal, prevStats.dailyProgress + xpToAdd);
      
      // Calculate level (every 100 XP is a new level)
      const newLevel = Math.floor(newXp / 100) + 1;
      
      // Include in completed lessons regardless of accuracy
      const newCompletedLessons = prevStats.completedLessons.includes(lessonId)
        ? prevStats.completedLessons
        : [...prevStats.completedLessons, lessonId];
      
      // Determine next lesson to unlock (only if 100% accuracy)
      const lessonNumber = parseInt(lessonId.split('-')[1]);
      const nextLessonId = `lesson-${lessonNumber + 1}`;
      
      return {
        ...prevStats,
        xp: newXp,
        level: newLevel,
        completedLessons: newCompletedLessons,
        lessonAccuracy: newLessonAccuracy,
        currentLesson: accuracy === 100 ? nextLessonId : prevStats.currentLesson,
        dailyProgress: newDailyProgress,
      };
    });
  };

  return (
    <UserContext.Provider value={{ userStats, updateUserStats, completeLesson }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
