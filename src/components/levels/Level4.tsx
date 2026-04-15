import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransportItem } from '../../types';
import { TRANSPORT_DATA, CATEGORIES } from '../../constants';
import TransportCard from '../TransportCard';
import Mascot from '../Mascot';

interface Level4Props {
  onComplete: (stars: number) => void;
}

export default function Level4({ onComplete }: Level4Props) {
  const [round, setRound] = useState(1);
  const [items, setItems] = useState<TransportItem[]>([]);
  const [wrongId, setWrongId] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const totalRounds = 5;

  useEffect(() => {
    generateRound();
  }, [round]);

  const generateRound = () => {
    const types = ['road', 'air', 'water', 'rail'];
    const mainType = types[Math.floor(Math.random() * types.length)];
    const otherType = types.filter(t => t !== mainType)[Math.floor(Math.random() * (types.length - 1))];

    const mainItems = TRANSPORT_DATA.filter(t => t.type === mainType).sort(() => 0.5 - Math.random()).slice(0, 3);
    const oddItem = TRANSPORT_DATA.filter(t => t.type === otherType).sort(() => 0.5 - Math.random())[0];

    const roundItems = [...mainItems, oddItem].sort(() => 0.5 - Math.random());
    setItems(roundItems);
    setWrongId(oddItem.id);
    setFeedback(null);
  };

  const handleSelect = (item: TransportItem) => {
    if (feedback) return;

    if (item.id === wrongId) {
      const mainType = items.find(i => i.id !== wrongId)?.type;
      const mainCategory = mainType ? CATEGORIES[mainType as keyof typeof CATEGORIES].name : '';
      setFeedback(`Đúng rồi! ${item.name} thuộc ${CATEGORIES[item.type].name}, không phải ${mainCategory} đâu! 🕵️‍♂️`);
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(r => r + 1);
        } else {
          onComplete(3);
        }
      }, 3000);
    } else {
      setFeedback(`Bạn ${item.name} đúng là thuộc ${CATEGORIES[item.type].name} rồi. Bé tìm bạn khác nhé! 🔍`);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      <div className="text-2xl font-bold text-ocean-blue">Vòng {round}/{totalRounds}</div>

      <Mascot message={feedback || `Có một bạn đang ở nhầm chỗ, bé tìm giúp nhé!`} mood={feedback?.includes('Đúng') ? 'excited' : feedback ? 'sad' : 'happy'} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id}>
            <TransportCard
              item={item}
              onClick={() => handleSelect(item)}
              size="lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
