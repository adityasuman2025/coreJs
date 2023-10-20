import { useState, useRef, useEffect } from "react";

function debounce(func, delay) {
    let timer;

    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.call(this, ...args);
        }, delay);
    }
}

export default function AutoComplete({
    value,
    getSuggestions,
    suggestionItemRenderer,
    handleSuggestionClick
}) {
    const inputRef = useRef(null);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        inputRef.current.value = value;
        inputRef.current.focus();
    }, [value]);

    const optimisedHandleChange = debounce(handleChange, 300);
    async function handleChange(e) {
        const val = e.target.value.trim();

        if (val) {
            const filteredData = await getSuggestions(val);
            setSuggestions(filteredData);
            setSuggestionsVisible(true);
        } else {
            setSuggestionsVisible(false);
        }
    }

    return (
        <div id="content">
            <div id="autoComplete">
                <input ref={inputRef} type="text" id="autoCompleteInput" autoFocus onChange={(e) => optimisedHandleChange(e)} />
                {
                    suggestionsVisible &&
                    <div id="autoCompleteSuggestions">
                        {
                            suggestions.map((sugg, idx) => (
                                <div
                                    className="autoCompleteSuggestion" key={idx}
                                    onClick={() => {
                                        setSuggestionsVisible(false);
                                        handleSuggestionClick && handleSuggestionClick(sugg)
                                    }}
                                >
                                    {suggestionItemRenderer(sugg)}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}