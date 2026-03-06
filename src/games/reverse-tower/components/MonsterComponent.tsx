// reverse-tower/components/MonsterComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Position } from '../types';

interface Props {
  position: Position;
  emoji: string;
  size: number;
}

export const MonsterComponent: React.FC<Props> = ({ position, emoji, size }) => {
  return (
    <View style={[styles.container, { left: position.x - size / 2, top: position.y - size / 2, width: size, height: size }]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
  },
});
