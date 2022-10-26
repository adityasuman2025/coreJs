/*
    Write a function to iterate through a JSON and print all the values in that json recursively. 
    That json can have objects, arrays, or even array of objects or even nested objects and arrays.

    e.g. {a : 1, b: {c: 2}, d:[1, 2]}
        [ [[[ { a: {b: { c : 1 }}} ]]], 2, 3 ]
*/

function printJSON(json) {
    if (Array.isArray(json)) {
        json.forEach(item => printJSON(item));
    } else if(typeof json === 'object') {
        Object.values(json).forEach(item => printJSON(item));
    } else {
        console.log(json);
    }
}

const json = [ [[[ { a: {b: { c : 1 }}} ]]], 2, 3 ]; // {a : 1, b: {c: 2}, d:[1, 2]};
printJSON(json)