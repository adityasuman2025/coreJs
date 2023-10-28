(async () => {
    await Promise.all([]).then((value) => {
        console.log(value)
    }, (error) => {
        console.log(error)
    })

    await Promise.all([1, 2, Promise.resolve(3), Promise.resolve(4)]).then((value) => {
        console.log(value)
    }, (error) => {
        console.log(error)
    })

    await Promise.all([1, 2, Promise.resolve(3), Promise.reject('error')]).then((value) => {
        console.log(value)
    }, (error) => {
        console.log(error)
    })
})()

/*
   Promise.all takes an array of promises and returns a new promise with an array of results if all promises are resolved, if one of them fails then returns a rejected promise with the error value.
    if the given array of promises does include a value instead of promise, then it directly returns the value in the result array
*/