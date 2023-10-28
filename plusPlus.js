// example 1
console.log(1 + 1)
console.log(1 + + 1)
console.log(1 + + 1 + 1)
console.log(1 + + 1 + + 1)
console.log(1 + + + 1)

console.log(1 + + '1' + + '1')
console.log('1' + + '1' + + '1')
console.log('a' + + 'b')
console.log('a' + + 'b' + 'c')
console.log('a' + + 'b' + + 'c')


// In mathematical operators, + works on both numbers and strings (used in string concatenation). 
// Hence, if any of the operands is not a number, using + converts all operand/s to string and concatenates.
console.log('1' + + '1' + + '1') // "1" + (+'1') + (+'1') = "1" + 1 + 1 = "1" + "1" + "1" = "111"
console.log('a' + + 'b') // "a" + (+'b') = a + "NaN" = "aNaN"


// example 2
let a = 1
console.log(a++ + a)

let b = 1
console.log(b + + + b)

let c = 1
console.log(c-- - c)

let d = 1
console.log(d - - - d)

/*
let a = 1
console.log(a +++ a) // 3
// (a++  + a) = 1 + 2 = 3 (Note that a after + gets incremented)

let b = 1
console.log(b + + + b) // 2
// (1 + +(+1)) = (1 + +1) = 1 + 1 = 2


let c = 1
console.log(c --- c) // 1
// (c--  - c) = 1 - 0 = 1 (Note that c after - gets decremented)

let d = 1
console.log(d - - - d) // 0
// (1 - -(-1)) = (1 - 1) = 0
*/
