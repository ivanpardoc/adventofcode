import { inputWorkFlow, exampleWorkFlow, inputParts, exampleParts } from "./input.js";

const dataWF = inputWorkFlow;
const dataParts = inputParts;
let refinedWF = {};
let refinedParts = [];
const startingWF = 'in';
let acceptedParts = [];
let acceptedComb = 0;
let test = []

let values = {
    x: {
        min: 1,
        max: 4000
    },
    m: {
        min: 1,
        max: 4000
    },
    a: {
        min: 1,
        max: 4000
    },
    s: {
        min: 1,
        max: 4000
    }
}
function solve() {
    console.time();
    refineWF();
    refineParts();
    const arrWF = Object.entries(refinedWF)
    const maxLength = 4000;
    for (let indexX = 1; indexX <= maxLength; indexX++) {
        if (indexX % 5 === 0) {
            console.log('indexX', indexX);
        }
        for (let indexM = 1; indexM <= maxLength; indexM++) {
        
            for (let indexA = 1; indexA <= maxLength; indexA++) {
            
                for (let indexS = 1; indexS <= maxLength; indexS++) {
                    let dest = startingWF;
                    let part = {x: indexX, m: indexM, a: indexA, s: indexS};
                    while (dest !== 'R' && dest !== 'A') {
                        dest = getDestination(refinedWF[dest], part);
                    }
                    if (dest === 'A') {
                        // acceptedParts.push(part);
                        acceptedComb++;
                    }
                }   
            }   
        }   
    }
    // refinedParts.forEach((part) => {
    //     let dest = startingWF;
    //     while (dest !== 'R' && dest !== 'A') {
    //         dest = getDestination(refinedWF[dest], part, dest);
    //     }
    //     if (dest === 'A') {
    //         acceptedParts.push(part);
    //     }
    // })
    console.log(acceptedComb);
    //397134
}

function getDestination(currentWF, part, dest) {
    let newDestination = '';
    currentWF.conditions.forEach((condition) => {
        if (newDestination === '') {
            if (condition.condition === '>') {
                if (part[condition.category] > condition.number) {
                    newDestination = condition.destination
                }
            }
            if (condition.condition === '<') {
                if (part[condition.category] < condition.number) {
                    newDestination = condition.destination
                }
            }
        }
    })
    return newDestination === '' ? currentWF.finalDestination : newDestination
}

function refineParts() {
    dataParts.forEach((row) => {
        let rowArr = {};
        row = row.split('{')[1];
        row = row.split('}')[0];
        const commaSplit = row.split(',');
        commaSplit.forEach((partValue) => {
            const equalSplit = partValue.split('=');
            rowArr[equalSplit[0]] = parseInt(equalSplit[1]);
        })
        refinedParts.push(rowArr)
    })


}

function refineWF() {
    dataWF.forEach((wf) => {
        const bracketSplit = wf.split('{');
        refinedWF[bracketSplit[0]] = {
            conditions: [],
            finalDestination: ''
        };
        const commaSplit = bracketSplit[1].split(',')
        commaSplit.forEach((conditions, indexC) => {
            if (indexC === commaSplit.length - 1) {
                refinedWF[bracketSplit[0]].finalDestination = conditions.split('}')[0]
            } else {
                let colonSplit = conditions.split(':');
                let conditionSplitted = {
                    category: '',
                    number: '',
                    condition: '',
                    destination: colonSplit[1]
                };
                if (colonSplit[0].includes('>')){
                    conditionSplitted.category = colonSplit[0].split('>')[0];
                    conditionSplitted.number = parseInt(colonSplit[0].split('>')[1]);
                    conditionSplitted.condition = '>'
                } else {
                    conditionSplitted.category = colonSplit[0].split('<')[0];
                    conditionSplitted.number = parseInt(colonSplit[0].split('<')[1]);
                    conditionSplitted.condition = '<'
                }
                refinedWF[bracketSplit[0]].conditions.push({
                    category: conditionSplitted.category,
                    number: conditionSplitted.number,
                    condition: conditionSplitted.condition,
                    destination: colonSplit[1]
                })
            }
        })
    })
}

solve();