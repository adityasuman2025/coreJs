// before the code executes, all variables and functions defined are stored in key-value pair in memory component/part of execution context

// the phenomenon of moving all the variables & function declartation/definition at top of their scope, before executing the code is k/n as hoisting
// varaibles defined with var and function declaration are hoisted
// var takes undefined value and function contains its code

// let and const are also hoisted (in a different way: they are in temporal dead zone for the time being)
// Temporal Dead Zone exists until variable is declared and assigned a value.

// let & const is block scoped, means it is not accessible outside of the block, but var can be accessible.
// var is function scoped.

console.log("a", a, c, d)
//here b, e and f will give reference error because they are hoisted in a different way, they exist in temporal dead zone

var a = 1;
let b = 2;

function c() {
    console.log("c")
}

var d = function() {
    console.log("d")
}

let e = function() {
    console.log("e")
}

class f {
    f = "f"
}

console.log("a", a, b, c, d, e, f)
// console.log("a", b)


var a = 1;
(function () {
  // 'var a = 2' is hoisted here -> var a = undefined
  // 'this.a' is number -> this.a = 1 (undefined + number -> NaN)
  console.log(a + this.a); // NaN
  var a = "2";
  console.log(a + this.a); // "21"
})();

var name = 1;
(function () {
  // 'var name = 2' is hoisted here -> var name = undefined
  /* Any global variable named `name` overwrites `window.name` pproperty.
  Also, before overwriting, value of `name` variable is passed to `String`
  to convert it to string and then it is overwritten. Since `symbol` can't be converted to 
  string thus if we declare global variable `name` as symbol then while converting it 
  to `string`, TypeError will be thrown.
   */
  // 'this.name' is string -> this.name = "1" (undefined + string -> "undefinedString")
  console.log(name + this.name); // "undefined1"
  var name = "2";
  console.log(name + this.name); "21"
})();