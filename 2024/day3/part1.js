import { input, example } from './input.js';
let regexMul = /mul\(\d{1,3}\,\d{1,3}\)/g;

function solve(input) {
    let allMulsSum = 0;
    let allMuls = [...input.matchAll(regexMul)];
    
    allMuls.forEach((mul) => {
        let splitted = mul[0].split(',')
        let firstNumber = parseInt(splitted[0].replace(/\D/g, ''));
        let secondNumber = parseInt(splitted[1].replace(/\D/g, ''));
        let mult = firstNumber*secondNumber;
        allMulsSum += mult;
    })
    console.log(allMulsSum);
}

// solve(example);
// 137657293 too low
// 187194685 too high
solve(input);
