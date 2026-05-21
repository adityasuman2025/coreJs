// ref: https://bigfrontend.dev/problem/interpolation

/**
 * @param {string} translation
 * @param {any} data
 * @returns {string}
 */
function t(translation, data = {}) {
    const len = translation.length;
    let res = translation;

    let i = 0;
    while (i < len) {
        if (translation[i] === '{' && translation[i + 1] === '{') {
            let start = i + 2, end = i + 2;
            while (translation[end] != "}" && end < len) end++;

            if (translation[end + 1] === "}") {
                // found a key
                const key = translation.slice(start, end);

                res = res.replace("{{" + key + "}}", data[key] || "");
                i = end;
            }
        }

        i++;
    }

    return res;
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