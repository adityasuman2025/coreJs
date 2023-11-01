import { useState, useEffect } from "react";

// ref: https://react.dev/learn/queueing-a-series-of-state-updates#
export default function Counter() {
    const [counter, setCounter] = useState(0);
    console.log("counter", counter);

    useEffect(() => {
        setTimeout(() => {
            setCounter((counter) => counter + 1);
            // setCounter(counter + 1);
        }, 100); // it will increase counter only 1 time, so counter will be rendered 2 times - 0(initial value) & 1 (increased value)

        // setInterval(() => {
        //     // setCounter((counter) => counter + 1); // it will keep increasing counter, so counter will be rendered infinite times
        //     setCounter(counter + 1); // it will increase counter only 1 time, so counter will be rendered 2 times - 0(initial value) & 1 (increased value)
        // }, 2000);

        /*
            My own thought

            setTimeout, setInterval and setCounter are asynchronous, they uses event loop, and put the callback in macrotask/callback queue
            and counter is const, which is blocked scope, so in the setTimeout callback, value of counter will be the its value when it goes in callback queue
            which will be initial value of counter, as setCounter is also asynchronous

            check setTimeout.js file of the root directory
        */
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