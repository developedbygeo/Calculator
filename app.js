const input = document.querySelector(".input_number");
const numkeys = document.querySelectorAll(".num_key");
const equal = document.querySelector(".eq_key");
const numlist = [];
const equalBtn = document.querySelector(".eq_key");
const clearBtn = document.querySelector(".clear");

numkeys.forEach((key) => {
  key.onclick = () =>
    (input.value =
      input.value !== "0" ? input.value + key.innerText : key.innerText);
});

const operatorFunc = (operatorName) => () => {
  let currentValue = parseFloat(input.value);
  if (operatorName === "perc") {
    currentValue *= 0.01;
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
      return firstNum + secondNum;
      break;
    case "sub":
      return firstNum - secondNum;
      break;
    case "multi":
      return firstNum * secondNum;
      break;
    case "division":
      return firstNum / secondNum;
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
};
