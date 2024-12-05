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
            let middle = Math.round(elementsSplitted.length / 2) - 1;
            updates.push({ elements: elementsSplitted, valid: true, middle: parseInt(elementsSplitted[middle]) });
        }
    });
    checkUpdates(updates, rules);
    let newValids = [];

    updates.filter((u) => !u.valid).forEach((u) => {
        let validCombination = false;
        let arrayToCheck = u;
        while (!validCombination) {
            let invalidElement = arrayToCheck.elements[arrayToCheck.invalidIndex]
            let newArr = [invalidElement];
            let rulesInvalid = rules[invalidElement];
            arrayToCheck.elements.forEach((el, elInd) => {
                if (elInd !== arrayToCheck.invalidIndex) {
                    if (rulesInvalid.before.includes(el)) {
                        newArr.unshift(el);
                    } else {
                        newArr.push(el)
                    }
                }
            })
            let middle = Math.round(newArr.length / 2) - 1;
            let newObj = { elements: newArr, valid: true, middle: parseInt(newArr[middle]) };
            let checkUpdateResult = checkUpdates([newObj], rules)[0];

            validCombination = checkUpdateResult.valid;
            if (validCombination) {
                newValids.push(newObj)
            }
            arrayToCheck = checkUpdateResult;
        }
    })

    let totalSumN = 0;
    newValids.forEach((u) => totalSumN += u.middle);
    console.log(totalSumN);
    
}

solve(input);

function checkUpdates(updates, rules) {
    updates.forEach((row, indexRow) => {
        row.elements.forEach((char, indexChar) => {
            if (row.valid) {
                if (indexChar === 0) { // first char
                    let afterArr = row.elements.filter((c, ind) => ind !== 0);
                    let allAfterValid = afterArr.every((e) => rules[char].after.includes(e));
                    updates[indexRow].valid = allAfterValid;
                    if (!allAfterValid) {
                        updates[indexRow].invalidIndex = indexChar;
                    }
                } else if (indexChar !== row.elements.length) { // in the middle char
                    let beforeArr = row.elements.filter((c, ind) => ind < indexChar);
                    let afterArr = row.elements.filter((c, ind) => ind > indexChar);
                    let allBeforeValid = beforeArr.every((e) => rules[char].before.includes(e));
                    let allAfterValid = afterArr.every((e) => rules[char].after.includes(e));
                    updates[indexRow].valid = allAfterValid && allBeforeValid;
                    if (!allAfterValid) {
                        updates[indexRow].invalidIndex = indexChar;
                    }
                } else { // Last char
                    let beforeArr = row.elements.filter((c, ind) => ind < indexChar);
                    let allBeforeValid = beforeArr.every((e) => rules[char].before.includes(e));
                    updates[indexRow].valid = allBeforeValid;
                    if (!allAfterValid) {
                        updates[indexRow].invalidIndex = indexChar;
                    }
                }
            }
        })
    })
    return updates;
}