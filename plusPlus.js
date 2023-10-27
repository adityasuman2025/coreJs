
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