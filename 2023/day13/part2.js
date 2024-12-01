import { input, example, example2 } from "./input.js";

let dataRefined = [];
let dataVertical = [];
let results = []
const data = input;

function foundMatches(pattern) {
    let matches = []
    pattern.forEach((row, indexRow) => {
        if (indexRow + 1 === pattern.length) {
            return;
        }

        const diff = getDifference(row, pattern[indexRow + 1]);

        if (diff.result.length === 1) {
            matches.push({equals: [indexRow, indexRow+1], modified: true})
        }
        
        if (row === pattern[indexRow + 1]) {
            matches.push({equals: [indexRow, indexRow+1], modified: false})
        }
    });
    return matches
}

function getDifference(a, b) {
    let i = 0;
    let j = 0;
    let result = "";
    let indexNotEqual = 0;

    while (j < b.length) {
        if (a[i] != b[j] || i == a.length) {
            result += b[j];
            indexNotEqual = i;
        }
        i++;
        j++;
    }
    return {result, indexNotEqual};
}

function solve() {
    console.time();
    refineData();
    dataRefined.forEach((pattern, indexPattern) => {
        const verticalPattern = dataVertical[indexPattern];
        let indexesFoundHoriz = foundMatches(pattern);
        let indexesFoundVertical = foundMatches(verticalPattern)

        
        const resultHorizontal = loopCommon(indexesFoundHoriz, pattern, 'hor');
        let multipleResultsHor = resultHorizontal.results.filter((r) => {
            return r.reachedEnd && r.changed;
        });
        let horSimmetryFound = '';
        let horReachedEnd = false;
        let notSimmetryHor = '';

        if (multipleResultsHor.length !== 0) {
            horSimmetryFound = multipleResultsHor[0].equals;
            horReachedEnd = multipleResultsHor[0].reachedEnd;
            notSimmetryHor = multipleResultsHor[0].notSimmetry;
        } 
        
        const resultVertical = loopCommon(indexesFoundVertical, verticalPattern, 'vertical');
        
        const multipleResultsVer = resultVertical.results.filter((r) => {
            return r.reachedEnd && r.changed;
        });

        let verSimmetryFound = '';
        let verReachedEnd = false;
        let notSimmetryver = '';
        if (multipleResultsVer.length !== 0) {
            verSimmetryFound = multipleResultsVer[0].equals;
            verReachedEnd = multipleResultsVer[0].reachedEnd;
            notSimmetryver = multipleResultsVer[0].notSimmetry;
        } 

        if (verReachedEnd) {
            results.push(verSimmetryFound[1]);
            flagPushed = true
        }
        if (horReachedEnd) {
            flagPushed = true
            results.push((horSimmetryFound[1]) * 100);
        }
    })
    const sum = results.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);

    console.log('total', sum);
    console.timeEnd()
}

function loopCommon(indexsFound, pattern, direction) {
    let numberEqualHorizontal = 0
    let simmetryFound = [];
    let reachedEnd = false;
    let notSimmetry = false;
    let resultsInd = []
    indexsFound.forEach(((equalsObj, ind) => {
        reachedEnd = false;
        let equals = equalsObj.equals;
        let modified = equalsObj.modified;
        let notSimmetry = false;
        numberEqualHorizontal++;
        let indexToCompare = equals[1];
        for (let index = equals[0]; index >= 0; index--) {
            if (reachedEnd || notSimmetry) {
                break;
            }
            let currentRow = pattern[index];
            let compareTo = pattern[indexToCompare];
            const diff = getDifference(currentRow, compareTo);
            const smudgeDiff = diff.result.length === 1 && (!modified || indexToCompare === equals[1]);
            if ((equals[1] === pattern.length -1 || index === 0) && (currentRow === compareTo || smudgeDiff) ) {
                reachedEnd = true;
                simmetryFound.push(equals[0], equals[1]);
                if (smudgeDiff) {
                    modified = true;
                }
                break;
            }
            indexToCompare++;
            if (currentRow === compareTo || smudgeDiff) {
                numberEqualHorizontal++;
                if (smudgeDiff) {
                    modified = true;
                }
                if (!reachedEnd && index=== 0 || indexToCompare === pattern.length) {
                    simmetryFound.push(equals[0], equals[1]);
                    reachedEnd = true;
                }
            } else {
                notSimmetry = true;
            }
        }
        resultsInd.push({equals, reachedEnd, notSimmetry, changed: modified})
    }))
    return {
        simmetryFound,
        reachedEnd,
        notSimmetry,
        results: resultsInd
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