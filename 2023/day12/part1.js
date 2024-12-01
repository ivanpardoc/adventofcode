import { input, example } from "./input.js";
let dataRefined = [];
let possibleStrings = [];
function resolve() {
    const data = example;

    data.forEach(row => {
        dataRefined.push({springs: row.split(' ')[0], groups: groupsToNumber(row.split(' ')[1].split(','))})
    });

    console.log(dataRefined);
    // FIRST FIX THE EXISTING SPRINGS ADDING THE MISSING SEPARATORS
    let maxAllGroups = 0;
    dataRefined.forEach((data) => {
        let maxGroup = Math.max(...data.groups);
        maxAllGroups = maxGroup > maxAllGroups ? maxGroup : maxAllGroups;
    })
    generatePossibleStrings(maxAllGroups);
    // console.log('possibleStrings', possibleStrings);
}

function checkForGroups(completeString, groupSize, currentIndex) {
    for (let index = 0; index < parseInt(groupSize); index++) {
        if (currentIndex === 0 || completeString[currentIndex - 1] === '.') {
            console.log('start of group');
        }
        // const element = parseInt(groupSize);
        
    }
}

function groupsToNumber(array) {
    const newArr = []
    array.forEach((n) => {
        newArr.push(parseInt(n));
    })
    return newArr;
}

function generatePossibleStrings(numberOfGroups) {
    // return str.substring(0, position) + ch + str.substring(position);
    let startingGroupPoint = '.';
    let inbetweenGroupPoint = '.';
    let startingGroupQuestion = '?';
    let inbetweenGroupQuestion = '?';
    let inbetweenGroupQuestionAndPoint = '?';
    let inbetweenGroupPointAndQuestion = '.';
    for (let index = 0; index < numberOfGroups; index++) {
        startingGroupPoint += '#';
        startingGroupQuestion += '#';
        inbetweenGroupPoint += '#';
        inbetweenGroupQuestion += '#';
        inbetweenGroupQuestionAndPoint += '#';
        inbetweenGroupPointAndQuestion += '#';
        
            possibleStrings.push({
                startingGroupPoint,
                startingGroupQuestion,
                inbetweenGroupPoint,
                inbetweenGroupQuestion,
                inbetweenGroupPointAndQuestion,
                inbetweenGroupQuestionAndPoint
            })
    }

    possibleStrings.forEach((pos, index) => {
        pos.inbetweenGroupPoint = pos.inbetweenGroupPoint + '.';
        pos.inbetweenGroupQuestion = pos.inbetweenGroupQuestion + '.';
        pos.inbetweenGroupPointAndQuestion = pos.inbetweenGroupPointAndQuestion + '?';
        pos.inbetweenGroupQuestionAndPoint = pos.inbetweenGroupQuestionAndPoint + '.';
    })

    console.log(possibleStrings[2]);

}

resolve();