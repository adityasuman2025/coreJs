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
    return function (y) {
        return x + y
    }
}

const addClosureThree = addClosure(3);
const ansClosure = addClosureThree(5);
// console.log("function currying using closure", ansClosure);



//currySum(1)(2)(3,4)(5,6,7)(8)(9,10)....()
//1+2-3+4-5+6-7+8-9+10

let isSum = true;
function curryAltSum(...args1) {
    return function (...args2) {
        let sum = args1[0];
        args1.forEach((item, index) => {
            if (index != 0) {
                if (isSum) {
                    sum += item;
                } else {
                    sum -= item;
                }
                isSum = !isSum
            }
        });

        args2.forEach((item, index) => {
            if (isSum) {
                sum += item;
            } else {
                sum -= item;
            }
            isSum = !isSum
        });

        return args2.length ? curryAltSum(sum) : sum
    }
}

const ans = curryAltSum(1)(2)(3, 4)(5, 6, 7)(8)(9, 10)()
console.log("ans", ans)


// sum(1)(2)(3)....()
function sum(x) {
    return function (y) {
        return y ? sum(x + y) : x
    }
}

const sumVal = sum(1)(2)(3)(4)(5)(6)();
// console.log("sumVal", sumVal);