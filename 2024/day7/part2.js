import { input, example, example2 } from './input.js';
let newValids = [];

function solve(input) {
    console.time();
    let data = formatData(input);
    data.forEach((d) => {
        checkValues(d.numbers[0], d.numbers[1], d.objective, d.numbers, 1);
    });

    data.filter((d) => d.valid).forEach((v) => newValids.push(v.objective))
    let uniqueItems = [...new Set(newValids)]
    let sum = uniqueItems.reduce((pv, v) => pv+v, 0);
    console.log('Total', sum);
    console.timeEnd();
}

function checkValues(currentValue, num2, resultToCheck, allNumbers, currentIndex) {
    
    if (currentValue === resultToCheck && currentIndex === allNumbers.length) {
        newValids.push(resultToCheck);
        return;
    }
    if (currentValue > resultToCheck || currentIndex > allNumbers.length - 1) {
        return;
    }

    let mult = currentValue * num2;
    let sum = currentValue + num2;
    let concat = currentValue + '' + num2; // much faster
    // let concat = JSON.stringify(currentValue) + JSON.stringify(num2);
    
    checkValues(mult, allNumbers[currentIndex+1], resultToCheck, allNumbers, currentIndex+1);
    checkValues(sum, allNumbers[currentIndex+1], resultToCheck, allNumbers, currentIndex+1);
    checkValues(parseInt(concat), allNumbers[currentIndex+1], resultToCheck, allNumbers, currentIndex+1);
}

function formatData(input) {
    input = input.split('\n');
    let data = []
    input.forEach(row => {
        let f = row.split(': ');
        let objective = parseInt(f[0]);
        data.push({
            objective,
            numbers: f[1].split(' ').map((v) => parseInt(v)),
            valid: false
        })
    });
    return data;
}

solve(input);