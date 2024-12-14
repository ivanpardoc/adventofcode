import { input, example, example2 } from './input.js';
let data = [];
let dataFormatted = [];
let maxRow = 102; // 1 less
let maxCol = 100; // 1 less
let loops = 10000;
let alreadyFound = false;
let grid = []
function solve(input) {
    console.time();
    data = input.split('\n');
    data.forEach(r => {
        let obj = { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 } }
        r = r.split('=');
        obj.velocity.x = parseInt(r[2].split(',')[0]);
        obj.velocity.y = parseInt(r[2].split(',')[1])
        obj.position.x = parseInt(r[1].split(',')[0]);
        obj.position.y = parseInt(r[1].split(',')[1])
        dataFormatted.push(obj);
    });

    for (let indexL = 0; indexL < loops && !alreadyFound; indexL++) {
        if (!alreadyFound) {
            createQuadrant(indexL)
            for (let index = 0; index < dataFormatted.length; index++) {
                const { position, velocity } = dataFormatted[index];
                position.x += velocity.x;
                position.y += velocity.y;
                if (position.x < 0) {
                    position.x += (maxCol + 1);
                }
                if (position.x > maxCol) {
                    position.x -= (maxCol + 1);
                }
                if (position.y < 0) {
                    position.y += (maxRow + 1);
                }
                if (position.y > maxRow) {
                    position.y -= (maxRow + 1);
                }
            }
        }
    }
    console.timeEnd();
}

function createQuadrant(loop) {
    grid = Array.from({ length: 103 }, () => Array(110).fill('.'));
    dataFormatted.forEach(d => {
        grid[d.position.y][d.position.x] = 'X'
    });
    grid.forEach(row => {
        const rowJoin = row.join('');
        if (rowJoin.includes('XXXXXXXX')) {
            alreadyFound = true;
            console.log('loop', loop);
            return true;
        }
    });
    return false;
}

solve(input);
