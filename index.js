hi()
console.log(x)

var x = 2;

function hi() {
    console.log("hi frnd")
}

var hi2 = () => {
    console.log("hi frnd 2")
}

const users = [
    {
        firstName: "akshay",
        lastName: "saini",
        age: 26
    },
    {
        firstName: "donald",
        lastName: "trump",
        age: 19
    },
    {
        firstName: "ranvir",
        lastName: "kapoor",
        age: 26
    },
    {
        firstName: "elon",
        lastName: "musk",
        age: 50
    },
    {
        firstName: "deepika",
        lastName: "padukone",
        age: 26
    },
    {
        firstName: "biro",
        lastName: "singh",
        age: 19
    }
];


const output = users.reduce((acc, item) => {
    acc[item.age] = acc[item.age] ? acc[item.age] + 1 : 1
    return acc;
}, {})
// console.log("output", output)

const filter = users.filter(item => item.age < 30).map(item => item.firstName)
// console.log("filter", filter)


//call 
//the call() method calls the function with a given this value and arguments provided individually
let person1 = {
    firstName: "aditya",
    lastName: "suman",
    printName: function () {
        console.log(this.firstName + " " + this.lastName)
    }
}

function printNameAndAddress(address, state) {
    console.log(this.firstName + " " + this.lastName + " address: " + address + " state: " + state)
}

// person1.printName();
// printNameAndAddress.call(person1, "nalanda", "bihar");

let person2 = {
    firstName: "sachin",
    lastName: "jee"
}
person1.printName.call(person2)

//apply
//in apply we pass agruments in array
printNameAndAddress.apply(person2, ["noida", "UP"]);

//bind
//bind is same as call() but instead of calling the method, its just create clone of the method, which we can invoke/call later
let newPrintNameAndAddress = printNameAndAddress.bind(person2, "bangalore", "karnataka");
newPrintNameAndAddress();


//currying
//it is a technique in functional programming in which a function with multiple arguments is transformed into serveral function with single argument in sequence
//it can be done in 2 ways
//1: bind
const add = (x, y) => {
    return x + y;
}

const addTwo = add.bind(this, 2);
const ans = addTwo(10);
// console.log("function currying using bind", ans);


//2: closure
function addClosure(x) {
    return function (y) {
        return x + y
    }
}

const addClosureThree = addClosure(3);
const ansClosure = addClosureThree(5);
// console.log("function currying using closure", ansClosure);


// event bubbling
// document.getElementById("parent")
//     .addEventListener("click", function (event) {
//         console.log("parent is clicked", event);
//     }); //3rd argument, by default it is false i.e. event bubbling

// document.getElementById("child")
//     .addEventListener("click", function (event) {
//         // event.stopPropagation() // to prevent event bubbling
//         console.log("child is clicked", event);
//     });

// event capturing
document.getElementById("parent")
    .addEventListener("click", function (event) {
        // event.stopPropagation() // to prevent event bubbling
        console.log("parent is clicked", event);
    }, true); //this third argument as true, enables event capturing // by default it is false i.e. event bubbling

document.getElementById("child")
    .addEventListener("click", function (event) {
        console.log("child is clicked", event);
    });

