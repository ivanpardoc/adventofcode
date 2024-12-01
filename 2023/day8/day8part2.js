import { movements, movementsExample2, input, inputExample2 } from './input.js';

let dataProcessed = [];
const currentMovements = movements.split('');
const data = input;

const allLoops = [];

function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if (!b) return b === 0 ? a : NaN;
    return gcd2(b, a % b);
}
function gcd(array) {
    // Greatest common divisor of a list of integers
    var n = 0;
    for (var i = 0; i < array.length; ++i)
        n = gcd2(array[i], n);
    return n;
}
function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a * b / gcd2(a, b);
}
function lcm(array) {
    // Least common multiple of a list of integers
    var n = 1;
    for (var i = 0; i < array.length; ++i)
        n = lcm2(array[i], n);
    return n;
}

function solveDay8() {
    processData();
    const startingPoints = dataProcessed.filter((d) => d.position[2] === 'A');
    let endings = startingPoints.filter((d) => d.currentPosition[2] === 'Z');
    startingPoints.forEach((startingPoint, index) => {
        let steps = 0;
        while (steps < 99999) {
            for (const movement of currentMovements) {
                if (startingPoint.currentPosition[2] !== 'Z') {
                    const currentPositionData = positionData[startingPoint.currentPosition];
                    startingPoint.currentPosition = currentPositionData[movement];
                    steps++;
                    if (startingPoint.currentPosition[2] === 'Z') {
                        // console.log('end with Z', startingPoint.currentPosition, steps);
                        startingPoint.loops = steps;
                    }
                } else {
                    steps = 99999;
                }
            }
        }
    });
    startingPoints.forEach((startPoint) => {
        allLoops.push(startPoint.loops);
    });

    console.log(allLoops);

    console.log(lcm(allLoops));
}

const positionData = {};

function processData() {
    data.forEach(element => {
        const splittedEqual = element.split(' = ');
        const position = splittedEqual[0];
        const movements = splittedEqual[1];
        positionData[position] = {
            position,
            L: movements.split(', ')[0].substring(1),
            R: movements.split(', ')[1].substring(0, movements.split(', ')[1].length - 1),
            currentPosition: position,
            loops: []
        };
    });
    dataProcessed = Object.values(positionData);
}

solveDay8();
