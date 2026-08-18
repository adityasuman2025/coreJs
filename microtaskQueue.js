/*
    Microtask queue is given priority over any other queues by Event loop
    Event loop will start processing any other queue only after it is done processing all items of Microtask queue (i.e. till Microtask queue is not empty)
    Whenever event loop reaches microtask queue (start processing micro task queue) it will not move to any other thing till Microtask queue is not empty
*/


console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

queueMicrotask(() => console.log('4'));

async function func() {
    console.log('5');
    await null;
    console.log('6');
}
await func();

console.log('7');

/*
    1 is consoled
    2 goes to macrotask queue
    3 goes to microtask queue
    4 goes to microtask queue
    now at line await func(), await is used so everything after that become the callback of the func promise i.e.
    func().then(() => {
        all code after it
    })
    execution will go inside func console 5
    await null will run immediately and the next line after it becomes the callback of the await null promise and considered as callback atatched to then (same logic as above) and will get added in microtask queue [ 3, 4, 6 ]
    there is no synchornous code left i.e. call stack is empty to event loop process (drains) microtask queue
    and prints 3, 4, 6
    no func() promise finishes and the its then runs i.e.
    func().then(() => {
        console.log('7');
    })
    so 7 is pushed to microtask queue [ 7 ]
    event loop again goes to microtask queue and prints 7
    then goes to macrotask queue and prints 2
*/



// above code is similar to
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

queueMicrotask(() => console.log('4'));

function func() {
    console.log('5');

    return Promise.resolve().then(() => console.log('6'));
}
func().then(() => {
    console.log('7');
});
