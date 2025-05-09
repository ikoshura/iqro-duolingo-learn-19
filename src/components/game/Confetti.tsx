
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface ConfettiProps {
  active: boolean;
  duration?: number; // in milliseconds
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiCount = 50;
  
  // Generate confetti data once
  const confettiData = Array.from({ length: confettiCount }, () => ({
    size: Math.random() * 10 + 5,
    color: [
      '#8B5CF6', // purple
      '#0EA5E9', // blue
      '#10B981', // green
      '#F97316', // orange
      '#F43F5E', // pink
    ][Math.floor(Math.random() * 5)],
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.5,
  }));

  useEffect(() => {
    if (active) {
      setIsActive(true);
      
      // Create confetti animation when active changes to true
      if (containerRef.current) {
        const pieces = containerRef.current.querySelectorAll('.confetti-piece');
        
        // Clear any existing animations
        gsap.killTweensOf(pieces);
        
        // Reset positions
        gsap.set(pieces, { 
          y: -20,
          opacity: 1,
          scale: 1,
        });
        
        // Animate each piece
        pieces.forEach((piece, i) => {
          const xMovement = -50 + Math.random() * 100; // Random horizontal movement
          
          gsap.to(piece, {
            y: window.innerHeight + 100,
            x: `+=${xMovement}`,
            rotation: `+=${Math.random() * 720 - 360}`,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
            duration: 2 + Math.random() * 2,
            ease: "power1.out",
            delay: Math.random() * 0.5,
          });
        });
      }
      
      // Auto-disable after duration
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!isActive) return null;

  return (
    <div className="confetti-container" ref={containerRef}>
      {confettiData.map((data, i) => (
        <div
          key={i}
          className="confetti-piece absolute"
          style={{
            width: `${data.size}px`,
            height: `${data.size}px`,
            backgroundColor: data.color,
            left: `${data.x}%`,
            top: -20,
            borderRadius: '50%',
          }}
        />
      ))}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Confetti;
