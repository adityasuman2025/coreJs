let c = {
    level: 'c',
    property: null
};

let b = {
    level: 'b',
    property: c
};

let a = {
    key: 'a',
    property: b
};

a.property.property.property = b;
console.log(a)
console.log(detectCircular(a))

function detectCircular(obj) {
    const map = new Map();

    let hasCycle = false;

    util(obj);
    function util(obj) {
        if (!obj) return;

        Object.keys(obj).forEach(key => {
            const val = obj[key];

            if (!hasCycle && val && typeof val === "object") {
                if (map.has(val)) {
                    hasCycle = true;
                    return;
                }
                map.set(val, 1);

                util(val);
            }
        });
    }

    return hasCycle;
}
