import { useState } from 'react';
import { motion } from 'motion/react';
import { Wind, BookHeart, BarChart3, ChevronRight } from 'lucide-react';
import { View } from '../types';

interface HomeProps {
  setView: (view: View) => void;
}

const navItems = [
  { id: 'breath', title: '正念呼吸', icon: Wind, desc: '透過腹式呼吸法，專注於腹部起伏，釋放內心壓力', color: 'bg-[#A3B18A]/10' },
  { id: 'gratitude', title: '感恩日記', icon: BookHeart, desc: '每日書寫感恩之事，讓心靈充滿豐盛與溫暖', color: 'bg-[#E9EDC9]/30' },
  { id: 'mood', title: '情緒追蹤', icon: BarChart3, desc: '覺察當下的情感流動，記錄自我成長的軌跡', color: 'bg-[#F2F0EB]' },
];

export default function Home({ setView }: HomeProps) {
  const [currentDate] = useState(() => new Date().toLocaleDateString('zh-TW', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  }));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-[#3E3B39]">
      <header className="mb-20 border-b border-[#5A5A40]/10 pb-12 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <motion.h1 
            className="text-4xl md:text-5xl font-serif text-[#5A5A40] italic font-normal mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            正念靜心服務
          </motion.h1>
          <motion.p 
            className="text-[#7C766F] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            陪伴您尋找內心的寧靜與覺察
          </motion.p>
        </div>
        <div className="text-sm text-[#7C766F] font-medium tracking-wide">
          {currentDate}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {navItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            onClick={() => setView(item.id as View)}
            className={`group natural-card p-10 text-left transition-all hover:bg-white/80 active:scale-95 flex flex-col h-full bg-white`}
          >
            <div className={`mb-8 p-4 rounded-3xl w-fit transition-transform group-hover:scale-110 ${item.color}`}>
              <item.icon className="w-8 h-8 text-[#5A5A40]" />
            </div>
            <div className="mt-auto">
              <span className="section-label mb-2 uppercase text-[10px] tracking-[3px]">Exercise</span>
              <h3 className="text-2xl font-serif mb-3 text-[#5A5A40]">{item.title}</h3>
              <p className="text-sm text-[#7C766F] leading-relaxed mb-8">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-[#5A5A40] group-hover:gap-4 transition-all">
                開始練習 <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <footer className="mt-32 text-center">
        <p className="font-serif italic text-[#7C766F] text-lg max-w-lg mx-auto leading-relaxed">
          「感恩不是對命運的妥協，而是對生命贈予的覺察。」
        </p>
        <div className="mt-12 pt-8 border-t border-[#5A5A40]/10 flex flex-col md:flex-row justify-center items-center gap-8 text-[#7C766F] text-[10px] uppercase tracking-widest font-medium">
          <div>© 2024 正念靜心服務</div>
          <div className="hidden md:block w-1 h-1 bg-[#5A5A40]/20 rounded-full" />
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#5A5A40] transition-colors">隱私政策</a>
            <a href="#" className="hover:text-[#5A5A40] transition-colors">練習指南</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
