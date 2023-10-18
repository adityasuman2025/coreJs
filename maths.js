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




/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function subtract(num1, num2) {
    let res = "";

    // if num2 is greater then num1, then subtracting num1 from num2, instead of subtracting num2 from num1
    // so swapping the nums
    let isSwapped = false;
    let num1Len = num1.length, num2Len = num2.length;
    if (num2Len > num1Len) {
        isSwapped = true;
        let temp = num1;
        num1 = num2;
        num2 = temp;
    }

    let lend = 0;
    let num1Arr = num1.split(""), num2Arr = num2.split("");
    while (num1Arr.length || num2Arr.length) {
        let sub;

        let first = num1Arr.pop() || 0, second = num2Arr.pop() || 0;
        sub = (first - lend) - (second);

        if (sub < 0 && num1Arr.length) { // if subtract the the current digits is negative and num1 has extra digits to lend then lending 1 from num1 coming digit
            sub = (1 + first - lend) - (second);

            lend = 1;
        } else lend = 0;

        res = String(sub) + res;
    }

    res = trimPrefixZeros(res);
    if (isSwapped) res = "-" + res; // if nums has been swapped then making res (result) negative

    return res;
}

function trimPrefixZeros(str) {
    if (!str) return str;

    let zeroTillIdx = 0;
    while (str[zeroTillIdx] === "0") zeroTillIdx++;

    return zeroTillIdx === str.length ? "0" : str.substring(zeroTillIdx);
}


console.log(subtract('999999999999999999', '1')); //.toBe('-999999999999999998')
console.log(subtract('100', '99')); //.toBe('1')
console.log(subtract('99', '100')); //.toBe('1')
console.log(subtract('1', '20')); //.toBe('-19')
console.log(subtract('1000000000000000000000', '999999999999999999999')); //.toBe('1')

console.log(subtract('12345678912345678', '9876501263826299')); //.toBe('2469177648519379')