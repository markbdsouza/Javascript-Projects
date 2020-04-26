const postContainer = document.querySelector('.post-container');
const loader = document.querySelector('.loader');
const filterInput = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&&_page=${page}`
  );
  const data = await response.json();
  return data;
}

async function showPosts() {
  var posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
        <div class="post-title">  ${post.name}
        </div>
        <div class="post-body"> ${post.body}
        </div>
    </div>`;
    postContainer.appendChild(postEl);
  });
}

function filterPosts(e) {
  const term = e.currentTarget.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const postText = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || postText.indexOf(term) > -1) {
      console.log('in');
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

function showLoader() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');
    page++;
    showPosts();
  }, 1000);
}

function scrollAndShow() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
}

showPosts();
setTimeout(() => {
  window.addEventListener('scroll', scrollAndShow);
}, 2000);
filterInput.addEventListener('input', filterPosts);
