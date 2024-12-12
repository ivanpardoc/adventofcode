import { input, example, example2 } from './input.js';
let total = 0;
let data = [];
let visited = [];
let AreasFound = {};
let finalArrays = [];

function solve(input) {
    console.time();
    data = input.split('\n').map((t) => t.split(''));
    data.forEach((row, rInd) => {
        row.forEach((char, charInd) => {
            const uniqueId = 'row' + rInd + 'char' + charInd;
            if (!visited.includes(uniqueId)) {
                AreasFound[char + uniqueId] = {};
                AreasFound[char + uniqueId][uniqueId] = { row: rInd, col: charInd, value: 4 };
                visited.push(uniqueId)
                checkAround(data, rInd, charInd, char, char + uniqueId, uniqueId)
            }
        });
    });
    
    Object.entries(AreasFound).forEach(([key, obj]) => {
        let arr = []
        Object.entries(obj).forEach(([keyE, objE]) => {
            arr.push(objE);
        })
        arr.forEach((r) => {
            if (arr.some(i => i.row === r.row+1 && i.col === r.col)) {
                r.value--
            }
            if (arr.some(i => i.row === r.row-1 && i.col === r.col)) {
                r.value--
            }
            if (arr.some(i => i.row === r.row && i.col+1 === r.col)) {
                r.value--
            }
            if (arr.some(i => i.row === r.row && i.col-1 === r.col)) {
                r.value--
            }
        })
        finalArrays.push(arr);
    })
    finalArrays.forEach((final) => {
        let t = final.reduce((sum, { value }) => sum + value, 0);
        total += (t * final.length);
    })

    console.log('total', total);
    console.timeEnd()
}

function checkAround(data, rowInd, colInd, currentValue, zeroPosition, parentPosition) {
    const maxRow = data.length - 1;
    const maxCol = data[0].length - 1;
    let uniqueId = '';
    if (rowInd !== maxRow) {
        uniqueId = 'row' + (rowInd + 1) + 'char' + colInd;
        if (data[rowInd + 1][colInd] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd + 1, col: colInd, value: 4 };
            checkAround(data, rowInd + 1, colInd, currentValue, zeroPosition, uniqueId);
        }
    }
    if (rowInd !== 0) {
        uniqueId = 'row' + (rowInd - 1) + 'char' + colInd;
        if (data[rowInd - 1][colInd] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd - 1, col: colInd, value: 4 };
            checkAround(data, rowInd - 1, colInd, currentValue, zeroPosition, uniqueId);
        }
    }

    if (colInd !== maxCol) {
        uniqueId = 'row' + rowInd + 'char' + (colInd + 1);
        if (data[rowInd][colInd + 1] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd, col: colInd + 1, value: 4 };
            checkAround(data, rowInd, colInd + 1, currentValue, zeroPosition, uniqueId);
        }
    }
    if (colInd !== 0) {
        uniqueId = 'row' + rowInd + 'char' + (colInd - 1);
        if (data[rowInd][colInd - 1] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd, col: colInd - 1, value: 4 };
            checkAround(data, rowInd, colInd - 1, currentValue, zeroPosition, uniqueId);
        }
    }

    return;
}

solve(input);