console.log("shopping_lists.js loaded");

const bPage = browser.extension.getBackgroundPage();

let shoppingLists = bPage.globals.shoppingLists;

let listsContainer = document.getElementById('shopping-list-container');
for (let l of shoppingLists) {
    listsContainer.appendChild(getListElement(l));
}

function getListElement(shoppingList) {
    let element = document.createElement('li');
    element.textContent = shoppingList.name;
    // todo

    return element;
}

let listNameField = document.getElementById('list-name');
let createListBtn = document.getElementById('list-create');
createListBtn.onclick = function() {
    let listName = listNameField.value;
    listNameField.value = "";

    let listId = (shoppingLists.length + 1).toString();
    let list = new bPage.ShoppingList(listId, listName);
    shoppingLists.push(list);

    listsContainer.appendChild(getListElement(list));
    
    bPage.putIndexedDB(STORE_SHOPPING_LISTS_NAME, list, listId);
};