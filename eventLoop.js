// it will print b c a
// callbacks exists in task Queue and wait for event loop to pick it and then add it in call stack (once the call stack is empty)
// setTimeout(() => {
//     console.log("a");
// }, 0);

// console.log("b");
// console.log("c");


// so print a b c we need to put this setTimeout in promise
// and do other stuffs after the promise is resolved/done
// const printA = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//         console.log("a");
//         resolve();
//     }, 0);
// });

//// way - 1
// printA.then(resp => {
//     console.log("b");
//     console.log("c");
// });
    
//// way - 2
// (async function() {
//     await printA;
//     console.log("b");
//     console.log("c");
// })();



// promise callback and mutation observar is moved to microTask Queue
// All Callback functions (except promise callback and mutation observer) are transferred to callback queue or task queue.

// Microtask queue tasks are given priority over callback queue tasks, event loop will pick tasks from callback queue, only when all tasks of microtask queue is done
// console.log(1)

// const mc = new MessageChannel()

// mc.port1.onmessage = () => {
//   console.log(2)
// }

// Promise.resolve().then(() => {
//   console.log(3)
// })

// setTimeout(() => {
//   console.log(4)
// }, 0)

// console.log(5)

// mc.port2.postMessage('')

// console.log(6)


//Synchronous code (including event listeners) gets executed first in order.
console.log(1) // 1️⃣

document.body.addEventListener('click', () => {
  console.log(2) // 3️⃣
})

Promise.resolve().then(() => {
  console.log(3) // 5️⃣
})

setTimeout(() => {
  console.log(4) // 6️⃣
}, 0)

console.log(5) // 2️⃣

document.body.click()

console.log(6) // 4️⃣

//1 5 2 6 3 4


/* 
Order:
    - Statement
    - Promise callbacks/mutation observer
    - Web worker (port/window.eventHander, etc..)
    - all other callbacks e.g. setTimeout
*/

// This is a JavaScript Quiz from BFE.dev

console.log(1)

window.onmessage = () => {
  console.log(2)
}

Promise.resolve().then(() => {
  console.log(3)
})

setTimeout(() => {
  console.log(4)
}, 0)

console.log(5)

window.postMessage('')

console.log(6)


//console.log 0 will finish first and will go to task queue first
//so will be picked by event loop first
setTimeout(() => {
  console.log(2)
}, 2)

setTimeout(() => {
  console.log(1)
}, 1)

setTimeout(() => {
  console.log(0)
}, 0)