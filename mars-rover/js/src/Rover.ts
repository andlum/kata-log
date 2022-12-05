import Grid from './Grid';
import { location, movements } from './types';
import { LEFT, FORWARD, NORTH, SOUTH, EAST, WEST, DIRECTIONS } from './constants';

const simulate = (grid: Grid, start: location, commands: Array<movements>) => {
  const locations: Array<location> = [start]

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const currentLocation = locations[locations.length - 1];
    const newLocation = move(command, currentLocation);

    if (!grid.valid(newLocation)) {
      const { x, y, direction } = currentLocation;

      return `(${x}, ${y}, ${direction}) LOST`
    } else {
      locations.push(newLocation);
    }
  }

  const { x, y, direction } = locations[locations.length - 1];

  return `(${x}, ${y}, ${direction})`
}

const move = (command: movements, currentLocation: location) => {
  if (command === FORWARD) {
    return advance(currentLocation);
  } else {
    return  turn(currentLocation, command);
  }
}

const advance = (currentLocation: location): location => {
  let { x, y, direction } = currentLocation;

  switch (direction) {
    case NORTH:
      y = y + 1;
      break;
    case EAST:
      x = x + 1;
      break;
    case SOUTH:
      y = y - 1;
      break;
    case WEST:
      x = x - 1;
      break;
  }

  return { x, y, direction }
}

const turn = (currentLocation: location, command: movements): location => {
  const { direction } = currentLocation;

  const rotation = command === LEFT ? -1 : 1;
  const newIndex = mod(DIRECTIONS.indexOf(direction) + rotation, DIRECTIONS.length)

  return {
    ...currentLocation,
    direction: DIRECTIONS[newIndex]
  }
}

// % in js is the remainder operator, not modulo because of how it treats negative numbers
function mod(n:number, m: number) {
  return ((n % m) + m) % m;
}

export default { simulate };
