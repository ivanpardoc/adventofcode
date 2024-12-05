import { input, example } from './input.js';
function solve(input) {
    const rules = {};
    const updates = [];

    input.split('\n').forEach(element => {
        if (element.includes('|')) {
            let ruleSplit = element.split('|');

            if (!rules[ruleSplit[0]]) {
                rules[ruleSplit[0]] = { after: [], before: [] }
            }
            rules[ruleSplit[0]].after.push(ruleSplit[1]);

            if (!rules[ruleSplit[1]]) {
                rules[ruleSplit[1]] = { after: [], before: [] }
            }
            rules[ruleSplit[1]].before.push(ruleSplit[0]);
        } else {
            let elementsSplitted = element.split(',');
            let middle = Math.round(elementsSplitted.length/2)-1;
            updates.push({ elements: elementsSplitted, valid: true, middle: parseInt(elementsSplitted[middle]) });
        }
    });
    updates.forEach((row, indexRow) => {
        row.elements.forEach((char, indexChar) => {
            if (row.valid) {
                if (indexChar === 0) { // first char
                    let afterArr = row.elements.filter((c, ind) => ind !== 0);
                    let allAfterValid = afterArr.every((e) => rules[char].after.includes(e));
                    updates[indexRow].valid = allAfterValid;
                } else if (indexChar !== row.elements.length) { // in the middle char
                    let beforeArr = row.elements.filter((c, ind) => ind < indexChar);
                    let afterArr = row.elements.filter((c, ind) => ind > indexChar);
                    let allBeforeValid = beforeArr.every((e) => rules[char].before.includes(e));
                    let allAfterValid = afterArr.every((e) => rules[char].after.includes(e));
                    updates[indexRow].valid = allAfterValid && allBeforeValid;
                } else { // Last char
                    let beforeArr = row.elements.filter((c, ind) => ind < indexChar);
                    let allBeforeValid = beforeArr.every((e) => rules[char].before.includes(e));
                    updates[indexRow].valid = allBeforeValid;
                }
            }
        })
    })
    let totalSum = 0;
    updates.filter((u) => u.valid).forEach((u) => totalSum += u.middle);
    console.log('Total:', totalSum);
    
}

// solve(example);
// 4609
solve(input);
