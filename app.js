const bankBalance = document.getElementById("bankBalance");
const loanContainer = document.getElementById("loanContainer");
const loanBalance = document.getElementById("loanBalance");
const getLoanButton = document.getElementById("getLoanButton");
const payLoanButton = document.getElementById("payLoanButton");
const payBalance = document.getElementById("payBalance");
const bankButton = document.getElementById("bankButton");
const workButton = document.getElementById("workButton");
const laptopsMenu = document.getElementById("laptopsMenu");
const featuresList = document.getElementById("featuresList");
const laptopTitle = document.getElementById("laptopTitle");
const laptopDescription = document.getElementById("laptopDescription");
const laptopPrice = document.getElementById("laptopPrice");
const buyButton = document.getElementById("buyButton");
const laptopImage = document.getElementById("laptopImage");

let bankTotal = 0;
let loanTotal = 0;
let payTotal = 0;
let laptops = [];
let baseUrl = "https://noroff-komputer-store-api.herokuapp.com/";

bankBalance.innerText = bankTotal;
loanBalance.innerText = loanTotal;
payBalance.innerText = payTotal;

fetch(baseUrl + "computers")
	.then(response => response.json())
	.then(data => (laptops = data))
	.then(laptops => addAllItemsToMenu(laptops));

const addAllItemsToMenu = laptops => {
	laptops.forEach(item => addSingleItemToMenu(item));
	featuresList.innerText = laptops[0].specs.join("\r\n");
	laptopImage.src = baseUrl + laptops[0].image;
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
	laptopImage.src = baseUrl + selectedItem.image;
	laptopTitle.innerText = selectedItem.title;
	laptopDescription.innerText = selectedItem.description;
	laptopPrice.innerText = selectedItem.price + " €";
};

function checkLoan() {
	if (loanTotal === 0) {
		loanContainer.style.display = "none";
		payLoanButton.style.display = "none";
	} else {
		loanContainer.style.display = "block";
		payLoanButton.style.display = "block";
	}
}

checkLoan();

const handleGetLoan = () => {
	const loanAmount = Number(window.prompt("Amount?", ""));
	if (loanAmount <= bankTotal * (200 / 100) && loanTotal === 0) {
		bankTotal = parseInt(bankTotal + loanAmount);
		bankBalance.innerText = bankTotal;
		loanTotal = parseInt(loanTotal + loanAmount);
		loanBalance.innerText = loanTotal;
	} else {
		alert("There is not loan available for you right now");
	}
	checkLoan();
};

const handlePayLoan = () => {
	bankTotal = parseInt(bankTotal - loanTotal);
	bankBalance.innerText = bankTotal;
	loanTotal = 0;
	loanBalance.innerText = loanTotal;
	checkLoan();
};

const handleDoWork = () => {
	payTotal = parseInt(payTotal + 100);
	payBalance.innerText = payTotal;
};

const handleBankMoney = () => {
	bankTotal = parseInt(bankTotal + payTotal);
	payTotal = 0;
	payBalance.innerText = 0;
	bankBalance.innerText = bankTotal;
};

const handleBuyLaptop = () => {
	const selectedItem = laptops[laptopsMenu.selectedIndex];

	if (bankTotal >= selectedItem.price) {
		bankTotal = bankTotal - selectedItem.price;
		bankBalance.innerText = bankTotal;
	} else {
		alert("Not enough money for new laptop");
	}
};

laptopsMenu.addEventListener("change", handleChange);
getLoanButton.addEventListener("click", handleGetLoan);
payLoanButton.addEventListener("click", handlePayLoan);
workButton.addEventListener("click", handleDoWork);
bankButton.addEventListener("click", handleBankMoney);
buyButton.addEventListener("click", handleBuyLaptop);
