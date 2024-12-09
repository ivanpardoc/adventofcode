import { input, example, example2 } from './input.js';

function solve(input) {
    console.time();
    let { data, antennas } = formatData(input);
    let maxCol = data[0].length;
    let maxRow = data.length;
    let visArr = data.map(row => [...row]);

    for (const [key, value] of Object.entries(antennas)) {
        value.positions.forEach((p, pInd) => {
            value.positions.forEach((nextP, nextPInd) => {
                if (pInd !== nextPInd) {
                    let rowDiff = p.row - nextP.row;
                    let colDiff = p.col - nextP.col;
                    let newAntenna = { row: p.row + rowDiff, col: p.col + colDiff };

                    if (newAntenna.col < maxCol && newAntenna.col >= 0 && newAntenna.row >= 0 && newAntenna.row < maxRow) {
                        visArr[newAntenna.row][newAntenna.col] = '#';
                    }

                    newAntenna = { row: p.row, col: p.col };
                    
                    while (newAntenna.col < maxCol && newAntenna.col >= 0 && newAntenna.row >= 0 && newAntenna.row < maxRow) {
                        newAntenna = { row: newAntenna.row - rowDiff, col: newAntenna.col - colDiff };
                        if (newAntenna.col < maxCol && newAntenna.col >= 0 && newAntenna.row >= 0 && newAntenna.row < maxRow) {
                            visArr[newAntenna.row][newAntenna.col] = '#';
                        }
                    }
                }
            })
        })
    }
    printArray(data);
    console.log('');

    printArray(visArr);
    console.timeEnd();
}

function printArray(data) {
    let row = '';
    let countAntennas = 0;
    data.forEach((r) => {
        row = '';
        r.forEach((c) => {
            if (c === '#') {
                countAntennas++;
            }
            row += c;
        })
        console.log(row);
    })
    console.log('Total antennas:', countAntennas);
}

function formatData(input) {
    input = input.split('\n');
    let data = [];
    let antennas = {};
    input.forEach((row, indR) => {
        data.push(row.split(''))
        row.split('').forEach((c, indC) => {
            if (c !== '.') {
                antennas[c] ? antennas[c].positions.push({ row: indR, col: indC }) : antennas[c] = { positions: [{ row: indR, col: indC }] };
            }
        })
    });
    
    return { data, antennas };
}

solve(input);
// solve(input);