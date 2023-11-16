// https://bigfrontend.dev/problem/implement-JSON-parse

function parse(str) {
    if (str === '') throw Error()
    if (str[0] === "'") throw Error()
    if (str === '[]') return [];
    if (str === '{}') return {};
    if (str === 'null') return null;
    if (str === 'true') return true;
    if (str === 'false') return false;
    if (str[0] === '"') return str.slice(1, -1);
    if (+str === +str) return Number(str);

    if (str[0] === '{') {
        return str.slice(1, -1).split(',').reduce((acc, item) => {
            const index = item.indexOf(':');
            const key = item.slice(0, index)
            const value = item.slice(index + 1);
            acc[parse(key)] = parse(value);

            return acc;
        }, {});
    }

    if (str[0] === '[') return str.slice(1, -1).split(',').map((value) => parse(value));;
}



const ARR_OBJ = ["{", "[",];
function parse(jsonString) {
    jsonString = jsonString.trim();

    const isArr = jsonString[0] === "[";
    const res = isArr ? [] : {};

    jsonString = jsonString.substring(1, jsonString.length - 1);

    const jsonStrArr = jsonString.split(",");
    jsonStrArr.forEach((keyVal, idx) => {
        console.log("keyVal", keyVal)
        if (ARR_OBJ.includes(keyVal)) {
            console.log('here')
            keyVal = keyVal + "," + jsonStrArr[idx + 1];
            console.log("keyVal", keyVal)
        } else {
            const keyValArr = keyVal.split(":");
            const key = keyValArr[0].substring(1, keyValArr[0].length - 1);
            const val = keyValArr[1].substring(1, keyValArr[1].length - 1);

            if (ARR_OBJ.includes(val[0])) {
                res[key] = parse(val);
            } else {
                res[key] = val;
            }
        }
    });


    return res;
}

function splitByFirstColon(str) {
    let end1 = 0;

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (char === ":") {
            end1 = i - 1;
        }
    }

    return [str.substring(0, end1), str.substring(end1, str.length)]
}
