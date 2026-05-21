/*
memory component of execution context: before the code executes, all variables and functions defined are stored in key-value pair in memory component/part of execution context

hoisting: the phenomenon of moving all the variables & function declartation/definition at top of their scope, before executing the code is k/n as hoisting

varaibles defined with var and function declaration are hoisted
var takes undefined value and function contains its code

let and const are also hoisted, in a different way: they are in temporal dead zone (TDZ) for the time being
Temporal Dead Zone exists until variable is declared and assigned a value.

let & const is block scoped, means it is not accessible outside of the block, but var can be accessible.
var is function scoped.
*/

// var a = 1;
// let b = 2;

// console.log(a, b, c, d, e, f)

// function c() {
//     console.log("c")
// }

// var d = function() {
//     console.log("d")
// }

// class e {
//     e = "e"
// }

// let f = function() {
//     console.log("f")
// }




/*------------------- prblm ---------------------*/
// // in node.js this behaves slighly different than in browser. therefore result may differ. so better to test in browser
// let obj = { a: 1 }
// var a = 1;
// function ka() {
//     console.log("a + this.a", a + this.a);
//     var a = "2";
//     console.log("a + this.a", a + this.a);
// }
// ka();
// ka.call(obj);
