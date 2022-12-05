import Grid from "./Grid"
import Rover from "./Rover";

// Wrapper for Mars Rover functions
export const mission = (input: Array<String>) => {
  const [firstLine, ...otherLines] = input;

  const [m, n] = parseGridLine(firstLine);
  const grid = new Grid(m, n);

  const output = otherLines.map(line => {
    const { location: start, commands }  = parseRoverLine(line);

    return Rover.simulate(grid, start, commands);
  })

  return output;
}

// Dimensions lines consist numbers delimited by a space like:
// > 4 8
const parseGridLine = (input: String) => {
  return input.split(' ').map(Number)
}

// Rover lines consist of starting coordinates + orientation and a series of commands
const parseRoverLine = (input: String) => {
  const [x, y, direction, commands] = input.split(/[\,,\(,\),\s]/).filter(element => element);

  return {
    location: {
      x: Number(x),
      y: Number(y),
      direction
    },
    commands: commands.split('')
  }
}
