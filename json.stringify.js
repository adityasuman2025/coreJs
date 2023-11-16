// ref: https://bigfrontend.dev/problem/implement-JSON-stringify

function stringify(data) {
    if ([null, undefined].includes(data)) return 'null';

    if (typeof data === 'string') return `"${data}"`;
    if (['number', 'boolean'].includes(typeof data)) return `${data}`;

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

