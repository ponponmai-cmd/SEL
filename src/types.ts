export interface GratitudeEntry {
  id: string;
  date: string;
  content: string;
  tags: string[];
}

export interface MoodEntry {
  id: string;
  date: string;
  level: number; // 1-5
  note: string;
}

export type View = 'home' | 'breath' | 'gratitude' | 'mood';
