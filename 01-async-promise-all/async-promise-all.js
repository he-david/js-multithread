const { Worker } = require('worker_threads');

const sum = (resolve, name) => {
  const worker = new Worker('./worker.js', { workerData: { name } });
  worker.on('message', resolve);
};

const problematicPromiseAll = () => {
  console.time('timer');

  const promises = [
    new Promise((resolve) => sum(resolve, 'Promise-1')),
    new Promise((resolve) => sum(resolve, 'Promise-2')),
    new Promise((resolve) => sum(resolve, 'Promise-3')),
    new Promise((resolve) => sum(resolve, 'Promise-3')),
  ];

  Promise.all(promises).then((results) => {
    console.log(results);
    console.timeEnd('timer');
  });
};

problematicPromiseAll(); // ~1.779s -> *3 = 5.337s
