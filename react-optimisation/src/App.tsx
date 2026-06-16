import { useState, useCallback } from "react";
import ListItem from "./ListItem";
import Input from "./Input";
import inputStore from "./inputStore";

export default function App() {
    const [items, setItems] = useState(["Walk the dog", "Water the plants", "Wash the dishes"]);

    console.log("App Re-rendered");

    // useEffect(() => {
    //   setTimeout(() => {
    //     setItems((prev) => [...prev, "yo bro"]);
    //   }, 2000);
    // }, []);

    const handleDeleteClick = useCallback((item: string) => {
        setItems((prev) => prev.filter((i) => i !== item));
    }, []);

    const handleSubmit = useCallback(() => {
        // here we directly accessed the value using inputStore.get()
        // we do not need to subscribe to the store here, because we don't want this component to re-render when state in the store changes
        const value = inputStore.get();
        if (!value.trim()) return;

        setItems(prev => [...prev, value]);
        inputStore.set("")
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                {/* 
                    If we put the input HTML element directly here then on every typing on the input element, App would have re-rendered
                    -> therefore to prevent App's re-rendering we moved it to another modular component Input
                */}
                <Input />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <ul>
                {items.map((item) => {
                    // never use map index as key, as index value change for a particular item
                    // e.g. for "Walk the dog" index is 0 intitally and for "Water the plants" index is 1, but we delete "Walk the dog" index for "Water the plants" will become 0 from 1, and it will trigger re-render of ListItem with "Water the plants" as its key changes
                    return <ListItem key={item} item={item} onDeleteClick={handleDeleteClick} />;
                })}
            </ul>
        </div>
    );
}
