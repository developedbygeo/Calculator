const input = document.querySelector(".input_number");
const numkeys = document.querySelectorAll(".num_key");
const numlist = [];
const display = document.querySelector(".display");
let dotActive = false;

// Buttons
const equalBtn = document.querySelector(".eq_key");
const clearBtn = document.querySelector(".clear");
const additiveBtn = document.querySelector(".additive");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const subBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".add");
const num9 = document.querySelector(".btn9");
const num8 = document.querySelector(".btn8");
const num7 = document.querySelector(".btn7");
const num6 = document.querySelector(".btn6");
const num5 = document.querySelector(".btn5");
const num4 = document.querySelector(".btn4");
const num3 = document.querySelector(".btn3");
const num2 = document.querySelector(".btn2");
const num1 = document.querySelector(".btn1");
const num0 = document.querySelector(".btn0");
const dotBtn = document.querySelector(".dot");
//

numkeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    input.value =
      input.value !== "0" ? input.value + key.innerText : key.innerText;
    if (e.target.innerText === "." && !dotActive) {
      dotActive = true;
    } else if (e.target.innerText === "." && dotActive) {
      return;
    }
  });
});

const operatorFunc = (operatorName) => () => {
  let currentValue = parseFloat(input.value);
  if (operatorName === "perc") {
    currentValue *= 0.01;
    display.innerText = `${input.value} / 100`;
    input.value = currentValue;
  } else {
    if (numlist && numlist.length) {
      numlist.push({ value: currentValue });

      const result = evaluation(numlist);
      numlist.push({ value: result });
      numlist.push({ value: operatorName });
      input.value = "";
    } else {
      numlist.push({ value: currentValue });
      numlist.push({ value: operatorName });
      input.value = "";
    }
  }
};

const evaluation = (numlist) => {
  const secondNum = numlist.pop().value;
  const operator = numlist.pop().value;
  const firstNum = numlist.pop().value;

  switch (operator) {
    case "add":
      display.innerText = `${firstNum} + ${secondNum}`;
      return firstNum + secondNum;
      break;
    case "sub":
      display.innerText = `${firstNum} - ${secondNum}`;
      return firstNum - secondNum;
      break;
    case "multi":
      display.innerText = `${firstNum} * ${secondNum}`;
      return Math.round(firstNum * secondNum * 100) / 100;
      break;
    case "division":
      display.innerText = `${firstNum} / ${secondNum}`;
      return Math.round((firstNum / secondNum) * 100) / 100;
      break;
    default:
      return secondNum;
  }
};

for (const operatorName of ["add", "sub", "multi", "division", "perc"]) {
  document.querySelector(`.op_key[op=${operatorName}]`).onclick =
    operatorFunc(operatorName);
}
equalBtn.onclick = () => {
  if (numlist && numlist.length) {
    numlist.push({ value: parseFloat(input.value) });
    input.value = evaluation(numlist);
  }
};
clearBtn.onclick = () => {
  input.value = 0;
  numlist.length = 0;
  display.innerText = "";
};

// Additive key
additiveBtn.onclick = () => {
  input.value = -parseFloat(input.value);
  display.innerText = "";
};

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "9":
      num9.click();
      break;
    case "8":
      num8.click();
      break;
    case "7":
      num7.click();
      break;
    case "6":
      num6.click();
      break;
    case "5":
      num5.click();
      break;
    case "4":
      num4.click();
      break;
    case "3":
      num3.click();
      break;
    case "2":
      num2.click();
      break;
    case "1":
      num1.click();
      break;
    case "0":
      num1.click();
      break;
    case "C":
      clearBtn.click();
      break;
    case "c":
      clearBtn.click();
      break;
    case ".":
      dotBtn.click();
      break;
    case "+":
      addBtn.click();
      break;
    case "-":
      subBtn.click();
      break;
    case "*":
      multiplyBtn.click();
      break;
    case "/":
      divideBtn.click();
      break;
    case "*":
      multiplyBtn.click();
      break;
    case "Enter":
      equalBtn.click();
      break;
  }
});
