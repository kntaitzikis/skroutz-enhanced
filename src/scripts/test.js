console.log("test.js loaded");

// functions that generate test data

// test stores

const TEST_STORES_LENGTH = 30; // increase this value to increase the probability of getting an optimal store

function getTestStores(length) {
    let testStores = [];

    if (!length) length = TEST_STORES_LENGTH;
    let storeIdStart = getRandomInt(1000, 9999 - length);
    
    for (let i=0; i<length; i++) {
        let storeId = (storeIdStart + i).toString();
        let storeName = "Shop " + storeId;
        let storeRating = (getRandomArbitrary(1, 5)).toFixed(2) + " stars from " + getRandomInt(1, 1500) + " users";
        let storeDescription = "(Short description for 'Shop " + i + "')";
        let storeUrl = "https://www.skroutz.gr/m/2749/Multicopter";
        let storeLocation = "(Location for 'Shop " + i + "')";
        let store = new Store(storeId, storeName, storeRating, storeDescription, storeUrl, storeLocation);

        testStores.push(store);
    }

    return testStores;
};

// test products

const TEST_PRODUCTS_LENGTH = 100;

function getTestProducts(length, stores) {
    let testProducts = [];
    if (!stores) stores = getTestStores();

    if (!length) length = TEST_PRODUCTS_LENGTH;
    let idStart = getRandomInt(10000000, 99999999 - length);

    for (let i=0; i<length;i++) {
        let product = getTestProduct(idStart+i,  shuffle(stores));
        testProducts.push(product);
    }

    return testProducts;
}

function getTestProduct(id, stores) {
    if (!id) id = getRandomInt(10000000, 99999999);
    if (!stores) stores = getTestStores();

    id = id.toString();
    let name = "Product " + id;
    let rating = (getRandomArbitrary(1, 5)).toFixed(2) + " stars from " + getRandomInt(1, 300) + " users";
    let description = "(Short description for 'Product " + id + "')";
    let url = "https://www.skroutz.gr/s/20764922/Gigabyte-GeForce-GTX-1660-Super-6GB-OC-GV-N166SOC-6GD.html";
    let imgUrl = "https://b.scdn.gr/images/sku_main_images/020764/20764922/20191031102120_gigabyte_geforce_gtx_1660_super_6gb_gv_n166soc_6gd.jpeg";

    let storeListingsLength = getRandomInt(1, stores.length);
    let storeListings = [];

    for (let j=0; j<storeListingsLength; j++) {
        let store = stores[j];
        let availability = PRODUCT_AVAILABILITY[getRandomInt(0, PRODUCT_AVAILABILITY.length-1)];
        let price = (getRandomArbitrary(1, 1000)).toFixed(2) + " €";
        let shippingCosts = "+ " + getRandomInt(3, 10) + " €";
        let payOnDelivery = (getRandomInt(0, 1)===1 ? ("+ " + getRandomInt(3, 5) + " €") : "Δεν υποστηρίζεται");
        let listing = new StoreListing(store, availability, price, shippingCosts, payOnDelivery);
        storeListings.push(listing);
    }

    return new Product(id, name, rating, description, url, imgUrl, storeListings);
}

const TEST_SHOPPING_LISTS_LENGTH = 20;
const TEST_SHOPPING_LIST_PRODUCTS_MAX_LENGTH = 10; // decrease this value to increase the probability of getting an optimal store

function getTestShoppingLists(length, products) {
    let testShoppingLists = [];
    if (!products) products = getTestProducts();

    if (!length) length = TEST_SHOPPING_LISTS_LENGTH;
    for (let i=0; i<length; i++) {
        products = shuffle(products);

        let listProducts = [];
        let listProductsLength = getRandomInt(1, TEST_SHOPPING_LIST_PRODUCTS_MAX_LENGTH);
        for (let j=0; j<listProductsLength; j++) {
            listProducts.push(products[j]);
        }

        let id = (testShoppingLists.length + 1).toString();
        let name = "Shopping list " + id;
        let listPrefs = (getRandomInt(0, 1) === 1 ? new ShoppingListPrefs() : null);

        let shoppingList = new ShoppingList(id, name, listProducts, listPrefs);
        testShoppingLists.push(shoppingList);
    }

    return testShoppingLists;
}

// output functions

function logProducts(products) {
    console.log("------------------------------------- START OF TEST.JS OUTPUT -------------------------------------");
    for (let p of products) {
        console.log("-------------------------------------");
        p.logToConsole();
    }
    console.log("------------------------------------- END OF TEST.JS OUTPUT -------------------------------------");
}

function logShoppingLists(shoppingLists, logProducts) {
    console.log("------------------------------------- START OF TEST.JS OUTPUT -------------------------------------");
    for (let l of shoppingLists) {
        console.log("-------------------------------------");
        l.logToConsole(logProducts);
    }
    console.log("------------------------------------- END OF TEST.JS OUTPUT -------------------------------------");
}

function logOptimalStores(shoppingLists) {
    console.log("------------------------------------- START OF TEST.JS OUTPUT -------------------------------------");
    for (let l of shoppingLists) { 
        let stores = l.getOptimalStores();
        console.log("-------------------------------------");
        console.log(stores.length + " optimal stores for " + l.name + ":");
        for (let s of stores) {
            console.log(s.name);
        }
    }
    console.log("------------------------------------- END OF TEST.JS OUTPUT -------------------------------------");
}

// util functions

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}