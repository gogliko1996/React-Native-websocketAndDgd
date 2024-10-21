import {scaled} from './scaler';

/* The spacing scale is a base-8 scale. */
const COEFFICIENT = scaled(8);

export const themeSpacing = (value: number) => value * COEFFICIENT;

export const spacer = (...args: number[]): string => {
  if (args.length > 4) {
    throw new Error('Invalid number of args');
  }

  return args.map(value => `${themeSpacing(value)}px`).join(' ');
};