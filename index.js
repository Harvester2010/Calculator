const number = document.querySelectorAll('.number');
const display = document.querySelector('.display');
const backspace = document.querySelector('.delete');
const comma = document.querySelector('.comma');
const negative = document.querySelector('.negative');
const divide = document.querySelector('.divide');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const multiple = document.querySelector('.multiple');
const operation = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
let save = '';
let current = '';
let sign = '';
let calculate = '';

const value = document.createElement('div');
value.classList.add('value');
value.textContent = '0';
display.append(value);

document.addEventListener('click', output);
function output(event) {
  if (event.target.classList.contains('number')) {
    if (current === '' && sign === '') {
      if (value.textContent.includes(',')) {
        save += event.target.innerText;

        value.textContent = save;
      } else {
        save = parseFloat(save + event.target.innerText);
        value.textContent = save;
      }
    } else if (save !== '' && current !== '' && calculate !== '') {
      save = calculate;
      current = '';
      calculate = '';
      if (value.textContent.includes(',')) {
        current += event.target.innerText;
        value.textContent = current;
      } else {
        current = parseFloat(current + event.target.innerText);
        value.textContent = current;
      }
    } else if (value.textContent.includes(',')) {
      current += event.target.innerText;
      value.textContent = current;
    } else {
      current = parseFloat(current + event.target.innerText);
      value.textContent = current;
    }
  }
}

// delete button
backspace.addEventListener('click', clear);

function clear(event) {
  value.textContent = '0';
  save = '';
  current = '';
  sign = '';
  calculate = '';
}
// comma
comma.addEventListener('click', () => {
  if (!value.textContent.includes(',')) {
    value.textContent = `${save},`;
  }
});

// negative
negative.addEventListener('click', () => {
  if (!value.textContent.includes('-') && value.textContent != 0) {
    value.textContent = `-${value.textContent}`;
  } else {
    value.textContent = value.textContent.replace('-', '');
  }
});

// operation

document.addEventListener('click', changer);
function changer(event) {
  if (event.target.classList.contains('operation')) {
    sign = event.target.innerText;
    console.log(sign);
  }
}

equal.addEventListener('click', result);

function result(event) {
  save.toString().replace(',', '.');
  current.toString().replace(',', '.');
  console.log(save);
  if (sign === '+') {
    // calculate = (+save) + (+current);
    calculate = parseFloat((+save.toString().replace(',', '.')) + (+current.toString().replace(',', '.')));
  } else if (sign === '-') {
    calculate = parseFloat(save.toString().replace(',', '.') - current.toString().replace(',', '.'));
  } else if (sign === 'x') {
    calculate = (save.toString().replace(',', '.')) * (current.toString().replace(',', '.'));
  } else if (sign === '/') {
    calculate = (save.toString().replace(',', '.')) / (current.toString().replace(',', '.'));
  } else if (sign === '%') {
    calculate = (save.toString().replace(',', '.') * current.toString().replace(',', '.')) / 100;
  }
  console.log(sign);
  value.textContent = calculate.toString().replace('.', ',');
}
