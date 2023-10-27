// This is a JavaScript Quiz from BFE.dev 


let a = 1;
(function() {
    let foo = () => a
    let a = 2;
    console.log(foo())
}())

let b = 1;
function yo() {
    let foo = () => b
    let b = 2;
    console.log(foo())
}
yo()