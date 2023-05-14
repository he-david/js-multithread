const { parentPort, workerData } = require('worker_threads');

let sum = 0;
for (let i = 0; i < 1_000_000_000; i++) {
  sum += i;
}
parentPort.postMessage({ result: workerData.name, sum });
