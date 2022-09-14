//Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results. 
//Because JavaScript objects behave like associative arrays, they are ideal candidates to act as caches.

const fibonnaci = (function() {
    let memo = {};

    function fibb(n) {
        if (n in memo) return memo[n]
        else {
            if (n < 2) return n;
            else {
                memo[n] = fibb(n-1) + fibb(n-2);
                return memo[n];
            }
        }
    }

    return fibb;
})()
// let ans = fibonnaci(10);
// console.log("ans", ans);

function memoizeIt(func) {
    let res = {};

    return function(...args) {
        let key = JSON.stringify(args);
        if (!(key in res)) {
            res[key] = func.call(this, ...args)
        }

        return res[key];
    }
}

function heavyFunc(a, b) {
    for (let i=0; i<=1000000000; i++) {}
    return a+b;
}

const memoizedHeavyFunc = memoizeIt(heavyFunc);
console.time("first call");
memoizedHeavyFunc(1, 2);
console.timeEnd("first call");

console.time("second call");
memoizedHeavyFunc(1, 2);
console.timeEnd("second call");