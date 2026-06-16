import { useCallback, memo, useSyncExternalStore } from "react";
import inputStore from "./inputStore";

// if we used useState here then moving the state to the parent component (App) would have been very complicated
// therefore we created a independent store out of the scope of this component (Input) and used useSyncExternalStore to subscribe to that store
// then directly accessing the store from the parent component (Input) to get the state (value) from the store

function Input() {
    console.log("Input Re-rendered");

    const getSnapshot = useCallback(() => {
        return inputStore.get();
    }, []);

    const value = useSyncExternalStore(inputStore.subscribe, getSnapshot);

    const handleChange = useCallback((e) => {
        inputStore.set(e.target.value);
    }, []);

    return (
        <input
            type="text"
            placeholder="Add your task"
            value={value}
            onChange={handleChange}
        />
    )
}

export default memo(Input);