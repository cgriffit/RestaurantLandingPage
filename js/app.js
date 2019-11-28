// =========== FOOD MENU ===================
const removeSpaces = item => {
    // remove spaces from item name to be used as item ID
    item = item.replace(/\s+/g, '-');
    return item;
}

const renderFoodItem = (item, id) => {
    const markup = `
        <li class="food-item" id="${removeSpaces(item.name)}">
            <div class="infoModal">
                <span class="cancel"><i class="fa fas fa-times"></i></span>
                <p>${item.description}</p>
            </div>
            <div class="food-info">
                <h4 class="food-name">${item.name}</h4>
                <p class="food-price">${item.price}</p>
            </div>
            <button class="more-info-btn hidden">More Info</button>       
        </li>
        
    `;

    // add items to the end of the list
    document.querySelector(`#${id}`).insertAdjacentHTML("beforeend", markup);
}

// populate food menu
const renderFood = items => {
    const foodLists = document.querySelectorAll(".food-list");

    // // loop through all food lists (starters, main, sides, desserts)
    for (let list of foodLists) {
        // loop through each entree in the list and render markup for it
        for (let entree in items[list.id]) {
            renderFoodItem(items[list.id][entree], list.id);
        }
    }
}

renderFood(menu.food);

// =========== MORE INFO BUTTON AND MODAL ==================
const showMoreInfo = event => {
    let itemID, liSel;
    if (event.target.classList.contains("food-item")) {
        itemID = event.target.closest("li").id;
    }

    if (itemID) {
        // display more info button on li 
        liSel = document.querySelector(`#${itemID}`);
        liSel.querySelector(".more-info-btn").classList.remove("hidden");
    }
}

const hideMoreInfo = event => {
    let itemID, liSel;
    if (event.target.classList.contains("food-item")) {
        itemID = event.target.closest("li").id;
    }

    if (itemID) {
        // hide more info button on li 
        liSel = document.querySelector(`#${itemID}`);
        liSel.querySelector(".more-info-btn").classList.add("hidden");
    }
}

for (let li of document.querySelectorAll(".food-item")) {
    // show more info button on li mouseenter
    li.addEventListener("mouseenter", showMoreInfo);
    // hide more info button on li mouseleave
    li.addEventListener("mouseleave", hideMoreInfo);
}

for (let moreInfoBtn of document.querySelectorAll(".more-info-btn")) {
    moreInfoBtn.addEventListener("click", event => {
        // show modal on more info button click
        event.target.parentElement.firstElementChild.style.display = "flex";
        // event.target.parentElement.firstElementChild.style.top = event.target.parentElement.offsetTop + event.target.parentElement.offsetHeight;
        // event.target.parentElement.firstElementChild.style.left = event.target.parentElement.offsetLeft;

    });
}

for (let cancelBtn of document.querySelectorAll(".cancel")) {
    cancelBtn.addEventListener("click", event => {
        // hide modal on cancel button click
        event.target.parentElement.parentElement.style.display = "none";
    });
}

// ========== AGE MODAL ===============
const checkAge = () => {
    // get age from user
    let age = document.querySelector("#age").value;
    // show appropriate drink menu
    age >= 21 ? document.querySelector(".adult").classList.remove("hidden") :
        document.querySelector(".non-alc").classList.remove("hidden");
    document.querySelector("#drinks").style.opacity = 1;
    //reset age
    age = "";
}

const openModal = () => {
    // show age modal
    document.querySelector("#ageModal").classList.remove("hidden");
    // hide drink menu
    document.querySelector("#drinks").style.opacity = 0;
    // remove event listeners
    document.querySelector("#drinks-link").removeEventListener("click", openModal);
    window.removeEventListener("scroll", checkScroll);
}

const closeModal = () => {
    // hide age modal
    document.querySelector("#ageModal").classList.add("hidden");
}

const checkScroll = () => {
    var elementTarget = document.querySelector("#food");
    // check if user has scrolled past food section
    if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        openModal();
    }
}

// open age modal on link click
document.querySelector("#drinks-link").addEventListener("click", openModal);

//open age modal on scroll to drinks section
window.addEventListener("scroll", checkScroll);

// get age modal input and close modal on click
document.querySelector("#ageSubmit").addEventListener("click", () => {
    checkAge();
    closeModal();
    showAppropriateDrinks();
});

// get age modal input and close modal on enter
window.addEventListener("keypress", e => {
    if (e.keyCode === 13 || e.which === 13) {
        checkAge();
        closeModal();
        showAppropriateDrinks();
    }
});

// =========== DRINKS MENU ===============
const renderDrinkItem = (item, id) => {
    const markup = `
        <li class="drink-item" id="${removeSpaces(item.name)}">
            <div class="drink-info">
                <h4 class="drink-name">${item.name}</h4>
                <p class="drink-price">${item.price}</p>
            </div>    
        </li>      
    `;

    // add items to the end of the list
    document.querySelector(`#${id}`).insertAdjacentHTML("beforeend", markup);
}

const renderDrinks = items => {
    const drinksLists = document.querySelectorAll(".drinks-list");

    // // loop through all food lists (starters, main, sides, desserts)
    for (let list of drinksLists) {
        // loop through each entree in the list
        for (let drink in items[list.id]) {
            //console.log(items[list.id][drink]);
            renderDrinkItem(items[list.id][drink], list.id);
        }
    }
}

const showAppropriateDrinks = () => {
    const adultDrinks = document.querySelector(".adult");
    const nonAlcDrinks = document.querySelector(".non-alc");

    // display drinks menu based on user input
    if (adultDrinks.classList.contains("hidden") === false) {
        renderDrinks(menu.drinks.adult);
    } else if (nonAlcDrinks.classList.contains("hidden") === false) {
        renderDrinks(menu.drinks.nonAlc);
    }
}

document.querySelector("#navToggle").addEventListener("click", () => {
    document.querySelector("#main-menu").classList.toggle("vertical");
});

// 3. get rid of duplicate code - upload current code to github first
// 4. add about section

// if time, add button/icon for back to top 

//fiddle & pipes
// finnegan's fiddle