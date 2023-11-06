function createCounter() {
    // count = -1;

    // return {
    //   get count() {
    //     count++;
    //     return count;
    //   }
    // }

    const obj = { count: -1 };
    const handler = {
        get: function(obj, key) {
            obj[key] = obj[key] + 1;

            return obj[key];
        },
        set: function(obj, key, val) { }
    }

    return new Proxy(obj, handler)
}
