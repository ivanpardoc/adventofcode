import { input, example} from './input.js';

const data = input;
const refinedData = {};
let lowCount = 0;
let highCount = 0;
let beams = [];
let currentAttempt = 0;
let found = false;

function solve() {
    prepareData();
    
    // console.log(refinedData);
    let startingPulse = 'low';
    const attemptTimes = 10000000;
    // console.log('button -low-> broadcaster');
    sendPulse(refinedData.broadcaster.destination, false, 'broadcaster')
    while(beams.length !== 0) {
        lowCount++;
        sendPulse(beams[0].destinations, beams[0].highPulse, beams[0].from)
        beams.shift();
    }
    currentAttempt++;
    console.log('low', lowCount, 'high', highCount);
    console.log('result', lowCount * highCount);

}

function sendPulse(destinations, highPulse, from) {
    destinations.forEach((destBr) => {
        console.log(from, '-' , highPulse ? 'high' : 'low','->', destBr);
        // if (destBr === 'rx' && !highPulse) {
        //     found = true;
        //     console.log(destBr, currentAttempt);
        // }
        highPulse ? highCount++ : lowCount++;
        if (refinedData[destBr]) {
            if (refinedData[destBr].type === '%') {
                if (!highPulse) {
                    refinedData[destBr].turnedOn = !refinedData[destBr].turnedOn;
                    let t = {destinations: refinedData[destBr].destination, highPulse: refinedData[destBr].turnedOn, from: destBr}
                    // beams.push(refinedData[destBr].destination, refinedData[destBr].turnedOn, destBr)
                    beams.push(t)
                }
            }
            if (refinedData[destBr].type === '&') {
                refinedData[destBr].links[from] = highPulse;
                // console.log(refinedData[destBr].links);
                let linksArr = Object.entries(refinedData[destBr].links);
                let allhighBeams = linksArr.every(([key, value]) => value);
                let t = {destinations: refinedData[destBr].destination, highPulse: !allhighBeams, from: destBr}
                beams.push(t)
                    // beams.push(refinedData[destBr].destination, !refinedData[destBr].lastPulseHigh, destBr)
            }
            
        }
    })
}

function prepareData() {
    data.forEach((row) => {
        const splitted = row.split(' -> ');
        console.log(splitted);
        const key = splitted[0] === 'broadcaster' ? 'broadcaster' : splitted[0].substring(1);
        refinedData[key] = {
            type: splitted[0] === 'broadcaster' ? 'broadcaster' : splitted[0][0],
            destination: splitted[1].includes(',') ? splitted[1].split(', ') : [splitted[1]]
        }
        if (refinedData[key].type === '%') {
            refinedData[key].turnedOn = false;
        }
        if (refinedData[key].type === '&') {
            refinedData[key].links = {};
            refinedData[key].lastPulseHigh = false;
        }
    })

    const arrRefined = Object.entries(refinedData);
    const conjunctionModules = arrRefined.filter(([key, value]) => value.type === '&');
    const conjunctionArr = [];
    conjunctionModules.forEach((d) => conjunctionArr.push(d[0]))
    arrRefined.forEach((entry) =>  entry[1].destination.forEach((dest) => conjunctionArr.includes(dest) ? refinedData[dest].links[entry[0]] = false : ''));
}

solve();