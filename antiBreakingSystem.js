/*
    How can we achieve ABS(anti breaking system) kind of thing for heavy calculation function in JS
    i.e to perform heavy calculation in chunks
*/

function performHeavyCalculation(data) {
    return new Promise((resolve, reject) => {
        let result = 0;
        let currentIndex = 0;

        function processChunk() {
            console.log("processChunk")
            const chunkSize = 1000; // Adjust as needed
            for (let i = 0; i < chunkSize; i++) {
                if (currentIndex >= data.length) {
                    resolve(result);
                    return;
                }
                result += data[currentIndex];
                currentIndex++;
            }

            // Process next chunk asynchronously // another thread instead of the main thread
            setTimeout(processChunk, 0);
        }

        processChunk();
    });
}

// Example usage
const dataArray = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * (10 - 1) + 1)); // Generate an array of N random numbers b/w 1 and 10

performHeavyCalculation(dataArray)
    .then(result => {
        console.log('Calculation result:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
