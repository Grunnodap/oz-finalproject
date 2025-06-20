// 변수(상수) 지정 영역
const display = document.getElementsByClassName('display')[0]; // 결과
const numbers = document.getElementsByClassName('number'); // 숫자 버튼
const btn = document.querySelectorAll('button');
const dotButton = document.querySelector('.dot');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const operatorButtons = document.querySelectorAll('.operator'); // 연산자 버튼
const signButton = document.querySelector('.sign'); // +/- 버튼
const percentButton = document.querySelector('.percent'); // % 버튼

const resultElement = display; // 누락된 변수 선언 추가

// 상태 변수
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let reset = false;

// 버튼 클릭 로그 출력
btn.forEach(button => {
  button.addEventListener('click', () => {
    console.log(`${button.textContent}`);
  });
});

// 숫자 버튼 클릭
Array.from(numbers).forEach(button => {
  button.addEventListener('click', () => {
    const num = button.textContent;
    const current = display.textContent;

    if (reset) {
      display.textContent = num;
      reset = false;
    } else {
      if (current === '0') {
        if (num !== '0') {
          display.textContent = num;
        }
      } else {
        display.textContent += num;
      }
    }
  });
});

// C 버튼 , 화면을 0으로 리셋, 저장된 값과 연산 상태 초기화
clearButton.addEventListener('click', () => {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  reset = false;
});

// 소수점 구현
dotButton.addEventListener('click', () => {
  // 연산자 클릭 후 새로운 숫자를 입력하기 전이면 막기
  if (reset) {
    display.textContent = '0.';
    reset = false;
    return;
  }

  // 연산자가 눌린 뒤 아무 숫자도 입력되지 않은 상태에서는 점 입력 방지
  const current = display.textContent;
  const lastChar = current[current.length - 1];

  // 연산 기호 다음에 '.' 입력되는 것을 방지
  if (['+', '-', '*', '/'].includes(lastChar)) return;

  // 이미 소수점이 있는 경우 추가 금지
  const parts = current.split(/[\+\-\*\/]/);
  const lastPart = parts[parts.length - 1];

  if (!lastPart.includes('.')) {
    display.textContent += '.';
  }
});

// 연산자 버튼 이벤트 연결
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    btnClickOperator(button.textContent);
  });
});

// equal 버튼 클릭
equalButton.addEventListener('click', () => {
  btnClickOperator('=');
});

// 양수/음수 변환 버튼 클릭
signButton.addEventListener('click', () => {
  const current = display.textContent;
  // 부호를 반전시킨 값을 화면에 표시
  if (current !== '0') {
    display.textContent = (parseFloat(current) * -1).toString();
  }
});

// 퍼센트 버튼 클릭
percentButton.addEventListener('click', () => {
  const current = display.textContent;
  // 퍼센트를 계산해서 화면에 표시
  if (current !== '0') {
    display.textContent = (parseFloat(current) / 100).toString();
  }
});

// 연산자 클릭 처리 함수
function btnClickOperator(op) {
  btnClickOperatorIsEqual(op);
  currentOperator = op;
  reset = true;
  resultElement.textContent = firstOperand;
}

// '=' 인지 확인
function btnClickOperatorIsEqual(op) {
  if (op === '=') {
    btnClickIfOperatorIsEqual();
    return;
  }
  btnClickOperatorIfOperatorIsNotEqual();
}

// '='인 경우
function btnClickIfOperatorIsEqual() {
  secondOperand = resultElement.textContent;

  const result = calculate(
    Number(firstOperand),
    currentOperator,
    Number(secondOperand)
  );

  // 나오는 값(소숫점 없이)
  resultElement.textContent = Number(result);
  firstOperand = resultElement.textContent;
}

// '=' 이 아닌 경우
function btnClickOperatorIfOperatorIsNotEqual() {
  if (firstOperand === null) {
    firstOperand = resultElement.textContent;
  } else if (currentOperator !== '=' && currentOperator !== null) {
    btnClickIfOperatorIsEqual();
  }
}

// 계산 함수
function calculate(firstOperand, operator, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
    default:
      return secondOperand;
  }
}
