const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};




/*---------------------- get ----------------------*/
function get(source, path, defaultVal = undefined) {
    /*
        In replace function, if pattern (1st parameter) is a string, then only the first occurrence will be replaced
        to replace all occurances of the pattern, we need to use a regex (regular expression) with g flag
    */
    const pathArr = Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");

    const thisKey = pathArr[0];
    if (pathArr.length === 1) {
        if (source.hasOwnProperty(thisKey)) return source[thisKey]
        return defaultVal;
    } else {
        if (source.hasOwnProperty(thisKey)) return get(source[thisKey], pathArr.slice(1), defaultVal); // pathArr.slice(1), removing first element from the path array as it has already been proccessed
        return defaultVal;
    }
}
// get(obj, 'a.b.c'); // [1,2,3]
// get(obj, 'a.b.c.0'); // 1
// get(obj, 'a.b.c[1]'); // 2
// get(obj, ['a', 'b', 'c', '2']); // 3
// get(obj, 'a.b.c[3]'); // undefined
// get(obj, 'a.c', 'bfe'); // 'bfe'
// const getAns = get(obj, []); // 3
// console.log("getAns", getAns);




/*---------------------- set ----------------------*/
function set(obj, path, value) {
    /*
        In replace function, if pattern (1st parameter) is a string, then only the first occurrence will be replaced
        to replace all occurances of the pattern, we need to use a regex (regular expression) with g flag
    */
    const pathArr = Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");

    const thisKey = pathArr[0], nextKey = pathArr[1];
    if (pathArr.length === 1) {
        obj[thisKey] = value;
    } else {
        if (!obj.hasOwnProperty(thisKey)) {
            obj[thisKey] = String(Number(nextKey)) === nextKey ? [] : {};
        }

        set(obj[thisKey], pathArr.slice(1), value);
    }
}
set(obj, 'a.c.d.01.e.0.f', 'BFE');
set(obj, 'a.b.c.4', 'BFE');
console.log("obj", JSON.stringify(obj));




/*---------------------- omit ----------------------*/
function omit(obj, path) {
    let pathArr = Array.isArray(path) ? path : path.replace("[", ".").replace("]", "").split(".");

    const thisKey = Number(pathArr[0]) || pathArr[0];
    if (pathArr.length === 1) {
        if (Array.isArray(obj)) obj.splice(thisKey, 1);
        else delete obj[thisKey];
    } else {
        if (obj.hasOwnProperty(thisKey)) omit(obj[thisKey], pathArr.slice(1));
    }
}
// omit(obj, "a.b.c.1");
// console.log("obj", JSON.stringify(obj));




/*---------------------- flatten ----------------------*/
let arr = [
    [1, 2],
    [3, 4],
    [5, 6, [7, 8], 9],
    [10, 11, [12, [13, [14, [15, [16]]]]], 17, [18, 19, 20]],
    [[[{ name: "hi" }]], { roll: 1 }]
]
let arr2 = [[], [[[]]], [[]], []];

function flatten(arr, depth = 0) {
    if (depth === 0) return arr;

    let newArr = [];
    arr.forEach(element => {
        if (Array.isArray(element)) {
            newArr.push(...flatten(element, depth - 1));
        } else {
            newArr.push(element);
        }
    });

    return newArr;
}
const ans = flatten(arr2, 1);
// console.log("fltten", ans)




/*---------------------- curry ----------------------*/
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return func.call(this, ...args);
        } else {
            // if some more arguments are there in func than has already come in the curried, then we need to recursively call curried function with the missing arguments
            return function(...missingArgs) {
                return curried.call(this, ...args, ...missingArgs);
            }
        }
    }
}

function join(a, b, c) {
    return `${a}_${b}_${c}`;
}
// const curriedJoin = curry(join);
// console.log(curriedJoin(1, 2, 3)) // '1_2_3'
// console.log(curriedJoin(1)(2, 3)) // '1_2_3'
// console.log(curriedJoin(1)(2)(3)) // '1_2_3'
// console.log(curriedJoin(1, 2, 3, 4)) // '1_2_3'




/*---------------------- cloneDeep ----------------------*/
function cloneDeep(data) {
    const map = new Map();

    function clone(data) {
        if ([null, undefined].includes(data)) return data;

        if (typeof data === "object") {
            const clonedObj = Array.isArray(data) ? [] : {};

            if (map.has(data)) return map.get(data); // to overcome circular reference in the object
            else map.set(data, clonedObj);

            // Object.getOwnPropertySymbols can detect Symbols too as keys, but Object.keys can't
            [...Object.keys(data), ...Object.getOwnPropertySymbols(data)].forEach(key => {
                clonedObj[key] = clone(data[key]);
            });
            return clonedObj;
        } else return data;
    }
    return clone(data);
}

// const sym = Symbol()
// const obj2 = { [sym]: 'bfe' }

// const clone = cloneDeep(obj2)
// console.log(clone); //.not.toBe(obj2)
// console.log(clone[sym]);




/*---------------------- isEqual ----------------------*/
function isEqual(a, b) {
    let map = new Map();

    function isEqualUtil(a, b) {
        if (typeof a !== typeof b) return false;

        // to overcome circular object
        if (map.has(a) || map.has(b)) return true;
        map.set(a, b);
        // to overcome circular object

        if (typeof a === "object") {
            const keysA = [...Object.keys(a), ...Object.getOwnPropertySymbols(a)]; // symbols used as key be detected from Object.getOwnPropertySymbols only but not from Object.keys
            const keysB = [...Object.keys(b), ...Object.getOwnPropertySymbols(b)]; // symbols used as key be detected from Object.getOwnPropertySymbols only but not from Object.keys

            if (keysB.length !== keysA.length) return false;

            for (let i = 0; i < keysA.length; i++) {
                let key = keysA[i];
                if (!isEqualUtil(a[key], b[key])) return false;
            }
        } else {
            if (a !== b) return false;
        }

        return true;
    }

    return isEqualUtil(a, b)
}

// console.log(isEqual([1, 2, 3], [1, 2, 3, 4])); //.toBe(false)