function changeAgeAndName(person) {
    person.age = 25;
    // person.name = "adarsh"
    person = {
        age: 50,
        name: "bhemu"
    }

    return person;
}

let person1 = {
    name: "aditya",
    age: 30
}

const person2 = changeAgeAndName(person1);
// console.log("person1", person1)
// console.log("person2", person2)


//convert john to ES6 standard
var john = {
    name: 'John Doe',
    balance: 1500,
    deduct: function (amount) {
        this.balance = this.balance - amount;
        return this.name + " has a balance of " + this.balance;
    }
}
// console.log("ans", john.deduct(200))

const john2 = {
    name: 'John Doe',
    balance: 1500,
    deduct(amount) {
        return new Promise((resolve, reject) => {
            this.balance = this.balance - amount;
            setTimeout(() => {
                resolve(`${this.name} has a balance of ${this.balance}`);
            }, 2000);
        }).then(resp => resp)
    }
}
// john2.deduct.call(john2, 200).then(resp =>console.log(resp))


//tagged template
function greet(text) {
    console.log("text", text)
    return "Hello";
}

// console.log(greet `Hi`) //it is similar to greet(["Hi"])
// console.log(greet `${"Hi"}${"Biro"}`) //it is similar to greet([], "Hi", "Biro")


function lengthOfArgs() {
    return arguments.length;
}

// console.log(lengthOfArgs(1, 2, 3, 4, 5));