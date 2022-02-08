const d4 = [1, 2, 3, 4];
const d6 = [1, 2, 3, 4, 5, 6];
const d8 = [1, 2, 3, 4, 5, 6, 7, 8];
const d10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const d12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const d20 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

function testDistribution(distribution: Record<number, string>) {
  const numberOfTests = 10000;
  const results: Record<number, number> = {};

  for (let i = 0; i < numberOfTests; i++) {
    const firstResult = rollDice(d8);
    const secondResult = rollDice(d12);
    const endResult = firstResult + secondResult;

    const currentCount = results[endResult] || 0;
    results[endResult] = currentCount + 1;
  }

  const valuePercentage = Object.keys(results).reduce((acc, curr) => {
    const value = results[curr as unknown as number];
    return {
      ...acc,
      [curr]: Math.ceil((value / numberOfTests) * 100),
    };
  }, {} as Record<number, number>);

  const asdasd = Object.keys(distribution).reduce(
    (acc: Record<string, number>, curr) => {
      const label = distribution[curr as unknown as number];

      const percentage = valuePercentage[curr as unknown as number];
      return {
        ...acc,
        [label]: (acc[label] || 0) + percentage,
      };
    },
    {}
  );

  return asdasd;
}

function rollDice(dice: Array<number>) {
  const result = Math.floor(Math.random() * dice.length);
  return dice[result];
}

console.log(
  JSON.stringify(
    testDistribution({
      // 1: "failure",
      2: "failure",
      3: "failure",
      4: "failure",
      5: "failure",
      6: "failure",
      7: "mixed success",
      8: "mixed success",
      9: "mixed success",
      10: "success",
      11: "success",
      12: "success",
      13: "success",
      14: "success",
      15: "success",
      16: "success",
      17: "success",
      18: "success",
      19: "success",
      20: "critical success",
    }),
    null,
    2
  )
);
