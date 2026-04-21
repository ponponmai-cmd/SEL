/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Home from './components/Home';
import BreathingExercise from './components/BreathingExercise';
import GratitudeJournal from './components/GratitudeJournal';
import MoodTracker from './components/MoodTracker';
import { View } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      case 'breath':
        return <BreathingExercise onBack={() => setView('home')} />;
      case 'gratitude':
        return <GratitudeJournal onBack={() => setView('home')} />;
      case 'mood':
        return <MoodTracker onBack={() => setView('home')} />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F9F7F2]">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
