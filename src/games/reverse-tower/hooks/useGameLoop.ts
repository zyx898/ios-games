// reverse-tower/hooks/useGameLoop.ts
import { useEffect, useRef, useState } from 'react';
import { Monster, Tower, Position } from '../types';

const distance = (a: Position, b: Position): number => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

export const useGameLoop = (
  monster: Monster | null,
  towers: Tower[],
  path: Position[],
  isPlaying: boolean,
  isPaused: boolean,
  onWin: () => void,
  onLose: () => void,
) => {
  const [monsterPosition, setMonsterPosition] = useState<Position>(path[0]);
  const [monsterHealth, setMonsterHealth] = useState<number>(monster?.maxHealth || 100);
  const pathIndexRef = useRef(0);
  const progressRef = useRef(0);
  const lastFrameRef = useRef(Date.now());

  useEffect(() => {
    if (!monster || !isPlaying || isPaused) return;

    setMonsterPosition(path[0]);
    setMonsterHealth(monster.maxHealth);
    pathIndexRef.current = 0;
    progressRef.current = 0;
    lastFrameRef.current = Date.now();
  }, [monster, path, isPlaying, isPaused]);

  useEffect(() => {
    if (!monster || !isPlaying || isPaused || monsterHealth <= 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;

      // Move monster along path
      const currentIndex = pathIndexRef.current;
      if (currentIndex >= path.length - 1) {
        onWin();
        return;
      }

      const start = path[currentIndex];
      const end = path[currentIndex + 1];
      const segmentDistance = distance(start, end);
      const moveDistance = monster.speed * deltaTime;

      progressRef.current += moveDistance / segmentDistance;

      if (progressRef.current >= 1) {
        pathIndexRef.current += 1;
        progressRef.current = 0;
      }

      const newPosition = {
        x: lerp(start.x, end.x, progressRef.current),
        y: lerp(start.y, end.y, progressRef.current),
      };

      setMonsterPosition(newPosition);

      // Towers attack
      let totalDamage = 0;
      towers.forEach((tower) => {
        const dist = distance(tower.position, newPosition);
        if (dist <= tower.range) {
          const timeSinceLastFire = (now - tower.lastFiredAt) / 1000;
          if (timeSinceLastFire >= 1 / tower.fireRate) {
            totalDamage += tower.damage;
            tower.lastFiredAt = now;
          }
        }
      });

      if (totalDamage > 0) {
        setMonsterHealth((prev) => {
          const newHealth = prev - totalDamage;
          if (newHealth <= 0) {
            onLose();
            return 0;
          }
          return newHealth;
        });
      }
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(interval);
  }, [monster, towers, path, isPlaying, isPaused, monsterHealth, onWin, onLose]);

  return { monsterPosition, monsterHealth };
};
