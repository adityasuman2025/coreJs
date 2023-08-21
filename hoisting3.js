//function/variable get hoisted even they are declared inside a if condition true or false
if (true) {
    var kaka = 5;
    function zzz() {
        console.log("zzz")
    }
}
console.log("kaka", kaka)
console.log("zzz", zzz)
// zzz() // will print "zzz"

/*
fn is a Conditionally Created Function whose behavior differs across browsers. In chrome, fn gets hoisted but since its undefined the if evaluates to true and fn() gets defined printing "2" later

fn1 is declared twice (both outside and inside IIFE). However, inside the IIFE because of Hoisting fn1 is actually undefined hence if evaluates to true and fn1 gets redeclared 👉🏻 prints "4"

fn3 gets hoisted too, however the difference is this time if is using false so it never gets inside it and fn3 remains undefined. Executing fn3() thus throws Uncaught TypeError: fn3 is not a function
*/

// (() => {
//   // var fn;  Because of Hoisting
//   if (!fn) {
//     function fn() {
//       console.log('2')
//     }
//   }
//   fn()
// })()

// function fn() {
//   console.log('1')
// }

// // another one
// function fn1() {
//   console.log('3')
// }

// (() => {
//   // var fn1; Because of Hoisting
//   if (!fn1) {
//     function fn1() {
//       console.log('4')
//     }
//   }
//   fn1()
// })()


// // another one!
// (() => {
//   // var fn3; Because of Hoisting
//   if (false) {
//     function fn3() {
//       console.log('5')
//     }
//   }
//   fn3()
// })()

// "2"
// "4"
// Error

{
  var ada = 31;
}
console.log("ada", ada)

console.log("ka", ka)
for (var ka = 1; ka<5; ka++) {

}
console.log("ka", ka)