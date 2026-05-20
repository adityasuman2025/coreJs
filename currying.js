//currying
//it is a technique in functional programming in which a function with multiple arguments is transformed into serveral function with one or more arguments in sequence
//it can be done in 2 ways
//1: bind
const add = (x, y) => {
    return x + y;
}

const addTwo = add.bind(this, 2);
const res = addTwo(10);
// console.log("function currying using bind", ans);


//2: closure
function addClosure(x) {
    return function(y) {
        return x + y
    }
}

const addClosureThree = addClosure(3);
const ansClosure = addClosureThree(5);
// console.log("function currying using closure", ansClosure);



// sum(1)(2)(3)....()
// 1+2+3+4...
function sum(x) {
    return function(y) {
        return y ? sum(x + y) : x
    }
}

const sumVal = sum(1)(2)(3)(4)(5)(6)();
// console.log("sumVal", sumVal);



// curryAltSum(1)(2)(3, 4)(5, 6, 7)(8)(9, 10)...()
// 1+2-3+4-5+6-7+8-9+10
let toSum = true;
function curryAltSum(...args1) {
    return function(...args2) {
        const sum = [...args1, ...args2].reduce((res, i) => {
            let ans = toSum ? res + i : res - i;
            toSum = !toSum;

            return ans;
        });

        return args2.length ? curryAltSum(sum) : args1[0];
    }
}

const ans = curryAltSum(1)(2)(3, 4)(5, 6, 7)(8)(9, 10)()
console.log("ans", ans)
