import { input, example, example2 } from './input.js';

let map = [];
let robot = { x: 0, y: 0 };
let finish = { x: 0, y: 0 };
let finishes = [];
let finishesWithValue = [];
function solve(input) {
    console.time();
    input.split('\n').forEach((r, rind) => {
        let start = r.indexOf('S');
        let end = r.indexOf('E');
        if (start !== -1) {
            robot = { x: start, y: rind }
        }

        if (end !== -1) {
            finish = { x: end, y: rind }
        }
        map.push(r.split(''))
    })
    console.log('start', robot);
    let obj = { value: map[robot.y][robot.x], y: robot.y, x: robot.x, stepsValue: 0 };
    checkPositions(obj, [obj], 'h', new Set());
    finishes.forEach((f) => {
        let value = f.reduce((pv, v) =>  pv + v.stepsValue , 0);
        finishesWithValue.push({value, steps: f})
    })
    
    finishesWithValue.sort((a, b) => a.value - b.value);
    // console.log(finishesWithValue);
    console.log(finishesWithValue[0].value);
    
    finishesWithValue[0].steps.forEach((step) => {
        map[step.y][step.x] = step.value === 'S' ? 'S' : 'O';
    })
    
    printMap(map);
}

function checkPositions(currentPosition, history, direction, visited) {
    let { x, y } = currentPosition;
    const posKey = `${x},${y}`;

    // If we've reached the finish
    if (finish.x === x && finish.y === y) {
        finishes.push(history); // Store the successful path
        return;
    }

    // If this position was already visited, skip it
    if (visited.has(posKey)) {
        return;
    }

    // Mark this position as visited globally
    visited.add(posKey);

    // Define adjacent positions
    const leftP = { value: map[y][x - 1], y, x: x - 1, stepsValue: direction === 'h' ? 1 : 1001 };
    const rightP = { value: map[y][x + 1], y, x: x + 1, stepsValue: direction === 'h' ? 1 : 1001 };
    const topP = { value: map[y - 1][x], y: y - 1, x, stepsValue: direction === 'h' ? 1001 : 1 };
    const bottomP = { value: map[y + 1][x], y: y + 1, x, stepsValue: direction === 'h' ? 1001 : 1 };

    // Explore adjacent positions
    [leftP, rightP, topP, bottomP].forEach((pos) => {
        const adjKey = `${pos.x},${pos.y}`;
        if (pos.value !== '#' && !visited.has(adjKey)) {
            checkPositions(pos, [...history, pos], pos.y === y ? 'h' : 'v', visited);
        }
    });
}


function printMap(input) {
    input.forEach(r => console.log(r.join('')))
}
// 653020 too high
solve(example);
