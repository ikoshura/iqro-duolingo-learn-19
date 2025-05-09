
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface CharacterGuideProps {
  message?: string;
  emotion: 'happy' | 'thinking' | 'celebrating' | 'explaining';
  className?: string;
}

const CharacterGuide: React.FC<CharacterGuideProps> = ({ 
  message = "Let's learn Arabic together!", 
  emotion = 'happy',
  className 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);

  // Simple character representations using emojis (can be replaced with images)
  const emotionMap = {
    happy: "😊",
    thinking: "🤔",
    celebrating: "🎉",
    explaining: "👨‍🏫"
  };

  const bgColorMap = {
    happy: "bg-blue-100 dark:bg-blue-900/30",
    thinking: "bg-purple-100 dark:bg-purple-900/30",
    celebrating: "bg-green-100 dark:bg-green-900/30",
    explaining: "bg-amber-100 dark:bg-amber-900/30"
  };

  // Apply animations when the component mounts or emotion changes
  useEffect(() => {
    if (containerRef.current && emojiRef.current && messageRef.current) {
      // Reset any existing animations
      gsap.killTweensOf([containerRef.current, emojiRef.current, messageRef.current]);
      
      // Container entry animation
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
      );
      
      // Emoji animation based on emotion
      switch (emotion) {
        case 'happy':
          gsap.to(emojiRef.current, {
            y: -10,
            yoyo: true,
            repeat: -1,
            duration: 1,
            ease: "power1.inOut"
          });
          break;
        case 'thinking':
          gsap.to(emojiRef.current, {
            rotation: -5,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
            ease: "power1.inOut"
          });
          break;
        case 'celebrating':
          gsap.to(emojiRef.current, {
            rotation: 15,
            scale: 1.2,
            yoyo: true,
            repeat: -1,
            duration: 0.7,
            ease: "power1.inOut"
          });
          break;
        case 'explaining':
          gsap.to(emojiRef.current, {
            y: -5,
            rotation: 5,
            yoyo: true,
            repeat: -1,
            duration: 1.2,
            ease: "power1.inOut"
          });
          break;
      }
      
      // Message text animation
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.2, ease: "power1.out" }
      );
    }
  }, [emotion, message]);

  return (
    <div 
      ref={containerRef}
      className={cn("flex items-center p-4 rounded-lg mb-6", bgColorMap[emotion], className)}
    >
      <div ref={emojiRef} className="text-4xl mr-4">
        {emotionMap[emotion]}
      </div>
      <div className="flex-1">
        <p ref={messageRef} className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default CharacterGuide;
