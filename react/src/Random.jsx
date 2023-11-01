import { useState, useEffect } from "react";

// ref: https://react.dev/learn/queueing-a-series-of-state-updates#
export default function Random() {
    const [counter, setCounter] = useState(0);
    console.log("counter", counter);

    useEffect(() => {
        setTimeout(() => {
            setCounter((counter) => counter + 1);
            // setCounter(counter + 1);
        }, 100); // it will increase counter only 1 time, so counter will be rendered 2 times - 0(initial value) & 1 (increased value)

        // setInterval(() => {
        //     // setCounter((counter) => counter + 1); // it will keep increasing counter, so counet will be rendered infinite times
        //     setCounter(counter + 1); // it will increase counter only 1 time, so counter will be rendered 2 times - 0(initial value) & 1 (increased value)
        // }, 100); 
    }, []);

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