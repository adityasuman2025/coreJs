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
    const retryCount = useRef(1);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    function processFetch(controller: AbortController) {
        setIsLoading(true);
        setError(''); // Clear previous error

        fetch(endpoint, { signal: controller.signal })
            .then((resp) => {
                if (!resp.ok) throw { status: resp.status };
                else return resp.json();
            })
            .then((resp) => {
                setIsLoading(false);
                onSuccess(resp);
                // throw { status: 500 }; // to mock
            })
            .catch((e) => {
                if (e.name === 'AbortError') return; // Ignore aborts

                setIsLoading(false);

                if (e?.status === 500) {
                    setError('internal server error');

                    if (retryCount.current < retryLimit) {
                        retryCount.current = retryCount.current + 1;
                        processFetch(controller);
                    }
                } else if (e?.status === 400) setError('bad request');
                else setError('something went wrong');
            });
    }

    useEffect(() => {
        if (!enabled) return setIsLoading(false);

        const controller = new AbortController();
        processFetch(controller);

        return () => controller.abort();
    }, [enabled, depdncy]);

    useEffect(() => {
        retryCount.current = 1;
    }, [endpoint]);

    return [isLoading, error];
}