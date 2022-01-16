const bankBalance = document.getElementById("bankBalance");
const loanContainer = document.getElementById("loan");
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
let boughtLaptop = true;
let baseUrl = "https://noroff-komputer-store-api.herokuapp.com/";

bankBalance.innerText = bankTotal;
loanBalance.innerText = loanTotal;
payBalance.innerText = payTotal;

// Get data from API
fetch(baseUrl + "computers")
	.then(response => response.json())
	.then(data => (laptops = data))
	.then(laptops => addAllItemsToMenu(laptops));

// Add all laptops to menu
const addAllItemsToMenu = laptops => {
	laptops.forEach(item => addSingleItemToMenu(item));
	featuresList.innerText = laptops[0].specs.join("\r\n");
	laptopImage.src = baseUrl + laptops[0].image;
	laptopTitle.innerText = laptops[0].title;
	laptopDescription.innerText = laptops[0].description;
	laptopPrice.innerText = laptops[0].price + " €";
};

// Create option elements inside of select element
// Add individual laptop to select menu
const addSingleItemToMenu = laptop => {
	const menuItem = document.createElement("option");
	menuItem.value = laptop.id;
	menuItem.appendChild(document.createTextNode(laptop.title));
	laptopsMenu.appendChild(menuItem);
};

// Change data in features and details element depending which laptop is selected
const handleChange = e => {
	const selectedItem = laptops[e.target.selectedIndex];
	featuresList.innerText = selectedItem.specs.join("\r\n");
	laptopImage.src = baseUrl + selectedItem.image;
	laptopTitle.innerText = selectedItem.title;
	laptopDescription.innerText = selectedItem.description;
	laptopPrice.innerText = selectedItem.price + " €";
};

// Check if user has active loan
// Show loan amount and pay loan button
function checkLoan() {
	if (loanTotal <= 0) {
		loanContainer.style.display = "none";
		payLoanButton.style.display = "none";
	} else {
		loanContainer.style.display = "flex";
		payLoanButton.style.display = "inline-block";
	}
}

checkLoan();

// Ask amount of loan
// Move loan to bank balance if asked loan is two times or less user's bank balance,
// AND user has no active loan AND user has bought new laptop before asking new loan
const handleGetLoan = () => {
	const loanAmount = Number(window.prompt("Amount?", ""));
	if (
		loanAmount <= bankTotal * (200 / 100) &&
		loanTotal <= 0 &&
		boughtLaptop === true
	) {
		bankTotal = parseInt(bankTotal + loanAmount);
		bankBalance.innerText = bankTotal;
		loanTotal = parseInt(loanTotal + loanAmount);
		loanBalance.innerText = loanTotal;
		boughtLaptop = false;
		alert("You got loan of " + loanAmount);
	} else {
		alert("There is not loan available for you right now");
	}
	checkLoan();
};

// Pay entire loan, loan balance is reduced from bank balance
const handlePayLoan = () => {
	bankTotal = parseInt(bankTotal - loanTotal);
	bankBalance.innerText = bankTotal;
	loanTotal = 0;
	loanBalance.innerText = loanTotal;
	checkLoan();
};

// Add 100 to pay balance
const handleDoWork = () => {
	payTotal = parseInt(payTotal + 100);
	payBalance.innerText = payTotal;
};

// Transfer pay balance to bank balance
// If user has active loan, 10% of pay balance is reduced from loan balance
// and excess 90% of pay balance is added to bank balance
const handleBankMoney = () => {
	if (loanTotal > 0) {
		bankTotal = parseInt(bankTotal + payTotal * (90 / 100));
		loanTotal = parseInt(loanTotal - payTotal * (10 / 100));
		payTotal = 0;
		payBalance.innerText = 0;
		bankBalance.innerText = bankTotal;
		loanBalance.innerText = loanTotal;
	} else {
		bankTotal = parseInt(bankTotal + payTotal);
		payTotal = 0;
		payBalance.innerText = 0;
		bankBalance.innerText = bankTotal;
	}
	checkLoan();
};

// Buy new laptop if user has enough balance in bank
const handleBuyLaptop = () => {
	const selectedItem = laptops[laptopsMenu.selectedIndex];
	if (bankTotal >= selectedItem.price) {
		bankTotal = bankTotal - selectedItem.price;
		bankBalance.innerText = bankTotal;
		boughtLaptop = true;
		alert("You just bought " + selectedItem.title);
	} else {
		alert("Not enough money for new laptop");
	}
};

// Event listeners
laptopsMenu.addEventListener("change", handleChange);
getLoanButton.addEventListener("click", handleGetLoan);
payLoanButton.addEventListener("click", handlePayLoan);
workButton.addEventListener("click", handleDoWork);
bankButton.addEventListener("click", handleBankMoney);
buyButton.addEventListener("click", handleBuyLaptop);
