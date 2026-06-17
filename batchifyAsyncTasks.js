/*
    Problem: how to handle 200 network request/asynchronous tasks

    Solution: We can batch them in chunks (suppose the size of the chunk/no of items in a chunk is 10) and process chunks one-by-one, and in a chunk all items will run concurrently / parallelly. So at any moment, at most the size of the chunk network requests are going on.
*/

function request() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * (100 - 1) + 1));
        }, 200)
    })
}
// request().then(resp => console.log("resp", resp))

const arr = new Array(100).fill(0).map(() => request);
// console.log("arr", arr)

function batchify(arrayOfPromises) {
    return new Promise((resolve, reject) => {
        const result = [];
        const totalSize = arrayOfPromises?.length || 0, chunkSize = 7;

        if (totalSize < 1) return resolve(result);

        function createChunk(start, end) {
            console.log("processing chunk from", start, "to", end - 1)
            Promise.all(arrayOfPromises.slice(start, end).map(func => func()))
                .then(resp => {
                    result.push(...resp);

                    if (end >= totalSize) resolve(result);
                    else createChunk(end, Math.min(end + chunkSize, totalSize));
                })
                .catch(reject);
        }
        createChunk(0, chunkSize);
    });
}

batchify(arr).then(ans => console.log("ans", ans));
