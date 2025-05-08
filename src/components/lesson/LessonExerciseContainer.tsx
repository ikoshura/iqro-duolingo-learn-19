
import React from 'react';
import LetterExercise from '../LetterExercise';
import { Exercise } from '../../data/lessonData';

interface LessonExerciseContainerProps {
  currentExercise: Exercise;
  exerciseIndex: number;
  onComplete: (isCorrect: boolean, originalIndex?: number) => void;
  originalIndex?: number;
}

const LessonExerciseContainer: React.FC<LessonExerciseContainerProps> = ({ 
  currentExercise,
  exerciseIndex,
  onComplete,
  originalIndex
}) => {
  return (
    <div className="mb-6">
      {currentExercise && (
        <LetterExercise
          key={`exercise-${exerciseIndex}${originalIndex !== undefined ? `-${originalIndex}` : ''}`}
          exercise={currentExercise}
          onComplete={(isCorrect) => onComplete(isCorrect, originalIndex)}
        />
      )}
    </div>
  );
};

export default LessonExerciseContainer;
