class BankAccount {
    static changeAccountType(accountType) {
        this.newAccountType = accountType;
        return this.newAccountType;
    }
    constructor({ newAccountType = "Normal" } = {}) {
        this.newAccountType = newAccountType;
    }
}

const customer = new BankAccount({ newAccountType: "Gold" });

// console.log(customer.changeAccountType("Prefered")); // throw error, changeAccountType is a static method
// console.log(customer.__proto__.changeAccountType("Prefered")); // throw error, changeAccountType is a static method
console.log(BankAccount.changeAccountType("Prefered")); // static methods are accessed, like <Class Name>.<static function name>

/*
    static methods of a class are accessed, like <Class Name>.<static function name>
    instead of <Object of that Class Name>.<static function name>
*/