import { input, example } from "./input.js";

const data = input;
let refinedData = [];
let results = 0;
let boxes = {};

function solve() {
    console.time();
    refinedData = data.split(',');

    for (let index = 0; index < 256; index++) {
        boxes[index] = [];
    }

    refinedData.forEach((field) => {
        let fieldObj = {
            box: 0,
            label: '',
            lens: 0
        }

        let splittedEqual = field.split('=');

        if (splittedEqual[1]) {
            fieldObj.label = splittedEqual[0];
            fieldObj.lens = parseInt(splittedEqual[1]);
        } else {
            let fieldWithoutDash = field.split('-');
            fieldObj.label = fieldWithoutDash[0];
        }

        fieldObj.label.split('').forEach((char) => {
            fieldObj.box = ((fieldObj.box + char.charCodeAt(0)) * 17)%256;
        });

        if (fieldObj.lens === 0) {
            boxes[fieldObj.box] = boxes[fieldObj.box].filter((box) => box.label !== fieldObj.label);
        } else {
            const index = boxes[fieldObj.box].findIndex((box) => box.label === fieldObj.label);

            if (index !== -1) {
                boxes[fieldObj.box][index] = fieldObj;
            } else {
                boxes[fieldObj.box].push(fieldObj);
            }
        }
    });
    
    const boxArr = Object.entries(boxes);

    boxArr.forEach((box) => {
        box[1].forEach(((lens, indexLens) => {
            let sum = 0;
            sum = (lens.box + 1) * (indexLens + 1) * lens.lens;
            results += sum;
        }))
    })

    console.log('result', results);
    console.timeEnd();
}

// 237806
solve()