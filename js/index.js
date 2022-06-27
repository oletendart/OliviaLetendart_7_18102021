// DOM Elements
const searchbar = document.querySelector('input[name="input-search"]');
const searchIngredients = document.querySelector('#input-ingredients');
const searchAppliance = document.querySelector('#input-appliance');
const searchUstensils = document.querySelector('#input-ustensils');
const idTag = document.querySelector('#tag');

const feature = features(recipes);
feature.displayRecipes(feature.recipes)

// Searchbar
searchbar.addEventListener("keyup", () => {
    const searchbarValue = searchbar.value;
    if (searchbarValue.length > 2) {
        feature.result = feature.searchBar(searchbarValue);
    } else {
        feature.displayRecipes(feature.recipes);
    }
});

// Dropdown Search
searchIngredients.addEventListener('keyup', (e) => {
        if (e.target.value.length > 0) {
            feature.searchDropdown(e.target.value);
        } else {
            feature.displayRecipes(feature.recipes)
        }
    }
);

searchAppliance.addEventListener('keyup', (e) => {
    if(e.target.value.length > 0) {
        feature.searchDropdownAppliance(e.target.value)
    } else {
        feature.displayRecipes(feature.recipes)
    }
})

searchUstensils.addEventListener('keyup', (e) => {
    if(e.target.value.length > 0) {
        feature.searchDropdownUstensils(e.target.value);
    } else {
        feature.displayRecipes(feature.recipes)
    }
})

let buttonDropdown = document.querySelectorAll('.t-select-btn');

const openDropdown = (event, index) => {
    let listDropdown = document.querySelectorAll('.t-dropdown-list');
    let divDropdown = document.querySelectorAll('.t-dropdown-select');
    let widthDropdown = document.querySelectorAll('.t-dropdown-block');
    let indexDrop = index;

    listDropdown.forEach((drop, index) => {
        if (indexDrop === index) {
            drop.classList.toggle('active');
            buttonDropdown[indexDrop].classList.toggle('rotate-active');
            divDropdown[indexDrop].classList.toggle('borderRadius-active');
            widthDropdown[indexDrop].classList.toggle('width-active');
        } else {
            drop.classList.remove('active');
            buttonDropdown[index].classList.remove('rotate-active');
            divDropdown[index].classList.remove('borderRadius-active');
            widthDropdown[index].classList.remove('width-active');
        }
    });
}

buttonDropdown.forEach((item, index) => {
    item.addEventListener('click', (event) => openDropdown(event, index))
});
