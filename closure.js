/*
    Closure happens when a function retains access to variables of its outer (enclosing) function, even after that outer function has completed execution
   
    Closure is a function bundled together with reference to its surrounding state (lexical environment)
   
    When a function is returned from a another function, it still remember the references it was pointing too, its not just that function alone is returned but its closure is returned.
    It remembers reference of the variable but not the value.

    
    uses/applications:
    1. memoization
    2. currying
    3. debounce/throttle
    4. once function
    5. Data hiding & encapsulation
*/

function closure() {
    let greet = "Hello World";
    return function() {
        console.log(greet);

        greet = "Hey there";
    }
}

const func = closure();
func();
func();

