import { location } from './types';

export class Grid {
  width: number;
  length: number;

  constructor (m: number, n: number) {
    this.width = m;
    this.length = n;
  }

  public valid = (coordinates: location): Boolean => {
    const { x, y } = coordinates;

    if (x < 0 || x > this.width) {
      return false
    }

    if (y < 0 || y > this.length) {
      return false;
    }

    return true;
  }
}

export default Grid;
