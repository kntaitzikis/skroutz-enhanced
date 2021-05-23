console.log("popup.js loaded");

let iframe = document.getElementById("popup-iframe");
let listsBtn = document.getElementById("popup-button-lists");
listsBtn.addEventListener('click', function() {
    iframe.setAttribute('src', 'shopping-lists.html');
});
let productsBtn = document.getElementById("popup-button-products");
productsBtn.addEventListener('click', function() {
    iframe.setAttribute('src', 'tracked-products.html');
});
let dashboardBtn = document.getElementById("popup-button-dashboard");
dashboardBtn.addEventListener('click', function() {
    // todo: check if dashboard already open and switch to that tab
    window.open('dashboard.html');
    window.close();
});