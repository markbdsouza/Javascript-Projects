const form = document.querySelector('form');
const search = document.getElementById('search');
const result = document.getElementById('results');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(searchTerm) {
  //With promises and then
  /*  fetch(`${apiURL}/suggest/${searchTerm}`)
       .then((res) => res.json())
       .then((data) => console.log(data));*/

  //with async await
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  const data = await res.json();
  showData(data);
  console.log(`${apiURL}/suggest/${searchTerm}`);
}

function showData(data) {
  console.log(data);
  //   let output = '';
  //   data.data.forEach((song) => {
  //     output += ` <li> <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //           <button class='btn' data-artist="${song.artist.name}" data-song-title="${song.title}">Get lyrics</button> </li>`;
  //   });
  //   result.innerHTML = `<ul class='songs'>${output} </ul>`;

  result.innerHTML = `<ul class='songs'>
    ${data.data
      .map(
        (
          song
        ) => ` <li> <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class='btn' data-artist="${song.artist.name}" data-song-title="${song.title}">Get lyrics</button> </li>`
      )
      .join('')}
  </ul>`;

  if (data.prev || data.next) {
    more.innerHTML = `${
      data.prev
        ? `<button class='btn' onClick="getMoreSongs('${data.prev}')"> Previous </button>`
        : ``
    }
      ${
        data.next
          ? `<button class='btn' onClick="getMoreSongs('${data.next}')"> Next </button>`
          : ``
      }`;
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com//${url}`);
  const data = await res.json();
  showData(data);
}

//Event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (!searchTerm.trim()) {
    alert('please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <span>${lyrics}</span>`;
  more.innerHTML = '';
}

result.addEventListener('click', (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-song-title');
    getLyrics(artist, songTitle);
  }
});
