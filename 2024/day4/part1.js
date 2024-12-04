import { input, example, example2 } from './input.js';
let regexHor = /XMAS/g;
let regexHorInv = /SAMX/g;
let totalFound = 0;
function solve(input) {
    let horMatches = [...input.matchAll(regexHor)];
    let horInvMatches = [...input.matchAll(regexHorInv)];
    totalFound += horMatches.length;
    totalFound += horInvMatches.length;
    let formattedInput = [];
    input.split('\n').forEach(row => formattedInput.push(row.split('')));

    formattedInput.forEach((row, indRow) => {
        row.forEach((char, indChar) => {
            if (char === 'X') {
                checkVertical(formattedInput, indRow, indChar)
                checkVerticalInv(formattedInput, indRow, indChar)
                checkDiag(formattedInput, indRow, indChar)
            }
        });
    })
    console.log(totalFound);
    
}

function checkVertical(input, indRow, indChar) {
    if (input[indRow-1] && input[indRow-1][indChar] === 'M' &&
        input[indRow-2] && input[indRow-2][indChar] === 'A' &&
        input[indRow-3] && input[indRow-3][indChar] === 'S') {
        totalFound++;
        console.log('Vertical found', indRow, indChar);
        
    }
}

function checkVerticalInv(input, indRow, indChar) {
    if (input[indRow+1] && input[indRow+1][indChar] === 'M' &&
        input[indRow+2] && input[indRow+2][indChar] === 'A' &&
        input[indRow+3] && input[indRow+3][indChar] === 'S') {
        totalFound++;
        console.log('Vertical inv found', indRow, indChar);
    }
}

function checkDiag(input, indRow, indChar) {
    if (input[indRow+1] && input[indRow+1][indChar+1] && input[indRow+1][indChar+1] === 'M' &&
        input[indRow+2] && input[indRow+2][indChar+2] && input[indRow+2][indChar+2] === 'A' &&
        input[indRow+3] && input[indRow+3][indChar+3] && input[indRow+3][indChar+3] === 'S') {
        totalFound++;
        console.log('Diag Right down', indRow, indChar);
    }
    if (input[indRow-1] && input[indRow-1][indChar-1] && input[indRow-1][indChar-1] === 'M' &&
        input[indRow-2] && input[indRow-2][indChar-2] && input[indRow-2][indChar-2] === 'A' &&
        input[indRow-3] && input[indRow-3][indChar-3] && input[indRow-3][indChar-3] === 'S') {
        totalFound++;
        console.log('Diag Left Top left', indRow, indChar);
    }
    if (input[indRow+1] && input[indRow+1][indChar-1] && input[indRow+1][indChar-1] === 'M' &&
        input[indRow+2] && input[indRow+2][indChar-2] && input[indRow+2][indChar-2] === 'A' &&
        input[indRow+3] && input[indRow+3][indChar-3] && input[indRow+3][indChar-3] === 'S') {
        totalFound++;
        console.log('Diag Left down', indRow, indChar);
    }
    if (input[indRow-1] && input[indRow-1][indChar+1] && input[indRow-1][indChar+1] === 'M' &&
        input[indRow-2] && input[indRow-2][indChar+2] && input[indRow-2][indChar+2] === 'A' &&
        input[indRow-3] && input[indRow-3][indChar+3] && input[indRow-3][indChar+3] === 'S') {
        totalFound++;
        console.log('Diag Left Top right', indRow, indChar);
    }
}

// solve(example);
solve(input);
