
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPracticeExerciseById } from '../data/practiceData';
import Header from '../components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, CheckCircle, BookOpen, Loader2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

const PracticeLesson: React.FC = () => {
  const { practiceId } = useParams<{ practiceId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userStats, updateUserStats } = useUser();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  
  const practice = practiceId ? getPracticeExerciseById(practiceId) : undefined;
  
  useEffect(() => {
    if (!practice) {
      toast({
        variant: "destructive",
        title: "Practice not found",
        description: "The practice exercise you're looking for doesn't exist.",
      });
      navigate('/practice');
    }
  }, [practice, toast, navigate]);
  
  if (!practice) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  const { content } = practice;
  const currentQuestion = content.exercises[currentQuestionIndex];
  const totalQuestions = content.exercises.length;
  
  const handleOptionClick = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionId);
  };
  
  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    
    const correctOption = currentQuestion.options?.find(opt => opt.isCorrect);
    const isCorrect = correctOption?.id === selectedOption;
    
    setIsAnswerCorrect(isCorrect);
    setIsAnswerSubmitted(true);
    
    if (isCorrect) {
      setEarnedXp(prev => prev + 5);
    }
    
    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? "Great job! You got it right." 
        : `The correct answer was: ${correctOption?.text || 'Not found'}`,
      variant: isCorrect ? "default" : "destructive",
    });
  };
  
  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      
      // Update user stats
      const updatedStats = {
        xp: userStats.xp + earnedXp,
        dailyProgress: Math.min(userStats.dailyGoal, userStats.dailyProgress + earnedXp)
      };
      
      // Mark practice as completed
      const updatedPractice = { ...practice, completed: true };
      // Note: In a real app, you would save this to a database
      
      updateUserStats(updatedStats);
      
      toast({
        title: "Practice Completed!",
        description: `You've earned ${earnedXp} XP.`,
      });
    }
  };
  
  const handleBackToPractice = () => {
    navigate('/practice');
  };
  
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col dark:bg-gray-800">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex justify-center items-center">
          <Card className="w-full max-w-lg shadow-lg">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl">Practice Completed!</CardTitle>
              <CardDescription>You've completed the {practice.title} practice.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <p className="font-medium">You've earned</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">{earnedXp} XP</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBackToPractice} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Practice
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col dark:bg-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={handleBackToPractice}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Practice
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>{practice.title}</CardTitle>
              </div>
              <CardDescription>{practice.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {currentQuestionIndex === 0 && (
                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">{content.introduction}</p>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      disabled={isAnswerSubmitted}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        selectedOption === option.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      } ${
                        isAnswerSubmitted && option.isCorrect
                          ? "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500"
                          : ""
                      } ${
                        isAnswerSubmitted && selectedOption === option.id && !option.isCorrect
                          ? "bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="mr-3 flex-shrink-0">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                            selectedOption === option.id
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300"
                          } ${
                            isAnswerSubmitted && option.isCorrect
                              ? "border-green-500 bg-green-500 text-white"
                              : ""
                          }`}>
                            {isAnswerSubmitted && option.isCorrect && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        <div>
                          {option.arabic ? (
                            <span className="font-arabic text-xl">{option.arabic}</span>
                          ) : (
                            option.text
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {isAnswerSubmitted && currentQuestion.explanation && (
                <div className={`p-4 rounded-lg mb-6 ${
                  isAnswerCorrect 
                    ? "bg-green-50 dark:bg-green-900/20" 
                    : "bg-red-50 dark:bg-red-900/20"
                }`}>
                  <p className="text-sm">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {!isAnswerSubmitted ? (
                <Button 
                  onClick={handleCheckAnswer} 
                  disabled={!selectedOption}
                  className="w-full"
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  className="w-full"
                >
                  {currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Complete Practice"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PracticeLesson;
