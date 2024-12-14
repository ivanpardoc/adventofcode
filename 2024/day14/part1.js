import { input, example, example2 } from './input.js';
let data = [];
let dataFormatted = [];
let maxRow = 102; // 1 less
let maxCol = 100; // 1 less
let loops = 100;
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

    for (let index = 0; index < dataFormatted.length; index++) {
        const { position, velocity } = dataFormatted[index];
        for (let indexL = 0; indexL < loops; indexL++) {
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
    let firstQuadrant = dataFormatted.filter(({position}) => {
        return position.x < maxCol/2 && position.y < maxRow/2;
    }).length
    let secondQuadrant = dataFormatted.filter(({position}) => {
        return position.x > maxCol/2 && position.y < maxRow/2;
    }).length
    let thirdQuadrant = dataFormatted.filter(({position}) => {
        return position.x < maxCol/2 && position.y > maxRow/2;
    }).length
    let fourthQuadrant = dataFormatted.filter(({position}) => {
        return position.x > maxCol/2 && position.y > maxRow/2;
    }).length
    console.log(firstQuadrant * secondQuadrant * thirdQuadrant * fourthQuadrant);
    console.timeEnd();
}

solve(input);
