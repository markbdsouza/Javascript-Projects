const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const submitBtn = document.querySelector('.btn');
const addTextHeader = document.querySelector('.addTextHeader');

const dummyTransaction = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 1000 },
  { id: 3, text: 'Dinner', amount: -50 },
  { id: 4, text: 'Medicine', amount: -60 },
];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions = localStorageTransactions || dummyTransaction;

function loadTransactionsToDOM() {
  list.innerHTML = transactions
    .map(
      (item) =>
        `<li class="${item.amount >= 0 ? 'plus' : 'minus'}">${
          item.text
        } <span>${
          item.amount
        }</span><button class="delete-btn" onclick="removeTransaction(${
          item.id
        })">x</button> 
        <button class='edit-btn' onclick="modifyTransaction(${
          item.id
        })">Edit</button>
        </li>`
    )
    .join('');
  updateTotals();
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransactiontoDOM(transaction) {
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `${transaction.text} <span>${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    <button class='edit-btn'  onclick="modifyTransaction(${transaction.id})>Edit</button>`;
  list.insertAdjacentElement('beforeend', item);
  updateTotals();
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function removeTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  loadTransactionsToDOM();
}

function resetText() {
  text.value = '';
  amount.value = '';
  submitBtn.textContent = 'Add';
  addTextHeader.textContent = 'Add new transaction';
}

function getTransactionDetails(e) {
  e.preventDefault();
  if (text.value && amount.value) {
    if (text.dataset && text.dataset.id) {
      console.log(text.dataset.id);
      console.log(transactions);
      transactions.forEach((item) => {
        if (item.id === +text.dataset.id) {
          console.log('INNN');
          item.amount = +amount.value;
          item.text = text.value;
        }
        loadTransactionsToDOM();
      });
    } else {
      let transaction = {
        id: generateID(),
        text: text.value,
        amount: +amount.value,
      };
      transactions.push(transaction);
      addTransactiontoDOM(transaction);
    }
    resetText();
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000);
}

function modifyTransaction(selectedId) {
  submitBtn.textContent = 'Modify';
  addTextHeader.textContent = 'Modify existing transaction';
  const selectedTransaction = transactions.find(
    (item) => item.id === selectedId
  );
  text.value = selectedTransaction.text;
  text.dataset.id = selectedTransaction.id;
  amount.value = selectedTransaction.amount;
}

function updateTotals() {
  let income = 0,
    expense = 0;
  transactions.forEach((item) => {
    item.amount > 0 ? (income += item.amount) : (expense += item.amount);
  });
  money_plus.textContent = `$${income.toFixed(2)}`;
  money_minus.textContent = `$${Math.abs(expense).toFixed(2)}`;
  balance.textContent = `$${(income + expense).toFixed(2)}`;
}

loadTransactionsToDOM();
form.addEventListener('submit', getTransactionDetails);
