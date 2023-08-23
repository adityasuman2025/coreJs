/*-------------------------------------------- a class is blueprint of object --------------------------------------------*/
class Employee {
    constructor(name, doj) {
        this.name = name;
        this.doj = doj;
        this.__proto__.biro = "kauaa"; // will be added to prototype object of this class
    }

    getName() {
        console.log("name is " + this.name);
    }

    getName2 = () => {
        console.log("name is " + this.name);
    }

    getName3 = function () {
        console.log("name is " + this.name)
    }

    getDateOfJoining() {
        console.log("date of joining is " + this.doj);
    }

    static add(a, b) {
        return a + b;
    }
}
Employee.prototype.biro2 = "bauaa";

// const emp = new Employee("aditya", "03 Aug 2020"); //emp is object of Employee class i.e emp is created using blueprint of Employee
// emp.getName();
// emp.getDateOfJoining();
// console.log("biro", emp.__proto__.biro2)



class Programmer extends Employee {
    constructor(name, doj, team, language) {
        super(name, doj); // to inherit properties from Employee class
        this.team = team;
        this.language = language;
    }

    getLanguage() {
        console.log("langauge is: " + this.language)
    }
}

// const sde1 = new Programmer("adarsh", "03 March 2020", "assessment", "javaScript");
// sde1.getLanguage()
// console.log("sde1", sde1);



/*-------------------------------------------- function can also be used as blueprint of object --------------------------------------------*/
function EmployeeFunc(name, doj) {
    this.name = name;
    this.doj = doj;
    this.__proto__.kauaa = "kauaa is a bird";

    this.getName = function () {
        console.log(this.name);
    }

    this.getDateOfJoining = function () {
        console.log(this.doj);
    }
}
EmployeeFunc.prototype.biro = "kauaa"; // will be added to prototype object of this object
EmployeeFunc.prototype.setName = function (name) {
    this.name = name;
}

// const emp1 = new EmployeeFunc("aditya", 2123);
// emp1.getName();
// console.log("biro", emp1.__proto__.biro)
// console.log("kauaa", Object.getPrototypeOf(emp1))



function ProgrammerFunc(name, doj, team, language) {
    EmployeeFunc.call(this, name, doj); //parent function is called in child function to inherit

    this.team = team;
    this.language = language;

    this.getLang = function () {
        console.log(this.language);
    }
}
ProgrammerFunc.prototype = Object.create(EmployeeFunc.prototype); // to inherit parent's prototype in children
ProgrammerFunc.prototype.hiFrnd = "nice"; // adding hiFrnd key in prototype object of ProgrammerFunc


const programmerFunc = new ProgrammerFunc("iphone", "15 Oct 2020", "ios 16", "swift");
console.log("programmerFunc", programmerFunc);
console.log("programmerFunc", programmerFunc.doj);
programmerFunc.getName()
programmerFunc.getLang()
console.log(Object.getPrototypeOf(programmerFunc))
console.log(programmerFunc.__proto__)