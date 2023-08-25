/*----------------------------------------map--------------------------------*/
Array.prototype.myMap = function (func) {
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
Array.prototype.myFilter = function (func) {
    let resp = [], arr = this;

    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i], i)) resp.push(arr[i])
    }

    return resp
}

const myFilterResp = arr.myFilter((item) => item % 2 == 0);
// console.log("myFilterResp", myFilterResp)




/*----------------------------------------reduce--------------------------------*/
Array.prototype.myReduce = function (func, initialVal) {
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
Array.prototype.myForEach = function (func) {
    for (let i = 0; i < this.length; i++) func(this[i], i);
}
// arr.forEach((item, index) => console.log(index, item));




/*----------------------------------------chunk--------------------------------*/
// https://leetcode.com/problems/chunk-array/description/?envType=study-plan-v2&envId=30-days-of-javascript
Array.prototype.chunk = function (size) {
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
Array.prototype.myFind = function (func) {
    for (let i = 0; i < this.length; i++) {
        let item = this[i]
        if (func(item, i)) return item
    };

    return -1;
}
const newArrByFind = arr.myFind((item, index) => (item % 2 == 1) && (item > 3));
// console.log("newArrByFind", newArrByFind);




/*----------------------------------------findIndex--------------------------------*/
Array.prototype.myfindIndex = function (func) {
    for (let i = 0; i < this.length; i++) {
        let item = this[i]
        if (func(item, i)) return i
    };

    return -1;
}
const newArrByfindIndex = arr.myfindIndex((item, index) => (item % 2 == 1) && (item > 3));
// console.log("newArrByfindIndex", newArrByfindIndex);




/*----------------------------------------bind--------------------------------*/
Function.prototype.myBind = function (thi, ...args) {
    let func = this;
    return function (...args2) {
        func.call(thi, ...args, ...args2)
    }
}

function printName(state, country) {
    console.log(this.firstName + " " + this.lastName + " from " + state + ", " + country);
}

let nameObj = { firstName: "aditya", lastName: "suman" };
const printMyName = printName.myBind(nameObj, "delhi", "india");
printMyName()




/*----------------------------------------apply--------------------------------*/
Function.prototype.myApply = function (thi, args = []) {
    this.call(thi, ...args)
}
Function.prototype.myApply2 = function (obj, args = []) {
    obj.func = this;
    obj.func(...args)
}
// printName.myApply2(nameObj, ["kathmandu", "nepal"]);
// console.log("nameObj", nameObj.func);
// nameObj.func.apply(nameObj, ["bhemu", "ond"])




/*----------------------------------------call--------------------------------*/
Function.prototype.myCall = function (thi, ...args) {
    this.apply(thi, args)
}
Function.prototype.myCall2 = function (obj, ...args) {
    obj.func = this;
    obj.func(...args)
}
printName.myCall2(nameObj, "thimpu", "bhutan");
// console.log("nameObj", nameObj.func);




/*----------------------------------------promise All--------------------------------*/
const a = new Promise(function (resolve, reject) {
    setTimeout(() => { resolve("biro") }, 2000)
})
const b = Promise.resolve("yo")

Promise.myPromiseAll = function (promiseArr) {
    let resps = [];
    let c = 0;
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < promiseArr.length; i++) {
            promiseArr[i]
                .then(resp => {
                    resps[i] = resp;
                    c++;
                    if (c === promiseArr.length) {
                        resolve(resps)
                    }
                })
                .catch((e) => {
                    reject(e);
                })
        }
    });
}

// Promise.myPromiseAll([a, b])
//     .then(resp => {
//         console.log("promise all done resp", resp)
//     })
//     .catch((e) => {
//         console.log("promise all failed", e)
//     })