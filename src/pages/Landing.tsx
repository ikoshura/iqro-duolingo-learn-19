
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const Landing: React.FC = () => {
  const characterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the character with a bouncing effect
    if (characterRef.current) {
      tl.from(characterRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.4)',
      });
      
      // Add continuous floating animation
      gsap.to(characterRef.current, {
        y: '-=10',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    }
    
    // Animate hero text elements
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.hero-animate');
      tl.from(heroElements, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.5");
    }
    
    // Animate feature cards when they come into view
    if (featureCardsRef.current) {
      const cards = featureCardsRef.current.querySelectorAll('.feature-card');
      
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        scrollTrigger: {
          trigger: featureCardsRef.current,
          start: "top 80%",
        },
        ease: 'back.out(1.4)'
      });
    }
    
    // Create bubbles randomly in the background
    const createBubbles = () => {
      const bubblesContainer = document.querySelector('.bubbles-container');
      if (bubblesContainer) {
        for (let i = 0; i < 15; i++) {
          const bubble = document.createElement('div');
          const size = Math.random() * 60 + 20;
          
          bubble.classList.add('bubble');
          bubble.style.width = `${size}px`;
          bubble.style.height = `${size}px`;
          bubble.style.left = `${Math.random() * 100}vw`;
          bubble.style.top = `${Math.random() * 100}vh`;
          bubble.style.animationDelay = `${Math.random() * 5}s`;
          bubble.style.animationDuration = `${Math.random() * 6 + 4}s`;
          bubble.style.backgroundColor = `hsla(${Math.random() * 360}, 70%, 70%, 0.2)`;
          
          bubblesContainer.appendChild(bubble);
        }
      }
    };
    
    createBubbles();
    
    return () => {
      // Cleanup any animations if needed
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-[#f2f2f2] dark:from-gray-900 dark:to-gray-800">
      <div className="bubbles-container absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Playful Header */}
      <header className="py-4 px-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary flex items-center">
              <span className="bg-primary text-white p-2 rounded-lg mr-2">Iq</span>
              <span>ro.id</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link to="/signin" className="px-4 py-2 rounded-lg text-primary border border-primary font-medium hover:bg-primary/10 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-16 md:py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div ref={heroRef} className="w-full md:w-1/2 text-center md:text-left z-10 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 hero-animate">
              Learn Arabic <span className="text-primary">the fun way</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0 hero-animate">
              Master Arabic reading and writing with interactive lessons, engaging games, and track your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start hero-animate">
              <Link to="/signup" className="playful-button inline-block text-center">
                Get Started Free
              </Link>
              <Link to="/signin" className="inline-block text-center rounded-xl py-3 px-5 font-bold uppercase tracking-wide bg-white dark:bg-gray-800 border-2 border-[#E5E5E5] dark:border-gray-700 hover:border-[#AFAFAF] dark:hover:border-gray-600 transition-all duration-200 playful-shadow hover:scale-105 active:scale-95 active:shadow-none">
                Already Have An Account?
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center items-center relative">
            <div className="absolute w-72 h-72 bg-primary/30 dark:bg-primary/20 rounded-full filter blur-3xl"></div>
            <div ref={characterRef} className="relative z-10">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-white dark:bg-gray-800 rounded-3xl p-4 border-4 border-[#84D8FF] shadow-xl">
                <div className="w-full h-full flex items-center justify-center bg-[#F7F7F7] dark:bg-gray-700 rounded-2xl overflow-hidden">
                  <div className="text-7xl md:text-9xl font-arabic">أ</div>
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-[#58CC02] text-white py-3 px-8 rounded-full text-lg font-bold shadow-md">
                Alif
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#FFC800] opacity-20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#FF9600] opacity-10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#FF4B4B] opacity-20 rounded-full"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-[#f9f9f9] dark:bg-gray-800">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Learn With Iqro?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our app makes learning Arabic enjoyable and effective
          </p>
        </div>
        
        <div ref={featureCardsRef} className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card bg-white dark:bg-gray-700 rounded-3xl p-6 border-2 border-[#E5E5E5] dark:border-gray-600 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 hover:border-primary">
            <div className="w-16 h-16 bg-[#FFC800]/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FFC800]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn through fun, game-like exercises that make every lesson enjoyable
            </p>
          </div>
          
          <div className="feature-card bg-white dark:bg-gray-700 rounded-3xl p-6 border-2 border-[#E5E5E5] dark:border-gray-600 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 hover:border-primary">
            <div className="w-16 h-16 bg-[#FF4B4B]/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF4B4B]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">
              See your improvement with detailed stats and earn achievements as you learn
            </p>
          </div>
          
          <div className="feature-card bg-white dark:bg-gray-700 rounded-3xl p-6 border-2 border-[#E5E5E5] dark:border-gray-600 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 hover:border-primary">
            <div className="w-16 h-16 bg-[#1CB0F6]/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1CB0F6]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Daily Practice</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Build a habit with quick daily exercises that fit into your schedule
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">How Iqro Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learning Arabic has never been easier
          </p>
        </div>
        
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#58CC02] rounded-full opacity-20 transform scale-110"></div>
                <div className="w-24 h-24 rounded-full bg-[#58CC02] flex items-center justify-center text-white text-4xl font-bold relative z-10 mx-auto">
                  1
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Start with the Basics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Begin with Arabic letters and their sounds through interactive lessons designed for beginners.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
            <div className="w-full md:w-1/3 order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1CB0F6] rounded-full opacity-20 transform scale-110"></div>
                <div className="w-24 h-24 rounded-full bg-[#1CB0F6] flex items-center justify-center text-white text-4xl font-bold relative z-10 mx-auto">
                  2
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left order-2 md:order-1">
              <h3 className="text-xl font-bold mb-2">Practice Daily</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build your skills with just 5-10 minutes of daily practice sessions tailored to your level.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#FF9600] rounded-full opacity-20 transform scale-110"></div>
                <div className="w-24 h-24 rounded-full bg-[#FF9600] flex items-center justify-center text-white text-4xl font-bold relative z-10 mx-auto">
                  3
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Track Your Journey</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Watch your progress grow with achievements and detailed statistics as you master new concepts.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#fbe1ff] dark:bg-purple-900/30">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Learning Arabic?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of students already learning with Iqro
          </p>
          
          <div className="mx-auto max-w-md">
            <Link to="/signup" className="playful-button block w-full text-center mb-4">
              Start Learning For Free
            </Link>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No credit card required. Start your learning journey today!
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold text-primary flex items-center">
                <span className="bg-primary text-white p-1 rounded-md mr-1">Iq</span>
                <span>ro.id</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground">
                About
              </Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground">
                Terms
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Iqro Learning. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
