class Single {
    constructor(color) {
        // Single.instance is already created then returning that and not creating any new instance
        if (Single.instance instanceof Single) {
            return Single.instance;
        }

        this.settingsObj = {
            color: color,
            version: Math.floor(Math.random() * 100)
        }

        Object.freeze(this); //freeze prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed
        Single.instance = this; //storing first instance of this Singleton obj in Singleton.instance
    }

    get(key) {
        return this[key];
    }
}

let a = new Single("red");
let b = new Single("blue");
console.log("a", a)
console.log("b", b)