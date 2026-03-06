// reverse-tower/components/TowerComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tower } from '../types';

interface Props {
  tower: Tower;
}

export const TowerComponent: React.FC<Props> = ({ tower }) => {
  return (
    <>
      {/* Range circle */}
      <View
        style={[
          styles.range,
          {
            left: tower.position.x - tower.range,
            top: tower.position.y - tower.range,
            width: tower.range * 2,
            height: tower.range * 2,
            borderRadius: tower.range,
          },
        ]}
      />
      {/* Tower body */}
      <View style={[styles.tower, { left: tower.position.x - 15, top: tower.position.y - 15 }]}>
        <View style={styles.turret} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  range: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 100, 100, 0.3)',
    backgroundColor: 'rgba(255, 100, 100, 0.1)',
  },
  tower: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#E74C3C',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  turret: {
    width: 8,
    height: 8,
    backgroundColor: '#C0392B',
    borderRadius: 4,
  },
});
