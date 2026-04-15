import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransportItem, TransportType } from '../../types';
import { TRANSPORT_DATA, CATEGORIES } from '../../constants';
import TransportCard from '../TransportCard';
import Mascot from '../Mascot';

interface Level2Props {
  onComplete: (stars: number) => void;
}

export default function Level2({ onComplete }: Level2Props) {
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<TransportItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
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

  if (!target) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <div className="text-2xl font-bold text-ocean-blue">Vòng {round}/{totalRounds}</div>

      <Mascot message={feedback || `Bạn ${target.name} này đi ở đâu nhỉ?`} mood={feedback?.includes('Đúng') ? 'excited' : feedback ? 'sad' : 'happy'} />

      <motion.div
        key={target.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="z-20"
      >
        <TransportCard item={target} size="lg" disabled />
      </motion.div>

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
    </div>
  );
}
