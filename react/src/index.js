import { createRoot } from "react-dom/client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import ToDos from "./ToDos";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function expensiveCalculation(toDos) {
    console.log("expensiveCalculation");
    for (let i = 0; i < 10000; i++) {}
  
    return toDos.length;
}
  
export default class App extends React.Component {
    constructor() {
      super();
      this.state = {
        count: 1,
        todos: ["hi", "bye"]
      };
    }
  
    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };
  
    handleAddToDo = function () {
        //in case of normal function .bind(this) is added at the end of the onClick event handler
        //because for normal function context/this is the object/element in which it is used
        //but for arrow function context/this is the object where it is defined, here App class
        this.setState({ todos: [...this.state.todos, "new todo"] });
    };
  
    render() {
      return (
        <div className="App">
          <button onClick={this.handleClick}>increase count</button>
          <br />
          <button onClick={this.handleAddToDo.bind(this)}>add to do</button>
          <br />
          <br />
  
          {this.state.count}
          <ToDos todos={this.state.todos} />
        </div>
      );
    }
  }
  
  // export default function App() {
  //   const [count, setCount] = useState(1);
  //   const [toDos, setToDos] = useState(["hi"]);
  
  //   // const calculation = expensiveCalculation(toDos);
  //   const calculation = useMemo(() => {
  //     return expensiveCalculation(toDos);
  //   }, [toDos]);
  
  //   useEffect(() => {
  //     console.log("mounted");
  
  //     return () => {
  //       console.log("un mounted");
  //     }
  //   }, []);
  
  //   useEffect(() => {
  //     console.log("count", count);
  //   }, [count]);
  
  //   const handleClick = useCallback(function() {
  //     console.log("handleClick run");
  //     setCount(count => count +1)
  //   }, [count])
  
  //   return (
  //     <div className="App">
  //       <button onClick={handleClick}>count</button>
  //       <h2>Start editing to see some magic happen!</h2>
  //       {calculation}
  //     </div>
  //   );
  // }

root.render(
    <App />
);