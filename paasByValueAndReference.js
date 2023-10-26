// Paas by value
const count = 1;

function increaseCount(count) {
    count++;
    return count;
}

const increaseCountResp = increaseCount(count);
console.log("count", count);
console.log("increaseCountResp", increaseCountResp);



// Paas by reference
const obj = {
    a: "a",
}

function addGreet(obj) {
    obj.greet = "Hello World";

    return obj;
}

const greetResp = addGreet(obj);
console.log("obj", obj);
console.log("greetResp", greetResp);
