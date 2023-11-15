// example 1
console.log("[0] == ''", [0] == '')
console.log("[0] == 0", [0] == 0)

/*
Here, in both cases the left operand [0] is an object while the right operand is a primitive (string in first line and number in the second)

The equality (==) operator checks whether its two operands are equal, and unlike the strict equality operator ===, it attempts to convert and compare operands that are of different types. To do this comparison, JS will follow the rules for Loose equality using == which states that:

If one of the operands is an object and the other is a primitive, convert the object to a primitive.

This Primitive coercion effectively uses toString to get the primitive value i.e [0] will be treated as "0"

Now after this implicit coercion,

In the first comparison as both operands are string the comparison is straightforward and returns false
In the second comparison, we are comparing string to a number, here the string is first coerced into a number and then comparison happens i.e "0" is coerced to 0. Thus, returning true
console.log([0] == '') // "0" == "" 👉🏻 false
console.log([0] == 0) // "0" == 0 👉🏻 0 == 0 👉🏻 true
*/


// example 2
const arr = [1];
console.log("arr == arr", arr == arr);
console.log("arr === arr", arr === arr);
console.log("[] == []", [] == []);
console.log("[] === []", [] === []);
console.log("{} == {}", {} == {});
console.log("{} === {}", {} === {});

/*
in comparision, if both of the operand is object, then JS compares objects by reference not value.
i.e. if both object are pointing to same memory location, if yes then it will return true otherwise false

*/