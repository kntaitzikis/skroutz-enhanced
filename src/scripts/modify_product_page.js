console.log("modify_product_page.js loaded");

let trackBtn = document.createElement('input');
trackBtn.id = 'button-product-track';
trackBtn.type = 'image';
trackBtn.title = 'Add to tracked products';
trackBtn.value = 'Track';
let trackBtnSrc = browser.runtime.getURL('../assets/icons/beasts-32.png');
trackBtn.src = trackBtnSrc;
trackBtn.onclick = function() {
    // todo
};

let addBtn = document.createElement('input');
addBtn.id = 'button-product-add';
addBtn.type = 'image';
addBtn.title = 'Add to shopping list';
addBtn.value = 'Add';
let addBtnSrc = browser.runtime.getURL('../assets/icons/beasts-32.png');
addBtn.src = addBtnSrc;
addBtn.onclick = function() {
    // todo
};

let userActions = document.querySelector('.user-action-icons');
userActions.appendChild(trackBtn);
userActions.appendChild(addBtn);