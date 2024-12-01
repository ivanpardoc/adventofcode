import { input, example, exampleCustom } from './input.js';
const total = [];

function solveDay4() {
    const inputData = input;

    inputData.forEach(card => {
        let winningNumbers = card.split(' | ')[0];
        let myNumbers = card.split(' | ')[1];
        const cardId = winningNumbers.split(': ')[0];
        winningNumbers = winningNumbers.split(': ')[1].split(' ');
        myNumbers = myNumbers.split(' ');
        const matchingNumbers = myNumbers.filter((num) => winningNumbers.includes(num) && num !== '');
        let value = 0;
        matchingNumbers.forEach((match) => {
            value = value === 0 ? 1 : value * 2;
        });
        total.push(value);
    });

    const sum = total.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);
    console.log(sum);
}
solveDay4();

// 24160 - OK 