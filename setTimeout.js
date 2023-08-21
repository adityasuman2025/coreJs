// console.log("var")
for (var i = 1; i <= 5; i++) {
    setTimeout(() => {
        console.log(i); // 6 => five times var is function scoped and when the loop ends the value of i is 6 and setTimeout get called after the loop ends, because it is async and stays in callback/macrotask queuue and goes to the call stack after the loop ends
    }, 0);
}

// console.log("let")
for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
        console.log(i); // 1,2,3,4,5 => let is blocked scoped and for each loop block its value is different
    }, 0);
}

// console.log("var using let")
for (var i = 1; i <= 5; i++) {
    let j = i;
    setTimeout(() => {
        console.log(j);
    }, 0);
}

// console.log("var using another closure funtion")
for (var i = 1; i <= 5; i++) {
    function inside(j) {
        setTimeout(() => {
            console.log(j);
        }, 0);
    }
    inside(i);
}