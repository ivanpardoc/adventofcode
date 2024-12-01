import { input, inputExample, examplePart4, examplePart28, examplePart210 } from './input.js';
const data = input;
let dataRefined = [];
let startRow;
let startColumn;
let currentStep;
let numberOfSteps = 0;
let loopSteps = [];
let notTheLoopTiles = []
let insideLoopCount = 0;

function resolvePart2() {
    data.forEach((row, indexRow) => {
        dataRefined.push(row.split(''));
        row.split('').forEach((char, indexChar) => {
            if (char === 'S') {
                startRow = indexRow;
                startColumn = indexChar;
            }
        })
    })
    const connectionsStart = connections({ row: startRow, column: startColumn });
    currentStep = connectionsStart[0];
    loopSteps.push({ row: currentStep.row, column: currentStep.column, direction: currentStep.direction, combinedAxis: (currentStep.row * 1000).toString() + (currentStep.column * 1000).toString() })

    while (currentStep.row !== startRow || currentStep.column !== startColumn) {
        loopSteps.push(currentStep);
        currentStep = move(currentStep);
    }

    loopSteps.push({ row: startRow, column: startColumn, combinedAxis: (startRow * 1000).toString() + (startColumn * 1000).toString() })


    dataRefined.forEach((d, indexRow) => {
        d.forEach(((t, indexChar) => {
            let combinedAxis = (indexRow * 1000).toString() + (indexChar * 1000).toString();

            const fromLoop = loopSteps.find((el) => el.combinedAxis === combinedAxis);
            if (!fromLoop) {
                notTheLoopTiles.push({ char: t, row: indexRow, column: indexChar, combinedAxis })
            }
        }))
    })


    notTheLoopTiles.forEach(tile => {
        let pipeCount = 0;
        dataRefined[tile.row].forEach((char, indexColumn) => {
            if (indexColumn > tile.column) {
                return;
            }
            const axys = ((tile.row * 1000).toString() + (indexColumn * 1000).toString());
            const found = loopSteps.find((el) => el.combinedAxis === axys);
            if (found) {
                const foundData = dataRefined[found.row][found.column];
                if (foundData === '|' || foundData === '7' || foundData === 'F' || foundData === 'S') {
                    pipeCount++;
                }

            }
        });

        if (pipeCount%2 === 1) {
            insideLoopCount++;
        }
    });

    console.log('TOTAL', insideLoopCount);

    // 7220 too high
    // 2963 -- too high
    // 1163 not ok
    // 541 --- OK
}

function connections(point) {
    const { row, column } = point;
    let nextPointRow = 0;
    let nextPointColumn = 0;
    let direction;
    const validNeighbors = [];
    const eastPosition = column === dataRefined[0].length - 1 ? '' : dataRefined[row][column + 1];
    const westPosition = column === 0 ? '' : dataRefined[row][column - 1];
    const southPosition = row === dataRefined.length - 1 ? '' : dataRefined[row + 1][column];
    const northPosition = row === 0 ? '' : dataRefined[row - 1][column];

    if (eastPosition === '-' || eastPosition === 'J' || eastPosition === '7') {
        nextPointRow = row;
        nextPointColumn = column + 1;
        direction = eastPosition === '-' ? 'east' : eastPosition === 'J' ? 'north' : 'south';
        // J is a 90-degree bend connecting north and west.
        // 7 is a 90-degree bend connecting south and west.
        validNeighbors.push({ row: row, column: column + 1, direction, char: eastPosition })
    }

    if (westPosition === '-' || westPosition === 'L' || westPosition === 'F') {
        // L is a 90-degree bend connecting north and east.
        // F is a 90-degree bend connecting south and east.
        nextPointRow = row;
        nextPointColumn = column - 1;
        direction = westPosition === '-' ? 'west' : westPosition === 'L' ? 'north' : 'south';
        validNeighbors.push({ row: row, column: column - 1, direction, char: westPosition })
    }

    if (southPosition === '|' || southPosition === 'J' || southPosition === 'L') {
        // J is a 90-degree bend connecting north and west.
        // L is a 90-degree bend connecting north and east.
        nextPointRow = row + 1;
        nextPointColumn = column;
        direction = southPosition === '|' ? 'south' : southPosition === 'J' ? 'west' : 'east';
        validNeighbors.push({ row: row + 1, column: column, direction, char: southPosition })
    }
    if (northPosition === '|' || northPosition === '7' || northPosition === 'F') {
        // 7 is a 90-degree bend connecting south and west.
        // F is a 90-degree bend connecting south and east.
        nextPointRow = row - 1;
        nextPointColumn = column;
        direction = northPosition === '|' ? 'north' : northPosition === '7' ? 'west' : 'east';
        validNeighbors.push({ row: row - 1, column: column, direction, char: northPosition })
    }
    numberOfSteps++;
    return validNeighbors;
}

function move(point) {
    const { row, column, direction } = point;
    let nextMove = '';
    let nextChar = '';
    let newRow = '';
    let newCol = '';
    let newDirection = '';
    if (direction === 'south') {
        nextMove = dataRefined[row + 1][column];
        newRow = row + 1;
        newCol = column;
        // | is a vertical pipe connecting north and south.
        // L is a 90-degree bend connecting north and east.
        // J is a 90-degree bend connecting north and west.
        newDirection = nextMove === '|' ? 'south' : nextMove === 'L' ? 'east' : 'west';
        nextChar = { row: newRow, column: column, direction: newDirection, nextMove, combinedAxis: (newRow * 1000).toString() + (newCol * 1000).toString() }
    }

    if (direction === 'north') {
        // | is a vertical pipe connecting north and south.
        // 7 is a 90-degree bend connecting south and west.
        // F is a 90-degree bend connecting south and east.
        nextMove = dataRefined[row - 1][column];
        newRow = row - 1;
        newCol = column;
        newDirection = nextMove === '|' ? 'north' : nextMove === 'F' ? 'east' : 'west';
        nextChar = { row: newRow, column: column, direction: newDirection, nextMove, combinedAxis: (newRow * 1000).toString() + (newCol * 1000).toString() }
    }

    if (direction === 'east') {
        // - is a horizontal pipe connecting east and west.
        // J is a 90-degree bend connecting north and west.
        // 7 is a 90-degree bend connecting south and west.
        nextMove = dataRefined[row][column + 1];
        newRow = row;
        newCol = column + 1;
        newDirection = nextMove === '-' ? 'east' : nextMove === 'J' ? 'north' : 'south';
        nextChar = { row: row, column: newCol, direction: newDirection, nextMove, combinedAxis: (newRow * 1000).toString() + (newCol * 1000).toString() }
    }

    if (direction === 'west') {
        // - is a horizontal pipe connecting east and west.
        // L is a 90-degree bend connecting north and east.
        // F is a 90-degree bend connecting south and east.
        nextMove = dataRefined[row][column - 1];
        newRow = row;
        newCol = column - 1;
        newDirection = nextMove === '-' ? 'west' : nextMove === 'L' ? 'north' : 'south';
        nextChar = { row: row, column: newCol, direction: newDirection, nextMove, combinedAxis: (newRow * 1000).toString() + (newCol * 1000).toString() }
    }

    numberOfSteps++;
    return nextChar;
}

resolvePart2();