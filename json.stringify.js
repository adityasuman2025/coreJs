// ref: https://bigfrontend.dev/problem/implement-JSON-stringify

/**
 * @param {any} data
 * @return {string}
 */
function stringify(data) {
    function util(data) {
        if (typeof data?.toJSON === 'function') return util(data.toJSON());

        if (data === null || data === undefined) return 'null';
        else if (typeof data === "string") return '"' + data + '"';
        else if (typeof data === "number") return isFinite(data) ? String(data) : 'null';
        else if (typeof data === "boolean") return String(data);
        else if (typeof data === 'bigint') throw new TypeError('BigInt not supported');
        else if (typeof data === 'function' || typeof data === 'symbol') return undefined;
        else if (typeof data === "object") {
            if (Array.isArray(data)) {
                return '[' + data.reduce((acc, item, idx) => (acc + (util(item) ?? 'null') + (idx === data.length - 1 ? "" : ",")), "") + ']'
            } else {
                const keys = Object.keys(data);

                return "{" + keys.reduce((acc, key, idx) => {
                    const val = data[key];
                    return val !== undefined ? (acc + '"' + key + '":' + (util(val) ?? 'null') + (idx === keys.length - 1 ? "" : ",")) : acc
                }, "") + "}";
            }
        }

        return data;
    }

    return util(data);
}

const data = [NaN, null, undefined, Infinity] // {name: "siddhu"} // [1,2,3, "4"]; //
console.log(stringify(data))