const fs = require('fs');
const crypto = require('crypto');


const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;


setTimeout(() => console.log('Timer One'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");

  setTimeout(() => console.log("Timer Two"), 0);
  setTimeout(() => console.log("Timer Three"), 0);

  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log('Process.NextTrick...'));

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
    console.log(Date.now() - start + ' Password encrypted...:)');
  });

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
    console.log(Date.now() - start + ' Password encrypted...:)');
  });

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
    console.log(Date.now() - start + ' Password encrypted...:)');
  });

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () =>{
    console.log(Date.now() - start + ' Password encrypted...:)');
  });
});

console.log('Hello from top level display');