const { isMainThread, Worker, workerData, parentPort } = require('worker_threads');

if (isMainThread) {
  const buffer = new SharedArrayBuffer(4 * 100_000);
  const arr = new Int32Array(buffer);

  console.log(arr.length);

  const loop = (resolve, name) => {
    const worker = new Worker(__filename, { workerData: { name, buffer } });
    worker.on('message', resolve);
  };

  console.time('async');

  const promises = [
    new Promise((resolve) => loop(resolve, 'worker-1')),
    new Promise((resolve) => loop(resolve, 'worker-2')),
    new Promise((resolve) => loop(resolve, 'worker-3')),
    new Promise((resolve) => loop(resolve, 'worker-4')),
  ];

  Promise.all(promises).then(() => {
    console.timeEnd('async');
    console.log(arr[0]);
  });
} else {
  const arr = new Int32Array(workerData.buffer);

  for (let i = 0; i < 1_000_000_000; i++) {
    const tmp = arr[i % 100_000];
    arr[i % 100_000] = 1 + tmp;
  }
  parentPort.postMessage('finito');
}

// TODO HEDA maybe because arr.length makes difference? NO
