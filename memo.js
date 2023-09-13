//Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results. 
//Because JavaScript objects behave like associative arrays, they are ideal candidates to act as caches.

// fibonnaci series: // 0 1 1 2 3 5 8 13 21 34 ...
function fibonnaci(n) {
    let cache = { 0: 0, 1: 1 };

    function fibUtil(n) {
        if (n < 2) return n;

        const fibbAtN = (cache.hasOwnProperty(n - 1) ? cache[n - 1] : fibUtil(n - 1)) + (cache.hasOwnProperty(n - 2) ? cache[n - 2] : fibUtil(n - 2))
        cache[n] = fibbAtN;

        return fibbAtN;
    }

    return fibUtil(n);
}

// const ans = fibonnaci(50);
// console.log("ans", ans)


function memoizeIt(func) {
    let memo = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (!memo.hasOwnProperty(key)) memo[key] = func.call(this, ...args);

        return memo[key];
    }
}

function heavyFunc(a, b) {
    for (let i = 0; i <= 1000000000; i++) { }
    return a + b;
}

const memoizedHeavyFunc = memoizeIt(heavyFunc);
console.time("first call");
memoizedHeavyFunc(1, 2);
console.timeEnd("first call");

console.time("second call");
memoizedHeavyFunc(1, 2);
console.timeEnd("second call");