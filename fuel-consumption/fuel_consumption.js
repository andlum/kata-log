/*
Given a list of consumption values and a list of timestamps that
correspond to the consumption values by index, get the total fuel
consumed (in kg) over a given time frame. For each time interval,
we consider the fuel consumption rate constant.

cons_values = [2, 5, 1, 3] // kg/hr
timestamps  = [0, 3, 5, 8]

*/

const consumption_rates = [2, 5, 1, 3] // kg/hr
const timestamps = [0, 3, 5, 8]

// Builds a fuel log for a specific ship
const constructFuelLog = (fuel_consumption, timestamps) => {
  const log = [];
  // starting at index = 1 because fuel_consumption[0] is applicable for timestamps[0, 1]
  let index = 1;

  for (let hour = 0; hour <= timestamps[timestamps.length - 1]; hour++) {
    if (hour === timestamps[index]) { index += 1 }
    log[hour] = fuel_consumption[index - 1];
  }

  return log;
}

// Return fuel consumption, given a ship's fuel log, over a period of time
const fuelConsumed = (log, start, end) => {
  if (start > end) {
    return -1;
  }

  return log
    .slice(start, end)
    .reduce((result, value) => result + value, 0);
}

const log = constructFuelLog(consumption_rates, timestamps)

console.log(19 === fuelConsumed(log, 0, 8))
console.log(6 === fuelConsumed(log, 0, 3))
console.log(15 === fuelConsumed(log, 2, 8))
