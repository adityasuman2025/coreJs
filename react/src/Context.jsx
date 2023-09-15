import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const Context = () => {
    const [value, setValue] = useState(1);

    return (
        <MyContext.Provider value={value}>
            <ChildComponent />
            <button onClick={() => setValue(prev => prev + 1)}>Change Value</button>
        </MyContext.Provider>
    );
};

const ChildComponent = () => {
    const contextValue = useContext(MyContext);

    return <div>{contextValue}</div>;
};

export default Context;
