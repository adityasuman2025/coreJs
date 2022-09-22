//generator is used to generate result on the fly (whenever needed)

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