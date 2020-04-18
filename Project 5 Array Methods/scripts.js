const main = document.getElementById('main');
const addBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const filterMillionareBtn = document.getElementById('show_millionare');
const sortBtn = document.getElementById('sort');
const calcTotalBtn = document.getElementById('calculate_wealth');

let data = [];

const endPoint = 'https://randomuser.me/api';

async function getRandomUser() {
  const response = await (await fetch(endPoint)).json();
  const user = response.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);
  updateMainDOM();
}

function updateMainDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth </h2>';

  data.forEach((user) =>
    main.insertAdjacentHTML(
      'beforeend',
      `<div class='person'> <strong>${user.name}</strong>  ${formatMoney(
        user.money
      )}</div>`
    )
  );
}

function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  //   data.forEach((user) => {
  //     user.money = user.money * 2;
  //   });
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateMainDOM();
}

function sortData() {
  data.sort((a, b) => a.money - b.money);
  updateMainDOM();
}

function findMillionares() {
  data = data.filter((item) => item.money > 1000000);
  updateMainDOM();
}

function calcTotal() {
  const total = data.reduce((prevVal, currentVal, index) => {
    return prevVal + currentVal.money;
  }, 0);
  console.log(total);
  //   main.innerHTML = `total = ${formatMoney(total)}`;
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

getRandomUser();
addBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortData);
filterMillionareBtn.addEventListener('click', findMillionares);
calcTotalBtn.addEventListener('click', calcTotal);
