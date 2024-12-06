import { input, example, example2 } from './input.js';
let currentPointRow = 0;
let currentPointCol = 0;
let ogRow = 0;
let ogCol = 0;
let direction = 'up';
let loopCount = 0;

function solve(input) {
    console.time();
    let inputF = [];
    input = input.split('\n');

    input = input.forEach(e => inputF.push(e.split('')));
    
    let ogInput = inputF.map(row => [...row]);
    findStartingPoint(inputF);

    makePath(inputF);

    inputF.forEach((r, rind) => {
        r.forEach((c, cind) => {
            if (c === 'X') {
                let copyInput = ogInput.map(row => [...row]); // Create a deep copy
                copyInput[rind][cind] = '#';
                direction = 'up';
                
                makePath(copyInput, true);
            }
        })
    })

    console.log('total', loopCount);
    console.timeEnd();
}

function makePath(inputF, checkForLoop = false) {
    let maxCol = inputF[0].length;
    let maxRow = inputF.length;
    let endReached = false;
    let positionsVisited = {};
    
    currentPointCol = ogCol;
    currentPointRow = ogRow;

    while (!endReached) {
        let movement = JSON.stringify(currentPointRow) + currentPointCol + direction;
        
        if (positionsVisited[movement] && positionsVisited[movement].count === 2) {
            endReached = true;
            loopCount++;
        } else {
            if (positionsVisited[movement]) {
                positionsVisited[movement].count = 2;
            } else {   
                positionsVisited[movement] = { count: 1 };
            }
        }
        
        if (direction === 'left') {
            if (currentPointCol - 1 < 0) {
                endReached = true;
            }
            if (!endReached) {

                let nextPos = inputF[currentPointRow][currentPointCol - 1];
                if (nextPos !== '#') {
                    inputF[currentPointRow][currentPointCol - 1] = 'X';
                    currentPointCol--;
                } else {
                    direction = 'up';
                }
            }
        }
        if (direction === 'down') {
            if (currentPointRow === maxRow - 1) {
                endReached = true;
            }
            if (!endReached) {
                let nextPos = inputF[currentPointRow + 1][currentPointCol];

                if (nextPos !== '#') {
                    inputF[currentPointRow + 1][currentPointCol] = 'X';
                    currentPointRow++;
                } else {
                    direction = 'left';
                }
            }
        }
        if (direction === 'right') {
            if (currentPointCol > maxCol - 1) {
                endReached = true;
            }
            if (!endReached) {

                let nextPos = inputF[currentPointRow][currentPointCol + 1];
                if (nextPos !== '#') {
                    inputF[currentPointRow][currentPointCol + 1] = 'X';
                    currentPointCol++;
                } else {
                    direction = 'down';
                }
            }
        }
        if (direction === 'up') {
            if ((currentPointRow - 1) === -1) {
                endReached = true;
            }
            if (!endReached) {
                let nextPos = inputF[currentPointRow - 1][currentPointCol];
                if (nextPos !== '#') {
                    inputF[currentPointRow - 1][currentPointCol] = 'X';
                    currentPointRow--;
                } else {
                    direction = 'right';
                }
            }
        }
    }
}

function findStartingPoint(input) {
    input.forEach((r, rIndex) => {
        r.forEach((c, cInd) => {
            if (c === '^') {
                ogCol = cInd;
                ogRow = rIndex
            }
        })
    })
}
// solve(example);
solve(input);
// 3494
// 15605
