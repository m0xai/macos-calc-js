//TODO https://freshman.tech/calculator/
const calc = {
  reduceInputs: 0,
  firstOperand: null,
  waitForSecOperand: false,
  operator: null,
  numDisp: document.getElementById('num-disp'),
};

let displayArr = Array.from(calc.numDisp);
calc.numDisp.innerHTML = displayArr;
const resetCalc = () => {
  displayArr = [];
  calc.numDisp.innerHTML = 0;
  calc.reduceInputs = 0;
};
function pushToScreen() {
  calc.numDisp.innerHTML = calc.reduceInputs;
}

// Reduce items in order to bring numbers
let reduceItems = () => {
  displayArr.reduce(function (a, b) {
    return (calc.reduceInputs = a + b);
  }, []);
};

//! Invoke EVERY button onclick
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
    case 'ac':
      resetCalc();
      break;
    default:
      if (Number.isInteger(parseFloat(btn.value))) {
        inputDigit(btn.value);
      }
  }
};

let inputDigit = (arg) => {
  const { reduceInputs, waitForSecOperand } = calc;

  if (waitForSecOperand === true) {
    calc.reduceInputs = arg;
    calc.waitForSecOperand = false;
  } else {
    displayArr.push(arg);
    reduceItems();
    pushToScreen();
    console.log(arg);
  }
};

let inputDecimal = (arg) => {
  if (!displayArr.includes('.')) {
    displayArr.push('.');
  }
  console.log(arg);
};

function handleOperator(nextOperator) {
  const { reduceInputs, firstOperand, operator } = calc;
  const inputValue = parseFloat(reduceInputs);

  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calc.firstOperand = inputValue;
  }
  calc.waitForSecOperand = true;
  calc.operator = nextOperator;
  console.log(calc);
}
