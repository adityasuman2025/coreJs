import React, { useEffect } from 'react';
import { usePubSub } from './PubSubContext';

export default function ComponentA() {
    const { subscribe, publish } = usePubSub();

    useEffect(() => {
        const unsubscribe = subscribe("topic1", (...args) => {
            console.log('Message Received in Component A:', ...args);
        });

        return () => {
            unsubscribe();
        };
    }, [subscribe]);

    function handleClick() {
        publish("topic1", 'Message from Component A', "yo");
    };

    return (
        <div>
            <h2>Component A</h2>
            <button onClick={handleClick}>Publish</button>
        </div>
    );
};