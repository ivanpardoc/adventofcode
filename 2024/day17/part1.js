import { input, example, example2 } from "./input.js";
let registerA = 0;
let registerB = 0;
let registerC = 0;

let programs = [];
let outputs = [];

function solve(input) {
  console.time();
  console.log(input);
  input = input.split("\n");
  registerA = parseInt(input[0].split(":")[1]);
  registerB = parseInt(input[1].split(":")[1]);
  registerC = parseInt(input[2].split(":")[1]);
  programs = input[4]
    .split(":")[1]
    .split(",")
    .map((e) => parseInt(e));

  for (let index = 0; index < programs.length; ) {
    const program = programs[index];
    const operand = programs[index + 1];
    let comboOperand = getComboOperand(
      operand,
      registerA,
      registerB,
      registerC
    );

    switch (program) {
      case 0: // adv instruction division
        registerA = Math.trunc(registerA / Math.pow(2, comboOperand));
        index += 2;
        break;
      case 1: // bxl, bitwise XOR
        registerB = registerB ^ operand;
        index += 2;
        break;
      case 2: // bst
        comboOperand = getComboOperand(
          operand,
          registerA,
          registerB,
          registerC
        );
        registerB = comboOperand % 8;
        index += 2;
        break;
      case 3: // jnz
        if (registerA !== 0) {
          index = operand - 1;
        } else {
          index += 2; 
        }
        break;
      case 4: // bxc
        registerB = registerB ^ registerC;
        index += 2;
        break;
      case 5: // out instruction
        comboOperand = getComboOperand(
          operand,
          registerA,
          registerB,
          registerC
        );
        outputs.push(comboOperand % 8);
        index += 2;
        break;
      case 6: // bdv instruction
        comboOperand = getComboOperand(
          operand,
          registerA,
          registerB,
          registerC
        );
        registerB = Math.trunc(registerA / Math.pow(2, comboOperand));
        index += 2;
        break;
      case 7: // adv instruction
        comboOperand = getComboOperand(
          operand,
          registerA,
          registerB,
          registerC
        );
        registerC = Math.trunc(registerA / Math.pow(2, comboOperand));
        index += 2;
        break;
      default:
        index++; 
        break;
    }
  }

  console.log('result:', outputs.join());
}

function getComboOperand(operand, registerA, registerB, registerC) {
  if (operand > 3) {
    switch (operand) {
      case 4:
        return registerA;
      case 5:
        return registerB;
      case 6:
        return registerC;
      default:
        return operand;
    }
  }
  return operand;
}

solve(input);