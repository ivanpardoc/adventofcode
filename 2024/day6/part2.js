import { input, example, example2 } from './input.js';
let currentPointRow = 0;
let currentPointCol = 0;
let ogRow = 0;
let ogCol = 0;
let direction = 'up';
let loopCount = 0;

function solve(input) {
    let inputF = [];
    input = input.split('\n');

    input = input.forEach(e => inputF.push(e.split('')));
    
    let ogInput = inputF.map(row => [...row]);
    findStartingPoint(inputF);

    makePath(inputF);

    inputF.forEach((r, rind) => {
        r.forEach((c, cind) => {
            let copyInput = ogInput.map(row => [...row]); // Create a deep copy
            copyInput[rind][cind] = '#';
            direction = 'up';
            
            makePath(copyInput, true);
        })
        console.log('row', rind);

    })

    let row = '';
    let xCount = 0;
    inputF.forEach((r) => {
        console.log(row);
        row = '';
        r.forEach((c) => {
            row += c;
            if (c === 'X') {
                xCount++;
            }
        })

    })

    console.log('total', loopCount);
}

function makePath(inputF, checkForLoop = false) {
    let maxCol = inputF[0].length;
    let maxRow = inputF.length;
    let endReached = false;
    let positionsVisited = [];
    
    currentPointCol = ogCol;
    currentPointRow = ogRow;

    while (!endReached) {
        let movement = currentPointRow + '' + currentPointCol + direction;
        positionsVisited.push(movement);
        if (positionsVisited.filter((v) => v === movement).length > 2 && checkForLoop) {
            endReached = true;
            loopCount++;
            console.log('loop');
            
        }
        
        // console.log(positionsVisited);

        if (direction === 'left') {
            if (currentPointCol - 1 < 0) {
                endReached = true;
            }
            if (!endReached) {

                let nextPos = inputF[currentPointRow][currentPointCol - 1];
                if (nextPos !== '#') {
                    inputF[currentPointRow][currentPointCol - 1] = 'X';
                    print(inputF)
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
                // console.log(currentPointRow + 1, currentPointCol, endReached, maxRow);
                let nextPos = inputF[currentPointRow + 1][currentPointCol];

                if (nextPos !== '#') {
                    inputF[currentPointRow + 1][currentPointCol] = 'X';
                    print(inputF)
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
                    print(inputF)
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
                    print(inputF)
                    currentPointRow--;
                } else {
                    direction = 'right';
                }
            }
        }
    }
}

function print(input) {
    // let row = '';
    // input.forEach((r) => {
    //     // console.log(row);
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
