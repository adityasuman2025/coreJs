// ref: https://bigfrontend.dev/problem/lru-chrome-storage-eviction

class MyLRUStorage {
    /**
     * @param {number} capacity
     * @param {() => number} getTimestamp
     */
    constructor(capacity, getTimestamp) {
        this.capacity = capacity
        this.getTimestamp = getTimestamp
        this.size = 0;

        this.map = new Map();
    }

    /**
     * @param {string} origin
     * @returns {OriginData | undefined}
     */
    getData(origin) {
        if (!this.map.has(origin)) return undefined;

        const val = this.map.get(origin);
        this.map.delete(origin);
        this.map.set(origin, val);

        return val;
    }

    /**
     * @param {string} origin
     * @param {number} size
     * @returns {boolean}
     */
    setData(origin, size) {
        if (size > this.capacity) return false;

        if (this.map.has(origin)) { // if that data already exists then removing the old data
            const val = this.map.get(origin);
            this.size = this.size - val.size;

            this.map.delete(origin);
        }

        const keys = this.map.keys();
        while (this.size + size > this.capacity) {
            const firstKey = keys.next().value; // map.keys() is a generator function, thats why it is accessed like .next().value
            const firstKeyVal = this.map.get(firstKey);

            if (!firstKey) return false; // if now key remains to clear, means -> we don't have enough space/size to set the given data
            if (firstKeyVal.type === "*") continue; // persistance data can't be evicted/removed

            this.size = this.size - firstKeyVal.size;
            this.map.delete(firstKey);
        }

        this.size = this.size + size;
        this.map.set(origin, { size });

        return true;
    }

    /**
     * @param {string} origin
     * @returns {void}
     */
    clearData(origin) {
        const val = this.map.get(origin);
        this.size = this.size - val.size;

        this.map.delete(origin);
    }

    /**
     * @param {string} origin
     * @returns {void}
     */
    makePersistent(origin) {
        const val = this.map.get(origin);

        this.map.set(origin, { ...val, type: "*" });
    }
}

const __getTimestamp = (new Date()).getTime();

const storage = new MyLRUStorage(10, __getTimestamp)
storage.setData('a', 1)
storage.setData('b', 3)
storage.makePersistent('a')
storage.makePersistent('b')
const result = storage.setData('c', 7)
console.log(storage.getData('a').size)//.toBe(1)
console.log(storage.getData('b').size)//.toBe(3)
console.log(result)//.toBe(false)
console.log(storage.getData('c'))//.toBeUndefined()