import { useCallback, memo, useMemo } from 'react';

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.call(this, ...args);
        }, delay);
    };
}

interface InputBoxProps {
    onChange: (query: string) => void;
}
function InputBox({ onChange }: InputBoxProps) {
    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, []);

    const optimisedHandleChange = useMemo(() => debounce(handleChange, 500), [handleChange])

    return (
        <section>
            <input type="text" onChange={optimisedHandleChange} />
        </section>
    );
}

export default memo(InputBox);