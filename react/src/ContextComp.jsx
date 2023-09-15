import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

function ContextComp() {
    const [value, setValue] = useState(1);

    return (
        <MyContext.Provider value={value}>
            <h1>React Context API</h1>
            <button onClick={() => setValue(prev => prev + 1)}>Update Value</button>
            <ChildComp />
        </MyContext.Provider>
    )
}

function ChildComp() {
    const value = useContext(MyContext);
    return (
        <div>value is {value}</div>
    )
}


export default ContextComp;