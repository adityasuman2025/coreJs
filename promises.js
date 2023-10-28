// example 1
const promise1 = Promise.resolve(1)
const promise2 = Promise.resolve(2)
const promise3 = Promise.resolve(3)
const promise4 = Promise.reject(4)

const promiseAll = async () => {
    const group1 = await Promise.all([promise1, promise2])
    const group2 = await Promise.all([promise3, promise4])
    return [group1, group2]
}

promiseAll().then(console.log).catch(console.log); // 4


// example 2
const createPromise = () => Promise.resolve(1)
function func1() {
    createPromise().then(console.log)
    console.log(2)
}

async function func2() {
    await createPromise()
    console.log(3)
}

console.log(4)
func1()
func2()


// example 2
const promise = new Promise((resolve, reject) => {
    const promise2 = Promise.reject('error').then(() => {
        console.log(1)
    }, () => {
        console.log(2)
    })
    resolve(promise2)
});
promise.then(console.log);


// example 3
async function async1() {
    console.log(1)
    await async2()
    console.log(2)
}

async function async2() {
    console.log(3)
}

console.log(4)

setTimeout(function() {
    console.log(5)
}, 0)

async1()

new Promise(function(resolve) {
    console.log(6)
    resolve()
}).then(function() {
    console.log(7)
})

console.log(8)


// example 4
function foo1() {
    console.log('foo1-1');
    foo2()
    console.log('foo1-2');
}


async function foo2() {
    console.log('foo2-1');
    await foo3()
    console.log('foo2-2');
}

async function foo3() {
    console.log('foo3');
}

foo1();



new Promise((resolve, reject) => {
    resolve(1)
    resolve(2)
    reject('error')
}).then((value) => {
    console.log(value)
}, (error) => {
    console.log('error')
})

// only first resolve/reject is considered