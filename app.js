
const mainDivFood = document.getElementById("mainDivFood");
const warning = document.getElementById("warning");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value;
  mainDivFood.innerHTML = " ";
  if (searchInput === "") {
    warning.style.display = "block";
  } else {
    getFoods(searchInput);
    warning.style.display = "none";
  }
  console.log(searchInput);
});

// food Details info
const displayDetails = (name) => {
  
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderFoodInfo(data.meals[0]));
};

// Render foodInfo
const renderFoodInfo = (food) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (food[`strIngredient${i}`]) {
      ingredients.push(
        `${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
    console.log(ingredients);
  }


  const foodDetails = document.getElementById("foodDetails");

foodDetails.innerHTML = `
<img  src="${food.strMealThumb}" alt="">
<h4>${food.strMeal}</h4>

<h5  Ingredients</h5>
<ul >
${ingredients
  .map((ingredient) => `<li>${ingredient}</li>`)
  .join("")}
</ul>
`;


};





// food call by id
function getFoods(mealId) {
  const mainAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

  fetch(mainAPI)
    .then((res) => res.json())
    .then((data) => {
      displayFoods(data.meals);
    });

  const displayFoods = (food) => {
    const foodDiv = document.getElementById("mainDivFood");
    if (food != null) {
      food.map((food) => {
        const mainDivFood = document.createElement("div");
        mainDivFood.className = "mainFood";
        const foodInfo = `
            <div onclick="displayDetails('${food.idMeal}')" id="foodDivStyle">
            <img class="foodImg" src="${food.strMealThumb}">
            <h3>${food.strMeal}</h3>
            </div>
            `;
        mainDivFood.innerHTML = foodInfo;
        foodDiv.appendChild(mainDivFood);
      });
    } else {
      warning.style.display = "block";
    }
  };
}


