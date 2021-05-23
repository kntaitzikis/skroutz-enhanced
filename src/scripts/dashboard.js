console.log("dashboard.js loaded");

let iframe = document.getElementById("dashboard-iframe");
let listsBtn = document.getElementById("dashboard-button-lists");
listsBtn.addEventListener('click', function() {
    iframe.setAttribute('src', 'shopping-lists.html');
    //alert("lists button clicked");
});
let productsBtn = document.getElementById("dashboard-button-products");
productsBtn.addEventListener('click', function() {
    iframe.setAttribute('src', 'tracked-products.html');
});
let dashboardBtn = document.getElementById("dashboard-button-preferences");
dashboardBtn.addEventListener('click', function() {
    iframe.setAttribute('src', 'preferences.html');
});
let stayTabBtn = document.getElementById("button-stay-tab");
stayTabBtn.addEventListener('click', function() {
    alert('stay tab clicked'); //todo
});
let ignoreChangesBtn = document.getElementById("button-ignore-changes");
ignoreChangesBtn.addEventListener('click', function() {
    alert('ignore changes clicked'); //todo
});