import permutator from '../utils.js';
import { input, example } from './input.js';
function solve(input) {
    const rules = {};
    const updates = [];
    const alternativeUpdates = [];
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

    updates.filter((u) => !u.valid).forEach((u) => {
        let validCombination = false;
        let arrayToCheck = u;
        while (!validCombination) {
            let invalidElement = arrayToCheck.elements[arrayToCheck.invalidIndex]
            let newArr = [invalidElement];
            let rulesInvalid = rules[invalidElement];
            arrayToCheck.elements.forEach((el, elInd) => {
                if (elInd !== u.invalidIndex) {
                    if (rulesInvalid.before.includes(el)) {
                        console.log('el', el);
                        
                        newArr.unshift(el);
                    } else {
                        newArr.push(el)
                    }
                }
            })
            let middle = Math.round(newArr.length / 2) - 1;
            
            let checkUpdateResult = checkUpdates([{ elements: newArr, valid: true, middle: parseInt(newArr[middle]) }], rules)[0];
            validCombination = checkUpdateResult.valid;
            console.log(checkUpdateResult, checkUpdateResult.valid);
            
            arrayToCheck = checkUpdateResult;
        }
        // newUpdates.push({ elements: newArr, valid: true, middle: parseInt(newArr[middle]) });
    })

}
// solve(example);
// 4609
solve(example);

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

// '13': { after: [], before: [ '97', '61', '29', '47', '75', '53' ] },
// '29': { after: [ '13' ], before: [ '75', '97', '53', '61', '47' ] },
// '47': { after: [ '53', '13', '61', '29' ], before: [ '97', '75' ] },
// '53': { after: [ '29', '13' ], before: [ '47', '75', '61', '97' ] },
// '61': { after: [ '13', '53', '29' ], before: [ '97', '47', '75' ] },
// '75': { after: [ '29', '53', '47', '61', '13' ], before: [ '97' ] },
// '97': { after: [ '13', '61', '47', '29', '53', '75' ], before: [] }