import { input, example, example2 } from './input.js';
let total = [];
let dict = {};
let count = 0;
function solve(input) {
    console.time();
    const data = input.split(' ');
    // prepareDict(data);
    data.forEach((stone) => dict[stone] = { count: 1 });
    checkStones(dict);

    console.timeEnd();
}

function prepareDict(data) {
}

function checkStones(data) {
    let copyData = {};
    console.log(count);
    
    if (count === 25) {
        const totalSum = Object.values(data).reduce((sum, obj) => sum + obj.count, 0);
        console.log('totalsum', totalSum);
        return
    }
    
    // Object.keys(data).forEach((stone) => {
    //     for (let index = 0; index < data[stone].count; index++) {
    //         if (stone === '0') {
    //             copyData['1'] ? copyData['1'].count++ : copyData['1'] = { count: 1 };
    //         } else if (stone.length % 2 === 0) {
    //             let firstVal = stone.slice(0, stone.length / 2);
    //             let secondVal = JSON.stringify(parseInt(stone.slice(stone.length / 2)));
    //             copyData[firstVal] ? copyData[firstVal].count++ : copyData[firstVal] = { count: 1 };
    //             copyData[secondVal] ? copyData[secondVal].count++ : copyData[secondVal] = { count: 1 };
    //         } else {
    //             const newVal = JSON.stringify(parseInt(stone) * 2024);
    //             copyData[newVal] ? copyData[newVal].count++ : copyData[newVal] = { count: 1 };
    //         }
    //     }
    // })
    Object.keys(data).forEach((stone) => {
        for (let index = 0; index < data[stone].count; index++) {
            if (stone === '0') {
                copyData['1'] ? copyData['1'].count = copyData['1'].count + data[stone].count : copyData['1'] = { count: 1 };
            } else if (stone.length % 2 === 0) {
                let firstVal = stone.slice(0, stone.length / 2);
                let secondVal = JSON.stringify(parseInt(stone.slice(stone.length / 2)));
                copyData[firstVal] ? copyData[firstVal].count = copyData[firstVal].count + data[stone].count : copyData[firstVal] = { count: 1 };
                copyData[secondVal] ? copyData[secondVal].count = copyData[secondVal].count + data[stone].count : copyData[secondVal] = { count: 1 };
            } else {
                const newVal = JSON.stringify(parseInt(stone) * 2024);
                copyData[newVal] ? copyData[newVal].count = copyData[newVal].count + data[stone].count : copyData[newVal] = { count: 1 };
            }
        }
    })
    count++;
    checkStones(copyData);
}


solve(input);