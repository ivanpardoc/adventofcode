import { movements, movementsExample, input, inputExample } from './input.js';
let dataProcessed = [];
let currentPosition = 'AAA';
let found = false;
let maxLoop = 99999;
let steps = 0;
const currentMovements = movements.split('');

function solveDay8() {
    const data = input;
    processData(data);
    for (let index = 0; index < maxLoop; index++) {
        if (currentPosition !== 'ZZZ') {
            move();
        } else {
            index = maxLoop;
        }
    }
    console.log('steps', steps);
}


function processData(data) {
    data.forEach(element => {
        const splittedEqual = element.split(' = ');
        const position = splittedEqual[0];
        const movements = splittedEqual[1];
        dataProcessed.push({
            position,
            L: movements.split(', ')[0].substring(1),
            R: movements.split(', ')[1].substring(0,( movements.split(', ')[1].length-1))
        });
    });
}

function move() {
    currentMovements.forEach(movement => {
        if (currentPosition !== 'ZZZ') {
            const currentPositionData = dataProcessed.find((d) => d.position === currentPosition);
            currentPosition = currentPositionData[movement];
            steps++;
        }
    });
}

solveDay8();