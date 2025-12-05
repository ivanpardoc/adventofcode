import { ranges, exampleRanges } from './input.js';

function solve(ranges) {
    console.time();
    let result = 0;
    const rangesArr = ranges.trim().split('\n');
    const rangesArrObj = rangesArr.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return { min, max, checked: false};
    });

    rangesArrObj.sort((a, b) => a.min - b.min);
    rangesArrObj.forEach((range, index) => {
        let nextRange = index !== rangesArrObj.length-1 ? rangesArrObj[index+1] : undefined;
        
        if (!range.checked) {
            if (nextRange) {
                if (nextRange.min > range.max) {
                    if (range.max < nextRange.min) {
                        let calc = (range.max-range.min)+1;
                        result += calc;
                    } 
                } else if (nextRange.max > range.max) {
                    rangesArrObj[index+1].min = range.min;
                } else {
                    rangesArrObj[index+1].min = range.min;
                    rangesArrObj[index+1].max = range.max;
                }
            } else {
                let calc = (range.max-range.min)+1;
                result += calc;
            }
        }
        rangesArrObj[index].checked = true;
    });

    console.log('result', result)
    console.timeEnd();
}

solve(ranges);