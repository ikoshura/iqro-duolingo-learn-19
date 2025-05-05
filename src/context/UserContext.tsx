
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserStats {
  xp: number;
  streak: number;
  level: number;
  completedLessons: string[];
  currentLesson: string | null;
  dailyGoal: number;
  dailyProgress: number;
}

interface UserContextType {
  userStats: UserStats;
  updateUserStats: (stats: Partial<UserStats>) => void;
  completeLesson: (lessonId: string, earnedXp: number) => void;
}

const defaultUserStats: UserStats = {
  xp: 0,
  streak: 0,
  level: 1,
  completedLessons: [],
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

  const completeLesson = (lessonId: string, earnedXp: number) => {
    setUserStats(prevStats => {
      // Don't add XP if lesson was already completed
      if (prevStats.completedLessons.includes(lessonId)) {
        return prevStats;
      }

      const newXp = prevStats.xp + earnedXp;
      const newDailyProgress = Math.min(prevStats.dailyGoal, prevStats.dailyProgress + earnedXp);
      
      // Calculate level (every 100 XP is a new level)
      const newLevel = Math.floor(newXp / 100) + 1;
      
      // Determine next lesson to unlock
      const lessonNumber = parseInt(lessonId.split('-')[1]);
      const nextLessonId = `lesson-${lessonNumber + 1}`;
      
      return {
        ...prevStats,
        xp: newXp,
        level: newLevel,
        completedLessons: [...prevStats.completedLessons, lessonId],
        currentLesson: nextLessonId,
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
