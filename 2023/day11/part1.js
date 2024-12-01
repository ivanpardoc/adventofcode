import { input, example } from './input.js';

let universeWithExtraRows = []
let refinedData = [];
let extraValueCol = [];
let galaxies = [];
let pairsOfGalaxies = [];

function resolve() {
    const universe = input;
    addExtraRows(universe)
    refinedData = addExtraCols(universeWithExtraRows);
    getGalaxies();
    getPairs();
    const steps = getSteps();
    console.log('total steps', steps);
    // 10231178
}

function getSteps() {
    let sum = 0;
    pairsOfGalaxies.forEach((pair) => {
        const rowDif = pair.to.row - pair.from.row;
        const colDif = Math.abs(pair.to.col - pair.from.col);
        sum += rowDif+colDif;
    });
    return sum;
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
            if (col === '#') {
                refinedData[indexRow][indexCol] = galaxies.length;
                galaxies.push({row: indexRow, col: indexCol, number: galaxies.length})
            }
        })
    })
}

function addExtraRows(universe) {
    universe.forEach(element => {
        console.log('element', element);
        if (element.includes('#')) {
            universeWithExtraRows.push(element);
        } else {
            universeWithExtraRows.push(element);
            universeWithExtraRows.push(element);
        }
    });
}

function addExtraCols(universe) {
    for (let index = 0; index < universe[0].split('').length; index++) {
        let universeFlag = false;
        for (let indexRow = 0; indexRow < universe.length; indexRow++) {
            const element = universe[indexRow][index];
            if (element === '#') {
                universeFlag = true;
            }
        }
        if (!universeFlag) {
            extraValueCol.push(index)
        }
    }

    let newUniverse = []
    universe.forEach((row) => {
        let newRow = '';
        row.split('').forEach((char, charInd) => {
            newRow += char;
            if (extraValueCol.includes(charInd)) {
                newRow += '.';
            }
        })
        newUniverse.push(newRow.split(''));
    });

    return newUniverse;
}

resolve()