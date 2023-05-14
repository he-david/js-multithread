const sum = (resolve, name) => {
  let sum = 0;

  for (let i = 0; i < 1_000_000_000; i++) {
    sum += i;
  }
  resolve(`Promise ${name} sum: ${sum}`);
};

const problematicPromiseAll = () => {
  console.time('timer');

  const promises = [
    new Promise((resolve) => sum(resolve, 'Promise-1')),
    new Promise((resolve) => sum(resolve, 'Promise-2')),
    new Promise((resolve) => sum(resolve, 'Promise-3')),
    new Promise((resolve) => sum(resolve, 'Promise-4')),
  ];

  Promise.all(promises).then((results) => {
    console.log(results);
    console.timeEnd('timer');
  });
};

const notProblematicPromiseAll = () => {
  console.time('timer2');

  const promises = [
    new Promise((resolve) => setTimeout(() => resolve('Promise 1 finished'), 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 1 finished'), 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 1 finished'), 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Promise 1 finished'), 1000)),
  ];

  Promise.all(promises).then((results) => {
    // TODO HEDA check, if Promise.all is sync -> does it do context switching between the tasks?
    console.log(results);
    console.timeEnd('timer2');
  });
};

// When the tasks are CPU intensieve -> Promise.all shows its sync execution!
problematicPromiseAll(); // ~5.514s
notProblematicPromiseAll();

// console.time('timer3');
// sum(() => {}, 'asd');
// sum(() => {}, 'asd');
// sum(() => {}, 'asd');
// console.timeEnd('timer3'); // ~ 5.423s
