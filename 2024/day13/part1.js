import { input, example, example2 } from './input.js';
let data = [];
let prizes = [];
function solve(input) {
    console.time();
    data = input.split('\n');
    
    let obj = { A: {}, B: {}, prize: {}, value: 0 };
    data.forEach(element => {
        if (element === '') {
            prizes.push(obj)
            obj = { A: {}, B: {}, prize: {}, value: 0 };
        } else {
            element = element.replaceAll('=', '+');
            let splitX = element.split(':')[1];
            splitX = splitX.split(',')[0];
            splitX = parseInt(splitX.split('+')[1]);
            let splitY = element.split(':')[1];
            splitY = splitY.split(',')[1];
            splitY = parseInt(splitY.split('+')[1]);
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

    Object.entries(prizes).forEach(([key, obj]) => {
        obj.B.XVariations.forEach((variationB, indexB) => {
            obj.A.XVariations.forEach((variationA, indexA) => {
                let sum = variationB + variationA;
                if (obj.prize.X === sum) {
                    if (obj.B.YVariations[indexB]+obj.A.YVariations[indexA] === obj.prize.Y) {
                        let value = ((indexA+1)*3) + (indexB+1)
                        prizes[key].value = value;
                    }
                }
            })
        })
    })
    
    const total = prizes.reduce((p, c) => p+c.value, 0);
    console.log('total', total);
    console.timeEnd();
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

solve(input);