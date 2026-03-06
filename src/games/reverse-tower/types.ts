// reverse-tower/types.ts

export type MonsterType = 'fast' | 'tank' | 'stealth';

export interface Position {
  x: number;
  y: number;
}

export interface Monster {
  id: string;
  type: MonsterType;
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  isAlive: boolean;
}

export interface Tower {
  id: string;
  position: Position;
  range: number;
  damage: number;
  fireRate: number; // shots per second
  lastFiredAt: number;
}

export interface Level {
  id: number;
  name: string;
  path: Position[];
  towers: Omit<Tower, 'id' | 'lastFiredAt'>[];
  width: number;
  height: number;
}

export interface GameState {
  level: number;
  monster: Monster | null;
  towers: Tower[];
  isPlaying: boolean;
  isPaused: boolean;
  hasWon: boolean;
  hasLost: boolean;
  selectedMonsterType: MonsterType;
}

export interface GameStats {
  highestLevel: number;
  gamesPlayed: number;
}
