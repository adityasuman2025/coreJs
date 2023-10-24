/*
Your task is to implement a function which adds type validation to an object.

Requirements
Your function should receive an object as its only argument and return an object with the same properties, but with type validation added.

Types should be validated when:
the function creates the object;
someone updates a property;
someone adds a property.

The type validation should always be based on the last part of the property name. For example, the age_int property should always be an integer and throw an error when set to something else.
Here are possible types:
string: for example, "string type"
int: 12.00 and 12 are both integers
float: for example, 12.34
number: any int or float
bool: for example, true

Assumptions
Types are optional and validation should be skipped if the type isn't specified.
_ always precedes the type name.

Examples
Your function (typeCheck here) should behave as shown below:
const obj = {
    age_int: 2,
    name_string: "Adam",
    job: null,
}
const validatingObject = typeCheck(obj)
validatingObject.age_int = 2.25 // Throws error
validatingObject.age_int = 2
validatingObject.job = "fireman"
validatingObject.address_string = 20 // Throws error

const obj_2 = {
    employed_bool: "true",
}
const validatingObject = typeCheck(obj_2) // Throws error
*/

function isInt(n) {
    return (typeof n === "number") && (n % 1 === 0);
}

function isNumber(n) {
    return typeof n === 'number';
}

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function isBoolean(val) {
    return 'boolean' === typeof val;
}

function isFloat(n) {
    return (typeof n === "number") && (n % 1 !== 0);
}

function checkType(key, value) {
    const keyArr = key.split("_");
    const type = keyArr[1];

    if (type === "int") {
        if (!isInt(value)) throw Error("given value is not a int");
    } else if (type === "string") {
        if (!isString(value)) throw Error("given value is not a string");
    } else if (type === "bool") {
        if (!isBoolean(value)) throw Error("given value is not a bool");
    } else if (type === "number") {
        if (!isNumber(value)) throw Error("given value is not a number");
    } else if (type === "float") {
        if (!isFloat(value)) throw Error("given value is not a float");
    }
}

function typeCheck(object) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];

        checkType(key, value);
    }

    const target = object;
    const handler = {
        get: function(target, property) {
            return Reflect.get(target, property); // or return target[property]; 
        },

        set: function(target, property, value) {
            checkType(property, value);

            return Reflect.set(target, property, value); // or return target[property] = value;
        }
    };

    return new Proxy(target, handler);
}

const obj = {
    age_int: 2,
    name_string: "Adam",
    job: null,
}
const validatingObject = typeCheck(obj)
validatingObject.age_int = 2.25 // Throws error
validatingObject.age_int = 2
validatingObject.job = "fireman"
validatingObject.address_string = 20 // Throws error