
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'id';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<Language, string>> = {
  'home': { en: 'Home', id: 'Beranda' },
  'lessons': { en: 'Lessons', id: 'Pelajaran' },
  'practice': { en: 'Practice', id: 'Latihan' },
  'achievements': { en: 'Achievements', id: 'Prestasi' },
  'profile': { en: 'Profile', id: 'Profil' },
  'start_learning': { en: 'Start Learning', id: 'Mulai Belajar' },
  'my_progress': { en: 'My Progress', id: 'Kemajuan Saya' },
  'keep_learning': { en: 'Keep Learning Every Day', id: 'Terus Belajar Setiap Hari' },
  'streak_message': { en: 'Complete your daily goal to maintain your streak and progress faster!', id: 'Selesaikan target harian Anda untuk mempertahankan streak dan kemajuan lebih cepat!' },
  'all_lessons': { en: 'All Lessons', id: 'Semua Pelajaran' },
  'your_progress': { en: 'Your Progress', id: 'Kemajuan Anda' },
  'of': { en: 'of', id: 'dari' },
  'lessons_completed': { en: 'lessons completed', id: 'pelajaran selesai' },
  'iqro': { en: 'Iqro', id: 'Iqro' },
  'language': { en: 'Language', id: 'Bahasa' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
