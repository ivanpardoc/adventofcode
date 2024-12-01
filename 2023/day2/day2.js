import { day2Input, example } from './inputDay2.js';

const numberPattern = /\d+/g;
const letterPattern = /[a-z]+$/i;

const validGames = [];

function solveDay2(dataInput) {
    dataInput.forEach(element => {
        const sets = element.split(';');
        const firstSetSplitted = sets[0].split(':');
        sets[0] = firstSetSplitted[1];
        
        const usedCubes = {
            red: 0,
            green: 0,
            blue: 0
        };
        sets.forEach(singlePlay => {
            const t = singlePlay.split(', ');
            t.forEach((te) => {
                const color = te.match(letterPattern)[0];
                const number = te.match(numberPattern)[0];
                if (parseInt(number) > usedCubes[color]) {
                    usedCubes[color] = parseInt(number);
                }
            })
        });
        validGames.push(usedCubes.red * usedCubes.green * usedCubes.blue);
    });
    const sum = validGames.reduce((previousValue, currentValue) => {
        return parseInt(previousValue) + parseInt(currentValue);
    }, 0);
    console.log(sum);
}

solveDay2(day2Input);
