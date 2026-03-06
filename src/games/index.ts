import { ComponentType } from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  ageGroup: 'kids' | 'teens' | 'all';
  component: ComponentType<{ onExit: () => void }>;
}

// Games are registered here as they are built
export const GAMES: Game[] = [];
