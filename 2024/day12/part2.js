import { input, example, example2 } from './input.js';
let total = 0;
let data = [];
let visited = [];
let AreasFound = {};
let finalArrays = [];
let sidesCount = {}

function solve(input) {
    console.time();
    data = input.split('\n').map((t) => t.split(''));
    data.forEach((row, rInd) => {
        row.forEach((char, charInd) => {
            const uniqueId = 'row' + rInd + 'char' + charInd;
            if (!visited.includes(uniqueId)) {
                AreasFound[char + uniqueId] = {};
                AreasFound[char + uniqueId][uniqueId] = { row: rInd, col: charInd, value: 4, parentId: char + uniqueId };
                visited.push(uniqueId)
                checkAround(data, rInd, charInd, char, char + uniqueId, char + uniqueId)
            }
        });
    });

    
    Object.entries(AreasFound).forEach(([key, obj]) => {
        let arr = []
        Object.entries(obj).forEach(([keyE, objE]) => {
            arr.push(objE);
        })
        finalArrays.push(arr);
    })
    finalArrays.forEach((zone) => {
        let wallCount = 0;
        let maxRow = Math.max(...zone.map(item => item.row));
        let maxCol = Math.max(...zone.map(item => item.col));
        let minRow = Math.min(...zone.map(item => item.row));
        let minCol = Math.min(...zone.map(item => item.col));
        // console.log('maxRow:', maxRow, minRow);
        // console.log('maxRow:', maxCol, minCol);
        if (zone.length === 1 || minRow === maxRow || minCol === maxCol) {
            console.log('horizontal walls', zone, 4);
            sidesCount[zone[0].parentId] = 4 * zone.length;
        } else {
            // console.log('zone: ', zone);
            
            for (let indexR = minRow; indexR <= maxRow; indexR++) {
                for (let indexC = minCol; indexC <= maxCol; indexC++) {
                        if (zone.some((p => p.row === indexR && p.col === indexC))) {
                            wallCount++;
                            console.log('here', indexR, indexC, 'wallCount', wallCount);
                            
                            let continueConting = true;
                            while (continueConting) {
                                indexC++
                                continueConting = zone.some((p => p.row === indexR && p.col === indexC))
                            }
                            
                            wallCount++;
                            console.log('here', indexR, indexC, 'wallCount', wallCount);
                        }
                }
            }
            console.log('horizontal walls', zone[0].parentId, wallCount);
            
            for (let indexC = minCol; indexC < maxCol; indexC++) {
                for (let indexR = minRow; indexR < maxRow; indexR++) {
                        if (zone.some((p => p.row === indexR && p.col === indexC))) {
                            wallCount++;
                            let continueConting = true;
                            while (continueConting) {
                                indexR++
                                continueConting = zone.some((p => p.row === indexR && p.col === indexC))
                            }
                            wallCount++;
                        }
                }
            }
            
            console.log('vertical walls', zone[0].parentId, wallCount);
            sidesCount[zone[0].parentId] = wallCount*zone.length;
        }
    })
    console.log('total', sidesCount);
    console.timeEnd()
}

