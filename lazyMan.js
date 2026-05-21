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
    let tasks = [() => logFn("Hi, I'm " + name + '.')]; // funcs

    function sleepFunction(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                logFn("Wake up after " + time + " second" + (time > 1 ? "s" : "") + ".")
                resolve()
            }, time * 1000);
        }); // returned promise so that the task can stop next execution
    }

    Promise.resolve().then(async () => {
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            await task();
        }
    }); // promise is used so that all tasks can be processed using microtask queue as sleepFirst holds normal tasks like greet/eat too

    return {
        eat: function(food) {
            tasks.push(() => logFn("Eat " + food + "."));
            return this;
        },
        sleep: function(time) {
            tasks.push(() => sleepFunction(time))
            return this;
        },
        sleepFirst: function(time) {
            tasks.unshift(() => sleepFunction(time));
            return this;
        }
    }
}

// LazyMan('Jack', console.log)
// Hi, I'm Jack.

// LazyMan('Jack', console.log)
//     .eat('banana')
//     .sleep(1000)
//     .eat('apple')

LazyMan('Jack', console.log).eat('banana').eat('apple').sleepFirst(2)