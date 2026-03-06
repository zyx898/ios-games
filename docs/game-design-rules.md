# Game Design Rules — iOS Games

## 核心原则
**做市面上没有的游戏。** 每个游戏必须有一个独特的核心机制，
能用一句话描述，并且在 App Store 搜索结果中占据独特位置。

## Tech Stack
- **React Native + Expo SDK 52** (TypeScript)
- **react-native-reanimated** for animations
- **expo-sensors** for gyroscope/accelerometer when needed
- **expo-av** for audio when needed
- **No third-party game engines** — use React Native primitives
- Each game is a **self-contained screen component** in `src/games/<game-id>/`

## File Structure (per game)
```
src/games/<game-id>/
  index.tsx        # Main game component (default export)
  README.md        # App Store description, mechanics, age group, unique selling point
```

## README.md 必须包含
```markdown
# [Game Title]

## App Store Description (100 words max)
[可以直接用作 App Store 描述的文字]

## Unique Selling Point
[一句话：为什么这个游戏在 App Store 是独特的]

## Core Mechanic
[核心玩法机制描述]

## Age Group
[Kids / Teens / All Ages]
```

## Code Rules
- TypeScript strict mode — no `any`
- Each game exports a single default React component
- Component receives `onExit: () => void` prop (back to menu)
- Self-contained: no shared state between games
- Target: iPhone SE screen size minimum (375x667)
- Support both portrait and landscape where appropriate

## UX Rules
- **First 10 seconds**: 玩家必须立刻明白怎么玩，无需教程文字
- **One core interaction**: 每个游戏只有一种核心操作方式
- Large touch targets (min 44x44pt)
- No ads, no IAP prompts inside game (App Store review 友好)
- 支持无障碍：关键游戏不强依赖颜色区分

## App Store Requirements
- 每个游戏必须有独特的 App Store 关键词定位
- 游戏名字要能直接搜索到（不能太通用）
- 截图要能在 3 秒内让人看懂游戏玩法
- 无暴力、无赌博机制、适合 4+ 年龄评级

## Game Registry
完成后在 `src/games/index.ts` 注册：
```ts
export const GAMES: Game[] = [
  {
    id: 'rhythm-breathe',
    title: 'Breathing Rhythm',
    description: '跟随节奏呼吸，解锁冥想模式',
    ageGroup: 'all',
    uniqueKeyword: 'breathing rhythm game',
    component: RhythmBreathe,
  },
]
```
