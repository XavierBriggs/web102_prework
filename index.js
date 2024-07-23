/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    function showInfo () {
        return(
            card.classList.add("show-Info")
        );
    }
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // Create a new div element for each game
        const card = document.createElement("div");
        // Set the inner HTML of the div to include an image element
        card.innerHTML = `<img class="game-img" src="${games[i].img}" alt="${games[i].name}" /> <h2>${games[i].name}</h2> <p>${games[i].description}</P> <p class="no-show">${games[i].goal}</p>`;
        
        // Add the "game-card" class to the newly created div element
        card.classList.add("game-card");
        card.addEventListener("click", showInfo);
        // Append the newly created card to the "games-container" element in the DOM
        document.getElementById("games-container").append(card);
    }
}
addGamesToPage(GAMES_JSON)

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

var totalContr = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
},0);
console.log(totalContr);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
totalContr = totalContr.toLocaleString('en-US');

document.getElementById("num-contributions").innerHTML = `<p>${totalContr}</p>`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

var totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
},0);
// set inner HTML using template literal
    totalRaised = totalRaised.toLocaleString('en-US');
    console.log(totalRaised);
    raisedCard.innerHTML = `$${totalRaised}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    let listOfUnfunded = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
    });

    addGamesToPage(listOfUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let listofFunded = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    });

    addGamesToPage(listofFunded);
    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Filter the list of games to find those that are unfunded
let listofUnFundedNum = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});

// Count the number of unfunded games
let numUnfunded = listofUnFundedNum.length;

// Create a string that explains the number of unfunded games using the ternary operator
const strUnfunded = `A total of $${totalRaised} has been raised for ${GAMES_JSON.length} games. ` +
    (numUnfunded === 1 ? `There is ${numUnfunded} unfunded game.` : `There are ${numUnfunded} unfunded games.`);

// Create a new DOM element containing the template string
let descriptionElement = document.createElement('p');
descriptionElement.textContent = strUnfunded;

// Append the new DOM element to the description container
document.getElementById('description-container').appendChild(descriptionElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
// Get the containers for the top two games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games in descending order based on the pledged amount
const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// Use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// Create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// Create a new element to hold the name of the runner-up game, then append it to the correct element
const secondGameElement = document.createElement('p');
secondGameElement.textContent = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

zooHOWCEDAR