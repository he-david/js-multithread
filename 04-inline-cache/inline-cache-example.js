function processPointOptimized(n, point) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += point.a;
  }
  return sum;
}

function processPointSlightlyOptimized(n, point) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += point.a;
  }
  return sum;
}

function processPointNotOptimized(n, point) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += point.a;
  }
  return sum;
}

(function main() {
  let warmup = 500;
  let n = 1_000_000_000;

  let p1 = {};
  let p2 = {};
  let p3 = {};

  p1.a = 1;
  p2.b = 2;
  p2.a = 1;
  p3.a = 1;

  let sum;
  let start, t1, t2, t3;

  sum = processPointOptimized(warmup, p1);
  start = new Date();
  sum = processPointOptimized(n, p3);
  t1 = new Date() - start;

  sum = processPointSlightlyOptimized(warmup, p2);
  sum = processPointSlightlyOptimized(warmup, { c: 1, b: 1, a: 1 });
  sum = processPointSlightlyOptimized(warmup, { x: 1, a: 1 });
  start = new Date();
  sum = processPointSlightlyOptimized(n, p1);
  t2 = new Date() - start;

  sum = processPointNotOptimized(warmup, p1);
  sum = processPointNotOptimized(warmup, { x: 2, a: 1 });
  sum = processPointNotOptimized(warmup, { x: 1, y: 3, a: 1 });
  sum = processPointNotOptimized(warmup, { x: 1, a: 1, y: 3 });
  sum = processPointNotOptimized(warmup, { d: 2, b: 1, a: 1 });
  start = new Date();
  sum = processPointNotOptimized(n, p2);
  t3 = new Date() - start;

  console.log(t1, t2, t3); // ~ 1000 1800 6000
})();
