// reverse-tower/components/HealthBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  current: number;
  max: number;
}

export const HealthBar: React.FC<Props> = ({ current, max }) => {
  const percentage = Math.max(0, (current / max) * 100);
  const color = percentage > 60 ? '#27AE60' : percentage > 30 ? '#F39C12' : '#E74C3C';

  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.text}>
        {Math.ceil(current)} / {max}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  barBackground: {
    width: '100%',
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
  },
});
