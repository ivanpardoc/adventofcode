import { input, example } from "./input.js";
const data = example;
let dataRefined = [];
let gridDebug = [];
let startingPoint = { y: 0, x: 0, moves: [], value: '', direction: 'right' };
function solve() {
    data.forEach((row) => {
        dataRefined.push(row.split(''));
        console.log('lor', dataRefined);
    })
    gridDebug = dataRefined;
    startingPoint.value = dataRefined[startingPoint.y][startingPoint.y];
    console.log(startingPoint);
    let lastMovesArr = [];
    // while (lastMovesArr.length < 2) {
    while (startingPoint.y <= dataRefined.length - 1 && startingPoint.x <= dataRefined[0].length - 1) {
        let y = startingPoint.y;
        let x = startingPoint.x;
        let possibleMoves = [];
        let bottomValue = '';
        let topValue = '';
        let leftValue = '';
        let rightValue = '';
        if (startingPoint.direction === 'right') {
            bottomValue = getBottom(y, x);
            if (bottomValue.value != 9999999) {
                possibleMoves.push(bottomValue);
            }
            topValue = getTop(y, x);
            if (topValue.value != 9999999) {
                possibleMoves.push(topValue);
            }
            rightValue = getRight(y, x);
            if (rightValue.value != 9999999) {
                possibleMoves.push(rightValue);
            }
        }

        if (startingPoint.direction === 'left') {
            bottomValue = getBottom(y, x);
            if (bottomValue.value != 9999999) {
                possibleMoves.push(bottomValue);
            }
            topValue = getTop(y, x);
            if (topValue.value != 9999999) {
                possibleMoves.push(topValue);
            }
            leftValue = getLeft(y, x);
            if (leftValue.value != 9999999) {
                possibleMoves.push(leftValue);
            }
        }

        if (startingPoint.direction === 'bottom') {
            leftValue = getLeft(y, x);
            if (leftValue.value != 9999999) {
                possibleMoves.push(leftValue);
            }
            bottomValue = getBottom(y, x);
            if (bottomValue.value != 9999999) {
                possibleMoves.push(bottomValue);
            }
            rightValue = getRight(y, x);
            if (rightValue.value != 9999999) {
                possibleMoves.push(rightValue);
            }
        }

        if (startingPoint.direction === 'top') {
            topValue = getTop(y, x);
            if (topValue.value != 9999999) {
                possibleMoves.push(topValue);
            }
            leftValue = getLeft(y, x);
            if (leftValue.value != 9999999) {
                possibleMoves.push(leftValue);
            }
            rightValue = getRight(y, x);
            if (rightValue.value != 9999999) {
                possibleMoves.push(rightValue);
            }
        }

        possibleMoves.forEach((posMove, indPoss) => {
            let filtered = lastMovesArr.filter((larr) => larr.x === posMove.x && larr.y === posMove.y);
            console.log('filtered', filtered);
            if (filtered.length !== 0) {
                possibleMoves = possibleMoves.splice(indPoss, 1);
            }
        })
        
        let minValue = possibleMoves.reduce((prev, curr) => prev.value < curr.value ? prev : curr);
        lastMovesArr.push(minValue);
        startingPoint = minValue;
        console.log('CURRENT POINT', startingPoint);
    }
};

function getRight(y, x) {
    if (x + 1 !== dataRefined[y].length - 1) {
        return { y: y, x: x + 1, value: parseInt(dataRefined[y][x + 1]), direction: 'right' };
    }
    return {y, x, value: 9999999, direction: 'top'}
}

function getLeft(y, x) {
    if (x !== 0) {
        return { y: y, x: x - 1, value: parseInt(dataRefined[y][x - 1]), direction: 'left' };
    }
    return {y, x, value: 9999999, direction: 'top'}
}

function getTop(y, x) {
    if (y !== 0) {
        return { y: y - 1, x, value: parseInt(dataRefined[y - 1][x]), direction: 'top' };
    }

    return {y, x, value: 9999999, direction: 'top'}
}

function getBottom(y, x) {
    if (y + 1 !== dataRefined.length - 1) {
        return { y: y + 1, x, value: parseInt(dataRefined[y + 1][x]), direction: 'bottom' };
    }
    return {y, x, value: 9999999, direction: 'top'}
}

solve();