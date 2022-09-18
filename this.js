//In Javascript, only function calls establish a new this context. 

//in regular function this represents the object who is calling the function
// so here obj is calling logRegular so obj will be its this

//in arrow function this keyword represents the object where it is defined
// amd the obj has the same this as window (because object does not starts a execution context but only function does)
// so in logArrow this represents window, because it is defined in obj
var obj = {
    prefix: 'BFE',
    list: ['1'],
    logArrow: () => {
        console.log("this", this) //here this is window
        console.log(this.prefix + this.list);
    },
    logRegular() {
        console.log("this", this) //logRegular is a regular function so it takes this as obj because it is used by obj
        console.log(this.prefix + this.list);
    },
    logArrow2() {
        console.log("this", this)
        const hi = () => this.prefix; //hi arrow function is defined in logArrow2, so it borrows this from logArrow2 function i.e. obj
        console.log("hi", hi())
    },
};
  
obj.logArrow();
obj.logRegular();
obj.logArrow2();


/*
In normal javascript functions, this keyword points to who is calling the function (dynamic binding). Thus, when we invoke a function as obj.foo() the this keyword points to obj.
Note that, (obj.foo)() is the same as obj.foo() and this again points to obj
() is a grouping operator and is evaluated before execution. Here the logical OR expression || returns the first truthy value i.e. obj.foo which is a plain function foo({console.log(this.msg)}. Later on, when we execute this function, it's just a function without any connection to obj and hence it points to window and window.msg is undefined
*/

// const obj2 = {
//     msg: 'BFE',
//     foo() {
//       console.log(this.msg)
//     },
//     bar() {
//       console.log('dev')
//     }
// }
  
// obj2.foo();
// (obj2.foo)();
// (obj2.foo || obj2.bar)();