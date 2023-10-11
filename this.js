//in regular function this represents the object who calls the function
// so here obj is calling logRegular so obj will be its this

//in arrow function this keyword represents the this(context) of the object where it is defined
// amd the obj has the same this as window (because object does not starts a execution context but only function does)
// so in logArrow this represents window, because it is defined in obj


//example 1
var obj = {
    prefix: 'BFE',
    list: ['1'],
    logArrow: () => {
        console.log("this", this) //here this is window
        console.log(this.prefix + this.list);
    },
    logRegular() {
        console.log("this", this) //logRegular is a regular function so it takes this as obj because it is called by obj
        console.log(this.prefix + this.list);
    },
    logArrow2() {
        console.log("this", this)
        const hi = () => this.prefix; //here arrow function is defined in logArrow2, so it borrows this from logArrow2 function i.e. obj
        console.log("hi", hi())
    },
};

// obj.logArrow();
// obj.logRegular();
// obj.logArrow2();



//example 2
//In Javascript, only function calls establish a new this context. 
function shapeFunc() {
    this.radius = 10;
    this.diameter = function() {
        return this.radius * 2;
    }
    this.perimeter = () => {
        return this.radius * 2 * Math.PI;
    }
}

//here shapeFunc() is a constructor function, a constructor function is used to create objects.
const run = new shapeFunc(); // here shapeFunc() is a function so it has its own this
// console.log(run)
// console.log(run.diameter())
// console.log(run.perimeter()) // it will get called successfully because shapeFunc() is a function so it establish a this for itself and perimeter is arrow function so it takes this of shapeFunc()

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



//example 3
function y() {
    console.log("this y", this)
    console.log(this.length);
}
var x = {
    length: 5,
    method: function(y) {
        console.log("this method", this)
        arguments[0](); //here arguments object is calling function y, as arguments[0] represents y, so this will become arguments object in y
    }
}

x.method(y, 1);