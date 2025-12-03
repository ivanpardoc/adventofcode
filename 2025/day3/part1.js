import { input, example } from './input.js';

function solve(input) {
    console.time();
    const arr = input.trim().split('\n');
    const resArray = [];
    arr.forEach(row => {
        let highest = 0;
        let secondHighest = 0;
        let highestIndex = 0;

        row.split('').forEach((char, index) => {
            if (index !== row.length - 1) {
                if (parseInt(char) > highest) {
                    highest = parseInt(char);
                    highestIndex = index;
                }
            }
        })
        
        row.split('').forEach((char, index) => {
            if (index > highestIndex) {
                if (parseInt(char) > secondHighest) {
                    secondHighest = parseInt(char);
                }
            }
        })
        resArray.push(highest.toString() + secondHighest.toString());
    });
    
    console.log('Total:', resArray.reduce((a, b) => parseInt(a) + parseInt(b), 0));
    console.timeEnd();
}

solve(input);