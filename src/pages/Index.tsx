
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <p>Redirecting to home...</p>
    </div>
  );
};

export default Index;
