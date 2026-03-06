// reverse-tower/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { MonsterComponent } from './components/MonsterComponent';
import { TowerComponent } from './components/TowerComponent';
import { PathComponent } from './components/PathComponent';
import { HealthBar } from './components/HealthBar';
import { useGameLoop } from './hooks/useGameLoop';
import { LEVELS, MONSTER_STATS, GRID_WIDTH, GRID_HEIGHT } from './constants';
import { MonsterType, Monster, Tower, GameStats } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  onExit: () => void;
}

const STORAGE_KEY = '@reverse-tower-stats';

const ReverseTower: React.FC<Props> = ({ onExit }) => {
  const [screen, setScreen] = useState<'menu' | 'howto' | 'select' | 'game' | 'result'>('menu');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedMonsterType, setSelectedMonsterType] = useState<MonsterType>('fast');
  const [monster, setMonster] = useState<Monster | null>(null);
  const [towers, setTowers] = useState<Tower[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [stats, setStats] = useState<GameStats>({ highestLevel: 1, gamesPlayed: 0 });

  const level = LEVELS[currentLevel - 1];
  const { monsterPosition, monsterHealth } = useGameLoop(
    monster,
    towers,
    level.path,
    isPlaying,
    isPaused,
    () => handleWin(),
    () => handleLose(),
  );

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setStats(JSON.parse(data));
      }
    } catch (e) {
      console.error('Failed to load stats', e);
    }
  };

  const saveStats = async (newStats: GameStats) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
      setStats(newStats);
    } catch (e) {
      console.error('Failed to save stats', e);
    }
  };

  const startGame = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const monsterStats = MONSTER_STATS[selectedMonsterType];
    const newMonster: Monster = {
      id: 'player',
      type: selectedMonsterType,
      position: level.path[0],
      health: monsterStats.health,
      maxHealth: monsterStats.health,
      speed: monsterStats.speed,
      isAlive: true,
    };

    const newTowers: Tower[] = level.towers.map((t, i) => ({
      ...t,
      id: `tower-${i}`,
      lastFiredAt: Date.now(),
    }));

    setMonster(newMonster);
    setTowers(newTowers);
    setIsPlaying(true);
    setIsPaused(false);
    setHasWon(false);
    setHasLost(false);
    setScreen('game');
  };

  const handleWin = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsPlaying(false);
    setHasWon(true);
    setScreen('result');

    const newStats = {
      highestLevel: Math.max(stats.highestLevel, currentLevel),
      gamesPlayed: stats.gamesPlayed + 1,
    };
    saveStats(newStats);
  };

  const handleLose = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setIsPlaying(false);
    setHasLost(true);
    setScreen('result');

    const newStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
    };
    saveStats(newStats);
  };

  const nextLevel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentLevel < LEVELS.length) {
      setCurrentLevel(currentLevel + 1);
      setScreen('select');
    } else {
      setScreen('menu');
    }
  };

  const retry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setScreen('select');
  };

  const backToMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setScreen('menu');
    setCurrentLevel(1);
  };

  // Menu Screen
  if (screen === 'menu') {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.exitButton} onPress={onExit}>
            <Text style={styles.exitText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.menuContent}>
            <Text style={styles.title}>🏰 Reverse Tower</Text>
            <Text style={styles.subtitle}>Break Through the Defense!</Text>

            <View style={styles.statsCard}>
              <Text style={styles.statsText}>Highest Level: {stats.highestLevel}</Text>
              <Text style={styles.statsText}>Games Played: {stats.gamesPlayed}</Text>
            </View>

            <TouchableOpacity style={styles.playButton} onPress={() => setScreen('select')}>
              <Text style={styles.playButtonText}>Start Game</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen('howto')}>
              <Text style={styles.secondaryButtonText}>How to Play</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // How to Play Screen
  if (screen === 'howto') {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.exitButton} onPress={() => setScreen('menu')}>
            <Text style={styles.exitText}>←</Text>
          </TouchableOpacity>

          <ScrollView style={styles.howtoScroll} contentContainerStyle={styles.howtoContent}>
            <Text style={styles.howtoTitle}>How to Play</Text>

            <View style={styles.howtoSection}>
              <Text style={styles.howtoHeading}>🎯 Objective</Text>
              <Text style={styles.howtoText}>
                You are the MONSTER! Your goal is to reach the end of the path without getting destroyed by the towers.
              </Text>
            </View>

            <View style={styles.howtoSection}>
              <Text style={styles.howtoHeading}>🏃 Monster Types</Text>
              <Text style={styles.howtoText}>
                🏃 Runner: Fast but fragile (Speed: High, Health: Low){'\n'}
                🛡️ Tank: Slow but tanky (Speed: Low, Health: High){'\n'}
                🥷 Ninja: Balanced stats (Speed: Medium, Health: Medium)
              </Text>
            </View>

            <View style={styles.howtoSection}>
              <Text style={styles.howtoHeading}>🏰 Towers</Text>
              <Text style={styles.howtoText}>
                Red towers will attack you if you're in their range (shown as red circles). Different towers have different damage and fire rates.
              </Text>
            </View>

            <View style={styles.howtoSection}>
              <Text style={styles.howtoHeading}>💡 Strategy</Text>
              <Text style={styles.howtoText}>
                Choose the right monster type for each level. Runners can dodge damage by speed, Tanks can survive heavy fire, and Ninjas are versatile.
              </Text>
            </View>

            <TouchableOpacity style={styles.playButton} onPress={() => setScreen('menu')}>
              <Text style={styles.playButtonText}>Got It!</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Monster Selection Screen
  if (screen === 'select') {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity style={styles.exitButton} onPress={() => setScreen('menu')}>
            <Text style={styles.exitText}>←</Text>
          </TouchableOpacity>

          <View style={styles.selectContent}>
            <Text style={styles.levelTitle}>Level {currentLevel}</Text>
            <Text style={styles.levelName}>{level.name}</Text>

            <Text style={styles.selectTitle}>Choose Your Monster</Text>

            <View style={styles.monsterGrid}>
              {(Object.keys(MONSTER_STATS) as MonsterType[]).map((type) => {
                const stat = MONSTER_STATS[type];
                const isSelected = selectedMonsterType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.monsterCard, isSelected && styles.monsterCardSelected]}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setSelectedMonsterType(type);
                    }}
                  >
                    <Text style={styles.monsterEmoji}>{stat.emoji}</Text>
                    <Text style={styles.monsterName}>{stat.name}</Text>
                    <Text style={styles.monsterStat}>Speed: {stat.speed}</Text>
                    <Text style={styles.monsterStat}>Health: {stat.health}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.playButton} onPress={startGame}>
              <Text style={styles.playButtonText}>Start Level {currentLevel}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Result Screen
  if (screen === 'result') {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.resultContent}>
            <Text style={styles.resultEmoji}>{hasWon ? '🎉' : '💥'}</Text>
            <Text style={styles.resultTitle}>{hasWon ? 'Victory!' : 'Defeated!'}</Text>
            <Text style={styles.resultSubtitle}>
              {hasWon ? `You broke through Level ${currentLevel}!` : 'The towers destroyed you!'}
            </Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={retry}>
                <Text style={styles.secondaryButtonText}>Retry</Text>
              </TouchableOpacity>

              {hasWon && currentLevel < LEVELS.length && (
                <TouchableOpacity style={styles.playButton} onPress={nextLevel}>
                  <Text style={styles.playButtonText}>Next Level</Text>
                </TouchableOpacity>
              )}

              {hasWon && currentLevel >= LEVELS.length && (
                <TouchableOpacity style={styles.playButton} onPress={backToMenu}>
                  <Text style={styles.playButtonText}>🏆 You Win!</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.secondaryButton} onPress={backToMenu}>
              <Text style={styles.secondaryButtonText}>Main Menu</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Game Screen
  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Top UI */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.pauseButton} onPress={() => setScreen('menu')}>
            <Text style={styles.pauseText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.levelIndicator}>Level {currentLevel}</Text>
        </View>

        {/* Health Bar */}
        <HealthBar current={monsterHealth} max={monster?.maxHealth || 100} />

        {/* Game Field */}
        <View style={styles.gameField}>
          <View style={[styles.field, { width: GRID_WIDTH, height: GRID_HEIGHT }]}>
            <PathComponent path={level.path} width={GRID_WIDTH} height={GRID_HEIGHT} />

            {towers.map((tower) => (
              <TowerComponent key={tower.id} tower={tower} />
            ))}

            {monster && (
              <MonsterComponent
                position={monsterPosition}
                emoji={MONSTER_STATS[selectedMonsterType].emoji}
                size={40}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  exitText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#E8E8E8',
    marginBottom: 40,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    width: '80%',
  },
  statsText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 4,
  },
  playButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginVertical: 8,
    minWidth: 200,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  howtoScroll: {
    flex: 1,
  },
  howtoContent: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  howtoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  howtoSection: {
    marginBottom: 24,
  },
  howtoHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 8,
  },
  howtoText: {
    fontSize: 16,
    color: '#E8E8E8',
    lineHeight: 24,
  },
  selectContent: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  levelName: {
    fontSize: 18,
    color: '#3498DB',
    marginBottom: 30,
  },
  selectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  monsterGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  monsterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  monsterCardSelected: {
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 0.2)',
  },
  monsterEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  monsterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  monsterStat: {
    fontSize: 12,
    color: '#E8E8E8',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pauseButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  levelIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  gameField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  resultSubtitle: {
    fontSize: 18,
    color: '#E8E8E8',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
});

export default ReverseTower;
