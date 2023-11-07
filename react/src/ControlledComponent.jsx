import { useState } from "react";

export default function ControlledComponent() {
    const [inputValue, setInputValue] = useState('bro');
    function handleChange(event) {
        setInputValue(event.target.value);
    }

    return (
        <input
            type="text"
            defaultValue={"yo"} // gives warning that it contains both defaultValue and value // Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both)
            value={inputValue}
            onChange={handleChange} />
    );
}
