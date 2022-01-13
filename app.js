const bankBalance = document.getElementById("bankBalance");
const loanButton = document.getElementById("loanButton");
const payBalance = document.getElementById("payBalance");
const bankButton = document.getElementById("bankButton");
const workButton = document.getElementById("workButton");
const laptopsMenu = document.getElementById("laptopsMenu");
const featuresList = document.getElementById("featuresList");
const laptopTitle = document.getElementById("laptopTitle");
const laptopDescription = document.getElementById("laptopDescription");
const laptopPrice = document.getElementById("laptopPrice");
const buyButton = document.getElementById("buyButton");

let bankTotal = 0;
let payTotal = 0;
let laptops = [];

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
	.then(response => response.json())
	.then(data => (laptops = data))
	.then(laptops => addAllItemsToMenu(laptops));

const addAllItemsToMenu = laptops => {
	laptops.forEach(item => addSingleItemToMenu(item));
	featuresList.innerText = laptops[0].specs.join("\r\n");
	laptopTitle.innerText = laptops[0].title;
	laptopDescription.innerText = laptops[0].description;
	laptopPrice.innerText = laptops[0].price + " €";
};

const addSingleItemToMenu = laptop => {
	const menuItem = document.createElement("option");
	menuItem.value = laptop.id;
	menuItem.appendChild(document.createTextNode(laptop.title));
	laptopsMenu.appendChild(menuItem);
};

const handleChange = e => {
	const selectedItem = laptops[e.target.selectedIndex];
	featuresList.innerText = selectedItem.specs.join("\r\n");
	laptopTitle.innerText = selectedItem.title;
	laptopDescription.innerText = selectedItem.description;
	laptopPrice.innerText = selectedItem.price + " €";
};

laptopsMenu.addEventListener("change", handleChange);
