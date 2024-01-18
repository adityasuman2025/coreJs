"use strict";

function VWO(url) {
    this.name = 'engage';
    console.log(this.value);
    console.log(url);
}


// which of the following will execule above function without error in strict mode
// VWO("https://vwo.com");

// VWO.call('https://vwo.com', {
//     name: 'VWO',
//     value: 'A/B Testing'
// });

// VWO.call({
//     name: 'VWO',
//     value: 'A/B Testing'
// }, 'https://vwo.com');

// VWO.bind({
//     name: 'VWO',
//     value: 'A/B Testing'
// }, 'https://vwo.com');

// correct: c (thik hai)
