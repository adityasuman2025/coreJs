function asyncOperation(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = value * 2;
            resolve(result);
        }, Math.random() * 1000); // Simulating async operation
    });
}

asyncOperation(2)
    .then(result1 => {
        console.log('Step 1:', result1);
        return asyncOperation(result1);
    })
    .then(result2 => {
        console.log('Step 2:', result2);
        return asyncOperation(result2);
    })
    .then(result3 => {
        console.log('Step 3:', result3);
        return asyncOperation(result3);
    })
    .catch(error => { // this catch will handle errors if any, above it
        console.error('Error:', error);
    })
    .then(result4 => {
        console.log('Step 4:', result4);
        return asyncOperation(result4);
    })
    .then(result5 => {
        console.log('Step 5:', result5);
    })
    .catch(error => { // this catch will handle all the errors if any, above it, because this catch is at the end of the chain
        console.error('Error:', error);
    });