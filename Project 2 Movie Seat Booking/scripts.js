const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.unavailable');
const count = document.querySelector('.count');
const totalAmt = document.querySelector('.total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

console.log(totalAmt);

function setMovieData(index, amount) {
  localStorage.setItem('selectedMovieIndex', index);
  localStorage.setItem('selectedMoviePrice', amount);
}

function updateSelectedCount() {
  const selectedCount = document.querySelectorAll('.row .seat.selected');
  count.textContent = selectedCount.length;
  totalAmt.textContent = selectedCount.length * +movieSelect.value;

  const selectedSeats = [...selectedCount].map((item) =>
    Array.from(seats).indexOf(item)
  );
  if (selectedSeats !== '') {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }
}

container.addEventListener('click', (e) => {
  if (Array.from(seats).filter((item) => item === e.target)) {
    console.log('selected');
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

function checkForExisting() {
  if (localStorage.getItem('selectedSeats')) {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if (selectedSeats !== '') {
      selectedSeats.forEach((seatIndex) => {
        Array.from(seats)[seatIndex].classList.toggle('selected');
      });
      updateSelectedCount();
    }
  }

  if (localStorage.getItem('selectedMovieIndex')) {
    movieSelect.selectedIndex = localStorage.getItem('selectedMovieIndex');
  }
}
checkForExisting();
