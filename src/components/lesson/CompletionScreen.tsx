
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, AlertTriangle, CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RewardBadge from '../game/RewardBadge';
import { gsap } from 'gsap';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  // Determine reward badge type based on accuracy
  const getBadgeType = () => {
    if (performance.accuracy >= 100) return 'perfect';
    if (performance.accuracy >= 80) return 'gold';
    if (performance.accuracy >= 60) return 'silver';
    return 'bronze';
  };
  
  // Apply GSAP animations when the component mounts
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Entry animation for the main container
    if (containerRef.current) {
      tl.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8
      });
    }
    
    // Badge animation
    if (badgeRef.current) {
      tl.from(badgeRef.current, {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.4");
    }
    
    // Title and XP animation
    if (titleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5
      }, "-=0.3");
      
      // Animate the XP number counting up
      const xpElement = titleRef.current.nextElementSibling?.querySelector('span');
      if (xpElement) {
        const endValue = xpReward;
        tl.from(xpElement, {
          textContent: 0,
          duration: 1.5,
          ease: "power1.out",
          onUpdate: function() {
            xpElement.textContent = Math.round(gsap.getProperty(this.targets()[0], "textContent")) + " XP";
          }
        }, "-=0.2");
      }
    }
    
    // Progress bar animation
    if (progressBarRef.current) {
      const progressValue = progressBarRef.current.querySelector('.progress-value');
      if (progressValue) {
        tl.from(progressValue, {
          width: "0%",
          duration: 1.5,
          ease: "power2.inOut"
        }, "-=1");
      }
    }
    
    // Stats animation - staggered
    if (statsRef.current) {
      tl.from(statsRef.current.querySelectorAll('.stat-item'), {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5
      }, "-=1");
    }
    
    // Feedback message animation
    const feedbackMessage = document.querySelector('.feedback-message');
    if (feedbackMessage) {
      tl.from(feedbackMessage, {
        opacity: 0,
        y: 15,
        duration: 0.5
      }, "-=0.3");
    }
    
    // Buttons animation
    if (buttonsRef.current) {
      tl.from(buttonsRef.current.querySelectorAll('button'), {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.5
      }, "-=0.2");
    }
    
    return () => {
      tl.kill();
    };
  }, [xpReward]);
  
  return (
    <div 
      ref={containerRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border-2 border-primary/20"
    >
      <div ref={badgeRef} className="flex justify-center mb-6">
        <RewardBadge type={getBadgeType()} size="lg" />
      </div>
      
      <h2 ref={titleRef} className="text-2xl font-bold mb-2 dark:text-gray-100">Lesson Completed!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Congratulations! You've earned <span className="text-primary font-bold">{xpReward} XP</span>
      </p>

      {/* Performance Review Section */}
      <div ref={statsRef} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 text-left border border-gray-100 dark:border-gray-600">
        <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">Your Performance</h3>
        
        <div className="mb-4" ref={progressBarRef}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
            <span className="text-sm font-medium">{performance.accuracy}%</span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-value stat-item ${
                performance.accuracy >= 100 ? 'from-green-400 to-green-600' : 
                performance.accuracy >= 70 ? 'from-amber-400 to-amber-600' : 'from-red-400 to-red-600'
              }`}
              style={{ width: `${performance.accuracy}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="stat-item bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center shadow-sm">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Correct</p>
              <p className="font-semibold">{performance.correctAnswers} of {performance.totalQuestions}</p>
            </div>
          </div>
          <div className="stat-item bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center shadow-sm">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Incorrect</p>
              <p className="font-semibold">{performance.incorrectAnswers} of {performance.totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="stat-item mb-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            Performance Level: <span className={`${
              performance.performanceLevel === "Excellent" ? 'text-green-500 dark:text-green-400' : 
              performance.performanceLevel === "Good" ? 'text-amber-500 dark:text-amber-400' : 
              'text-red-500 dark:text-red-400'
            } font-bold`}>{performance.performanceLevel}</span>
          </p>
        </div>
        
        <div className="feedback-message bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {performance.feedbackMessage}
          </p>
        </div>
      </div>
      
      <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center gap-4">
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
          className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Continue
        </Button>
      </div>
      
      {/* Add a message if the accuracy is not 100% */}
      {performance.accuracy < 100 && (
        <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-amber-600 dark:text-amber-400 text-sm">
            You need to achieve 100% accuracy to unlock the next lesson. Try again!
          </p>
        </div>
      )}
    </div>
  );
};

export default CompletionScreen;
