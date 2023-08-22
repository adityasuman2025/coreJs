// 1. Syntax
function regSyntax(ka) {
    return ka;
}

const arrowSyntax = (ka) => ka;

const ansRegSyntax = regSyntax(2);
const ansArrowSyntax = arrowSyntax(3);
// console.log("ansRegSyntax", ansRegSyntax)
// console.log("ansArrowSyntax", ansArrowSyntax)



// 2. this binding
/*
this is a property of the execution context

In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever.
In arrow functions the this keyword represents the this(context) of the object where it is defined
*/

// this.name = "ka";
const obj = {
    name: "Bhemu",
    regGetName: function () {
        console.log("obj regGetName", this.name);
    },
    arrowGetName: () => {
        console.log("obj arrowGetName", this.name);
    }
}
obj.regGetName(); // here this is obj
obj.arrowGetName(); // here this is window because it is defined in (Global Execution Context) GEC's this // beacuse obj is not a function, it is an object, so it does not have its own Execution Context, so it will look for its parent's Execution Context which is GEC and GEC's this is window


function objConstructor() {
    this.name = "Bhemu";

    this.regGetName = function () {
        console.log("obj2 regGetName", this.name);
    }

    this.arrowGetName = () => {
        console.log("obj2 arrowGetName", this.name);
    }
}

const obj2 = new objConstructor();
obj2.regGetName(); // here this is obj2
obj2.arrowGetName(); // here this is obj2 because arrow function's this, is this of the object where it is defined and here it is defined in objConstructor function which has its own Execution Context and its own this



// 3. Argument binding
function regArg() {
    console.log("arguments", arguments)
}

const arrowArg = () => {
    console.log("arguments", arguments); // ReferenceError: Can't find variable: arguments (in browser)
}

// regArg("ka");
// arrowArg("ka");



// 4. Using new keyword
/*
Regular functions are constructible (constructor function) and callable.
Arrow functions are only ‘callable’ and not constructible.
hence new keyword can’t be used with arrow function
*/
function regConstr1(color) {
    this.color = color;
}
const regConstr2 = function (color) {
    this.color = color;
}
const regObj = new regConstr2('blue');
console.log("regObj", regObj)

const arrowConst = (color) => {
    this.color = color;

    console.log("this.color", this.color)
}
// const arrowObj = new arrowConst('red'); //TypeError: arrowConst is not a constructor
// console.log("arrowObj", arrowObj)
arrowConst("red");