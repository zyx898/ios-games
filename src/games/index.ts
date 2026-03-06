import { ComponentType } from 'react';
import ReverseTower from './reverse-tower';

export interface Game {
  id: string;
  title: string;
  description: string;
  ageGroup: 'kids' | 'teens' | 'all';
  component: ComponentType<{ onExit: () => void }>;
}

// Games are registered here as they are built
export const GAMES: Game[] = [
  {
    id: 'reverse-tower',
    title: 'Reverse Tower',
    description: 'You are the monster! Break through tower defenses to reach the end.',
    ageGroup: 'teens',
    component: ReverseTower,
  },
];
