function knapsackBruteForce(N, C, items) {
  let maxValue = 0;
  let bestCombination = [];
  let iterations = 0;

  const totalCombinations = Math.pow(2, N);

  for (let i = 0; i < totalCombinations; i++) {
    iterations++;
    let currentWeight = 0;
    let currentValue = 0;
    let currentCombination = [];

    for (let j = 0; j < N; j++) {
      iterations++;
      if (i & (1 << j)) {
        if (currentWeight + items[j].weight > C) {
          currentValue = -1;
          break;
        }
        currentWeight += items[j].weight;
        currentValue += items[j].value;
        currentCombination.push(j + 1);
      }
    }

    if (currentValue > maxValue) {
      maxValue = currentValue;
      bestCombination = currentCombination;
    }
  }

  return {
    maxValue: maxValue,
    bestCombination: bestCombination,
    iterations: iterations,
  };
}

function knapsackDynamicProgramming(N, C, items) {
  let iterations = 0;

  const dp = Array.from({ length: N + 1 }, () => new Array(C + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= C; j++) {
      iterations++;

      if (items[i - 1].weight <= j) {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          items[i - 1].value + dp[i - 1][j - items[i - 1].weight]
        );
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  let combination = [];
  let remainingCapacity = C;

  for (let i = N; i > 0; i--) {
    iterations++;
    if (dp[i][remainingCapacity] !== dp[i - 1][remainingCapacity]) {
      combination.push(i);
      remainingCapacity -= items[i - 1].weight;
    }
  }

  return {
    maxValue: dp[N][C],
    bestCombination: combination.reverse(),
    iterations: iterations,
  };
}

function testKnapsack() {
  const testCase1 = {
    N: 10,
    C: 165,
    items: [
      { weight: 23, value: 92 },
      { weight: 31, value: 57 },
      { weight: 29, value: 49 },
      { weight: 44, value: 68 },
      { weight: 53, value: 60 },
      { weight: 38, value: 43 },
      { weight: 63, value: 67 },
      { weight: 85, value: 84 },
      { weight: 89, value: 87 },
      { weight: 82, value: 72 },
    ],
  };

  const testCase2 = {
    N: 6,
    C: 190,
    items: [
      { weight: 56, value: 50 },
      { weight: 59, value: 50 },
      { weight: 80, value: 64 },
      { weight: 64, value: 46 },
      { weight: 75, value: 50 },
      { weight: 17, value: 5 },
    ],
  };

  const testCases = [testCase1, testCase2];

  const results = [];

  for (const testCase of testCases) {
    const bruteForceResult = knapsackBruteForce(
      testCase.N,
      testCase.C,
      testCase.items
    );
    const dpResult = knapsackDynamicProgramming(
      testCase.N,
      testCase.C,
      testCase.items
    );

    results.push({
      testCase: `N=${testCase.N}, C=${testCase.C}`,
      bruteForce: {
        maxValue: bruteForceResult.maxValue,
        combination: bruteForceResult.bestCombination,
        iterations: bruteForceResult.iterations,
      },
      dynamicProgramming: {
        maxValue: dpResult.maxValue,
        combination: dpResult.bestCombination,
        iterations: dpResult.iterations,
      },
    });
  }

  console.table(
    results.map((result) => ({
      "Caso de Teste": result.testCase,
      "Força Bruta - Valor Máximo": result.bruteForce.maxValue,
      "Força Bruta - Combinação": result.bruteForce.combination.join(", "),
      "Força Bruta - Iterações": result.bruteForce.iterations,
      "PD - Valor Máximo": result.dynamicProgramming.maxValue,
      "PD - Combinação": result.dynamicProgramming.combination.join(", "),
      "PD - Iterações": result.dynamicProgramming.iterations,
    }))
  );
}

testKnapsack();
