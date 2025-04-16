let bruteForceIterations = 0;

function editDistanceRecursive(s1, s2, i = 0, j = 0) {
  bruteForceIterations++;

  if (i === s1.length) return s2.length - j;
  if (j === s2.length) return s1.length - i;

  if (s1[i] === s2[j]) {
    return editDistanceRecursive(s1, s2, i + 1, j + 1);
  }

  const insertOp = 1 + editDistanceRecursive(s1, s2, i, j + 1);
  const deleteOp = 1 + editDistanceRecursive(s1, s2, i + 1, j);
  const replaceOp = 1 + editDistanceRecursive(s1, s2, i + 1, j + 1);

  return Math.min(insertOp, deleteOp, replaceOp);
}

function editDistanceDP(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  let dpIterations = 0;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    dpIterations++;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    dpIterations++;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dpIterations++;
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return { distance: dp[m][n], iterations: dpIterations };
}

const testCases = [
  {
    s1: "Casablanca",
    s2: "Portentoso",
  },
  {
    s1:
      "Maven, a Yiddish word meaning accumulator of knowledge, began as an attempt to " +
      "simplify the build processes in the Jakarta Turbine project. There were several" +
      " projects, each with their own Ant build files, that were all slightly different." +
      "JARs were checked into CVS. We wanted a standard way to build the projects, a clear " +
      "definition of what the project consisted of, an easy way to publish project information" +
      "and a way to share JARs across several projects. The result is a tool that can now be" +
      "used for building and managing any Java-based project. We hope that we have created " +
      "something that will make the day-to-day work of Java developers easier and generally help " +
      "with the comprehension of any Java-based project.",
    s2:
      "This post is not about deep learning. But it could be might as well. This is the power of " +
      "kernels. They are universally applicable in any machine learning algorithm. Why you might" +
      "ask? I am going to try to answer this question in this article." +
      "Go to the profile of Marin Vlastelica Pogančić" +
      "Marin Vlastelica Pogančić Jun",
  },
];

testCases.forEach(({ s1, s2 }, index) => {
  console.log(`\n Caso ${index + 1}:`);

  if (s1.length <= 20 && s2.length <= 20) {
    bruteForceIterations = 0;
    const bruteResult = editDistanceRecursive(s1, s2);
    console.log(
      `Força Bruta -> Distância: ${bruteResult}, Iterações: ${bruteForceIterations}`
    );
  } else {
    console.log("Força Bruta -> Ignorado (strings muito grandes)");
  }

  const dpResult = editDistanceDP(s1, s2);
  console.log(
    `Prog. Dinâmica -> Distância: ${dpResult.distance}, Iterações: ${dpResult.iterations}`
  );
});
