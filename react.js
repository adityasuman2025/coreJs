/*------------ Problem 1 -------------*/
function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

    return <button onClick={handleClick}>{count}</button>;
}



/*------------ Problem 2 -------------*/
export default function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        flushSync(() => {
            setCount(count + 1);
        });

        setCount(count + 1);
        setCount(count + 1);
    }

    return <button onClick={handleClick}>{count}</button>;
}



/*------------ Problem 3 -------------*/
export default function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);

        setTimeout(() => {
            console.log(count);
            setCount(count + 1);
        }, 1000);
    }

    return <button onClick={handleClick}>{count}</button>;
}



/*------------ Problem 4 -------------*/
function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

    return (
        <button onClick={handleClick}>
            {count}
        </button>
    );
}



/*------------ Explanation -------------*/
/*
    Problem 1:
    1. For a given render scope, all inner functions defined in the component forms a closure over the variables/states defined in the component i.e. it remembers the snapshot values/states present in the component of the current render cycle.
    2. and when we do a direct state update (count + 1) react updates the state and triggers re-render but it don't trigger the re-render immediately but it batches all state updates inside it internal queue for state updates and tigger state update only a single time when the hander fucntion (handleClick) completes (done executing).
    3. And after the re-render, for the new render scope react creates a brand new, fresh reference of the state/variable with the updated value.
    4. In 1st problem we are doing 3 direct state updates in handleClick function, so for all of them value of count is 0 (in the current render scope) and as react don't do state update immediately so for all 3 state updates value of count is 0 so all of them update the count state to 1 (0 + 1)
    5. when handleClick finishes then react re-renders the component with count state as 1, hence 1 is displayed in the button
*/

/*
    Problem 2:
    1. flushSync forces react to do the state update and trigger re-render immediately so re-render will happen and a new render scope with the updated value (count as 1) will get created
    2. but the handleClick is not complete yet, there are still lines below flushSync which are pending to be executed and that handleClick belongs to the older render cycle (initial render) which has formed closure with the count as 0
    3. therefore for subsequent lines count is still 0 and setCount will make them 1 and latest value of count in the latest render cycle is also 1 so react will skip new re-render
*/

/*
    Problem 3:
    1. when handleClick runs, first line of it i.e. setCount(count + 1) gets executed and this state update get batched in the react internal queue for state updates, then next line is executed and the setTimout callback is registered, then handleClick finishes then re-render happens i.e. creates another render scope with count as 1 (0 + 1), as the next line is setTimeout and the callback inside of it will run only when the timer expires.
    2. when the timer expires its callback runs but the timer's callback has formed closure with the intital render scope (count 0), so the value of count is still 0 in there, hence 0 is logged and the setCount will again make the count value to 1 (0 + 1), which is same as of latest count value in the latest render scope, hence will not trigger re-render and value of count remains 1 in the latest render scope
*/

/*
    Problem 4:
    1. When we do state update using the updater function inside state setter function (setState()) then also the state updates are batched in react internal queue for state updates and it get executed when the hander fucntion (handleClick) completes (done executing).
    2. so in this problem 3 updater function will be batched and when it runs, the state updater function runs in sequence one after another each getting the latest value of the state (here count) therefore count will become 3 when the last state updater function of the react internal state updates queue runs and re-render happens with a new render scope having value of count as 3
*/