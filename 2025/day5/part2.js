import { ranges, ingredients, exampleIngredients, exampleRanges } from './input.js';

function solve(ranges) {
    console.time();
    let result = 0;
    const rangesArr = ranges.trim().split('\n');
    const rangesArrObj = rangesArr.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return { min, max};
    });
    let rangesArrObjBackup = rangesArrObj;

    rangesArrObj.sort((a, b) => a.min - b.min);
    console.log(rangesArrObj.forEach((range) => console.log(range)));
    // rangesArrObj.forEach((range, index) => {
    //     let minFound = checkRanges(range.min);
    // })
    console.timeEnd();
}


function checkRanges(ingredient, rangesArrObj) {
    let valid = false;
    let indexFound = 0;
    rangesArrObj.forEach((range, index) => {
        if (!valid) {
            if (ingredient >= range.min && ingredient <= range.max) {
                valid = true;
                indexFound = index;
            }
        }
    });

    return { valid, indexFound};
}
// solve(exampleRanges);
solve(ranges);