import React, { createContext, useContext, useRef } from 'react';

const PubSubContext = createContext();

export function PubSubProvider({ children }) {
    const subscriptions = useRef({});

    const subscribe = (topic, callback) => {
        subscriptions.current = {
            ...(subscriptions.current || {}),
            [topic]: [...(subscriptions.current?.[topic] || []), callback]
        };

        return function unsubscribe() {
            subscriptions.current = {
                ...(subscriptions.current || {}),
                [topic]: subscriptions.current?.[topic]?.filter(cb => cb !== callback),
            }
        };
    };

    const publish = (topic, ...args) => {
        subscriptions.current?.[topic]?.forEach(sub => sub(...args));
    };

    return (
        <PubSubContext.Provider value={{ subscribe, publish }}>
            {children}
        </PubSubContext.Provider>
    );
};

export function usePubSub() {
    return useContext(PubSubContext);
};