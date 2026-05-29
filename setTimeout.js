// // console.log("var")
// for (var i = 1; i <= 5; i++) {
//     setTimeout(() => {
//         console.log(i); // 6 => five times; var is function scoped and when the loop ends the value of i is 6 and setTimeout get called after the loop ends, because it is async and stays in callback/macrotask queuue and goes to the call stack after the loop ends
//     }, 0);
// }

// // console.log("let")
// for (let i = 1; i <= 5; i++) {
//     setTimeout(() => {
//         console.log(i); // 1,2,3,4,5 => let is blocked scoped and for each loop block its value is different
//     }, 0);
// }

// // console.log("var using let")
// for (var i = 1; i <= 5; i++) {
//     let j = i;
//     setTimeout(() => {
//         console.log(j);
//     }, 0);
// }

// console.log("var using another closure funtion")
// for (var i = 1; i <= 5; i++) {
//     function inside(j) {
//         setTimeout(() => {
//             console.log(j);
//         }, 0);
//     }
//     inside(i);
// }



// // which will print Wingify after 300ms
// setTimeout(console.log('Wingify'), 300)

// setTimeout.call(console.log('Wingify'), 300)

// setTimeout.call(null, () => console.log('Wingify'), 300)

// setTimeout(() => console.log('Wingify'))


// how can we console arr "a" at its different stages
// function bro() {
//     const a = [];

//     let j = 0;
//     for (let i = 0; i < 5; i++) {
//         j++;
//         a.push(i);

//         setTimeout(() => {
//             console.log(a);
//         }, 1000)
//     }
// }
// bro();








// solution
function bro() {
    const a = [];

    let j = 0;
    for (let i = 0; i < 5; i++) {
        j++;
        a.push(i);

        // // solution 1
        // const b = [...a];
        // setTimeout(() => {
        //     console.log(b);
        // }, 1000)

        // // solution 2
        // print(j); // not work for a, becuase a is array and array are passed by ref not value, but will work for j because it is passed by value
        // print([...a]);
    }
}
bro();

function print(a) {
    setTimeout(() => {
        console.log(a);
    }, 1000)
}