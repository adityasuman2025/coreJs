async function apiCall(url, method = "get", body = {}) {
    // return fetch(url, {
    //     method: method || "get",
    //     ...(method !== "get" ? { body: JSON.stringify(body || {}) } : {})
    // })
    //     .then(resp => {
    //         return resp.json();
    //     })
    //     .then(jsonResp => {
    //         return jsonResp;
    //     })
    //     .catch(e => {
    //         throw Error(e)
    //     });

    try {
        const resp = await fetch(url, {
            method: method || "get",
            ...(method !== "get" ? { body: JSON.stringify(body || {}) } : {})
        });
        const jsonResp = resp.json();

        return jsonResp;
    } catch (e) {
        throw Error(e)
    }
}

apiCall("https://random-flat-colors.vercel.app/api/random?count=10")
    .then(apiResp => {
        console.log("apiResp", apiResp)
    });
