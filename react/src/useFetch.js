import { useEffect, useState } from "react";

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

export default function useFetch(url, method = "get", body = {}) {
    const [apiResp, setApiResp] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const resp = await apiCall(url, method, body);
                setApiResp(resp);
            } catch (e) {
                setError(e.message);
            }
            setIsLoading(false);
        })();
    }, []);

    return [isLoading, error], apiResp;
}