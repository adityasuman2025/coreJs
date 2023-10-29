/*
https://bigfrontend.dev/problem/implement-memoizeOne

122. implement memoizeOne()

In problem 14. Implement a general memoization function, you are asked to implement a memo function without space concern.

But in reality, it could be a problem if cache bloats.

You might need to restrict the cache capacity, just like memoize-one , it only remembers the latest arguments and result.

Please implement your own memoizeOne(), it takes 2 arguments

target function
(optional) a equality check function to compare current and last arguments
Default equality check function should be a shallow comparison on array items with strict equal ===.
*/


/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */

function memoizeOne(func, isEqualFunc) {
    const cache = {
        _this: undefined,
        key: undefined,
        value: undefined,
    }

    return function(...args) {
        let tempIsEqualFunc = isEqual;

        if (typeof isEqualFunc === "function") if (cache.key !== undefined) tempIsEqualFunc = isEqualFunc;

        if (tempIsEqualFunc(cache.key, args, cache._this, this)) return cache.value;

        cache.value = func.call(this, ...args);
        cache.key = args;
        cache._this = this;

        return cache.value;
    }

    function isEqual(cacheKey, args, cacheThis, givenThis) {
        if (!cacheThis) return false;
        if (!cacheKey) return false;

        if (cacheThis !== givenThis) return false;
        if (cacheKey.length !== args.length) return false;

        for (let i = 0; i < args.length; i++) {
            if (args[i] !== cacheKey[i]) return false;
        }

        return true;
    }
}

function add(a, b) {
    return a + b;
}
const memoizedAdd = memoizeOne(add);

memoizedAdd(1, 2);
// add function: is called
// [new value returned: 3]

memoizedAdd(1, 2);
// add function: not called
// [cached result is returned: 3]
