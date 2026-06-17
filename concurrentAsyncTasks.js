/*  
    https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/map-async-limit

    Map Async Limit
    Difficulty: Medium
    Recommended duration to spend during interviews: 25 mins
    
    In Map Async, we wrote a function that accepts an array of items and maps each element with an asynchronous mapping function and returns a Promise which resolves to the mapped results.

    Practically, this can be used for mapping an input array with the results of calling an API where the input element is the argument to the API. However, if your array has a large number of items, you'd be making that many API calls at the same time, which will almost certainly get you rate limited by the API service. We want to execute our tasks concurrently so that it is more efficient while staying within the rate limits of the API.

    Implement a mapAsyncLimit function that takes in an optional parameter size, the maximum number of ongoing async tasks so that the input array can be processed in chunks of size, achieving parallelism while staying within the provided limit. If size is not specified, the chunk size is unlimited.

    Examples
    async function fetchUpperCase(q: string) {
        // Fake API service that converts a string to uppercase.
        const res = await fetch('https://uppercase.com?q=' + encodeURIComponent(q));
        return await res.text();
    }

    // Only a maximum of 2 pending requests at any one time.
    const results = await mapAsyncLimit(
        ['foo', 'bar', 'qux', 'quz'],
        fetchUpperCase,
        2,
    );
    console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
*/


/**
 * @param {Array<unknown>} iterable
 * @param {(value: unknown) => Promise<unknown>} callbackFn
 * @param {number} [size=Infinity]
 *
 * @return {Promise<Array<unknown>>}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
    return new Promise((resolve, reject) => {
        const ans = [];
        if (!iterable.length) return resolve(ans);

        const maxConCurrTasks = Math.min(Math.max(size, 1), iterable.length); // if size is 0, then running at-least 1 con-current task but can run upto the length of the iterables
        let liveConCurrTasksCount = 0, compTasksCount = 0, nextTaskIdx = 0;
        let hasError = false;

        // initially running con-current tasks upto given size (maxConCurrTasks)
        for (let i = 0; i < maxConCurrTasks; i++) doTask();

        function doTask() {
            liveConCurrTasksCount++; // a new con-current task is starting

            const thisTaskIdx = nextTaskIdx;
            console.log("started doTask", thisTaskIdx)

            Promise.resolve(callbackFn(iterable[thisTaskIdx], thisTaskIdx))
                .then(result => {
                    if (hasError) return;

                    console.log("callbackFn then taskIdx", thisTaskIdx)
                    ans[thisTaskIdx] = result;
                    liveConCurrTasksCount--; // a con-current task has completed
                    compTasksCount++; // one more task has done

                    // if all tasks are done then resolving the main promise
                    if (compTasksCount === iterable.length) return resolve(ans);

                    // if there are more pending tasks then starting it if live con-current tasks is less than allowed size (maxConCurrTasks)
                    if (liveConCurrTasksCount < maxConCurrTasks && nextTaskIdx < iterable.length) doTask();
                })
                .catch(error => {
                    hasError = true;
                    reject(error);
                });

            nextTaskIdx++;
        }
    });
}

function fetchUpperCase(item, idx) {
    return new Promise((resolve) => setTimeout(() => resolve(item), 1000 * (idx + 1)));
}

(async function() {
    const results = await mapAsyncLimit(['foo', 'bar', 'qux', 'quz'], fetchUpperCase, 2); // Only a maximum of 2 pending requests at any one time.
    console.log("results", results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
})()
