// reverse-tower/components/PathComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Position } from '../types';

interface Props {
  path: Position[];
  width: number;
  height: number;
}

export const PathComponent: React.FC<Props> = ({ path, width, height }) => {
  const pathString = path.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Path d={pathString} stroke="#3498DB" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />
    </Svg>
  );
};
