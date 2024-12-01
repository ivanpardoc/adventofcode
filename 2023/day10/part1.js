import { input, inputExample, inputExampleComplex } from './input.js';
const data = input;
let dataRefined = [];
let startRow;
let startColumn;
let currentStep;
let numberOfSteps = 0;
function resolvePart1() {
    data.forEach((row, indexRow) => {
        dataRefined.push(row.split(''));
        row.split('').forEach((char, indexChar) => {
            if (char === 'S') {
                startRow = indexRow;
                startColumn = indexChar;
                console.log('start', char, 'row:', indexRow, 'char', indexChar);
            }
        })
    })
    const connectionsStart = connections({row: startRow, column: startColumn});
    currentStep = connectionsStart[0];
    while (currentStep.row !== startRow || currentStep.column !== startColumn) {
        console.log('currentStep', currentStep);
        currentStep = move(currentStep);
    }
    console.log('numberOfSteps', numberOfSteps/2);
}

function connections(point) {
    const {row, column} = point;
    let nextPointRow = 0;
    let nextPointColumn = 0;
    let direction;
    const validNeighbors = [];
    const eastPosition = column === dataRefined[0].length - 1 ? '' : dataRefined[row][column + 1];
    const westPosition = column === 0 ? '' : dataRefined[row][column - 1];
    const southPosition = row === dataRefined.length -1 ? '' : dataRefined[row + 1][column];
    const northPosition = row === 0 ? '' : dataRefined[row - 1][column];

    if (eastPosition === '-' || eastPosition === 'J' || eastPosition === '7') {
        nextPointRow = row;
        nextPointColumn = column + 1;
        direction = eastPosition === '-' ? 'east' : eastPosition === 'J' ? 'north' : 'south'; 
        // J is a 90-degree bend connecting north and west.
        // 7 is a 90-degree bend connecting south and west.
        validNeighbors.push({row: row, column: column + 1, direction, char: eastPosition})
    }

    if (westPosition === '-' || westPosition === 'L' || westPosition === 'F') {
        // L is a 90-degree bend connecting north and east.
        // F is a 90-degree bend connecting south and east.
        nextPointRow = row;
        nextPointColumn = column - 1;  
        direction = westPosition === '-' ? 'west' : westPosition === 'L' ? 'north' : 'south'; 
        validNeighbors.push({row: row, column: column - 1, direction, char: westPosition})
    }

    if (southPosition === '|' || southPosition === 'J' || southPosition === 'L') {
        // J is a 90-degree bend connecting north and west.
        // L is a 90-degree bend connecting north and east.
        nextPointRow = row + 1;
        nextPointColumn = column;  
        direction = southPosition === '|' ? 'south' : southPosition === 'J' ? 'west' : 'east'; 
        validNeighbors.push({row: row + 1, column: column, direction, char: southPosition})
    }
    if (northPosition === '|' || northPosition === '7' || northPosition === 'F') {
        // 7 is a 90-degree bend connecting south and west.
        // F is a 90-degree bend connecting south and east.
        nextPointRow = row - 1;
        nextPointColumn = column;
        direction = northPosition === '|' ? 'north' : northPosition === '7' ? 'west' : 'east'; 
        validNeighbors.push({row: row - 1, column: column, direction, char: northPosition})
    }
    numberOfSteps++;
    return validNeighbors;
}

function move(point) {
    const {row, column, direction} = point;
    let nextMove = '';
    let nextChar = '';
    let newDirection = '';
    if (direction === 'south') {
        nextMove = dataRefined[row + 1][column];
        // | is a vertical pipe connecting north and south.
        // L is a 90-degree bend connecting north and east.
        // J is a 90-degree bend connecting north and west.
        newDirection = nextMove === '|' ? 'south' : nextMove === 'L' ? 'east' : 'west';
        nextChar = {row: row + 1, column: column, direction: newDirection, nextMove}
    }
    
    if (direction === 'north') {
        // | is a vertical pipe connecting north and south.
        // 7 is a 90-degree bend connecting south and west.
        // F is a 90-degree bend connecting south and east.
        nextMove = dataRefined[row - 1][column];
        newDirection = nextMove === '|' ? 'north' : nextMove === 'F' ? 'east' : 'west';
        nextChar = {row: row - 1, column: column, direction: newDirection, nextMove}
    }
    
    if (direction === 'east') {
        // - is a horizontal pipe connecting east and west.
        // J is a 90-degree bend connecting north and west.
        // 7 is a 90-degree bend connecting south and west.
        nextMove = dataRefined[row][column + 1];
        newDirection = nextMove === '-' ? 'east' : nextMove === 'J' ? 'north' : 'south';
        nextChar = {row: row, column: column + 1, direction: newDirection, nextMove}
    }
    
    if (direction === 'west') {
        // - is a horizontal pipe connecting east and west.
        // L is a 90-degree bend connecting north and east.
        // F is a 90-degree bend connecting south and east.
        nextMove = dataRefined[row][column - 1];
        newDirection = nextMove === '-' ? 'west' : nextMove === 'L' ? 'north' : 'south';
        nextChar = {row: row, column: column -1, direction: newDirection, nextMove}
    }

    numberOfSteps++;
    return nextChar;
}

resolvePart1();