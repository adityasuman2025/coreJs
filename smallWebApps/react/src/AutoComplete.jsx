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

/*
    pagination props
*/
export default function AutoComplete({
    autoFocus = true,
    placeholder = "",
    theming: {
        containerClassName = "",
        inputFieldClassName = "",
        suggestionContainerClassName = "",
    } = {},
    loadingRenderer = "loading",
    errorRenderer = (error) => (error || "something went wrong"),
    debounceDuration = 300,

    useCache = true,
    cacheTimeToLive = 60, // in minutes

    value,
    getSuggestions = () => { },
    suggestionItemRenderer,
    handleSuggestionClick
}) {
    const cacheTimeToLiveInMSeconds = cacheTimeToLive * 60 * 1000; // in milli seconds

    const inputRef = useRef(null);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [cache, setCache] = useState({});

    useEffect(() => {
        inputRef.current.value = value;
        inputRef.current.focus();
    }, [value]);

    const optimisedHandleChange = debounce(handleChange, debounceDuration);
    async function handleChange(e) {
        setError("");

        const query = e.target.value.trim();
        if (query) {
            setSuggestionsVisible(true);
            try {
                setIsLoading(true);

                await optimisedGetSuggestions(query);
            } catch (e) { // any failure in api call can be detected here
                setError("failed to get suggestions");
            }
        } else {
            setSuggestionsVisible(false);
        }

        setIsLoading(false);
    }

    async function optimisedGetSuggestions(query) {
        const currentTime = (new Date()).getTime();
        const cacheResult = cache?.[query] || {};
        let filteredData = cacheResult?.data || [];
        let lastUsedTime = cacheResult?.lastUsedTime || 0;

        if (useCache) {
            if (!cache.hasOwnProperty(query)) filteredData = await getSuggestions(query); // no cache for that query
            else {
                if (currentTime <= lastUsedTime + cacheTimeToLiveInMSeconds) { // cache exists for that query
                } else filteredData = await getSuggestions(query); // cache exipred for that query
            }

            setCache(prev => ({
                ...prev,
                [query]: { ...(prev[query] || {}), data: filteredData, lastUsedTime: currentTime }
            }));
        } else filteredData = await getSuggestions(query); // caching is disabled

        setSuggestions(filteredData);
    }

    return (
        <div id="autoComplete" className={containerClassName}
            aria-expanded={suggestionsVisible}
            aria-autocomplete="list"
            aria-haspopup={true}
            aria-label="Search"
        >
            <input ref={inputRef} type="text"
                id="autoCompleteInput" className={inputFieldClassName}
                autoFocus={autoFocus} placeholder={placeholder}
                onChange={(e) => optimisedHandleChange(e)}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                role="combobox"
            />

            <ul id="autoCompleteSuggestions" className={suggestionContainerClassName} aria-live={true}>
                {
                    (isLoading) ? (
                        <div id="loaderOrError">{loadingRenderer}</div>
                    ) : (error) ? (
                        <div id="loaderOrError">{errorRenderer(error)}</div>
                    ) : (
                        suggestionsVisible && suggestions.map((sugg, idx) => (
                            <li
                                className="autoCompleteSuggestion" key={idx}
                                onClick={() => {
                                    setSuggestionsVisible(false);
                                    handleSuggestionClick && handleSuggestionClick(sugg)
                                }}
                            >
                                {suggestionItemRenderer(sugg)}
                            </li>
                        ))
                    )
                }
            </ul>
        </div>
    )
}