const search = document.getElementById('search'),
submit=document.getElementById('submit'),
random =document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-search'),
single_MealEl = document.getElementById('single-meal');



//search meal end fetch from API

function serachMeal(e){
    e.preventDefault();

    
    //clear single meal
    single_MealEl.innerHTML="";

    //get searhc term
    const term = search.value;
    console.log(term);

    //check for empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term.trim()}`).then(res =>res.json()).then(data => {
            console.log(data);
            resultHeading.innerHTML=`<h2>Search results for ${term}:</h2>`;

            if(data.meals == null){
                resultHeading.innerHTML=`There are no search results. Try again!<p>`;
                mealsEl.innerHTML ="";
            } else {
                mealsEl.innerHTML =data.meals.map(item => 
                    `
                    <div class='meal'>
                        <img src='${item.strMealThumb}' alt='${item.idMeal}'/>
                        <div class='meal-info' data-mealID="${item.idMeal}">
                        <h3>${item.strMeal}</h3>
                        </div>
                    </div>
                    `
                ).join('');
            }
        });

        //clear search text
        search.value='';
    }
    else{
        alert('Please enter a searh term');
    }
}


function addMealToDOM(meal){

    const ingredients=[];
    for(let i=1 ; i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else {
            break;
        }
    }
    console.log(ingredients);

    single_MealEl.innerHTML = `
    <div class ="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt ="${meal.strMeal}">
        <div class ="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div class ="main">
            <p>${meal.strInstructions} </p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing=> `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
    `;
}


//fetch meal By Id

function getMealById(mealID){

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(res => res.json()).then(data => {

        console.log(data);
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
}



// get random meal 

function randomMeal(){
    //clear meals and heading

    mealsEl.innerHTML ='';
    resultHeading.innerHTML ='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res=>res.json()).then(data=> {
       const meal = data.meals[0];

       addMealToDOM(meal);
    });
}


//Evenet Listeners


submit.addEventListener('submit',serachMeal);
mealsEl.addEventListener('click', e=> {
    const mealInfo = e.composedPath().find(item => {

        if(item.classList){
            return  item .classList.contains('meal-info')
        }
        else {
            return false;
        }
    });
    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }

});

random.addEventListener('click', randomMeal);
