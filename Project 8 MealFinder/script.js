const mealURL = 'https://www.themealdb.com/api/json/v1/1';
const searchBtn = document.querySelector('.searchBtn');
const randomBtn = document.querySelector('.randomBtn');
const searchInput = document.getElementById('search');
const resultHeading = document.querySelector('.result-heading');

const mealsDisplay = document.querySelector('.meals');
const singleMeal = document.getElementById('single-meal');

async function searchForMeal(e) {
  e.preventDefault();
  const searchURL = `${mealURL}/search.php?s=${searchInput.value}`;
  const response = await fetch(searchURL);
  const result = await response.json();
  displayMeals(result.meals, searchInput.value);
}

async function randomMeal(e) {
  const randomURL = `${mealURL}/random.php`;
  const response = await fetch(randomURL);
  const result = await response.json();

  addMealtoDOM(result.meals[0]);
}

async function getandDisplayMealDetails(mealId) {
  const searchURL = `${mealURL}/lookup.php?i=${mealId}`;
  const response = await fetch(searchURL);
  const result = await response.json();
  const meal = result.meals[0];
  addMealtoDOM(meal);
}

function addMealtoDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else break;
  }

  singleMeal.innerHTML = `
  <div class="single-meal"> 
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" />
    <div class="single-meal-info"> 
        ${meal.strCategory} <br>
        ${meal.strArea}
    </div>
    <div class="main"> 
        <p>${meal.strInstructions}</p>
        <ul>
            ${ingredients
              .map((item) => {
                return `<li>${item}</li>`;
              })
              .join('')}
        </ul>
    </div>
  </div>`;
  console.log(ingredients);
}

function displayMeals(meals, searchCriteria = 'Random') {
  resultHeading.innerHTML = `<h2>You have searched for a '${searchCriteria}' Meal recipe</h2>`;
  console.log(meals);
  mealsDisplay.innerHTML = Array.from(meals)
    .map((meal) => {
      return `<div class="mealSummary"><div class="meal-header" data-meal-id= ${meal.idMeal}> ${meal.strMeal} </div> <img src="${meal.strMealThumb}"/> </div>`;
    })
    .join('');
  let allMeals = document.querySelectorAll('.mealSummary');
}

randomBtn.addEventListener('click', randomMeal);
searchBtn.addEventListener('click', searchForMeal);
mealsDisplay.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-header');
    } else return false;
  });
  if (mealInfo) {
    getandDisplayMealDetails(mealInfo.dataset.mealId);
  }
});
