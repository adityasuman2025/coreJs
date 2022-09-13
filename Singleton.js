class Singleton {
    constructor() {
        // Singleton.instance is already created then returning that and not creating any new instance
        if (Singleton.instance instanceof Singleton) {
            return Singleton.instance;
        }

        this.settingsObj = {
            color: "red",
            version: Math.floor(Math.random() * 100)
        }

        Object.freeze(this); //freeze prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed
        Singleton.instance = this; //storing first instance of this Singleton obj in Singleton.instance
    }

    get(key) {
        return this[key];
    }
}

let a = new Singleton();
let b = new Singleton();
console.log("a", a)
console.log("b", b)