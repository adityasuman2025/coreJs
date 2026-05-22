// pass by value
// const count = 1;

// function increaseCount(count) {
//     count++;
//     return count;
// }

// const increaseCountResp = increaseCount(count);
// console.log("increaseCountResp", increaseCountResp);
// console.log("count", count);



// pass by reference
const obj = { a: "a" }

function addGreet(obj) {
    obj.greet = "Hello World";

    return obj;
}

const greetResp = addGreet(obj);
console.log("greetResp", greetResp);
console.log("obj", obj);

