/*
    map
    filter
    some
    reduce
    forEach
    chunk
    find
    findIndex
    indexOf
    includes
    bind
    apply
    call
    promiseAll
    compose
    pipe
    trim
    promiseAllSettled
*/

/*----------------------------------------map--------------------------------*/
Array.prototype.myMap = function(func) {
    let resp = [], arr = this;

    for (let i = 0; i < arr.length; i++) {
        resp[i] = func(arr[i], i);
    }

    return resp;
}

const arr = [...Array(10).keys()];
const myMapResp = arr.myMap((item) => item * 2);
// console.log("org arr", arr)
// console.log("myMapResp", myMapResp)




/*----------------------------------------filter--------------------------------*/
Array.prototype.myFilter = function(func) {
    let resp = [], arr = this;

    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i], i)) resp.push(arr[i])
    }

    return resp
}

const myFilterResp = arr.myFilter((item) => item % 2 == 0);
// console.log("myFilterResp", myFilterResp)




/*----------------------------------------some--------------------------------*/
Array.prototype.mySome = function(func) {
    let arr = this;
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i], i)) return true;
    }

    return false;
}
const mySomeResp = arr.mySome((item) => item > 8);
// console.log("mySomeResp", mySomeResp)




/*----------------------------------------reduce--------------------------------*/
Array.prototype.myReduce = function(func, initialVal) {
    const arr = this;
    const hasInitialVal = arguments.length > 1; // if initialVal paramater is passed, then length of arguments will be greater than 1

    let resp = hasInitialVal ? initialVal : arr[0];

    for (let i = (hasInitialVal ? 0 : 1); i < arr.length; i++) {
        resp = func(resp, arr[i], i);
    }

    return resp;
}

const myReduceResp = arr.myReduce((acc, item, index) => {
    acc[index] = index + item;
    return acc;
}, {});
// console.log("myReduceResp", myReduceResp)




/*----------------------------------------forEach--------------------------------*/
Array.prototype.myForEach = function(func) {
    for (let i = 0; i < this.length; i++) func(this[i], i);
}
// arr.forEach((item, index) => console.log(index, item));




/*----------------------------------------chunk--------------------------------*/
// https://leetcode.com/problems/chunk-array/description/?envType=study-plan-v2&envId=30-days-of-javascript
Array.prototype.chunk = function(size) {
    const arr = this;

    let res = [];

    let j = size, temp = [];
    for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i]);
        j--;

        if (!j || i == arr.length - 1) {
            res.push(temp);
            temp = [];
            j = size;
        }
    }

    return res;
};
let arr2 = [1, 2, 3, 4, 5], size = 3;
const chunkArr = arr2.chunk(size);
// console.log("chunkArr", chunkArr);




/*----------------------------------------find--------------------------------*/
Array.prototype.myFind = function(func) {
    for (let i = 0; i < this.length; i++) {
        let item = this[i]
        if (func(item, i)) return item
    };

    return undefined;
}
const newArrByFind = arr.myFind((item, index) => (item % 2 == 1) && (item > 3));
// console.log("newArrByFind", newArrByFind);




/*----------------------------------------findIndex--------------------------------*/
Array.prototype.myfindIndex = function(func) {
    for (let i = 0; i < this.length; i++) {
        let item = this[i]
        if (func(item, i)) return i
    };

    return -1;
}
const newArrByfindIndex = arr.myfindIndex((item, index) => (item % 2 == 1) && (item > 3));
// console.log("newArrByfindIndex", newArrByfindIndex);




/*----------------------------------------indexOf--------------------------------*/
Array.prototype.myIndexOf = function(toFind, startIdx = 0) {
    let arr = this;
    for (let idx = startIdx; idx < arr.length; idx++) {
        if (arr[idx] === toFind) return idx;
    }

    return -1;
}
const myIndexOfResp = arr.myIndexOf(5, 5);
// console.log("myIndexOfResp", myIndexOfResp);




/*----------------------------------------includes--------------------------------*/
Array.prototype.myIncludes = function(toFind, startIdx = 0) {
    let arr = this;
    for (let idx = (startIdx || 0); idx < arr.length; idx++) {
        if (arr[idx] === toFind) return true;
    }

    return false;
}
const myIncludesResp = arr.myIncludes(5);
// console.log("myIncludesResp", myIncludesResp);




/*----------------------------------------bind--------------------------------*/
Function.prototype.myBind = function(givenThis, ...args) {
    let func = this;
    return function(...args2) {
        return func.call(givenThis, ...args, ...args2)
    }
}

function printName(state, country) {
    const res = this.firstName + " " + this.lastName + " from " + state + ", " + country;
    // console.log(res);

    return res;
}

const nameObj = { firstName: "aditya", lastName: "suman" };
const printMyName = printName.myBind(nameObj, "delhi", "india");
// const myBindResp = printMyName();
// console.log("myBindResp", myBindResp)




/*----------------------------------------apply--------------------------------*/
Function.prototype.myApply = function(givenThis, args = []) {
    return this.call(givenThis, ...args)
}
Function.prototype.myApply2 = function(givenThis, args = []) {
    givenThis.func = this; // creating a key of the function in the givenThis object
    const res = givenThis.func(...args);
    delete givenThis.func; // deleting the key of the function in the givenThis object

    return res;
}
const myApplyResp = printName.myApply2(nameObj, ["kathmandu", "nepal"]);
console.log("myApplyResp", myApplyResp);
console.log("nameObj.func", nameObj.func);




