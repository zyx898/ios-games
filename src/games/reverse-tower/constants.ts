// reverse-tower/constants.ts
import { Level, MonsterType } from './types';

// Monster type stats
export const MONSTER_STATS: Record<MonsterType, { speed: number; health: number; emoji: string; name: string }> = {
  fast: { speed: 80, health: 50, emoji: '🏃', name: 'Runner' },
  tank: { speed: 30, health: 150, emoji: '🛡️', name: 'Tank' },
  stealth: { speed: 50, health: 70, emoji: '🥷', name: 'Ninja' },
};

// Grid size
export const GRID_WIDTH = 350;
export const GRID_HEIGHT = 500;
export const CELL_SIZE = 50;

// Game field dimensions
export const FIELD_COLS = 7; // 350 / 50
export const FIELD_ROWS = 10; // 500 / 50

// 10 levels with increasing difficulty
export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Tutorial',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 250 },
      { x: 350, y: 250 },
    ],
    towers: [
      { position: { x: 175, y: 150 }, range: 100, damage: 10, fireRate: 1 },
    ],
  },
  {
    id: 2,
    name: 'The Corridor',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 100 },
      { x: 200, y: 100 },
      { x: 200, y: 400 },
      { x: 350, y: 400 },
    ],
    towers: [
      { position: { x: 100, y: 250 }, range: 80, damage: 12, fireRate: 1.2 },
      { position: { x: 250, y: 250 }, range: 80, damage: 12, fireRate: 1.2 },
    ],
  },
  {
    id: 3,
    name: 'Crossfire',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 250 },
      { x: 175, y: 250 },
      { x: 175, y: 100 },
      { x: 175, y: 400 },
      { x: 350, y: 400 },
    ],
    towers: [
      { position: { x: 75, y: 250 }, range: 90, damage: 15, fireRate: 1.5 },
      { position: { x: 275, y: 150 }, range: 90, damage: 15, fireRate: 1.5 },
      { position: { x: 275, y: 350 }, range: 90, damage: 15, fireRate: 1.5 },
    ],
  },
  {
    id: 4,
    name: 'Gauntlet',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 50 },
      { x: 175, y: 50 },
      { x: 175, y: 250 },
      { x: 175, y: 450 },
      { x: 350, y: 450 },
    ],
    towers: [
      { position: { x: 100, y: 150 }, range: 85, damage: 18, fireRate: 1.8 },
      { position: { x: 250, y: 150 }, range: 85, damage: 18, fireRate: 1.8 },
      { position: { x: 100, y: 350 }, range: 85, damage: 18, fireRate: 1.8 },
      { position: { x: 250, y: 350 }, range: 85, damage: 18, fireRate: 1.8 },
    ],
  },
  {
    id: 5,
    name: 'The Maze',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 250 },
      { x: 250, y: 250 },
      { x: 250, y: 400 },
      { x: 350, y: 400 },
    ],
    towers: [
      { position: { x: 50, y: 175 }, range: 75, damage: 20, fireRate: 2 },
      { position: { x: 175, y: 175 }, range: 75, damage: 20, fireRate: 2 },
      { position: { x: 175, y: 325 }, range: 75, damage: 20, fireRate: 2 },
      { position: { x: 300, y: 325 }, range: 75, damage: 20, fireRate: 2 },
    ],
  },
  {
    id: 6,
    name: 'Sniper Alley',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 250 },
      { x: 350, y: 250 },
    ],
    towers: [
      { position: { x: 100, y: 150 }, range: 120, damage: 25, fireRate: 0.8 },
      { position: { x: 175, y: 100 }, range: 120, damage: 25, fireRate: 0.8 },
      { position: { x: 250, y: 150 }, range: 120, damage: 25, fireRate: 0.8 },
      { position: { x: 175, y: 400 }, range: 120, damage: 25, fireRate: 0.8 },
    ],
  },
  {
    id: 7,
    name: 'Death Spiral',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 250 },
      { x: 100, y: 250 },
      { x: 100, y: 150 },
      { x: 250, y: 150 },
      { x: 250, y: 350 },
      { x: 150, y: 350 },
      { x: 150, y: 200 },
      { x: 350, y: 200 },
    ],
    towers: [
      { position: { x: 175, y: 250 }, range: 100, damage: 22, fireRate: 2.5 },
      { position: { x: 50, y: 200 }, range: 90, damage: 22, fireRate: 2.5 },
      { position: { x: 300, y: 250 }, range: 90, damage: 22, fireRate: 2.5 },
      { position: { x: 200, y: 100 }, range: 90, damage: 22, fireRate: 2.5 },
      { position: { x: 200, y: 400 }, range: 90, damage: 22, fireRate: 2.5 },
    ],
  },
  {
    id: 8,
    name: 'Tower City',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 50 },
      { x: 175, y: 50 },
      { x: 175, y: 250 },
      { x: 175, y: 450 },
      { x: 350, y: 450 },
    ],
    towers: [
      { position: { x: 75, y: 150 }, range: 85, damage: 20, fireRate: 2.2 },
      { position: { x: 275, y: 150 }, range: 85, damage: 20, fireRate: 2.2 },
      { position: { x: 75, y: 250 }, range: 85, damage: 20, fireRate: 2.2 },
      { position: { x: 275, y: 250 }, range: 85, damage: 20, fireRate: 2.2 },
      { position: { x: 75, y: 350 }, range: 85, damage: 20, fireRate: 2.2 },
      { position: { x: 275, y: 350 }, range: 85, damage: 20, fireRate: 2.2 },
    ],
  },
  {
    id: 9,
    name: 'Final Defense',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 250 },
      { x: 100, y: 250 },
      { x: 100, y: 100 },
      { x: 250, y: 100 },
      { x: 250, y: 400 },
      { x: 150, y: 400 },
      { x: 150, y: 200 },
      { x: 350, y: 200 },
    ],
    towers: [
      { position: { x: 50, y: 175 }, range: 100, damage: 25, fireRate: 2.5 },
      { position: { x: 175, y: 175 }, range: 100, damage: 25, fireRate: 2.5 },
      { position: { x: 300, y: 150 }, range: 100, damage: 25, fireRate: 2.5 },
      { position: { x: 200, y: 250 }, range: 100, damage: 25, fireRate: 2.5 },
      { position: { x: 100, y: 325 }, range: 100, damage: 25, fireRate: 2.5 },
      { position: { x: 250, y: 325 }, range: 100, damage: 25, fireRate: 2.5 },
      { position: { x: 175, y: 450 }, range: 100, damage: 25, fireRate: 2.5 },
    ],
  },
  {
    id: 10,
    name: 'Impossible',
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    path: [
      { x: 0, y: 250 },
      { x: 175, y: 250 },
      { x: 175, y: 100 },
      { x: 175, y: 400 },
      { x: 350, y: 400 },
    ],
    towers: [
      { position: { x: 75, y: 200 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 75, y: 300 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 125, y: 150 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 225, y: 150 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 125, y: 350 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 225, y: 350 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 275, y: 200 }, range: 100, damage: 30, fireRate: 3 },
      { position: { x: 275, y: 300 }, range: 100, damage: 30, fireRate: 3 },
    ],
  },
];
