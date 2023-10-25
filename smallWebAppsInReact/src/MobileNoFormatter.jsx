import { useState } from "react";

function allowOnlyNumber(text) {
    return text.split("").filter(char => (char !== "" && char !== " " && !isNaN(Number(char)))).join("");
}

function formatMobileNumber(text) {
    let out = "";

    const format = [{ pos: 6, symbol: " " }]; // symbol will be added at given pos // indian format
    let formatIdx = 0;

    let c = 0;
    for (let i = text.length - 1; i >= 0; i--) {
        const { pos: formatPos, symbol: formatSymbol } = format?.[formatIdx] || {}
        const char = text[i];

        if (c === formatPos) {
            if (typeof formatSymbol === "function") out = formatSymbol(char, out);
            else out = char + (formatSymbol || " ") + out;

            formatIdx++;
        } else out = char + out;

        c++;
    }

    return (out.length > 0 ? "+91 " : "") + out;
}

export default function MobileNoFormatter() {
    const [value, setValue] = useState("");

    function handleInputChange(e) {
        const text = e.target?.value?.trim() || "";

        const prefixRemoved = text.replace("+91", "").trim();
        const filteredOnlyNumber = allowOnlyNumber(prefixRemoved);
        const mobileNoFormatted = formatMobileNumber(filteredOnlyNumber);

        setValue(mobileNoFormatted);
    }

    return (
        <div id="content">
            <input id="currencyInput" type="text" value={value} onChange={handleInputChange} autoFocus />
        </div>
    )
}