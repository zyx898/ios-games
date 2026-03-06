# Game Design Rules — iOS Games

## 核心原则
**做市面上没有的、能通过 App Store 审核的精品游戏。**
Apple Guideline 4.2 要求：游戏必须有足够的内容和功能，不能是"过于简单"的 demo。

---

## App Store 审核要求（必须满足）
- **最少 10 个关卡或内容** — 太少会被 4.2 拒掉
- **完整 UI 流程**：主菜单 → 游戏 → 结算页 → 重玩/下一关
- **游戏进度保存**：用 AsyncStorage 保存最高分/已解锁关卡
- **游戏说明**：至少一个 How to Play 界面
- **精美视觉**：不能用系统默认颜色，必须有主题色、图标、动画
- **无崩溃**：所有边界情况要处理好

---

## Tech Stack
- **React Native + Expo SDK 52** (TypeScript)
- **react-native-reanimated** — 所有动画必须用这个，不用 Animated API
- **expo-linear-gradient** — 背景渐变，让界面更精美
- **@react-native-async-storage/async-storage** — 保存游戏进度
- **expo-haptics** — 关键操作加触感反馈
- **expo-av** — 背景音乐和音效（可选但加分）
- **No third-party game engines**

---

## 视觉标准（精美要求）
```
✅ 渐变背景（LinearGradient）
✅ 圆角卡片/按钮（borderRadius ≥ 12）
✅ 阴影效果（shadowColor, elevation）
✅ 流畅动画（进入/退出/交互，duration 200-400ms）
✅ 统一主题色系（2-3个主色，不超过5个颜色）
✅ 清晰的字体层级（标题/副标题/正文大小区分）
❌ 不用白底黑字的默认样式
❌ 不用系统蓝色默认按钮
❌ 不用 StyleSheet.absoluteFill 做纯色背景
```

---

## File Structure (per game)
```
src/games/<game-id>/
  index.tsx          # Main game component
  components/        # 子组件（如 TowerComponent, MonsterComponent）
  hooks/             # 游戏逻辑 hooks（如 useGameState, useLevelManager）
  constants.ts       # 关卡数据、配置常量
  types.ts           # TypeScript 类型定义
  README.md          # App Store 描述 + 独特卖点
```

---

## README.md 模板
```markdown
# [Game Title]

## App Store Description
[100字以内，可直接用作 App Store 描述]

## Unique Selling Point
[一句话：为什么这个游戏在 App Store 是独特的]

## Core Mechanic
[核心玩法]

## Content
- Levels: [数量]
- Difficulty: [Easy/Medium/Hard progression]
- Estimated playtime: [X minutes per session]

## Age Rating
4+ / 9+ / 12+
```

---

## 游戏完整性 Checklist（每个游戏必须全部完成）
- [ ] 主菜单（游戏名、开始按钮、最高分显示）
- [ ] How to Play 界面
- [ ] 至少 10 个关卡（难度递增）
- [ ] 游戏进行中 UI（分数、生命值、关卡数）
- [ ] 胜利/失败结算页（分数、重玩、下一关）
- [ ] AsyncStorage 保存最高分和已解锁关卡
- [ ] expo-haptics 触感反馈
- [ ] onExit prop（返回主菜单）
- [ ] 所有文字用 `<Text>` 组件

---

## Code Rules
- TypeScript strict，无 `any`
- 游戏逻辑抽离到 hooks，组件只做渲染
- 关卡数据放 `constants.ts`，不硬编码在组件里
- 目标机型：iPhone SE (375x667) 最小，iPhone 16 Pro Max (430x932) 最大

---

## Game Registry
完成后注册到 `src/games/index.ts`。
