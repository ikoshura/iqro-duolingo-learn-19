
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number; // in milliseconds
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active) {
      setIsActive(true);
      
      // Auto-disable after duration
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!isActive) return null;

  // Generate random confetti pieces
  const confettiPieces = Array.from({ length: 50 }, (_, i) => {
    const size = Math.random() * 10 + 5;
    const color = [
      '#8B5CF6', // purple
      '#0EA5E9', // blue
      '#10B981', // green
      '#F97316', // orange
      '#F43F5E', // pink
    ][Math.floor(Math.random() * 5)];
    
    const left = `${Math.random() * 100}%`;
    const animationDelay = `${Math.random() * 3}s`;
    
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      left,
      animationDelay,
    };

    return <div key={i} className="confetti-piece" style={style} />;
  });

  return (
    <div className="confetti-container">
      {confettiPieces}
      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          top: -20px;
          border-radius: 50%;
          animation: fall 3s linear forwards;
        }
        @keyframes fall {
          0% {
            opacity: 1;
            top: -20px;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            top: 100vh;
            transform: translateX(100px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
