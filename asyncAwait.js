/*
    A function created with an async keyword always returns a promise. 
    If we directly return a promise from it then fine, but if we return a value then JS engine wraps the value within a Promise and returns it.

*/

async function yo() {
    return 2;
}

console.log(yo())
