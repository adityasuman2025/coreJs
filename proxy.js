const target = { name: 'John', age: 30 };
const handler = {
    get: function (target, property) {
        console.log(`Getting ${property}`);
        return target[property];
    },
    set: function (target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        target[property] = value;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Output: Getting name
proxy.age = 31; // Output: Setting age to 31