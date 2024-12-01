import { day1Input, example } from './input.js';

function solveDay1(input) {
    let leftList = [];
    let rightList = [];
    let distance = 0;
    input.forEach(element => {
        leftList.push(element[0])
        rightList.push(element[1])
    });
    leftList.sort();
    rightList.sort();
    console.log(leftList, rightList);
    leftList.forEach((e, index) => {
        distance += Math.abs(rightList[index] - e);
    })
    console.log(distance);
    
}

solveDay1(example);
solveDay1(day1Input);
