const draggableList = document.getElementById('draggable-list');
const check = document.querySelector('#check');
const h1 = document.querySelector('h1');

let originalArray = [];

for (let i = 0; i < 10; i++) {
  originalArray.push(`${i + 1} person name`);
}

const listItems = [];
let dragStartIndex;

function createList() {
  [...originalArray]
    .map((item) => {
      return { value: item, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value)
    .forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `<span class='number'>${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="personName">${item}</p>
    <i class="fas fa-grip-lines"></i>
    </div>`;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    console.log('IN');
    if (personName !== originalArray[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');
  draggables.forEach((item) => item.addEventListener('dragstart', dragStart));
  draggableListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

createList();

check.addEventListener('click', checkOrder);
