import { readFile } from "fs";

console.log("code starts");
const a = 10;
const b = 20;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then((resp) => console.log(resp));

readFile('practice.js', "utf8", (err, data) => {
    console.log("readFile")
});

process.nextTick(() => console.log("nextTick"))

setTimeout(() => console.log("setTimeout"), 0);

function add(a, b) {
    return a + b;
}

console.log("sum", add(a, b));
console.log("code ends");

/*
    The event loop in libuv is used to handle asynchronous operations in Node.js. It allows Node.js to perform non-blocking I/O operations, even though JavaScript is single-threaded. The event loop's main responsibility is to ensure that all pending tasks in the callback queues are executed at the appropriate time and in the correct order of priority. 
    The callback queues are where callbacks are stored after an asynchronous operation is completed. The event loop processes this queue to execute the callbacks when the call stack is empty (main thread is free).
    Event Loop in Node.js process callback in different phases
    Timers Phase: In this phase, all callbacks that were set using setTimeout or setInterval are executed. These timers are checked, and if their time has expired, their corresponding callbacks are added to the callback queue for execution.
    Poll Phase: After timers, the event loop enters the Poll phase, which is crucial because it handles almost all I/O event callbacks like database responses, incoming HTTP requests, file operations, etc. If all callbacks queues of different phases are empty then the Event Loop will actually pause and wait here for new I/O events to come in.
    Check Phase: This phase executes callbacks scheduled by setImmediate(). If the server is sitting idle in the Poll phase and a setImmediate is registered, the loop will break out of Poll phase and move directly to Check phase to execute it.
    Close Phase: in the Close Callbacks phase, any callbacks associated with closing operations, such as socket closures, are handled. This phase is typically used for cleanup tasks, ensuring that resources are properly released.

    The "VIP Lanes": Microtask Queue
    There is a catch to the 4 phases. Node.js has two hidden queues called the Microtask Queues which act like an express pass. They do not belong to any specific phase of the event loop; instead, they are executed immediately after the current operation finishes, before moving to the next phase.
    process.nextTick() callbacks (Highest priority)
    Promise callbacks (e.g., .then(), .catch(), async/await)
    If we resolve a Promise or call process.nextTick(), Node.js will pause the Event Loop completely, clear those queues, and only then resume the standard 4-phase loop.

*/