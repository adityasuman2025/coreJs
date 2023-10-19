
/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
// returns a promise when all the functions (funcs) are done executing
function batchifyPromises(funcs, max) {
    let result = [];

    if (!funcs || !funcs.length) return Promise.resolve(result);

    // createBatch execute max no of functions at a time and call itself recursively when all functiom in a batch completes
    function createBatch(startIdx, resolve, reject) {
        const endIdx = startIdx + max;

        const promisesArr = funcs.slice(startIdx, endIdx).map(fn => fn()); // beacuse funcs[i] return a promise, and Promise.all() takes an array of promises as argument
        Promise.all(promisesArr)
            .then(resp => {
                result.push(...resp);

                if (result.length === funcs.length) resolve(result);
                else createBatch(endIdx, resolve, reject);
            })
            .catch(err => reject(err));
    }

    return new Promise((resolve, reject) => createBatch(0, resolve, reject));
}


var value = 0;
var asyncFactory = function() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(value++);
        }, 10);
    });
};


const arr = [];
for (var i = 0; i < 20; i++) {
    arr.push(asyncFactory);
}
// this is the solution function you'll write
const throttled = throttlePromises(arr, 5)
throttled.then(function(results) {
    console.log(results); // to.be([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19])
});