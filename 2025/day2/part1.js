import { input, example } from './input.js';

function solveDay1(input) {
    const arr = input.trim().split(',');
    const incorrectValues = []
    arr.forEach(element => {
        let spl = element.split('-');
        for (let i = parseInt(spl[0]); i <= parseInt(spl[1]); i++) {
            if (!checkValid(i.toString())) {
                incorrectValues.push(i);
            }
        }
    });

    const sum = incorrectValues.reduce((partialSum, a) => partialSum + a, 0);
    console.log('Sum of invalid numbers', sum);
}

function checkValid(number) {
    const length = number.length;
    const half = length / 2;
    const firstHalf = number.substring(0, half);
    const secondHalf = number.substring(half);
    
    if (firstHalf === secondHalf) {
        return false;
    }

    return true;
}

solveDay1(input);