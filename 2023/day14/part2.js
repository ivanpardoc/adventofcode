import { input, example } from "./input.js";
const data = input;
let refinedData = [];
let refinedDataOG = [];
const loops = 1000000000;

function solve() {
    console.time();
    data.forEach((row) => {
        refinedData.push(row.split(''));
        refinedDataOG.push(row.split(''));
    })
    tiltRocks()
}

function north(datat) {
    for (let indexCol = 0; indexCol < datat[0].length; indexCol++) {
        let rocks = [];
        for (let indexRow = datat.length-1; indexRow >= 0; indexRow--) {
            const row = datat[indexRow];
            const char = row[indexCol];
            
            if (char === 'O') {
                rocks.push({indexCol, indexRow});
                datat[indexRow][indexCol] = '.';
            }

            if (char === '#') {
                if (rocks.length !== 0) {
                    for (let index = indexRow + rocks.length; index > indexRow; index--) {
                        datat[index][indexCol] = 'O';
                    }
                }
                rocks = [];
            }
            if (indexRow === 0) {
                if (rocks.length !== 0) {
                    for (let index = rocks.length - 1; index >= 0; index--) {
                        datat[index][indexCol] = 'O';
                    }
                }
                rocks = [];
            }
        }
    }
}

function south(datat) {
    for (let indexCol = 0; indexCol < datat[0].length; indexCol++) {
        let rocks = [];
        for (let indexRow = 0; indexRow < datat.length; indexRow++) {
            const row = datat[indexRow];
            const char = row[indexCol];
            if (char === 'O') {
                rocks.push({indexCol, indexRow});
                datat[indexRow][indexCol] = '.';
            }

            if (char === '#') {
                if (rocks.length !== 0) {
                    for (let index = indexRow - rocks.length; index < indexRow; index++) {
                        datat[index][indexCol] = 'O';
                    }
                }
                rocks = [];
            }
            if (indexRow === datat.length - 1) {
                if (rocks.length !== 0) {
                    for (let index = datat.length - rocks.length; index < datat.length; index++) {
                        datat[index][indexCol] = 'O';
                    }
                }
                rocks = [];
            }
        }
    }
}

function east(datat) {
    for (let indexRow = 0; indexRow < datat.length; indexRow++) {
        const row = datat[indexRow];
        let rocks = [];
        for (let indexCol = 0; indexCol < row.length; indexCol++) {
            const char = row[indexCol];
            if (char === 'O') {
                rocks.push({indexCol, indexRow});
                datat[indexRow][indexCol] = '.';
            }

            if (char === '#') {
                if (rocks.length !== 0) {
                    for (let index = indexCol - rocks.length; index < indexCol; index++) {
                        datat[indexRow][index] = 'O';
                    }
                }
                rocks = [];
            }
            if (indexCol === row.length - 1) {
                if (rocks.length !== 0) {
                    for (let index = row.length - rocks.length; index < row.length; index++) {
                        datat[indexRow][index] = 'O';
                    }
                }
                rocks = [];
            }
        }
    }
}

function west(datat) {
    for (let indexRow = 0; indexRow < datat.length; indexRow++) {
        let rocks = [];
        const row = datat[indexRow];
        for (let indexCol = row.length; indexCol >= 0; indexCol--) {
            const char = row[indexCol];
            if (char === 'O') {
                rocks.push({indexCol, indexRow});
                datat[indexRow][indexCol] = '.';
            }

            if (char === '#') {
                if (rocks.length !== 0) {
                    for (let index = indexCol + rocks.length; index > indexCol; index--) {
                        datat[indexRow][index] = 'O';
                    }
                }
                rocks = [];
            }
            if (indexCol === 0) {
                if (rocks.length !== 0) {
                    for (let index = rocks.length - 1; index >= 0; index--) {
                        datat[indexRow][index] = 'O';
                    }
                }
                rocks = [];
            }
        }
        
    }
}

function tiltRocks() {
    let diff = 0;
    let startLoop = 0;
    let loopResults = [];
    let results = [];
    for (let index = 0; index < loops; index++) {
        north(refinedData);
        west(refinedData);
        south(refinedData);
        east(refinedData);
        let totalCount = 0
        refinedData.forEach((row, index) => {
            const value = refinedData.length - index;
            let count = row.filter((v => v === 'O'));
            totalCount += count.length * value;
        })
        let sameR = results.filter((r) => r.totalCount === totalCount);
        if (sameR.length > 2) {
            diff = sameR[2].index - sameR[1].index;
            startLoop = sameR[1].index;
            results.push(totalCount);
            loopResults = results.slice( sameR[1].index,sameR[1].index +diff);
            getFinalValue(diff, startLoop, loopResults, );
            return;
        }
        results.push({totalCount, index})
    }
}

function getFinalValue(diff, startLoop, loopResults) {
    let loopsDividedByDiff = (loops-(startLoop + 1))%diff;
    
    console.log(loopResults[loopsDividedByDiff]);
    console.timeEnd();
    //97241
}
solve();