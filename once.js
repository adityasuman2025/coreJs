// once() is a function which runs only once
// it is possible because of clousre

function once(func) {
    let val;
    return function(...args) {
        if (val) return val;

        val = func.call(this, ...args);
        return val;
    }
}

function add(a, b) {
    return a + b;
}

function asyncAdd(a, b) {
    return new Promise((resolve) => {
        for (let i = 0; i < 1000000000; i++) { }
        resolve(a + b);
    });
}

const oneAdd = once(asyncAdd);
const ans = oneAdd(5, 7);
console.log("ans", ans)
const ans2 = oneAdd(2, 3);
console.log("ans2", ans2)