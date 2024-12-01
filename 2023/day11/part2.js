import { input, example } from './input.js';

let universeWithExtraRows = []
let refinedData = [];
let extraValueCol = [];
let galaxies = [];
let pairsOfGalaxies = [];
const gap = 1000000;

function resolve() {
    const universe = input;
    addExtraRows(universe)
    refinedData = addExtraCols(universeWithExtraRows);
    getGalaxies();
    getPairs();
    const steps = getSteps();
    console.log('total steps', steps);

    // 82000210 -- low it was the fucking example
    // 622120986954 
}

function getSteps() {
    let sumTotal = 0;
    pairsOfGalaxies.forEach((pair) => {
        let sum = 0;
        if (pair.to.row > pair.from.row) {
            for (let index = pair.from.row; index < pair.to.row; index++) {
                const element = refinedData[index][pair.to.col];
                sum += element.stepVal;
            }
        }
        if (pair.to.col > pair.from.col) {
            for (let index = pair.from.col; index < pair.to.col; index++) {
                const element = refinedData[pair.to.row][index];
                sum += element.stepVal;
            }
        } else {
            for (let index = pair.to.col; index < pair.from.col; index++) {
                const element = refinedData[pair.to.row][index];
                sum += element.stepVal;
            }
        }
        sumTotal +=sum;
    });
    return sumTotal;
}


function getPairs() {
    galaxies.forEach((galaxy) => {
        for (let index = 0; index < galaxies.length; index++) {
            const element = galaxies[index];
            if (element.number !== galaxy.number) {
                if (!pairsOfGalaxies.find((p) => p.from === element && p.to === galaxy)) {
                    pairsOfGalaxies.push({from: galaxy, to: element});
                }
            }
        }
    })
}

function getGalaxies() {
    refinedData.forEach((row, indexRow) => {
        row.forEach((col, indexCol) => {
            if (col.val === '#') {
                refinedData[indexRow][indexCol].val = galaxies.length;
                galaxies.push({row: indexRow, col: indexCol, number: galaxies.length})
            }
        })
    })
}

function addExtraRows(universe) {
    universe.forEach(element => {
        let newRow = []
        if (element.includes('#')) {
            element.split('').forEach(char => {
                newRow.push({val: char, stepVal: 1})
            });
        } else {
            element.split('').forEach(char => {
                newRow.push({val: char, stepVal: gap})
            });
        }
        universeWithExtraRows.push(newRow);

    });
}

function addExtraCols(universe) {
    for (let index = 0; index < universe[0].length; index++) {
        let universeFlag = false;
        for (let indexRow = 0; indexRow < universe.length; indexRow++) {
            const element = universe[indexRow][index];
            if (element.val === '#') {
                universeFlag = true;
            }
        }
        if (!universeFlag) {
            extraValueCol.push(index)
        }
    }

    let newUniverse = []
    universe.forEach((row) => {
        let newRow = [];
        row.forEach((char, charInd) => {
            if (extraValueCol.includes(charInd)) {
                char.stepVal = char.stepVal === 1 ? gap : gap*2;
            }
            newRow.push(char);
        })
        newUniverse.push(newRow);
    });

    return newUniverse;
}

resolve()