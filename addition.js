/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function add(num1, num2) {
    const num1Arr = num1.split(""), num2Arr = num2.split("");

    let res = "", carry;
    while (num1Arr.length || num2Arr.length || carry) {
        const sum = Number(num1Arr.pop() || 0) + Number(num2Arr.pop() || 0) + Number(carry || 0);

        carry = (sum >= 10) ? 1 : 0;

        res = (sum % 10) + res;
    }

    return res;
}

console.log(add('0', '1')); //.toBe('1')
console.log(add('9', '9')); //.toBe('18')
console.log(add('999999999999999999999', '1')); //.toBe('1000000000000000000000')
console.log(add('123456789123456789123456789', '123456789123456789123456789'));