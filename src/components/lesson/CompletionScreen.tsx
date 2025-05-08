
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, AlertTriangle, CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PerformanceReview {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  performanceLevel: string;
  feedbackMessage: string;
}

interface CompletionScreenProps {
  lessonId: string;
  xpReward: number;
  performance: PerformanceReview;
  onRetry: () => void;
  onContinue: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  lessonId,
  xpReward,
  performance,
  onRetry,
  onContinue
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">Lesson Completed!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Congratulations! You've earned {xpReward} XP
      </p>

      {/* Performance Review Section */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 text-left">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">Your Performance Review</h3>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
            <span className="text-sm font-medium">{performance.accuracy}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-600 rounded-full">
            <div
              className={`h-full rounded-full ${
                performance.accuracy >= 100 ? 'bg-green-500' : 
                performance.accuracy >= 70 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${performance.accuracy}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Correct</p>
              <p className="font-semibold">{performance.correctAnswers} of {performance.totalQuestions}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Incorrect</p>
              <p className="font-semibold">{performance.incorrectAnswers} of {performance.totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            Performance Level: <span className={`${
              performance.performanceLevel === "Excellent" ? 'text-green-500 dark:text-green-400' : 
              performance.performanceLevel === "Good" ? 'text-amber-500 dark:text-amber-400' : 
              'text-red-500 dark:text-red-400'
            }`}>{performance.performanceLevel}</span>
          </p>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {performance.feedbackMessage}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Retry Button - always available */}
        <Button
          onClick={onRetry}
          variant="outline"
          className="flex items-center justify-center"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Retry Lesson
        </Button>
        
        <Button
          onClick={() => navigate('/lessons')}
          variant="outline"
        >
          Back to Lessons
        </Button>
        
        <Button
          onClick={onContinue}
          disabled={performance.accuracy < 100}
          className="flex items-center justify-center"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Continue
        </Button>
      </div>
      
      {/* Add a message if the accuracy is not 100% */}
      {performance.accuracy < 100 && (
        <p className="text-amber-500 mt-4 text-sm">
          You need to achieve 100% accuracy to unlock the next lesson.
        </p>
      )}
    </div>
  );
};

export default CompletionScreen;
