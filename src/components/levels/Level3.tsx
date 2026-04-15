import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TransportItem, TransportType } from '../../types';
import { TRANSPORT_DATA, CATEGORIES } from '../../constants';
import TransportCard from '../TransportCard';
import Mascot from '../Mascot';

interface Level3Props {
  onComplete: (stars: number) => void;
}

export default function Level3({ onComplete }: Level3Props) {
  const [items, setItems] = useState<(TransportItem & { placed: boolean })[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const shuffled = [...TRANSPORT_DATA]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
      .map(t => ({ ...t, placed: false }));
    setItems(shuffled);
  }, []);

  const placeItem = (itemId: string, type: TransportType) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.placed) return;

    if (item.type === type) {
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, placed: true } : i));
      setFeedback(`Đúng rồi! ${item.name} về đúng nhà ${CATEGORIES[type].name} rồi! 🚀`);
      setTimeout(() => setFeedback(null), 1500);
    } else {
      setFeedback(`Ôi, ${item.name} không sống ở ${CATEGORIES[type].name} đâu bé ơi! ⚓`);
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  useEffect(() => {
    if (items.length > 0 && items.every(i => i.placed)) {
      setTimeout(() => onComplete(3), 1500);
    }
  }, [items]);

  const activeItem = items.find(i => !i.placed);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-5xl h-full">
      <Mascot message={feedback || `Bé hãy đưa các bạn về đúng nhà nhé!`} mood={feedback?.includes('Đúng') ? 'excited' : feedback ? 'sad' : 'happy'} />

      <div className="flex-1 flex flex-wrap justify-center items-center gap-4 p-6 bg-white/30 rounded-3xl w-full min-h-[200px]">
        <AnimatePresence>
          {items.filter(i => !i.placed).map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: index === 0 ? 1.2 : 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              className={index === 0 ? 'z-10' : 'opacity-50'}
            >
              <TransportCard 
                item={item} 
                onClick={() => {}} 
                size={index === 0 ? 'lg' : 'md'} 
                showName={index === 0}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length > 0 && items.every(i => i.placed) && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl font-black text-grass-green">
            BÉ THẬT TUYỆT VỜI! 🌈
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {(['road', 'air', 'water', 'rail'] as TransportType[]).map((type) => (
          <motion.div
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              rounded-3xl border-4 border-dashed border-white/50 flex flex-col items-center justify-center p-4 min-h-[120px] cursor-pointer
              ${CATEGORIES[type].color} text-white shadow-lg
            `}
            onClick={() => activeItem && placeItem(activeItem.id, type)}
          >
            <span className="text-4xl">{CATEGORIES[type].icon}</span>
            <span className="font-bold text-sm text-center">{CATEGORIES[type].name}</span>
            <div className="flex flex-wrap gap-1 justify-center mt-2">
              {items.filter(i => i.placed && i.type === type).map(i => (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={i.id} className="text-2xl">{i.image}</motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-slate-500 font-medium bg-white/50 px-4 py-1 rounded-full">Nhấn vào hình to ở trên rồi chọn nhóm đúng nhé!</p>
    </div>
  );
}
