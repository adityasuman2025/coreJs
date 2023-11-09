let backspaceCount = 0;
let timer;

document.addEventListener('keydown', handleKeydown);
function handleKeydown(event) {
    if (event.key === 'Backspace') {
        backspaceCount++;
        if (backspaceCount === 3) {
            console.log('Triple backspace detected!');
            backspaceCount = 0; // Reset backspace count
        }
    } else {
        backspaceCount = 0; // Reset backspace count if a different key is pressed
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        backspaceCount = 0;
    }, 1000);
}
