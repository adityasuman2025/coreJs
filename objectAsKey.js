const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123; //js try to convert b into string because js object can't have object as key // so b get converted into [object Object]
a[c] = 456;

console.log("a[b]", a[b])
console.log("a", a)

//js Map() can be used for this case, Map() can have key as object
const aMap = new Map();
aMap.set(b, 123);
aMap.set(c, 456);
console.log("aMap.get(b)", aMap.get(b))
console.log("aMap", aMap)