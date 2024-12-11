import { input, example, example2 } from './input.js';
let total = [];
let dict = {};
let count = 0;
function solve(input) {
    console.time();
    const data = input.split(' ');
    data.forEach((stone) => dict[stone] = { count: 1 });
    checkStones(dict);

    console.timeEnd();
}

function checkStones(data) {
    let copyData = {};

    if (count === 75) {
        const totalSum = Object.values(data).reduce((sum, obj) => sum + obj.count, 0);
        console.log('totalsum', totalSum);
        return
    }
    
    Object.keys(data).forEach((stone) => {
        const stoneCount = data[stone].count;
            if (stone === '0') {
                copyData['1'] ? copyData['1'].count += stoneCount : copyData['1'] = { count: stoneCount };
            } else if (stone.length % 2 === 0) {
                let firstVal = stone.slice(0, stone.length / 2);
                let secondVal = JSON.stringify(parseInt(stone.slice(stone.length / 2)));
                copyData[firstVal] ? copyData[firstVal].count += stoneCount : copyData[firstVal] = { count: stoneCount };
                copyData[secondVal] ? copyData[secondVal].count += stoneCount : copyData[secondVal] = { count: stoneCount };
            } else {
                const newVal = JSON.stringify(parseInt(stone) * 2024);
                copyData[newVal] ? copyData[newVal].count += stoneCount : copyData[newVal] = { count: stoneCount };
            }
    })
    
    count++;
    checkStones(copyData);
}


solve(input);