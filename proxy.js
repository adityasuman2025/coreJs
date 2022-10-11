function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function typeCheck(object) {
    // Use console.log() for debugging

    const handler = {
        get(target, key) {
            console.log("get", target, key)
            if (typeof target[key] === 'object' && target[key] !== null) {
              return new Proxy(target[key], handler);
            }
            return target[key];
        },
        set(target, prop, value) {
            const keys = prop.split("_");
            let type = keys[keys.length - 1];
            console.log(`type`, type);
            
            if (type == "bool") {
                type = "boolean";
            } else if (["string", "number"].includes(type)) {
            } else if (["int"].includes(type)) {
                if (isInt(value)) {
                    console.log(`changed ${prop} from ${target[prop]} to ${value}`);
                    target[prop] = value;
                    return;
                }
            } else if (["float"].includes(type)) {
                if (isFloat(value)) {
                    // is float
                    console.log(`changed ${prop} from ${target[prop]} to ${value}`);
                    target[prop] = value;
                    return;
                }
            } else {
                //some other type
                console.log(`changed ${prop} from ${target[prop]} to ${value}`);
                target[prop] = value;
                return;
            }


            if (typeof value == type) {
                console.log(`changed ${prop} from ${target[prop]} to ${value}`);
                target[prop] = value;
            } else {
                throw "error";
            }
        },
    };

    const proxyObj = new Proxy(object, handler);

    return proxyObj;
}

const obj = {
    age_int: 2,
    name_string: "Adam",
    job_bool: false,
    roll_float: 2.4,
}

const newObj = typeCheck(obj);
newObj.roll_float = 2.3;

//ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//ref: https://daily-dev-tips.com/posts/detect-object-changes-with-javascript-proxy/