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
printNameAndAddress.call(person1, "nalanda", "bihar");

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
