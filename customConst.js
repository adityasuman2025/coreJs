// ES5 does not have const, so this is how we can use something similar to ES6's const in ES5

function customConst(value) {
    return {
        get() {
            return value;
        },
        set() {
            throw new Error("TypeError: cannot reassign constant value");
        }
    }
}

var a = customConst(10);
console.log(a.get());

a.set(20); // 