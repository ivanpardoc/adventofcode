import { input } from './input.js';

function solveDay1(input) {
    const t = input.trim().split('\n');
    let startingDial = 50;
    let count = 0;
    t.forEach(element => {
        const direction = element[0];
        let distance = parseInt(element.substring(1));
        
        for (let i = 0; i < distance; i++) {
            if (direction === 'R') {
                if (startingDial === 99) {
                    startingDial = 0;
                } else {
                    startingDial++;
                }
            } else if (direction === 'L') {
                if (startingDial === 0) {
                    startingDial = 99;
                } else {
                    startingDial--;
                }
            }
            
            if (startingDial === 0) {
                count++;
            }
        }
    });
    console.log('Result', count);
}

solveDay1(input);

// 6081 too low
// 6228 too high
// 6177 not right