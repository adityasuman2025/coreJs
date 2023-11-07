import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import ToDos from "./ToDos";
import ContextComp from "./ContextComp";
import CustomHook from "./CustomHook";
import hoc from "./hoc";
import Content from "./Content";
import Counter from "./Counter";
import EventQueue from "./EventQueue";
import ApiCallUsingUseState from "./ApiCallUsingUseState";
import ControlledComponent from "./ControlledComponent";
import Test from "./Test";

const AuthenticatedContent = hoc(Content);
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            todos: ["hi", "bye"]
        };
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };

    handleAddToDo = function(e) { // or handleAddToDo() {
        console.log("e", e)
        //in case of regular function .bind(this) is added at the end of the onClick event handler
        //because for regular function execution context/this is the object/element which calls this function, here <button> element
        //and for arrow function execution context/this is the object where it is defined, here App class
        this.setState({ todos: [...this.state.todos, "new todo " + this.state.todos.length] });
    };

    render() {
        return (
            <div className="App">
                <Test name={"Aditya"} />
                <br /><br />

                <ControlledComponent />
                <br /><br />

                <ApiCallUsingUseState />
                <br /><br />

                <EventQueue />
                <br /><br />

                <Counter />
                <br /><br />

                <AuthenticatedContent name="Aditya" />
                <br /><br />

                <h1>Counter</h1>
                {this.state.count}<br />
                <button onClick={this.handleClick}>increase count</button>
                <br /><br />

                <h1>To Do's</h1>

                {
                    this.state.todos.length <= 5 ?
                        <>
                            <button onClick={this.handleAddToDo.bind(this)}>add to do</button>
                            {/* <button onClick={(e) => this.handleAddToDo.bind(this)(e)}>add to do</button> */}
                            {/* <button onClick={(e) => this.handleAddToDo.call(this, e)}>add to do</button> */}
                            <ToDos todos={this.state.todos} />
                        </>
                        : null // will console unmounted from componentWillUnmount of ToDos component after 5 todos
                }

                <br /><br />

                <ContextComp />
                <br /><br />

                <CustomHook />
            </div>
        );
    }
}


function expensiveCalculation(toDos) {
    console.log("expensiveCalculation");
    for (let i = 0; i < 10000; i++) { }

    return toDos.length;
}

// export default function App() {
//     const [count, setCount] = useState(1);
//     const [toDos, setToDos] = useState(["hi"]);

//     // const calculation = expensiveCalculation(toDos);
//     const calculation = useMemo(() => {
//         return expensiveCalculation(toDos);
//     }, [toDos]);

//     useEffect(() => {
//         console.log("mounted");

//         return () => {
//             console.log("un mounted");
//         }
//     }, []);

//     useEffect(() => {
//         console.log("count", count);
//     }, [count]);

//     const handleClick = useCallback(function() {
//         console.log("handleClick run");
//         setCount(count => count + 1)
//     }, [count])

//     return (
//         <div className="App">
//             <button onClick={handleClick}>count</button>
//             <h2>Start editing to see some magic happen!</h2>
//             {calculation}
//         </div>
//     );
// }


ReactDOM.createRoot(document.getElementById('root')).render(<App />);
