//generator is used to generate result on the fly (whenever needed)
// generators are used in iterable function of in-built data structures

function* generateNo() {
    let i = 0;

    // yield 1; //when generateNo().next is called for the first time code will execute till this
    // yield 2; //when generateNo().next is called for the 2nd time code will execute till this
    // yield 3; //...

    while (true) {
        yield i++;
    }
}

const gen = generateNo();
console.log(gen.next())
console.log(gen.next())




/*
    Range function, which works as shown below

    for (let num of range(1, 4)) {
        console.log(num)  
    }
    // 1
    // 2
    // 3
    // 4
*/
function* range(from, to) {
    // return (new Array(to - from + 1)).fill(1).map((_,idx) => idx+from)

    while (from <= to) {
        yield from++
    }
}
