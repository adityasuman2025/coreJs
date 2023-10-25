import React, { useEffect } from 'react';
import { usePubSub } from './PubSubContext';

export default function ComponentC() {
    const { subscribe } = usePubSub();

    useEffect(() => {
        const unsubscribe = subscribe("topic1", (...args) => {
            console.log('Message Received in Component C:', ...args);
        });

        return () => {
            unsubscribe();
        };
    }, [subscribe]);

    return (
        <div>
            <h2>Component C</h2>
        </div>
    );
};