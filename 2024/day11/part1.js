import { input, example, example2 } from './input.js';
let total = [];
let count = 0;
function solve(input) {
    console.time();
    const data = input.split(' ');

    checkStones(data);
    
    console.timeEnd();
}

function checkStones(data) {
    let newStr = [];
    
    if (count === 25) {
        console.log('finish', data.length);
        return;
    }
    data.forEach(stone => {
        if (stone === '0') { // Starting 0
            newStr.push('1');
        } else if (stone.length % 2 === 0) { // even
            newStr.push(stone.slice(0, stone.length/2))
            newStr.push(JSON.stringify(parseInt(stone.slice(stone.length/2))))
        } else {
            newStr.push(JSON.stringify(parseInt(stone)*2024))
        }
    });
    count++;
    // console.log(newStr);
    checkStones(newStr)
}


solve(input);