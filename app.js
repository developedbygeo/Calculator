const input = document.querySelector(".input_number");
const numkeys = document.querySelectorAll(".num_key");
const equal = document.querySelector(".eq_key");
const numlist = [];
const equalBtn = document.querySelector(".eq_key");
const clearBtn = document.querySelector(".clear");
const additiveBtn = document.querySelector(".additive");
const display = document.querySelector(".display");
const dotBtn = document.querySelector(".dot");
let dotActive = false;

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
