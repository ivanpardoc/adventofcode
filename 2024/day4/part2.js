import { input } from './input.js';
let totalFound = 0;

function solve(input) {
    let formattedInput = [];
    input.split('\n').forEach(row => formattedInput.push(row.split('')));
    
    formattedInput.forEach((row, indRow) => {
        row.forEach((char, indChar) => {
            if (char === 'A') {
                checkForX(formattedInput, indRow, indChar)
            }
        });
    })

    console.log(totalFound);
}

function checkForX(input, indRow, indChar) {
    if (input[indRow-1] && input[indRow-1][indChar-1] && input[indRow-1][indChar-1] === 'M' && // top left        M . S
        input[indRow+1] && input[indRow+1][indChar-1] && input[indRow+1][indChar-1] === 'M' && // bottom left     . A .
        input[indRow+1] && input[indRow+1][indChar+1] && input[indRow+1][indChar+1] === 'S' && // bottom right    M . S
        input[indRow-1] && input[indRow-1][indChar+1] && input[indRow-1][indChar+1] === 'S') { // top right
        totalFound++;
        console.log('Found in', indRow, indChar);
    }
    if (input[indRow-1] && input[indRow-1][indChar-1] && input[indRow-1][indChar-1] === 'S' && // top left        S . M
        input[indRow+1] && input[indRow+1][indChar-1] && input[indRow+1][indChar-1] === 'S' && // bottom left     . A .
        input[indRow+1] && input[indRow+1][indChar+1] && input[indRow+1][indChar+1] === 'M' && // bottom right    S . M
        input[indRow-1] && input[indRow-1][indChar+1] && input[indRow-1][indChar+1] === 'M') { // top right
        totalFound++;
        console.log('Found in', indRow, indChar);
    }
    if (input[indRow-1] && input[indRow-1][indChar-1] && input[indRow-1][indChar-1] === 'M' && // top left        M . M
        input[indRow+1] && input[indRow+1][indChar-1] && input[indRow+1][indChar-1] === 'S' && // bottom left     . A .
        input[indRow+1] && input[indRow+1][indChar+1] && input[indRow+1][indChar+1] === 'S' && // bottom right    S . S
        input[indRow-1] && input[indRow-1][indChar+1] && input[indRow-1][indChar+1] === 'M') { // top right
        totalFound++;
        console.log('Found in', indRow, indChar);
    }
    if (input[indRow-1] && input[indRow-1][indChar-1] && input[indRow-1][indChar-1] === 'S' && // top left        S . S
        input[indRow+1] && input[indRow+1][indChar-1] && input[indRow+1][indChar-1] === 'M' && // bottom left     . A .
        input[indRow+1] && input[indRow+1][indChar+1] && input[indRow+1][indChar+1] === 'M' && // bottom right    M . m
        input[indRow-1] && input[indRow-1][indChar+1] && input[indRow-1][indChar+1] === 'S') { // top right
        totalFound++;
        console.log('Found in', indRow, indChar);
    }
}
solve(input);
