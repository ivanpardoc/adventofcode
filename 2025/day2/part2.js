import { input, example } from './input.js';

function solve(input) {
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
    console.log('Sum of valid numbers', sum);
}

function checkValid(number) {
    const length = number.length;
    const half = length / 2;

    for (let i = 1; i <= half; i++) {
        const firstHalf = number.substring(0, i);
        let secondHalf = number.substring(i, length);
        secondHalf = secondHalf.replaceAll(firstHalf, '');

        if (secondHalf.length === 0) {
            return false;
        }
    }

    return true;
}

solve(input);