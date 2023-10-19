/*
    map
    filter
    some
    reduce
    forEach
    find
    findIndex
    indexOf
    includes
    bind
    apply
    call
    promiseAll
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
    let resp = initialVal, arr = this;

    for (let i = 0; i < arr.length; i++) {
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

    let accIdx = 0, tempSize = 0;
    return arr.reduce((acc, item, idx) => {
        acc[accIdx] = [...(acc[accIdx] || []), item];

        tempSize++;
        if (tempSize === size) {
            tempSize = 0;
            accIdx++;
        }

        return acc;
    }, []);
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

    return;
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




/*----------------------------------------some--------------------------------*/
Array.prototype.myIndexOf = function(toFind, startIdx = 0) {
    let arr = this;
    for (let idx = (startIdx || 0); idx < arr.length; idx++) {
        if (arr[idx] === toFind) return idx;
    }

    return -1;
}
const myIndexOfResp = arr.myIndexOf(5, 5);
// console.log("myIndexOfResp", myIndexOfResp);




/*----------------------------------------some--------------------------------*/
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




/*----------------------------------------promise All--------------------------------*/
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
        if (promiseArr.length === 0) resolve(resp); // no item in array

        for (let i = 0; i < promiseArr.length; i++) {
            if (typeof promiseArr[i] === "object") { // if that array item is promise
                promiseArr[i]
                    .then(promResp => {
                        resp[i] = promResp;
                        c++;
                        if (c === promiseArr.length) resolve(resp)
                    })
                    .catch(error => reject(error));
            } else {
                resp[i] = promiseArr[i];
                c++;
                if (c === promiseArr.length) resolve(resp)
            }
        }
    });
}

const promA = Promise.resolve(1);
const PromB = new Promise(function(resolve, reject) {
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

// Promise.myPromiseAll([promA, promC(), PromB,])
//     .then(resp => {
//         console.log("resp", resp)
//     })
//     .catch(error => {
//         console.log("error", error)
//     });




/*----------------------------------------promise All settled--------------------------------*/
Promise.myPromiseAllSettled = function(promiseArr) {
    let resp = [], c = 0;
    return new Promise(function(resolve, reject) {
        if (promiseArr.length === 0) resolve(resp); // no item in array

        for (let i = 0; i < promiseArr.length; i++) {
            if (typeof promiseArr[i] === "object") { // if that array item is promise
                promiseArr[i]
                    .then(promResp => {
                        resp[i] = { status: "fulfilled", value: promResp };
                        c++;
                        if (c === promiseArr.length) resolve(resp)
                    })
                    .catch(error => {
                        resp[i] = { status: "rejected", reason: error };
                        c++;
                        if (c === promiseArr.length) resolve(resp)
                    });
            } else {
                resp[i] = { status: 'fulfilled', value: promiseArr[i] },
                    c++;
                if (c === promiseArr.length) resolve(resp)
            }
        }
    });
}

// Promise.myPromiseAllSettled([1, 2, 3, Promise.resolve(4)]).then((value) => {
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