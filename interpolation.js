// ref: https://bigfrontend.dev/problem/interpolation

/**
 * @param {string} translation
 * @param {any} data
 * @returns {string}
 */
function t(str, data = {}) {
    const length = str.length;

    let out = str;
    for (let i = 0; i < length;) {
        if (str[i] === "{" && str[i + 1] === "{") {
            let j = i + 2;
            while (str[j] !== "}" && j < length) j++;

            if (str[j] === "}" && str[j + 1] === "}") {
                const startIdx = i + 2;
                const endIdx = j - 1;
                const key = str.substring(startIdx, endIdx + 1);

                out = out.replace(`{{${key}}}`, data[key] || "");
                i = endIdx;
            }
        }

        i++;
    }

    return out;
}

console.log(t(
    "BFE.dev is {{evaluation}}",
    { evaluation: 'fantastic' }
));

console.log(t(
    '{{website}} {{verb}} {{evaluation}} {{period}}',
    { website: 'BFE.dev', verb: 'is', evaluation: 'cool', period: '.' }
)); //.toBe('BFE.dev is cool .')

console.log(t(
    '{{website}} {{verb}} {{evaluation}} {{period}} ',
)); //.toBe('    '

console.log(t(
    'BFE.dev is {{}}{{}}{{}}{{evaluation',
    { evaluation: 'cool' }
)); //.toBe('BFE.dev is {{evaluation')

console.log(t(
    'BFE.dev is {{evaluation}}}',
    { evaluation: 'cool' }
)); //.toBe('BFE.dev is cool}')