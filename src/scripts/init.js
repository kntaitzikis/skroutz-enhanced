console.log("init.js loaded");

var globals = {
    userPrefs: null,
    testProducts: [],
    trackedProducts: [],
    testShoppingLists: [],
    shoppingLists: []
};

// initialize userPrefs
getIndexedDB(STORE_USER_PREFS_NAME, USER_PREFS_KEY_MAIN, function(data) {
    if (data) {
        console.log("Retrieved userPrefs from database");
        globals.userPrefs = data;
    } else {
        console.log("Initializing userPrefs in database..");
        let shoppingListPrefs = new ShoppingListPrefs(DEFAULT_MAX_AVAILABILITY,
            DEFAULT_PREFER_CASH_ON_DELIVERY, DEFAULT_MAX_CASH_ON_DELIVERY_COSTS, 
            DEFAULT_MAX_SHIPPING_COSTS, DEFAULT_PRICE_INCREASE_TOLERANCE);
        globals.userPrefs = new UserPrefs(shoppingListPrefs, DEFAULT_USE_ENDLESS_SCROLLING, 
            DEFAULT_SHOW_REVIEW_RELEVANT_PRICE);
        putIndexedDB(STORE_USER_PREFS_NAME, globals.userPrefs, USER_PREFS_KEY_MAIN);
    }
});

// initialize testProducts
getAllIndexedDB(STORE_TEST_PRODUCTS_NAME, function(data) {
    if (data && data.length > 0) {
        console.log("Retrieved testProducts from database");
        globals.testProducts = data;
    } else {
        console.log("Initializing testProducts in database..");
        globals.testProducts = getTestProducts();
        putTestProducts(globals.testProducts);
    }
});

// initialize trackedProducts
getAllIndexedDB(STORE_TRACKED_PRODUCTS_NAME, function(data) {
    if (data && data.length > 0) {
        console.log("Retrieved trackedProducts from database");
        globals.trackedProducts = data;
    }
});

// initialize testShoppingLists
getAllIndexedDB(STORE_TEST_SHOPPING_LISTS_NAME, function(data) {
    if (data && data.length > 0) {
        console.log("Retrieved testShoppingLists from database");
        globals.testShoppingLists = data;
    } else {
        console.log("Initializing testShoppingLists in database..");
        globals.testShoppingLists = getTestShoppingLists(null, globals.testProducts);
        putTestShoppingLists(globals.testShoppingLists);
    }
});

// initialize shoppingLists
getAllIndexedDB(STORE_SHOPPING_LISTS_NAME, function(data) {
    if (data && data.length > 0) {
        console.log("Retrieved shoppingLists from database");
        globals.shoppingLists = data;
    }
});

function putTestProducts(testProducts) {
    for (let p of testProducts) {
        putIndexedDB(STORE_TEST_PRODUCTS_NAME, p, p.id);
    }
}

function putTestShoppingLists(testShoppingLists) {
    for (let l of testShoppingLists) {
        putIndexedDB(STORE_TEST_SHOPPING_LISTS_NAME, l, l.id);
    }
}