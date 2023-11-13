// ref: https://bigfrontend.dev/problem/promisify

/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(error, data) {
                if (error) {
                    reject(error)
                } else {
                    resolve(data);
                }
            }

            func.call(this, ...args, callback);
        });
    }
}