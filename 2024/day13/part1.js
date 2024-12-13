import { input, example } from './input.js';
let data = [];
let prizes = [];
function solve(input) {
    data = input.split('\n');
    let obj = { A: {}, B: {}, prize: {} };
    data.forEach(element => {
        if (element === '') {
            prizes.push(obj)
            obj = { A: {}, B: {}, prize: {} };
        } else {
            element = element.replaceAll('=', '+');
            let splitX = element.split(':')[1];
            splitX = splitX.split(',')[0];
            splitX = splitX.split('+')[1];
            let splitY = element.split(':')[1];
            splitY = splitY.split(',')[1];
            splitY = splitY.split('+')[1];
            if (element.indexOf('Button A:') !== -1) {
                obj['A'] = { X: splitX, XVariations: [], Y: splitY, YVariations: [] };
            } else if (element.indexOf('Button B:') !== -1) {
                obj['B'] = { X: splitX, XVariations: [], Y: splitY, YVariations: [] };
            } else if (element.indexOf('Prize:') !== -1) {
                obj['prize'] = { X: splitX, Y: splitY };
                obj['A']['XVariations'] = findVariations(obj.A.X, obj.prize.X); 
                obj['B']['XVariations'] = findVariations(obj.B.X, obj.prize.X); 
                obj['A']['YVariations'] = findVariations(obj.A.Y, obj.prize.Y); 
                obj['B']['YVariations'] = findVariations(obj.B.Y, obj.prize.Y); 
            }
        }
    });
    console.log(prizes[0]);

}

function findVariations(num, objective) {
    let loops = 2000;
    let variations = []
    for (let index = 0; index < loops; index++) {
        if (variations.length === 0) {
            variations.push(parseInt(num));
            continue;
        }
        if (variations[index-1]+parseInt(num) < objective) {
            variations[index] = variations[index-1]+parseInt(num);
        } else {
            break;
        }
    }
    return variations
}

solve(example);