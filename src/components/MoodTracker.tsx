import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { MoodEntry } from '../types';

interface MoodTrackerProps {
  onBack: () => void;
}

const MOODS = [
  { level: 1, emoji: '😔', label: '很差' },
  { level: 2, emoji: '😕', label: '一般' },
  { level: 3, emoji: '😐', label: '普通' },
  { level: 4, emoji: '🙂', label: '還不錯' },
  { level: 5, emoji: '✨', label: '極好' },
];

export default function MoodTracker({ onBack }: MoodTrackerProps) {
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('mood_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveMood = () => {
    if (!selectedLevel) return;
    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' }),
      level: selectedLevel,
      note: note
    };
    const updated = [entry, ...history].slice(0, 7); // Keep last 7 days
    setHistory(updated);
    localStorage.setItem('mood_history', JSON.stringify(updated));
    setSelectedLevel(null);
    setNote('');
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 max-w-2xl mx-auto">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#7C766F] hover:text-[#5A5A40] text-xs font-bold uppercase tracking-widest transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" /> 返回主頁
      </button>

      <div className="mb-12 border-b border-[#5A5A40]/10 pb-8">
        <span className="section-label">情感覺察記錄</span>
        <h2 className="text-4xl font-serif mb-2 italic text-[#5A5A40]">每日情緒追蹤</h2>
        <p className="text-[#7C766F] font-light">靜下來，聽聽內心最真實的聲音。</p>
      </div>

      <div className="natural-card p-10 mb-12">
        <h3 className="text-2xl font-serif text-[#3E3B39] mb-10 flex items-center gap-3 italic">
          <Sparkles className="w-6 h-6 text-[#A3B18A]" />
          此刻的感覺如何？
        </h3>
        
        <div className="flex justify-between mb-12 gap-2">
          {MOODS.map((m) => (
            <button
              key={m.level}
              onClick={() => setSelectedLevel(m.level)}
              className={`flex flex-col items-center gap-3 p-4 rounded-[24px] transition-all duration-500 flex-1 ${
                selectedLevel === m.level 
                ? 'bg-[#5A5A40] text-white shadow-xl scale-105' 
                : 'bg-[#F2F0EB] hover:bg-[#EAE8E4] opacity-80'
              }`}
            >
              <span className="text-3xl md:text-4xl">{m.emoji}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedLevel === m.level ? 'text-white' : 'text-[#7C766F]'}`}>
                {m.label}
              </span>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="有什麼特別想記下來的嗎？..."
          className="w-full h-32 bg-[#F9F7F2] border border-[#EAE8E4] rounded-[20px] p-6 mb-8 focus:border-[#5A5A40] focus:ring-0 transition-all placeholder:text-[#BBB] placeholder:italic font-serif italic text-lg"
        />

        <button
          onClick={saveMood}
          disabled={!selectedLevel}
          className="w-full olive-button flex items-center justify-center gap-3 py-5 shadow-lg"
        >
          <Send className="w-4 h-4" /> 記錄此刻心情
        </button>
      </div>

      {history.length > 0 && (
        <div className="space-y-6">
          <h4 className="text-[10px] font-bold uppercase tracking-[3px] text-[#7C766F] opacity-40 px-2 text-center">本週情感軌跡</h4>
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {history.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 w-36 natural-card p-6 flex flex-col items-center text-center bg-white/50"
              >
                <div className="text-[10px] font-bold tracking-widest text-[#7C766F] mb-4 opacity-70 uppercase">{h.date}</div>
                <div className="text-3xl mb-4">
                  {MOODS.find(m => m.level === h.level)?.emoji}
                </div>
                <div className="text-[11px] font-medium leading-relaxed text-[#3E3B39] font-serif italic truncate w-full">
                  {h.note || MOODS.find(m => m.level === h.level)?.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
