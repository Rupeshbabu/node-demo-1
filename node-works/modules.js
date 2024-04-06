// console.log(arguments);
// console.log(require('module').wrapper);

//module.exports
const calculator = require('./test-module-1');
const calcu1 = new calculator();
console.log(calcu1.add(2,9));

//exports
// const calcu2 = require('./test-module-2');
const {add, multiply, divide} = require('./test-module-2');
console.log(multiply(2,2));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
