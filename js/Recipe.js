class Recipe {

    constructor(name, time, ingredients, description, appliance, ustensils) {
        this.name = name;
        this.time = time;
        this.ingredients = ingredients;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;

    }

    showCart() {
        let cards = document.getElementById('grid-card');

        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let inset = document.createElement('div');
        inset.setAttribute('class', "inset-card");

        let title = document.createElement('h1');
        title.textContent = this.name;

        let time = document.createElement('p');
        time.setAttribute('class', 'time');

        let bold = document.createElement('span');
        bold.setAttribute('class', 'bold');

        let i = document.createElement('i');
        i.setAttribute('class', 'far fa-clock');

        let timeValue = document.createTextNode(this.time + ' min');

        let description = document.createElement('p');
        description.textContent = this.description.substring(0, 200).trim() + '...';

        let list = document.createElement('ul');
        list.innerHTML = '';


        this.ingredients.forEach((ingredient) => {

            let ingredientElement = document.createElement('li');
            let spanBold = document.createElement('span');

            spanBold.setAttribute('class', 'bold');

            let ingredientName = ingredient.ingredient + ' : ';

            if (Recipe.ingredientsArray.indexOf(ingredient.ingredient) === -1) {
                Recipe.ingredientsArray.push(ingredient.ingredient);
            }

            spanBold.textContent = ingredientName;

            let ingredientQuantity = ingredient.quantity;
            let ingredientUnit = ingredient.unit;
            let myIngredient;

            if (ingredientUnit) {
                myIngredient = ingredientQuantity + ' ' + ingredientUnit;
            } else {
                myIngredient = ingredientQuantity;
            }

            let span = document.createElement('span');

            span.textContent = myIngredient;
            ingredientElement.appendChild(spanBold);
            ingredientElement.appendChild(span);

            list.appendChild(ingredientElement);
        });

        this.ustensils.forEach(ustensil => {

            if (Recipe.ustensilsArray.indexOf(ustensil) === -1) {
                Recipe.ustensilsArray.push(ustensil);
            }

        })


        if (!Recipe.applianceArray.find((appliance) => this.appliance === appliance)) {
            Recipe.applianceArray.push(this.appliance);
        }


        let img = document.createElement("img");
        img.setAttribute('src', "css/img/fond-gris.jpg");
        img.setAttribute('alt', 'image montrant la recette');


        card.appendChild(img);
        card.appendChild(inset);
        inset.appendChild(title);
        inset.appendChild(time);
        time.appendChild(bold);
        bold.appendChild(i);
        bold.appendChild(timeValue);
        inset.appendChild(list);
        inset.appendChild(description);


        cards.appendChild(card);

    }

    static listElements(tableau, element) {


        tableau.forEach(el => {
            let elementLi = document.createElement('li');
            elementLi.innerText = el;
            element.appendChild(elementLi);
        })


    }

    static initialise() {
        Recipe.ingredientsDropdown = Array.from(document.querySelectorAll('.t-dropdown-list'))[0];
        Recipe.applianceDropdown = Array.from(document.querySelectorAll('.t-dropdown-list'))[1];
        Recipe.ustensilsDropdown = Array.from(document.querySelectorAll('.t-dropdown-list'))[2];

        Recipe.ingredientsArray = [];
        Recipe.applianceArray = [];
        Recipe.ustensilsArray = [];

        Recipe.ingredientsDropdown.innerHTML = '';
        Recipe.applianceDropdown.innerHTML = '';
        Recipe.ustensilsDropdown.innerHTML = '';
        const cards = document.getElementById('grid-card');
        cards.innerHTML = '';
    }
}
