//currySum(1)(2)(3,4)(5,6,7)(8)(9,10)....()
//1+2-3+4-5+6-7+8-9+10

let isSum = true;
function curryAltSum(...args1) {
    return function(...args2) {
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

        return args2.length ? currySum(sum) : sum
    }
}

const ans = curryAltSum(1)(2)(3,4)(5,6,7)(8)(9,10)()
console.log("ans", ans)


// sum(1)(2)(3)....()
function sum(x) {
    return function (y) {
        return y ? sum(x + y) : x
    }
}

const sumVal = sum(1)(2)(3)(4)(5)(6)();
// console.log("sumVal", sumVal);