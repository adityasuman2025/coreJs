//currying
//it is a technique in functional programming in which a function with multiple arguments is transformed into serveral function with single argument in sequence
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
let isSum = true;
function curryAltSum(...args1) {
    let sum = args1[0];

    return function(...args2) {
        for (let i = 1; i < args1.length; i++) {
            if (isSum) sum += args1[i]
            else sum -= args1[i]

            isSum = !isSum;
        }

        for (let i = 0; i < args2.length; i++) {
            if (isSum) sum += args2[i]
            else sum -= args2[i]

            isSum = !isSum;
        }

        return args2.length ? curryAltSum(sum) : sum
    }
}

const ans = curryAltSum(1)(2)(3, 4)(5, 6, 7)(8)(9, 10)()
console.log("ans", ans)



// curryIt
function curryIt(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.call(this, ...args);
        } else {
            // if some more functions are there in func than coming in the curried, then we need to recursively call curried function with the missing arguments
            return function(...missingArgs) {
                return curried.call(this, ...args, ...missingArgs);
            }
        }
    }
}

function join(a, b, c) {
    return `${a}_${b}_${c}`;
}

const curriedJoin = curryIt(join);
console.log(curriedJoin(1, 2, 3)) // '1_2_3'
console.log(curriedJoin(1)(2, 3)) // '1_2_3'
console.log(curriedJoin(1)(2)(3)) // '1_2_3'
console.log(curriedJoin(1, 2, 3, 4)) // '1_2_3'