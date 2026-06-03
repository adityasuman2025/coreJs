async function apiCall(url, method = "get", body = {}) {
    try {
        const resp = await fetch(url, {
            method: method || "get",
            ...(method !== "get" ? { body: JSON.stringify(body || {}) } : {})
        });

        if (resp.ok) return await resp.json();
        else throw Error("failed");
    } catch (e) {
        throw Error(e)
    }
}

apiCall("https://random-flat-colors.vercel.app/api/random?count=10")
    .then(apiResp => console.log("apiResp", apiResp))
    .catch(e => console.log("catch", e.message))