function checkForBorders(data, startingPoint, currentPoint, direction) {
    // console.log(data, startingPoint, currentPoint, direction);
    
    if (currentPoint.row === startingPoint.row && currentPoint.col === startingPoint.col && sidesCount[startingPoint.parentId].sides !== 1) {
        console.log(sidesCount[startingPoint.parentId].sides !== 1);
        if (sidesCount[startingPoint.parentId].timesVisited >= 2) {
            // console.log('finished border', startingPoint.parentId, 'sides:', sidesCount[startingPoint.parentId]);
            return;
        }
        sidesCount[startingPoint.parentId].timesVisited++;
    }
    let pointToCheckOne;
    let pointToCheckTwo;
    let checkingOne;
    let checkingTwo;
    switch (direction) {
        case 'R':
            pointToCheckOne = { row: currentPoint.row-1, col: currentPoint.col }; // First check up, then check right again, else change direction to down
            pointToCheckTwo = { row: currentPoint.row, col: currentPoint.col+1 };
            checkingOne = data.some(s => s.row === pointToCheckOne.row && s.col === pointToCheckOne.col);
            checkingTwo = data.some(s => s.row === pointToCheckTwo.row && s.col === pointToCheckTwo.col);
            if (checkingOne) {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, pointToCheckOne, 'U')
            } else if (checkingTwo) {
                checkForBorders(data, startingPoint, pointToCheckTwo, direction)
            } else {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, currentPoint, 'D')
            }
            break;
        case 'L':
            pointToCheckOne = { row: currentPoint.row+1, col: currentPoint.col }; // First check Down, then check left again, else change direction to up
            pointToCheckTwo = {row: currentPoint.row, col: currentPoint.col-1 };
            checkingOne = data.some(s => s.row === pointToCheckOne.row && s.col === pointToCheckOne.col);
            checkingTwo = data.some(s => s.row === pointToCheckTwo.row && s.col === pointToCheckTwo.col);
            if (checkingOne) {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, pointToCheckOne, 'D')
            } else if (checkingTwo) {
                checkForBorders(data, startingPoint, pointToCheckTwo, direction)
            } else {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, currentPoint, 'U')
            }
            break;
        case 'U':
            pointToCheckOne = { row: currentPoint.row, col: currentPoint.col-1 }; // First check L, then check U again, else change direction to R
            pointToCheckTwo = {row: currentPoint.row-1, col: currentPoint.col };
            checkingOne = data.some(s => s.row === pointToCheckOne.row && s.col === pointToCheckOne.col);
            checkingTwo = data.some(s => s.row === pointToCheckTwo.row && s.col === pointToCheckTwo.col);
            if (checkingOne) {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, pointToCheckOne, 'L')
            } else if (checkingTwo) {
                checkForBorders(data, startingPoint, pointToCheckTwo, direction)
            } else {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, currentPoint, 'R')
            }
            break;
        case 'D':
            pointToCheckOne = { row: currentPoint.row, col: currentPoint.col+1 }; // First check R, then check D again, else change direction to L
            pointToCheckTwo = {row: currentPoint.row+1, col: currentPoint.col };
            checkingOne = data.some(s => s.row === pointToCheckOne.row && s.col === pointToCheckOne.col);
            checkingTwo = data.some(s => s.row === pointToCheckTwo.row && s.col === pointToCheckTwo.col);
            if (checkingOne) {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, pointToCheckOne, 'R')
            } else if (checkingTwo) {
                checkForBorders(data, startingPoint, pointToCheckTwo, direction)
            } else {
                sidesCount[startingPoint.parentId].sides++;
                checkForBorders(data, startingPoint, currentPoint, 'L')
            }
            break;
        default:
            break;
    }
}

function checkAround(data, rowInd, colInd, currentValue, zeroPosition, parentId) {
    const maxRow = data.length - 1;
    const maxCol = data[0].length - 1;
    let uniqueId = '';
    if (rowInd !== maxRow) {
        uniqueId = 'row' + (rowInd + 1) + 'char' + colInd;
        if (data[rowInd + 1][colInd] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd + 1, col: colInd, value: 4, parentId: parentId };
            checkAround(data, rowInd + 1, colInd, currentValue, zeroPosition, parentId );
        }
    }
    if (rowInd !== 0) {
        uniqueId = 'row' + (rowInd - 1) + 'char' + colInd;
        if (data[rowInd - 1][colInd] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd - 1, col: colInd, value: 4, parentId: parentId };
            checkAround(data, rowInd - 1, colInd, currentValue, zeroPosition, parentId );
        }
    }

    if (colInd !== maxCol) {
        uniqueId = 'row' + rowInd + 'char' + (colInd + 1);
        if (data[rowInd][colInd + 1] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd, col: colInd + 1, value: 4, parentId: parentId };
            checkAround(data, rowInd, colInd + 1, currentValue, zeroPosition, parentId );
        }
    }
    if (colInd !== 0) {
        uniqueId = 'row' + rowInd + 'char' + (colInd - 1);
        if (data[rowInd][colInd - 1] === currentValue && !visited.includes(uniqueId)) {
            visited.push(uniqueId);
            AreasFound[zeroPosition][uniqueId] = { row: rowInd, col: colInd - 1, value: 4, parentId: parentId };
            checkAround(data, rowInd, colInd - 1, currentValue, zeroPosition, parentId );
        }
    }

    return;
}

solve(example);