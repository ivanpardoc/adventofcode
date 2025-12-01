import { input, example } from './input.js';

function solveDay1(input) {
    const t = input.trim().split('\n');
    let startingDial = 50;
    let count = 0;
    t.forEach(element => {
        const direction = element[0];
        let distance = parseInt(element.substring(1));
        
        if (distance > 100) {
            distance = distance % 100;
        }

        if (direction === 'R') {
            startingDial += distance;
            if (startingDial > 100) {
                startingDial -= 100;
            }
        }

        if (direction === 'L') {
            startingDial -= distance;
            if (startingDial < 0) {
                startingDial += 100;
            }
        }
        
        if (startingDial === 100 || startingDial === 0) {
            startingDial = 0;
            count++;
        }
    });
    console.log('Result', count);
}

solveDay1(input);