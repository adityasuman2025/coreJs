import { useState, memo } from "react";

async function apiCall(url, method = "get", body = {}) {
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

function ApiCallUsingUseState() {
    const [data, setData] = useState(() => {
        apiCall("https://random-flat-colors.vercel.app/api/random?count=10")
            .then(apiResp => {
                setData(apiResp)
            });
    });
    console.log("data", data);

    function handleClick() {
        console.log("clicked")
    }

    return (
        <div>
            <button onClick={handleClick}>API Comp Button</button>
        </div>
    )
}

export default memo(ApiCallUsingUseState);