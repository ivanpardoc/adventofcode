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
    let obj = { value: map[robot.y][robot.x], y: robot.y, x: robot.x, stepsValue: 0};
    checkPositions(obj, [obj], 'h')
    finishes.forEach((f) => {
        
        let value = f.reduce((pv, v) =>  pv + v.stepsValue , 0);
        finishesWithValue.push({value, steps: f})
    })
    finishesWithValue.sort((a, b) => a.value - b.value);
    console.log(finishesWithValue[0].value);
    
    finishesWithValue[0].steps.forEach((step) => {
        map[step.y][step.x] = 'O';
    })
    
    printMap();
}

function checkPositions(currentPosition, history, direction) {
    let { x, y } = currentPosition;
    if (finish.x === x && finish.y === y) {
        finishes.push(history);
        return;
    }
    let leftP = { value: map[y][x - 1], y, x: x - 1, stepsValue: direction === 'h' ? 1 : 1001 };
    let rightP = { value: map[y][x + 1], y, x: x + 1, stepsValue: direction === 'h' ? 1 : 1001 };
    let topP = { value: map[y - 1][x], y: y - 1, x, stepsValue: direction === 'h' ? 1001 : 1 };
    let bottomP = { value: map[y + 1][x], y: y + 1, x, stepsValue: direction === 'h' ? 1001 : 1 };
    // console.log(history.length);
    // let copyMap = map.map(row => [...row]); // Create a deep copy
    
    // history.forEach((step) => {
    //     copyMap[step.y][step.x] = 'O';
    // })
    // printMap(copyMap);
    if (leftP.value !== '#') {
        const newHistory = [...history, leftP];
        if (newHistory.filter(p => p.x === leftP.x && p.y === leftP.y).length < 3) {
            checkPositions(leftP, newHistory, 'h');
        }
    }

    if (rightP.value !== '#') {
        const newHistory = [...history, rightP];
        if (newHistory.filter(p => p.x === rightP.x && p.y === rightP.y).length < 3) {
            checkPositions(rightP, newHistory, 'h');
        }
    }

    if (topP.value !== '#') {
        const newHistory = [...history, topP];
        if (newHistory.filter(p => p.x === topP.x && p.y === topP.y).length < 3) {
            checkPositions(topP, newHistory, 'v');
        }
    }

    if (bottomP.value !== '#') {
        const newHistory = [...history, bottomP];
        if (newHistory.filter(p => p.x === bottomP.x && p.y === bottomP.y).length < 3) {
            checkPositions(bottomP, newHistory, 'v');
        }
    }

}

function printMap(input) {
    input.forEach(r => console.log(r.join('')))
}

solve(input);
