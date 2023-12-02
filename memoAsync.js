function memoizeIt(func) {
    let cache = {};

    return async function(...args) {
        const key = JSON.stringify(args);

        if (!cache.hasOwnProperty(key)) {
            cache[key] = func(...args);
            func(...args)
                .then(res => {
                    cache[key] = res;
                });
        }

        return cache[key];
    }
}

function compute(a, b) {
    console.log('compute')
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000)
    })
}


const memoizeAdd = memoizeIt(compute);
memoizeAdd(1, 2).then(res => {
    console.log(res);
});

memoizeAdd(1, 2).then(res => {
    console.log(res);
});
