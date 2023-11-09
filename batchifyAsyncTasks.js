/*
    Problem: how to handle 200 network request/asynchronous tasks

    Solution: We can batch them in chunks (suppose the size of the chunk/no of items in a chunk is 10) and process chunks one-by-one, and in a chunk all items will run concurrently / parallelly. So at any moment, at most the size of the chunk network requests are going on.
*/


const arrayOfFunctionReturningPromises = []; // array of function returning promise simply asynchronous function
const totalPromises = 200;
for (let i = 0; i < totalPromises; i++) {
    arrayOfFunctionReturningPromises.push(
        function task() {
            return new Promise(function(resolve, reject) {
                console.log("promise: ", i)
                setTimeout(() => {
                    resolve(i);
                }, 1000);
            })
        }
    );
};

/* Promise all will start/run all 200 asynchronous function at once i.e con-currently/parallely */
// const arrayOfPromises = arrayOfFunctionReturningPromises.map(func => func());
// Promise.all(arrayOfPromises)
//     .then(res => {
//         console.log("res", res);
//     })
//     .catch(err => {
//         console.log("err", err);
//     });

/*
so this is not a good approach to run all asynchronous task con-currently, as it be more cpu and memory intensive
therefore we can write a function to batch tasks, i.e to divide functions in chunks and process each chunk at time on-by-one and items of a chunk will run con-currently
*/

batchifyAsyncFunctions(arrayOfFunctionReturningPromises, 30)
    .then(resp => {
        console.log("resp", resp);
    })
    .catch(err => {
        console.log("err", err);
    });

function batchifyAsyncFunctions(arrayOfAsyncFunctions, sizeOfAChunk) { // sizeOfAChunk = no of items in a chunk
    const resp = [];

    if (!arrayOfAsyncFunctions || !arrayOfAsyncFunctions.length) return Promise.resolve(resp);

    function createChunk(startIdx, resolve, reject) {
        const endIdx = startIdx + sizeOfAChunk;
        console.log("createChunk startIdx, endIdx", startIdx, endIdx);

        const thisAsyncFunctions = arrayOfAsyncFunctions.slice(startIdx, endIdx);
        Promise.all(thisAsyncFunctions.map(func => func())) // because thisAsyncFunctions is array of function returning promises but not array of promises so we need to call each function to get promise from it
            .then(res => {
                resp.push(...res);

                if (endIdx >= arrayOfAsyncFunctions.length) resolve(resp)
                else createChunk(endIdx, resolve, reject);
            })
            .catch(err => reject(err));
    }

    return new Promise(function(resolve, reject) {
        createChunk(0, resolve, reject);
    });
}