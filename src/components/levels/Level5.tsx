import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransportItem } from '../../types';
import { TRANSPORT_DATA } from '../../constants';
import TransportCard from '../TransportCard';
import Mascot from '../Mascot';
import { startListening } from '../../services/recognitionService';

interface Level5Props {
  onComplete: (stars: number) => void;
}

export default function Level5({ onComplete }: Level5Props) {
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<TransportItem | null>(null);
  const [options, setOptions] = useState<TransportItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const totalRounds = 5;

  useEffect(() => {
    generateRound();
  }, [round]);

  const generateRound = () => {
    const shuffled = [...TRANSPORT_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled[0];
    const others = shuffled.slice(1, 4);
    const roundOptions = [selected, ...others].sort(() => 0.5 - Math.random());
    
    setTarget(selected);
    setOptions(roundOptions);
    setFeedback(null);
  };

  const handleSelect = (item: TransportItem) => {
    if (feedback) return;

    if (item.id === target?.id) {
      setFeedback(`Tuyệt vời! Đây chính là bóng của ${target.name} đấy! 🦉`);
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(r => r + 1);
        } else {
          onComplete(3);
        }
      }, 2500);
    } else {
      setFeedback(`Ôi, đây là bóng của ${target?.name} cơ. Bé nhìn kỹ lại nhé! 🧐`);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const handleVoiceAnswer = () => {
    if (isListening || feedback) return;
    
    setIsListening(true);
    startListening(
      (text) => {
        const normalizedText = text.toLowerCase();
        const targetName = target?.name.toLowerCase() || '';
        
        if (normalizedText.includes(targetName) || targetName.includes(normalizedText)) {
          if (target) handleSelect(target);
        } else {
          setFeedback(`Bé vừa nói "${text}" à? Thử nhìn bóng và đoán tên xe nhé! 🎤`);
          setTimeout(() => setFeedback(null), 2500);
        }
      },
      () => setIsListening(false)
    );
  };

  if (!target) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      <div className="text-2xl font-bold text-ocean-blue">Vòng {round}/{totalRounds}</div>

      <Mascot message={feedback || `Bóng này là của xe nào nhỉ?`} mood={feedback?.includes('Tuyệt') ? 'excited' : feedback ? 'sad' : 'happy'} />

      <div className="flex items-center gap-12">
        <div className="bg-slate-800 p-12 rounded-3xl shadow-2xl">
          <motion.span
            key={target.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-9xl filter brightness-0 invert grayscale"
          >
            {target.image}
          </motion.span>
        </div>

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option) => (
          <div key={option.id}>
            <TransportCard
              item={option}
              onClick={() => handleSelect(option)}
              size="md"
            />
          </div>
        ))}
      </div>
      
      <p className="text-slate-500 font-medium">Bé có thể nhấn micro 🎤 và nói tên xe để trả lời nhé!</p>
    </div>
  );
}
