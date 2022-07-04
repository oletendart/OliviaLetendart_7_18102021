function features(data) {
    let recipes = data;
    let result = [];
    let ingredients = [];
    let ustensils = [];
    let appliances = [];
    let tagsingredients = [];
    let tagsustensils = [];
    let tagsappliances = [];


    const ingredientsDropdown = Array.from(document.querySelectorAll('.t-dropdown-list'))[0];
    const applianceDropdown = Array.from(document.querySelectorAll('.t-dropdown-list'))[1];
    const ustensilsDropdown = Array.from(document.querySelectorAll('.t-dropdown-list'))[2];

    function listElements(tableau, element, type) {
        element.innerHTML = "";

        tableau.forEach(el => {
            let elementLi = document.createElement('li');
            elementLi.setAttribute('data-name', el);

            elementLi.addEventListener('click', () => {

                let span = document.createElement('span');
                span.setAttribute("data-name", el);
                if (type === 'ingredients') {
                    span.style.backgroundColor = '#3282F7';
                    tagsingredients.push(el);
                    tagsingredients.forEach((ingredient) => {
                        searchByTag(ingredient);
                    });
                } else if (type === 'appliances') {
                    span.style.backgroundColor = '#68D9A4';
                    tagsappliances.push(el);
                    tagsappliances.forEach((appliance) => {
                        searchByTagAppliance(appliance)
                    });
                } else if (type === 'ustensils') {
                    span.style.backgroundColor = '#ED6454';
                    tagsustensils.push(el);
                    tagsustensils.forEach((ustensil) => {
                        searchByTagUstensils(ustensil)
                    });
                } else {
                    span.style.backgroundColor = '#000';
                }
                let i = document.createElement('i');
                i.setAttribute('class', 'far fa-times-circle');

                span.innerText = el;

                span.appendChild(i);
                idTag.appendChild(span);


                displayRecipes(resulttag);

            });

            elementLi.innerText = el;
            element.appendChild(elementLi);


        })

    }

    function displayRecipes(data) {

        function displayRecipe(recipe) {
            let card = document.createElement('div');
            card.setAttribute('class', 'card');
            let inset = document.createElement('div');
            inset.setAttribute('class', "inset-card");
            let title = document.createElement('h1');
            title.textContent = recipe.name;
            let time = document.createElement('p');
            time.setAttribute('class', 'time');
            let bold = document.createElement('span');
            bold.setAttribute('class', 'bold');
            let i = document.createElement('i');
            i.setAttribute('class', 'far fa-clock');
            let timeValue = document.createTextNode(recipe.time + ' min');
            let description = document.createElement('p');
            description.textContent = recipe.description.substring(0, 200).trim() + '...';
            let list = document.createElement('ul');
            list.innerHTML = '';

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

            let myArrayIngredients = ingredients;

            recipe.ingredients.forEach((ingredient) => {

                let ingredientElement = document.createElement('li');
                let spanBold = document.createElement('span');

                spanBold.setAttribute('class', 'bold');

                let ingredientName = ingredient.ingredient;

                if (myArrayIngredients.indexOf(ingredientName) === -1) {
                    myArrayIngredients.push(ingredientName);
                }

                ingredients = myArrayIngredients;

                spanBold.textContent = ingredientName;

                let ingredientQuantity = ingredient.quantity;
                let ingredientUnit = ingredient.unit;
                let myIngredient;

                myIngredient = ingredientQuantity ? ' : ' + ingredientQuantity : '';
                myIngredient += ingredientUnit ? ' ' + ingredientUnit : '';

                let span = document.createElement('span');

                span.textContent = myIngredient;
                ingredientElement.appendChild(spanBold);
                ingredientElement.appendChild(span);

                list.appendChild(ingredientElement);
            });

            recipe.ustensils.forEach(ustensil => {
                if (ustensils.indexOf(ustensil) === -1) {
                    ustensils.push(ustensil);
                }
            })

            if (!appliances.find((appliance) => recipe.appliance === appliance)) {
                appliances.push(recipe.appliance);
            }

            return (card);
        }

        ingredients = [];
        appliances = [];
        ustensils = [];

        ingredientsDropdown.innerHTML = '';
        applianceDropdown.innerHTML = '';
        ustensilsDropdown.innerHTML = '';

        let cards = document.getElementById('grid-card');
        cards.innerHTML = "";

        // affichage des cards
        data.forEach((recipe) => {
            const recipeAAfficher = displayRecipe(recipe);
            cards.append(recipeAAfficher);

        });


        listElements(ingredients, ingredientsDropdown, 'ingredients');
        listElements(appliances, applianceDropdown, 'appliances');
        listElements(ustensils, ustensilsDropdown, 'ustensils');

    }

    function searchBar(searchbarValue) {

        result = [];

        for (let i = 0; i < recipes.length; i++) {
            let ingredientFound = recipes[i].ingredients.find((element) => {
                return element.ingredient.toLowerCase().search(searchbarValue.toLowerCase()) !== -1;
            });
            let textFound = recipes[i].name.toLowerCase().search(searchbarValue.toLowerCase()) !== -1;
            let descriptionFound = recipes[i].description.toLowerCase().search(searchbarValue.toLowerCase()) !== -1;

            if (ingredientFound || textFound || descriptionFound) {
                result.push(recipes[i]);
            }
        }

        displayRecipes(result);
        resulttag = result;
        return (result);
    }

    function searchDropdown(value) {
        let ingredientsList = [];
        resulttag = result;


        if (resulttag.length === 0) {
            recipes.forEach((recipe) => {
                let ingredientFound = recipe.ingredients.find((element) => {
                    return element.ingredient.search(value) !== -1;
                });
                if (ingredientFound !== undefined) {
                    ingredientsList.push(ingredientFound.ingredient);
                }

            })
        } else {
            resulttag.forEach((recipe) => {
                let ingredientFound = recipe.ingredients.find((element) => {
                    return element.ingredient.search(value) !== -1;
                });
                if (ingredientFound !== undefined) {
                    ingredientsList.push(ingredientFound.ingredient);
                }

            })
        }


        ingredients = [...new Set(ingredientsList)];
        listElements(ingredients, ingredientsDropdown, 'ingredients');

    }

    function searchByTag(value) {
        let resultbis = [];

        resulttag.forEach((recipe) => {
            let ingredientFound = recipe.ingredients.find((element) => {

                return element.ingredient.search(value) !== -1;
            });
            if (ingredientFound !== undefined) {
                resultbis.push(recipe);

            }

        });

        resulttag = resultbis;

    }

    function searchDropdownAppliance(value) {

        let applianceList = [];

        resulttag = result;

        if (resulttag.length === 0) {
            recipes.forEach((recipe) => {
                if (recipe.appliance.search(value) !== -1) {
                    applianceList.push(recipe.appliance);
                }
            });
        } else {
            resulttag.forEach((recipe) => {
                if (recipe.appliance.search(value) !== -1) {
                    applianceList.push(recipe.appliance);
                }
            });
        }


        appliances = [...new Set(applianceList)];

        listElements(appliances, applianceDropdown, 'appliances');

    }

    function searchByTagAppliance(value) {
        let resultbis = [];

        resulttag.forEach((recipe) => {
            if (recipe.appliance.search(value) !== -1) {
                resultbis.push(recipe);
            }
        });

        resulttag = resultbis;

    }

    function searchDropdownUstensils(value) {

        let ustensilsList = [];

        resulttag = result;

        if (resulttag.length === 0) {
            recipes.forEach((recipe) => {
                let ustensilFound = recipe.ustensils.find((element) => {

                    return element.search(value) !== -1;
                });

                if (ustensilFound !== undefined) {
                    ustensilsList.push(ustensilFound);
                }
            })
        } else {
            resulttag.forEach((recipe) => {
                let ustensilFound = recipe.ustensils.find((element) => {

                    return element.search(value) !== -1;
                });
                if (ustensilFound !== undefined) {
                    ustensilsList.push(ustensilFound);
                }
            })
        }

        ustensils = [...new Set(ustensilsList)];
        listElements(ustensils, ustensilsDropdown, 'ustensils');

    }

    function searchByTagUstensils(value) {
        let resultbis = [];

        resulttag.forEach((recipe) => {
            let ustensilFound = recipe.ustensils.find((element) => {

                return element.search(value) !== -1;
            });
            if (ustensilFound !== undefined) {
                resultbis.push(recipe);

            }
        });

        resulttag = resultbis;
    }

    return {
        recipes,
        result,
        ingredients,
        ustensils,
        appliances,
        tagsingredients,
        tagsustensils,
        tagsappliances,
        displayRecipes,
        searchBar,
        searchDropdown,
        searchDropdownAppliance,
        searchDropdownUstensils
    }

}
