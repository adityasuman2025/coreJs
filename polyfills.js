//map
Array.prototype.myMap = function(func) {
    let resp = [];
    this.forEach((item, index) => resp.push(func(item, index)));

    return resp;
}

const arr = [...Array(10).keys()];
// console.log("org arr", arr)

const myMapResp = arr.myMap((item) => item *2 );
// console.log("myMapResp", myMapResp)


//filter
Array.prototype.myFilter = function(func) {
    let resp = [];
    this.forEach((item, index) => {
        if (func(item, index)) resp.push(item);
    });

    return resp;
}

const myFilterResp = arr.myFilter((item) => item%2 == 0 );
// console.log("myFilterResp", myFilterResp)


//reduce
Array.prototype.myReduce = function(func, emptyVal) {
    let resp = emptyVal;
    this.forEach((item, index) => {
        resp = func(emptyVal, item, index)
    });

    return resp;
}

const myReduceResp = arr.myReduce((acc, item, index) => {
    acc[index] = index + item;
    return acc;
}, {});
// console.log("myReduceResp", myReduceResp)


//forEach
Array.prototype.myForEach = function(func) {
    for (let i =0; i<this.length; i++) func(this[i] ,i);
}
// arr.forEach((item, index) => console.log(index, item));


//bind
Function.prototype.myBind = function(thi, ...args) {
    let func = this;
    return function(...args2) {
        func.call(thi, ...args, ...args2)
    }
}

function printName(state, country) {
    console.log(this.firstName + " " + this.lastName + " from " + state + ", " + country);
}

let nameObj = { firstName: "aditya", lastName: "suman" };
const printMyName = printName.myBind(nameObj, "delhi");
// printMyName("india")


//apply
Function.prototype.myApply = function(thi, args = []) {
    this.call(thi, ...args)
}
Function.prototype.myApply2 = function(obj, args = []) {
    obj.func = this;
    obj.func(...args)
}
// printName.myApply2(nameObj, ["kathmandu", "nepal"]);
// console.log("nameObj", nameObj.func);
// nameObj.func.apply(nameObj, ["bhemu", "ond"])


//call
Function.prototype.myCall = function(thi, ...args) {
    this.apply(thi, args)
}
Function.prototype.myCall2 = function(obj, ...args) {
    obj.func = this;
    obj.func(...args)
}
printName.myCall2(nameObj, "thimpu", "bhutan");
// console.log("nameObj", nameObj.func);


//find
Array.prototype.myFind = function(func) {
    for(let i=0; i<this.length; i++) {
        let item = this[i]
        if (func(item, i)) return item
    };

    return -1;
} 
const newArrByFind = arr.myFind((item, index) => (item % 2 == 1) && (item > 3));
// console.log("newArrByFind", newArrByFind);


//findIndex
Array.prototype.myfindIndex = function(func) {
    for(let i=0; i<this.length; i++) {
        let item = this[i]
        if (func(item, i)) return i
    };

    return -1;
} 
const newArrByfindIndex = arr.myfindIndex((item, index) => (item % 2 == 1) && (item > 3));
// console.log("newArrByfindIndex", newArrByfindIndex);


//promiseAll
const a = new Promise(function(resolve, reject) {
    setTimeout(() => { resolve("biro") } , 2000)
})

const b = Promise.resolve("yo")

Promise.myPromiseAll = function(promiseArr) {
    let resps = [];
    return new Promise(async function(resolve, reject) {
        for (let i=0; i<promiseArr.length; i++) {
            promiseArr[i]
            .then(resp => {
                resps.push(resp);
                if (resps.length === promiseArr.length) {
                    resolve(resps)
                }
            })
            .catch((e) => {
                reject(e);
            })
        }
    });
}

Promise.myPromiseAll([a, b])
.then(resp => {
    console.log("promise all done resp", resp)
})
.catch((e) => {
    console.log("promise all failed", e)
})