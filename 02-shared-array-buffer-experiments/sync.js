const buffer = new SharedArrayBuffer(100 * 4);

const arr = new Int32Array(buffer);

console.time('single');
// let counter = 0;

const loop = (resolve) => {
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < 25_000_000; i++) {
      const curr = arr[j];
      arr[j] = curr + 1;
      // counter++;
    }
  }
  resolve();
};

const promises = [
  new Promise((resolve) => loop(resolve)),
  new Promise((resolve) => loop(resolve)),
  new Promise((resolve) => loop(resolve)),
  new Promise((resolve) => loop(resolve)),
];

Promise.all(promises).then(() => {
  console.timeEnd('simgle');
  console.log(arr.reduce((sum, val) => sum + val, 0));
});

// console.timeEnd('single');

// console.log(arr.reduce((sum, val) => sum + val, 0));
