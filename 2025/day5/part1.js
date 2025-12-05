import { ranges, ingredients, exampleIngredients, exampleRanges } from './input.js';

function solve(ranges, ingredients) {
    console.time();
    let result = 0;
    const rangesArr = ranges.trim().split('\n');
    const rangesArrObj = rangesArr.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return { min, max};
    });

    const ingredientsArr = ingredients.trim().split('\n').map(Number);

    ingredientsArr.forEach((ingredient) => {
        let valid = checkRanges(ingredient, rangesArrObj);
        if (valid) {
            result++;
        }
    });

    console.log('result', result);
    console.timeEnd();
}


function checkRanges(ingredient, rangesArrObj) {
    let valid = false;
    rangesArrObj.forEach((range) => {
        if (!valid) {
            valid = ingredient >= range.min && ingredient <= range.max;
        }
    });

    return valid;
}
// solve(exampleRanges, exampleIngredients);
solve(ranges, ingredients);