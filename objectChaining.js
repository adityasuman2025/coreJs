const A = {
    x: function() {
        console.log("x")
        return this;
    },
    y: function() {
        console.log("y")
        return this;
    },
    z: function() {
        console.log("z")
        return this;
    }
}
A.x().y().z();


// let calc = { 
//     total: 0,
//     add: function(a) {
//         this.total += a;
//         return this;
//     },
//     subtract: function(a) {
//         this.total -= a
//         return this;
//     },
//     multiply: function(a) {
//         this.total *= a
//         return this;
//     }
// }
// const result = calc.add(10).multiply(5).subtract(30).add(10);
// console.log("calc result", result.total)



function $(el) {
    return {
        css: function(propertyName, value) {
            el.style[propertyName] = value
            return this;
        }
    };
}

const ele = { style: {} }; // document.createElement('p')

const a = $(ele);
a.css('color', '#fff')
    .css('backgroundColor', '#000')
    .css('fontWeight', 'bold');

console.log("ele", ele)