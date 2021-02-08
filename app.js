const mainDivFood = document.getElementById("mainDivFood");
const warning = document.getElementById("warning");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value;
  mainDivFood.innerHTML = ' ';
  if(searchInput === ''){
      warning.style.display = 'block';

  }
  else{
    getFoods(searchInput);
    warning.style.display = 'none'; 

  }
  console.log(searchInput);
});

// searchBtn.addEventListener('click' , foodInp =>{

//     const foodName = document.getElementById('searchInput').value;
//     // mainDivFood.innerHTML= '';
//     // if(searchBtn ==== ''){
//     //     warning.style.display = 'block'
//     // }

//     console.log(foodName);
// })

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

// // https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`)
// .then(res => res.json())
// .then(data =>{
//     displayFoods(data.meals);
// })

// const displayFoods = food =>{
//     const foodDiv = document.getElementById('mainDivFood');
//     if( food != null) {
//         food.map(food =>{
//             const mainDivFood = document.createElement('div');
//             mainDivFood.className = 'mainFood'
//             const foodInfo = `
//             <div onclick="displayDetails('${food.idMeal}')">
//             <img class="foodImg" src="${food.strMealThumb}">
//             <h3>${food.strMeal}</h3>
//             </div>
//             `
//             mainDivFood.innerHTML = foodInfo;
//             foodDiv.appendChild(mainDivFood);
//         })
//     } else{
//         warning.style.display = 'block';
//     }

// }
