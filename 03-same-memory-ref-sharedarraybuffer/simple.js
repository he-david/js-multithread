const { isMainThread, Worker, workerData, parentPort } = require('worker_threads');

if (isMainThread) {
  const buffer = new SharedArrayBuffer(4); // 0x01a57eed6e40
  const arr = new Int32Array(buffer);
  const buffer2 = new SharedArrayBuffer(4); // 0x01a57eed6f50
  arr[0] = 0;
  console.log('before', arr[0]);
  const worker = new Worker(__filename, { workerData: { buffer, buffer2 } });

  worker.on('message', () => console.log('after', arr[0]));
} else {
  const buffer = workerData.buffer; // 0x01a57eed6e40
  const buffer2 = workerData.buffer2; // 0x01a57eed6f50
  const arr = new Int32Array(buffer);
  arr[0] = 10;
  parentPort.postMessage('message');
}
