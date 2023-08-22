const users = [
    {
        firstName: "akshay",
        lastName: "saini",
        age: 26
    },
    {
        firstName: "donald",
        lastName: "trump",
        age: 19
    },
    {
        firstName: "ranvir",
        lastName: "kapoor",
        age: 26
    },
    {
        firstName: "elon",
        lastName: "musk",
        age: 50
    },
    {
        firstName: "deepika",
        lastName: "padukone",
        age: 26
    },
    {
        firstName: "biro",
        lastName: "singh",
        age: 19
    }
];


const output = users.reduce((acc, item) => {
    acc[item.age] = acc[item.age] ? acc[item.age] + 1 : 1
    return acc;
}, {})
// console.log("output", output)

const filter = users.filter(item => item.age < 30).map(item => item.firstName)
// console.log("filter", filter)


// event bubbling
// document.getElementById("parent")
//     .addEventListener("click", function (event) {
//         console.log("parent is clicked", event);
//     }); //3rd argument, by default it is false i.e. event bubbling

// document.getElementById("child")
//     .addEventListener("click", function (event) {
//         // event.stopPropagation() // to prevent event bubbling
//         console.log("child is clicked", event);
//     });

// event capturing
document.getElementById("parent")
    .addEventListener("click", function (event) {
        // event.stopPropagation() // to prevent event bubbling
        console.log("parent is clicked", event);
    }, true); //this third argument as true, enables event capturing // by default it is false i.e. event bubbling

document.getElementById("child")
    .addEventListener("click", function (event) {
        console.log("child is clicked", event);
    });

