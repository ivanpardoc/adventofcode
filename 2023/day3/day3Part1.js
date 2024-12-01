import { input, example, exampleCustom } from './input.js';
const validNumbers = [];

function solveDay3() {
    const dataInput = input;
    dataInput.forEach((row, indexRow) => {
        let numbersFound = [];
        row.split('').forEach((char, indexChar) => {
            if (!isNaN(char)) {
                numbersFound.push({number: char, indexChar, indexRow});
                if (indexChar + 1 === row.length && numbersFound[0]) {
                    check(numbersFound, indexRow, dataInput)
                    numbersFound = [];
                }
            } else {
                if (numbersFound[0]) {
                    check(numbersFound, indexRow, dataInput)
                }
                numbersFound = [];
            }
        });
    });
    const sum = validNumbers.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);
    console.log(sum);
}

function checkNumberOrDot(data) {
    if (!isNaN(data) || data === '.') {
        return false;
    }
    
    return true;
}

function check(numbersFound, indexRow, dataInput) {
    let validNumberFlag = false;
    let stringNumberFound = '';
    const notFirstRow = indexRow !== 0;
    const notLastRow = indexRow + 1 !== dataInput.length;
    numbersFound.forEach((numFound) => {
        // -1 row, -1 char, same index char, + 1
        if (!validNumberFlag && numFound.indexChar !== 0 && notFirstRow && checkNumberOrDot(dataInput[numFound.indexRow - 1][numFound.indexChar - 1]) ) {
            validNumberFlag = true;
        }
        if (!validNumberFlag && notFirstRow && checkNumberOrDot(dataInput[numFound.indexRow - 1][numFound.indexChar]) ) {
            validNumberFlag = true;
        }
        if (!validNumberFlag && numFound.indexChar + 1 !== dataInput[numFound.indexRow].length && notFirstRow && checkNumberOrDot(dataInput[numFound.indexRow - 1][numFound.indexChar + 1]) ) {
            validNumberFlag = true;
        }
        
        // 0 row, -1 char, + 1
        if (!validNumberFlag && numFound.indexChar !== 0  && checkNumberOrDot(dataInput[numFound.indexRow][numFound.indexChar - 1]) ) {
            validNumberFlag = true;
        }
        if (!validNumberFlag && numFound.indexChar + 1 !== dataInput[numFound.indexRow].length && checkNumberOrDot(dataInput[numFound.indexRow][numFound.indexChar + 1]) ) {
            validNumberFlag = true;
        }
        // +1 row, -1 char, same index char, + 1
        if (!validNumberFlag && numFound.indexChar !== 0  && notLastRow && checkNumberOrDot(dataInput[numFound.indexRow + 1][numFound.indexChar - 1]) ) {
            validNumberFlag = true;
        }
        if (!validNumberFlag && notLastRow && checkNumberOrDot(dataInput[numFound.indexRow + 1][numFound.indexChar]) ) {
            validNumberFlag = true;
        }
        if (!validNumberFlag && notLastRow && numFound.indexChar + 1 !== dataInput[numFound.indexRow + 1].length && checkNumberOrDot(dataInput[numFound.indexRow + 1][numFound.indexChar + 1]) ) {
            validNumberFlag = true;
        }

        stringNumberFound = stringNumberFound + numFound.number.toString();
    });
    if (validNumberFlag) {
        validNumbers.push(stringNumberFound);
    }
}
// solveDay3(input);
solveDay3();