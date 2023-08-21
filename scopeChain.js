// // there is another variable with foo name in the function too, so a foo variable with undefinde value get intialized in memory component of execution context of this function
// var foo = 1;
// (function () {
//   console.log(foo); //foo variable with undefined value is present memory component of execution context of this function
//   foo = 2; // this function's foo becomes 2
//   console.log(window.foo); //outer/window foo still remains 1
//   console.log(foo); // this function's foo is 2 
//   var foo = 3; // this function's foo becomes 3
//   console.log(foo); // this function's foo is 3
//   console.log(window.foo) //outer/window foo is still  1
// })();



function print() {
  console.log("a", a) //it will look for b in its local memory of print function Execution context, if not found, it will look in its parent lexical environment, which is Global Execution context
}

// print(); //undefined
var a = 10;
print();



function print2() {
  console.log("b", b)
}

// print2(); //error // because let is not hoisted the way var is hoisted
let b = 20;
print2(); 



function print3() {
  var c = 30;
} 

// console.log("c", c) //error // because c is defined in local memory of print3 function's Execution context, and it is not accessible outside of it

console.log(this) //undefined