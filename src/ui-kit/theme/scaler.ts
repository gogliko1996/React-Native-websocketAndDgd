import {PixelRatio, Platform} from 'react-native';
import {WINDOW_WIDTH} from './dimensions';

// based on iphone 14 plus scale
const BASE_WIDTH = 428;
const SCALE = WINDOW_WIDTH / BASE_WIDTH;

export const scalePrecised = (size: number) => size * SCALE;

export const scaled = (size: number) => {
  const newPX = scalePrecised(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newPX));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newPX)) - 2;
  }
};

export const scaledPX = (px: number) => `${scaled(px)}px`;