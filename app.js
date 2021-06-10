//TODO https://freshman.tech/calculator/
const calc = {
  displayValue: '0',
  firstOperand: null,
  waitForSecOperand: false,
  operator: null,
};

calc.displayValue.length = 5;

function updateDisplay() {
  const display = document.getElementById('num-disp');
  display.innerHTML = calc.displayValue;
}

const resetCalc = () => {
  calc.displayValue = '0';
  calc.firstOperand = null;
  calc.waitingForSecondOperand = false;
  calc.operator = null;
};

// Invoke EVERY button onclick
let tasten = (btn) => {
  switch (btn.value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(btn.value);
      break;
    case '.':
      inputDecimal(btn.value);
      break;
    case 'plus-minus':
      addMinus();
      break;
    case '%':
      percent();
      break;
    case 'ac':
      resetCalc();
      break;
    default:
      if (Number.isInteger(parseFloat(btn.value))) {
        inputDigit(btn.value);
      }
  }
  updateDisplay();
};

function addMinus() {
  if (!calc.displayValue.includes('-')) {
    calc.displayValue = '-' + calc.displayValue;
  }
}

function percent() {
  calc.displayValue = calc.displayValue / 100;
}

let inputDigit = (arg) => {
  const { displayValue, waitForSecOperand } = calc;
  if (waitForSecOperand === true) {
    calc.displayValue = arg;
    calc.waitForSecOperand = false;
  } else {
    calc.displayValue = displayValue === '0' ? arg : displayValue + arg;
    console.log(arg);
  }
};

let inputDecimal = (arg) => {
  if (calc.waitingForSecondOperand === true) {
    calc.displayValue = '0.';
    calc.waitingForSecondOperand = false;
    return;
  }

  if (!calc.displayValue.includes('.')) {
    calc.displayValue + '.';
  }
  console.log(arg);
};

function handleOperator(nextOperator) {
  const { displayValue, firstOperand, operator } = calc;
  const inputValue = parseFloat(displayValue);

  if (operator && calc.waitingForSecondOperand) {
    calc.operator = nextOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calc.firstOperand = inputValue;
  } else if (operator) {
    const result = makeCalc(firstOperand, inputValue, operator);
    calc.displayValue = String(result);
    calc.firstOperand = result;
  }
  calc.waitForSecOperand = true;
  calc.operator = nextOperator;
  console.log(calc.operator);
}

function makeCalc(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  } else if (operator === '%') {
    return firstOperand / 100;
  }

  return secondOperand;
}
