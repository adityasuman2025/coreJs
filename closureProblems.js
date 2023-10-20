function getLogger(arg) {
    function logger() {
        console.log(arg.fruit || arg)
    }
    return logger;
}

let fruit = { fruit: 'raspberry' };
const logFruit = getLogger(fruit);

logFruit();
fruit.fruit = 'peach';
logFruit();

let fruit1 = "apple";
const logFruit1 = getLogger(fruit1);
logFruit1();
fruit1 = "banana";
logFruit1();