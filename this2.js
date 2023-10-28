const obj = {
    a: 1,
    b: function() {
        console.log(this.a)
    },
    c() {
        console.log(this.a)
    },
    d: () => {
        console.log(this.a)
    },
    e: (function() {
        return () => {
            console.log(this.a);
        }
    })(),
    f: function() {
        return () => {
            console.log(this.a);
        }
    }
}


console.log(obj.a)
obj.b();
(obj.b)();
const b = obj.b
b()
obj.b.apply({ a: 2 })
obj.c()
obj.d();
(obj.d)()
obj.d.apply({ a: 2 })
obj.e();
(obj.e)()
obj.e.call({ a: 2 })
obj.f()();
(obj.f())()
obj.f().call({ a: 2 })


// ref: https://bigfrontend.dev/quiz/this/discuss

// console.log(obj.a); // 1
// obj.b(); // 1
// (obj.b)() // 1 // (obj.b)() is the same as obj.b()
// const b = obj.b
// b() // undefined
// obj.b.apply({ a: 2 }) // 2
// obj.c() // 1
// obj.d(); // undefined
// (obj.d)() // undefined
// obj.d.apply({ a: 2 }) // undefined
// obj.e(); // undefined // obj.e is actually an IIFE so this refers to window and it returns an arrow function hence this will take its value from enclosing context i.e. it'll be window.
// (obj.e)() // undefined
// obj.e.call({ a: 2 }) // undefined
// obj.f()(); // 1
// (obj.f())(); // 1
// obj.f().call({ a: 2 }) // 1