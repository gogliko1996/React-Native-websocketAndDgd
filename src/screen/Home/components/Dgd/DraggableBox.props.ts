import { Animated } from "react-native";

export type Zone = "todo" | "done" | "inProgres";

export interface Box {
  status: string | Zone;
  pan: Animated.ValueXY;
  color?: string;
  title: string;
  description: string;
  startStatus?: string | null;
  id?: number;
  userId?: string;
}
