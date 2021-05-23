console.log("tracked_products.js loaded");

const bPage = browser.extension.getBackgroundPage();

let trackedProducts = bPage.globals.trackedProducts;

let listsContainer = document.getElementById('tracked-products-container');
for (let p of trackedProducts) {
    listsContainer.appendChild(getListElement(p));
}

function getListElement(product) {
    let element = document.createElement('li');
    element.textContent = product.name;
    // todo

    return element;
}