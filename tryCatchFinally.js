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