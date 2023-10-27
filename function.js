// This is a JavaScript Quiz from BFE.dev 

// example 1
let a = 1;
(function() {
    let foo = () => a
    let a = 2;
    console.log(foo())
}())

let b = 1;
function yo() {
    let foo = () => b
    let b = 2;
    console.log(foo())
}
yo();
console.log("yo.name", yo.name) // <function>.name give name of the function


// example 2
function foo(a, b, undefined, undefined) {
    console.log('BFE.dev')
}
console.log(foo.length) // <function>.length gives count of parameters of function


// example 3
var obj = {
    a: "BFE",
    b: "dev",
    func: (function foo() { return this.a; }, function bar() { return this.b; })
}

console.log(obj.func()) // comma operator evaluates from left to right and returns the last(right most) operand, so func is assined with bar()


// example 4
const obj1 = {
    msg: 'BFE',
    foo() {
        console.log(this.msg)
    },
    bar() {
        console.log('dev')
    }
}

obj1.foo(); // "BFE"
(obj1.foo)(); // "BFE"
(obj1.foo || obj1.bar)(); // undefined
/*
n normal javascript functions, this keyword points to who is calling the function (dynamic binding). Thus, when we invoke a function as obj.foo() the this keyword points to obj.

Note that, (obj.foo)() is the same as obj.foo() and this again points to obj

() is a grouping operator and is evaluated before execution. Here the logical OR expression || returns the first truthy value i.e. obj.foo which is a plain function foo({console.log(this.msg)}. Later on, when we execute this function, it's just a function without any connection to obj and hence it points to window and window.msg is undefined
*/
