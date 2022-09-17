//in arrow function this keyword represents the object where it is defined
// so here, for the arrow function, this will the the obj, becuase it is defined in obj

//in regular function this represents the object who is calling the function
// so for 
const obj = {
    prefix: 'BFE',
    list: ['1'],
    logArrow() {
        this.list.forEach((item) => {
            console.log("this", this)
            console.log(this.prefix + item);
        });
    },
    logRegular() {
        this.list.forEach(function(item) {
            console.log("this", this)
            console.log(this.prefix + item);
        });
    },
};
  
obj.logArrow();
obj.logRegular();



/*
In normal javascript functions, this keyword points to who is calling the function (dynamic binding). Thus, when we invoke a function as obj.foo() the this keyword points to obj.
Note that, (obj.foo)() is the same as obj.foo() and this again points to obj
() is a grouping operator and is evaluated before execution. Here the logical OR expression || returns the first truthy value i.e. obj.foo which is a plain function foo({console.log(this.msg)}. Later on, when we execute this function, it's just a function without any connection to obj and hence it points to window and window.msg is undefined
*/

const obj2 = {
    msg: 'BFE',
    foo() {
      console.log(this.msg)
    },
    bar() {
      console.log('dev')
    }
}
  
obj2.foo();
(obj2.foo)();
(obj2.foo || obj2.bar)();