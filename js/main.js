console.log(recipes);
// DOM Elements
const searchbar = document.querySelector('input[name="input-search"]');

// Searchbar
searchbar.addEventListener("keyup", search);

function search() {
    const searchbarValue = document.querySelector('input[name="input-search"]').value;
    if (searchbarValue.length > 2) {

        console.log("testons si en faisant entrée cela fonctionne !");
        console.log(searchbarValue);
    }
}

const recipe = new Recipe;
console.log(recipe);
