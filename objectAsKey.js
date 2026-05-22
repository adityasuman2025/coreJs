// const a = {};
const b = { b: "b" };
const c = { b: "c" };

// a[b] = 123; //js try to convert b into string because js object can't have object as key // so b get converted into [object Object]
// a[c] = 456;

// console.log("a[b]", a[b])
// console.log("a", a)

//js Map() can be used for this case, Map() can have key as object 
const map = new Map();
map.set(b, 123);
map.set(c, 456);
console.log("b", map.get(b));
console.log("b direct", map.get({ b: "b" })); // Map() stores reference of the object as key not its value
console.log("map", map)