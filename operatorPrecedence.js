console.log(0 == 1 == 2) // false == 2 👉🏻 0 == 2 👉🏻 false
console.log(2 == 1 == 0) // false == 0 👉🏻 0 == 0 👉🏻 true
console.log(0 < 1 < 2) // true < 2 👉🏻 1 < 2 👉🏻 true
console.log(1 < 2 < 3) // true < 3 👉🏻 1 < 3 👉🏻 true
console.log(2 > 1 > 0) // true > 0 👉🏻 1 > 0 👉🏻 true
console.log(3 > 2 > 1) // true > 1 👉🏻 1 > 1 👉🏻 false

/*
When we use any comparison operator like ==, < and >, if one of the operands is boolean and another is a number it'll convert the boolean into a number and then compare i.e. false becomes 0 and true becomes 1

When using > to compare two operands, if either operand is a number, Javascript will first convert the string to its equivalent number and then numerically compare.
i.e. ’10’ > 9
Only when both operands are string, they are compared lexicographically. i.e. character by character until they are not equal or there aren't any characters left. The first character of '10' is less than the first character of '9' hence '10' is < '9' i.e. ’10’ < ’9’

Also, these operators work from left to right
*/


let a = 1
const b = ++a
const c = a++
console.log(a)
console.log(b)
console.log(c)