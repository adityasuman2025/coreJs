const arr = [1, , , 2]

// forEach
arr.forEach(i => console.log(i))

// map
console.log(arr.map(i => i * 2))

// for ... of
for (const i of arr) {
    console.log(i)
}

// spread
console.log([...arr])

/*
Array.forEach() is not invoked for index properties that have been deleted or are uninitialized

Similarly, In Array.map() callback is invoked only for indexes of the array which have assigned values (including undefined). It is not called for missing elements of the array. But output arrays does contain the holes.

The for...of statement creates a loop iterating over iterable objects like an Array. For a sparse array, the holes are treated as undefined

The Spread Operator (...) follows a similar behavior and expands an array such that holes are undefined
*/