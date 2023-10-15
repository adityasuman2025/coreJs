// ref: https://bigfrontend.dev/problem/implement-JSON-stringify
function stringify(data) {
    if (data !== data) return 'null';
    if ([Infinity, -Infinity, null, undefined].includes(data)) return 'null';

    if (typeof data === 'bigint') {
        throw new Error('Do not know how to serialize a BigInt at JSON.stringify');
    }
    if (typeof data === 'string') return `"${data}"`;
    if (['number', 'boolean'].includes(typeof data)) return `${data}`;
    if (typeof data === 'function') return undefined;
    if (typeof data === 'symbol') return 'null';
    if (data instanceof Date) return `"${data.toISOString()}"`;

    if (typeof data === "object") {
        if (Array.isArray(data)) {
            let out = data.reduce((acc, i) => acc + (stringify(i) + ","), "");
            out = out.substring(0, out.length - 1);

            return "[" + out + "]";
        } else {
            let out = Object.keys(data).reduce((acc, key) => {
                const val = data[key];
                if (val !== undefined) acc += `"${key}":${stringify(val)},`;
                return acc;
            }, "");
            out = out.substring(0, out.length - 1);

            return "{" + out + "}";
        }
    }
}


const data = { a: undefined, b: null, c: NaN, d: Infinity }; // "{"b":null,"c":null}"
const ans = stringify(data);
console.log(ans);