import { DIRECTIONS, MOVEMENTS } from './constants';

export type location = {
  x: number,
  y: number,
  direction: typeof DIRECTIONS[number]
}

export type movements = typeof MOVEMENTS[number];
