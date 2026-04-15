import { motion } from 'motion/react';
import { TransportItem } from '../types';

interface TransportCardProps {
  item: TransportItem;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export default function TransportCard({ 
  item, 
  onClick, 
  disabled, 
  size = 'md',
  showName = false 
}: TransportCardProps) {
  const sizeClasses = {
    sm: 'w-24 h-24 text-4xl',
    md: 'w-32 h-32 text-6xl',
    lg: 'w-48 h-48 text-8xl'
  };

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.1, rotate: 2 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={`
        card-playful flex flex-col items-center justify-center cursor-pointer
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : ''}
      `}
    >
      <span className="drop-shadow-md">{item.image}</span>
      {showName && (
        <span className="mt-2 text-lg font-bold text-slate-700">{item.name}</span>
      )}
    </motion.div>
  );
}
