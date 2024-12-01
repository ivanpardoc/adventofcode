import { input, inputExample, inputSecondPart } from './input.js';

const result = [];

function solveDay6() {
    const { times, distances } = inputSecondPart;
    console.log('time', times);
    console.log('distance', distances);
    times.forEach((time, indexTime) => {
        time = parseInt(time);
        let numberOfTimes = 0;
        for (let seconds = 0; seconds < time; seconds++) {
            const secondsRemaining = time - seconds;
            if (secondsRemaining * seconds > distances[indexTime]) {
                numberOfTimes++;
            }
        }
        result.push(numberOfTimes);
    });
    const sum = result.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) * parseInt(currentValue);
    }, 1);
    console.log(sum);
}

solveDay6();

// 71503 input 1
// 35150181 input 2
