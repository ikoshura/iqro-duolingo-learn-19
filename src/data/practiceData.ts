
export interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
  completed: boolean;
  content: {
    introduction: string;
    exercises: {
      id: string;
      type: 'multiple-choice' | 'match' | 'fill-blank';
      question: string;
      options?: {
        id: string;
        text: string;
        arabic?: string;
        isCorrect: boolean;
      }[];
      correctAnswer?: string;
      explanation?: string;
    }[];
  };
}

export const practiceExercises: PracticeExercise[] = [
  {
    id: 'practice-1',
    title: 'Letter Recognition',
    description: 'Practice identifying Arabic letters quickly',
    duration: '5 min',
    difficulty: 'Beginner',
    category: 'letters',
    completed: false,
    content: {
      introduction: 'Welcome to Letter Recognition practice! In this exercise, you will practice identifying Arabic letters by their shapes. Select the correct option for each question.',
      exercises: [
        {
          id: 'lr-1',
          type: 'multiple-choice',
          question: 'Which option shows the letter "Alif"?',
          options: [
            { id: 'opt-1', text: 'ا', arabic: 'ا', isCorrect: true },
            { id: 'opt-2', text: 'ب', arabic: 'ب', isCorrect: false },
            { id: 'opt-3', text: 'ت', arabic: 'ت', isCorrect: false },
            { id: 'opt-4', text: 'ث', arabic: 'ث', isCorrect: false },
          ],
          explanation: 'Alif (ا) is the first letter of the Arabic alphabet.'
        },
        {
          id: 'lr-2',
          type: 'multiple-choice',
          question: 'What is this letter called? ج',
          options: [
            { id: 'opt-1', text: 'Ba', isCorrect: false },
            { id: 'opt-2', text: 'Jim', isCorrect: true },
            { id: 'opt-3', text: 'Dal', isCorrect: false },
            { id: 'opt-4', text: 'Ha', isCorrect: false },
          ],
          explanation: 'Jim (ج) is the fifth letter of the Arabic alphabet.'
        },
        {
          id: 'lr-3',
          type: 'multiple-choice',
          question: 'Which letter makes the "S" sound?',
          options: [
            { id: 'opt-1', text: 'ز', arabic: 'ز', isCorrect: false },
            { id: 'opt-2', text: 'س', arabic: 'س', isCorrect: true },
            { id: 'opt-3', text: 'ص', arabic: 'ص', isCorrect: false },
            { id: 'opt-4', text: 'ط', arabic: 'ط', isCorrect: false },
          ],
          explanation: 'Sin (س) makes the "S" sound in Arabic.'
        }
      ]
    }
  },
  {
    id: 'practice-2',
    title: 'Vowel Marks',
    description: 'Practice with Fatha, Kasra, and Damma vowel marks',
    duration: '7 min',
    difficulty: 'Beginner',
    category: 'vowels',
    completed: false,
    content: {
      introduction: 'In Arabic, vowel marks (harakat) change how letters are pronounced. This practice will help you learn to identify and use the three main vowel marks: Fatha (َ), Kasra (ِ), and Damma (ُ).',
      exercises: [
        {
          id: 'vm-1',
          type: 'multiple-choice',
          question: 'Which vowel mark makes the "a" sound as in "cat"?',
          options: [
            { id: 'opt-1', text: 'Fatha (َ)', isCorrect: true },
            { id: 'opt-2', text: 'Kasra (ِ)', isCorrect: false },
            { id: 'opt-3', text: 'Damma (ُ)', isCorrect: false },
            { id: 'opt-4', text: 'Sukun (ْ)', isCorrect: false },
          ],
          explanation: 'Fatha (َ) is the vowel mark that adds the "a" sound to a consonant.'
        },
        {
          id: 'vm-2',
          type: 'multiple-choice',
          question: 'How would you pronounce بَ?',
          options: [
            { id: 'opt-1', text: 'bi', isCorrect: false },
            { id: 'opt-2', text: 'bu', isCorrect: false },
            { id: 'opt-3', text: 'ba', isCorrect: true },
            { id: 'opt-4', text: 'b', isCorrect: false },
          ],
          explanation: 'The letter Ba (ب) with a Fatha (َ) on top is pronounced "ba".'
        },
        {
          id: 'vm-3',
          type: 'multiple-choice',
          question: 'Which pronunciation is correct for سِ?',
          options: [
            { id: 'opt-1', text: 'sa', isCorrect: false },
            { id: 'opt-2', text: 'si', isCorrect: true },
            { id: 'opt-3', text: 'su', isCorrect: false },
            { id: 'opt-4', text: 's', isCorrect: false },
          ],
          explanation: 'The letter Sin (س) with a Kasra (ِ) underneath is pronounced "si".'
        }
      ]
    }
  },
  {
    id: 'practice-3',
    title: 'Letter Combinations',
    description: 'Practice reading letters with different vowel marks',
    duration: '8 min',
    difficulty: 'Intermediate',
    category: 'combinations',
    completed: false,
    content: {
      introduction: 'Now let\'s practice combining letters with vowel marks to form sounds and syllables. This is an important step toward reading words in Arabic.',
      exercises: [
        {
          id: 'lc-1',
          type: 'multiple-choice',
          question: 'How do you pronounce the combination مَسَ?',
          options: [
            { id: 'opt-1', text: 'masa', isCorrect: true },
            { id: 'opt-2', text: 'masi', isCorrect: false },
            { id: 'opt-3', text: 'masu', isCorrect: false },
            { id: 'opt-4', text: 'misa', isCorrect: false },
          ],
          explanation: 'The combination مَسَ is pronounced "masa" because both letters have the Fatha mark.'
        },
        {
          id: 'lc-2',
          type: 'multiple-choice',
          question: 'What is the correct reading of نُورٌ?',
          options: [
            { id: 'opt-1', text: 'nawr', isCorrect: false },
            { id: 'opt-2', text: 'noor', isCorrect: false },
            { id: 'opt-3', text: 'nuurun', isCorrect: true },
            { id: 'opt-4', text: 'nawran', isCorrect: false },
          ],
          explanation: 'نُورٌ is pronounced "nuurun" - the Damma on Nun gives "nu", the Waw with Damma gives "uu", and the tanwin dammatan gives "un".'
        },
        {
          id: 'lc-3',
          type: 'multiple-choice',
          question: 'Read the following: كِتَاب',
          options: [
            { id: 'opt-1', text: 'katab', isCorrect: false },
            { id: 'opt-2', text: 'kutub', isCorrect: false },
            { id: 'opt-3', text: 'kitab', isCorrect: true },
            { id: 'opt-4', text: 'katib', isCorrect: false },
          ],
          explanation: 'كِتَاب is pronounced "kitab" - Kaf with Kasra gives "ki", Ta with Fatha gives "ta", and Alif gives a long "aa" sound.'
        }
      ]
    }
  },
  {
    id: 'practice-4',
    title: 'Word Formation',
    description: 'Practice reading simple words with multiple letters',
    duration: '10 min',
    difficulty: 'Intermediate',
    category: 'words',
    completed: false,
    content: {
      introduction: 'In this practice, you will learn to read complete words in Arabic. We\'ll start with simple, common words that use the letters and vowel marks you\'ve learned.',
      exercises: [
        {
          id: 'wf-1',
          type: 'multiple-choice',
          question: 'What does the word سَلَام mean?',
          options: [
            { id: 'opt-1', text: 'Hello', isCorrect: false },
            { id: 'opt-2', text: 'Peace', isCorrect: true },
            { id: 'opt-3', text: 'Book', isCorrect: false },
            { id: 'opt-4', text: 'Water', isCorrect: false },
          ],
          explanation: 'سَلَام (salām) means "peace" in Arabic and is often used in greetings.'
        },
        {
          id: 'wf-2',
          type: 'multiple-choice',
          question: 'Read and translate: بَاب',
          options: [
            { id: 'opt-1', text: 'Book', isCorrect: false },
            { id: 'opt-2', text: 'Car', isCorrect: false },
            { id: 'opt-3', text: 'Door', isCorrect: true },
            { id: 'opt-4', text: 'House', isCorrect: false },
          ],
          explanation: 'بَاب (bāb) means "door" in Arabic.'
        },
        {
          id: 'wf-3',
          type: 'multiple-choice',
          question: 'Which of these means "water" in Arabic?',
          options: [
            { id: 'opt-1', text: 'كِتَاب', isCorrect: false },
            { id: 'opt-2', text: 'مَاء', isCorrect: true },
            { id: 'opt-3', text: 'قَلَم', isCorrect: false },
            { id: 'opt-4', text: 'بَيْت', isCorrect: false },
          ],
          explanation: 'مَاء (mā') means "water" in Arabic.'
        }
      ]
    }
  }
];

export const getPracticeExerciseById = (id: string): PracticeExercise | undefined => {
  return practiceExercises.find(exercise => exercise.id === id);
};
