/*
    Create a function called enforceTimeLimit that takes an API request function apiFn and an integer timeLimit, representing the maximum allowed execution time. The apiFn is generated using the functionGenerator method from a helper class, which accepts apiResponse and executionTime as parameters. The aim is to return a modified version of apiFn that respects the specified time limit. If apiFn runs longer than the given timeLimit, it should be terminated or rejected.
*/

function enforceTimeLimit(apiFunc, timeLimit) {
    // solution 1 (classic)
    // return function(...args) {
    //     return new Promise((resolve, reject) => {
    //         const timer = setTimeout(() => reject("Timelimit exceeded"), timeLimit);

    //         apiFunc.call(this, ...args)
    //             .then(resp => resolve(resp))
    //             .catch(err => reject(err))
    //             .finally(() => clearTimeout(timer))
    //     })
    // }

    // solution 2 (modern)
    return function(...args) {
        let timer;
        const timerPromise = new Promise((_, reject) => {
            timer = setTimeout(() => reject("Timelimit exceeded"), timeLimit);
        });

        return Promise.race([timerPromise, apiFunc.call(this, ...args)])
            .finally(() => clearTimeout(timer));
    }
}