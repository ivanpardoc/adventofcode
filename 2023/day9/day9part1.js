import { input, inputExample } from './input.js';
const data = input;
let dataRefined = [];
const newData = [];
const finalData = [];
let finalSum = 0;

function solveDay9() {
    prepareData();
    dataRefined.forEach((row) => {
        getDifferenceRows(row);
    });

    finalData.forEach((arr) => {
        const firstVal = arr[0][0];
        finalSum += firstVal[firstVal.length - 1];
    }) 
    console.log('finalSum', finalSum);
}


function prepareData() {
    for (const row of data) {
        dataRefined.push(row.split(' '));
    }
}

function getDifferenceRows(row) {
    const newArray = [[row]];
    let newRow = [];
    let filterZero = ['0'];
    newArray.forEach((rowA) => {
        while (filterZero.length !== newRow.length) {
            rowA.forEach((element, elIndex) => {
                newRow = [];

                element.forEach((rowt, indexL) => {
                    if (indexL !== element.length - 1) {
                        const difference = parseInt(element[indexL + 1]) - parseInt(element[indexL]);
                        newRow.push(difference);
                    }
                })
            });
            filterZero = newRow.filter((c) => c === 0);
            newArray[0].push(newRow);
        }
    });


    for (let index = newArray[0].length - 1; index > 0; index--) {
        const element = newArray[0][index];
        if (index === newArray[0].length -1) {
            element.push(0);
        } else {
            const previousElement = newArray[0][index + 1];
            const lastValueCurrent = element[element.length - 1];
            const lastValueprevious = previousElement[previousElement.length - 1];


            element.push(parseInt(lastValueCurrent) + parseInt(lastValueprevious));
        }
        
    }
    const firstRow = newArray[0][0];
    const secondRow = newArray[0][1];
    firstRow.push(secondRow[secondRow.length-1] + parseInt(firstRow[firstRow.length-1]));

    finalData.push(newArray);
    console.log(newArray);
}

solveDay9();

// 1849777949 -- too high
// 1842168671 -- OK