import { input, example, example2 } from './input.js';

let map = [];
let mapP2 = [];
let directions = '';
let robot = { x: 0, y: 0 };
function solve(input) {
    console.time();
    let data = input.split('\n');
    let finishMap = false;
    data.forEach((r, rInd) => {
        if (r === '') {
            finishMap = true;
        }
        let robotX = r.indexOf('@');
        if (robotX !== -1) {
            robot = { x: robotX, y: rInd };
        }
        finishMap ? directions += r : mapP2.push(r.split(''));
    });

    mapP2.forEach((r, rind) => {
        let newR = [];
        r.forEach((c, cind) => {
            if (c === '#') {
                newR.push('#');
                newR.push('#');
            } else if (c === '.') {
                newR.push('.');
                newR.push('.');
            } else if (c === 'O') {
                newR.push('[');
                newR.push(']');
            } else if (c === '@') {
                robot.x = newR.length;
                newR.push('@');
                newR.push('.');
            }
        })

        map.push(newR);
    })
    printMap()
    // console.log('');
    directions.split('').forEach((d) => {
        let { x, y } = robot;
        let positionsMoved = 1;
        switch (d) {
            case '<':
                while (map[y][x - positionsMoved] !== '.' && map[y][x - positionsMoved] !== '#') {
                    positionsMoved++;
                }
                if (map[y][x - positionsMoved] === '.') {
                    map[y][x] = '.';
                    map[y][x - 1] = '@';
                    for (let index = 2; index <= positionsMoved; index++) {
                        map[y][x - index] = index % 2 === 0 ? ']' : '[';
                    }
                    robot.x = x - 1;
                }
                printMap();
                break;
            case '^':
                moveVertical(d, x, y);
                break;
            case '>':
                while (map[y][x + positionsMoved] !== '.' && map[y][x + positionsMoved] !== '#') {
                    positionsMoved++;
                }
                if (map[y][x + positionsMoved] === '.') {
                    map[y][x] = '.';
                    map[y][x + 1] = '@';
                    for (let index = 2; index <= positionsMoved; index++) {
                        map[y][x + index] = index % 2 === 0 ? '[' : ']'
                    }
                    robot.x = x + 1;
                }
                printMap();
                break;
            case 'v':
                moveVertical(d, x, y);
                break;
        }
    })
    printMap();
    let total = 0;

    map.forEach((r, rind) => r.forEach((c, cind) => c === '[' ? total += (100 * rind) + cind : ''));

    console.log('total:', total);

    console.timeEnd();
}

function moveVertical(direction, x, y) {
    let allBoxesB = [];
    let valToRest = direction === 'v' ? 1 : -1;
    if (map[y + valToRest][x] === '.') {
        map[y][x] = '.';
        map[y + valToRest][x] = '@';
        robot.y = y + valToRest;
    }
    if (map[y + valToRest][x] === ']' || map[y + valToRest][x] === '[') {
        if (map[y + valToRest][x] === ']') {
            allBoxesB.push({ leftBracket: { x: x - 1, y: y + valToRest }, rightBracket: { x, y: y + valToRest }, checked: false, blocked: false })
        } else {
            allBoxesB.push({ leftBracket: { x, y: y + valToRest }, rightBracket: { x: x + 1, y: y + valToRest }, checked: false, blocked: false })
        }
        while (allBoxesB.filter(b => !b.checked).length > 0) {
            allBoxesB.forEach((b, bInd) => {
                if (!b.checked) {
                    let nextCharLeftBracketX = map[b.leftBracket.y + valToRest][b.leftBracket.x];
                    let nextCharRightBracketX = map[b.rightBracket.y + valToRest][b.rightBracket.x];
                    if (nextCharRightBracketX === '#' || nextCharLeftBracketX === '#') {
                        allBoxesB[bInd].blocked = true;
                    }
                    if (nextCharLeftBracketX === '[') {
                        allBoxesB.push({ leftBracket: { x: b.leftBracket.x, y: b.leftBracket.y + valToRest }, rightBracket: { x: b.leftBracket.x + 1, y: b.leftBracket.y + valToRest }, checked: false, blocked: false })
                    }
                    if (nextCharLeftBracketX === ']') {
                        allBoxesB.push({ leftBracket: { x: b.leftBracket.x - 1, y: b.leftBracket.y + valToRest }, rightBracket: { x: b.leftBracket.x, y: b.leftBracket.y + valToRest }, checked: false, blocked: false })
                    }
                    if (nextCharRightBracketX === '[') {
                        allBoxesB.push({ leftBracket: { x: b.rightBracket.x, y: b.rightBracket.y + valToRest }, rightBracket: { x: b.rightBracket.x + 1, y: b.rightBracket.y + valToRest }, checked: false, blocked: false })
                    }
                    if (nextCharRightBracketX === ']') {
                        allBoxesB.push({ leftBracket: { x: b.rightBracket.x - 1, y: b.rightBracket.y + valToRest }, rightBracket: { x: b.rightBracket.x, y: b.rightBracket.y + valToRest }, checked: false, blocked: false })
                    }
                }
                allBoxesB[bInd].checked = true;
            })
        }
        if (!allBoxesB.filter(b => b.blocked).length) {
            allBoxesB.reverse().forEach((box) => {
                map[box.leftBracket.y + valToRest][box.leftBracket.x] = '[';
                map[box.rightBracket.y + valToRest][box.rightBracket.x] = ']';
                map[box.leftBracket.y][box.leftBracket.x] = '.';
                map[box.rightBracket.y][box.rightBracket.x] = '.';
            })
            map[robot.y + valToRest][robot.x] = '@';
            map[robot.y][robot.x] = '.';
            robot.y = y + valToRest;
        }
    }
}

function printMap() {
    // map.forEach(r => console.log(r.join('')))
}
// 1561175
solve(input);