/*----------------------------------------call--------------------------------*/
Function.prototype.myCall = function(givenThis, ...args) {
    return this.apply(givenThis, args);
}
Function.prototype.myCall2 = function(givenThis, ...args) {
    givenThis.func = this; // creating a key of the function in the givenThis object
    const res = givenThis.func(...args);
    delete givenThis.func; // deleting the key of the function in the givenThis object

    return res;
}
const myCallResp = printName.myCall2(nameObj, "thimpu", "bhutan");
console.log("myCallResp", myCallResp);
console.log("nameObj.func", nameObj.func);




/*----------------------------------------compose--------------------------------*/
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;


// The compose() function takes a list of functions and returns a new function. This new function, when called with an argument, will apply the functions from right to left.
function compose(...funcs) {
    return function(intialVal) {
        let res = intialVal
        for (let i = funcs.length - 1; i >= 0; i--) {
            res = funcs[i](res);
        }
        return res;
    }
}

const composedFunction = compose(square, multiplyByTwo, addOne);
const result1 = composedFunction(3); // Equivalent to square(multiplyByTwo(addOne(3)))
console.log("composedFunction result", result1); // Output: 64




/*----------------------------------------pipe--------------------------------*/
// The pipe() function is similar to compose(), but it applies the functions from left to right.
function pipe(...funcs) {
    return function(intialVal) {
        let res = intialVal
        for (let i = 0; i < funcs.length; i++) {
            res = funcs[i](res);
        }
        return res;
    }
}

const pipedFunction = pipe(square, multiplyByTwo, addOne);
const result2 = pipedFunction(3); // Equivalent to square(multiplyByTwo(addOne(3)))
console.log("pipedFunction result", result2); // Output: 19




/*----------------------------------------String trim--------------------------------*/
String.prototype.trim = function() {
    let str = this;

    let start, end;
    for (let i = 0; i < str.length; i++) {
        let char = (str[i]);

        if (![" ", "", "\s", "\t", "\n", "\u3000"].includes(char)) {
            if (start === undefined) start = i;
            end = i;
        }
    }

    return str.substring(start, end + 1);
}
// console.log(('a').trim //.toBe('a')
// console.log(('a   ').trim) //.toBe('a')
// console.log(('  a b   ').trim) //.toBe('a b')
console.log("yo" + ('    aa    \u3000').trim() + "yo"); //.toBe('aa')
console.log("yo" + ('    ✌️    \u3000').trim() + "yo"); //.toBe('✌️')



/*----------------------------------------promise All--------------------------------*/
Promise.myPromiseAll = function(promiseArr) {
    let resp = [], c = 0;
    return new Promise(function(resolve, reject) {
        if (promiseArr.length === 0) return resolve(resp); // no item in array

        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]) // Promise.resolve converts a non-promise value into a promise and if already a promise then no effect
                .then(promResp => {
                    resp[i] = promResp;
                    if (++c === promiseArr.length) resolve(resp)
                })
                .catch(error => reject(error));
        }
    });
}

const promA = Promise.resolve(1);
const promB = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve(2)
    }, 1000);
});
function promC() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(3);
        }, 2000);
    });
}

Promise.myPromiseAll([0, promA, promB, promC(), 4]).then(ans => console.log("resolve", ans)).catch(err => console.log("rejected", err))




/*----------------------------------------promise All settled--------------------------------*/
Promise.myAllSettled = function(arrProm) {
    return new Promise(function(resolve, reject) {
        if (arrProm.length === 0) return resolve([]);

        const ans = [];
        let c = 0;
        arrProm.forEach((prom, idx) => {
            Promise.resolve(prom) // Promise.resolve converts a non-promise value into a promise and if already a promise then no effect
                .then(value => {
                    ans[idx] = { status: "fulfilled", value };
                }).catch(reason => {
                    ans[idx] = { status: "rejected", reason };
                }).finally(() => { // finally always runs whether the promise runs or fails
                    if (++c === arrProm.length) resolve(ans);
                })
        })
    });
}

// Promise.myAllSettled([1, 2, Promise.reject(3), Promise.resolve(4)]).then((value) => {
//     console.log(value);
//     /*
//     [
//         { status: 'fulfilled', value: 1 },
//         { status: 'fulfilled', value: 2 },
//         { status: 'fulfilled', value: 3 },
//         { status: 'fulfilled', value: 4 }
//     ]
//     */
// });




/*----------------------------------------promise any--------------------------------*/
Promise.myPromiseAny = function(iterable) {
    return new Promise(async (resolve, reject) => {
        if (!iterable.length) resolve([]);

        const errors = [];
        let errC = 0;

        for (let i = 0; i < iterable.length; i++) {
            Promise.resolve(iterable[i])
                .then((resp) => resolve(resp))
                .catch((e) => {
                    errC++;
                    errors[i] = e;

                    if (errC === iterable.length) reject(new AggregateError(errors, "All promises were rejected"));
                });
        }
    });
}