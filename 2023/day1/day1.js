import { day1Input, example } from './inputDay1.js';

const arrayOfNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const replacements = ['on1e', 'tw2o', 'thr3ee', 'fo4ur', 'fi5ve', 's6ix', 'sev7en', 'eigh8t', 'ni9ne'];
function solveDay1(day1Input) {

    const array = [];
    day1Input.forEach(element => {
        let firstNumber = '';
        let lastNumber = '';
        let newElement = element;
        
        arrayOfNumbers.forEach((number, indexNumber) => {
            const replacement = replacements[indexNumber];
            const indexOfNumber = element.includes(number);
            if (indexOfNumber) {
                newElement = newElement.replaceAll(number, replacement);
            }
        });
        newElement.split('').forEach((char, index) => {
            if (!isNaN(char)) {
                if (lastNumber === '') {
                    firstNumber = char;
                    lastNumber = char;
                } else {
                    lastNumber = char;
                }
            }
            if (index + 1 === newElement.length) {
                array.push(firstNumber + lastNumber);
            }
        })
    });
    const sum = array.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);
    console.log(sum);
}

solveDay1(day1Input);
// solveDay1(example);
