const obj = {
    a: {
        b: {
            c: [1, 2, 3]
        }
    }
};


//get
function get(source, path, defaultVal = undefined) {
    let pathArr = Array.isArray(path) ? path : path.replace("[", ".").replace("]", "").split(".");

    let thisKey = pathArr[0];
    if (pathArr.length === 1) {
        if (source.hasOwnProperty(thisKey)) return source[thisKey]
        return defaultVal;
    } else {
        if (source.hasOwnProperty(thisKey)) return get(source[thisKey], pathArr.slice(1), defaultVal); // pathArr.slice(1), removing first element from the path array as it has already been proccessed
        return defaultVal;
    }
}

// get(obj, 'a.b.c') // [1,2,3]
// get(obj, 'a.b.c.0') // 1
// get(obj, 'a.b.c[1]') // 2
// get(obj, ['a', 'b', 'c', '2']) // 3
// get(obj, 'a.b.c[3]') // undefined
// get(obj, 'a.c', 'bfe') // 'bfe
// const ans = get(obj, ['a', 'b', 'c', '2']) // 3
// console.log("ans", ans)


//set
function set(obj, path, value) {
    let pathArr = Array.isArray(path) ? path : path.replace("[", ".").replace("]", "").split(".");

    let thisKey = pathArr[0], nextKey = pathArr[1];
    const thisKeyAsNumberOrStr = Number(thisKey) || thisKey; // if thisKey is a number then key should go as number, otherwise as string

    if (pathArr.length === 1) obj[thisKeyAsNumberOrStr] = value;
    else {
        if (!obj.hasOwnProperty(thisKey)) {
            obj[thisKeyAsNumberOrStr] = (Object.is(Number(nextKey), NaN)) ? {} : [] // if nextKey is a number then making that key's value array otherwise object
        }

        set(obj[thisKeyAsNumberOrStr], pathArr.slice(1), value) // pathArr.slice(1), removing first element from the path array as it has already been proccessed
    }
}

set(obj, 'a.c.d.01.e.0.f', 'BFE')
set(obj, 'a.b.c.4', 'BFE')
console.log("obj", JSON.stringify(obj))