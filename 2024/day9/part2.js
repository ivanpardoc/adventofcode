import { input, example, example2 } from './input.js';

function solve(input) {
    console.time();
    console.log(input);
    let fileInd = '0';
    let newStr = [];
    input.split('').forEach((element, ind) => {
        for (let index = 0; index < parseInt(element); index++) {
            // newStr += ind % 2 === 0 ? fileInd : '.';
            newStr.push(ind % 2 === 0 ? parseInt(fileInd) : '.')
        }
        if (ind % 2 === 0) {
            fileInd = parseInt(fileInd);
            fileInd++
        }
        fileInd = fileInd + '';
    });
    // console.log(newStr);
    // let newStrSplitted = newStr;
    console.log(newStr);

    let reverseInd = newStr.length - 1;
    newStr.forEach((e, ind) => {
        // console.log(e);
        if (e === '.') {
            let spaceCount = 0;
            let indexForSpace = ind;

            while (newStr[indexForSpace] === '.') {
                indexForSpace++;
                spaceCount++;
            }
            console.log('space', spaceCount);

            while (newStr[reverseInd] === '.') {
                reverseInd--;
            }

            let spaceFound = false;
            let spaceReverseCount = 0;
            let indexForSpaceReverse = reverseInd;

            while (!spaceFound) {
                let numberToCheck = newStr[indexForSpaceReverse];
                console.log(numberToCheck);
                

                while (newStr[indexForSpaceReverse] === numberToCheck && newStr[indexForSpaceReverse]) {
                    indexForSpaceReverse--;
                    spaceReverseCount++;
                    console.log(newStr[indexForSpaceReverse]);
                }
                console.log('spaceReverseCount', spaceReverseCount);

                if (spaceCount > spaceReverseCount) {
                    spaceFound = true;
                }
            }
            console.log('here');
            
            // if (reverseInd > ind) {
            //     newStr[ind] = newStr[reverseInd];
            //     newStr[reverseInd] = '.';
            //     reverseInd = newStr.length - 1;
            // }
        }
    })
    console.log(newStr);
    let total = 0;
    newStr.forEach((e, ind) => {
        if (e !== '.') {
            total += parseInt(e) * ind;
        }
    })
    console.log(total);
    console.timeEnd();
}

// solve(input);
// 6299243228569
solve(example2);