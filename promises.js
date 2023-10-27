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
