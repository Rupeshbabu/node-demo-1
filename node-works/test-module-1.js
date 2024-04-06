//methos 1
// class Calculator {
//     add(a, b){
//         return a + b;
//     }
//     multiply (a, b){
//         return a * b;
//     }
//     divide(a,b){
//         return a / b;
//     }
// }

// module.exports = Calculator;

//method 2
module.exports = class Calculator {
        add(a, b){
            return a + b;
        }
        multiply (a, b){
            return a * b;
        }
        divide(a,b){
            return a / b;
        }
    }