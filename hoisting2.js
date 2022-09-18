// there is another variable with foo name in the function too, so a foo variable with undefinde value get intialized in memory component of execution context of this function
var foo = 1;
(function () {
  console.log(foo); //foo variable with undefined value is present memory component of execution context of this function
  foo = 2; // this function's foo becomes 2
  console.log(window.foo); //outer/window foo still remains 1
  console.log(foo); // this function's foo is 2 
  var foo = 3; // this function's foo becomes 3
  console.log(foo); // this function's foo is 3
  console.log(window.foo) //outer/window foo is still  1
})();




































//ans
// undefined
// 1
// 2
// 3
// 1