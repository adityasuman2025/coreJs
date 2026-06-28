import { readFile } from "fs";

console.log("code starts");
const a = 10;
const b = 20;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then((resp) => console.log(resp));

readFile('practice.js', "utf8", (err, data) => {
    setTimeout(() => console.log("2nd setTimeout"), 0);

    process.nextTick(() => console.log("2nd nextTick"));

    setImmediate(() => console.log("2nd setImmediate"));

    console.log("readFile CB")
});

process.nextTick(() => console.log("nextTick"));

setTimeout(() => console.log("setTimeout"), 0);

function add(a, b) {
    return a + b;
}

console.log("sum", add(a, b));
console.log("code ends");

/*
    code starts
    sum 30
    code ends

    // in ESM (import, export) Promise is given priority than nextTick
    // and in CJS (require, module.exports) nextTick is given priority than Promise
    nextTick
    Promise
    setTimeout
    setImmediate
    
    readFile CB
    2nd nextTick
    2nd setImmediate // setImmediate's callback is picked forst by event loop because readFile's callback was picked by event loop in pool phase and after pool phase comes check phase (where setImmediate callback is use to processed)
    2nd setTimeout
*/
