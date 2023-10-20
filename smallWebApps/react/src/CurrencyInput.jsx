import { useState } from "react";

function formatCurrency(text) {
    text = removeComma(text);
    const textArr = text.split(".");
    text = textArr[0];

    let commaAfter = 3, c = 0;

    let out = "";
    for (let i = text.length - 1; i >= 0; i--) {
        let char = text[i];

        if (c === commaAfter) {
            out = char + "," + out;
            commaAfter = 3;
            c = 0;
        } else {
            out = char + out;
        }

        c++;
    }

    return out + (textArr.length > 1 ? "." + textArr[1] : "");
}

function removeComma(text) {
    return text.split("").filter(i => i !== ",").join("")
}

function acceptOnlyNumber(text) {
    return text.split("").filter(i => (i !== " " && !isNaN(Number(i))) || i === ".").join("");
}

function CurrencyInput() {
    const [inputVal, setInputVal] = useState("");

    function handleInputChange(e) {
        const val = acceptOnlyNumber(e?.target?.value || "");

        setInputVal(formatCurrency(val));
    }

    return (
        <div id="currencyInputWrapper">
            <input id="currencyInput" type="text" value={inputVal} onChange={handleInputChange} />
        </div>
    );
}

export default CurrencyInput;
