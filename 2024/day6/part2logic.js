import { input, example, example2 } from './input.js';
let currentPointRow = 0;
let currentPointCol = 0;
let direction = 'up';
let count = 0;
let hashLocations = [];
function solve(input) {
    let inputF = [];
    input = input.split('\n');

    input = input.forEach(e => inputF.push(e.split('')))
    findStartingPoint(inputF);
    inputF[currentPointRow][currentPointCol] = '|';
    let endReached = false;
    let maxCol = inputF[0].length;
    let maxRow = inputF.length;
    
    lookAllHash(inputF);
    console.log(hashLocations);
    
    while (!endReached) {
        if (direction === 'left') {

            // If in my current pos, I look up and I found a # and a + below it, it can be a loop
            if (currentPointCol - 1 < 0) {
                endReached = true;
                continue;
            }
            let nextPos = inputF[currentPointRow][currentPointCol - 1];
            if (nextPos !== '#') {
                let hashsfound = hashLocations.filter((v) => v.rowInd < currentPointRow && v.colInd === currentPointCol);
                if (hashsfound.length > 0) {
                    count++;
                    console.log('found in', currentPointRow, currentPointCol);
                } 
                inputF[currentPointRow][currentPointCol - 1] = nextPos === '|' || nextPos === '+' ? '+' : '-';
                print(inputF)
                currentPointCol--;
            } else {
                inputF[currentPointRow][currentPointCol] = '+';

                direction = 'up';
            }
        }
        if (direction === 'down') {
            if (currentPointRow + 1 === maxRow - 1) {
                endReached = true;
                continue;
            }
            // cap abaix, hash en el mateix row, en col menor
            let nextPos = inputF[currentPointRow + 1][currentPointCol];

            if (nextPos !== '#') {
                
            let hashsfound = hashLocations.filter((v) => v.rowInd === currentPointRow && v.colInd < currentPointCol);
            if (hashsfound.length > 0) {
                count++;
                console.log('found in', currentPointRow, currentPointCol);
            } 
                inputF[currentPointRow + 1][currentPointCol] = nextPos === '-' || nextPos === '+' ? '+' : '|';
                print(inputF)
                currentPointRow++;
            } else {
                inputF[currentPointRow][currentPointCol] = '+';

                direction = 'left';
            }
        }
        if (direction === 'right') {
            if (currentPointCol + 1 > maxCol - 1) {
                endReached = true;
                continue;
            }

            // a la dreta, row superior, mateix col
            let hashsfound = hashLocations.filter((v) => v.rowInd > currentPointRow && v.colInd === currentPointCol);
            let nextPos = inputF[currentPointRow][currentPointCol + 1];
            if (nextPos !== '#') {
                if (hashsfound.length > 0) {
                    count++;
                    console.log('found in', currentPointRow, currentPointCol);
                } 
                inputF[currentPointRow][currentPointCol + 1] = nextPos === '|' || nextPos === '+' ? '+' : '-';
                print(inputF)
                currentPointCol++;
            } else {
                inputF[currentPointRow][currentPointCol] = '+';

                direction = 'down';
            }
        }
        if (direction === 'up') {
            if ((currentPointRow - 1) === -1) {
                endReached = true;
                continue;
            }
            // 
            let nextPos = inputF[currentPointRow - 1][currentPointCol];
            if (nextPos !== '#') {
                let hashsfound = hashLocations.filter((v) => v.rowInd === currentPointRow && v.colInd > currentPointCol);
                if (hashsfound.length > 0) {
                    count++;
                    console.log('found in', currentPointRow, currentPointCol);
                } 
                inputF[currentPointRow - 1][currentPointCol] = nextPos === '-' || nextPos === '+' ? '+' : '|';
                print(inputF)
                currentPointRow--;
            } else {
                inputF[currentPointRow][currentPointCol] = '+';
                direction = 'right';
            }
        }
    }
    console.log('total', count);
    
}
function lookAllHash(input) {
    input.forEach((r, rowInd) => {
        r.forEach((c, colInd) => {
            if (c === '#') {
                hashLocations.push({rowInd, colInd})
            }
            
        })
    })
}
function print(input) {
    let row = '';
    input.forEach((r) => {
        console.log(row);
        row = '';
        r.forEach((c) => {
            row += c;
        })
    })
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
solve(example);
// solve(input); // 380 too low
// 426 too low

