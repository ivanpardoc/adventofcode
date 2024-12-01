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
        finalSum += firstVal[0];
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
            element.unshift(0);
        } else {
            const previousElement = newArray[0][index + 1];
            const lastValueCurrent = element[0];
            const lastValueprevious = previousElement[0];


            element.unshift(parseInt(lastValueCurrent) - parseInt(lastValueprevious));
        }
        
    }
    const firstRow = newArray[0][0];
    const secondRow = newArray[0][1];
    firstRow.unshift(parseInt(firstRow[0]) - secondRow[0]);

    finalData.push(newArray);
    console.log(newArray);
}

solveDay9();