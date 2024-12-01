import { input, example } from "./input.js";

const data = input;
let results = 0;

function solve() {
    console.time();

    data.split(',').forEach((field) => {
        let value = 0;

        field.split('').forEach((char) => {
            value = ((value + char.charCodeAt(0)) * 17)%256;
        });

        results += value;
    });

    console.timeEnd();
    console.log('total', results);
}

solve()