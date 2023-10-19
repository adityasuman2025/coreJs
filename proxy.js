const target = { name: 'John', age: 30 };
const handler = {
    get: function(target, property) {
        console.log(`Getting ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        target[property] = value;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Output: Getting name
proxy.age = 31; // Output: Setting age to 31


/*
https://bigfrontend.dev/problem/support-negative-Array-index

88. support negative Array index in JavaScript

Python supports negative list index , while JavaScript doesn't.
Can you write a wrapper function to make negative array index possible?

const originalArr = [1,2,3]
const arr = wrap(originalArr)

arr[0] // 1
arr[1] // 2
arr[2] // 3
arr[3] // undefined
arr[-1] // 3
arr[-2] // 2
arr[-3] // 1
arr[-4] // undefined
All methods on arr should be applied to the original array, which means

arr.push(4)
arr[3] // 4
originalArr[3] // 4

arr.shift()
arr[0] // 2
originalArr[0] // 2

arr.bfe = 'bfe'
originalArr.bfe // 'bfe'

arr[-1] = 5
arr // [2,3,5]
originalArr // [2,3,5]

originalArr[2] = 6
arr // [2,3,6]
originalArr // [2,3,6]
*/

/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */
function wrap(arr) {
    const target = arr;
    const handler = {
        get: function(target, property) {
            if (typeof property === "string" && Number(property) < 0) { // if property/key is negative
                property = Number(property) + target.length;
            }

            // Reflect.get() is used to invoke the default [[Get]] behavior on target directly
            return Reflect.get(target, property); // or return target[property]; 
        },

        set: function(target, property, value) {
            if (typeof property === "string" && Number(property) < 0) {
                if (Math.abs(Number(property)) > target.length) throw Error('Out of bounds!');
                else {
                    property = Number(property) + target.length;
                }
            }

            // Reflect.set() is used to invoke the default [[Set]] behavior on target directly
            return Reflect.set(target, property, value); // or return target[property] = value;
        }
    };

    return new Proxy(target, handler);
}
