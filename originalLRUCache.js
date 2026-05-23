// ref: https://bigfrontend.dev/problem/lru-chrome-storage-eviction

class OriginData {
    constructor(origin, size, lastUsed, persistent) {
        this.origin = origin
        this.size = size
        this.lastUsed = lastUsed
        this.persistent = persistent
    }
}
class MyLRUStorage {
    /**
     * @param {number} capacity
     * @param {() => number} getTimestamp
     */
    constructor(capacity, getTimestamp) {
        this.capacity = capacity
        this.getTimestamp = getTimestamp
        this.caches = []; // we will always keep the cache sorted by lastUsed in decreasing order
    }

    sort() {
        this.caches.sort((a, b) => b.lastUsed - a.lastUsed);
    }

    getTotalSize(size = 0) {
        return this.caches.reduce((acc, item) => acc + item.size, 0) + size;
    }

    freeCapacity(totalSize) {
        let idx = this.caches.length - 1;
        while (totalSize > this.capacity && idx >= 0) {
            if (!this.caches[idx].persistent) {
                totalSize -= this.caches[idx].size;
                this.caches.splice(idx, 1);
            }

            idx--;
        }

        return totalSize;
    }

    /**
     * @param {string} origin
     * @param {number} size
     * @returns {boolean}
     */
    setData(origin, size) {
        const existingIdx = this.caches.findIndex(i => i.origin === origin);

        // sum of item's sizes that we CAN'T remove (persistents), but skip the one we're updating (if we found existingIdx)
        const persistentTotal = this.caches.reduce(
            (acc, item, idx) => (item.persistent && idx !== existingIdx ? acc + item.size : acc),
            0
        );

        // even after removing all non-persistents, the new size won't fit
        if (persistentTotal + size > this.capacity) return false;

        // existing entry → update size + lastUsed, then remove if still over capacity
        if (existingIdx >= 0) {
            this.caches[existingIdx].size = size;
            this.caches[existingIdx].lastUsed = this.getTimestamp();
            this.sort(); // lastUsed changed → re-sort BEFORE freeCapacity so it sees correct order

            const totalSize = this.getTotalSize();
            if (totalSize > this.capacity) this.freeCapacity(totalSize);

            return true;
        }

        // remove the older caches if needed, to fit in the new item
        const totalSize = this.getTotalSize(size);
        if (totalSize > this.capacity) this.freeCapacity(totalSize);

        this.caches.push(new OriginData(origin, size, this.getTimestamp(), false));
        this.sort(); // sorting the updated caches in decreasing order

        return true;
    }

    /**
     * @param {string} origin
     * @returns {OriginData | undefined}
     */
    getData(origin) {
        const cacheIdx = this.caches.findIndex(i => i.origin === origin);
        if (cacheIdx < 0) return undefined;

        const thisCache = this.caches[cacheIdx];
        this.caches[cacheIdx].lastUsed = this.getTimestamp();
        this.sort()

        return thisCache;
    }

    /**
     * @param {string} origin
     * @returns {void}
     */
    clearData(origin) {
        const cacheIdx = this.caches.findIndex(i => i.origin === origin);
        if (cacheIdx < 0) return;

        this.caches.splice(cacheIdx, 1);
    }

    /**
     * @param {string} origin
     * @returns {void}
     */
    makePersistent(origin) {
        const cacheIdx = this.caches.findIndex(i => i.origin === origin);
        if (cacheIdx < 0) return;

        this.caches[cacheIdx].persistent = true;
    }
}

const storage = new MyLRUStorage(10, () => (new Date()).getTime())

// storage.setData('a', 1)
// storage.setData('b', 3)
// storage.makePersistent('a')
// storage.makePersistent('b')
// const result = storage.setData('c', 7)
// console.log(storage.getData('a').size)//.toBe(1)
// console.log(storage.getData('b').size)//.toBe(3)
// console.log(result)//.toBe(false)
// console.log(storage.getData('c'))//.toBeUndefined()


storage.setData('a', 1)
storage.setData('b', 3)
storage.setData('c', 7)
console.log("storage", storage)
// console.log(storage.getData('a')) //.toBeUndefined()
// console.log(storage.getData('b').size) //.toBe(3)
// console.log(storage.getData('c').size) //.toBe(7)