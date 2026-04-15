import { useEffect } from 'react';
import { motion } from 'motion/react';
import { speak } from '../services/speechService';

interface MascotProps {
  message?: string;
  mood?: 'happy' | 'thinking' | 'excited' | 'sad';
  autoSpeak?: boolean;
}

export default function Mascot({ message, mood = 'happy', autoSpeak = true }: MascotProps) {
  useEffect(() => {
    if (message && autoSpeak) {
      speak(message);
    }
  }, [message, autoSpeak]);

  const getEmoji = () => {
    switch (mood) {
      case 'thinking': return '🤔';
      case 'excited': return '🤩';
      case 'sad': return '🥺';
      default: return '🐻';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: mood === 'excited' ? [0, -5, 5, 0] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-8xl filter drop-shadow-lg cursor-pointer"
      >
        {getEmoji()}
      </motion.div>
      
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white px-6 py-3 rounded-2xl shadow-lg relative border-2 border-sun-yellow flex items-center gap-3"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-sun-yellow rotate-45"></div>
          <p className="text-xl font-bold text-slate-700 text-center">{message}</p>
          <button 
            onClick={() => speak(message)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            title="Nghe lại"
          >
            🔊
          </button>
        </motion.div>
      )}
    </div>
  );
}
