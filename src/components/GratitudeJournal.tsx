import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { GratitudeEntry } from '../types';

interface GratitudeJournalProps {
  onBack: () => void;
}

export default function GratitudeJournal({ onBack }: GratitudeJournalProps) {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [timer, setTimer] = useState(360); // 6 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gratitude_entries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const saveEntry = () => {
    if (!newContent.trim()) return;
    const entry: GratitudeEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', year: 'numeric' }),
      content: newContent,
      tags: []
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('gratitude_entries', JSON.stringify(updated));
    setNewContent('');
    setIsWriting(false);
    setIsTimerActive(false);
    setTimer(360);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('gratitude_entries', JSON.stringify(updated));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
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
        <span className="section-label">感恩練習記錄</span>
        <h2 className="text-4xl font-serif mb-2 italic text-[#5A5A40]">6 分鐘感恩日記</h2>
        <p className="text-[#7C766F] font-light">透過覺察與記錄，看見生命中微小而珍貴的美好。</p>
      </div>

      <AnimatePresence mode="wait">
        {!isWriting ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <button
              onClick={() => {
                setIsWriting(true);
                setIsTimerActive(true);
              }}
              className="w-full text-left bg-white border border-dashed border-[#EAE8E4] rounded-[32px] p-10 hover:bg-[#F2F0EB]/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-serif text-[#5A5A40] italic">開啟新的書寫練習</span>
                <Plus className="w-6 h-6 text-[#5A5A40] opacity-40 group-hover:rotate-90 transition-transform duration-500" />
              </div>
              <p className="text-sm text-[#7C766F] font-light italic">「今天值得感激的三件事？」</p>
            </button>

            {entries.length > 0 && (
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[3px] text-[#7C766F] opacity-40 px-2">之前的筆記</h4>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    layout
                    className="natural-card p-10 group relative"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C766F] opacity-60">{entry.date}</span>
                      <button 
                        onClick={() => deleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-40 hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-[#5A5A40]" />
                      </button>
                    </div>
                    <p className="text-xl font-serif text-[#3E3B39] leading-relaxed whitespace-pre-wrap italic">"{entry.content}"</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="natural-card p-10 md:p-14"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] opacity-60">專注書寫中</span>
              </div>
              <div className="text-2xl font-serif italic text-[#5A5A40] opacity-60">
                {formatTime(timer)}
              </div>
            </div>

            <h3 className="text-2xl font-serif text-[#3E3B39] mb-8">今天值得感激的三件事？</h3>

            <textarea
              autoFocus
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="01. 早晨那杯溫熱的咖啡..."
              className="w-full h-80 bg-transparent border-none focus:ring-0 text-xl font-serif leading-relaxed resize-none placeholder:text-[#BBB] placeholder:italic italic"
            />

            <div className="flex flex-col md:flex-row justify-end gap-6 pt-10 border-t border-[#EAE8E4]">
              <button
                onClick={() => {
                  setIsWriting(false);
                  setIsTimerActive(false);
                  setTimer(360);
                }}
                className="px-6 py-2 text-[#7C766F] font-bold uppercase tracking-widest text-xs hover:text-[#5A5A40] transition-colors"
              >
                放棄本次記錄
              </button>
              <button
                onClick={saveEntry}
                disabled={!newContent.trim()}
                className="olive-button flex items-center justify-center gap-2 disabled:opacity-30"
              >
                <Save className="w-4 h-4" /> 儲存今日紀錄
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
