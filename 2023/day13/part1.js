import { input, example, example2 } from "./input.js";

let dataRefined = [];
let dataVertical = [];
let results = []

function foundMatches(pattern) {
    let matches = []
    pattern.forEach((row, indexRow) => {
        // console.log(indexRow, pattern.length);
        if (indexRow + 1 === pattern.length) {
            // console.log('indexRow + 1 === row.length - 1');
            return;
        }
        // console.log(row, pattern[indexRow+1]);
        if (row === pattern[indexRow + 1]) {
            // flagFoundHorizontal = true;
            matches.push([indexRow, indexRow+1])
        }
    });
    return matches
}


function solve() {
    refineData();
    dataRefined.forEach((pattern, indexPattern) => {
        let flagFoundHorizontal = false;
        let flagFoundVertical = false;
        const verticalPattern = dataVertical[indexPattern];
        let indexesFoundHoriz = foundMatches(pattern);
        let indexesFoundVertical = foundMatches(verticalPattern)

        const resultHorizontal = loopCommon(indexesFoundHoriz, pattern, 'hor');
        // let numberEqualHorizontal = resultHorizontal.
        let horSimmetryFound = resultHorizontal.simmetryFound;
        let horReachedEnd = resultHorizontal.reachedEnd;
        let notSimmetryHor = resultHorizontal.notSimmetry;
        
        const resultVertical = loopCommon(indexesFoundVertical, verticalPattern, 'vertical');
        let verReachedEnd = resultVertical.reachedEnd;
        let verSimmetryFound = resultVertical.simmetryFound
        let notSimmetryVer = resultVertical.notSimmetry;

        // console.log('horsim', resultHorizontal);
        if (verReachedEnd) {
            results.push(verSimmetryFound[1]);
        }
        if (horReachedEnd) {
            results.push((horSimmetryFound[1]) * 100);
        }
    })
    const sum = results.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);
    console.log(results);
    console.log('total', sum);

    // 30486 -too low
    // 35868 -- too high
    // 35765 !not
    // 32400 NOT
    // 33182 no
    // 33157
    // 33195 yep
}

function loopCommon(indexsFound, pattern, direction) {
    let numberEqualHorizontal = 0
    let simmetryFound = [];
    let reachedEnd = false;
    let notSimmetry = false;
    indexsFound.forEach((equals => {
        let notSimmetry = false;
        numberEqualHorizontal++;
        let indexToCompare = equals[1];
        for (let index = equals[0]; index >= 0; index--) {
            if (reachedEnd || notSimmetry) {
                return;
            }
            let currentRow = pattern[index];
            let compareTo = pattern[indexToCompare];
            if ((equals[1] === pattern.length -1 || index === 0) && currentRow === compareTo ) {
                reachedEnd = true;
                simmetryFound.push(equals[0], equals[1]);
                return;
            }
            indexToCompare++;
            if (currentRow === compareTo ) {
                numberEqualHorizontal++;
                if (!reachedEnd && index=== 0 || indexToCompare === pattern.length) {
                    simmetryFound.push(equals[0], equals[1]);
                    reachedEnd = true;
                }
            } else {
                notSimmetry = true;
            }
        }
    }))

    return {
        simmetryFound,
        reachedEnd,
        notSimmetry
    }
}


function getVerticalPatterns(pattern) {
    let verticalRows = [];
    let newRow = ''
    for (let column = 0; column < pattern[0].length; column++) {
        for (let row = 0; row < pattern.length; row++) {
            const element = pattern[row][column];
            newRow += element;
        }
        verticalRows.push(newRow);
        newRow = '';
    }
    dataVertical.push(verticalRows)
}

function refineData() {
    const data = input;
    let pattern = [];
    
    data.forEach((element, index) => {
        if (element === '' || index === data.length - 1) {
            if (element !== '') {
                pattern.push(element);
            }
            dataRefined.push(pattern);
            pattern = [];
        } else {
            pattern.push(element);
        }
    });

    
    dataRefined.forEach((pattern) =>{
        getVerticalPatterns(pattern);
    })
}

solve();