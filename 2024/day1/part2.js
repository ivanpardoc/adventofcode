import { day1Input, example } from './input.js';

function solve(input) {
    let leftList = [];
    let rightList = [];
    let similarity = 0;
    input.forEach(element => {
        leftList.push(element[0])
        rightList.push(element[1])
    });
    leftList.forEach((l) => {
        const count = rightList.filter((r) => r === l).length;

        if (count !== 0) {
            similarity += l * count;
        }
    })
    console.log(similarity);
}

solve(example);
solve(day1Input);
