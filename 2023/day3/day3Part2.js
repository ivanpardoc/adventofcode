import { input, example, exampleCustom } from './input.js';
const numbersWithAsterisk = [];
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
    const positionsAlreadyChecked = [];
    numbersWithAsterisk.forEach((number) => {
        if (!positionsAlreadyChecked.includes(number.asteriskPosition)) {
            const numbersWithThisAsterisk = numbersWithAsterisk.filter((n) => n.asteriskPosition === number.asteriskPosition);
            positionsAlreadyChecked.push(number.asteriskPosition);
            if (numbersWithThisAsterisk.length === 2) {
                validNumbers.push(numbersWithThisAsterisk[0].number * numbersWithThisAsterisk[1].number);
            }
        }
    });

    const sum = validNumbers.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);
    console.log(sum);
}


function checkAsterisk(data) {
    return data === '*';
}

function check(numbersFound, indexRow, dataInput) {
    let validNumberFlag = false;
    let stringNumberFound = '';
    const notFirstRow = indexRow !== 0;
    const notLastRow = indexRow + 1 !== dataInput.length;
    let asteriskPosition = '';
    numbersFound.forEach((numFound) => {
        // -1 row, -1 char, same index char, + 1
        if (!validNumberFlag && numFound.indexChar !== 0 && notFirstRow && checkAsterisk(dataInput[numFound.indexRow - 1][numFound.indexChar - 1]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow - 1).toString() + (numFound.indexChar - 1).toString();
        }
        if (!validNumberFlag && notFirstRow && checkAsterisk(dataInput[numFound.indexRow - 1][numFound.indexChar]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow - 1).toString() + (numFound.indexChar).toString();
        }
        if (!validNumberFlag && numFound.indexChar + 1 !== dataInput[numFound.indexRow].length && notFirstRow && checkAsterisk(dataInput[numFound.indexRow - 1][numFound.indexChar + 1]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow - 1).toString() + (numFound.indexChar + 1).toString();
        }
        
        // 0 row, -1 char, + 1
        if (!validNumberFlag && numFound.indexChar !== 0  && checkAsterisk(dataInput[numFound.indexRow][numFound.indexChar - 1]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow).toString() + (numFound.indexChar - 1).toString();
        }
        if (!validNumberFlag && numFound.indexChar + 1 !== dataInput[numFound.indexRow].length && checkAsterisk(dataInput[numFound.indexRow][numFound.indexChar + 1]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow).toString() + (numFound.indexChar + 1).toString();
        }
        // +1 row, -1 char, same index char, + 1
        if (!validNumberFlag && numFound.indexChar !== 0  && notLastRow && checkAsterisk(dataInput[numFound.indexRow + 1][numFound.indexChar - 1]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow + 1).toString() + (numFound.indexChar - 1).toString();
        }
        if (!validNumberFlag && notLastRow && checkAsterisk(dataInput[numFound.indexRow + 1][numFound.indexChar]) ) {
            validNumberFlag = true;
            asteriskPosition = (numFound.indexRow + 1).toString() + (numFound.indexChar).toString();
        }
        if (!validNumberFlag && notLastRow && numFound.indexChar + 1 !== dataInput[numFound.indexRow + 1].length && checkAsterisk(dataInput[numFound.indexRow + 1][numFound.indexChar + 1]) ) {
            asteriskPosition = (numFound.indexRow + 1).toString() + (numFound.indexChar + 1).toString();
            validNumberFlag = true;
        }

        stringNumberFound = stringNumberFound + numFound.number.toString();
    });
    if (validNumberFlag) {
        numbersWithAsterisk.push({number: stringNumberFound, asteriskPosition});
    }
}
// solveDay3(input);
solveDay3();

//12162384 -- NOT CORRECT
// 78236071 -- CORRECT