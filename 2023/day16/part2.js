import { input, example } from "./input.js";
// const startingBeam = { XPoint: 0, YPoint: 0, direction: 'east', reachedEnd: false };
let beams = [];
const data = input;
let grid = [];
let gridToCheck = [];
let startedBeams = [];
let startingBeams = [];
let resultsEnergy = [];
let coordsArr = [];

function resolve() {
    console.time();
    grid = data.split(', ');
    resetGridToCheck();
    let columnsLength = grid[0].length - 1;
    let rowsLength = grid.length - 1;
    for (let indexC = 0; indexC < columnsLength; indexC++) {
        startingBeams.push({ XPoint: indexC, YPoint: 0, direction: 'south', reachedEnd: false });
        startingBeams.push({ XPoint: indexC, YPoint: rowsLength, direction: 'north', reachedEnd: false });
    }

    for (let indexY = 0; indexY < rowsLength; indexY++) {
        startingBeams.push({ XPoint: 0, YPoint: indexY, direction: 'east', reachedEnd: false });
        startingBeams.push({ XPoint: columnsLength, YPoint: indexY, direction: 'west', reachedEnd: false });
    }

    startingBeams.forEach((startingBeam, indexStart) => {
        resetGridToCheck();
        startedBeams = [];
        coordsArr = [];
        startingBeam.reachedEnd = moveBeam(startingBeam);
        let maxLoops = 20; 
        let currentLoop = 0;
        while (currentLoop < maxLoops) { // https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd21vZWYyb3JqMHg4bjN2Z3dmb20zOWdiYzNhMnhqcTd6NTU5dDhhNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SwyTq2jJxc9im6BYnN/giphy.gif
            startedBeams.forEach((beam) => {
                beam.reachedEnd = moveBeam(beam);
            });
            currentLoop++;
        }
        let countEnergy = 0;
        gridToCheck.forEach((row) => {
            row.forEach((ch) => {
                if (ch === '#') {
                    countEnergy++;
                }
            })
        })
        resultsEnergy.push(countEnergy);
    });
    console.timeEnd();
    console.log('max', Math.max(...resultsEnergy));
}

function printModified() {
    console.log('');
    console.log('   0123456789    0123456789');
    gridToCheck.forEach((row, index) => {
        console.log('0' + index, row.join(''), '0' + index, grid[index]);
    })
    console.log('   0123456789    0123456789');
    console.log('');
}

function resetGridToCheck() {
    gridToCheck = [];
    grid.forEach((row, index) => {
        gridToCheck.push(row.split(''));
    })
}

function moveBeam(beam) {
    let maxLoop = 100;
    let currentLoop = 0;
    while (beam.XPoint >= 0 && beam.YPoint >= 0 && beam.YPoint < grid.length && beam.XPoint < grid[beam.YPoint].length && currentLoop < maxLoop) {
        let charAtGrid = grid[beam.YPoint][beam.XPoint];
        gridToCheck[beam.YPoint][beam.XPoint] = '#';
        beam = checkMove(charAtGrid, beam);
        currentLoop++;
    }
    return true;
}

function checkMove(charAtGrid, beam) {
    if (charAtGrid === '.') {
        if (beam.direction === 'east') {
            beam.XPoint++;
            return beam;
        }
        if (beam.direction === 'west') {
            beam.XPoint--;
            return beam;
        }
        if (beam.direction === 'north') {
            beam.YPoint--;
            return beam;
        }
        if (beam.direction === 'south') {
            beam.YPoint++;
            return beam;
        }
    }
    if (charAtGrid === '/') {
        if (beam.direction === 'east') {
            beam.YPoint--;
            beam.direction = 'north';
            return beam;
        } else if (beam.direction === 'west') {
            beam.direction = 'south';
            beam.YPoint++;
            return beam;
        } else if (beam.direction === 'north') {
            beam.direction = 'east';
            beam.XPoint++;
            return beam;
        } else if (beam.direction === 'south') {
            beam.direction = 'west';
            beam.XPoint--;
            return beam;
        }
    }
    if (charAtGrid === '\\') {
        if (beam.direction === 'east') {
            beam.YPoint++;
            beam.direction = 'south';
            return beam;
        }
        if (beam.direction === 'west') {
            beam.YPoint--;
            beam.direction = 'north';
            return beam;
        }
        if (beam.direction === 'north') {
            beam.direction = 'west';
            beam.XPoint--;
            return beam;
        }
        if (beam.direction === 'south') {
            beam.direction = 'east';
            beam.XPoint++;
            return beam;
        }
    }

    if (charAtGrid === '|') {
        if (beam.direction === 'north') {
            beam.YPoint--;
            return beam;
        } else if (beam.direction === 'south') {
            beam.YPoint++
            return beam;
        } else if (beam.direction === 'east' || beam.direction === 'west') {
            let newBeam = { XPoint: beam.XPoint, YPoint: beam.YPoint - 1, direction: 'north', reachedEnd: false };
            let coordToF = (newBeam.XPoint*1000).toString() + ((newBeam.YPoint) * 1000).toString() + newBeam.direction;
            let alreadyChecked = coordsArr.some((b) => b === coordToF);
            if (!alreadyChecked) {
                startedBeams.push(newBeam);
                coordsArr.push(coordToF)
            }
            beam.YPoint++; // continue current beam to south
            beam.direction = 'south';
            return beam;
        }
    }

    if (charAtGrid === '-') {
        if (beam.direction === 'east') {
            beam.XPoint++;
            return beam;
        } else if (beam.direction === 'west') {
            beam.XPoint--;
            return beam;
        } else if (beam.direction === 'north' || beam.direction === 'south') {
            let newBeam = { XPoint: beam.XPoint + 1, YPoint: beam.YPoint, direction: 'east', reachedEnd: false };
            let coordToF = (newBeam.XPoint*1000).toString() + ((newBeam.YPoint) * 1000).toString() + newBeam.direction;
            let alreadyChecked = coordsArr.some((b) => b === coordToF);
            if (!alreadyChecked) {
                startedBeams.push(newBeam);
                coordsArr.push(coordToF)
            }
            beam.XPoint--; // CONTINUE west
            beam.direction = 'west';
            return beam;
        }
    }
    return beam;
}

resolve();