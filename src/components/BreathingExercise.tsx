import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, ArrowLeft } from 'lucide-react';

interface BreathingExerciseProps {
  onBack: () => void;
}

export default function BreathingExercise({ onBack }: BreathingExerciseProps) {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Prepare'>('Prepare');
  const [timer, setTimer] = useState(3);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            // Transition phase
            if (phase === 'Prepare') {
              setPhase('Inhale');
              return 4;
            } else if (phase === 'Inhale') {
              setPhase('Hold');
              return 4;
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return 4;
            } else {
              setPhase('Inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'Inhale': return '吸氣...';
      case 'Hold': return '屏息...';
      case 'Exhale': return '吐氣...';
      default: return '準備好後開始';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#7C766F] hover:text-[#5A5A40] text-xs font-bold uppercase tracking-widest transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> 返回主頁
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex flex-col items-center"
      >
        <span className="section-label">正念呼吸練習</span>
        <h2 className="text-4xl font-serif mb-4 italic text-[#5A5A40]">呼吸，就在當下</h2>
        <p className="text-[#7C766F] mb-12 font-light">專注於腹部的起伏，感受生命力緩緩流動。</p>

        <div className="relative flex items-center justify-center h-[300px] w-full mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ 
                scale: phase === 'Inhale' ? 1.5 : (phase === 'Hold' ? 1.5 : 1),
                opacity: phase === 'Prepare' ? 0.3 : 0.8
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: phase === 'Prepare' ? 1 : 4,
                ease: "easeInOut"
              }}
              className="w-48 h-48 rounded-full bg-gradient-to-br from-[#E9EDC9] to-[#A3B18A] absolute shadow-lg"
            />
          </AnimatePresence>
          
          <motion.div
            animate={{ 
              scale: phase === 'Inhale' ? 1.4 : (phase === 'Hold' ? 1.4 : 1),
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="w-48 h-48 rounded-full border border-[#5A5A40]/10 flex flex-col items-center justify-center relative z-10"
          >
            <div className="text-3xl font-serif italic text-white drop-shadow-md">
              {isActive ? timer : <Wind className="w-8 h-8 text-[#5A5A40] opacity-40" />}
            </div>
            {isActive && <div className="text-[10px] text-white/80 font-bold uppercase tracking-widest mt-1">SECONDS</div>}
          </motion.div>
        </div>

        <div className="w-full max-w-xs">
          <h3 className="text-2xl font-serif italic mb-10 h-8 text-[#5A5A40]">{getPhaseText()}</h3>
          
          {!isActive && (
            <button
              onClick={() => setIsActive(true)}
              className="olive-button w-full shadow-lg"
            >
              開始練習
            </button>
          )}

          {isActive && (
            <div className="space-y-6">
              <p className="text-xs text-[#7C766F] font-medium tracking-wide">練習進行中，請保持平穩呼吸</p>
              <button
                onClick={() => {
                  setIsActive(false);
                  setPhase('Prepare');
                  setTimer(3);
                }}
                className="text-xs text-[#7C766F] font-bold uppercase tracking-[2px] hover:text-[#5A5A40] transition-colors"
              >
                結束練習
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
