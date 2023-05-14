const { parentPort, workerData } = require('worker_threads');

const name = workerData.name;
const arr = new Int32Array(workerData.buffer);
// const local = [];

// for (let i = 0; i < 100; i++) {
//   local.push(0);
// }

// let counter = 0;

for (let j = 0; j < arr.length; j++) {
  // const curr = arr[j];
  // arr[j] = curr + 1;
  for (let i = 0; i < 1_000_000; i++) {
    const curr = arr[j];
    arr[j] = curr + 1;
    console.log(name, i, j);
    // const curr = local[j];
    // local[j] = curr + 1;
    // counter++;
  }
}
parentPort.postMessage('finito');
