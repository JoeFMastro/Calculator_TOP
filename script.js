
//math operations on the calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: división por 0";
  }
  return a / b;
}

function operate(op, num1, num2) {
  if (op === "+") return add(num1, num2);
  if (op === "-") return subtract(num1, num2);
  if (op === "*") return multiply(num1, num2);
  if (op === "÷") return divide(num1, num2);
}


let firstNumber = "";
let secondNumber = "";
let operator = "";
let displayReset = false;

const display = document.getElementById("display");
const expression = document.getElementById("expression");

function updateDisplay(val) {
  display.textContent = val;
}

function updateExpression(val) {
  expression.textContent = val;
}


function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function addNumber(num) {
  if (displayReset) {
    firstNumber = "";
    displayReset = false;
  }
  if (operator === '') {
    // adding first number
    firstNumber += num;
    updateDisplay(firstNumber);
  } else {
    // adding second number
    secondNumber += num;
    updateDisplay(secondNumber);
  }
}

function setOperator(op) {
  if (firstNumber !== '' && secondNumber !== '' && operator !== '') {
    calculate();
    if (display.textContent?.startsWith("Error"))
      return; // error state
  }
  if (firstNumber === '')
    return;
  operator = op;
  secondNumber = '';
  displayReset = false;
  updateExpression(`${firstNumber} ${operator}`);
}

function calculate() {
  if (firstNumber === '' || secondNumber === '' || operator === '')
    return;
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  const result = operate(operator, a, b);
  if (typeof result === 'string') {
    updateDisplay(result);
    updateExpression('');
    firstNumber = "";
    secondNumber = "";
    operator = "";
    return;
  }
  const resultStr = roundResult(result);
  updateExpression(`${firstNumber} ${operator} ${secondNumber} =`);
  updateDisplay(resultStr);
  firstNumber = resultStr;
  secondNumber = '';
  operator = '';
  displayReset = true;
}

function clearAll() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  updateDisplay('0');
  updateExpression('');
}

function backSpace() {
  if (displayReset)
    return;
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1); // elimina el ultimo elemento del string
    updateDisplay(firstNumber || "0");
  } else {
    secondNumber = secondNumber.slice(0, -1);
    updateDisplay(secondNumber || '0');
  }
}


//para que HTML pueda acceder a las funciones
window.addNumber = addNumber;
window.setOperator = setOperator;
window.calculate = calculate;
window.clearAll = clearAll;
window.backSpace = backSpace;
