const bankBalance = document.getElementById("bankBalance");
const loanButton = document.getElementById("loanButton");
const payBalance = document.getElementById("payBalance");
const bankButton = document.getElementById("bankButton");
const workButton = document.getElementById("workButton");
const laptopsMenu = document.getElementById("laptopsMenu");

let bankTotal = 0;
let payTotal = 0;
let laptops = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
	.then(response => response.json())
	.then(data => (laptops = data))
	.then(laptops => addAllItemsToMenu(laptops));

const addAllItemsToMenu = laptops => {
	laptops.forEach(item => addSingleItemToMenu(item));
};

const addSingleItemToMenu = laptop => {
	const menuItem = document.createElement("option");
	menuItem.value = laptop.id;
	menuItem.appendChild(document.createTextNode(laptop.title));
	laptopsMenu.appendChild(menuItem);
};
