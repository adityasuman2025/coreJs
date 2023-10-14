class MapEle {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

class NodeStore {
    constructor() {
        this.elements = [];
    }

    /**
    * @param {any} key
    * @param {any} value
    */
    set(key, value) { // O(n)
        const mapEle = new MapEle(key, value);

        // checking of that key already exists, if yes then updating elements arary at that index
        const existsAtIdx = this.elements.findIndex(i => i.key === key);
        if (existsAtIdx >= 0) this.elements[existsAtIdx] = mapEle;
        else this.elements.push(mapEle);
    }

    /**
     * @param {any} key
     * @return {any}
     */
    get(key) { // O(n)
        return this.elements.find(i => i.key === key)?.value;
    }

    /**
     * @param {any} key
     * @return {Boolean}
     */
    has(key) { // O(n)
        return this.elements.findIndex(i => i.key === key) >= 0;
    }

    /**
     * @param {any} key
     */
    delete(key) { // O(n)
        this.elements = this.elements.filter(i => i.key != key);
    }

    size() { // O(1)
        return this.elements.length;
    }
}


const node = document.createElement('p')
const store = new NodeStore()
store.set(node, 1)
console.log(store.get(node)) //toBe(1)

store.set(node, 2)
console.log(store.get(node)) //toBe(2)

const node2 = document.createElement('p')
store.set(node2, 3)
console.log(store.get(node2)) //toBe(3)