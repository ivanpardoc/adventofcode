import { input, example, example2 } from "./input.js";

// let gridRow = ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.'];
let currentPoint = { y: 0, x: 0 };
let points = [];
const data = input;
const hexToDecimal = hex => parseInt(hex, 16);
//119762850
function solve() {
    console.time();
    let stepsCount = 0;
    data.forEach((row) => {
        let splitted = row.split(' ');
        let cleaned = splitted[2].replace('(#', '').replace(')', '');
        let steps = hexToDecimal(cleaned.substring(0, 5));
        let directionDigit = parseInt(cleaned[5]);

        if (directionDigit === 1) {
            stepsCount += steps
            points.push(currentPoint.y + steps, currentPoint.x)
            currentPoint = { y: currentPoint.y + steps, x: currentPoint.x };
        }
        if (directionDigit === 3) {
            stepsCount += steps
            points.push(currentPoint.y - steps, currentPoint.x)
            currentPoint = { y: currentPoint.y - steps, x: currentPoint.x };
        }
        if (directionDigit === 0) {
            stepsCount += steps
            points.push(currentPoint.y, currentPoint.x + steps)
            currentPoint = { y: currentPoint.y, x: currentPoint.x + steps };
        }
        if (directionDigit === 2) {
            stepsCount += steps
            points.push(currentPoint.y, currentPoint.x - steps)
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