import { useState, useEffect } from "react";

const LENGTH = 5;

export default function EventQueue() {
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        if (queue.length === LENGTH) {
            queue.forEach(eventHandler => {
                eventHandler();
            });

            setQueue([]);
        }
    }, [queue]);

    function handleClick(event, len) {
        console.log("clicked id len", len);
    }

    return (
        <button onClick={(e) => {
            setQueue(prev => [...prev, handleClick.bind(this, e, queue.length)])
        }}>click</button>
    )
}