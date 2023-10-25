import React from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import ComponentC from "./ComponentC";
import { PubSubProvider } from './PubSubContext';

const App = () => {
    return (
        <PubSubProvider>
            <ComponentA />
            <ComponentB />

            <ComponentC />
        </PubSubProvider>
    );
};

export default App;