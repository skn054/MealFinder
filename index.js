const submit = document.getElementById("submit");
const search = document.getElementById("search");
const mealContainer = document.getElementById("meals");
const mealHeader = document.getElementById("meals__header");
const meal = document.getElementById("meal");
const singleMealContainer = document.getElementById("single_meal");
const randomMeal = document.querySelector(".random-btn");


function intialize(){

  singleMealContainer.innerHTML = "";
  mealContainer.innerHTML = "";
  mealHeader.innerHTML = "";
}


function searchMeals(e) {
  e.preventDefault();
  intialize()
  const value = search.value;
  if (value.trim()) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals !== null) {
          mealHeader.innerHTML = `<h1>Search results for '${value}':</h1>`;
          let meals = data.meals
            .map((meal) => {
              return `<div class="meal" id="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"></img>
                    <div class="meal_desc" data-mealID="${meal.idMeal}">${meal.strMeal}</div>
                </div>
                `;
            })
            .join("");
          console.log(meals);
          mealContainer.innerHTML = meals;
        } else {
          mealHeader.innerHTML = `<h1>There are no search results. Try again!</h1>`;
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

function displaySingleMeal(e) {
  console.log("kiran");
}

function addToDOM(data) {
    console.log(data);
    const sMeal = data;
    const ingredients = [];
    console.log(data[`strIngredient${1}`])
    for(let i=1;i<=20;i++){
        if(data[`strIngredient${i}`]){
        ingredients.push(data[`strIngredient${i}`]+"-"+ data[`strMeasure${i}`])
        }
    }
    console.log(ingredients)
    const res = `<h1 id="single_meal-header" class="single_meal-header">${sMeal.strMeal}</h1>
                
                    <img src=${sMeal.strMealThumb} alt="">
               
                <div id="single_meal-desc" class="single_meal-desc">
                        <p>${sMeal.strArea}</p>
                        <p>${sMeal.strCategory}</p>
                 </div>
                 <div>
                        <p class="single_meal-instructions">${data["strInstructions"]}</p>
                 </div>
                 <h1>Ingredients</h1>
                 <ul>
                      ${ingredients.map(ing => `<li class="single_meal-ingredients">${ing}</li>`).join()}
                </ul>
               
                `
    singleMealContainer.innerHTML = res;

//
}

function fetchRandomMeal(e) {
  // console.log("Kiran")
  intialize();
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      addToDOM(data.meals[0]);
    });
}

function getMealID(mealID){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
  .then(data => {
    addToDOM(data.meals[0]);
  })
}

// intialize()
submit.addEventListener("submit", searchMeals);
randomMeal.addEventListener("click", fetchRandomMeal);
mealContainer.addEventListener('click',e =>{
  console.log(e.target.getAttribute('data-mealid'));
  const mealID = e.target.getAttribute('data-mealid');
  getMealID(mealID)
})
