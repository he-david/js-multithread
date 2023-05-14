const { Worker } = require('worker_threads');

const buffer = new SharedArrayBuffer(100 * 4);
const arr = new Int32Array(buffer);

const loop = (resolve, name) => {
  const worker = new Worker('./worker.js', { workerData: { name, buffer } });
  worker.on('message', resolve);
};

console.time('multi');

const promises = [
  new Promise((resolve) => loop(resolve, 'worker-1')),
  new Promise((resolve) => loop(resolve, 'worker-2')),
  new Promise((resolve) => loop(resolve, 'worker-3')),
  new Promise((resolve) => loop(resolve, 'worker-4')),
];

Promise.all(promises).then(() => {
  console.timeEnd('multi');
  console.log(arr.reduce((sum, val) => sum + val, 0));
});
