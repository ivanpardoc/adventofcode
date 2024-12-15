import { input, example, example2 } from './input.js';

let map = [];
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
        finishMap ? directions += r : map.push(r.split(''));
    });
    // printMap();
    // console.log('');
    directions.split('').forEach((d) => {
        let { x, y } = robot;
        let positionsMoved = 1;
        switch (d) {
            case '<':
                // console.log('Move <');
                
                while (map[y][x - positionsMoved] !== '.' && map[y][x - positionsMoved] !== '#') {
                    positionsMoved++;
                }
                if (map[y][x - positionsMoved] === '.') {
                    map[y][x] = '.';
                    map[y][x - 1] = '@';
                    for (let index = 2; index <= positionsMoved; index++) {
                        map[y][x - index] = 'O'
                    }
                    robot.x = x - 1;
                }
                // printMap();
                // console.log('');
                break;
            case '^':
                // console.log('Move ^');
                while (map[y - positionsMoved][x] !== '.' && map[y - positionsMoved][x] !== '#') {
                    positionsMoved++;
                }
                if (map[y - positionsMoved][x] === '.') {
                    map[y][x] = '.';
                    map[y - 1][x] = '@';
                    for (let index = 2; index <= positionsMoved; index++) {
                        map[y - index][x] = 'O'
                    }
                    robot.y = y - 1;
                }
                // printMap();
                // console.log('');
                break;
            case '>':
                // console.log('Move >');

                while (map[y][x + positionsMoved] !== '.' && map[y][x + positionsMoved] !== '#') {
                    positionsMoved++;
                }
                if (map[y][x + positionsMoved] === '.') {
                    map[y][x] = '.';
                    map[y][x + 1] = '@';
                    for (let index = 2; index <= positionsMoved; index++) {
                        map[y][x + index] = 'O'
                    }
                    robot.x = x + 1;
                }
                // printMap();
                // console.log('');
                break;
            case 'v':
                // console.log('Move v');
                while (map[y + positionsMoved][x] !== '.' && map[y + positionsMoved][x] !== '#') {
                    positionsMoved++;
                }
                if (map[y + positionsMoved][x] === '.') {
                    map[y][x] = '.';
                    map[y + 1][x] = '@';
                    for (let index = 2; index <= positionsMoved; index++) {
                        map[y + index][x] = 'O'
                    }
                    robot.y = y + 1;
                }
                // printMap();
                // console.log('');
                break;
        }
    })
    printMap();
    let total = 0;
    map.forEach((r, rind) => {
        r.forEach((c, cind) => {
            if (c === 'O') {
                total += (100*rind) + cind
            }
        })
    })

    console.log('total:', total);
    
    console.timeEnd();
}

function printMap() {
    map.forEach(r => console.log(r.join('')))
}

solve(input);
