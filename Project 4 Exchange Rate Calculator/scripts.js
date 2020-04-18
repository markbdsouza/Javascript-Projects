const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const convertText = document.querySelector('.converter');
const swap = document.querySelector('.swap');
const CURRENCIES = {
  USD: 'American Dollar',
  AUD: 'Australian Dollar',
  INR: 'Rupee',
  EUR: 'Euro',
  SGD: 'Singapore Dollar',
};
const endPoint = 'https://api.exchangeratesapi.io/latest?base=';
let rates;

function selectRandomCurrencies() {
  const arr = [fromCurrency, toCurrency];
  arr.forEach((currency) => {
    const options = currency.querySelectorAll('option');
    const randomIndex = Math.floor(Math.random() * options.length);
    options[randomIndex].selected = true;
  });
  // convertCurrency();
}

function populateCurrencies() {
  const currenciesHTML = Object.keys(CURRENCIES)
    .map((item) => `<option value="${item}">${CURRENCIES[item]}</option>`)
    .join('');
  fromCurrency.innerHTML = currenciesHTML;
  toCurrency.innerHTML = currenciesHTML;
  selectRandomCurrencies();
}

function updateConvertText() {
  convertText.textContent = `1 ${fromCurrency.value} = ${
    rates[toCurrency.value]
  } ${toCurrency.value}`;
}

function convertCurrency() {
  toAmount.value = rates[toCurrency.value] * fromAmount.value;
  updateConvertText();
}

async function checkRate() {
  const res = await fetch(`${endPoint}${fromCurrency.value}`);
  await res.json().then((resp) => {
    rates = resp.rates;
  });
  console.log(rates);
  convertCurrency();
}

function swapCurrencies() {
  const tempFromCurrency = fromCurrency.value;
  const tempToCurrency = toCurrency.value;
  fromCurrency.value = tempToCurrency;
  toCurrency.value = tempFromCurrency;
  checkRate();
}

populateCurrencies();
checkRate();
fromCurrency.addEventListener('change', checkRate);
toCurrency.addEventListener('change', convertCurrency);
fromAmount.addEventListener('keyup', checkRate);
swap.addEventListener('click', swapCurrencies);
