/**
 * unflatten(input) should return:
 * {
 *   key1: {
 *     key2: "value2",
 *     key3: ["value3", "value4", { key5: "value5" }, 6]
 *   },
 *   key4: "value4",
 *   key6: [1, 2, 3, 4],
 *   key7: {
 *     key8: "value8",
 *     key9: false
 *   }
 * }
 */

const input = {
    "key1.key2": "value2",
    "key1.key3.0": "value3",
    "key1.key3.1": "value4",
    "key1.key3.2.key5": "value5",
    "key1.key3.3": 6,
    key4: "value4",
    "key6.0": 1,
    "key6.1": 2,
    "key6.2": 3,
    "key6.3": 4,
    "key7.key8": "value8",
    "key7.key9": false,
};

function isNumber(str) {
    return isFinite(str) && str !== "";
}

function unflatten(obj) {
    const res = {};

    function util(res, keyArr, value) {
        if (keyArr.length === 0) return;

        const key = keyArr[0],
            nextKey = keyArr[1];

        if (keyArr.length === 1) {
            if (isNumber(key)) {
                res[Number(key)] = value;
            } else {
                res[key] = value;
            }
        } else {
            if (!res.hasOwnProperty(key)) {
                res[key] = isNumber(nextKey) ? [] : {};
            }

            util(res[key], keyArr.slice(1), value);
        }
    }

    Object.keys(obj).forEach((key) => {
        const keyArr = key.split(".");
        const value = obj[key];
        util(res, keyArr, value);
    });

    return res;
}

const ans = unflatten(input);
console.log("ans 2", ans);
