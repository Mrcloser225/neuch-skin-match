
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onFinish, 500); // Allow exit animation to complete
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onFinish]);
  
  if (!showSplash) {
    return null;
  }
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-neuch-100"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Logo size="xl" />
        <motion.p 
          className="mt-4 text-lg text-neuch-800 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Find your perfect match
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
