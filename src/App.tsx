import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { GameState, Level } from './types';
import Mascot from './components/Mascot';
import { TRANSPORT_DATA } from './constants';

// Level Components
import Level1 from './components/levels/Level1';
import Level2 from './components/levels/Level2';
import Level3 from './components/levels/Level3';
import Level4 from './components/levels/Level4';
import Level5 from './components/levels/Level5';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [levels, setLevels] = useState<Level[]>([
    { id: 1, title: 'Nhận Biết', description: 'Làm quen các phương tiện', unlocked: true, completed: false, stars: 0 },
    { id: 2, title: 'Phân Loại', description: 'Đường bộ, thủy, không', unlocked: true, completed: false, stars: 0 },
    { id: 3, title: 'Siêu Phân Loại', description: 'Nhiều phương tiện cùng lúc', unlocked: true, completed: false, stars: 0 },
    { id: 4, title: 'Tìm Lỗi Sai', description: 'Sửa lại cho đúng nhé', unlocked: true, completed: false, stars: 0 },
    { id: 5, title: 'Thử Thách', description: 'Ghi nhớ và phản xạ', unlocked: true, completed: false, stars: 0 },
  ]);

  const startLevel = (levelId: number) => {
    setCurrentLevel(levelId);
    setGameState('playing');
  };

  const completeLevel = (stars: number) => {
    const updatedLevels = levels.map(l => {
      if (l.id === currentLevel) {
        return { ...l, completed: true, stars: Math.max(l.stars, stars) };
      }
      if (l.id === currentLevel + 1) {
        return { ...l, unlocked: true };
      }
      return l;
    });
    setLevels(updatedLevels);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#facc15', '#4ade80', '#3b82f6', '#f472b6']
    });
    setGameState('result');
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 1: return <Level1 onComplete={completeLevel} />;
      case 2: return <Level2 onComplete={completeLevel} />;
      case 3: return <Level3 onComplete={completeLevel} />;
      case 4: return <Level4 onComplete={completeLevel} />;
      case 5: return <Level5 onComplete={completeLevel} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-sky-light">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">☁️</div>
      <div className="absolute top-40 right-20 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>☁️</div>
      <div className="absolute bottom-20 left-1/4 text-6xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🌳</div>
      <div className="absolute bottom-10 right-1/3 text-6xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🌳</div>

      <AnimatePresence mode="wait">
        {gameState === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <h1 className="text-6xl md:text-8xl font-black text-ocean-blue text-center drop-shadow-lg">
              BÉ HỌC <br />
              <span className="text-sun-yellow">GIAO THÔNG</span>
            </h1>
            
            <Mascot message="Chào bé! Cùng học về các loại xe nhé!" mood="happy" />
            
            <button
              onClick={() => setGameState('map')}
              className="btn-playful bg-grass-green text-white"
            >
              BẮT ĐẦU CHƠI
            </button>
          </motion.div>
        )}

        {gameState === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-4xl z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setGameState('home')}
                className="p-4 bg-white rounded-full shadow-lg text-2xl hover:bg-slate-50"
              >
                🏠
              </button>
              <h2 className="text-4xl font-black text-slate-700">BẢN ĐỒ CỦA BÉ</h2>
              <div className="w-12"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {levels.map((level) => (
                <motion.div
                  key={level.id}
                  whileHover={level.unlocked ? { scale: 1.05 } : {}}
                  whileTap={level.unlocked ? { scale: 0.95 } : {}}
                  onClick={() => level.unlocked && startLevel(level.id)}
                  className={`
                    card-playful cursor-pointer flex flex-col items-center gap-4 relative
                    ${!level.unlocked ? 'opacity-60 grayscale' : 'border-sun-yellow'}
                  `}
                >
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white
                    ${level.completed ? 'bg-grass-green' : 'bg-ocean-blue'}
                  `}>
                    {level.id}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800">{level.title}</h3>
                    <p className="text-slate-500 text-sm">{level.description}</p>
                  </div>
                  
                  {level.completed && (
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className={i < level.stars ? 'text-sun-yellow' : 'text-slate-300'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {!level.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 rounded-3xl">
                      <span className="text-4xl">🔒</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col z-10"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setGameState('map')}
                className="p-3 bg-white rounded-full shadow-md text-xl"
              >
                🔙
              </button>
              <div className="bg-white px-6 py-2 rounded-full shadow-md font-bold text-ocean-blue">
                LEVEL {currentLevel}: {levels.find(l => l.id === currentLevel)?.title}
              </div>
              <div className="w-10"></div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              {renderLevel()}
            </div>
          </motion.div>
        )}

        {gameState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <h2 className="text-6xl font-black text-grass-green text-center">GIỎI QUÁ!</h2>
            
            <div className="flex gap-4 text-6xl">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>⭐</motion.span>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>⭐</motion.span>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}>⭐</motion.span>
            </div>

            <Mascot message="Bé đã hoàn thành bài học rồi!" mood="excited" />

            <div className="flex gap-4">
              <button
                onClick={() => setGameState('map')}
                className="btn-playful bg-ocean-blue text-white"
              >
                TIẾP TỤC
              </button>
              <button
                onClick={() => setGameState('playing')}
                className="btn-playful bg-slate-200 text-slate-600"
              >
                CHƠI LẠI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
