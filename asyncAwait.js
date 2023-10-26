/*
    A function created with an async keyword always returns a promise. 
    If we directly return a promise from it then fine, but if we return a value then JS engine wraps the value within a Promise and returns it.

*/

async function yo() {
    return 2;
}

console.log(yo())


function takeTime() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("done");
        }, 2000);
    });
}


async function biro() {
    const greet = "hello world";
    const resp = await takeTime();
    console.log("resp", resp);

    // takeTime().then(resp => {
    //     console.log("resp", resp);
    // });

    console.log("greet", greet)
}

async function yoBiro() {
    console.log("nyc");

    await biro();

    console.log("pik");
}
yoBiro()
