import { useRef, useEffect } from "react";

interface useMutationProps {
    url: string
}

function useMutation({ url }: useMutationProps) {
    const controllerRef = useRef<AbortController | null>(null);

    async function mutate() {
        if (controllerRef.current) controllerRef.current.abort(); // Abort the previous request if it's still running

        // Create a new AbortController for the current request
        const controller = new AbortController();
        controllerRef.current = controller;

        try {
            const resp = await fetch(url, { signal: controller.signal });
            const json = await resp.json();

            if (!resp.ok) throw new Error(json.message || "Mutation failed");

            return json;
        } catch (error: any) {
            if (error.name === 'AbortError') return; // Ignore errors caused by aborted requests
            throw error;
        } finally {
            if (controllerRef.current === controller) controllerRef.current = null;
        }
    }

    // Clean up ongoing request on unmount
    useEffect(() => {
        return () => {
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, []);

    return { mutate };
}

export default useMutation;