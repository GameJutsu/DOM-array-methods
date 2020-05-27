const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch randoom user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

//Doubles everyone's money
function doubleMoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

//Sort
function sortByRichest() {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

//Show millionaires
function showMillionaires() {
  data = data.filter((user) => {
    return user.money > 1000000;
  });
  updateDOM();
}

//Calculate wealth
function calculateWealth() {
  const total = data.reduce((acc, user) => acc + user.money, 0);
  const totalEL = document.createElement("div");
  totalEL.innerHTML = `<h3>Total wealth <strong>${formatter.format(
    total
  )}</strong></h3>`;
  main.appendChild(totalEL);
}

//Add new obj to data array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Update DOM
function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatter.format(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

//Event listeners

//Add user
addUserBtn.addEventListener("click", getRandomUser);
//Double money
doubleBtn.addEventListener("click", doubleMoney);
//Sort
sortBtn.addEventListener("click", sortByRichest);
//Show millionaires
showMillionairesBtn.addEventListener("click", showMillionaires);
//Calculate wealth
calculateWealthBtn.addEventListener("click", calculateWealth);
