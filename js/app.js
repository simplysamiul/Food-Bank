// ------------------ Random Food Area ------------
const randomFoodApi = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(res => res.json())
    .then(data => randomFood(data.categories))
};
randomFoodApi();
const randomFood = (randomFoods) => {
    const randomFoodContainer = document.getElementById("init-card");
    randomFoods.forEach(randomFood => {
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.innerHTML = `
        <div onclick="foodsDetails()" class="card">
          <img src="${randomFood.strCategoryThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${randomFood.strCategory}</h5>
            <p class="card-text text-muted">Fresh food is food which has not been preserved and has not spoiled yet. For vegetables and fruits, this means that they have been recently harvested and treated properly postharvest; for meat, it has recently been slaughtered and butchered.</p>
          </div>
        </div>
        `
        randomFoodContainer.appendChild(div);
    });
};
// ------------------ Food Search Area ------------ 
const getFoodInput = (foodInputPlace) =>{
    const foodInput = document.getElementById(`food-input-${foodInputPlace}`);
    const inputValue = foodInput.value;
    if(inputValue === ""){
      document.getElementById("err-mess").style.display = "block";
    }
   else{
    document.getElementById("err-mess").style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    fetch(url)
    .then(res => res.json())
    .then(data => getSearchFood(data.meals))
    // ======= value Clear ======
    foodInput.value = "";
   }
};
const getSearchFood = foods =>{
    const foodCard = document.getElementById("card-container");
    document.getElementById("section-title").style.display = "block";
    foodCard.textContent = '';
    foods.forEach(food =>{
        const div = document.createElement("div");
        div.classList.add("col-lg-4");
        div.innerHTML = `
        <div class="card">
          <img src="${food.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${food.strMeal.slice(1,25)}</h5>
            <p class="card-text text-muted ">${food.strInstructions.slice(5,180)}</p>
          </div>
        </div>
        `
        foodCard.appendChild(div);
        
    });
};
document.getElementById("search-button-main").addEventListener("click", ()=>{
    getFoodInput("main");
});
document.getElementById("search-button-nav").addEventListener("click", ()=>{
    getFoodInput("nav");
});