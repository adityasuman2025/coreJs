import { useState } from "react";

// ref: https://react.dev/learn/queueing-a-series-of-state-updates#
export default function Random() {
    const [counter, setCounter] = useState(0);

    function handleIncreaseClick() {
        // setInterval(() => {
        //     setCounter(counter => counter + 1) // counter will keep increasing
        //     // setCounter(counter + 1); // counter will always be 1
        // }, 100);

        // // first
        // setCounter(counter + 1);
        // setCounter(counter + 1);
        // setCounter(counter + 1);
        // // it will make counter to 1

        // // second
        // setCounter(counter => counter + 1);
        // setCounter(counter => counter + 1);
        // setCounter(counter => counter + 1);
        // // it will make counter to 3
    }

    return (
        <div>
            <div>{counter}</div>
            <button onClick={handleIncreaseClick}>increase</button>
        </div>
    )
}