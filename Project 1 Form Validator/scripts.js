console.log('asd');

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function validateUserName() {
  return username.value.length > 6;
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Enter a valid email');
  }
}

function showError(input, errorMsg) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const small = formControl.querySelector('small');
  small.textContent = errorMsg;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

function getFieldName(input) {
  return input.id.slice(0, 1).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is mandatory`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    console.log('ERROR');
    showError(
      input,
      `${getFieldName(input)} needs to be between ${min} & ${max} length`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatches(pass1, pass2) {
  if (pass1.value === pass2.value) {
    showSuccess(pass1);
    showSuccess(pass2);
  } else {
    showError(pass2, 'Password must match');
  }
}

function validate(e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatches(password, password2);
  // if (username.value === '') {
  //   showError(username, 'Username is required');
  // } else {
  //   showSuccess(username);
  // }
}

form.addEventListener('submit', validate);
