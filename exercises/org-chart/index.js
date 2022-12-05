ORG_CHART = {
  "joe": {
    "brad": {
      "nick": {
        "jordan": undefined,
      },
      "justin": {
        "antoine": {
          "dan": undefined,
          "matt": {
            "david": undefined
          }
        },
        "josh": undefined,
        "susan": undefined
      }
    },
    "camille": {
      "laurent": {
        "carol": undefined,
        "ina": undefined,
      },
      "tom": {
        "olivia": undefined,
        "charlotte": undefined
      }
    },
    "joe": undefined
  },
}

const findEmployee = (name) => {
  const { role, direct, total } = search(name, null, ORG_CHART);

  return `${role}, ${direct}, ${total}`
}

const countReports = (chart) => {
  const reports = Object.keys(chart);
  let total = reports.length;

  for (report in chart) {
    if (chart[report] !== undefined) {
      total += countReports(chart[report]);
    }
  }

  return total;
}

const search = (target, current, chart) => {
  if (target === current) {
    if (chart !== undefined) {
      const direct = Object.keys(chart).length;

      return {
        role: 'manager',
        direct,
        total: countReports(chart)
      }
    }

    return {
      role: 'ic',
      direct: 0,
      total: 0
    }
  }

  for (let report in chart) {
    const result = search(target, report, chart[report]);

    if (result !== null) return result;
  }

  return null;
}

const tests = [
  {
    find: "olivia",
    expected: "ic, 0, 0"
  },
  {
    find: "joe",
    expected: "ic, 0, 0"
  },
  {
    find: "camilla",
    expected: "manager, 2, 6"
  },
  {
    find: "radford",
    expected: "manager, 2, 9"
  },
]

const results = tests.map((test) => {
  try {
    const result = findEmployee(test['find']);
    test.result = result;
    test.success = result == test['expected'];
  } catch (e) {
    test.result = e.message;
    test.result = false;
  }

  return test
})

console.table(results)
