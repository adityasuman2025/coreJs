// example 1
const obj = {
    prefix: 'BFE',
    list: ['1', '2', '3'],
    log() {
        this.list.forEach(function(item) {
            console.log(this.prefix + item);
        });
    },
};

obj.log();


// example 2
var bar = 1

function foo() {
    return this.bar++
}

const a = {
    bar: 10,
    foo1: foo,
    foo2: function() {
        return foo()
    },
}


console.log(a.foo1.call())
console.log(a.foo1())
console.log(a.foo2.call())
console.log(a.foo2())

/*
The call() method calls a function with a given this value and arguments provided individually.
When we don't specify this, it'll refer to the globalThis aka window in the browser's context.
*/