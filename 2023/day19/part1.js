import { inputWorkFlow, exampleWorkFlow, inputParts, exampleParts } from "./input.js";

const dataWF = inputWorkFlow;
const dataParts = inputParts;
let refinedWF = {};
let refinedParts = [];
const startingWF = 'in';
let acceptedParts = [];

function solve() {
    console.time();
    refineWF();
    refineParts();
    refinedParts.forEach((part) => {
        let dest = startingWF;
        while (dest !== 'R' && dest !== 'A') {
            dest = getDestination(refinedWF[dest], part)
        }
        if (dest === 'A') {
            acceptedParts.push(part);
        }
    })
    let count = 0;
    acceptedParts.forEach((acceptedPart) => {
        count += acceptedPart.x;
        count += acceptedPart.m;
        count += acceptedPart.a;
        count += acceptedPart.s;
    });
    console.timeEnd();
    console.log(count);
    //397134
}

function getDestination(currentWF, part) {
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