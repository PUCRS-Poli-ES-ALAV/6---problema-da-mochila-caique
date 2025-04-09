const { performance } = require("perf_hooks");

let memoCalls = 0;
let recCalls = 0;

function fiboRec(n) {
  recCalls++;
  if (n <= 1) return n;
  return fiboRec(n - 1) + fiboRec(n - 2);
}

function fibo(n) {
  const f = [0, 1];
  for (let i = 2; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
}

function memoizedFibo(n) {
  const f = Array(n + 1);
  f[0] = 0;
  f[1] = 1;
  memoCalls = 2;

  for (let i = 2; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
    memoCalls++;
  }

  return f[n];
}

function testRec(n) {
  recCalls = 0;
  const start = performance.now();
  const result = fiboRec(n);
  const end = performance.now();
  return { result, time: end - start, calls: recCalls };
}

function testIter(n) {
  const start = performance.now();
  const result = fibo(n);
  const end = performance.now();
  return { result, time: end - start };
}

function testMemo(n) {
  memoCalls = 0;
  const start = performance.now();
  const result = memoizedFibo(n);
  const end = performance.now();
  return { result, time: end - start, calls: memoCalls };
}

function testFibonacci() {
  const smallValues = [4, 8, 16, 32];
  const largeValues = [128, 1000, 10000];
  const results = [];

  smallValues.forEach((n) => {
    const resultRec = testRec(n);
    const resultIter = testIter(n);
    const resultMemo = testMemo(n);

    results.push({
      n,
      "Rec (ms)": resultRec.time.toFixed(4),
      "Rec Calls": resultRec.calls,
      "Iter (ms)": resultIter.time.toFixed(4),
      "Memo (ms)": resultMemo.time.toFixed(4),
      "Memo Calls": resultMemo.calls,
      Resultado: resultIter.result,
    });
  });

  largeValues.forEach((n) => {
    const resultIter = testIter(n);
    const resultMemo = testMemo(n);

    results.push({
      n,
      "Rec (ms)": "N/A",
      "Rec Calls": "N/A",
      "Iter (ms)": resultIter.time.toFixed(4),
      "Memo (ms)": resultMemo.time.toFixed(4),
      "Memo Calls": resultMemo.calls,
      Resultado: resultIter.result,
    });
  });

  return results;
}

function displayResults() {
  const results = testFibonacci();
  console.table(results);
}

displayResults();
