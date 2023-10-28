/*
What are the number of possible values following function can print?
(We can call this function any number of times using any possible value in javascript)
*/

function printValue(val) {
    if (val) {
        console.log('Wingify')
    } else {
        console.log(val)
    }
}

/*
OPTIONS
1
8
Inifinite
9
7
*/

printValue("val");
printValue("");
printValue(null);
printValue(undefined);
printValue(0);
printValue(-0);
printValue(false);
printValue(NaN);
printValue(0n);
// printValue(document.all)

// there are total 9 falsy values in JS