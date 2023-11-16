/*
Comparing Primitives (String, Number, Boolean):
    If both of the operands are primitives and of the same type, == performs a simple value check.
    e.g.
    5 == 5; // true 
    'hello' == 'hello'; // true
    true == false; // false
Comparing Objects:
    if both of the operands are objects, then JS compares them by their reference not value.
    i.e. if both objects are pointing to same memory location, if yes then it will return true otherwise false
    e.g.
    const obj1 = { key: 'value' }; 
    const obj2 = { key: 'value' }; 
    console.log(obj1 == obj2); // false, because they are different objects in memory
    const arr = [1];
    console.log(arr == arr); // true, because they are same objects in memory
    console.log({} == {}); // false, because they are different objects in memory
Comparing Different Types:
    Number and String:
        If one operand is a number and the other is a string, JavaScript tries to convert the string to a number and then compares them.
        e.g.
        5 == '5'; // true, because the string '5' is coerced to the number 5
        5 == 'yo bro'; // true, because the string 'yo bro' is coerced to the NaN
    Boolean and Non-Boolean:
        Boolean and Number
            When comparing a boolean and a number value, the boolean is converted to a number (true becomes 1, false becomes 0).
            e.g.
            true == 1; // true 
            false == 0; // true
            false == 1; // false
        Boolean and String
            When comparing a boolean and a string value, the boolean is converted to its string value (true becomes “true”, false becomes “false”)
            e.g.
            “true” == true // true, because true if coerced to “true”
            “false” == false // true
            “Nyc pik” == true // false 
    Null and Undefined:
        null and undefined are equal when using ==.
        e.g.
        null == undefined; // true
    Object and Primitive:
        If one operand is an object and the other is a primitive value, the object is converted to a primitive value using the object's valueOf() and toString() methods.
        e.g.
        'hello' == new String('hello'); // true, because the object, new String('hello')  is coerced to the primitive value 'hello'
        1 == [1]; // true, because the object [1], is converted to string “1” using [1].toString() and 1 == “1” as “1” is coerced to 1 so 1 == 1, which is true
        false == [0] // true
        [0] == 0 // true, “0” == 0 -> 0 == 0 -> true
        [0] == “” // false, “0” == “” -> false
    Different Objects:
        When comparing two different object types, the references are compared, not the contents of the objects.
        e.g.
        [] == {}; // false, because they are different objects in memory
*/


console.log([1] == 1) // 1 == 1 = true
console.log([1] == '1') // 1 == 1 = true
console.log(['1'] == '1') // 1 == 1 = true
console.log(['1'] == 1) // 1 == 1 = true
console.log([1] == ['1']) // false as both are arrays (not the same reference)
console.log(new Boolean(true) == 1) // 1 == 1 = true
console.log(new Boolean(true) == new Boolean(true)) // false as both are actually objects
console.log(Boolean(true) == '1') // true == '1' = 1 == 1 = true
console.log(Boolean(false) == [0]) // false == [0] = 0 == 0 = true
console.log(new Boolean(true) == '1') // object true == '1' = 1 == 1 = true
console.log(new Boolean(false) == [0]) // object fasle == [0] = // false as both are actually objects
console.log(null == undefined) // true
