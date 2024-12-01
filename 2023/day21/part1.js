import { input, example} from './input.js';
const data = input;
const refinedData = [];
const points = [];
const pointsFinished = [];
const pointsVisited = [];
const steps = 64;
// 6304 too high
function solve() {
    prepareData();

    getNewPoints(points[0]);
    points.shift();
    while(points.length !== 0) {
        getNewPoints(points[0])
        points.shift();
    }

    pointsFinished.forEach((finished) => {
        let { y, x } = finished;
        refinedData[y][x].char = '0';
    })

    refinedData.forEach((row) => {
        let rowV = '';
        row.forEach((char) => {
            rowV += char.char
        })
        console.log(rowV);
    })

    let count = 0;

    refinedData.forEach((row) => row.forEach((char) => {
        if (char.char === '0' || char.char === 'S') {
            count++;
        }
    }))
    console.log(count);
}

function getNewPoints(point) {
    const { y, x, currentStep } = point;
    let rockFounded = false;

    if (currentStep%2 === 0) {
        pointsFinished.push(point);
    }

    if (currentStep === steps) {
        point.endReached = true;
        pointsFinished.push(point);
        return;
    }

    if (y !== 0 && refinedData[y-1][x].char === '.' && !refinedData[y-1][x].visited) {
        refinedData[y-1][x].visited = true;
        points.push({y: y-1, x, endReached: false, currentStep: currentStep + 1})
    }
    if (y !== refinedData.length-1 && refinedData[y+1][x].char === '.' && !refinedData[y+1][x].visited) {
        refinedData[y+1][x].visited = true;
        points.push({y: y+1, x, endReached: false, currentStep: currentStep + 1})
    }
    if (x !== 0 && refinedData[y][x-1].char === '.' && !refinedData[y][x-1].visited) {
        refinedData[y][x-1].visited = true;
        points.push({y, x: x-1, endReached: false, currentStep: currentStep + 1})
    }
    if (x !== refinedData[y].length-1 && refinedData[y][x+1].char === '.' && !refinedData[y][x+1].visited) {
        refinedData[y][x+1].visited = true;
        points.push({y, x: x+1, endReached: false, currentStep: currentStep + 1})
    }
}

function prepareData() {
    data.forEach((row) => {
        let rowN = [];
        row.split('').forEach((char) => {
            rowN.push({char, visited: false})
        })
        refinedData.push(rowN)
    })

    refinedData.forEach((row, y) => row.forEach((char, x) => {
        if (char.char === 'S') {
            points.push({y, x, endReached: false, currentStep: 0});
            refinedData[y][x].visited = true;
        }
    }))
}


solve();