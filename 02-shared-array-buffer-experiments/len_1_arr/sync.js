const buffer = new ArrayBuffer(4 * 100_000);
const arr = new Int32Array(buffer);

const loop = (resolve, name) => {
  for (let i = 0; i < 1_000_000_000; i++) {
    const tmp = arr[i % 100_000];
    arr[i % 100_000] = 1 + tmp;
  }
  console.log(name, arr[0]);
  resolve();
};

console.time('sync');
const promises = [
  new Promise((resolve) => loop(resolve, 'promise-1')),
  new Promise((resolve) => loop(resolve, 'promise-2')),
  new Promise((resolve) => loop(resolve, 'promise-3')),
  new Promise((resolve) => loop(resolve, 'promise-4')),
];

Promise.all(promises).then(() => {
  console.timeEnd('sync');
});
