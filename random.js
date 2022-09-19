function memoizeIt(func) {
    let memo = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (!memo.hasOwnProperty(key)) {
            // console.log("data not in memory", key)
            memo[key] = func.apply(this, args);
        } else {
            console.log("data not memory", key)
        }

        return memo[key];
    }
}

function add(a, b) {
    return a + b;
}

// const memoizedAdd = memoizeIt(add);
// console.log(memoizedAdd(1,2));
// console.log(memoizedAdd(1,2));
// console.log(memoizedAdd(2,1));

function fibo(n) {
    if (n<2) return n;
    return memoizedFibo(n-2) + memoizedFibo(n-1);
}

// const memoizedFibo = memoizeIt(fibo);
// console.log(memoizedFibo(9));

const memoizedFibo2 = (function() {
    let memory = {};

    function fibb(n) {
        if (n<2) {
            memory[n] = n;
            return n;
        }

        if (!Object.hasOwnProperty(n)) {
            memory[n] = fibb(n-1) + fibb(n-2)
        }

        return memory[n];
    }
    return fibb;
})()

// const ans = memoizedFibo2(9);
// console.log("ans", ans)

function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearInterval(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

function throttle(func, delay) {
    let flag = true;
    return function(...args) {
        if (flag) {
            flag = false;
            func.apply(this, args);
            setTimeout(() => {
                flag = true;
            }, delay)
        }
    }
}

//currying with bind
function add(a, b) {
    return a+b;
}

const newAdd = add.bind(this, 5);
const res = newAdd(10);
console.log("res", res)