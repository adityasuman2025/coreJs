// example 1
var foo = 1;
(function() {
    console.log(foo);
    foo = 2;
    console.log(window.foo);
    console.log(foo);
    var foo = 3;
    console.log(foo);
    console.log(window.foo)
})()


// example 2
var a = 1
function a() {
}

console.log(typeof a)

var b
function b() { }
b = 1

console.log(typeof b)

function c() {
}
var c = 1;

console.log(typeof c)

var d = 1;

(function() {
    d = '2'
    console.log(typeof d)
    function d() {
    }
})()

console.log(typeof d)

var e = 1
const f = function e() { }

console.log(typeof e)