/*
https://bigfrontend.dev/problem/create-lazyman

130. create LazyMan()

LazyMan is very lazy, he only eats and sleeps.

LazyMan(name: string, logFn: (log: string) => void) would output a message, the passed logFn is used.

LazyMan('Jack', console.log)
// Hi, I'm Jack.
He can eat(food: string)

LazyMan('Jack', console.log).eat('banana').eat('apple')
// Hi, I'm Jack.
// Eat banana.
// Eat Apple.
He also sleep(time: number), time is based on seconds.

LazyMan('Jack', console.log).eat('banana').sleep(10).eat('apple').sleep(1)
// Hi, I'm Jack.
// Eat banana.
// (after 10 seconds)
// Wake up after 10 seconds.
// Eat Apple.
// (after 1 second)
// Wake up after 1 second.
He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.

LazyMan('Jack', console.log).eat('banana').sleepFirst(10).eat('apple').sleep(1)
// (after 10 seconds)
// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// (after 1 second)
// Wake up after 1 second.
Please create such LazyMan()
*/



// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 */

function LazyMan(name, logFn) {
    let tasks = [{ type: "greet", args: [name] }];

    const actions = {
        greet(name) {
            logFn(`Hi, I'm ${name}.`);
        },
        eat: function(food) {
            logFn(`Eat ${food}.`);
        },
        sleep: function(duration) {
            return new Promise(function(resolve) {
                setTimeout(() => {
                    logFn(`Wake up after ${duration} second${duration > 1 ? 's' : ''}.`);
                    resolve();
                }, duration * 1000);
            });
        }
    }

    Promise.resolve().then(execTasks);
    async function execTasks() {
        console.log("execTasks")
        for (let i = 0; i < tasks.length; i++) {
            const { type, args } = tasks[i];
            await actions[type](...args);
        }
    }

    return {
        eat(...args) {
            tasks.push({ type: "eat", args });
            return this;
        },
        sleep(...args) {
            tasks.push({ type: "sleep", args });
            return this;
        },
        sleepFirst(...args) {
            tasks.unshift({ type: "sleep", args });
            return this;
        },
    }
}

const log = console.log;
// LazyMan('Jack', log).eat('banana').sleep(1).eat('apple');
LazyMan('Jack', log).eat('banana').eat('apple').sleepFirst(2);