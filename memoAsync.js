/**
 * Memoizes a Promise-returning function / asynchronous function by caching the PROMISE (not the resolved value)
 *
 * Caching the promise itself gives us three properties for free:
 *   1. concurrent callers (when previous calls are still pending) with same args calls the same pending promise → func runs only once.
 *   2. Resolved promises re-resolve "instantly" on subsequent .then,
 *   3. cache hits behave identically whether the promise is pending or resolved
 */

function memoizeIt(func) {
    const cache = {}; // cache[key] holds the PROMISE (not the resolved value).

    return function(...args) {
        const key = JSON.stringify(args);

        if (!cache.hasOwnProperty(key)) cache[key] = func.call(this, ...args);
        // return the cached promise so that caller can use .then/.catch as normal
        // thats why no `new Promise(...)` wrapper needed: as we are returning a promise
        return cache[key];
    }
}

function compute(a, b) {
    return new Promise((resolve) => {
        const end = 1000000000;
        for (let i = 0; i <= end; i++) {
            if (i === end) resolve(a + b)
        }
    })
}

const memoizedCompute = memoizeIt(compute);

console.time("1");
memoizedCompute(1, 2).then(res => console.log(res));
console.timeEnd("1");


console.time("2");
memoizedCompute(1, 2).then(res => console.log(res));
console.timeEnd("2");
