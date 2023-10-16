// once() is a function which runs only once
// it is possible because of clousre
function once(func) {
    let result, hasRun = false;

    return function(...args) {
        if (!hasRun) {
            hasRun = true;
            result = func.call(this, ...args)
        }

        return result;
    }
}

function add(a, b) {
    return a + b;
}

const oneAdd = once(add);
const ans = oneAdd(5, 7);
console.log("ans", ans)
const ans2 = oneAdd(2, 3);
console.log("ans2", ans2)