import { input, example } from './input.js';
let regexMul = /mul\(\d{1,3}\,\d{1,3}\)|do\(\)|don't\(\)/g;

function solve(input) {
    let allMulsSum = 0;
    let allMuls = [...input.matchAll(regexMul)];
    let enabled = true;
    allMuls.forEach((res) => {
        let func = res[0];

        if (func === `don't()`) {
            enabled = false;
        }
        
        if (func === `do()`) {
            enabled = true;
        }
        
        if (enabled && func !== 'do()') {
            let splitted = func.split(',')
            let firstNumber = parseInt(splitted[0].replace(/\D/g, ''));
            let secondNumber = parseInt(splitted[1].replace(/\D/g, ''));
            let mult = firstNumber*secondNumber;
            allMulsSum += mult;
        }
    })
    console.log(allMulsSum);
}

// solve(example);
// 127092535 result
solve(input);
