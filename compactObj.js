/*
https://leetcode.com/problems/compact-object/description/?envType=study-plan-v2&envId=30-days-of-javascript

2705. Compact Object
Given an object or array obj, return a compact object. A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.

 

Example 1:

Input: obj = [null, 0, false, 1]
Output: [1]
Explanation: All falsy values have been removed from the array.
Example 2:

Input: obj = {"a": null, "b": [false, 1]}
Output: {"b": [1]}
Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.
Example 3:

Input: obj = [null, 0, 5, [0], [false, 16]]
Output: [5, [], [16]]
Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and removed.
*/

/**
 * @param {Object} obj
 * @return {Object}
 */
var compactObject = function (obj) {
    let resp = Array.isArray(obj) ? [] : {};

    function helper(resp, val, key) {
        if (typeof val === "object") {
            if (Array.isArray(val)) {
                resp[key] = [];
                util(val, resp[key]);
            } else {
                resp[key] = {};
                util(val, resp[key]);
            }
        } else {
            resp[key] = val;
        }
    }

    function util(obj, resp) {
        if (Array.isArray(obj)) {
            let c = 0;
            obj.forEach(val => {
                if (val) {
                    helper(resp, val, c);
                    c++;
                }
            })
        } else {
            Object.keys(obj).forEach(key => {
                const val = obj[key];

                if (val) {
                    helper(resp, val, key);
                }
            });
        }
    }
    util(obj, resp);

    return resp;
};