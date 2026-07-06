// https://www.greatfrontend.com/questions/javascript/curry?practice=practice&tab=coding

export default function curry(func) {
    return function newFunc(...args) {
        if (args.length >= func.length) {
            return func.call(this, ...args);
        }
        else return newFunc.bind(this, ...args);
    }
}

function solution(a, b, c, d, e, f, g, h) {
    return a + b - c * d / e + f - g * h
}

const ans1 = solution(1, 2, 3, 4, 5, 6, 7, 8);
console.log("ans1", ans1)

const curried = curry(solution)
const ans2 = curried(1)(2)(3)(4)(5)(6)(7)(8)
console.log("ans2", ans2)

const add = curry((a, b) => a + b);

const addFive = add(5); // Partially applied function

const ansA = addFive(2); // Should be 7
console.log("ansA", ansA)

const ansB = addFive(3); // Should be 8
console.log("ansB", ansB)

