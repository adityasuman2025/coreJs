import { useState, useEffect, useRef } from 'react';

type useFetchReturn = [boolean, string] // tuple
interface useFetchProps {
    endpoint: string;
    depdncy: any;
    enabled: boolean
    retryLimit: number;
    onSuccess: (data: Record<string, any>) => void
}
export default function useFetch({ endpoint, depdncy, enabled, retryLimit = 0, onSuccess }: useFetchProps): useFetchReturn {
    const retryCount = useRef(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    async function processFetch(controller: AbortController) {
        setIsLoading(true);
        setError(''); // Clear previous error

        try {
            const resp = await fetch(endpoint, { signal: controller.signal });
            const json = await resp.json().catch(() => ({}));

            if (!resp.ok) {
                if (resp.status === 401) {
                    // logout(); // Handle auth logout side effect
                    setError('un-authorised');
                } else if (resp.status === 400) {
                    setError(json.message || 'bad request');
                } else if (resp.status >= 500) {
                    setError('internal server error');

                    if (retryCount.current < retryLimit) {
                        retryCount.current += 1;
                        processFetch(controller);
                        return; // Return early so isLoading stays true during retry
                    }
                } else {
                    setError(json.message || 'something went wrong');
                }

                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            onSuccess(json);
        } catch (e: any) {
            if (e.name === 'AbortError') return; // Ignore request aborts

            setIsLoading(false);
            setError('Network error / something went wrong');
        }
    }

    useEffect(() => {
        if (!enabled) return setIsLoading(false);

        const controller = new AbortController();
        processFetch(controller);

        return () => controller.abort();
    }, [enabled, depdncy]);

    useEffect(() => {
        retryCount.current = 0;
    }, [endpoint]);

    return [isLoading, error];
}