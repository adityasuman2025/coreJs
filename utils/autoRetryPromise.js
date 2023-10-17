/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
    let count = 0;
    return new Promise(function(resolve, reject) {
        apiCall(resolve, reject);
    });

    async function apiCall(resolve, reject) {
        try {
            const resp = await fetcher();
            resolve(resp);
        } catch (e) {
            count++;

            if (count <= maximumRetryCount) apiCall(resolve, reject);
            else reject(e);
        }
    }
}