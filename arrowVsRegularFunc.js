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
In regular functions the this keyword represented the object that called the function, which could be the window, the document, a button or whatever.
In arrow functions the this keyword represents the this(context) of the object where it is defined
*/
const obj = {
    name: "Bhemu",
    regGetName: function() {
        console.log("regGetName", this.name);
    },
    arrowGetName: () => {
        console.log("arrowGetName", this.name);
    }
}
// obj.regGetName();
// obj.arrowGetName();



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
const regConstr2 = function(color) {
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