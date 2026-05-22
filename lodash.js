const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};




/*---------------------- get ----------------------*/
function get(source, path, defaultVal = undefined) {
    function util(source, pathArr, defaultVal) {
        const key = pathArr[0];
        if (pathArr.length === 1) return source.hasOwnProperty(key) ? source[key] : defaultVal;
        else return source.hasOwnProperty(key) ? util(source[key], pathArr.slice(1), defaultVal) : defaultVal;
    }

    path = Array.isArray(path) ? path : path.replaceAll("[", ".").replaceAll("]", '').split(".")
    return util(source, path, defaultVal);
}
// console.log(get(obj, 'a.b.c')); // [1,2,3]
// console.log(get(obj, 'a.b.c.0')); // 1
// console.log(get(obj, 'a.b.c[1]')); // 2
// console.log(get(obj, ['a', 'b', 'c', '2'])); // 3
// console.log(get(obj, 'a.b.c[3]')); // undefined
// console.log(get(obj, 'a.c', 'bfe')); // 'bfe'
// console.log(get(obj, [])); // 3




/*---------------------- set ----------------------*/
function set(obj, path, value) {
    const pathArr = Array.isArray(path) ? path : path.replaceAll("[", ".").replaceAll("]", '').split(".")
        .map(key => isFinite(Number(key)) ? Number(key) : key); // to convert the integer keys (for array representation) to number data type (from string)

    function util(obj, pathArr, value) {
        const key = pathArr[0], nextKey = pathArr[1];

        if (pathArr.length === 1) {
            obj[key] = value;
            return;
        } else {
            if (!obj.hasOwnProperty(key)) obj[key] = typeof nextKey === "number" ? [] : {};

            util(obj[key], pathArr.slice(1), value);
        }
    }
    util(obj, pathArr, value);
}
// set(obj, 'a.c.d.01.e.0.f', 'BFE');
// set(obj, 'a.b.c[4]', 'BFE');
// console.log("obj", JSON.stringify(obj));




/*---------------------- omit ----------------------*/
function omit(obj, path) {
    const pathArr = Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");

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
// const ans = flatten(arr2, 10);
// console.log("flatten", ans)




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
// const obj3 = {
//     a: { b: { c: [1, 2, 3] } },
//     b: [{ c: "c" }, 2, 3],
//     c: true,
//     d: 10,
//     e: "e",
//     f: undefined,
//     g: null,
// };

// const cloned = cloneDeep(obj3)
// console.log(cloned);
// console.log(cloned.a);




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