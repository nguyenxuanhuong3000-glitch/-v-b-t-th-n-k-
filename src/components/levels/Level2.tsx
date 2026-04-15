import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransportItem, TransportType } from '../../types';
import { TRANSPORT_DATA, CATEGORIES } from '../../constants';
import TransportCard from '../TransportCard';
import Mascot from '../Mascot';
import { startListening } from '../../services/recognitionService';

interface Level2Props {
  onComplete: (stars: number) => void;
}

export default function Level2({ onComplete }: Level2Props) {
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<TransportItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const totalRounds = 5;

  useEffect(() => {
    generateRound();
  }, [round]);

  const generateRound = () => {
    const selected = TRANSPORT_DATA[Math.floor(Math.random() * TRANSPORT_DATA.length)];
    setTarget(selected);
    setFeedback(null);
  };

  const handleCategorySelect = (type: TransportType) => {
    if (feedback) return;

    if (type === target?.type) {
      const categoryName = CATEGORIES[type].name;
      setFeedback(`Đúng rồi! ${target.name} thuộc ${categoryName} đấy! 🌟`);
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(r => r + 1);
        } else {
          onComplete(3);
        }
      }, 2500);
    } else {
      setFeedback('Ôi, nhầm rồi! Bé thử lại xem bạn này đi ở đâu nhé! 🚂');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleVoiceAnswer = () => {
    if (isListening || feedback) return;
    
    setIsListening(true);
    startListening(
      (text) => {
        const normalizedText = text.toLowerCase();
        let matchedType: TransportType | null = null;
        
        // Check all categories
        (Object.keys(CATEGORIES) as TransportType[]).forEach(type => {
          const catName = CATEGORIES[type].name.toLowerCase();
          if (normalizedText.includes(catName)) {
            matchedType = type;
          }
        });

        if (matchedType) {
          handleCategorySelect(matchedType);
        } else {
          setFeedback(`Bé vừa nói "${text}" à? Thử nói "Đường bộ", "Đường thủy"... nhé! 🎤`);
          setTimeout(() => setFeedback(null), 2500);
        }
      },
      () => setIsListening(false)
    );
  };

  if (!target) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <div className="text-2xl font-bold text-ocean-blue">Vòng {round}/{totalRounds}</div>

      <Mascot message={feedback || `Bạn ${target.name} này đi ở đâu nhỉ?`} mood={feedback?.includes('Đúng') ? 'excited' : feedback ? 'sad' : 'happy'} />

      <div className="flex items-center gap-12">
        <motion.div
          key={target.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="z-20"
        >
          <TransportCard item={target} size="lg" disabled />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleVoiceAnswer}
          className={`
            w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg transition-colors
            ${isListening ? 'bg-red-500 animate-pulse' : 'bg-playful-purple'} text-white
          `}
        >
          {isListening ? '🛑' : '🎤'}
        </motion.button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {(['road', 'air', 'water', 'rail'] as TransportType[]).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategorySelect(type)}
            className={`
              p-4 rounded-3xl flex flex-col items-center gap-2 text-white font-black text-lg shadow-lg
              ${CATEGORIES[type].color}
            `}
          >
            <span className="text-4xl">{CATEGORIES[type].icon}</span>
            <span className="text-center">{CATEGORIES[type].name}</span>
          </motion.button>
        ))}
      </div>
      
      <p className="text-slate-500 font-medium">Bé có thể nhấn micro 🎤 và nói "Đường bộ", "Đường thủy"... để trả lời nhé!</p>
    </div>
  );
}
