import { Animated } from "react-native";

export type Zone = 'zone1' | 'zone2' | 'zone3';

export interface Box {
    id: number;
    zone: Zone;
    pan: Animated.ValueXY;
    color?: string;
  };