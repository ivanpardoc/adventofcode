import { input, example, example2 } from "./input.js";

let grid = [];
// let gridRow = ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'];
let currentPoint = { y: 200, x: 200 };
let points = [];
const data = input;

function solve() {
    console.time();
    let stepsCount = 0;
    data.forEach((row) => {
        let splitted = row.split(' ');
        let direction = splitted[0];
        let steps = parseInt(splitted[1]);
        if (direction === 'D') {
            points.push(currentPoint.y + steps, currentPoint.x)
            stepsCount++
            currentPoint = { y: currentPoint.y + steps, x: currentPoint.x };
        }
        if (direction === 'U') {
            points.push(currentPoint.y - steps, currentPoint.x)
            stepsCount++
            currentPoint = { y: currentPoint.y - steps, x: currentPoint.x };
        }
        if (direction === 'R') {
            points.push(currentPoint.y, currentPoint.x + steps)
            stepsCount++
            currentPoint = { y: currentPoint.y, x: currentPoint.x + steps };
        }
        if (direction === 'L') {
            points.push(currentPoint.y, currentPoint.x - steps)
            stepsCount++
            currentPoint = { y: currentPoint.y, x: currentPoint.x - steps };
        }
    })

    const area = Math.area(points);
    let total = area - stepsCount / 2 + 1;
    console.timeEnd();
    console.log('total', total + stepsCount);
}

Math.area = Math.area || function (polygon) {
    const length = polygon.length;

    let sum = 0;

    for (let i = 0; i < length; i += 2) {
        sum += polygon[i] * polygon[(i + 3) % length]
            - polygon[i + 1] * polygon[(i + 2) % length];
    }

    return Math.abs(sum) * 0.5;
}

solve();