// finally() does not receive any argument.
Promise.resolve(1)
    .finally((data) => {
        console.log(data)
        return Promise.reject('error')
    })
    .catch((error) => {
        console.log(error)
        throw 'error2'
    })
    .finally((data) => {
        console.log(data)
        return Promise.resolve(2).then(console.log);
    })
    .then(console.log)
    .catch(console.log)


//finally always runs irrespective of the result
function foo(a) {
    let returnValue = "";

    try {
        if (a === "bar") {
            throw new Error("qux");
        }
        returnValue = "try";
    } catch (err) {
        returnValue = "catch";
    } finally {
        returnValue = "finally"
    }

    return returnValue;
}

// console.log(foo("bar"));
// console.log(foo("zzz"));


var a = 'a'
try {
    throw new Error('BFE.dev')
} catch { // no local variable being used
    var a = 'a1' // overwrites outer varibale a, redeclaring global a
}
console.log(a) // a1

var b = 'b'
try {
    throw new Error('BFE.dev')
} catch (b) { // local variable b references the passed error
    var b = 'b1' // No longer pointing to the global variable, its a locally scoped variable only
}
console.log(b) // b

var c = 'c'
try {
    throw new Error('BFE.dev')
} catch (error) { // local variable error references the passed error
    var c = 'c1' // overwrites outer variable c, redeclaring global c
}
console.log(c) // c1


// example
console.log(1)

setTimeout(() => {
    console.log(2)
}, 10)

setTimeout(() => {
    console.log(3)
}, 0);

new Promise((_, reject) => {
    console.log(4)
    reject(5)
    console.log(6)
}).then(() => console.log(7))
    .catch(() => console.log(8))
    .then(() => console.log(9))
    .catch(() => console.log(10))
    .then(() => console.log(11))
    .then(console.log)
    .finally(() => console.log(12))

console.log(13)

/*
then/catch keep running till there is chain of then/catch
*/