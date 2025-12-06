import { input, example } from './input.js';

function solve(input) {
    console.time();
    let result = 0;
    const inputArr = input.trim().split('\n');
    let arr = [];
    let operations = [];

    inputArr.forEach((element, index) => {
        if (index === inputArr.length -1) {
            operations.push(element.trim().replace(/\s+/g, ' ').split(' '));
        } else {
            arr.push(element.trim().replace(/\s+/g, ' ').split(' '));
        }
    });

    operations[0].forEach((op, indOp) => {
        let numbers = [];

        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            numbers.push(parseInt(element[indOp]))
        }

        let total = numbers.reduce((previousValue, currentValue) => {
            if (op === '*') {
                return parseInt(previousValue) * parseInt(currentValue);
            } else {
                return parseInt(previousValue) + parseInt(currentValue);
            }
        }, op === '*' ? 1 : 0);
        result += total;
    })

    console.log('result', result);
    console.timeEnd();
}

solve(input);