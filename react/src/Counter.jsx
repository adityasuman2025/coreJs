import { useState, useEffect } from "react";

// ref: https://react.dev/learn/queueing-a-series-of-state-updates#
export default function Counter() {
    const [counter, setCounter] = useState(0);
    console.log("counter", counter);

    useEffect(() => {
        // setInterval(() => {
        //     // setCounter((counter) => counter + 1);
        //     setCounter(counter + 1);
        // }, 2000);

        // setTimeout(() => {
        //     // setCounter((counter) => counter + 1);
        //     setCounter(counter + 1);
        // }, 100);

        /*
            useEffect with [] runs once. The arrow function inside setInterval is created during the very first render and never recreated.

            That arrow function captures counter by closure. At the time of capture, counter === 0. JavaScript closures freeze that reference — the function will forever see counter as 0, regardless of what the component's state actually is.

            React bails out of identical updates. When setCounter(x) is called with a value React already has (via Object.is), it skips the re-render.

            setInterval(() => {
                // setCounter((counter) => counter + 1); // it will keep increasing counter, so counter will be rendered infinite times
                console.log("interval")
                setCounter(counter + 1); // it will increase counter only 1 time, so counter will be rendered 2 times - 0 (initial value) & 1 (increased value)
            }, 2000);
        */
    }, []);

    function handleIncreaseClick() {
        // setInterval(() => {
        //     setCounter(counter => counter + 1) // counter will keep increasing
        //     // setCounter(counter + 1); // counter will always be 1
        // }, 100);

        // first
        setCounter(counter + 1);
        setCounter(counter + 1);
        setCounter(counter + 1);
        // it will make counter to 1

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