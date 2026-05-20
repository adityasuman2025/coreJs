/*
https://bigfrontend.dev/problem/convert-snake_case-to-camelCase

Do you prefer snake_case or camelCase ?

Anyway, please create a function to convert snake_case to camcelCase.
snakeToCamel('snake_case') 
// 'snakeCase'
snakeToCamel('is_flag_on') 
// 'isFlagOn'
snakeToCamel('is_IOS_or_Android') 
// 'isIOSOrAndroid'
snakeToCamel('_first_underscore') 
// '_firstUnderscore'
snakeToCamel('last_underscore_') 
// 'lastUnderscore_'
snakeToCamel('_double__underscore_') 
// '_double__underscore_'
contiguous underscore __, leading underscore _a, and trailing underscors a_ should be kept untouched.
*/


/**
 * @param {string} str
 * @return {string}
 */
function snakeToCamel(str) {
    let result = "";

    let len = str.length;
    let start = 0, end = len - 1;

    while (str[start] === "_") {
        result += str[start];
        start++;
    } // for all pre underscores

    while (start <= end) {
        if (str[start] != "_") {
            result += str[start];
            start++;
        } else {
            if (str[start + 1] === "_") {
                result += str[start];
                start++;

                while (str[start] === "_") {
                    result += str[start];
                    start++;
                }
            } else {
                // If it's a single underscore, check if it's trailing.
                // If it is the last character, we must keep it.
                if (start === end) {
                    result += str[start];
                    start++;
                } else {
                    // Otherwise, skip the underscore and capitalize the NEXT character
                    start++;
                    result += str[start].toUpperCase();
                    start++;
                }
            }
        }
    }

    return result;
}

const val = snakeToCamel('snake_case')
console.log("val", val);