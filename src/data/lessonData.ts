
export interface Letter {
  id: string;
  arabic: string;
  transliteration: string;
  audioUrl?: string;
}

export interface Exercise {
  id: string;
  type: 'match' | 'selection' | 'pronunciation' | 'listen';
  instructions: string;
  content: {
    question: string;
    options?: string[];
    correctAnswer: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  xpReward: number;
  duration: string;
  letters: Letter[];
  exercises: Exercise[];
  isUnlocked: boolean;
  iqroLevel: number;
}

// Sample data for Iqro method organized into 6 levels
export const lessons: Lesson[] = [
  // IQRO LEVEL 1
  {
    id: 'lesson-1',
    title: 'Introduction to Alif and Ba',
    description: 'Learn the first two letters of the Arabic alphabet',
    level: 1,
    xpReward: 10,
    duration: '5 min',
    letters: [
      {
        id: 'alif',
        arabic: 'ا',
        transliteration: 'Alif',
      },
      {
        id: 'ba',
        arabic: 'ب',
        transliteration: 'Ba',
      }
    ],
    exercises: [
      {
        id: 'ex-1',
        type: 'match',
        instructions: 'Match the Arabic letter with its name',
        content: {
          question: 'ا',
          options: ['Alif', 'Ba', 'Ta'],
          correctAnswer: 'Alif'
        }
      },
      {
        id: 'ex-2',
        type: 'selection',
        instructions: 'Select the Ba letter',
        content: {
          question: 'Which one is Ba?',
          options: ['ا', 'ب', 'ت'],
          correctAnswer: 'ب'
        }
      },
      {
        id: 'ex-3',
        type: 'match',
        instructions: 'Match the letter with its name',
        content: {
          question: 'ب',
          options: ['Alif', 'Ba', 'Ta'],
          correctAnswer: 'Ba'
        }
      },
      {
        id: 'ex-4',
        type: 'selection',
        instructions: 'Select the Alif letter',
        content: {
          question: 'Which one is Alif?',
          options: ['ا', 'ب', 'ت'],
          correctAnswer: 'ا'
        }
      }
    ],
    isUnlocked: true,
    iqroLevel: 1
  },
  {
    id: 'lesson-2',
    title: 'Ta and Tha',
    description: 'Learn the next two letters of the Arabic alphabet',
    level: 1,
    xpReward: 10,
    duration: '5 min',
    letters: [
      {
        id: 'ta',
        arabic: 'ت',
        transliteration: 'Ta',
      },
      {
        id: 'tha',
        arabic: 'ث',
        transliteration: 'Tha',
      }
    ],
    exercises: [
      {
        id: 'ex-3',
        type: 'match',
        instructions: 'Match the Arabic letter with its name',
        content: {
          question: 'ت',
          options: ['Ba', 'Ta', 'Tha'],
          correctAnswer: 'Ta'
        }
      },
      {
        id: 'ex-4',
        type: 'selection',
        instructions: 'Select the Tha letter',
        content: {
          question: 'Which one is Tha?',
          options: ['ت', 'ث', 'ج'],
          correctAnswer: 'ث'
        }
      },
      {
        id: 'ex-5',
        type: 'match',
        instructions: 'Match the letter with its name',
        content: {
          question: 'ث',
          options: ['Ta', 'Tha', 'Jim'],
          correctAnswer: 'Tha'
        }
      },
      {
        id: 'ex-6',
        type: 'selection',
        instructions: 'Select the Ta letter',
        content: {
          question: 'Which one is Ta?',
          options: ['ت', 'ث', 'ج'],
          correctAnswer: 'ت'
        }
      }
    ],
    isUnlocked: false,
    iqroLevel: 1
  },
  
  // IQRO LEVEL 2
  {
    id: 'lesson-3',
    title: 'Connected Letters: Alif-Ba',
    description: 'Learn how to connect Arabic letters with Fathah',
    level: 2,
    xpReward: 15,
    duration: '7 min',
    letters: [
      {
        id: 'alif-ba',
        arabic: 'اَبَ',
        transliteration: 'Aba',
      },
      {
        id: 'ba-ta',
        arabic: 'بَتَ',
        transliteration: 'Bata',
      }
    ],
    exercises: [
      {
        id: 'ex-7',
        type: 'match',
        instructions: 'Match the connected letters with their pronunciation',
        content: {
          question: 'اَبَ',
          options: ['Aba', 'Ata', 'Atha'],
          correctAnswer: 'Aba'
        }
      },
      {
        id: 'ex-8',
        type: 'selection',
        instructions: 'Select the correct connected letters',
        content: {
          question: 'Which one is Bata?',
          options: ['اَبَ', 'بَتَ', 'تَثَ'],
          correctAnswer: 'بَتَ'
        }
      }
    ],
    isUnlocked: false,
    iqroLevel: 2
  },
  
  // IQRO LEVEL 3
  {
    id: 'lesson-4',
    title: 'Kasrah Introduction',
    description: 'Learn the Kasrah vowel sound',
    level: 1,
    xpReward: 15,
    duration: '8 min',
    letters: [
      {
        id: 'alif-kasrah',
        arabic: 'اِ',
        transliteration: 'i',
      },
      {
        id: 'ba-kasrah',
        arabic: 'بِ',
        transliteration: 'bi',
      }
    ],
    exercises: [
      {
        id: 'ex-9',
        type: 'match',
        instructions: 'Match the letter with Kasrah to its pronunciation',
        content: {
          question: 'اِ',
          options: ['a', 'i', 'u'],
          correctAnswer: 'i'
        }
      },
      {
        id: 'ex-10',
        type: 'selection',
        instructions: 'Select the letter with Kasrah',
        content: {
          question: 'Which one is pronounced as "bi"?',
          options: ['بَ', 'بِ', 'بُ'],
          correctAnswer: 'بِ'
        }
      }
    ],
    isUnlocked: false,
    iqroLevel: 3
  },
  
  // IQRO LEVEL 4
  {
    id: 'lesson-5',
    title: 'Tanwin Introduction',
    description: 'Learn the Tanwin sounds in Arabic',
    level: 2,
    xpReward: 20,
    duration: '10 min',
    letters: [
      {
        id: 'ba-fathah-tanwin',
        arabic: 'بً',
        transliteration: 'ban',
      },
      {
        id: 'ba-kasrah-tanwin',
        arabic: 'بٍ',
        transliteration: 'bin',
      }
    ],
    exercises: [
      {
        id: 'ex-11',
        type: 'match',
        instructions: 'Match the Tanwin letter with its pronunciation',
        content: {
          question: 'بً',
          options: ['ban', 'bin', 'bun'],
          correctAnswer: 'ban'
        }
      },
      {
        id: 'ex-12',
        type: 'selection',
        instructions: 'Select the letter with Kasrah Tanwin',
        content: {
          question: 'Which one is pronounced as "bin"?',
          options: ['بً', 'بٍ', 'بٌ'],
          correctAnswer: 'بٍ'
        }
      }
    ],
    isUnlocked: false,
    iqroLevel: 4
  },
  
  // IQRO LEVEL 5
  {
    id: 'lesson-6',
    title: 'Alif Lam Introduction',
    description: 'Learn the Alif Lam rules in Arabic',
    level: 3,
    xpReward: 25,
    duration: '12 min',
    letters: [
      {
        id: 'alif-lam-qamariyah',
        arabic: 'اَلْقَمَرُ',
        transliteration: 'al-qamaru',
      },
      {
        id: 'alif-lam-shamsiyah',
        arabic: 'اَلشَّمْسُ',
        transliteration: 'ash-shamsu',
      }
    ],
    exercises: [
      {
        id: 'ex-13',
        type: 'match',
        instructions: 'Match the word with its transliteration',
        content: {
          question: 'اَلْقَمَرُ',
          options: ['al-qamaru', 'ash-shamsu', 'al-kitabu'],
          correctAnswer: 'al-qamaru'
        }
      },
      {
        id: 'ex-14',
        type: 'selection',
        instructions: 'Select the word with Alif Lam Shamsiyah',
        content: {
          question: 'Which one has Alif Lam Shamsiyah?',
          options: ['اَلْقَمَرُ', 'اَلشَّمْسُ', 'اَلْكِتَابُ'],
          correctAnswer: 'اَلشَّمْسُ'
        }
      }
    ],
    isUnlocked: false,
    iqroLevel: 5
  },
  
  // IQRO LEVEL 6
  {
    id: 'lesson-7',
    title: 'Advanced Tajweed Rules',
    description: 'Learn more complex Tajweed rules for Quranic reading',
    level: 3,
    xpReward: 30,
    duration: '15 min',
    letters: [
      {
        id: 'idgham-bigunnah',
        arabic: 'مَنْ يَعْمَلْ',
        transliteration: 'may ya\'mal',
      },
      {
        id: 'idgham-bilaghunnah',
        arabic: 'مِنْ رَّبِّهِمْ',
        transliteration: 'mir rabbihim',
      }
    ],
    exercises: [
      {
        id: 'ex-15',
        type: 'match',
        instructions: 'Match the phrase with its correct reading rule',
        content: {
          question: 'مَنْ يَعْمَلْ',
          options: ['Idgham Bigunnah', 'Idgham Bilaghunnah', 'Izhar'],
          correctAnswer: 'Idgham Bigunnah'
        }
      },
      {
        id: 'ex-16',
        type: 'selection',
        instructions: 'Select the phrase with Idgham Bilaghunnah',
        content: {
          question: 'Which one has Idgham Bilaghunnah?',
          options: ['مَنْ يَعْمَلْ', 'مِنْ رَّبِّهِمْ', 'مِنْ خَيْرٍ'],
          correctAnswer: 'مِنْ رَّبِّهِمْ'
        }
      }
    ],
    isUnlocked: false,
    iqroLevel: 6
  }
];
