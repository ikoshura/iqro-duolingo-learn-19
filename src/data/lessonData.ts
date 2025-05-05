
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
}

// Sample data for Volume 1 of Iqro method
export const lessons: Lesson[] = [
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
      }
    ],
    isUnlocked: true
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
      }
    ],
    isUnlocked: false
  },
  {
    id: 'lesson-3',
    title: 'Jim and Ha',
    description: 'Learn the next two letters of the Arabic alphabet',
    level: 1,
    xpReward: 15,
    duration: '7 min',
    letters: [
      {
        id: 'jim',
        arabic: 'ج',
        transliteration: 'Jim',
      },
      {
        id: 'ha',
        arabic: 'ح',
        transliteration: 'Ha',
      }
    ],
    exercises: [
      {
        id: 'ex-5',
        type: 'match',
        instructions: 'Match the Arabic letter with its name',
        content: {
          question: 'ج',
          options: ['Jim', 'Ha', 'Kha'],
          correctAnswer: 'Jim'
        }
      },
      {
        id: 'ex-6',
        type: 'selection',
        instructions: 'Select the Ha letter',
        content: {
          question: 'Which one is Ha?',
          options: ['ج', 'ح', 'خ'],
          correctAnswer: 'ح'
        }
      }
    ],
    isUnlocked: false
  },
  {
    id: 'lesson-4',
    title: 'Review: Alif to Ha',
    description: 'Review all the letters you have learned so far',
    level: 1,
    xpReward: 20,
    duration: '10 min',
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
      },
      {
        id: 'ta',
        arabic: 'ت',
        transliteration: 'Ta',
      },
      {
        id: 'tha',
        arabic: 'ث',
        transliteration: 'Tha',
      },
      {
        id: 'jim',
        arabic: 'ج',
        transliteration: 'Jim',
      },
      {
        id: 'ha',
        arabic: 'ح',
        transliteration: 'Ha',
      }
    ],
    exercises: [
      {
        id: 'ex-7',
        type: 'selection',
        instructions: 'Select the correct letter',
        content: {
          question: 'Which letter is Ba?',
          options: ['ا', 'ب', 'ت'],
          correctAnswer: 'ب'
        }
      },
      {
        id: 'ex-8',
        type: 'match',
        instructions: 'Match letters to their names',
        content: {
          question: 'Match ج',
          options: ['Alif', 'Ba', 'Jim'],
          correctAnswer: 'Jim'
        }
      }
    ],
    isUnlocked: false
  }
];
