const obj = {
    // a: {
    // //   b: {
    // //     // c: [1,2,3]
    // //   }
    // }
}


//get
function get(source, path, defaultValue = undefined) {
    const keys = Array.isArray(path) ? path: (path.replace("[",'.').replace("]",'')).split(".");  
    const key = keys[0];

    if (keys.length === 1) {
        return source[key] || defaultValue;
    } else {
        if (key in source) {
            keys.shift(); //removing the first element from the path string
            return get(source[key], keys.join("."), defaultValue)
        } else {
            return defaultValue;
        }
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
    const keys = Array.isArray(path) ? path: (path.replace('[', '.').replace(']','')).split(".");  
    const key = keys[0]; //Number(keys[0]) || keys[0];
  
    if (keys.length == 1) {
        obj[key] = value;
    } else {
        if (!(key in obj)) obj[key] = String(Number(keys[1])) === keys[1] ? [] : {}
        
        keys.shift(); //removing the first element from the path string
        set(obj[key], keys.join("."), value);
    }
}

set(obj, 'a.c.d.01', 'BFE')
console.log("obj", JSON.stringify(obj)) // "BFE"