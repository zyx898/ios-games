# Game Design Rules — iOS Games

## Tech Stack
- **React Native + Expo SDK 52** (TypeScript)
- **react-native-reanimated** for animations
- **No third-party game engines** — use React Native primitives + Animated API
- Each game is a **self-contained screen component** in `src/games/<game-id>/`

## File Structure (per game)
```
src/games/<game-id>/
  index.tsx        # Main game component (default export)
  README.md        # Game description, mechanics, age group
```

## Code Rules
- TypeScript strict mode — no `any`
- Each game exports a single default React component
- Component receives `onExit: () => void` prop (back to menu)
- Self-contained: no shared state between games
- Target: iPhone SE screen size minimum (375x667)
- All text must use `<Text>` component (no HTML)
- No network calls inside games — fully offline

## UX Rules
- Always show a back/exit button (top-left)
- Large touch targets (min 44x44pt)
- Simple, colorful UI — aimed at casual players
- Sound is optional (no required audio)
- Support both portrait and landscape

## Age Groups
- 🟢 Kids (5-10): Simple rules, big buttons, bright colors
- 🟡 Teens (11-16): More complexity, strategy
- 🔵 All Ages: Universally fun

## Game Registry
After creating a game, register it in `src/games/index.ts`:
```ts
export const GAMES: Game[] = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Flip cards to find matching pairs',
    ageGroup: 'kids',
    component: MemoryMatch,
  },
  // ...
]
```
