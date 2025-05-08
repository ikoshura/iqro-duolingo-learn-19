
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LessonHeaderProps {
  title: string;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-6">
      <button
        onClick={() => navigate('/lessons')}
        className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
      >
        <ArrowLeft className="w-5 h-5 dark:text-gray-200" />
      </button>
      <h1 className="text-2xl font-bold dark:text-gray-100">{title}</h1>
    </div>
  );
};

export default LessonHeader;
