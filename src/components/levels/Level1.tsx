import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransportItem } from '../../types';
import { TRANSPORT_DATA } from '../../constants';
import TransportCard from '../TransportCard';
import Mascot from '../Mascot';

interface Level1Props {
  onComplete: (stars: number) => void;
}

export default function Level1({ onComplete }: Level1Props) {
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState<TransportItem | null>(null);
  const [options, setOptions] = useState<TransportItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const totalRounds = 5;

  useEffect(() => {
    generateRound();
  }, [round]);

  const generateRound = () => {
    const shuffled = [...TRANSPORT_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled[0];
    const others = shuffled.slice(1, 3);
    const roundOptions = [selected, ...others].sort(() => 0.5 - Math.random());
    
    setTarget(selected);
    setOptions(roundOptions);
    setFeedback(null);
  };

  const handleSelect = (item: TransportItem) => {
    if (feedback) return;

    if (item.id === target?.id) {
      setFeedback(`Giỏi quá! Đây chính là ${target.name} đấy! 🎉`);
      setScore(s => s + 1);
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(r => r + 1);
        } else {
          onComplete(3);
        }
      }, 2500);
    } else {
      setFeedback(`Ôi, đây là ${item.name} mà. Bé tìm lại ${target?.name} nhé! 🧸`);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  if (!target) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <div className="flex justify-between w-full px-4">
        <div className="text-2xl font-bold text-ocean-blue">Vòng {round}/{totalRounds}</div>
        <div className="text-2xl font-bold text-sun-yellow">Điểm: {score}</div>
      </div>

      <Mascot message={feedback || `Đây là xe gì thế bé?`} mood={feedback?.includes('Giỏi') ? 'excited' : feedback ? 'sad' : 'happy'} />

      <div className="bg-white/50 p-8 rounded-full shadow-inner">
        <TransportCard item={target} size="lg" disabled />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            className="btn-playful bg-white text-slate-700 hover:bg-sun-yellow hover:text-white border-2 border-slate-100"
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
