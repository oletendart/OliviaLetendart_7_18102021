// DOM Elements
const searchbar = document.querySelector('input[name="input-search"]');


// Searchbar
searchbar.addEventListener("keyup", () => {
    const searchbarValue = searchbar.value;
    if (searchbarValue.length > 2) {
        let result = recipes.filter(recipe => recipe.name.toLowerCase().search(searchbarValue.toLowerCase()) !== -1);
        Recipe.initialise();
        searchRecipe(result);
    } else {
        Recipe.initialise();
        searchRecipe(recipes);
    }
});

Recipe.initialise();

const searchRecipe = (recipes) => {
    recipes.forEach((data) => {
        const recipe = new Recipe(
            data.name,
            data.time,
            data.ingredients,
            data.description,
            data.appliance,
            data.ustensils
        );

        recipe.showCart();
    });


    Recipe.listElements(Recipe.ingredientsArray, Recipe.ingredientsDropdown);
    Recipe.listElements(Recipe.applianceArray, Recipe.applianceDropdown);
    Recipe.listElements(Recipe.ustensilsArray, Recipe.ustensilsDropdown);
}

searchRecipe(recipes);

let buttonDropdown = document.querySelectorAll('.t-select-btn');

const openDropdown = (event, index) => {
    let listDropdown = document.querySelectorAll('.t-dropdown-list');
    let divDropdown = document.querySelectorAll('.t-dropdown-select');
    let indexDrop = index;

    listDropdown.forEach((drop, index) => {
        if (indexDrop === index) {
            drop.classList.toggle('active');
            buttonDropdown[indexDrop].classList.toggle('rotate-active');
            divDropdown[indexDrop].classList.toggle('borderRadius-active');
        } else {
            drop.classList.remove('active');
            buttonDropdown[index].classList.remove('rotate-active');
            divDropdown[index].classList.remove('borderRadius-active');
        }
    });
}

buttonDropdown.forEach((item, index) => {
    item.addEventListener('click', (event) => openDropdown(event, index))
});
