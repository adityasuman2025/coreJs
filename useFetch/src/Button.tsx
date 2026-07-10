import { memo, useState, useCallback, useMemo } from "react";
import useMutation from "./useMutation";

function debounce(func: (...args: any) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return function (...args: any) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.call(this, ...args);
        }, delay);
    };
}

const API_URL = " https://dummyjson.com/products/search?q=hey";

function Button() {
    const [count, setCount] = useState(1);

    const mutation = useMutation({ url: API_URL });
    console.log("Button re-render", count)

    const handleClick = useCallback(() => {
        setCount(prev => prev + 1);

        mutation.mutate();
    }, []);

    const debouncedClickHandler = useMemo(() => {
        return debounce(handleClick, 1000);
    }, [handleClick])

    return (
        <button onClick={handleClick}>click Me</button>
    )
}

export default memo(Button);