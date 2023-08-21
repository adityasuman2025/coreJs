/*

+ Operator
+<anyString which is not a number> = NaN,  e.g. ‘biro’
+<anyString which is a number> = that number,  e.g. ‘1’
+<anyNumber> = that number
+{ } = NaN
+[ ] = 0

// In mathematical operators, + works on both numbers and strings (used in string concatenation). 
// Hence, if any of the operands is not a number, using + converts all operand/s to string and concatenates.

String({ }) = “[object Object]”
String([ ]) = “”
String(123) = “123”

*/

const plusStrNo = +"100";
const plusStr = +"yo";
const plusarr = +[];
const plusObj = +{};

console.log("plusStrNo", plusStrNo)
console.log("plusStr", plusStr)
console.log("plusarr", plusarr)
console.log("plusObj", plusObj)




const noPlusNo = 100 + 1;
const strPlusNo = "yo" + 1;
const strNoPlusStrNo = "100" + "99";
const strPlusStr = "yo" + "biro";

console.log("noPlusNo", noPlusNo)
console.log("strPlusNo", strPlusNo)
console.log("strNoPlusStrNo", strNoPlusStrNo)
console.log("strPlusStr", strPlusStr)




const strOfArray = String([]);
const strOfObj = String({});
const strOfNo = String(100);

console.log("strOfArray", strOfArray)
console.log("strOfObj", strOfObj)
console.log("strOfNo", strOfNo)