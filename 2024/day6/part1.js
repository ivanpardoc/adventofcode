import { input, example, example2 } from './input.js';
let currentPointRow = 0;
let currentPointCol = 0;
let direction = 'up';
function solve(input) {
    let inputF = [];
    input = input.split('\n');

    input = input.forEach(e => inputF.push(e.split('')))
    findStartingPoint(inputF);
    let endReached = false;
    let maxCol = inputF[0].length;
    let maxRow = inputF.length;

    while (!endReached) {
        if (direction === 'left') {
            if (currentPointCol - 1 < 0) {
                endReached = true;
            }
            let nextPos = inputF[currentPointRow][currentPointCol - 1];
            if (nextPos !== '#') {
                inputF[currentPointRow][currentPointCol - 1] = 'X';
                print(inputF)
                currentPointCol--;
            } else {
                direction = 'up';
            }
        }
        if (direction === 'down') {
            if (currentPointRow + 1 === maxRow - 1) {
                endReached = true;
            }
            let nextPos = inputF[currentPointRow + 1][currentPointCol];

            if (nextPos !== '#') {
                inputF[currentPointRow + 1][currentPointCol] = 'X';
                print(inputF)
                currentPointRow++;
            } else {
                direction = 'left';
            }
        }
        if (direction === 'right') {
            if (currentPointCol + 1 > maxCol - 1) {

                endReached = true;
            }
            let nextPos = inputF[currentPointRow][currentPointCol + 1];
            if (nextPos !== '#') {
                inputF[currentPointRow][currentPointCol + 1] = 'X';
                print(inputF)
                currentPointCol++;
            } else {
                direction = 'down';
            }
        }
        if (direction === 'up') {
            if ((currentPointRow - 1) === -1) {
                endReached = true;
            }
            let nextPos = inputF[currentPointRow - 1][currentPointCol];
            if (nextPos !== '#') {
                inputF[currentPointRow - 1][currentPointCol] = 'X';
                print(inputF)
                currentPointRow--;
            } else {
                console.log('else');

                direction = 'right';
            }
        }
    }
    let row = '';
    let count = 0;
    inputF.forEach((r) => {
        console.log(row);
        row = '';
        r.forEach((c) => {
            row += c;
            if (c === 'X') {
                count++;
            }
        })

    })
    console.log('total', count);

}

function print(input) {
    // let row= '';
    // input.forEach((r) => {
    //     console.log(row);
    //     row = '';
    //     r.forEach((c) => {
    //         row += c;
    //     })
    // })
}

function findStartingPoint(input) {
    input.forEach((r, rIndex) => {
        r.forEach((c, cInd) => {
            if (c === '^') {
                currentPointCol = cInd;
                currentPointRow = rIndex
            }
        })
    })
}
solve(example2);
// solve(input); // 4258 
// RIght 4789
