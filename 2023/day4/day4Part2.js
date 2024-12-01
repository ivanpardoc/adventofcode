import { input, example, exampleCustom } from './input.js';
const refine = [];

function solveDay4() {
    const inputData = input;
    inputData.forEach((val) => {
        refine.push({card: val, copies: 1});
    })
    refine.forEach((card, indexCard) => {
        let winningNumbers = card.card.split(' | ')[0];
        let myNumbers = card.card.split(' | ')[1];
        const cardId = winningNumbers.split(': ')[0];
        winningNumbers = winningNumbers.split(': ')[1].split(' ');
        myNumbers = myNumbers.split(' ');
        const matchingNumbers = myNumbers.filter((num) => winningNumbers.includes(num) && num !== '');
        let iterations = 0;
        while (iterations !== card.copies) {
            makeCopies(matchingNumbers, indexCard);
            iterations++;
        }
    });

    const sum = refine.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue.copies);
    }, 0);
    console.log(sum);
}

function makeCopies(matchNumbers, indexCard) {
    matchNumbers.forEach((element, indexW) => {
        refine[indexCard + (indexW + 1)].copies = refine[indexCard + (indexW + 1)].copies + 1;
    });
} 
solveDay4();

// 5659035 - OK 