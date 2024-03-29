//When using > to compare two operands, if either operand is a number, Javascript will first convert the string to its equivalent number and then numerically compare.

//Only when both operands are string, they are compared lexicographically. i.e. character by character until they are not equal or there aren't any characters left. The first character of '10' is less than the first character of '9' hence '10' is < '9'

//The Math.max() and Math.min() functions return NaN if any parameter isn't a number and can't be converted into one (of course NaN cannot be converted into a number).

// console.log('10' > 9) // true
// console.log(10 > '9') // true
// console.log('10' > '9') // false

// console.log(undefined == undefined) // true
// console.log(undefined === undefined) // true
// console.log(null == undefined) // true
// console.log(null === undefined) // false



// 1. and 2. NaN compares unequal (via both == and ===) to any other value including to another NaN value.
// 3. Object.is() determines whether two values are the same value and returns true when we compare NaN
// 4. and 5. indexOf uses Strict Equality Comparison and thus [NaN].indexOf(NaN) === -1 , array.includes uses SameValueZero comparison algorithm , thus making [NaN].includes(NaN) true.
// 6. , 7, 8 and 9 The Math.max() and Math.min() functions return NaN if any parameter isn't a number and can't be converted into one (of course NaN cannot be converted into a number).

// console.log(NaN == NaN) // false
// console.log(NaN === NaN) // false
// console.log(Object.is(NaN, NaN)) // true
// console.log([NaN].indexOf(NaN)) // -1
// console.log([NaN].includes(NaN)) // true
// console.log(Math.max(NaN, 1)) // NaN
// console.log(Math.min(NaN, 1)) // NaN
// console.log(Math.min(NaN, Infinity)) // NaN
// console.log(Math.max("any string", 1)) // NaN



//The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. The return value is a boolean value.
console.log("Function instanceof Object", Function instanceof Object)
console.log("Object instanceof Function", Object instanceof Function)
console.log("Function instanceof Function", Function instanceof Function)
console.log("Object instanceof Object", Object instanceof Object)

//array index can go from 0 to 2^32 - 2


//Array.sort expects a compare function that defines the sort order. 
//If omitted, the array elements are converted to strings, then sorted according lexicographically
//i.e [999, 1111, 111, 2, 0] will become [0,111,1111,2,999]



var hi = 10;
function hello() {
    // hi = 20
    var hi = 20;
    hi = 40;
}
hello()
console.log("hi", hi)

