/*
    iterables are generator function
*/

const entries = [1, 2, 3, 4].entries()
for (const [key, val] of entries) {
    console.log(key, val)
    break;
}

for (const [key, val] of entries) {
    console.log(key, val)
    break;
}