// https://bigfrontend.dev/problem/implement-JSON-parse

function parse(jsonString) {
    let index = 0;

    function parseValue() {
        const currentChar = jsonString[index];

        if (currentChar === '{') {
            return parseObject();
        } else if (currentChar === '[') {
            return parseArray();
        } else if (currentChar === '"') {
            return parseString();
        } else if (currentChar === 't' || currentChar === 'f') {
            return parseBoolean();
        } else if (currentChar === 'n') {
            return parseNull();
        } else {
            return parseNumber();
        }
    }

    function parseObject() {
        let obj = {};
        index++; // skip '{'

        while (jsonString[index] !== '}') {
            const key = parseString();
            index++; // skip ':'
            const value = parseValue();
            obj[key] = value;

            if (jsonString[index] === ',') {
                index++; // skip ','
            }
        }

        index++; // skip '}'
        return obj;
    }

    function parseArray() {
        let arr = [];
        index++; // skip '['

        while (jsonString[index] !== ']') {
            const value = parseValue();
            arr.push(value);

            if (jsonString[index] === ',') {
                index++; // skip ','
            }
        }

        index++; // skip ']'
        return arr;
    }

    function parseString() {
        let str = '';
        index++; // skip '"'

        while (jsonString[index] !== '"') {
            str += jsonString[index];
            index++;
        }

        index++; // skip '"'
        return str;
    }

    function parseBoolean() {
        const boolStr = jsonString.slice(index, index + 4);
        index += 4; // skip 'true' or 'false'
        return boolStr === 'true';
    }

    function parseNull() {
        index += 4; // skip 'null'
        return null;
    }

    function parseNumber() {
        let numStr = '';

        while (/[\d.+\-eE]/.test(jsonString[index])) {
            numStr += jsonString[index];
            index++;
        }

        return parseFloat(numStr);
    }

    return parseValue();
}

const jsonStr = '{"yo":"biro","a":{"b":{"c":[1],"nyc":"pik"}}}';
console.log(parse(jsonStr))