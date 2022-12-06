/**
 * Calculate the number of edits (insertions, substitutions, or deletions)
 * needed to modify the source source string into the target string
 *
 * Assumptions
 *  - All strings are already lowercased
 *
 * @param  {string} source
 * @param  {string} target
 * @return {number}        number of edits
 */
const fuzzyMatch = (source = [], target = []) => {
  // instantiate a 2D array
  const matrix = Array(source.length + 1);

  // build first row
  matrix[0] = Array.from((" " + target).split("").keys())

  // build columns with index for first column
  for (let m=1; m < matrix.length; m++) {
    matrix[m] = [m, ...Array(target.length)];
  }

  for (let i=1; i < source.length + 1; i++) {
    for (let j=1; j < target.length + 1; j++) {
      const indicator = source[i] === target[j] ? 0 : 1

      if (indicator > 0) {
        matrix[i][j] = Math.min(
          matrix[i-1][j] + 1,
          matrix[i][j-1] + 1,
          matrix[i-1][j-1] + 1
        )
      } else {
        matrix[i][j] = matrix[i-1][j-1];
      }
    }
  }

  return matrix[source.length][target.length]
}

const tests = [
  {
    source: "sun",
    target: "saturn",
    expected: 3
  },
  {
    source: "newt",
    target: "new",
    expected: 1
  },
  {
    source: "dog",
    target: "dog",
    expected: 0
  },
  {
    source: "bat",
    target: "blade",
    expected: 3
  },
  {
    source: "helloworld",
    target: "hello world",
    expected: 1
  }
]

const results = tests.map((test) => {
  try {
    var result = fuzzyMatch(test["source"], test["target"])
    test.result = result;
    test.success = result == test["expected"]
  } catch (ex) {
    test.result = ex.message;
    test.success = false;
  }

  return test;
})

console.table(results);
