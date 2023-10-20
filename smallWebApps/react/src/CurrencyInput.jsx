import { useState } from "react";

/*
    Ques -> Create an input component which takes in only digits as input from the user and displays a formatted string using some currency prefix e.g. $ and commas as separators.
    This formatted string should be displayed as the value of the input component itself.
    There's also a max and min limit for validating the user input and if the value is less than min or greater than max, display an error below the input component. 

    e.g. 123456 -> $123,456
    123456789 -> $123,456,789
    1234 -> $1,234
*/

function formatCurrency(text) {
    const textArr = text.split(".");
    text = textArr[0];

    let commaAfter = 3, c = 0;

    let formattedText = "";
    for (let i = text.length - 1; i >= 0; i--) {
        let char = text[i];

        if (c === commaAfter) {
            formattedText = char + "," + formattedText;
            c = 0;
        } else formattedText = char + formattedText;

        c++;
    }

    return (formattedText.length ? "$" : "") + formattedText + (textArr.length > 1 ? "." + textArr[1] : "");
}

function acceptOnlyNumber(text) {
    return text.split("").filter(i => (i !== "" && !isNaN(Number(i))) || i === ".").join("");
}

function CurrencyInput({
    minVal = 10,
    maxVal = 100000000,
}) {
    const [inputVal, setInputVal] = useState("");
    const [error, setError] = useState("");

    function handleInputChange(e) {
        const val = e.target.value.trim();
        const filteredVal = acceptOnlyNumber(val);
        const formattedText = formatCurrency(filteredVal);

        setInputVal(formattedText);

        showError(filteredVal);
    }

    function showError(text) {
        if (text === "") return setError("");

        if (Number(text) < minVal) {
            setError(`Value should be greater than ${minVal}`);
        } else if (Number(text) > maxVal) {
            setError(`Value should be less than ${maxVal}`);
        } else {
            setError("");
        }
    }

    return (
        <div id="currencyInputWrapper">
            <input id="currencyInput" type="text" value={inputVal} onChange={handleInputChange} />
            <div id="currencyError">{error}</div>
        </div>
    );
}

export default CurrencyInput;
