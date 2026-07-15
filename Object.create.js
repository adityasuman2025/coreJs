const obj1 = { "abc": "xyz" };
const newObj = Object.create(obj1);
console.log(newObj); // {}
console.log(newObj.__proto__); // { “abc”: “xyz” }



// prototypal inheritance
const obj2 = {
    greet: function() {
        console.log("hey bro");
    }
}

const obj3 = Object.create(obj2);
console.log("obj3", obj3); // obj3 itself is empty
obj3.greet(); // but it has inherited all properties from obj2, those properties exists in its prototype chain



// used to create pure object (with no prototype properties, even not the default ones)
const pureObj = Object.create(null);
console.log("pureObj proto", pureObj.__proto__)
console.log(pureObj.toString); // undefined



// used to define custom properties with strict access rules
const carPrototype = {
    drive() { console.log("Vroom!"); }
};

const myCar = Object.create(carPrototype, {
    make: {
        value: "Tesla",
        writable: false,     // Cannot be changed (read-only)
        enumerable: true,    // Shows up in for...in loops
        configurable: true   // Can be deleted or modified later
    }
});

myCar.make = "BMW"; // Ignored in strict mode / fails silently otherwise
console.log(myCar.make); // Output: "Tesla"
