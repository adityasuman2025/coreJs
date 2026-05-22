// in regular function this represents the object who calls the function
// so here obj is calling logRegular so obj will be its this

// in arrow function this keyword represents the this(context) of the object where it is defined
// and the obj has the same this as window (because object does not starts a execution context but only function does
// so in logArrow this represents window, because it is defined in obj


/*-----------------prblm----------------*/
// const a = {
//     dev: 'BFE.dev',
//     update: name => {
//         this.dev = name
//     }
// }
// a.update('bigfrontend.dev')
// console.log(a.dev);




/*-----------------prblm----------------*/
// var obj = {
//     prefix: 'BFE',
//     list: ['1'],
//     logArrow: () => {
//         console.log(this.prefix + this.list);
//     },
//     logRegular() {
//         console.log(this.prefix + this.list);
//     },
//     logArrow2() {
//         const hi = () => this.prefix;
//         console.log("hi", hi())
//     },
// };
// obj.logArrow();
// obj.logRegular();
// obj.logArrow2();




/*-----------------prblm----------------*/
// In Javascript, only function calls establish a new this context. 
function shapeFunc() {
    this.radius = 10;
    this.diameter = function() {
        return this.radius * 2;
    }
    this.perimeter = () => {
        return this.radius * 2 * Math.PI;
    }
}

// here shapeFunc() is a constructor function, a constructor function is used to create objects.
// const run = new shapeFunc(); // here shapeFunc() is a function so it has its own this
// console.log(run)
// console.log(run.diameter())
// console.log(run.perimeter())

const shape = {
    radius: 10,
    diameter: function() {
        return this.radius * 2;
    },
    perimeter: () => {
        return this.radius * 2 * Math.PI;
    }
}

// console.log(shape)
// console.log(shape.diameter())
// console.log(shape.perimeter()) // it will give NaN because shape is a normal object and perimeter is arrow function so this is window for that




/*-----------------prblm----------------*/
function y() {
    console.log("this y", this)
    console.log(this.length);
}

var x = {
    length: 5,
    method: function(y) {
        console.log("this method", this)
        arguments[0]();
    }
}
// x.method(y, 1);




/*-----------------prblm----------------*/
const obj = {
    prefix: 'BFE',
    list: ['1', '2', '3'],
    log() {
        this.list.forEach(function(item) {
            console.log(this.prefix + item);
        });
    },
};

// obj.log();




/*-----------------prblm----------------*/
var bar = 1

function foo() {
    return this.bar++
}

const a1 = {
    bar: 10,
    foo1: foo,
    foo2: function() {
        return foo()
    },
}


console.log(a1.foo1.call()) // 1
console.log(a1.foo1()) // 10
console.log(a1.foo2.call()) // 
console.log(a1.foo2())

/*
    The call() method calls a function with a given this value and arguments provided individually.
    When we don't specify this, it'll refer to the globalThis aka window in the browser's context.
*/