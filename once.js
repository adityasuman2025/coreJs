// once() is a function which runs only once
// it is possible because of clousre
function runItOnce(func) {
    let hasRun = false;

    return function (...args) {
        if (!hasRun) {
            hasRun = true;
            return func.apply(this, args);
        } else {
            console.log("has aready run")
        }
    }
}

function add(a, b) {
    return a + b;
}

const oneAdd = runItOnce(add);
const ans = oneAdd(5, 7);
console.log("ans", ans)
oneAdd(2, 3);
