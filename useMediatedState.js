/*
    https://www.greatfrontend.com/questions/javascript/use-mediated-state?practice=practice&tab=coding
*/

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * @template T
 * @param {Function} mediator
 * @param {T | undefined} initialState
 */
export default function useMediatedState(mediator, initialState) {
    const mediatorRef = useRef(mediator);

    const stateRef = useRef(initialState);
    const [state, setState] = useState(initialState);
    stateRef.current = state;

    const updateState = useCallback((val) => {
        const newVal = typeof val === "function" ? val(stateRef.current) : val;

        if (mediatorRef.current.length > 1) mediatorRef.current(newVal, setState);
        else setState(mediatorRef.current(newVal));
    }, []);

    return [state, updateState];
}
