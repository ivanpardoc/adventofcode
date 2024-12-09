import { input, example, example2 } from "./input.js";

function solve(input) {
  console.time();
  let fileInd = "0";
  let newStr = [];
  input.split("").forEach((element, ind) => {
    for (let index = 0; index < parseInt(element); index++) {
      newStr.push(ind % 2 === 0 ? parseInt(fileInd) : ".");
    }
    if (ind % 2 === 0) {
      fileInd = parseInt(fileInd);
      fileInd++;
    }
    fileInd = fileInd + "";
  });

  let reverseArray = newStr.map((x) => x);
  reverseArray = reverseArray.reverse();

  for (let index = 0; index < reverseArray.length; index++) {
    const element = reverseArray[index];
    if (element !== ".") {
      let whileInd = index;
      let countBlock = 0;
      while (reverseArray[whileInd] === element) {
        whileInd++;
        countBlock++;
      }
      index = index + (countBlock - 1);
      let spaceFound = false;

      for (let indexOg = 0; indexOg < newStr.length; indexOg++) {
        const elementOg = newStr[indexOg];
        if (elementOg === element) {
          break;
        }
        if (elementOg === ".") {
          let whileIndOg = indexOg;
          let countBlockOg = 0;
          while (newStr[whileIndOg] === elementOg) {
            whileIndOg++;
            countBlockOg++;
          }
          indexOg = indexOg + (countBlockOg - 1);
          if (countBlockOg >= countBlock && !spaceFound) {
            spaceFound = true;
            for (let i = 0; i < countBlock; i++) {
              if (countBlock === 1) {
                newStr[indexOg + 1 - countBlockOg] = element;
                newStr[newStr.length - (index + 1)] = ".";
              } else {
                newStr[indexOg + 1 - countBlockOg + i] = element;
                spaceFound = true;
                newStr[newStr.length - 1 - (index - i)] = ".";
              }
            }
          }
        }
      }
    }
  }

  let total = 0;
  newStr.forEach((e, ind) => {
    if (e !== ".") {
      total += parseInt(e) * ind;
    }
  });
  console.log(total);
  console.timeEnd();
}

solve(input);
